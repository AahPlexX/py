import { CheckCircle, Lock, Trophy } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { ProgressBar } from "@/shared/ui/ProgressBar";

interface MasteryGateProps {
  lessonId: string;
  masteryFraction: number;
  requiredFraction: number;
  onUnlock?: () => void;
  projectTitle?: string;
}

export function MasteryGate({
  masteryFraction,
  requiredFraction,
  onUnlock,
  projectTitle,
}: MasteryGateProps) {
  const passed = masteryFraction >= requiredFraction;
  const percent = Math.round(masteryFraction * 100);
  const requiredPercent = Math.round(requiredFraction * 100);

  if (passed) {
    return (
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-accent-success)] bg-[var(--color-accent-success-subtle)] p-6">
        <div className="flex items-center gap-3 mb-3">
          <Trophy
            className="size-5 text-[var(--color-accent-success)]"
            aria-hidden="true"
          />
          <h3 className="text-base font-semibold text-[var(--color-accent-success)]">
            Lesson complete!
          </h3>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          You passed {percent}% of the checks. Well done.
        </p>
        {projectTitle && onUnlock && (
          <div className="flex items-center gap-3">
            <CheckCircle
              className="size-4 text-[var(--color-accent-success)]"
              aria-hidden="true"
            />
            <span className="text-sm text-[var(--color-text-secondary)]">
              Project unlocked:
            </span>
            <Button variant="primary" size="sm" onClick={onUnlock}>
              {projectTitle}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-2)] p-6">
      <div className="flex items-center gap-3 mb-3">
        <Lock
          className="size-5 text-[var(--color-text-muted)]"
          aria-hidden="true"
        />
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          Mastery gate
        </h3>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        Complete at least {requiredPercent}% of the checks to finish this
        lesson. You're at {percent}%.
      </p>
      <ProgressBar
        value={percent}
        max={100}
        label={`Mastery progress: ${percent}%`}
        showLabel
        variant={percent >= requiredPercent ? "success" : "default"}
      />
    </div>
  );
}
