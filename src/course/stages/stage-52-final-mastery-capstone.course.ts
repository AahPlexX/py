import type { Stage } from "@/course/course.schema";

export const stage52 = {
  id: "stage-52",
  number: 52,
  title: "Final Mastery Capstone: Complete Python Product",
  summary:
    "Master final mastery capstone: complete python product through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["capstone-project"],
  lessons: [
    {
      id: "s52-requirements-extraction",
      stageId: "stage-52",
      title: "Requirements Extraction",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of capstone",
        "Apply capstone in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["capstone-project"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Requirements Extraction\n\nThe final capstone is a complete Python product built from requirements through release. You will apply every skill from the course: problem decomposition, domain modeling, typed code, testing, packaging, documentation, security review, and deployment.\n\n**This level is not about learning new syntax.** It is about demonstrating mastery by integrating all prior knowledge into a coherent, production-quality project.",
        },
        {
          kind: "why-matters",
          body: "Understanding capstone is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s52-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Requirements Extraction?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["capstone-project"],
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
          id: "s52-i2",
          kind: "plain-language-explain",
          prompt: "Explain Requirements Extraction in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["capstone-project"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Requirements Extraction is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s52-i1", "s52-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s52-project",
    stageId: "stage-52",
    title: "Final Mastery: Complete Python Product",
    brief: "Design, implement, test, document, package, and deploy a complete Python application that demonstrates mastery of all course material.",
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
    conceptIds: ["capstone-project"],
    difficulty: "advanced",
  },
} satisfies Stage;
