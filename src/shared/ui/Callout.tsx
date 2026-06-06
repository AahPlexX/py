import {
  AlertCircle,
  CheckCircle,
  Info,
  Lightbulb,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { HTMLAttributes } from "react";

type CalloutVariant = "info" | "warning" | "tip" | "danger" | "success";

interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CalloutVariant;
  title: string;
}

const config: Record<
  CalloutVariant,
  { icon: LucideIcon; colorClass: string; titleClass: string; borderClass: string }
> = {
  info: {
    icon: Info,
    colorClass: "bg-[var(--color-accent-info-subtle)]",
    titleClass: "text-[var(--color-accent-info)]",
    borderClass: "border-l-[var(--color-accent-info)]",
  },
  warning: {
    icon: TriangleAlert,
    colorClass: "bg-[var(--color-accent-warning-subtle)]",
    titleClass: "text-[var(--color-accent-warning)]",
    borderClass: "border-l-[var(--color-accent-warning)]",
  },
  tip: {
    icon: Lightbulb,
    colorClass: "bg-[var(--color-accent-primary-subtle)]",
    titleClass: "text-[var(--color-accent-primary)]",
    borderClass: "border-l-[var(--color-accent-primary)]",
  },
  danger: {
    icon: AlertCircle,
    colorClass: "bg-[var(--color-accent-danger-subtle)]",
    titleClass: "text-[var(--color-accent-danger)]",
    borderClass: "border-l-[var(--color-accent-danger)]",
  },
  success: {
    icon: CheckCircle,
    colorClass: "bg-[var(--color-accent-success-subtle)]",
    titleClass: "text-[var(--color-accent-success)]",
    borderClass: "border-l-[var(--color-accent-success)]",
  },
};

export function Callout({
  variant = "info",
  title,
  children,
  className = "",
  ...props
}: CalloutProps) {
  const { icon: Icon, colorClass, titleClass, borderClass } = config[variant];

  return (
    <div
      role="note"
      aria-label={`${variant}: ${title}`}
      className={[
        "flex gap-3 p-4 rounded-[var(--radius-lg)] border-l-4",
        colorClass,
        borderClass,
        className,
      ].join(" ")}
      {...props}
    >
      <Icon
        className={["mt-0.5 size-4 flex-none", titleClass].join(" ")}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className={["text-sm font-semibold mb-1", titleClass].join(" ")}>
          {title}
        </p>
        {children && (
          <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
