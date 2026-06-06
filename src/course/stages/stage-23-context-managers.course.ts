import type { Stage } from "@/course/course.schema";

export const stage23 = {
  id: "stage-23",
  number: 23,
  title: "Context Managers and Resource Management",
  summary:
    "Master context managers and resource management through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["context-manager"],
  lessons: [
    {
      id: "s23-resource-lifetime",
      stageId: "stage-23",
      title: "Resource Lifetime",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of context managers",
        "Apply context managers in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["context-manager"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Resource Lifetime\n\nA **resource** is anything that must be acquired and released — a file, network connection, database cursor, or lock. If you acquire a resource and then an exception occurs before you release it, the resource leaks.\n\nContext managers solve this by guaranteeing cleanup code runs even when exceptions occur. The \`with\` statement provides this guarantee.",
        },
        {
          kind: "why-matters",
          body: "Understanding context managers is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s23-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Resource Lifetime?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["context-manager"],
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
          id: "s23-i2",
          kind: "plain-language-explain",
          prompt: "Explain Resource Lifetime in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["context-manager"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Resource Lifetime is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s23-i1", "s23-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s23-project",
    stageId: "stage-23",
    title: "Context-Manager Project",
    brief: "Build a set of reusable context managers for database connections, file locking, and temporary state management.",
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
    conceptIds: ["context-manager"],
    difficulty: "intermediate",
  },
} satisfies Stage;
