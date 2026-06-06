import type { Stage } from "@/course/course.schema";

export const stage24 = {
  id: "stage-24",
  number: 24,
  title: "Functional Programming Tools",
  summary:
    "Master functional programming tools through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["first-class-functions"],
  lessons: [
    {
      id: "s24-first-class-functions",
      stageId: "stage-24",
      title: "First-Class Functions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of functional programming",
        "Apply functional programming in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["first-class-functions"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## First-Class Functions\n\nIn Python, **functions are first-class objects** — they can be assigned to variables, passed as arguments to other functions, returned from functions, and stored in data structures.\n\n\`\`\`python\ndef greet(name: str) -> str:\n    return f'Hello, {name}!'\n\nsay_hello = greet  # function assigned to variable\nprint(say_hello('World'))  # Hello, World!\n\`\`\`\n\nThis enables powerful patterns like callbacks, higher-order functions, and decorators.",
        },
        {
          kind: "why-matters",
          body: "Understanding functional programming is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s24-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of First-Class Functions?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["first-class-functions"],
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
          id: "s24-i2",
          kind: "plain-language-explain",
          prompt: "Explain First-Class Functions in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["first-class-functions"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "First-Class Functions is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s24-i1", "s24-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s24-project",
    stageId: "stage-24",
    title: "Function Pipeline Project",
    brief: "Build a composable data transformation pipeline using higher-order functions, decorators, and functools utilities.",
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
    conceptIds: ["first-class-functions"],
    difficulty: "intermediate",
  },
} satisfies Stage;
