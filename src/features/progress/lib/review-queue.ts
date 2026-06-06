import type { Progress, ReviewQueueItem } from "./progress-store";
import { nowIso } from "@/shared/lib/time";

const INITIAL_INTERVAL_DAYS = 1;
const INTERVAL_MULTIPLIER = 2.5;
const MAX_INTERVAL_DAYS = 60;

export function addToReviewQueue(
  progress: Progress,
  item: Omit<ReviewQueueItem, "nextReviewAt" | "intervalDays" | "streak">
): Progress {
  const existing = progress.reviewQueue.findIndex(
    (r) => r.conceptId === item.conceptId && r.lessonId === item.lessonId
  );
  const newItem: ReviewQueueItem = {
    ...item,
    intervalDays: INITIAL_INTERVAL_DAYS,
    nextReviewAt: scheduledAt(INITIAL_INTERVAL_DAYS),
    streak: 0,
  };
  if (existing !== -1) {
    const updated = [...progress.reviewQueue];
    updated[existing] = newItem;
    return { ...progress, reviewQueue: updated };
  }
  return { ...progress, reviewQueue: [...progress.reviewQueue, newItem] };
}

export function advanceReviewItem(
  progress: Progress,
  conceptId: string,
  lessonId: string,
  correct: boolean
): Progress {
  const idx = progress.reviewQueue.findIndex(
    (r) => r.conceptId === conceptId && r.lessonId === lessonId
  );
  if (idx === -1) return progress;

  const item = progress.reviewQueue[idx]!;
  const nextInterval = correct
    ? Math.min(
        Math.ceil(item.intervalDays * INTERVAL_MULTIPLIER),
        MAX_INTERVAL_DAYS
      )
    : INITIAL_INTERVAL_DAYS;
  const nextStreak = correct ? item.streak + 1 : 0;

  const updated = [...progress.reviewQueue];
  updated[idx] = {
    ...item,
    intervalDays: nextInterval,
    nextReviewAt: scheduledAt(nextInterval),
    streak: nextStreak,
  };
  return { ...progress, reviewQueue: updated };
}

export function getDueReviewItems(progress: Progress): ReviewQueueItem[] {
  const now = new Date();
  return progress.reviewQueue
    .filter((item) => new Date(item.nextReviewAt) <= now)
    .sort(
      (a, b) =>
        new Date(a.nextReviewAt).getTime() - new Date(b.nextReviewAt).getTime()
    );
}

export function getUpcomingReviewItems(
  progress: Progress,
  withinDays: number
): ReviewQueueItem[] {
  const limit = new Date();
  limit.setDate(limit.getDate() + withinDays);
  return progress.reviewQueue
    .filter((item) => new Date(item.nextReviewAt) <= limit)
    .sort(
      (a, b) =>
        new Date(a.nextReviewAt).getTime() - new Date(b.nextReviewAt).getTime()
    );
}

function scheduledAt(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export { nowIso };
