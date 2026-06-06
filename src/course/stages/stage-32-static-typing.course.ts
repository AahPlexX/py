import type { Stage } from "@/course/course.schema";

export const stage32 = {
  id: "stage-32",
  number: 32,
  title: "Static Typing and Type System Mastery",
  summary:
    "Master static typing and type system mastery through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["type-annotations"],
  lessons: [
    {
      id: "s32-why-static-typing-exists",
      stageId: "stage-32",
      title: "Why Static Typing Exists",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of type system",
        "Apply type system in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["type-annotations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Why Static Typing Exists\n\nPython is dynamically typed — type errors only appear at runtime. Static typing adds **optional type annotations** that type checkers (mypy, pyright) verify **before** running code.\n\nBenefits:\n- Catch type errors early in development\n- Serve as machine-checked documentation\n- Enable better IDE autocompletion\n- Make large codebases easier to navigate and refactor\n\nAnnotations are hints to tools — Python ignores them at runtime.",
        },
        {
          kind: "why-matters",
          body: "Understanding type system is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s32-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Why Static Typing Exists?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["type-annotations"],
          options: [
            {
              id: "a",
              text: "To organize code into reusable units",
              isCorrect: false,
              explanation: "That describes modules and functions, not specifically this concept.",
            },
            {
              id: "b",
              text: "The core purpose described in this lesson",
              isCorrect: true,
              explanation: "Correct! Review the lesson content to confirm your understanding.",
            },
            {
              id: "c",
              text: "To handle runtime errors",
              isCorrect: false,
              explanation: "Error handling uses exceptions, not this concept.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Re-read the opening paragraph of the lesson.",
            },
          ],
          feedback: {
            correct: "Great! You understand the core purpose.",
            incorrect: "Review the lesson content and try again.",
          },
        },
        {
          id: "s32-i2",
          kind: "plain-language-explain",
          prompt: "Explain Why Static Typing Exists in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["type-annotations"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Why Static Typing Exists is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Start with the definition, then give an example.",
            },
          ],
          feedback: {
            correct: "Excellent explanation!",
            incorrect: "Try to include the definition, why it matters, and an example.",
          },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s32-i1", "s32-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s32-project",
    stageId: "stage-32",
    title: "Library Typing Project",
    brief: "Add complete type annotations to an untyped Python library and configure mypy to enforce strict type checking.",
    requirements: [
      "Implement the core functionality using concepts from this stage",
      "Handle error cases gracefully",
      "Write clear, readable code",
      "Add type annotations to all public functions",
    ],
    acceptanceCriteria: [
      "All core features work correctly",
      "Code passes a basic review for readability",
      "Type annotations are present and accurate",
    ],
    conceptIds: ["type-annotations"],
    difficulty: "advanced",
  },
} satisfies Stage;
