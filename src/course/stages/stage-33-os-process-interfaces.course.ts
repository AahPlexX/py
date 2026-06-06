import type { Stage } from "@/course/course.schema";

export const stage33 = {
  id: "stage-33",
  number: 33,
  title: "Operating System, Process, and Runtime Interfaces",
  summary:
    "Master operating system, process, and runtime interfaces through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["os-module"],
  lessons: [
    {
      id: "s33-os-module",
      stageId: "stage-33",
      title: "The os Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of os interface",
        "Apply os interface in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["os-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The os Module\n\nThe \`os\` module provides a portable interface to operating system functionality. It lets you work with the filesystem, environment variables, process management, and more.\n\nKey areas:\n- **\`os.environ\`** — read environment variables\n- **\`os.getcwd()\`** — get current working directory\n- **\`os.listdir()\`** — list directory contents\n- **\`os.makedirs()\`** — create directories recursively\n- **\`os.remove()\`** — delete files",
        },
        {
          kind: "why-matters",
          body: "Understanding os interface is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s33-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of The os Module?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["os-module"],
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
          id: "s33-i2",
          kind: "plain-language-explain",
          prompt: "Explain The os Module in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["os-module"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "The os Module is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s33-i1", "s33-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s33-project",
    stageId: "stage-33",
    title: "Filesystem Automation Project",
    brief: "Build a file organization tool that uses os, pathlib, and shutil to automate file sorting and directory management.",
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
    conceptIds: ["os-module"],
    difficulty: "intermediate",
  },
} satisfies Stage;
