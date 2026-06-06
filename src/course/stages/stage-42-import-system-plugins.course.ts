import type { Stage } from "@/course/course.schema";

export const stage42 = {
  id: "stage-42",
  number: 42,
  title: "Import System, Runtime Loading, and Plugins",
  summary:
    "Master import system, runtime loading, and plugins through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["import-system"],
  lessons: [
    {
      id: "s42-import-system-overview",
      stageId: "stage-42",
      title: "Import System Overview",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of import system",
        "Apply import system in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["import-system"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Import System Overview\n\nWhen you write \`import foo\`, Python performs several steps:\n1. Checks \`sys.modules\` (cache) — if \`foo\` is already imported, returns it\n2. Searches **finders** in \`sys.meta_path\` to locate the module\n3. Uses a **loader** to load and execute the module source\n4. Stores the module in \`sys.modules\`\n5. Binds the name in the current namespace\n\nUnderstanding this process lets you customize imports for testing, plugins, and runtime loading.",
        },
        {
          kind: "why-matters",
          body: "Understanding import system is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s42-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Import System Overview?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["import-system"],
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
          id: "s42-i2",
          kind: "plain-language-explain",
          prompt: "Explain Import System Overview in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["import-system"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Import System Overview is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s42-i1", "s42-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s42-project",
    stageId: "stage-42",
    title: "Plugin System Project",
    brief: "Build an extensible application with a plugin system that discovers and loads plugins at runtime using entry points.",
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
    conceptIds: ["import-system"],
    difficulty: "advanced",
  },
} satisfies Stage;
