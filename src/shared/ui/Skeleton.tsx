import type { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
}

export function Skeleton({
  width,
  height,
  className = "",
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "rounded-[var(--radius-md)] bg-[var(--color-bg-emphasis)] animate-pulse",
        className,
      ].join(" ")}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

export function LessonCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] p-5 space-y-3">
      <Skeleton height="1rem" width="60%" />
      <Skeleton height="0.75rem" width="80%" />
      <Skeleton height="0.75rem" width="40%" />
      <div className="flex gap-2 pt-1">
        <Skeleton height="1.5rem" width="4rem" className="rounded-full" />
        <Skeleton height="1.5rem" width="5rem" className="rounded-full" />
      </div>
    </div>
  );
}

export function LessonReaderSkeleton() {
  return (
    <div className="space-y-4 max-w-prose">
      <Skeleton height="2rem" width="70%" />
      <Skeleton height="0.875rem" width="90%" />
      <Skeleton height="0.875rem" width="85%" />
      <Skeleton height="0.875rem" width="75%" />
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] p-4 space-y-2">
        <Skeleton height="0.875rem" width="50%" />
        <Skeleton height="0.875rem" width="70%" />
        <Skeleton height="0.875rem" width="60%" />
      </div>
      <Skeleton height="0.875rem" width="80%" />
      <Skeleton height="0.875rem" width="65%" />
    </div>
  );
}
