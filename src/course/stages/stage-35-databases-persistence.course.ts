import type { Stage } from "@/course/course.schema";

export const stage35 = {
  id: "stage-35",
  number: 35,
  title: "Databases, Persistence, and Local Storage",
  summary:
    "Master databases, persistence, and local storage through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["sqlite-database"],
  lessons: [
    {
      id: "s35-persistence-concepts",
      stageId: "stage-35",
      title: "Persistence Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of databases",
        "Apply databases in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["sqlite-database"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Persistence Concepts\n\n**Persistence** means data survives after the program exits. Python provides several persistence options:\n\n- **Files** — JSON, CSV, plain text (simple, human-readable)\n- **SQLite** — an embedded SQL database (structured, queryable, no server needed)\n- **Shelve** — key-value store backed by a file (simple, Python-native)\n- **Pickle** — binary serialization (fast, Python-only)\n\nFor structured data that needs querying, SQLite via the \`sqlite3\` module is the best local option.",
        },
        {
          kind: "why-matters",
          body: "Understanding databases is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s35-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Persistence Concepts?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["sqlite-database"],
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
          id: "s35-i2",
          kind: "plain-language-explain",
          prompt: "Explain Persistence Concepts in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["sqlite-database"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Persistence Concepts is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s35-i1", "s35-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s35-project",
    stageId: "stage-35",
    title: "Database-Backed CLI Application",
    brief: "Build a contact management CLI that stores data in SQLite, with full CRUD operations and parameterized queries.",
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
    conceptIds: ["sqlite-database"],
    difficulty: "intermediate",
  },
} satisfies Stage;
