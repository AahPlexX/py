import { AlertCircle, CheckCircle, Clock, Loader, Zap } from "lucide-react";
import type { RunnerStatus as RunnerStatusType } from "../lib/runner-contracts";

interface RunnerStatusProps {
  status: RunnerStatusType;
  durationMs?: number;
}

export function RunnerStatus({ status, durationMs }: RunnerStatusProps) {
  if (status === "idle") return null;

  const configs = {
    loading: {
      icon: <Loader className="size-3.5 animate-spin" aria-hidden="true" />,
      text: "Loading Python runtime…",
      colorClass: "text-[var(--color-text-muted)]",
    },
    ready: {
      icon: <CheckCircle className="size-3.5" aria-hidden="true" />,
      text: "Python ready",
      colorClass: "text-[var(--color-accent-success)]",
    },
    running: {
      icon: <Loader className="size-3.5 animate-spin" aria-hidden="true" />,
      text: "Running…",
      colorClass: "text-[var(--color-accent-primary)]",
    },
    "load-error": {
      icon: <AlertCircle className="size-3.5" aria-hidden="true" />,
      text: "Runtime failed to load",
      colorClass: "text-[var(--color-accent-danger)]",
    },
  };

  const cfg = configs[status];

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "inline-flex items-center gap-1.5 text-xs font-medium",
        cfg.colorClass,
      ].join(" ")}
    >
      {cfg.icon}
      <span>{cfg.text}</span>
      {status === "ready" && durationMs !== undefined && (
        <span className="flex items-center gap-0.5 text-[var(--color-text-muted)] ml-1">
          <Zap className="size-3" aria-hidden="true" />
          <Clock className="size-3" aria-hidden="true" />
          {durationMs}ms
        </span>
      )}
    </div>
  );
}
