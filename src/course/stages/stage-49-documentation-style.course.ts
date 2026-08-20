import type { Stage } from "@/course/course.schema";

export const stage49 = {
  id: "stage-49",
  number: 49,
  title: "Documentation, Style, Maintainability, and Team Practices",
  summary:
    "Master Python documentation, style guides, maintainability, and team practices through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["pep8-style", "docstring-conventions", "api-documentation"],
  lessons: [
    // ─── Lesson 49.1 ────────────────────────────────────────────────────────
    {
      id: "s49-pep8-style-guide",
      stageId: "stage-49",
      title: "PEP 8 Style Guide",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the purpose and authority of PEP 8",
        "Apply PEP 8 rules for indentation, line length, and blank lines",
        "Recognize common PEP 8 violations and how to fix them",
      ],
      prerequisites: [],
      concepts: ["pep8-style"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## PEP 8: The Style Guide for Python Code\n\n**PEP 8** is the official style guide for Python, authored by Guido van Rossum, Barry Warsaw, and Nick Coghlan. 'PEP' stands for *Python Enhancement Proposal*; PEP 8 is a living document that defines conventions for formatting Python source code.\n\nConsistent style lets any Python developer read your code without first learning a project-specific dialect. It reduces cognitive load, speeds up code review, and signals professionalism.",
        },
        {
          kind: "glossary-term",
          term: "PEP 8",
          definition:
            "Python Enhancement Proposal 8 — the official Python style guide. It specifies conventions for indentation, naming, line length, imports, and more.",
          example: "Run `flake8` or `ruff check` to automatically flag PEP 8 violations.",
        },
        {
          kind: "text",
          markdown:
            "### Core formatting rules\n\n| Rule | Value |\n|---|---|\n| Indentation | 4 spaces (never tabs) |\n| Max line length | 79 characters (or 99 for modern projects) |\n| Top-level definitions | 2 blank lines between them |\n| Method definitions | 1 blank line between them |\n| Imports | Top of file, one per line, grouped |\n\nThese rules are enforced by linters like `flake8`, `pylint`, and `ruff`.",
        },
        {
          kind: "comparison",
          leftLabel: "PEP 8 violation",
          rightLabel: "PEP 8 compliant",
          leftCode:
            "import os, sys\nfoo=1+2\ndef bar( x,y ):\n  return x+y",
          rightCode:
            "import os\nimport sys\n\nfoo = 1 + 2\n\n\ndef bar(x, y):\n    return x + y",
          caption: "Spacing, imports, and indentation violations corrected.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Automate it",
          body: "Use `black` (opinionated auto-formatter) or `ruff format` to apply PEP 8 formatting automatically. Reserve your mental energy for logic, not spacing debates.",
        },
        {
          kind: "text",
          markdown:
            "### Import grouping\n\nPEP 8 requires imports in three groups separated by blank lines:\n1. **Standard library** (`os`, `sys`, `pathlib`)\n2. **Third-party** (`requests`, `numpy`)\n3. **Local application/library** (`from myapp import utils`)\n\n`isort` and `ruff` can sort imports automatically.",
        },
        {
          kind: "code",
          language: "python",
          code:
            "# Correct import order\nimport os\nimport sys\nfrom pathlib import Path\n\nimport requests\nimport numpy as np\n\nfrom myapp.config import Settings\nfrom myapp.utils import slugify",
          caption: "Standard library → third-party → local, each group separated by a blank line.",
        },
        {
          kind: "why-matters",
          body: "Teams that adopt a consistent style spend less time in code review arguing about formatting. Automated formatters remove the debate entirely — the style tool decides, and humans discuss logic instead.",
        },
      ],
      interactions: [
        {
          id: "s49-pep8-mc",
          kind: "multiple-choice",
          prompt:
            "Which of the following is the PEP 8 recommended indentation for Python code?",
          beginnerPurpose: "Confirm the fundamental indentation rule",
          expectedConceptIds: ["pep8-style"],
          options: [
            {
              id: "a",
              text: "2 spaces",
              isCorrect: false,
              explanation: "2-space indentation is common in JavaScript but not Python PEP 8.",
            },
            {
              id: "b",
              text: "4 spaces",
              isCorrect: true,
              explanation: "PEP 8 mandates 4 spaces per indentation level, never tabs.",
            },
            {
              id: "c",
              text: "1 tab character",
              isCorrect: false,
              explanation: "PEP 8 explicitly prohibits tabs in favour of spaces.",
            },
            {
              id: "d",
              text: "8 spaces",
              isCorrect: false,
              explanation: "8 spaces is not PEP 8 standard; it comes from older Unix convention.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Look at the Core formatting rules table in the lesson." },
          ],
          feedback: {
            correct: "Correct! 4 spaces is the universal Python convention.",
            incorrect: "PEP 8 is clear: use 4 spaces, never tabs.",
          },
        },
        {
          id: "s49-pep8-debug",
          kind: "debug-code",
          prompt:
            "The following code has multiple PEP 8 violations. Identify and fix them all.",
          beginnerPurpose: "Apply PEP 8 rules by spotting violations",
          expectedConceptIds: ["pep8-style"],
          brokenCode:
            "import sys,os\ndef greet(name,greeting='Hello'):\n  print(greeting+', '+name+'!')\ngreet('Alice','Hi')",
          bugDescription:
            "Mixed imports on one line, 2-space indentation, missing spaces around operators and after commas.",
          fixedCode:
            "import os\nimport sys\n\n\ndef greet(name, greeting='Hello'):\n    print(greeting + ', ' + name + '!')\n\n\ngreet('Alice', 'Hi')",
          allowedAttempts: 4,
          hints: [
            { level: "syntax", text: "Each import should be on its own line." },
            { level: "structural", text: "Indentation is 4 spaces; there should be 2 blank lines before a top-level function." },
          ],
          feedback: {
            correct: "All PEP 8 violations fixed — the code now follows the style guide.",
            incorrect: "Check imports (one per line), indentation (4 spaces), and spacing around operators.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "pep8-style",
          recallPrompt: "Name three PEP 8 rules you can apply right now to any Python file.",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-pep8-mc", "s49-pep8-debug"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.2 ────────────────────────────────────────────────────────
    {
      id: "s49-naming-conventions",
      stageId: "stage-49",
      title: "Naming Conventions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Apply correct Python naming conventions for variables, functions, classes, and constants",
        "Choose names that communicate intent",
        "Avoid common naming antipatterns",
      ],
      prerequisites: ["s49-pep8-style-guide"],
      concepts: ["pep8-style"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Naming Conventions\n\nNames are the primary documentation of code. A reader can understand intent from a name alone — or be completely confused by a cryptic abbreviation.\n\nPEP 8 defines naming conventions for each kind of Python identifier.",
        },
        {
          kind: "text",
          markdown:
            "### Convention table\n\n| Kind | Convention | Example |\n|---|---|---|\n| Variable / function | `snake_case` | `user_count`, `get_user()` |\n| Class | `PascalCase` | `UserProfile`, `HttpClient` |\n| Constant | `UPPER_SNAKE_CASE` | `MAX_RETRIES`, `BASE_URL` |\n| Module | `snake_case` | `my_module.py` |\n| Private attribute | `_leading_underscore` | `_cache`, `_validate()` |\n| Name-mangled | `__double_leading` | `__secret` |\n| Dunder | `__double_both__` | `__init__`, `__repr__` |",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Avoid single-letter names (except counters)",
          body: "Single-letter names like `x`, `y` are fine in tight loops or math. Everywhere else they hide intent. Prefer `user_id` over `u`, `file_path` over `f`.",
        },
        {
          kind: "comparison",
          leftLabel: "Unclear names",
          rightLabel: "Intent-revealing names",
          leftCode:
            "def p(u, l):\n    r = []\n    for i in u:\n        if i.age >= l:\n            r.append(i)\n    return r",
          rightCode:
            "def filter_users_by_min_age(users, min_age):\n    eligible = []\n    for user in users:\n        if user.age >= min_age:\n            eligible.append(user)\n    return eligible",
          caption: "The right version reads like a sentence; no comments needed.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Boolean names should read as questions",
          body: "Prefix boolean variables with `is_`, `has_`, `can_`, `should_`. Example: `is_active`, `has_permission`, `can_delete`.",
        },
        {
          kind: "text",
          markdown:
            "### Abbreviations\n\nAvoid abbreviations unless they are universally understood in the domain (`url`, `http`, `id`, `db`). Otherwise spell words out: `configuration` not `cfg`, `message` not `msg`.",
        },
        {
          kind: "why-matters",
          body: "Code is read far more than it is written. Clear names reduce the time every future reader — including your future self — needs to understand the code. Studies show naming is one of the top sources of code-review feedback.",
        },
      ],
      interactions: [
        {
          id: "s49-naming-mc",
          kind: "multiple-choice",
          prompt:
            "Which name follows Python conventions for a module-level constant representing the maximum number of database connections?",
          beginnerPurpose: "Distinguish constant naming from other naming conventions",
          expectedConceptIds: ["pep8-style"],
          options: [
            {
              id: "a",
              text: "maxDbConnections",
              isCorrect: false,
              explanation: "camelCase is used in JavaScript, not Python.",
            },
            {
              id: "b",
              text: "max_db_connections",
              isCorrect: false,
              explanation: "snake_case is correct for variables and functions, but constants use UPPER_SNAKE_CASE.",
            },
            {
              id: "c",
              text: "MAX_DB_CONNECTIONS",
              isCorrect: true,
              explanation: "Module-level constants use UPPER_SNAKE_CASE per PEP 8.",
            },
            {
              id: "d",
              text: "MaxDbConnections",
              isCorrect: false,
              explanation: "PascalCase is reserved for class names.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Constants use ALL_CAPS with underscores." },
          ],
          feedback: {
            correct: "Correct! Constants are UPPER_SNAKE_CASE.",
            incorrect: "Review the naming convention table in the lesson.",
          },
        },
        {
          id: "s49-naming-fill",
          kind: "fill-code",
          prompt:
            "Complete the class definition and constant using correct Python naming conventions.",
          beginnerPurpose: "Practice applying naming conventions in real code",
          expectedConceptIds: ["pep8-style"],
          codeTemplate:
            "___BLANK1___ = 100\n\n\nclass ___BLANK2___:\n    def __init__(self, name):\n        self.name = name\n        self.___BLANK3___ = False  # private attribute",
          blanks: [
            { placeholder: "___BLANK1___", answer: "MAX_ITEMS", caseSensitive: true },
            { placeholder: "___BLANK2___", answer: "ItemCollection", caseSensitive: true },
            { placeholder: "___BLANK3___", answer: "_locked", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Constants = UPPER_SNAKE_CASE, classes = PascalCase, private = _leading_underscore." },
          ],
          feedback: {
            correct: "All three naming conventions applied correctly!",
            incorrect: "Check: constant (UPPER_SNAKE), class (PascalCase), private attribute (_prefix).",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "pep8-style",
          recallPrompt: "What naming convention do Python classes, functions, and constants each use?",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-naming-mc", "s49-naming-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.3 ────────────────────────────────────────────────────────
    {
      id: "s49-module-documentation",
      stageId: "stage-49",
      title: "Module Documentation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write a module-level docstring that orients new readers",
        "Include purpose, author, and usage information appropriately",
        "Understand how `__all__` controls module public API",
      ],
      prerequisites: ["s49-naming-conventions"],
      concepts: ["docstring-conventions"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Module Documentation\n\nEvery Python module should begin with a **module-level docstring** — a string literal as the very first statement of the file. It describes what the module does, not how it does it.",
        },
        {
          kind: "code",
          language: "python",
          code:
            '"""Text processing utilities.\n\nProvides functions for cleaning, normalising, and tokenising text\nbefore passing it to downstream NLP pipelines.\n\nTypical usage::\n\n    from myapp.text import normalise\n    clean = normalise("Hello   World!")\n\nNote:\n    This module requires Python 3.11+.\n"""\n\nfrom __future__ import annotations\n\n__all__ = ["normalise", "tokenise"]',
          caption: "Module docstring followed by imports and __all__.",
        },
        {
          kind: "glossary-term",
          term: "__all__",
          definition:
            "A list of names that defines a module's public API. Only names in __all__ are exported by `from module import *`.",
          example: '__all__ = ["MyClass", "my_function"]',
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Keep the first line short",
          body: "The first line of a docstring is the summary. It should fit on one line and end with a period. Tools like `pydoc` and IDEs display this line in hover tooltips.",
        },
        {
          kind: "text",
          markdown:
            "### What belongs in a module docstring\n\n- **One-line summary** — what the module does\n- **Extended description** (optional) — context, design decisions\n- **Usage example** (optional) — a quick-start snippet\n- **Requirements or caveats** (optional) — Python version, OS, dependencies\n\nDo **not** put class or function documentation here — that belongs in their own docstrings.",
        },
        {
          kind: "why-matters",
          body: "Module docstrings are the first thing a developer reads when opening an unfamiliar file. A clear docstring saves minutes of investigation. Multiplied across a large team and codebase, that is hours per week.",
        },
      ],
      interactions: [
        {
          id: "s49-moddoc-predict",
          kind: "predict-output",
          prompt: "What does Python print when you access `mymodule.__doc__`?",
          beginnerPurpose: "See where module docstrings are stored",
          expectedConceptIds: ["docstring-conventions"],
          code:
            '"""Greetings module.\n\nProvides functions to greet users.\n"""\n\ndef hello(name):\n    """Return a greeting string."""\n    return f"Hello, {name}!"\n\nprint(__doc__.strip().splitlines()[0])',
          expectedOutput: "Greetings module.",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "__doc__ holds the module docstring. `.strip().splitlines()[0]` gets the first line." },
          ],
          feedback: {
            correct: "Correct! The first line of the module docstring is accessible as __doc__.",
            incorrect: "The module docstring is stored in __doc__. The code prints its first line.",
          },
        },
        {
          id: "s49-moddoc-mc",
          kind: "multiple-choice",
          prompt: "What is the effect of defining `__all__ = ['foo']` in a module?",
          beginnerPurpose: "Understand how __all__ controls the public interface",
          expectedConceptIds: ["docstring-conventions"],
          options: [
            {
              id: "a",
              text: "Only `foo` can be imported with `import module`",
              isCorrect: false,
              explanation: "`import module` is unaffected by __all__.",
            },
            {
              id: "b",
              text: "Only `foo` is exported when a caller does `from module import *`",
              isCorrect: true,
              explanation: "__all__ controls star-imports only. Direct imports remain unrestricted.",
            },
            {
              id: "c",
              text: "All names except `foo` are deleted from the module",
              isCorrect: false,
              explanation: "__all__ does not delete names; it only filters star-imports.",
            },
            {
              id: "d",
              text: "It makes `foo` a private symbol",
              isCorrect: false,
              explanation: "__all__ marks public symbols; `_leading_underscore` marks private ones.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "__all__ only affects `from module import *`." },
          ],
          feedback: {
            correct: "Correct! __all__ filters star-imports to the declared public names.",
            incorrect: "__all__ only affects `from module import *`, not explicit imports.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "docstring-conventions",
          recallPrompt: "What should the first line of a module docstring contain?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-moddoc-predict", "s49-moddoc-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.4 ────────────────────────────────────────────────────────
    {
      id: "s49-function-docstrings",
      stageId: "stage-49",
      title: "Function Docstrings",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write function docstrings in Google and NumPy styles",
        "Document parameters, return values, and exceptions",
        "Understand how docstrings integrate with type hints",
      ],
      prerequisites: ["s49-module-documentation"],
      concepts: ["docstring-conventions"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Function Docstrings\n\nA **function docstring** immediately follows the `def` line. It explains *what* the function does (not *how*), its parameters, return values, and any exceptions it raises.",
        },
        {
          kind: "text",
          markdown:
            "### Three popular styles\n\n| Style | Used by |\n|---|---|\n| **Google** | Google, many open-source projects |\n| **NumPy** | Scientific Python stack |\n| **reStructuredText** | Sphinx default, older codebases |\n\nPick one style per project and stick to it. Sphinx and `pdoc` can parse all three.",
        },
        {
          kind: "code",
          language: "python",
          code:
            'def divide(numerator: float, denominator: float) -> float:\n    """Divide two numbers and return the quotient.\n\n    Args:\n        numerator: The number to be divided.\n        denominator: The number to divide by. Must not be zero.\n\n    Returns:\n        The floating-point quotient.\n\n    Raises:\n        ValueError: If denominator is zero.\n\n    Example:\n        >>> divide(10, 4)\n        2.5\n    """\n    if denominator == 0:\n        raise ValueError("denominator must not be zero")\n    return numerator / denominator',
          caption: "Google-style docstring with Args, Returns, Raises, and Example sections.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Type hints reduce docstring redundancy",
          body: "When you have type hints, you don't need to repeat the types in the docstring Args section. Just describe what each parameter means, not its type.",
        },
        {
          kind: "code",
          language: "python",
          code:
            'def clamp(value: float, lo: float, hi: float) -> float:\n    """Clamp value to the inclusive range [lo, hi].\n\n    Parameters\n    ----------\n    value\n        The number to clamp.\n    lo\n        Lower bound (inclusive).\n    hi\n        Upper bound (inclusive).\n\n    Returns\n    -------\n    float\n        The clamped value.\n    """\n    return max(lo, min(value, hi))',
          caption: "NumPy-style docstring — preferred in scientific Python projects.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Doctest: runnable examples in docstrings",
          body: "Lines starting with `>>>` in a docstring become runnable examples via `python -m doctest module.py`. They serve as lightweight tests and always-up-to-date examples.",
        },
        {
          kind: "why-matters",
          body: "IDE autocompletion, documentation generators (Sphinx, pdoc), and AI code assistants all extract function docstrings to provide hints. A well-written docstring multiplies developer productivity across every downstream tool.",
        },
      ],
      interactions: [
        {
          id: "s49-funcdoc-fill",
          kind: "fill-code",
          prompt:
            "Complete the Google-style docstring for this function by filling in the section names.",
          beginnerPurpose: "Practice the structure of a Google-style docstring",
          expectedConceptIds: ["docstring-conventions"],
          codeTemplate:
            'def repeat(text: str, times: int) -> str:\n    """Repeat text a given number of times.\n\n    ___BLANK1___:\n        text: The string to repeat.\n        times: How many times to repeat it.\n\n    ___BLANK2___:\n        The repeated string.\n\n    ___BLANK3___:\n        ValueError: If times is negative.\n    """\n    if times < 0:\n        raise ValueError("times must be non-negative")\n    return text * times',
          blanks: [
            { placeholder: "___BLANK1___", answer: "Args", caseSensitive: true },
            { placeholder: "___BLANK2___", answer: "Returns", caseSensitive: true },
            { placeholder: "___BLANK3___", answer: "Raises", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Google style uses: Args, Returns, Raises, Example." },
          ],
          feedback: {
            correct: "Perfect Google-style docstring structure!",
            incorrect: "Review the Google-style sections: Args, Returns, Raises.",
          },
        },
        {
          id: "s49-funcdoc-mc",
          kind: "multiple-choice",
          prompt:
            "When a function has full type annotations, what should the Args section of its docstring contain?",
          beginnerPurpose: "Understand interaction between type hints and docstrings",
          expectedConceptIds: ["docstring-conventions"],
          options: [
            {
              id: "a",
              text: "The type AND a description for each parameter",
              isCorrect: false,
              explanation: "With type hints present, repeating the type in the docstring is redundant.",
            },
            {
              id: "b",
              text: "Only a description of each parameter's meaning (not its type)",
              isCorrect: true,
              explanation: "Type hints already document the type; the docstring should explain what the parameter means.",
            },
            {
              id: "c",
              text: "Nothing — type hints make Args sections unnecessary",
              isCorrect: false,
              explanation: "Types and meanings are different. The Args section should explain intent even when types are annotated.",
            },
            {
              id: "d",
              text: "Only the type, not the description",
              isCorrect: false,
              explanation: "The description of meaning is the valuable part; the type is already in the signature.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Type hints document the type; docstrings document the meaning." },
          ],
          feedback: {
            correct: "Correct! With type hints, the docstring describes meaning, not type.",
            incorrect: "Type hints already cover the type. The docstring should add meaning.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "docstring-conventions",
          recallPrompt: "Name three sections in a Google-style function docstring.",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-funcdoc-fill", "s49-funcdoc-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.5 ────────────────────────────────────────────────────────
    {
      id: "s49-class-docstrings",
      stageId: "stage-49",
      title: "Class Docstrings",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write class-level docstrings describing purpose and public interface",
        "Document class attributes and constructor arguments",
        "Distinguish class docstring from __init__ docstring",
      ],
      prerequisites: ["s49-function-docstrings"],
      concepts: ["docstring-conventions"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Class Docstrings\n\nA class docstring immediately follows the `class` statement. It describes the *purpose* of the class, its public attributes, and how to instantiate it. It is **not** a list of all its methods — those have their own docstrings.",
        },
        {
          kind: "code",
          language: "python",
          code:
            'class BankAccount:\n    """A simple bank account with balance tracking.\n\n    Supports deposits, withdrawals, and balance inquiries.\n    Does not support overdrafts — a ValueError is raised if funds\n    are insufficient.\n\n    Attributes:\n        owner: The name of the account holder.\n        balance: Current balance in the account currency.\n\n    Example::\n\n        account = BankAccount("Alice", initial_balance=1000)\n        account.deposit(500)\n        print(account.balance)  # 1500\n    """\n\n    def __init__(self, owner: str, initial_balance: float = 0.0) -> None:\n        """Initialise the account.\n\n        Args:\n            owner: Name of the account holder.\n            initial_balance: Starting balance. Defaults to 0.\n\n        Raises:\n            ValueError: If initial_balance is negative.\n        """\n        if initial_balance < 0:\n            raise ValueError("initial_balance must be non-negative")\n        self.owner = owner\n        self.balance = initial_balance',
          caption: "Class docstring describes purpose and public interface; __init__ docstring describes constructor arguments.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Class vs __init__ docstring",
          body: "Put general class information (purpose, attributes, examples) in the class docstring. Put constructor-specific argument documentation in the `__init__` docstring. Some teams put all of it in the class docstring and leave `__init__` undocumented — both approaches are acceptable.",
        },
        {
          kind: "text",
          markdown:
            "### Documenting class attributes\n\nClass attributes can be documented in the class docstring under an `Attributes:` section (Google style) or using inline comments, or as module-level typed constants.\n\nFor dataclasses, the field definitions serve as the canonical attribute documentation.",
        },
        {
          kind: "code",
          language: "python",
          code:
            'from dataclasses import dataclass, field\nfrom typing import ClassVar\n\n\n@dataclass\nclass Config:\n    """Application configuration loaded from environment or file.\n\n    Attributes:\n        host: Hostname to bind the server to.\n        port: Port number. Defaults to 8080.\n        debug: Enable debug mode. Defaults to False.\n    """\n\n    host: str\n    port: int = 8080\n    debug: bool = False\n    _DEFAULT_HOST: ClassVar[str] = "localhost"',
          caption: "Dataclass with class docstring; field defaults serve as implicit documentation.",
        },
        {
          kind: "why-matters",
          body: "IDEs show class docstrings in hover tooltips when a developer types the class name. A good class docstring communicates the mental model of the class without requiring the developer to read the implementation.",
        },
      ],
      interactions: [
        {
          id: "s49-classdoc-explain",
          kind: "plain-language-explain",
          prompt:
            "Explain in your own words: what information belongs in a class docstring versus the __init__ docstring?",
          beginnerPurpose: "Articulate the distinction between class and constructor documentation",
          expectedConceptIds: ["docstring-conventions"],
          code:
            'class Queue:\n    """A FIFO queue with bounded capacity.\n\n    Attributes:\n        maxsize: Maximum number of items. 0 means unlimited.\n    """\n\n    def __init__(self, maxsize: int = 0) -> None:\n        """Create a Queue.\n\n        Args:\n            maxsize: Maximum items allowed. 0 = unlimited.\n        """\n        self.maxsize = maxsize\n        self._items: list = []',
          keyPointsToHit: [
            "Class docstring describes purpose and public attributes",
            "__init__ docstring describes constructor parameters",
            "Examples and usage go in the class docstring",
          ],
          sampleAnswer:
            "The class docstring explains what the class represents and documents its public attributes and usage examples. The __init__ docstring documents the specific arguments needed to construct the object. This separation means the class-level view is general, while the constructor view is specific.",
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think: class docstring = what is this thing; __init__ docstring = how do I create one." },
          ],
          feedback: {
            correct: "Well explained! You've captured the class vs constructor distinction.",
            incorrect: "Focus on: class docstring = purpose + attributes; __init__ docstring = constructor arguments.",
          },
        },
        {
          id: "s49-classdoc-mc",
          kind: "multiple-choice",
          prompt:
            "Where should a usage example for a class be placed?",
          beginnerPurpose: "Identify correct placement of usage examples",
          expectedConceptIds: ["docstring-conventions"],
          options: [
            {
              id: "a",
              text: "In the __init__ docstring",
              isCorrect: false,
              explanation: "__init__ documents constructor args, not general usage examples.",
            },
            {
              id: "b",
              text: "In the class docstring",
              isCorrect: true,
              explanation: "Usage examples belong in the class docstring so they appear alongside the class description.",
            },
            {
              id: "c",
              text: "In a separate README file only",
              isCorrect: false,
              explanation: "Examples can be in a README, but inline docstring examples are also valuable and testable via doctest.",
            },
            {
              id: "d",
              text: "In each method docstring that is relevant",
              isCorrect: false,
              explanation: "Method examples are fine too, but the class-level example showing end-to-end usage belongs in the class docstring.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Usage examples provide the big picture — they belong at the class level." },
          ],
          feedback: {
            correct: "Correct! Class docstrings are the right home for usage examples.",
            incorrect: "Usage examples belong in the class docstring where they describe the whole object.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "docstring-conventions",
          recallPrompt: "What is the difference between a class docstring and an __init__ docstring?",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-classdoc-explain", "s49-classdoc-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.6 ────────────────────────────────────────────────────────
    {
      id: "s49-comments-vs-documentation",
      stageId: "stage-49",
      title: "Comments vs Documentation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish inline comments from docstrings",
        "Know when a comment adds value vs when it duplicates the code",
        "Write comments that explain *why*, not *what*",
      ],
      prerequisites: ["s49-class-docstrings"],
      concepts: ["pep8-style", "docstring-conventions"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Comments vs Documentation\n\nPython has two documentation mechanisms:\n\n- **Docstrings** (`\"\"\"...\"\"\"`) — structured text attached to modules, classes, and functions; accessible at runtime via `.__doc__`; parsed by documentation tools\n- **Inline comments** (`# ...`) — ephemeral notes for developers reading the source; invisible at runtime; not extracted by documentation tools",
        },
        {
          kind: "comparison",
          leftLabel: "Bad comment (explains WHAT)",
          rightLabel: "Good comment (explains WHY)",
          leftCode:
            "# increment i by 1\ni += 1\n\n# return the result\nreturn result",
          rightCode:
            "# CPython dict.get() is O(1); avoid linear scan here\nvalue = cache.get(key)\n\n# skip header rows — the CSV export always has 3 metadata lines\nfor row in reader:\n    if row_index < 3:\n        continue",
          caption: "Comments should explain intent or non-obvious decisions, not narrate the code.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Stale comments are worse than no comments",
          body: "Comments that contradict the code are actively harmful — readers trust comments and then wonder why the code does something different. If you change code, update the comment.",
        },
        {
          kind: "text",
          markdown:
            "### Block comments and inline comments\n\n- **Block comment**: Starts on its own line, preceded by `# `. Use for a paragraph-style explanation above a block of code.\n- **Inline comment**: Appears on the same line as code, separated by at least 2 spaces. Use sparingly — only when the code alone is genuinely unclear.\n\n```python\n# Calculate the Levenshtein distance between two strings.\n# This is the inner loop; keep it tight.\ndist = ...\n\nresult = process(data)  # result is None on timeout\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "TODO and FIXME comments",
          body: "Use `# TODO(username): description` and `# FIXME: description` consistently. Many editors and linters highlight them. Include a ticket number if one exists: `# TODO(alice): remove after PROJ-1234 ships`.",
        },
        {
          kind: "why-matters",
          body: "A well-commented codebase is one where no comment explains the obvious, and every comment answers a question the reader was about to ask. The goal is reader confidence: they can follow the code without second-guessing themselves.",
        },
      ],
      interactions: [
        {
          id: "s49-comments-mc",
          kind: "multiple-choice",
          prompt:
            "Which comment adds the most value to a code reader?",
          beginnerPurpose: "Identify a meaningful WHY comment versus a redundant WHAT comment",
          expectedConceptIds: ["pep8-style"],
          options: [
            {
              id: "a",
              text: "# set x to 10\nx = 10",
              isCorrect: false,
              explanation: "This restates the code in English — it adds no information.",
            },
            {
              id: "b",
              text: "# retry limit matches the upstream API's own retry window\nMAX_RETRIES = 10",
              isCorrect: true,
              explanation: "This explains WHY the value is 10, which the code alone cannot convey.",
            },
            {
              id: "c",
              text: "# loop through items\nfor item in items:",
              isCorrect: false,
              explanation: "The code is self-evident; this comment adds nothing.",
            },
            {
              id: "d",
              text: "# call the function\nresult = compute()",
              isCorrect: false,
              explanation: "Describing what a call does is redundant if the function name is clear.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Ask: does the comment tell me something the code cannot?" },
          ],
          feedback: {
            correct: "Correct! The best comments explain intent that code cannot express.",
            incorrect: "Look for the comment that explains WHY, not WHAT.",
          },
        },
        {
          id: "s49-comments-debug",
          kind: "debug-code",
          prompt:
            "This code has a docstring where an inline comment is needed, and a comment where a docstring is needed. Fix the placement.",
          beginnerPurpose: "Distinguish where docstrings vs comments belong",
          expectedConceptIds: ["docstring-conventions"],
          brokenCode:
            '# Compute the area of a circle.\n# Args: radius - the radius of the circle.\n# Returns: the area as a float.\ndef circle_area(radius: float) -> float:\n    import math\n    """pi times radius squared"""\n    return math.pi * radius ** 2',
          bugDescription:
            "The function description is in comments before the def; the string inside the body is misplaced.",
          fixedCode:
            'import math\n\n\ndef circle_area(radius: float) -> float:\n    """Compute the area of a circle.\n\n    Args:\n        radius: The radius of the circle.\n\n    Returns:\n        The area as a float.\n    """\n    return math.pi * radius ** 2  # pi * r^2',
          allowedAttempts: 4,
          hints: [
            { level: "structural", text: "The docstring belongs immediately after the `def` line." },
            { level: "syntax", text: "Move the description into a triple-quoted docstring inside the function." },
          ],
          feedback: {
            correct: "Correct placement: docstring inside the function, imports at module level.",
            incorrect: "Docstrings go immediately after the def statement; comments go before the code they describe.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "pep8-style",
          recallPrompt: "What makes a good inline comment? Give an example of a bad comment and why it adds no value.",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-comments-mc", "s49-comments-debug"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.7 ────────────────────────────────────────────────────────
    {
      id: "s49-readme-structure",
      stageId: "stage-49",
      title: "README Structure",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write a README that orients new users and contributors",
        "Structure a README with standard sections",
        "Include installation, usage, and contribution guidance",
      ],
      prerequisites: ["s49-comments-vs-documentation"],
      concepts: ["api-documentation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## README Structure\n\nA **README** is the front page of your project. It is the first file a new user or contributor reads. A good README answers five questions:\n\n1. **What does it do?** — one-paragraph project description\n2. **Who is it for?** — the intended audience\n3. **How do I install it?** — step-by-step installation\n4. **How do I use it?** — minimal working example\n5. **How do I contribute?** — link to CONTRIBUTING.md or brief guide",
        },
        {
          kind: "text",
          markdown:
            "### Standard README sections\n\n```\n# Project Name\nShort description and badges.\n\n## Features\nKey capabilities in bullet form.\n\n## Installation\npip install mypackage\n\n## Quick start\n```python\nfrom mypackage import thing\nthing.do_it()\n```\n\n## Documentation\nLink to full docs.\n\n## Contributing\nLink to CONTRIBUTING.md.\n\n## License\nMIT / Apache-2.0 / etc.\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Badges communicate status at a glance",
          body: "Add shields.io badges for CI status, PyPI version, test coverage, and license. They let readers assess project health before reading a word.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "README-driven development",
          body: "Some teams write the README before the code — this forces clarity about what the project should do and how it should feel to use. If you cannot write a clear README, the project is not well defined.",
        },
        {
          kind: "mental-model",
          title: "README as a marketing document",
          analogy: "A product landing page convinces visitors to try the product in 30 seconds.",
          explanation: "Your README must do the same. Assume the reader has five seconds of patience. If they cannot understand what the project does from the first paragraph, they will leave. The installation and usage sections let them validate it works before investing further time.",
        },
        {
          kind: "why-matters",
          body: "Open-source projects live and die by their READMEs. A clear README increases adoption, reduces support requests, and attracts contributors. Internal projects benefit equally — a good README means teammates can onboard without a 1-on-1.",
        },
      ],
      interactions: [
        {
          id: "s49-readme-mc",
          kind: "multiple-choice",
          prompt:
            "A developer visits your GitHub repository for the first time. Which README section should appear first?",
          beginnerPurpose: "Understand what information is most important to a first-time visitor",
          expectedConceptIds: ["api-documentation"],
          options: [
            {
              id: "a",
              text: "License information",
              isCorrect: false,
              explanation: "License is important but belongs near the bottom — it is not the first thing a visitor needs.",
            },
            {
              id: "b",
              text: "A short project description that explains what the project does",
              isCorrect: true,
              explanation: "The first thing a visitor needs is a clear, concise answer to 'what is this?'",
            },
            {
              id: "c",
              text: "The full API reference",
              isCorrect: false,
              explanation: "The full API reference belongs in documentation, not at the top of the README.",
            },
            {
              id: "d",
              text: "Contributing guidelines",
              isCorrect: false,
              explanation: "Contributing guidelines are important but target a different audience (potential contributors, not first-time users).",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "What does a visitor want to know in the first 5 seconds?" },
          ],
          feedback: {
            correct: "Correct! Lead with what the project does — answer the 'what is this?' question immediately.",
            incorrect: "A first-time visitor needs to understand the project purpose before anything else.",
          },
        },
        {
          id: "s49-readme-reorder",
          kind: "reorder-code",
          prompt:
            "Put these README sections in the conventional order from top to bottom.",
          beginnerPurpose: "Learn the standard ordering of README sections",
          expectedConceptIds: ["api-documentation"],
          lines: [
            "## License",
            "## Quick start",
            "## Installation",
            "# Project Name and description",
            "## Contributing",
          ],
          correctOrder: [3, 2, 1, 4, 0],
          allowedAttempts: 3,
          hints: [
            { level: "structural", text: "Project name/description → install → quick start → contributing → license." },
          ],
          feedback: {
            correct: "Correct order! Project identity first, then how to use it, then how to contribute.",
            incorrect: "Lead with the project name/description, then installation, usage, contributing, and finally license.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "api-documentation",
          recallPrompt: "List the five key questions a README should answer.",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-readme-mc", "s49-readme-reorder"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.8 ────────────────────────────────────────────────────────
    {
      id: "s49-api-documentation",
      stageId: "stage-49",
      title: "API Documentation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Generate API documentation with Sphinx or pdoc",
        "Understand autodoc and how docstrings become HTML",
        "Know what makes API documentation actionable for library users",
      ],
      prerequisites: ["s49-readme-structure"],
      concepts: ["api-documentation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## API Documentation\n\n**API documentation** describes every public class, function, and constant a library exposes — what each does, what arguments it accepts, what it returns, and what exceptions it raises.\n\nTwo dominant tools for Python:\n- **Sphinx** — powerful, RST-based, used by CPython and most major libraries\n- **pdoc** — lightweight, Markdown-friendly, zero configuration",
        },
        {
          kind: "code",
          language: "bash",
          code:
            "# Sphinx setup\npip install sphinx\nsphinx-quickstart docs/\n# Then add 'sphinx.ext.autodoc' to conf.py extensions\n\n# pdoc (zero-config)\npip install pdoc\npdoc mypackage",
          caption: "Sphinx requires configuration; pdoc generates docs from docstrings with minimal setup.",
        },
        {
          kind: "text",
          markdown:
            "### Sphinx autodoc\n\nSphinx's `autodoc` extension imports your modules and extracts docstrings into documentation pages. The RST directive:\n\n```rst\n.. automodule:: mypackage.utils\n   :members:\n   :undoc-members:\n   :show-inheritance:\n```\n\nThis produces a full reference page from your module's docstrings.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Docstring quality directly determines documentation quality",
          body: "autodoc produces documentation that is exactly as good as your docstrings. There is no separate documentation layer — the docstrings ARE the documentation.",
        },
        {
          kind: "text",
          markdown:
            "### What makes API docs useful\n\n1. **Runnable examples** — the reader can copy and paste\n2. **Parameter descriptions** — not just types, but what values mean\n3. **Error documentation** — what goes wrong and why\n4. **Cross-links** — link to related functions and classes\n5. **Changelog link** — so users can find what changed between versions",
        },
        {
          kind: "mental-model",
          title: "API docs as a contract",
          analogy: "A legal contract specifies rights, obligations, and consequences for both parties.",
          explanation: "API documentation is a contract between the library author and the library user. The docs say: 'if you call this function with these arguments, you will get this result, or this error.' Users rely on this contract. Breaking it without a deprecation notice is a breach of trust.",
        },
        {
          kind: "why-matters",
          body: "Undocumented APIs force users to read the source code, experiment, or ask questions. Every hour a user spends reverse-engineering your API is an hour they cannot spend building their project. Good API docs are a force multiplier.",
        },
      ],
      interactions: [
        {
          id: "s49-apidoc-mc",
          kind: "multiple-choice",
          prompt:
            "You run `sphinx-apidoc` and `make html` but your API pages are nearly empty. What is the most likely cause?",
          beginnerPurpose: "Diagnose a common Sphinx autodoc issue",
          expectedConceptIds: ["api-documentation"],
          options: [
            {
              id: "a",
              text: "Sphinx does not support Python 3",
              isCorrect: false,
              explanation: "Sphinx fully supports Python 3.",
            },
            {
              id: "b",
              text: "Your functions and classes have no docstrings",
              isCorrect: true,
              explanation: "autodoc pulls content from docstrings. No docstrings = empty pages.",
            },
            {
              id: "c",
              text: "You need to install numpy for Sphinx to work",
              isCorrect: false,
              explanation: "numpy is unrelated to Sphinx.",
            },
            {
              id: "d",
              text: "Your module names contain underscores",
              isCorrect: false,
              explanation: "Underscores in module names do not prevent autodoc from working.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "autodoc literally reads docstrings. What happens if there are none?" },
          ],
          feedback: {
            correct: "Correct! autodoc extracts content from docstrings — no docstrings means no content.",
            incorrect: "Think about what autodoc actually reads: it reads docstrings.",
          },
        },
        {
          id: "s49-apidoc-explain",
          kind: "plain-language-explain",
          prompt:
            "Explain why 'API documentation is only as good as your docstrings' when using Sphinx autodoc.",
          beginnerPurpose: "Connect docstring quality to documentation output",
          expectedConceptIds: ["api-documentation"],
          code:
            'def compress(data: bytes, level: int = 6) -> bytes:\n    """Compress data using zlib.\n\n    Args:\n        data: Raw bytes to compress.\n        level: Compression level 0-9. 0=none, 9=maximum. Defaults to 6.\n\n    Returns:\n        Compressed bytes.\n\n    Raises:\n        ValueError: If level is outside 0-9.\n    """\n    ...',
          keyPointsToHit: [
            "autodoc reads docstrings to generate HTML pages",
            "If docstrings are missing or poor, the docs will be missing or poor",
            "There is no separate documentation source — docstrings are the documentation",
          ],
          sampleAnswer:
            "Sphinx autodoc works by importing your Python modules and reading the docstrings on every class, function, and module. These docstrings are then rendered into HTML documentation pages. There is no separate documentation layer — the docstrings ARE the source of the API documentation. If a function has a vague docstring, the documentation page for that function will be vague. If a function has no docstring, its page will be essentially empty.",
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think about what autodoc does step by step: import → read docstrings → render HTML." },
          ],
          feedback: {
            correct: "Well explained! You understand the direct connection between docstring quality and documentation quality.",
            incorrect: "Focus on what autodoc actually does: it reads docstrings and converts them to HTML pages.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "api-documentation",
          recallPrompt: "What are three qualities that make API documentation actionable for library users?",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-apidoc-mc", "s49-apidoc-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.9 ────────────────────────────────────────────────────────
    {
      id: "s49-changelogs",
      stageId: "stage-49",
      title: "Changelogs",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write a changelog that helps users understand what changed between versions",
        "Apply the Keep a Changelog format",
        "Distinguish between added, changed, deprecated, removed, fixed, and security entries",
      ],
      prerequisites: ["s49-api-documentation"],
      concepts: ["api-documentation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Changelogs\n\nA **changelog** is a human-readable record of notable changes made between versions of a project. It answers: *what changed in this release, and does it affect me?*\n\nThe [Keep a Changelog](https://keepachangelog.com) format is the most widely adopted standard. It organises entries into categories that signal impact to the user.",
        },
        {
          kind: "code",
          language: "markdown",
          code:
            "# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n## [Unreleased]\n\n## [2.1.0] - 2024-06-01\n### Added\n- New `compress()` function with level parameter.\n\n### Changed\n- `process()` now returns a list instead of a generator.\n\n### Deprecated\n- `old_process()` will be removed in 3.0.\n\n### Fixed\n- `parse()` no longer crashes on empty input.\n\n## [2.0.0] - 2024-01-15\n### Removed\n- `legacy_api()` removed (deprecated since 1.5).\n\n### Security\n- Updated dependency to patch CVE-2023-12345.",
          caption: "Keep a Changelog format with Unreleased section and categorised entries.",
        },
        {
          kind: "text",
          markdown:
            "### The six categories\n\n| Category | Meaning |\n|---|---|\n| **Added** | New features |\n| **Changed** | Changes to existing functionality |\n| **Deprecated** | Features that will be removed |\n| **Removed** | Features removed this version |\n| **Fixed** | Bug fixes |\n| **Security** | Vulnerability patches |",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Don't use git log as your changelog",
          body: "Git commit messages are for developers. Changelogs are for users. 'Fix typo in test' and 'refactor internal queue' are not user-facing changes. Only document changes that affect users.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Keep an [Unreleased] section",
          body: "Always maintain an [Unreleased] section at the top. When you release, rename it to the version number and date, and open a fresh [Unreleased] section. This makes release day a simple file edit.",
        },
        {
          kind: "why-matters",
          body: "Users who upgrade your library need to know what changed. A good changelog means they can skim a few lines and understand whether the upgrade will break their code. Without one, they face an anxious `git log` reading session or just avoid upgrading — which means they miss security patches.",
        },
      ],
      interactions: [
        {
          id: "s49-changelog-mc",
          kind: "multiple-choice",
          prompt:
            "A function's return type changed from `dict` to `list` in the new release. Which changelog category should this appear under?",
          beginnerPurpose: "Apply changelog categories to real changes",
          expectedConceptIds: ["api-documentation"],
          options: [
            {
              id: "a",
              text: "Added",
              isCorrect: false,
              explanation: "Added is for new features, not for modifications to existing ones.",
            },
            {
              id: "b",
              text: "Changed",
              isCorrect: true,
              explanation: "Changed covers modifications to existing functionality — exactly what a return type change is.",
            },
            {
              id: "c",
              text: "Fixed",
              isCorrect: false,
              explanation: "Fixed is for bug fixes. An intentional API change is not a bug fix.",
            },
            {
              id: "d",
              text: "Removed",
              isCorrect: false,
              explanation: "Removed is for features that no longer exist. The function still exists.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "The function still exists but behaves differently." },
          ],
          feedback: {
            correct: "Correct! Behavioural changes to existing APIs go under 'Changed'.",
            incorrect: "The function still exists but its behaviour changed — that fits 'Changed'.",
          },
        },
        {
          id: "s49-changelog-fill",
          kind: "fill-code",
          prompt:
            "Complete the changelog entry for a new release using the Keep a Changelog format.",
          beginnerPurpose: "Practice writing a correctly formatted changelog entry",
          expectedConceptIds: ["api-documentation"],
          codeTemplate:
            "## ___BLANK1___ - 2024-09-01\n### ___BLANK2___\n- Added `batch_process()` for bulk operations.\n\n### ___BLANK3___\n- Fixed crash when input list is empty.",
          blanks: [
            { placeholder: "___BLANK1___", answer: "[1.3.0]", caseSensitive: true },
            { placeholder: "___BLANK2___", answer: "Added", caseSensitive: true },
            { placeholder: "___BLANK3___", answer: "Fixed", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "structural", text: "Version numbers use [X.Y.Z] format. New features = Added. Bug fixes = Fixed." },
          ],
          feedback: {
            correct: "Correct Keep a Changelog format!",
            incorrect: "Version format is [1.3.0]. New feature category is 'Added'. Bug fix category is 'Fixed'.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "api-documentation",
          recallPrompt: "Name all six Keep a Changelog categories and what each covers.",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-changelog-mc", "s49-changelog-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.10 ───────────────────────────────────────────────────────
    {
      id: "s49-versioning",
      stageId: "stage-49",
      title: "Versioning",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand Semantic Versioning (SemVer) and its rules",
        "Apply version bumping rules for breaking, feature, and patch changes",
        "Know how Python's packaging ecosystem uses version specifiers",
      ],
      prerequisites: ["s49-changelogs"],
      concepts: ["api-documentation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Semantic Versioning\n\n**Semantic Versioning** (SemVer) is a versioning scheme with a strict meaning for each component: `MAJOR.MINOR.PATCH`.\n\n- **MAJOR** — incremented for breaking (incompatible) API changes\n- **MINOR** — incremented for backward-compatible new features\n- **PATCH** — incremented for backward-compatible bug fixes\n\nVersion `0.x.y` is considered pre-stable: breaking changes can happen on any increment.",
        },
        {
          kind: "mental-model",
          title: "Version numbers as a promise",
          analogy: "A contract renewal: MAJOR = new contract, MINOR = addendum, PATCH = typo fix.",
          explanation: "When a user pins `mylib>=2.1,<3`, they are relying on the promise that 2.x will not break their code. A MINOR bump adds features they can ignore; a PATCH fixes bugs; a MAJOR signals they must read the migration guide.",
        },
        {
          kind: "code",
          language: "python",
          code:
            '# pyproject.toml version field\n# version = "2.3.1"\n\n# Scenarios:\n# Bug fix only          → 2.3.1 → 2.3.2\n# New backward-compat feature → 2.3.1 → 2.4.0\n# Breaking API change   → 2.3.1 → 3.0.0\n# New project, unstable → 0.1.0',
          caption: "When to increment each component.",
        },
        {
          kind: "text",
          markdown:
            "### Python version specifiers (PEP 440)\n\n```\nmylib>=2.1,<3      # compatible with 2.x from 2.1\nmylib~=2.1         # compatible release: >=2.1, <3\nmylib==2.3.1       # exact pin\nmylib!=2.3.0       # exclude a broken version\n```\n\nPyPI and `pip` enforce these specifiers during installation.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "0.x is not stable",
          body: "Version 0.x.y signals that the API is still experimental. Users should expect breaking changes. Once you commit to a stable API, release 1.0.0.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use bumpversion or bump2version",
          body: "The `bump2version` or `python-semantic-release` tools automate version incrementing across all files (`pyproject.toml`, `__init__.py`, changelog). This removes human error from the process.",
        },
        {
          kind: "why-matters",
          body: "Version numbers are the primary communication channel between library maintainers and library users. A correct MAJOR bump warns users of breaking changes before they upgrade. An incorrect MAJOR bump (failing to bump it for a breaking change) silently breaks user code during `pip install --upgrade`.",
        },
      ],
      interactions: [
        {
          id: "s49-semver-mc",
          kind: "multiple-choice",
          prompt:
            "Your library is at version 2.4.3. You add a new function `batch_export()` without changing any existing API. What should the new version be?",
          beginnerPurpose: "Apply SemVer rules to a real versioning decision",
          expectedConceptIds: ["api-documentation"],
          options: [
            {
              id: "a",
              text: "2.4.4",
              isCorrect: false,
              explanation: "PATCH is for bug fixes only, not new features.",
            },
            {
              id: "b",
              text: "2.5.0",
              isCorrect: true,
              explanation: "A backward-compatible new feature increments MINOR and resets PATCH to 0.",
            },
            {
              id: "c",
              text: "3.0.0",
              isCorrect: false,
              explanation: "MAJOR is only for breaking changes. Adding a new function without removing old ones is not breaking.",
            },
            {
              id: "d",
              text: "2.4.3.1",
              isCorrect: false,
              explanation: "SemVer uses exactly three components: MAJOR.MINOR.PATCH.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "New feature, backward compatible = MINOR increment." },
          ],
          feedback: {
            correct: "Correct! New backward-compatible feature → MINOR bump, PATCH resets to 0.",
            incorrect: "Review SemVer: PATCH=bug fix, MINOR=new feature, MAJOR=breaking change.",
          },
        },
        {
          id: "s49-semver-predict",
          kind: "predict-output",
          prompt: "What does pip print when checking whether version 2.4.3 satisfies the specifier `>=2.1,<3`?",
          beginnerPurpose: "Understand how pip evaluates version specifiers",
          expectedConceptIds: ["api-documentation"],
          code:
            'from packaging.version import Version\nfrom packaging.specifiers import SpecifierSet\n\nspec = SpecifierSet(">=2.1,<3")\nprint(Version("2.4.3") in spec)',
          expectedOutput: "True",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "2.4.3 is ≥ 2.1 and < 3. Does it satisfy both conditions?" },
          ],
          feedback: {
            correct: "Correct! 2.4.3 satisfies >=2.1 AND <3.",
            incorrect: "Check: is 2.4.3 ≥ 2.1? Yes. Is 2.4.3 < 3? Yes. Both conditions satisfied.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "api-documentation",
          recallPrompt: "When do you increment MAJOR, MINOR, and PATCH in SemVer?",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-semver-mc", "s49-semver-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.11 ───────────────────────────────────────────────────────
    {
      id: "s49-deprecation-notices",
      stageId: "stage-49",
      title: "Deprecation Notices",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Emit deprecation warnings using the warnings module",
        "Follow a deprecation lifecycle with migration guidance",
        "Maintain backward compatibility during deprecation periods",
      ],
      prerequisites: ["s49-versioning"],
      concepts: ["api-documentation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Deprecation Notices\n\n**Deprecation** is the process of marking a feature as obsolete and scheduled for removal, while keeping it functional to give users time to migrate.\n\nA healthy deprecation lifecycle:\n1. **Announce** — add a deprecation warning; document the replacement\n2. **Keep functional** — the old API still works; only warns\n3. **Remove** — in a future MAJOR version, remove the deprecated code",
        },
        {
          kind: "code",
          language: "python",
          code:
            'import warnings\n\n\ndef old_process(data):\n    """Process data.\n\n    .. deprecated:: 2.3\n        Use :func:`process_v2` instead. Will be removed in 3.0.\n    """\n    warnings.warn(\n        "old_process() is deprecated and will be removed in 3.0. "\n        "Use process_v2() instead.",\n        DeprecationWarning,\n        stacklevel=2,  # points warning at the caller\'s line, not this line\n    )\n    return process_v2(data)\n\n\ndef process_v2(data):\n    """Replacement for old_process()."""\n    ...',
          caption: "Deprecated function that warns and delegates to the replacement.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "stacklevel=2 points the warning at the caller",
          body: "Without `stacklevel=2`, the warning points to the line inside `old_process()`. With it, the warning points to the caller's line — the place the developer needs to change.",
        },
        {
          kind: "code",
          language: "python",
          code:
            '# Users can enable deprecation warnings during testing\nimport warnings\nwarnings.filterwarnings("error", category=DeprecationWarning)\n\n# Or via pytest\n# pytest -W error::DeprecationWarning\n\n# Or via command line\n# python -W error::DeprecationWarning my_script.py',
          caption: "Turning deprecation warnings into errors helps users catch deprecated usage in CI.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Never remove without warning first",
          body: "Removing a function that had no deprecation warning is a breaking change that violates user trust. Always deprecate in one MINOR release, then remove in the next MAJOR.",
        },
        {
          kind: "why-matters",
          body: "Deprecation warnings give users a migration window. Libraries that remove features without deprecation notices break user code silently during upgrades. A clear deprecation lifecycle — warn, document replacement, remove — allows everyone to upgrade on their own schedule.",
        },
      ],
      interactions: [
        {
          id: "s49-deprecation-fill",
          kind: "fill-code",
          prompt:
            "Complete the deprecation warning call so it points at the caller's line and uses the correct warning class.",
          beginnerPurpose: "Practice issuing a correct deprecation warning",
          expectedConceptIds: ["api-documentation"],
          codeTemplate:
            "import warnings\n\n\ndef fetch(url, timeout=30):\n    warnings.warn(\n        \"fetch() is deprecated. Use fetch_v2() instead.\",\n        ___BLANK1___,\n        stacklevel=___BLANK2___,\n    )\n    return fetch_v2(url, timeout=timeout)",
          blanks: [
            { placeholder: "___BLANK1___", answer: "DeprecationWarning", caseSensitive: true },
            { placeholder: "___BLANK2___", answer: "2", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "The warning class for deprecated features is DeprecationWarning. stacklevel=2 points at the caller." },
          ],
          feedback: {
            correct: "Correct! DeprecationWarning with stacklevel=2 points the warning at the caller.",
            incorrect: "Use DeprecationWarning (not RuntimeWarning) and stacklevel=2 to point at the caller.",
          },
        },
        {
          id: "s49-deprecation-mc",
          kind: "multiple-choice",
          prompt:
            "In which version of a SemVer library should a deprecated function actually be removed?",
          beginnerPurpose: "Connect deprecation lifecycle to versioning practices",
          expectedConceptIds: ["api-documentation"],
          options: [
            {
              id: "a",
              text: "In the same MINOR release where the deprecation warning was added",
              isCorrect: false,
              explanation: "Removing in the same release as deprecating gives users no migration window.",
            },
            {
              id: "b",
              text: "In the next PATCH release after the deprecation warning",
              isCorrect: false,
              explanation: "PATCH releases should not contain breaking changes.",
            },
            {
              id: "c",
              text: "In the next MAJOR release (or a later one)",
              isCorrect: true,
              explanation: "Removal is a breaking change and must be a MAJOR version bump. The deprecation warning appears in a MINOR release first.",
            },
            {
              id: "d",
              text: "Deprecated functions should never be removed",
              isCorrect: false,
              explanation: "Deprecated code accumulates technical debt. Remove it in a MAJOR version after sufficient warning.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Removal is a breaking change. Which version component signals breaking changes?" },
          ],
          feedback: {
            correct: "Correct! Removal is a breaking change → MAJOR version bump.",
            incorrect: "Removing a function breaks existing code, so it requires a MAJOR version increment.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "api-documentation",
          recallPrompt: "Describe the three-step deprecation lifecycle and why stacklevel=2 matters.",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-deprecation-fill", "s49-deprecation-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.12 ───────────────────────────────────────────────────────
    {
      id: "s49-code-review-practices",
      stageId: "stage-49",
      title: "Code Review Practices",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Conduct effective code reviews as an author and reviewer",
        "Apply reviewer etiquette that builds rather than erodes team trust",
        "Know what to check and what to leave to automation",
      ],
      prerequisites: ["s49-deprecation-notices"],
      concepts: ["pep8-style"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Code Review Practices\n\nCode review is the process of having peers examine code before it merges. Its goals:\n1. **Catch defects** early when they are cheap to fix\n2. **Share knowledge** across the team\n3. **Enforce standards** consistently\n4. **Mentor** less-experienced developers\n\nEffective code review is a skill — both writing and receiving feedback require practice.",
        },
        {
          kind: "text",
          markdown:
            "### As a reviewer\n\n**Check for:**\n- Correctness — does the code do what it claims?\n- Missing edge cases — empty lists, None inputs, concurrent access\n- Tests — are they present and meaningful?\n- Readability — could a new team member understand this in 6 months?\n- Security — user-controlled input, SQL injection, path traversal\n\n**Leave to automation:**\n- Formatting — let `black`/`ruff` decide\n- Import order — `isort` handles this\n- Line length — your linter flags it",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Be specific and kind",
          body: "Replace 'this is wrong' with 'I think X might fail when the list is empty — could we add a guard or test?'. Ask questions instead of issuing commands. The goal is the best code, not winning an argument.",
        },
        {
          kind: "text",
          markdown:
            "### As an author\n\n- **Keep PRs small** — under 400 lines of diff when possible. Large PRs are reviewed poorly.\n- **Write a PR description** — what problem does this solve? why this approach?\n- **Self-review first** — read your own diff before requesting review\n- **Respond to all comments** — even if only to say 'done' or 'disagree, see reasoning below'\n- **Don't take it personally** — the review is about the code, not you",
        },
        {
          kind: "comparison",
          leftLabel: "Unhelpful review comment",
          rightLabel: "Actionable review comment",
          leftCode:
            "# bad\n\"This function is too long.\"\n\n\"Wrong approach.\"\n\n\"You should know better.\"",
          rightCode:
            "# good\n\"This function handles three responsibilities.\n Could we extract the validation into `_validate_input()`?\"\n\n\"I think caching here might cause stale data.\n Could we discuss the tradeoff?\"\n\n\"Nit: prefer `enumerate()` over `range(len(...))`\n for readability.\"",
          caption: "Specific, actionable, and respectful feedback is more effective.",
        },
        {
          kind: "why-matters",
          body: "Poorly conducted code reviews slow teams down and damage psychological safety. A culture of respectful, focused code review catches bugs early, spreads knowledge, and builds team cohesion. The style of review shapes whether people feel safe taking risks and trying new approaches.",
        },
      ],
      interactions: [
        {
          id: "s49-review-mc",
          kind: "multiple-choice",
          prompt:
            "Which of the following is the BEST use of reviewer time during a code review?",
          beginnerPurpose: "Distinguish high-value review tasks from tasks better left to tools",
          expectedConceptIds: ["pep8-style"],
          options: [
            {
              id: "a",
              text: "Correcting all formatting inconsistencies manually",
              isCorrect: false,
              explanation: "Formatting should be handled by automated tools (black, ruff), not by human reviewers.",
            },
            {
              id: "b",
              text: "Checking whether edge cases and error paths are tested",
              isCorrect: true,
              explanation: "Testing edge cases is a high-value review task that automation cannot perform.",
            },
            {
              id: "c",
              text: "Rewriting the code to match their personal style",
              isCorrect: false,
              explanation: "Reviewers should enforce team standards, not personal preference.",
            },
            {
              id: "d",
              text: "Counting the number of lines in each function",
              isCorrect: false,
              explanation: "Linters can check function length. Human reviewers should focus on logic and intent.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "What can automated tools not check that humans can?" },
          ],
          feedback: {
            correct: "Correct! Edge case coverage is exactly what human reviewers excel at.",
            incorrect: "Automated tools handle formatting. Human reviewers should focus on correctness and testing.",
          },
        },
        {
          id: "s49-review-explain",
          kind: "plain-language-explain",
          prompt:
            "Explain why keeping pull requests small (under 400 lines) improves review quality.",
          beginnerPurpose: "Understand the relationship between PR size and review effectiveness",
          expectedConceptIds: ["pep8-style"],
          code:
            "# Small PR: one focused change\ngit log --oneline -3\n# abc1234 Add cache for user lookups\n# def5678 Fix validation for empty email\n# ghi9012 Update README with new config options",
          keyPointsToHit: [
            "Large diffs are harder to review thoroughly",
            "Reviewers lose focus after many lines",
            "Small PRs are easier to test and revert",
          ],
          sampleAnswer:
            "When a pull request contains hundreds of files and thousands of lines, reviewers cannot maintain focus across all the changes. Research shows that reviewer attention drops sharply after 200-400 lines of diff. Large PRs also mix multiple concerns, making it harder to isolate the cause of a bug if one is introduced. Small, focused PRs are easier to test, easier to understand, and easier to revert if something goes wrong.",
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think about human attention and the difficulty of tracking context across many files." },
          ],
          feedback: {
            correct: "Well explained! PR size directly impacts reviewer attention and thoroughness.",
            incorrect: "Focus on reviewer attention span, the mixing of concerns, and the ease of testing/reverting.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "pep8-style",
          recallPrompt: "Name three things a code reviewer should check that automated tools cannot.",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-review-mc", "s49-review-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.13 ───────────────────────────────────────────────────────
    {
      id: "s49-refactoring-discipline",
      stageId: "stage-49",
      title: "Refactoring Discipline",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Apply the boy scout rule: leave code better than you found it",
        "Understand when to refactor and when to leave code alone",
        "Use tests as a safety net for refactoring",
      ],
      prerequisites: ["s49-code-review-practices"],
      concepts: ["pep8-style"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Refactoring Discipline\n\n**Refactoring** means changing the *structure* of code without changing its *behaviour*. Done with discipline, refactoring keeps a codebase healthy over years. Done carelessly, it introduces regressions and confuses teammates.\n\nThe **boy scout rule**: always leave the code cleaner than you found it. Small improvements made consistently accumulate into a much healthier codebase.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Never refactor without tests",
          body: "Before refactoring, ensure the code has tests that verify its behaviour. If it does not, write the tests first. Tests are the safety net that proves the refactoring did not change behaviour.",
        },
        {
          kind: "text",
          markdown:
            "### When to refactor\n\n- **Green light**: You have tests; the refactoring is isolated; you can commit separately\n- **Yellow light**: You lack tests — write them first\n- **Red light**: Deadline is imminent; the refactoring is speculative ('maybe we'll need this'); it changes behaviour\n\nThe worst time to refactor is during a bug fix — you mix two unrelated changes and cannot tell which caused a regression.",
        },
        {
          kind: "comparison",
          leftLabel: "Before refactor",
          rightLabel: "After refactor",
          leftCode:
            "def get_user_data(uid):\n    db = connect_db()\n    rows = db.execute('SELECT * FROM users WHERE id=?', [uid])\n    if len(rows) == 0:\n        return None\n    row = rows[0]\n    return {'id': row[0], 'name': row[1], 'email': row[2]}",
          rightCode:
            "def get_user_data(uid: int) -> dict | None:\n    with database_session() as db:\n        row = db.query(User).filter(User.id == uid).first()\n        return _row_to_dict(row) if row else None\n\n\ndef _row_to_dict(row: User) -> dict:\n    return {'id': row.id, 'name': row.name, 'email': row.email}",
          caption: "Same behaviour, better structure: context manager for DB, type hints, extracted helper.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Commit refactoring separately from feature changes",
          body: "Make one commit that only refactors (no behaviour change) and a separate commit that adds or changes behaviour. This makes `git blame` and `git bisect` far more useful.",
        },
        {
          kind: "why-matters",
          body: "Code that is never refactored accumulates technical debt. What starts as a small shortcut grows into a tangle that everyone fears to touch. Regular, disciplined refactoring keeps the codebase in a state where features can be added safely and quickly.",
        },
      ],
      interactions: [
        {
          id: "s49-refactor-mc",
          kind: "multiple-choice",
          prompt:
            "You want to refactor a complex function that has no tests. What should you do FIRST?",
          beginnerPurpose: "Apply the correct sequence: tests before refactor",
          expectedConceptIds: ["pep8-style"],
          options: [
            {
              id: "a",
              text: "Refactor immediately while the code is fresh in your mind",
              isCorrect: false,
              explanation: "Without tests, you have no way to verify that the refactoring did not change behaviour.",
            },
            {
              id: "b",
              text: "Write characterisation tests that capture the current behaviour, then refactor",
              isCorrect: true,
              explanation: "Tests first — they are the safety net that proves the refactoring is behaviour-neutral.",
            },
            {
              id: "c",
              text: "Ask a colleague to review the refactored code after you finish",
              isCorrect: false,
              explanation: "Code review is valuable but cannot replace tests that verify behaviour.",
            },
            {
              id: "d",
              text: "Skip the refactoring to avoid risk",
              isCorrect: false,
              explanation: "Deferring refactoring forever leads to accumulating debt. The right answer is to add tests first.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Refactoring without tests is like walking a tightrope without a safety net." },
          ],
          feedback: {
            correct: "Correct! Always have tests in place before refactoring.",
            incorrect: "Without tests you cannot prove the refactoring did not break anything. Tests come first.",
          },
        },
        {
          id: "s49-refactor-explain",
          kind: "plain-language-explain",
          prompt:
            "Explain the boy scout rule and why committing refactors separately from features matters.",
          beginnerPurpose: "Articulate disciplined refactoring practices",
          expectedConceptIds: ["pep8-style"],
          code:
            "# Separate commits\ngit log --oneline\n# a1b2c3 refactor: extract _build_query() from search()\n# d4e5f6 feat: add date-range filter to search()",
          keyPointsToHit: [
            "Boy scout rule: leave code better than you found it",
            "Separate refactor commits from feature commits",
            "Makes git bisect and git blame more useful",
          ],
          sampleAnswer:
            "The boy scout rule says to leave code a little cleaner every time you touch it — fix a confusing name, extract a helper, add a missing type hint. Compounded over time this keeps the codebase healthy. Committing refactoring separately from feature changes matters because it makes the history readable: if a bug is introduced, git bisect can skip the pure-refactor commits knowing they did not change behaviour. It also makes code review easier since reviewers can clearly see what changed structurally versus what changed functionally.",
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think about what git bisect needs to work effectively." },
          ],
          feedback: {
            correct: "Well explained! Separate commits and incremental improvement are the core ideas.",
            incorrect: "Cover: boy scout rule (leave it better), separate commits (helps git bisect), and tests as safety net.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "pep8-style",
          recallPrompt: "What is the boy scout rule and why is it applied incrementally?",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-refactor-mc", "s49-refactor-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.14 ───────────────────────────────────────────────────────
    {
      id: "s49-backward-compatibility",
      stageId: "stage-49",
      title: "Backward Compatibility",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define backward compatibility and why it matters for library users",
        "Identify changes that break backward compatibility",
        "Apply techniques to preserve compatibility while extending APIs",
      ],
      prerequisites: ["s49-refactoring-discipline"],
      concepts: ["api-documentation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Backward Compatibility\n\nA change is **backward compatible** if code written against the old API continues to work without modification after the upgrade.\n\nBreaking backward compatibility forces every user to update their code before they can upgrade. In large ecosystems (hundreds or thousands of downstream users) this is a significant cost.",
        },
        {
          kind: "text",
          markdown:
            "### What breaks backward compatibility\n\n- Removing a public function, class, or constant\n- Changing a function signature (removing or reordering positional parameters)\n- Changing return types in an incompatible way\n- Raising a different exception type\n- Changing observable side effects the caller depends on\n\n### What does NOT break backward compatibility\n\n- Adding new functions or classes\n- Adding keyword-only parameters with defaults\n- Fixing bugs (changing incorrect behaviour is allowed)\n- Adding new keyword arguments with sensible defaults",
        },
        {
          kind: "code",
          language: "python",
          code:
            "# BREAKING: removes a positional parameter\n# Old: send(message, recipient, cc)\n# New: send(message, recipient)  # cc silently removed\n\n# NOT BREAKING: adds keyword-only parameter with default\ndef send(message: str, recipient: str, *, cc: str = '') -> None:\n    ...\n\n# NOT BREAKING: add new function\ndef send_bulk(messages: list[str], recipient: str) -> None:\n    ...",
          caption: "Adding keyword-only parameters with defaults is backward compatible.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use keyword-only arguments for new parameters",
          body: "Adding `*, new_param=default` to an existing function is backward compatible — all existing callers use positional or keyword arguments and the new parameter has a default.",
        },
        {
          kind: "mental-model",
          title: "Backward compatibility as a social contract",
          analogy: "A bank that changes the interest rate on existing accounts without notice versus one that notifies customers first.",
          explanation: "Library users have invested time building on your API. Changing it without notice or a migration path is like the bank moving the goalposts. The 'notification' in software is: deprecation warning in MINOR, removal in MAJOR, documented migration path.",
        },
        {
          kind: "why-matters",
          body: "Python's success is partly due to its ecosystem of libraries. That ecosystem depends on predictable compatibility. Packages that respect backward compatibility accumulate users who stay. Packages that break it lose users who cannot afford the maintenance burden.",
        },
      ],
      interactions: [
        {
          id: "s49-compat-mc",
          kind: "multiple-choice",
          prompt:
            "Which change to an existing public function IS backward compatible?",
          beginnerPurpose: "Identify compatible vs incompatible API changes",
          expectedConceptIds: ["api-documentation"],
          options: [
            {
              id: "a",
              text: "Removing the second positional parameter",
              isCorrect: false,
              explanation: "Removing a positional parameter breaks existing callers that pass a second argument.",
            },
            {
              id: "b",
              text: "Adding a required keyword argument `strict`",
              isCorrect: false,
              explanation: "Adding a required argument (no default) breaks existing callers who do not pass it.",
            },
            {
              id: "c",
              text: "Adding an optional keyword-only argument `timeout=30`",
              isCorrect: true,
              explanation: "Keyword-only arguments with defaults are backward compatible — existing callers are unaffected.",
            },
            {
              id: "d",
              text: "Changing the return type from list to tuple",
              isCorrect: false,
              explanation: "Callers that iterate, index, or compare the return value may break if the type changes.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "An optional keyword-only parameter does not affect callers who do not use it." },
          ],
          feedback: {
            correct: "Correct! Optional keyword-only parameters with defaults do not affect existing callers.",
            incorrect: "Only adding optional parameters with defaults is backward compatible.",
          },
        },
        {
          id: "s49-compat-fill",
          kind: "fill-code",
          prompt:
            "Add a backward-compatible `encoding` parameter to `read_file()`. It should be keyword-only with a default of 'utf-8'.",
          beginnerPurpose: "Practice adding compatible API extensions",
          expectedConceptIds: ["api-documentation"],
          codeTemplate:
            "def read_file(path: str, ___BLANK1___encoding: str = ___BLANK2___) -> str:\n    with open(path, encoding=encoding) as f:\n        return f.read()",
          blanks: [
            { placeholder: "___BLANK1___", answer: "*,\n    ", caseSensitive: false },
            { placeholder: "___BLANK2___", answer: "'utf-8'", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "Use `*,` before the parameter to make it keyword-only." },
            { level: "concept", text: "The default value should be a string literal: 'utf-8'." },
          ],
          feedback: {
            correct: "Correct! `*, encoding='utf-8'` adds a keyword-only parameter with a default.",
            incorrect: "Use `*, encoding='utf-8'` to add a keyword-only parameter after the existing positional parameters.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "api-documentation",
          recallPrompt: "Name three changes that break backward compatibility and one technique to add features without breaking it.",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-compat-mc", "s49-compat-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.15 ───────────────────────────────────────────────────────
    {
      id: "s49-release-notes",
      stageId: "stage-49",
      title: "Release Notes",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish release notes from changelogs",
        "Write release notes targeted at end users, not developers",
        "Include migration guidance for breaking changes",
      ],
      prerequisites: ["s49-backward-compatibility"],
      concepts: ["api-documentation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Release Notes\n\n**Release notes** are the human-readable announcement of a specific release. They differ from a changelog:\n\n| | Changelog | Release Notes |\n|---|---|---|\n| **Audience** | Developers & power users | End users |\n| **Format** | Running list across all versions | Single-version announcement |\n| **Tone** | Technical | Conversational |\n| **Content** | Every notable change | Key highlights + migration guide |",
        },
        {
          kind: "text",
          markdown:
            "### Anatomy of good release notes\n\n1. **What's new** — two or three headline features\n2. **Breaking changes** — explicit, with migration steps\n3. **Bug fixes** — brief summary\n4. **Upgrade instructions** — the exact `pip install` command\n5. **Full changelog link** — for those who want every detail",
        },
        {
          kind: "code",
          language: "markdown",
          code:
            "# mylib 3.0.0 Release Notes\n\n## What's new\n- New `batch_process()` function — up to 10× faster for bulk operations.\n- Full async support via `async with AsyncClient() as client:`\n\n## Breaking changes\n- `process()` now returns `ProcessResult` instead of `dict`.\n  **Migration**: replace `result['status']` with `result.status`.\n- Python 3.9 is no longer supported. Minimum is now 3.10.\n\n## Bug fixes\n- Fixed crash when input contains null bytes (#412).\n\n## Upgrade\n```\npip install mylib==3.0.0\n```\n\n[Full changelog](CHANGELOG.md)",
          caption: "Release notes for a major version with a clear breaking-change migration section.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Never bury breaking changes",
          body: "Breaking changes must appear prominently — not buried in a long list of fixes. Users need to find them immediately so they can plan their upgrade.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Write for your user, not your ego",
          body: "Release notes are not a place to celebrate how hard the feature was to build. Focus on what the user can now do, not on the internal engineering effort.",
        },
        {
          kind: "why-matters",
          body: "Well-written release notes reduce the number of confused users and support requests after every release. They turn a potentially disruptive upgrade into a smooth one.",
        },
      ],
      interactions: [
        {
          id: "s49-releasenotes-mc",
          kind: "multiple-choice",
          prompt:
            "A new major version removes a function that was deprecated in the previous minor version. Where must this removal be documented in the release notes?",
          beginnerPurpose: "Understand the importance of prominently documenting breaking changes",
          expectedConceptIds: ["api-documentation"],
          options: [
            {
              id: "a",
              text: "Only in the full changelog, linked from the release notes",
              isCorrect: false,
              explanation: "Breaking changes need to be prominent — buried in the changelog is insufficient.",
            },
            {
              id: "b",
              text: "In the 'Bug fixes' section since it was already deprecated",
              isCorrect: false,
              explanation: "Removal is a breaking change, not a bug fix.",
            },
            {
              id: "c",
              text: "In a clearly labelled 'Breaking changes' section with migration instructions",
              isCorrect: true,
              explanation: "Breaking changes must be prominently called out with explicit migration guidance.",
            },
            {
              id: "d",
              text: "It does not need documentation since the deprecation warning covered it",
              isCorrect: false,
              explanation: "The deprecation warning was in the previous version. The release notes must also document the removal.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Users who skipped the previous version's deprecation warning need to see the removal immediately." },
          ],
          feedback: {
            correct: "Correct! Breaking changes need a dedicated, prominent section with migration steps.",
            incorrect: "Breaking changes must be prominently documented with migration steps in every release that contains them.",
          },
        },
        {
          id: "s49-releasenotes-explain",
          kind: "plain-language-explain",
          prompt:
            "Explain the key difference between a changelog and release notes, and who reads each one.",
          beginnerPurpose: "Distinguish two important documentation artifacts",
          expectedConceptIds: ["api-documentation"],
          code:
            "# Release notes excerpt\n\"## mylib 3.0 — What's new\n- Async support added.\n- Breaking: process() returns ProcessResult now.\"\n\n# Changelog entry\n\"## [3.0.0] - 2024-09-01\n### Changed\n- process() return type is now ProcessResult.\n### Added\n- async support via AsyncClient.\"",
          keyPointsToHit: [
            "Changelog is a running technical record for all versions",
            "Release notes are a single-version announcement for end users",
            "Release notes include migration guidance for breaking changes",
          ],
          sampleAnswer:
            "A changelog is a technical, running record of every change across all versions. It's read by developers who want to know exactly what changed between specific versions. Release notes are a single-version announcement written for end users. They highlight the most important changes, explain breaking changes with migration steps, and are written in a conversational tone. A developer upgrading from 2.4 to 3.0 reads the release notes to understand the impact; they read the changelog if they need the precise list of every fix.",
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think: who reads each one, and what question does each one answer?" },
          ],
          feedback: {
            correct: "Well explained! Changelog = technical record across versions; release notes = user-focused single-version announcement.",
            incorrect: "Focus on audience (developers vs end users) and scope (all versions vs one release).",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "api-documentation",
          recallPrompt: "What five elements make up a good release notes document?",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-releasenotes-mc", "s49-releasenotes-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── Lesson 49.16 ───────────────────────────────────────────────────────
    {
      id: "s49-documentation-project",
      stageId: "stage-49",
      title: "Documentation Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Apply all documentation and style concepts to a real codebase",
        "Produce a complete documentation suite: module docstrings, API docs, README, changelog, and release notes",
        "Demonstrate PEP 8 compliance and consistent naming conventions",
      ],
      prerequisites: ["s49-release-notes"],
      concepts: ["pep8-style", "docstring-conventions", "api-documentation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Documentation Project\n\nIn this project you will document an existing Python library from scratch. You will apply every skill covered in Stage 49:\n\n- PEP 8 compliance and naming conventions\n- Module, function, and class docstrings\n- A structured README\n- API documentation with Sphinx or pdoc\n- A CHANGELOG following Keep a Changelog format\n- Release notes for the current version",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Project brief",
          body: "You are given a small Python library — a task queue — that has no documentation at all. Your job is to add complete documentation without changing any behaviour.",
        },
        {
          kind: "code",
          language: "python",
          code:
            '# taskqueue.py — undocumented starting code\nfrom __future__ import annotations\nfrom collections import deque\nfrom typing import Any\n\n\nclass TaskQueue:\n    def __init__(self, maxsize: int = 0) -> None:\n        self._q: deque[Any] = deque()\n        self.maxsize = maxsize\n\n    def put(self, item: Any) -> None:\n        if self.maxsize and len(self._q) >= self.maxsize:\n            raise OverflowError("queue is full")\n        self._q.append(item)\n\n    def get(self) -> Any:\n        if not self._q:\n            raise IndexError("queue is empty")\n        return self._q.popleft()\n\n    def empty(self) -> bool:\n        return len(self._q) == 0\n\n    def size(self) -> int:\n        return len(self._q)',
          caption: "The undocumented task queue library you will document in this project.",
        },
        {
          kind: "text",
          markdown:
            "### Deliverables\n\n1. **Module docstring** — describe purpose, audience, and usage\n2. **Class docstring** with Attributes section and usage example\n3. **Method docstrings** (Google or NumPy style) for all four methods\n4. **README** with all standard sections\n5. **CHANGELOG** with at least two historical entries\n6. **Release notes** for the current version\n7. PEP 8 compliance verified via `ruff check` or `flake8`",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Start with the module docstring",
          body: "Write the module docstring first — it forces you to articulate the purpose of the whole module before diving into individual methods. If you cannot write the module docstring in one sentence, the design may need rethinking.",
        },
        {
          kind: "why-matters",
          body: "Documentation is not a last step — it is a design tool. Writing it reveals gaps, ambiguities, and missing features. A module that is hard to document is often a module that is hard to use.",
        },
      ],
      interactions: [
        {
          id: "s49-proj-run",
          kind: "run-code",
          prompt:
            "Add a Google-style docstring to the `put()` method of TaskQueue. Run the code to verify it is accessible via `help()`.",
          beginnerPurpose: "Practice writing a method docstring and verifying it",
          expectedConceptIds: ["docstring-conventions"],
          starterCode:
            'from collections import deque\nfrom typing import Any\n\n\nclass TaskQueue:\n    """A FIFO task queue with optional size limit."""\n\n    def __init__(self, maxsize: int = 0) -> None:\n        self._q: deque[Any] = deque()\n        self.maxsize = maxsize\n\n    def put(self, item: Any) -> None:\n        # TODO: add docstring here\n        if self.maxsize and len(self._q) >= self.maxsize:\n            raise OverflowError("queue is full")\n        self._q.append(item)\n\n\nq = TaskQueue(maxsize=3)\nprint(q.put.__doc__)',
          task:
            "Replace the `# TODO` comment with a Google-style docstring that documents the `item` parameter and the `OverflowError` exception.",
          expectedOutputContains: ["Args", "Raises"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "syntax", text: 'Triple-quoted string immediately after `def put(...):`' },
            { level: "concept", text: "Google style: Args: section for parameters, Raises: for exceptions." },
          ],
          feedback: {
            correct: "The docstring is in place and accessible via __doc__.",
            incorrect: "Add a triple-quoted docstring after the def line with Args and Raises sections.",
          },
        },
        {
          id: "s49-proj-mc",
          kind: "multiple-choice",
          prompt:
            "You have finished documenting the library. Which tool should you run to verify PEP 8 compliance?",
          beginnerPurpose: "Know the toolchain for style verification",
          expectedConceptIds: ["pep8-style"],
          options: [
            {
              id: "a",
              text: "python -m doctest",
              isCorrect: false,
              explanation: "doctest runs examples in docstrings, not style checks.",
            },
            {
              id: "b",
              text: "ruff check . or flake8 .",
              isCorrect: true,
              explanation: "ruff and flake8 are linters that check PEP 8 compliance.",
            },
            {
              id: "c",
              text: "python -m pytest",
              isCorrect: false,
              explanation: "pytest runs tests, not style checks (unless a style plugin is configured).",
            },
            {
              id: "d",
              text: "sphinx-apidoc",
              isCorrect: false,
              explanation: "sphinx-apidoc generates documentation stubs; it does not check style.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "You need a linter, not a test runner or documentation generator." },
          ],
          feedback: {
            correct: "Correct! ruff check or flake8 flags PEP 8 violations.",
            incorrect: "Use ruff check or flake8 to lint for PEP 8 compliance.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "pep8-style",
          recallPrompt: "List all seven deliverables of the documentation project.",
          nextReviewAfterDays: 7,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s49-proj-run", "s49-proj-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s49-project",
    stageId: "stage-49",
    title: "Documentation Project",
    brief:
      "Document an existing Python library from scratch: add module, class, and function docstrings; write a README; generate API documentation with Sphinx or pdoc; create a CHANGELOG; and write release notes for the current version.",
    requirements: [
      "Add module-level, class-level, and function-level docstrings using Google or NumPy style",
      "Write a README with all standard sections (description, installation, quick start, contributing, license)",
      "Generate HTML API documentation using Sphinx autodoc or pdoc",
      "Create a CHANGELOG.md following the Keep a Changelog format",
      "Write release notes for the current version including a breaking-changes section",
      "Verify PEP 8 compliance using ruff or flake8",
    ],
    acceptanceCriteria: [
      "All public functions, classes, and modules have docstrings",
      "ruff check / flake8 reports zero violations",
      "API docs build successfully with no warnings",
      "README answers: what, who for, install, quick start, contributing",
      "CHANGELOG has at least two historical entries in Keep a Changelog format",
    ],
    conceptIds: ["pep8-style", "docstring-conventions", "api-documentation"],
    difficulty: "intermediate",
  },
} satisfies Stage;
