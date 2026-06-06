import { AlertCircle, CheckCircle, Terminal } from "lucide-react";
import { enrichError, type RunResult } from "../lib/runner-contracts";
import { formatPythonError } from "../lib/runner-errors";

interface CodeOutputProps {
  result: RunResult | null;
  isEmpty?: boolean;
}

export function CodeOutput({ result, isEmpty = false }: CodeOutputProps) {
  if (isEmpty || result === null) {
    return (
      <div
        aria-label="Code output — no output yet"
        className="flex items-center justify-center h-20 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-bg-subtle)]"
      >
        <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
          <Terminal className="size-4" aria-hidden="true" />
          <span>Output will appear here</span>
        </div>
      </div>
    );
  }

  const hasOutput = result.stdout.length > 0 || result.stderr.length > 0;
  const hasError = result.error !== null;
  const enrichedError = hasError ? enrichError(result.error!) : null;

  return (
    <div className="space-y-2" aria-label="Code output">
      {hasOutput && (
        <div
          className="rounded-[var(--radius-lg)] bg-[var(--color-code-bg)] border border-[var(--color-code-border)] p-4 overflow-x-auto"
          aria-label="Standard output"
        >
          {result.stdout && (
            <pre className="font-mono text-sm text-[var(--color-text-primary)] whitespace-pre-wrap">
              {result.stdout}
            </pre>
          )}
          {result.stderr && (
            <pre className="font-mono text-sm text-[var(--color-accent-warning)] whitespace-pre-wrap mt-2">
              {result.stderr}
            </pre>
          )}
        </div>
      )}

      {!hasError && !hasOutput && (
        <div className="flex items-center gap-2 text-[var(--color-accent-success)] text-sm py-2">
          <CheckCircle className="size-4" aria-hidden="true" />
          <span>Ran successfully — no output</span>
        </div>
      )}

      {enrichedError && (
        <div
          role="alert"
          className="rounded-[var(--radius-lg)] bg-[var(--color-accent-danger-subtle)] border border-[var(--color-accent-danger)] p-4 space-y-2"
        >
          <div className="flex items-start gap-2">
            <AlertCircle
              className="size-4 text-[var(--color-accent-danger)] mt-0.5 flex-none"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold text-[var(--color-accent-danger)]">
                {formatPythonError(enrichedError)}
              </p>
              {enrichedError.beginnerExplanation && (
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {enrichedError.beginnerExplanation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
