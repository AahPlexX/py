import type { Stage } from "@/course/course.schema";

export const stage22 = {
  id: "stage-22",
  number: 22,
  title: "Iterators, Generators, and Lazy Computation",
  summary:
    "Master iterators, generators, and lazy computation through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["generator-function"],
  lessons: [
    {
      id: "s22-iterable-vs-iterator",
      stageId: "stage-22",
      title: "Iterable vs Iterator",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of generators",
        "Apply generators in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["generator-function"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Iterable vs Iterator\n\nAn **iterable** is any object that can return an iterator — it implements \`__iter__\`. A **list**, **string**, **tuple**, and **dict** are all iterables.\n\nAn **iterator** is the object that does the actual work of stepping through elements — it implements both \`__iter__\` (returns itself) and \`__next__\` (returns the next item or raises \`StopIteration\`).\n\nAll iterators are iterables, but not all iterables are iterators.",
        },
        {
          kind: "why-matters",
          body: "Understanding generators is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s22-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Iterable vs Iterator?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["generator-function"],
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
          id: "s22-i2",
          kind: "plain-language-explain",
          prompt: "Explain Iterable vs Iterator in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["generator-function"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Iterable vs Iterator is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s22-i1", "s22-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s22-project",
    stageId: "stage-22",
    title: "Iterator Pipeline Project",
    brief: "Build a lazy data processing pipeline using generators that handles large datasets without loading them into memory.",
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
    conceptIds: ["generator-function"],
    difficulty: "advanced",
  },
} satisfies Stage;
