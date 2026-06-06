import type { Stage } from "@/course/course.schema";

export const stage39 = {
  id: "stage-39",
  number: 39,
  title: "Packaging, Distribution, and Dependency Management",
  summary:
    "Master packaging, distribution, and dependency management through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["pyproject-toml"],
  lessons: [
    {
      id: "s39-packaging-vocabulary",
      stageId: "stage-39",
      title: "Packaging Vocabulary",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the core concepts of python packaging",
        "Apply python packaging in practical Python programs",
        "Recognize common patterns and pitfalls",
      ],
      prerequisites: [],
      concepts: ["pyproject-toml"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Packaging Vocabulary\n\nPython packaging has its own vocabulary:\n\n- **Distribution package** — a tarball or wheel you upload to PyPI or install with pip\n- **Import package** — a directory with \`__init__.py\` that you \`import\` in code\n- **Module** — a single \`.py\` file\n- **sdist** — source distribution (\`.tar.gz\`)\n- **wheel** — binary distribution (\`.whl\`) — faster to install\n- **PyPI** — Python Package Index, the public package repository",
        },
        {
          kind: "why-matters",
          body: "Understanding python packaging is essential for writing professional Python code. These concepts appear in virtually every real-world Python codebase.",
        },
      ],
      interactions: [
        {
          id: "s39-i1",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of Packaging Vocabulary?",
          beginnerPurpose: "Check understanding of the core concept",
          expectedConceptIds: ["pyproject-toml"],
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
          id: "s39-i2",
          kind: "plain-language-explain",
          prompt: "Explain Packaging Vocabulary in your own words as if teaching someone new to Python.",
          beginnerPurpose: "Articulate the concept in plain language",
          expectedConceptIds: ["pyproject-toml"],
          code: "# Example from the lesson\npass",
          keyPointsToHit: [
            "Core definition of the concept",
            "Why it is useful",
            "A practical example",
          ],
          sampleAnswer:
            "Packaging Vocabulary is a fundamental Python concept covered in this stage. Explaining it clearly shows mastery of the material.",
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
        requiredInteractionIds: ["s39-i1", "s39-i2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s39-project",
    stageId: "stage-39",
    title: "Packaging and Publishing Project",
    brief: "Package an existing Python library with pyproject.toml, build distributions, and publish to TestPyPI.",
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
    conceptIds: ["pyproject-toml"],
    difficulty: "intermediate",
  },
} satisfies Stage;
