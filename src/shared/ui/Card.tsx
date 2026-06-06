import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "flush";
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: ReactNode;
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  const variantClass =
    variant === "elevated"
      ? "bg-[var(--color-surface-1)] shadow-[var(--shadow-md)] border-transparent"
      : variant === "flush"
        ? "bg-transparent border-transparent"
        : "bg-[var(--color-surface-1)] border-[var(--color-border-default)]";

  return (
    <div
      className={[
        "rounded-[var(--radius-xl)] border",
        variantClass,
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  actions,
  className = "",
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={[
        "flex items-start justify-between gap-4 px-6 py-5 border-b border-[var(--color-border-subtle)]",
        className,
      ].join(" ")}
      {...props}
    >
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] leading-snug">
          {title}
        </h3>
        {description && (
          <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex-none">{actions}</div>}
    </div>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: CardContentProps) {
  return (
    <div className={["px-6 py-5", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={[
        "px-6 py-4 border-t border-[var(--color-border-subtle)] flex items-center gap-3",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
