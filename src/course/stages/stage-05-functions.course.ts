import type { Stage } from "@/course/course.schema";

export const stage05 = {
  id: "stage-05",
  number: 5,
  title: "Input, Conversion, Truth, and Comparison",
  summary:
    "Read user input with input(), convert between types, master truthy/falsy values, comparison operators, logical operators, and short-circuit evaluation.",
  level: "beginner",
  masteryGateConceptIds: ["input-function", "type-conversion", "truthy-falsy", "logical-operators"],

  lessons: [
    /* ── Lesson 5.1 — input() basics ────────────────────────────────────── */
    {
      id: "s5-input-basics",
      stageId: "stage-05",
      title: "input() Basics",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use input() to read text from the user",
        "Display a prompt by passing a string to input()",
        "Explain that input() always returns a str, never a number",
      ],
      prerequisites: [],
      concepts: ["input-function"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Why input() Exists\n\nPrograms that only work with data written directly in the source code are limited — every run produces the same result. To make a program useful for different people and situations, you need a way for the program to receive information while it is running. That is what `input()` provides.\n\n## How input() Works\n\n`input()` pauses the program, waits for the user to type something and press Enter, and then hands that text back to your program as a value. You can display a message (a prompt) so the user knows what to type:\n\n```python\nname = input(\"What is your name? \")   # prompt displayed, user types, Enter → stored\nprint(\"Hello, \" + name + \"!\")         # name holds whatever the user typed\n```\n\n## input() Always Returns a String\n\nNo matter what the user types — numbers, letters, symbols — `input()` returns it as a **str**. This is the single most important fact about `input()`:\n\n```python\nage = input(\"How old are you? \")   # user types: 25\nprint(type(age))                   # <class 'str'>\nprint(age + 1)                     # TypeError! Can't add str and int\n```\n\nTo do arithmetic with the result, you must convert it (covered next lesson).\n\n## Reading Multiple Inputs\n\n```python\nfirst = input(\"First name: \")\nlast = input(\"Last name: \")\nprint(f\"Hello, {first} {last}!\")\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "input() Returns str — Always",
          body: "The return type of input() is always str, even when the user types digits. You CANNOT add the result directly to a number. Always convert with int() or float() when you need numeric data.",
        },
        {
          kind: "mental-model",
          title: "input() as a Pause Button",
          analogy: "input() is like pressing pause on a machine, putting a label on the slot saying 'insert your answer here', waiting for the operator to slide a note in, then storing whatever was written on the note.",
          explanation: "The program truly stops and waits — nothing else runs. When the user presses Enter, the text they typed is sealed in a string and the program continues.",
        },
        {
          kind: "why-matters",
          body: "Without input(), every Python program would be static — you'd have to change the source code for each different run. input() is the gateway to interactive programs: calculators, games, form processors, and command-line tools all start with input().",
        },
      ],
      interactions: [
        {
          id: "s5-input-basics-mc",
          kind: "multiple-choice",
          prompt: "The user types `42` when prompted. What does `type(input('Enter: '))` return?",
          beginnerPurpose: "Confirm that input() always returns str",
          expectedConceptIds: ["input-function"],
          options: [
            { id: "a", text: "<class 'int'>", isCorrect: false, explanation: "input() always returns str, even when the user types digits." },
            { id: "b", text: "<class 'str'>", isCorrect: true, explanation: "Correct! input() always returns str regardless of what the user typed." },
            { id: "c", text: "42 (the integer)", isCorrect: false, explanation: "input() returns a string '42', not the integer 42." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "input() returns text — always str, never int or float." }],
          feedback: { correct: "Correct! input() always returns str. To get a number, convert it.", incorrect: "input() returns str always. '42' (string) is not the same as 42 (integer)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-input-basics-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.2 — Converting strings to integers ─────────────────────── */
    {
      id: "s5-str-to-int",
      stageId: "stage-05",
      title: "Converting Strings to Integers",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Convert a string to an integer using int()",
        "Explain what causes ValueError and how to recognize it",
        "Use int() with a base argument for non-decimal numbers",
      ],
      prerequisites: [],
      concepts: ["type-conversion"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem: User Input Is Always Text\n\nWhen a user types `25`, your program receives the string `'25'`, not the number 25. You cannot do arithmetic with `'25'`:\n\n```python\nage_str = '25'\nprint(age_str + 1)   # TypeError — string + integer is invalid\n```\n\nYou need a way to convert the text representation of a number into an actual number.\n\n## int() — Text to Whole Number\n\n`int()` reads a string and converts it to an integer:\n\n```python\nage_str = '25'\nage = int(age_str)   # age is now the integer 25\nprint(age + 1)       # 26\nprint(type(age))     # <class 'int'>\n```\n\nWith input():\n\n```python\nage = int(input(\"How old are you? \"))   # convert immediately\nprint(f\"Next year you'll be {age + 1}\")\n```\n\n## What Causes ValueError\n\n`int()` raises `ValueError` if the string contains anything that cannot be a whole number:\n\n```python\nint('3.14')    # ValueError — decimal point not allowed\nint('25kg')   # ValueError — 'kg' is not a digit\nint('')       # ValueError — empty string\nint('  25  ') # Works! int() strips surrounding whitespace\n```\n\n## int() with a Base\n\n```python\nint('ff', 16)    # 255  — parse hexadecimal\nint('1010', 2)   # 10   — parse binary\nint('77', 8)     # 63   — parse octal\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "int() Rejects Floats Written as Strings",
          body: "int('3.14') raises ValueError, even though 3.14 looks like a number. If the user might type a decimal number, use float() first, then int(): int(float('3.14')) gives 3.",
        },
        {
          kind: "why-matters",
          body: "int() is the bridge between text input and numeric computation. Every program that reads numbers from a user — a calculator, a quiz score tracker, an age checker — requires int() or float() to make the input usable.",
        },
      ],
      interactions: [
        {
          id: "s5-str-to-int-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace int() conversion and arithmetic",
          expectedConceptIds: ["type-conversion"],
          code: "s = '10'\nn = int(s)\nprint(n + 5)\nprint(type(n))",
          expectedOutput: "15\n<class 'int'>",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "int('10') gives the integer 10. 10 + 5 = 15. type() of an int is <class 'int'>." }],
          feedback: { correct: "Correct! int('10') gives 10, 10+5=15, type is int.", incorrect: "int(s) converts '10' to the integer 10. Then 10 + 5 = 15." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-str-to-int-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.3 — Converting strings to floats ───────────────────────── */
    {
      id: "s5-str-to-float",
      stageId: "stage-05",
      title: "Converting Strings to Floats",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Convert a string to a float using float()",
        "Explain floating-point representation and why 0.1 + 0.2 != 0.3",
        "Use round() to control decimal precision",
      ],
      prerequisites: [],
      concepts: ["type-conversion"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## float() — Text to Decimal Number\n\nWhen numbers have a decimal part — like prices, measurements, or averages — use `float()`:\n\n```python\nprice_str = '9.99'\nprice = float(price_str)\nprint(price * 2)     # 19.98\nprint(type(price))  # <class 'float'>\n```\n\nWith input():\n\n```python\nweight = float(input(\"Enter weight in kg: \"))\nbmi = weight / (1.75 ** 2)   # using float arithmetic\nprint(f\"BMI: {bmi:.1f}\")\n```\n\n## float() Accepts What int() Rejects\n\n```python\nfloat('3.14')   # 3.14  — decimal point OK\nfloat('25')     # 25.0  — integer strings work too\nfloat('  7.5 ') # 7.5   — strips whitespace\nfloat('inf')    # inf   — infinity!\nfloat('nan')    # nan   — not-a-number\n```\n\n## Floating-Point Precision\n\nFloating-point numbers are stored in binary and sometimes cannot represent decimal fractions exactly:\n\n```python\nprint(0.1 + 0.2)          # 0.30000000000000004\nprint(0.1 + 0.2 == 0.3)   # False!\nprint(round(0.1 + 0.2, 1) == 0.3)  # True — use round() for comparisons\n```\n\nThis is not a Python bug — it's a property of how all computers store fractions in binary. Use `round()` when exact decimal comparison matters.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Never Compare Floats with ==",
          body: "Due to binary precision limits, 0.1 + 0.2 is not exactly 0.3. Use round() or compare within a tolerance: abs(a - b) < 0.0001. For exact decimal arithmetic (money), use the decimal module.",
        },
      ],
      interactions: [
        {
          id: "s5-str-to-float-mc",
          kind: "multiple-choice",
          prompt: "What does `print(0.1 + 0.2 == 0.3)` print?",
          beginnerPurpose: "Understand floating-point imprecision",
          expectedConceptIds: ["type-conversion"],
          options: [
            { id: "a", text: "True", isCorrect: false, explanation: "Due to binary floating-point representation, 0.1 + 0.2 is not exactly 0.3 — it's 0.30000000000000004." },
            { id: "b", text: "False", isCorrect: true, explanation: "Correct! 0.1 + 0.2 = 0.30000000000000004 in binary floating-point, which is not equal to 0.3." },
            { id: "c", text: "ValueError", isCorrect: false, explanation: "This is valid Python — it just returns False due to floating-point representation." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Binary floating-point cannot represent 0.1 or 0.2 exactly — their sum has a tiny error." }],
          feedback: { correct: "Correct! Floating-point arithmetic has binary precision limits. Use round() for decimal comparisons.", incorrect: "0.1 + 0.2 in binary floating-point is 0.30000000000000004, not 0.3, so == returns False." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-str-to-float-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.4 — Converting values to strings ───────────────────────── */
    {
      id: "s5-to-str",
      stageId: "stage-05",
      title: "Converting Values to Strings",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Convert any value to a string with str()",
        "Distinguish str() from repr()",
        "Use str() to build output from mixed types",
      ],
      prerequisites: [],
      concepts: ["type-conversion"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## str() — Any Value to Text\n\n`str()` converts any Python value to its human-readable string representation:\n\n```python\nprint(str(42))        # '42'\nprint(str(3.14))      # '3.14'\nprint(str(True))      # 'True'\nprint(str(None))      # 'None'\nprint(str([1, 2, 3])) # '[1, 2, 3]'\n```\n\n## Why You Need str()\n\nString concatenation with `+` requires both operands to be strings. Use `str()` to convert before joining:\n\n```python\nscore = 95\nmessage = \"Your score is: \" + str(score)   # must convert\nprint(message)   # 'Your score is: 95'\n\n# Alternative (better): use f-strings\nprint(f\"Your score is: {score}\")   # no conversion needed\n```\n\n## str() vs repr()\n\n`str()` gives human-readable output. `repr()` gives the unambiguous developer representation:\n\n```python\ntext = \"hello\\nworld\"\nprint(str(text))    # hello\n                    # world\nprint(repr(text))   # 'hello\\\\nworld'  — shows escape sequences\n```\n\nUse `str()` for user-facing output. Use `repr()` for debugging — it makes the value's type and content unambiguous.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "f-strings Beat str() for Output",
          body: "Instead of '\"Score: \" + str(n)', write f'\"Score: {n}\"'. f-strings handle the conversion automatically and are more readable. Use str() explicitly only when you need the string value itself (e.g., for concatenation outside an f-string).",
        },
      ],
      interactions: [
        {
          id: "s5-to-str-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace str() conversion and concatenation",
          expectedConceptIds: ["type-conversion"],
          code: "x = 7\nresult = \"Value: \" + str(x) + \" squared is \" + str(x ** 2)\nprint(result)",
          expectedOutput: "Value: 7 squared is 49",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "str(7) gives '7'. str(49) gives '49'. Then concatenate with +." }],
          feedback: { correct: "Correct! str() converts each number to text for concatenation.", incorrect: "str(x) → '7', str(x**2) → '49', then concatenated with the surrounding strings." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-to-str-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.5 — Boolean conversion ────────────────────────────────── */
    {
      id: "s5-bool-conversion",
      stageId: "stage-05",
      title: "Boolean Conversion",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Convert any value to bool with bool()",
        "Predict whether common values are True or False",
        "Understand that bool is a subclass of int",
      ],
      prerequisites: [],
      concepts: ["truthy-falsy"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## bool() — Any Value to True/False\n\n`bool()` converts a value to `True` or `False`. The rules are simple: zero, empty, and `None` become `False`; everything else becomes `True`:\n\n```python\nprint(bool(0))        # False\nprint(bool(42))       # True\nprint(bool(0.0))      # False\nprint(bool(3.14))     # True\nprint(bool(''))       # False  — empty string\nprint(bool('hello'))  # True\nprint(bool(None))     # False\nprint(bool([]))       # False  — empty list\nprint(bool([1, 2]))   # True\n```\n\n## bool Is a Subclass of int\n\n`True` and `False` are actually integers:\n\n```python\nprint(True + True)    # 2\nprint(True + 1)       # 2\nprint(False + 10)     # 10\nprint(int(True))      # 1\nprint(int(False))     # 0\n```\n\nThis is why `bool` appears in Python's numeric tower: `False == 0` and `True == 1`.\n\n## Practical Uses\n\n```python\nnumbers = [0, 1, 0, 5, 0]\ncount_nonzero = sum(bool(n) for n in numbers)  # counts truthy values\nprint(count_nonzero)  # 2\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "True == 1 and False == 0",
          body: "Because bool is a subclass of int, True == 1 and False == 0 both evaluate to True. You can use sum(bool(x) for x in items) to count truthy items in a list.",
        },
      ],
      interactions: [
        {
          id: "s5-bool-conversion-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply bool() conversion rules",
          expectedConceptIds: ["truthy-falsy"],
          code: "print(bool(0))\nprint(bool('0'))\nprint(bool([]))\nprint(bool([0]))",
          expectedOutput: "False\nTrue\nFalse\nTrue",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "0 (int zero) is falsy. '0' (non-empty string) is truthy. [] (empty list) is falsy. [0] (list with one item) is truthy." }],
          feedback: { correct: "Correct! Zero/empty → False, non-empty → True, regardless of content.", incorrect: "0=False, '0'=True (non-empty string!), []=False, [0]=True (non-empty list even with zero inside!)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-bool-conversion-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.6 — Truthy and falsy values ────────────────────────────── */
    {
      id: "s5-truthy-falsy",
      stageId: "stage-05",
      title: "Truthy and Falsy Values",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "List the values Python considers falsy",
        "Use truthy/falsy checks in if statements without explicit bool()",
        "Explain why 'if items:' is preferred over 'if len(items) > 0:'",
      ],
      prerequisites: [],
      concepts: ["truthy-falsy"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Truthy and Falsy: Python's Implicit Boolean Test\n\nEvery Python value can be used directly as a condition. Python internally calls `bool()` on the condition of every `if` statement. Values that convert to `False` are called **falsy**; everything else is **truthy**.\n\n## The Complete Falsy List\n\n| Value | Why falsy |\n|-------|-----------|\n| `False` | It is False |\n| `None` | Represents absence |\n| `0` | Zero integer |\n| `0.0` | Zero float |\n| `0j` | Zero complex |\n| `''` | Empty string |\n| `[]` | Empty list |\n| `{}` | Empty dict |\n| `()` | Empty tuple |\n| `set()` | Empty set |\n\nAll other values are **truthy**.\n\n## Using Truthiness in Conditions\n\n```python\nname = input(\"Enter name: \")\n\n# Verbose (works, but not Pythonic):\nif len(name) > 0:\n    print(f\"Hello, {name}!\")\n\n# Idiomatic Python:\nif name:\n    print(f\"Hello, {name}!\")\n\n# Checking a number:\nscore = 0\nif not score:   # truthy check: 0 is falsy, so 'not score' is True\n    print(\"No score yet\")\n```\n\n## Common Pattern: Default Values\n\n```python\nuser_input = input(\"Name (or Enter for 'Guest'): \")\nname = user_input or \"Guest\"   # if user_input is falsy, use 'Guest'\nprint(f\"Hello, {name}!\")\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "if items: Over if len(items) > 0:",
          body: "In idiomatic Python, 'if my_list:' is preferred over 'if len(my_list) > 0:'. It's shorter, works for all sequence types, and is exactly what experienced Python developers expect to see.",
        },
        {
          kind: "why-matters",
          body: "Truthiness is used pervasively in Python — in if conditions, while loops, and with `or`/`and`. Understanding it lets you write concise, readable Python and correctly read code written by others.",
        },
      ],
      interactions: [
        {
          id: "s5-truthy-falsy-mc",
          kind: "multiple-choice",
          prompt: "Which of these if conditions is False (i.e., the body does NOT run)?",
          beginnerPurpose: "Apply the falsy list",
          expectedConceptIds: ["truthy-falsy"],
          options: [
            { id: "a", text: "if 'False':", isCorrect: false, explanation: "'False' is a non-empty string — it is truthy. The body would run." },
            { id: "b", text: "if [0, 0, 0]:", isCorrect: false, explanation: "[0, 0, 0] is a non-empty list — it is truthy. Only [] (empty list) is falsy." },
            { id: "c", text: "if 0.0:", isCorrect: true, explanation: "Correct! 0.0 is falsy — zero float. The body does not run." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Only zeros, empty containers, None, and False itself are falsy." }],
          feedback: { correct: "Correct! 0.0 is falsy. Non-empty strings and non-empty lists are always truthy.", incorrect: "Only zeros (0, 0.0), empty containers, None, and False are falsy. Non-empty strings/lists are truthy." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-truthy-falsy-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.7 — Equality and inequality ────────────────────────────── */
    {
      id: "s5-equality-inequality",
      stageId: "stage-05",
      title: "Equality and Inequality: == and !=",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use == to test whether two values are equal",
        "Use != to test whether two values are unequal",
        "Explain the difference between = (assignment) and == (comparison)",
      ],
      prerequisites: [],
      concepts: ["truthy-falsy"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## == and != : Comparing Values\n\n`==` tests whether two values are equal. It produces `True` or `False`. `!=` tests whether they are NOT equal:\n\n```python\nprint(5 == 5)       # True\nprint(5 == 6)       # False\nprint('hi' == 'hi') # True\nprint('hi' == 'HI') # False  — case-sensitive!\n\nprint(5 != 6)       # True\nprint(5 != 5)       # False\n```\n\n## = vs ==: The Most Important Distinction\n\n```python\nx = 10       # ASSIGNMENT — stores 10 in x\nif x == 10:  # COMPARISON — asks 'is x equal to 10?'\n    print(\"yes\")\n```\n\nUsing `=` where `==` is needed causes a `SyntaxError` in Python 3:\n\n```python\n# if x = 10:   # SyntaxError in Python 3 (Python 2 allowed this as a bug)\n```\n\n## Cross-Type Comparisons\n\n```python\nprint(1 == 1.0)     # True  — int and float, equal value\nprint(1 == '1')     # False — int and str are never equal\nprint(True == 1)    # True  — bool is int subclass\nprint(True == 1.0)  # True\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "= Is Assignment, == Is Comparison",
          body: "This is the #1 source of confusion for beginners. `x = 5` stores 5 in x. `x == 5` asks 'is x equal to 5?' and returns True or False. They do completely different things.",
        },
      ],
      interactions: [
        {
          id: "s5-equality-inequality-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Distinguish == comparisons from assignment",
          expectedConceptIds: ["truthy-falsy"],
          code: "a = 5\nb = '5'\nprint(a == 5)\nprint(a == b)\nprint(a != 10)",
          expectedOutput: "True\nFalse\nTrue",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "a is int 5. b is str '5'. Integer 5 equals integer 5. Integer 5 does NOT equal string '5'. 5 != 10 is True." }],
          feedback: { correct: "Correct! 5==5 is True; int 5 != str '5'; 5!=10 is True.", incorrect: "5 == 5 → True. 5 == '5' → False (different types). 5 != 10 → True." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-equality-inequality-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.8 — Ordering comparisons ──────────────────────────────── */
    {
      id: "s5-ordering-comparisons",
      stageId: "stage-05",
      title: "Ordering Comparisons: <, <=, >, >=",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use <, <=, >, >= to compare numbers and strings",
        "Explain how string comparison uses lexicographic (alphabetical) order",
        "Combine ordering comparisons with conditionals",
      ],
      prerequisites: [],
      concepts: ["truthy-falsy"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Ordering Operators\n\nOrdering operators compare two values and return True or False:\n\n| Operator | Meaning | Example | Result |\n|----------|---------|---------|--------|\n| `<` | less than | `3 < 5` | True |\n| `<=` | less than or equal | `5 <= 5` | True |\n| `>` | greater than | `7 > 10` | False |\n| `>=` | greater than or equal | `10 >= 10` | True |\n\n```python\nage = 20\nprint(age >= 18)   # True — old enough\nprint(age < 21)    # True — under 21\nprint(age > 65)    # False — not senior\n```\n\n## String Ordering (Lexicographic)\n\nStrings are compared character by character using Unicode code point order:\n\n```python\nprint('apple' < 'banana')   # True — 'a' < 'b'\nprint('Z' < 'a')            # True — uppercase letters come before lowercase in Unicode\nprint('10' < '9')           # True — '1' < '9' (string comparison!)\nprint(10 < 9)               # False — numeric comparison\n```\n\nThis is why you should always compare numbers as integers, not strings:\n\n```python\nage_str = input(\"Enter age: \")\nage = int(age_str)    # convert first!\nif age >= 18:\n    print(\"Adult\")\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "String vs Number Ordering",
          body: "'10' < '9' is True (string comparison: '1' comes before '9'). But 10 < 9 is False (numeric). Always convert to int/float before numeric comparisons.",
        },
      ],
      interactions: [
        {
          id: "s5-ordering-comparisons-mc",
          kind: "multiple-choice",
          prompt: "What does `'banana' < 'cherry'` evaluate to?",
          beginnerPurpose: "Apply lexicographic string ordering",
          expectedConceptIds: ["truthy-falsy"],
          options: [
            { id: "a", text: "True", isCorrect: true, explanation: "Correct! 'b' < 'c' in Unicode, so 'banana' < 'cherry' is True." },
            { id: "b", text: "False", isCorrect: false, explanation: "'banana' starts with 'b' and 'cherry' starts with 'c'. 'b' comes before 'c', so 'banana' < 'cherry' is True." },
            { id: "c", text: "TypeError", isCorrect: false, explanation: "Python can compare strings with <. It uses lexicographic (character-by-character) order." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Compare first characters: 'b' vs 'c'. Which comes first alphabetically?" }],
          feedback: { correct: "Correct! 'b' < 'c' in Unicode, so 'banana' < 'cherry' is True.", incorrect: "String comparison is lexicographic: compare character by character. 'b' < 'c', so True." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-ordering-comparisons-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.9 — Chained comparisons ───────────────────────────────── */
    {
      id: "s5-chained-comparisons",
      stageId: "stage-05",
      title: "Chained Comparisons",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write range checks using chained comparisons like 0 < x < 10",
        "Explain that chained comparisons are evaluated left to right",
        "Recognize when chaining is clearer than using and",
      ],
      prerequisites: [],
      concepts: ["truthy-falsy"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Chained Comparisons: Mathematical Range Notation\n\nIn mathematics you write `0 < x < 10` to mean 'x is between 0 and 10'. Python supports exactly this notation:\n\n```python\nx = 5\nprint(0 < x < 10)    # True  — Python checks 0<x AND x<10\nprint(0 < x < 5)     # False — x is not less than 5\nprint(1 <= x <= 10)  # True\n```\n\n## How Chaining Works\n\nPython evaluates each comparison pair in order and all must be True:\n\n```python\na, b, c = 1, 5, 10\nprint(a < b < c)    # True: 1<5 AND 5<10\nprint(a < b > c)    # False: 1<5 is True, but 5>10 is False\n```\n\nThe middle value (`b`) is evaluated only once, even if it's a function call — unlike repeating `a < b and b < c`.\n\n## Practical: Validating a Range\n\n```python\ngrade = int(input(\"Enter grade (0-100): \"))\nif 0 <= grade <= 100:\n    print(f\"Grade {grade} is valid\")\nelse:\n    print(\"Invalid grade\")\n```\n\n## Comparison with and\n\n```python\n# Equivalent but less Pythonic:\nif 0 <= grade and grade <= 100:\n    ...\n\n# Preferred Pythonic style:\nif 0 <= grade <= 100:\n    ...\n```",
        },
        {
          kind: "why-matters",
          body: "Chained comparisons make range checks read like mathematics. They prevent a common bug where the same variable appears twice and you accidentally test slightly different conditions on each side.",
        },
      ],
      interactions: [
        {
          id: "s5-chained-comparisons-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Evaluate chained comparisons",
          expectedConceptIds: ["truthy-falsy"],
          code: "x = 7\nprint(1 < x < 10)\nprint(7 < x < 20)\nprint(1 <= x <= 7)",
          expectedOutput: "True\nFalse\nTrue",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "1<7<10: True. 7<7<20: 7<7 is False. 1<=7<=7: True." }],
          feedback: { correct: "Correct! 1<7<10=True; 7<7 fails; 1<=7<=7=True.", incorrect: "1<7<10: both True → True. 7<7: False (not strictly less). 1<=7<=7: both True (<=includes equal)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-chained-comparisons-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.10 — Identity comparison: is, is not ───────────────────── */
    {
      id: "s5-identity-comparison",
      stageId: "stage-05",
      title: "Identity Comparison: is and is not",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use is to test whether two variables refer to the same object",
        "Explain the difference between identity and equality",
        "Know the correct uses of is: testing None, True, False",
      ],
      prerequisites: [],
      concepts: ["truthy-falsy"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## is — Same Object in Memory?\n\n`is` tests whether two variables point to the **exact same object** in memory, not just equal values:\n\n```python\na = [1, 2, 3]\nb = [1, 2, 3]\nc = a\n\nprint(a == b)    # True  — same values\nprint(a is b)    # False — different objects!\nprint(a is c)    # True  — c points to the same list\n```\n\n`is not` is the negative form:\n\n```python\nprint(a is not b)   # True\n```\n\n## Correct Use: Testing None\n\nThe correct way to test for `None` is with `is`:\n\n```python\nresult = None\n\n# Correct:\nif result is None:\n    print(\"No result yet\")\n\n# Technically works but not idiomatic:\nif result == None:\n    print(\"No result yet\")\n```\n\nPEP 8 (Python style guide) says: always use `is`/`is not` when comparing to `None`.\n\n## is With True/False\n\n```python\nflag = True\nif flag is True:      # valid but usually unnecessary\n    ...\nif flag:              # preferred — simpler\n    ...\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Do Not Use is for Value Comparisons",
          body: "Never write `if x is 5:` or `if name is 'Alice':`. Use `==` for value comparisons. `is` only checks object identity — and due to Python's small integer cache, `is` comparisons with integers may give surprising True results that are not guaranteed behavior.",
        },
      ],
      interactions: [
        {
          id: "s5-identity-comparison-mc",
          kind: "multiple-choice",
          prompt: "When should you use `is` instead of `==`?",
          beginnerPurpose: "Know the correct use cases for identity comparison",
          expectedConceptIds: ["truthy-falsy"],
          options: [
            { id: "a", text: "When comparing any two equal values", isCorrect: false, explanation: "Use == for value equality. is checks object identity — whether they are the same object in memory." },
            { id: "b", text: "When checking if a value is None, True, or False", isCorrect: true, explanation: "Correct! is is the idiomatic way to test for None (and is acceptable for True/False singletons)." },
            { id: "c", text: "When comparing strings for exact match", isCorrect: false, explanation: "Use == to compare string values. is would only return True if they're the same string object in memory." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "is tests identity (same object). The main correct use: `if x is None:`." }],
          feedback: { correct: "Correct! Use is for None, and == for value comparisons.", incorrect: "Use is only for identity checks, especially `if x is None:`. Use == for all value comparisons." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-identity-comparison-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.11 — Equality vs identity ─────────────────────────────── */
    {
      id: "s5-equality-vs-identity",
      stageId: "stage-05",
      title: "Equality vs Identity",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish == (value equality) from is (object identity)",
        "Explain Python's small integer and string interning caches",
        "Understand when is gives surprising results and why",
      ],
      prerequisites: [],
      concepts: ["truthy-falsy"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Value Equality vs Object Identity\n\nTwo separate concepts:\n- `==` asks: 'Do these two things have the same value?'\n- `is` asks: 'Are these two names pointing at the exact same object in memory?'\n\n```python\na = [1, 2, 3]\nb = [1, 2, 3]\n\na == b   # True  — same values\na is b   # False — different list objects\n\nc = a\na is c   # True  — c and a point to the same list\n```\n\n## CPython's Caching: Where is Gets Confusing\n\nCPython (the standard Python) caches small integers (-5 to 256) and short identifier-like strings, so `is` may return `True` unexpectedly:\n\n```python\nx = 100\ny = 100\nx is y   # True — CPython reuses the cached integer object\n\nx = 1000\ny = 1000\nx is y   # False — outside the cache; new objects created\n```\n\nThis behavior is an **implementation detail** — do NOT rely on it. It can change between Python versions or implementations.\n\n## The Rule\n\n- For comparing values: always use `==`\n- For testing against `None`, `True`, `False`: use `is`\n- Never use `is` to compare numbers or strings",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Don't Rely on Small Integer Caching",
          body: "x is 100 may return True in CPython due to caching, but this is not guaranteed. If you use is for value comparisons and happen to test in the cached range, your code works — but it will break with larger numbers. Always use ==.",
        },
      ],
      interactions: [
        {
          id: "s5-equality-vs-identity-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Distinguish is from == for mutable objects",
          expectedConceptIds: ["truthy-falsy"],
          code: "a = [1, 2]\nb = [1, 2]\nc = a\nprint(a == b)\nprint(a is b)\nprint(a is c)",
          expectedOutput: "True\nFalse\nTrue",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "a and b have equal values but are separate objects. c is assigned a (same object)." }],
          feedback: { correct: "Correct! == checks values; is checks object identity.", incorrect: "a==b: same values → True. a is b: different list objects → False. a is c: c points to same list as a → True." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-equality-vs-identity-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.12 — Membership testing ───────────────────────────────── */
    {
      id: "s5-membership-testing",
      stageId: "stage-05",
      title: "Membership Testing",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use in and not in to test membership in strings, lists, and other sequences",
        "Explain that in on a list checks values, not indexes",
        "Apply membership testing in conditions",
      ],
      prerequisites: [],
      concepts: ["truthy-falsy"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## in — Is This Value Present?\n\n`in` tests whether a value is a member of a collection. It works with strings, lists, tuples, sets, and dicts:\n\n```python\n# In a list\nfruits = ['apple', 'banana', 'cherry']\nprint('banana' in fruits)   # True\nprint('grape' in fruits)    # False\n\n# In a string (tests substrings)\ntext = 'Hello, World!'\nprint('World' in text)      # True\nprint('world' in text)      # False — case-sensitive\n\n# In a dict (tests keys)\nscores = {'Alice': 95, 'Bob': 87}\nprint('Alice' in scores)    # True\nprint(95 in scores)         # False — tests keys, not values\n```\n\n## not in\n\n```python\nif 'grape' not in fruits:\n    print(\"No grapes available\")\n```\n\n## Practical: Input Validation\n\n```python\nvalid_choices = ['yes', 'no', 'maybe']\nanswer = input(\"yes/no/maybe: \").lower()\nif answer not in valid_choices:\n    print(\"Invalid choice. Please enter yes, no, or maybe.\")\nelse:\n    print(f\"You chose: {answer}\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "in on Dicts Checks Keys",
          body: "'key' in my_dict checks whether 'key' is a key in the dictionary. To check values, use `'value' in my_dict.values()`. To check key-value pairs, use `('key', value) in my_dict.items()`.",
        },
      ],
      interactions: [
        {
          id: "s5-membership-testing-mc",
          kind: "multiple-choice",
          prompt: "Given `d = {'a': 1, 'b': 2}`, what does `1 in d` return?",
          beginnerPurpose: "Understand that in on dicts checks keys, not values",
          expectedConceptIds: ["truthy-falsy"],
          options: [
            { id: "a", text: "True — 1 is a value in d", isCorrect: false, explanation: "in on a dict checks KEYS, not values. The keys are 'a' and 'b', not 1." },
            { id: "b", text: "False — in on a dict checks keys, not values", isCorrect: true, explanation: "Correct! in on a dict checks keys. The keys are 'a' and 'b'; 1 is a value, not a key." },
            { id: "c", text: "TypeError", isCorrect: false, explanation: "Python allows checking any value with in on a dict — it just checks keys." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "in on a dict checks the keys. Keys in {'a': 1, 'b': 2} are 'a' and 'b'." }],
          feedback: { correct: "Correct! in checks keys in dicts. 1 is a value, not a key → False.", incorrect: "in on a dict tests keys only. The keys are 'a' and 'b'; 1 is not a key." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-membership-testing-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.13 — Logical operators: and, or, not ───────────────────── */
    {
      id: "s5-logical-operators",
      stageId: "stage-05",
      title: "Logical Operators: and, or, not",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Combine conditions with and, or, and not",
        "Apply De Morgan's laws to simplify negated conditions",
        "Build compound conditions for input validation",
      ],
      prerequisites: [],
      concepts: ["logical-operators"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## and — Both Must Be True\n\n`and` returns True only if **both** operands are True:\n\n```python\nage = 25\nhas_license = True\n\nif age >= 18 and has_license:\n    print(\"You may drive\")\n```\n\n| Left | Right | and |\n|------|-------|-----|\n| True | True | True |\n| True | False | False |\n| False | True | False |\n| False | False | False |\n\n## or — At Least One Must Be True\n\n`or` returns True if **either** operand is True:\n\n```python\nday = 'Saturday'\nif day == 'Saturday' or day == 'Sunday':\n    print(\"Weekend!\")\n```\n\n## not — Flip the Boolean\n\n`not` inverts True to False and False to True:\n\n```python\nis_raining = False\nif not is_raining:\n    print(\"Go outside!\")\n```\n\n## Combining Operators\n\n```python\nusername = 'alice'\npassword = 'secret'\n\nif username == 'alice' and password == 'secret':\n    print(\"Welcome, Alice!\")\n\n# De Morgan: not (A and B) == (not A) or (not B)\nif not (age < 18 or age > 65):\n    print(\"Working age\")   # same as: if 18 <= age <= 65\n```\n\n## Operator Precedence\n\n`not` has highest precedence, then `and`, then `or`:\n\n```python\nprint(True or False and False)    # True (and binds tighter)\nprint((True or False) and False)  # False (parentheses override)\n```",
        },
        {
          kind: "mental-model",
          title: "and/or as Filters",
          analogy: "Think of `and` as a security checkpoint where BOTH guards must approve. `or` is a door where either of two keys works. `not` is simply flipping a switch from open to closed or vice versa.",
          explanation: "This mental model helps you remember: and is strict (all must pass), or is flexible (any one suffices), not is a simple inversion.",
        },
      ],
      interactions: [
        {
          id: "s5-logical-operators-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace compound logical conditions",
          expectedConceptIds: ["logical-operators"],
          code: "x = 5\nprint(x > 0 and x < 10)\nprint(x < 0 or x > 3)\nprint(not x == 5)",
          expectedOutput: "True\nTrue\nFalse",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "5>0 and 5<10: both True → True. 5<0 is False but 5>3 is True → True. not (5==5) = not True = False." }],
          feedback: { correct: "Correct! and requires both; or requires one; not inverts.", incorrect: "5>0 and 5<10: True. 5<0 or 5>3: False or True=True. not 5==5: not True=False." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-logical-operators-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.14 — Short-circuit evaluation ─────────────────────────── */
    {
      id: "s5-short-circuit",
      stageId: "stage-05",
      title: "Short-Circuit Evaluation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain that and and or stop evaluating as soon as the result is determined",
        "Use short-circuit evaluation to avoid errors (e.g., division before zero check)",
        "Understand that and and or return values, not just True/False",
      ],
      prerequisites: [],
      concepts: ["logical-operators"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Short-Circuit: Stop Early When the Answer Is Known\n\n`and` stops evaluating as soon as it finds a False value. `or` stops as soon as it finds a True value:\n\n```python\ndef check():\n    print(\"check() called\")\n    return True\n\n# and: left side is False → right side never evaluated\nprint(False and check())   # False — 'check() called' is NOT printed\n\n# or: left side is True → right side never evaluated\nprint(True or check())     # True — 'check() called' is NOT printed\n```\n\n## Practical: Preventing Errors with Short-Circuit\n\n```python\ndenominator = 0\n\n# Without short-circuit guard: ZeroDivisionError!\n# if denominator != 0 and 10 / denominator > 1:\n\n# Safe — if denominator is 0, the right side is never evaluated:\nif denominator != 0 and 10 / denominator > 1:\n    print(\"Greater than 1\")\n```\n\n## and and or Return Values, Not Just Booleans\n\n`and` returns the first falsy value, or the last value if all are truthy. `or` returns the first truthy value, or the last if all are falsy:\n\n```python\nprint(0 and 5)       # 0   — first falsy\nprint(3 and 5)       # 5   — all truthy, returns last\nprint(0 or 5)        # 5   — first truthy\nprint(0 or False)    # False — all falsy, returns last\nprint('' or 'Guest') # 'Guest' — '' is falsy, 'Guest' is truthy\n```\n\nThis enables the common default-value idiom:\n\n```python\nname = user_input or 'Anonymous'   # if user_input is falsy, use 'Anonymous'\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "or for Default Values",
          body: "`result = value or default` is a common Python idiom. If `value` is falsy (empty string, 0, None), the expression evaluates to `default`. This is shorter than `result = value if value else default`.",
        },
        {
          kind: "why-matters",
          body: "Short-circuit evaluation is not just an optimization — it's essential for safety. Guards like `x is not None and x.method()` only work because Python stops at the first False. If it always evaluated both sides, the method call would crash on None.",
        },
      ],
      interactions: [
        {
          id: "s5-short-circuit-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace short-circuit return values",
          expectedConceptIds: ["logical-operators"],
          code: "print(0 or 'hello')\nprint(5 and 10)\nprint('' or [] or 'default')",
          expectedOutput: "hello\n10\ndefault",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "or returns first truthy. and returns first falsy or last. '' and [] are falsy, 'default' is truthy." }],
          feedback: { correct: "Correct! or → first truthy; and → first falsy or last value.", incorrect: "0 or 'hello': 0 is falsy → 'hello'. 5 and 10: both truthy → last (10). '' or [] or 'default': first truthy → 'default'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-short-circuit-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.15 — Defensive conversion ─────────────────────────────── */
    {
      id: "s5-defensive-conversion",
      stageId: "stage-05",
      title: "Defensive Conversion",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Anticipate and handle ValueError when converting user input",
        "Use try/except to give informative error messages",
        "Apply the pattern: prompt → convert → validate → use",
      ],
      prerequisites: [],
      concepts: ["type-conversion", "input-function"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem: Users Type Unexpected Things\n\nWhen you write `int(input(...))`, you assume the user types digits. But users might type 'hello', press Enter, type 'twelve', or type '3.5'. All of these cause `ValueError` and crash your program:\n\n```python\nage = int(input(\"Enter age: \"))   # crashes if user types 'abc'\n```\n\n## Defensive Conversion with try/except\n\nWrap the conversion in a `try/except` block to handle the error gracefully:\n\n```python\ntry:\n    age = int(input(\"Enter your age: \"))\nexcept ValueError:\n    print(\"That's not a valid whole number. Please try again.\")\n    age = None\n```\n\n## The Full Pattern: Prompt → Convert → Validate → Use\n\n```python\nwhile True:\n    raw = input(\"Enter a positive number: \")\n    try:\n        value = float(raw)\n    except ValueError:\n        print(f\"'{raw}' is not a number. Please try again.\")\n        continue   # back to top of loop\n    if value <= 0:\n        print(\"Please enter a positive number.\")\n        continue\n    break          # valid input — exit the loop\n\nprint(f\"You entered: {value}\")\n```\n\n## Stripping Before Converting\n\nAlways strip whitespace from user input before converting — users often accidentally add spaces:\n\n```python\nraw = input(\"Enter a number: \").strip()\ntry:\n    n = int(raw)\nexcept ValueError:\n    print(\"Not a valid integer\")\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "strip() Before int()/float()",
          body: "int() and float() automatically strip leading/trailing whitespace, so '  42  ' converts correctly. But strip() is good practice for making your intent explicit and for cases where you do string operations before converting.",
        },
        {
          kind: "why-matters",
          body: "Programs that crash on bad input are unusable in production. Defensive conversion is the first line of defense against user error. Every real-world CLI tool, web form, and interactive program needs this pattern.",
        },
      ],
      interactions: [
        {
          id: "s5-defensive-conversion-mc",
          kind: "multiple-choice",
          prompt: "What error does `int('3.14')` raise?",
          beginnerPurpose: "Know what error to catch when converting float strings to int",
          expectedConceptIds: ["type-conversion"],
          options: [
            { id: "a", text: "TypeError", isCorrect: false, explanation: "TypeError would occur if you passed the wrong type (like a list). int() with a string raises ValueError." },
            { id: "b", text: "ValueError", isCorrect: true, explanation: "Correct! int() raises ValueError when the string contains a decimal point — it cannot convert '3.14' to an integer directly." },
            { id: "c", text: "SyntaxError", isCorrect: false, explanation: "SyntaxError is a code-writing error. int('3.14') is valid Python — it raises ValueError at runtime." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "int() rejects strings with decimal points — they raise ValueError." }],
          feedback: { correct: "Correct! int() raises ValueError for strings it cannot parse as integers.", incorrect: "int('3.14') raises ValueError because '3.14' contains a decimal point." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-defensive-conversion-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.16 — Beginner validation loops ─────────────────────────── */
    {
      id: "s5-validation-loops",
      stageId: "stage-05",
      title: "Beginner Validation Loops",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Write a loop that keeps prompting until valid input is received",
        "Combine try/except with while True and break",
        "Handle multiple validation conditions (type AND range)",
      ],
      prerequisites: [],
      concepts: ["input-function", "type-conversion"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Validation Loop Pattern\n\nA validation loop re-prompts the user until they provide input that meets all requirements:\n\n```python\nwhile True:\n    raw = input(\"Enter your age (1-120): \").strip()\n    \n    # Step 1: Check it's an integer\n    try:\n        age = int(raw)\n    except ValueError:\n        print(\"Please enter a whole number.\")\n        continue\n    \n    # Step 2: Check the range\n    if not (1 <= age <= 120):\n        print(\"Age must be between 1 and 120.\")\n        continue\n    \n    # All checks passed\n    break\n\nprint(f\"Age accepted: {age}\")\n```\n\n## Validating Choices from a Menu\n\n```python\nvalid = {'1', '2', '3'}\nwhile True:\n    choice = input(\"Enter 1, 2, or 3: \").strip()\n    if choice in valid:\n        break\n    print(f\"Invalid choice '{choice}'. Enter 1, 2, or 3.\")\n\nprint(f\"You chose: {choice}\")\n```\n\n## Collecting Multiple Validated Inputs\n\n```python\ndef get_int(prompt, lo, hi):\n    \"\"\"Prompt until valid int in [lo, hi] is entered.\"\"\"\n    while True:\n        try:\n            n = int(input(prompt).strip())\n        except ValueError:\n            print(\"Please enter a whole number.\")\n            continue\n        if lo <= n <= hi:\n            return n\n        print(f\"Enter a number between {lo} and {hi}.\")\n\nmonth = get_int(\"Month (1-12): \", 1, 12)\nday = get_int(\"Day (1-31): \", 1, 31)\nprint(f\"Date: month {month}, day {day}\")\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Extract Validation into a Function",
          body: "When you need the same validation in multiple places, put it in a function like get_int() above. It keeps the validation logic in one place and makes the calling code clean.",
        },
      ],
      interactions: [
        {
          id: "s5-validation-loops-mc",
          kind: "multiple-choice",
          prompt: "In a validation loop using `while True:` and `break`, when does `break` execute?",
          beginnerPurpose: "Understand the role of break in a validation loop",
          expectedConceptIds: ["input-function"],
          options: [
            { id: "a", text: "After every iteration", isCorrect: false, explanation: "break exits the loop. Running it every iteration would exit after the first prompt." },
            { id: "b", text: "When all validation checks have passed", isCorrect: true, explanation: "Correct! break is placed at the end of the loop body, after all checks succeed. continue sends the loop back to re-prompt on failure." },
            { id: "c", text: "When ValueError is caught", isCorrect: false, explanation: "ValueError triggers continue (to re-prompt), not break." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "break exits the loop on success. continue goes back to the top to re-prompt on failure." }],
          feedback: { correct: "Correct! break fires only when input is valid, exiting the loop.", incorrect: "break exits when all validation passes. continue re-prompts on failure." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-validation-loops-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.17 — Input-driven calculator project ───────────────────── */
    {
      id: "s5-calculator-project",
      stageId: "stage-05",
      title: "Input-Driven Calculator Project",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Build a calculator that reads two numbers and an operator from user input",
        "Apply defensive conversion and operator validation",
        "Handle division by zero as a special case",
      ],
      prerequisites: [],
      concepts: ["input-function", "type-conversion", "logical-operators"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project: A Safe Four-Function Calculator\n\nThis project combines everything in this stage:\n- `input()` for reading user data\n- `float()` with `try/except` for defensive conversion\n- Comparison and logical operators for validation\n- Conditional logic for operation dispatch\n\n```python\ndef get_float(prompt):\n    while True:\n        try:\n            return float(input(prompt).strip())\n        except ValueError:\n            print(\"Please enter a valid number.\")\n\ndef get_operator():\n    valid_ops = {'+', '-', '*', '/'}\n    while True:\n        op = input(\"Operator (+, -, *, /): \").strip()\n        if op in valid_ops:\n            return op\n        print(f\"Invalid operator '{op}'. Use +, -, *, or /.\")\n\na = get_float(\"First number: \")\nop = get_operator()\nb = get_float(\"Second number: \")\n\nif op == '+':\n    result = a + b\nelif op == '-':\n    result = a - b\nelif op == '*':\n    result = a * b\nelif op == '/':\n    if b == 0:\n        print(\"Error: Division by zero\")\n        result = None\n    else:\n        result = a / b\n\nif result is not None:\n    print(f\"{a} {op} {b} = {result}\")\n```\n\n## Extension Ideas\n\n- Add `//` (floor division) and `%` (modulo) operators\n- Loop to allow multiple calculations\n- Format results to 4 decimal places",
        },
        {
          kind: "why-matters",
          body: "This calculator project is a microcosm of real software: read input, validate it, process it safely, handle errors, and present results. Every serious program — from web forms to scientific tools — does these same steps.",
        },
      ],
      interactions: [
        {
          id: "s5-calculator-project-mc",
          kind: "multiple-choice",
          prompt: "Why must division by zero be checked before performing the `/` operation?",
          beginnerPurpose: "Understand ZeroDivisionError prevention",
          expectedConceptIds: ["type-conversion"],
          options: [
            { id: "a", text: "Python raises ZeroDivisionError at runtime", isCorrect: true, explanation: "Correct! 10 / 0 raises ZeroDivisionError. Checking b != 0 before dividing prevents the crash." },
            { id: "b", text: "The result would be 0", isCorrect: false, explanation: "Python does not return 0 for x/0 — it raises ZeroDivisionError." },
            { id: "c", text: "It would print 'inf'", isCorrect: false, explanation: "float('inf') exists but 10.0/0 still raises ZeroDivisionError for float division in Python." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Dividing any number by zero is mathematically undefined — Python enforces this with an error." }],
          feedback: { correct: "Correct! Division by zero raises ZeroDivisionError — check before dividing.", incorrect: "Python raises ZeroDivisionError for x/0. Always check b != 0 before dividing." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-calculator-project-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 5.18 — Input-driven text formatter project ───────────────── */
    {
      id: "s5-text-formatter-project",
      stageId: "stage-05",
      title: "Input-Driven Text Formatter Project",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Build a text formatter that reads user text and applies transformations",
        "Apply membership testing to let users choose formatting options",
        "Combine string methods with user input to produce polished output",
      ],
      prerequisites: [],
      concepts: ["input-function", "type-conversion", "truthy-falsy"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project: Interactive Text Formatter\n\nThis project ties together Stage 4 (strings) with Stage 5 (input and logic):\n\n```python\nprint(\"=== Text Formatter ===\")\ntext = input(\"Enter text to format: \").strip()\n\nif not text:\n    print(\"No text entered. Exiting.\")\nelse:\n    print(\"\\nAvailable transformations:\")\n    print(\"  1. UPPERCASE\")\n    print(\"  2. lowercase\")\n    print(\"  3. Title Case\")\n    print(\"  4. Reverse\")\n    print(\"  5. Count words\")\n\n    choice = input(\"\\nEnter number (1-5): \").strip()\n\n    if choice == '1':\n        result = text.upper()\n    elif choice == '2':\n        result = text.lower()\n    elif choice == '3':\n        result = text.title()\n    elif choice == '4':\n        result = text[::-1]\n    elif choice == '5':\n        count = len(text.split())\n        result = f\"{count} word{'s' if count != 1 else ''}\"\n    else:\n        result = None\n        print(f\"Invalid choice: '{choice}'\")\n\n    if result is not None:\n        print(f\"\\nResult: {result}\")\n```\n\n## What This Demonstrates\n\n- `input()` and `strip()` for clean user data\n- Truthiness check (`if not text`) for empty input\n- Membership testing and comparisons for menu dispatch\n- All string methods from Stage 4\n- f-strings for formatted output\n- `is not None` for the correct identity check",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Build Projects That Connect Stages",
          body: "The best way to solidify new concepts is to use them in a project that also exercises what you learned before. This text formatter uses Stage 4 string methods, Stage 5 input/logic, and Stage 3 f-strings all at once.",
        },
      ],
      interactions: [
        {
          id: "s5-text-formatter-project-mc",
          kind: "multiple-choice",
          prompt: "In the formatter above, why is the empty-input check `if not text:` placed before the menu display?",
          beginnerPurpose: "Apply guard clause pattern: check for invalid state before proceeding",
          expectedConceptIds: ["truthy-falsy"],
          options: [
            { id: "a", text: "To avoid showing the menu when there's nothing to format", isCorrect: true, explanation: "Correct! If text is empty, showing the menu and asking for a transformation choice makes no sense. The guard exits early." },
            { id: "b", text: "Because strip() might fail on empty strings", isCorrect: false, explanation: "strip() on an empty string returns '' safely — no error. The check is about program logic, not error prevention." },
            { id: "c", text: "Because input() returns None for empty input", isCorrect: false, explanation: "input() returns '' (empty string) when the user presses Enter without typing. It never returns None." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "A guard clause detects invalid conditions early and exits before doing unnecessary work." }],
          feedback: { correct: "Correct! The guard prevents pointless menu display when there's no text to process.", incorrect: "The empty check is a guard clause — it exits early when there's nothing useful to do." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s5-text-formatter-project-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s5-project",
    stageId: "stage-05",
    title: "Input, Validation, and Logic Integrated Application",
    brief:
      "Build an interactive command-line application that reads user input, converts types defensively, validates values using comparison and logical operators, and displays results using formatted output. The application should handle all error cases gracefully without crashing.",
    requirements: [
      "Read at least three pieces of input from the user",
      "Use defensive conversion (try/except with int() or float()) on numeric inputs",
      "Validate at least one input for range using chained comparisons",
      "Use logical operators (and, or, not) in at least one condition",
      "Use truthiness checking (e.g., if not text:) for at least one condition",
      "Produce formatted output using f-strings with format specifiers",
    ],
    acceptanceCriteria: [
      "Program does not crash on invalid input — bad input shows a helpful message",
      "All comparisons use == for values and is for None",
      "At least one validation loop re-prompts on invalid input",
      "Output is readable and uses f-string formatting throughout",
    ],
    conceptIds: ["input-function", "type-conversion", "truthy-falsy", "logical-operators"],
    difficulty: "beginner",
  },
} satisfies Stage;
