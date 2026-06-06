import type { Stage } from "@/course/course.schema";

export const stage25 = {
  id: "stage-25",
  number: 25,
  title: "Standard Library Data Structures and Algorithms",
  summary:
    "Master standard library data structures and algorithms through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["collections-counter"],
  lessons: [
    {
      id: "s25-collections-counter",
      stageId: "stage-25",
      title: "collections.Counter",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of stdlib collections",
        "Apply stdlib collections in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["collections-counter"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## collections.Counter\n\n\`collections.Counter\` is a dict subclass for counting hashable objects. Pass it an iterable and it counts occurrences automatically.\n\n\`\`\`python\nfrom collections import Counter\n\nwords = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']\ncounts = Counter(words)\nprint(counts)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})\nprint(counts.most_common(2))  # [('apple', 3), ('banana', 2)]\n\`\`\`",
        },
        {
          kind: "why-matters",
          body: "Understanding stdlib collections is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s25-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of collections.Counter?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["collections-counter"],
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
          id: "s25-i2",
          kind: "plain-language-explain",
          prompt: "Explain collections.Counter in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["collections-counter"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "collections.Counter is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s25-i1", "s25-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s25-project",
    stageId: "stage-25",
    title: "Data-Structure Selection Project",
    brief: "Solve a set of data processing problems, choosing the optimal standard library data structure for each.",
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
    conceptIds: ["collections-counter"],
    difficulty: "intermediate",
  },
} satisfies Stage;
