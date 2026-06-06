import type { Stage } from "@/course/course.schema";

export const stage31 = {
  id: "stage-31",
  number: 31,
  title: "Testing and Quality Assurance",
  summary:
    "Master testing and quality assurance through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["unit-testing"],
  lessons: [
    {
      id: "s31-test-purpose",
      stageId: "stage-31",
      title: "The Purpose of Tests",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of testing",
        "Apply testing in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["unit-testing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Purpose of Tests\n\nTests are automated checks that verify your code does what you expect. Without tests:\n- Changes break existing behavior silently\n- You must manually verify every feature after every change\n- You cannot safely refactor\n- Bugs reach users before you catch them\n\nWith tests, you get **confidence that changes work correctly** and **a safety net for refactoring**.",
        },
        {
          kind: "why-matters",
          body: "Understanding testing is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s31-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of The Purpose of Tests?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["unit-testing"],
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
          id: "s31-i2",
          kind: "plain-language-explain",
          prompt: "Explain The Purpose of Tests in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["unit-testing"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "The Purpose of Tests is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s31-i1", "s31-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s31-project",
    stageId: "stage-31",
    title: "Test Suite Project",
    brief: "Write a complete test suite for an existing Python module, covering happy paths, edge cases, and failure modes.",
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
    conceptIds: ["unit-testing"],
    difficulty: "intermediate",
  },
} satisfies Stage;
