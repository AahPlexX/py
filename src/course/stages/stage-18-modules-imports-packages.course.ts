import type { Stage } from "@/course/course.schema";

export const stage18 = {
  id: "stage-18",
  number: 18,
  title: "Modules, Imports, Packages, and Environments",
  summary:
    "Master modules, imports, packages, and environments through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["module-import"],
  lessons: [
    {
      id: "s18-import-statement",
      stageId: "stage-18",
      title: "The import Statement",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of modules",
        "Apply modules in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["module-import"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The import Statement\n\nA **module** is a file containing Python definitions and statements. The \`import\` statement loads a module and makes its contents available.\n\n\`\`\`python\nimport math\nprint(math.sqrt(16))  # 4.0\n\`\`\`\n\nWhen Python sees \`import math\`, it searches \`sys.path\` for a file or package named \`math\`, executes it (once), and binds the name \`math\` in your current namespace.",
        },
        {
          kind: "why-matters",
          body: "Understanding modules is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s18-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of The import Statement?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["module-import"],
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
          id: "s18-i2",
          kind: "plain-language-explain",
          prompt: "Explain The import Statement in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["module-import"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "The import Statement is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s18-i1", "s18-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s18-project",
    stageId: "stage-18",
    title: "Modular Project Refactor",
    brief: "Refactor a monolithic Python script into a proper package structure with separate modules for I/O, business logic, and CLI.",
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
    conceptIds: ["module-import"],
    difficulty: "intermediate",
  },
} satisfies Stage;
