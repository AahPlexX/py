import type { Stage } from "@/course/course.schema";

export const stage47 = {
  id: "stage-47",
  number: 47,
  title: "Scientific, Analytical, and Numerical Python Ecosystem",
  summary:
    "Master scientific, analytical, and numerical python ecosystem through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["scientific-python"],
  lessons: [
    {
      id: "s47-scientific-python-ecosystem",
      stageId: "stage-47",
      title: "Scientific Python Ecosystem Map",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Understand the core concepts of scientific computing",
        "Apply scientific computing in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["scientific-python"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Scientific Python Ecosystem Map\n\nThe scientific Python ecosystem is a collection of libraries that transform Python into a powerful platform for numerical and scientific computing:\n\n- **NumPy** — n-dimensional arrays, vectorized operations\n- **pandas** — tabular data structures and analysis\n- **matplotlib/seaborn** — data visualization\n- **SciPy** — scientific algorithms (optimization, statistics, signal processing)\n- **Jupyter** — interactive notebook environment\n\nThese libraries are designed to work together and share data efficiently.",
        },
        {
          kind: "why-matters",
          body: "Understanding scientific computing is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s47-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Scientific Python Ecosystem Map?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["scientific-python"],
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
          id: "s47-i2",
          kind: "plain-language-explain",
          prompt: "Explain Scientific Python Ecosystem Map in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["scientific-python"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Scientific Python Ecosystem Map is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s47-i1", "s47-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s47-project",
    stageId: "stage-47",
    title: "Analytical Pipeline Project",
    brief: "Build a complete data analysis pipeline that loads, cleans, analyzes, and visualizes a real-world dataset.",
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
    conceptIds: ["scientific-python"],
    difficulty: "advanced",
  },
} satisfies Stage;
