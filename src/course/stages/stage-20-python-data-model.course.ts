import type { Stage } from "@/course/course.schema";

export const stage20 = {
  id: "stage-20",
  number: 20,
  title: "Python Data Model and Special Methods",
  summary:
    "Implement special methods to make custom objects behave like built-in types — supporting len(), iteration, arithmetic, comparisons, and context management.",
  level: "advanced",
  masteryGateConceptIds: ["special-methods", "data-model-protocol"],
  lessons: [
    {
      id: "s20-data-model-overview",
      stageId: "stage-20",
      title: "Data Model Overview",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain what the Python data model is",
        "Identify which special methods correspond to which syntax",
        "Understand why dunder methods matter for Pythonic code",
      ],
      prerequisites: [],
      concepts: ["special-methods"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Python Data Model\n\nThe **Python data model** is the set of rules governing how objects interact with the language. By implementing **special methods** (dunder methods — double underscore on both sides), your objects participate in Python syntax.\n\n| Syntax | Dunder method |\n|--------|---------------|\n| `len(obj)` | `__len__` |\n| `obj[key]` | `__getitem__` |\n| `for x in obj` | `__iter__` |\n| `obj + other` | `__add__` |\n| `str(obj)` | `__str__` |\n| `with obj:` | `__enter__`, `__exit__` |\n\nYou never call `obj.__len__()` directly — Python calls it for you when you write `len(obj)`.",
        },
        {
          kind: "mental-model",
          title: "Dunder methods as plugs",
          analogy: "Dunder methods are standardized electrical plugs. Python's syntax is the socket. Implement the plug, and your object fits into any Python socket that uses that interface.",
          explanation: "When you implement __iter__, your object works in for loops, list(), tuple(), any(), all(), zip(), and every other place that accepts iterables — without any extra code.",
        },
        {
          kind: "why-matters",
          body: "The data model is what makes Python feel consistent. A list, a DataFrame, a custom collection — all support the same operations because they implement the same dunder interfaces.",
        },
      ],
      interactions: [
        {
          id: "s20-dm-mc",
          kind: "multiple-choice",
          prompt: "Which dunder method does Python call when you write `len(my_obj)`?",
          beginnerPurpose: "Connect syntax to dunder method",
          expectedConceptIds: ["special-methods"],
          options: [
            { id: "a", text: "__length__", isCorrect: false, explanation: "The correct method name is __len__, not __length__." },
            { id: "b", text: "__len__", isCorrect: true, explanation: "Correct! Python calls __len__ when you use the len() built-in." },
            { id: "c", text: "__size__", isCorrect: false, explanation: "There is no __size__ in the data model." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The method name matches the built-in: len → __len__." }],
          feedback: { correct: "Correct!", incorrect: "len() calls __len__ on its argument." },
        },
        {
          id: "s20-dm-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace dunder method dispatch",
          expectedConceptIds: ["special-methods"],
          code: "class MyList:\n    def __init__(self, items):\n        self._items = items\n    def __len__(self):\n        return len(self._items)\n\nml = MyList([1, 2, 3, 4])\nprint(len(ml))",
          expectedOutput: "4",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "len(ml) calls ml.__len__() which calls len(self._items)." }],
          feedback: { correct: "Correct!", incorrect: "__len__ returns len(self._items) which is 4." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s20-dm-mc", "s20-dm-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s20-str-repr",
      stageId: "stage-20",
      title: "__str__ and __repr__",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Implement __str__ for human-readable output",
        "Implement __repr__ for developer-oriented output",
        "Know when each is called",
      ],
      prerequisites: ["s20-data-model-overview"],
      concepts: ["special-methods"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## __str__ and __repr__\n\n- `__str__` — called by `str(obj)` and `print(obj)`. Should be **human-readable**.\n- `__repr__` — called by `repr(obj)`, in REPL, and in containers. Should be **unambiguous** and ideally recreatable.\n\n```python\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f\"({self.x}, {self.y})\"\n\n    def __repr__(self):\n        return f\"Point(x={self.x!r}, y={self.y!r})\"\n\np = Point(1, 2)\nprint(str(p))   # (1, 2)\nprint(repr(p))  # Point(x=1, y=2)\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "If only one, implement __repr__",
          body: "Python falls back to __repr__ if __str__ is not defined. __repr__ is more important: it appears in debuggers, logs, and interactive sessions.",
        },
        {
          kind: "comparison",
          leftLabel: "str — user-facing",
          rightLabel: "repr — developer-facing",
          leftCode: "print(datetime.now())\n# 2026-06-06 15:30:00.123456\n# Readable by humans",
          rightCode: "repr(datetime.now())\n# datetime.datetime(2026, 6, 6, 15, 30, 0, 123456)\n# Can recreate the object",
        },
      ],
      interactions: [
        {
          id: "s20-repr-fill",
          kind: "fill-code",
          prompt: "Implement __repr__ so eval(repr(c)) recreates the Color object.",
          beginnerPurpose: "Write a reproducing repr",
          expectedConceptIds: ["special-methods"],
          codeTemplate: "class Color:\n    def __init__(self, r, g, b):\n        self.r, self.g, self.b = r, g, b\n\n    def __repr__(self):\n        return f\"_____(r={self.r!r}, g={self.g!r}, b={self.b!r})\"",
          blanks: [{ placeholder: "_____", answer: "Color", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The class name should appear first in a recreatable repr." }],
          feedback: { correct: "Correct! repr now returns Color(r=..., g=..., b=...).", incorrect: "Use the class name Color as the prefix." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s20-repr-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s20-eq-hash",
      stageId: "stage-20",
      title: "__eq__ and __hash__",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Implement __eq__ to define equality",
        "Explain why __hash__ must be consistent with __eq__",
        "Know the implications of defining only __eq__",
      ],
      prerequisites: ["s20-str-repr"],
      concepts: ["special-methods"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## __eq__ and __hash__\n\n`__eq__` defines what `==` means. `__hash__` makes objects usable as dict keys and in sets.\n\n```python\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __eq__(self, other):\n        if not isinstance(other, Point):\n            return NotImplemented\n        return self.x == other.x and self.y == other.y\n\n    def __hash__(self):\n        return hash((self.x, self.y))\n\np1, p2 = Point(1, 2), Point(1, 2)\nprint(p1 == p2)              # True\nprint({p1: 'origin'}[p2])   # origin\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Defining __eq__ without __hash__",
          body: "If you define __eq__ without __hash__, Python sets __hash__ = None, making the object unhashable. You cannot use it as a dict key or in a set. Always implement both together.",
        },
      ],
      interactions: [
        {
          id: "s20-hash-mc",
          kind: "multiple-choice",
          prompt: "You define __eq__ on class Card but forget __hash__. What happens when you try `{Card('A', 'hearts'): 10}`?",
          beginnerPurpose: "Understand hash/eq contract",
          expectedConceptIds: ["special-methods"],
          options: [
            { id: "a", text: "TypeError: unhashable type: 'Card'", isCorrect: true, explanation: "Correct! Defining __eq__ without __hash__ sets __hash__ = None, making Card unhashable." },
            { id: "b", text: "Works fine using object identity as hash", isCorrect: false, explanation: "Python explicitly removes __hash__ when you define __eq__ — it doesn't fall back silently." },
            { id: "c", text: "AttributeError: Card has no __hash__", isCorrect: false, explanation: "The error is TypeError, not AttributeError." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Defining __eq__ without __hash__ makes __hash__ = None." }],
          feedback: { correct: "Correct! Always define both __eq__ and __hash__ together.", incorrect: "Python sets __hash__ = None when you define __eq__." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s20-hash-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s20-container-protocol",
      stageId: "stage-20",
      title: "Container Protocol: __len__, __getitem__, __contains__",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Implement __len__ to support len()",
        "Implement __getitem__ to support indexing and slicing",
        "Implement __contains__ to support the in operator",
      ],
      prerequisites: ["s20-eq-hash"],
      concepts: ["data-model-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Container Protocol\n\nImplement these to make your class behave like a sequence or mapping:\n\n```python\nclass RangeSet:\n    def __init__(self, start, stop):\n        self._items = list(range(start, stop))\n\n    def __len__(self):\n        return len(self._items)\n\n    def __getitem__(self, index):\n        return self._items[index]\n\n    def __contains__(self, item):\n        return item in self._items\n\nrs = RangeSet(1, 6)\nprint(len(rs))       # 5\nprint(rs[2])         # 3\nprint(3 in rs)       # True\nprint(list(rs))      # [1, 2, 3, 4, 5] -- __getitem__ enables iteration too\n```\n\n**Bonus:** If you implement `__getitem__` with integer keys, Python also gets `__iter__` and `__reversed__` for free.",
        },
        {
          kind: "why-matters",
          body: "Once your class implements the container protocol, it works everywhere Python expects a sequence: sorted(), min(), max(), unpacking, list comprehensions, and more.",
        },
      ],
      interactions: [
        {
          id: "s20-container-run",
          kind: "run-code",
          prompt: "Implement a Stack class with __len__ and __getitem__ (index from top). Stack([1, 2, 3])[0] should return 3 (top). Print len and top element.",
          beginnerPurpose: "Apply container protocol",
          expectedConceptIds: ["data-model-protocol"],
          starterCode: "class Stack:\n    def __init__(self, items):\n        self._items = list(items)\n\n    # implement __len__ and __getitem__ here\n\ns = Stack([1, 2, 3])\nprint(len(s))\nprint(s[0])",
          task: "Print 3 then 3",
          expectedOutputContains: ["3"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "__getitem__(self, index) should return self._items[-(index+1)] for top-first indexing." }],
          feedback: { correct: "Correct!", incorrect: "Remember: index 0 is the top, which is the last item in the list." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s20-container-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s20-context-manager-protocol",
      stageId: "stage-20",
      title: "Context Manager Protocol: __enter__ and __exit__",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Implement __enter__ and __exit__ to support the with statement",
        "Handle exceptions cleanly in __exit__",
        "Know the signature of __exit__",
      ],
      prerequisites: ["s20-container-protocol"],
      concepts: ["data-model-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Context Manager Protocol\n\n```python\nclass Timer:\n    import time\n\n    def __enter__(self):\n        self._start = time.perf_counter()\n        return self  # available as 'as' variable\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        elapsed = time.perf_counter() - self._start\n        print(f\"Elapsed: {elapsed:.3f}s\")\n        return False  # don't suppress exceptions\n\nwith Timer() as t:\n    sum(range(1_000_000))\n# Elapsed: 0.023s\n```\n\n`__exit__` receives the exception info. Return `True` to suppress the exception, `False` (or `None`) to let it propagate.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "__exit__ signature is fixed",
          body: "__exit__(self, exc_type, exc_val, exc_tb) always takes three arguments after self, even if no exception occurred (they are None in that case).",
        },
      ],
      interactions: [
        {
          id: "s20-cm-mc",
          kind: "multiple-choice",
          prompt: "What should __exit__ return to suppress an exception that occurred inside the with block?",
          beginnerPurpose: "Control exception propagation",
          expectedConceptIds: ["data-model-protocol"],
          options: [
            { id: "a", text: "True", isCorrect: true, explanation: "Correct! Returning a truthy value from __exit__ suppresses the exception." },
            { id: "b", text: "False", isCorrect: false, explanation: "Returning False (or None) lets the exception propagate." },
            { id: "c", text: "None", isCorrect: false, explanation: "None is falsy — the exception propagates." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Truthy = suppress. Falsy = propagate." }],
          feedback: { correct: "Correct! Return True to eat the exception.", incorrect: "Return True to suppress, False/None to let it propagate." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s20-cm-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s20-project",
    stageId: "stage-20",
    title: "Data-Model Project: Custom Collection",
    brief:
      "Build a SortedList class that implements the full sequence protocol (__len__, __getitem__, __contains__, __iter__, __repr__) and stays sorted on insertion.",
    requirements: [
      "SortedList maintains sorted order after every append()",
      "Supports len(), indexing, slicing, and 'in' operator",
      "Has a clear __repr__",
      "All public methods have type annotations",
    ],
    acceptanceCriteria: [
      "sorted_list[0] returns smallest element",
      "x in sorted_list works correctly",
      "list(sorted_list) returns sorted list",
    ],
    conceptIds: ["special-methods", "data-model-protocol"],
    difficulty: "advanced",
  },
} satisfies Stage;
