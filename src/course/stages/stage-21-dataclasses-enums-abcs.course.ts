import type { Stage } from "@/course/course.schema";

export const stage21 = {
  id: "stage-21",
  number: 21,
  title: "Dataclasses, Enums, ABCs, and Structured Models",
  summary:
    "Learn to eliminate boilerplate with @dataclass, encode fixed choices with Enum, and enforce contracts with abstract base classes. These tools let you design clear, self-documenting domain models.",
  level: "intermediate",
  masteryGateConceptIds: ["dataclass", "enum", "abstract-base-class"],

  lessons: [
    /* ── 21.1 @dataclass decorator ─────────────────────────────────────────── */
    {
      id: "s21-dataclass-decorator",
      stageId: "stage-21",
      title: "The @dataclass Decorator",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Apply @dataclass to eliminate boilerplate __init__ and __repr__",
        "Understand what code the decorator auto-generates",
        "Declare typed fields using annotations",
      ],
      prerequisites: ["s19-objects-and-identity"],
      concepts: ["dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Problem Does This Solve?\n\nEvery class that stores data needs the same plumbing: an `__init__` to accept arguments and assign them, a `__repr__` so you can print instances usefully, and usually `__eq__` so you can compare them. Writing all of that by hand for a five-field class produces 30+ lines of identical, error-prone boilerplate.\n\n`@dataclass` generates all of it from your field annotations in one line.",
        },
        {
          kind: "comparison",
          leftLabel: "Without @dataclass",
          rightLabel: "With @dataclass",
          leftCode:
            "class Point:\n    def __init__(self, x: float, y: float):\n        self.x = x\n        self.y = y\n\n    def __repr__(self):\n        return f'Point(x={self.x}, y={self.y})'\n\n    def __eq__(self, other):\n        if not isinstance(other, Point):\n            return NotImplemented\n        return self.x == other.x and self.y == other.y",
          rightCode:
            "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float",
          caption: "@dataclass replaces ~15 lines of boilerplate with a decorator and annotations.",
        },
        {
          kind: "text",
          markdown:
            "## How It Works\n\nThe `@dataclass` decorator inspects the class body for **annotated attributes** — lines like `x: float`. For each annotation it finds, it treats that name as a field. It then generates `__init__`, `__repr__`, and `__eq__` automatically.\n\nThe generated `__init__` accepts one parameter per field (in declaration order) and assigns them to `self`. The generated `__repr__` includes every field in `ClassName(field=value, ...)` format. The generated `__eq__` compares all fields.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\n\n@dataclass\nclass Product:\n    name: str\n    price: float\n    in_stock: bool\n\n# __init__ is generated — accepts name, price, in_stock\np = Product('Widget', 9.99, True)\n\n# __repr__ is generated\nprint(p)          # Product(name='Widget', price=9.99, in_stock=True)\n\n# __eq__ is generated\np2 = Product('Widget', 9.99, True)\nprint(p == p2)    # True",
          caption: "All three dunder methods come for free from the annotation declarations.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Only Annotated Names Become Fields",
          body: "A name without a type annotation is NOT treated as a field. `x: int = 0` is a field. `x = 0` is a plain class variable that @dataclass ignores. This distinction matters when you mix class-level constants with data fields.",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Mutable Default Pitfall",
          body: "You cannot write `tags: list = []` in a dataclass — Python raises a ValueError at class-definition time. A mutable default shared across all instances is almost always a bug. Use `field(default_factory=list)` instead (covered in lesson 21.6).",
        },
        {
          kind: "why-matters",
          body: "@dataclass is the standard way to write data-holding classes in modern Python. It appears in configuration objects, API response models, event records, and anywhere data needs to be bundled together. Understanding it means you can read and write the majority of modern Python domain code.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "You define:\n\n```python\n@dataclass\nclass Config:\n    host: str\n    port: int\n    debug = False   # no annotation\n```\n\nHow many fields does this dataclass have, and what happens to `debug`?",
        },
      ],
      interactions: [
        {
          id: "s21-dc-predict",
          kind: "predict-output",
          prompt: "What does Python print when this runs?",
          beginnerPurpose: "Verify understanding of the auto-generated __repr__.",
          expectedConceptIds: ["dataclass"],
          code: "from dataclasses import dataclass\n\n@dataclass\nclass Color:\n    red: int\n    green: int\n    blue: int\n\nc = Color(255, 128, 0)\nprint(c)",
          expectedOutput: "Color(red=255, green=128, blue=0)",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "@dataclass generates __repr__ in ClassName(field=value, ...) format." },
            { level: "syntax", text: "The fields appear in the order they were declared." },
          ],
          feedback: {
            correct: "Correct! The generated __repr__ lists every field with its value.",
            incorrect: "The generated __repr__ uses the class name followed by each field=value in declaration order.",
          },
        },
        {
          id: "s21-dc-fill",
          kind: "fill-code",
          prompt: "Complete the dataclass so it has fields `title` (str) and `year` (int).",
          beginnerPurpose: "Practice writing annotated fields.",
          expectedConceptIds: ["dataclass"],
          codeTemplate:
            "from dataclasses import dataclass\n\n@dataclass\nclass Movie:\n    ___BLANK1___: str\n    ___BLANK2___: int",
          blanks: [
            { placeholder: "___BLANK1___", answer: "title", caseSensitive: true },
            { placeholder: "___BLANK2___", answer: "year", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "Each field is declared as `name: type` on its own line inside the class body." },
          ],
          feedback: {
            correct: "Well done! Those annotations tell @dataclass what fields to generate.",
            incorrect: "Declare each field as `fieldname: type` — name first, colon, then the type.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "dataclass", recallPrompt: "What three dunder methods does @dataclass auto-generate?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-dc-predict", "s21-dc-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dataclass"],
      },
    },

    /* ── 21.2 Generated __init__ ────────────────────────────────────────────── */
    {
      id: "s21-generated-init",
      stageId: "stage-21",
      title: "Generated __init__",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Predict the exact signature of the generated __init__",
        "Use keyword arguments when constructing dataclass instances",
        "Understand field order and its effect on the constructor",
      ],
      prerequisites: ["s21-dataclass-decorator"],
      concepts: ["dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Gets Generated\n\nWhen `@dataclass` runs, it creates an `__init__` whose parameters match the field declarations, in order. For a class with fields `a: int`, `b: str`, `c: float`, the generated signature is:\n\n```python\ndef __init__(self, a: int, b: str, c: float) -> None:\n    self.a = a\n    self.b = b\n    self.c = c\n```\n\nYou can call it positionally or with keyword arguments.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\n\n@dataclass\nclass Server:\n    host: str\n    port: int\n    secure: bool\n\n# Positional\ns1 = Server('localhost', 8080, False)\n\n# Keyword (order-independent)\ns2 = Server(port=443, host='api.example.com', secure=True)\n\nprint(s1)  # Server(host='localhost', port=8080, secure=False)\nprint(s2)  # Server(host='api.example.com', port=443, secure=True)",
          caption: "Both positional and keyword construction work; keywords free you from memorising order.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Field Order Affects Constructor Position",
          body: "If you reorder the field declarations in the class body, the positional constructor arguments change order too. Code that calls the constructor positionally will silently pass the wrong values to the wrong fields. Prefer keyword arguments for constructors with more than two fields.",
        },
        {
          kind: "text",
          markdown:
            "## Excluding Fields from __init__\n\nSometimes you want a field that is computed after construction, not passed in. You can set `init=False` in the `field()` call (covered in lesson 21.5). The field still exists on the instance but is not a constructor parameter.",
        },
        {
          kind: "why-matters",
          body: "Understanding the generated __init__ lets you construct dataclass instances correctly and reason about what happens when you pass the wrong number of arguments. It also prepares you for default values and field() customisation in the next lessons.",
        },
      ],
      interactions: [
        {
          id: "s21-init-mc",
          kind: "multiple-choice",
          prompt: "Given this dataclass:\n\n```python\n@dataclass\nclass Box:\n    width: float\n    height: float\n    label: str\n```\n\nWhich call correctly constructs a Box?",
          beginnerPurpose: "Verify understanding of the generated constructor signature.",
          expectedConceptIds: ["dataclass"],
          options: [
            { id: "a", text: "Box(10.0, 5.0, 'small')", isCorrect: true, explanation: "Positional arguments match the field declaration order." },
            { id: "b", text: "Box('small', 10.0, 5.0)", isCorrect: false, explanation: "This passes 'small' to width and 10.0 to height — the types are wrong." },
            { id: "c", text: "Box(width=10.0, label='small')", isCorrect: false, explanation: "height is required and not provided — this raises TypeError." },
            { id: "d", text: "Box()", isCorrect: false, explanation: "All three fields are required (no defaults yet) — this raises TypeError." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The constructor parameters appear in the same order as the field declarations." }],
          feedback: {
            correct: "Right! Positional args map to fields in declaration order.",
            incorrect: "Check that all required fields are provided and in the correct order.",
          },
        },
        {
          id: "s21-init-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace constructor and repr together.",
          expectedConceptIds: ["dataclass"],
          code: "from dataclasses import dataclass\n\n@dataclass\nclass Rect:\n    w: int\n    h: int\n\nr = Rect(h=3, w=7)\nprint(r.w, r.h)",
          expectedOutput: "7 3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Keyword arguments assign by name regardless of order." }],
          feedback: {
            correct: "Correct! w=7 and h=3 are stored on the instance and accessed by name.",
            incorrect: "Keyword args assign by name. r.w gets the value passed to w=, not to the first positional slot.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "dataclass", recallPrompt: "How does field declaration order affect dataclass construction?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-init-mc", "s21-init-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dataclass"],
      },
    },

    /* ── 21.3 Generated comparisons ─────────────────────────────────────────── */
    {
      id: "s21-generated-comparisons",
      stageId: "stage-21",
      title: "Generated Comparisons",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use == and != on dataclass instances",
        "Enable ordering with eq=True and order=True",
        "Understand which fields participate in comparison",
      ],
      prerequisites: ["s21-generated-init"],
      concepts: ["dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Equality by Default\n\nBy default, `@dataclass` generates `__eq__` which compares instances field-by-field. Two instances are equal if and only if all their fields are equal. This is **value equality**, not identity equality (`is`).",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\na = Point(1.0, 2.0)\nb = Point(1.0, 2.0)\nc = Point(3.0, 4.0)\n\nprint(a == b)   # True  — same field values\nprint(a == c)   # False — different values\nprint(a is b)   # False — different objects in memory",
          caption: "__eq__ compares field values; 'is' compares object identity. They are different questions.",
        },
        {
          kind: "text",
          markdown:
            "## Ordering: < <= > >=\n\nBy passing `order=True` to the decorator, you also get `__lt__`, `__le__`, `__gt__`, `__ge__`. Comparison is performed tuple-wise across all fields in declaration order — the same way Python compares tuples.\n\nIf you only need equality but not ordering, the default (`eq=True, order=False`) is sufficient.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\n\n@dataclass(order=True)\nclass Version:\n    major: int\n    minor: int\n    patch: int\n\nv1 = Version(1, 2, 3)\nv2 = Version(1, 3, 0)\nv3 = Version(2, 0, 0)\n\nprint(v1 < v2)   # True  — 1.2.3 < 1.3.0\nprint(v2 < v3)   # True  — 1.3.0 < 2.0.0\nprint(sorted([v3, v1, v2]))  # [Version(1,2,3), Version(1,3,0), Version(2,0,0)]",
          caption: "order=True makes dataclass instances sortable. Comparison works left-to-right across fields.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "order=True requires eq=True",
          body: "If you set eq=False, you cannot also set order=True — Python raises a ValueError. Ordering without equality makes no logical sense.",
        },
        {
          kind: "why-matters",
          body: "Generated comparisons let you sort lists of domain objects, use them in sets, and write clean conditional logic without hand-rolling comparison methods. The order=True trick is especially useful for version numbers, priority queues, and time-ordered events.",
        },
      ],
      interactions: [
        {
          id: "s21-cmp-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Confirm understanding of generated __eq__.",
          expectedConceptIds: ["dataclass"],
          code: "from dataclasses import dataclass\n\n@dataclass\nclass Tag:\n    name: str\n\nt1 = Tag('python')\nt2 = Tag('python')\nt3 = Tag('java')\nprint(t1 == t2)\nprint(t1 == t3)\nprint(t1 is t2)",
          expectedOutput: "True\nFalse\nFalse",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "== uses field-by-field comparison; 'is' checks if both names point to the same object." }],
          feedback: {
            correct: "Correct! t1 and t2 have equal fields but are distinct objects.",
            incorrect: "Remember: == checks value equality (all fields match); 'is' checks identity (same object in memory).",
          },
        },
        {
          id: "s21-cmp-mc",
          kind: "multiple-choice",
          prompt: "To make a dataclass support `<` and `>` ordering, you need to:",
          beginnerPurpose: "Learn the order=True parameter.",
          expectedConceptIds: ["dataclass"],
          options: [
            { id: "a", text: "Pass order=True to @dataclass", isCorrect: true, explanation: "order=True generates __lt__, __le__, __gt__, __ge__." },
            { id: "b", text: "Implement __cmp__ manually", isCorrect: false, explanation: "Python 3 does not have __cmp__. Use __lt__ etc. or order=True." },
            { id: "c", text: "Inherit from Comparable", isCorrect: false, explanation: "There is no Comparable base class in Python's standard library for this purpose." },
            { id: "d", text: "Nothing — all dataclasses support ordering by default", isCorrect: false, explanation: "Ordering is opt-in. Default dataclasses only get __eq__." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "@dataclass accepts keyword arguments like @dataclass(order=True)." }],
          feedback: {
            correct: "Right! order=True is the decorator argument that enables comparison operators.",
            incorrect: "Check the @dataclass decorator signature — there is a keyword argument specifically for this.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "dataclass", recallPrompt: "What is the difference between == and 'is' for dataclass instances?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-cmp-predict", "s21-cmp-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dataclass"],
      },
    },

    /* ── 21.4 Default values ────────────────────────────────────────────────── */
    {
      id: "s21-default-values",
      stageId: "stage-21",
      title: "Default Values in Dataclasses",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Add default values to dataclass fields",
        "Understand the rule that fields with defaults must follow fields without defaults",
        "Distinguish safe immutable defaults from dangerous mutable ones",
      ],
      prerequisites: ["s21-generated-init"],
      concepts: ["dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Making Fields Optional\n\nJust like regular function parameters, dataclass fields can have defaults. A field with a default does not need to be supplied when constructing the instance.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\n\n@dataclass\nclass Connection:\n    host: str\n    port: int = 5432\n    timeout: float = 30.0\n    ssl: bool = False\n\n# Only host is required\nc1 = Connection('db.local')\nprint(c1)  # Connection(host='db.local', port=5432, timeout=30.0, ssl=False)\n\n# Override specific defaults\nc2 = Connection('db.prod', port=5433, ssl=True)\nprint(c2)  # Connection(host='db.prod', port=5433, timeout=30.0, ssl=True)",
          caption: "Fields with defaults become optional constructor arguments.",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Required Fields Must Come First",
          body: "A field WITHOUT a default cannot follow a field WITH a default. This is the same rule as Python function parameters. If you put a required field after an optional one, Python raises a TypeError at class definition time: 'non-default argument follows default argument'.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\n\n# BROKEN — required field 'name' after optional field 'active'\n@dataclass\nclass Item:\n    active: bool = True\n    name: str         # TypeError!\n\n# FIXED — required fields first\n@dataclass\nclass Item:\n    name: str\n    active: bool = True",
          caption: "Always declare required fields before optional ones.",
        },
        {
          kind: "why-matters",
          body: "Default values are essential for configuration objects where most settings have sensible defaults but a few (like a hostname) must always be provided explicitly. This pattern appears in web frameworks, database clients, and CLI tools throughout the Python ecosystem.",
        },
      ],
      interactions: [
        {
          id: "s21-defaults-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace default values through construction.",
          expectedConceptIds: ["dataclass"],
          code: "from dataclasses import dataclass\n\n@dataclass\nclass Task:\n    title: str\n    done: bool = False\n    priority: int = 1\n\nt = Task('Write tests')\nprint(t.done, t.priority)",
          expectedOutput: "False 1",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Fields not passed to the constructor receive their default value." }],
          feedback: {
            correct: "Correct! done and priority use their declared defaults.",
            incorrect: "When you don't pass a value for a field with a default, it gets the default.",
          },
        },
        {
          id: "s21-defaults-debug",
          kind: "debug-code",
          prompt: "This code raises a TypeError at class definition. Find and fix it.",
          beginnerPurpose: "Practice the required-before-optional rule.",
          expectedConceptIds: ["dataclass"],
          brokenCode:
            "from dataclasses import dataclass\n\n@dataclass\nclass User:\n    role: str = 'viewer'\n    username: str\n    email: str",
          bugDescription: "Fields without defaults (username, email) come after a field with a default (role).",
          fixedCode:
            "from dataclasses import dataclass\n\n@dataclass\nclass User:\n    username: str\n    email: str\n    role: str = 'viewer'",
          errorType: "TypeError",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Required fields (no default) must be declared before optional fields (have default)." },
            { level: "structural", text: "Move 'role' to the end of the class body." },
          ],
          feedback: {
            correct: "Fixed! Required fields first, then optional fields with defaults.",
            incorrect: "The rule is: fields without defaults must appear before fields with defaults.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "dataclass", recallPrompt: "Why must required dataclass fields come before fields with defaults?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-defaults-predict", "s21-defaults-debug"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dataclass"],
      },
    },

    /* ── 21.5 field() function ──────────────────────────────────────────────── */
    {
      id: "s21-field-function",
      stageId: "stage-21",
      title: "The field() Function",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use field() to customise individual field behaviour",
        "Exclude a field from __repr__ or __init__",
        "Understand the metadata parameter for attaching arbitrary info",
      ],
      prerequisites: ["s21-default-values"],
      concepts: ["dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## When a Simple Default Is Not Enough\n\nSometimes you need more control over a field than just a default value: you might want to hide a field from the printed representation, exclude it from the constructor, or mark it with metadata. `field()` is the escape hatch that gives you this control.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass, field\n\n@dataclass\nclass User:\n    username: str\n    email: str\n    password_hash: str = field(repr=False)  # hidden from print\n    _login_count: int = field(default=0, init=False)  # not in constructor\n\nu = User('alice', 'alice@example.com', 'abc123hash')\nprint(u)\n# User(username='alice', email='alice@example.com')\n# password_hash is hidden; _login_count is not shown",
          caption: "repr=False keeps sensitive data out of logs. init=False creates a field managed internally.",
        },
        {
          kind: "text",
          markdown:
            "## Key field() Parameters\n\n| Parameter | Default | Effect |\n|-----------|---------|--------|\n| `default` | MISSING | Scalar default value |\n| `default_factory` | MISSING | Callable that produces a new default (next lesson) |\n| `init` | True | Whether to include in `__init__` |\n| `repr` | True | Whether to include in `__repr__` |\n| `compare` | True | Whether to include in `__eq__` / `__lt__` etc. |\n| `metadata` | None | Immutable mapping of extra info |\n\nYou only need to specify parameters that differ from the defaults.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass, field\n\n@dataclass\nclass Measurement:\n    value: float\n    unit: str = field(default='m', metadata={'description': 'SI unit symbol'})\n    _id: int = field(default=0, compare=False, repr=False)\n\nm1 = Measurement(3.14)\nm2 = Measurement(3.14, _id=99)  # ERROR: _id has init=True by default\n# To fix: set init=False on _id\nprint(m1)",
          caption: "metadata attaches documentation-like info; compare=False excludes internal tracking IDs from equality.",
        },
        {
          kind: "why-matters",
          body: "field() is the surgical tool for per-field control. You will use repr=False for secrets and credentials, compare=False for cache keys and internal IDs, and init=False for derived or lazily-computed values.",
        },
      ],
      interactions: [
        {
          id: "s21-field-mc",
          kind: "multiple-choice",
          prompt: "You want a `created_at` field that is never passed in the constructor and never shown in repr. Which field() call achieves this?",
          beginnerPurpose: "Apply init=False and repr=False together.",
          expectedConceptIds: ["dataclass"],
          options: [
            { id: "a", text: "field(init=False, repr=False, default=None)", isCorrect: true, explanation: "Both init=False and repr=False exclude the field from the constructor and from the string representation." },
            { id: "b", text: "field(default=None)", isCorrect: false, explanation: "This only sets a default; the field still appears in __init__ and __repr__." },
            { id: "c", text: "field(hidden=True)", isCorrect: false, explanation: "There is no 'hidden' parameter in field()." },
            { id: "d", text: "field(compare=False)", isCorrect: false, explanation: "compare=False only affects equality checks, not repr or init." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "Look at the init and repr parameters of field()." }],
          feedback: {
            correct: "Right! init=False excludes from constructor; repr=False hides from print output.",
            incorrect: "You need to set both init=False and repr=False to achieve both effects.",
          },
        },
        {
          id: "s21-field-fill",
          kind: "fill-code",
          prompt: "Complete the field() call so `api_key` is excluded from __repr__ but still accepted in the constructor.",
          beginnerPurpose: "Use repr=False to hide sensitive data.",
          expectedConceptIds: ["dataclass"],
          codeTemplate:
            "from dataclasses import dataclass, field\n\n@dataclass\nclass APIClient:\n    base_url: str\n    api_key: str = field(___BLANK___=False)",
          blanks: [
            { placeholder: "___BLANK___", answer: "repr", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The parameter that controls __repr__ inclusion is called 'repr'." }],
          feedback: {
            correct: "Correct! repr=False keeps api_key out of the string representation.",
            incorrect: "Use repr=False to hide a field from the printed output.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "dataclass", recallPrompt: "Name two field() parameters and what they control.", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-field-mc", "s21-field-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dataclass"],
      },
    },

    /* ── 21.6 default_factory ───────────────────────────────────────────────── */
    {
      id: "s21-default-factory",
      stageId: "stage-21",
      title: "default_factory for Mutable Defaults",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain why mutable defaults are forbidden in dataclasses",
        "Use field(default_factory=...) to supply per-instance mutable defaults",
        "Apply default_factory with list, dict, and custom callables",
      ],
      prerequisites: ["s21-field-function"],
      concepts: ["dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Mutable Default Problem\n\nIn regular Python functions, writing `def f(x, items=[])` creates a single list shared by all calls that use the default — a notorious bug source. Dataclasses prevent this mistake entirely: if you write `tags: list = []`, Python raises a `ValueError` at class-definition time.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\n\n# BROKEN — ValueError: mutable default is not allowed\n@dataclass\nclass Post:\n    title: str\n    tags: list = []   # ValueError!\n    metadata: dict = {}  # also ValueError!",
          caption: "@dataclass refuses mutable defaults to protect you from the shared-mutable-default bug.",
        },
        {
          kind: "text",
          markdown:
            "## The Fix: default_factory\n\n`default_factory` takes a **zero-argument callable** that is called fresh for each new instance. Use `list` for lists, `dict` for dicts, or any lambda/function for custom objects.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass, field\n\n@dataclass\nclass Post:\n    title: str\n    tags: list = field(default_factory=list)\n    metadata: dict = field(default_factory=dict)\n\np1 = Post('First post')\np2 = Post('Second post')\n\np1.tags.append('python')\nprint(p1.tags)  # ['python']\nprint(p2.tags)  # []  — p2 has its own fresh list!",
          caption: "Each instance gets its own list. Mutations to p1.tags do not affect p2.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass, field\nfrom datetime import datetime\n\n@dataclass\nclass Event:\n    name: str\n    # Custom factory: call datetime.now() for each new instance\n    created_at: datetime = field(default_factory=datetime.now)\n    attendees: list = field(default_factory=list)\n\ne = Event('Standup')\nprint(e.created_at)  # current time at construction",
          caption: "Any callable works as a factory — datetime.now, uuid.uuid4, or your own functions.",
        },
        {
          kind: "mental-model",
          title: "Factory vs Value",
          analogy: "A default VALUE is like printing copies of the same form and giving everyone the same one. A default FACTORY is like a photocopier: each person gets a fresh, blank copy printed just for them.",
          explanation: "default_factory is called with no arguments every time a new instance is created without that field being specified. The result is a brand-new object each time.",
        },
        {
          kind: "why-matters",
          body: "Nearly every real-world dataclass has at least one list or dict field. default_factory is the correct and idiomatic way to handle them. Forgetting this leads to subtle shared-state bugs that are very hard to diagnose.",
        },
      ],
      interactions: [
        {
          id: "s21-factory-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Confirm that default_factory creates independent per-instance objects.",
          expectedConceptIds: ["dataclass"],
          code: "from dataclasses import dataclass, field\n\n@dataclass\nclass Cart:\n    items: list = field(default_factory=list)\n\na = Cart()\nb = Cart()\na.items.append('apple')\nprint(len(a.items), len(b.items))",
          expectedOutput: "1 0",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "default_factory creates a new list for each instance, so they do not share the same list." }],
          feedback: {
            correct: "Correct! a and b each have their own list; mutating a.items does not affect b.items.",
            incorrect: "Each instance gets its own fresh list from the factory. They are independent.",
          },
        },
        {
          id: "s21-factory-fill",
          kind: "fill-code",
          prompt: "Fix the dataclass so each instance gets its own empty dict for `settings`.",
          beginnerPurpose: "Write a correct default_factory call.",
          expectedConceptIds: ["dataclass"],
          codeTemplate:
            "from dataclasses import dataclass, field\n\n@dataclass\nclass App:\n    name: str\n    settings: dict = field(default_factory=___BLANK___)",
          blanks: [
            { placeholder: "___BLANK___", answer: "dict", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Pass the dict type itself (not dict()) as the factory — it will be called with no arguments." }],
          feedback: {
            correct: "Correct! dict is a callable that returns a new empty dict each time it is called.",
            incorrect: "Use 'dict' (the type, without parentheses) as the factory.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "dataclass", recallPrompt: "Why is `tags: list = []` forbidden in a dataclass, and what do you use instead?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-factory-predict", "s21-factory-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dataclass"],
      },
    },

    /* ── 21.7 Frozen dataclasses ────────────────────────────────────────────── */
    {
      id: "s21-frozen-dataclasses",
      stageId: "stage-21",
      title: "Frozen Dataclasses",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create immutable dataclass instances with frozen=True",
        "Understand that frozen instances are hashable and usable as dict keys",
        "Explain the trade-off between frozen and mutable dataclasses",
      ],
      prerequisites: ["s21-default-values"],
      concepts: ["dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Making Instances Immutable\n\nSometimes you want a data object that cannot be modified after creation — a value object. `@dataclass(frozen=True)` achieves this: any attempt to set an attribute after construction raises a `FrozenInstanceError`.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Coordinate:\n    lat: float\n    lon: float\n\nc = Coordinate(51.5074, -0.1278)\nprint(c.lat)   # 51.5074\n\nc.lat = 99.0   # FrozenInstanceError: cannot assign to field 'lat'",
          caption: "frozen=True makes the instance behave like a tuple — read-only after creation.",
        },
        {
          kind: "text",
          markdown:
            "## Hashability\n\nA frozen dataclass is **hashable**: you can use it as a dict key or add it to a set. This follows from its immutability — hashable objects must not change, because the hash is derived from their value.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Point:\n    x: int\n    y: int\n\np = Point(1, 2)\n\n# Usable as dict key\ngrid = {Point(0, 0): 'origin', Point(1, 2): 'target'}\nprint(grid[p])   # 'target'\n\n# Usable in sets\nvisited = {Point(0, 0), Point(1, 2)}\nprint(p in visited)  # True",
          caption: "Frozen dataclasses can be used as dictionary keys and set members.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Frozen + Mutable Field = Problem",
          body: "If a frozen dataclass has a list field, the field itself cannot be reassigned, but the list's contents can still be mutated. frozen=True prevents attribute reassignment, not deep immutability. To be truly immutable, use only immutable field types (int, str, tuple, frozenset).",
        },
        {
          kind: "why-matters",
          body: "Frozen dataclasses are ideal for coordinates, dates, currency amounts, and other value types that should never change once created. Their hashability lets them serve as cache keys, set members, and dict keys — enabling powerful look-up patterns.",
        },
      ],
      interactions: [
        {
          id: "s21-frozen-mc",
          kind: "multiple-choice",
          prompt: "Which statement about frozen dataclasses is TRUE?",
          beginnerPurpose: "Confirm understanding of what frozen=True provides.",
          expectedConceptIds: ["dataclass"],
          options: [
            { id: "a", text: "They can be used as dictionary keys", isCorrect: true, explanation: "Frozen dataclasses are hashable because they are immutable, so they work as dict keys." },
            { id: "b", text: "Their list fields cannot be mutated", isCorrect: false, explanation: "frozen=True prevents attribute reassignment but not mutation of mutable objects already stored in a field." },
            { id: "c", text: "They cannot be compared with ==", isCorrect: false, explanation: "frozen=True still generates __eq__ — comparison works fine." },
            { id: "d", text: "They are faster than regular dataclasses", isCorrect: false, explanation: "There is no significant performance difference from frozen=True itself." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Immutable objects are hashable in Python. What does hashability enable?" }],
          feedback: {
            correct: "Correct! Hashability (from immutability) lets frozen instances serve as dict keys.",
            incorrect: "Think about what immutability enables in Python's data structures.",
          },
        },
        {
          id: "s21-frozen-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace frozen dataclass usage as a set member.",
          expectedConceptIds: ["dataclass"],
          code: "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Color:\n    r: int\n    g: int\n    b: int\n\npalette = {Color(255, 0, 0), Color(0, 255, 0), Color(255, 0, 0)}\nprint(len(palette))",
          expectedOutput: "2",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Sets deduplicate. Two Color(255,0,0) instances compare equal, so only one is kept." }],
          feedback: {
            correct: "Correct! Two identical frozen instances hash and compare the same, so the set contains only 2 unique colors.",
            incorrect: "Sets use hashing to detect duplicates. Two frozen instances with the same fields are treated as the same element.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "dataclass", recallPrompt: "What does frozen=True enable that a regular dataclass cannot do?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-frozen-mc", "s21-frozen-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dataclass"],
      },
    },

    /* ── 21.8 __post_init__ ─────────────────────────────────────────────────── */
    {
      id: "s21-post-init",
      stageId: "stage-21",
      title: "Post-Init Processing with __post_init__",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use __post_init__ to run validation after field assignment",
        "Derive computed fields using __post_init__",
        "Understand execution order: __init__ runs first, then __post_init__",
      ],
      prerequisites: ["s21-field-function"],
      concepts: ["dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Custom Logic After Field Assignment\n\nThe generated `__init__` only assigns fields. If you need validation, normalisation, or computed attributes, define `__post_init__`. It is called automatically at the end of the generated `__init__`, after all fields have been assigned.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\n\n@dataclass\nclass Temperature:\n    celsius: float\n\n    def __post_init__(self):\n        if self.celsius < -273.15:\n            raise ValueError(f'{self.celsius}°C is below absolute zero')\n\nt = Temperature(100)   # OK\nTemperature(-300)      # ValueError: -300°C is below absolute zero",
          caption: "__post_init__ is the right place for validation that depends on field values.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass, field\n\n@dataclass\nclass FullName:\n    first: str\n    last: str\n    # Computed field — not in constructor because init=False\n    display: str = field(init=False, repr=True)\n\n    def __post_init__(self):\n        # Build display from the other fields\n        self.display = f'{self.first} {self.last}'\n\nname = FullName('Ada', 'Lovelace')\nprint(name.display)  # Ada Lovelace",
          caption: "Combining init=False with __post_init__ creates derived/computed fields.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Frozen + __post_init__",
          body: "In a frozen dataclass, assigning to self.field in __post_init__ still works because it uses object.__setattr__ internally. @dataclass handles this automatically — you do not need to do anything special.",
        },
        {
          kind: "why-matters",
          body: "__post_init__ is where business rules live in a dataclass. It gives you the safety net of validated construction without writing a custom __init__ from scratch. This is essential for domain models where invalid states should be impossible.",
        },
      ],
      interactions: [
        {
          id: "s21-postinit-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace __post_init__ execution.",
          expectedConceptIds: ["dataclass"],
          code: "from dataclasses import dataclass, field\n\n@dataclass\nclass Rectangle:\n    width: float\n    height: float\n    area: float = field(init=False)\n\n    def __post_init__(self):\n        self.area = self.width * self.height\n\nr = Rectangle(4.0, 5.0)\nprint(r.area)",
          expectedOutput: "20.0",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "__post_init__ runs after the fields are assigned, so self.width and self.height are available." }],
          feedback: {
            correct: "Correct! __post_init__ computes area = 4.0 * 5.0 = 20.0.",
            incorrect: "__post_init__ runs after all fields are set, so it can compute derived values from them.",
          },
        },
        {
          id: "s21-postinit-run",
          kind: "run-code",
          prompt: "Write a dataclass `BoundedInt` with a `value: int` field and a `__post_init__` that raises ValueError if value is negative.",
          beginnerPurpose: "Practice writing validation in __post_init__.",
          expectedConceptIds: ["dataclass"],
          starterCode:
            "from dataclasses import dataclass\n\n@dataclass\nclass BoundedInt:\n    value: int\n\n    def __post_init__(self):\n        # Your validation here\n        pass\n\n# Test\ntry:\n    BoundedInt(-1)\n    print('No error')\nexcept ValueError:\n    print('ValueError raised')\n\nb = BoundedInt(5)\nprint(b.value)",
          task: "Add validation in __post_init__ that raises ValueError when value is negative.",
          expectedOutputContains: ["ValueError raised", "5"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "Check if self.value < 0 and raise ValueError." },
            { level: "syntax", text: "if self.value < 0:\n    raise ValueError('value must be non-negative')" },
          ],
          feedback: {
            correct: "Well done! __post_init__ validation prevents invalid instances from being created.",
            incorrect: "In __post_init__, check self.value and raise ValueError if it is negative.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "dataclass", recallPrompt: "When does __post_init__ run, and what is it used for?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-postinit-predict", "s21-postinit-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dataclass"],
      },
    },

    /* ── 21.9 slots=True ────────────────────────────────────────────────────── */
    {
      id: "s21-slots",
      stageId: "stage-21",
      title: "slots=True for Memory Efficiency",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use slots=True to reduce per-instance memory overhead",
        "Understand that __slots__ prevents arbitrary attribute creation",
        "Know when slots=True is and is not appropriate",
      ],
      prerequisites: ["s21-dataclass-decorator"],
      concepts: ["dataclass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The __dict__ Tax\n\nBy default, Python stores each instance's attributes in a dictionary (`__dict__`). This is flexible but expensive: every instance pays the overhead of a dict even if you only store two integers. For classes with millions of instances, this adds up.\n\n`@dataclass(slots=True)` (Python 3.10+) generates `__slots__` automatically, storing attributes in a compact, fixed-size structure instead.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from dataclasses import dataclass\nimport sys\n\n@dataclass\nclass PointNormal:\n    x: float\n    y: float\n\n@dataclass(slots=True)\nclass PointSlotted:\n    x: float\n    y: float\n\nn = PointNormal(1.0, 2.0)\ns = PointSlotted(1.0, 2.0)\n\nprint(sys.getsizeof(n.__dict__))  # ~200 bytes for the dict\nprint(hasattr(s, '__dict__'))     # False — no dict, uses slots",
          caption: "slots=True eliminates __dict__, reducing memory usage per instance significantly.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "slots=True Disallows Dynamic Attributes",
          body: "With slots, you cannot add new attributes at runtime that were not declared as fields. `instance.new_attr = 'x'` raises AttributeError. This is usually fine for dataclasses, since their fields are declared upfront.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Python 3.10+ Only",
          body: "slots=True as a @dataclass parameter was added in Python 3.10. For earlier versions, you need to manually add __slots__ = () to the class body and combine it carefully with dataclass (there are known issues).",
        },
        {
          kind: "why-matters",
          body: "slots=True is a zero-cost optimisation for data-heavy applications: event streams, geometry computations, machine-learning feature records. It should be your default for any dataclass that will be instantiated more than a few thousand times.",
        },
      ],
      interactions: [
        {
          id: "s21-slots-mc",
          kind: "multiple-choice",
          prompt: "What is the primary benefit of @dataclass(slots=True)?",
          beginnerPurpose: "Identify the purpose of slots.",
          expectedConceptIds: ["dataclass"],
          options: [
            { id: "a", text: "Reduced memory usage per instance", isCorrect: true, explanation: "__slots__ replaces __dict__ with a compact fixed-size structure, saving memory for classes with many instances." },
            { id: "b", text: "Faster method calls", isCorrect: false, explanation: "Attribute access is slightly faster with slots, but that is a secondary benefit; the primary gain is memory." },
            { id: "c", text: "Automatic validation", isCorrect: false, explanation: "Validation is done in __post_init__, not by slots=True." },
            { id: "d", text: "Thread safety", isCorrect: false, explanation: "slots=True does not provide thread safety." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what __dict__ costs and what __slots__ removes." }],
          feedback: {
            correct: "Right! slots=True eliminates the per-instance __dict__, reducing memory overhead.",
            incorrect: "The main motivation is memory efficiency — eliminating the per-instance dictionary.",
          },
        },
        {
          id: "s21-slots-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Understand that slots blocks dynamic attribute creation.",
          expectedConceptIds: ["dataclass"],
          code: "from dataclasses import dataclass\n\n@dataclass(slots=True)\nclass Vector:\n    x: float\n    y: float\n\nv = Vector(1.0, 2.0)\ntry:\n    v.z = 3.0\nexcept AttributeError:\n    print('AttributeError')\nprint(v.x)",
          expectedOutput: "AttributeError\n1.0",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "slots=True prevents adding attributes that were not declared as fields." }],
          feedback: {
            correct: "Correct! z was not declared as a field, so assignment raises AttributeError.",
            incorrect: "With slots=True, only the declared fields exist as valid attributes. Dynamic addition is blocked.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "dataclass", recallPrompt: "What trade-off does slots=True make?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-slots-mc", "s21-slots-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dataclass"],
      },
    },

    /* ── 21.10 Enum — defining enumerations ─────────────────────────────────── */
    {
      id: "s21-enum-basics",
      stageId: "stage-21",
      title: "Enum — Defining Enumerations",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define an enumeration using class Foo(Enum)",
        "Access members by name and by value",
        "Use enums in comparisons and control flow",
      ],
      prerequisites: [],
      concepts: ["enum"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem with Magic Strings and Numbers\n\nCode like `if status == 'active'` or `if direction == 2` is fragile: typos ('actiev') silently pass without error, and the number `2` carries no meaning by itself. **Enumerations** replace these magic values with named, type-safe constants.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from enum import Enum\n\nclass Status(Enum):\n    PENDING = 'pending'\n    ACTIVE  = 'active'\n    CLOSED  = 'closed'\n\n# Access by name\nprint(Status.ACTIVE)         # Status.ACTIVE\nprint(Status.ACTIVE.name)    # 'ACTIVE'\nprint(Status.ACTIVE.value)   # 'active'\n\n# Access by value\nprint(Status('active'))      # Status.ACTIVE",
          caption: "Enum members have both a .name (the Python identifier) and a .value (the assigned constant).",
        },
        {
          kind: "text",
          markdown:
            "## Comparison and Control Flow\n\nEnum members compare by identity (`is`) and by equality (`==`), but NOT by their value by default. `Status.ACTIVE == 'active'` is `False`. This prevents accidentally mixing strings and enum members.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from enum import Enum\n\nclass Direction(Enum):\n    NORTH = 1\n    SOUTH = 2\n    EAST  = 3\n    WEST  = 4\n\ndef move(d: Direction) -> str:\n    match d:\n        case Direction.NORTH: return 'Moving north'\n        case Direction.SOUTH: return 'Moving south'\n        case _: return 'Moving sideways'\n\nprint(move(Direction.NORTH))  # Moving north\nprint(Direction.NORTH == Direction.SOUTH)  # False\nprint(Direction.NORTH is Direction.NORTH)  # True — members are singletons",
          caption: "Enum members are singletons. Use them in match/case or if/elif chains.",
        },
        {
          kind: "mental-model",
          title: "Enum Members as Named Singletons",
          analogy: "Think of traffic lights: there are exactly three states (Red, Amber, Green), each with a fixed meaning. You never create a new traffic light state; you always pick from the fixed set. Enum members work the same way — a fixed, named set of symbolic constants.",
          explanation: "The Enum metaclass ensures each member is created exactly once and is always the same object. This makes identity comparison (is) safe and fast.",
        },
        {
          kind: "why-matters",
          body: "Enums eliminate entire classes of bugs caused by magic strings and undocumented integer codes. They make code self-documenting, enable IDE autocomplete, and make exhaustive pattern matching possible. Every domain that has a fixed set of choices (order states, directions, error codes) should use an Enum.",
        },
      ],
      interactions: [
        {
          id: "s21-enum-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace .name and .value access on enum members.",
          expectedConceptIds: ["enum"],
          code: "from enum import Enum\n\nclass Season(Enum):\n    SPRING = 1\n    SUMMER = 2\n    AUTUMN = 3\n    WINTER = 4\n\ns = Season.AUTUMN\nprint(s.name)\nprint(s.value)\nprint(s == Season.AUTUMN)",
          expectedOutput: "AUTUMN\n3\nTrue",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: ".name is the Python identifier; .value is what you assigned on the right-hand side." }],
          feedback: {
            correct: "Correct! .name gives the identifier string, .value gives the assigned integer, and == checks member identity.",
            incorrect: ".name is the string 'AUTUMN', .value is 3 (the assigned value), and == compares by identity.",
          },
        },
        {
          id: "s21-enum-fill",
          kind: "fill-code",
          prompt: "Complete the Enum definition with members ON, OFF, and STANDBY with integer values 1, 0, 2.",
          beginnerPurpose: "Practice writing an Enum class.",
          expectedConceptIds: ["enum"],
          codeTemplate:
            "from enum import Enum\n\nclass Power(Enum):\n    ON = ___BLANK1___\n    OFF = ___BLANK2___\n    STANDBY = ___BLANK3___",
          blanks: [
            { placeholder: "___BLANK1___", answer: "1", caseSensitive: true },
            { placeholder: "___BLANK2___", answer: "0", caseSensitive: true },
            { placeholder: "___BLANK3___", answer: "2", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Each member is written as NAME = value inside the class body." }],
          feedback: {
            correct: "Correct! Each member has a name (identifier) and a value (integer).",
            incorrect: "Write each member as MEMBERNAME = value, where the value is the integer you want.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "enum", recallPrompt: "What is the difference between a member's .name and .value?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-enum-predict", "s21-enum-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["enum"],
      },
    },

    /* ── 21.11 IntEnum ──────────────────────────────────────────────────────── */
    {
      id: "s21-intenum",
      stageId: "stage-21",
      title: "IntEnum",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use IntEnum when enum members need to interoperate with integer code",
        "Understand that IntEnum members compare equal to plain integers",
        "Know the trade-off: looser type safety vs interoperability",
      ],
      prerequisites: ["s21-enum-basics"],
      concepts: ["enum"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## When You Need Integer Interoperability\n\nRegular `Enum` members do NOT compare equal to plain integers (`Status.ACTIVE == 1` is `False`). This is good for type safety but can be a problem when interfacing with C libraries, database integers, or legacy code that already uses numeric codes.\n\n`IntEnum` solves this: its members ARE integers and compare equal to their numeric values.",
        },
        {
          kind: "comparison",
          leftLabel: "Enum (strict)",
          rightLabel: "IntEnum (interoperable)",
          leftCode:
            "from enum import Enum\nclass Code(Enum):\n    OK = 200\n    NOT_FOUND = 404\n\nCode.OK == 200       # False\nCode.OK > Code.NOT_FOUND  # TypeError",
          rightCode:
            "from enum import IntEnum\nclass Code(IntEnum):\n    OK = 200\n    NOT_FOUND = 404\n\nCode.OK == 200       # True\nCode.OK < Code.NOT_FOUND  # True (200 < 404)",
          caption: "IntEnum members ARE ints; Enum members are not.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Prefer Enum Over IntEnum",
          body: "The Python docs recommend `Enum` as the default choice. `IntEnum` trades type safety for compatibility: plain integers can accidentally compare equal to your enum members, hiding bugs. Use IntEnum only when you genuinely need integer interoperability.",
        },
        {
          kind: "why-matters",
          body: "IntEnum is commonly used with HTTP status codes, OS error numbers, and database-backed enums where the integer value must round-trip through storage without conversion.",
        },
      ],
      interactions: [
        {
          id: "s21-intenum-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Contrast Enum and IntEnum comparison behaviour.",
          expectedConceptIds: ["enum"],
          code: "from enum import Enum, IntEnum\n\nclass A(Enum):\n    X = 1\n\nclass B(IntEnum):\n    X = 1\n\nprint(A.X == 1)\nprint(B.X == 1)\nprint(B.X + 1)",
          expectedOutput: "False\nTrue\n2",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "IntEnum members are subclasses of int; Enum members are not." }],
          feedback: {
            correct: "Correct! Enum.X != 1, IntEnum.X == 1, and IntEnum.X + 1 == 2 (acts as int).",
            incorrect: "Regular Enum members don't compare to ints; IntEnum members are ints.",
          },
        },
        {
          id: "s21-intenum-mc",
          kind: "multiple-choice",
          prompt: "When should you prefer IntEnum over Enum?",
          beginnerPurpose: "Learn the appropriate use case for IntEnum.",
          expectedConceptIds: ["enum"],
          options: [
            { id: "a", text: "When members must interoperate with code that uses plain integers", isCorrect: true, explanation: "IntEnum is designed for interoperability with integer-based APIs and legacy code." },
            { id: "b", text: "Whenever you want integer values in your enum", isCorrect: false, explanation: "Enum can have integer values too. IntEnum is specifically for when you need the members to BE integers, not just HAVE integer values." },
            { id: "c", text: "For better performance", isCorrect: false, explanation: "The performance difference is negligible; IntEnum is about interoperability." },
            { id: "d", text: "When you want strict type safety", isCorrect: false, explanation: "IntEnum is LESS type-safe than Enum because ints can accidentally match members." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about when you'd need to pass an enum member to a function that expects an int." }],
          feedback: {
            correct: "Right! IntEnum enables seamless interoperability with integer-based APIs.",
            incorrect: "IntEnum's purpose is interoperability — use it when the code you interact with expects real integers.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "enum", recallPrompt: "What is the key difference between Enum and IntEnum?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-intenum-predict", "s21-intenum-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["enum"],
      },
    },

    /* ── 21.12 StrEnum ──────────────────────────────────────────────────────── */
    {
      id: "s21-strenum",
      stageId: "stage-21",
      title: "StrEnum",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use StrEnum when enum values must compare equal to plain strings",
        "Apply StrEnum for JSON serialisation and database string columns",
      ],
      prerequisites: ["s21-intenum"],
      concepts: ["enum"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## String-Valued Enums That Act Like Strings\n\n`StrEnum` (Python 3.11+) is to strings what `IntEnum` is to integers. Members are instances of `str`, so they compare equal to their string values and can be used anywhere a plain string is expected — in JSON serialisation, database drivers, or string formatting — without calling `.value`.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from enum import StrEnum\n\nclass HTTPMethod(StrEnum):\n    GET    = 'GET'\n    POST   = 'POST'\n    PUT    = 'PUT'\n    DELETE = 'DELETE'\n\nmethod = HTTPMethod.GET\nprint(method == 'GET')        # True\nprint(f'Method: {method}')    # Method: GET (no .value needed)\n\n# Works directly with string-based APIs\nheaders = {'X-Method': HTTPMethod.POST}\nprint(headers['X-Method'].upper())  # POST",
          caption: "StrEnum members are strings — no need for .value when passing to string-expecting APIs.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Python 3.11+ Only",
          body: "StrEnum was added in Python 3.11. For earlier versions, you can achieve the same by inheriting from both str and Enum: `class MyEnum(str, Enum): ...`",
        },
        {
          kind: "why-matters",
          body: "StrEnum is ideal for HTTP methods, MIME types, database string columns, and JSON-serialisable status fields. Using it means you get enum safety (no typos, exhaustive matching) without sacrificing direct string compatibility.",
        },
      ],
      interactions: [
        {
          id: "s21-strenum-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace StrEnum string comparison.",
          expectedConceptIds: ["enum"],
          code: "from enum import StrEnum\n\nclass Role(StrEnum):\n    ADMIN = 'admin'\n    USER  = 'user'\n\nr = Role.ADMIN\nprint(r == 'admin')\nprint(r.upper())\nprint(type(r).__name__)",
          expectedOutput: "True\nADMIN\nRole",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "StrEnum members ARE strings. type() still shows the class name." }],
          feedback: {
            correct: "Correct! StrEnum members compare to strings, support string methods, but type() shows the enum class.",
            incorrect: "StrEnum members are str subclasses. They compare to strings and support string methods.",
          },
        },
        {
          id: "s21-strenum-mc",
          kind: "multiple-choice",
          prompt: "Which is the main advantage of StrEnum over regular Enum with string values?",
          beginnerPurpose: "Distinguish StrEnum from Enum with str values.",
          expectedConceptIds: ["enum"],
          options: [
            { id: "a", text: "Members can be used directly where strings are expected without .value", isCorrect: true, explanation: "StrEnum members ARE strings, so they work in f-strings, JSON serialisers, and string APIs without calling .value." },
            { id: "b", text: "They are faster to create", isCorrect: false, explanation: "Performance is not the motivation." },
            { id: "c", text: "They support integer comparisons too", isCorrect: false, explanation: "StrEnum is only for string interoperability." },
            { id: "d", text: "They automatically uppercase the values", isCorrect: false, explanation: "StrEnum does not change values; it just makes members actual strings." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What would you normally have to write instead of the enum member to pass it to a string API?" }],
          feedback: {
            correct: "Right! No .value call needed — the member itself is a string.",
            incorrect: "The key benefit is that StrEnum members work anywhere a plain string is expected.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "enum", recallPrompt: "When would you use StrEnum instead of a regular Enum with string values?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-strenum-predict", "s21-strenum-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["enum"],
      },
    },

    /* ── 21.13 Flag — bit flags ─────────────────────────────────────────────── */
    {
      id: "s21-flag",
      stageId: "stage-21",
      title: "Flag — Bit Flags",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define Flag enumerations for combinable bit-field permissions",
        "Combine flags with | and test membership with &",
        "Understand when to use Flag vs a set of Enum members",
      ],
      prerequisites: ["s21-enum-basics"],
      concepts: ["enum"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Permissions That Can Be Combined\n\nSome domains have values that represent combinations: a user might have read AND write permissions simultaneously. Regular Enum forces you to create a new member for every combination. `Flag` solves this by assigning powers-of-two values and supporting bitwise operations.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from enum import Flag, auto\n\nclass Permission(Flag):\n    READ    = auto()  # 1\n    WRITE   = auto()  # 2\n    EXECUTE = auto()  # 4\n    ADMIN   = READ | WRITE | EXECUTE  # 7 — convenience combination\n\n# Combine permissions\nuser_perms = Permission.READ | Permission.WRITE\nprint(user_perms)  # Permission.READ|WRITE\n\n# Test membership\nprint(Permission.READ in user_perms)     # True\nprint(Permission.EXECUTE in user_perms)  # False\nprint(Permission.ADMIN in user_perms)    # False (user lacks EXECUTE)",
          caption: "Flag members combine with | and are tested with 'in'.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "auto() With Flag Always Uses Powers of Two",
          body: "When used inside a Flag subclass, auto() automatically assigns the next power of two: 1, 2, 4, 8, 16, etc. This is essential for bitwise combination to work correctly — the values must not overlap.",
        },
        {
          kind: "why-matters",
          body: "Flag is the standard tool for permission systems, file mode bits, feature toggles, and any domain where values can be combined. It is more readable and safer than raw integer bitmasks.",
        },
      ],
      interactions: [
        {
          id: "s21-flag-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace Flag combination and membership testing.",
          expectedConceptIds: ["enum"],
          code: "from enum import Flag, auto\n\nclass Access(Flag):\n    READ  = auto()\n    WRITE = auto()\n\nperms = Access.READ | Access.WRITE\nprint(Access.READ in perms)\nprint(Access.WRITE in perms)\nprint(bool(perms & Access.READ))",
          expectedOutput: "True\nTrue\nTrue",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "'in' tests whether a flag is set in a combination. '&' does bitwise AND." }],
          feedback: {
            correct: "Correct! Both READ and WRITE are set in perms.",
            incorrect: "READ | WRITE sets both bits. 'in' and '&' both test whether a given flag is present.",
          },
        },
        {
          id: "s21-flag-mc",
          kind: "multiple-choice",
          prompt: "Why must Flag member values be powers of two?",
          beginnerPurpose: "Understand the bit-flag mechanism.",
          expectedConceptIds: ["enum"],
          options: [
            { id: "a", text: "So that individual flags can be combined without overlapping bits", isCorrect: true, explanation: "Powers of two have non-overlapping binary representations, so | combines them and & isolates them without ambiguity." },
            { id: "b", text: "To make them sortable", isCorrect: false, explanation: "Sortability is not the reason; it is about bit independence." },
            { id: "c", text: "Python requires all Enum values to be powers of two", isCorrect: false, explanation: "Only Flag subclasses benefit from powers of two; regular Enum can use any values." },
            { id: "d", text: "To save memory", isCorrect: false, explanation: "Memory is not the motivation; bit independence is." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what binary AND and OR do when two numbers share no bits." }],
          feedback: {
            correct: "Right! Non-overlapping bits mean any combination of flags has a unique binary representation.",
            incorrect: "In binary, powers of two each have exactly one bit set in different positions, so they never interfere with each other when combined.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "enum", recallPrompt: "How do you combine Flag members and test if a specific flag is set?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-flag-predict", "s21-flag-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["enum"],
      },
    },

    /* ── 21.14 auto() ───────────────────────────────────────────────────────── */
    {
      id: "s21-auto",
      stageId: "stage-21",
      title: "auto() — Automatic Values",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use auto() to generate enum values automatically",
        "Understand auto() behaviour in Enum vs Flag",
        "Customise auto() by overriding _generate_next_value_",
      ],
      prerequisites: ["s21-enum-basics"],
      concepts: ["enum"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## When the Value Does Not Matter\n\nSometimes you need an enum purely for its named members — the actual underlying values are irrelevant. Rather than assigning arbitrary integers manually, `auto()` generates them for you.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from enum import Enum, auto\n\nclass Colour(Enum):\n    RED   = auto()  # 1\n    GREEN = auto()  # 2\n    BLUE  = auto()  # 3\n\nprint(list(Colour))  # [<Colour.RED: 1>, <Colour.GREEN: 2>, <Colour.BLUE: 3>]",
          caption: "In a plain Enum, auto() starts at 1 and increments by 1.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from enum import Enum, auto\n\nclass CaseInsensitiveEnum(Enum):\n    @staticmethod\n    def _generate_next_value_(name, start, count, last_values):\n        return name.lower()  # Use lowercase member name as value\n\nclass Status(CaseInsensitiveEnum):\n    PENDING = auto()   # 'pending'\n    ACTIVE  = auto()   # 'active'\n    CLOSED  = auto()   # 'closed'\n\nprint(Status.ACTIVE.value)  # 'active'",
          caption: "Override _generate_next_value_ to customise what auto() produces.",
        },
        {
          kind: "why-matters",
          body: "auto() prevents meaningless magic numbers from polluting your code. When the numeric value doesn't matter — only the symbolic name does — auto() makes your intent explicit.",
        },
      ],
      interactions: [
        {
          id: "s21-auto-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace auto() value assignment.",
          expectedConceptIds: ["enum"],
          code: "from enum import Enum, auto\n\nclass Step(Enum):\n    FIRST  = auto()\n    SECOND = auto()\n    THIRD  = auto()\n\nprint(Step.SECOND.value)\nprint(Step.THIRD.value)",
          expectedOutput: "2\n3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "auto() in a plain Enum starts at 1 and increments by 1 for each member." }],
          feedback: {
            correct: "Correct! FIRST=1, SECOND=2, THIRD=3.",
            incorrect: "auto() assigns 1 to the first member, 2 to the second, and so on.",
          },
        },
        {
          id: "s21-auto-mc",
          kind: "multiple-choice",
          prompt: "When is auto() most appropriate?",
          beginnerPurpose: "Identify the right use case for auto().",
          expectedConceptIds: ["enum"],
          options: [
            { id: "a", text: "When the specific numeric value of each member does not matter", isCorrect: true, explanation: "auto() is for identity-only enums where you only care about the name, not the underlying value." },
            { id: "b", text: "When you need members to compare equal to specific integers", isCorrect: false, explanation: "For that, assign explicit values or use IntEnum." },
            { id: "c", text: "To make enums iterable", isCorrect: false, explanation: "All Enum subclasses are iterable regardless of how values are assigned." },
            { id: "d", text: "When values must start at 0", isCorrect: false, explanation: "auto() starts at 1 by default. For 0-based values, use explicit assignment or override _generate_next_value_." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Ask yourself: does it matter what number RED is, or only that RED != GREEN?" }],
          feedback: {
            correct: "Right! auto() signals that the value is arbitrary — only the name matters.",
            incorrect: "auto() is best when you only care about having distinct named constants, not about their specific values.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "enum", recallPrompt: "What does auto() do in a plain Enum, and when should you use it?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-auto-predict", "s21-auto-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["enum"],
      },
    },

    /* ── 21.15 Abstract base classes (ABC) ──────────────────────────────────── */
    {
      id: "s21-abc-concept",
      stageId: "stage-21",
      title: "Abstract Base Classes — The Concept",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what an abstract base class is and why it exists",
        "Distinguish between interface (what) and implementation (how)",
        "Identify when ABCs are appropriate vs duck typing",
      ],
      prerequisites: [],
      concepts: ["abstract-base-class"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem ABCs Solve\n\nDuck typing is powerful: if an object has the right methods, you can use it. But it fails silently — you only discover a missing method when that code path runs at runtime, possibly in production.\n\nAbstract base classes let you **declare a contract upfront**: any class that claims to be a `Shape` must implement `area()` and `perimeter()`. If a subclass forgets one, Python raises a `TypeError` when you try to instantiate it — at construction time, not hidden deep in execution.",
        },
        {
          kind: "mental-model",
          title: "ABCs as Signed Contracts",
          analogy: "Think of an ABC as a legal contract for a job role. The job description lists every responsibility. If you apply and accept the job (subclass the ABC), you are legally bound (by Python) to fulfil every responsibility (implement every abstract method). You cannot start work (instantiate) until you have committed to all of them.",
          explanation: "The ABC enforces the contract at instantiation time. Concrete subclasses that miss any abstract method cannot be instantiated — Python raises TypeError.",
        },
        {
          kind: "text",
          markdown:
            "## Interface vs Implementation\n\nAn **interface** defines what an object can do — the set of methods it promises to provide. An **implementation** defines how those methods work.\n\nAn ABC specifies the interface. Each concrete subclass provides its own implementation. Multiple implementations can satisfy the same interface, making them interchangeable from the caller's perspective.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "ABCs vs Duck Typing",
          body: "Duck typing checks at call time: if it has .fly(), treat it as a bird. ABCs check at construction time: if it claims to be a Bird, enforce that it has .fly(). Use duck typing for small, informal protocols. Use ABCs when you're building a library, framework, or public API where the contract needs to be enforced and documented.",
        },
        {
          kind: "why-matters",
          body: "ABCs are the backbone of Python's standard library (Sequence, Mapping, Iterable, etc.). They are also the right tool for plugin systems, strategy patterns, and any architecture where you want to guarantee that pluggable components satisfy a defined interface.",
        },
      ],
      interactions: [
        {
          id: "s21-abc-concept-mc",
          kind: "multiple-choice",
          prompt: "What is the primary advantage of an abstract base class over duck typing?",
          beginnerPurpose: "Distinguish the problem ABCs solve from duck typing.",
          expectedConceptIds: ["abstract-base-class"],
          options: [
            { id: "a", text: "It enforces the interface contract at instantiation time, not at call time", isCorrect: true, explanation: "ABCs raise TypeError when you try to create an instance of a class that has not implemented all abstract methods — before any method is called." },
            { id: "b", text: "It makes code run faster", isCorrect: false, explanation: "ABCs add a small overhead; performance is not their purpose." },
            { id: "c", text: "It removes the need for type annotations", isCorrect: false, explanation: "ABCs and type annotations are complementary, not alternatives." },
            { id: "d", text: "It prevents subclassing entirely", isCorrect: false, explanation: "ABCs are designed specifically to be subclassed." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "When does duck typing reveal a missing method, compared to when an ABC reveals it?" }],
          feedback: {
            correct: "Right! ABCs give you early, explicit error messages instead of silent failures at call time.",
            incorrect: "Think about when each approach detects a missing method — at construction or at the point of the call?",
          },
        },
        {
          id: "s21-abc-concept-explain",
          kind: "plain-language-explain",
          prompt: "Explain in plain language what an abstract base class is and when you would use one.",
          beginnerPurpose: "Articulate the ABC concept without code.",
          expectedConceptIds: ["abstract-base-class"],
          code: "# No code needed — explain the concept",
          keyPointsToHit: [
            "An ABC defines a required interface (set of methods)",
            "Subclasses must implement all abstract methods",
            "Python raises TypeError if you try to instantiate an incomplete subclass",
            "ABCs are useful for enforcing contracts in libraries and plugin architectures",
          ],
          sampleAnswer:
            "An abstract base class is a class that defines a contract: a set of methods every subclass must implement. You cannot create an instance of a class that skips any of those methods — Python raises a TypeError. ABCs are useful when building frameworks or plugin systems where you need to guarantee that all pluggable components behave consistently.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about the 'signed contract' analogy — what does the ABC require, and what happens if a subclass doesn't deliver?" }],
          feedback: {
            correct: "Excellent! You captured the contract, enforcement, and use-case clearly.",
            incorrect: "Mention the required interface, the enforcement at instantiation time, and a use case like plugin systems.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "abstract-base-class", recallPrompt: "What does Python do when you try to instantiate a class that inherits from an ABC but doesn't implement all abstract methods?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-abc-concept-mc", "s21-abc-concept-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["abstract-base-class"],
      },
    },

    /* ── 21.16 ABC base class ───────────────────────────────────────────────── */
    {
      id: "s21-abc-base-class",
      stageId: "stage-21",
      title: "The ABC Base Class",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Import and use ABC from abc module",
        "Write a class that inherits from ABC",
        "Understand the role of ABCMeta metaclass",
      ],
      prerequisites: ["s21-abc-concept"],
      concepts: ["abstract-base-class"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Setting Up an Abstract Base Class\n\nTo create an ABC, inherit from `ABC` (which is a convenience class using `ABCMeta` as its metaclass). The `ABC` class lives in the `abc` standard library module.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from abc import ABC\n\nclass Animal(ABC):\n    \"\"\"Abstract base class for all animals.\"\"\"\n    # No abstract methods yet — just the base\n    pass\n\n# Animal itself cannot be instantiated in a useful sense,\n# but without @abstractmethod it CAN be instantiated\na = Animal()  # Works — but doesn't enforce anything yet",
          caption: "Inheriting from ABC makes a class abstract, but without @abstractmethod there is nothing to enforce.",
        },
        {
          kind: "text",
          markdown:
            "## ABCMeta Under the Hood\n\n`ABC` is just a shorthand for `class MyClass(metaclass=ABCMeta)`. The metaclass intercepts class creation, tracks which methods are decorated with `@abstractmethod`, and blocks instantiation if any remain unimplemented. You normally use `ABC` rather than `ABCMeta` directly.",
        },
        {
          kind: "comparison",
          leftLabel: "Long form (ABCMeta)",
          rightLabel: "Short form (ABC)",
          leftCode:
            "from abc import ABCMeta\n\nclass Shape(metaclass=ABCMeta):\n    pass",
          rightCode:
            "from abc import ABC\n\nclass Shape(ABC):\n    pass",
          caption: "Both are equivalent. Prefer the ABC shorthand — it is more readable.",
        },
        {
          kind: "why-matters",
          body: "Knowing how to set up the ABC base class is the prerequisite for adding abstract methods. It also explains why the enforcement works — ABCMeta's metaclass machinery does the checking.",
        },
      ],
      interactions: [
        {
          id: "s21-abc-base-fill",
          kind: "fill-code",
          prompt: "Complete the import and class definition so Shape is an abstract base class.",
          beginnerPurpose: "Practice the ABC import and inheritance.",
          expectedConceptIds: ["abstract-base-class"],
          codeTemplate:
            "from abc import ___BLANK1___\n\nclass Shape(___BLANK2___):\n    pass",
          blanks: [
            { placeholder: "___BLANK1___", answer: "ABC", caseSensitive: true },
            { placeholder: "___BLANK2___", answer: "ABC", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Import ABC from the abc module and use it as the base class." }],
          feedback: {
            correct: "Correct! ABC is imported from abc and used as the base class.",
            incorrect: "Use 'from abc import ABC' and then 'class Shape(ABC):'.",
          },
        },
        {
          id: "s21-abc-base-mc",
          kind: "multiple-choice",
          prompt: "What does inheriting from ABC do on its own (without any @abstractmethod)?",
          beginnerPurpose: "Understand that ABC alone is not sufficient to enforce contracts.",
          expectedConceptIds: ["abstract-base-class"],
          options: [
            { id: "a", text: "It marks the class as abstract but enforces nothing without @abstractmethod", isCorrect: true, explanation: "ABC alone sets up the ABCMeta machinery but without @abstractmethod decorators, there is nothing to enforce." },
            { id: "b", text: "It prevents the class from being instantiated", isCorrect: false, explanation: "Without @abstractmethod, a class inheriting from ABC CAN be instantiated." },
            { id: "c", text: "It makes all methods abstract automatically", isCorrect: false, explanation: "Only methods explicitly decorated with @abstractmethod become abstract." },
            { id: "d", text: "It disables inheritance", isCorrect: false, explanation: "The opposite — ABC is specifically designed to be inherited from." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What is required alongside ABC to actually block instantiation?" }],
          feedback: {
            correct: "Correct! The enforcement only kicks in once you add @abstractmethod decorators.",
            incorrect: "ABC sets up the mechanism, but @abstractmethod is what actually declares the required interface.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "abstract-base-class", recallPrompt: "What is the relationship between ABC and ABCMeta?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-abc-base-fill", "s21-abc-base-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["abstract-base-class"],
      },
    },

    /* ── 21.17 @abstractmethod ──────────────────────────────────────────────── */
    {
      id: "s21-abstractmethod",
      stageId: "stage-21",
      title: "The @abstractmethod Decorator",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Declare abstract methods using @abstractmethod",
        "Implement abstract methods in concrete subclasses",
        "Observe the TypeError that prevents incomplete subclass instantiation",
      ],
      prerequisites: ["s21-abc-base-class"],
      concepts: ["abstract-base-class"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Declaring Required Methods\n\n`@abstractmethod` marks a method as part of the interface contract. Any concrete subclass must override it. If it does not, Python raises `TypeError: Can't instantiate abstract class X with abstract method y`.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> float:\n        \"\"\"Return the area of this shape.\"\"\"\n        ...\n\n    @abstractmethod\n    def perimeter(self) -> float:\n        \"\"\"Return the perimeter of this shape.\"\"\"\n        ...\n\n# Cannot instantiate Shape directly\ntry:\n    s = Shape()  # TypeError!\nexcept TypeError as e:\n    print(e)  # Can't instantiate abstract class Shape with abstract methods area, perimeter",
          caption: "@abstractmethod makes Shape non-instantiable until all abstract methods are implemented.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from abc import ABC, abstractmethod\nimport math\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> float: ...\n\n    @abstractmethod\n    def perimeter(self) -> float: ...\n\nclass Circle(Shape):\n    def __init__(self, radius: float):\n        self.radius = radius\n\n    def area(self) -> float:\n        return math.pi * self.radius ** 2\n\n    def perimeter(self) -> float:\n        return 2 * math.pi * self.radius\n\nc = Circle(5)\nprint(f'Area: {c.area():.2f}')       # Area: 78.54\nprint(f'Perimeter: {c.perimeter():.2f}')  # Perimeter: 31.42",
          caption: "Circle implements both abstract methods, so it can be instantiated.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Abstract Methods Can Have Bodies",
          body: "You can write code inside an abstract method. Subclasses can call it with super(). This is useful for shared logic that every implementation needs but might want to extend.",
        },
        {
          kind: "why-matters",
          body: "@abstractmethod is the enforcement mechanism that makes ABCs useful. Without it, inheriting from ABC is just a documentation convention. With it, Python actively prevents you from creating objects that fail to fulfil the contract.",
        },
      ],
      interactions: [
        {
          id: "s21-abstractmethod-debug",
          kind: "debug-code",
          prompt: "This code raises a TypeError. Find and fix it.",
          beginnerPurpose: "Practice implementing a missing abstract method.",
          expectedConceptIds: ["abstract-base-class"],
          brokenCode:
            "from abc import ABC, abstractmethod\n\nclass Vehicle(ABC):\n    @abstractmethod\n    def fuel_type(self) -> str: ...\n\n    @abstractmethod\n    def max_speed(self) -> int: ...\n\nclass Car(Vehicle):\n    def fuel_type(self) -> str:\n        return 'petrol'\n    # max_speed is not implemented!\n\nc = Car()  # TypeError",
          bugDescription: "Car inherits from Vehicle but only implements fuel_type. max_speed is abstract and unimplemented.",
          fixedCode:
            "from abc import ABC, abstractmethod\n\nclass Vehicle(ABC):\n    @abstractmethod\n    def fuel_type(self) -> str: ...\n\n    @abstractmethod\n    def max_speed(self) -> int: ...\n\nclass Car(Vehicle):\n    def fuel_type(self) -> str:\n        return 'petrol'\n\n    def max_speed(self) -> int:\n        return 200\n\nc = Car()\nprint(c.fuel_type(), c.max_speed())",
          errorType: "TypeError",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Every @abstractmethod in the ABC must be overridden in the concrete subclass." },
            { level: "structural", text: "Add a max_speed method to Car that returns an integer." },
          ],
          feedback: {
            correct: "Fixed! Car now implements both abstract methods and can be instantiated.",
            incorrect: "Count the @abstractmethod decorators in Vehicle and make sure Car implements all of them.",
          },
        },
        {
          id: "s21-abstractmethod-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a complete ABC / concrete subclass hierarchy.",
          expectedConceptIds: ["abstract-base-class"],
          code: "from abc import ABC, abstractmethod\n\nclass Greeter(ABC):\n    @abstractmethod\n    def greet(self) -> str: ...\n\nclass FormalGreeter(Greeter):\n    def greet(self) -> str:\n        return 'Good day, sir.'\n\nclass CasualGreeter(Greeter):\n    def greet(self) -> str:\n        return 'Hey!'\n\nfor g in [FormalGreeter(), CasualGreeter()]:\n    print(g.greet())",
          expectedOutput: "Good day, sir.\nHey!",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Both concrete classes implement greet(), so both can be instantiated and called." }],
          feedback: {
            correct: "Correct! Both concrete classes satisfy the Greeter contract and produce their own output.",
            incorrect: "Each class implements greet() differently. The loop calls greet() on each in turn.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "abstract-base-class", recallPrompt: "What error does Python raise if you try to instantiate a subclass that is missing an abstract method implementation?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-abstractmethod-debug", "s21-abstractmethod-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["abstract-base-class"],
      },
    },

    /* ── 21.18 Interfaces by convention ─────────────────────────────────────── */
    {
      id: "s21-interfaces-convention",
      stageId: "stage-21",
      title: "Interfaces by Convention",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand Python's informal protocol / interface pattern",
        "Recognise common stdlib protocols (Iterable, Sized, etc.)",
        "Know when to use ABC vs Protocol (typing.Protocol)",
      ],
      prerequisites: ["s21-abstractmethod"],
      concepts: ["abstract-base-class"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Informal Protocols\n\nPython's duck-typing philosophy also supports **informal protocols**: an agreement that any object with a certain set of methods can be treated as implementing that interface, without inheriting from any base class. The classic example is the iterator protocol: any object with `__iter__` and `__next__` is an iterator.",
        },
        {
          kind: "text",
          markdown:
            "## typing.Protocol — Structural Subtyping\n\nPython 3.8 added `typing.Protocol` as a lightweight way to describe interfaces that work with type checkers (like mypy) without requiring inheritance. Unlike ABCs, `Protocol` checks structural compatibility — if an object has the right methods, it satisfies the Protocol, whether or not it inherits from it.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> None: ...\n\n# Any class with a draw() method satisfies Drawable\nclass Circle:\n    def draw(self) -> None:\n        print('Drawing circle')\n\nclass Square:\n    def draw(self) -> None:\n        print('Drawing square')\n\ndef render(item: Drawable) -> None:\n    item.draw()\n\n# Both work — no inheritance needed\nrender(Circle())\nrender(Square())",
          caption: "Protocol-based typing: the type checker verifies structure, not ancestry.",
        },
        {
          kind: "comparison",
          leftLabel: "ABC (nominal)",
          rightLabel: "Protocol (structural)",
          leftCode:
            "# Must inherit to satisfy\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> float: ...\n\nclass Circle(Shape):  # explicit\n    def area(self) -> float: ...",
          rightCode:
            "# No inheritance needed\nclass HasArea(Protocol):\n    def area(self) -> float: ...\n\nclass Circle:  # no inheritance\n    def area(self) -> float: ...",
          caption: "ABC requires explicit inheritance. Protocol infers compatibility from structure.",
        },
        {
          kind: "why-matters",
          body: "Understanding both ABCs and Protocols lets you choose the right tool. Use ABCs when you control the hierarchy and want runtime enforcement. Use Protocol when you want type-checker support without coupling consumers to a base class — the preferred approach for library boundaries.",
        },
      ],
      interactions: [
        {
          id: "s21-convention-mc",
          kind: "multiple-choice",
          prompt: "What is the key difference between ABC and typing.Protocol?",
          beginnerPurpose: "Distinguish nominal (ABC) from structural (Protocol) subtyping.",
          expectedConceptIds: ["abstract-base-class"],
          options: [
            { id: "a", text: "ABC requires explicit inheritance; Protocol checks if the right methods exist regardless of ancestry", isCorrect: true, explanation: "ABC is nominal subtyping (you must inherit). Protocol is structural subtyping (you only need the methods)." },
            { id: "b", text: "Protocol provides runtime enforcement; ABC only helps type checkers", isCorrect: false, explanation: "It is the opposite: ABC enforces at runtime; Protocol is mainly for static type checkers." },
            { id: "c", text: "They are interchangeable and do the same thing", isCorrect: false, explanation: "They have different runtime behaviour and different use cases." },
            { id: "d", text: "ABC is only for built-in types; Protocol is for user-defined classes", isCorrect: false, explanation: "Both can be used with any class." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what is checked at runtime vs at type-check time, and what is required from the implementer." }],
          feedback: {
            correct: "Correct! ABC is nominal (inheritance required, runtime enforced); Protocol is structural (methods required, type-checker verified).",
            incorrect: "The key distinction is runtime enforcement (ABC) vs structural type-checking (Protocol).",
          },
        },
        {
          id: "s21-convention-run",
          kind: "run-code",
          prompt: "Write a small ABC called `Logger` with one abstract method `log(message: str)`. Then write a concrete subclass `PrintLogger` that prints the message. Instantiate it and call log.",
          beginnerPurpose: "Write a complete ABC + concrete subclass from scratch.",
          expectedConceptIds: ["abstract-base-class"],
          starterCode:
            "from abc import ABC, abstractmethod\n\n# Define Logger ABC here\n\n# Define PrintLogger here\n\n# Test\nlogger = PrintLogger()\nlogger.log('Hello, ABC!')",
          task: "Define Logger(ABC) with @abstractmethod log(), and PrintLogger that implements it.",
          expectedOutputContains: ["Hello, ABC!"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "Use @abstractmethod to mark log() in Logger." },
            { level: "syntax", text: "class PrintLogger(Logger):\n    def log(self, message: str):\n        print(message)" },
          ],
          feedback: {
            correct: "Well done! You wrote a complete ABC with a concrete implementation.",
            incorrect: "Make sure Logger inherits from ABC, has @abstractmethod on log(), and PrintLogger implements log() by printing the message.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "abstract-base-class", recallPrompt: "When would you choose Protocol over ABC for defining an interface?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s21-convention-mc", "s21-convention-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["abstract-base-class"],
      },
    },
  ],

  project: {
    id: "s21-model-design-project",
    stageId: "stage-21",
    title: "Model Design Project",
    brief:
      "Design a domain model for a task-management application using dataclasses for data structures, Enum for status and priority, and ABCs for pluggable task handlers.",
    requirements: [
      "Define a TaskStatus Enum with at least PENDING, IN_PROGRESS, and DONE members",
      "Define a Priority Enum with LOW, MEDIUM, HIGH using auto()",
      "Create a Task dataclass with id (int), title (str), status (TaskStatus), priority (Priority), tags (list), and created_at using default_factory",
      "Validate in __post_init__ that title is not empty",
      "Create a TaskHandler ABC with abstract methods handle(task: Task) and can_handle(task: Task) -> bool",
      "Implement at least two concrete TaskHandler subclasses",
      "Write a dispatch function that takes a list of handlers and a task, and calls the first handler that can_handle it",
    ],
    acceptanceCriteria: [
      "TaskStatus and Priority are proper Enum subclasses",
      "Task is a @dataclass with typed fields and __post_init__ validation",
      "Attempting to create a Task with empty title raises ValueError",
      "TaskHandler is an ABC with @abstractmethod on both required methods",
      "Concrete handlers cannot be instantiated without implementing both methods",
      "dispatch() correctly routes tasks to the right handler",
    ],
    conceptIds: ["dataclass", "enum", "abstract-base-class"],
    difficulty: "intermediate",
    starterCode:
      "from dataclasses import dataclass, field\nfrom enum import Enum, auto\nfrom abc import ABC, abstractmethod\nfrom datetime import datetime\nfrom typing import Optional\n\n# 1. Define TaskStatus Enum\n\n# 2. Define Priority Enum with auto()\n\n# 3. Define Task dataclass\n\n# 4. Define TaskHandler ABC\n\n# 5. Implement concrete handlers\n\n# 6. Implement dispatch function\ndef dispatch(handlers: list, task) -> Optional[str]:\n    pass\n",
  },
} satisfies Stage;
