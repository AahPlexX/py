import type { Stage } from "@/course/course.schema";

export const stage30 = {
  id: "stage-30",
  number: 30,
  title: "Logging, Diagnostics, Debugging, and Profiling",
  summary:
    "Master logging, diagnostics, debugging, and profiling through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["python-logging"],
  lessons: [
    {
      id: "s30-print-debugging-limits",
      stageId: "stage-30",
      title: "The Limits of print() Debugging",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of logging",
        "Apply logging in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["python-logging"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Limits of print() Debugging\n\nUsing \`print()\` for debugging works for small programs but breaks down quickly:\n- Print statements left in code create noise in production\n- You cannot control verbosity without editing code\n- Print output is not structured — it is hard to parse or filter\n- There is no severity level — debugging messages look like important warnings\n\nThe \`logging\` module solves all of these problems.",
        },
        {
          kind: "why-matters",
          body: "Understanding logging is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s30-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of The Limits of print() Debugging?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["python-logging"],
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
          id: "s30-i2",
          kind: "plain-language-explain",
          prompt: "Explain The Limits of print() Debugging in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["python-logging"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "The Limits of print() Debugging is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s30-i1", "s30-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s30-project",
    stageId: "stage-30",
    title: "Debugging and Profiling Workflow Project",
    brief: "Diagnose and fix performance issues in a provided Python program using logging, pdb, and profiling tools.",
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
    conceptIds: ["python-logging"],
    difficulty: "intermediate",
  },
} satisfies Stage;
