import { describe, it, expect, beforeEach } from "vitest";
import {
  loadProgress,
  makeEmptyProgress,
  markLessonComplete,
  markConceptMastered,
  recordInteractionResult,
  saveProgress,
  isLessonUnlocked,
  getLessonMasteryFraction,
  clearProgress,
} from "@/features/progress/lib/progress-store";
import { runMigrations } from "@/features/progress/lib/progress-migrations";

describe("progress-store", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty progress when nothing is stored", () => {
    const result = loadProgress();
    expect(result.status).toBe("empty");
    if (result.status === "empty") {
      expect(result.progress.completedLessonIds).toHaveLength(0);
      expect(result.progress.masteredConceptIds).toHaveLength(0);
    }
  });

  it("returns corrupt status for invalid JSON", () => {
    localStorage.setItem("pmc-progress", "{not json}");
    const result = loadProgress();
    expect(result.status).toBe("corrupt");
  });

  it("saves and loads progress round-trip", () => {
    const progress = makeEmptyProgress();
    const updated = markLessonComplete(progress, "s1-what-is-a-program");
    saveProgress(updated);
    const loaded = loadProgress();
    expect(loaded.status).toBe("ok");
    if (loaded.status === "ok") {
      expect(loaded.progress.completedLessonIds).toContain("s1-what-is-a-program");
    }
  });

  it("markLessonComplete is idempotent", () => {
    const p0 = makeEmptyProgress();
    const p1 = markLessonComplete(p0, "lesson-1");
    const p2 = markLessonComplete(p1, "lesson-1");
    expect(p2.completedLessonIds).toHaveLength(1);
  });

  it("markConceptMastered is idempotent", () => {
    const p0 = makeEmptyProgress();
    const p1 = markConceptMastered(p0, "variable");
    const p2 = markConceptMastered(p1, "variable");
    expect(p2.masteredConceptIds).toHaveLength(1);
  });

  it("recordInteractionResult tracks correct and incorrect", () => {
    const p0 = makeEmptyProgress();
    const p1 = recordInteractionResult(p0, "interaction-1", true);
    const p2 = recordInteractionResult(p1, "interaction-2", false);
    expect(p2.interactionResults["interaction-1"]).toBe(true);
    expect(p2.interactionResults["interaction-2"]).toBe(false);
  });

  it("isLessonUnlocked returns true when prerequisites met", () => {
    const p0 = makeEmptyProgress();
    const p1 = markLessonComplete(p0, "lesson-a");
    expect(isLessonUnlocked(p1, ["lesson-a"])).toBe(true);
    expect(isLessonUnlocked(p1, ["lesson-b"])).toBe(false);
  });

  it("isLessonUnlocked returns true for empty prerequisites", () => {
    const p0 = makeEmptyProgress();
    expect(isLessonUnlocked(p0, [])).toBe(true);
  });

  it("getLessonMasteryFraction calculates correctly", () => {
    const p0 = makeEmptyProgress();
    const p1 = recordInteractionResult(p0, "i1", true);
    const p2 = recordInteractionResult(p1, "i2", true);
    const p3 = recordInteractionResult(p2, "i3", false);
    expect(getLessonMasteryFraction(p3, ["i1", "i2", "i3"])).toBeCloseTo(2 / 3);
  });

  it("getLessonMasteryFraction returns 1 for empty required array", () => {
    const p0 = makeEmptyProgress();
    expect(getLessonMasteryFraction(p0, [])).toBe(1);
  });

  it("clearProgress removes stored data", () => {
    const p = makeEmptyProgress();
    saveProgress(p);
    clearProgress();
    const result = loadProgress();
    expect(result.status).toBe("empty");
  });
});

describe("progress-migrations", () => {
  it("handles missing schemaVersion as v1", () => {
    const old = {
      activeLessonId: null,
      completedLessonIds: ["lesson-1"],
      masteredConceptIds: [],
      reviewQueue: [],
      assessmentResults: [],
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    const migrated = runMigrations(old) as Record<string, unknown>;
    expect(migrated["schemaVersion"]).toBe(2);
    expect(migrated["interactionResults"]).toBeDefined();
  });

  it("returns non-object input unchanged", () => {
    expect(runMigrations(null)).toBeNull();
    expect(runMigrations("invalid")).toBe("invalid");
  });

  it("does not overwrite existing fields during migration", () => {
    const v1 = {
      schemaVersion: 1,
      completedLessonIds: ["lesson-x"],
      masteredConceptIds: ["var"],
      activeLessonId: null,
      reviewQueue: [],
      assessmentResults: [],
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    const migrated = runMigrations(v1) as Record<string, unknown>;
    expect(
      (migrated["completedLessonIds"] as string[]).includes("lesson-x")
    ).toBe(true);
  });
});
