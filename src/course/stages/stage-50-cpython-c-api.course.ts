import type { Stage } from "@/course/course.schema";

export const stage50 = {
  id: "stage-50",
  number: 50,
  title: "CPython, C API, Extensions, and Embedding",
  summary:
    "Master cpython, c api, extensions, and embedding through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["cpython-internals"],
  lessons: [
    {
      id: "s50-python-implementation-vs-language",
      stageId: "stage-50",
      title: "Python Implementation vs Language",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of cpython",
        "Apply cpython in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["cpython-internals"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Python Implementation vs Language\n\n**Python the language** is a specification: the syntax, semantics, and behavior documented in the Python Reference Manual. Multiple programs implement this specification.\n\n**CPython** is the reference implementation — the C program that most people run when they type \`python\`. It:\n- Compiles Python source to bytecode\n- Executes bytecode in a virtual machine\n- Manages memory with reference counting and a cyclic garbage collector\n- Provides the Python/C API for extensions",
        },
        {
          kind: "why-matters",
          body: "Understanding cpython is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s50-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Python Implementation vs Language?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["cpython-internals"],
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
          id: "s50-i2",
          kind: "plain-language-explain",
          prompt: "Explain Python Implementation vs Language in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["cpython-internals"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Python Implementation vs Language is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s50-i1", "s50-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s50-project",
    stageId: "stage-50",
    title: "Native Extension Project",
    brief: "Write a C extension module that implements a performance-critical function and packages it for distribution.",
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
    conceptIds: ["cpython-internals"],
    difficulty: "advanced",
  },
} satisfies Stage;
