import type { Stage } from "@/course/course.schema";

export const stage03 = {
  id: "stage-03",
  number: 3,
  title: "Values, Types, and Data Flow",
  summary:
    "Understand Python's core types — int, float, str, bool, None — and how values flow through expressions, conversions, and comparisons.",
  level: "beginner",
  masteryGateConceptIds: [
    "int",
    "float",
    "str-type",
    "bool",
    "none-type",
    "type-conversion",
    "truthiness",
  ],

  lessons: [
    /* ── Lesson 1: Numbers: Integers and Floats ───────────────────────────── */
    {
      id: "s3-integers-floats",
      stageId: "stage-03",
      title: "Numbers: Integers and Floats",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Distinguish between Python's int and float types",
        "Use type() to inspect the type of a value",
        "Explain why 5/2 returns 3.5 but 5//2 returns 2",
        "Use modulo (%) to find the remainder of a division",
      ],
      prerequisites: ["s2-string-formatting"],
      concepts: ["int", "float"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Integers and Floats\n\nPython has two main numeric types:\n\n- **`int`** — whole numbers with no decimal point: `0`, `42`, `-7`, `1_000_000`\n- **`float`** — numbers with a decimal point: `3.14`, `-0.5`, `1.0`, `2.718`\n\nYou can check any value's type with `type()`:\n\n```python\nprint(type(42))     # <class 'int'>\nprint(type(3.14))   # <class 'float'>\n```\n\n### Division in Python 3\n\n`/` always returns a float — even when dividing two integers that divide evenly:\n```python\nprint(10 / 2)    # 5.0   (float!)\nprint(10 // 2)   # 5     (int — floor division)\nprint(10 % 3)    # 1     (remainder)\n```\n\nPython integers have **unlimited precision** — they never overflow, unlike integers in C or Java.",
        },
        {
          kind: "code",
          language: "python",
          code: "# Integer arithmetic\nprint(7 + 3)    # 10\nprint(7 - 3)    # 4\nprint(7 * 3)    # 21\nprint(7 // 3)   # 2\nprint(7 % 3)    # 1\n\n# Float arithmetic\nprint(1.5 + 2.5)  # 4.0\nprint(7 / 2)      # 3.5",
          caption: "Integer and float operations side by side.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Python Integers Never Overflow",
          body: "Unlike many languages, Python integers can be arbitrarily large. You can compute 2**1000 and Python handles it correctly, no overflow errors. This is unique to Python and very handy.",
        },
        {
          kind: "glossary-term",
          term: "int",
          definition:
            "Python's integer type. Represents whole numbers (positive, negative, or zero) with no decimal point. Python integers have unlimited precision.",
          example: "count = 42\ntemperature = -5",
        },
        {
          kind: "glossary-term",
          term: "float",
          definition:
            "Python's floating-point type. Represents numbers with a decimal component. Stored as 64-bit IEEE 754 doubles, which means very large or very precise floats may have small rounding errors.",
          example: "pi = 3.14159\nbalance = -12.50",
        },
      ],
      interactions: [
        {
          id: "s3-if-predict-division",
          kind: "predict-output",
          prompt:
            "What does this program print? Pay close attention to which operator is used on each line.",
          beginnerPurpose:
            "Distinguish / (float division) from // (floor division) — a very common point of confusion.",
          expectedConceptIds: ["int", "float"],
          code: "print(5 / 2)\nprint(5 // 2)\nprint(5 % 2)",
          expectedOutput: "2.5\n2\n1",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "/ returns a float; // returns the integer quotient; % returns the remainder.",
            },
            {
              level: "syntax",
              text: "5/2 = 2.5 exactly. 5//2 = 2 (how many times does 2 fit completely in 5?). 5%2 = 1 (what's left over?).",
            },
          ],
          feedback: {
            correct: "Correct! / → 2.5 (float), // → 2 (floor), % → 1 (remainder).",
            incorrect:
              "Remember: / always returns a float in Python 3. // gives the integer part of the division. % gives the remainder.",
          },
        },
        {
          id: "s3-if-fill-type-check",
          kind: "fill-code",
          prompt:
            "Complete the code so it prints the type of the number 42 using the type() function.",
          beginnerPurpose:
            "Practice using type() to inspect values — a key debugging tool.",
          expectedConceptIds: ["int"],
          codeTemplate: "print(___)",
          blanks: [
            {
              placeholder: "___",
              answer: "type(42)",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "type() takes a value as its argument and returns the type: type(42) returns <class 'int'>.",
            },
          ],
          feedback: {
            correct: "Correct! type(42) returns <class 'int'>.",
            incorrect: "Use the type() function: print(type(42))",
          },
        },
        {
          id: "s3-if-mc-int-vs-float",
          kind: "multiple-choice",
          prompt: "Which of the following is a float in Python?",
          beginnerPurpose:
            "Verify the learner can identify int vs float literals by their notation.",
          expectedConceptIds: ["int", "float"],
          options: [
            {
              id: "opt-a",
              text: "100",
              isCorrect: false,
              explanation: "100 has no decimal point — it's an int.",
            },
            {
              id: "opt-b",
              text: "100.0",
              isCorrect: true,
              explanation:
                "100.0 has a decimal point, making it a float even though its mathematical value is a whole number.",
            },
            {
              id: "opt-c",
              text: "\"100\"",
              isCorrect: false,
              explanation: '"100" is a string, not a number at all.',
            },
            {
              id: "opt-d",
              text: "True",
              isCorrect: false,
              explanation: "True is a boolean, not a float.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "A float is any number written with a decimal point.",
            },
          ],
          feedback: {
            correct: "Right! The decimal point makes 100.0 a float, even though it equals 100.",
            incorrect:
              "A float is identified by the presence of a decimal point in its literal form.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "int",
          recallPrompt: "What is an int in Python, and how does it differ from a float?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "float",
          recallPrompt: "What does Python's / operator return when dividing two integers?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s3-if-predict-division",
          "s3-if-fill-type-check",
          "s3-if-mc-int-vs-float",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["int", "float"],
      },
    },

    /* ── Lesson 2: Booleans and Comparisons ───────────────────────────────── */
    {
      id: "s3-booleans-comparisons",
      stageId: "stage-03",
      title: "Booleans and Comparisons",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Identify True and False as Python's boolean values",
        "Use comparison operators ==, !=, <, >, <=, >= to produce booleans",
        "Understand that comparisons are expressions that evaluate to True or False",
        "Avoid confusing = (assignment) with == (equality test)",
      ],
      prerequisites: ["s3-integers-floats"],
      concepts: ["bool"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Booleans: True and False\n\nA **boolean** is a value that is either `True` or `False`. Booleans are the result of **comparison expressions** — questions Python answers with yes or no.\n\n```python\nprint(5 > 3)    # True\nprint(5 < 3)    # False\nprint(5 == 5)   # True\nprint(5 != 5)   # False\n```\n\n### Comparison Operators\n\n| Operator | Meaning | Example | Result |\n|---|---|---|---|\n| `==` | Equal to | `3 == 3` | `True` |\n| `!=` | Not equal to | `3 != 4` | `True` |\n| `<` | Less than | `2 < 5` | `True` |\n| `>` | Greater than | `5 > 2` | `True` |\n| `<=` | Less than or equal | `3 <= 3` | `True` |\n| `>=` | Greater than or equal | `4 >= 5` | `False` |\n\nComparisons can be stored in variables:\n```python\nis_adult = age >= 18   # True if age is 18 or more\n```",
        },
        {
          kind: "code",
          language: "python",
          code: "age = 20\nprint(age >= 18)     # True\nprint(age == 20)     # True\nprint(age < 18)      # False\nprint(type(age > 0)) # <class 'bool'>",
          caption:
            "Comparison expressions produce boolean values. type() confirms the result is bool.",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "= vs == — The Most Common Beginner Bug",
          body: "= is assignment: it stores a value. == is a comparison: it checks if two values are equal and returns True or False. Writing if x = 5 instead of if x == 5 is a SyntaxError in Python (and a logic bug in many other languages).",
        },
        {
          kind: "glossary-term",
          term: "bool",
          definition:
            "Python's boolean type. Has exactly two possible values: True and False. Booleans are the result of comparison and logical operations.",
          example: "is_valid = True\npassed = score >= 60",
        },
      ],
      interactions: [
        {
          id: "s3-bc-predict-comparison",
          kind: "predict-output",
          prompt: "What does this program print? (Three lines, each True or False.)",
          beginnerPurpose:
            "Practice evaluating comparison expressions and recognising the boolean output.",
          expectedConceptIds: ["bool"],
          code: "x = 10\nprint(x > 5)\nprint(x == 10)\nprint(x != 10)",
          expectedOutput: "True\nTrue\nFalse",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Ask each comparison as a question: Is 10 > 5? Is 10 equal to 10? Is 10 not equal to 10?",
            },
          ],
          feedback: {
            correct: "Correct! 10>5 is True, 10==10 is True, 10!=10 is False.",
            incorrect:
              "Evaluate each comparison: > means greater than, == means equal to, != means not equal to.",
          },
        },
        {
          id: "s3-bc-mc-which-is-bool",
          kind: "multiple-choice",
          prompt: "Which of the following expressions produces a boolean value?",
          beginnerPurpose:
            "Distinguish boolean-producing expressions from other expression types.",
          expectedConceptIds: ["bool"],
          options: [
            {
              id: "opt-a",
              text: "5 + 3",
              isCorrect: false,
              explanation: "5 + 3 produces 8, an integer, not a boolean.",
            },
            {
              id: "opt-b",
              text: '"hello"',
              isCorrect: false,
              explanation: '"hello" is a string literal, not a boolean.',
            },
            {
              id: "opt-c",
              text: "7 > 4",
              isCorrect: true,
              explanation:
                "7 > 4 is a comparison expression. Python evaluates it and returns True, which is a boolean.",
            },
            {
              id: "opt-d",
              text: "3.14",
              isCorrect: false,
              explanation: "3.14 is a float literal.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Comparison operators (>, <, ==, !=, <=, >=) always produce boolean results.",
            },
          ],
          feedback: {
            correct: "Right! Comparison operators like > always return a boolean (True or False).",
            incorrect:
              "Booleans come from comparisons. An expression with a comparison operator (>, <, ==, !=, <=, >=) returns True or False.",
          },
        },
        {
          id: "s3-bc-fill-comparison",
          kind: "fill-code",
          prompt:
            "Complete the comparison so that `is_passing` is True when `score` is at least 60.",
          beginnerPurpose:
            "Write a comparison expression that uses the >= operator correctly.",
          expectedConceptIds: ["bool"],
          codeTemplate: "score = 75\nis_passing = score ___ 60\nprint(is_passing)",
          blanks: [
            {
              placeholder: "___",
              answer: ">=",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "'At least 60' means 60 or more — which operator expresses 'greater than or equal to'?",
            },
            {
              level: "syntax",
              text: "The >= operator returns True when the left side is greater than or equal to the right side.",
            },
          ],
          feedback: {
            correct: "Correct! >= (greater than or equal to) is the right operator for 'at least'.",
            incorrect: "Use >= to mean 'greater than or equal to': score >= 60.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "bool",
          recallPrompt: "Name the six comparison operators in Python and what each one checks.",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s3-bc-predict-comparison",
          "s3-bc-mc-which-is-bool",
          "s3-bc-fill-comparison",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["bool"],
      },
    },

    /* ── Lesson 3: None — The Absence of a Value ──────────────────────────── */
    {
      id: "s3-none-type",
      stageId: "stage-03",
      title: "None: The Absence of a Value",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Describe what None represents in Python",
        "Distinguish None from 0, False, and the empty string",
        "Test for None using `is None` rather than ==",
        "Recognise None in function return values",
      ],
      prerequisites: ["s3-booleans-comparisons"],
      concepts: ["none-type"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## None: The Absence of a Value\n\n`None` is Python's way of representing *nothing* — the deliberate absence of any value. It is its own type (`NoneType`) and its own value.\n\n```python\nresult = None\nprint(result)         # None\nprint(type(result))   # <class 'NoneType'>\n```\n\n### None Is Not Zero, False, or Empty\n\n```python\nprint(None == 0)      # False\nprint(None == False)  # False\nprint(None == \"\")     # False\n```\n\n### Checking for None\n\nThe recommended way to check for None is with `is None`, not `==`:\n\n```python\nif result is None:\n    print(\"No value was returned\")\n```\n\nWhy `is`? Because `is` checks *identity* (same object in memory), not just equality. `None` is a singleton — there is only ever one `None` object.",
        },
        {
          kind: "code",
          language: "python",
          code: "# print() itself returns None\nx = print(\"Hello\")   # prints Hello\nprint(x)              # None  (print returns nothing useful)",
          caption:
            "Functions that don't explicitly return a value give back None. This trips up beginners often.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "None in Real Code",
          body: "None appears most often when a function has no return statement, when a variable is declared but not yet assigned a real value, or when an operation fails to find a result (e.g., searching a list for a missing item). Recognising None is essential for avoiding 'NoneType has no attribute' errors.",
        },
        {
          kind: "glossary-term",
          term: "None",
          definition:
            "Python's null value. Represents the intentional absence of any value. It is the only instance of NoneType and is used to signal 'no value' or 'missing'.",
          example: "result = None\nif result is None:\n    print(\"Nothing here\")",
        },
      ],
      interactions: [
        {
          id: "s3-nt-predict-none-print",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose:
            "Reveal that assigning the return value of print() gives None, a very common surprise.",
          expectedConceptIds: ["none-type"],
          code: 'value = print("hello")\nprint(value)',
          expectedOutput: "hello\nNone",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "print() displays text AND returns a value. What does print() return?",
            },
            {
              level: "syntax",
              text: "The first print() shows 'hello'. Then value holds whatever print() returned. print() returns None.",
            },
          ],
          feedback: {
            correct:
              "Correct! print(\"hello\") outputs 'hello' and returns None. Storing that return value and printing it shows None.",
            incorrect:
              "print() outputs text but returns None. When you store its return value, you get None.",
          },
        },
        {
          id: "s3-nt-mc-none-not-zero",
          kind: "multiple-choice",
          prompt: "Which statement about None is TRUE?",
          beginnerPurpose:
            "Disambiguate None from 0, False, and empty string — three common confusions.",
          expectedConceptIds: ["none-type"],
          options: [
            {
              id: "opt-a",
              text: "None is the same as 0",
              isCorrect: false,
              explanation: "None != 0. They are completely different values of different types.",
            },
            {
              id: "opt-b",
              text: "None is the same as False",
              isCorrect: false,
              explanation:
                "None != False. Although both are falsy (we'll cover that soon), they are distinct values.",
            },
            {
              id: "opt-c",
              text: "None is its own type (NoneType) with only one possible value",
              isCorrect: true,
              explanation:
                "Correct! None is the sole instance of NoneType. There is only one None in any Python program.",
            },
            {
              id: "opt-d",
              text: 'None is the same as ""',
              isCorrect: false,
              explanation: 'None is not an empty string. "" is a string with no characters; None has no type at all beyond NoneType.',
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "None is unique — it's not a number, not a boolean, and not a string.",
            },
          ],
          feedback: {
            correct: "Exactly right! None is a singleton of type NoneType — completely distinct from 0, False, or \"\".",
            incorrect:
              "None is not equivalent to 0, False, or \"\". It is its own type (NoneType) representing the deliberate absence of a value.",
          },
        },
        {
          id: "s3-nt-explain-none",
          kind: "plain-language-explain",
          prompt:
            "Explain to a fellow learner: What is None in Python, and when would you use it?",
          beginnerPurpose:
            "Consolidate understanding of None's purpose by articulating it in plain language.",
          expectedConceptIds: ["none-type"],
          code: 'nickname = None\nif nickname is None:\n    print("No nickname set")\nelse:\n    print(f"Nickname: {nickname}")',
          keyPointsToHit: [
            "None represents the absence of a value",
            "None is not zero or False",
            "Use `is None` to check for None",
          ],
          sampleAnswer:
            "None is Python's way of saying 'there is no value here'. It's different from zero (which is a number) or False (which is a boolean) — None means nothing at all. You use it when a variable hasn't been set yet, or when a function can't return a useful result. Check for None with `is None` rather than ==.",
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Think about what it means for something to be absent versus being zero or empty.",
            },
          ],
          feedback: {
            correct:
              "Well explained! The key points: absence of value, distinct from 0/False, checked with `is None`.",
            incorrect:
              "Try to cover three things: what None means, what it's NOT the same as, and how you test for it.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "none-type",
          recallPrompt: "What is None in Python, and how do you test whether a variable holds None?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s3-nt-predict-none-print",
          "s3-nt-mc-none-not-zero",
          "s3-nt-explain-none",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["none-type"],
      },
    },

    /* ── Lesson 4: Converting Between Types ───────────────────────────────── */
    {
      id: "s3-type-conversion",
      stageId: "stage-03",
      title: "Converting Between Types",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Convert between types using int(), float(), str(), and bool()",
        "Predict when a conversion will succeed and when it will raise a ValueError",
        "Explain the difference between implicit and explicit type conversion",
      ],
      prerequisites: ["s3-none-type"],
      concepts: ["type-conversion", "int", "float", "str-type", "bool"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Explicit Type Conversion\n\nPython does not automatically convert between types in most situations. You must do it explicitly using built-in functions:\n\n| Function | Converts to | Example | Result |\n|---|---|---|---|\n| `int()` | Integer | `int(\"42\")` | `42` |\n| `int()` | Integer | `int(3.9)` | `3` (truncates) |\n| `float()` | Float | `float(\"3.14\")` | `3.14` |\n| `float()` | Float | `float(7)` | `7.0` |\n| `str()` | String | `str(42)` | `\"42\"` |\n| `bool()` | Boolean | `bool(0)` | `False` |\n| `bool()` | Boolean | `bool(\"hi\")` | `True` |\n\n### When Conversion Fails\n\nNot every conversion is valid. Trying to convert an invalid string raises a `ValueError`:\n\n```python\nint(\"hello\")   # ValueError: invalid literal for int()\nfloat(\"abc\")   # ValueError\n```",
        },
        {
          kind: "code",
          language: "python",
          code: '# Successful conversions\nprint(int("42"))       # 42\nprint(float("3.14"))   # 3.14\nprint(str(100))        # 100\nprint(int(9.9))        # 9  (truncates toward zero)\nprint(bool(0))         # False\nprint(bool(1))         # True',
          caption: "Explicit conversions using int(), float(), str(), and bool().",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "int() Truncates, It Does NOT Round",
          body: "int(3.9) gives 3, not 4. int(-3.9) gives -3, not -4. int() always truncates toward zero. If you need rounding, use round() instead.",
        },
        {
          kind: "comparison",
          leftLabel: "Explicit conversion (correct)",
          rightLabel: "Type mismatch (error)",
          leftCode: 'age_str = "25"\nage = int(age_str)\nprint(age + 1)   # 26',
          rightCode: 'age_str = "25"\nprint(age_str + 1)\n# TypeError: can only concatenate\n# str (not "int") to str',
          caption: "Without conversion, Python refuses to mix types. Use int() to convert first.",
        },
      ],
      interactions: [
        {
          id: "s3-tc-predict-conversion",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose:
            "Practice predicting the result of explicit type conversions including the truncating behaviour of int().",
          expectedConceptIds: ["type-conversion", "int", "float"],
          code: 'print(int("10"))\nprint(float("2.5"))\nprint(str(99))\nprint(int(7.8))',
          expectedOutput: "10\n2.5\n99\n7",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "int() of a string gives the integer value; int() of a float drops the decimal.",
            },
          ],
          feedback: {
            correct: 'Correct! int("10")→10, float("2.5")→2.5, str(99)→"99" printed as 99, int(7.8)→7.',
            incorrect:
              "Work through each line: int() converts to integer (truncating for floats), float() to float, str() to string.",
          },
        },
        {
          id: "s3-tc-debug-type-error",
          kind: "debug-code",
          prompt:
            'This code raises a TypeError because it tries to concatenate a string and an integer. Fix it so it prints: "The answer is 42".',
          beginnerPurpose:
            "Practice identifying and fixing a type mismatch using explicit conversion.",
          expectedConceptIds: ["type-conversion", "str-type"],
          brokenCode: 'answer = 42\nprint("The answer is " + answer)',
          bugDescription:
            "The + operator cannot join a string and an integer directly. You must convert the integer to a string first.",
          fixedCode: 'answer = 42\nprint("The answer is " + str(answer))',
          errorType: "TypeError",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "Python won't automatically convert an int to a string for concatenation. You must do it explicitly.",
            },
            {
              level: "syntax",
              text: "Use str(answer) to convert the integer to a string before concatenating.",
            },
          ],
          feedback: {
            correct: 'Fixed! str(answer) converts 42 to "42", making concatenation possible.',
            incorrect:
              "Wrap the integer in str() to convert it: str(answer) gives you \"42\" as a string.",
          },
        },
        {
          id: "s3-tc-fill-conversion",
          kind: "fill-code",
          prompt:
            'The variable `score_str` holds the string "87". Complete the code to convert it to an integer and add 13 to it.',
          beginnerPurpose:
            "Practice applying int() to a string variable before using it in arithmetic.",
          expectedConceptIds: ["type-conversion", "int"],
          codeTemplate: 'score_str = "87"\nscore = ___(score_str)\nprint(score + 13)',
          blanks: [
            {
              placeholder: "___",
              answer: "int",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The function that converts a value to an integer is int().",
            },
          ],
          feedback: {
            correct: "Correct! int(score_str) converts \"87\" to 87, and 87 + 13 = 100.",
            incorrect: "Use the int() function to convert the string to an integer.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "type-conversion",
          recallPrompt: "How do you convert a string to an integer in Python, and what happens if the string isn't a valid number?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s3-tc-predict-conversion",
          "s3-tc-debug-type-error",
          "s3-tc-fill-conversion",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["type-conversion"],
      },
    },

    /* ── Lesson 5: Truthiness ─────────────────────────────────────────────── */
    {
      id: "s3-truthiness",
      stageId: "stage-03",
      title: "Truthiness: What Python Considers True",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "List Python's falsy values: 0, 0.0, \"\", None, False, [], {}",
        "Explain that any other value is truthy",
        "Use bool() to check the truthiness of a value",
        "Understand why truthiness matters for if statements",
      ],
      prerequisites: ["s3-type-conversion"],
      concepts: ["truthiness", "bool"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Truthiness in Python\n\nEvery Python value is either **truthy** or **falsy** — meaning it behaves like `True` or `False` when used in a boolean context (such as an `if` statement or `while` loop).\n\n### Falsy Values\n\nThe following values are **falsy** (they behave like `False`):\n\n- `False`\n- `0` and `0.0`\n- `\"\"` (empty string)\n- `None`\n- `[]` (empty list)\n- `{}` (empty dict)\n- `()` (empty tuple)\n\n**Everything else is truthy** — including non-zero numbers, non-empty strings, non-empty collections, and objects.\n\n```python\nbool(0)       # False\nbool(1)       # True\nbool(\"\")      # False\nbool(\"hi\")    # True\nbool(None)    # False\nbool([])      # False\nbool([1,2])   # True\n```",
        },
        {
          kind: "code",
          language: "python",
          code: "# Demonstrate truthiness\nvalues = [0, 1, -1, \"\", \"hello\", None, 0.0, 3.14]\nfor v in values:\n    print(f\"bool({v!r}) = {bool(v)}\")",
          caption:
            "Checking every value with bool() shows clearly which are falsy and which are truthy.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Why Truthiness Matters",
          body: "Because every value has a truth value, you can write `if username:` instead of `if username != \"\"` — they mean the same thing. This is idiomatic Python: shorter, readable, and expressive. You'll see this pattern constantly in real code.",
        },
        {
          kind: "glossary-term",
          term: "truthiness",
          definition:
            "The boolean interpretation of a value in a conditional context. Every Python value is either truthy (acts like True) or falsy (acts like False). Use bool() to check.",
          example: "bool(0) → False\nbool(\"hello\") → True",
        },
      ],
      interactions: [
        {
          id: "s3-tr-mc-is-truthy",
          kind: "multiple-choice",
          prompt: "Which of the following values is FALSY in Python?",
          beginnerPurpose:
            "Identify falsy values — essential knowledge for understanding if statements.",
          expectedConceptIds: ["truthiness"],
          options: [
            {
              id: "opt-a",
              text: "\"False\"",
              isCorrect: false,
              explanation:
                '"False" is a non-empty string. Non-empty strings are truthy, even when they contain the word "False".',
            },
            {
              id: "opt-b",
              text: "-1",
              isCorrect: false,
              explanation: "Negative numbers are truthy. Only 0 and 0.0 are falsy.",
            },
            {
              id: "opt-c",
              text: "0.0",
              isCorrect: true,
              explanation:
                "0.0 is falsy. Any zero — whether int (0) or float (0.0) — is falsy.",
            },
            {
              id: "opt-d",
              text: "[0]",
              isCorrect: false,
              explanation:
                "[0] is a list with one element. Non-empty lists are truthy, regardless of what's inside.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "The falsy values are: False, 0, 0.0, \"\", None, [], {}, ().",
            },
          ],
          feedback: {
            correct: "Correct! 0.0 is falsy. Any zero value (int or float) is considered False.",
            incorrect:
              "Remember: falsy values are False, 0, 0.0, \"\", None, [], {}. \"False\" is a non-empty string (truthy); -1 is a non-zero number (truthy).",
          },
        },
        {
          id: "s3-tr-predict-bool",
          kind: "predict-output",
          prompt: "What does this program print? (Four lines, each True or False.)",
          beginnerPurpose:
            "Trace bool() calls to build a mental map of truthy/falsy values.",
          expectedConceptIds: ["truthiness", "bool"],
          code: 'print(bool(0))\nprint(bool(42))\nprint(bool(""))\nprint(bool("0"))',
          expectedOutput: "False\nTrue\nFalse\nTrue",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: 'Zero is falsy; 42 is truthy; empty string is falsy; "0" is a non-empty string (truthy).',
            },
          ],
          feedback: {
            correct: 'Correct! 0→False, 42→True, ""→False, "0"→True (non-empty string, truthy even though it looks like zero).',
            incorrect:
              'Remember: bool(0) = False, bool("0") = True. "0" is a non-empty string, which is truthy.',
          },
        },
        {
          id: "s3-tr-fill-truthy-check",
          kind: "fill-code",
          prompt:
            "Complete the condition so the if block runs only when `username` is a non-empty string (use Python's truthiness instead of an explicit comparison).",
          beginnerPurpose:
            "Write idiomatic Python by using truthiness directly in a condition.",
          expectedConceptIds: ["truthiness"],
          codeTemplate: 'username = "alice"\nif ___:\n    print(f"Welcome, {username}!")',
          blanks: [
            {
              placeholder: "___",
              answer: "username",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "A non-empty string is truthy in Python. You can use the variable directly as the condition.",
            },
            {
              level: "syntax",
              text: "Instead of `if username != \"\"`, just write `if username:`.",
            },
          ],
          feedback: {
            correct: "Correct! `if username:` is idiomatic Python — it's True for any non-empty string.",
            incorrect:
              "Use the variable itself as the condition: `if username:` is True when username is any non-empty string.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "truthiness",
          recallPrompt:
            "List five values that are falsy in Python. What do all non-falsy values have in common?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s3-tr-mc-is-truthy",
          "s3-tr-predict-bool",
          "s3-tr-fill-truthy-check",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["truthiness"],
      },
    },
  ],

  project: {
    id: "s3-project",
    stageId: "stage-03",
    title: "Unit Converter",
    brief:
      "Build a program that converts a fixed set of values between units (e.g., miles to km, Fahrenheit to Celsius) and displays results with correct types.",
    requirements: [
      "Convert at least 3 different unit types",
      "Use float division correctly",
      "Format output with f-strings",
      "Show both original and converted values",
      "Use correct variable types",
    ],
    acceptanceCriteria: [
      "Correct arithmetic",
      "Output shows value and unit",
      "No type errors",
    ],
    conceptIds: ["int", "float", "str-type", "string-formatting", "expression"],
    difficulty: "beginner",
  },
} satisfies Stage;
