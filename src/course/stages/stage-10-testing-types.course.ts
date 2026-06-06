import type { Stage } from "@/course/course.schema";

export const stage10 = {
  id: "stage-10",
  number: 10,
  title: "Testing, Types, and Quality",
  summary:
    "Write pytest-style unit tests, use Python type hints, understand static checking, and refactor safely.",
  level: "intermediate",
  masteryGateConceptIds: [
    "unit-test",
    "assertion",
    "test-function",
    "type-hint",
    "return-type",
    "mypy-concept",
    "refactoring",
  ],
  lessons: [
    /* ── Lesson 1: Unit Testing ──────────────────────────────────────────── */
    {
      id: "s10-unit-testing",
      stageId: "stage-10",
      title: "Unit Testing with pytest",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand why unit tests matter for confidence during refactoring",
        "Write test functions following the `test_` naming convention",
        "Use `assert` statements to verify expected outcomes",
        "Organize tests in a `tests/` directory",
      ],
      prerequisites: ["s9-properties-protocols"],
      concepts: ["unit-test", "assertion", "test-function"],
      contentBlocks: [
        {
          kind: "mental-model",
          title: "Tests are safety nets, not bureaucracy",
          analogy:
            "A trapeze artist practises every day without a net — until they add one. The net doesn't slow them down; it lets them try bolder moves. Tests are your safety net: they catch you before a bug reaches production so you can refactor boldly.",
          explanation:
            "A unit test verifies one small piece of behavior (a function, a method) in isolation. When tests pass, you know the code still works after changes.",
        },
        {
          kind: "text",
          markdown: `## Writing Your First pytest Test

pytest discovers tests automatically: any file named \`test_*.py\` and any function named \`test_*\` is a test.

\`\`\`python
# calc.py
def add(a: int, b: int) -> int:
    return a + b

# tests/test_calc.py
from calc import add

def test_add_positive_numbers():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

def test_add_zero():
    assert add(0, 5) == 5
\`\`\`

Run with \`pytest\` in the terminal. pytest prints a dot for each passing test and F for failures.`,
        },
        {
          kind: "code",
          language: "python",
          code: `# tests/test_calc.py
import pytest
from calc import divide

def test_divide_normal():
    assert divide(10, 2) == 5.0

def test_divide_by_zero_raises():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

def test_divide_float():
    result = divide(7, 2)
    assert abs(result - 3.5) < 1e-9  # float comparison`,
          caption:
            "`pytest.raises` is a context manager that asserts a specific exception is raised.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Name tests like sentences",
          body: "Good test names describe what is being tested and what the expected behavior is: `test_add_returns_sum_of_two_ints`. When a test fails, the name alone tells you what broke.",
        },
        {
          kind: "why-matters",
          body: "Untested code is unknown code. Tests are the single most effective technique for maintaining quality as a codebase grows. They also serve as living documentation — showing exactly how functions are meant to be called.",
        },
      ],
      interactions: [
        {
          id: "s10-ut-mc-naming",
          kind: "multiple-choice",
          prompt: "Which function name will pytest auto-discover as a test?",
          beginnerPurpose: "Learn the pytest naming convention.",
          expectedConceptIds: ["test-function"],
          options: [
            { id: "a", text: "`def check_addition():` ", isCorrect: false, explanation: "pytest only discovers functions prefixed with `test_`." },
            { id: "b", text: "`def test_addition():` ", isCorrect: true, explanation: "Correct! The `test_` prefix is the convention pytest looks for." },
            { id: "c", text: "`def addition_test():` ", isCorrect: false, explanation: "Suffix `_test` is not the standard pytest discovery pattern." },
            { id: "d", text: "`def verify_addition():` ", isCorrect: false, explanation: "pytest doesn't discover functions with arbitrary prefixes." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "pytest looks for the `test_` prefix by default." }],
          feedback: {
            correct: "Right! `test_addition` follows the pytest naming convention.",
            incorrect: "pytest discovers functions whose names start with `test_`.",
          },
        },
        {
          id: "s10-ut-fill-assert",
          kind: "fill-code",
          prompt: "Fill in the assertion to check that `multiply(3, 4)` returns `12`.",
          beginnerPurpose: "Practice writing basic assertions.",
          expectedConceptIds: ["assertion", "unit-test"],
          codeTemplate: `def multiply(a: int, b: int) -> int:
    return a * b

def test_multiply():
    ___BLANK_1___ multiply(3, 4) ___BLANK_2___ 12`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "assert", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "==", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `assert <expression> == <expected>`." }],
          feedback: {
            correct: "Correct! `assert multiply(3, 4) == 12` is the idiomatic pytest assertion.",
            incorrect: "Write `assert multiply(3, 4) == 12`.",
          },
        },
        {
          id: "s10-ut-predict-fail",
          kind: "predict-output",
          prompt: "What output does pytest produce for this test?",
          beginnerPurpose: "Understand what a failing assertion looks like.",
          expectedConceptIds: ["assertion", "unit-test"],
          code: `def greet(name: str) -> str:
    return f"Hello {name}"

def test_greet():
    assert greet("world") == "Hello, world"`,
          expectedOutput: "FAILED",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Compare the actual return value with the expected string carefully." }],
          feedback: {
            correct: "Correct! `greet('world')` returns `'Hello world'` (no comma), so the test fails.",
            incorrect: "Look closely: `greet` returns `'Hello world'` but the test checks for `'Hello, world'` (with comma).",
          },
        },
        {
          id: "s10-ut-run-test",
          kind: "run-code",
          prompt:
            "Write a function `is_even(n)` and at least two test functions that verify even and odd numbers.",
          beginnerPurpose: "Write and run a complete test suite for a simple function.",
          expectedConceptIds: ["test-function", "assertion"],
          starterCode: `def is_even(n: int) -> bool:
    # Return True if n is even
    pass

def test_even_number():
    # assert is_even returns True for 4
    pass

def test_odd_number():
    # assert is_even returns False for 7
    pass

# Run tests manually (pytest-style simulation)
test_even_number()
test_odd_number()
print("All tests passed!")
`,
          task: "Implement `is_even` and write two assertions in the test functions so 'All tests passed!' prints.",
          expectedOutputContains: ["All tests passed!"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "`assert is_even(4) == True` and `assert is_even(7) == False`." }],
          feedback: {
            correct: "Tests passing! You've written a complete test suite.",
            incorrect: "Implement `is_even` with `return n % 2 == 0` and add `assert` calls in the test functions.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "unit-test", recallPrompt: "What is the purpose of a unit test?", nextReviewAfterDays: 2 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s10-ut-mc-naming", "s10-ut-fill-assert", "s10-ut-predict-fail"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["unit-test"],
      },
    },

    /* ── Lesson 2: Writing Good Tests ───────────────────────────────────── */
    {
      id: "s10-writing-good-tests",
      stageId: "stage-10",
      title: "Writing Good Tests",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Apply the Arrange-Act-Assert pattern",
        "Use pytest fixtures to share test setup",
        "Write parametrized tests for multiple inputs",
        "Understand test isolation and avoiding test interdependence",
      ],
      prerequisites: ["s10-unit-testing"],
      concepts: ["test-fixture", "parametrize", "test-isolation"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## Arrange–Act–Assert (AAA)

Every test has three phases:

1. **Arrange** — set up the inputs and state
2. **Act** — call the function under test
3. **Assert** — verify the output or side effect

\`\`\`python
def test_stack_push():
    # Arrange
    stack: list[int] = []

    # Act
    stack.append(42)

    # Assert
    assert stack == [42]
\`\`\`

The AAA pattern keeps tests readable and identifies *exactly* what is being tested.`,
        },
        {
          kind: "code",
          language: "python",
          code: `import pytest

# Fixture: shared setup run before each test that uses it
@pytest.fixture
def sample_list() -> list[int]:
    return [3, 1, 4, 1, 5, 9, 2, 6]

def test_min_value(sample_list: list[int]) -> None:
    assert min(sample_list) == 1

def test_max_value(sample_list: list[int]) -> None:
    assert max(sample_list) == 9

def test_sorted(sample_list: list[int]) -> None:
    assert sorted(sample_list) == [1, 1, 2, 3, 4, 5, 6, 9]`,
          caption:
            "Fixtures avoid copy-pasting setup code and ensure each test starts from the same state.",
        },
        {
          kind: "code",
          language: "python",
          code: `import pytest

def is_palindrome(s: str) -> bool:
    cleaned = s.lower().replace(" ", "")
    return cleaned == cleaned[::-1]

@pytest.mark.parametrize("word,expected", [
    ("racecar", True),
    ("hello",   False),
    ("A man a plan a canal Panama", True),
    ("",        True),
])
def test_is_palindrome(word: str, expected: bool) -> None:
    assert is_palindrome(word) == expected`,
          caption:
            "`@pytest.mark.parametrize` runs the same test function with different inputs — eliminating duplicate test functions.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Tests must not depend on each other",
          body: "If test B only passes when test A has run first, you have a hidden coupling. Use fixtures or `setup_method` to create fresh state for each test. pytest doesn't guarantee test execution order.",
        },
        {
          kind: "why-matters",
          body: "Good tests act as precise bug reports. When a parametrized test fails for `'hello'` but passes for `'racecar'`, you know immediately where to look. Poor tests take longer to debug than the bugs they find.",
        },
      ],
      interactions: [
        {
          id: "s10-gt-predict-parametrize",
          kind: "predict-output",
          prompt: "How many individual test cases does this parametrized test create?",
          beginnerPurpose: "Understand how `@pytest.mark.parametrize` multiplies test cases.",
          expectedConceptIds: ["parametrize"],
          code: `import pytest

@pytest.mark.parametrize("n", [1, 2, 3, 4, 5])
def test_positive(n: int) -> None:
    assert n > 0`,
          expectedOutput: "5",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Each item in the list becomes a separate test run." }],
          feedback: {
            correct: "Correct! Five values → five individual test cases.",
            incorrect: "Each element in the list creates one test case. Five elements = five tests.",
          },
        },
        {
          id: "s10-gt-fill-fixture",
          kind: "fill-code",
          prompt: "Complete the fixture that returns a fresh empty list for each test.",
          beginnerPurpose: "Practice writing a pytest fixture.",
          expectedConceptIds: ["test-fixture"],
          codeTemplate: `import pytest

___BLANK_1___
def empty_list() -> list[int]:
    return []

def test_append(___BLANK_2___: list[int]) -> None:
    empty_list.append(1)
    assert empty_list == [1]`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "@pytest.fixture", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "empty_list", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Decorate with `@pytest.fixture` and inject by parameter name." }],
          feedback: {
            correct: "Correct! `@pytest.fixture` registers the function; the test receives it by name.",
            incorrect: "Use `@pytest.fixture` and inject it by matching the parameter name to the fixture name.",
          },
        },
        {
          id: "s10-gt-mc-isolation",
          kind: "multiple-choice",
          prompt:
            "Test A stores data in a module-level `results = []` list. Test B reads from that same list. What problem does this create?",
          beginnerPurpose: "Understand why tests must be isolated.",
          expectedConceptIds: ["test-isolation"],
          options: [
            { id: "a", text: "No problem — sharing state is efficient.", isCorrect: false, explanation: "Shared mutable state between tests causes hidden dependencies." },
            { id: "b", text: "Test B's result depends on whether Test A ran first, making tests order-dependent and fragile.", isCorrect: true, explanation: "Correct! This is called test coupling. Tests should set up their own state." },
            { id: "c", text: "Python prevents module-level mutation inside test files.", isCorrect: false, explanation: "Python has no such restriction." },
            { id: "d", text: "Only a problem if the tests are in different files.", isCorrect: false, explanation: "Test coupling is a problem regardless of file location." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What happens if pytest runs tests in a different order?" }],
          feedback: {
            correct: "Exactly! Order-dependent tests are fragile and hard to debug.",
            incorrect: "Shared mutable state means test B's outcome depends on test A running first — a dangerous coupling.",
          },
        },
        {
          id: "s10-gt-debug-aaa",
          kind: "debug-code",
          prompt: "The test is structured poorly and fails intermittently. Restructure it using AAA.",
          beginnerPurpose: "Practice organising a test using Arrange-Act-Assert.",
          expectedConceptIds: ["unit-test", "test-isolation"],
          brokenCode: `items = []

def test_add_item():
    assert len(items) == 0  # depends on global state
    items.append("apple")
    assert items == ["apple"]`,
          bugDescription:
            "The test modifies global state. If run twice, `items` already contains 'apple' and `len(items) == 0` fails.",
          fixedCode: `def test_add_item():
    # Arrange
    items: list[str] = []

    # Act
    items.append("apple")

    # Assert
    assert items == ["apple"]`,
          errorType: "AssertionError",
          allowedAttempts: 4,
          hints: [{ level: "concept", text: "Move `items = []` inside the test function." }],
          feedback: {
            correct: "Correct! Local setup inside the test ensures isolation.",
            incorrect: "Declare `items = []` *inside* the test function so each run starts fresh.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "test-fixture", recallPrompt: "What is a pytest fixture and why use one?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s10-gt-predict-parametrize", "s10-gt-fill-fixture", "s10-gt-mc-isolation"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["test-fixture"],
      },
    },

    /* ── Lesson 3: Type Hints Basics ────────────────────────────────────── */
    {
      id: "s10-type-hints-basics",
      stageId: "stage-10",
      title: "Type Hints Basics",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Annotate function parameters and return types",
        "Use built-in generics: `list[int]`, `dict[str, float]`, `tuple[int, str]`",
        "Express optional values with `X | None`",
        "Understand that type hints are not enforced at runtime",
      ],
      prerequisites: ["s10-writing-good-tests"],
      concepts: ["type-hint", "return-type", "optional-type"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## Type Hints in Python

Python is dynamically typed, but since 3.5 you can add optional annotations.
Type hints are **not** enforced at runtime — they are documentation for humans and static analysis tools.

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

def total(prices: list[float]) -> float:
    return sum(prices)

def lookup(data: dict[str, int], key: str) -> int | None:
    return data.get(key)
\`\`\`

The syntax \`int | None\` (Python 3.10+) means "an int or None".`,
        },
        {
          kind: "code",
          language: "python",
          code: `from typing import TypeAlias

Vector: TypeAlias = list[float]

def dot_product(a: Vector, b: Vector) -> float:
    return sum(x * y for x, y in zip(a, b))

def normalize(v: Vector) -> Vector:
    magnitude = sum(x ** 2 for x in v) ** 0.5
    return [x / magnitude for x in v]

result = dot_product([1.0, 0.0], [0.0, 1.0])
print(result)  # 0.0`,
          caption:
            "`TypeAlias` creates readable names for complex type expressions. `Vector` is clearer than `list[float]` in context.",
        },
        {
          kind: "comparison",
          leftLabel: "Without type hints",
          rightLabel: "With type hints",
          leftCode: `def process(data, callback):
    results = []
    for item in data:
        results.append(callback(item))
    return results`,
          rightCode: `from collections.abc import Callable

def process(
    data: list[int],
    callback: Callable[[int], str],
) -> list[str]:
    results: list[str] = []
    for item in data:
        results.append(callback(item))
    return results`,
          caption:
            "The typed version makes the contract explicit: what goes in, what comes out.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Type hints are checked by tools, not Python",
          body: "Python ignores type hints at runtime. Tools like mypy, pyright, or your IDE use them for static analysis. You can write `x: int = 'hello'` and Python won't complain — but mypy will.",
        },
        {
          kind: "why-matters",
          body: "Type hints are now the norm in production Python. They make function signatures self-documenting, catch bugs before runtime, and enable powerful IDE refactoring. A codebase with thorough type hints is significantly easier to maintain.",
        },
      ],
      interactions: [
        {
          id: "s10-th-mc-return-type",
          kind: "multiple-choice",
          prompt: "What is the correct return type annotation for a function that returns nothing?",
          beginnerPurpose: "Learn that functions with no return value are annotated `-> None`.",
          expectedConceptIds: ["return-type"],
          options: [
            { id: "a", text: "`-> void`", isCorrect: false, explanation: "`void` is not a Python type. That's C/Java syntax." },
            { id: "b", text: "`-> None`", isCorrect: true, explanation: "Correct! `None` is Python's type for 'no return value'." },
            { id: "c", text: "`-> null`", isCorrect: false, explanation: "`null` is JavaScript. Python uses `None`." },
            { id: "d", text: "Omit the annotation entirely", isCorrect: false, explanation: "Omitting the annotation is allowed but explicit `-> None` is clearer and is checked by mypy." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Python's 'nothing' value is `None`." }],
          feedback: {
            correct: "Correct! `-> None` is the annotation for functions that have no meaningful return value.",
            incorrect: "In Python, the absence of a value is `None`. So `-> None` is the correct annotation.",
          },
        },
        {
          id: "s10-th-fill-hints",
          kind: "fill-code",
          prompt:
            "Add type hints so the function accepts a list of ints and returns the largest or `None` if empty.",
          beginnerPurpose: "Practice annotating list parameters and optional return types.",
          expectedConceptIds: ["type-hint", "optional-type"],
          codeTemplate: `def find_max(numbers: ___BLANK_1___) -> ___BLANK_2___:
    if not numbers:
        return None
    return max(numbers)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "list[int]", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "int | None", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "Use `list[int]` for the parameter and `int | None` for the return type." },
          ],
          feedback: {
            correct: "Perfect! `list[int]` and `int | None` correctly describe the inputs and output.",
            incorrect: "Use `list[int]` for the parameter type and `int | None` for the return type.",
          },
        },
        {
          id: "s10-th-predict-runtime",
          kind: "predict-output",
          prompt: "What does Python print when you run this code with a wrong type?",
          beginnerPurpose: "Understand that Python does NOT enforce type hints at runtime.",
          expectedConceptIds: ["type-hint"],
          code: `def double(n: int) -> int:
    return n * 2

result = double("abc")
print(result)`,
          expectedOutput: "abcabc",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Python ignores type hints at runtime. `'abc' * 2` is valid Python." }],
          feedback: {
            correct: "Correct! Python doesn't enforce type hints. `'abc' * 2` is `'abcabc'`.",
            incorrect: "Python does NOT enforce type hints at runtime. The code runs fine and prints `'abcabc'`.",
          },
        },
        {
          id: "s10-th-plain-explain",
          kind: "plain-language-explain",
          prompt: "Explain to a colleague what `list[str] | None` means as a type annotation.",
          beginnerPurpose: "Build fluency reading composite type expressions.",
          expectedConceptIds: ["type-hint", "optional-type"],
          code: `def parse_tags(raw: str) -> list[str] | None:
    if not raw.strip():
        return None
    return [t.strip() for t in raw.split(",")]`,
          keyPointsToHit: [
            "The function can return either a list of strings or None",
            "None is returned for empty/blank input",
            "The `|` operator combines two possible types (Python 3.10+)",
          ],
          sampleAnswer:
            "`list[str] | None` means the function either returns a list of strings (when input is non-empty) or `None` (when input is blank). The `|` operator creates a union type, meaning 'one of these types'.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think: when does the function return a list, and when does it return None?" }],
          feedback: {
            correct: "Great explanation! You've captured both the 'when' and the 'what'.",
            incorrect: "Describe both possible return types and when each is returned.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "type-hint", recallPrompt: "Do Python type hints affect runtime behavior?", nextReviewAfterDays: 2 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s10-th-mc-return-type", "s10-th-fill-hints", "s10-th-predict-runtime"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["type-hint"],
      },
    },

    /* ── Lesson 4: Advanced Typing ──────────────────────────────────────── */
    {
      id: "s10-advanced-typing",
      stageId: "stage-10",
      title: "Advanced Typing",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use `TypeVar` for generic functions",
        "Understand `Callable`, `Sequence`, `Mapping` from `collections.abc`",
        "Use `Literal` and `TypedDict` for precise types",
        "Explain what mypy checks and what it cannot",
      ],
      prerequisites: ["s10-type-hints-basics"],
      concepts: ["mypy-concept", "generic-type", "typed-dict"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `from typing import TypeVar

T = TypeVar("T")

def first(items: list[T]) -> T | None:
    return items[0] if items else None

x: int | None = first([1, 2, 3])   # T inferred as int
s: str | None = first(["a", "b"])  # T inferred as str
print(x, s)  # 1 a`,
          caption:
            "`TypeVar` allows a function to be generic: it works with any type while preserving type information.",
        },
        {
          kind: "code",
          language: "python",
          code: `from typing import TypedDict

class MovieRecord(TypedDict):
    title: str
    year: int
    rating: float

def summarize(movie: MovieRecord) -> str:
    return f"{movie['title']} ({movie['year']}) — {movie['rating']}/10"

film: MovieRecord = {"title": "Inception", "year": 2010, "rating": 8.8}
print(summarize(film))
# Inception (2010) — 8.8/10`,
          caption:
            "`TypedDict` gives type-safe access to dict structures without creating a full class.",
        },
        {
          kind: "text",
          markdown: `## What mypy Checks

mypy is a static type checker — it reads your annotations and flags inconsistencies *before you run* the code.

\`\`\`bash
mypy my_module.py
\`\`\`

mypy catches:
- Calling a function with wrong argument types
- Accessing attributes that don't exist on a type
- Unhandled \`None\` values (when strict null-checking is on)

mypy **cannot** catch:
- Runtime errors unrelated to types (e.g., network failures)
- Logic errors (returning the wrong value of the right type)`,
        },
        {
          kind: "callout",
          variant: "info",
          title: "Start with `--strict` gradually",
          body: "On an existing codebase, `mypy --strict` can be overwhelming. Add type hints incrementally, file by file. Use `# type: ignore` sparingly as a temporary escape hatch, and remove it as you annotate.",
        },
        {
          kind: "why-matters",
          body: "Advanced typing patterns like `TypeVar` and `TypedDict` make generic utilities safe to reuse. mypy turns type hints into automated documentation enforcement — if the types don't match, the linter tells you before users do.",
        },
      ],
      interactions: [
        {
          id: "s10-at-predict-typevar",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Understand that `TypeVar` doesn't change runtime behavior.",
          expectedConceptIds: ["generic-type"],
          code: `from typing import TypeVar

T = TypeVar("T")

def last(items: list[T]) -> T:
    return items[-1]

print(last([10, 20, 30]))
print(last(["x", "y", "z"]))`,
          expectedOutput: "30\nz",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`last` returns the final element of any list. `TypeVar` is only for static analysis." }],
          feedback: {
            correct: "Correct! `TypeVar` has no runtime effect; `last` returns the last element regardless of type.",
            incorrect: "`last([10,20,30])` returns 30 and `last(['x','y','z'])` returns 'z'. Each on its own line.",
          },
        },
        {
          id: "s10-at-fill-typeddict",
          kind: "fill-code",
          prompt: "Define a `TypedDict` for a user record with `name: str` and `age: int`.",
          beginnerPurpose: "Practice defining a TypedDict.",
          expectedConceptIds: ["typed-dict"],
          codeTemplate: `from typing import ___BLANK_1___

class UserRecord(___BLANK_2___):
    name: str
    age: int

user: UserRecord = {"name": "Alice", "age": 30}
print(user["name"])`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "TypedDict", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "TypedDict", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Import `TypedDict` from `typing` and inherit from it." }],
          feedback: {
            correct: "Correct! `TypedDict` is both the import and the base class.",
            incorrect: "Import `TypedDict` from `typing` and use it as the base class: `class UserRecord(TypedDict):`.",
          },
        },
        {
          id: "s10-at-mc-mypy-limits",
          kind: "multiple-choice",
          prompt: "Which of the following will mypy catch?",
          beginnerPurpose: "Understand the scope of static type checking.",
          expectedConceptIds: ["mypy-concept"],
          options: [
            { id: "a", text: "A network timeout during an API call", isCorrect: false, explanation: "Runtime errors like network failures are not caught by static analysis." },
            { id: "b", text: "Passing a `str` to a function annotated as `(n: int) -> int`", isCorrect: true, explanation: "Correct! mypy flags type-incompatible arguments." },
            { id: "c", text: "A logic error where you return `a - b` instead of `a + b`", isCorrect: false, explanation: "mypy cannot check correctness of logic, only type consistency." },
            { id: "d", text: "An out-of-bounds list access at runtime", isCorrect: false, explanation: "Index out-of-bounds is a runtime error, not a type error." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "mypy only checks type compatibility, not logic or runtime behavior." }],
          feedback: {
            correct: "Correct! mypy checks type compatibility — passing a `str` where `int` is expected is a type error.",
            incorrect: "mypy only analyzes types. It catches type mismatches, not logic errors or runtime exceptions.",
          },
        },
        {
          id: "s10-at-reorder-generic",
          kind: "reorder-code",
          prompt: "Reorder these lines to define a `clamp` function with a TypeVar.",
          beginnerPurpose: "Practice assembling a generic function.",
          expectedConceptIds: ["generic-type"],
          lines: [
            "from typing import TypeVar",
            "T = TypeVar('T')",
            "def clamp(value: T, lo: T, hi: T) -> T:",
            "    if value < lo:",
            "        return lo",
            "    if value > hi:",
            "        return hi",
            "    return value",
          ],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
          allowedAttempts: 3,
          hints: [{ level: "structural", text: "Import first, define TypeVar, then define the function." }],
          feedback: {
            correct: "Perfect ordering! Imports → TypeVar definition → function body.",
            incorrect: "Order: import, TypeVar assignment, function signature, then body lines.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "mypy-concept", recallPrompt: "Name two things mypy can catch and one thing it cannot.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s10-at-predict-typevar", "s10-at-fill-typeddict", "s10-at-mc-mypy-limits"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["mypy-concept"],
      },
    },

    /* ── Lesson 5: Refactoring Safely ───────────────────────────────────── */
    {
      id: "s10-refactoring-safely",
      stageId: "stage-10",
      title: "Refactoring Safely",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Understand the test-first refactoring workflow",
        "Extract functions from long methods",
        "Remove duplication with helper functions",
        "Validate that behavior is unchanged after refactoring",
      ],
      prerequisites: ["s10-advanced-typing"],
      concepts: ["refactoring", "test-driven", "code-smell"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## The Refactoring Workflow

Refactoring is changing code structure *without changing behavior*. Safe refactoring requires tests:

1. **Confirm tests pass** before you start
2. **Make one small change** (rename, extract, inline)
3. **Run tests again** — they must still pass
4. **Repeat** until the design is cleaner

If tests fail after a structural change, you have a regression.`,
        },
        {
          kind: "comparison",
          leftLabel: "Before refactoring",
          rightLabel: "After extracting helpers",
          leftCode: `def process_order(items: list[dict]) -> float:
    total = 0.0
    for item in items:
        price = item["price"]
        qty = item["quantity"]
        discount = 0.0
        if qty > 10:
            discount = price * qty * 0.1
        total += price * qty - discount
    if total > 100:
        total *= 0.95
    return round(total, 2)`,
          rightCode: `def _line_total(item: dict) -> float:
    price = item["price"]
    qty = item["quantity"]
    discount = price * qty * 0.1 if qty > 10 else 0.0
    return price * qty - discount

def _apply_bulk_discount(total: float) -> float:
    return total * 0.95 if total > 100 else total

def process_order(items: list[dict]) -> float:
    raw = sum(_line_total(i) for i in items)
    return round(_apply_bulk_discount(raw), 2)`,
          caption: "Each extracted helper can be tested independently, making the code easier to reason about.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Common code smells to refactor",
          body: "• Function longer than ~20 lines → extract helpers\n• Same block of code in 3 places → extract a function\n• Misleading variable name → rename\n• Nested ifs 3+ levels deep → flatten with early returns",
        },
        {
          kind: "code",
          language: "python",
          code: `# Code smell: magic numbers
def shipping_cost(weight: float) -> float:
    if weight < 0.5:
        return 2.99
    elif weight < 2.0:
        return 5.99
    return 12.99

# Refactored: named constants + table-driven
LIGHT_LIMIT = 0.5
MEDIUM_LIMIT = 2.0
LIGHT_RATE = 2.99
MEDIUM_RATE = 5.99
HEAVY_RATE = 12.99

def shipping_cost_v2(weight: float) -> float:
    if weight < LIGHT_LIMIT:
        return LIGHT_RATE
    if weight < MEDIUM_LIMIT:
        return MEDIUM_RATE
    return HEAVY_RATE`,
          caption: "Named constants replace magic numbers, making the intent clear and the thresholds easy to update.",
        },
        {
          kind: "why-matters",
          body: "Refactoring is how good engineers pay down technical debt without breaking production. Without tests, refactoring is gambling. With tests, it is safe and systematic.",
        },
      ],
      interactions: [
        {
          id: "s10-rf-mc-workflow",
          kind: "multiple-choice",
          prompt: "What is the FIRST step in the safe refactoring workflow?",
          beginnerPurpose: "Reinforce that you need passing tests before changing code.",
          expectedConceptIds: ["refactoring"],
          options: [
            { id: "a", text: "Rename all variables to be more descriptive.", isCorrect: false, explanation: "Renaming before having tests means you can't confirm you haven't broken anything." },
            { id: "b", text: "Confirm existing tests pass.", isCorrect: true, explanation: "Correct! You need a green baseline before making structural changes." },
            { id: "c", text: "Delete code you think is unused.", isCorrect: false, explanation: "Deleting untested code is risky — you might remove something important." },
            { id: "d", text: "Add type hints to all functions.", isCorrect: false, explanation: "Type hints are valuable, but they come after establishing a test baseline." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "You need a green baseline to verify refactoring doesn't break behavior." }],
          feedback: {
            correct: "Exactly! A green test suite is your safety net before any structural change.",
            incorrect: "Always start by confirming all tests pass, so you have a green baseline to return to.",
          },
        },
        {
          id: "s10-rf-fill-extract",
          kind: "fill-code",
          prompt:
            "Extract the tax calculation into a helper `_tax(price)` that returns `price * 0.08`.",
          beginnerPurpose: "Practice the Extract Function refactoring.",
          expectedConceptIds: ["refactoring"],
          codeTemplate: `def ___BLANK_1___(price: float) -> float:
    return price * 0.08

def checkout_total(price: float) -> float:
    return price + ___BLANK_2___(price)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "_tax", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "_tax", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Name the helper `_tax` and call it in `checkout_total`." }],
          feedback: {
            correct: "Well done! The extracted `_tax` helper is independently testable.",
            incorrect: "Define `_tax(price)` and call `_tax(price)` inside `checkout_total`.",
          },
        },
        {
          id: "s10-rf-debug-regression",
          kind: "debug-code",
          prompt: "A refactoring introduced a bug. Find and fix it.",
          beginnerPurpose: "Recognise how a small mistake during refactoring can cause a regression.",
          expectedConceptIds: ["refactoring", "unit-test"],
          brokenCode: `def discount(price: float, pct: float) -> float:
    """Return price after applying percentage discount."""
    return price - (price / pct)   # BUG: should be * not /

def test_discount():
    assert discount(100.0, 0.10) == 90.0`,
          bugDescription:
            "The formula uses `/` (division) instead of `*` (multiplication). `price * pct` gives the discount amount.",
          fixedCode: `def discount(price: float, pct: float) -> float:
    """Return price after applying percentage discount."""
    return price - (price * pct)

def test_discount():
    assert discount(100.0, 0.10) == 90.0`,
          errorType: "AssertionError",
          allowedAttempts: 4,
          hints: [
            { level: "concept", text: "10% of 100 should be 10, subtracted from 100 to give 90." },
            { level: "syntax", text: "Change `/` to `*` in the formula." },
          ],
          feedback: {
            correct: "Correct! `price * pct` gives the discount amount; `/` gave the wrong result.",
            incorrect: "The formula should be `price - (price * pct)`. Division was incorrectly used.",
          },
        },
        {
          id: "s10-rf-run-typed",
          kind: "run-code",
          prompt:
            "Add type hints to this function and write one test that verifies it returns the correct count.",
          beginnerPurpose: "Practice combining type hints with testing.",
          expectedConceptIds: ["type-hint", "unit-test", "refactoring"],
          starterCode: `def count_vowels(text):
    return sum(1 for c in text.lower() if c in "aeiou")

# Add type hints above, then write a test below
def test_count_vowels():
    pass  # assert count_vowels("hello") == 2

test_count_vowels()
print("Test passed!")
`,
          task: "Add type hints to `count_vowels` and write an assertion in `test_count_vowels`.",
          expectedOutputContains: ["Test passed!"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "syntax", text: "The signature should be `def count_vowels(text: str) -> int:`." },
          ],
          feedback: {
            correct: "Excellent! Type-hinted and tested — quality code.",
            incorrect: "Add `text: str` and `-> int` to the signature, then add an `assert` in the test.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "refactoring", recallPrompt: "What must be true before you start refactoring?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s10-rf-mc-workflow", "s10-rf-fill-extract", "s10-rf-debug-regression"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["refactoring"],
      },
    },
  ],

  /* ── Project ──────────────────────────────────────────────────────────── */
  project: {
    id: "s10-tested-calculator",
    stageId: "stage-10",
    title: "Fully Tested and Typed Calculator Library",
    brief:
      "Take the Stage 5 calculator library and add complete type hints to every function, then write a comprehensive pytest test suite covering normal cases, edge cases, and error conditions.",
    requirements: [
      "Every function must have parameter type hints and a return type annotation",
      "Write at least 2 tests per operation (happy path + edge/error case)",
      "Use `pytest.raises` to test division by zero and other invalid inputs",
      "Use `@pytest.mark.parametrize` for at least one test",
      "All tests must pass with `pytest`",
      "Run mypy on the module with no errors",
    ],
    acceptanceCriteria: [
      "All functions have complete type annotations",
      "pytest reports 100% of tests passing",
      "At least one parametrized test exists",
      "Division by zero raises `ZeroDivisionError` and is tested",
      "mypy reports no errors on the module",
    ],
    conceptIds: ["unit-test", "type-hint", "return-type", "assertion", "refactoring"],
    difficulty: "intermediate",
    starterCode: `# calculator.py — add type hints to all functions

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

def power(base, exp):
    return base ** exp


# tests/test_calculator.py — write your tests here
import pytest
# from calculator import add, subtract, multiply, divide, power

# def test_add_positive():
#     assert add(2, 3) == 5
`,
  },
} satisfies Stage;
