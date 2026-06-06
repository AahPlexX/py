import type { Stage } from "@/course/course.schema";

export const stage10 = {
  id: "stage-10",
  number: 10,
  title: "Dictionaries, Mappings, and Key-Value Data",
  summary:
    "Master Python dictionaries: creation, access, update, deletion, iteration, nesting, merging, views, and real-world patterns like counting, grouping, lookup tables, and configuration.",
  level: "beginner",
  masteryGateConceptIds: ["dict-creation", "dict-access", "dict-iteration"],
  lessons: [
    /* ── Lesson 10.1 — Dictionary creation ─────────────────────────────── */
    {
      id: "s10-dict-creation",
      stageId: "stage-10",
      title: "Dictionary Creation",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Create dictionaries using curly-brace literal syntax",
        "Create dictionaries with dict() and keyword arguments",
        "Understand keys must be hashable; values can be anything",
      ],
      prerequisites: [],
      concepts: ["dict-creation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Is a Dictionary?\n\nA dictionary is Python's way of storing **key–value pairs**. Instead of accessing data by position (index 0, 1, 2…), you access it by a meaningful *key* — like a name, a code, or a word. Think of it as a lookup table: given the key, you get the value instantly.\n\n## Creating Dictionaries\n\nThe most common way is the curly-brace literal:\n\n```python\n# String keys — most common\nperson = {\"name\": \"Alice\", \"age\": 30, \"city\": \"London\"}\n\n# Integer keys\nsquares = {1: 1, 2: 4, 3: 9, 4: 16}\n\n# Mixed key types are allowed (but unusual)\nmixed = {\"x\": 10, 42: \"answer\", (1, 2): \"point\"}\n\n# Empty dictionary\nconfig = {}\n```\n\n## Alternative: dict() Constructor\n\n```python\n# From keyword arguments (keys must be valid Python identifiers)\nperson = dict(name=\"Alice\", age=30, city=\"London\")\n\n# From a list of key-value pairs\npairs = [(\"a\", 1), (\"b\", 2), (\"c\", 3)]\nd = dict(pairs)\nprint(d)   # {'a': 1, 'b': 2, 'c': 3}\n```\n\n## Key Rules\n\nKeys must be **hashable** (immutable): strings, numbers, tuples of hashables. Values can be anything — lists, other dicts, functions, None.\n\n```python\nvalid = {\n    \"string_key\": [1, 2, 3],         # list as value: OK\n    42: {\"nested\": \"dict\"},           # dict as value: OK\n    (\"x\", \"y\"): True,                 # tuple as key: OK\n}\n\n# Invalid — lists are mutable and unhashable:\n# {[1, 2]: \"value\"}   # TypeError: unhashable type: 'list'\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Dictionaries maintain insertion order (Python 3.7+)",
          body: "Since Python 3.7, dictionaries remember the order in which keys were inserted. When you iterate or print, items appear in insertion order.",
        },
        {
          kind: "why-matters",
          body: "Dictionaries are Python's most powerful built-in data structure. JSON APIs return dictionaries. Configuration files become dictionaries. Counters, groupings, lookup tables — all start with a dict. Mastering dicts is essential for real-world Python work.",
        },
      ],
      interactions: [
        {
          id: "s10-dict-creation-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Construct a dict with dict() and inspect its type and length",
          expectedConceptIds: ["dict-creation"],
          code: "d = dict(x=10, y=20, z=30)\nprint(type(d).__name__, len(d))",
          expectedOutput: "dict 3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "dict(x=10, y=20, z=30) creates a 3-key dictionary. type().__name__ gives the class name as a string." }],
          feedback: { correct: "Correct! dict() with keyword arguments creates a dict; len counts the keys.", incorrect: "dict(x=10, y=20, z=30) creates {'x':10, 'y':20, 'z':30}. type().__name__ is 'dict', len is 3." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-dict-creation-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.2 — Keys and values ─────────────────────────────────── */
    {
      id: "s10-keys-values",
      stageId: "stage-10",
      title: "Keys and Values",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Understand the distinction between keys and values in a mapping",
        "Know that keys must be unique and hashable",
        "Recognize that values can be any Python object",
      ],
      prerequisites: [],
      concepts: ["dict-creation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Keys Are Unique Labels\n\nEvery key in a dictionary must be unique. If you assign to the same key twice, the second value replaces the first:\n\n```python\nd = {\"color\": \"red\", \"color\": \"blue\"}   # duplicate key\nprint(d)   # {'color': 'blue'}  — last assignment wins\n```\n\nKeys must be **hashable** — strings, numbers, booleans, and tuples of hashable objects all qualify. Mutable objects (lists, dicts) cannot be keys.\n\n## Values Are Unrestricted\n\nValues can be anything — including other dictionaries, lists, functions, or None:\n\n```python\ncatalog = {\n    \"laptop\": {\"price\": 999, \"stock\": 10, \"tags\": [\"electronics\", \"computer\"]},\n    \"book\":   {\"price\": 29,  \"stock\": 50, \"tags\": [\"education\"]},\n}\n\nprint(catalog[\"laptop\"][\"price\"])          # 999\nprint(catalog[\"book\"][\"tags\"])             # ['education']\n```\n\n## Inspecting Size and Structure\n\n```python\nscores = {\"Alice\": 95, \"Bob\": 87, \"Carol\": 92}\n\nprint(len(scores))      # 3 — number of key-value pairs\nprint(\"Alice\" in scores)  # True — checks keys by default\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "True and 1 are the same key",
          body: "In Python, `True == 1` and `False == 0`. So `{True: 'a', 1: 'b'}` ends up with only one key (`True`) mapped to `'b'` — the second assignment overwrites the first because the keys hash the same.",
        },
      ],
      interactions: [
        {
          id: "s10-keys-values-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Understand that duplicate keys cause overwrite",
          expectedConceptIds: ["dict-creation"],
          code: "d = {\"a\": 1, \"b\": 2, \"a\": 3}\nprint(len(d), d[\"a\"])",
          expectedOutput: "2 3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Duplicate keys: the last value wins. 'a' is overwritten to 3. len counts unique keys." }],
          feedback: { correct: "Correct! Duplicate key 'a' is overwritten to 3. Only 2 unique keys remain.", incorrect: "When a key appears twice, the second value replaces the first. 'a' maps to 3; there are only 2 unique keys." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-keys-values-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.3 — Access by key ────────────────────────────────────── */
    {
      id: "s10-access-by-key",
      stageId: "stage-10",
      title: "Access by Key",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Access a value using square-bracket notation d[key]",
        "Understand that missing keys raise KeyError",
        "Assign to a key using d[key] = value",
      ],
      prerequisites: [],
      concepts: ["dict-access"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Square-Bracket Access\n\nTo retrieve a value, use the key in square brackets. This is the primary access method:\n\n```python\nperson = {\"name\": \"Alice\", \"age\": 30, \"city\": \"London\"}\n\nprint(person[\"name\"])   # Alice\nprint(person[\"age\"])    # 30\n```\n\n## Missing Keys Raise KeyError\n\nIf the key does not exist, Python raises `KeyError` immediately — it does not return None or 0:\n\n```python\nprint(person[\"salary\"])  # KeyError: 'salary'\n```\n\nThis is intentional: a missing key usually indicates a bug. If you expect a key might be absent, use `.get()` (next lesson).\n\n## Assigning Values\n\nThe same bracket syntax assigns or updates:\n\n```python\nperson[\"city\"] = \"Paris\"    # update existing key\nperson[\"email\"] = \"a@b.com\" # add new key\n\nprint(person)\n# {'name': 'Alice', 'age': 30, 'city': 'Paris', 'email': 'a@b.com'}\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Assignment creates or overwrites",
          body: "There is no separate 'add' vs 'update' operation. `d[key] = value` always works: it adds the key if absent, or silently replaces the existing value if present.",
        },
      ],
      interactions: [
        {
          id: "s10-access-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace key access and assignment on a dictionary",
          expectedConceptIds: ["dict-access"],
          code: "d = {\"x\": 1, \"y\": 2}\nd[\"x\"] = 10\nd[\"z\"] = 3\nprint(d[\"x\"], len(d))",
          expectedOutput: "10 3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "d['x'] = 10 updates the existing key. d['z'] = 3 adds a new key. len counts all keys." }],
          feedback: { correct: "Correct! 'x' updated to 10, 'z' added — 3 keys total.", incorrect: "d['x']=10 overwrites 1 with 10. d['z']=3 adds a third key. len(d) is now 3." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-access-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.4 — KeyError ──────────────────────────────────────────── */
    {
      id: "s10-key-error",
      stageId: "stage-10",
      title: "KeyError",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Understand when and why Python raises KeyError",
        "Catch KeyError with a try/except block",
        "Decide between try/except and in-check for missing-key handling",
      ],
      prerequisites: [],
      concepts: ["dict-access"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Why KeyError Exists\n\nWhen you access a dictionary with `d[key]` and the key is not present, Python raises `KeyError`. This is Python's way of saying 'you asked for something that doesn't exist — that is probably a mistake'.\n\n```python\nscores = {\"Alice\": 95, \"Bob\": 87}\n\n# These all raise KeyError:\n# scores[\"Carol\"]       # KeyError: 'Carol'\n# scores[\"\"]            # KeyError: ''\n```\n\n## Handling KeyError with try/except\n\n```python\ndef get_score(scores, name):\n    try:\n        return scores[name]\n    except KeyError:\n        return None\n\nprint(get_score(scores, \"Alice\"))    # 95\nprint(get_score(scores, \"Carol\"))    # None\n```\n\n## Handling KeyError with `in` Check\n\nFor simple cases, checking membership before access is cleaner:\n\n```python\nname = \"Carol\"\nif name in scores:\n    print(scores[name])\nelse:\n    print(f\"{name} not found\")\n# Carol not found\n```\n\n## Which to Choose?\n\nUse `try/except KeyError` when the key is usually present (optimistic path). Use `if key in d` when absence is common and you want to branch logic. Use `.get()` (next lesson) for the simplest default-value pattern.",
        },
        {
          kind: "mental-model",
          title: "KeyError as strict type checking",
          analogy: "Accessing a missing key is like trying to open a drawer labeled 'salary' in a filing cabinet that only has 'name' and 'age' drawers. Python refuses to guess — it tells you immediately that the drawer does not exist.",
          explanation: "This fail-fast behaviour is intentional: it catches typos and logic errors early rather than letting None or 0 silently propagate through your program and cause mysterious failures later.",
        },
      ],
      interactions: [
        {
          id: "s10-key-error-debug",
          kind: "debug-code",
          prompt: "This code crashes when the key is missing. Fix it so it prints 'not found' for missing keys instead of raising KeyError.",
          beginnerPurpose: "Add safe key access to avoid a KeyError crash",
          expectedConceptIds: ["dict-access"],
          brokenCode: "inventory = {\"apple\": 10, \"banana\": 5}\nitem = \"cherry\"\nprint(inventory[item])",
          bugDescription: "inventory[item] raises KeyError when 'cherry' is not in the dict. Use an in-check or .get() to handle the missing key.",
          fixedCode: "inventory = {\"apple\": 10, \"banana\": 5}\nitem = \"cherry\"\nprint(inventory.get(item, \"not found\"))",
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use inventory.get(item, 'not found') — it returns the default 'not found' when the key is absent." }],
          feedback: { correct: "Correct! .get(key, default) returns the default value instead of raising KeyError.", incorrect: "Use inventory.get(item, 'not found') or an `if item in inventory:` check to avoid the crash." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-key-error-debug"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.5 — .get() ───────────────────────────────────────────── */
    {
      id: "s10-get-method",
      stageId: "stage-10",
      title: "The .get() Method",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use d.get(key) to return None for missing keys instead of raising KeyError",
        "Supply a default value with d.get(key, default)",
        "Choose between d[key] and d.get() appropriately",
      ],
      prerequisites: [],
      concepts: ["dict-access"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## .get() — Safe Key Access\n\n`.get(key)` returns the value for the key if it exists, or `None` if the key is missing. No exception raised:\n\n```python\nscores = {\"Alice\": 95, \"Bob\": 87}\n\nprint(scores.get(\"Alice\"))    # 95\nprint(scores.get(\"Carol\"))    # None  — no KeyError\n```\n\n## Supplying a Default Value\n\nThe second argument to `.get()` becomes the return value when the key is absent:\n\n```python\nprint(scores.get(\"Carol\", 0))        # 0\nprint(scores.get(\"Dave\", \"N/A\"))     # N/A\n```\n\n## When to Use .get() vs d[key]\n\n- Use `d[key]` when the key **must** exist. A missing key is a bug → KeyError tells you immediately.\n- Use `d.get(key)` when absence is **expected and normal** — optional configuration keys, user-provided data, optional fields.\n\n```python\nconfig = {\"timeout\": 30, \"retries\": 3}\n\n# Absent key is normal — use .get() with a sensible default\ndebug = config.get(\"debug\", False)     # False\nhost  = config.get(\"host\", \"localhost\")  # 'localhost'\n\nprint(debug, host)   # False localhost\n```",
        },
        {
          kind: "comparison",
          leftLabel: "d[key] — strict",
          rightLabel: "d.get(key, default) — safe",
          leftCode: "# Raises KeyError if key absent\n# Use when key MUST exist\n# Fast; intent is clear\nscore = scores[\"Alice\"]",
          rightCode: "# Returns None (or default) if absent\n# Use when absence is normal\n# Cleaner than try/except\nscore = scores.get(\"Alice\", 0)",
        },
      ],
      interactions: [
        {
          id: "s10-get-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace .get() with and without a default value",
          expectedConceptIds: ["dict-access"],
          code: "d = {\"a\": 1, \"b\": 2}\nprint(d.get(\"a\", 99))\nprint(d.get(\"c\", 99))",
          expectedOutput: "1\n99",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "d.get('a', 99): 'a' exists, returns 1. d.get('c', 99): 'c' absent, returns default 99." }],
          feedback: { correct: "Correct! .get() returns the value when the key exists, or the default when it doesn't.", incorrect: "d.get('a', 99) returns 1 because 'a' exists. d.get('c', 99) returns 99 because 'c' is absent." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-get-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.6 — Adding and updating values ───────────────────────── */
    {
      id: "s10-adding-updating",
      stageId: "stage-10",
      title: "Adding and Updating Values",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Add new keys with d[key] = value",
        "Update existing keys in place",
        "Use .update() to merge many keys at once",
        "Use .setdefault() to add a key only if absent",
      ],
      prerequisites: [],
      concepts: ["dict-access"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Single-Key Add and Update\n\nBoth addition and update use the same assignment syntax:\n\n```python\ncart = {\"apple\": 2}\n\ncart[\"banana\"] = 3   # add a new key\ncart[\"apple\"]  = 5   # update an existing key\n\nprint(cart)   # {'apple': 5, 'banana': 3}\n```\n\n## .update() — Merge Many Keys\n\n`.update()` takes another dict (or keyword arguments) and adds/updates all its pairs:\n\n```python\ndefaults = {\"theme\": \"light\", \"language\": \"en\", \"timeout\": 30}\nuser_prefs = {\"theme\": \"dark\", \"font_size\": 14}\n\ndefaults.update(user_prefs)\nprint(defaults)\n# {'theme': 'dark', 'language': 'en', 'timeout': 30, 'font_size': 14}\n```\n\nUser preferences override defaults; keys not in user_prefs are preserved.\n\n## .setdefault() — Add Only If Absent\n\n`.setdefault(key, default)` inserts the key with the default value only if the key is not already there, then returns the current value:\n\n```python\ncounts = {}\nwords  = [\"the\", \"cat\", \"the\", \"dog\", \"the\"]\n\nfor word in words:\n    counts.setdefault(word, 0)   # add key=0 only if new\n    counts[word] += 1\n\nprint(counts)   # {'the': 3, 'cat': 1, 'dog': 1}\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: ".setdefault() is the classic counting initializer",
          body: "Before defaultdict was common, `d.setdefault(key, 0)` followed by `d[key] += 1` was the standard pattern for counting. It is still used today for clarity.",
        },
      ],
      interactions: [
        {
          id: "s10-adding-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace .update() merging user preferences over defaults",
          expectedConceptIds: ["dict-access"],
          code: "d = {\"a\": 1, \"b\": 2}\nd.update({\"b\": 20, \"c\": 3})\nprint(d[\"a\"], d[\"b\"], d[\"c\"])",
          expectedOutput: "1 20 3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: ".update() adds 'c' and overwrites 'b'. 'a' is unchanged." }],
          feedback: { correct: "Correct! .update() overwrites 'b' to 20, adds 'c'=3, and leaves 'a'=1.", incorrect: ".update() merges keys: 'b' is overwritten to 20, 'c' is added, 'a' stays 1." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-adding-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.7 — Deleting keys ────────────────────────────────────── */
    {
      id: "s10-deleting-keys",
      stageId: "stage-10",
      title: "Deleting Keys",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Remove a key with del d[key]",
        "Remove and return a value with d.pop(key)",
        "Remove all entries with d.clear()",
      ],
      prerequisites: [],
      concepts: ["dict-access"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## del — Remove a Key\n\n`del d[key]` removes the key and its value. Raises `KeyError` if the key doesn't exist:\n\n```python\nuser = {\"name\": \"Alice\", \"age\": 30, \"temp_token\": \"abc123\"}\n\ndel user[\"temp_token\"]   # remove sensitive field\nprint(user)              # {'name': 'Alice', 'age': 30}\n\n# del user[\"missing\"]   # KeyError — key not present\n```\n\n## .pop() — Remove and Return\n\n`.pop(key)` removes the key and returns its value. You can also provide a default to avoid KeyError:\n\n```python\nscores = {\"Alice\": 95, \"Bob\": 87, \"Carol\": 72}\n\nremoved = scores.pop(\"Bob\")\nprint(removed)   # 87\nprint(scores)    # {'Alice': 95, 'Carol': 72}\n\n# Safe pop with default\nval = scores.pop(\"Dave\", 0)\nprint(val)       # 0  — 'Dave' was not in dict\n```\n\n## .clear() — Remove All Entries\n\n```python\ncache = {\"key1\": \"val1\", \"key2\": \"val2\"}\ncache.clear()\nprint(cache)   # {}\n```\n\n## Removing the Last-Inserted Item\n\n```python\nd = {\"a\": 1, \"b\": 2, \"c\": 3}\nlast_key, last_val = d.popitem()   # removes and returns last pair\nprint(last_key, last_val)          # c 3\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Use .pop() when you need the removed value",
          body: "If you only want to delete and don't care about the value, `del d[key]` is cleaner. If you need the value (e.g., to process it before discarding), use `.pop(key)`.",
        },
      ],
      interactions: [
        {
          id: "s10-delete-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace del and .pop() on a dictionary",
          expectedConceptIds: ["dict-access"],
          code: "d = {\"a\": 1, \"b\": 2, \"c\": 3}\ndel d[\"a\"]\nv = d.pop(\"b\")\nprint(len(d), v)",
          expectedOutput: "1 2",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "del removes 'a'. .pop('b') removes 'b' and returns 2. Only 'c' remains — len is 1." }],
          feedback: { correct: "Correct! After del 'a' and pop 'b', only 'c' remains (len=1). .pop() returned 2.", incorrect: "del removes 'a' (no return). pop removes 'b' and returns 2. Remaining: {'c':3}, len=1." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-delete-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.8 — .keys() ──────────────────────────────────────────── */
    {
      id: "s10-keys-view",
      stageId: "stage-10",
      title: "The .keys() View",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use d.keys() to retrieve all keys",
        "Iterate over keys in a for loop",
        "Understand that .keys() returns a live view, not a copy",
      ],
      prerequisites: [],
      concepts: ["dict-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## .keys() Returns a View\n\n`d.keys()` returns a **view object** — a live, read-only window onto the dictionary's keys. If the dictionary changes, the view reflects those changes automatically:\n\n```python\nperson = {\"name\": \"Alice\", \"age\": 30, \"city\": \"London\"}\n\nkeys = person.keys()\nprint(keys)           # dict_keys(['name', 'age', 'city'])\nprint(type(keys))     # <class 'dict_keys'>\n\n# The view updates when the dict changes:\nperson[\"email\"] = \"alice@example.com\"\nprint(keys)   # dict_keys(['name', 'age', 'city', 'email'])\n```\n\n## Iterating Over Keys\n\nLooping over a dict iterates its keys by default — but `.keys()` makes the intent explicit:\n\n```python\nscores = {\"Alice\": 95, \"Bob\": 87, \"Carol\": 92}\n\n# Both loops are equivalent:\nfor name in scores:\n    print(name, scores[name])\n\nfor name in scores.keys():\n    print(name, scores[name])\n```\n\n## Converting to a List\n\nViews support iteration and membership tests but not indexing. Convert to list if you need positional access:\n\n```python\nall_keys = list(person.keys())\nprint(all_keys[0])   # 'name'\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Iterating a dict directly gives its keys",
          body: "When you write `for k in my_dict:`, Python iterates the keys. Writing `for k in my_dict.keys():` is explicit but equivalent. Both are idiomatic.",
        },
      ],
      interactions: [
        {
          id: "s10-keys-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Iterate keys and use them for value access",
          expectedConceptIds: ["dict-iteration"],
          code: "d = {\"x\": 10, \"y\": 20}\nfor k in d.keys():\n    print(k, d[k])",
          expectedOutput: "x 10\ny 20",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: ".keys() gives the keys in insertion order. Use each key to access its value." }],
          feedback: { correct: "Correct! .keys() iterates 'x' then 'y'; d[k] gets the value for each.", incorrect: ".keys() yields each key in insertion order. d[k] accesses the corresponding value." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-keys-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.9 — .values() ────────────────────────────────────────── */
    {
      id: "s10-values-view",
      stageId: "stage-10",
      title: "The .values() View",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Retrieve all values with d.values()",
        "Compute aggregate operations (sum, max, min) over values",
        "Understand that values() does not support membership test by key",
      ],
      prerequisites: [],
      concepts: ["dict-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## .values() — Iterating Values Directly\n\nWhen you only need the values (not the keys), use `.values()`:\n\n```python\nscores = {\"Alice\": 95, \"Bob\": 87, \"Carol\": 92}\n\nfor score in scores.values():\n    print(score)\n# 95\n# 87\n# 92\n```\n\n## Aggregate Operations on Values\n\nBecause `.values()` is iterable, you can pass it directly to `sum()`, `max()`, `min()`, or any function that accepts an iterable:\n\n```python\nprint(sum(scores.values()))        # 274\nprint(max(scores.values()))        # 95\nprint(min(scores.values()))        # 87\nprint(list(scores.values()))       # [95, 87, 92]\n\naverage = sum(scores.values()) / len(scores)\nprint(f\"Average: {average:.1f}\")   # Average: 91.3\n```\n\n## Checking Membership in Values\n\n```python\n# Is 87 a value anywhere in the dict?\nprint(87 in scores.values())   # True  (linear search)\n\n# Contrast with key membership (O(1) hash lookup):\nprint(\"Bob\" in scores)         # True\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Value membership is slower than key membership",
          body: "`87 in d.values()` performs a linear scan through all values. `'Bob' in d` uses hashing — constant time. When you need to check values frequently, consider building a reverse lookup dict.",
        },
      ],
      interactions: [
        {
          id: "s10-values-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply sum() and max() to a dictionary's values",
          expectedConceptIds: ["dict-iteration"],
          code: "prices = {\"apple\": 1.5, \"banana\": 0.8, \"cherry\": 3.0}\nprint(sum(prices.values()), max(prices.values()))",
          expectedOutput: "5.3 3.0",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "sum(1.5+0.8+3.0)=5.3. max(1.5,0.8,3.0)=3.0." }],
          feedback: { correct: "Correct! sum=5.3, max=3.0.", incorrect: "sum(1.5+0.8+3.0)=5.3. max finds the largest: 3.0." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-values-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.10 — .items() ────────────────────────────────────────── */
    {
      id: "s10-items-view",
      stageId: "stage-10",
      title: "The .items() View",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Retrieve key-value pairs as tuples with d.items()",
        "Unpack key and value in a for loop using tuple unpacking",
        "Use .items() for filtering and conditional processing",
      ],
      prerequisites: [],
      concepts: ["dict-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## .items() — Key-Value Pairs Together\n\n`.items()` returns a view of `(key, value)` tuples. Combined with unpacking, it is the most expressive way to iterate a dictionary:\n\n```python\nscores = {\"Alice\": 95, \"Bob\": 87, \"Carol\": 92}\n\nfor name, score in scores.items():\n    print(f\"{name}: {score}\")\n# Alice: 95\n# Bob: 87\n# Carol: 92\n```\n\n## Filtering During Iteration\n\nProcessing only entries that meet a condition:\n\n```python\nfor name, score in scores.items():\n    if score >= 90:\n        print(f\"{name} passed with distinction ({score})\")\n# Alice passed with distinction (95)\n# Carol passed with distinction (92)\n```\n\n## Building a New Dict from Items\n\n```python\n# Normalize all scores to 0–1 range\nmax_score = max(scores.values())\nnormalized = {name: score / max_score\n              for name, score in scores.items()}\nprint(normalized)\n# {'Alice': 1.0, 'Bob': 0.916..., 'Carol': 0.968...}\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: ".items() is the most common dict iteration pattern",
          body: "In practice, `for key, value in d.items():` is the standard way to iterate a dictionary when you need both the key and the value. It is more readable than `for k in d: v = d[k]`.",
        },
      ],
      interactions: [
        {
          id: "s10-items-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Use .items() with unpacking to access both key and value",
          expectedConceptIds: ["dict-iteration"],
          code: "inventory = {\"apple\": 10, \"banana\": 0, \"cherry\": 5}\nfor fruit, qty in inventory.items():\n    if qty == 0:\n        print(f\"{fruit}: out of stock\")",
          expectedOutput: "banana: out of stock",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: ".items() yields (fruit, qty) pairs. Only 'banana' has qty==0." }],
          feedback: { correct: "Correct! Only banana has quantity 0, so only that line prints.", incorrect: ".items() yields (fruit, qty) tuples. Only 'banana' has qty==0, so only it is printed." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-items-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.11 — Iterating dictionaries ──────────────────────────── */
    {
      id: "s10-iterating-dicts",
      stageId: "stage-10",
      title: "Iterating Dictionaries",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Choose the right iteration method: keys, values, or items",
        "Sort a dictionary's output by key or by value",
        "Avoid modifying a dictionary while iterating over it",
      ],
      prerequisites: [],
      concepts: ["dict-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Choosing the Right View\n\n```python\nd = {\"b\": 2, \"a\": 1, \"c\": 3}\n\n# Need only keys:\nfor k in d:              # or d.keys()\n    print(k)\n\n# Need only values:\nfor v in d.values():\n    print(v)\n\n# Need both:\nfor k, v in d.items():\n    print(k, v)\n```\n\n## Sorting Output\n\nDictionaries maintain insertion order, but you can iterate in sorted order without changing the dict:\n\n```python\nscores = {\"Carol\": 92, \"Alice\": 95, \"Bob\": 87}\n\n# Sort by key alphabetically\nfor name in sorted(scores):\n    print(name, scores[name])\n# Alice 95\n# Bob 87\n# Carol 92\n\n# Sort by value descending\nfor name, score in sorted(scores.items(), key=lambda x: -x[1]):\n    print(f\"{name}: {score}\")\n# Alice: 95\n# Carol: 92\n# Bob: 87\n```\n\n## Never Modify While Iterating\n\nAdding or removing keys during iteration raises `RuntimeError`. Iterate a copy instead:\n\n```python\nto_delete = [k for k, v in scores.items() if v < 90]\nfor k in to_delete:\n    del scores[k]\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Modifying a dict during iteration raises RuntimeError",
          body: "If you need to remove keys during iteration, collect them in a list first, then delete after the loop. Never add or remove keys inside a for loop over the dict.",
        },
      ],
      interactions: [
        {
          id: "s10-iterating-fill",
          kind: "fill-code",
          prompt: "Fill in the blank to iterate the dictionary in sorted key order and print each key and value.",
          beginnerPurpose: "Apply sorted() to dict iteration",
          expectedConceptIds: ["dict-iteration"],
          codeTemplate: "d = {\"c\": 3, \"a\": 1, \"b\": 2}\nfor k, v in sorted(____.items()):\n    print(k, v)",
          blanks: [{ placeholder: "____", answer: "d", caseSensitive: false }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "sorted() takes any iterable. Pass d.items() to sort the key-value pairs by key." }],
          feedback: { correct: "Correct! sorted(d.items()) sorts by key; unpacking gives k and v.", incorrect: "Write d in the blank: sorted(d.items()) sorts the pairs alphabetically by key." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-iterating-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.12 — Nested dictionaries ─────────────────────────────── */
    {
      id: "s10-nested-dicts",
      stageId: "stage-10",
      title: "Nested Dictionaries",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create dictionaries whose values are themselves dictionaries",
        "Access nested values with chained bracket notation",
        "Update and add entries in nested structures",
      ],
      prerequisites: [],
      concepts: ["dict-access"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Nesting Dicts Inside Dicts\n\nDictionary values can be any Python object — including other dictionaries. This lets you represent hierarchical data:\n\n```python\nusers = {\n    \"alice\": {\"email\": \"alice@example.com\", \"role\": \"admin\", \"active\": True},\n    \"bob\":   {\"email\": \"bob@example.com\",   \"role\": \"user\",  \"active\": False},\n}\n```\n\n## Accessing Nested Values\n\nChain square brackets to descend into the structure:\n\n```python\nprint(users[\"alice\"][\"role\"])     # admin\nprint(users[\"bob\"][\"email\"])      # bob@example.com\nprint(users[\"alice\"][\"active\"])   # True\n```\n\n## Updating Nested Values\n\n```python\nusers[\"bob\"][\"active\"] = True   # re-activate Bob's account\nusers[\"alice\"][\"role\"] = \"superadmin\"\nprint(users[\"alice\"][\"role\"])   # superadmin\n```\n\n## Safely Accessing Nested Keys\n\nUsing `.get()` at each level avoids KeyError when the outer or inner key might be absent:\n\n```python\ndef get_role(users, username):\n    user = users.get(username, {})\n    return user.get(\"role\", \"guest\")\n\nprint(get_role(users, \"alice\"))    # superadmin\nprint(get_role(users, \"carol\"))    # guest — no such user\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Nesting depth: practical guidance",
          body: "One or two levels of nesting is common and readable. Three or more levels signal that a proper class or data model may be clearer. JSON data naturally maps to nested dicts — you will encounter this pattern when working with APIs.",
        },
      ],
      interactions: [
        {
          id: "s10-nested-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Access and update a value in a nested dictionary",
          expectedConceptIds: ["dict-access"],
          code: "db = {\"user\": {\"name\": \"Alice\", \"score\": 10}}\ndb[\"user\"][\"score\"] += 5\nprint(db[\"user\"][\"score\"])",
          expectedOutput: "15",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "db['user'] gives the inner dict. ['score'] accesses 10. += 5 updates it to 15 in place." }],
          feedback: { correct: "Correct! Chained access gives the inner dict; += 5 updates the nested value.", incorrect: "db['user'] gives {'name':'Alice','score':10}. ['score'] gives 10. 10+5=15." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-nested-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.13 — Dictionary merging ──────────────────────────────── */
    {
      id: "s10-dict-merging",
      stageId: "stage-10",
      title: "Dictionary Merging",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Merge two dicts with the | operator (Python 3.9+)",
        "Update a dict in place with the |= operator",
        "Compare merging strategies and their precedence rules",
      ],
      prerequisites: [],
      concepts: ["dict-creation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The | Operator (Python 3.9+)\n\nThe `|` operator merges two dictionaries into a new one. When both dicts have the same key, the **right side wins**:\n\n```python\ndefaults = {\"theme\": \"light\", \"lang\": \"en\", \"timeout\": 30}\noverrides = {\"theme\": \"dark\", \"font\": 14}\n\nmerged = defaults | overrides\nprint(merged)\n# {'theme': 'dark', 'lang': 'en', 'timeout': 30, 'font': 14}\n\n# Original dicts are unchanged:\nprint(defaults[\"theme\"])   # light\n```\n\n## In-Place Merge with |=\n\n`|=` merges the right dict into the left dict in place:\n\n```python\nconfig = {\"debug\": False, \"host\": \"localhost\"}\nenv_vars = {\"debug\": True, \"port\": 8080}\n\nconfig |= env_vars\nprint(config)\n# {'debug': True, 'host': 'localhost', 'port': 8080}\n```\n\n## Older Patterns (pre-3.9)\n\n```python\n# .update() modifies in place\nresult = defaults.copy()\nresult.update(overrides)\n\n# ** unpacking (Python 3.5+)\nresult = {**defaults, **overrides}\n```\n\nAll three produce the same result. The `|` operator is the clearest for Python 3.9+.",
        },
        {
          kind: "comparison",
          leftLabel: "| creates new dict",
          rightLabel: "|= modifies in place",
          leftCode: "a = {\"x\": 1}\nb = {\"y\": 2}\nc = a | b    # new dict\nprint(a)     # unchanged: {'x': 1}\nprint(c)     # {'x': 1, 'y': 2}",
          rightCode: "a = {\"x\": 1}\nb = {\"y\": 2}\na |= b       # modifies a\nprint(a)     # changed: {'x': 1, 'y': 2}",
        },
      ],
      interactions: [
        {
          id: "s10-merging-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace the | operator and understand which side wins on conflict",
          expectedConceptIds: ["dict-creation"],
          code: "a = {\"x\": 1, \"y\": 2}\nb = {\"y\": 99, \"z\": 3}\nc = a | b\nprint(c[\"x\"], c[\"y\"], c[\"z\"])",
          expectedOutput: "1 99 3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "The right-side dict (b) wins on conflict. 'y' in b is 99, which overwrites 'y'=2 from a." }],
          feedback: { correct: "Correct! a|b: right side wins. 'x'=1, 'y'=99 (from b), 'z'=3.", incorrect: "When both dicts have 'y', the right side (b) wins: y becomes 99. 'x' from a and 'z' from b are kept." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-merging-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.14 — Dictionary views ────────────────────────────────── */
    {
      id: "s10-dict-views",
      stageId: "stage-10",
      title: "Dictionary Views",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand that keys(), values(), and items() return live view objects",
        "Perform set operations on dict_keys views",
        "Explain the difference between a view and a copy",
      ],
      prerequisites: [],
      concepts: ["dict-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Views Are Live Windows\n\nUnlike `list(d.keys())`, the objects returned by `.keys()`, `.values()`, and `.items()` are **view objects** — they dynamically reflect the current state of the dictionary:\n\n```python\nd = {\"a\": 1, \"b\": 2}\nkeys_view = d.keys()\n\nprint(keys_view)   # dict_keys(['a', 'b'])\n\nd[\"c\"] = 3         # modify the dict\nprint(keys_view)   # dict_keys(['a', 'b', 'c'])  — view updated!\n```\n\n## Set Operations on Keys Views\n\nBecause dictionary keys are unique, `dict_keys` supports set-like operations:\n\n```python\ngroup_a = {\"Alice\": 95, \"Bob\": 87, \"Carol\": 92}\ngroup_b = {\"Bob\": 78, \"Dave\": 88, \"Eve\": 91}\n\n# Keys in both groups (intersection)\nprint(group_a.keys() & group_b.keys())   # {'Bob'}\n\n# Keys in either group (union)\nprint(group_a.keys() | group_b.keys())   # {'Alice', 'Bob', 'Carol', 'Dave', 'Eve'}\n\n# Keys in group_a but not group_b (difference)\nprint(group_a.keys() - group_b.keys())   # {'Alice', 'Carol'}\n```\n\n## View vs Copy\n\n```python\nkeys_copy = list(d.keys())   # snapshot — won't update\nkeys_view = d.keys()         # live — always current\n\nd[\"z\"] = 99\nprint(keys_copy)   # ['a', 'b', 'c'] — stale!\nprint(keys_view)   # dict_keys(['a', 'b', 'c', 'z']) — current\n```",
        },
        {
          kind: "mental-model",
          title: "A view is a window, not a photograph",
          analogy: "A list copy is a photograph of the dictionary at one moment. A view is a window — look through it now and you see the current state; look again later and you see whatever has changed.",
          explanation: "Views are memory-efficient (no copy) and always consistent. Use them for iteration. Take a list copy only when you need a stable snapshot that won't change as the dict changes.",
        },
      ],
      interactions: [
        {
          id: "s10-views-mc",
          kind: "multiple-choice",
          prompt: "After `d = {'a': 1}; view = d.keys(); d['b'] = 2`, what does `list(view)` return?",
          beginnerPurpose: "Confirm that dict views reflect subsequent changes to the dictionary",
          expectedConceptIds: ["dict-iteration"],
          options: [
            { id: "a", text: "['a']", isCorrect: false, explanation: "A view is live — it reflects changes made after it was created. Adding 'b' is visible." },
            { id: "b", text: "['a', 'b']", isCorrect: true, explanation: "Correct! The view reflects the dictionary's current state, including the newly added 'b' key." },
            { id: "c", text: "dict_keys(['a'])", isCorrect: false, explanation: "list(view) converts the view to a list, so it returns a list. And it includes 'b' since views are live." },
            { id: "d", text: "KeyError", isCorrect: false, explanation: "No error occurs. Iterating or converting a view is always safe." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "A dict_keys view is live — it always shows the current keys, including ones added after the view was created." }],
          feedback: { correct: "Correct! Views are live windows; adding 'b' is immediately visible through the view.", incorrect: "Views reflect current dict state. After d['b']=2, the view shows both 'a' and 'b'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-views-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.15 — Membership testing on keys ──────────────────────── */
    {
      id: "s10-membership-testing",
      stageId: "stage-10",
      title: "Membership Testing on Keys",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Test whether a key exists with `key in d`",
        "Test absence with `key not in d`",
        "Understand that `in` tests keys (not values) by default",
      ],
      prerequisites: [],
      concepts: ["dict-access"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `in` Tests Keys — Not Values\n\nThe `in` operator on a dictionary checks whether a given object is a **key**. It does not scan values:\n\n```python\nscores = {\"Alice\": 95, \"Bob\": 87}\n\nprint(\"Alice\" in scores)   # True  — 'Alice' is a key\nprint(\"Carol\" in scores)   # False — no such key\nprint(95 in scores)         # False — 95 is a VALUE, not a key\n```\n\n## `not in` for Absence\n\n```python\nif \"Carol\" not in scores:\n    scores[\"Carol\"] = 0    # initialize new entrant\n    print(\"Carol added\")\n```\n\n## Speed: O(1) Hash Lookup\n\nKey membership in a dict is constant time (O(1)) regardless of dictionary size. This is why dicts are preferred over lists when you need to check if something exists.\n\n```python\nimport time\n\n# Dict lookup — fast even at scale\nlookup = {i: True for i in range(1_000_000)}\nstart = time.perf_counter()\nresult = 999_999 in lookup\nelapsed = time.perf_counter() - start\nprint(f\"Found: {result}, time: {elapsed:.6f}s\")\n```",
        },
        {
          kind: "why-matters",
          body: "Dictionary membership testing is one of the most common operations in Python. Checking 'does this user ID exist?', 'is this word in my vocabulary?', 'have I visited this URL?' — all of these are O(1) hash lookups. It is the primary reason to choose a dict over a list for lookup-heavy code.",
        },
      ],
      interactions: [
        {
          id: "s10-membership-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Distinguish key membership from value membership",
          expectedConceptIds: ["dict-access"],
          code: "d = {\"a\": 1, \"b\": 2, \"c\": 3}\nprint(\"a\" in d)\nprint(1 in d)\nprint(\"d\" not in d)",
          expectedOutput: "True\nFalse\nTrue",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`in` tests keys only. 'a' is a key (True). 1 is a value, not a key (False). 'd' is not a key (not in → True)." }],
          feedback: { correct: "Correct! 'a' is a key (True), 1 is a value not a key (False), 'd' is absent so 'not in' is True.", incorrect: "`in` checks keys. 'a' is a key (True). 1 is a value (False for key check). 'd' has no key (not in → True)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-membership-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.16 — Counting with dictionaries ──────────────────────── */
    {
      id: "s10-counting-dicts",
      stageId: "stage-10",
      title: "Counting with Dictionaries",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Build a frequency counter manually using a dict",
        "Use collections.Counter for the same result with less code",
        "Find the most common elements with Counter.most_common()",
      ],
      prerequisites: [],
      concepts: ["dict-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Manual Counting Pattern\n\nCount occurrences by mapping each item to its count:\n\n```python\nwords = [\"the\", \"cat\", \"sat\", \"on\", \"the\", \"mat\", \"the\"]\n\ncounts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1\n\nprint(counts)\n# {'the': 3, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1}\n```\n\n## collections.Counter — Same Result, Less Code\n\n`Counter` is a dict subclass designed for counting:\n\n```python\nfrom collections import Counter\n\ncounts = Counter(words)\nprint(counts)\n# Counter({'the': 3, 'cat': 1, 'sat': 1, 'on': 1, 'mat': 1})\n\n# Most common N elements\nprint(counts.most_common(2))\n# [('the', 3), ('cat', 1)]\n\n# Missing keys return 0, not KeyError\nprint(counts[\"dog\"])   # 0\n```\n\n## Counter Arithmetic\n\nCounters support addition, subtraction, and intersection:\n\n```python\na = Counter([\"x\", \"x\", \"y\"])\nb = Counter([\"x\", \"z\"])\n\nprint(a + b)   # Counter({'x': 3, 'y': 1, 'z': 1})\nprint(a - b)   # Counter({'x': 1, 'y': 1})\n```",
        },
        {
          kind: "why-matters",
          body: "Counting frequencies is one of the most common programming tasks: word frequencies in text, histogram data for charts, vote tallies, page view counts, error rates. Knowing both the manual pattern and `Counter` makes you effective in any context.",
        },
      ],
      interactions: [
        {
          id: "s10-counting-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace the manual counting pattern with .get()",
          expectedConceptIds: ["dict-iteration"],
          code: "items = [\"a\", \"b\", \"a\", \"c\", \"a\", \"b\"]\ncounts = {}\nfor x in items:\n    counts[x] = counts.get(x, 0) + 1\nprint(counts[\"a\"], counts[\"b\"], counts[\"c\"])",
          expectedOutput: "3 2 1",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Each pass: get the current count (0 if absent) and add 1. Count 'a' three times, 'b' twice, 'c' once." }],
          feedback: { correct: "Correct! 'a' appears 3 times, 'b' twice, 'c' once.", incorrect: "counts.get(x, 0)+1 adds 1 to the existing count (or starts at 0). Count 'a' 3 times, 'b' 2 times, 'c' 1 time." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-counting-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.17 — Grouping with dictionaries ──────────────────────── */
    {
      id: "s10-grouping-dicts",
      stageId: "stage-10",
      title: "Grouping with Dictionaries",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Group items into categories using a dict of lists",
        "Use collections.defaultdict to avoid missing-key initialization",
        "Apply grouping to real data (classifying records by category)",
      ],
      prerequisites: [],
      concepts: ["dict-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Grouping: Dict of Lists\n\nGroup items by category by mapping each category to a list of its members:\n\n```python\nemployees = [\n    (\"Alice\", \"Engineering\"),\n    (\"Bob\",   \"Marketing\"),\n    (\"Carol\", \"Engineering\"),\n    (\"Dave\",  \"Marketing\"),\n    (\"Eve\",   \"Engineering\"),\n]\n\nby_dept = {}\nfor name, dept in employees:\n    if dept not in by_dept:\n        by_dept[dept] = []   # initialize the bucket\n    by_dept[dept].append(name)\n\nprint(by_dept)\n# {'Engineering': ['Alice', 'Carol', 'Eve'], 'Marketing': ['Bob', 'Dave']}\n```\n\n## defaultdict — Skip the Initialization Check\n\n`collections.defaultdict` automatically creates a default value for any new key, eliminating the `if dept not in` guard:\n\n```python\nfrom collections import defaultdict\n\nby_dept = defaultdict(list)   # missing keys auto-init to []\nfor name, dept in employees:\n    by_dept[dept].append(name)   # no if-check needed\n\nprint(dict(by_dept))   # same result as above\n```\n\n## Common defaultdict Factories\n\n```python\nfrom collections import defaultdict\n\nint_dd  = defaultdict(int)    # missing key → 0\nlist_dd = defaultdict(list)   # missing key → []\nset_dd  = defaultdict(set)    # missing key → set()\n```",
        },
        {
          kind: "mental-model",
          title: "Grouping as sorting mail into labelled trays",
          analogy: "Each category is a tray. For each piece of mail (item), you find its tray (key), creating a new tray if needed, and drop it in. The final result is all mail sorted into their trays.",
          explanation: "defaultdict is like having an assistant who automatically creates a new empty tray whenever you ask for one that doesn't exist yet. You never need to check 'does this tray exist?' first.",
        },
      ],
      interactions: [
        {
          id: "s10-grouping-run",
          kind: "run-code",
          prompt: "Group the given words by their first letter into a dict of lists. Print each letter and its words, sorted alphabetically by letter.",
          beginnerPurpose: "Implement the grouping pattern from scratch",
          expectedConceptIds: ["dict-iteration"],
          starterCode: `words = ["apple", "avocado", "banana", "blueberry", "cherry", "apricot"]

# Group by first letter
by_letter = {}
# your code here

for letter in sorted(by_letter):
    print(letter, by_letter[letter])`,
          task: "Print: a ['apple', 'avocado', 'apricot']  b ['banana', 'blueberry']  c ['cherry']",
          expectedOutputContains: ["a", "apple", "b", "banana", "c", "cherry"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Use word[0] as the key. Check `if key not in by_letter: by_letter[key] = []` then `.append(word)`." }],
          feedback: { correct: "Correct! Group by first letter using word[0] as key, then sort the outer keys.", incorrect: "For each word, use word[0] as the dict key. Initialize the list if absent, then append." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-grouping-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.18 — Lookup tables ───────────────────────────────────── */
    {
      id: "s10-lookup-tables",
      stageId: "stage-10",
      title: "Lookup Tables",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Replace long if/elif chains with dictionary lookup tables",
        "Map codes to values, labels, or callables",
        "Use .get() with a default for unrecognized inputs",
      ],
      prerequisites: [],
      concepts: ["dict-access"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem: Long if/elif Chains\n\nWhen you need to map one value to another based on a fixed set of cases, an if/elif chain works but becomes unwieldy:\n\n```python\n# Fragile and verbose\ndef get_day_name(day_num):\n    if day_num == 0:   return \"Monday\"\n    elif day_num == 1: return \"Tuesday\"\n    elif day_num == 2: return \"Wednesday\"\n    # ...\n    else:              return \"Unknown\"\n```\n\n## The Solution: Dictionary Lookup Table\n\n```python\nDAY_NAMES = {\n    0: \"Monday\",  1: \"Tuesday\",  2: \"Wednesday\",\n    3: \"Thursday\", 4: \"Friday\",  5: \"Saturday\",  6: \"Sunday\",\n}\n\ndef get_day_name(day_num):\n    return DAY_NAMES.get(day_num, \"Unknown\")\n\nprint(get_day_name(2))    # Wednesday\nprint(get_day_name(99))   # Unknown\n```\n\n## Mapping Codes to Actions (Dispatch Table)\n\nValues can be callables — making a dispatch table:\n\n```python\ndef double(x): return x * 2\ndef square(x): return x ** 2\ndef negate(x): return -x\n\noperations = {\"double\": double, \"square\": square, \"negate\": negate}\n\nop = \"square\"\nresult = operations.get(op, lambda x: x)(5)   # 25\nprint(result)\n```",
        },
        {
          kind: "comparison",
          leftLabel: "if/elif chain",
          rightLabel: "Lookup table",
          leftCode: "def translate(word):\n    if word == \"hello\":\n        return \"hola\"\n    elif word == \"bye\":\n        return \"adios\"\n    elif word == \"thanks\":\n        return \"gracias\"\n    else:\n        return word",
          rightCode: "TRANSLATIONS = {\n    \"hello\":  \"hola\",\n    \"bye\":    \"adios\",\n    \"thanks\": \"gracias\",\n}\n\ndef translate(word):\n    return TRANSLATIONS.get(word, word)",
        },
        {
          kind: "why-matters",
          body: "Lookup tables are faster (O(1) hash lookup vs O(n) if/elif scan), easier to extend (just add a dict entry), and easier to test (the data is separate from the logic). They are a fundamental design pattern in Python.",
        },
      ],
      interactions: [
        {
          id: "s10-lookup-fill",
          kind: "fill-code",
          prompt: "Fill in the blank to complete the lookup table so `get_color('error')` returns 'red'.",
          beginnerPurpose: "Build a simple lookup table and use .get() for safe access",
          expectedConceptIds: ["dict-access"],
          codeTemplate: "COLORS = {\n    \"success\": \"green\",\n    \"warning\": \"yellow\",\n    \"error\": ____,\n}\n\ndef get_color(status):\n    return COLORS.get(status, \"grey\")\n\nprint(get_color(\"error\"))\nprint(get_color(\"unknown\"))",
          blanks: [{ placeholder: "____", answer: '"red"', caseSensitive: false }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The value must be a string. Use 'red' (with quotes) as the value for the 'error' key." }],
          feedback: { correct: "Correct! COLORS['error'] = 'red'; get_color('error') returns 'red'.", incorrect: "Set the value to the string 'red' (with quotes) as the value for the 'error' key." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-lookup-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.19 — Configuration dictionaries ──────────────────────── */
    {
      id: "s10-config-dicts",
      stageId: "stage-10",
      title: "Configuration Dictionaries",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use dictionaries to store application configuration",
        "Layer multiple sources (defaults, file, env, args) using dict merging",
        "Access configuration values with .get() and sensible defaults",
      ],
      prerequisites: [],
      concepts: ["dict-access"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Configuration as a Dict\n\nConfiguration is naturally a mapping from setting names to values:\n\n```python\nDEFAULTS = {\n    \"host\":     \"localhost\",\n    \"port\":     8080,\n    \"debug\":    False,\n    \"timeout\":  30,\n    \"log_level\": \"INFO\",\n}\n```\n\n## Layering Configuration Sources\n\nReal applications layer config from multiple sources, with later sources overriding earlier ones:\n\n```python\nimport os\n\ndef load_config(user_args: dict = None) -> dict:\n    # Start with defaults\n    config = DEFAULTS.copy()\n\n    # Overlay file-based config (if it existed)\n    file_config = {\"timeout\": 60, \"log_level\": \"DEBUG\"}\n    config |= file_config\n\n    # Overlay environment variables\n    env_config = {}\n    if \"APP_PORT\" in os.environ:\n        env_config[\"port\"] = int(os.environ[\"APP_PORT\"])\n    config |= env_config\n\n    # Overlay command-line arguments (highest priority)\n    if user_args:\n        config |= user_args\n\n    return config\n\nconfig = load_config({\"debug\": True})\nprint(config[\"host\"])       # localhost  (from defaults)\nprint(config[\"log_level\"])  # DEBUG      (from file)\nprint(config[\"debug\"])      # True       (from args)\n```\n\n## Accessing Config Values Safely\n\n```python\n# Required config — error if missing\nport = config[\"port\"]          # KeyError if absent — intentional\n\n# Optional config — use default\nworkers = config.get(\"workers\", 4)\nname    = config.get(\"app_name\", \"MyApp\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "This pattern is how Flask, Django, and most frameworks work",
          body: "Most Python web frameworks use exactly this layering pattern: global defaults, then instance config, then environment variables, then per-request overrides. Understanding dict merging unlocks how these frameworks are configured.",
        },
      ],
      interactions: [
        {
          id: "s10-config-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace config layering using the | merge operator",
          expectedConceptIds: ["dict-access"],
          code: "defaults = {\"debug\": False, \"port\": 8080, \"timeout\": 30}\noverrides = {\"debug\": True, \"port\": 9000}\nconfig = defaults | overrides\nprint(config[\"debug\"], config[\"port\"], config[\"timeout\"])",
          expectedOutput: "True 9000 30",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Right side wins on conflict: debug and port come from overrides. timeout is only in defaults." }],
          feedback: { correct: "Correct! overrides win for debug and port; timeout comes from defaults unchanged.", incorrect: "The | operator: right-side dict wins on conflict. debug=True, port=9000 from overrides. timeout=30 from defaults." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-config-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 10.20 — Dictionary modeling project ─────────────────────── */
    {
      id: "s10-dict-project",
      stageId: "stage-10",
      title: "Dictionary Modeling Project",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Design a data model using nested dictionaries",
        "Implement counting, grouping, and lookup patterns in one program",
        "Apply .get(), .items(), merge operators, and defaultdict together",
      ],
      prerequisites: [],
      concepts: ["dict-creation", "dict-access", "dict-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project: Student Grade Tracker\n\nBuild a grade tracker that stores student records, computes statistics, groups students by grade letter, and supports lookup by student ID.\n\n### Data Model\n\n```python\n# Each student: id -> {name, scores, grade}\nstudents = {\n    \"s001\": {\"name\": \"Alice\",  \"scores\": [92, 88, 95, 90]},\n    \"s002\": {\"name\": \"Bob\",    \"scores\": [70, 65, 72, 68]},\n    \"s003\": {\"name\": \"Carol\",  \"scores\": [85, 88, 82, 89]},\n    \"s004\": {\"name\": \"Dave\",   \"scores\": [55, 60, 58, 62]},\n    \"s005\": {\"name\": \"Eve\",    \"scores\": [98, 95, 97, 99]},\n}\n\n# Grade boundaries\nGRADE_TABLE = {\n    (90, 101): \"A\",\n    (80, 90):  \"B\",\n    (70, 80):  \"C\",\n    (60, 70):  \"D\",\n    (0,  60):  \"F\",\n}\n\ndef compute_average(scores):\n    return sum(scores) / len(scores)\n\ndef get_letter_grade(average):\n    for (low, high), letter in GRADE_TABLE.items():\n        if low <= average < high:\n            return letter\n    return \"F\"\n```\n\n### Processing: Add Averages and Grades\n\n```python\nfor student in students.values():\n    avg = compute_average(student[\"scores\"])\n    student[\"average\"] = round(avg, 1)\n    student[\"grade\"]   = get_letter_grade(avg)\n```\n\n### Grouping by Grade Letter\n\n```python\nfrom collections import defaultdict\n\nby_grade = defaultdict(list)\nfor sid, student in students.items():\n    by_grade[student[\"grade\"]].append(student[\"name\"])\n\nfor grade in sorted(by_grade):\n    print(f\"{grade}: {', '.join(by_grade[grade])}\")\n# A: Alice, Eve\n# B: Carol\n# C: Bob\n# D: Dave\n```\n\n### Summary Statistics\n\n```python\nall_avgs = [s[\"average\"] for s in students.values()]\nprint(f\"Class avg: {sum(all_avgs)/len(all_avgs):.1f}\")\nprint(f\"Top score: {max(all_avgs):.1f}\")\nprint(f\"Low score: {min(all_avgs):.1f}\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Patterns used in this project",
          body: "Nested dicts for structured records; dict as a lookup table (GRADE_TABLE); .items() iteration; defaultdict for grouping; list comprehension over .values() for aggregate stats. Each pattern appears independently in real codebases.",
        },
      ],
      interactions: [
        {
          id: "s10-project-run",
          kind: "run-code",
          prompt: "Given the scores dict, compute the average for each student and print their name and average, sorted by average descending.",
          beginnerPurpose: "Combine dict iteration, computation, and sorting in one program",
          expectedConceptIds: ["dict-creation", "dict-access", "dict-iteration"],
          starterCode: `students = {
    "Alice": [92, 88, 95, 90],
    "Bob":   [70, 65, 72, 68],
    "Carol": [85, 88, 82, 89],
}

# Compute average for each student and print sorted by average descending
`,
          task: "Print each student and their average, in descending average order. Format: 'Alice: 91.2'",
          expectedOutputContains: ["Alice", "Carol", "Bob"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Build a list of (name, avg) tuples, sort by -avg, then print each. Use sum(scores)/len(scores) for average." }],
          feedback: { correct: "Correct! Alice has the highest average, then Carol, then Bob.", incorrect: "Compute avg = sum(scores)/len(scores) for each, collect into a list of (name, avg), sort by -avg, then print." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s10-project-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s10-project",
    stageId: "stage-10",
    title: "Dictionary-Powered Data Store",
    brief:
      "Build a small in-memory data store that uses nested dictionaries to hold product records, supports CRUD operations via key access, provides counting and grouping by category, and uses a lookup table for status labels. The project integrates all core dict patterns from the stage.",
    requirements: [
      "Store product records as a nested dict: product_id -> {name, category, price, stock}",
      "Implement add_product, get_product, update_stock, and delete_product functions",
      "Implement count_by_category that returns a dict of category -> product count",
      "Implement group_by_category that returns a dict of category -> list of product names",
      "Use a lookup table dict to map stock levels (0, 1-10, 10+) to status labels",
    ],
    acceptanceCriteria: [
      "All CRUD operations work correctly with proper KeyError handling",
      "count_by_category and group_by_category return correct results",
      "Lookup table returns correct status labels for all stock ranges",
      "No linear if/elif chains where a dict lookup table would be cleaner",
    ],
    conceptIds: ["dict-creation", "dict-access", "dict-iteration"],
    difficulty: "intermediate",
  },
} satisfies Stage;
