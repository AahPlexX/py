import { z } from "zod";
import { storageGet, storageSet } from "@/shared/lib/storage";
import { nowIso } from "@/shared/lib/time";
import { err, ok, type Result } from "@/shared/lib/result";
import { runMigrations } from "./progress-migrations";

const STORAGE_KEY = "pmc-progress";
const CURRENT_SCHEMA_VERSION = 2;

const ReviewQueueItemSchema = z.object({
  conceptId: z.string(),
  lessonId: z.string(),
  recallPrompt: z.string(),
  nextReviewAt: z.string(),
  intervalDays: z.number(),
  streak: z.number(),
});

const AssessmentResultSchema = z.object({
  assessmentId: z.string(),
  attemptedAt: z.string(),
  score: z.number(),
  passed: z.boolean(),
  conceptResults: z.record(z.string(), z.boolean()),
});

const ProgressSchema = z.object({
  schemaVersion: z.number(),
  activeLessonId: z.string().nullable(),
  completedLessonIds: z.array(z.string()),
  masteredConceptIds: z.array(z.string()),
  interactionResults: z.record(z.string(), z.boolean()),
  reviewQueue: z.array(ReviewQueueItemSchema),
  assessmentResults: z.array(AssessmentResultSchema),
  updatedAt: z.string(),
});

export type ReviewQueueItem = z.infer<typeof ReviewQueueItemSchema>;
export type AssessmentResult = z.infer<typeof AssessmentResultSchema>;
export type Progress = z.infer<typeof ProgressSchema>;

export type ProgressLoadResult =
  | { status: "ok"; progress: Progress }
  | { status: "empty"; progress: Progress }
  | { status: "corrupt"; rawJson: string };

export function makeEmptyProgress(): Progress {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    activeLessonId: null,
    completedLessonIds: [],
    masteredConceptIds: [],
    interactionResults: {},
    reviewQueue: [],
    assessmentResults: [],
    updatedAt: nowIso(),
  };
}

export function loadProgress(): ProgressLoadResult {
  const rawResult = storageGet(STORAGE_KEY, (v) => v);
  if (!rawResult.ok) {
    if (rawResult.error === "invalid") {
      return { status: "corrupt", rawJson: localStorage.getItem(STORAGE_KEY) ?? "" };
    }
    return { status: "empty", progress: makeEmptyProgress() };
  }

  const migrated = runMigrations(rawResult.value);

  const parsed = ProgressSchema.safeParse(migrated);
  if (!parsed.success) {
    return {
      status: "corrupt",
      rawJson: JSON.stringify(rawResult.value),
    };
  }
  return { status: "ok", progress: parsed.data };
}

export function saveProgress(progress: Progress): Result<void, string> {
  const updated: Progress = { ...progress, updatedAt: nowIso() };
  const result = storageSet(STORAGE_KEY, updated);
  return result.ok ? ok(undefined) : err("Failed to save progress");
}

export function markLessonComplete(
  progress: Progress,
  lessonId: string
): Progress {
  if (progress.completedLessonIds.includes(lessonId)) return progress;
  return {
    ...progress,
    completedLessonIds: [...progress.completedLessonIds, lessonId],
    activeLessonId: progress.activeLessonId === lessonId ? null : progress.activeLessonId,
  };
}

export function markConceptMastered(
  progress: Progress,
  conceptId: string
): Progress {
  if (progress.masteredConceptIds.includes(conceptId)) return progress;
  return {
    ...progress,
    masteredConceptIds: [...progress.masteredConceptIds, conceptId],
  };
}

export function recordInteractionResult(
  progress: Progress,
  interactionId: string,
  correct: boolean
): Progress {
  return {
    ...progress,
    interactionResults: { ...progress.interactionResults, [interactionId]: correct },
  };
}

export function setActiveLesson(
  progress: Progress,
  lessonId: string | null
): Progress {
  return { ...progress, activeLessonId: lessonId };
}

export function recordAssessmentResult(
  progress: Progress,
  result: AssessmentResult
): Progress {
  const existing = progress.assessmentResults.filter(
    (r) => r.assessmentId !== result.assessmentId
  );
  return { ...progress, assessmentResults: [...existing, result] };
}

export function exportProgress(progress: Progress): string {
  return JSON.stringify(progress, null, 2);
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently ignore storage errors.
  }
}

export function isLessonUnlocked(
  progress: Progress,
  prerequisites: readonly string[]
): boolean {
  return prerequisites.every((prereq) =>
    progress.completedLessonIds.includes(prereq)
  );
}

export function getLessonMasteryFraction(
  progress: Progress,
  requiredInteractionIds: readonly string[]
): number {
  if (requiredInteractionIds.length === 0) return 1;
  const correct = requiredInteractionIds.filter(
    (id) => progress.interactionResults[id] === true
  ).length;
  return correct / requiredInteractionIds.length;
}
