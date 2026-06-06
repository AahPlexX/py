import type { Stage } from "@/course/course.schema";

export const stage46 = {
  id: "stage-46",
  number: 46,
  title: "Data Engineering and Automation Workflows",
  summary:
    "Master data engineering and automation workflows through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["etl-pipeline"],
  lessons: [
    {
      id: "s46-batch-processing",
      stageId: "stage-46",
      title: "Batch Processing",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of data engineering",
        "Apply data engineering in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Batch Processing\n\n**Batch processing** means processing a collection of items together, periodically rather than one at a time as they arrive.\n\nExamples:\n- Generating nightly reports from the day's transactions\n- Processing uploaded files once per hour\n- Running ETL jobs to sync databases\n\nBatch jobs are simpler than streaming but have higher latency — the output is only as fresh as the last batch run.",
        },
        {
          kind: "why-matters",
          body: "Understanding data engineering is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s46-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Batch Processing?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["etl-pipeline"],
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
          id: "s46-i2",
          kind: "plain-language-explain",
          prompt: "Explain Batch Processing in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["etl-pipeline"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Batch Processing is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s46-i1", "s46-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s46-project",
    stageId: "stage-46",
    title: "Data Pipeline Project",
    brief: "Build an automated ETL pipeline that ingests data from multiple sources, cleans and validates it, and produces summary reports.",
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
    conceptIds: ["etl-pipeline"],
    difficulty: "advanced",
  },
} satisfies Stage;
