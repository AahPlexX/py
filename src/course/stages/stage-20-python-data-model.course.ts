import type { Stage } from "@/course/course.schema";

export const stage20 = {
  id: "stage-20",
  number: 20,
  title: "Python Data Model and Special Methods",
  summary:
    "Master python data model and special methods through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["special-methods"],
  lessons: [
    {
      id: "s20-data-model-overview",
      stageId: "stage-20",
      title: "Data Model Overview",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of dunder methods",
        "Apply dunder methods in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["special-methods"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Data Model Overview\n\nThe **Python data model** is the set of rules that govern how objects behave in the language. By implementing **special methods** (also called dunder methods — double underscore), your objects can participate in Python syntax.\n\nFor example, \`__len__\` makes \`len(obj)\` work, \`__add__\` makes \`obj + other\` work, and \`__iter__\` makes \`for x in obj\` work.",
        },
        {
          kind: "why-matters",
          body: "Understanding dunder methods is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s20-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Data Model Overview?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["special-methods"],
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
          id: "s20-i2",
          kind: "plain-language-explain",
          prompt: "Explain Data Model Overview in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["special-methods"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Data Model Overview is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s20-i1", "s20-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s20-project",
    stageId: "stage-20",
    title: "Data-Model Project",
    brief: "Build a custom collection class that implements the full sequence protocol using special methods.",
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
    conceptIds: ["special-methods"],
    difficulty: "advanced",
  },
} satisfies Stage;
