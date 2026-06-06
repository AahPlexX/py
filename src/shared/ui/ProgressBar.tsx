interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  showLabel?: boolean;
  size?: "sm" | "md";
  variant?: "default" | "success" | "warning";
}

const variantFillClass = {
  default: "bg-[var(--color-progress-fill)]",
  success: "bg-[var(--color-accent-success)]",
  warning: "bg-[var(--color-accent-warning)]",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showLabel = false,
  size = "md",
  variant = "default",
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const heightClass = size === "sm" ? "h-1" : "h-2";

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-[var(--color-text-secondary)]">
            {label}
          </span>
          <span className="text-xs font-medium text-[var(--color-text-secondary)]">
            {Math.round(percent)}%
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
        className={[
          "w-full rounded-[var(--radius-full)] bg-[var(--color-progress-track)] overflow-hidden",
          heightClass,
        ].join(" ")}
      >
        <div
          className={[
            "h-full rounded-[var(--radius-full)] transition-all duration-[var(--duration-slow)] ease-[var(--ease-default)]",
            variantFillClass[variant],
          ].join(" ")}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
