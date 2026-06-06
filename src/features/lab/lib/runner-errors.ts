import type { RunError } from "./runner-contracts";

export type RunnerError =
  | { kind: "load-failed"; message: string }
  | { kind: "timeout"; timeoutMs: number }
  | { kind: "worker-crashed"; message: string }
  | { kind: "unsupported-feature"; feature: string };

export function formatRunnerError(error: RunnerError): string {
  switch (error.kind) {
    case "load-failed":
      return `The Python runtime failed to load: ${error.message}. Check your internet connection and try again.`;
    case "timeout":
      return `Your code took longer than ${error.timeoutMs / 1000} seconds to run. Check for infinite loops.`;
    case "worker-crashed":
      return `The Python runtime crashed unexpectedly: ${error.message}. Your code has been preserved.`;
    case "unsupported-feature":
      return `This exercise uses ${error.feature}, which isn't supported in the browser runner yet. Read the explanation and complete the check instead.`;
  }
}

export function formatPythonError(error: RunError): string {
  const location = error.lineno ? ` (line ${error.lineno})` : "";
  return `${error.name}${location}: ${error.message}`;
}
