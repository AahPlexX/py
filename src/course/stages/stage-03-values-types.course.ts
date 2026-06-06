import type { Stage } from "@/course/course.schema";

export const stage03 = {
  id: "stage-03",
  number: 3,
  title: "First Python Syntax and Values",
  summary:
    "Master Python's core syntax: statements, expressions, whitespace, comments, numeric literals, arithmetic, boolean values, None, variables, and naming conventions.",
  level: "beginner",
  masteryGateConceptIds: ["python-syntax", "numeric-literals", "variables-names"],

  lessons: [
    {
      id: "s3-statements-vs-expressions",
      stageId: "stage-03",
      title: "Statements vs Expressions",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Distinguish a statement from an expression",
        "Explain that expressions produce values; statements perform actions",
        "Identify examples of each in Python code",
      ],
      prerequisites: [],
      concepts: ["python-syntax"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Statements vs Expressions\n\nTwo foundational concepts in any programming language:\n\n**An expression** is any piece of code that produces a **value** when evaluated.\n```python\n2 + 3           # expression — evaluates to 5\nlen('hello')    # expression — evaluates to 5\n'Hello, ' + 'world'  # expression — evaluates to 'Hello, world'\nTrue            # expression — evaluates to True\n```\n\n**A statement** is a complete instruction that **does something** — an action. Statements don't produce a value you can use elsewhere.\n```python\nx = 5           # assignment statement — stores a value\nprint('Hi')     # expression statement — calls a function for its side effect\nif x > 0:       # compound statement — controls flow\n    pass\n```\n\n**The key rule**: expressions can appear anywhere a value is expected. Statements cannot be nested inside expressions.\n\n```python\n# OK — expression inside a print() call:\nprint(2 + 3)     # 2 + 3 is an expression; print() is a statement\n\n# OK — expressions can be composed:\nresult = len('hello') * 2  # two expressions combined\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Expression statements",
          body: "A function call like `print('hi')` is actually an expression (it returns None) used as a statement. Python allows expressions to be used as standalone statements — the return value is simply discarded. This is called an 'expression statement'.",
        },
      ],
      interactions: [
        {
          id: "s3-stmt-expr-mc",
          kind: "multiple-choice",
          prompt: "Which of the following is an EXPRESSION (produces a value)?",
          beginnerPurpose: "Classify statements vs expressions.",
          expectedConceptIds: ["python-syntax"],
          options: [
            { id: "a", text: "x = 10", isCorrect: false, explanation: "x = 10 is an assignment statement. It doesn't produce a value — it stores one." },
            { id: "b", text: "2 ** 8", isCorrect: true, explanation: "Correct! 2 ** 8 is an expression — it evaluates to the value 256." },
            { id: "c", text: "import os", isCorrect: false, explanation: "import is a statement — it loads a module but doesn't produce a usable value." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "An expression always evaluates to a value you could store or use elsewhere." }],
          feedback: { correct: "Correct! 2 ** 8 evaluates to 256 — it's an expression.", incorrect: "An expression produces a value. 2 ** 8 evaluates to 256 — that's a value you can use." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-stmt-expr-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-whitespace-indentation",
      stageId: "stage-03",
      title: "Whitespace and Indentation",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain why Python uses indentation instead of braces",
        "Use 4 spaces as the standard indentation unit",
        "Avoid mixing tabs and spaces",
      ],
      prerequisites: [],
      concepts: ["python-syntax"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Whitespace and Indentation in Python\n\nUnlike most languages that use `{ }` braces to group code, Python uses **indentation** — the leading spaces on a line — to define code blocks.\n\n```python\n# Python — indentation defines the block\nif temperature > 30:\n    print('Hot day')     # indented = inside the if\n    print('Drink water') # also inside the if\nprint('Done')            # not indented = after the if\n\n# C/Java style — braces define the block\n# if (temperature > 30) {\n#     print('Hot day');\n# }\n```\n\n**The rules:**\n1. Use **4 spaces** per indent level (PEP 8 standard)\n2. All lines at the same level must align exactly\n3. Never mix tabs and spaces — Python 3 raises an error if you do\n4. Blank lines between functions/classes are fine and encouraged\n\n```python\ndef greet(name):\n    # This is inside the function (4 spaces)\n    message = 'Hello, ' + name\n    return message\n# This is outside the function (no indentation)\nprint(greet('Alice'))\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "IndentationError is one of the most common beginner errors",
          body: "If you see `IndentationError: expected an indented block` or `IndentationError: unexpected indent`, Python found your indentation doesn't match. Check that you're using 4 spaces consistently. Configure your editor to convert Tab keypresses to 4 spaces.",
        },
      ],
      interactions: [
        {
          id: "s3-indent-mc",
          kind: "multiple-choice",
          prompt: "Python uses indentation to define code blocks. What is the PEP 8 standard indentation?",
          beginnerPurpose: "Know the standard indentation convention.",
          expectedConceptIds: ["python-syntax"],
          options: [
            { id: "a", text: "2 spaces", isCorrect: false, explanation: "2 spaces is valid Python but not the PEP 8 standard. Use 4 spaces." },
            { id: "b", text: "4 spaces", isCorrect: true, explanation: "Correct! PEP 8 (Python's official style guide) specifies 4 spaces per indentation level." },
            { id: "c", text: "1 tab character", isCorrect: false, explanation: "Tab characters work, but PEP 8 recommends 4 spaces. Never mix tabs and spaces." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Python's official style guide (PEP 8) specifies the standard." }],
          feedback: { correct: "Correct! 4 spaces per level is the PEP 8 standard.", incorrect: "The PEP 8 style guide specifies 4 spaces per indentation level." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-indent-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-comments",
      stageId: "stage-03",
      title: "Comments: Intent, Disabled Code, Warning Signs",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write single-line comments with #",
        "Explain when comments add value vs create noise",
        "Use comments to explain WHY, not what",
      ],
      prerequisites: [],
      concepts: ["python-syntax"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Python Comments\n\nA **comment** begins with `#`. Everything from `#` to the end of the line is ignored by Python.\n\n```python\n# Whole-line comment\nx = 5  # inline comment — comes after code on the same line\n\n# 'Commenting out' code — temporarily disabling a line:\n# print('debug output')  # Python ignores this entirely\n```\n\n**When to comment:**\n\n✅ **Comment the WHY** (non-obvious reasoning):\n```python\nretry_limit = 3  # three attempts before we give up and log an error\n```\n\n❌ **Don't comment the WHAT** (the code already says this):\n```python\nx = 5  # assign 5 to x  ← useless noise\n```\n\n**Three types of comments:**\n1. **Intent** — why a choice was made\n2. **Disabled code** — temporarily removing a line while debugging\n3. **Warning signs** — `# TODO:`, `# FIXME:`, `# HACK:` — flags for future attention\n\n```python\n# TODO: replace this linear search with a binary search (performance)\nfor item in data:\n    if item == target:\n        return item\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Good comments explain reasoning, not mechanics",
          body: "The best comments answer: 'Why does this code exist in this form?' Not: 'What does this line do?' The code itself tells you what it does — the comment tells you why it does it that way.",
        },
      ],
      interactions: [
        {
          id: "s3-comments-mc",
          kind: "multiple-choice",
          prompt: "Which comment adds the most value?",
          beginnerPurpose: "Distinguish useful comments from noise.",
          expectedConceptIds: ["python-syntax"],
          options: [
            { id: "a", text: "# add 1 to count\ncount = count + 1", isCorrect: false, explanation: "The code already says 'add 1 to count'. This comment is redundant noise." },
            { id: "b", text: "# cap at 100 to prevent API rate limit errors\ncount = min(count, 100)", isCorrect: true, explanation: "Correct! This explains WHY the cap exists — information not visible from the code alone." },
            { id: "c", text: "# loop\nfor x in items:", isCorrect: false, explanation: "'# loop' just restates what the code clearly shows. No value added." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which comment tells you something the code itself doesn't say?" }],
          feedback: { correct: "Correct! The best comment explains reasoning the code can't express.", incorrect: "Good comments explain WHY, not WHAT. The comment about the API rate limit explains something the code can't." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-comments-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-numeric-literals",
      stageId: "stage-03",
      title: "Numeric Literals: Integers, Floats, Complex Numbers",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write integer, float, and complex number literals",
        "Use underscores in large numbers for readability",
        "Explain the difference between int and float representation",
      ],
      prerequisites: [],
      concepts: ["numeric-literals"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Numeric Literals in Python\n\nA **literal** is a value written directly in code.\n\n**Integer literals:**\n```python\n42          # decimal\n-17         # negative\n1_000_000   # underscores for readability (value = 1000000)\n0b1010      # binary (prefix 0b) = 10\n0o17        # octal (prefix 0o) = 15\n0xFF        # hexadecimal (prefix 0x) = 255\n```\n\n**Float literals:**\n```python\n3.14        # standard decimal\n-0.001      # negative float\n1.0         # whole number as float\n1e10        # scientific notation: 1 × 10¹⁰\n2.5e-3      # 0.0025\n```\n\n**Complex number literals:**\n```python\n3 + 4j      # real=3, imaginary=4 (use j, not i)\n2j          # pure imaginary\n(3 + 4j).real   # 3.0\n(3 + 4j).imag   # 4.0\n```\n\nComplex numbers are used in scientific computing, signal processing, and electrical engineering.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use underscores in large numbers",
          body: "Python allows underscores anywhere in numeric literals to improve readability. `1_000_000` is identical to `1000000`. Use them as visual separators: `10_000_000` is clearly ten million at a glance.",
        },
      ],
      interactions: [
        {
          id: "s3-literals-predict",
          kind: "predict-output",
          prompt: "What does Python print?",
          beginnerPurpose: "Trace numeric literal values.",
          expectedConceptIds: ["numeric-literals"],
          code: "print(1_000 + 500)\nprint(2e3)\nprint(0xFF)",
          expectedOutput: "1500\n2000.0\n255",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "1_000 = 1000, 2e3 = 2000.0 (float), 0xFF = 255 (hex)." }],
          feedback: { correct: "Correct! Underscores, scientific notation, and hex all work as expected.", incorrect: "1_000 = 1000; 2e3 is scientific notation for 2000.0 (a float); 0xFF is hex for 255." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-literals-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-arithmetic-operators",
      stageId: "stage-03",
      title: "Arithmetic Operators",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use +, -, *, /, //, %, and ** operators correctly",
        "Predict the type (int or float) of arithmetic results",
        "Apply modulo to solve real problems",
      ],
      prerequisites: [],
      concepts: ["arithmetic"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Python's Arithmetic Operators\n\n| Operator | Name | Example | Result |\n|----------|------|---------|--------|\n| `+` | Addition | `5 + 3` | `8` |\n| `-` | Subtraction | `5 - 3` | `2` |\n| `*` | Multiplication | `5 * 3` | `15` |\n| `/` | True division | `5 / 2` | `2.5` (always float) |\n| `//` | Floor division | `5 // 2` | `2` (truncates) |\n| `%` | Modulo (remainder) | `5 % 2` | `1` |\n| `**` | Exponentiation | `2 ** 10` | `1024` |\n\n**Type rules:**\n- `int op int` → int (except `/` which always gives float)\n- `float op anything` → float\n- `/` always returns float\n- `//` returns int if both operands are int\n\n```python\nprint(7 / 2)    # 3.5   (float)\nprint(7 // 2)   # 3     (int, floor)\nprint(7 % 2)    # 1     (remainder)\nprint(2 ** 8)   # 256   (power)\n\n# Modulo practical use: even/odd check\nprint(10 % 2)   # 0 → even\nprint(11 % 2)   # 1 → odd\n```",
        },
        {
          kind: "why-matters",
          body: "The // and % operators are used everywhere: paging (which page?), time conversion (hours and minutes), circular buffers (index wrapping), and checking divisibility. Mastering them early unlocks a wide range of problems.",
        },
      ],
      interactions: [
        {
          id: "s3-arith-predict",
          kind: "predict-output",
          prompt: "What does Python print for each line?",
          beginnerPurpose: "Practice arithmetic operator results and types.",
          expectedConceptIds: ["arithmetic"],
          code: "print(10 / 4)\nprint(10 // 4)\nprint(10 % 4)\nprint(2 ** 3)",
          expectedOutput: "2.5\n2\n2\n8",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "/ always gives float; // truncates; % gives remainder; ** is power." }],
          feedback: { correct: "Correct! 10/4=2.5, 10//4=2, 10%4=2, 2**3=8.", incorrect: "/ gives float (2.5), // truncates (2), % gives remainder (2), ** is exponentiation (8)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-arith-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-operator-precedence",
      stageId: "stage-03",
      title: "Operator Precedence and Grouping",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "List Python's arithmetic operator precedence from highest to lowest",
        "Use parentheses to override default precedence",
        "Predict the result of multi-operator expressions",
      ],
      prerequisites: [],
      concepts: ["arithmetic"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Operator Precedence\n\nWhen multiple operators appear in one expression, Python uses **precedence rules** to determine order — just like PEMDAS/BODMAS in mathematics.\n\n**Python precedence (high to low):**\n1. `()` — parentheses (highest)\n2. `**` — exponentiation (right-to-left)\n3. `+x`, `-x` — unary plus/minus\n4. `*`, `/`, `//`, `%` — multiplication and division\n5. `+`, `-` — addition and subtraction (lowest)\n\n```python\nprint(2 + 3 * 4)     # 14  (multiply first: 2 + 12)\nprint((2 + 3) * 4)   # 20  (parentheses first: 5 * 4)\nprint(2 ** 3 ** 2)   # 512 (right-to-left: 2 ** (3**2) = 2**9)\nprint(10 - 2 + 3)    # 11  (left-to-right for same level)\n```\n\n**Best practice**: Use parentheses liberally to make complex expressions clear, even when they don't change the result:\n```python\n# Unclear:\nresult = a + b * c / d - e % f\n\n# Clear:\nresult = a + ((b * c) / d) - (e % f)\n```",
        },
        {
          kind: "mental-model",
          title: "Precedence is like PEMDAS",
          analogy: "The mathematical order of operations (PEMDAS/BODMAS) you learned in school applies directly. Multiplication before addition, parentheses override everything.",
          explanation: "Python's arithmetic precedence mirrors standard mathematics. When in doubt, add parentheses — they make the intent clear to both Python and human readers.",
        },
      ],
      interactions: [
        {
          id: "s3-precedence-predict",
          kind: "predict-output",
          prompt: "What does this expression evaluate to?",
          beginnerPurpose: "Apply precedence rules to predict results.",
          expectedConceptIds: ["arithmetic"],
          code: "result = 5 + 2 * 3 - 1\nprint(result)",
          expectedOutput: "10",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Multiply first: 2*3=6. Then left to right: 5+6-1=10." }],
          feedback: { correct: "Correct! 2*3=6, then 5+6=11, then 11-1=10.", incorrect: "Apply precedence: * before +/-. So: 2*3=6 first, then 5+6-1=10." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-precedence-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-text-literals",
      stageId: "stage-03",
      title: "Text Literals: Single, Double, Triple Quotes",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write string literals with single quotes, double quotes, and triple quotes",
        "Explain when to prefer each quote style",
        "Write multi-line strings with triple quotes",
      ],
      prerequisites: [],
      concepts: ["string-literals"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## String Literals\n\nA **string** is a sequence of characters. Python has three ways to write string literals:\n\n```python\n# Single quotes\nname = 'Alice'\n\n# Double quotes (identical to single quotes)\ngreeting = \"Hello\"\n\n# Triple quotes — for multi-line strings or strings containing quotes\nmessage = \"\"\"This is a\nmulti-line string.\"\"\"\n\npoem = '''Roses are red,\nViolets are blue.'''\n```\n\n**When to choose which:**\n\n| Style | Best for |\n|-------|----------|\n| `'single'` | Short strings, no single quotes inside |\n| `\"double\"` | Strings containing single quotes: `\"it's fine\"` |\n| `'''triple'''` or `\"\"\"triple\"\"\"` | Multi-line strings, docstrings |\n\n```python\n# Avoid escaping by choosing the right quote:\nmy_str = \"it's a test\"    # no escape needed\nalt    = 'it\\'s a test'   # backslash escape required\n\n# Triple quotes are literal — newlines included:\nblock = \"\"\"line 1\nline 2\nline 3\"\"\"\nprint(block)  # prints three lines\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Be consistent within a project",
          body: "Python doesn't care whether you use single or double quotes, but be consistent within a file. Most Python style guides and formatters (like Black) default to double quotes. Pick one style and stick to it.",
        },
      ],
      interactions: [
        {
          id: "s3-quotes-mc",
          kind: "multiple-choice",
          prompt: "Which string literal avoids needing a backslash escape?",
          beginnerPurpose: "Choose the right quote style.",
          expectedConceptIds: ["string-literals"],
          options: [
            { id: "a", text: "'don\\'t'", isCorrect: false, explanation: "This works but requires a backslash escape. There's a cleaner option." },
            { id: "b", text: "\"don't\"", isCorrect: true, explanation: "Correct! Using double quotes when the string contains a single quote avoids the escape backslash." },
            { id: "c", text: "\"don\\\"t\"", isCorrect: false, explanation: "This requires escaping the double quote. A single-quote string would be cleaner: 'don\"t'." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "If the string contains single quotes, use double quotes as delimiters (and vice versa)." }],
          feedback: { correct: "Correct! Double quotes let you include a single quote without escaping.", incorrect: "When a string contains a single quote, wrap it in double quotes to avoid the backslash escape." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-quotes-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-escape-sequences",
      stageId: "stage-03",
      title: "Escape Sequences and Raw Strings",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use common escape sequences: \\n, \\t, \\\\, \\', \\\"",
        "Write raw strings with the r prefix to suppress escape processing",
        "Explain when raw strings are essential",
      ],
      prerequisites: [],
      concepts: ["string-literals"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Escape Sequences\n\nA **backslash** `\\` inside a string signals an escape sequence — a special character combination.\n\n| Sequence | Meaning |\n|----------|----------|\n| `\\n` | Newline (line break) |\n| `\\t` | Tab |\n| `\\\\` | Literal backslash |\n| `\\'` | Literal single quote |\n| `\\\"` | Literal double quote |\n| `\\r` | Carriage return |\n| `\\0` | Null character |\n\n```python\nprint('Hello\\nWorld')   # Hello\n                         # World\nprint('col1\\tcol2')     # col1    col2\nprint('path: C:\\\\Users') # path: C:\\Users\n```\n\n## Raw Strings\n\nPrefix a string with `r` to disable escape processing. Every character is literal:\n\n```python\n# Without r: escape processing\nprint('C:\\\\Users\\\\Alice')   # C:\\Users\\Alice\n\n# With r: no escape processing (raw string)\nprint(r'C:\\Users\\Alice')   # C:\\Users\\Alice\n```\n\nRaw strings are essential for **regular expressions** and **Windows file paths** where backslashes are common.",
        },
      ],
      interactions: [
        {
          id: "s3-escape-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace escape sequences in strings.",
          expectedConceptIds: ["string-literals"],
          code: "print('Line 1\\nLine 2')\nprint(r'No\\nEscape')",
          expectedOutput: "Line 1\nLine 2\nNo\\nEscape",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "\\n is a newline in regular strings. Raw strings (r'...') treat \\ literally." }],
          feedback: { correct: "Correct! \\n becomes a newline; raw strings disable escape processing.", incorrect: "In a regular string, \\n is a newline. In a raw string (r'...'), the backslash is literal — no escaping." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-escape-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-boolean-literals",
      stageId: "stage-03",
      title: "Boolean Literals: True and False",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write True and False boolean literals correctly",
        "Use boolean operators: and, or, not",
        "Explain that bool is a subclass of int in Python",
      ],
      prerequisites: [],
      concepts: ["boolean"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Boolean Values\n\nA **boolean** is a value that is either `True` or `False` (capitalised — these are Python keywords).\n\n```python\nis_logged_in = True\nhas_permission = False\n\nprint(type(True))   # <class 'bool'>\n```\n\n**Boolean operators:**\n\n| Operator | Meaning | Example |\n|----------|---------|----------|\n| `and` | Both must be True | `True and False` → `False` |\n| `or` | At least one True | `True or False` → `True` |\n| `not` | Negation | `not True` → `False` |\n\n```python\nprint(True and True)    # True\nprint(True and False)   # False\nprint(True or False)    # True\nprint(not True)         # False\n```\n\n**Bool as int:**\nIn Python, `bool` is a subclass of `int`. `True == 1` and `False == 0`.\n```python\nprint(True + True)   # 2\nprint(False * 5)     # 0\nprint(int(True))     # 1\n```\nThis is occasionally useful (e.g., counting True values in a list) but can also surprise you.",
        },
      ],
      interactions: [
        {
          id: "s3-bool-predict",
          kind: "predict-output",
          prompt: "What does Python print?",
          beginnerPurpose: "Trace boolean expressions.",
          expectedConceptIds: ["boolean"],
          code: "print(True and False)\nprint(True or False)\nprint(not False)\nprint(True + True)",
          expectedOutput: "False\nTrue\nTrue\n2",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "and: both must be True. or: at least one. not: flip it. True is 1 in arithmetic." }],
          feedback: { correct: "Correct! Boolean logic and True+True=2 (bool is int).", incorrect: "and requires both True, or requires one, not flips, True+True=2 (bool subclasses int)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-bool-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-none",
      stageId: "stage-03",
      title: "None: The Absence of a Value",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain what None represents in Python",
        "Check for None using 'is None' (not ==)",
        "Know which common functions return None",
      ],
      prerequisites: [],
      concepts: ["none-type"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## None in Python\n\n`None` is Python's way of representing **the absence of a value**. It's a singleton — there is exactly one `None` object in any Python program.\n\n```python\nresult = None       # no value yet\nprint(result)       # prints: None\nprint(type(None))   # <class 'NoneType'>\n```\n\n**Common sources of None:**\n- Functions that don't explicitly `return` something return `None`\n- `list.sort()`, `list.append()` — modify in place, return None\n- Dictionary `.get(key)` when key is absent (default return)\n\n```python\ndef greet(name):\n    print(f'Hello, {name}')  # no return statement\n\nresult = greet('Alice')  # prints Hello, Alice\nprint(result)            # None — function returned nothing\n\n# list.sort() returns None, not the sorted list!\nnums = [3, 1, 2]\nsorted_nums = nums.sort()  # common bug: this is None!\nprint(sorted_nums)         # None\n```\n\n**Checking for None:**\n```python\n# Correct: use 'is None' or 'is not None'\nif result is None:\n    print('No value')\n\n# Avoid == None (works, but 'is None' is idiomatic Python)\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "list.sort() and .append() return None",
          body: "A very common bug: `sorted_list = my_list.sort()`. The sort() method modifies the list in place and returns None. Use `sorted_list = sorted(my_list)` to get a new sorted list, or call `my_list.sort()` without capturing the return value.",
        },
      ],
      interactions: [
        {
          id: "s3-none-mc",
          kind: "multiple-choice",
          prompt: "What does this code print on the second line?",
          beginnerPurpose: "Understand that in-place methods return None.",
          expectedConceptIds: ["none-type"],
          code: "nums = [3, 1, 2]\nresult = nums.sort()\nprint(result)",
          options: [
            { id: "a", text: "[1, 2, 3]", isCorrect: false, explanation: "sort() modifies nums in place but returns None, not the sorted list." },
            { id: "b", text: "None", isCorrect: true, explanation: "Correct! sort() sorts the list in place and returns None. To get a sorted copy, use sorted(nums)." },
            { id: "c", text: "[3, 1, 2]", isCorrect: false, explanation: "sort() sorts in place (nums is now [1,2,3]) but returns None." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "In-place methods like sort() modify the object and return None." }],
          feedback: { correct: "Correct! sort() is in-place — it returns None.", incorrect: "sort() modifies the list in place and returns None. Use sorted(nums) to get a new sorted list." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-none-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-names-and-assignment",
      stageId: "stage-03",
      title: "Names and Assignment",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Assign values to names using =",
        "Explain that = is assignment, not equality",
        "Use augmented assignment operators: +=, -=, *=",
      ],
      prerequisites: [],
      concepts: ["variables-names"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Names and the Assignment Operator\n\nIn Python, `=` is the **assignment operator** — it binds a name to a value.\n\n```python\nname = 'Alice'   # bind the name 'name' to the string 'Alice'\nage = 30         # bind 'age' to the integer 30\npi = 3.14159     # bind 'pi' to a float\n```\n\n**Important**: `=` is NOT equality. For equality comparison, use `==`.\n\n```python\nx = 5       # assignment: store 5 in x\nx == 5      # comparison: is x equal to 5? Returns True\n```\n\n**Augmented assignment** — shorthand for updating a variable:\n```python\ncount = 0\ncount += 1   # same as: count = count + 1\ncount += 1   # now count = 2\ncount -= 1   # now count = 1\ncount *= 3   # now count = 3\ncount //= 2  # now count = 1\n```\n\n**Multiple assignment:**\n```python\na = b = c = 0      # all three are 0\nx, y = 10, 20      # tuple unpacking: x=10, y=20\n```",
        },
      ],
      interactions: [
        {
          id: "s3-assign-predict",
          kind: "predict-output",
          prompt: "What is printed?",
          beginnerPurpose: "Trace augmented assignment operators.",
          expectedConceptIds: ["variables-names"],
          code: "x = 10\nx += 5\nx *= 2\nprint(x)",
          expectedOutput: "30",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "x=10, then x=15, then x=30." }],
          feedback: { correct: "Correct! 10 → 15 → 30.", incorrect: "x=10, x+=5 makes x=15, x*=2 makes x=30." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-assign-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-reassignment-state",
      stageId: "stage-03",
      title: "Reassignment and State Change",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain that variables in Python are rebindable — they can point to different values",
        "Trace state changes across multiple assignments",
        "Understand that old values are discarded when a variable is reassigned",
      ],
      prerequisites: [],
      concepts: ["variables-names"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Reassignment in Python\n\nA variable in Python can be reassigned to point to any value at any time — even a value of a different type:\n\n```python\nx = 10          # x is an int\nprint(x)        # 10\n\nx = 'hello'     # x is now a str — the int 10 is gone\nprint(x)        # hello\n\nx = [1, 2, 3]  # x is now a list\nprint(x)        # [1, 2, 3]\n```\n\n**Variables are just labels**: In Python, a variable is a name that refers to an object. When you reassign, you move the label to a different object.\n\n**State tracing exercise:**\n```python\na = 5\nb = a        # b gets the value 5; a and b both refer to 5\na = 10       # a now refers to 10; b still refers to 5\nprint(a)     # 10\nprint(b)     # 5 — unchanged!\n```\n\nThis surprises many beginners who expect `b` to track `a`. In Python, `b = a` copies the current value — it doesn't create a link.",
        },
        {
          kind: "mental-model",
          title: "Variables as sticky labels",
          analogy: "A variable is a sticky label on an object. When you write b = a, you put a new label 'b' on the same object as 'a'. When you reassign a = 10, you move the 'a' label to a different object. The 'b' label stays where it is.",
          explanation: "For immutable values (int, str, float), this distinction rarely matters. For mutable objects (lists, dicts), it matters a great deal — you'll encounter this in the Collections stage.",
        },
      ],
      interactions: [
        {
          id: "s3-reassign-predict",
          kind: "predict-output",
          prompt: "What does Python print?",
          beginnerPurpose: "Trace variable state after reassignment.",
          expectedConceptIds: ["variables-names"],
          code: "x = 5\ny = x\nx = 100\nprint(x)\nprint(y)",
          expectedOutput: "100\n5",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "y = x copies the value 5. Reassigning x later doesn't affect y." }],
          feedback: { correct: "Correct! y captured the value 5; reassigning x doesn't change y.", incorrect: "y = x copies the value. Reassigning x later doesn't affect y — y still holds 5." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-reassign-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-naming-rules-conventions",
      stageId: "stage-03",
      title: "Naming Rules and Conventions",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "State the rules for valid Python identifier names",
        "Apply snake_case for variables and functions (PEP 8)",
        "Recognise reserved keywords that cannot be used as names",
      ],
      prerequisites: [],
      concepts: ["variables-names"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Python Naming Rules\n\n**Valid identifiers** must:\n- Start with a letter (a-z, A-Z) or underscore `_`\n- Contain only letters, digits (0-9), and underscores\n- Not be a Python keyword (`if`, `for`, `class`, `return`, etc.)\n\n```python\n# Valid names:\nuser_name = 'Alice'\n_private = True\nvalue1 = 42\nMyClass = object()\n\n# Invalid names (SyntaxError):\n# 1name = 'bad'    # starts with digit\n# my-name = 'bad'  # hyphen not allowed\n# for = 5          # reserved keyword\n```\n\n**PEP 8 naming conventions:**\n\n| Type | Convention | Example |\n|------|-----------|----------|\n| Variables/functions | `snake_case` | `user_name`, `get_data()` |\n| Constants | `UPPER_SNAKE_CASE` | `MAX_RETRIES = 3` |\n| Classes | `PascalCase` | `UserAccount` |\n| Private (internal) | `_leading_underscore` | `_cache` |\n\n**Check reserved keywords:**\n```python\nimport keyword\nprint(keyword.kwlist)  # all reserved keywords\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Descriptive names over short names",
          body: "Prefer `user_count` over `n`, `calculate_total` over `calc`, `maximum_temperature` over `maxT`. Well-named variables make code self-documenting. Single-letter names are acceptable only for loop counters (i, j, k) and conventional math notation (x, y).",
        },
      ],
      interactions: [
        {
          id: "s3-naming-mc",
          kind: "multiple-choice",
          prompt: "Which variable name is valid Python AND follows PEP 8 conventions?",
          beginnerPurpose: "Apply naming rules and conventions.",
          expectedConceptIds: ["variables-names"],
          options: [
            { id: "a", text: "1stUser", isCorrect: false, explanation: "Starts with a digit — SyntaxError. Names must start with a letter or underscore." },
            { id: "b", text: "user-count", isCorrect: false, explanation: "Hyphens are not allowed in Python identifiers — SyntaxError." },
            { id: "c", text: "user_count", isCorrect: true, explanation: "Correct! snake_case, starts with a letter, only letters/underscores — valid and PEP 8 compliant." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "PEP 8 recommends snake_case for variables. Check for invalid characters." }],
          feedback: { correct: "Correct! user_count is valid Python and follows PEP 8 snake_case convention.", incorrect: "Names must start with a letter or underscore and contain only letters, digits, and underscores. snake_case is PEP 8 standard." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-naming-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-type-observation",
      stageId: "stage-03",
      title: "type() and Runtime Type Observation",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use type() to inspect the type of any value",
        "Understand that Python is dynamically typed",
        "Use isinstance() to check type membership",
      ],
      prerequisites: [],
      concepts: ["python-syntax"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Inspecting Types at Runtime\n\nPython is **dynamically typed** — variables don't have fixed types. A variable can hold an int, then a string, then a list.\n\n**type()** reveals the type of any value:\n```python\nprint(type(42))         # <class 'int'>\nprint(type(3.14))       # <class 'float'>\nprint(type('hello'))    # <class 'str'>\nprint(type(True))       # <class 'bool'>\nprint(type(None))       # <class 'NoneType'>\nprint(type([1, 2, 3]))  # <class 'list'>\n```\n\n**isinstance()** checks if a value is of a given type (or its subclasses):\n```python\nprint(isinstance(42, int))       # True\nprint(isinstance(True, int))     # True (bool is a subclass of int!)\nprint(isinstance(3.14, float))   # True\nprint(isinstance('hi', str))     # True\n\n# Prefer isinstance() over type() == for type checking:\nif isinstance(x, (int, float)):  # works for subclasses too\n    print('numeric')\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Dynamic typing: strength and responsibility",
          body: "Dynamic typing is convenient — you never declare variable types. But it also means type errors appear at runtime, not compile time. Python 3.5+ has optional type annotations (covered in the Type Annotations stage) to catch type errors earlier.",
        },
      ],
      interactions: [
        {
          id: "s3-type-predict",
          kind: "predict-output",
          prompt: "What does Python print?",
          beginnerPurpose: "Use type() to observe types.",
          expectedConceptIds: ["python-syntax"],
          code: "x = 5\nprint(type(x))\nx = 'hello'\nprint(type(x))",
          expectedOutput: "<class 'int'>\n<class 'str'>",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "x starts as int, then gets reassigned to str. type() reflects the current value." }],
          feedback: { correct: "Correct! type() shows the current type of the value x holds.", incorrect: "x starts as int (type shows 'int'), then is reassigned to str (type shows 'str')." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-type-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-expression-prediction-drills",
      stageId: "stage-03",
      title: "First Expression Prediction Drills",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Predict the value and type of arithmetic expressions",
        "Apply operator precedence mentally",
        "Trace multi-step expressions before running them",
      ],
      prerequisites: [],
      concepts: ["arithmetic", "numeric-literals"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Expression Prediction Practice\n\nThe best way to solidify your understanding of expressions is to predict their values before running them. Work through each expression step by step.\n\n**Practice method:**\n1. Read the expression\n2. Apply precedence (** first, then * / // %, then + -)\n3. Compute the result\n4. Identify the type (int or float)\n5. Run in REPL to verify\n\n**Sample expressions to trace:**\n```python\n3 + 4 * 2          # → 11 (int)\n(3 + 4) * 2        # → 14 (int)\n10 / 5             # → 2.0 (float — / always float)\n10 // 3            # → 3 (int — floor division)\n2 ** 4 - 1         # → 15 (int: 16 - 1)\n7 % 3 + 1          # → 2 (1 + 1)\n10 * 0.5           # → 5.0 (float — mixed)\ntrue_val = True\nprint(true_val + 5) # → 6 (True == 1)\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use the REPL to verify predictions",
          body: "For every expression you're unsure about, try it in the Python REPL. Being wrong is fine — the REPL tells you immediately. The goal is to train your mental model so predictions get faster and more accurate over time.",
        },
      ],
      interactions: [
        {
          id: "s3-drill-predict",
          kind: "predict-output",
          prompt: "Predict all four outputs before running.",
          beginnerPurpose: "Chain expression prediction skills together.",
          expectedConceptIds: ["arithmetic"],
          code: "print(2 ** 3 + 1)\nprint(15 // 4)\nprint(15 % 4)\nprint(3 * 4 / 6)",
          expectedOutput: "9\n3\n3\n2.0",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "2**3=8+1=9; 15//4=3; 15%4=3; 3*4=12/6=2.0 (float)." }],
          feedback: { correct: "Excellent! All four predictions correct.", incorrect: "2**3=8, 8+1=9; 15//4=3 (floor); 15%4=3 (15=3*4+3); 3*4/6=12/6=2.0 (/ gives float)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-drill-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-output-prediction-drills",
      stageId: "stage-03",
      title: "First Output Prediction Drills",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Predict the complete output of short programs",
        "Trace variable state changes to predict final print output",
        "Spot common output surprises (None, float results)",
      ],
      prerequisites: [],
      concepts: ["variables-names", "arithmetic"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Output Prediction Practice\n\nPredicting a program's complete output requires tracing state changes step by step. Work through each program line by line, updating your mental 'whiteboard' as you go.\n\n**Trace this program:**\n```python\nx = 3\ny = 7\nz = x + y          # z = 10\nx = z * 2          # x = 20 (x changed!)\nprint(x)           # 20\nprint(y)           # 7 (unchanged)\nprint(z - y)       # 3 (10 - 7)\n```\n\n**Output:**\n```\n20\n7\n3\n```\n\n**Common surprises to watch for:**\n```python\nresult = [3, 1, 2].sort()  # .sort() returns None!\nprint(result)              # None (not [1, 2, 3])\n\nprint(10 / 3)              # 3.3333... (not 3)\nprint(type(10 / 3))        # <class 'float'>\n```",
        },
      ],
      interactions: [
        {
          id: "s3-output-drill",
          kind: "predict-output",
          prompt: "Trace the program and predict all output.",
          beginnerPurpose: "Practice multi-step output tracing.",
          expectedConceptIds: ["variables-names"],
          code: "a = 4\nb = 3\nc = a * b\na = c - b\nprint(a)\nprint(b)\nprint(c)",
          expectedOutput: "9\n3\n12",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "c = 4*3 = 12. a = c - b = 12 - 3 = 9. b unchanged = 3." }],
          feedback: { correct: "Correct! a=9, b=3, c=12.", incorrect: "c=4*3=12; a=c-b=12-3=9; b stays 3. Print order: a(9), b(3), c(12)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-output-drill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s3-correction-drills",
      stageId: "stage-03",
      title: "First Correction Drills: Fix Broken Syntax",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Identify and fix common syntax errors in short programs",
        "Recognise SyntaxError patterns: missing quotes, wrong operators",
        "Apply the one-change-at-a-time debugging habit",
      ],
      prerequisites: [],
      concepts: ["python-syntax"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Fixing Broken Syntax\n\nRecognising and fixing syntax errors is a core programming skill. Common beginner syntax errors in Python:\n\n1. **Missing or mismatched quotes:**\n```python\n# BROKEN:\nname = 'Alice\nprint(name)\n\n# FIXED:\nname = 'Alice'\nprint(name)\n```\n\n2. **Wrong operator for equality:**\n```python\n# BROKEN — assignment when comparison intended:\nif x = 5:\n    print('five')\n\n# FIXED:\nif x == 5:\n    print('five')\n```\n\n3. **Missing parentheses:**\n```python\n# BROKEN:\nprint 'Hello'\n\n# FIXED:\nprint('Hello')\n```\n\n4. **Using a keyword as a variable:**\n```python\n# BROKEN:\nfor = 5\n\n# FIXED (rename the variable):\nfor_loop_count = 5\n```\n\n**Approach for any error:**\n1. Read the error message — find the line number\n2. Look at that exact line\n3. Find ONE thing wrong\n4. Fix it, then re-run",
        },
      ],
      interactions: [
        {
          id: "s3-debug-fill",
          kind: "fill-code",
          prompt: "Fix the broken code: change the equality check operator so it compares x to 10.",
          beginnerPurpose: "Distinguish assignment = from comparison ==.",
          expectedConceptIds: ["python-syntax"],
          codeTemplate: "x = 10\nif x ___ 10:\n    print('ten')",
          blanks: [{ placeholder: "___", answer: "==", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Single = is assignment. Use == to compare two values for equality." }],
          feedback: { correct: "Correct! == is the equality comparison operator.", incorrect: "Use == to check if two values are equal. Single = is assignment." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s3-debug-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s3-project",
    stageId: "stage-03",
    title: "Expression Explorer",
    brief:
      "Write a Python script that demonstrates all the core value types and operators covered in this stage. Include at least one example of each: int, float, string, bool, None, arithmetic operators, escape sequences, and type inspection.",
    requirements: [
      "At least one example of each type: int, float, str, bool, None",
      "Demonstrate all 7 arithmetic operators (+, -, *, /, //, %, **)",
      "Show at least two escape sequences",
      "Use type() or isinstance() to inspect at least 3 values",
      "Print clear output showing what each example demonstrates",
    ],
    acceptanceCriteria: [
      "Script runs without errors",
      "All seven arithmetic operators are present and produce correct results",
      "type() is used and output is included in printed results",
    ],
    conceptIds: ["python-syntax", "numeric-literals", "arithmetic", "variables-names"],
    difficulty: "beginner",
  },
} satisfies Stage;
