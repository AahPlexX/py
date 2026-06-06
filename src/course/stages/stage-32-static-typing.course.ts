import type { Stage } from "@/course/course.schema";

export const stage32 = {
  id: "stage-32",
  number: 32,
  title: "Static Typing and Type System Mastery",
  summary:
    "Add type annotations to Python code and use type checkers like mypy to catch errors before runtime.",
  level: "advanced",
  masteryGateConceptIds: ["type-annotations", "generics-typing"],
  lessons: [
    {
      id: "s32-why-typing",
      stageId: "stage-32",
      title: "Why Static Typing Exists",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain the difference between dynamic and static typing",
        "List the benefits of type annotations",
        "Know that annotations are optional and ignored at runtime",
      ],
      prerequisites: [],
      concepts: ["type-annotations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Why Static Typing\n\nPython is dynamically typed — type errors only appear at runtime. Static typing adds **optional annotations** that type checkers verify before running:\n\n```python\ndef greet(name: str) -> str:\n    return \"Hello, \" + name\n\ngreet(42)  # Python runs this fine -- but mypy flags it:\n           # Argument 1 to \"greet\" has incompatible type \"int\"; expected \"str\"\n```\n\n**Benefits of annotations:**\n- Catch type errors before they reach production\n- Serve as executable documentation\n- Enable better IDE autocompletion and refactoring\n- Make large codebases navigable\n\n**Key fact:** Python ignores annotations at runtime — they have zero performance impact and do not change behavior.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Gradual typing",
          body: "You don't need to annotate everything at once. Start with public interfaces. Use `Any` for parts you haven't annotated yet. Type coverage improves incrementally.",
        },
        {
          kind: "why-matters",
          body: "In large codebases or team projects, type errors without annotations are found by users, not developers. Annotations shift error discovery left — to the editor, before any code runs.",
        },
      ],
      interactions: [
        {
          id: "s32-typing-mc",
          kind: "multiple-choice",
          prompt: "What happens when Python runs a function with incorrect type annotations (e.g., passing int where str is annotated)?",
          beginnerPurpose: "Understand runtime vs static checking",
          expectedConceptIds: ["type-annotations"],
          options: [
            { id: "a", text: "Python raises TypeError at runtime", isCorrect: false, explanation: "Annotations are ignored at runtime. Python does not enforce them." },
            { id: "b", text: "Python ignores annotations — no error at runtime", isCorrect: true, explanation: "Correct! Annotations are hints for tools, not enforced by the interpreter." },
            { id: "c", text: "Python raises AnnotationError", isCorrect: false, explanation: "There is no AnnotationError — Python ignores all annotations at runtime." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Annotations are metadata for tools (mypy, pyright), not enforced by Python." }],
          feedback: { correct: "Correct! Python ignores annotations at runtime.", incorrect: "Python ignores type annotations at runtime — they're only used by static type checkers." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s32-typing-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s32-basic-annotations",
      stageId: "stage-32",
      title: "Basic Annotations: Variables, Parameters, Returns",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Annotate function parameters and return types",
        "Annotate variable assignments",
        "Use Optional for values that may be None",
      ],
      prerequisites: ["s32-why-typing"],
      concepts: ["type-annotations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Basic Annotations\n\n```python\n# Variable annotation\ncount: int = 0\nname: str = \"Alice\"\n\n# Function annotation\ndef add(a: int, b: int) -> int:\n    return a + b\n\ndef greet(name: str) -> None:  # returns nothing\n    print(f\"Hello, {name}\")\n\n# Optional — value may be None\nfrom typing import Optional\n\ndef find_user(user_id: int) -> Optional[str]:\n    if user_id == 1:\n        return \"Alice\"\n    return None  # explicitly allowed\n```\n\nIn Python 3.10+, use `str | None` instead of `Optional[str]`.",
        },
        {
          kind: "comparison",
          leftLabel: "Python 3.9 style",
          rightLabel: "Python 3.10+ style",
          leftCode: "from typing import Optional, Union\n\ndef find(id: int) -> Optional[str]:\n    ...\n\ndef process(val: Union[int, str]) -> str:\n    ...",
          rightCode: "# No import needed\n\ndef find(id: int) -> str | None:\n    ...\n\ndef process(val: int | str) -> str:\n    ...",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "-> None for procedures",
          body: "Annotate functions that return nothing with -> None. This makes it explicit that the function is called for side effects, not its return value.",
        },
      ],
      interactions: [
        {
          id: "s32-basic-fill",
          kind: "fill-code",
          prompt: "Add annotations: the function takes a list of ints and returns their sum as a float.",
          beginnerPurpose: "Annotate function with list parameter",
          expectedConceptIds: ["type-annotations"],
          codeTemplate: "def sum_as_float(numbers: list[_____]) -> _____:\n    return float(sum(numbers))",
          blanks: [
            { placeholder: "_____", answer: "int", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The list contains ints. The return type is float." }],
          feedback: { correct: "Correct!", incorrect: "Use list[int] for the parameter, float for the return." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s32-basic-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s32-generics",
      stageId: "stage-32",
      title: "Generics, TypeVar, and Protocols",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Use TypeVar to write generic functions",
        "Define Protocols for structural subtyping",
        "Understand the difference between nominal and structural typing",
      ],
      prerequisites: ["s32-basic-annotations"],
      concepts: ["generics-typing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Generics with TypeVar\n\n`TypeVar` creates type variables for generic functions:\n\n```python\nfrom typing import TypeVar\n\nT = TypeVar('T')\n\ndef first(items: list[T]) -> T:\n    return items[0]\n\nresult: int = first([1, 2, 3])     # T inferred as int\nresult2: str = first(['a', 'b'])   # T inferred as str\n```\n\n## Protocols\n\nProtocols define structural interfaces — \"if it has these methods, it qualifies\":\n\n```python\nfrom typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> None: ...\n\ndef render(item: Drawable) -> None:\n    item.draw()  # any object with draw() works\n```\n\nNo `class Circle(Drawable)` required — structural match is enough.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Protocols enable duck typing with type safety",
          body: "Protocols formalize Python's duck typing: if a class has the right methods, it satisfies the Protocol — no explicit inheritance needed. This is called structural subtyping.",
        },
      ],
      interactions: [
        {
          id: "s32-generics-mc",
          kind: "multiple-choice",
          prompt: "What does TypeVar('T') allow in a function signature?",
          beginnerPurpose: "Understand type variables",
          expectedConceptIds: ["generics-typing"],
          options: [
            { id: "a", text: "Accepts any type and returns the same type", isCorrect: true, explanation: "Correct! T is linked — if input is list[str], output is str." },
            { id: "b", text: "Always accepts str", isCorrect: false, explanation: "TypeVar is not bound to any specific type by default." },
            { id: "c", text: "Allows Any input and Any output independently", isCorrect: false, explanation: "Unlike Any, TypeVar links types together. If input is T, output T must match the same concrete type." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "TypeVar T links: T input means T output — same type." }],
          feedback: { correct: "Correct! TypeVar links the type across parameters and return.", incorrect: "TypeVar T links input and output types together." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s32-generics-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s32-narrowing",
      stageId: "stage-32",
      title: "Type Narrowing and Type Guards",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain how isinstance narrows union types",
        "Use TypeGuard for custom narrowing functions",
        "Write exhaustive checks with assert_never",
      ],
      prerequisites: ["s32-generics"],
      concepts: ["type-annotations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Type Narrowing\n\nType checkers narrow a union type based on runtime checks:\n\n```python\ndef process(value: int | str) -> str:\n    if isinstance(value, int):\n        # here, value is narrowed to int\n        return str(value * 2)\n    # here, value is narrowed to str\n    return value.upper()\n```\n\n## Exhaustiveness Checking\n\n```python\nfrom typing import NoReturn\n\ndef assert_never(x: NoReturn) -> NoReturn:\n    raise AssertionError(f\"Unexpected value: {x}\")\n\ndef handle(event: 'LoginEvent | LogoutEvent | PurchaseEvent') -> str:\n    if isinstance(event, LoginEvent):\n        return \"logged in\"\n    elif isinstance(event, LogoutEvent):\n        return \"logged out\"\n    elif isinstance(event, PurchaseEvent):\n        return \"purchased\"\n    assert_never(event)  # type checker flags if a case is missing\n```",
        },
        {
          kind: "why-matters",
          body: "Exhaustiveness checking catches missing cases at compile time. When you add a new event type, mypy will flag every assert_never that doesn't handle it yet.",
        },
      ],
      interactions: [
        {
          id: "s32-narrowing-predict",
          kind: "predict-output",
          prompt: "What does this print? (mypy would be happy with this code)",
          beginnerPurpose: "Trace type narrowing",
          expectedConceptIds: ["type-annotations"],
          code: "def describe(x: int | str) -> str:\n    if isinstance(x, int):\n        return f\"number: {x}\"\n    return f\"text: {x}\"\n\nprint(describe(42))\nprint(describe(\"hello\"))",
          expectedOutput: "number: 42\ntext: hello",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "isinstance checks narrow the type in each branch." }],
          feedback: { correct: "Correct!", incorrect: "isinstance(x, int) narrows x to int in that branch." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s32-narrowing-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s32-project",
    stageId: "stage-32",
    title: "Library Typing Project",
    brief:
      "Add complete, strict type annotations to an existing untyped Python utility library. Configure mypy with strict settings and achieve zero type errors.",
    requirements: [
      "Annotate all function parameters and return types",
      "Use TypeVar for generic functions",
      "Define at least one Protocol interface",
      "mypy --strict passes with zero errors",
      "Optional/None handling is explicit",
    ],
    acceptanceCriteria: [
      "mypy --strict reports no errors",
      "All public functions have complete annotations",
      "Generic functions use TypeVar correctly",
    ],
    conceptIds: ["type-annotations", "generics-typing"],
    difficulty: "advanced",
  },
} satisfies Stage;
