import type { Stage } from "@/course/course.schema";

export const stage34 = {
  id: "stage-34",
  number: 34,
  title: "Internet, Networking, HTTP, and Data Exchange",
  summary:
    "Master internet, networking, http, and data exchange through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["http-protocol"],
  lessons: [
    {
      id: "s34-urls",
      stageId: "stage-34",
      title: "URLs",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of http networking",
        "Apply http networking in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["http-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## URLs\n\nA **URL** (Uniform Resource Locator) identifies a resource on a network. It has a structure:\n\n\`\`\`\nhttps://api.example.com:443/users/42?format=json#profile\n│       │               │   │         │          │\nscheme  host            port path      query     fragment\n\`\`\`\n\nPython's \`urllib.parse\` module can parse and construct URLs:\n\n\`\`\`python\nfrom urllib.parse import urlparse, urlencode\nparsed = urlparse('https://api.example.com/users?page=2')\nprint(parsed.path)   # /users\nprint(parsed.query)  # page=2\n\`\`\`",
        },
        {
          kind: "why-matters",
          body: "Understanding http networking is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s34-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of URLs?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["http-protocol"],
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
          id: "s34-i2",
          kind: "plain-language-explain",
          prompt: "Explain URLs in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["http-protocol"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "URLs is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s34-i1", "s34-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s34-project",
    stageId: "stage-34",
    title: "API Client and Local HTTP Server",
    brief: "Build an API client that fetches and processes data from a public REST API, with retry logic and proper error handling.",
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
    conceptIds: ["http-protocol"],
    difficulty: "intermediate",
  },
} satisfies Stage;
