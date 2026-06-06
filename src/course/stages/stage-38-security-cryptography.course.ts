import type { Stage } from "@/course/course.schema";

export const stage38 = {
  id: "stage-38",
  number: 38,
  title: "Security, Secrets, Cryptography Interfaces, and Safe Coding",
  summary:
    "Master security, secrets, cryptography interfaces, and safe coding through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["security-trust-boundaries"],
  lessons: [
    {
      id: "s38-trust-boundaries",
      stageId: "stage-38",
      title: "Trust Boundaries",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of security",
        "Apply security in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Trust Boundaries\n\nA **trust boundary** is a line your code draws between data it controls and data from outside. Never trust data from:\n- User input (command-line arguments, form fields)\n- Files on disk (can be modified by anyone)\n- Network responses (can be tampered)\n- Environment variables (can be set by anyone)\n\nEverything crossing a trust boundary must be **validated** before use.",
        },
        {
          kind: "why-matters",
          body: "Understanding security is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s38-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Trust Boundaries?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["security-trust-boundaries"],
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
          id: "s38-i2",
          kind: "plain-language-explain",
          prompt: "Explain Trust Boundaries in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["security-trust-boundaries"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Trust Boundaries is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s38-i1", "s38-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s38-project",
    stageId: "stage-38",
    title: "Secure CLI Application",
    brief: "Audit and harden an existing Python CLI application against common security vulnerabilities.",
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
    conceptIds: ["security-trust-boundaries"],
    difficulty: "advanced",
  },
} satisfies Stage;
