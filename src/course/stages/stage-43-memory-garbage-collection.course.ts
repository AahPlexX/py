import type { Stage } from "@/course/course.schema";

export const stage43 = {
  id: "stage-43",
  number: 43,
  title: "Memory, Garbage Collection, and Object Lifetime",
  summary:
    "Master memory, garbage collection, and object lifetime through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["reference-counting"],
  lessons: [
    {
      id: "s43-object-references",
      stageId: "stage-43",
      title: "Object References",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of memory management",
        "Apply memory management in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["reference-counting"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Object References\n\nIn Python, **variables do not hold objects** — they hold **references** to objects. An object exists as long as at least one reference points to it.\n\n\`\`\`python\nx = [1, 2, 3]  # list object created, x references it\ny = x          # y also references the same list (ref count: 2)\ndel x          # x's reference removed (ref count: 1)\n# list still exists — y references it\ndel y          # ref count drops to 0 — object can be collected\n\`\`\`",
        },
        {
          kind: "why-matters",
          body: "Understanding memory management is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s43-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Object References?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["reference-counting"],
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
          id: "s43-i2",
          kind: "plain-language-explain",
          prompt: "Explain Object References in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["reference-counting"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Object References is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s43-i1", "s43-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s43-project",
    stageId: "stage-43",
    title: "Memory-Sensitive Refactor Project",
    brief: "Profile a memory-intensive application and refactor it to reduce memory usage using generators, slots, and weak references.",
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
    conceptIds: ["reference-counting"],
    difficulty: "advanced",
  },
} satisfies Stage;
