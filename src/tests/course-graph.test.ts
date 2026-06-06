import { describe, it, expect } from "vitest";
import { courseRegistry } from "@/course/course.registry";
import { CourseSchema } from "@/course/course.schema";

describe("course-graph integrity", () => {
  it("passes full CourseSchema validation", () => {
    const result = CourseSchema.safeParse(courseRegistry);
    if (!result.success) {
      const issues = result.error.issues
        .slice(0, 5)
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("\n");
      throw new Error(`Course schema validation failed:\n${issues}`);
    }
    expect(result.success).toBe(true);
  });

  it("has exactly 16 stages", () => {
    expect(courseRegistry.stages).toHaveLength(16);
  });

  it("stages are numbered 1–16 sequentially", () => {
    courseRegistry.stages.forEach((stage, idx) => {
      expect(stage.number).toBe(idx + 1);
    });
  });

  it("all stage IDs are unique", () => {
    const ids = courseRegistry.stages.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all lesson IDs across the course are unique", () => {
    const ids = courseRegistry.stages.flatMap((s) =>
      s.lessons.map((l) => l.id)
    );
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length > 0) {
      throw new Error(`Duplicate lesson IDs found: ${dupes.join(", ")}`);
    }
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all interaction IDs within each lesson are unique", () => {
    for (const stage of courseRegistry.stages) {
      for (const lesson of stage.lessons) {
        const ids = lesson.interactions.map((i) => i.id);
        const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
        if (dupes.length > 0) {
          throw new Error(
            `Duplicate interaction IDs in lesson ${lesson.id}: ${dupes.join(", ")}`
          );
        }
        expect(new Set(ids).size).toBe(ids.length);
      }
    }
  });

  it("all prerequisite lesson IDs reference existing lessons", () => {
    const allLessonIds = new Set(
      courseRegistry.stages.flatMap((s) => s.lessons.map((l) => l.id))
    );
    for (const stage of courseRegistry.stages) {
      for (const lesson of stage.lessons) {
        for (const prereq of lesson.prerequisites) {
          if (!allLessonIds.has(prereq)) {
            throw new Error(
              `Lesson ${lesson.id} references unknown prerequisite: ${prereq}`
            );
          }
        }
      }
    }
  });

  it("every stage has at least one lesson", () => {
    for (const stage of courseRegistry.stages) {
      expect(stage.lessons.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("every lesson has at least one content block and one interaction", () => {
    for (const stage of courseRegistry.stages) {
      for (const lesson of stage.lessons) {
        expect(lesson.contentBlocks.length).toBeGreaterThanOrEqual(1);
        expect(lesson.interactions.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("every stage has a project with required fields", () => {
    for (const stage of courseRegistry.stages) {
      expect(stage.project.id).toBeTruthy();
      expect(stage.project.title).toBeTruthy();
      expect(stage.project.brief).toBeTruthy();
      expect(stage.project.requirements.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("mastery criteria reference existing interaction IDs", () => {
    for (const stage of courseRegistry.stages) {
      for (const lesson of stage.lessons) {
        const interactionIds = new Set(lesson.interactions.map((i) => i.id));
        for (const reqId of lesson.masteryCriteria.requiredInteractionIds) {
          if (!interactionIds.has(reqId)) {
            throw new Error(
              `Lesson ${lesson.id} masteryCriteria references unknown interaction: ${reqId}`
            );
          }
        }
      }
    }
  });

  it("no lesson has a prerequisite of itself", () => {
    for (const stage of courseRegistry.stages) {
      for (const lesson of stage.lessons) {
        expect(lesson.prerequisites).not.toContain(lesson.id);
      }
    }
  });

  it("course has a valid pythonVersion", () => {
    expect(courseRegistry.pythonVersion).toMatch(/^\d+\.\d+(\.\d+)?$/);
  });

  it("prerequisite graph has no cycles (DFS check)", () => {
    const allLessons = new Map(
      courseRegistry.stages
        .flatMap((s) => s.lessons)
        .map((l) => [l.id, l.prerequisites])
    );

    function hasCycle(
      lessonId: string,
      visiting: Set<string>,
      visited: Set<string>
    ): boolean {
      if (visiting.has(lessonId)) return true;
      if (visited.has(lessonId)) return false;
      visiting.add(lessonId);
      const prereqs = allLessons.get(lessonId) ?? [];
      for (const prereq of prereqs) {
        if (hasCycle(prereq, visiting, visited)) return true;
      }
      visiting.delete(lessonId);
      visited.add(lessonId);
      return false;
    }

    const visited = new Set<string>();
    for (const id of allLessons.keys()) {
      if (!visited.has(id)) {
        const hasCycleResult = hasCycle(id, new Set(), visited);
        if (hasCycleResult) {
          throw new Error(`Cycle detected in prerequisite graph at: ${id}`);
        }
      }
    }
  });
});
