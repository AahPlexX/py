import type { Stage } from "@/course/course.schema";

export const stage49 = {
  id: "stage-49",
  number: 49,
  title: "Documentation, Style, Maintainability, and Team Practices",
  summary:
    "Master documentation, style, maintainability, and team practices through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["pep8-style"],
  lessons: [
    {
      id: "s49-pep-8-style",
      stageId: "stage-49",
      title: "PEP 8 Style Guide",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of code style",
        "Apply code style in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["pep8-style"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## PEP 8 Style Guide\n\n**PEP 8** is the style guide for Python code, written by Guido van Rossum. Consistent style makes code more readable and reduces cognitive load when reading unfamiliar code.\n\nKey PEP 8 rules:\n- 4 spaces per indentation level (no tabs)\n- Lines no longer than 79 characters (or 99 for modern projects)\n- Two blank lines between top-level definitions\n- One blank line between methods\n- Imports at the top, one per line, grouped (stdlib, third-party, local)",
        },
        {
          kind: "why-matters",
          body: "Understanding code style is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s49-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of PEP 8 Style Guide?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["pep8-style"],
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
          id: "s49-i2",
          kind: "plain-language-explain",
          prompt: "Explain PEP 8 Style Guide in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["pep8-style"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "PEP 8 Style Guide is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s49-i1", "s49-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s49-project",
    stageId: "stage-49",
    title: "Documentation Project",
    brief: "Document an existing Python library from scratch: docstrings, README, API reference, and changelog.",
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
    conceptIds: ["pep8-style"],
    difficulty: "intermediate",
  },
} satisfies Stage;
