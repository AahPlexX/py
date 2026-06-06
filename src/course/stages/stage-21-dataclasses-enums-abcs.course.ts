import type { Stage } from "@/course/course.schema";

export const stage21 = {
  id: "stage-21",
  number: 21,
  title: "Dataclasses, Enums, ABCs, and Structured Models",
  summary:
    "Master dataclasses, enums, abcs, and structured models through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["dataclass"],
  lessons: [
    {
      id: "s21-dataclasses-dataclass",
      stageId: "stage-21",
      title: "dataclasses.dataclass",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of dataclass",
        "Apply dataclass in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## dataclasses.dataclass\n\nThe \`@dataclass\` decorator automatically generates \`__init__\`, \`__repr__\`, and \`__eq__\` for a class based on its field annotations.\n\n\`\`\`python\nfrom dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\np = Point(1.0, 2.0)\nprint(p)  # Point(x=1.0, y=2.0)\n\`\`\`\n\nThis eliminates boilerplate while keeping your data structures clear and typed.",
        },
        {
          kind: "why-matters",
          body: "Understanding dataclass is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s21-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of dataclasses.dataclass?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["dataclass"],
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
          id: "s21-i2",
          kind: "plain-language-explain",
          prompt: "Explain dataclasses.dataclass in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["dataclass"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "dataclasses.dataclass is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s21-i1", "s21-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s21-project",
    stageId: "stage-21",
    title: "Model Design Project",
    brief: "Design a domain model using dataclasses, enums, and ABCs for a task management application.",
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
    conceptIds: ["dataclass"],
    difficulty: "intermediate",
  },
} satisfies Stage;
