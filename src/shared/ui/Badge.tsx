import type { HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--color-bg-emphasis)] text-[var(--color-text-secondary)] border-[var(--color-border-default)]",
  primary:
    "bg-[var(--color-accent-primary-subtle)] text-[var(--color-accent-primary)] border-[var(--color-accent-primary)]",
  success:
    "bg-[var(--color-accent-success-subtle)] text-[var(--color-accent-success)] border-[var(--color-accent-success)]",
  warning:
    "bg-[var(--color-accent-warning-subtle)] text-[var(--color-accent-warning)] border-[var(--color-accent-warning)]",
  danger:
    "bg-[var(--color-accent-danger-subtle)] text-[var(--color-accent-danger)] border-[var(--color-accent-danger)]",
  info:
    "bg-[var(--color-accent-info-subtle)] text-[var(--color-accent-info)] border-[var(--color-accent-info)]",
  muted:
    "bg-transparent text-[var(--color-text-muted)] border-[var(--color-border-subtle)]",
};

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-full)]",
        "text-xs font-medium border",
        "leading-none whitespace-nowrap",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
