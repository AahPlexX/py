import type { Stage } from "@/course/course.schema";

export const stage44 = {
  id: "stage-44",
  number: 44,
  title: "Performance Engineering",
  summary:
    "Master performance engineering through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["performance-measurement"],
  lessons: [
    {
      id: "s44-correctness-before-performance",
      stageId: "stage-44",
      title: "Correctness Before Performance",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of performance",
        "Apply performance in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["performance-measurement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Correctness Before Performance\n\nThe first rule of optimization: **make it work, then make it fast**.\n\nOptimizing incorrect code is wasteful — you are making the wrong thing faster. Premature optimization creates complexity without benefit, because:\n1. You do not know where the bottleneck is until you measure\n2. The bottleneck is rarely where you expect\n3. 90% of time is usually spent in 10% of code\n\nAlways profile first, then optimize the measured hot path.",
        },
        {
          kind: "why-matters",
          body: "Understanding performance is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s44-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Correctness Before Performance?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["performance-measurement"],
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
          id: "s44-i2",
          kind: "plain-language-explain",
          prompt: "Explain Correctness Before Performance in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["performance-measurement"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Correctness Before Performance is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s44-i1", "s44-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s44-project",
    stageId: "stage-44",
    title: "Optimization Project",
    brief: "Profile a slow Python program, identify bottlenecks, and apply algorithmic and implementation improvements to meet a performance budget.",
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
    conceptIds: ["performance-measurement"],
    difficulty: "advanced",
  },
} satisfies Stage;
