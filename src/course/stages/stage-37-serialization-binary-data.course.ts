import type { Stage } from "@/course/course.schema";

export const stage37 = {
  id: "stage-37",
  number: 37,
  title: "Serialization, Compression, Archiving, and Binary Data",
  summary:
    "Master serialization, compression, archiving, and binary data through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["binary-data"],
  lessons: [
    {
      id: "s37-binary-data-concepts",
      stageId: "stage-37",
      title: "Binary Data Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of binary serialization",
        "Apply binary serialization in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["binary-data"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Binary Data Concepts\n\n**Binary data** is a sequence of bytes — raw 0/1 values with no implicit encoding. Unlike text files (which assume characters), binary files store data in format-specific layouts.\n\nPython provides several ways to work with binary data:\n- \`bytes\` — immutable sequence of bytes\n- \`bytearray\` — mutable sequence of bytes\n- \`memoryview\` — zero-copy view into a bytes-like object\n- \`struct\` — pack/unpack binary data with format strings",
        },
        {
          kind: "why-matters",
          body: "Understanding binary serialization is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s37-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Binary Data Concepts?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["binary-data"],
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
          id: "s37-i2",
          kind: "plain-language-explain",
          prompt: "Explain Binary Data Concepts in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["binary-data"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Binary Data Concepts is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s37-i1", "s37-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s37-project",
    stageId: "stage-37",
    title: "Binary Parser and Archive Processor",
    brief: "Build a tool that reads binary file formats, compresses data, and creates ZIP archives of processed files.",
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
    conceptIds: ["binary-data"],
    difficulty: "intermediate",
  },
} satisfies Stage;
