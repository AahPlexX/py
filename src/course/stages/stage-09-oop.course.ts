import type { Stage } from "@/course/course.schema";

export const stage09 = {
  id: "stage-09",
  number: 9,
  title: "Tuples, Sequences, and Unpacking",
  summary:
    "Master immutable sequences, unpacking syntax, multiple assignment, and named tuples — the building blocks of structured, lightweight data in Python.",
  level: "intermediate",
  masteryGateConceptIds: ["tuple-immutability", "tuple-unpacking", "sequence-protocol"],
  lessons: [
    /* ── Lesson 9.1 — Creating and Using Tuples ────────────────────────── */
    {
      id: "s9-tuple-creation",
      stageId: "stage-09",
      title: "Creating and Using Tuples",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Create tuples using parentheses and the comma operator",
        "Access tuple elements by index, slice, and membership test",
        "Understand that commas — not parentheses — create tuples",
      ],
      prerequisites: [],
      concepts: ["tuple-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Why Tuples Exist\n\nImagine storing a geographic coordinate — latitude and longitude together. They always belong as a pair: you never pass one without the other, and order matters. Python's **tuple** is built exactly for this: an ordered, fixed-length sequence of values that signals \"these belong together and should not change.\"\n\n## Creating Tuples\n\nA tuple is formed by commas. Parentheses are optional (except for the empty tuple):\n\n```python\n# Commas create the tuple\npoint        = (40.7128, -74.0060)   # with parentheses\nrgb          = 255, 128, 0           # without — still a tuple\ncountry_code = (\"US\", 1)\n\nprint(type(point))        # <class 'tuple'>\nprint(point[0])           # 40.7128\nprint(rgb)                # (255, 128, 0)\n```\n\n## Reading from a Tuple\n\nTuples support all read operations lists do — indexing, slicing, `len()`, `in`, and iteration:\n\n```python\nseasons = (\"spring\", \"summer\", \"autumn\", \"winter\")\n\nprint(len(seasons))         # 4\nprint(seasons[1])           # summer\nprint(seasons[-1])          # winter\nprint(seasons[1:3])         # ('summer', 'autumn')\nprint(\"spring\" in seasons)  # True\n\nfor s in seasons:\n    print(s)\n```\n\n## What Tuples Cannot Do\n\nYou cannot add, remove, or replace elements after creation:\n\n```python\npoint = (3, 7)\n# point[0] = 99   # TypeError: 'tuple' object does not support item assignment\n# point.append(5) # AttributeError: 'tuple' object has no attribute 'append'\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "The comma is the tuple operator",
          body: "Writing `x = (42)` gives you the integer 42 — parentheses just group the expression. Writing `x = (42,)` gives you a one-element tuple. The trailing comma is what matters.",
        },
        {
          kind: "mental-model",
          title: "A tuple is a sealed envelope",
          analogy: "Once you seal an envelope (create the tuple), you can read the contents through a window (index access), but you cannot change what is inside. If you need different contents, you make a new envelope.",
          explanation: "This seal is what makes tuples reliable: code that receives a tuple knows the data will not change unexpectedly. It also enables tuples to be used as dictionary keys — something lists, which can change, can never do.",
        },
        {
          kind: "why-matters",
          body: "Tuples signal intent: 'these values belong together and will not change.' Functions returning multiple values use tuples automatically. Dictionary keys can be tuples but not lists. Understanding tuples unlocks a huge portion of idiomatic Python.",
        },
      ],
      interactions: [
        {
          id: "s9-tuple-creation-predict",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Confirm that commas create a tuple even without parentheses",
          expectedConceptIds: ["tuple-basics"],
          code: "data = 10, 20, 30\nprint(type(data).__name__, data[1])",
          expectedOutput: "tuple 20",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "The comma operator creates a tuple even without parentheses. Indexing works identically to lists." }],
          feedback: { correct: "Correct! Commas make the tuple; data[1] is the element at index 1.", incorrect: "data = 10, 20, 30 uses commas — that creates a tuple. data[1] is 20 (0-based index)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-tuple-creation-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.2 — The Single-Element Tuple Gotcha ──────────────────── */
    {
      id: "s9-singleton-tuple",
      stageId: "stage-09",
      title: "The Single-Element Tuple Gotcha",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write a one-element tuple using the trailing comma",
        "Distinguish a grouped expression from a singleton tuple",
        "Avoid the common mistake of omitting the trailing comma",
      ],
      prerequisites: [],
      concepts: ["tuple-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Trap\n\nEvery new Python programmer runs into this: you write `x = (42)` expecting a tuple, but Python gives you an integer. Parentheses serve two purposes — grouping expressions and visually delimiting tuples — but only **commas create tuples**.\n\n```python\n# NOT a tuple — just a grouped integer\na = (42)\nprint(type(a))   # <class 'int'>\n\n# IS a tuple — trailing comma is the signal\nb = (42,)\nprint(type(b))   # <class 'tuple'>\nprint(b[0])      # 42\n\n# Also valid without parentheses\nc = 42,\nprint(type(c))   # <class 'tuple'>\n```\n\n## Why This Matters in Practice\n\nWhen a function should return a single-item tuple, omitting the comma returns the raw value instead:\n\n```python\ndef wrap_value(v):\n    return (v,)   # correct — one-element tuple\n\ndef wrap_wrong(v):\n    return (v)    # wrong — just returns v\n\nresult = wrap_value(\"hello\")\nprint(result)           # ('hello',)\nprint(len(result))      # 1\nprint(result[0])        # hello\n```\n\nCalling `wrap_wrong(\"hello\")` returns the string `\"hello\"`, not a tuple — `len()` would give 5 (characters) instead of 1.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Trailing comma is mandatory for singleton tuples",
          body: "For two or more elements, the last comma is optional. For a one-element tuple, the trailing comma is the only thing that distinguishes it from a grouped expression.",
        },
      ],
      interactions: [
        {
          id: "s9-singleton-mc",
          kind: "multiple-choice",
          prompt: "Which of the following creates a one-element tuple containing the string 'ok'?",
          beginnerPurpose: "Identify the trailing-comma syntax for singleton tuples",
          expectedConceptIds: ["tuple-basics"],
          options: [
            { id: "a", text: `("ok",)`, isCorrect: true, explanation: "Correct! The trailing comma inside parentheses signals a one-element tuple." },
            { id: "b", text: `("ok")`, isCorrect: false, explanation: "This is just a grouped string — no comma, no tuple. type() gives str, not tuple." },
            { id: "c", text: `tuple("ok")`, isCorrect: false, explanation: "tuple(\"ok\") iterates the string and creates ('o', 'k') — a tuple of individual characters." },
            { id: "d", text: `["ok"]`, isCorrect: false, explanation: "Square brackets create a list, not a tuple." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Look for the trailing comma after 'ok'. Without it, parentheses are just grouping, not a tuple." }],
          feedback: { correct: "Correct! Only (\"ok\",) has the trailing comma that signals a one-element tuple.", incorrect: "Only (\"ok\",) is a tuple. (\"ok\") is a string; tuple(\"ok\") splits into characters; [\"ok\"] is a list." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-singleton-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.3 — Tuple Immutability ───────────────────────────────── */
    {
      id: "s9-tuple-immutability",
      stageId: "stage-09",
      title: "Tuple Immutability",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain why assigning to a tuple element raises TypeError",
        "Distinguish a tuple's immutability from the mutability of objects it contains",
        "Convert between tuples and lists when mutation is needed",
      ],
      prerequisites: [],
      concepts: ["tuple-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Immutability Means No In-Place Changes\n\nOnce created, a tuple's elements cannot be added, removed, or replaced. Any attempt raises `TypeError` immediately:\n\n```python\npoint = (3, 7)\n\n# These all raise TypeError:\n# point[0] = 99          # can't assign to index\n# point.append(5)        # AttributeError — no append method\n# del point[0]           # can't delete element\n\n# To get a modified version, create a new tuple:\nmoved = (point[0] + 1, point[1] + 1)\nprint(moved)   # (4, 8)\n```\n\n## The Subtle Trap: Mutable Objects Inside\n\nImmutability applies to the tuple's *references*, not to the objects those references point to. If a tuple contains a list, you can mutate the list:\n\n```python\ndata = ([1, 2], [3, 4])\n\n# Can mutate the list INSIDE the tuple\ndata[0].append(99)\nprint(data)   # ([1, 2, 99], [3, 4])\n\n# Cannot replace the reference inside the tuple\n# data[0] = [10, 20]   # TypeError\n```\n\n## Converting for Temporary Mutation\n\nWhen you need to sort or otherwise change a tuple's contents, convert to a list, modify, then convert back:\n\n```python\noriginal    = (5, 3, 1, 4, 2)\nas_list     = list(original)\nas_list.sort()\nsorted_tuple = tuple(as_list)\nprint(sorted_tuple)   # (1, 2, 3, 4, 5)\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Immutability applies to references, not contained objects",
          body: "A tuple holding a list locks the reference to that list — you cannot replace it. But the list itself remains mutable; you can still call append, remove, etc., on it.",
        },
        {
          kind: "why-matters",
          body: "Immutability is a safety guarantee. A tuple passed to a function cannot be accidentally modified by the callee. It also enables tuples to be used as dictionary keys and set members — something lists can never do because they are mutable (and therefore unhashable).",
        },
      ],
      interactions: [
        {
          id: "s9-immutability-debug",
          kind: "debug-code",
          prompt: "This code tries to update a coordinate stored as a tuple. Fix it so it prints (10, 7) without changing the variable's type to a list.",
          beginnerPurpose: "Recognize that changing a tuple requires creating a new one",
          expectedConceptIds: ["tuple-immutability"],
          brokenCode: "pos = (3, 7)\npos[0] = 10\nprint(pos)",
          bugDescription: "Tuples are immutable — assigning to an index raises TypeError. You must create a new tuple and rebind the name.",
          fixedCode: "pos = (3, 7)\npos = (10, pos[1])\nprint(pos)",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "You cannot change pos[0] in place. Instead, create a brand-new tuple: pos = (10, pos[1])." }],
          feedback: { correct: "Correct! pos = (10, pos[1]) creates a new tuple and rebinds the name.", incorrect: "Tuples cannot be mutated in place. Use pos = (10, pos[1]) to create and bind a new tuple." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-immutability-debug"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.4 — Indexing and Slicing Tuples ──────────────────────── */
    {
      id: "s9-tuple-indexing",
      stageId: "stage-09",
      title: "Indexing and Slicing Tuples",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Access tuple elements by positive and negative index",
        "Slice a tuple to produce a new tuple",
        "Use index() and count() on tuples",
      ],
      prerequisites: [],
      concepts: ["tuple-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Same Interface as Lists — Read Side Only\n\nTuples and lists share the same indexing and slicing syntax. Everything you know about list indexing applies directly to tuples. The only difference: slicing a tuple returns a **new tuple** (not a list), and you cannot assign to an index.\n\n```python\nrgb = (255, 128, 0)\n\nprint(rgb[0])     # 255  — first element\nprint(rgb[-1])    # 0    — last element\nprint(rgb[1:])    # (128, 0)    — slice returns a tuple\nprint(rgb[::-1])  # (0, 128, 255) — reversed\n```\n\n## Searching in a Tuple\n\nTuples have the same two search methods as lists:\n\n```python\ngrades = (90, 85, 90, 78, 90)\n\nprint(grades.count(90))   # 3  — how many 90s?\nprint(grades.index(78))   # 3  — position of first 78\n```\n\n## Practical Example — Months\n\n```python\nmonths = (\"Jan\",\"Feb\",\"Mar\",\"Apr\",\"May\",\"Jun\",\n          \"Jul\",\"Aug\",\"Sep\",\"Oct\",\"Nov\",\"Dec\")\n\nq1 = months[:3]    # ('Jan', 'Feb', 'Mar')\nq4 = months[-3:]   # ('Oct', 'Nov', 'Dec')\nprint(q1, q4)\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Slicing preserves the container type",
          body: "Slicing a tuple gives a tuple. Slicing a list gives a list. Slicing a string gives a string. The type is always preserved.",
        },
      ],
      interactions: [
        {
          id: "s9-tuple-indexing-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply negative indexing and slicing to a tuple",
          expectedConceptIds: ["tuple-basics"],
          code: "t = (10, 20, 30, 40, 50)\nprint(t[-2], t[1:4])",
          expectedOutput: "40 (20, 30, 40)",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "t[-2] counts from the right: t[-1]=50, t[-2]=40. t[1:4] takes indices 1, 2, 3 and returns a tuple." }],
          feedback: { correct: "Correct! t[-2]=40, t[1:4]=(20,30,40).", incorrect: "t[-2] is the second-to-last element: 40. t[1:4] slices indices 1, 2, 3 returning a tuple." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-tuple-indexing-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.5 — Unpacking a Tuple into Variables ─────────────────── */
    {
      id: "s9-tuple-unpacking",
      stageId: "stage-09",
      title: "Unpacking a Tuple into Variables",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Unpack a tuple into named variables in a single assignment",
        "Understand that variable count must match tuple length",
        "Apply unpacking inside a for loop over a list of tuples",
      ],
      prerequisites: [],
      concepts: ["tuple-unpacking"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem with Index Access\n\nAccessing tuple elements by index produces cryptic code:\n\n```python\npoint = (40.7128, -74.0060)\nlat = point[0]   # what does 0 mean?\nlng = point[1]   # and 1?\n```\n\n## Unpacking: One Line, Named Variables\n\n**Tuple unpacking** assigns every element to its own variable simultaneously:\n\n```python\nlat, lng = point\nprint(lat)   # 40.7128\nprint(lng)   # -74.006\n```\n\nPython evaluates the right side first (into a tuple), then distributes each element to the corresponding variable on the left. The count must match exactly:\n\n```python\n# Raises ValueError — too many values to unpack:\n# a, b = (1, 2, 3)\n\n# Raises ValueError — not enough values:\n# x, y, z = (1, 2)\n\n# Exact match works:\nx, y, z = (1, 2, 3)\nprint(x, y, z)   # 1 2 3\n```\n\n## Unpacking in for Loops\n\nThe most common use of unpacking: iterating a list of tuples and naming each field:\n\n```python\ncities = [\n    (\"Paris\",    2161000),\n    (\"Tokyo\",   13960000),\n    (\"Sydney\",   5312000),\n]\n\nfor name, population in cities:\n    print(f\"{name}: {population:,}\")\n# Paris: 2,161,000\n# Tokyo: 13,960,000\n# Sydney: 5,312,000\n```\n\nWithout unpacking, you would write `city[0]` and `city[1]` — far less clear.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Unpacking works on any iterable",
          body: "You can unpack lists, strings, ranges, and any other iterable the same way — not just tuples. The syntax requires any iterable whose length matches the variable count.",
        },
        {
          kind: "mental-model",
          title: "Unpacking is parallel assignment",
          analogy: "Think of `a, b, c = (1, 2, 3)` as three assignments happening at the same instant. Python 'freezes' all right-side values before changing any left-side variable.",
          explanation: "This simultaneous evaluation is why variable swapping works without a temporary: `a, b = b, a` captures both old values before assigning either new one.",
        },
      ],
      interactions: [
        {
          id: "s9-unpacking-fill",
          kind: "fill-code",
          prompt: "Fill in the blank so that `name`, `age`, and `score` each receive their corresponding value from `record`.",
          beginnerPurpose: "Practice writing the tuple unpacking syntax",
          expectedConceptIds: ["tuple-unpacking"],
          codeTemplate: "record = (\"Alice\", 30, 95.5)\n____ = record\nprint(name, age, score)",
          blanks: [{ placeholder: "____", answer: "name, age, score", caseSensitive: false }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Write the three variable names separated by commas on the left side of the = sign." }],
          feedback: { correct: "Correct! name, age, score = record unpacks all three elements in left-to-right order.", incorrect: "Write the three variable names separated by commas: name, age, score = record." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-unpacking-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.6 — Multiple Assignment and Variable Swap ────────────── */
    {
      id: "s9-multiple-assignment",
      stageId: "stage-09",
      title: "Multiple Assignment and Variable Swap",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Assign multiple variables in one line using tuple syntax",
        "Swap two variables without a temporary variable",
        "Explain why Python's swap idiom evaluates correctly",
      ],
      prerequisites: [],
      concepts: ["tuple-unpacking"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Multiple Assignment in One Line\n\nYou can write values directly on the right side of a multi-variable assignment — Python packs them into a temporary tuple and unpacks immediately:\n\n```python\n# Assign three variables at once\nx, y, z = 1, 2, 3\nprint(x, y, z)   # 1 2 3\n\n# Re-assign in one step\nx, y = 10, 20\nprint(x, y)      # 10 20\n```\n\n## The Variable Swap Idiom\n\nIn many languages you need a temporary variable to swap two values:\n\n```python\n# Java / C style:\ntemp = a\na    = b\nb    = temp\n```\n\nPython's simultaneous evaluation makes this unnecessary:\n\n```python\na = \"hello\"\nb = \"world\"\n\n# Swap without a temp\na, b = b, a\n\nprint(a)   # world\nprint(b)   # hello\n```\n\nPython evaluates the entire right side (`b, a`) before any assignment, capturing old values of both. Then it assigns simultaneously: `a` gets old `b`, `b` gets old `a`.\n\n## Real-World Use: Sorting\n\n```python\ndef one_pass(items):\n    for i in range(len(items) - 1):\n        if items[i] > items[i + 1]:\n            items[i], items[i + 1] = items[i + 1], items[i]\n\ndata = [3, 1, 4, 1, 5]\none_pass(data)\nprint(data)   # [1, 3, 1, 4, 5]\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "This idiom is idiomatic Python",
          body: "You will see `a, b = b, a` constantly in production code: sorting algorithms, coordinate rotations, and anywhere two variables need to exchange values.",
        },
      ],
      interactions: [
        {
          id: "s9-swap-predict",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Trace simultaneous right-side evaluation through a swap assignment",
          expectedConceptIds: ["tuple-unpacking"],
          code: "x, y = 5, 10\nx, y = y, x + y\nprint(x, y)",
          expectedOutput: "10 15",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "The right side (y, x + y) is evaluated first using the OLD values: y=10, x+y=5+10=15. Then x gets 10, y gets 15." }],
          feedback: { correct: "Correct! Right side evaluated with old values first: y=10, x+y=15. Then x=10, y=15.", incorrect: "Python captures both right-side values before assigning. Old y=10, old x+y=5+10=15. Then x=10, y=15." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-swap-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.7 — Extended Unpacking with * ────────────────────────── */
    {
      id: "s9-extended-unpacking",
      stageId: "stage-09",
      title: "Extended Unpacking with *",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use the starred expression *rest to capture remaining elements",
        "Position the star variable at beginning, middle, or end",
        "Understand that the starred variable always collects a list",
      ],
      prerequisites: [],
      concepts: ["tuple-unpacking"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem with Fixed-Count Unpacking\n\nRegular unpacking requires an exact count match. But what if you want the first element, the last, and everything in between as a group? **Extended unpacking** uses `*` to collect any number of remaining elements.\n\n```python\n# Star at the end — captures the tail\nfirst, *rest = (1, 2, 3, 4, 5)\nprint(first)   # 1\nprint(rest)    # [2, 3, 4, 5]  ← always a list\n\n# Star at the beginning — captures everything but the last\n*body, last = (1, 2, 3, 4, 5)\nprint(body)    # [1, 2, 3, 4]\nprint(last)    # 5\n\n# Star in the middle — captures the middle section\nhead, *middle, tail = (1, 2, 3, 4, 5)\nprint(head)    # 1\nprint(middle)  # [2, 3, 4]\nprint(tail)    # 5\n```\n\n## Practical: Parsing Structured Data\n\nExtended unpacking shines when the first/last fields are special and the middle is variable-length:\n\n```python\n# CSV row: name, *scores, final_grade\nrow = (\"Alice\", 88, 92, 79, 95, \"A\")\nname, *scores, grade = row\n\nprint(name)                           # Alice\nprint(scores)                         # [88, 92, 79, 95]\nprint(grade)                          # A\nprint(sum(scores) / len(scores))      # 88.5\n```\n\n## Ignoring the Middle\n\n```python\n# _ by convention means 'I don't need this'\nfirst, *_, last = range(100)\nprint(first, last)   # 0 99\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Only one starred variable per assignment",
          body: "You cannot write `*a, *b = (1, 2, 3)` — Python would not know how to divide elements between two greedy collectors. Only one `*` per unpacking statement is allowed.",
        },
        {
          kind: "mental-model",
          title: "The star is a greedy vacuum",
          analogy: "Named variables claim their exact one element first (left-to-right from each end). Then *rest vacuums up whatever remains.",
          explanation: "The starred variable always gets a list — even an empty one if nothing remains after named variables claim their elements. This consistency is why extended unpacking is safe to use even when the sequence length is unknown.",
        },
      ],
      interactions: [
        {
          id: "s9-extended-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace extended unpacking with the star in the middle",
          expectedConceptIds: ["tuple-unpacking"],
          code: "data = (10, 20, 30, 40, 50)\na, *b, c = data\nprint(a, b, c)",
          expectedOutput: "10 [20, 30, 40] 50",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`a` claims 10 (first), `c` claims 50 (last), `*b` vacuums up everything in between as a list." }],
          feedback: { correct: "Correct! a=10, c=50, *b gets the middle three as a list.", incorrect: "a claims the first element (10), c claims the last (50), *b collects everything between into a list." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-extended-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.8 — Nested Unpacking ─────────────────────────────────── */
    {
      id: "s9-nested-unpacking",
      stageId: "stage-09",
      title: "Nested Unpacking",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Unpack nested tuples in a single assignment statement",
        "Apply nested unpacking inside for loops",
        "Judge when nested unpacking aids versus hurts readability",
      ],
      prerequisites: [],
      concepts: ["tuple-unpacking"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Mirroring Structure on Both Sides\n\nWhen a tuple contains other tuples, you can mirror the nesting on the left side of an assignment to unpack all levels simultaneously:\n\n```python\n# A tuple containing a tuple\npoint_3d = ((1, 2), 3)\n\n# Nested unpacking\n(x, y), z = point_3d\nprint(x, y, z)   # 1 2 3\n```\n\n## In for Loops\n\nNested unpacking in loops is common when iterating geometry, connections, or coordinate pairs:\n\n```python\nsegments = [((0, 0), (3, 4)), ((1, 1), (5, 5))]\n\nfor (x1, y1), (x2, y2) in segments:\n    length = ((x2 - x1)**2 + (y2 - y1)**2) ** 0.5\n    print(f\"({x1},{y1}) to ({x2},{y2})  length={length:.2f}\")\n# (0,0) to (3,4)  length=5.00\n# (1,1) to (5,5)  length=5.66\n```\n\n## Practical Config Parsing\n\n```python\nconfig = ((\"localhost\", 5432), \"mydb\")\n(host, port), db = config\nprint(f\"Connect to {db} at {host}:{port}\")\n# Connect to mydb at localhost:5432\n```\n\n## When to Stop Nesting\n\nOne or two levels of nested unpacking: expressive and clear. Three or more: consider index access instead — deeply nested patterns become hard to read.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "The left-side pattern must match exactly",
          body: "If the inner tuple has 3 elements but you wrote `(a, b)`, Python raises `ValueError: too many values to unpack`. The nesting structure on the left must mirror the right exactly.",
        },
      ],
      interactions: [
        {
          id: "s9-nested-fill",
          kind: "fill-code",
          prompt: "Fill in the blank so that `city`, `lat`, and `lng` receive the correct values from the nested tuple `record`.",
          beginnerPurpose: "Write nested unpacking syntax that mirrors the nested data structure",
          expectedConceptIds: ["tuple-unpacking"],
          codeTemplate: "record = (\"Tokyo\", (35.6895, 139.6917))\n____, (lat, lng) = record\nprint(city, lat, lng)",
          blanks: [{ placeholder: "____", answer: "city", caseSensitive: false }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The first element of the outer tuple is a string — it goes into a plain variable. The second element is an inner tuple — it gets unpacked with (lat, lng)." }],
          feedback: { correct: "Correct! `city` gets 'Tokyo'; `(lat, lng)` destructures the coordinate pair.", incorrect: "The outer level unpacks into `city` (a string) and `(lat, lng)` (the inner tuple). Write `city` in the blank." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-nested-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.9 — Returning Multiple Values from Functions ──────────── */
    {
      id: "s9-returning-tuples",
      stageId: "stage-09",
      title: "Returning Multiple Values from Functions",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Return multiple values using implicit tuple packing",
        "Unpack the return value at the call site",
        "Recognize multi-return patterns in the standard library",
      ],
      prerequisites: [],
      concepts: ["tuple-unpacking"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Functions Can Only Return One Object — But It Can Be a Tuple\n\nWhen you write `return a, b, c`, Python packs those into a tuple `(a, b, c)` automatically. The caller unpacks it:\n\n```python\ndef minmax(numbers):\n    return min(numbers), max(numbers)\n\ndata = [4, 1, 7, 2, 9, 3]\nlow, high = minmax(data)\nprint(f\"min={low}, max={high}\")   # min=1, max=9\n```\n\n## Receiving the Whole Tuple\n\nThe caller can also hold the return value as one variable:\n\n```python\nresult = minmax(data)      # whole tuple\nprint(result)              # (1, 9)\nprint(result[0])           # 1\n```\n\n## Real Example: Parsing a Date\n\n```python\ndef parse_date(date_str):\n    \"\"\"'2024-03-15' -> (year, month, day) as ints.\"\"\"\n    parts = date_str.split(\"-\")\n    return int(parts[0]), int(parts[1]), int(parts[2])\n\nyear, month, day = parse_date(\"2024-03-15\")\nprint(f\"{day}/{month}/{year}\")   # 15/3/2024\n```\n\n## Standard Library Uses This Constantly\n\n- `divmod(17, 5)` returns `(3, 2)` — quotient and remainder\n- `enumerate(items)` yields `(index, value)` pairs\n- `dict.items()` yields `(key, value)` pairs\n- `os.path.splitext('file.txt')` returns `('file', '.txt')`",
        },
        {
          kind: "callout",
          variant: "info",
          title: "When to use other structures",
          body: "Tuples are ideal for 2–4 closely related return values with obvious order. When you have many fields or unclear positions, prefer a named tuple (covered in Lesson 9.13) or a dataclass.",
        },
        {
          kind: "why-matters",
          body: "Multi-value returns via tuples are one of Python's most used patterns. Recognizing `quotient, remainder = divmod(17, 5)` and `index, value = enumerate(items)` is essential for reading real Python code.",
        },
      ],
      interactions: [
        {
          id: "s9-returning-predict",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Trace multi-value return and unpacking at the call site",
          expectedConceptIds: ["tuple-unpacking"],
          code: "def stats(nums):\n    return sum(nums), len(nums)\n\ntotal, count = stats([10, 20, 30])\nprint(total / count)",
          expectedOutput: "20.0",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "stats returns (60, 3). Unpacking: total=60, count=3. 60/3=20.0 (float division)." }],
          feedback: { correct: "Correct! sum=60, len=3, 60/3=20.0.", incorrect: "stats returns a two-element tuple (60, 3). total=60, count=3. 60 / 3 is 20.0 in Python 3." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-returning-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.10 — When to Choose a Tuple over a List ──────────────── */
    {
      id: "s9-tuple-vs-list",
      stageId: "stage-09",
      title: "When to Choose a Tuple over a List",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "List the semantic and technical reasons to prefer a tuple over a list",
        "Use tuples as dictionary keys",
        "Recognize tuple idioms in real Python code",
      ],
      prerequisites: [],
      concepts: ["tuple-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Semantic Difference\n\nLists and tuples both store ordered sequences. The choice communicates intent:\n\n- **Tuple**: a fixed record where each position has a specific meaning — `(latitude, longitude)`, `(name, age, salary)`. Signals 'do not change this'.\n- **List**: a homogeneous, variable-length collection that can grow and shrink — `[\"apple\", \"bread\", \"milk\"]`. Signals 'this can change'.\n\n## Technical Difference: Dictionary Keys\n\nBecause tuples are immutable, Python can hash them. Lists are mutable — Python cannot hash them. This means:\n\n```python\n# Tuple as dict key — valid\noffices = {\n    (40.7128, -74.0060): \"New York\",\n    (51.5074, -0.1278):  \"London\",\n}\nprint(offices[(51.5074, -0.1278)])   # London\n\n# List as dict key — raises TypeError\n# {[1, 2]: \"value\"}  # TypeError: unhashable type: 'list'\n```\n\n## Code Examples\n\n```python\n# Good use of tuples: fixed records\nemployee  = (\"Alice\", \"Engineering\", 95000)\ncolor_rgb = (255, 128, 0)\n\n# Good use of lists: collections that change\nshopping_cart = [\"apple\", \"bread\"]\nshopping_cart.append(\"milk\")\n```",
        },
        {
          kind: "comparison",
          leftLabel: "Tuple",
          rightLabel: "List",
          leftCode: "# Fixed structure — positions have meaning\npoint = (40.7128, -74.0060)\n# Immutable: can be a dict key\n# Signals: 'do not change'\n# Heterogeneous types normal",
          rightCode: "# Variable-length collection\npoints = [(40.7, -74.0), (51.5, -0.1)]\npoints.append((35.7, 139.7))  # grows\n# Mutable: cannot be a dict key\n# Signals: 'can grow and change'",
        },
      ],
      interactions: [
        {
          id: "s9-vs-list-mc",
          kind: "multiple-choice",
          prompt: "Which of the following would raise a TypeError in Python?",
          beginnerPurpose: "Understand why lists cannot be dictionary keys but tuples can",
          expectedConceptIds: ["tuple-immutability"],
          options: [
            { id: "a", text: `{(1, 2): "point"}`, isCorrect: false, explanation: "Tuples are hashable and can be dict keys. This is perfectly valid." },
            { id: "b", text: `{[1, 2]: "point"}`, isCorrect: true, explanation: "Correct! Lists are mutable and unhashable — Python raises TypeError: unhashable type: 'list'." },
            { id: "c", text: `t = (1, 2); t[0]`, isCorrect: false, explanation: "Reading t[0] is always valid. No mutation is involved." },
            { id: "d", text: `len((1, 2, 3))`, isCorrect: false, explanation: "len() works on any sequence including tuples. Returns 3." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Dictionary keys must be hashable. Lists are mutable, so Python cannot compute a stable hash for them." }],
          feedback: { correct: "Correct! Lists are unhashable and raise TypeError when used as dict keys.", incorrect: "Lists cannot be dict keys because they are mutable and therefore unhashable. Only immutable, hashable objects can be keys." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-vs-list-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.11 — Sequence Comparison and Ordering ────────────────── */
    {
      id: "s9-sequence-comparison",
      stageId: "stage-09",
      title: "Sequence Comparison and Ordering",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Compare tuples with == and < using lexicographic rules",
        "Explain element-by-element comparison and prefix behaviour",
        "Use tuples as sort keys for multi-field sorting",
      ],
      prerequisites: [],
      concepts: ["sequence-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Lexicographic Comparison\n\nPython compares sequences element by element from left to right. The comparison returns as soon as a difference is found:\n\n```python\nprint((1, 2, 3) == (1, 2, 3))   # True  — all elements equal\nprint((1, 2, 3) == (1, 2, 4))   # False — differ at index 2\n\n# Ordering:\nprint((1, 2, 3) < (1, 2, 4))    # True  — 3 < 4 at index 2\nprint((1, 3)    < (1, 2, 99))   # False — 3 > 2 at index 1\n\n# Prefix rule: shorter is smaller when all compared elements match\nprint((1,)      < (1, 0))       # True  — (1,) runs out first\n```\n\n## Multi-Field Sorting with Tuple Keys\n\nBecause Python compares tuples element-by-element, a tuple makes an ideal composite sort key:\n\n```python\nemployees = [\n    (\"Alice\", \"Engineering\", 95000),\n    (\"Bob\",   \"Marketing\",   72000),\n    (\"Carol\", \"Engineering\", 88000),\n    (\"Dave\",  \"Marketing\",   72000),\n]\n\n# Sort by department ascending, then salary descending\nemployees.sort(key=lambda e: (e[1], -e[2]))\nfor name, dept, sal in employees:\n    print(f\"{dept:15} {name:10} {sal:,}\")\n```\n\n## Version Numbers\n\n```python\n# Semantic versioning sorts correctly as tuples\nversions = [(1, 10, 0), (1, 9, 3), (2, 0, 0), (1, 10, 1)]\nversions.sort()\nprint(versions)\n# [(1, 9, 3), (1, 10, 0), (1, 10, 1), (2, 0, 0)]\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Negative key trick for descending numbers",
          body: "To sort a numeric field in descending order within a tuple key, negate it: `(category, -price)`. This avoids a separate reverse step.",
        },
      ],
      interactions: [
        {
          id: "s9-comparison-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace lexicographic comparison when one tuple is a prefix of the other",
          expectedConceptIds: ["sequence-protocol"],
          code: "a = (3, 1)\nb = (3, 1, 0)\nprint(a < b)",
          expectedOutput: "True",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Elements match at index 0 (3==3) and index 1 (1==1). Then `a` runs out of elements — the shorter prefix is considered smaller." }],
          feedback: { correct: "Correct! When all compared elements match and one tuple is exhausted first, it is considered smaller.", incorrect: "(3,1) vs (3,1,0): both match through index 1, then a is exhausted. The shorter prefix is less than the longer sequence." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-comparison-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.12 — Sequence Protocols and Duck Typing ──────────────── */
    {
      id: "s9-sequence-protocol",
      stageId: "stage-09",
      title: "Sequence Protocols and Duck Typing",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Describe the sequence protocol: __len__ and __getitem__",
        "Explain duck typing in the context of sequences",
        "Write functions that accept any sequence using Sequence[T] typing",
      ],
      prerequisites: [],
      concepts: ["sequence-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Duck Typing: If It Walks Like a Sequence...\n\nPython uses **duck typing**: if an object supports the operations a function needs, it works — regardless of the object's class. For sequences, the minimal requirement is `len()` and integer indexing:\n\n```python\ndef first_and_last(seq):\n    \"\"\"Works on any sequence.\"\"\"\n    return seq[0], seq[-1]\n\nprint(first_and_last([10, 20, 30]))     # (10, 30)\nprint(first_and_last((10, 20, 30)))     # (10, 30)\nprint(first_and_last(\"hello\"))          # ('h', 'o')\nprint(first_and_last(range(5)))         # (0, 4)\n```\n\n## The Formal Sequence Protocol\n\nThe abstract base class `collections.abc.Sequence` defines the contract. Implement `__len__` and `__getitem__` and you get `__contains__`, `__iter__`, `__reversed__`, `index`, and `count` for free:\n\n```python\nfrom collections.abc import Sequence\n\nprint(isinstance([1, 2], Sequence))    # True\nprint(isinstance((1, 2), Sequence))    # True\nprint(isinstance(\"hello\", Sequence))   # True\nprint(isinstance({1, 2}, Sequence))    # False — sets are not sequences\n```\n\n## Writing Generic Functions\n\nAnnotate with `Sequence[T]` instead of `list[T]` when your function only reads data:\n\n```python\nfrom collections.abc import Sequence\n\ndef running_total(numbers: Sequence[float]) -> list[float]:\n    totals, acc = [], 0.0\n    for n in numbers:\n        acc += n\n        totals.append(acc)\n    return totals\n\nprint(running_total([1, 2, 3]))      # [1.0, 3.0, 6.0]\nprint(running_total((10, 20, 30)))   # [10.0, 30.0, 60.0]\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Prefer Sequence[T] over list[T] for read-only parameters",
          body: "When a function only reads from a sequence without mutating it, using `Sequence[T]` in the type hint lets callers pass tuples, strings, ranges, or any sequence — more flexible at zero runtime cost.",
        },
        {
          kind: "why-matters",
          body: "Understanding the sequence protocol explains why so many standard-library functions accept 'any sequence' without caring whether it is a list, tuple, or string. It also teaches you to design your own functions generically rather than over-constraining them to one type.",
        },
      ],
      interactions: [
        {
          id: "s9-protocol-mc",
          kind: "multiple-choice",
          prompt: "Which of the following is NOT a sequence in Python?",
          beginnerPurpose: "Identify which built-in types satisfy the sequence protocol",
          expectedConceptIds: ["sequence-protocol"],
          options: [
            { id: "a", text: `{"a": 1, "b": 2}`, isCorrect: true, explanation: "Correct! Dictionaries are mappings. They support len() but d[0] is a key lookup, not positional access — so dicts do not satisfy the sequence protocol." },
            { id: "b", text: `(1, 2, 3)`, isCorrect: false, explanation: "Tuples fully implement the sequence protocol: len() and integer indexing." },
            { id: "c", text: `range(10)`, isCorrect: false, explanation: "range objects support len() and positional integer indexing — they are sequences." },
            { id: "d", text: `"hello"`, isCorrect: false, explanation: "Strings support len() and indexing — they are sequences." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "A sequence needs positional integer indexing: obj[0] means 'first element'. Which type lacks this?" }],
          feedback: { correct: "Correct! Dictionaries are mappings, not sequences — they don't support positional access.", incorrect: "Dictionaries don't support positional indexing (d[0] is a key lookup, not 'first item'). They are mappings, not sequences." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-protocol-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.13 — Named Tuples ─────────────────────────────────────── */
    {
      id: "s9-named-tuples",
      stageId: "stage-09",
      title: "Named Tuples",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create named tuples with typing.NamedTuple and collections.namedtuple",
        "Access fields by name instead of index",
        "Convert a named tuple to a dict and create modified copies with _replace()",
      ],
      prerequisites: [],
      concepts: ["tuple-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem with Positional Access\n\nA plain tuple like `(\"Alice\", 30, 95000)` forces readers to remember that index 0 is name, 1 is age, 2 is salary. A **named tuple** adds field names while preserving all tuple properties: immutability, hashability, and memory efficiency.\n\n## typing.NamedTuple — Class Syntax\n\n```python\nfrom typing import NamedTuple\n\nclass Employee(NamedTuple):\n    name:   str\n    age:    int\n    salary: float\n\nemp = Employee(\"Alice\", 30, 95000.0)\n\n# Access by name — readable\nprint(emp.name)    # Alice\nprint(emp.salary)  # 95000.0\n\n# Still a tuple — index and len work too\nprint(emp[0])      # Alice\nprint(len(emp))    # 3\n```\n\n## collections.namedtuple — Factory Function\n\nUseful when field names are computed dynamically:\n\n```python\nfrom collections import namedtuple\n\nPoint = namedtuple(\"Point\", [\"x\", \"y\", \"z\"])\np = Point(1.0, 2.0, 3.0)\nprint(p)     # Point(x=1.0, y=2.0, z=3.0)\nprint(p.x)   # 1.0\n```\n\n## Helper Methods\n\n```python\nemp = Employee(\"Alice\", 30, 95000.0)\n\n# Convert to plain dict\nprint(emp._asdict())\n# {'name': 'Alice', 'age': 30, 'salary': 95000.0}\n\n# Create a modified copy (original unchanged)\nsenior = emp._replace(salary=120000.0)\nprint(senior)   # Employee(name='Alice', age=30, salary=120000.0)\n\n# Field names as a tuple\nprint(Employee._fields)   # ('name', 'age', 'salary')\n```",
        },
        {
          kind: "comparison",
          leftLabel: "NamedTuple",
          rightLabel: "Dataclass",
          leftCode: "from typing import NamedTuple\nclass Point(NamedTuple):\n    x: float\n    y: float\n# Immutable, hashable, tuple-like\n# Can be dict key or set member\n# Access: p.x or p[0]",
          rightCode: "from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: float\n    y: float\n# Mutable by default\n# Cannot be dict key unless frozen=True\n# Access: p.x only (no index)",
        },
        {
          kind: "why-matters",
          body: "Named tuples appear throughout the standard library: `os.stat_result`, `sys.version_info`, and `time.struct_time` are all named tuples. Recognizing them and using them in your own code makes the difference between `record[2]` (cryptic) and `record.salary` (self-documenting).",
        },
      ],
      interactions: [
        {
          id: "s9-named-fill",
          kind: "fill-code",
          prompt: "Complete the NamedTuple so that `Color(255, 128, 0).green` returns `128`.",
          beginnerPurpose: "Define a NamedTuple field with the correct name for attribute access",
          expectedConceptIds: ["tuple-immutability"],
          codeTemplate: "from typing import NamedTuple\n\nclass Color(NamedTuple):\n    red:  int\n    ____: int\n    blue: int\n\nc = Color(255, 128, 0)\nprint(c.green)",
          blanks: [{ placeholder: "____", answer: "green", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The field must be named `green` so that attribute access `c.green` resolves to the second element." }],
          feedback: { correct: "Correct! Field name `green` makes c.green return the second element (128).", incorrect: "Name the second field `green` so that c.green works. The name in the class definition must match the attribute used." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-named-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 9.14 — Tuple-Driven Data Modeling Drills ───────────────── */
    {
      id: "s9-tuple-drills",
      stageId: "stage-09",
      title: "Tuple-Driven Data Modeling Drills",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Model real-world records as named tuples",
        "Apply all forms of unpacking to structured data",
        "Use tuples as dictionary keys and composite sort keys",
      ],
      prerequisites: [],
      concepts: ["tuple-immutability", "tuple-unpacking", "sequence-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Drill 1 — Route Planning with Tuple Keys\n\nUse `(city_a, city_b)` tuples as dictionary keys to store distances:\n\n```python\ndistances = {\n    (\"New York\", \"London\"):  5570,\n    (\"London\",   \"Tokyo\"):   9560,\n    (\"Tokyo\",    \"Sydney\"):  7823,\n}\n\nroute = (\"London\", \"Tokyo\")\nprint(f\"{route[0]} to {route[1]}: {distances[route]} km\")\n# London to Tokyo: 9560 km\n\ntrip   = [(\"New York\",\"London\"), (\"London\",\"Tokyo\"), (\"Tokyo\",\"Sydney\")]\ntotal  = sum(distances[leg] for leg in trip)\nprint(f\"Total: {total:,} km\")   # Total: 22,953 km\n```",
        },
        {
          kind: "text",
          markdown:
            "## Drill 2 — Log Parsing with Extended Unpacking\n\nLog lines have format `timestamp event *details`. Extended unpacking handles variable-length detail sections:\n\n```python\nfrom typing import NamedTuple\n\nclass LogEntry(NamedTuple):\n    timestamp: str\n    event:     str\n    details:   list\n\ndef parse_log(line):\n    parts = line.split()\n    ts, event, *details = parts\n    return LogEntry(ts, event, details)\n\nlogs = [\n    \"10:00:01 LOGIN user=alice ip=192.168.1.1\",\n    \"10:00:05 REQUEST GET /api/users\",\n    \"10:00:07 ERROR 500 internal server error\",\n]\n\nfor line in logs:\n    entry = parse_log(line)\n    print(f\"[{entry.timestamp}] {entry.event}: {' '.join(entry.details)}\")\n```",
        },
        {
          kind: "text",
          markdown:
            "## Drill 3 — Leaderboard with Multi-Key Sort\n\nSort players by score descending, then name ascending as a tiebreaker:\n\n```python\nfrom typing import NamedTuple\n\nclass Player(NamedTuple):\n    name:  str\n    score: int\n    level: int\n\nplayers = [\n    Player(\"Zara\",  1500, 8),\n    Player(\"Alice\", 2100, 10),\n    Player(\"Bob\",   2100, 9),\n    Player(\"Carol\", 1800, 7),\n]\n\nranked = sorted(players, key=lambda p: (-p.score, p.name))\nfor i, p in enumerate(ranked, 1):\n    print(f\"{i}. {p.name} {p.score} (level {p.level})\")\n# 1. Alice 2100 (level 10)\n# 2. Bob 2100 (level 9)\n# 3. Carol 1800 (level 7)\n# 4. Zara 1500 (level 8)\n```",
        },
        {
          kind: "text",
          markdown:
            "## Drill 4 — Coordinate Transformation with Nested Unpacking\n\nTranslate a polygon by an offset using nested unpacking in a generator:\n\n```python\ndef translate(polygon, offset):\n    dx, dy = offset\n    return tuple((x + dx, y + dy) for x, y in polygon)\n\nsquare = ((0, 0), (1, 0), (1, 1), (0, 1))\nmoved  = translate(square, (3, 2))\nprint(moved)\n# ((3, 2), (4, 2), (4, 3), (3, 3))\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "What you practiced",
          body: "Tuple keys in dicts, extended unpacking in parsing, NamedTuple for structured records, tuple composite sort keys, and nested unpacking in geometry — patterns that appear constantly in production Python code.",
        },
      ],
      interactions: [
        {
          id: "s9-drills-run",
          kind: "run-code",
          prompt: "Write `top_n(players, n)` that returns the top-n `(name, score)` tuples sorted by score descending, then name ascending for ties. Print the top 3.",
          beginnerPurpose: "Combine tuple unpacking with multi-key sorting in a complete function",
          expectedConceptIds: ["tuple-unpacking", "sequence-protocol"],
          starterCode: `players = [
    ("Alice", 320),
    ("Bob",   450),
    ("Carol", 280),
    ("Dave",  450),
    ("Eve",   390),
]

def top_n(players, n):
    # Sort by score descending, then name ascending for ties
    pass

for name, score in top_n(players, 3):
    print(f"{name}: {score}")`,
          task: "Print Bob: 450, Dave: 450, Eve: 390 on separate lines (top 3 by score desc, name asc for ties).",
          expectedOutputContains: ["Bob: 450", "Dave: 450", "Eve: 390"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Use sorted(players, key=lambda p: (-p[1], p[0]))[:n] — negate the score for descending order." }],
          feedback: { correct: "Correct! sorted with key=(-score, name) and slice [:n] gives the top n in the right order.", incorrect: "Sort by (-score, name) so both 450-score players appear first (Bob before Dave alphabetically), then Eve at 390." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s9-drills-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s9-project",
    stageId: "stage-09",
    title: "Structured Record Store",
    brief:
      "Build a small in-memory record store using a NamedTuple for records and compound tuple pairs as dictionary keys. The store supports inserting, querying by composite key, listing records sorted by two fields, and exporting to plain dicts — uniting NamedTuple definitions, tuple-key dictionaries, multi-key sorting, and _asdict() conversion.",
    requirements: [
      "Define a Product NamedTuple with category, name, price, and stock fields",
      "Use (category, name) tuple pairs as dictionary keys",
      "Implement insert, get, list_sorted (category then price ascending), and export methods",
      "list_sorted must order by category ascending then price ascending",
      "export must return plain dicts using _asdict(), not NamedTuple instances",
    ],
    acceptanceCriteria: [
      "Inserting and retrieving a product by composite key works correctly",
      "list_sorted returns products in category-then-price order",
      "export returns plain dicts (not NamedTuple instances)",
      "All tuple semantics respected — no list used where a tuple is appropriate",
    ],
    conceptIds: ["tuple-immutability", "tuple-unpacking", "sequence-protocol"],
    difficulty: "intermediate",
  },
} satisfies Stage;
