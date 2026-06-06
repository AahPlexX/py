import type { Stage } from "@/course/course.schema";

export const stage41 = {
  id: "stage-41",
  number: 41,
  title: "Introspection, Reflection, and Metaprogramming",
  summary:
    "Master introspection, reflection, and metaprogramming through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["python-introspection"],
  lessons: [
    {
      id: "s41-id-function",
      stageId: "stage-41",
      title: "id() and Object Identity",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of metaprogramming",
        "Apply metaprogramming in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["python-introspection"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## id() and Object Identity\n\n\`id()\` returns the unique identity of an object — a guaranteed-unique integer for the object's lifetime.\n\n\`\`\`python\nx = [1, 2, 3]\ny = x          # same object\nz = [1, 2, 3]  # different object\n\nprint(id(x) == id(y))  # True — same object\nprint(id(x) == id(z))  # False — different objects\n\`\`\`\n\nIntrospection means examining objects at runtime to discover their type, attributes, methods, and structure.",
        },
        {
          kind: "why-matters",
          body: "Understanding metaprogramming is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s41-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of id() and Object Identity?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["python-introspection"],
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
          id: "s41-i2",
          kind: "plain-language-explain",
          prompt: "Explain id() and Object Identity in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["python-introspection"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "id() and Object Identity is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s41-i1", "s41-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s41-project",
    stageId: "stage-41",
    title: "Metaprogramming Project",
    brief: "Build a runtime plugin registry using metaclasses and descriptors that automatically discovers and registers plugin classes.",
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
    conceptIds: ["python-introspection"],
    difficulty: "advanced",
  },
} satisfies Stage;
