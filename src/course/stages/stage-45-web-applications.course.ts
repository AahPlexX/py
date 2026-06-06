import type { Stage } from "@/course/course.schema";

export const stage45 = {
  id: "stage-45",
  number: 45,
  title: "Web Applications and Service Development",
  summary:
    "Master web applications and service development through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["web-request-response"],
  lessons: [
    {
      id: "s45-web-application-architecture",
      stageId: "stage-45",
      title: "Web Application Architecture",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of web development",
        "Apply web development in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["web-request-response"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Web Application Architecture\n\nA **web application** is a program that responds to HTTP requests over a network. The basic model:\n\n1. Client sends an **HTTP request** (method, URL, headers, optional body)\n2. Server routes the request to a **handler**\n3. Handler processes the request and produces a **response** (status code, headers, body)\n4. Client receives the response and acts on it\n\nPython web frameworks (Flask, Django, FastAPI) manage routing and the request/response lifecycle.",
        },
        {
          kind: "why-matters",
          body: "Understanding web development is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s45-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Web Application Architecture?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["web-request-response"],
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
          id: "s45-i2",
          kind: "plain-language-explain",
          prompt: "Explain Web Application Architecture in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["web-request-response"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Web Application Architecture is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s45-i1", "s45-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s45-project",
    stageId: "stage-45",
    title: "Web API Project",
    brief: "Build a RESTful API with full CRUD operations, request validation, proper error responses, and authentication concepts.",
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
    conceptIds: ["web-request-response"],
    difficulty: "advanced",
  },
} satisfies Stage;
