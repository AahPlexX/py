import type { Stage } from "@/course/course.schema";

export const stage31 = {
  id: "stage-31",
  number: 31,
  title: "Testing and Quality Assurance",
  summary:
    "Write effective unit tests, integration tests, and use mocking to verify correctness and prevent regressions in Python code.",
  level: "intermediate",
  masteryGateConceptIds: ["unit-testing", "mocking"],
  lessons: [
    {
      id: "s31-test-purpose",
      stageId: "stage-31",
      title: "The Purpose and Value of Tests",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain why automated tests are essential",
        "Distinguish unit, integration, and regression tests",
        "Describe what a good test looks like",
      ],
      prerequisites: [],
      concepts: ["unit-testing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Why Tests Matter\n\nTests are automated checks that verify your code does what you expect.\n\n**Without tests:**\n- Changes break existing behavior silently\n- Every feature must be manually verified after every change\n- Refactoring is dangerous\n- Bugs reach users before you catch them\n\n**With tests:**\n- Changes that break things are caught immediately\n- Refactoring is safe — the tests verify behavior is preserved\n- New developers can confidently change code\n\n## Types of Tests\n\n- **Unit test** — tests one function in isolation, no external dependencies\n- **Integration test** — tests multiple components working together\n- **Regression test** — confirms a previously-fixed bug stays fixed",
        },
        {
          kind: "mental-model",
          title: "Tests as a safety net",
          analogy: "A test suite is a safety net under a tightrope walker. It doesn't slow down a confident, skilled walker — but when they slip, it catches them before they hit the ground.",
          explanation: "Tests catch regressions the moment they are introduced, not after they reach production.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "A good test is F.I.R.S.T.",
          body: "Fast, Isolated (no external dependencies), Repeatable (same result every run), Self-validating (pass/fail without manual inspection), Timely (written close to the code).",
        },
      ],
      interactions: [
        {
          id: "s31-purpose-mc",
          kind: "multiple-choice",
          prompt: "Which test type verifies that a previously-fixed bug has not returned?",
          beginnerPurpose: "Know test type definitions",
          expectedConceptIds: ["unit-testing"],
          options: [
            { id: "a", text: "Unit test", isCorrect: false, explanation: "Unit tests test one unit of code in isolation — not specifically about prior bugs." },
            { id: "b", text: "Integration test", isCorrect: false, explanation: "Integration tests verify components work together." },
            { id: "c", text: "Regression test", isCorrect: true, explanation: "Correct! Regression tests confirm that fixed bugs stay fixed." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The word 'regression' means a bug coming back." }],
          feedback: { correct: "Correct! Regression tests prevent bugs from returning.", incorrect: "Regression tests specifically prevent previously-fixed bugs from returning." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s31-purpose-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s31-unittest-basics",
      stageId: "stage-31",
      title: "unittest.TestCase and Assertions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write test cases using unittest.TestCase",
        "Use assertEqual, assertRaises, and other assertions",
        "Run tests with python -m unittest",
      ],
      prerequisites: ["s31-test-purpose"],
      concepts: ["unit-testing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## unittest.TestCase\n\n```python\nimport unittest\n\ndef add(a: int, b: int) -> int:\n    return a + b\n\nclass TestAdd(unittest.TestCase):\n    def test_positive_numbers(self):\n        self.assertEqual(add(2, 3), 5)\n\n    def test_negative_numbers(self):\n        self.assertEqual(add(-1, -2), -3)\n\n    def test_zero(self):\n        self.assertEqual(add(0, 5), 5)\n\nif __name__ == '__main__':\n    unittest.main()\n```\n\nRun: `python -m unittest test_add.py`\n\n**Key assertions:**\n- `assertEqual(a, b)` — a == b\n- `assertTrue(x)` / `assertFalse(x)`\n- `assertRaises(ExcType)` — code raises the exception\n- `assertIsNone(x)` / `assertIsNotNone(x)`",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Test names describe what they verify",
          body: "Use descriptive names: `test_add_raises_typeerror_for_string_input`, not `test_add_1`. When a test fails, the name tells you exactly what broke.",
        },
      ],
      interactions: [
        {
          id: "s31-unittest-fill",
          kind: "fill-code",
          prompt: "Complete the test that verifies dividing by zero raises ZeroDivisionError.",
          beginnerPurpose: "Test exception raising",
          expectedConceptIds: ["unit-testing"],
          codeTemplate: "import unittest\n\ndef divide(a, b):\n    return a / b\n\nclass TestDivide(unittest.TestCase):\n    def test_zero_division(self):\n        with self._____(ZeroDivisionError):\n            divide(10, 0)",
          blanks: [{ placeholder: "_____", answer: "assertRaises", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The assertion for exception testing is assertRaises." }],
          feedback: { correct: "Correct! assertRaises checks that the exception is raised.", incorrect: "Use self.assertRaises(ExceptionType) as a context manager." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s31-unittest-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s31-mocking",
      stageId: "stage-31",
      title: "Mocking with unittest.mock",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use Mock and MagicMock to replace dependencies",
        "Use patch() to substitute objects during tests",
        "Verify that mocked methods were called correctly",
      ],
      prerequisites: ["s31-unittest-basics"],
      concepts: ["mocking"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Mocking\n\nUnit tests should run in isolation — no real network, database, or file system calls. **Mocking** replaces real dependencies with controlled substitutes.\n\n```python\nfrom unittest.mock import Mock, patch\nimport unittest\n\ndef fetch_user(user_id: int, db) -> dict:\n    return db.query(f\"SELECT * FROM users WHERE id = {user_id}\")\n\nclass TestFetchUser(unittest.TestCase):\n    def test_fetch_calls_db(self):\n        mock_db = Mock()\n        mock_db.query.return_value = {'id': 1, 'name': 'Alice'}\n\n        result = fetch_user(1, mock_db)\n\n        self.assertEqual(result['name'], 'Alice')\n        mock_db.query.assert_called_once()  # verify it was called\n```\n\n## patch()\n\n```python\n@patch('mymodule.requests.get')\ndef test_api_call(self, mock_get):\n    mock_get.return_value.json.return_value = {'status': 'ok'}\n    result = call_api()\n    self.assertEqual(result['status'], 'ok')\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Patch where it's used, not where it's defined",
          body: "If your module does `from requests import get`, patch `mymodule.get`, not `requests.get`. Patch the name as it is used in the module under test.",
        },
        {
          kind: "why-matters",
          body: "Without mocking, tests that call real APIs fail when offline, take seconds instead of milliseconds, and cost money. Mocking makes tests fast, deterministic, and free.",
        },
      ],
      interactions: [
        {
          id: "s31-mock-mc",
          kind: "multiple-choice",
          prompt: "You want to test a function that calls requests.get(). Why use a Mock instead of the real call?",
          beginnerPurpose: "Motivate mocking",
          expectedConceptIds: ["mocking"],
          options: [
            { id: "a", text: "Mocks are faster and don't need network access", isCorrect: true, explanation: "Correct! Mocks run instantly, work offline, and return controlled data." },
            { id: "b", text: "Real HTTP calls fail during testing", isCorrect: false, explanation: "Real calls might succeed, but they're slow, require connectivity, and return unpredictable data." },
            { id: "c", text: "unittest.TestCase doesn't support real network calls", isCorrect: false, explanation: "TestCase supports anything Python can do — the reason to mock is isolation and speed." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think: speed, reliability, offline capability." }],
          feedback: { correct: "Correct! Mocks are faster and don't need network.", incorrect: "Mocks isolate tests from external dependencies — faster and more reliable." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s31-mock-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s31-fixtures",
      stageId: "stage-31",
      title: "Fixtures, setUp, and tearDown",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use setUp and tearDown to share test setup",
        "Understand test isolation between test methods",
        "Apply setUpClass for expensive once-per-class setup",
      ],
      prerequisites: ["s31-mocking"],
      concepts: ["unit-testing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## setUp and tearDown\n\n`setUp` runs before each test method. `tearDown` runs after, even if the test fails:\n\n```python\nclass TestDatabase(unittest.TestCase):\n    def setUp(self):\n        self.db = Database(':memory:')  # fresh DB each test\n        self.db.create_tables()\n\n    def tearDown(self):\n        self.db.close()\n\n    def test_insert(self):\n        self.db.insert('Alice')\n        self.assertEqual(self.db.count(), 1)\n\n    def test_empty_on_start(self):\n        self.assertEqual(self.db.count(), 0)  # setUp gives fresh DB\n```\n\nEach test gets a fresh database — they cannot affect each other.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "setUpClass for expensive setup",
          body: "If setup is expensive (e.g., loading a large file), use setUpClass(cls) and tearDownClass(cls) which run once per class, not once per test. Mark them with @classmethod.",
        },
      ],
      interactions: [
        {
          id: "s31-fixtures-mc",
          kind: "multiple-choice",
          prompt: "Does tearDown() run if the test raises an exception?",
          beginnerPurpose: "Understand teardown guarantees",
          expectedConceptIds: ["unit-testing"],
          options: [
            { id: "a", text: "Yes, tearDown always runs after each test method", isCorrect: true, explanation: "Correct! tearDown is like finally — it runs regardless of whether the test passed or failed." },
            { id: "b", text: "No, tearDown is skipped on failure", isCorrect: false, explanation: "tearDown runs even if the test assertion fails — it's for cleanup." },
            { id: "c", text: "Only if you add a try/except in the test", isCorrect: false, explanation: "No try/except needed — tearDown is automatically called by the test runner." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "tearDown is the test equivalent of finally." }],
          feedback: { correct: "Correct! tearDown always runs.", incorrect: "tearDown always runs, like finally in a try block." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s31-fixtures-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s31-project",
    stageId: "stage-31",
    title: "Test Suite Project",
    brief:
      "Write a complete test suite for an existing Python module (a task manager or shopping cart). Cover happy paths, edge cases, error conditions, and use mocking for external dependencies.",
    requirements: [
      "Tests for all public functions/methods",
      "setUp creates fresh state for each test",
      "assertRaises used for error cases",
      "At least one test using Mock to replace a dependency",
      "Tests run with python -m unittest and all pass",
    ],
    acceptanceCriteria: [
      "All tests pass with zero failures",
      "Each test has a descriptive name",
      "Edge cases (empty input, boundary values) are tested",
    ],
    conceptIds: ["unit-testing", "mocking"],
    difficulty: "intermediate",
  },
} satisfies Stage;
