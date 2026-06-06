import type { Stage } from "@/course/course.schema";

export const stage48 = {
  id: "stage-48",
  number: 48,
  title: "Desktop, GUI, and User-Facing Applications",
  summary:
    "Master desktop, gui, and user-facing applications through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["gui-event-loop"],
  lessons: [
    {
      id: "s48-gui-event-loops",
      stageId: "stage-48",
      title: "GUI Event Loops",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of gui development",
        "Apply gui development in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["gui-event-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## GUI Event Loops\n\nA **GUI event loop** is the central mechanism of every desktop application. It continuously waits for events (mouse clicks, key presses, window resize) and dispatches them to handlers.\n\nThe key insight: **GUI code is event-driven, not sequential**. You do not write 'wait for button click, then do X'. Instead, you register a handler: 'when button is clicked, call X'.\n\nThis inversion of control is why GUI programming feels different from scripting.",
        },
        {
          kind: "why-matters",
          body: "Understanding gui development is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s48-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of GUI Event Loops?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["gui-event-loop"],
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
          id: "s48-i2",
          kind: "plain-language-explain",
          prompt: "Explain GUI Event Loops in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["gui-event-loop"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "GUI Event Loops is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s48-i1", "s48-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s48-project",
    stageId: "stage-48",
    title: "Desktop Utility Project",
    brief: "Build a desktop utility application with a GUI, configuration persistence, and proper event-driven architecture.",
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
    conceptIds: ["gui-event-loop"],
    difficulty: "advanced",
  },
} satisfies Stage;
