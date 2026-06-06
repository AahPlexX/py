import type { Stage } from "@/course/course.schema";

export const stage26 = {
  id: "stage-26",
  number: 26,
  title: "Numeric Computing, Math, and Precision",
  summary:
    "Master numeric computing, math, and precision through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["floating-point-precision"],
  lessons: [
    {
      id: "s26-floating-point-representation",
      stageId: "stage-26",
      title: "Floating-Point Representation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of numeric precision",
        "Apply numeric precision in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["floating-point-precision"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Floating-Point Representation\n\nFloating-point numbers are stored in binary (base-2), but most decimal fractions cannot be represented exactly in binary. This leads to representation errors.\n\n\`\`\`python\n>>> 0.1 + 0.2\n0.30000000000000004\n>>> 0.1 + 0.2 == 0.3\nFalse\n\`\`\`\n\nThis is not a Python bug — it is a fundamental property of IEEE 754 floating-point arithmetic used by virtually every programming language.",
        },
        {
          kind: "why-matters",
          body: "Understanding numeric precision is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s26-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Floating-Point Representation?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["floating-point-precision"],
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
          id: "s26-i2",
          kind: "plain-language-explain",
          prompt: "Explain Floating-Point Representation in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["floating-point-precision"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Floating-Point Representation is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s26-i1", "s26-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s26-project",
    stageId: "stage-26",
    title: "Precision-Sensitive Calculator",
    brief: "Build a financial calculator using the decimal module to avoid floating-point precision errors.",
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
    conceptIds: ["floating-point-precision"],
    difficulty: "intermediate",
  },
} satisfies Stage;
