import type { Stage } from "@/course/course.schema";

export const stage19 = {
  id: "stage-19",
  number: 19,
  title: "Object-Oriented Programming",
  summary:
    "Master object-oriented programming through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["class-definition"],
  lessons: [
    {
      id: "s19-objects-and-identity",
      stageId: "stage-19",
      title: "Objects and Identity",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of oop",
        "Apply oop in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["class-definition"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Objects and Identity\n\nIn Python, **everything is an object** — numbers, strings, functions, and class instances all are objects. Every object has:\n- An **identity** (unique ID, obtained via \`id()\`)\n- A **type** (its class, obtained via \`type()\`)\n- A **value** (data it holds)\n\nClasses are blueprints for creating objects. When you write \`class Dog:\`, you define a new type.",
        },
        {
          kind: "why-matters",
          body: "Understanding oop is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s19-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Objects and Identity?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["class-definition"],
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
          id: "s19-i2",
          kind: "plain-language-explain",
          prompt: "Explain Objects and Identity in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["class-definition"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Objects and Identity is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s19-i1", "s19-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s19-project",
    stageId: "stage-19",
    title: "OOP Design Project",
    brief: "Design and implement a class hierarchy for a library catalog system, using inheritance, encapsulation, and composition.",
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
    conceptIds: ["class-definition"],
    difficulty: "intermediate",
  },
} satisfies Stage;
