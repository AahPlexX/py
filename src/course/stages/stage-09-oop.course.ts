import type { Stage } from "@/course/course.schema";

export const stage09 = {
  id: "stage-09",
  number: 9,
  title: "Object-Oriented Python",
  summary:
    "Model behavior with classes, dataclasses, methods, properties, and composition over inheritance.",
  level: "intermediate",
  masteryGateConceptIds: [
    "class",
    "object-instance",
    "method",
    "attribute",
    "dataclass",
    "property",
    "composition",
  ],
  lessons: [
    /* ── Lesson 1: Classes and Objects ─────────────────────────────────── */
    {
      id: "s9-classes-objects",
      stageId: "stage-09",
      title: "Classes and Objects",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define a class using the `class` keyword",
        "Create instances of a class",
        "Understand `__init__` as the constructor",
        "Distinguish between classes and instances",
      ],
      prerequisites: [],
      concepts: ["class", "object-instance", "constructor"],
      contentBlocks: [
        {
          kind: "mental-model",
          title: "A class is a blueprint; an object is a house built from it",
          analogy:
            "A class is like an architectural blueprint. The blueprint defines what every house will have — rooms, doors, windows — but the blueprint itself is not a house. Each time you build from the blueprint, you get a distinct house (object) that you can paint differently, furnish differently, and live in.",
          explanation:
            "In Python, `class Dog:` defines the blueprint. `rex = Dog()` constructs one specific dog from that blueprint. `rex` and `fido = Dog()` are two separate objects that share the same structure but hold independent data.",
        },
        {
          kind: "text",
          markdown: `## Defining a Class

Use the \`class\` keyword followed by a PascalCase name. The special method \`__init__\` runs automatically when you create a new instance and is where you set up instance attributes.

\`\`\`python
class Dog:
    def __init__(self, name: str, breed: str) -> None:
        self.name = name      # instance attribute
        self.breed = breed

rex = Dog("Rex", "Labrador")
fido = Dog("Fido", "Poodle")

print(rex.name)    # Rex
print(fido.breed)  # Poodle
\`\`\`

Every method receives \`self\` as its first parameter. \`self\` refers to the specific instance being operated on.`,
        },
        {
          kind: "code",
          language: "python",
          code: `class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float) -> None:
        self.balance += amount

    def __repr__(self) -> str:
        return f"BankAccount(owner={self.owner!r}, balance={self.balance:.2f})"

acct = BankAccount("Alice", 100.0)
acct.deposit(50.0)
print(acct)          # BankAccount(owner='Alice', balance=150.00)
print(acct.balance)  # 150.0`,
          caption:
            "`__repr__` gives a developer-friendly string representation of the object.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "`self` is a convention, not a keyword",
          body: "Python passes the instance as the first argument to every instance method. By convention it is named `self`, but you could name it anything. Sticking to `self` is strongly recommended for readability.",
        },
        {
          kind: "glossary-term",
          term: "class",
          definition:
            "A template that defines the structure (attributes) and behavior (methods) shared by all instances of that type.",
          example: "class Point: ...",
        },
        {
          kind: "glossary-term",
          term: "object-instance",
          definition:
            "A concrete value created from a class. Each instance has its own copy of instance attributes.",
          example: "p = Point(3, 4)  # p is an instance",
        },
        {
          kind: "why-matters",
          body: "Classes let you bundle related data and behavior together. Instead of tracking a name, breed, and age in three separate variables, a `Dog` class groups them under one coherent concept — making your code easier to understand, extend, and reuse.",
        },
      ],
      interactions: [
        {
          id: "s9-co-predict-repr",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Practice reading class definitions and tracing attribute access.",
          expectedConceptIds: ["class", "object-instance"],
          code: `class Point:
    def __init__(self, x: int, y: int) -> None:
        self.x = x
        self.y = y

p = Point(3, 7)
print(p.x + p.y)`,
          expectedOutput: "10",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Trace what values `x` and `y` receive in `__init__`.",
            },
            {
              level: "syntax",
              text: "`p.x` accesses the `x` attribute of the instance `p`.",
            },
          ],
          feedback: {
            correct:
              "Correct! `p.x` is 3 and `p.y` is 7, so 3 + 7 = 10.",
            incorrect:
              "Trace through: `Point(3, 7)` sets `self.x = 3` and `self.y = 7`. Then `p.x + p.y` = 3 + 7.",
          },
        },
        {
          id: "s9-co-fill-init",
          kind: "fill-code",
          prompt:
            "Complete the `__init__` method so `Car('Toyota', 2020)` stores the make and year.",
          beginnerPurpose: "Practice writing `__init__` with instance attributes.",
          expectedConceptIds: ["class", "constructor"],
          codeTemplate: `class Car:
    def __init__(self, make: str, year: int) -> None:
        ___BLANK_1___ = make
        ___BLANK_2___ = year`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "self.make", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "self.year", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Instance attributes are stored on `self`.",
            },
            {
              level: "syntax",
              text: "Use `self.attribute_name = value` to set an attribute.",
            },
          ],
          feedback: {
            correct:
              "Perfect! `self.make` and `self.year` store the data on the instance.",
            incorrect:
              "Remember: to store data on an instance, write `self.attribute_name = value`.",
          },
        },
        {
          id: "s9-co-mc-class-vs-instance",
          kind: "multiple-choice",
          prompt:
            "You define `class Circle:` and then write `c1 = Circle(5)` and `c2 = Circle(10)`. Which statement is true?",
          beginnerPurpose:
            "Clarify that a class is shared but instances hold independent data.",
          expectedConceptIds: ["class", "object-instance"],
          options: [
            {
              id: "a",
              text: "`c1` and `c2` are the same object in memory.",
              isCorrect: false,
              explanation:
                "Each call to `Circle(...)` creates a new, separate object.",
            },
            {
              id: "b",
              text: "`c1` and `c2` are separate objects that share the `Circle` blueprint.",
              isCorrect: true,
              explanation:
                "Correct. Both are instances of `Circle` but hold independent attribute values.",
            },
            {
              id: "c",
              text: "Defining `class Circle:` creates one object automatically.",
              isCorrect: false,
              explanation:
                "A class definition creates a *type*, not an instance. You need to call `Circle(...)` to make an instance.",
            },
            {
              id: "d",
              text: "Methods defined in `Circle` only belong to `c1`.",
              isCorrect: false,
              explanation:
                "Methods defined in the class are available to every instance.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Think of the blueprint analogy: one blueprint, many houses.",
            },
          ],
          feedback: {
            correct: "Exactly! The class is the shared template; instances are the built objects.",
            incorrect:
              "A class is a blueprint. Each call like `Circle(5)` constructs a new independent object.",
          },
        },
        {
          id: "s9-co-run-class",
          kind: "run-code",
          prompt:
            "Define a `Rectangle` class with `width` and `height` attributes and an `area()` method. Create an instance and print its area.",
          beginnerPurpose: "Practice writing a complete class from scratch.",
          expectedConceptIds: ["class", "method", "object-instance"],
          starterCode: `class Rectangle:
    def __init__(self, width: float, height: float) -> None:
        # store width and height
        pass

    def area(self) -> float:
        # return width * height
        pass

r = Rectangle(4, 6)
print(r.area())
`,
          task: "Make `r.area()` return 24 and print it.",
          expectedOutputContains: ["24"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            {
              level: "syntax",
              text: "Store with `self.width = width`, then return `self.width * self.height`.",
            },
          ],
          feedback: {
            correct: "Well done! Your `Rectangle` class is complete.",
            incorrect:
              "Make sure `__init__` saves the values and `area()` returns their product.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "class",
          recallPrompt: "What is the difference between a class and an instance?",
          nextReviewAfterDays: 1,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s9-co-predict-repr",
          "s9-co-fill-init",
          "s9-co-mc-class-vs-instance",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["class"],
      },
    },

    /* ── Lesson 2: Methods and Attributes ──────────────────────────────── */
    {
      id: "s9-methods-attributes",
      stageId: "stage-09",
      title: "Methods and Attributes",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish instance, class, and static attributes",
        "Write instance methods that read and mutate state",
        "Write class methods and static methods",
        "Use `__str__` and `__repr__` for string representations",
      ],
      prerequisites: [],
      concepts: ["method", "attribute", "class-attribute", "dunder-method"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## Instance vs Class Attributes

**Instance attributes** are unique to each object and set via \`self\`.
**Class attributes** are shared across all instances and defined at class body level.

\`\`\`python
class Counter:
    count: int = 0        # class attribute — shared

    def __init__(self, label: str) -> None:
        self.label = label  # instance attribute — unique
        Counter.count += 1

a = Counter("a")
b = Counter("b")
print(Counter.count)  # 2
print(a.label)        # a
\`\`\``,
        },
        {
          kind: "comparison",
          leftLabel: "Instance method",
          rightLabel: "Static method",
          leftCode: `class Greeter:
    def __init__(self, name: str) -> None:
        self.name = name

    def greet(self) -> str:
        return f"Hello, {self.name}!"

g = Greeter("Ada")
print(g.greet())  # Hello, Ada!`,
          rightCode: `class Greeter:
    @staticmethod
    def formal_title(name: str) -> str:
        return f"Dr. {name}"

# No instance needed
print(Greeter.formal_title("Turing"))
# Dr. Turing`,
          caption:
            "Instance methods receive `self`; static methods are utility functions that happen to live in the class namespace.",
        },
        {
          kind: "code",
          language: "python",
          code: `class Temperature:
    def __init__(self, celsius: float) -> None:
        self._celsius = celsius

    @classmethod
    def from_fahrenheit(cls, f: float) -> "Temperature":
        return cls((f - 32) * 5 / 9)

    @property
    def celsius(self) -> float:
        return self._celsius

    def __str__(self) -> str:
        return f"{self._celsius:.1f}°C"

    def __repr__(self) -> str:
        return f"Temperature(celsius={self._celsius})"

boiling = Temperature.from_fahrenheit(212)
print(boiling)         # 100.0°C
print(repr(boiling))   # Temperature(celsius=100.0)`,
          caption:
            "`@classmethod` is ideal for alternative constructors. `__str__` targets end users; `__repr__` targets developers.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Name-mangling with underscores",
          body: "A single underscore prefix (`_balance`) signals 'internal use — please don't touch from outside.' A double underscore (`__balance`) triggers Python's name-mangling mechanism, making accidental overrides in subclasses less likely.",
        },
        {
          kind: "why-matters",
          body: "Understanding when to use `@classmethod`, `@staticmethod`, or a plain instance method is a sign of mature Python design. It signals to readers exactly what role a function plays and whether it depends on instance or class state.",
        },
      ],
      interactions: [
        {
          id: "s9-ma-predict-classattr",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Understand shared class attributes vs instance attributes.",
          expectedConceptIds: ["attribute", "class-attribute"],
          code: `class Widget:
    total: int = 0

    def __init__(self, name: str) -> None:
        self.name = name
        Widget.total += 1

w1 = Widget("A")
w2 = Widget("B")
w3 = Widget("C")
print(Widget.total)`,
          expectedOutput: "3",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "`Widget.total` is incremented once for each `Widget(...)` call.",
            },
          ],
          feedback: {
            correct: "Right! Each instantiation increments the shared `total` by 1.",
            incorrect:
              "Each `Widget(...)` call runs `__init__`, which adds 1 to `Widget.total`. Three calls → 3.",
          },
        },
        {
          id: "s9-ma-fill-classmethod",
          kind: "fill-code",
          prompt:
            "Complete the `from_string` classmethod that parses `'3,4'` into a `Point(3, 4)`.",
          beginnerPurpose: "Practice writing alternative constructors with `@classmethod`.",
          expectedConceptIds: ["method", "class-attribute"],
          codeTemplate: `class Point:
    def __init__(self, x: int, y: int) -> None:
        self.x = x
        self.y = y

    ___BLANK_1___
    def from_string(cls, s: str) -> "Point":
        x, y = s.split(",")
        return ___BLANK_2___(int(x), int(y))`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "@classmethod", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "cls", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "Decorate the method with `@classmethod` and use `cls(...)` to construct the instance.",
            },
          ],
          feedback: {
            correct:
              "Perfect! `@classmethod` and `cls(...)` are the two key pieces of an alternative constructor.",
            incorrect:
              "Use `@classmethod` as the decorator and call `cls(...)` instead of the class name.",
          },
        },
        {
          id: "s9-ma-debug-static",
          kind: "debug-code",
          prompt:
            "The `add` method doesn't need `self` — fix it so it works as a static utility.",
          beginnerPurpose: "Learn when to apply `@staticmethod`.",
          expectedConceptIds: ["method"],
          brokenCode: `class MathUtils:
    def add(a: int, b: int) -> int:
        return a + b

print(MathUtils.add(2, 3))`,
          bugDescription:
            "Python treats `a` as `self` when calling `MathUtils.add(2, 3)` without the `@staticmethod` decorator, so `b` is missing.",
          fixedCode: `class MathUtils:
    @staticmethod
    def add(a: int, b: int) -> int:
        return a + b

print(MathUtils.add(2, 3))`,
          errorType: "TypeError",
          allowedAttempts: 4,
          hints: [
            {
              level: "syntax",
              text: "Add `@staticmethod` on the line before `def add`.",
            },
          ],
          feedback: {
            correct:
              "Correct! `@staticmethod` tells Python not to pass the instance or class as the first argument.",
            incorrect:
              "Without `@staticmethod`, Python injects `self` as the first argument, shifting `a` and `b` out of position.",
          },
        },
        {
          id: "s9-ma-plain-explain-dunder",
          kind: "plain-language-explain",
          prompt: "Explain in plain language what `__str__` and `__repr__` do and why they differ.",
          beginnerPurpose:
            "Build mental clarity about Python's special methods for string representation.",
          expectedConceptIds: ["dunder-method", "method"],
          code: `class Fraction:
    def __init__(self, num: int, den: int) -> None:
        self.num = num
        self.den = den

    def __str__(self) -> str:
        return f"{self.num}/{self.den}"

    def __repr__(self) -> str:
        return f"Fraction({self.num}, {self.den})"

f = Fraction(3, 4)
print(str(f))   # 3/4
print(repr(f))  # Fraction(3, 4)`,
          keyPointsToHit: [
            "`__str__` is for end-users and is called by `print()`",
            "`__repr__` is for developers and should ideally look like a constructor call",
            "If only `__repr__` is defined, Python uses it for both",
          ],
          sampleAnswer:
            "`__str__` produces a human-friendly string (e.g., `3/4`) that `print()` uses. `__repr__` produces a developer-friendly string that ideally could be pasted back as code to recreate the object (e.g., `Fraction(3, 4)`). When `__str__` is absent, Python falls back to `__repr__`.",
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Think: `__str__` for display, `__repr__` for debugging.",
            },
          ],
          feedback: {
            correct: "Great explanation! Those three key points show you understand the distinction.",
            incorrect:
              "Focus on the audience: `__str__` is for users (readable), `__repr__` is for devs (reconstructable).",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "method",
          recallPrompt:
            "What is the difference between an instance method and a class method?",
          nextReviewAfterDays: 2,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s9-ma-predict-classattr",
          "s9-ma-fill-classmethod",
          "s9-ma-debug-static",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["method"],
      },
    },

    /* ── Lesson 3: Dataclasses ─────────────────────────────────────────── */
    {
      id: "s9-dataclasses",
      stageId: "stage-09",
      title: "Dataclasses",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use `@dataclass` to eliminate boilerplate `__init__`",
        "Mark fields as frozen, optional, or post-init computed",
        "Compare dataclasses vs namedtuples vs plain classes",
        "Use `field()` for mutable defaults",
      ],
      prerequisites: [],
      concepts: ["dataclass", "field", "frozen-dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## The Problem Dataclasses Solve

Writing \`__init__\`, \`__repr__\`, and \`__eq__\` by hand for every data-holding class is tedious.
The \`@dataclass\` decorator generates them automatically from annotated fields.`,
        },
        {
          kind: "comparison",
          leftLabel: "Plain class",
          rightLabel: "@dataclass",
          leftCode: `class Point:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"

    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)`,
          rightCode: `from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

# __init__, __repr__, __eq__
# are all generated for free`,
          caption: "The dataclass version is shorter and less error-prone.",
        },
        {
          kind: "code",
          language: "python",
          code: `from dataclasses import dataclass, field
from typing import ClassVar

@dataclass
class Inventory:
    name: str
    quantity: int = 0
    tags: list[str] = field(default_factory=list)
    _count: ClassVar[int] = 0   # class variable, not a field

    def add_tag(self, tag: str) -> None:
        self.tags.append(tag)

item = Inventory("Widget", 10)
item.add_tag("sale")
print(item)
# Inventory(name='Widget', quantity=10, tags=['sale'])`,
          caption:
            "Use `field(default_factory=list)` for mutable defaults — never use `tags: list = []` directly.",
          highlight: [6],
        },
        {
          kind: "code",
          language: "python",
          code: `from dataclasses import dataclass

@dataclass(frozen=True)
class Color:
    r: int
    g: int
    b: int

    def to_hex(self) -> str:
        return f"#{self.r:02x}{self.g:02x}{self.b:02x}"

red = Color(255, 0, 0)
print(red.to_hex())   # #ff0000
# red.r = 128         # raises FrozenInstanceError`,
          caption:
            "`frozen=True` makes the dataclass immutable and hashable — safe to use in sets and as dict keys.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Never use mutable default arguments",
          body: "Writing `tags: list = []` as a class-level default shares the same list across all instances — a classic Python footgun. Always use `field(default_factory=list)` or `field(default_factory=dict)` for mutable defaults.",
        },
        {
          kind: "why-matters",
          body: "Dataclasses are now the idiomatic way to create data-focused classes in Python. They appear throughout modern codebases, web frameworks (FastAPI, Pydantic), and standard library modules. Mastering them means less boilerplate and fewer bugs.",
        },
      ],
      interactions: [
        {
          id: "s9-dc-predict-frozen",
          kind: "predict-output",
          prompt: "What happens when you run this code?",
          beginnerPurpose: "Understand that frozen dataclasses are immutable.",
          expectedConceptIds: ["dataclass", "frozen-dataclass"],
          code: `from dataclasses import dataclass, FrozenInstanceError

@dataclass(frozen=True)
class Vec2:
    x: float
    y: float

v = Vec2(1.0, 2.0)
try:
    v.x = 99.0
except FrozenInstanceError as e:
    print("Cannot modify frozen instance")`,
          expectedOutput: "Cannot modify frozen instance",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "`frozen=True` prevents any attribute assignment after creation.",
            },
          ],
          feedback: {
            correct:
              "Correct! The `FrozenInstanceError` is caught and the message is printed.",
            incorrect:
              "With `frozen=True`, attempting `v.x = 99.0` raises `FrozenInstanceError`, which is caught by the `except` block.",
          },
        },
        {
          id: "s9-dc-fill-dataclass",
          kind: "fill-code",
          prompt:
            "Complete the dataclass so it auto-generates `__init__` and `__repr__` for a `Book`.",
          beginnerPurpose: "Practice the `@dataclass` decorator syntax.",
          expectedConceptIds: ["dataclass"],
          codeTemplate: `from dataclasses import ___BLANK_1___

___BLANK_2___
class Book:
    title: str
    author: str
    pages: int = 0`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "dataclass", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "@dataclass", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "Import `dataclass` from `dataclasses`, then apply `@dataclass` above the class.",
            },
          ],
          feedback: {
            correct: "Correct! `from dataclasses import dataclass` and `@dataclass` is all you need.",
            incorrect:
              "You need two things: `from dataclasses import dataclass` and the `@dataclass` decorator.",
          },
        },
        {
          id: "s9-dc-mc-mutable-default",
          kind: "multiple-choice",
          prompt: "Which definition correctly gives every `Student` instance its own empty `grades` list?",
          beginnerPurpose:
            "Avoid the shared-mutable-default pitfall specific to dataclasses.",
          expectedConceptIds: ["dataclass", "field"],
          options: [
            {
              id: "a",
              text: "`grades: list[int] = []`",
              isCorrect: false,
              explanation:
                "This raises a `ValueError` at class definition time. Dataclasses explicitly forbid mutable defaults to prevent accidental sharing.",
            },
            {
              id: "b",
              text: "`grades: list[int] = field(default_factory=list)`",
              isCorrect: true,
              explanation:
                "Correct. `field(default_factory=list)` calls `list()` for each new instance, giving everyone their own list.",
            },
            {
              id: "c",
              text: "`grades: list[int] = field(default=[])`",
              isCorrect: false,
              explanation:
                "`field(default=mutable)` is still forbidden — use `default_factory` instead.",
            },
            {
              id: "d",
              text: "`grades: list[int] = list()`",
              isCorrect: false,
              explanation:
                "Same problem as option A — evaluated once at class-definition time and shared.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Mutable defaults (lists, dicts) must use `field(default_factory=...)` so each instance gets its own.",
            },
          ],
          feedback: {
            correct:
              "`field(default_factory=list)` is the correct pattern for mutable defaults in dataclasses.",
            incorrect:
              "Dataclasses forbid bare mutable defaults. Use `field(default_factory=list)` to give each instance its own list.",
          },
        },
        {
          id: "s9-dc-run-dataclass",
          kind: "run-code",
          prompt:
            "Create a frozen `Coordinate` dataclass with `lat` and `lon` float fields. Print an instance.",
          beginnerPurpose: "Apply `@dataclass(frozen=True)` end-to-end.",
          expectedConceptIds: ["dataclass", "frozen-dataclass"],
          starterCode: `from dataclasses import dataclass

# Define a frozen Coordinate dataclass here

coord = Coordinate(51.5, -0.1)
print(coord)
`,
          task: "Define `Coordinate` as a frozen dataclass, then print `Coordinate(51.5, -0.1)`.",
          expectedOutputContains: ["51.5", "-0.1"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            {
              level: "syntax",
              text: "Use `@dataclass(frozen=True)` and annotate `lat: float` and `lon: float`.",
            },
          ],
          feedback: {
            correct: "Excellent! Your frozen `Coordinate` dataclass works perfectly.",
            incorrect:
              "Make sure you use `@dataclass(frozen=True)` and define `lat: float` and `lon: float` fields.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "dataclass",
          recallPrompt: "Why should you use `field(default_factory=list)` instead of `= []`?",
          nextReviewAfterDays: 2,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s9-dc-predict-frozen",
          "s9-dc-fill-dataclass",
          "s9-dc-mc-mutable-default",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dataclass"],
      },
    },

    /* ── Lesson 4: Inheritance and Composition ─────────────────────────── */
    {
      id: "s9-inheritance-composition",
      stageId: "stage-09",
      title: "Inheritance and Composition",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use inheritance to share behavior across related classes",
        "Override methods in subclasses",
        "Call parent methods with `super()`",
        "Explain the prefer-composition-over-inheritance principle",
      ],
      prerequisites: [],
      concepts: ["inheritance", "composition", "super", "method-override"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## Inheritance

Inheritance lets a subclass *extend* a parent class's behavior.

\`\`\`python
class Animal:
    def __init__(self, name: str) -> None:
        self.name = name

    def speak(self) -> str:
        return "..."

class Dog(Animal):
    def speak(self) -> str:        # override
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name} says Meow!"

for animal in [Dog("Rex"), Cat("Luna")]:
    print(animal.speak())
# Rex says Woof!
# Luna says Meow!
\`\`\``,
        },
        {
          kind: "code",
          language: "python",
          code: `class Shape:
    def area(self) -> float:
        raise NotImplementedError("Subclasses must implement area()")

class Circle(Shape):
    def __init__(self, radius: float) -> None:
        self.radius = radius

    def area(self) -> float:
        import math
        return math.pi * self.radius ** 2

class Square(Shape):
    def __init__(self, side: float) -> None:
        self.side = side

    def area(self) -> float:
        return self.side ** 2

shapes: list[Shape] = [Circle(5), Square(4)]
for s in shapes:
    print(f"{type(s).__name__}: {s.area():.2f}")
# Circle: 78.54
# Square: 16.00`,
          caption:
            "Polymorphism: the same `area()` call works differently depending on the actual type at runtime.",
        },
        {
          kind: "comparison",
          leftLabel: "Inheritance (is-a)",
          rightLabel: "Composition (has-a)",
          leftCode: `class Logger:
    def log(self, msg: str) -> None:
        print(f"[LOG] {msg}")

class Service(Logger):  # Service IS-A Logger
    def run(self) -> None:
        self.log("running")`,
          rightCode: `class Logger:
    def log(self, msg: str) -> None:
        print(f"[LOG] {msg}")

class Service:          # Service HAS-A Logger
    def __init__(self) -> None:
        self._logger = Logger()

    def run(self) -> None:
        self._logger.log("running")`,
          caption:
            "Composition is more flexible: you can swap the logger implementation without changing `Service`.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "When to use inheritance",
          body: "Inheritance is appropriate when a clear 'is-a' relationship exists and you want to share substantial implementation. Avoid deep inheritance hierarchies (more than 2–3 levels). When in doubt, favour composition.",
        },
        {
          kind: "why-matters",
          body: "Real codebases frequently misuse inheritance, leading to tightly coupled, hard-to-test code. Understanding *when* to inherit vs *when* to compose is one of the most valuable design skills in Python.",
        },
      ],
      interactions: [
        {
          id: "s9-ic-predict-super",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Practice tracing `super()` calls through the inheritance chain.",
          expectedConceptIds: ["inheritance", "super"],
          code: `class Vehicle:
    def __init__(self, make: str) -> None:
        self.make = make

    def describe(self) -> str:
        return f"Vehicle: {self.make}"

class Car(Vehicle):
    def __init__(self, make: str, model: str) -> None:
        super().__init__(make)
        self.model = model

    def describe(self) -> str:
        return f"{super().describe()}, Model: {self.model}"

c = Car("Toyota", "Corolla")
print(c.describe())`,
          expectedOutput: "Vehicle: Toyota, Model: Corolla",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "`super().describe()` calls the parent's `describe` first, then the subclass appends.",
            },
          ],
          feedback: {
            correct:
              "Correct! `super().describe()` returns `'Vehicle: Toyota'` and the subclass adds `, Model: Corolla`.",
            incorrect:
              "Trace the chain: `Car.describe()` calls `super().describe()` → `'Vehicle: Toyota'`, then appends `, Model: Corolla`.",
          },
        },
        {
          id: "s9-ic-fill-override",
          kind: "fill-code",
          prompt:
            "Complete the `Triangle` class so `area()` returns `0.5 * base * height`. Call the parent `__init__` with `super()`.",
          beginnerPurpose: "Practice method overriding and `super().__init__()`.",
          expectedConceptIds: ["inheritance", "method-override", "super"],
          codeTemplate: `class Shape:
    def __init__(self, color: str) -> None:
        self.color = color

    def area(self) -> float:
        return 0.0

class Triangle(___BLANK_1___):
    def __init__(self, color: str, base: float, height: float) -> None:
        ___BLANK_2___.__init__(color)
        self.base = base
        self.height = height

    def area(self) -> float:
        return ___BLANK_3___ * self.base * self.height`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "Shape", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "super()", caseSensitive: true },
            { placeholder: "___BLANK_3___", answer: "0.5", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "Inherit with `class Triangle(Shape):` and call `super().__init__(color)` to initialize the parent.",
            },
          ],
          feedback: {
            correct: "Excellent! You've correctly chained `super().__init__()` and overridden `area()`.",
            incorrect:
              "Write `class Triangle(Shape):`, call `super().__init__(color)`, and return `0.5 * self.base * self.height`.",
          },
        },
        {
          id: "s9-ic-mc-composition",
          kind: "multiple-choice",
          prompt:
            "Which of the following best illustrates composition over inheritance?",
          beginnerPurpose:
            "Distinguish between structural coupling (inheritance) and flexible delegation (composition).",
          expectedConceptIds: ["composition", "inheritance"],
          options: [
            {
              id: "a",
              text: "`class EmailService(Logger):` — EmailService inherits logging behavior.",
              isCorrect: false,
              explanation:
                "This is inheritance. EmailService is now tightly coupled to Logger's implementation.",
            },
            {
              id: "b",
              text: "`class EmailService: def __init__(self): self.logger = Logger()` — EmailService holds a Logger.",
              isCorrect: true,
              explanation:
                "Correct! EmailService *has-a* Logger. You can swap in a different logger without changing EmailService.",
            },
            {
              id: "c",
              text: "`class Logger(EmailService):` — Logger inherits from EmailService.",
              isCorrect: false,
              explanation:
                "This is backwards and doesn't model either relationship correctly.",
            },
            {
              id: "d",
              text: "There is no difference; inheritance and composition achieve identical results.",
              isCorrect: false,
              explanation:
                "They have different trade-offs: inheritance couples classes tightly; composition is more flexible.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Composition means *holding* an object; inheritance means *being* a kind of object.",
            },
          ],
          feedback: {
            correct:
              "Right! Holding a `Logger` instance lets you swap implementations — that is composition.",
            incorrect:
              "Composition is about *containing* another object (`self.logger = Logger()`), not inheriting from it.",
          },
        },
        {
          id: "s9-ic-run-polymorphism",
          kind: "run-code",
          prompt:
            "Create a `Bird` base class with `speak()` returning `'...'`. Subclass `Parrot` overrides `speak()` to return `'Squawk!'`. Print the result.",
          beginnerPurpose: "Practice polymorphism via method overriding.",
          expectedConceptIds: ["inheritance", "method-override"],
          starterCode: `class Bird:
    def speak(self) -> str:
        return "..."

# Define Parrot here

p = Parrot()
print(p.speak())
`,
          task: "Override `speak()` in `Parrot` to return `'Squawk!'`.",
          expectedOutputContains: ["Squawk!"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "syntax", text: "Use `class Parrot(Bird):` and define a `speak` method." },
          ],
          feedback: {
            correct: "Great! Polymorphism in action — `Parrot` overrides `Bird.speak()`.",
            incorrect: "Define `class Parrot(Bird):` and override `speak()` to `return 'Squawk!'`.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "composition",
          recallPrompt:
            "Give one reason to prefer composition over inheritance.",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s9-ic-predict-super",
          "s9-ic-fill-override",
          "s9-ic-mc-composition",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["composition"],
      },
    },

    /* ── Lesson 5: Properties and Protocols ────────────────────────────── */
    {
      id: "s9-properties-protocols",
      stageId: "stage-09",
      title: "Properties and Protocols",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create computed properties using `@property`",
        "Add validation logic in property setters",
        "Define duck-typed interfaces using `typing.Protocol`",
        "Understand structural subtyping vs nominal subtyping",
      ],
      prerequisites: [],
      concepts: ["property", "protocol", "duck-typing", "getter-setter"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## Properties: Controlled Attribute Access

The \`@property\` decorator lets you expose an attribute-like interface while running code underneath.

\`\`\`python
class Circle:
    def __init__(self, radius: float) -> None:
        self._radius = radius   # private backing field

    @property
    def radius(self) -> float:
        return self._radius

    @radius.setter
    def radius(self, value: float) -> None:
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def diameter(self) -> float:     # computed, read-only
        return self._radius * 2

c = Circle(5)
print(c.diameter)   # 10
c.radius = 3
print(c.diameter)   # 6
\`\`\``,
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Start public, add property later",
          body: "Python's property mechanism means you can start with a plain attribute (`self.radius`) and later upgrade to a property with validation — without changing any calling code. Don't add properties prematurely.",
        },
        {
          kind: "code",
          language: "python",
          code: `from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> str: ...

class Circle:
    def draw(self) -> str:
        return "Drawing circle"

class Square:
    def draw(self) -> str:
        return "Drawing square"

def render(shape: Drawable) -> None:
    print(shape.draw())

render(Circle())   # Drawing circle
render(Square())   # Drawing square`,
          caption:
            "`Drawable` is a Protocol. Any class with a matching `draw` method satisfies it — no explicit inheritance required.",
        },
        {
          kind: "mental-model",
          title: "Protocols are 'if it walks like a duck…'",
          analogy:
            "A Protocol is like a job description. If you can do everything on the list, you're hired — it doesn't matter who trained you or which school you attended.",
          explanation:
            "Python's `Protocol` formalises duck typing. A class satisfies a Protocol if it has all the required methods with matching signatures — no subclassing needed. This is called structural subtyping.",
        },
        {
          kind: "why-matters",
          body: "Properties let you add validation or computation without changing your API. Protocols let you write flexible, testable code that accepts any compatible object — enabling easy mocking in tests and plug-and-play component replacement.",
        },
      ],
      interactions: [
        {
          id: "s9-pp-predict-property",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Trace property getter and setter behaviour.",
          expectedConceptIds: ["property", "getter-setter"],
          code: `class Temperature:
    def __init__(self, celsius: float) -> None:
        self._c = celsius

    @property
    def fahrenheit(self) -> float:
        return self._c * 9 / 5 + 32

t = Temperature(100)
print(t.fahrenheit)`,
          expectedOutput: "212.0",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "The `fahrenheit` property computes on the fly each time it's accessed." },
          ],
          feedback: {
            correct: "Correct! 100°C × 9/5 + 32 = 212.0°F.",
            incorrect: "Trace the formula: `100 * 9 / 5 + 32 = 180 + 32 = 212.0`.",
          },
        },
        {
          id: "s9-pp-fill-setter",
          kind: "fill-code",
          prompt:
            "Add a setter for `speed` that raises `ValueError` if speed is negative.",
          beginnerPurpose: "Practice combining `@property` getter with a `.setter`.",
          expectedConceptIds: ["property", "getter-setter"],
          codeTemplate: `class Car:
    def __init__(self, speed: float) -> None:
        self._speed = speed

    @property
    def speed(self) -> float:
        return self._speed

    @___BLANK_1___.setter
    def speed(self, value: float) -> None:
        if value < 0:
            raise ___BLANK_2___("Speed cannot be negative")
        self._speed = value`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "speed", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "ValueError", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The setter decorator is `@<property_name>.setter`. Use `ValueError` for invalid values.",
            },
          ],
          feedback: {
            correct:
              "Perfect! `@speed.setter` registers the setter and `ValueError` is the right exception.",
            incorrect:
              "Use `@speed.setter` as the decorator and raise `ValueError` for negative values.",
          },
        },
        {
          id: "s9-pp-mc-protocol",
          kind: "multiple-choice",
          prompt:
            "You have a `Protocol` called `Saveable` with a `save()` method. Which class satisfies it WITHOUT explicitly inheriting from `Saveable`?",
          beginnerPurpose: "Understand structural subtyping / duck typing with Protocols.",
          expectedConceptIds: ["protocol", "duck-typing"],
          options: [
            {
              id: "a",
              text: "`class File: def load(self): ...` — only has `load`, not `save`.",
              isCorrect: false,
              explanation: "`File` doesn't have `save()`, so it doesn't satisfy `Saveable`.",
            },
            {
              id: "b",
              text: "`class Document: def save(self) -> None: ...` — has a matching `save` method.",
              isCorrect: true,
              explanation:
                "Correct! `Document` structurally satisfies `Saveable` because it has the required `save()` method.",
            },
            {
              id: "c",
              text: "Neither — you must always write `class Document(Saveable):` to satisfy a Protocol.",
              isCorrect: false,
              explanation:
                "That is nominal subtyping. Protocols use *structural* subtyping — no explicit inheritance needed.",
            },
            {
              id: "d",
              text: "`class Record: pass` — any class satisfies any Protocol.",
              isCorrect: false,
              explanation:
                "Only classes with all required methods and attributes satisfy a Protocol.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "A Protocol is satisfied by having the right methods, not by inheriting from the Protocol.",
            },
          ],
          feedback: {
            correct:
              "Exactly! Structural subtyping means 'if it has the right shape, it qualifies'.",
            incorrect:
              "You don't need to inherit from a Protocol. Any class with matching methods satisfies it.",
          },
        },
        {
          id: "s9-pp-debug-property",
          kind: "debug-code",
          prompt: "The property isn't working — find and fix the bug.",
          beginnerPurpose: "Diagnose a common mistake when defining a property setter.",
          expectedConceptIds: ["property", "getter-setter"],
          brokenCode: `class BankAccount:
    def __init__(self, balance: float) -> None:
        self._balance = balance

    @property
    def balance(self) -> float:
        return self._balance

    @balance.setter
    def set_balance(self, value: float) -> None:
        if value < 0:
            raise ValueError
        self._balance = value

acct = BankAccount(100.0)
acct.balance = 200.0
print(acct.balance)`,
          bugDescription:
            "The setter method is named `set_balance` but must be named `balance` to match the property.",
          fixedCode: `class BankAccount:
    def __init__(self, balance: float) -> None:
        self._balance = balance

    @property
    def balance(self) -> float:
        return self._balance

    @balance.setter
    def balance(self, value: float) -> None:
        if value < 0:
            raise ValueError
        self._balance = value

acct = BankAccount(100.0)
acct.balance = 200.0
print(acct.balance)`,
          errorType: "AttributeError",
          allowedAttempts: 4,
          hints: [
            {
              level: "syntax",
              text: "The getter and setter must have the same method name.",
            },
          ],
          feedback: {
            correct:
              "Correct! The setter method name must match the property name exactly.",
            incorrect:
              "Rename `set_balance` to `balance` so the `@balance.setter` decorator attaches correctly.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "property",
          recallPrompt:
            "How do you add validation logic to an attribute using `@property`?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "protocol",
          recallPrompt: "How does a Protocol differ from an abstract base class?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s9-pp-predict-property",
          "s9-pp-fill-setter",
          "s9-pp-mc-protocol",
          "s9-pp-debug-property",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["property", "protocol"],
      },
    },
  ],

  /* ── Project ─────────────────────────────────────────────────────────── */
  project: {
    id: "s9-contact-book",
    stageId: "stage-09",
    title: "Contact Book",
    brief:
      "Build a Contact Book application using dataclasses for contact storage, a dict as the backing store, and methods to add, search, list, and delete contacts.",
    requirements: [
      "Define a `Contact` dataclass with `id`, `name`, `email`, and `phone` fields",
      "Create a `ContactBook` class that stores contacts in a `dict[str, Contact]`",
      "Implement `add(contact: Contact) -> None`",
      "Implement `search(query: str) -> list[Contact]` that matches name or email",
      "Implement `list_all() -> list[Contact]` sorted by name",
      "Implement `delete(contact_id: str) -> bool` returning True if deleted",
      "Add a `__len__` dunder method returning the number of contacts",
    ],
    acceptanceCriteria: [
      "Adding a contact and retrieving it by search returns the correct contact",
      "Deleting a contact removes it from the book",
      "`len(book)` returns the correct count",
      "Searching returns partial matches on name or email",
      "All code uses type hints",
    ],
    conceptIds: ["class", "dataclass", "method", "composition"],
    difficulty: "intermediate",
    starterCode: `from dataclasses import dataclass, field
import uuid


@dataclass
class Contact:
    name: str
    email: str
    phone: str
    id: str = field(default_factory=lambda: str(uuid.uuid4())[:8])


class ContactBook:
    def __init__(self) -> None:
        self._contacts: dict[str, Contact] = {}

    def add(self, contact: Contact) -> None:
        # TODO: store contact by id
        pass

    def search(self, query: str) -> list[Contact]:
        # TODO: return contacts where query matches name or email (case-insensitive)
        pass

    def list_all(self) -> list[Contact]:
        # TODO: return all contacts sorted by name
        pass

    def delete(self, contact_id: str) -> bool:
        # TODO: remove contact, return True if it existed
        pass

    def __len__(self) -> int:
        # TODO: return number of contacts
        pass


# Demo
book = ContactBook()
book.add(Contact("Alice Smith", "alice@example.com", "555-1234"))
book.add(Contact("Bob Jones", "bob@example.com", "555-5678"))
print(len(book))                    # 2
print(book.search("alice")[0].name) # Alice Smith
`,
  },
} satisfies Stage;
