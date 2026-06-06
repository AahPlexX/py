/// <reference lib="webworker" />

export type {};

type RunRequest = {
  type: "run";
  id: string;
  code: string;
  timeoutMs: number;
};

type LoadRequest = {
  type: "load";
};

type WorkerMessage = RunRequest | LoadRequest;

type ReadyMessage = { type: "ready" };
type LoadingMessage = { type: "loading" };
type LoadErrorMessage = { type: "load-error"; message: string };
type RunResultMessage = {
  type: "run-result";
  id: string;
  stdout: string;
  stderr: string;
  error: { name: string; message: string; lineno?: number } | null;
  durationMs: number;
};
type TimeoutMessage = { type: "run-timeout"; id: string };

type WorkerOutMessage =
  | ReadyMessage
  | LoadingMessage
  | LoadErrorMessage
  | RunResultMessage
  | TimeoutMessage;

let pyodide: PyodideInterface | null = null;
let loadPromise: Promise<void> | null = null;

interface PyodideInterface {
  runPythonAsync(code: string): Promise<unknown>;
  loadPackagesFromImports(code: string): Promise<void>;
  setStdout(opts: { batched: (text: string) => void }): void;
  setStderr(opts: { batched: (text: string) => void }): void;
  globals: { toJs: () => Map<string, unknown> };
  version: string;
}

declare function loadPyodide(opts: {
  indexURL: string;
  stdout?: (text: string) => void;
  stderr?: (text: string) => void;
}): Promise<PyodideInterface>;

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/";

function postMessage(msg: WorkerOutMessage): void {
  self.postMessage(msg);
}

async function initPyodide(): Promise<void> {
  if (pyodide) return;
  postMessage({ type: "loading" });
  try {
    await importScripts(`${PYODIDE_CDN}pyodide.js`);
    pyodide = await loadPyodide({ indexURL: PYODIDE_CDN });
    postMessage({ type: "ready" });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    postMessage({ type: "load-error", message: msg });
    throw e;
  }
}

function importScripts(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = new URL(url);
    fetch(script.toString())
      .then((r) => r.text())
      .then((code) => {
        const fn = new Function(code);
        fn();
        resolve();
      })
      .catch(reject);
  });
}

async function runCode(req: RunRequest): Promise<void> {
  if (!pyodide) {
    try {
      await (loadPromise ??= initPyodide());
    } catch {
      postMessage({
        type: "run-result",
        id: req.id,
        stdout: "",
        stderr: "",
        error: { name: "RuntimeError", message: "Python runtime failed to load." },
        durationMs: 0,
      });
      return;
    }
  }

  const stdout: string[] = [];
  const stderr: string[] = [];

  pyodide!.setStdout({ batched: (t) => stdout.push(t) });
  pyodide!.setStderr({ batched: (t) => stderr.push(t) });

  const start = performance.now();
  let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

  const timeoutPromise = new Promise<"timeout">((resolve) => {
    timeoutHandle = setTimeout(() => resolve("timeout"), req.timeoutMs);
  });

  const runPromise = (async () => {
    await pyodide!.loadPackagesFromImports(req.code);
    await pyodide!.runPythonAsync(req.code);
    return "done" as const;
  })();

  try {
    const result = await Promise.race([runPromise, timeoutPromise]);
    if (timeoutHandle) clearTimeout(timeoutHandle);

    if (result === "timeout") {
      postMessage({ type: "run-timeout", id: req.id });
      return;
    }

    postMessage({
      type: "run-result",
      id: req.id,
      stdout: stdout.join(""),
      stderr: stderr.join(""),
      error: null,
      durationMs: Math.round(performance.now() - start),
    });
  } catch (e) {
    if (timeoutHandle) clearTimeout(timeoutHandle);
    const name = e instanceof Error ? e.constructor.name : "Error";
    const message = e instanceof Error ? e.message : String(e);
    const lineno = extractLineno(message);
    postMessage({
      type: "run-result",
      id: req.id,
      stdout: stdout.join(""),
      stderr: stderr.join(""),
      error: { name, message, ...(lineno !== undefined ? { lineno } : {}) },
      durationMs: Math.round(performance.now() - start),
    });
  }
}

function extractLineno(msg: string): number | undefined {
  const m = /line (\d+)/i.exec(msg);
  return m ? parseInt(m[1]!, 10) : undefined;
}

self.addEventListener("message", (event: MessageEvent<WorkerMessage>) => {
  const msg = event.data;
  if (msg.type === "load") {
    loadPromise = initPyodide();
    return;
  }
  if (msg.type === "run") {
    void runCode(msg);
    return;
  }
});

loadPromise = initPyodide();
