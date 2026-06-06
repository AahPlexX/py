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
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "Computers handle numbers constantly — counting items, measuring distances, calculating prices. But not all numbers work the same way. A number of people in a room is always a whole number. A temperature or a price can have a fractional part. Python keeps these two ideas separate, and understanding the difference prevents a surprising class of bugs where arithmetic gives you an unexpected type of result.",
        },

        /* SECTION 3 — CORE CONCEPT: int */
        {
          kind: "text",
          markdown:
            "### The need for whole numbers\n\nSometimes you want to count things precisely — pages in a book, people in a queue, loop repetitions. For these you need a number type that holds only whole values, with no decimal point and no rounding.\n\nIn Python this type is called **`int`** (short for *integer*). An int can be positive, negative, or zero, and Python's ints can be as large as your computer's memory allows — they never overflow.\n\nYou can ask Python what type a value is by wrapping it in `type()`.",
        },
        {
          kind: "code",
          language: "python",
          code: "# Setup: showing int values and how to inspect their type\ncount = 42        # a whole number — no decimal point\ndebt  = -7        # negatives are fine\nbig   = 1_000_000 # underscores improve readability; value is 1000000\n\nprint(count)        # 42\nprint(type(count))  # <class 'int'>\nprint(type(big))    # <class 'int'>",
          caption:
            "A: Demonstrates int literals and type(). B: The example. C: count is 42, an int. Underscores in numeric literals are ignored by Python — they only help humans read large numbers. type() reveals the class. D: What if count were 42.0? type() would show <class 'float'> — that decimal point changes everything.",
        },
        {
          kind: "mental-model",
          title: "int — the counting number",
          analogy:
            "Think of an int like a tally mark on a whiteboard. You can add marks, erase marks, count them. You can never have half a tally mark.",
          explanation:
            "Python's int holds a precise whole number. There is no rounding, no decimal part, no approximation. Operations on two ints that produce a whole result stay as ints. The only exception is regular division (/), which always returns a float.",
        },

        /* SECTION 3 — CORE CONCEPT: float */
        {
          kind: "text",
          markdown:
            "### The need for fractional numbers\n\nSometimes a whole number is not enough. A kilogram of flour can be 0.75 kg. A bank balance can be $12.50. A temperature can be 36.6°C. You need a number that can represent a value between the whole numbers.\n\nPython's type for this is called **`float`** (short for *floating-point number*). A float is written with a decimal point. Even `1.0` is a float, not an int.\n\nFloats are stored in a fixed amount of memory (64 bits), which means very large or very precise floats may have tiny rounding errors — something whole ints never have.",
        },
        {
          kind: "code",
          language: "python",
          code: "# Setup: float literals and arithmetic\nprice   = 9.99\npi      = 3.14159\nwhole_f = 1.0       # looks like 1, but the dot makes it a float\n\nprint(type(price))    # <class 'float'>\nprint(type(whole_f))  # <class 'float'>\n\n# Regular division always returns float — even with two ints!\nprint(10 / 2)   # 5.0  (not 5!)\nprint(type(10 / 2))  # <class 'float'>",
          caption:
            "A: Shows float literals and the key fact that / always returns float. B: The example. C: price and whole_f are floats because they have decimal points. 10 / 2 returns 5.0, not 5 — the / operator always produces a float in Python 3. D: What if we use // instead of /? 10 // 2 returns 5, an int — floor division truncates to the whole part.",
        },

        /* SECTION 3 — COMPARISON: int vs float */
        {
          kind: "comparison",
          leftLabel: "int — whole number",
          rightLabel: "float — fractional number",
          leftCode:
            "x = 5\nprint(type(x))  # <class 'int'>\nprint(x)        # 5\n# Never has a decimal part\n# Exact — no rounding",
          rightCode:
            "x = 5.0\nprint(type(x))  # <class 'float'>\nprint(x)        # 5.0\n# Always has a decimal part\n# May have tiny rounding errors",
          caption:
            "The decimal point is the only visible difference in the literal, but the types are completely distinct and behave differently in division.",
        },

        /* SECTION 4 — VARIATIONS: division operators */
        {
          kind: "text",
          markdown:
            "### Division operators: /, //, and %\n\nPython has three division-related operators, each returning a different thing:\n\n- `/` — true division: always returns a float.\n- `//` — floor division: divides and rounds down to the nearest whole number; returns an int when both sides are ints.\n- `%` — modulo: returns the remainder after floor division.\n\nThese three operators are used together constantly — for example, to convert a total number of minutes into hours and leftover minutes.",
        },
        {
          kind: "code",
          language: "python",
          code: "total_minutes = 137\n\nhours     = total_minutes // 60  # how many full hours? → 2\nremainder = total_minutes % 60   # leftover minutes?   → 17\n\nprint(hours)      # 2\nprint(remainder)  # 17\n\n# Comparison of all three operators on the same pair of numbers\nprint(7 / 2)    # 3.5   (float)\nprint(7 // 2)   # 3     (floor — discards the .5)\nprint(7 % 2)    # 1     (remainder: 7 = 3*2 + 1)",
          caption: "Using //, %, and / together to decompose a quantity into parts.",
        },

        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "Breakdown: expecting an int from /",
          body: 'A very common mistake: you perform `result = 10 / 5` expecting an int (because 10 divided by 5 is perfectly 2), then later write `print(result + 1)` and wonder why you see 3.0 instead of 3. The bug is that / always returns float. Use // when you need an integer quotient: `result = 10 // 5` gives 2, not 2.0.',
        },
        {
          kind: "code",
          language: "python",
          code: "# Broken version — developer expected int, got float\nresult = 10 / 5\nprint(type(result))  # <class 'float'>  — surprise!\nprint(result + 1)    # 3.0  (not 3)\n\n# Fixed version\nresult = 10 // 5\nprint(type(result))  # <class 'int'>\nprint(result + 1)    # 3",
          caption: "/ always returns float. Use // when you need an integer result.",
        },

        /* SECTION 6 — WHY MATTERS */
        {
          kind: "why-matters",
          body: "With ints and floats in hand, you can now write arithmetic that produces the type you actually want. You can use type() to check any value when something seems off. The modulo operator % opens up even-odd tests and digit extraction. Next you will meet booleans — values that are the direct output of comparison questions — which build directly on the arithmetic you just learned.",
        },

        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A program stores `pages = 250` and `books = 4`. A developer writes `average = pages / books` and then tries to use `average` in a sentence: `\"Average pages: \" + average`. Two things will go wrong. What are they, and how would you fix both?",
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
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "Programs constantly need to make decisions: is the user old enough to proceed? Is the score high enough to pass? Has the countdown reached zero? To answer these questions, Python needs a way to represent a yes-or-no answer as a value that can be stored, compared, and acted upon. This lesson introduces that idea.",
        },

        /* SECTION 2 — PREREQUISITES */
        {
          kind: "text",
          markdown:
            "### Quick recap: expressions produce values\n\nYou already know that `5 + 3` is an expression that produces `8`. An expression is any piece of code that Python evaluates and turns into a value. Comparison expressions work the same way — they produce a value, but that value is not a number: it is either `True` or `False`.",
        },

        /* SECTION 3 — CORE CONCEPT: bool */
        {
          kind: "text",
          markdown:
            "### The need for yes-or-no values\n\nWhen you ask Python \"is the temperature above 30?\", the answer is not a number. It is simply: yes or no. Python needs a type to represent that answer as a value you can store in a variable and use later.\n\nThe two values that represent yes and no in Python are written as **`True`** and **`False`** (capital first letter). They are the only possible values of a type called **`bool`** (short for *Boolean*, named after mathematician George Boole).\n\nYou produce a bool by writing a **comparison expression** — using one of six comparison operators to compare two values.",
        },
        {
          kind: "code",
          language: "python",
          code: "# Setup: all six comparison operators applied to numbers\nage = 20\n\nprint(age == 20)   # True  — equal to\nprint(age != 18)   # True  — not equal to\nprint(age > 18)    # True  — greater than\nprint(age < 18)    # False — less than\nprint(age >= 20)   # True  — greater than or equal to\nprint(age <= 19)   # False — less than or equal to\n\n# Booleans are values — you can store them\nis_adult = age >= 18\nprint(is_adult)        # True\nprint(type(is_adult))  # <class 'bool'>",
          caption:
            "A: Shows all six operators and confirms the result type is bool. B: The example. C: Each comparison asks a question; Python answers True or False. The result is a full value you can store. D: What if age were 15? age >= 18 would be False, so is_adult would be False.",
        },
        {
          kind: "mental-model",
          title: "bool — the answer to a yes/no question",
          analogy:
            "Think of a comparison expression as a question you ask Python. `age >= 18` means 'Is age at least 18?' Python answers with a slip of paper that says either True or False. That slip is the bool value.",
          explanation:
            "Every comparison expression produces exactly one bool value. That value can be stored in a variable, printed, or used directly as the condition of an if statement (coming next stage). There are only two bool values in existence: True and False.",
        },

        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "Breakdown: = versus ==",
          body: "The single equals sign (=) is assignment — it stores a value into a variable. The double equals sign (==) is a comparison — it checks whether two values are equal and returns True or False. Writing `if x = 5` instead of `if x == 5` is a SyntaxError in Python. This is the single most common beginner mistake involving booleans.",
        },
        {
          kind: "code",
          language: "python",
          code: "score = 75   # = assigns 75 to score\n\n# Correct: compare score to 60\nresult = score == 60   # False — 75 is not 60\nprint(result)\n\n# What the mistake looks like (do not run — SyntaxError):\n# if score = 60:   # SyntaxError! Use == to compare\n#     print(\"match\")",
          caption: "= stores; == compares. They look similar but do completely different things.",
        },

        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "### Comparing strings and mixed types\n\nComparison operators also work on strings. Python compares strings character by character using alphabetical order. `==` checks exact equality (including case). Comparing a string to a number with `==` is valid and simply returns `False` — it does not crash.",
        },
        {
          kind: "code",
          language: "python",
          code: 'name = "Alice"\n\nprint(name == "Alice")   # True  — exact match\nprint(name == "alice")   # False — case matters\nprint(name != "Bob")     # True  — they are different\n\n# Comparing across types: always False, never crashes\nprint(42 == "42")        # False — int vs string',
          caption: "String comparisons are case-sensitive. Comparing different types returns False.",
        },

        /* SECTION 6 — WHY MATTERS */
        {
          kind: "why-matters",
          body: "Booleans are the bridge between data and decisions. Now that you can produce True or False from any comparison, you have everything you need for the if/else statements in Stage 4, which let your program choose different actions based on conditions. The next lesson introduces None — the value that means no value at all — which rounds out Python's core types.",
        },

        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A quiz program stores `user_answer = \"Paris\"` and the correct answer as `correct = \"paris\"`. The developer writes `is_correct = user_answer == correct` and is surprised it prints False. What is wrong, and what are two different ways to fix it?",
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
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "Sometimes the honest answer to a question is not a number, not a word, and not yes-or-no. Sometimes the answer is: there is no answer yet. A user profile with no nickname set. A search that found nothing. A variable declared before its value has been computed. Python needs a way to represent that idea — not zero, not empty, but genuinely absent.",
        },

        /* SECTION 2 — PREREQUISITES */
        {
          kind: "text",
          markdown:
            "### Quick recap: values and types\n\nEvery value in Python has a type. `42` is an int, `True` is a bool, `\"hello\"` is a string. Python is strict about this — you can always ask `type(x)` to find out what kind of value a variable holds. The value you are about to meet, `None`, has its own type too.",
        },

        /* SECTION 3 — CORE CONCEPT: None */
        {
          kind: "text",
          markdown:
            "### The need for 'no value'\n\nImagine a variable `nickname` that should hold a user's nickname — but the user has not chosen one yet. You could store an empty string `\"\"` or `0`, but those mean something: an empty string is a string, and `0` is a number. Neither really says 'this has not been set.' Python provides a dedicated value for this: **`None`**.\n\n`None` is Python's way of saying 'nothing is here.' It is not zero, not False, and not an empty string. It is its own value with its own type, called **`NoneType`**. There is exactly one `None` in all of Python — it is a *singleton*.\n\nThe recommended way to check whether a variable holds `None` is to write `x is None` rather than `x == None`. The keyword `is` checks that two names point to the exact same object in memory, which is the right test for a singleton.",
        },
        {
          kind: "code",
          language: "python",
          code: '# Setup: None as a "not yet set" placeholder\nnickname = None         # no nickname chosen yet\n\nprint(nickname)         # None\nprint(type(nickname))   # <class \'NoneType\'>\n\n# Correct way to test for None\nif nickname is None:\n    print("No nickname set")   # this branch runs\nelse:\n    print(f"Nickname: {nickname}")\n\n# None is not 0, False, or empty string\nprint(None == 0)      # False\nprint(None == False)  # False\nprint(None == "")     # False',
          caption:
            "A: Demonstrates None as a placeholder, type inspection, and the is None test. B: The example. C: nickname is None, so the is-None branch runs. The equality checks all return False — None is genuinely distinct. D: What if we wrote nickname == None instead of nickname is None? It would work in practice, but is None is the idiom Python developers expect.",
        },
        {
          kind: "mental-model",
          title: "None — the empty box with a label",
          analogy:
            "Picture a labelled box on a shelf. An int box contains a number. A string box contains text. A None box has the label on it — it exists — but when you open it, there is nothing inside. The box is not broken; it deliberately contains nothing.",
          explanation:
            "None is not an error. It is a deliberate signal that no meaningful value is present. Functions that do not return anything explicitly hand back None automatically. Variables that have been declared but not yet filled hold None.",
        },

        /* SECTION 4 — VARIATION: functions returning None */
        {
          kind: "text",
          markdown:
            "### Where None appears most often\n\nThe most surprising place beginners encounter `None` is as the return value of `print()`. The `print()` function displays text as a side effect, but it does not compute and return a useful value. Python functions that do not have a `return` statement automatically return `None`.",
        },
        {
          kind: "code",
          language: "python",
          code: '# print() returns None — this surprises many beginners\nx = print("hello")   # displays: hello\nprint(x)              # displays: None\n\n# The return value of print() is useless\n# Never store it unless you are specifically checking for None',
          caption: "print() has a side effect (displaying text) but returns None. Storing that return value gives you None.",
        },

        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "Breakdown: operating on None",
          body: "If a function returns None and you try to use that result in an operation — like adding it to a number or calling a method on it — Python raises a TypeError: 'NoneType object is not subscriptable' or similar. This error almost always means you forgot to return a value from a function, or you stored the result of print(). Check with `print(type(x))` to confirm.",
        },
        {
          kind: "code",
          language: "python",
          code: '# Broken: trying to use None as if it were a string\nresult = print("hello")   # result is None\n\n# This will crash with TypeError\n# print(result.upper())    # AttributeError: \'NoneType\' has no attribute \'upper\'\n\n# Fix: the function should actually return a value\ndef get_greeting():\n    return "hello"   # explicit return — not None\n\ngreeting = get_greeting()\nprint(greeting.upper())   # HELLO',
          caption: "None has no methods. Operating on it crashes. Make sure your functions return a real value.",
        },

        /* SECTION 6 — WHY MATTERS */
        {
          kind: "why-matters",
          body: "None completes Python's set of basic value types: numbers (int, float), answers (bool), text (str), and absence (None). Recognising None — especially as an unexpected return value — will save you from a whole family of confusing errors. The next lesson shows how to move values between types intentionally, using conversion functions.",
        },

        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A developer writes:\n\n```python\nlines = [\"cat\", \"dog\", \"bird\"]\nresult = lines.sort()\nprint(result[0])\n```\n\nThe program crashes with TypeError. The list.sort() method sorts the list in place and returns None. Explain what is happening and rewrite the two lines to fix it.",
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
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "Real programs constantly receive data in the wrong shape. A number that arrives as text from a user's input. A calculation result that needs to become part of a sentence. A float that must be displayed without decimal places. Python does not automatically reshape values for you — you must ask it to convert explicitly. This lesson teaches you the tools for that.",
        },

        /* SECTION 2 — PREREQUISITES */
        {
          kind: "text",
          markdown:
            "### Quick recap: types are distinct\n\nYou have met int, float, str, and bool. Python treats these as completely separate categories. You cannot add a string to an int, and you cannot concatenate a number onto a sentence, without Python refusing with a TypeError. Conversion functions bridge the gap between these categories.",
        },

        /* SECTION 3 — CORE CONCEPT: explicit type conversion */
        {
          kind: "text",
          markdown:
            "### The need to change a value's type\n\nImagine a user types their age into a form. Your program receives it as the text `\"25\"` — a string of two characters. You want to do arithmetic with it, but arithmetic on strings does not work the way you expect (`\"25\" + 1` raises a TypeError). You need to transform the string `\"25\"` into the number `25`.\n\nPython provides four built-in conversion functions for this:\n\n- **`int(x)`** — converts x to an integer (truncates floats; fails on non-numeric strings)\n- **`float(x)`** — converts x to a float\n- **`str(x)`** — converts x to a string (almost always succeeds)\n- **`bool(x)`** — converts x to True or False (follows truthiness rules)\n\nThis is called **explicit type conversion** — you are consciously asking Python to change the type. Python never does it automatically in contexts where it could be ambiguous.",
        },
        {
          kind: "code",
          language: "python",
          code: '# Setup: converting between common types\nage_text = "25"          # string received from user input\nage      = int(age_text)  # convert to int so arithmetic works\n\nprint(age + 1)            # 26 — works now\nprint(type(age))          # <class \'int\'>\n\n# str() converts anything to a string for display\nprice   = 9.99\nlabel   = "Price: " + str(price)   # concatenation needs two strings\nprint(label)              # Price: 9.99\n\n# int() on a float TRUNCATES (does not round)\nprint(int(9.9))    # 9\nprint(int(-9.9))   # -9  (truncates toward zero, not toward negative infinity)',
          caption:
            "A: Demonstrates the four common conversions. B: The example. C: int(age_text) turns '25' into 25; str(price) turns 9.99 into '9.99'. int() on a float discards the decimal. D: What if age_text were '25.5'? int('25.5') would raise a ValueError — int() cannot parse a decimal string directly. You would need int(float('25.5')) instead.",
        },
        {
          kind: "mental-model",
          title: "Conversion functions as translators",
          analogy:
            "Think of int(), float(), str(), and bool() as translators at a border crossing. You hand over your value in one language (type), and the translator hands back an equivalent value in another language (type). Some translations are impossible — handing 'hello' to the int() translator is like handing a poem to a customs officer who only speaks numbers.",
          explanation:
            "Conversion functions produce a new value of the target type. They do not modify the original value. If the input cannot be meaningfully represented in the target type, Python raises a ValueError or TypeError rather than guessing.",
        },

        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "### When conversions fail\n\nNot every string can be turned into a number. `int(\"hello\")` raises a `ValueError` because `\"hello\"` has no numeric meaning. The same happens with `float(\"abc\")`. `int(\"3.14\")` also fails — it cannot parse a decimal string directly even though 3.14 is a valid float. You must convert via float first: `int(float(\"3.14\"))` gives `3`.",
        },
        {
          kind: "code",
          language: "python",
          code: '# Successful conversions\nprint(int("42"))       # 42\nprint(float("3.14"))   # 3.14\nprint(str(100))        # 100\nprint(int(9.9))        # 9  (truncates)\nprint(bool(0))         # False\nprint(bool(1))         # True\n\n# Chain conversion: string decimal → int\nprint(int(float("3.14")))   # 3\n\n# These would crash (do not uncomment):\n# int("hello")    # ValueError\n# float("abc")    # ValueError\n# int("3.14")     # ValueError — use int(float("3.14")) instead',
          caption: "Successful conversions and the two-step trick for string decimals.",
        },

        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "Breakdown: forgetting to convert before concatenation",
          body: "The error 'TypeError: can only concatenate str (not \"int\") to str' almost always means you tried to join a number into a string using + without converting first. Fix: wrap the number in str() before concatenating, or use an f-string which handles conversion automatically.",
        },
        {
          kind: "comparison",
          leftLabel: "Correct: convert before concatenating",
          rightLabel: "Broken: mixing str and int with +",
          leftCode: 'answer = 42\nprint("The answer is " + str(answer))\n# Works: "The answer is 42"',
          rightCode: 'answer = 42\nprint("The answer is " + answer)\n# TypeError: can only concatenate\n# str (not "int") to str',
          caption: "str() converts the int to a string so + can join two strings together.",
        },

        /* SECTION 6 — WHY MATTERS */
        {
          kind: "why-matters",
          body: "Type conversion is one of the most frequently used tools in practical Python programs. Every time a user types something, you receive a string — and almost always need to convert it. Every time you build a message that includes a calculated value, str() or an f-string is involved. The next lesson, truthiness, builds on bool() and shows how Python evaluates any value as true or false in a condition.",
        },

        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A program receives two strings from user input: `a = \"7\"` and `b = \"3\"`. The developer writes `print(a + b)` expecting `10` but gets `73`. Explain why, then rewrite the line to print the correct arithmetic result `10`.",
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
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "You already know that `if` statements run their block when the condition is `True`. But Python goes further: you can use *any* value as a condition — not just an actual bool. Python has rules for which values count as 'yes' and which count as 'no'. This is called truthiness, and knowing it lets you write shorter, more readable conditions.",
        },

        /* SECTION 2 — PREREQUISITES */
        {
          kind: "text",
          markdown:
            "### Quick recap: booleans and conditions\n\nA condition in an `if` statement must resolve to either `True` or `False`. You have used comparison expressions like `age >= 18` for this. Python can also evaluate a plain value — a string, a number, even `None` — as if it were a bool. The `bool()` function shows you what Python decides.",
        },

        /* SECTION 3 — CORE CONCEPT: truthiness */
        {
          kind: "text",
          markdown:
            "### The need to use values directly as conditions\n\nYou often want to check 'do we have anything here?' rather than 'is this equal to some specific value?'. For example: 'is username non-empty?' Written as a comparison: `if username != \"\"`. But Python lets you write `if username:` instead, because any non-empty string is automatically treated as True in a boolean context.\n\nThis automatic treatment of values as True or False is called **truthiness**. Every Python value is either *truthy* (acts like True) or *falsy* (acts like False).\n\n**Falsy values** — the complete list:\n- `False`\n- `0` and `0.0` (any numeric zero)\n- `\"\"` (empty string)\n- `None`\n- `[]` (empty list), `{}` (empty dict), `()` (empty tuple)\n\n**Everything else is truthy** — including `-1`, `\"False\"` (a non-empty string), `[0]` (a list with one item).",
        },
        {
          kind: "code",
          language: "python",
          code: '# Setup: checking truthiness of a range of values with bool()\nvalues = [0, 1, -1, "", "hello", None, 0.0, 3.14, [], [1]]\nfor v in values:\n    print(f"bool({v!r:10}) = {bool(v)}")',
          caption:
            "A: Iterates over a mix of values to show which are falsy and which are truthy. B: The example. C: 0, -0.0, empty string, None, and empty list are all False; everything else is True. D: What does bool('False') return? True — because 'False' is a non-empty string, regardless of its content.",
        },
        {
          kind: "mental-model",
          title: "Truthiness — emptiness vs presence",
          analogy:
            "Think of values like containers. An empty container — empty string, empty list, zero, None — has nothing in it. Python reads that as 'no'. A container with anything in it at all — even a single character, a negative number, a list with one item — Python reads as 'yes'.",
          explanation:
            "The falsy values are exactly the ones that represent emptiness, absence, or nothingness in their respective types. Everything that represents any kind of presence or content is truthy. This makes `if x:` a natural way to ask 'does x have anything meaningful in it?'",
        },

        /* SECTION 4 — VARIATION: idiomatic use */
        {
          kind: "text",
          markdown:
            "### Using truthiness in conditions\n\nBecause of truthiness, many checks that beginners write with explicit comparisons can be shortened to the value itself. Python developers strongly prefer the shorter form because it reads more like plain English.",
        },
        {
          kind: "comparison",
          leftLabel: "Idiomatic (uses truthiness)",
          rightLabel: "Verbose (explicit comparison)",
          leftCode: 'username = "alice"\nif username:\n    print("Welcome!")\n\nitems = []\nif not items:\n    print("Cart is empty")',
          rightCode: 'username = "alice"\nif username != "":\n    print("Welcome!")\n\nitems = []\nif items == []:\n    print("Cart is empty")',
          caption:
            "Both versions work identically. The idiomatic form on the left is what experienced Python developers write.",
        },

        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "Breakdown: the string \"False\" is truthy",
          body: "A very common trap: `\"False\"` (the string) is truthy because it is a non-empty string. If you receive user input and the user types 'False', `if user_input:` will be True. Always convert and compare properly: `if user_input.lower() == \"false\":`. Truthiness is about emptiness and zero — not about content.",
        },
        {
          kind: "code",
          language: "python",
          code: '# The trap: string "False" is truthy\nuser_input = "False"\n\nif user_input:\n    print("This runs!")   # <-- prints, even though input says "False"\n\n# Correct way to handle a "false" string\nif user_input.lower() == "false":\n    print("User said false")   # correct check',
          caption: "Non-empty strings are always truthy, regardless of what they contain.",
        },

        /* SECTION 6 — WHY MATTERS */
        {
          kind: "why-matters",
          body: "Truthiness is used constantly in real Python code. It makes conditions more readable and reduces the number of explicit comparisons you need to write. With truthiness understood, you are fully equipped for Stage 4 where every if statement, while loop, and for loop relies on values being evaluated as True or False. You now know all of Python's core types and how they behave.",
        },

        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A program has `count = 0` and runs `if count: print(\"items found\") else: print(\"nothing\")`. Later, `count` is changed to `0.0`. Which branch runs in each case, and why? What value of `count` would make the first branch run?",
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
