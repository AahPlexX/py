import type { Stage } from "@/course/course.schema";

export const stage51 = {
  id: "stage-51",
  number: 51,
  title: "CPython Internals and Contributor Workflow",
  summary:
    "Master cpython internals and contributor workflow through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["cpython-contribution"],
  lessons: [
    {
      id: "s51-cpython-repository-structure",
      stageId: "stage-51",
      title: "CPython Repository Structure",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of cpython internals",
        "Apply cpython internals in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["cpython-contribution"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## CPython Repository Structure\n\nThe CPython repository is the source for the reference Python implementation. Its top-level structure:\n\n- \`Python/\` — the interpreter core (bytecode compiler, eval loop)\n- \`Objects/\` — built-in type implementations\n- \`Lib/\` — the standard library (Python source)\n- \`Modules/\` — built-in extension modules (C source)\n- \`Include/\` — public C headers\n- \`Doc/\` — documentation source\n- \`Tools/\` — developer utilities\n- \`Misc/\` — miscellaneous files",
        },
        {
          kind: "why-matters",
          body: "Understanding cpython internals is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s51-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of CPython Repository Structure?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["cpython-contribution"],
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
          id: "s51-i2",
          kind: "plain-language-explain",
          prompt: "Explain CPython Repository Structure in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["cpython-contribution"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "CPython Repository Structure is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s51-i1", "s51-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s51-project",
    stageId: "stage-51",
    title: "Core Contribution Project",
    brief: "Navigate the CPython codebase, contribute a documentation fix or small bug fix, and follow the full contribution workflow.",
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
    conceptIds: ["cpython-contribution"],
    difficulty: "advanced",
  },
} satisfies Stage;
