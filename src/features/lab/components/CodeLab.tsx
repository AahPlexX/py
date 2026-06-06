import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Skeleton } from "@/shared/ui/Skeleton";
import { CodeOutput } from "./CodeOutput";
import { RunnerStatus } from "./RunnerStatus";
import {
  DEFAULT_TIMEOUT_MS,
  enrichError,
  type RunResult,
  type RunnerStatus as RunnerStatusType,
} from "../lib/runner-contracts";
import type { RunnerError } from "../lib/runner-errors";
import { formatRunnerError } from "../lib/runner-errors";

const CodeMirrorEditor = lazy(() =>
  import("@uiw/react-codemirror").then((m) => ({ default: m.default }))
);

interface CodeLabProps {
  starterCode: string;
  task: string;
  pyodideCompatible?: boolean;
  onResult?: (result: RunResult) => void;
  readOnly?: boolean;
  label?: string;
}

type WorkerMessage =
  | { type: "ready" }
  | { type: "loading" }
  | { type: "load-error"; message: string }
  | {
      type: "run-result";
      id: string;
      stdout: string;
      stderr: string;
      error: { name: string; message: string; lineno?: number } | null;
      durationMs: number;
    }
  | { type: "run-timeout"; id: string };

export function CodeLab({
  starterCode,
  task,
  pyodideCompatible = true,
  onResult,
  readOnly = false,
  label = "Python code editor",
}: CodeLabProps) {
  const [code, setCode] = useState(starterCode);
  const [runnerStatus, setRunnerStatus] = useState<RunnerStatusType>("idle");
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [runnerError, setRunnerError] = useState<RunnerError | null>(null);
  const [lastRunDurationMs, setLastRunDurationMs] = useState<
    number | undefined
  >(undefined);

  const workerRef = useRef<Worker | null>(null);
  const pendingRunId = useRef<string | null>(null);

  useEffect(() => {
    if (!pyodideCompatible) return;

    const worker = new Worker(
      new URL("../workers/pyodide.worker.ts", import.meta.url),
      { type: "module" }
    );

    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const msg = event.data;
      switch (msg.type) {
        case "loading":
          setRunnerStatus("loading");
          break;
        case "ready":
          setRunnerStatus("ready");
          break;
        case "load-error":
          setRunnerStatus("load-error");
          setRunnerError({ kind: "load-failed", message: msg.message });
          break;
        case "run-result":
          if (msg.id !== pendingRunId.current) break;
          pendingRunId.current = null;
          setRunnerStatus("ready");
          const result: RunResult = {
            stdout: msg.stdout,
            stderr: msg.stderr,
            error: msg.error ? enrichError(msg.error) : null,
            durationMs: msg.durationMs,
          };
          setRunResult(result);
          setLastRunDurationMs(msg.durationMs);
          onResult?.(result);
          break;
        case "run-timeout":
          if (msg.id !== pendingRunId.current) break;
          pendingRunId.current = null;
          setRunnerStatus("ready");
          setRunnerError({
            kind: "timeout",
            timeoutMs: DEFAULT_TIMEOUT_MS,
          });
          break;
      }
    };

    worker.onerror = (e) => {
      setRunnerStatus("load-error");
      setRunnerError({ kind: "worker-crashed", message: e.message });
    };

    workerRef.current = worker;
    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, [pyodideCompatible, onResult]);

  const handleRun = useCallback(() => {
    if (!workerRef.current || runnerStatus === "running") return;
    const id = `run-${Date.now()}`;
    pendingRunId.current = id;
    setRunnerStatus("running");
    setRunResult(null);
    setRunnerError(null);
    workerRef.current.postMessage({
      type: "run",
      id,
      code,
      timeoutMs: DEFAULT_TIMEOUT_MS,
    });
  }, [code, runnerStatus]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    setRunResult(null);
    setRunnerError(null);
  }, [starterCode]);

  const isRunning = runnerStatus === "running";
  const canRun =
    pyodideCompatible &&
    runnerStatus !== "running" &&
    runnerStatus !== "loading" &&
    runnerStatus !== "load-error";

  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
        {task}
      </p>

      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-default)] overflow-hidden bg-[var(--color-code-bg)]">
        <Suspense
          fallback={
            <div className="p-4">
              <Skeleton height="8rem" />
            </div>
          }
        >
          <CodeMirrorEditor
            value={code}
            onChange={setCode}
            readOnly={readOnly}
            aria-label={label}
            extensions={[]}
            theme="dark"
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: true,
              closeBrackets: true,
              autocompletion: false,
              highlightActiveLine: true,
            }}
            style={{
              fontSize: "var(--font-size-sm)",
              fontFamily: "var(--font-family-mono)",
              minHeight: "8rem",
            }}
          />
        </Suspense>

        <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-subtle)]">
          <RunnerStatus
            status={runnerStatus}
            {...(lastRunDurationMs !== undefined && { durationMs: lastRunDurationMs })}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              aria-label="Reset code to starter"
              leftIcon={<RotateCcw className="size-3.5" />}
            >
              Reset
            </Button>
            {pyodideCompatible ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleRun}
                disabled={!canRun}
                loading={isRunning}
                leftIcon={<Play className="size-3.5" />}
                aria-label="Run Python code"
              >
                Run
              </Button>
            ) : (
              <span className="text-xs text-[var(--color-text-muted)] italic">
                Read-only in browser
              </span>
            )}
          </div>
        </div>
      </div>

      {runnerError && (
        <div
          role="alert"
          className="rounded-[var(--radius-lg)] bg-[var(--color-accent-danger-subtle)] border border-[var(--color-accent-danger)] p-3"
        >
          <p className="text-sm text-[var(--color-accent-danger)]">
            {formatRunnerError(runnerError)}
          </p>
        </div>
      )}

      <CodeOutput result={runResult} isEmpty={runResult === null && !runnerError} />
    </div>
  );
}
