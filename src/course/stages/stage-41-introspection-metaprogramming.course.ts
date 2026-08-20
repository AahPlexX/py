import type { Stage } from "@/course/course.schema";

export const stage41 = {
  id: "stage-41",
  number: 41,
  title: "Introspection and Metaprogramming",
  summary:
    "Inspect and manipulate Python objects at runtime using introspection, metaclasses, descriptors, and class decorators to write highly flexible and reusable code.",
  level: "advanced",
  masteryGateConceptIds: ["metaclasses", "descriptors"],
  lessons: [
    {
      id: "s41-introspection-basics",
      stageId: "stage-41",
      title: "Runtime Introspection",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Use dir(), vars(), type(), and hasattr() to inspect objects",
        "Read __dict__, __class__, and __bases__",
        "Use inspect module for deeper introspection",
      ],
      prerequisites: [],
      concepts: ["metaclasses"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Runtime Introspection\n\nPython exposes its own internals at runtime:\n\n```python\nclass Dog:\n    species = \"Canis familiaris\"\n\n    def __init__(self, name: str):\n        self.name = name\n\n    def speak(self) -> str:\n        return \"Woof\"\n\ndog = Dog(\"Rex\")\n\ntype(dog)           # <class '__main__.Dog'>\ntype(dog).__name__  # 'Dog'\nvars(dog)           # {'name': 'Rex'}\ndir(dog)            # [..., 'name', 'speak', 'species', ...]\nhasattr(dog, 'speak')  # True\ngetattr(dog, 'speak')()  # 'Woof'\n\nimport inspect\ninspect.getmembers(dog, predicate=inspect.ismethod)\n# [('speak', <bound method Dog.speak ...>)]\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "vars() vs __dict__",
          body: "vars(obj) returns obj.__dict__ — the instance's attribute dictionary. For a class, vars(MyClass) returns the class __dict__ (methods included). Works on most objects, but not built-in types.",
        },
      ],
      interactions: [
        {
          id: "s41-introspect-mc",
          kind: "multiple-choice",
          prompt: "What does `vars(obj)` return?",
          beginnerPurpose: "Know introspection tools",
          expectedConceptIds: ["metaclasses"],
          options: [
            { id: "a", text: "A list of all attribute names", isCorrect: false, explanation: "dir() returns a list of names. vars() returns the __dict__ mapping." },
            { id: "b", text: "The instance's __dict__ — a mapping of attribute names to values", isCorrect: true, explanation: "Correct! vars(obj) returns the instance dictionary of attributes and their values." },
            { id: "c", text: "The class's method resolution order", isCorrect: false, explanation: "MRO is in __mro__. vars() returns the instance attribute dictionary." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "vars() is equivalent to obj.__dict__." }],
          feedback: { correct: "Correct! vars() returns the __dict__.", incorrect: "vars(obj) returns obj.__dict__ — the mapping of instance attributes to values." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s41-introspect-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s41-descriptors",
      stageId: "stage-41",
      title: "Descriptors: __get__, __set__, __delete__",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain what a descriptor is",
        "Implement __get__ and __set__ for attribute control",
        "Understand how property() uses descriptors",
      ],
      prerequisites: ["s41-introspection-basics"],
      concepts: ["descriptors"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Descriptors\n\nA **descriptor** is an object that customizes attribute access via `__get__`, `__set__`, and/or `__delete__`:\n\n```python\nclass Validator:\n    \"\"\"Descriptor that validates values are positive.\"\"\"\n    def __set_name__(self, owner, name):\n        self.name = name\n\n    def __get__(self, obj, objtype=None):\n        if obj is None:\n            return self\n        return obj.__dict__.get(self.name)\n\n    def __set__(self, obj, value):\n        if value <= 0:\n            raise ValueError(f\"{self.name} must be positive\")\n        obj.__dict__[self.name] = value\n\nclass BankAccount:\n    balance = Validator()\n\n    def __init__(self, balance: float):\n        self.balance = balance  # calls Validator.__set__\n\nacct = BankAccount(100)\nacct.balance = -50  # raises ValueError\n```\n\n`property()` is itself a descriptor — it wraps getter/setter callables into `__get__`/`__set__`.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Non-data vs data descriptors",
          body: "A descriptor with only __get__ is a 'non-data descriptor' (like functions/methods). One with __set__ or __delete__ is a 'data descriptor' — it takes priority over instance __dict__ entries.",
        },
      ],
      interactions: [
        {
          id: "s41-descriptor-fill",
          kind: "fill-code",
          prompt: "Complete the __get__ method so it returns the stored value from the instance's __dict__.",
          beginnerPurpose: "Implement a descriptor",
          expectedConceptIds: ["descriptors"],
          codeTemplate: "class Typed:\n    def __set_name__(self, owner, name):\n        self.name = name\n\n    def _____(self, obj, objtype=None):\n        if obj is None:\n            return self\n        return obj.__dict__.get(self.name)",
          blanks: [{ placeholder: "_____", answer: "__get__", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The descriptor method for attribute reads is __get__." }],
          feedback: { correct: "Correct! __get__ handles attribute reads.", incorrect: "The read method is __get__(self, obj, objtype)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s41-descriptor-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s41-metaclasses",
      stageId: "stage-41",
      title: "Metaclasses: Classes of Classes",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain that a metaclass is the class of a class",
        "Override __new__ or __init_subclass__ to hook class creation",
        "Know when to use metaclasses vs class decorators",
      ],
      prerequisites: ["s41-descriptors"],
      concepts: ["metaclasses"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Metaclasses\n\nIn Python, **everything is an object** — including classes. A class's class is called its metaclass:\n\n```python\ntype(42)       # <class 'int'>\ntype(int)      # <class 'type'>\ntype(type)     # <class 'type'>  -- type is its own metaclass\n```\n\nYou can create a custom metaclass to control class creation:\n\n```python\nclass SingletonMeta(type):\n    _instances: dict = {}\n\n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(*args, **kwargs)\n        return cls._instances[cls]\n\nclass Database(metaclass=SingletonMeta):\n    def __init__(self):\n        self.connection = \"connected\"\n\nd1 = Database()\nd2 = Database()\nd1 is d2  # True — same instance\n```\n\n## __init_subclass__: simpler alternative\n\n```python\nclass Plugin:\n    registry: list = []\n\n    def __init_subclass__(cls, **kwargs):\n        super().__init_subclass__(**kwargs)\n        Plugin.registry.append(cls)\n\nclass AudioPlugin(Plugin): ...\nclass VideoPlugin(Plugin): ...\n\nPlugin.registry  # [AudioPlugin, VideoPlugin]\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Metaclasses are rarely needed",
          body: "Before writing a metaclass, ask: can a class decorator or __init_subclass__ solve this? They're simpler and cover most use cases. Metaclasses are for framework authors, not everyday code.",
        },
      ],
      interactions: [
        {
          id: "s41-meta-mc",
          kind: "multiple-choice",
          prompt: "What is `type(MyClass)` for a regular Python class?",
          beginnerPurpose: "Understand metaclasses",
          expectedConceptIds: ["metaclasses"],
          options: [
            { id: "a", text: "The parent class of MyClass", isCorrect: false, explanation: "The parent class is in MyClass.__bases__. type() returns the metaclass." },
            { id: "b", text: "<class 'type'> — the default metaclass", isCorrect: true, explanation: "Correct! All regular classes are instances of 'type', which is the default metaclass." },
            { id: "c", text: "<class 'object'>", isCorrect: false, explanation: "object is the base class, not the metaclass. type() returns the metaclass." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Classes are objects. What class is a class an instance of?" }],
          feedback: { correct: "Correct! type is the metaclass of all regular classes.", incorrect: "type(MyClass) returns 'type' — the class that creates classes." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s41-meta-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s41-class-decorators",
      stageId: "stage-41",
      title: "Class Decorators and __init_subclass__",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Write a class decorator that adds or modifies behavior",
        "Use __init_subclass__ to hook subclass creation",
        "Choose between metaclass, class decorator, and __init_subclass__",
      ],
      prerequisites: ["s41-metaclasses"],
      concepts: ["metaclasses"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Class Decorators\n\nA class decorator is a function that takes a class and returns a class:\n\n```python\ndef add_repr(cls):\n    \"\"\"Adds a default __repr__ based on __init__ parameters.\"\"\"\n    import inspect\n    params = inspect.signature(cls.__init__).parameters\n    param_names = [p for p in params if p != 'self']\n\n    def __repr__(self):\n        attrs = ', '.join(f\"{p}={getattr(self, p)!r}\" for p in param_names)\n        return f\"{cls.__name__}({attrs})\"\n\n    cls.__repr__ = __repr__\n    return cls\n\n@add_repr\nclass Point:\n    def __init__(self, x: int, y: int):\n        self.x = x\n        self.y = y\n\nPoint(1, 2)  # Point(x=1, y=2)\n```\n\n## When to use what\n\n| Need | Tool |\n|------|------|\n| Modify a class after definition | Class decorator |\n| Hook subclass creation | `__init_subclass__` |\n| Control class creation itself | Metaclass |\n| Add managed attributes | Descriptor |",
        },
        {
          kind: "why-matters",
          body: "dataclasses.dataclass, attrs, and SQLAlchemy's declarative base are all class decorators or metaclass-based. Understanding these mechanisms lets you understand and build powerful Python frameworks.",
        },
      ],
      interactions: [
        {
          id: "s41-class-dec-mc",
          kind: "multiple-choice",
          prompt: "You want all subclasses of a base class to automatically register in a list when defined. The simplest tool is:",
          beginnerPurpose: "Choose the right metaprogramming tool",
          expectedConceptIds: ["metaclasses"],
          options: [
            { id: "a", text: "A metaclass with __new__", isCorrect: false, explanation: "__init_subclass__ handles this more simply — no metaclass required." },
            { id: "b", text: "__init_subclass__ on the base class", isCorrect: true, explanation: "Correct! __init_subclass__ is called automatically on each subclass and is the simplest hook for registration." },
            { id: "c", text: "A class decorator on each subclass", isCorrect: false, explanation: "You'd have to remember to add the decorator to every subclass. __init_subclass__ is automatic." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Python 3.6+ has a built-in hook for subclass creation in the base class." }],
          feedback: { correct: "Correct! __init_subclass__ is the cleanest solution.", incorrect: "__init_subclass__ in the base class is called automatically when any subclass is defined." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s41-class-dec-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s41-project",
    stageId: "stage-41",
    title: "ORM-Like Descriptor Framework",
    brief:
      "Build a mini ORM-like framework using descriptors and metaclasses. Define model classes with typed field descriptors that validate values, and a metaclass that tracks all defined models.",
    requirements: [
      "Typed descriptor classes (IntField, StrField) with validation",
      "Metaclass that collects all subclass field descriptors",
      "Model base class with __repr__ and to_dict() generated from fields",
      "Field descriptors raise TypeError on type mismatch",
      "Registration of all Model subclasses via __init_subclass__",
    ],
    acceptanceCriteria: [
      "Field assignment validates types",
      "All model classes are accessible via Model.registry",
      "to_dict() returns correct field values",
    ],
    conceptIds: ["metaclasses", "descriptors"],
    difficulty: "advanced",
  },
} satisfies Stage;
