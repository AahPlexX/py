import type { Stage } from "@/course/course.schema";

export const stage36 = {
  id: "stage-36",
  number: 36,
  title: "Concurrency, Parallelism, and Async",
  summary:
    "Master concurrency, parallelism, and async through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["asyncio-coroutines"],
  lessons: [
    {
      id: "s36-sequential-execution",
      stageId: "stage-36",
      title: "Sequential Execution",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of concurrency",
        "Apply concurrency in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["asyncio-coroutines"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Sequential Execution\n\nBy default, Python runs code **sequentially** — one statement at a time, in order. This is simple and predictable, but can be slow when work involves **waiting**.\n\n**Two kinds of waiting:**\n1. **I/O-bound** — waiting for the network, disk, or user input. The CPU is idle while waiting.\n2. **CPU-bound** — intensive computation. The CPU is fully busy.\n\nDifferent concurrency approaches address different kinds of waiting.",
        },
        {
          kind: "why-matters",
          body: "Understanding concurrency is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s36-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Sequential Execution?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["asyncio-coroutines"],
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
          id: "s36-i2",
          kind: "plain-language-explain",
          prompt: "Explain Sequential Execution in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["asyncio-coroutines"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Sequential Execution is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s36-i1", "s36-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s36-project",
    stageId: "stage-36",
    title: "Concurrent Downloader and Async Pipeline",
    brief: "Build a concurrent file downloader using asyncio and an async data processing pipeline that handles multiple streams.",
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
    conceptIds: ["asyncio-coroutines"],
    difficulty: "advanced",
  },
} satisfies Stage;
