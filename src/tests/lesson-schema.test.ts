import { describe, it, expect } from "vitest";
import { LessonSchema } from "@/course/course.schema";

describe("lesson-schema validation", () => {
  it("rejects a lesson with empty id", () => {
    const result = LessonSchema.safeParse({
      id: "",
      stageId: "stage-01",
      title: "Test",
      kind: "concept",
      difficulty: "beginner",
      objectives: ["Do something"],
      prerequisites: [],
      concepts: ["program"],
      contentBlocks: [
        { kind: "text", markdown: "Hello" },
      ],
      interactions: [
        {
          id: "i1",
          kind: "multiple-choice",
          prompt: "What is it?",
          beginnerPurpose: "Learn it",
          expectedConceptIds: [],
          options: [
            { id: "a", text: "A", isCorrect: true },
            { id: "b", text: "B", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [],
          feedback: { correct: "Yes", incorrect: "No" },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["i1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejects a lesson id with spaces", () => {
    const result = LessonSchema.safeParse({
      id: "my lesson",
      stageId: "stage-01",
      title: "Test",
      kind: "concept",
      difficulty: "beginner",
      objectives: ["Do it"],
      prerequisites: [],
      concepts: [],
      contentBlocks: [{ kind: "text", markdown: "x" }],
      interactions: [
        {
          id: "i1",
          kind: "multiple-choice",
          prompt: "Q",
          beginnerPurpose: "P",
          expectedConceptIds: [],
          options: [
            { id: "a", text: "A", isCorrect: true },
            { id: "b", text: "B", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [],
          feedback: { correct: "Y", incorrect: "N" },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: [],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejects a lesson with no interactions", () => {
    const result = LessonSchema.safeParse({
      id: "valid-id",
      stageId: "stage-01",
      title: "Test",
      kind: "concept",
      difficulty: "beginner",
      objectives: ["Do it"],
      prerequisites: [],
      concepts: [],
      contentBlocks: [{ kind: "text", markdown: "x" }],
      interactions: [],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: [],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejects a lesson with no content blocks", () => {
    const result = LessonSchema.safeParse({
      id: "valid-id",
      stageId: "stage-01",
      title: "Test",
      kind: "concept",
      difficulty: "beginner",
      objectives: ["Do it"],
      prerequisites: [],
      concepts: [],
      contentBlocks: [],
      interactions: [
        {
          id: "i1",
          kind: "multiple-choice",
          prompt: "Q",
          beginnerPurpose: "P",
          expectedConceptIds: [],
          options: [
            { id: "a", text: "A", isCorrect: true },
            { id: "b", text: "B", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [],
          feedback: { correct: "Y", incorrect: "N" },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: [],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid predict-output interaction", () => {
    const result = LessonSchema.safeParse({
      id: "valid-lesson",
      stageId: "stage-01",
      title: "Test",
      kind: "concept",
      difficulty: "beginner",
      objectives: ["Learn something"],
      prerequisites: [],
      concepts: ["output"],
      contentBlocks: [{ kind: "text", markdown: "Some content here." }],
      interactions: [
        {
          id: "i-predict-1",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Practice reading output",
          expectedConceptIds: ["output"],
          code: 'print("Hello")',
          expectedOutput: "Hello",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "print() shows text on screen" },
          ],
          feedback: {
            correct: "Correct!",
            incorrect: "Not quite.",
          },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["i-predict-1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    });
    expect(result.success).toBe(true);
  });
});

describe("course-schema content blocks", () => {
  it("accepts all content block kinds", () => {
    const blocks = [
      { kind: "text", markdown: "Hello" },
      { kind: "code", language: "python", code: 'print("hi")', caption: "Example" },
      { kind: "callout", variant: "info", title: "Note", body: "Some text" },
      { kind: "output", text: "Hello", isError: false },
      {
        kind: "mental-model",
        title: "Box analogy",
        analogy: "Like a labeled box",
        explanation: "Variables store values",
      },
      { kind: "why-matters", body: "Because it matters" },
      {
        kind: "glossary-term",
        term: "variable",
        definition: "A named container",
        example: "x = 5",
      },
      {
        kind: "comparison",
        leftLabel: "Before",
        rightLabel: "After",
        leftCode: "x = 1",
        rightCode: "x = 2",
      },
    ];

    blocks.forEach((block) => {
      const result = LessonSchema.safeParse({
        id: "test-lesson",
        stageId: "stage-01",
        title: "Test",
        kind: "concept",
        difficulty: "beginner",
        objectives: ["Learn"],
        prerequisites: [],
        concepts: [],
        contentBlocks: [block],
        interactions: [
          {
            id: "i1",
            kind: "multiple-choice",
            prompt: "Q",
            beginnerPurpose: "P",
            expectedConceptIds: [],
            options: [
              { id: "a", text: "A", isCorrect: true },
              { id: "b", text: "B", isCorrect: false },
            ],
            allowMultiple: false,
            allowedAttempts: 2,
            hints: [],
            feedback: { correct: "Y", incorrect: "N" },
          },
        ],
        reviewHooks: [],
        masteryCriteria: {
          requiredInteractionIds: [],
          minimumCorrectFraction: 0.8,
          reviewHookIds: [],
        },
      });
      if (!result.success) {
        console.error("Block failed:", block.kind, result.error.issues);
      }
      expect(result.success).toBe(true);
    });
  });
});
