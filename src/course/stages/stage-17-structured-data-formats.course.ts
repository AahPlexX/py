import type { Stage } from "@/course/course.schema";

export const stage17 = {
  id: "stage-17",
  number: 17,
  title: "Structured Data Formats",
  summary:
    "Master structured data formats through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["json-parsing"],
  lessons: [
    {
      id: "s17-json-concepts",
      stageId: "stage-17",
      title: "JSON Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of json",
        "Apply json in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["json-parsing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## JSON Concepts\n\nJSON (JavaScript Object Notation) is a lightweight text format for storing and exchanging structured data. Python's \`json\` module lets you convert between JSON strings and Python objects.\n\n**JSON types map to Python types:**\n- JSON object → Python \`dict\`\n- JSON array → Python \`list\`\n- JSON string → Python \`str\`\n- JSON number → Python \`int\` or \`float\`\n- JSON true/false → Python \`True\`/\`False\`\n- JSON null → Python \`None\`",
        },
        {
          kind: "why-matters",
          body: "Understanding json is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s17-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of JSON Concepts?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["json-parsing"],
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
          id: "s17-i2",
          kind: "plain-language-explain",
          prompt: "Explain JSON Concepts in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["json-parsing"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "JSON Concepts is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s17-i1", "s17-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s17-project",
    stageId: "stage-17",
    title: "Data Import/Export Utility",
    brief: "Build a command-line utility that reads data from JSON and CSV files, processes it, and writes output in multiple formats.",
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
    conceptIds: ["json-parsing"],
    difficulty: "intermediate",
  },
} satisfies Stage;
