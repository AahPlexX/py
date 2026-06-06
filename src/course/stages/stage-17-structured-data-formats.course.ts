import type { Stage } from "@/course/course.schema";

export const stage17 = {
  id: "stage-17",
  number: 17,
  title: "Structured Data Formats",
  summary:
    "Read and write JSON, CSV, INI, TOML, XML, and HTML in Python. Understand serialization limits, validation boundaries, and build a data import/export utility.",
  level: "intermediate",
  masteryGateConceptIds: ["json-parsing", "csv-reading", "configparser-basics"],
  lessons: [
    // ─── 17.1 JSON Concepts ───────────────────────────────────────────────────
    {
      id: "s17-json-concepts",
      stageId: "stage-17",
      title: "JSON Concepts",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain what JSON is and where it is used",
        "Map JSON types to their Python equivalents",
        "Recognise valid vs invalid JSON by inspection",
      ],
      prerequisites: [],
      concepts: ["json-parsing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nData does not live only inside one Python process. It travels over networks, gets written to files, and is read by programs written in completely different languages. For all of that to work, both ends must agree on a **format** — a shared grammar for laying bytes out on disk or on the wire.\n\nJSON (JavaScript Object Notation) became the dominant format for this because it is human-readable, language-agnostic, and simple enough to parse in about 200 lines of code.",
        },
        {
          kind: "why-matters",
          body: "REST APIs almost universally speak JSON. Config files, local caches, and inter-service messages are often JSON. Every Python developer who touches the outside world needs to read and write it fluently.",
        },
        {
          kind: "text",
          markdown:
            "## 2 — Prerequisites Check\n\nYou need to know Python's built-in types (`str`, `int`, `float`, `bool`, `None`, `list`, `dict`) and how to open files. You do not need to know anything about JavaScript.",
        },
        {
          kind: "text",
          markdown:
            "## 3 — Core Concepts\n\n### The Need\nTwo programs need to exchange a user record. How? If they both speak Python we could use `pickle`, but the other end might be a Go server. We need a format both sides understand.\n\n### Plain Construction\nImagine writing down a dictionary as text, but following strict rules that every language in the world agrees on. JSON is exactly that.\n\n### The Name\n**JSON** — JavaScript Object Notation. Invented by Douglas Crockford in the early 2000s, but now defined by RFC 8259 and ISO 21778, neither of which mention JavaScript.\n\n### The Example",
        },
        {
          kind: "code",
          language: "json",
          code: '{\n  "name": "Alice",\n  "age": 30,\n  "active": true,\n  "score": 9.5,\n  "tags": ["admin", "beta"],\n  "address": null\n}',
          caption: "A valid JSON object with every JSON type represented",
        },
        {
          kind: "text",
          markdown:
            "### Type Mapping\n\nJSON has six value types. Python's `json` module maps them bidirectionally:\n\n| JSON | Python |\n|------|--------|\n| object `{}` | `dict` |\n| array `[]` | `list` |\n| string `\"\"` | `str` |\n| number (integer) | `int` |\n| number (float) | `float` |\n| `true` / `false` | `True` / `False` |\n| `null` | `None` |",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "JSON strings use double quotes only",
          body: "Single quotes are not valid JSON. `{'name': 'Alice'}` is Python, not JSON. The JSON module will raise `json.JSONDecodeError` if it encounters single quotes.",
        },
        {
          kind: "text",
          markdown:
            "## 4 — Variations and Cases\n\nJSON supports deeply nested structures — objects inside arrays inside objects. There is no depth limit in the spec, though Python's parser has a configurable recursion limit.",
        },
        {
          kind: "text",
          markdown:
            "## 5 — Breakdown Cases\n\nCommon mistakes when writing JSON by hand:\n- Trailing comma after the last item in an object or array\n- Using single quotes instead of double quotes\n- Writing `True`/`False`/`None` (Python literals) instead of `true`/`false`/`null`",
        },
        {
          kind: "text",
          markdown:
            "## 6 — What This Opens Up\n\nWith JSON as a shared language you can call web APIs, read config files, cache data between runs, and send messages between microservices.",
        },
        {
          kind: "text",
          markdown:
            "## 7 — Comprehension Check\n\nWhat Python type does the JSON value `null` map to? What about a JSON array?",
        },
      ],
      interactions: [
        {
          id: "s17-json-concepts-mc",
          kind: "multiple-choice",
          prompt: "Which Python type does the JSON value `null` map to?",
          beginnerPurpose: "Confirm you have memorised the JSON-to-Python type table",
          expectedConceptIds: ["json-parsing"],
          options: [
            { id: "a", text: "0", isCorrect: false, explanation: "Zero is a number, not the absence of a value." },
            { id: "b", text: "None", isCorrect: true, explanation: "Python's `None` singleton represents the absence of a value, matching JSON `null`." },
            { id: "c", text: "False", isCorrect: false, explanation: "`False` corresponds to JSON `false`, not `null`." },
            { id: "d", text: "\"null\"", isCorrect: false, explanation: "The string `\"null\"` is a JSON string, not the JSON null literal." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Look at the JSON-to-Python type table in the lesson." }],
          feedback: {
            correct: "Correct! `null` → `None` is the mapping.",
            incorrect: "Review the type mapping table. JSON `null` has a direct Python equivalent.",
          },
        },
        {
          id: "s17-json-concepts-predict",
          kind: "predict-output",
          prompt: "What Python type will `json.loads` produce for the top-level value in this JSON?",
          beginnerPurpose: "Practise tracing the type mapping mentally",
          expectedConceptIds: ["json-parsing"],
          code: 'import json\ndata = json.loads(\'[1, 2, 3]\')\nprint(type(data).__name__)',
          expectedOutput: "list",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "A JSON array `[...]` maps to which Python type?" }],
          feedback: {
            correct: "Correct — JSON arrays become Python lists.",
            incorrect: "JSON arrays `[...]` map to Python `list`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-parsing", recallPrompt: "Name the six JSON value types and their Python equivalents.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-json-concepts-mc", "s17-json-concepts-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.2 json.loads() ────────────────────────────────────────────────────
    {
      id: "s17-json-loads",
      stageId: "stage-17",
      title: "json.loads() — Parse JSON String to Python Object",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use `json.loads()` to convert a JSON string into a Python object",
        "Handle `json.JSONDecodeError` when the input is malformed",
      ],
      prerequisites: ["s17-json-concepts"],
      concepts: ["json-parsing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nYou have received a string from an API response. It looks like `'{\"id\": 1, \"name\": \"Bob\"}'`. You need Python objects — a dict — not a raw string. `json.loads()` (loads = **load string**) is the bridge.",
        },
        {
          kind: "why-matters",
          body: "Every HTTP response from a JSON API arrives as a string. `json.loads()` is one of the most-called functions in real Python codebases.",
        },
        {
          kind: "code",
          language: "python",
          code: 'import json\n\nraw = \'{"id": 1, "name": "Bob", "active": true}\'\ndata = json.loads(raw)\n\nprint(data["name"])   # Bob\nprint(data["active"]) # True\nprint(type(data))     # <class \'dict\'>',
          caption: "`json.loads()` converts a JSON string to a Python dict",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "The 's' in loads stands for 'string'",
          body: "The naming convention: `json.loads()` reads from a **s**tring. `json.load()` reads from a **f**ile-like object. They differ by that one letter.",
        },
        {
          kind: "text",
          markdown:
            "## Error Handling\n\nIf the input is not valid JSON, Python raises `json.JSONDecodeError` (a subclass of `ValueError`):",
        },
        {
          kind: "code",
          language: "python",
          code: "import json\n\ntry:\n    data = json.loads(\"{bad json}\")\nexcept json.JSONDecodeError as e:\n    print(f\"Parse error: {e}\")",
          caption: "Always guard untrusted input with a try/except",
        },
        {
          kind: "text",
          markdown:
            "## Variations\n\n`json.loads()` accepts `bytes` and `bytearray` in addition to `str`. Python decodes the bytes as UTF-8 (or detects the encoding from the BOM if present). This is useful when the HTTP library gives you raw bytes.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Deeply nested JSON can hit Python's recursion limit",
          body: "Very deeply nested JSON (thousands of levels) raises `RecursionError`. Real-world JSON rarely exceeds 10 levels, so this is usually not an issue.",
        },
      ],
      interactions: [
        {
          id: "s17-json-loads-fill",
          kind: "fill-code",
          prompt: "Fill in the blank to parse the JSON string and print the user's email.",
          beginnerPurpose: "Practise the exact `json.loads()` call pattern",
          expectedConceptIds: ["json-parsing"],
          codeTemplate: 'import json\n\nraw = \'{"email": "alice@example.com"}\'\ndata = json._____(raw)\nprint(data["email"])',
          blanks: [{ placeholder: "_____", answer: "loads", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The function name is loads (load + string)." }],
          feedback: {
            correct: "Correct! `json.loads()` parses a JSON string.",
            incorrect: "The function is `json.loads()` — reads a JSON **s**tring.",
          },
        },
        {
          id: "s17-json-loads-debug",
          kind: "debug-code",
          prompt: "This code crashes. Find and fix the bug.",
          beginnerPurpose: "Recognise a malformed JSON string",
          expectedConceptIds: ["json-parsing"],
          brokenCode: "import json\ndata = json.loads(\"{'key': 'value'}\")\nprint(data)",
          bugDescription: "Single quotes are not valid JSON — the string uses Python dict syntax instead of JSON syntax.",
          fixedCode: 'import json\ndata = json.loads(\'{"key": "value"}\')\nprint(data)',
          errorType: "json.JSONDecodeError",
          allowedAttempts: 4,
          hints: [
            { level: "concept", text: "JSON requires double quotes for strings." },
            { level: "syntax", text: "Change the single quotes inside the JSON string to double quotes." },
          ],
          feedback: {
            correct: "Right! JSON demands double quotes around strings and keys.",
            incorrect: "JSON strings must use double quotes, not single quotes.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-parsing", recallPrompt: "What exception does `json.loads()` raise on invalid JSON?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-json-loads-fill", "s17-json-loads-debug"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.3 json.dumps() ────────────────────────────────────────────────────
    {
      id: "s17-json-dumps",
      stageId: "stage-17",
      title: "json.dumps() — Serialize Python to JSON String",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use `json.dumps()` to convert Python objects to a JSON string",
        "Control formatting with `indent`, `sort_keys`, and `separators`",
      ],
      prerequisites: ["s17-json-loads"],
      concepts: ["json-parsing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nYou have built a Python dict and need to send it over the network as JSON. `json.dumps()` (dumps = **dump to string**) serializes Python objects into a JSON-formatted string.",
        },
        {
          kind: "code",
          language: "python",
          code: 'import json\n\nuser = {"id": 42, "name": "Carol", "active": True, "score": None}\njson_str = json.dumps(user)\nprint(json_str)\n# {"id": 42, "name": "Carol", "active": true, "score": null}',
          caption: "Python `True` becomes JSON `true`; `None` becomes `null`",
        },
        {
          kind: "text",
          markdown:
            "## Formatting Options\n\nFor human-readable output, pass `indent`:",
        },
        {
          kind: "code",
          language: "python",
          code: 'import json\n\ndata = {"a": 1, "b": [2, 3]}\nprint(json.dumps(data, indent=2))\n# {\n#   "a": 1,\n#   "b": [\n#     2,\n#     3\n#   ]\n# }',
          caption: "`indent=2` produces pretty-printed output",
        },
        {
          kind: "text",
          markdown:
            "Use `sort_keys=True` to get alphabetically sorted keys — useful for deterministic output (e.g., in tests or config files).\n\nFor compact network payloads use `separators=(',', ':')` to remove whitespace:",
        },
        {
          kind: "code",
          language: "python",
          code: 'import json\nprint(json.dumps({"b": 2, "a": 1}, sort_keys=True, separators=(\',\', \':\')))\n# {"a":1,"b":2}',
          caption: "Compact, sorted output for wire efficiency",
        },
        {
          kind: "why-matters",
          body: "Web frameworks, CLI tools, config writers — all use `json.dumps()`. Controlling formatting lets you produce both human-readable logs and compact wire payloads from the same data.",
        },
      ],
      interactions: [
        {
          id: "s17-json-dumps-predict",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Trace the Python-to-JSON type conversion in your head",
          expectedConceptIds: ["json-parsing"],
          code: 'import json\nprint(json.dumps({"ok": True, "val": None}))',
          expectedOutput: '{"ok": true, "val": null}',
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Python `True` → JSON `true`, Python `None` → JSON `null`." }],
          feedback: {
            correct: "Correct! The Python-to-JSON type conversion flips the capitalization.",
            incorrect: "Remember: Python `True` → JSON `true`, Python `None` → JSON `null`.",
          },
        },
        {
          id: "s17-json-dumps-run",
          kind: "run-code",
          prompt: "Write a function `to_json(obj)` that returns a pretty-printed JSON string with 4-space indentation and sorted keys.",
          beginnerPurpose: "Practise combining `json.dumps` keyword arguments",
          expectedConceptIds: ["json-parsing"],
          starterCode: "import json\n\ndef to_json(obj):\n    # Your code here\n    pass\n\nprint(to_json({\"b\": 2, \"a\": 1}))",
          task: "Return `json.dumps(obj, indent=4, sort_keys=True)`",
          expectedOutputContains: ['"a": 1', '"b": 2'],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "syntax", text: "Pass `indent=4` and `sort_keys=True` to `json.dumps()`." },
          ],
          feedback: {
            correct: "Well done! You can control formatting with keyword arguments.",
            incorrect: "Pass `indent=4` and `sort_keys=True` to `json.dumps()`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-parsing", recallPrompt: "Which keyword argument to `json.dumps()` produces indented output?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-json-dumps-predict", "s17-json-dumps-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.4 json.load() ─────────────────────────────────────────────────────
    {
      id: "s17-json-load",
      stageId: "stage-17",
      title: "json.load() — Read JSON from File",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use `json.load()` to read a JSON file directly into a Python object",
        "Compare `json.load()` with `json.loads()`",
      ],
      prerequisites: ["s17-json-loads"],
      concepts: ["json-parsing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nOften your JSON data lives in a file rather than a string variable. While you could do `json.loads(open('data.json').read())`, the standard library provides a shortcut: `json.load(file_object)`.",
        },
        {
          kind: "comparison",
          leftLabel: "json.loads() — string input",
          rightLabel: "json.load() — file input",
          leftCode: 'import json\n\nwith open("data.json") as f:\n    raw = f.read()\ndata = json.loads(raw)',
          rightCode: 'import json\n\nwith open("data.json") as f:\n    data = json.load(f)',
          caption: "`json.load()` combines reading and parsing in one step",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always use a context manager",
          body: "Use `with open(...) as f:` so the file is closed automatically, even if parsing raises an exception.",
        },
        {
          kind: "text",
          markdown:
            "## Under the Hood\n\n`json.load(f)` calls `f.read()` internally and then calls `json.loads()` on the result. The only real advantage is convenience — you do not need an intermediate string variable.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Encoding matters",
          body: "JSON files must be UTF-8 (or UTF-16/UTF-32 with a BOM). Open the file with `encoding='utf-8'` explicitly on Windows to avoid surprises from the system default codepage.",
        },
      ],
      interactions: [
        {
          id: "s17-json-load-reorder",
          kind: "reorder-code",
          prompt: "Arrange these lines into a valid program that reads a JSON file and prints the 'title' field.",
          beginnerPurpose: "Practise the open-then-load pattern in the correct order",
          expectedConceptIds: ["json-parsing"],
          lines: [
            "import json",
            'with open("book.json", encoding="utf-8") as f:',
            "    data = json.load(f)",
            'print(data["title"])',
          ],
          correctOrder: [0, 1, 2, 3],
          allowedAttempts: 3,
          hints: [{ level: "structural", text: "Import comes first, then open the file, then parse, then use the data." }],
          feedback: {
            correct: "Perfect order!",
            incorrect: "You must import before using, and load inside the `with` block.",
          },
        },
        {
          id: "s17-json-load-mc",
          kind: "multiple-choice",
          prompt: "What does `json.load()` accept as its argument?",
          beginnerPurpose: "Distinguish `json.load` from `json.loads`",
          expectedConceptIds: ["json-parsing"],
          options: [
            { id: "a", text: "A file path string like `'data.json'`", isCorrect: false, explanation: "`json.load()` takes a file object, not a path string. Use `open()` first." },
            { id: "b", text: "A file-like object (already opened)", isCorrect: true, explanation: "Correct — you open the file first, then pass the file object to `json.load()`." },
            { id: "c", text: "A JSON-formatted string", isCorrect: false, explanation: "`json.loads()` (with an 's') accepts a string." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The 's' in `loads` stands for string. What does that tell you about `load` (without the 's')?" }],
          feedback: {
            correct: "Right! `json.load()` takes an open file object.",
            incorrect: "`json.load()` reads from an open file object. `json.loads()` reads from a string.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-parsing", recallPrompt: "What is the difference between `json.load()` and `json.loads()`?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-json-load-reorder", "s17-json-load-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.5 json.dump() ─────────────────────────────────────────────────────
    {
      id: "s17-json-dump",
      stageId: "stage-17",
      title: "json.dump() — Write JSON to File",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use `json.dump()` to write a Python object as JSON directly to a file",
        "Choose appropriate keyword arguments for readability and safety",
      ],
      prerequisites: ["s17-json-dumps", "s17-json-load"],
      concepts: ["json-parsing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nYou have built a Python data structure and need to persist it. `json.dump(obj, file)` writes the JSON directly to an open file — no intermediate string variable needed.",
        },
        {
          kind: "code",
          language: "python",
          code: 'import json\n\nrecord = {"user": "Dave", "score": 99, "verified": True}\n\nwith open("record.json", "w", encoding="utf-8") as f:\n    json.dump(record, f, indent=2)',
          caption: "Write a Python dict to a JSON file with pretty-printing",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Open the file in write mode (`'w'`)",
          body: "Forgetting the `'w'` mode will raise a `TypeError` because the default `'r'` mode does not support writing.",
        },
        {
          kind: "text",
          markdown:
            "## ensure_ascii\n\nBy default `json.dump()` escapes all non-ASCII characters (e.g. `é` → `\\u00e9`). To keep Unicode characters as-is in the file, pass `ensure_ascii=False`:",
        },
        {
          kind: "code",
          language: "python",
          code: 'import json\n\ndata = {"city": "Montréal"}\nwith open("city.json", "w", encoding="utf-8") as f:\n    json.dump(data, f, ensure_ascii=False, indent=2)',
          caption: "Preserves `é` instead of writing `\\u00e9`",
        },
        {
          kind: "why-matters",
          body: "Persisting state to JSON files is a simple, dependency-free alternative to databases for small amounts of data. Config files, caches, and test fixtures are often JSON.",
        },
      ],
      interactions: [
        {
          id: "s17-json-dump-fill",
          kind: "fill-code",
          prompt: "Fill in the blanks to write `data` to `output.json` with 4-space indentation.",
          beginnerPurpose: "Practise the `json.dump()` signature",
          expectedConceptIds: ["json-parsing"],
          codeTemplate: 'import json\ndata = {"x": 1}\nwith open("output.json", "w", encoding="utf-8") as f:\n    json._____(data, f, indent=_____)',
          blanks: [
            { placeholder: "_____", answer: "dump", caseSensitive: true },
            { placeholder: "_____", answer: "4", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The function is `json.dump()` (no 's'). The indent keyword takes an integer." },
          ],
          feedback: {
            correct: "Correct! `json.dump(obj, file, indent=4)` writes pretty JSON.",
            incorrect: "Use `json.dump()` (not `json.dumps()`). The second argument is the open file object.",
          },
        },
        {
          id: "s17-json-dump-mc",
          kind: "multiple-choice",
          prompt: "Which call correctly writes a Python dict to a JSON file?",
          beginnerPurpose: "Distinguish correct from incorrect `json.dump` usage",
          expectedConceptIds: ["json-parsing"],
          options: [
            { id: "a", text: "`json.dump(data, 'out.json')`", isCorrect: false, explanation: "The second argument must be an open file object, not a filename string." },
            { id: "b", text: "`json.dumps(data, open('out.json', 'w'))`", isCorrect: false, explanation: "`json.dumps()` returns a string; it does not accept a file argument." },
            { id: "c", text: "`with open('out.json', 'w') as f: json.dump(data, f)`", isCorrect: true, explanation: "Correct pattern: open the file, then pass the file object." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "`json.dump()` needs an already-opened file object as its second argument." }],
          feedback: {
            correct: "Perfect! Always open the file yourself and pass the file object.",
            incorrect: "You must open the file first and pass the file object — not the filename.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-parsing", recallPrompt: "What does `ensure_ascii=False` do in `json.dump()`?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-json-dump-fill", "s17-json-dump-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.6 JSON Serialization Limits ───────────────────────────────────────
    {
      id: "s17-json-limits",
      stageId: "stage-17",
      title: "JSON Serialization Limits",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "List the Python types that cannot be directly serialized to JSON",
        "Implement a custom `default` function to extend JSON serialization",
      ],
      prerequisites: ["s17-json-dumps"],
      concepts: ["json-parsing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nNot every Python object can be converted to JSON. `datetime`, `set`, `bytes`, and custom class instances all raise `TypeError` when you try to `json.dumps()` them. You need to know what is off-limits and how to extend the serializer.",
        },
        {
          kind: "code",
          language: "python",
          code: "import json\nfrom datetime import datetime\n\ntry:\n    json.dumps(datetime.now())\nexcept TypeError as e:\n    print(e)  # Object of type datetime is not JSON serializable",
          caption: "`datetime` objects cannot be serialized by default",
        },
        {
          kind: "text",
          markdown:
            "## Non-Serializable Types\n\n- `datetime`, `date`, `time`\n- `set`, `frozenset`\n- `bytes`, `bytearray`\n- Custom class instances\n- `Decimal`, `complex`\n- `tuple` keys in dicts (JSON keys must be strings)",
        },
        {
          kind: "text",
          markdown:
            "## Custom Serialization with `default`\n\nPass a `default` function that receives the non-serializable object and returns something JSON-compatible:",
        },
        {
          kind: "code",
          language: "python",
          code: "import json\nfrom datetime import datetime\n\ndef json_default(obj):\n    if isinstance(obj, datetime):\n        return obj.isoformat()\n    raise TypeError(f\"Not serializable: {type(obj)}\")\n\ndata = {\"created\": datetime(2024, 1, 15)}\nprint(json.dumps(data, default=json_default))\n# {\"created\": \"2024-01-15T00:00:00\"}",
          caption: "Convert `datetime` to ISO 8601 string before serialization",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Tuples become lists",
          body: "Python `tuple` values are serialized as JSON arrays (same as lists). You lose the tuple type when round-tripping through JSON.",
        },
        {
          kind: "why-matters",
          body: "Understanding serialization limits prevents runtime surprises when building APIs. Knowing the `default` hook lets you handle any type cleanly.",
        },
      ],
      interactions: [
        {
          id: "s17-json-limits-mc",
          kind: "multiple-choice",
          prompt: "Which Python types can be serialized to JSON by default (without a custom `default` function)?",
          beginnerPurpose: "Build a mental checklist of JSON-safe types",
          expectedConceptIds: ["json-parsing"],
          options: [
            { id: "a", text: "`set` and `frozenset`", isCorrect: false, explanation: "Sets are not JSON-serializable by default." },
            { id: "b", text: "`dict`, `list`, `str`, `int`, `float`, `bool`, `None`", isCorrect: true, explanation: "These are the seven Python types with direct JSON equivalents." },
            { id: "c", text: "`datetime` and `bytes`", isCorrect: false, explanation: "Both require a custom `default` function." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The type mapping table from the first lesson lists all directly serializable types." }],
          feedback: {
            correct: "Correct — only the seven core types are serializable by default.",
            incorrect: "Only the seven Python types that map directly to JSON types are serializable without customization.",
          },
        },
        {
          id: "s17-json-limits-run",
          kind: "run-code",
          prompt: "Write a `default` function that serializes `set` objects as sorted lists.",
          beginnerPurpose: "Implement a custom JSON serializer extension",
          expectedConceptIds: ["json-parsing"],
          starterCode: "import json\n\ndef my_default(obj):\n    # Handle set objects\n    pass\n\ndata = {\"tags\": {\"python\", \"json\", \"data\"}}\nprint(json.dumps(data, default=my_default, sort_keys=True))",
          task: "Return `sorted(list(obj))` when `obj` is a `set`; raise `TypeError` otherwise.",
          expectedOutputContains: ['"tags"', "data", "json", "python"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "Use `isinstance(obj, set)` to check the type." },
            { level: "syntax", text: "Return `sorted(list(obj))` for sets." },
          ],
          feedback: {
            correct: "Great! You can now serialize sets through the `default` hook.",
            incorrect: "Check for `isinstance(obj, set)` and return `sorted(list(obj))`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-parsing", recallPrompt: "Name three Python types that cannot be JSON-serialized by default.", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-json-limits-mc", "s17-json-limits-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.7 CSV Concepts ────────────────────────────────────────────────────
    {
      id: "s17-csv-concepts",
      stageId: "stage-17",
      title: "CSV Concepts — Rows, Columns, Headers, Dialects",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Describe the CSV format: rows, columns, delimiter, and header row",
        "Explain why CSV has dialects and what can vary between them",
      ],
      prerequisites: [],
      concepts: ["csv-reading"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nCSV (Comma-Separated Values) is the lingua franca of tabular data. Spreadsheets, databases, and data pipelines all export and import CSV. It predates JSON by decades and remains ubiquitous.",
        },
        {
          kind: "why-matters",
          body: "Any time you touch data — analysis, ETL, reporting, machine learning — you will encounter CSV. Python's `csv` module is part of the standard library and handles the format's many quirks.",
        },
        {
          kind: "text",
          markdown:
            "## Anatomy of a CSV File\n\n```\nname,age,city\nAlice,30,New York\nBob,25,Chicago\n```\n\n- **Header row** — the first line names the columns (optional but conventional)\n- **Rows** — each subsequent line is one record\n- **Delimiter** — the character separating fields (comma by default)\n- **Fields** — individual values within a row",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Fields with commas must be quoted",
          body: 'If a field contains the delimiter character, it must be wrapped in quotes: `"Smith, John",42,Boston`. This is where naive `str.split(\",\")` breaks.',
        },
        {
          kind: "text",
          markdown:
            "## Dialects\n\nNot all CSV files are identical. Variations include:\n\n| Setting | Common values |\n|---------|---------------|\n| `delimiter` | `,` `\\t` `;` `|` |\n| `quotechar` | `\"` `'` |\n| `lineterminator` | `\\r\\n` (Excel) `\\n` (Unix) |\n| `quoting` | QUOTE_MINIMAL, QUOTE_ALL, QUOTE_NONNUMERIC, QUOTE_NONE |\n\nA **dialect** bundles these settings together. Python ships with `excel` (the Excel/RFC 4180 dialect) and `excel-tab` (tab-separated) dialects built in.",
        },
        {
          kind: "mental-model",
          title: "CSV as a Rectangular Grid",
          analogy: "Think of a CSV file as a spreadsheet printed as text. Each row is a line; each column is separated by a delimiter. The header row labels the columns.",
          explanation: "This mental model correctly predicts most CSV behavior. The tricky part is that the delimiter character can appear inside quoted fields — which is why you need a proper parser rather than `str.split()`.",
        },
      ],
      interactions: [
        {
          id: "s17-csv-concepts-mc",
          kind: "multiple-choice",
          prompt: "Why is `'Alice,Smith,30'.split(',')` insufficient to parse arbitrary CSV?",
          beginnerPurpose: "Understand why a dedicated CSV parser is needed",
          expectedConceptIds: ["csv-reading"],
          options: [
            { id: "a", text: "It only works on three-column files", isCorrect: false, explanation: "`split(',')` works on any number of columns — but breaks when a field contains a comma." },
            { id: "b", text: "It breaks when a field contains a comma inside quotes, e.g. `\"Smith, Jr.\"`", isCorrect: true, explanation: "Correct. `str.split(',')` cannot handle quoted fields that contain the delimiter." },
            { id: "c", text: "It is too slow for large files", isCorrect: false, explanation: "Speed is not the problem here — correctness is." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What happens when you split `'\"Smith, Jr.\",30'` on commas?" }],
          feedback: {
            correct: "Correct! Quoted delimiters break naive splitting.",
            incorrect: "Consider a field like `\"New York, NY\"` — splitting on `,` gives wrong results.",
          },
        },
        {
          id: "s17-csv-concepts-plain",
          kind: "plain-language-explain",
          prompt: "Explain what a CSV 'dialect' is and why it exists.",
          beginnerPurpose: "Articulate the concept of dialect in your own words",
          expectedConceptIds: ["csv-reading"],
          code: "# No code needed — describe the concept",
          keyPointsToHit: [
            "Different software produces slightly different CSV variants",
            "A dialect bundles settings like delimiter and quotechar",
            "Python ships with the excel and excel-tab dialects",
          ],
          sampleAnswer:
            "A CSV dialect is a named bundle of settings (delimiter, quote character, line terminator, etc.) that describes the particular variant of CSV a file uses. Different tools — Excel, Google Sheets, MySQL, PostgreSQL — produce files with slightly different rules. Python's `csv` module uses dialects so you can parse any variant without manually specifying every setting.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what varies between an Excel export and a tab-separated file." }],
          feedback: {
            correct: "Great explanation!",
            incorrect: "Mention that different software produces different CSV variants and that a dialect bundles those settings.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "csv-reading", recallPrompt: "Name three settings that can vary in a CSV dialect.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-csv-concepts-mc", "s17-csv-concepts-plain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.8 csv.reader ──────────────────────────────────────────────────────
    {
      id: "s17-csv-reader",
      stageId: "stage-17",
      title: "csv.reader — Reading CSV Rows as Lists",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use `csv.reader` to iterate over rows in a CSV file",
        "Skip the header row and access individual fields by index",
      ],
      prerequisites: ["s17-csv-concepts"],
      concepts: ["csv-reading"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nYou have a CSV file and need to process each row. `csv.reader` wraps an iterable of lines and yields each row as a list of strings.",
        },
        {
          kind: "code",
          language: "python",
          code: 'import csv\n\nwith open("people.csv", newline="", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    header = next(reader)      # consume the header row\n    for row in reader:\n        print(row[0], row[1])  # name, age',
          caption: "Basic `csv.reader` usage pattern",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Always open with `newline=''`",
          body: "The `newline=''` argument prevents Python's universal-newline translation from interfering with CSV's own line-ending handling. Omitting it can cause blank rows or misparsed records on Windows.",
        },
        {
          kind: "text",
          markdown:
            "## Row Contents\n\nEvery row is a `list[str]` — even numeric fields arrive as strings. You must convert them yourself:\n\n```python\nage = int(row[1])\n```\n\nThis is a deliberate design choice: CSV has no type information.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "csv.reader is lazy",
          body: "`csv.reader` is an iterator — it reads one line at a time. This means it handles files larger than RAM without loading everything into memory.",
        },
      ],
      interactions: [
        {
          id: "s17-csv-reader-fill",
          kind: "fill-code",
          prompt: "Fill in the blanks to open a CSV file correctly and iterate its rows.",
          beginnerPurpose: "Practise the full open-and-iterate pattern",
          expectedConceptIds: ["csv-reading"],
          codeTemplate: 'import csv\n\nwith open("data.csv", newline=_____, encoding="utf-8") as f:\n    reader = csv._____(f)\n    for row in reader:\n        print(row)',
          blanks: [
            { placeholder: "_____", answer: '""', caseSensitive: true },
            { placeholder: "_____", answer: "reader", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "`newline=''` (empty string) suppresses newline translation." },
            { level: "syntax", text: "The class is `csv.reader`." },
          ],
          feedback: {
            correct: "Correct! `newline=''` and `csv.reader(f)` are the key pieces.",
            incorrect: "Use `newline=''` and `csv.reader(f)`.",
          },
        },
        {
          id: "s17-csv-reader-predict",
          kind: "predict-output",
          prompt: "What does this code print? The CSV content is `name,age\\nAlice,30\\nBob,25`.",
          beginnerPurpose: "Trace row iteration and field access",
          expectedConceptIds: ["csv-reading"],
          code: 'import csv\nimport io\n\ncsv_data = "name,age\\nAlice,30\\nBob,25"\nreader = csv.reader(io.StringIO(csv_data))\nnext(reader)  # skip header\nfor row in reader:\n    print(row[0])',
          expectedOutput: "Alice\nBob",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`next(reader)` consumes the header. The loop then yields the data rows." }],
          feedback: {
            correct: "Correct! `next()` skips the header; the loop gives the data.",
            incorrect: "`next(reader)` consumes the header row. The remaining rows are iterated by the `for` loop.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "csv-reading", recallPrompt: "What happens if you forget `newline=''` when opening a CSV file?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-csv-reader-fill", "s17-csv-reader-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.9 csv.writer ──────────────────────────────────────────────────────
    {
      id: "s17-csv-writer",
      stageId: "stage-17",
      title: "csv.writer — Writing CSV Rows",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use `csv.writer` to write rows to a CSV file",
        "Write a header row and data rows with `writerow` and `writerows`",
      ],
      prerequisites: ["s17-csv-reader"],
      concepts: ["csv-reading"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nYou have processed data in Python and need to export it as a CSV file. `csv.writer` handles quoting, escaping, and line termination for you.",
        },
        {
          kind: "code",
          language: "python",
          code: 'import csv\n\nrows = [\n    ["Alice", 30, "New York"],\n    ["Bob", 25, "Chicago"],\n]\n\nwith open("output.csv", "w", newline="", encoding="utf-8") as f:\n    writer = csv.writer(f)\n    writer.writerow(["name", "age", "city"])  # header\n    writer.writerows(rows)                     # data rows',
          caption: "`writerow()` for one row; `writerows()` for many at once",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Open in write mode with `newline=''`",
          body: "Same as reading: use `newline=''` to prevent double line endings on Windows.",
        },
        {
          kind: "text",
          markdown:
            "## Automatic Quoting\n\nIf a field contains the delimiter or a newline, `csv.writer` automatically wraps it in quotes:\n\n```python\nwriter.writerow([\"Smith, Jr.\", 40, \"Boston\"])\n# → \"Smith, Jr.\",40,Boston\n```",
        },
        {
          kind: "why-matters",
          body: "Generating clean CSV output is needed for data exports, reporting pipelines, and interoperability with spreadsheet software. The `csv.writer` handles all edge cases that would trip up a manual `f.write(','.join(row))`.",
        },
      ],
      interactions: [
        {
          id: "s17-csv-writer-run",
          kind: "run-code",
          prompt: "Write a CSV to a `StringIO` buffer with a header `['product', 'price']` and two data rows.",
          beginnerPurpose: "Practise csv.writer end-to-end",
          expectedConceptIds: ["csv-reading"],
          starterCode: "import csv\nimport io\n\nbuf = io.StringIO()\nwriter = csv.writer(buf)\n# Write header and two rows here\n\nbuf.seek(0)\nprint(buf.read())",
          task: "Write header ['product', 'price'] and rows [['apple', 0.5], ['banana', 0.3]]",
          expectedOutputContains: ["product,price", "apple", "banana"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "syntax", text: "Use `writer.writerow(['product', 'price'])` for the header." },
            { level: "syntax", text: "Use `writer.writerows([['apple', 0.5], ['banana', 0.3]])` for data." },
          ],
          feedback: {
            correct: "Well done! You can write complete CSV output.",
            incorrect: "Write the header with `writerow()`, then the data rows with `writerows()`.",
          },
        },
        {
          id: "s17-csv-writer-mc",
          kind: "multiple-choice",
          prompt: "Which method writes multiple rows at once?",
          beginnerPurpose: "Distinguish `writerow` from `writerows`",
          expectedConceptIds: ["csv-reading"],
          options: [
            { id: "a", text: "`writerow()`", isCorrect: false, explanation: "`writerow()` writes exactly one row." },
            { id: "b", text: "`writerows()`", isCorrect: true, explanation: "`writerows()` accepts an iterable of rows and writes them all." },
            { id: "c", text: "`writelines()`", isCorrect: false, explanation: "`writelines()` is a file method, not a csv.writer method." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The plural 's' in `writerows` is the clue." }],
          feedback: {
            correct: "Correct! `writerows()` is the batch method.",
            incorrect: "`writerows()` (plural) writes multiple rows from an iterable.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "csv-reading", recallPrompt: "What is the difference between `writerow()` and `writerows()`?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-csv-writer-run", "s17-csv-writer-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.10 csv.DictReader ─────────────────────────────────────────────────
    {
      id: "s17-csv-dictreader",
      stageId: "stage-17",
      title: "csv.DictReader — Reading CSV Rows as Dicts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use `csv.DictReader` to access CSV fields by column name instead of index",
        "Handle files without a header row using the `fieldnames` argument",
      ],
      prerequisites: ["s17-csv-reader"],
      concepts: ["csv-reading"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nWith `csv.reader` you access fields as `row[0]`, `row[1]`. If the file has many columns or the column order might change, `csv.DictReader` is safer — it gives you `row['name']`, `row['age']`.",
        },
        {
          kind: "comparison",
          leftLabel: "csv.reader (index access)",
          rightLabel: "csv.DictReader (name access)",
          leftCode: 'for row in reader:\n    name = row[0]\n    age = row[1]',
          rightCode: 'for row in dict_reader:\n    name = row["name"]\n    age = row["age"]',
          caption: "DictReader is more readable and robust to column reordering",
        },
        {
          kind: "code",
          language: "python",
          code: 'import csv\n\nwith open("people.csv", newline="", encoding="utf-8") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(f\"{row[\'name\']} is {row[\'age\']} years old")',
          caption: "The header row is automatically used as field names",
        },
        {
          kind: "text",
          markdown:
            "## Files Without a Header\n\nIf the file has no header, supply column names manually:\n\n```python\nreader = csv.DictReader(f, fieldnames=['id', 'name', 'email'])\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Rows are OrderedDict in Python 3.7 and earlier",
          body: "In modern Python (3.8+) the rows are regular `dict` objects. In older Python they are `OrderedDict`, but both support the same dict access patterns.",
        },
      ],
      interactions: [
        {
          id: "s17-csv-dictreader-fill",
          kind: "fill-code",
          prompt: "Fill in the blank to create a `DictReader` that reads from the open file `f`.",
          beginnerPurpose: "Practise the DictReader constructor",
          expectedConceptIds: ["csv-reading"],
          codeTemplate: 'import csv\nwith open("data.csv", newline="") as f:\n    reader = csv._____(f)\n    for row in reader:\n        print(row["city"])',
          blanks: [{ placeholder: "_____", answer: "DictReader", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The class is `csv.DictReader` — note the capital letters." }],
          feedback: {
            correct: "Correct! `csv.DictReader(f)` turns each row into a dict.",
            incorrect: "The class name is `csv.DictReader` (capital D and R).",
          },
        },
        {
          id: "s17-csv-dictreader-predict",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Trace DictReader field access",
          expectedConceptIds: ["csv-reading"],
          code: 'import csv, io\ndata = "x,y\\n10,20\\n30,40"\nreader = csv.DictReader(io.StringIO(data))\nfor row in reader:\n    print(int(row["x"]) + int(row["y"]))',
          expectedOutput: "30\n70",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Fields are strings — convert them to int before adding." }],
          feedback: {
            correct: "Correct! 10+20=30 and 30+40=70.",
            incorrect: "Fields from DictReader are always strings. `int('10') + int('20') = 30`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "csv-reading", recallPrompt: "How does DictReader differ from csv.reader in how you access fields?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-csv-dictreader-fill", "s17-csv-dictreader-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.11 csv.DictWriter ─────────────────────────────────────────────────
    {
      id: "s17-csv-dictwriter",
      stageId: "stage-17",
      title: "csv.DictWriter — Writing CSV from Dicts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use `csv.DictWriter` to write dicts as CSV rows",
        "Write the header row with `writeheader()` and data with `writerow()`/`writerows()`",
      ],
      prerequisites: ["s17-csv-writer", "s17-csv-dictreader"],
      concepts: ["csv-reading"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nWhen your data is a list of dicts (which is common when coming from JSON APIs or database queries), `csv.DictWriter` is cleaner than converting each dict to an ordered list of values.",
        },
        {
          kind: "code",
          language: "python",
          code: 'import csv\n\nrecords = [\n    {"name": "Alice", "age": 30, "city": "New York"},\n    {"name": "Bob",   "age": 25, "city": "Chicago"},\n]\n\nfieldnames = ["name", "age", "city"]\n\nwith open("output.csv", "w", newline="", encoding="utf-8") as f:\n    writer = csv.DictWriter(f, fieldnames=fieldnames)\n    writer.writeheader()    # writes: name,age,city\n    writer.writerows(records)',
          caption: "`writeheader()` automatically writes the field names as the first row",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "fieldnames must be specified",
          body: "`csv.DictWriter` requires the `fieldnames` argument to know the column order. If a dict contains keys not in `fieldnames`, it raises `ValueError` unless you pass `extrasaction='ignore'`.",
        },
        {
          kind: "text",
          markdown:
            "## extrasaction\n\nBy default, extra keys in a dict cause an error. To silently ignore them:\n\n```python\nwriter = csv.DictWriter(f, fieldnames=['name', 'age'], extrasaction='ignore')\n```",
        },
        {
          kind: "why-matters",
          body: "Converting JSON API responses or database rows to CSV is a common data engineering task. `DictWriter` keeps the mapping between dict keys and CSV columns explicit and readable.",
        },
      ],
      interactions: [
        {
          id: "s17-csv-dictwriter-fill",
          kind: "fill-code",
          prompt: "Fill in the blanks to create a DictWriter and write the header.",
          beginnerPurpose: "Practise the DictWriter constructor and writeheader call",
          expectedConceptIds: ["csv-reading"],
          codeTemplate: 'import csv, io\nbuf = io.StringIO()\nfields = ["id", "value"]\nwriter = csv._____(buf, fieldnames=fields)\nwriter._()',
          blanks: [
            { placeholder: "_____", answer: "DictWriter", caseSensitive: true },
            { placeholder: "_", answer: "writeheader", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The class is `csv.DictWriter`; the method to write the header is `writeheader()`." },
          ],
          feedback: {
            correct: "Correct! `csv.DictWriter(f, fieldnames=...)` followed by `writeheader()`.",
            incorrect: "Use `csv.DictWriter` (capital D and W) and call `writeheader()` to emit the first row.",
          },
        },
        {
          id: "s17-csv-dictwriter-run",
          kind: "run-code",
          prompt: "Use `DictWriter` to write two records and print the resulting CSV string.",
          beginnerPurpose: "End-to-end practice with DictWriter",
          expectedConceptIds: ["csv-reading"],
          starterCode: 'import csv, io\n\nrecords = [{"product": "apple", "qty": 10}, {"product": "banana", "qty": 5}]\nbuf = io.StringIO()\n\n# Create DictWriter, write header and rows\n\nbuf.seek(0)\nprint(buf.read())',
          task: "Write a DictWriter with fieldnames=['product', 'qty'], call writeheader() and writerows(records).",
          expectedOutputContains: ["product,qty", "apple,10", "banana,5"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "syntax", text: "Use `csv.DictWriter(buf, fieldnames=['product', 'qty'])`." },
          ],
          feedback: {
            correct: "Well done! You wrote CSV from a list of dicts.",
            incorrect: "Create the DictWriter with fieldnames, call writeheader(), then writerows().",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "csv-reading", recallPrompt: "What method writes the header row in DictWriter?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-csv-dictwriter-fill", "s17-csv-dictwriter-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.12 CSV Dialects ───────────────────────────────────────────────────
    {
      id: "s17-csv-dialects",
      stageId: "stage-17",
      title: "CSV Dialects — Delimiter, Quotechar, Lineterminator",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Configure `csv.reader` and `csv.writer` with custom dialects",
        "Register a reusable dialect with `csv.register_dialect()`",
      ],
      prerequisites: ["s17-csv-reader", "s17-csv-writer"],
      concepts: ["csv-reading"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nReal-world data files often use tab-separated values, semicolons (European locale), or pipes as delimiters. You need to configure the parser to match.",
        },
        {
          kind: "code",
          language: "python",
          code: 'import csv\n\n# Tab-separated values\nwith open("data.tsv", newline="") as f:\n    reader = csv.reader(f, delimiter="\\t")\n    for row in reader:\n        print(row)\n\n# Semicolon-separated (common in European Excel exports)\nwith open("data.csv", newline="") as f:\n    reader = csv.reader(f, delimiter=";", quotechar="\'")',
          caption: "Passing format arguments directly to reader/writer",
        },
        {
          kind: "text",
          markdown:
            "## Registering a Dialect\n\nFor repeated use, register a named dialect:",
        },
        {
          kind: "code",
          language: "python",
          code: 'import csv\n\ncsv.register_dialect(\n    "pipes",\n    delimiter="|",\n    quotechar=\'"\',\n    lineterminator="\\n",\n)\n\nwith open("data.psv", newline="") as f:\n    reader = csv.reader(f, dialect="pipes")\n    for row in reader:\n        print(row)',
          caption: "Register once, reuse by name anywhere in your codebase",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Sniffing unknown formats",
          body: "`csv.Sniffer().sniff(sample)` tries to detect the dialect automatically from a sample of the file. Useful when you receive files with unknown formatting.",
        },
      ],
      interactions: [
        {
          id: "s17-csv-dialects-fill",
          kind: "fill-code",
          prompt: "Fill in the blank to read a pipe-separated file.",
          beginnerPurpose: "Practise passing the delimiter argument",
          expectedConceptIds: ["csv-reading"],
          codeTemplate: 'import csv\nwith open("data.psv", newline="") as f:\n    reader = csv.reader(f, delimiter="_____")\n    for row in reader:\n        print(row)',
          blanks: [{ placeholder: "_____", answer: "|", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Pass the pipe character `|` as a string to the `delimiter` keyword." }],
          feedback: {
            correct: "Correct! `delimiter='|'` configures the parser for pipe-separated data.",
            incorrect: "The pipe character `|` is the delimiter for pipe-separated values.",
          },
        },
        {
          id: "s17-csv-dialects-mc",
          kind: "multiple-choice",
          prompt: "Which built-in CSV dialect does Python use by default?",
          beginnerPurpose: "Know the default dialect name",
          expectedConceptIds: ["csv-reading"],
          options: [
            { id: "a", text: "`unix`", isCorrect: false, explanation: "Python does have a `unix` dialect but it is not the default." },
            { id: "b", text: "`excel`", isCorrect: true, explanation: "The `excel` dialect (comma-separated, CRLF line endings) is the default." },
            { id: "c", text: "`csv-standard`", isCorrect: false, explanation: "There is no built-in dialect with that name." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "CSV's most common origin application gives its name to the default dialect." }],
          feedback: {
            correct: "Correct! The `excel` dialect is the default.",
            incorrect: "Python's csv module defaults to the `excel` dialect (comma-delimited, CRLF line endings).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "csv-reading", recallPrompt: "How do you read a tab-separated file with csv.reader?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-csv-dialects-fill", "s17-csv-dialects-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.13 configparser ───────────────────────────────────────────────────
    {
      id: "s17-configparser",
      stageId: "stage-17",
      title: "INI-Style Config with configparser",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Read INI-style configuration files using `configparser.ConfigParser`",
        "Access sections and keys, with fallback defaults",
      ],
      prerequisites: [],
      concepts: ["configparser-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nMany applications need configuration files that a non-programmer can edit. INI files are a decades-old format that strikes a balance between simplicity and structure. Python's `configparser` module reads and writes them.",
        },
        {
          kind: "code",
          language: "ini",
          code: "[database]\nhost = localhost\nport = 5432\nname = mydb\n\n[logging]\nlevel = INFO\nfile = app.log",
          caption: "A typical INI file: sections in brackets, key = value pairs",
        },
        {
          kind: "code",
          language: "python",
          code: 'import configparser\n\nconfig = configparser.ConfigParser()\nconfig.read("config.ini")\n\nhost = config["database"]["host"]          # "localhost"\nport = config.getint("database", "port")   # 5432 (as int)\nlevel = config.get("logging", "level", fallback="WARNING")',
          caption: "Read sections, get typed values, use fallbacks",
        },
        {
          kind: "text",
          markdown:
            "## Type-Aware Getters\n\nAll values in INI files are strings. `configparser` provides helpers:\n\n| Method | Return type |\n|--------|-------------|\n| `get(section, key)` | `str` |\n| `getint(section, key)` | `int` |\n| `getfloat(section, key)` | `float` |\n| `getboolean(section, key)` | `bool` |",
        },
        {
          kind: "callout",
          variant: "info",
          title: "configparser is case-insensitive for keys",
          body: "By default, keys are lowercased. `config['DB']['HOST']` and `config['DB']['host']` refer to the same key.",
        },
        {
          kind: "why-matters",
          body: "INI files are used by many Python tools (pytest, flake8, setup.cfg, tox). Understanding `configparser` lets you both consume existing config files and write configurable applications.",
        },
      ],
      interactions: [
        {
          id: "s17-configparser-fill",
          kind: "fill-code",
          prompt: "Fill in the blank to read `port` as an integer from the `[database]` section.",
          beginnerPurpose: "Practise type-aware getters",
          expectedConceptIds: ["configparser-basics"],
          codeTemplate: 'import configparser\nconfig = configparser.ConfigParser()\nconfig.read("config.ini")\nport = config.___("database", "port")',
          blanks: [{ placeholder: "___", answer: "getint", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The method name is `getint` — get + int." }],
          feedback: {
            correct: "Correct! `getint()` returns an integer from the config.",
            incorrect: "Use `getint('database', 'port')` to get the value as an integer.",
          },
        },
        {
          id: "s17-configparser-mc",
          kind: "multiple-choice",
          prompt: "What does `config.get('logging', 'level', fallback='WARNING')` return if the key does not exist?",
          beginnerPurpose: "Understand the fallback mechanism",
          expectedConceptIds: ["configparser-basics"],
          options: [
            { id: "a", text: "Raises `KeyError`", isCorrect: false, explanation: "The `fallback` argument prevents KeyError." },
            { id: "b", text: "Returns `'WARNING'`", isCorrect: true, explanation: "When the key is absent, the `fallback` value is returned." },
            { id: "c", text: "Returns `None`", isCorrect: false, explanation: "Without `fallback`, you get `None`-like behavior only with `get` on a dict. Here `fallback` is explicit." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The `fallback` argument specifies what to return when the key is missing." }],
          feedback: {
            correct: "Correct! `fallback` is the value returned when the key is absent.",
            incorrect: "The `fallback='WARNING'` argument means the string `'WARNING'` is returned when the key is missing.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "configparser-basics", recallPrompt: "What method reads a config value as a boolean?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-configparser-fill", "s17-configparser-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.14 TOML ───────────────────────────────────────────────────────────
    {
      id: "s17-toml",
      stageId: "stage-17",
      title: "TOML Parsing with tomllib",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Parse TOML files using `tomllib` (Python 3.11+) or `tomli`",
        "Understand TOML's type-rich format compared to INI",
      ],
      prerequisites: ["s17-configparser"],
      concepts: ["configparser-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nINI files have no types — everything is a string. TOML (Tom's Obvious Minimal Language) solves this: integers, floats, booleans, datetimes, arrays, and inline tables are all native. Python 3.11 added `tomllib` to the standard library.",
        },
        {
          kind: "code",
          language: "toml",
          code: "[server]\nhost = \"localhost\"\nport = 8080\ndebug = true\n\n[database]\nurl = \"postgresql://...\"\nmax_connections = 10",
          caption: "TOML preserves types: `port` is an integer, `debug` is a boolean",
        },
        {
          kind: "code",
          language: "python",
          code: 'import tomllib  # Python 3.11+\n# For earlier versions: pip install tomli; import tomli as tomllib\n\nwith open("config.toml", "rb") as f:  # note: "rb" not "r"\n    config = tomllib.load(f)\n\nprint(config["server"]["port"])  # 8080 as int, not string\nprint(type(config["server"]["debug"]))  # <class \'bool\'>',
          caption: "`tomllib.load()` returns native Python types — no manual conversion needed",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Open TOML files in binary mode",
          body: "`tomllib.load()` requires a binary file object (`open(..., 'rb')`). Use `tomllib.loads()` for string input.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "TOML is read-only in tomllib",
          body: "The standard library `tomllib` can only read TOML. To write TOML files, use the third-party `tomli-w` package.",
        },
        {
          kind: "why-matters",
          body: "Modern Python tooling uses TOML heavily. `pyproject.toml` is the standard project config file, replacing `setup.py`, `setup.cfg`, and `tox.ini`. Understanding TOML is essential for working with modern Python projects.",
        },
      ],
      interactions: [
        {
          id: "s17-toml-predict",
          kind: "predict-output",
          prompt: "What type does `config['server']['port']` have after loading the TOML above?",
          beginnerPurpose: "Confirm that TOML preserves native types",
          expectedConceptIds: ["configparser-basics"],
          code: "import tomllib\nconfig = tomllib.loads('[server]\\nport = 8080')\nprint(type(config['server']['port']).__name__)",
          expectedOutput: "int",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "TOML preserves types — 8080 without quotes is an integer." }],
          feedback: {
            correct: "Correct! TOML integers become Python `int` automatically.",
            incorrect: "Unlike INI, TOML preserves types. `8080` (no quotes) is an integer.",
          },
        },
        {
          id: "s17-toml-mc",
          kind: "multiple-choice",
          prompt: "Which file mode must you use when opening a TOML file for `tomllib.load()`?",
          beginnerPurpose: "Remember the binary mode requirement",
          expectedConceptIds: ["configparser-basics"],
          options: [
            { id: "a", text: "`'r'` (text read)", isCorrect: false, explanation: "`tomllib.load()` requires binary mode. Text mode will raise a `TypeError`." },
            { id: "b", text: "`'rb'` (binary read)", isCorrect: true, explanation: "Correct — `tomllib` works with bytes so the file must be opened in binary mode." },
            { id: "c", text: "`'w'` (write)", isCorrect: false, explanation: "You are reading, not writing. And write mode would erase the file." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The `b` in `rb` stands for binary." }],
          feedback: {
            correct: "Correct! `open(..., 'rb')` is required for `tomllib.load()`.",
            incorrect: "`tomllib.load()` needs a binary file object — use `open(..., 'rb')`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "configparser-basics", recallPrompt: "What is the main advantage of TOML over INI for config files?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-toml-predict", "s17-toml-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.15 XML Basics ─────────────────────────────────────────────────────
    {
      id: "s17-xml-basics",
      stageId: "stage-17",
      title: "XML Parsing Basics",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Parse an XML document using `xml.etree.ElementTree`",
        "Navigate elements with `find()`, `findall()`, and attribute access",
      ],
      prerequisites: [],
      concepts: ["json-parsing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nXML predates JSON and is still widely used in enterprise systems, RSS/Atom feeds, Microsoft Office files, and many APIs (especially SOAP). Python's standard library includes `xml.etree.ElementTree`.",
        },
        {
          kind: "code",
          language: "xml",
          code: '<catalog>\n  <book id="1">\n    <title>Python Crash Course</title>\n    <price>29.99</price>\n  </book>\n  <book id="2">\n    <title>Fluent Python</title>\n    <price>49.99</price>\n  </book>\n</catalog>',
          caption: "Sample XML document with nested elements and attributes",
        },
        {
          kind: "code",
          language: "python",
          code: 'import xml.etree.ElementTree as ET\n\ntree = ET.parse("catalog.xml")\nroot = tree.getroot()\n\nfor book in root.findall("book"):\n    book_id = book.get("id")           # attribute\n    title = book.find("title").text    # element text\n    price = float(book.find("price").text)\n    print(f"[{book_id}] {title}: ${price}")',
          caption: "Parse, navigate, and extract data from XML",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "ElementTree is not safe for untrusted XML",
          body: "The standard `xml.etree.ElementTree` is vulnerable to XML bomb attacks (billion laughs) on untrusted input. Use `defusedxml` for untrusted sources.",
        },
        {
          kind: "text",
          markdown:
            "## String Parsing\n\nFor XML in a string (not a file), use `ET.fromstring()`:\n\n```python\nroot = ET.fromstring('<root><item>1</item></root>')\nprint(root.find('item').text)  # '1'\n```",
        },
      ],
      interactions: [
        {
          id: "s17-xml-mc",
          kind: "multiple-choice",
          prompt: "Which `ElementTree` method finds all child elements with a given tag?",
          beginnerPurpose: "Distinguish find vs findall",
          expectedConceptIds: ["json-parsing"],
          options: [
            { id: "a", text: "`find('tag')`", isCorrect: false, explanation: "`find()` returns only the first matching element." },
            { id: "b", text: "`findall('tag')`", isCorrect: true, explanation: "`findall()` returns a list of all matching child elements." },
            { id: "c", text: "`getall('tag')`", isCorrect: false, explanation: "There is no `getall()` method in ElementTree." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The 'all' suffix means you get a list of all matches." }],
          feedback: {
            correct: "Correct! `findall()` returns a list of all matching elements.",
            incorrect: "`findall()` (plural) returns all matches. `find()` returns only the first.",
          },
        },
        {
          id: "s17-xml-predict",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Trace XML element and attribute access",
          expectedConceptIds: ["json-parsing"],
          code: 'import xml.etree.ElementTree as ET\nxml = \'<root><item id="7">hello</item></root>\'\nroot = ET.fromstring(xml)\nitem = root.find("item")\nprint(item.text, item.get("id"))',
          expectedOutput: "hello 7",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "`.text` gives the element's text content; `.get('attr')` gives an attribute value." },
          ],
          feedback: {
            correct: "Correct! `.text` is the text node, `.get()` is the attribute value.",
            incorrect: "`.text` returns the element's text content and `.get('id')` returns the attribute `id` as a string.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-parsing", recallPrompt: "Which ElementTree method parses XML from a string?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-xml-mc", "s17-xml-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.16 HTML Basics ────────────────────────────────────────────────────
    {
      id: "s17-html-basics",
      stageId: "stage-17",
      title: "HTML Parsing Basics",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Parse HTML using Python's standard `html.parser` module",
        "Know when to reach for third-party parsers like `lxml` or `html5lib`",
      ],
      prerequisites: ["s17-xml-basics"],
      concepts: ["json-parsing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nHTML is the language of the web. While not strictly a data format, parsing HTML is often required when scraping web pages or processing email content. Python's standard library includes `html.parser`.",
        },
        {
          kind: "code",
          language: "python",
          code: 'from html.parser import HTMLParser\n\nclass LinkExtractor(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.links = []\n\n    def handle_starttag(self, tag, attrs):\n        if tag == "a":\n            attrs_dict = dict(attrs)\n            if "href" in attrs_dict:\n                self.links.append(attrs_dict["href"])\n\nparser = LinkExtractor()\nparser.feed("<a href=\'https://python.org\'>Python</a>")\nprint(parser.links)  # [\'https://python.org\']',
          caption: "Subclass HTMLParser to extract data from HTML",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use BeautifulSoup for real scraping",
          body: "The standard `html.parser` is basic. For real web scraping, `BeautifulSoup` (third-party) is far more ergonomic. It can use `html.parser`, `lxml`, or `html5lib` as its backend.",
        },
        {
          kind: "text",
          markdown:
            "## BeautifulSoup Preview\n\nWith BeautifulSoup installed (`pip install beautifulsoup4`):\n\n```python\nfrom bs4 import BeautifulSoup\n\nsoup = BeautifulSoup(html_string, 'html.parser')\nfor link in soup.find_all('a'):\n    print(link['href'])\n```",
        },
        {
          kind: "why-matters",
          body: "Web scraping, data extraction from legacy HTML documents, and email body parsing all require HTML understanding. The standard library gives you the fundamentals; third-party libraries make it practical.",
        },
      ],
      interactions: [
        {
          id: "s17-html-mc",
          kind: "multiple-choice",
          prompt: "Which method of `HTMLParser` is called when the parser encounters an opening HTML tag?",
          beginnerPurpose: "Learn the HTMLParser callback interface",
          expectedConceptIds: ["json-parsing"],
          options: [
            { id: "a", text: "`handle_data()`", isCorrect: false, explanation: "`handle_data()` is called for text between tags." },
            { id: "b", text: "`handle_starttag()`", isCorrect: true, explanation: "Correct! `handle_starttag(tag, attrs)` is called for each opening tag." },
            { id: "c", text: "`handle_endtag()`", isCorrect: false, explanation: "`handle_endtag()` is called for closing tags like `</a>`." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what 'start tag' means in HTML: the opening angle bracket." }],
          feedback: {
            correct: "Correct! Opening tags trigger `handle_starttag()`.",
            incorrect: "`handle_starttag()` handles opening tags. `handle_endtag()` handles closing tags.",
          },
        },
        {
          id: "s17-html-plain",
          kind: "plain-language-explain",
          prompt: "When would you choose BeautifulSoup over `html.parser` directly?",
          beginnerPurpose: "Evaluate tool choice for HTML parsing tasks",
          expectedConceptIds: ["json-parsing"],
          code: "# No code — explain the trade-off",
          keyPointsToHit: [
            "Standard html.parser is verbose (requires subclassing)",
            "BeautifulSoup offers a simpler CSS-selector and find_all interface",
            "Third-party dependency is the trade-off",
          ],
          sampleAnswer:
            "Use `BeautifulSoup` for any real scraping task because its CSS selector and `.find_all()` API is far simpler than writing a custom `HTMLParser` subclass. The only reason to use `html.parser` directly is to avoid third-party dependencies, e.g. in a production service with strict dependency controls.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Consider developer ergonomics vs dependency overhead." }],
          feedback: {
            correct: "Good analysis of the trade-off!",
            incorrect: "Mention the ergonomics of BeautifulSoup vs the dependency overhead of installing it.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-parsing", recallPrompt: "What HTMLParser method is called for opening tags?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-html-mc", "s17-html-plain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.17 Data Validation Boundaries ────────────────────────────────────
    {
      id: "s17-data-validation",
      stageId: "stage-17",
      title: "Data Validation Boundaries",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Identify where to validate data after parsing a structured format",
        "Apply basic validation patterns: type coercion, range checks, required fields",
      ],
      prerequisites: ["s17-json-loads", "s17-csv-dictreader"],
      concepts: ["json-parsing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nParsing succeeds when the format is valid — but a syntactically valid JSON or CSV file can still contain garbage data. Validation is the step between parsing and using the data.",
        },
        {
          kind: "text",
          markdown:
            "## The Validation Boundary\n\nValidate data at the **boundary** — immediately after it enters your system from the outside world. Never trust external data.\n\nValidation checks:\n- **Required fields** — is 'name' present?\n- **Type correctness** — is 'age' an integer?\n- **Range constraints** — is 'age' between 0 and 150?\n- **Format constraints** — does 'email' contain '@'?",
        },
        {
          kind: "code",
          language: "python",
          code: 'import json\n\ndef parse_user(raw_json: str) -> dict:\n    """Parse and validate a user record."""\n    data = json.loads(raw_json)  # format validation\n\n    # Content validation\n    if "name" not in data:\n        raise ValueError("Missing required field: name")\n    if not isinstance(data.get("age"), int):\n        raise ValueError("Field \'age\' must be an integer")\n    if not (0 <= data["age"] <= 150):\n        raise ValueError(f"Age {data[\'age\']} is out of range")\n\n    return data',
          caption: "Validate immediately after parsing; raise meaningful errors",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use Pydantic for complex validation",
          body: "For large models, the third-party `pydantic` library automates field validation with type annotations. It is the validation layer used by FastAPI and many modern Python applications.",
        },
        {
          kind: "why-matters",
          body: "Unvalidated data causes silent corruption, confusing errors downstream, and security vulnerabilities. Validating at the boundary keeps bugs close to their source.",
        },
      ],
      interactions: [
        {
          id: "s17-data-validation-mc",
          kind: "multiple-choice",
          prompt: "Where in the code flow should you validate data from an external JSON API?",
          beginnerPurpose: "Understand the concept of validation boundaries",
          expectedConceptIds: ["json-parsing"],
          options: [
            { id: "a", text: "Only when the data is used in calculations", isCorrect: false, explanation: "By then the bad data may have propagated through many functions, making the root cause hard to find." },
            { id: "b", text: "Immediately after parsing, before the data is used anywhere else", isCorrect: true, explanation: "Correct — validate at the boundary to catch problems as early as possible." },
            { id: "c", text: "At the end of the program, before writing output", isCorrect: false, explanation: "Too late — invalid data may have already caused silent corruption or errors." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The 'boundary' is the point where external data enters your system." }],
          feedback: {
            correct: "Correct! Validate immediately at the parsing boundary.",
            incorrect: "Validate as soon as data enters your system — immediately after parsing.",
          },
        },
        {
          id: "s17-data-validation-run",
          kind: "run-code",
          prompt: "Write a function `validate_product(d)` that raises `ValueError` if 'price' is missing or negative.",
          beginnerPurpose: "Implement a simple validation function",
          expectedConceptIds: ["json-parsing"],
          starterCode: "def validate_product(d: dict) -> dict:\n    # Validate that 'price' exists and is >= 0\n    pass\n\n# Test it\ntry:\n    validate_product({'name': 'apple', 'price': -1})\nexcept ValueError as e:\n    print(f'Caught: {e}')\n\nprint(validate_product({'name': 'apple', 'price': 0.5}))",
          task: "Raise ValueError if 'price' key is missing or if price < 0. Return the dict if valid.",
          expectedOutputContains: ["Caught:"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "syntax", text: "Check `'price' not in d` and `d['price'] < 0`." },
          ],
          feedback: {
            correct: "Well done! Validation catches bad data at the boundary.",
            incorrect: "Check if 'price' is missing with `'price' not in d`, and check `d['price'] < 0` for negative values.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-parsing", recallPrompt: "What is the 'validation boundary' and why does it matter?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-data-validation-mc", "s17-data-validation-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 17.18 Data Import/Export Project ─────────────────────────────────────
    {
      id: "s17-project-lesson",
      stageId: "stage-17",
      title: "Data Import/Export Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Combine JSON, CSV, and config-file parsing in a single program",
        "Apply validation at the parsing boundary",
        "Handle encoding and error cases gracefully",
      ],
      prerequisites: [
        "s17-json-dumps", "s17-json-load", "s17-csv-dictreader",
        "s17-csv-dictwriter", "s17-configparser", "s17-data-validation",
      ],
      concepts: ["json-parsing", "csv-reading", "configparser-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project: Data Import/Export Utility\n\nYou will build a command-line utility that:\n1. Reads configuration from an INI file (input/output paths, delimiter)\n2. Reads a CSV file of product records\n3. Validates each record (price must be positive, name must not be empty)\n4. Writes valid records to a JSON file\n5. Writes a summary (count of valid/invalid records) to another JSON file",
        },
        {
          kind: "text",
          markdown:
            "## Architecture\n\n```\nmain.py\n├── read_config(path) -> dict        # configparser\n├── read_products(path) -> list[dict] # csv.DictReader\n├── validate_product(d) -> bool       # validation\n├── write_json(data, path) -> None    # json.dump\n└── main() -> None                   # orchestration\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Start with the data flow",
          body: "Sketch the data transformation at each step before writing code: CSV row dict → validated product dict → JSON array.",
        },
        {
          kind: "text",
          markdown:
            "## Acceptance Criteria\n\n- Reads `config.ini` for paths and delimiter\n- Reads the CSV using `DictReader` with the configured delimiter\n- Rejects rows with empty name or non-positive price\n- Writes valid records to `output.json` (pretty-printed, UTF-8)\n- Writes `{\"valid\": N, \"invalid\": M}` to `summary.json`\n- All public functions have type annotations\n- All errors produce meaningful messages",
        },
        {
          kind: "why-matters",
          body: "Data pipeline scripts like this are written daily in data engineering, analytics, and backend development. Mastering the pattern means you can build reliable, auditable data flows.",
        },
      ],
      interactions: [
        {
          id: "s17-project-lesson-reorder",
          kind: "reorder-code",
          prompt: "Arrange the main pipeline steps in the correct logical order.",
          beginnerPurpose: "Think through the data flow before coding",
          expectedConceptIds: ["json-parsing", "csv-reading"],
          lines: [
            "config = read_config('config.ini')",
            "products = read_products(config['csv_path'])",
            "valid = [p for p in products if validate_product(p)]",
            "write_json(valid, config['output_path'])",
            'write_json({"valid": len(valid), "invalid": len(products) - len(valid)}, "summary.json")',
          ],
          correctOrder: [0, 1, 2, 3, 4],
          allowedAttempts: 3,
          hints: [{ level: "structural", text: "Config must be read first (to get file paths). Then read data, validate, write output, write summary." }],
          feedback: {
            correct: "Correct order! Config → read → validate → write output → write summary.",
            incorrect: "You need config first to know the file paths, then read data, then validate, then write results.",
          },
        },
        {
          id: "s17-project-lesson-mc",
          kind: "multiple-choice",
          prompt: "In the project, where should validation happen relative to writing the JSON output?",
          beginnerPurpose: "Reinforce the validation-boundary pattern",
          expectedConceptIds: ["json-parsing"],
          options: [
            { id: "a", text: "After writing — validate the output file", isCorrect: false, explanation: "Validate before writing to avoid writing bad data." },
            { id: "b", text: "Before writing — only write valid records", isCorrect: true, explanation: "Correct. Validate each record before it enters the output collection." },
            { id: "c", text: "During writing — use a try/except around json.dump", isCorrect: false, explanation: "JSON serialization errors are format errors, not business-logic errors." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Only valid data should make it into the output file." }],
          feedback: {
            correct: "Correct! Validate before writing to keep bad data out of the output.",
            incorrect: "Validate first — only write records that pass validation.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-parsing", recallPrompt: "Name the four format modules used in the data import/export project.", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s17-project-lesson-reorder", "s17-project-lesson-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s17-project",
    stageId: "stage-17",
    title: "Data Import/Export Utility",
    brief:
      "Build a command-line utility that reads configuration from an INI file, imports product records from CSV, validates them, and exports valid records to JSON with a summary file.",
    requirements: [
      "Read configuration (file paths, delimiter) from `config.ini` using configparser",
      "Read product records using `csv.DictReader` with the configured delimiter",
      "Validate each record: name must not be empty, price must be a positive number",
      "Write valid records to `output.json` using `json.dump` with `indent=2` and `ensure_ascii=False`",
      "Write a `summary.json` with counts of valid and invalid records",
      "Add type annotations to all public functions",
    ],
    acceptanceCriteria: [
      "Config file drives file paths — no hardcoded paths in code",
      "Invalid records are excluded from output and counted in the summary",
      "Output JSON is UTF-8 encoded and human-readable",
      "All public functions have type annotations",
      "The script prints a helpful error message if a required file is missing",
    ],
    conceptIds: ["json-parsing", "csv-reading", "configparser-basics"],
    difficulty: "intermediate",
    starterCode:
      'import configparser\nimport csv\nimport json\nfrom pathlib import Path\n\ndef read_config(path: str) -> dict:\n    """Read configuration from an INI file."""\n    pass\n\ndef read_products(path: str, delimiter: str = ",") -> list[dict]:\n    """Read product records from a CSV file."""\n    pass\n\ndef validate_product(product: dict) -> bool:\n    """Return True if the product record is valid."""\n    pass\n\ndef write_json(data: object, path: str) -> None:\n    """Write data to a JSON file with pretty-printing."""\n    pass\n\ndef main() -> None:\n    config = read_config("config.ini")\n    products = read_products(config["csv_path"], config.get("delimiter", ","))\n    valid = [p for p in products if validate_product(p)]\n    write_json(valid, config["output_path"])\n    write_json({"valid": len(valid), "invalid": len(products) - len(valid)}, "summary.json")\n    print(f"Done: {len(valid)} valid, {len(products) - len(valid)} invalid")\n\nif __name__ == "__main__":\n    main()\n',
  },
} satisfies Stage;
