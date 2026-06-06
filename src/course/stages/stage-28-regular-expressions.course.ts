import type { Stage } from "@/course/course.schema";

export const stage28 = {
  id: "stage-28",
  number: 28,
  title: "Regular Expressions and Text Parsing",
  summary:
    "Master regular expressions and text parsing through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["regex-patterns"],
  lessons: [
    {
      id: "s28-re-module-overview",
      stageId: "stage-28",
      title: "re Module Overview",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of regex",
        "Apply regex in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["regex-patterns"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## re Module Overview\n\nThe \`re\` module provides regular expression matching operations. A **regular expression** (regex) is a pattern that describes a set of strings.\n\nPython's \`re\` module supports:\n- **\`re.match()\`** — match at beginning of string\n- **\`re.search()\`** — match anywhere in string\n- **\`re.findall()\`** — find all matches\n- **\`re.sub()\`** — replace matches\n- **\`re.compile()\`** — pre-compile patterns for reuse",
        },
        {
          kind: "why-matters",
          body: "Understanding regex is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s28-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of re Module Overview?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["regex-patterns"],
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
          id: "s28-i2",
          kind: "plain-language-explain",
          prompt: "Explain re Module Overview in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["regex-patterns"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "re Module Overview is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s28-i1", "s28-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s28-project",
    stageId: "stage-28",
    title: "Log Parser and Validator",
    brief: "Build a log file parser and data validator using regular expressions to extract structured data from unstructured text.",
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
    conceptIds: ["regex-patterns"],
    difficulty: "intermediate",
  },
} satisfies Stage;
