import type { Stage } from "@/course/course.schema";

export const stage18 = {
  id: "stage-18",
  number: 18,
  title: "Modules, Imports, Packages, and Environments",
  summary:
    "Understand Python's import system from first principles. Learn to write and structure packages, use virtual environments, manage dependencies, and debug import issues.",
  level: "intermediate",
  masteryGateConceptIds: ["module-import", "python-packages", "virtual-environments"],
  lessons: [
    // ─── 18.1 import statement ────────────────────────────────────────────────
    {
      id: "s18-import-statement",
      stageId: "stage-18",
      title: "The import Statement",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use `import` to load a module and access its contents",
        "Understand that a module is executed once and cached",
      ],
      prerequisites: [],
      concepts: ["module-import"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nAs programs grow, you need to split code across files and reuse code written by others. The `import` statement is the mechanism that makes this possible.",
        },
        {
          kind: "why-matters",
          body: "Almost every Python file beyond a simple script uses `import`. The standard library, third-party packages, and your own code modules all enter via `import`.",
        },
        {
          kind: "text",
          markdown:
            "## 2 — Core Concept\n\nA **module** is any Python file (`.py`). The `import` statement loads it, executes it (top to bottom), and binds a name in the current namespace.",
        },
        {
          kind: "code",
          language: "python",
          code: "import math\n\nprint(math.sqrt(16))   # 4.0\nprint(math.pi)         # 3.141592653589793\nprint(type(math))      # <class 'module'>",
          caption: "Access module contents via dot notation",
        },
        {
          kind: "mental-model",
          title: "import as a Filing Cabinet",
          analogy: "Think of each module as a labelled drawer in a filing cabinet. `import math` pulls that drawer open. Everything inside becomes accessible via `math.something`.",
          explanation: "The drawer is only 'opened' (executed) once. After that, Python reuses the already-open drawer from `sys.modules`.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Modules are executed only once",
          body: "Python caches imported modules in `sys.modules`. If two files both `import math`, the math module code only runs once. Subsequent imports get the cached object.",
        },
        {
          kind: "text",
          markdown:
            "## Breakdown Cases\n\nIf the module cannot be found, Python raises `ModuleNotFoundError` (a subclass of `ImportError`):\n\n```python\nimport nonexistent\n# ModuleNotFoundError: No module named 'nonexistent'\n```",
        },
      ],
      interactions: [
        {
          id: "s18-import-predict",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Confirm basic module attribute access",
          expectedConceptIds: ["module-import"],
          code: "import math\nprint(math.floor(3.7))",
          expectedOutput: "3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`math.floor()` rounds down to the nearest integer." }],
          feedback: {
            correct: "Correct! `math.floor(3.7)` returns `3`.",
            incorrect: "`math.floor()` rounds down — 3.7 rounds down to 3.",
          },
        },
        {
          id: "s18-import-mc",
          kind: "multiple-choice",
          prompt: "What happens the second time you `import math` in the same program?",
          beginnerPurpose: "Understand the module caching mechanism",
          expectedConceptIds: ["module-import"],
          options: [
            { id: "a", text: "Python re-reads and re-executes the math module file", isCorrect: false, explanation: "Python caches modules in `sys.modules` after the first import." },
            { id: "b", text: "Python returns the already-cached module object from `sys.modules`", isCorrect: true, explanation: "Correct! The second import is very cheap — it's just a dict lookup." },
            { id: "c", text: "Python raises an ImportError", isCorrect: false, explanation: "Importing the same module twice is allowed and very common." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about the `sys.modules` cache." }],
          feedback: {
            correct: "Correct! Modules are cached after the first import.",
            incorrect: "Python caches imported modules in `sys.modules`, so the second import is just a fast lookup.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "module-import", recallPrompt: "What exception is raised when a module cannot be found?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-import-predict", "s18-import-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.2 from...import ───────────────────────────────────────────────────
    {
      id: "s18-from-import",
      stageId: "stage-18",
      title: "from ... import",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use `from module import name` to import specific names",
        "Explain the difference between `import math` and `from math import sqrt`",
      ],
      prerequisites: ["s18-import-statement"],
      concepts: ["module-import"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nSometimes you only need one or two things from a module. `from math import sqrt` imports just the `sqrt` function, binding it directly as `sqrt` rather than `math.sqrt`.",
        },
        {
          kind: "comparison",
          leftLabel: "import (qualified access)",
          rightLabel: "from ... import (direct binding)",
          leftCode: "import math\nresult = math.sqrt(16)",
          rightCode: "from math import sqrt\nresult = sqrt(16)",
          caption: "Both do the same thing; style and namespace clarity differ",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Avoid `from module import *`",
          body: "Wildcard imports (`from math import *`) pollute your namespace with all public names from the module, making it hard to trace where names come from. Use explicit imports.",
        },
        {
          kind: "text",
          markdown:
            "## Multiple Names\n\nImport several names in one line:\n\n```python\nfrom pathlib import Path, PurePath\nfrom typing import List, Optional\n```",
        },
        {
          kind: "text",
          markdown:
            "## Breakdown Cases\n\nIf the name does not exist in the module, you get `ImportError`:\n\n```python\nfrom math import squart  # typo!\n# ImportError: cannot import name 'squart' from 'math'\n```",
        },
      ],
      interactions: [
        {
          id: "s18-from-import-fill",
          kind: "fill-code",
          prompt: "Fill in the blank to import only `ceil` from the math module.",
          beginnerPurpose: "Practise the from-import syntax",
          expectedConceptIds: ["module-import"],
          codeTemplate: "from math _____ ceil\nprint(ceil(2.3))",
          blanks: [{ placeholder: "_____", answer: "import", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The keyword between the module name and the name you want is `import`." }],
          feedback: {
            correct: "Correct! `from math import ceil`.",
            incorrect: "The syntax is `from <module> import <name>`.",
          },
        },
        {
          id: "s18-from-import-predict",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Trace from-import binding",
          expectedConceptIds: ["module-import"],
          code: "from math import pi\nprint(round(pi, 2))",
          expectedOutput: "3.14",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`pi` is bound directly in the local namespace, and `round(pi, 2)` rounds to 2 decimal places." }],
          feedback: {
            correct: "Correct! `pi` is directly available after the `from math import pi`.",
            incorrect: "`from math import pi` binds `pi` directly. `round(3.141592..., 2)` gives `3.14`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "module-import", recallPrompt: "What is the risk of `from module import *`?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-from-import-fill", "s18-from-import-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.3 Import Aliases ──────────────────────────────────────────────────
    {
      id: "s18-import-aliases",
      stageId: "stage-18",
      title: "Import Aliases (import ... as)",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use `import module as alias` to give a module a shorter name",
        "Recognise the standard community aliases (np, pd, plt)",
      ],
      prerequisites: ["s18-from-import"],
      concepts: ["module-import"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nSome popular modules have long names (`matplotlib.pyplot`) or are always referred to by convention with a short alias. The `as` keyword lets you bind the module to any name you choose.",
        },
        {
          kind: "code",
          language: "python",
          code: "import numpy as np          # community convention\nimport pandas as pd          # community convention\nimport matplotlib.pyplot as plt  # community convention\n\n# Now use the alias\narr = np.array([1, 2, 3])\ndf = pd.DataFrame({'a': [1, 2]})",
          caption: "Standard data-science aliases — follow these conventions for readable code",
        },
        {
          kind: "text",
          markdown:
            "## When to Use Aliases\n\n- Long module names you type repeatedly (`collections.OrderedDict` → `od`)\n- Community-standard aliases (`np`, `pd`, `plt`)\n- Avoiding name conflicts (`import datetime as dt` when you also have a `datetime` variable)\n\nDo **not** use aliases to obscure what you are importing. Aliases should make code clearer, not harder to read.",
        },
        {
          kind: "code",
          language: "python",
          code: "from pathlib import Path as P   # bad — P is cryptic\nfrom pathlib import Path        # good — explicit",
          caption: "Only alias when it genuinely aids readability",
        },
      ],
      interactions: [
        {
          id: "s18-aliases-fill",
          kind: "fill-code",
          prompt: "Fill in the blank to import the `json` module with the alias `js`.",
          beginnerPurpose: "Practise import alias syntax",
          expectedConceptIds: ["module-import"],
          codeTemplate: "import json _____ js\nprint(js.dumps({'a': 1}))",
          blanks: [{ placeholder: "_____", answer: "as", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The keyword for aliasing is `as`." }],
          feedback: {
            correct: "Correct! `import json as js` binds the json module to the name `js`.",
            incorrect: "Use `import json as js` — the keyword is `as`.",
          },
        },
        {
          id: "s18-aliases-mc",
          kind: "multiple-choice",
          prompt: "What is the community-standard alias for the `numpy` package?",
          beginnerPurpose: "Know the standard data-science import conventions",
          expectedConceptIds: ["module-import"],
          options: [
            { id: "a", text: "`num`", isCorrect: false, explanation: "The standard alias is `np`, not `num`." },
            { id: "b", text: "`np`", isCorrect: true, explanation: "Correct! `import numpy as np` is universal in the Python data ecosystem." },
            { id: "c", text: "`numpy`", isCorrect: false, explanation: "`numpy` is the full module name, not an alias." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Two letters from the start of 'numpy'." }],
          feedback: {
            correct: "Correct! `np` is the universally used alias for numpy.",
            incorrect: "The standard alias is `np`: `import numpy as np`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "module-import", recallPrompt: "What is the standard alias for pandas?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-aliases-fill", "s18-aliases-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.4 Module Objects ──────────────────────────────────────────────────
    {
      id: "s18-module-objects",
      stageId: "stage-18",
      title: "Module Objects and dir()",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Describe what a module object is",
        "Use `dir()` to explore a module's public interface",
      ],
      prerequisites: ["s18-import-statement"],
      concepts: ["module-import"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nWhen Python imports a module, it creates a **module object** — a first-class Python object of type `<class 'module'>`. You can inspect it, pass it around, and store it in variables.",
        },
        {
          kind: "code",
          language: "python",
          code: "import math\nprint(type(math))           # <class 'module'>\nprint(math.__name__)        # 'math'\nprint(math.__file__)        # path to math.py (or .so)",
          caption: "Module objects have attributes like any Python object",
        },
        {
          kind: "text",
          markdown:
            "## Exploring with dir()\n\n`dir(module)` returns a sorted list of all names defined in the module. Use it to discover what a module provides without reading documentation:",
        },
        {
          kind: "code",
          language: "python",
          code: "import math\nnames = dir(math)\nprint([n for n in names if not n.startswith('_')])\n# ['acos', 'acosh', 'asin', ..., 'tau', 'trunc']",
          caption: "Filter out dunder attributes to see the public API",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "help() for documentation",
          body: "`help(math.sqrt)` prints the docstring and signature. Use `dir()` to discover names, then `help()` to understand them.",
        },
      ],
      interactions: [
        {
          id: "s18-module-objects-predict",
          kind: "predict-output",
          prompt: "What does `type(math).__name__` print after `import math`?",
          beginnerPurpose: "Confirm that a module is a first-class object with a type",
          expectedConceptIds: ["module-import"],
          code: "import math\nprint(type(math).__name__)",
          expectedOutput: "module",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Module objects have a specific type in Python." }],
          feedback: {
            correct: "Correct! The type of a module object is `module`.",
            incorrect: "Modules are first-class objects of type `module`.",
          },
        },
        {
          id: "s18-module-objects-mc",
          kind: "multiple-choice",
          prompt: "What does `dir(math)` return?",
          beginnerPurpose: "Know the purpose of `dir()` on a module",
          expectedConceptIds: ["module-import"],
          options: [
            { id: "a", text: "The source code of the module", isCorrect: false, explanation: "`dir()` returns names, not source code. Use `inspect.getsource()` for source." },
            { id: "b", text: "A sorted list of all names defined in the module", isCorrect: true, explanation: "Correct! `dir(module)` is a quick way to explore what a module exposes." },
            { id: "c", text: "The documentation string of the module", isCorrect: false, explanation: "`help(math)` prints the docstring. `dir()` returns names." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "`dir()` is a directory — a list of names." }],
          feedback: {
            correct: "Correct! `dir()` returns a list of names.",
            incorrect: "`dir(module)` returns a sorted list of all names (attributes, functions, classes) defined in the module.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "module-import", recallPrompt: "How do you list all public names in a module without reading documentation?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-module-objects-predict", "s18-module-objects-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.5 Module Search Path and sys.path ─────────────────────────────────
    {
      id: "s18-sys-path",
      stageId: "stage-18",
      title: "Module Search Path and sys.path",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain how Python finds modules using `sys.path`",
        "List the default entries in `sys.path` and their sources",
      ],
      prerequisites: ["s18-import-statement"],
      concepts: ["module-import"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nWhen you write `import csv`, Python searches for a file or directory named `csv` in a list of locations. That list is `sys.path`.",
        },
        {
          kind: "code",
          language: "python",
          code: "import sys\nfor p in sys.path:\n    print(p)",
          caption: "Print the module search path",
        },
        {
          kind: "text",
          markdown:
            "## Default Search Order\n\n1. **Directory containing the script being run** (or the current directory in interactive mode)\n2. **`PYTHONPATH` environment variable** entries (if set)\n3. **Installation-dependent defaults** — stdlib and site-packages\n\nPython searches these in order and uses the first match.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Do not shadow stdlib names",
          body: "If you create a file named `json.py` in your project directory, it will shadow the standard library `json` module. Keep your file names distinct from stdlib module names.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "sys.path can be modified at runtime",
          body: "`sys.path.insert(0, '/path/to/my/modules')` adds a directory to the front of the search path. Use this sparingly — prefer proper packages and virtual environments.",
        },
      ],
      interactions: [
        {
          id: "s18-syspath-mc",
          kind: "multiple-choice",
          prompt: "Which location does Python check FIRST when searching for a module?",
          beginnerPurpose: "Understand the import resolution order",
          expectedConceptIds: ["module-import"],
          options: [
            { id: "a", text: "The standard library directory", isCorrect: false, explanation: "The stdlib is checked after the script directory and PYTHONPATH." },
            { id: "b", text: "The directory containing the currently running script", isCorrect: true, explanation: "Correct! The script's own directory is always at the front of `sys.path`." },
            { id: "c", text: "The site-packages directory", isCorrect: false, explanation: "site-packages (where pip installs packages) is checked last." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about why naming a file `json.py` in your project would shadow the stdlib." }],
          feedback: {
            correct: "Correct! The script directory comes first, which is why you can shadow stdlib names accidentally.",
            incorrect: "The script's directory is the first place Python looks. That's why `json.py` in your project shadows the stdlib `json`.",
          },
        },
        {
          id: "s18-syspath-plain",
          kind: "plain-language-explain",
          prompt: "Explain what `sys.path` is and why it matters for imports.",
          beginnerPurpose: "Articulate the import search mechanism",
          expectedConceptIds: ["module-import"],
          code: "import sys\nprint(sys.path[0])",
          keyPointsToHit: [
            "sys.path is the ordered list of directories Python searches",
            "The script directory is first; stdlib and site-packages come later",
            "Modules can shadow each other based on order",
          ],
          sampleAnswer:
            "`sys.path` is an ordered list of directory paths. When you write `import something`, Python checks each directory in `sys.path` in order and uses the first `something.py` (or `something/` package) it finds. The script's own directory is always first, then any `PYTHONPATH` entries, then the standard library, then installed packages.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think of `sys.path` as a prioritised search list." }],
          feedback: {
            correct: "Great explanation!",
            incorrect: "Explain that `sys.path` is an ordered list, what goes in it, and why order matters.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "module-import", recallPrompt: "What happens if you create a file named `os.py` in your project directory?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-syspath-mc", "s18-syspath-plain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.6 __name__ and if __name__ == "__main__" ──────────────────────────
    {
      id: "s18-dunder-name",
      stageId: "stage-18",
      title: "__name__ and if __name__ == \"__main__\"",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain the `__name__` attribute and when it equals `'__main__'`",
        "Use `if __name__ == '__main__':` to write scripts that are also importable",
      ],
      prerequisites: ["s18-import-statement"],
      concepts: ["module-import"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nYou want a Python file to behave differently depending on whether it is run directly (`python myfile.py`) or imported by another module. The `__name__` attribute makes this possible.",
        },
        {
          kind: "text",
          markdown:
            "## How __name__ Works\n\n- When Python **runs a file directly**, it sets `__name__ = '__main__'`\n- When Python **imports a file**, it sets `__name__` to the module's name (e.g. `'utils'`)",
        },
        {
          kind: "code",
          language: "python",
          code: "# utils.py\n\ndef greet(name: str) -> str:\n    return f\"Hello, {name}!\"\n\nif __name__ == \"__main__\":\n    # Only runs when executed directly: python utils.py\n    print(greet(\"World\"))",
          caption: "The guard prevents the test code from running on import",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always guard your script code",
          body: "Any code that should run only when the script is the entry point must be inside `if __name__ == '__main__':`. Code outside this guard runs on every import.",
        },
        {
          kind: "mental-model",
          title: "__name__ as a Role Badge",
          analogy: "A chef can work in their own restaurant (main) or as a consultant for someone else's restaurant (imported). The `__name__` attribute is the badge that tells them which role they are currently playing.",
          explanation: "When the script is run directly, Python gives it the special `'__main__'` badge. When imported, it gets its file name as the badge. The guard checks which badge the current execution has.",
        },
      ],
      interactions: [
        {
          id: "s18-dunder-name-predict",
          kind: "predict-output",
          prompt: "If `foo.py` contains `print(__name__)` and you run `python foo.py`, what prints?",
          beginnerPurpose: "Confirm what __name__ equals when a file is run directly",
          expectedConceptIds: ["module-import"],
          code: "# Simulating: python foo.py\n__name__ = '__main__'  # Python sets this when running directly\nprint(__name__)",
          expectedOutput: "__main__",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Python sets `__name__` to `'__main__'` for the entry-point file." }],
          feedback: {
            correct: "Correct! Running a file directly gives it `__name__ == '__main__'`.",
            incorrect: "When a file is run directly, Python sets `__name__ = '__main__'`.",
          },
        },
        {
          id: "s18-dunder-name-fill",
          kind: "fill-code",
          prompt: "Fill in the blank so the `main()` function only runs when the script is executed directly.",
          beginnerPurpose: "Practise writing the main guard",
          expectedConceptIds: ["module-import"],
          codeTemplate: 'def main():\n    print("Running!")\n\nif _____ == "__main__":\n    main()',
          blanks: [{ placeholder: "_____", answer: "__name__", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The attribute that holds the module's name is `__name__`." }],
          feedback: {
            correct: "Correct! `if __name__ == '__main__':` is the standard guard.",
            incorrect: "The attribute to check is `__name__` — double underscores on both sides.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "module-import", recallPrompt: "What does `__name__` equal when a module is imported (not run directly)?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-dunder-name-predict", "s18-dunder-name-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.7 Python Files as Modules ─────────────────────────────────────────
    {
      id: "s18-files-as-modules",
      stageId: "stage-18",
      title: "Python Files as Modules",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Create a Python module by writing a `.py` file",
        "Import and use functions from a module you wrote yourself",
      ],
      prerequisites: ["s18-dunder-name"],
      concepts: ["module-import"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nAny Python file in the same directory (or on `sys.path`) is a module. You do not need any special declaration — just create a `.py` file.",
        },
        {
          kind: "code",
          language: "python",
          code: "# mathutils.py\n\ndef add(a: float, b: float) -> float:\n    \"\"\"Return the sum of a and b.\"\"\"\n    return a + b\n\nPI = 3.14159",
          caption: "A minimal module: just a .py file with definitions",
        },
        {
          kind: "code",
          language: "python",
          code: "# main.py (in the same directory as mathutils.py)\n\nimport mathutils\n\nprint(mathutils.add(2, 3))  # 5.0\nprint(mathutils.PI)         # 3.14159",
          caption: "Import and use the module by its filename (without .py)",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Module filename = import name",
          body: "The file must be named `mathutils.py` to be imported as `mathutils`. Hyphens in filenames break imports — use underscores: `math_utils.py` not `math-utils.py`.",
        },
        {
          kind: "text",
          markdown:
            "## What Gets Exported?\n\nEverything defined at the top level of a module is importable — functions, classes, variables. Use a leading underscore for private implementation details: `_helper()` signals \"not part of the public API\".",
        },
      ],
      interactions: [
        {
          id: "s18-files-modules-mc",
          kind: "multiple-choice",
          prompt: "You have a file called `data-utils.py`. Can you import it as `import data-utils`?",
          beginnerPurpose: "Know valid Python module naming rules",
          expectedConceptIds: ["module-import"],
          options: [
            { id: "a", text: "Yes, Python accepts hyphens in import names", isCorrect: false, explanation: "Hyphens are not valid in Python identifiers, so `import data-utils` is a syntax error." },
            { id: "b", text: "No — hyphens are not valid Python identifiers; rename the file with an underscore", isCorrect: true, explanation: "Correct! Use `data_utils.py` and import as `import data_utils`." },
            { id: "c", text: "Yes, but only with `from 'data-utils' import ...`", isCorrect: false, explanation: "This is not valid Python syntax." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Python identifiers cannot contain hyphens." }],
          feedback: {
            correct: "Correct! Use underscores in module file names.",
            incorrect: "Python identifiers can't have hyphens. Rename the file to `data_utils.py`.",
          },
        },
        {
          id: "s18-files-modules-run",
          kind: "run-code",
          prompt: "Simulate a two-file scenario: define an `add` function and call it as if imported from another module.",
          beginnerPurpose: "Understand that any .py file is a module",
          expectedConceptIds: ["module-import"],
          starterCode: "# Simulating mathutils.py content inline\nimport types\n\nmathutils = types.ModuleType('mathutils')\n\ndef _add(a, b):\n    return a + b\n\nmathutils.add = _add\n\n# Now use mathutils as if it were an imported module\nprint(mathutils.add(10, 5))",
          task: "Run the code and observe that a module object can hold functions just like a .py file.",
          expectedOutputContains: ["15"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [],
          feedback: {
            correct: "Correct! Module objects are just containers for names.",
            incorrect: "Run the code as-is to observe the output.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "module-import", recallPrompt: "What character should you use in module filenames instead of hyphens?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-files-modules-mc", "s18-files-modules-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.8 Packages ────────────────────────────────────────────────────────
    {
      id: "s18-packages",
      stageId: "stage-18",
      title: "Packages — Directories with __init__.py",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what a Python package is",
        "Create a package by making a directory with `__init__.py`",
        "Import from a package using dot notation",
      ],
      prerequisites: ["s18-files-as-modules"],
      concepts: ["python-packages"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nAs a project grows, a single file isn't enough. A **package** is a directory that contains Python modules. It lets you group related modules under a single namespace.",
        },
        {
          kind: "text",
          markdown:
            "## Package Structure\n\n```\nmyapp/\n├── __init__.py     ← makes this directory a package\n├── models.py\n├── utils.py\n└── api/\n    ├── __init__.py\n    └── routes.py\n```\n\nImport from the package:\n\n```python\nimport myapp.models\nfrom myapp.utils import helper\nfrom myapp.api.routes import get_users\n```",
        },
        {
          kind: "text",
          markdown:
            "## __init__.py Purpose\n\n`__init__.py` is executed when the package is imported. It can be empty, or it can:\n- Import submodules to make them accessible at the package level\n- Define package-level variables or functions\n- Set `__all__` to control what `from package import *` exports",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Python 3.3+ supports namespace packages",
          body: "In Python 3.3+, a directory without `__init__.py` can still be a package (a namespace package). However, for regular packages, always include `__init__.py` to be explicit.",
        },
        {
          kind: "why-matters",
          body: "Every significant Python project is structured as a package. The entire Django, Flask, NumPy, and Pandas codebases are packages. Understanding package structure is essential for both using and creating serious Python code.",
        },
      ],
      interactions: [
        {
          id: "s18-packages-mc",
          kind: "multiple-choice",
          prompt: "What file must be present to make a directory a regular Python package?",
          beginnerPurpose: "Know the required package marker file",
          expectedConceptIds: ["python-packages"],
          options: [
            { id: "a", text: "`setup.py`", isCorrect: false, explanation: "`setup.py` is for packaging/distribution, not for making a directory a package." },
            { id: "b", text: "`__init__.py`", isCorrect: true, explanation: "Correct! An `__init__.py` file marks a directory as a Python package." },
            { id: "c", text: "`package.json`", isCorrect: false, explanation: "`package.json` is a Node.js file, not Python." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The file has double underscores around `init`." }],
          feedback: {
            correct: "Correct! `__init__.py` is the package marker.",
            incorrect: "The file is `__init__.py` (dunder init dunder).",
          },
        },
        {
          id: "s18-packages-reorder",
          kind: "reorder-code",
          prompt: "Order these import statements from most to least specific (whole package → subpackage → module → function).",
          beginnerPurpose: "Understand package dot notation hierarchy",
          expectedConceptIds: ["python-packages"],
          lines: [
            "import myapp",
            "import myapp.api",
            "import myapp.api.routes",
            "from myapp.api.routes import get_users",
          ],
          correctOrder: [0, 1, 2, 3],
          allowedAttempts: 3,
          hints: [{ level: "structural", text: "Each level of the dot goes one level deeper in the directory structure." }],
          feedback: {
            correct: "Correct! Each dot goes one level deeper.",
            incorrect: "Start with the top-level package, then subpackage, then module, then specific name.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "python-packages", recallPrompt: "What is the purpose of `__init__.py` in a package directory?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-packages-mc", "s18-packages-reorder"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.9 Intra-Package and Relative Imports ──────────────────────────────
    {
      id: "s18-relative-imports",
      stageId: "stage-18",
      title: "Relative Imports",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use relative imports (`.` and `..`) within a package",
        "Explain when to prefer relative imports over absolute imports",
      ],
      prerequisites: ["s18-packages"],
      concepts: ["python-packages"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nInside a package, modules need to import from each other. **Relative imports** use `.` and `..` to refer to the current and parent packages, avoiding repetition of the full package path.",
        },
        {
          kind: "comparison",
          leftLabel: "Absolute import",
          rightLabel: "Relative import",
          leftCode: "# Inside myapp/api/routes.py\nfrom myapp.models import User\nfrom myapp.utils import format_date",
          rightCode: "# Inside myapp/api/routes.py\nfrom ..models import User\nfrom ..utils import format_date",
          caption: "Both work; relative imports are shorter and rename-safe",
        },
        {
          kind: "text",
          markdown:
            "## Syntax\n\n- `.` means the current package\n- `..` means the parent package\n- `...` means the grandparent\n\n```python\nfrom . import sibling_module          # same package\nfrom .sibling_module import func     # specific name\nfrom ..parent_module import thing    # parent package\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Relative imports only work inside packages",
          body: "You cannot use relative imports in a script that you run directly (the entry-point file). Relative imports require the module to be part of a package.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "PEP 8 recommends absolute imports",
          body: "Absolute imports are more explicit and less confusing for readers unfamiliar with your package structure. Use relative imports within tightly coupled subpackages, but prefer absolute imports for public-facing packages.",
        },
      ],
      interactions: [
        {
          id: "s18-relative-imports-mc",
          kind: "multiple-choice",
          prompt: "Inside `myapp/api/routes.py`, which import reaches `myapp/models.py`?",
          beginnerPurpose: "Practise relative import syntax",
          expectedConceptIds: ["python-packages"],
          options: [
            { id: "a", text: "`from . import models`", isCorrect: false, explanation: "`.` refers to the current package (`myapp/api/`). `models.py` is in the parent `myapp/`." },
            { id: "b", text: "`from .. import models`", isCorrect: true, explanation: "Correct! `..` goes up to `myapp/`, where `models.py` lives." },
            { id: "c", text: "`from ... import models`", isCorrect: false, explanation: "`...` would go up two levels, past `myapp/`, which is too far." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Each dot goes up one level. `routes.py` is in `api/`, so one dot up is `api/`, two dots up is `myapp/`." }],
          feedback: {
            correct: "Correct! `..` goes up to the parent package `myapp/`.",
            incorrect: "`routes.py` is in `myapp/api/`. One `.` = `api/`, two dots `..` = `myapp/` where `models.py` is.",
          },
        },
        {
          id: "s18-relative-imports-fill",
          kind: "fill-code",
          prompt: "Fill in the blank for a relative import of `utils` from the same package.",
          beginnerPurpose: "Use the dot notation for same-package imports",
          expectedConceptIds: ["python-packages"],
          codeTemplate: "# Inside myapp/api/routes.py\nfrom _____ import utils",
          blanks: [{ placeholder: "_____", answer: "..", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "`utils.py` is in `myapp/`, one level above `api/`. Use two dots." }],
          feedback: {
            correct: "Correct! `..` navigates up one package level.",
            incorrect: "If `utils.py` is in `myapp/` and you're in `myapp/api/`, use `..` to go up one level.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "python-packages", recallPrompt: "In a relative import, what does `..` refer to?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-relative-imports-mc", "s18-relative-imports-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.10 Virtual Environments ───────────────────────────────────────────
    {
      id: "s18-virtual-environments",
      stageId: "stage-18",
      title: "Virtual Environments",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain why virtual environments are necessary",
        "Create and activate a virtual environment with `venv`",
      ],
      prerequisites: [],
      concepts: ["virtual-environments"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nProject A needs `requests==2.28` but Project B needs `requests==2.31`. Installing both globally is impossible. **Virtual environments** solve this by giving each project its own isolated Python installation.",
        },
        {
          kind: "why-matters",
          body: "Virtual environments are non-negotiable in professional Python development. Every project should have one. Without them, package versions from different projects collide and cause mysterious bugs.",
        },
        {
          kind: "code",
          language: "bash",
          code: "# Create a virtual environment\npython -m venv .venv\n\n# Activate it (macOS/Linux)\nsource .venv/bin/activate\n\n# Activate it (Windows)\n.venv\\Scripts\\activate\n\n# Your prompt now shows (.venv)\n# Install packages into this environment\npip install requests",
          caption: "Create, activate, and use a virtual environment",
        },
        {
          kind: "text",
          markdown:
            "## What venv Creates\n\nThe `.venv` directory contains:\n- A copy (or symlink) of the Python interpreter\n- An isolated `site-packages` directory\n- `pip`, `activate` scripts\n\nWhen activated, `python` and `pip` refer to the isolated copies inside `.venv`.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Name your venv .venv",
          body: "The name `.venv` is the community convention and is recognised by most editors (VS Code, PyCharm). Other common names are `venv`, `env`, `.env`. Add it to `.gitignore` — never commit the venv directory.",
        },
        {
          kind: "mental-model",
          title: "Virtual Environment as a Portable Toolbox",
          analogy: "Each project gets its own toolbox. Tools (packages) in one toolbox don't interfere with another project's toolbox. Your system Python is the factory; venv creates a personal workstation for each project.",
          explanation: "When you activate a venv, your shell's `PATH` is prepended with the venv's `bin/` directory. `python` and `pip` now point inside the venv instead of the system installation.",
        },
      ],
      interactions: [
        {
          id: "s18-venv-mc",
          kind: "multiple-choice",
          prompt: "Why should the `.venv` directory be added to `.gitignore`?",
          beginnerPurpose: "Understand what belongs in version control",
          expectedConceptIds: ["virtual-environments"],
          options: [
            { id: "a", text: "Because it contains security credentials", isCorrect: false, explanation: "Virtual environments don't contain credentials." },
            { id: "b", text: "Because it is large, platform-specific, and can be recreated from requirements.txt", isCorrect: true, explanation: "Correct! The venv directory is hundreds of MB, OS-specific, and entirely reproducible from `requirements.txt`." },
            { id: "c", text: "Because git cannot track binary files", isCorrect: false, explanation: "Git can track binary files, though it's inefficient. The real reasons are size and platform specificity." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about reproducibility and file size." }],
          feedback: {
            correct: "Correct! Virtual environments are large, OS-specific, and reproducible. Don't commit them.",
            incorrect: "The venv is platform-specific and can be recreated with `pip install -r requirements.txt`.",
          },
        },
        {
          id: "s18-venv-reorder",
          kind: "reorder-code",
          prompt: "Order these steps to set up a new Python project with a virtual environment.",
          beginnerPurpose: "Build the muscle memory for the venv workflow",
          expectedConceptIds: ["virtual-environments"],
          lines: [
            "python -m venv .venv",
            "source .venv/bin/activate",
            "pip install requests",
            "pip freeze > requirements.txt",
          ],
          correctOrder: [0, 1, 2, 3],
          allowedAttempts: 3,
          hints: [{ level: "structural", text: "Create first, then activate, then install, then save the dependency list." }],
          feedback: {
            correct: "Perfect workflow!",
            incorrect: "You must create the venv before activating it, and activate before installing packages.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "virtual-environments", recallPrompt: "What command creates a virtual environment in the `.venv` directory?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-venv-mc", "s18-venv-reorder"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.11 pip and Requirements Files ─────────────────────────────────────
    {
      id: "s18-pip-requirements",
      stageId: "stage-18",
      title: "pip and Requirements Files",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Install, upgrade, and uninstall packages with `pip`",
        "Generate and use `requirements.txt` for reproducible environments",
      ],
      prerequisites: ["s18-virtual-environments"],
      concepts: ["virtual-environments"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\n`pip` is Python's package installer. It downloads packages from PyPI (the Python Package Index) and installs them into your active environment.",
        },
        {
          kind: "code",
          language: "bash",
          code: "pip install requests            # install latest\npip install requests==2.31.0   # pin to a version\npip install 'requests>=2.28'   # minimum version\npip install --upgrade requests # upgrade to latest\npip uninstall requests         # remove\npip list                       # show installed packages\npip show requests              # info about one package",
          caption: "Common pip commands",
        },
        {
          kind: "text",
          markdown:
            "## requirements.txt\n\nA `requirements.txt` file lists all dependencies with pinned versions. It enables anyone to recreate your exact environment:\n\n```\nrequests==2.31.0\nclick==8.1.7\npython-dotenv==1.0.0\n```\n\nGenerate it automatically:\n```bash\npip freeze > requirements.txt\n```\n\nInstall from it:\n```bash\npip install -r requirements.txt\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use pip freeze inside your venv",
          body: "`pip freeze` lists every installed package including transitive dependencies. For large projects, consider `pip-compile` from `pip-tools` to separate direct dependencies from transitive ones.",
        },
        {
          kind: "why-matters",
          body: "Reproducible environments are essential for team collaboration, CI/CD pipelines, and production deployments. `requirements.txt` is the simplest mechanism for sharing exact dependency versions.",
        },
      ],
      interactions: [
        {
          id: "s18-pip-fill",
          kind: "fill-code",
          prompt: "Fill in the blank to install all packages listed in requirements.txt.",
          beginnerPurpose: "Know the pip install -r command",
          expectedConceptIds: ["virtual-environments"],
          codeTemplate: "pip install _____ requirements.txt",
          blanks: [{ placeholder: "_____", answer: "-r", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The flag to install from a requirements file is `-r` (read from file)." }],
          feedback: {
            correct: "Correct! `pip install -r requirements.txt`.",
            incorrect: "The `-r` flag tells pip to read packages from a file.",
          },
        },
        {
          id: "s18-pip-mc",
          kind: "multiple-choice",
          prompt: "What does `pip freeze > requirements.txt` do?",
          beginnerPurpose: "Understand the freeze-then-save workflow",
          expectedConceptIds: ["virtual-environments"],
          options: [
            { id: "a", text: "Installs packages listed in requirements.txt", isCorrect: false, explanation: "That's `pip install -r requirements.txt`. `freeze` outputs the installed packages." },
            { id: "b", text: "Writes a list of all currently installed packages with pinned versions to requirements.txt", isCorrect: true, explanation: "Correct! `pip freeze` lists packages; `>` redirects the output to the file." },
            { id: "c", text: "Locks the virtual environment so no new packages can be installed", isCorrect: false, explanation: "There is no 'lock' mechanism in standard venv/pip. `freeze` just snapshots the current state." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "`>` is shell output redirection." }],
          feedback: {
            correct: "Correct! `pip freeze` lists installed packages; `>` saves them to the file.",
            incorrect: "`pip freeze` outputs installed packages in requirements format. `>` redirects stdout to the file.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "virtual-environments", recallPrompt: "How do you install an exact version of a package with pip?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-pip-fill", "s18-pip-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.12 Import Debugging Tips ──────────────────────────────────────────
    {
      id: "s18-import-debugging",
      stageId: "stage-18",
      title: "Import Debugging Tips",
      kind: "debugging",
      difficulty: "intermediate",
      objectives: [
        "Diagnose common import errors: ModuleNotFoundError, circular imports, shadowed names",
        "Use `sys.path` inspection to trace where Python looks for modules",
      ],
      prerequisites: ["s18-sys-path", "s18-packages"],
      concepts: ["module-import", "python-packages"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## 1 — Orientation\n\nImport errors are frustratingly opaque when you're new to Python. This lesson gives you a systematic toolkit for diagnosing them.",
        },
        {
          kind: "text",
          markdown:
            "## Common Import Errors\n\n### 1. ModuleNotFoundError\nThe module name is wrong, the package isn't installed, or the file isn't on `sys.path`.\n```\nDiagnosis: print(sys.path); check pip list\n```\n\n### 2. Shadowed Module Names\nYou have a local file with the same name as a stdlib or installed module.\n```\nDiagnosis: import the module, print(module.__file__)\n```\n\n### 3. Circular Imports\nModule A imports Module B, and Module B imports Module A — Python gets stuck.\n```\nDiagnosis: Look for ImportError with traceback going through two files\nFix: Move the circular import inside a function, or restructure modules\n```\n\n### 4. Missing `__init__.py`\nYou have a package directory but forgot the init file.\n```\nDiagnosis: Check that __init__.py exists in every package directory\n```",
        },
        {
          kind: "code",
          language: "python",
          code: "# Debugging an import problem\nimport sys\n\n# Check where Python is looking\nprint(sys.path)\n\n# Check where a module actually came from\nimport requests\nprint(requests.__file__)  # path to requests package\n\n# Check if a module is cached\nprint('requests' in sys.modules)",
          caption: "Use `sys.path` and `__file__` to diagnose import issues",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Check your virtual environment is activated",
          body: "The most common cause of `ModuleNotFoundError` is running Python outside the virtual environment where the package was installed. Check that your venv is activated: `which python` (macOS/Linux) or `where python` (Windows).",
        },
      ],
      interactions: [
        {
          id: "s18-import-debug-mc",
          kind: "multiple-choice",
          prompt: "You get `ModuleNotFoundError: No module named 'requests'` but you installed it with pip. What is the most likely cause?",
          beginnerPurpose: "Apply the virtual environment diagnosis",
          expectedConceptIds: ["module-import", "virtual-environments"],
          options: [
            { id: "a", text: "The requests library has been deleted from PyPI", isCorrect: false, explanation: "`requests` is one of the most downloaded packages. It's on PyPI." },
            { id: "b", text: "The virtual environment is not activated, so you are using a different Python than the one where pip installed the package", isCorrect: true, explanation: "Correct! This is the most common cause. `pip install` went into one Python's site-packages; the running Python is different." },
            { id: "c", text: "Python's import system does not support third-party packages", isCorrect: false, explanation: "Python absolutely supports third-party packages — that's what pip and site-packages are for." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about which Python is running when you see the error." }],
          feedback: {
            correct: "Correct! Always check that your venv is active when you get ModuleNotFoundError for an installed package.",
            incorrect: "The most likely issue is that the venv isn't activated — `pip install` put the package in a different Python environment.",
          },
        },
        {
          id: "s18-import-debug-plain",
          kind: "plain-language-explain",
          prompt: "Explain what a circular import is and how to resolve it.",
          beginnerPurpose: "Understand and fix circular import problems",
          expectedConceptIds: ["module-import"],
          code: "# a.py imports b.py\n# b.py imports a.py\n# Python gets stuck executing a.py -> b.py -> a.py -> ...",
          keyPointsToHit: [
            "Module A imports B which imports A — creates a loop",
            "Python cannot finish initializing either module",
            "Fix: restructure modules or move the import inside a function",
          ],
          sampleAnswer:
            "A circular import happens when module A imports module B, and module B also imports module A. When Python starts importing A, it begins executing it and hits `import B`. It starts executing B, which hits `import A`. But A isn't fully initialized yet! Python either raises an `ImportError` or gives you a partially-initialized module. The fix is usually to restructure: move shared code to a third module, or move one of the imports inside the function that uses it (deferred import).",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Draw the import dependency graph as a diagram." }],
          feedback: {
            correct: "Good explanation of the circular import problem!",
            incorrect: "Describe the A→B→A loop, why Python gets stuck, and the solution.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "module-import", recallPrompt: "What command shows you the file path of an imported module?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-import-debug-mc", "s18-import-debug-plain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 18.13 Modular Project Refactor ───────────────────────────────────────
    {
      id: "s18-project-lesson",
      stageId: "stage-18",
      title: "Modular Project Refactor",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Split a monolithic Python script into a proper package",
        "Apply import conventions: absolute imports, `__init__.py`, `if __name__ == '__main__'`",
        "Use a virtual environment and pin dependencies",
      ],
      prerequisites: [
        "s18-packages", "s18-relative-imports", "s18-dunder-name",
        "s18-virtual-environments", "s18-pip-requirements",
      ],
      concepts: ["module-import", "python-packages", "virtual-environments"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project: Modular Project Refactor\n\nYou are given a single-file script `app.py` that reads a CSV, processes data, and prints a report. Your task is to refactor it into a proper package:\n\n```\nmyapp/\n├── __init__.py\n├── cli.py        # argument parsing, main()\n├── data.py       # CSV reading and validation\n└── report.py     # formatting and output\n```",
        },
        {
          kind: "text",
          markdown:
            "## Steps\n\n1. Create the `myapp/` directory with `__init__.py`\n2. Move CSV-reading code to `data.py`\n3. Move report-formatting code to `report.py`\n4. Put `main()` and CLI argument parsing in `cli.py`\n5. In `cli.py`, guard execution with `if __name__ == '__main__':`\n6. Create a `requirements.txt`",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Test your refactor incrementally",
          body: "Refactor one module at a time. After each move, run the tests to confirm nothing broke.",
        },
        {
          kind: "why-matters",
          body: "Real projects are always packages, never single files. This refactoring skill is used constantly as scripts grow into applications.",
        },
      ],
      interactions: [
        {
          id: "s18-project-mc",
          kind: "multiple-choice",
          prompt: "In the refactored package, where should the `if __name__ == '__main__':` guard live?",
          beginnerPurpose: "Identify the entry point in a package",
          expectedConceptIds: ["module-import"],
          options: [
            { id: "a", text: "In every module file", isCorrect: false, explanation: "Only the entry point file needs this guard." },
            { id: "b", text: "Only in `cli.py`, the entry point module", isCorrect: true, explanation: "Correct! The guard belongs in the one file intended to be run directly." },
            { id: "c", text: "In `__init__.py`", isCorrect: false, explanation: "`__init__.py` is for package initialization, not for entry-point code." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which file is meant to be run with `python cli.py`?" }],
          feedback: {
            correct: "Correct! Only the CLI entry point needs the main guard.",
            incorrect: "The `if __name__ == '__main__':` guard belongs only in the file meant to be executed directly.",
          },
        },
        {
          id: "s18-project-fill",
          kind: "fill-code",
          prompt: "In `cli.py`, fill in the blank to import `read_csv` from the sibling module `data.py`.",
          beginnerPurpose: "Practise intra-package imports",
          expectedConceptIds: ["python-packages"],
          codeTemplate: "# myapp/cli.py\nfrom _____ import read_csv",
          blanks: [{ placeholder: "_____", answer: "myapp.data", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use the full absolute import path: `myapp.data`." }],
          feedback: {
            correct: "Correct! `from myapp.data import read_csv` is the absolute import.",
            incorrect: "Use the absolute path: `from myapp.data import read_csv`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "python-packages", recallPrompt: "What are the three modules in the refactored myapp package and what does each contain?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s18-project-mc", "s18-project-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s18-project",
    stageId: "stage-18",
    title: "Modular Project Refactor",
    brief:
      "Refactor a monolithic Python script into a proper package structure with separate modules for I/O, business logic, and CLI entry point.",
    requirements: [
      "Create a `myapp/` package directory with `__init__.py`",
      "Move CSV-reading and data-validation logic to `myapp/data.py`",
      "Move report-formatting logic to `myapp/report.py`",
      "Put CLI argument parsing and `main()` in `myapp/cli.py` with an `if __name__ == '__main__':` guard",
      "Use absolute intra-package imports throughout",
      "Set up a virtual environment and create `requirements.txt`",
    ],
    acceptanceCriteria: [
      "Running `python -m myapp.cli` produces the same output as the original script",
      "Each module is independently importable without side effects",
      "All public functions have type annotations",
      "requirements.txt is present and reproducible",
      "The package directory structure is clean and logical",
    ],
    conceptIds: ["module-import", "python-packages", "virtual-environments"],
    difficulty: "intermediate",
  },
} satisfies Stage;
