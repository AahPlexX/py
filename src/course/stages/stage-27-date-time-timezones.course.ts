import type { Stage } from "@/course/course.schema";

export const stage27 = {
  id: "stage-27",
  number: 27,
  title: "Date, Time, Time Zones, and Calendars",
  summary:
    "Master date, time, time zones, and calendars through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["datetime-module"],
  lessons: [
    {
      id: "s27-datetime-date",
      stageId: "stage-27",
      title: "datetime.date",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of datetime",
        "Apply datetime in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["datetime-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## datetime.date\n\n\`datetime.date\` represents a calendar date (year, month, day) with no time component.\n\n\`\`\`python\nfrom datetime import date\n\ntoday = date.today()\nprint(today)           # 2026-06-06\nprint(today.year)      # 2026\nprint(today.month)     # 6\nprint(today.weekday()) # 5 (Saturday)\n\`\`\`\n\nDates are immutable — operations return new date objects.",
        },
        {
          kind: "why-matters",
          body: "Understanding datetime is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s27-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of datetime.date?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["datetime-module"],
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
          id: "s27-i2",
          kind: "plain-language-explain",
          prompt: "Explain datetime.date in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["datetime-module"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "datetime.date is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s27-i1", "s27-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s27-project",
    stageId: "stage-27",
    title: "Scheduling Utility Project",
    brief: "Build a scheduling utility that handles time-zone-aware date arithmetic and recurring event generation.",
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
    conceptIds: ["datetime-module"],
    difficulty: "intermediate",
  },
} satisfies Stage;
