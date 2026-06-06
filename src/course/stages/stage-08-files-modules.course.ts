import type { Stage } from "@/course/course.schema";

export const stage08 = {
  id: "stage-08",
  number: 8,
  title: "Files, Modules, and Environments",
  summary:
    "Read and write files, import modules, navigate the standard library, and understand virtual environments.",
  level: "intermediate",
  masteryGateConceptIds: [
    "file-io",
    "context-manager",
    "module",
    "import",
    "package",
    "stdlib",
    "virtual-env",
  ],
  lessons: [
    /* ── Lesson 1 ── */
    {
      id: "s8-reading-files",
      stageId: "stage-08",
      title: "Reading Files",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Open a file using open() in read mode",
        "Use a with statement to ensure the file is closed automatically",
        "Read all lines with readlines() or iterate line by line with a for loop",
        "Choose the correct read mode ('r' for text, 'rb' for binary)",
      ],
      prerequisites: ["s7-debugging-strategy"],
      concepts: ["file-io", "context-manager"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Opening and reading files\n\nUse `open(path, mode)` to open a file. The default mode is `'r'` (read text). Always close the file when done — the `with` statement does this automatically.\n\n```python\nwith open(\"data.txt\", \"r\") as f:\n    contents = f.read()\nprint(contents)\n```\n\nAfter the `with` block exits (normally or with an exception), Python closes the file.",
        },
        {
          kind: "mental-model",
          title: "with Is Like Borrowing a Library Book",
          analogy:
            "When you check out a library book you must return it — whether you finished it or not. The with statement is Python's 'checkout counter': it guarantees the file is returned (closed) when you're done.",
          explanation:
            "Without with, you must call f.close() manually. If an exception occurs before close(), the file stays open, wasting resources or locking the file on some operating systems.",
        },
        {
          kind: "text",
          markdown:
            "## Read modes\n\n| Mode | Meaning |\n|------|---------|\n| `'r'` | Read text (default) |\n| `'rb'` | Read binary (images, PDFs) |\n| `'r+'` | Read and write |\n\nFor most text files, `'r'` is correct. Specify encoding for non-ASCII files: `open(path, 'r', encoding='utf-8')`.",
        },
        {
          kind: "code",
          language: "python",
          code: `# Reading all content at once
with open("notes.txt", "r") as f:
    content = f.read()
print(content)

# Reading line by line (memory-efficient for large files)
with open("notes.txt", "r") as f:
    for line in f:
        print(line.strip())   # strip() removes the trailing newline`,
          caption:
            "f.read() loads the whole file; iterating over f yields one line at a time.",
          highlight: [2, 3, 7, 8],
        },
        {
          kind: "callout",
          variant: "tip",
          title: "strip() removes trailing newlines",
          body: "Each line read from a file ends with '\\n'. Calling line.strip() removes leading and trailing whitespace, including that newline, giving you clean text.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "FileNotFoundError if the path is wrong",
          body: "If the file doesn't exist, open() raises FileNotFoundError. Always wrap file operations in try/except FileNotFoundError when the file's existence isn't guaranteed.",
        },
        {
          kind: "glossary-term",
          term: "context manager",
          definition:
            "An object that defines setup and teardown actions using the with statement. Files used as context managers are automatically closed when the with block exits.",
          example: `with open("file.txt") as f:\n    data = f.read()`,
        },
      ],
      interactions: [
        {
          id: "s8-rf-predict-1",
          kind: "predict-output",
          prompt:
            "Assume 'greet.txt' contains exactly:\n\nHello\nWorld\n\nWhat does this code print?",
          beginnerPurpose:
            "Understand that iterating over a file yields lines with trailing newlines, and strip() removes them.",
          expectedConceptIds: ["file-io", "context-manager"],
          code: `with open("greet.txt", "r") as f:
    for line in f:
        print(line.strip())`,
          expectedOutput: "Hello\nWorld",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Iterating over a file yields each line including its trailing newline. strip() removes it.",
            },
          ],
          feedback: {
            correct:
              "Correct! Each line is stripped of its trailing newline before printing.",
            incorrect:
              "The file has two lines: 'Hello' and 'World'. strip() removes the newline at the end of each.",
          },
        },
        {
          id: "s8-rf-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the with statement so the file is opened in read mode and all its text is stored in 'content'.",
          beginnerPurpose:
            "Practice writing a complete with/open/read block.",
          expectedConceptIds: ["file-io", "context-manager"],
          codeTemplate: `___with___ open("report.txt", "r") as f:
    content = f.read()
print(len(content))`,
          blanks: [
            {
              placeholder: "___with___",
              answer: "with",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The context manager keyword that ensures the file is closed is 'with'.",
            },
          ],
          feedback: {
            correct:
              "Correct! 'with open(...) as f:' is the standard Python file-reading idiom.",
            incorrect:
              "The keyword that opens a context manager block is 'with'.",
          },
        },
        {
          id: "s8-rf-mc-1",
          kind: "multiple-choice",
          prompt:
            "Which mode string should you pass to open() to read a JPEG image file?",
          beginnerPurpose:
            "Understand when to use text vs binary mode.",
          expectedConceptIds: ["file-io"],
          options: [
            {
              id: "s8-rf-mc-1-a",
              text: "'r'",
              isCorrect: false,
              explanation:
                "Mode 'r' reads text and may corrupt binary data by applying line-ending conversions.",
            },
            {
              id: "s8-rf-mc-1-b",
              text: "'rb'",
              isCorrect: true,
              explanation:
                "Binary read mode 'rb' reads the file as raw bytes without any text decoding or line-ending conversion.",
            },
            {
              id: "s8-rf-mc-1-c",
              text: "'w'",
              isCorrect: false,
              explanation:
                "Mode 'w' opens for writing and would truncate (erase) the existing file.",
            },
            {
              id: "s8-rf-mc-1-d",
              text: "'a'",
              isCorrect: false,
              explanation:
                "Mode 'a' opens for appending and would not let you read the existing content.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Non-text files (images, PDFs, audio) need binary mode. Text encoding conversions would corrupt them.",
            },
          ],
          feedback: {
            correct:
              "Correct! 'rb' reads raw bytes without any text-encoding interpretation.",
            incorrect:
              "Images are binary files — use 'rb' (read binary) to avoid text-mode conversions corrupting the data.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "file-io",
          recallPrompt:
            "What exception does open() raise if the file doesn't exist, and how do you handle it?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "context-manager",
          recallPrompt:
            "Why is 'with open(...) as f:' preferred over 'f = open(...)' followed by 'f.close()'?",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s8-rf-predict-1",
          "s8-rf-fill-1",
          "s8-rf-mc-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["file-io", "context-manager"],
      },
    },

    /* ── Lesson 2 ── */
    {
      id: "s8-writing-files",
      stageId: "stage-08",
      title: "Writing Files",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Open a file in write mode 'w' and write strings to it",
        "Open in append mode 'a' to add content without erasing existing data",
        "Use writelines() to write a list of strings at once",
        "Understand that 'w' mode truncates the file if it already exists",
      ],
      prerequisites: ["s8-reading-files"],
      concepts: ["file-io"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Write mode and append mode\n\n| Mode | Behaviour |\n|------|-----------|\n| `'w'` | Create new file or **erase** existing content, then write |\n| `'a'` | Create new file or **add** to the end of existing content |\n| `'wb'` | Write binary data |\n\nUsing `'w'` on an existing file permanently destroys its previous content. If that's not what you want, use `'a'`.",
        },
        {
          kind: "code",
          language: "python",
          code: `# Write mode — creates or overwrites
with open("output.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")

# Append mode — adds to existing content
with open("output.txt", "a") as f:
    f.write("Line 3\\n")`,
          caption:
            "write() takes a string. You must include '\\n' yourself — Python won't add newlines automatically.",
          highlight: [2, 3, 7],
        },
        {
          kind: "code",
          language: "python",
          code: `lines = ["apple\\n", "banana\\n", "cherry\\n"]

with open("fruits.txt", "w") as f:
    f.writelines(lines)     # writes each string in the list`,
          caption:
            "writelines() writes every string in an iterable. Newlines must still be in the strings.",
          highlight: [4],
        },
        {
          kind: "callout",
          variant: "danger",
          title: "'w' mode is destructive",
          body: "Opening an existing file with 'w' immediately erases its contents, even if you never call write(). Always double-check the mode before writing to important files.",
        },
        {
          kind: "why-matters",
          body: "Writing files is how programs persist results beyond a single run — saving reports, logs, configuration, and data. Mastering read/write modes prevents costly data loss from accidentally overwriting files.",
        },
      ],
      interactions: [
        {
          id: "s8-wf-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the open() call to append a new log entry without erasing the existing log file.",
          beginnerPurpose:
            "Choose between 'w' and 'a' mode based on the desired behaviour.",
          expectedConceptIds: ["file-io"],
          codeTemplate: `import datetime

entry = f"{datetime.date.today()}: Server started\\n"

with open("server.log", "___a___") as f:
    f.write(entry)`,
          blanks: [
            {
              placeholder: "___a___",
              answer: "a",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "To add to a file without erasing it, use append mode: 'a'.",
            },
          ],
          feedback: {
            correct:
              "Correct! Mode 'a' appends to the end of the file, preserving existing entries.",
            incorrect:
              "Use mode 'a' (append). Mode 'w' would erase all previous log entries.",
          },
        },
        {
          id: "s8-wf-reorder-1",
          kind: "reorder-code",
          prompt:
            "Put these steps in the correct order to write a list of names to a file, one per line.",
          beginnerPurpose:
            "Internalise the open → write → implicit-close pattern with a with statement.",
          expectedConceptIds: ["file-io", "context-manager"],
          lines: [
            '    f.write(name + "\\n")',
            "names = [\"Alice\", \"Bob\", \"Carol\"]",
            "with open(\"names.txt\", \"w\") as f:",
            "    for name in names:",
          ],
          correctOrder: [1, 2, 3, 0],
          allowedAttempts: 3,
          hints: [
            {
              level: "structural",
              text: "Define the data first, open the file second, then loop and write.",
            },
          ],
          feedback: {
            correct:
              "Correct! Create the data, open the file with 'with', then loop and write each item.",
            incorrect:
              "The list must be defined before the with block. The loop and write are inside the with block.",
          },
        },
        {
          id: "s8-wf-mc-1",
          kind: "multiple-choice",
          prompt:
            "You run a script that opens 'data.csv' with mode 'w' but never calls write(). What happens to the file?",
          beginnerPurpose:
            "Understand that 'w' mode truncates immediately on open.",
          expectedConceptIds: ["file-io"],
          options: [
            {
              id: "s8-wf-mc-1-a",
              text: "Nothing changes — the file is unchanged because you didn't write anything.",
              isCorrect: false,
              explanation:
                "Mode 'w' truncates the file to zero bytes the moment open() is called, regardless of whether you call write().",
            },
            {
              id: "s8-wf-mc-1-b",
              text: "The file is erased (truncated to zero bytes).",
              isCorrect: true,
              explanation:
                "Opening with 'w' immediately discards all existing content. This is why 'w' is called 'write' (or 'truncate-and-write') mode.",
            },
            {
              id: "s8-wf-mc-1-c",
              text: "Python raises an error because nothing was written.",
              isCorrect: false,
              explanation:
                "Python does not require you to write anything. The file is opened and immediately truncated.",
            },
            {
              id: "s8-wf-mc-1-d",
              text: "The file is renamed to a backup before being cleared.",
              isCorrect: false,
              explanation:
                "Python's open() does not create backups. The original content is simply lost.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Mode 'w' truncates on open, not on write. Think of it as: 'prepare a blank page' as soon as you open.",
            },
          ],
          feedback: {
            correct:
              "Correct! 'w' truncates the file to zero bytes the moment open() is called.",
            incorrect:
              "Mode 'w' immediately erases the file when it's opened. Always double-check before using 'w' on important files.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "file-io",
          recallPrompt:
            "What is the difference between file modes 'w' and 'a'? When would you accidentally destroy data?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s8-wf-fill-1",
          "s8-wf-reorder-1",
          "s8-wf-mc-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["file-io"],
      },
    },

    /* ── Lesson 3 ── */
    {
      id: "s8-csv-json",
      stageId: "stage-08",
      title: "CSV and JSON Files",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use the csv module to read rows from a CSV file",
        "Use json.loads() and json.dumps() to parse and serialise JSON strings",
        "Use json.load() and json.dump() to read and write JSON files directly",
        "Choose between CSV and JSON based on the data's structure",
      ],
      prerequisites: ["s8-writing-files"],
      concepts: ["file-io", "stdlib", "module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## CSV files with the csv module\n\nCSV (Comma-Separated Values) is a plain-text format for tabular data. Python's built-in `csv` module handles quoting, escaping, and different delimiters.\n\n```python\nimport csv\n\nwith open(\"data.csv\", \"r\", newline=\"\") as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row)   # each row is a list of strings\n```\n\nPass `newline=\"\"` to open() when using the csv module — it prevents double-newline issues on Windows.",
        },
        {
          kind: "code",
          language: "python",
          code: `import csv

# Writing CSV
rows = [["name", "age"], ["Alice", "30"], ["Bob", "25"]]
with open("people.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

# Reading CSV
with open("people.csv", "r", newline="") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)`,
          caption:
            "csv.writer.writerows() writes all rows at once. csv.reader yields each row as a list of strings.",
          highlight: [5, 6, 11, 12],
        },
        {
          kind: "output",
          text: "['name', 'age']\n['Alice', '30']\n['Bob', '25']",
          isError: false,
        },
        {
          kind: "text",
          markdown:
            "## JSON with the json module\n\nJSON (JavaScript Object Notation) stores nested data: dicts, lists, strings, numbers, booleans, and null. Python's `json` module converts between Python objects and JSON.\n\n| Function | Direction |\n|----------|-----------|\n| `json.dumps(obj)` | Python → JSON string |\n| `json.loads(s)` | JSON string → Python |\n| `json.dump(obj, f)` | Python → JSON file |\n| `json.load(f)` | JSON file → Python |",
        },
        {
          kind: "code",
          language: "python",
          code: `import json

data = {"name": "Alice", "scores": [95, 87, 92], "active": True}

# Serialise to a JSON string
json_str = json.dumps(data, indent=2)
print(json_str)

# Parse back to Python
parsed = json.loads(json_str)
print(parsed["name"])
print(type(parsed["scores"]))`,
          caption:
            "indent=2 makes the JSON output human-readable. json.loads() returns Python objects.",
          highlight: [6, 10],
        },
        {
          kind: "output",
          text: '{\n  "name": "Alice",\n  "scores": [\n    95,\n    87,\n    92\n  ],\n  "active": true\n}\nAlice\n<class \'list\'>',
          isError: false,
        },
        {
          kind: "comparison",
          leftLabel: "CSV — for tabular data",
          rightLabel: "JSON — for nested/structured data",
          leftCode: `name,age,city
Alice,30,London
Bob,25,Paris`,
          rightCode: `{
  "users": [
    {"name": "Alice", "age": 30},
    {"name": "Bob",   "age": 25}
  ]
}`,
          caption:
            "CSV is flat (rows and columns). JSON handles nesting naturally.",
        },
      ],
      interactions: [
        {
          id: "s8-cj-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Trace json.dumps() output format including Python True → JSON true.",
          expectedConceptIds: ["stdlib", "module"],
          code: `import json

record = {"city": "Tokyo", "population": 13960000, "capital": True}
print(json.dumps(record))`,
          expectedOutput: '{"city": "Tokyo", "population": 13960000, "capital": true}',
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "json.dumps() converts Python types to JSON equivalents. Python True becomes JSON true (lowercase).",
            },
          ],
          feedback: {
            correct:
              "Correct! Python True → JSON true. Keys and string values are double-quoted.",
            incorrect:
              "JSON uses lowercase 'true'/'false' for booleans, unlike Python's True/False.",
          },
        },
        {
          id: "s8-cj-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the code to read all rows from 'scores.csv' using the csv module.",
          beginnerPurpose:
            "Practice writing the csv.reader loop pattern.",
          expectedConceptIds: ["stdlib", "file-io"],
          codeTemplate: `import csv

with open("scores.csv", "r", newline="") as f:
    reader = csv.___reader___(f)
    for row in reader:
        print(row)`,
          blanks: [
            {
              placeholder: "___reader___",
              answer: "reader",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The csv function that creates an iterable that yields rows as lists is csv.reader().",
            },
          ],
          feedback: {
            correct:
              "Correct! csv.reader(f) creates an iterator that yields each row as a list of strings.",
            incorrect:
              "Use csv.reader(f) to create a row iterator from the file object.",
          },
        },
        {
          id: "s8-cj-mc-1",
          kind: "multiple-choice",
          prompt:
            "You need to store a list of blog posts, each with a title, tags (a list), and metadata (a nested dict). Which format is more appropriate?",
          beginnerPurpose:
            "Apply the CSV vs JSON decision based on data structure.",
          expectedConceptIds: ["stdlib"],
          options: [
            {
              id: "s8-cj-mc-1-a",
              text: "CSV, because it is simpler and widely supported.",
              isCorrect: false,
              explanation:
                "CSV is flat — it cannot represent nested data like lists of tags or nested dicts without awkward workarounds.",
            },
            {
              id: "s8-cj-mc-1-b",
              text: "JSON, because it handles nested structures (lists inside dicts) naturally.",
              isCorrect: true,
              explanation:
                "JSON can represent arbitrarily nested structures, making it the right choice for data that has arrays or sub-objects.",
            },
            {
              id: "s8-cj-mc-1-c",
              text: "Either — they are interchangeable for all data types.",
              isCorrect: false,
              explanation:
                "CSV is limited to flat tabular data. Nested data requires JSON or a similar format.",
            },
            {
              id: "s8-cj-mc-1-d",
              text: "Neither — you should use a database.",
              isCorrect: false,
              explanation:
                "JSON files are perfectly appropriate for storing structured data that doesn't need querying.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Can a CSV row represent a list inside a field without a special encoding? That's the question.",
            },
          ],
          feedback: {
            correct:
              "Correct! JSON represents nested data natively; CSV only handles flat rows and columns.",
            incorrect:
              "The presence of lists (tags) and nested dicts (metadata) rules out CSV — use JSON.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "stdlib",
          recallPrompt:
            "Name the four json module functions and the direction each one goes (Python → JSON or JSON → Python).",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s8-cj-predict-1",
          "s8-cj-fill-1",
          "s8-cj-mc-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["stdlib"],
      },
    },

    /* ── Lesson 4 ── */
    {
      id: "s8-imports-modules",
      stageId: "stage-08",
      title: "Imports and the Standard Library",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use import, from X import Y, and import X as alias",
        "List at least six standard library modules and their primary use",
        "Access a function from an imported module using dot notation",
      ],
      prerequisites: ["s8-csv-json"],
      concepts: ["module", "import", "package", "stdlib"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Three ways to import\n\n```python\nimport math               # whole module — use math.sqrt()\nfrom math import sqrt     # specific name — use sqrt()\nimport math as m          # alias — use m.sqrt()\nfrom math import sqrt, pi # multiple names\n```\n\nChoose `import module` for clarity (you see where everything comes from). Use `from module import name` when you use something heavily and the name doesn't clash.",
        },
        {
          kind: "code",
          language: "python",
          code: `import math

print(math.sqrt(16))      # 4.0
print(math.pi)            # 3.141592653589793
print(math.floor(3.9))    # 3
print(math.ceil(3.1))     # 4`,
          caption:
            "Dot notation clarifies that these names come from the math module.",
          highlight: [3, 4, 5, 6],
        },
        {
          kind: "output",
          text: "4.0\n3.141592653589793\n3\n4",
          isError: false,
        },
        {
          kind: "text",
          markdown:
            "## The Python Standard Library — a quick tour\n\n| Module | What it provides |\n|--------|------------------|\n| `os` | File system operations, environment variables |\n| `sys` | Python interpreter info, command-line arguments |\n| `math` | Mathematical functions (sqrt, log, trig) |\n| `datetime` | Dates, times, durations |\n| `pathlib` | Object-oriented file paths |\n| `random` | Random numbers and choices |\n| `re` | Regular expressions |\n| `json` | JSON encoding/decoding |\n| `csv` | CSV reading/writing |\n| `collections` | Specialised containers (Counter, deque) |\n\nAll of these ship with Python — no installation needed.",
        },
        {
          kind: "code",
          language: "python",
          code: `from pathlib import Path
import datetime
import random

# pathlib — modern file path handling
p = Path("data") / "report.txt"
print(p)                            # data/report.txt

# datetime — today's date
today = datetime.date.today()
print(today)                        # e.g. 2026-06-05

# random — pick a random item
colours = ["red", "green", "blue"]
print(random.choice(colours))`,
          caption:
            "Standard library modules provide high-quality, tested implementations for common tasks.",
        },
        {
          kind: "why-matters",
          body: "Python ships with 'batteries included' — hundreds of modules covering networking, compression, XML, databases, unit testing, and more. Knowing the standard library means you reach for a well-tested solution rather than writing everything from scratch.",
        },
        {
          kind: "glossary-term",
          term: "module",
          definition:
            "A Python file that contains definitions (functions, classes, constants) which can be imported and reused in other files.",
          example: "import math  # math is a module",
        },
        {
          kind: "glossary-term",
          term: "package",
          definition:
            "A directory containing a __init__.py file (or an implicit namespace package) that groups related modules. pip installs packages.",
          example: "import requests  # requests is a third-party package",
        },
      ],
      interactions: [
        {
          id: "s8-im-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the import statement so that 'choice' can be called directly without the 'random.' prefix.",
          beginnerPurpose:
            "Practise the 'from X import Y' pattern for importing specific names.",
          expectedConceptIds: ["import", "module"],
          codeTemplate: `from random ___import___ choice

items = [1, 2, 3, 4, 5]
print(choice(items))`,
          blanks: [
            {
              placeholder: "___import___",
              answer: "import",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The pattern is: from module_name import name_to_use",
            },
          ],
          feedback: {
            correct:
              "Correct! 'from random import choice' puts 'choice' directly into the current namespace.",
            incorrect:
              "The full pattern is 'from random import choice'. The missing keyword is 'import'.",
          },
        },
        {
          id: "s8-im-mc-1",
          kind: "multiple-choice",
          prompt:
            "Which standard library module would you use to work with file paths in an OS-independent way?",
          beginnerPurpose:
            "Build familiarity with the standard library module landscape.",
          expectedConceptIds: ["stdlib"],
          options: [
            {
              id: "s8-im-mc-1-a",
              text: "os",
              isCorrect: false,
              explanation:
                "os has path utilities (os.path), but they return strings and are less ergonomic than pathlib.",
            },
            {
              id: "s8-im-mc-1-b",
              text: "sys",
              isCorrect: false,
              explanation:
                "sys provides interpreter metadata and command-line arguments, not file path utilities.",
            },
            {
              id: "s8-im-mc-1-c",
              text: "pathlib",
              isCorrect: true,
              explanation:
                "pathlib.Path is the modern, object-oriented way to work with file paths — it handles OS differences automatically.",
            },
            {
              id: "s8-im-mc-1-d",
              text: "re",
              isCorrect: false,
              explanation:
                "re is for regular expressions, not file paths.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "A module added in Python 3.4 specifically to replace string-based path manipulation with an object-oriented API.",
            },
          ],
          feedback: {
            correct:
              "Correct! pathlib.Path is the recommended modern approach to file paths.",
            incorrect:
              "pathlib was added in Python 3.4 specifically for cross-platform, object-oriented path handling.",
          },
        },
        {
          id: "s8-im-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Confirm you can trace a stdlib function call to its exact return value.",
          expectedConceptIds: ["stdlib", "import"],
          code: `import math

print(math.sqrt(25))
print(math.floor(4.9))
print(math.ceil(4.1))`,
          expectedOutput: "5.0\n4\n5",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "sqrt(25) is 5 but returns a float. floor rounds down. ceil rounds up.",
            },
          ],
          feedback: {
            correct:
              "Correct! sqrt returns a float (5.0), floor rounds down (4), ceil rounds up (5).",
            incorrect:
              "math.sqrt always returns float. math.floor(4.9)=4. math.ceil(4.1)=5.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "import",
          recallPrompt:
            "Write the three import styles from memory. When would you use 'import X as alias'?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "stdlib",
          recallPrompt:
            "Name six standard library modules and one thing each provides.",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s8-im-fill-1",
          "s8-im-mc-1",
          "s8-im-predict-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["import", "stdlib"],
      },
    },

    /* ── Lesson 5 ── */
    {
      id: "s8-virtual-environments",
      stageId: "stage-08",
      title: "Virtual Environments and Dependencies",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain why virtual environments prevent dependency conflicts",
        "Describe the three steps to create and use a virtual environment",
        "Understand the purpose of requirements.txt for reproducibility",
        "Know the difference between stdlib modules and third-party packages",
      ],
      prerequisites: ["s8-imports-modules"],
      concepts: ["virtual-env", "package"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Why virtual environments?\n\nBy default, `pip install` puts packages into a global Python installation shared by all your projects. This causes **dependency conflicts**: Project A needs `requests==2.28` while Project B needs `requests==2.32`.\n\nA **virtual environment** is an isolated copy of Python and its packages, living inside a project directory. Changes to one environment don't affect others.",
        },
        {
          kind: "mental-model",
          title: "A Virtual Environment Is a Dedicated Toolbox",
          analogy:
            "Imagine you're a plumber and an electrician. You keep separate toolboxes for each trade. If you borrow a wrench for plumbing, it doesn't mess with your electrical gear. Virtual environments are separate toolboxes for each project.",
          explanation:
            "Each virtual environment has its own Python interpreter and site-packages directory. Activating one puts its interpreter first on your PATH so 'python' and 'pip' refer to that environment.",
        },
        {
          kind: "text",
          markdown:
            "## Creating and using a virtual environment\n\n```bash\n# 1. Create the environment\npython -m venv .venv\n\n# 2. Activate it (Linux/macOS)\nsource .venv/bin/activate\n\n# 2. Activate it (Windows)\n.venv\\Scripts\\activate\n\n# 3. Install packages into this environment\npip install requests\n\n# Deactivate when done\ndeactivate\n```\n\nThe prompt usually changes to show `(.venv)` when an environment is active.",
        },
        {
          kind: "text",
          markdown:
            "## requirements.txt\n\nA `requirements.txt` file lists every package and version your project needs:\n\n```\nrequests==2.32.3\npandas==2.2.2\npytest==8.2.0\n```\n\nShare this file so teammates (or CI) can recreate your exact environment:\n\n```bash\npip install -r requirements.txt\n```",
        },
        {
          kind: "comparison",
          leftLabel: "Standard library (built-in)",
          rightLabel: "Third-party package (needs pip)",
          leftCode: `import json        # ships with Python
import pathlib     # ships with Python
import datetime    # ships with Python`,
          rightCode: `import requests    # pip install requests
import pandas      # pip install pandas
import pytest      # pip install pytest`,
          caption:
            "Standard library modules are always available. Third-party packages must be installed.",
        },
        {
          kind: "why-matters",
          body: "Professional Python projects always use virtual environments. Without them, a pip upgrade for one project silently breaks another. requirements.txt makes your project reproducible — anyone can install the same packages and get the same behaviour.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Add .venv to .gitignore",
          body: "Never commit the .venv directory to version control. It contains compiled binaries specific to your machine. Commit only requirements.txt so others can recreate the environment.",
        },
      ],
      interactions: [
        {
          id: "s8-ve-mc-1",
          kind: "multiple-choice",
          prompt:
            "You start a new Python project. Which is the first thing you should do regarding dependencies?",
          beginnerPurpose:
            "Build the habit of creating a virtual environment before installing any packages.",
          expectedConceptIds: ["virtual-env"],
          options: [
            {
              id: "s8-ve-mc-1-a",
              text: "Run `pip install` for every package you think you might need.",
              isCorrect: false,
              explanation:
                "Installing globally pollutes the shared environment and can break other projects.",
            },
            {
              id: "s8-ve-mc-1-b",
              text: "Create a virtual environment with `python -m venv .venv` and activate it.",
              isCorrect: true,
              explanation:
                "Creating and activating a virtual environment first ensures all installs are isolated to this project.",
            },
            {
              id: "s8-ve-mc-1-c",
              text: "Copy the site-packages folder from an existing project.",
              isCorrect: false,
              explanation:
                "Copying packages bypasses version management and can introduce incompatible binaries.",
            },
            {
              id: "s8-ve-mc-1-d",
              text: "Nothing — the global Python is fine for all projects.",
              isCorrect: false,
              explanation:
                "The global Python becomes a conflict zone when projects need different versions of the same package.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Isolation prevents dependency conflicts. Which option creates that isolation?",
            },
          ],
          feedback: {
            correct:
              "Correct! Creating a venv first is step one of every professional Python project.",
            incorrect:
              "Always create and activate a virtual environment before installing packages for a new project.",
          },
        },
        {
          id: "s8-ve-explain-1",
          kind: "plain-language-explain",
          prompt:
            "Explain to a beginner what a virtual environment does and why you need one.",
          beginnerPurpose:
            "Solidify the isolation concept and its real-world motivation.",
          expectedConceptIds: ["virtual-env", "package"],
          code: `# No runnable code — this is a conceptual topic.
# Virtual environment commands (run in terminal, not Python):
#
#   python -m venv .venv          # create
#   source .venv/bin/activate     # activate (Linux/macOS)
#   pip install requests          # install into this env only
#   pip freeze > requirements.txt # save the list
#   deactivate                    # leave the env`,
          keyPointsToHit: [
            "Each project gets its own isolated set of packages",
            "Prevents version conflicts between projects",
            "Activated environment means 'python' and 'pip' refer to that environment",
            "requirements.txt records exact versions for reproducibility",
          ],
          sampleAnswer:
            "A virtual environment is a self-contained folder that holds a copy of Python and its packages just for one project. Without it, all your projects share one global set of packages. If Project A needs version 1 of a library and Project B needs version 2, they'd conflict. With virtual environments, each project has its own versions and they never interfere. You activate it before working, and deactivate when you're done.",
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Think about what problem arises when two projects need different versions of the same package.",
            },
          ],
          feedback: {
            correct:
              "Great explanation! Isolation and reproducibility are the two key benefits.",
            incorrect:
              "Focus on: isolation from other projects, solving version conflicts, and reproducibility via requirements.txt.",
          },
        },
        {
          id: "s8-ve-reorder-1",
          kind: "reorder-code",
          prompt:
            "Arrange these terminal commands in the correct order to set up a new Python project with an isolated environment.",
          beginnerPurpose:
            "Build a muscle-memory sequence for project setup.",
          expectedConceptIds: ["virtual-env"],
          lines: [
            "pip install requests",
            "python -m venv .venv",
            "pip freeze > requirements.txt",
            "source .venv/bin/activate",
          ],
          correctOrder: [1, 3, 0, 2],
          allowedAttempts: 3,
          hints: [
            {
              level: "structural",
              text: "Create before activating. Activate before installing. Freeze after installing.",
            },
          ],
          feedback: {
            correct:
              "Correct! Create venv → activate → install packages → freeze requirements.",
            incorrect:
              "Order: (1) create the environment, (2) activate it, (3) install packages, (4) freeze to requirements.txt.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "virtual-env",
          recallPrompt:
            "What command creates a virtual environment, and what file should you commit to let others reproduce it?",
          nextReviewAfterDays: 5,
        },
        {
          conceptId: "package",
          recallPrompt:
            "What is the difference between a Python standard library module and a third-party package?",
          nextReviewAfterDays: 7,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s8-ve-mc-1",
          "s8-ve-explain-1",
          "s8-ve-reorder-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["virtual-env", "package"],
      },
    },
  ],
  project: {
    id: "s8-project",
    stageId: "stage-08",
    title: "Personal Automation CLI",
    brief:
      "Build a command-line script that reads a CSV of tasks, filters by category, and writes a summary report to a JSON file.",
    requirements: [
      "Read a tasks CSV file using the csv module (columns: task, category, done)",
      "Parse 'done' field as boolean (accept 'true'/'false' case-insensitively)",
      "Filter tasks by a category provided as a variable or argument",
      "Write a summary dict to a JSON file using json.dump with indent=2",
      "Use pathlib.Path for all file path construction",
      "Handle FileNotFoundError gracefully with a clear error message",
    ],
    acceptanceCriteria: [
      "Running the script with a valid CSV produces a well-formed JSON output file",
      "FileNotFoundError is caught and a human-readable message is printed",
      "pathlib.Path is used (not bare string concatenation) for paths",
      "The JSON output includes at least: category, total_tasks, completed_count",
      "csv and json modules are imported (not third-party alternatives)",
    ],
    conceptIds: ["file-io", "context-manager", "module", "import", "stdlib"],
    difficulty: "intermediate",
    starterCode: `"""Personal Automation CLI — task summary generator."""
import csv
import json
from pathlib import Path


INPUT_CSV = Path("tasks.csv")
OUTPUT_JSON = Path("summary.json")
FILTER_CATEGORY = "work"  # change as needed


def read_tasks(path: Path) -> list[dict]:
    """Read tasks from a CSV file and return a list of dicts."""
    # your code here
    pass


def filter_by_category(tasks: list[dict], category: str) -> list[dict]:
    """Return only tasks matching the given category (case-insensitive)."""
    # your code here
    pass


def build_summary(tasks: list[dict], category: str) -> dict:
    """Build a summary dict from the filtered tasks."""
    # your code here
    pass


if __name__ == "__main__":
    try:
        tasks = read_tasks(INPUT_CSV)
    except FileNotFoundError:
        print(f"Error: '{INPUT_CSV}' not found.")
        raise SystemExit(1)

    filtered = filter_by_category(tasks, FILTER_CATEGORY)
    summary = build_summary(filtered, FILTER_CATEGORY)

    with open(OUTPUT_JSON, "w") as f:
        json.dump(summary, f, indent=2)

    print(f"Summary written to {OUTPUT_JSON}")
`,
  },
} satisfies Stage;
