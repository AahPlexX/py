import type { Stage } from "@/course/course.schema";

export const stage40 = {
  id: "stage-40",
  number: 40,
  title: "Project Architecture and Maintainable Application Design",
  summary:
    "Master project architecture and maintainable application design through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["layered-architecture"],
  lessons: [
    {
      id: "s40-requirements-breakdown",
      stageId: "stage-40",
      title: "Requirements Breakdown",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of software architecture",
        "Apply software architecture in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["layered-architecture"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Requirements Breakdown\n\nGood architecture starts with understanding requirements:\n\n1. **Functional requirements** — what the system must do\n2. **Non-functional requirements** — how the system must behave (performance, reliability, security)\n3. **Constraints** — what you cannot change (existing systems, team skills, budget)\n4. **Boundaries** — what is inside vs outside your system\n\nBreaking requirements down before writing code prevents building the wrong thing.",
        },
        {
          kind: "why-matters",
          body: "Understanding software architecture is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s40-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Requirements Breakdown?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["layered-architecture"],
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
          id: "s40-i2",
          kind: "plain-language-explain",
          prompt: "Explain Requirements Breakdown in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["layered-architecture"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Requirements Breakdown is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s40-i1", "s40-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s40-project",
    stageId: "stage-40",
    title: "Architecture Review Project",
    brief: "Design the architecture for a multi-component Python application, documenting boundaries, dependencies, and design decisions.",
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
    conceptIds: ["layered-architecture"],
    difficulty: "advanced",
  },
} satisfies Stage;
