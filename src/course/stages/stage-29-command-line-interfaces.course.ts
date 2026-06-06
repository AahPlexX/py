import type { Stage } from "@/course/course.schema";

export const stage29 = {
  id: "stage-29",
  number: 29,
  title: "Command-Line Interfaces and Terminal Applications",
  summary:
    "Master command-line interfaces and terminal applications through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["cli-structure"],
  lessons: [
    {
      id: "s29-cli-program-structure",
      stageId: "stage-29",
      title: "CLI Program Structure",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of cli",
        "Apply cli in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["cli-structure"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## CLI Program Structure\n\nA **command-line interface (CLI)** is a program that accepts input from the terminal and produces output to the terminal. Well-designed CLIs:\n1. Accept arguments and flags\n2. Return meaningful exit codes (0 = success, non-zero = failure)\n3. Write normal output to stdout\n4. Write errors to stderr\n5. Provide helpful usage messages\n\nPython's \`argparse\` module makes building CLIs with argument parsing, subcommands, and help text straightforward.",
        },
        {
          kind: "why-matters",
          body: "Understanding cli is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s29-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of CLI Program Structure?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["cli-structure"],
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
          id: "s29-i2",
          kind: "plain-language-explain",
          prompt: "Explain CLI Program Structure in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["cli-structure"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "CLI Program Structure is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s29-i1", "s29-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s29-project",
    stageId: "stage-29",
    title: "CLI Application Project",
    brief: "Build a fully-featured command-line application with subcommands, argument validation, help text, and proper exit codes.",
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
    conceptIds: ["cli-structure"],
    difficulty: "intermediate",
  },
} satisfies Stage;
