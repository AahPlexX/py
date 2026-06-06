import type { Stage } from "@/course/course.schema";

export const stage07 = {
  id: "stage-07",
  number: 7,
  title: "Errors and Debugging",
  summary:
    "Read Python tracebacks confidently, use try/except, validate inputs, and debug systematically.",
  level: "intermediate",
  masteryGateConceptIds: [
    "traceback",
    "exception",
    "try-except",
    "raise",
    "input-validation",
    "debugging-strategy",
  ],
  lessons: [
    /* ── Lesson 1 ── */
    {
      id: "s7-reading-tracebacks",
      stageId: "stage-07",
      title: "Reading Tracebacks",
      kind: "debugging",
      difficulty: "intermediate",
      objectives: [
        "Identify the three key parts of a traceback: call stack, line number, and exception message",
        "Read a traceback bottom-up to find the root cause",
        "Distinguish the exception type from the human-readable message",
      ],
      prerequisites: ["s6-comprehensions"],
      concepts: ["traceback", "exception"],
      contentBlocks: [
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## Why Python prints an error report\n\nImagine your program is a series of people passing a box down a line. One person drops the box. You need to know: *who* dropped it, *where* they were standing, and *why* they dropped it. Python prints exactly that information every time something goes wrong — it is not an accusation, it is a map to the problem.\n\nWithout this map, fixing a bug would mean reading every line of code hoping to spot the mistake. With the map, you go straight to the right place.",
        },
        /* SECTION 2 — PREREQUISITES */
        {
          kind: "mental-model",
          title: "Functions Call Other Functions",
          analogy:
            "Think of a manager who asks a supervisor who asks a worker to complete a task. If the worker fails, the failure travels back up: worker → supervisor → manager. Python records that same chain.",
          explanation:
            "When one function calls another, Python keeps a record of the full chain. If the innermost call fails, Python can show you every step of the chain that led there. This record is called the call stack.",
        },
        /* SECTION 3 — CORE CONCEPTS: traceback */
        {
          kind: "text",
          markdown:
            "## The need: knowing exactly where and why the program stopped\n\nWhen a Python program encounters something it cannot handle — dividing by zero, using a name that doesn't exist, accessing a list position that isn't there — it stops immediately. Without any additional information you would only know the program stopped; you would have no idea where or why.\n\nPython solves this by printing a structured error report every time it stops. This report is called a **traceback**.\n\nA traceback always has the same shape:\n\n```\nTraceback (most recent call last):\n  File \"script.py\", line N, in <function_name>\n    the line of code that was running\nExceptionType: a human-readable message\n```\n\nThe phrase \"most recent call last\" means the earliest function call is listed first, and the line that actually crashed is shown last — just above the final error line. **Read the traceback from the bottom up.** The last two lines tell you what went wrong. The lines above tell you how the program got there.",
        },
        {
          kind: "code",
          language: "python",
          code: `def divide(a, b):
    return a / b          # this line will crash when b is 0

def main():
    result = divide(10, 0)  # calls divide with a zero divisor
    print(result)

main()                    # program starts here`,
          caption:
            "SETUP: This example shows a division by zero that travels through two function calls before crashing. Watch how the traceback captures the entire chain.",
        },
        {
          kind: "output",
          text: `Traceback (most recent call last):
  File "script.py", line 8, in <module>
    main()
  File "script.py", line 5, in main
    result = divide(10, 0)
  File "script.py", line 2, in divide
    return a / b
ZeroDivisionError: division by zero`,
          isError: true,
        },
        {
          kind: "text",
          markdown:
            "**Step-by-step narration of the traceback above:**\n\n1. Line 8 — `main()` was called at the top level (the `<module>` entry).\n2. Line 5 — inside `main`, `divide(10, 0)` was called.\n3. Line 2 — inside `divide`, `return a / b` tried to divide 10 by 0 and failed.\n4. Final line — `ZeroDivisionError: division by zero` tells you the category of error (`ZeroDivisionError`) and a plain description (`division by zero`).\n\n**Variation:** What would happen if you called `divide(10, 2)` instead? The division would succeed (result = 5.0), no traceback would appear, and `print(result)` would print `5.0`.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always read the last line first",
          body: "The final line of a traceback — the one that starts with the exception type — is the most important. It tells you the category of error and a plain-English description. Once you know the category, scan upward to find the line number in your own code.",
        },
        /* SECTION 3 — CORE CONCEPTS: exception */
        {
          kind: "text",
          markdown:
            "## The name for the kind of thing that went wrong\n\nNot all errors are the same. Dividing by zero is different from using a name that was never defined, which is different from asking for item number 10 in a list that only has 3 items. Python names each category of error. These categories are called **exceptions**.\n\nEvery traceback ends with an exception name followed by a colon and a message. The exception name tells you the *category* of problem. The message tells you the *specifics*.\n\n| Part of last line | Meaning |\n|---|---|\n| `ZeroDivisionError` | the exception type (category) |\n| `division by zero` | the message (specifics) |",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Traceback parts at a glance",
          body: "File name and line number → WHERE it happened. The indented code line → WHAT was executing. Exception type → WHAT CATEGORY of problem. Exception message → WHY it failed.",
        },
        {
          kind: "glossary-term",
          term: "traceback",
          definition:
            "The error report Python prints when an unhandled exception occurs. It shows the call stack (most recent frame last) and the exception type and message.",
          example: "Traceback (most recent call last):\n  File ...\nValueError: ...",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "## Tracebacks across multiple files\n\nWhen your program uses multiple files or modules, the traceback will list entries from different files. The same bottom-up reading rule applies: start at the last line and work upward. Your own code files are usually the most useful entries; standard library lines near the bottom often just show the internal machinery.",
        },
        /* SECTION 5 — BREAKDOWN CASES */
        {
          kind: "callout",
          variant: "danger",
          title: "Skimming the traceback and guessing",
          body: "A common mistake is to glance at the traceback, assume you know the problem, and start changing code. This almost always wastes time. The traceback tells you the exact line and the exact category. Read the last line completely before touching anything.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Once you can read a traceback confidently, debugging transforms from a guessing game into a directed search. You know the exception category, the file, and the line — you go there, you fix it. The next lesson names the most common exception categories so that reading the last line of any traceback becomes instant recognition.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A colleague shows you a traceback. The last line is: `AttributeError: 'NoneType' object has no attribute 'upper'`. The line above it shows: `File \"utils.py\", line 14, in format_name` and the code `return name.upper()`. What does this tell you about the value of `name`, and what should you check in the code that calls `format_name`?",
        },
      ],
      interactions: [
        {
          id: "s7-rt-mc-1",
          kind: "multiple-choice",
          prompt:
            "Given this traceback, what is the most likely cause of the error?\n\n```\nTraceback (most recent call last):\n  File \"app.py\", line 12, in process\n    total = items[5]\nIndexError: list index out of range\n```",
          beginnerPurpose:
            "Practice reading the exception type and message to diagnose the error.",
          expectedConceptIds: ["traceback", "exception"],
          options: [
            {
              id: "s7-rt-mc-1-a",
              text: "The variable 'items' has not been defined yet.",
              isCorrect: false,
              explanation:
                "An undefined variable would cause a NameError, not an IndexError.",
            },
            {
              id: "s7-rt-mc-1-b",
              text: "The list 'items' has fewer than 6 elements, so index 5 does not exist.",
              isCorrect: true,
              explanation:
                "IndexError: list index out of range means the index used (5) is beyond the list's length.",
            },
            {
              id: "s7-rt-mc-1-c",
              text: "The value at index 5 is the wrong type.",
              isCorrect: false,
              explanation:
                "A wrong type would cause a TypeError. IndexError means the index itself is invalid.",
            },
            {
              id: "s7-rt-mc-1-d",
              text: "items is a dict, not a list.",
              isCorrect: false,
              explanation:
                "Accessing a missing key in a dict raises KeyError, not IndexError.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Read the last line first: exception type is 'IndexError', message is 'list index out of range'.",
            },
          ],
          feedback: {
            correct:
              "Correct! IndexError means the index is out of bounds — items has at most 5 elements (indices 0–4).",
            incorrect:
              "Focus on the exception type: IndexError means the index used doesn't exist in the list.",
          },
        },
        {
          id: "s7-rt-explain-1",
          kind: "plain-language-explain",
          prompt:
            "Describe what this traceback is telling you. What went wrong, where, and what should you check to fix it?",
          beginnerPurpose:
            "Build the habit of narrating a traceback before jumping to a fix.",
          expectedConceptIds: ["traceback"],
          code: `Traceback (most recent call last):
  File "grader.py", line 20, in calculate_grade
    percentage = score / total
TypeError: unsupported operand type(s) for /: 'str' and 'int'`,
          keyPointsToHit: [
            "The error is a TypeError",
            "It occurred on line 20 in the calculate_grade function",
            "The division operator / received a string and an int",
            "score is likely a string that should be converted to a number",
          ],
          sampleAnswer:
            "A TypeError occurred on line 20 inside calculate_grade. Python tried to divide two values but one of them was a string instead of a number. The variable 'score' is probably a string (perhaps from user input) and needs to be converted with int() or float() before dividing.",
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Read bottom-up: exception type first, then line number, then the actual code statement.",
            },
          ],
          feedback: {
            correct:
              "Excellent! You identified the exception type, location, and probable fix.",
            incorrect:
              "Mention: what exception type? Which line? What does the message say about the types involved?",
          },
        },
        {
          id: "s7-rt-fill-1",
          kind: "fill-code",
          prompt:
            "The traceback says 'NameError: name \\'greet\\' is not defined' on line 4. Complete line 4 so it correctly calls the function defined on line 1.",
          beginnerPurpose:
            "Translate a traceback's error message into a code fix.",
          expectedConceptIds: ["traceback"],
          codeTemplate: `def greet(name):
    print("Hello,", name)

___greet___("World")`,
          blanks: [
            {
              placeholder: "___greet___",
              answer: "greet",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "NameError means the name used doesn't exist. The function is defined as 'greet'.",
            },
          ],
          feedback: {
            correct:
              "Correct! The NameError was caused by a misspelled or missing function name.",
            incorrect:
              "The function is defined as 'greet' on line 1. Make sure the call uses the same name.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "traceback",
          recallPrompt:
            "In what order do you read a traceback, and what does the last line always tell you?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s7-rt-mc-1",
          "s7-rt-explain-1",
          "s7-rt-fill-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["traceback"],
      },
    },

    /* ── Lesson 2 ── */
    {
      id: "s7-common-exceptions",
      stageId: "stage-07",
      title: "Common Python Exceptions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Name at least six common Python exception types and their usual causes",
        "Match a code snippet to the exception it will raise",
        "Fix each type of error correctly",
      ],
      prerequisites: ["s7-reading-tracebacks"],
      concepts: ["exception"],
      contentBlocks: [
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## Why exceptions have names\n\nNot all problems are the same. Asking for something that doesn't exist is different from combining the wrong kinds of data, which is different from misspelling a variable name. If every error produced the same generic message, you would have to guess the category of problem from scratch every time.\n\nPython solves this by giving every category of error its own name. When you see that name in a traceback, you immediately know the category of problem — and the category tells you where to look and what to fix.",
        },
        /* SECTION 2 — PREREQUISITES */
        {
          kind: "mental-model",
          title: "Exception Names Are Diagnostic Categories",
          analogy:
            "A doctor doesn't just say 'you're sick' — they name the condition: 'you have a fracture', 'you have an infection'. The name tells them and you what treatment is needed. Exception names work the same way.",
          explanation:
            "Each exception type corresponds to a specific category of programming mistake. Recognising the type instantly suggests the fix, just as a medical diagnosis suggests a treatment.",
        },
        /* SECTION 3 — CORE CONCEPTS: exception types */
        {
          kind: "text",
          markdown:
            "## TypeError — combining incompatible kinds of data\n\n**The need:** Sometimes you write code that tries to combine a number and a piece of text, or call a function with arguments it cannot process. Python catches this before producing a nonsensical result.\n\n**Plain construction:** Python checks that the kinds of data involved in an operation are compatible. If they are not — for example, adding a number to a piece of text — Python stops immediately with a message naming the incompatible kinds.\n\n**The name:** This category of error is called a `TypeError`.",
        },
        {
          kind: "code",
          language: "python",
          code: `# SETUP: What happens when you mix str and int with +
result = "score: " + 42   # Python cannot add str and int`,
          caption:
            "SETUP: This shows a TypeError caused by trying to concatenate a string and an integer.",
        },
        {
          kind: "output",
          text: `TypeError: can only concatenate str (not "int") to str`,
          isError: true,
        },
        {
          kind: "text",
          markdown:
            "**Variation:** What would happen if you wrote `\"score: \" + str(42)` instead? The `str()` function converts the integer `42` to the string `\"42\"`, so the concatenation would succeed and produce `\"score: 42\"` with no error.\n\n---\n\n## ValueError — the right kind, but an impossible value\n\n**The need:** Sometimes the kind of data is correct but the specific value cannot be used as requested. A string is the right kind to pass to `int()`, but the string `\"hello\"` cannot be turned into a whole number.\n\n**Plain construction:** Python checks not only that the kind of data is right, but that the specific value makes sense for the operation. When it does not, Python stops with a message describing the mismatch.\n\n**The name:** This category is called a `ValueError`.",
        },
        {
          kind: "code",
          language: "python",
          code: `# ValueError — right kind (str), bad value
number = int("abc")   # "abc" cannot be parsed as an integer`,
          caption:
            "SETUP: int() accepts strings, but only strings that contain a valid integer literal.",
        },
        {
          kind: "output",
          text: `ValueError: invalid literal for int() with base 10: 'abc'`,
          isError: true,
        },
        {
          kind: "text",
          markdown:
            "**Variation:** What would happen if you wrote `int(\"42\")` instead? `\"42\"` is a valid integer string, so `int()` would return the integer `42` with no error.\n\n---\n\n## The other common exception types\n\nBeyond TypeError and ValueError, four more exceptions cover the vast majority of bugs you will encounter:\n\n| Exception | Typical cause | Quick fix |\n|---|---|---|\n| `NameError` | Using a name that was never defined or was misspelled | Check spelling; ensure the variable is defined before use |\n| `IndexError` | Accessing a list position that does not exist | Check list length before indexing |\n| `KeyError` | Accessing a dictionary key that does not exist | Use `.get()` or check `key in dict` first |\n| `ZeroDivisionError` | Dividing by zero | Guard with `if divisor != 0` |",
        },
        {
          kind: "code",
          language: "python",
          code: `# NameError — typo or missing definition
print(mesage)              # intended: message (not defined)

# IndexError — out of range
items = [1, 2, 3]
print(items[10])           # only indices 0, 1, 2 exist

# KeyError — missing dict key
d = {"a": 1}
print(d["b"])              # "b" is not a key in d

# ZeroDivisionError
x = 10 / 0                # denominator must not be zero`,
          caption:
            "SETUP: Each exception type signals a distinct and diagnosable category of mistake.",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "comparison",
          leftLabel: "TypeError",
          rightLabel: "ValueError",
          leftCode: `# Wrong KIND of data
"age: " + 30
# str + int is not allowed`,
          rightCode: `# Right kind, wrong VALUE
int("thirty")
# str is right, "thirty" can't be int`,
          caption:
            "TypeError and ValueError are the two most commonly confused exceptions. The distinction is: kind vs value.",
        },
        /* SECTION 5 — BREAKDOWN CASES */
        {
          kind: "callout",
          variant: "danger",
          title: "Confusing TypeError and ValueError",
          body: "A common mistake is to add explicit type conversion when the real problem is a bad value. For example, if `int('abc')` raises ValueError, converting the result of int() to int again does not help — the value 'abc' is simply not a valid integer. The fix is to validate the string before calling int(), not to wrap the result.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Recognising exception types instantly cuts debugging time in half. When you see 'TypeError', you think 'type mismatch — what kinds am I combining?' When you see 'KeyError', you think 'that key is absent — use .get() or check first.' The next lesson shows you how to write code that catches these exceptions and handles them gracefully instead of crashing.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A function receives a string `s` from user input and runs `result = float(s) / 2`. The user types the word 'half'. Without running the code, name the exception type that will be raised and explain which part of the expression causes it.",
        },
      ],
      interactions: [
        {
          id: "s7-ce-mc-1",
          kind: "multiple-choice",
          prompt:
            "What exception does `int('3.14')` raise?",
          beginnerPurpose:
            "Distinguish ValueError (right type, bad value) from TypeError.",
          expectedConceptIds: ["exception"],
          options: [
            {
              id: "s7-ce-mc-1-a",
              text: "TypeError",
              isCorrect: false,
              explanation:
                "TypeError occurs when you pass the wrong *type*. int() accepts a string — that's the right type. The issue is that '3.14' can't be parsed as an integer.",
            },
            {
              id: "s7-ce-mc-1-b",
              text: "ValueError",
              isCorrect: true,
              explanation:
                "int() expects a string that represents a whole number. '3.14' is a valid string but not a valid integer literal, so Python raises ValueError.",
            },
            {
              id: "s7-ce-mc-1-c",
              text: "NameError",
              isCorrect: false,
              explanation:
                "NameError is raised when a name (variable/function) isn't defined, not for conversion issues.",
            },
            {
              id: "s7-ce-mc-1-d",
              text: "SyntaxError",
              isCorrect: false,
              explanation:
                "SyntaxError is raised before the code runs when Python can't parse it. int('3.14') is syntactically valid.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "ValueError means the type is correct (string) but the value can't be used as requested.",
            },
          ],
          feedback: {
            correct:
              "Correct! int() accepts strings, but '3.14' contains a decimal point — not a valid integer.",
            incorrect:
              "The type (str) is fine for int(). The problem is the value '3.14' can't be an integer.",
          },
        },
        {
          id: "s7-ce-debug-1",
          kind: "debug-code",
          prompt:
            "This code raises a TypeError. Fix it so it prints the correct message.",
          beginnerPurpose:
            "Apply the fix for a TypeError caused by mixing str and int.",
          expectedConceptIds: ["exception"],
          brokenCode: `age = 25
print("You are " + age + " years old.")`,
          bugDescription:
            "The + operator cannot concatenate a str and an int directly. Convert age to str with str() before concatenating.",
          fixedCode: `age = 25
print("You are " + str(age) + " years old.")`,
          errorType: "TypeError",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "Python won't automatically convert an int to a str for concatenation. You must do it explicitly.",
            },
            {
              level: "syntax",
              text: "Wrap age in str(): str(age) gives '25' as a string.",
            },
          ],
          feedback: {
            correct:
              "Correct! str(age) converts the integer to a string so it can be concatenated.",
            incorrect:
              "Change 'age' to 'str(age)' inside the print call, or use an f-string: f'You are {age} years old.'",
          },
        },
        {
          id: "s7-ce-predict-1",
          kind: "predict-output",
          prompt:
            "Will this code run without error? If not, type the name of the exception it raises.",
          beginnerPurpose:
            "Recognise a ZeroDivisionError from reading code before running it.",
          expectedConceptIds: ["exception"],
          code: `def average(numbers):
    return sum(numbers) / len(numbers)

print(average([]))`,
          expectedOutput: "ZeroDivisionError: division by zero",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "What is len([])? What happens when you divide by that value?",
            },
          ],
          feedback: {
            correct:
              "Correct! len([]) == 0, so the division is sum([]) / 0, which raises ZeroDivisionError.",
            incorrect:
              "trace the call: numbers=[], sum([])=0, len([])=0, then 0/0 — what does Python do?",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "exception",
          recallPrompt:
            "Without looking, name 6 common Python exception types and give one cause for each.",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s7-ce-mc-1",
          "s7-ce-debug-1",
          "s7-ce-predict-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["exception"],
      },
    },

    /* ── Lesson 3 ── */
    {
      id: "s7-try-except",
      stageId: "stage-07",
      title: "Handling Exceptions with try/except",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write a try/except block to catch a specific exception",
        "Use the else clause for code that runs only if no exception occurred",
        "Use finally for cleanup code that always runs",
        "Avoid bare except clauses and explain why they are dangerous",
      ],
      prerequisites: ["s7-common-exceptions"],
      concepts: ["try-except"],
      contentBlocks: [
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## The problem: programs that crash on predictable failures\n\nSome failures are completely predictable. A user might type text where a number is expected. A file might not exist. A network request might time out. Without a way to intercept these failures, even a small unexpected input crashes the entire program and shows the user a raw, confusing error report.\n\nWhat we want instead is to anticipate the failure, catch it, and respond with a sensible message or a fallback action — all without stopping the program.",
        },
        /* SECTION 2 — PREREQUISITES */
        {
          kind: "mental-model",
          title: "Exceptions Travel Up the Call Stack",
          analogy:
            "Imagine an exception as a hot potato thrown by the line that failed. It travels upward through every calling function. If no function catches it, it reaches the top and the program crashes with a traceback. If any function along the way is ready to catch it, the crash is prevented.",
          explanation:
            "A try/except block is the 'catch' mechanism. When an exception occurs inside the try block, Python looks immediately for a matching except clause. If it finds one, execution jumps to that clause instead of crashing.",
        },
        /* SECTION 3 — CORE CONCEPTS: try/except */
        {
          kind: "text",
          markdown:
            "## Wrapping risky code in a safety net\n\n**The need:** You need to run code that might fail, but you want to control what happens if it does — not let the program crash.\n\n**Plain construction:** You mark the risky code with a special label saying 'try this'. Immediately after, you specify what to do if a particular named failure occurs. If the failure happens, execution jumps to the response section. If no failure happens, the response section is skipped.\n\n**The name:** This pattern is called a `try/except` block. The risky code goes inside the `try` section. The response goes inside the `except` section.",
        },
        {
          kind: "code",
          language: "python",
          code: `def safe_divide(a, b):
    try:
        result = a / b          # risky: might divide by zero
    except ZeroDivisionError:   # only runs if that specific error occurred
        print("Cannot divide by zero!")
        return None
    else:
        print("Success!")       # only runs if NO exception occurred
        return result
    finally:
        print("Division attempted.")  # ALWAYS runs, error or not

print(safe_divide(10, 2))
print(safe_divide(5, 0))`,
          caption:
            "SETUP: This example shows all four clauses of a try block. Notice which lines print for each call.",
        },
        {
          kind: "output",
          text: "Success!\nDivision attempted.\n5.0\nCannot divide by zero!\nDivision attempted.\nNone",
          isError: false,
        },
        {
          kind: "text",
          markdown:
            "**Step-by-step narration:**\n\nFirst call — `safe_divide(10, 2)`:\n1. `try` block runs; `10 / 2` succeeds, result is `5.0`.\n2. No exception → `except` is skipped.\n3. `else` runs and prints `Success!`.\n4. `finally` always runs and prints `Division attempted.`\n5. `5.0` is returned and printed.\n\nSecond call — `safe_divide(5, 0)`:\n1. `try` block runs; `5 / 0` raises `ZeroDivisionError`.\n2. `except ZeroDivisionError` matches → prints `Cannot divide by zero!`, returns `None`.\n3. `else` is skipped (an exception occurred).\n4. `finally` always runs and prints `Division attempted.`\n5. `None` is returned and printed.\n\n**Variation:** What would happen if you replaced `ZeroDivisionError` with `ValueError` in the except line? The division-by-zero error would not be caught (wrong exception type), so the program would still crash with a traceback.",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "## Catching multiple exception types\n\nYou can catch more than one exception type in a single except clause by grouping them in parentheses:\n\n```python\ntry:\n    value = int(input(\"Enter a number: \"))\nexcept (ValueError, TypeError):\n    print(\"Please enter a valid integer.\")\n```\n\nYou can also use multiple except clauses to handle different types differently:\n\n```python\ntry:\n    result = int(text) / divisor\nexcept ValueError:\n    print(\"Not a valid number\")\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero\")\n```",
        },
        /* SECTION 5 — BREAKDOWN CASES */
        {
          kind: "callout",
          variant: "danger",
          title: "Never use a bare except:",
          body: "A bare `except:` with no exception type catches everything — including KeyboardInterrupt (Ctrl+C) and SystemExit. This makes programs impossible to stop and silently hides completely different bugs. Always name the specific exception: `except ValueError:` or `except (TypeError, ValueError):`.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Unhandled exceptions crash programs and expose raw error messages to users. With try/except, you can recover gracefully, show helpful messages, and continue running when expected failure modes occur. The next lesson takes this further — you will learn how to intentionally raise exceptions yourself to signal invalid inputs.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A function opens a database connection inside a try block. The connection must always be closed, whether the operation succeeds or fails. Which clause — else or finally — should contain the close() call, and why?",
        },
      ],
      interactions: [
        {
          id: "s7-te-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Trace the flow through try/except to understand when each branch runs.",
          expectedConceptIds: ["try-except"],
          code: `def parse_int(s):
    try:
        return int(s)
    except ValueError:
        return -1

print(parse_int("42"))
print(parse_int("hello"))
print(parse_int("0"))`,
          expectedOutput: "42\n-1\n0",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "int('42') succeeds and returns 42. int('hello') raises ValueError so the except branch runs. int('0') succeeds.",
            },
          ],
          feedback: {
            correct:
              "Correct! '42' → 42, 'hello' triggers ValueError → -1, '0' → 0.",
            incorrect:
              "Trace each call: int('42')=42 (no error), int('hello')=ValueError (returns -1), int('0')=0 (no error).",
          },
        },
        {
          id: "s7-te-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the try/except block so that a ZeroDivisionError is caught and 'Error: divide by zero' is printed.",
          beginnerPurpose:
            "Practice writing a complete try/except that catches a named exception.",
          expectedConceptIds: ["try-except"],
          codeTemplate: `def divide(a, b):
    try:
        return a / b
    ___except___ ZeroDivisionError:
        print("Error: divide by zero")
        return 0

print(divide(10, 0))`,
          blanks: [
            {
              placeholder: "___except___",
              answer: "except",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The keyword that catches exceptions is 'except', followed by the exception type.",
            },
          ],
          feedback: {
            correct:
              "Correct! 'except ZeroDivisionError:' catches only that specific exception.",
            incorrect:
              "The keyword is 'except'. It must precede the exception type name.",
          },
        },
        {
          id: "s7-te-debug-1",
          kind: "debug-code",
          prompt:
            "This code uses a bare except which is dangerous. Refactor it to catch only ValueError.",
          beginnerPurpose:
            "Understand why bare except is bad and practice specifying exception types.",
          expectedConceptIds: ["try-except"],
          brokenCode: `def get_number(text):
    try:
        return int(text)
    except:
        return 0`,
          bugDescription:
            "A bare 'except:' catches all exceptions, including KeyboardInterrupt and SystemExit, making the program hard to stop and masking unexpected bugs. Specify 'except ValueError:' to only handle conversion failures.",
          fixedCode: `def get_number(text):
    try:
        return int(text)
    except ValueError:
        return 0`,
          errorType: "logic",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "Add the exception type after 'except': 'except ValueError:' catches only conversion errors.",
            },
          ],
          feedback: {
            correct:
              "Correct! Naming the exception type makes error handling safe and explicit.",
            incorrect:
              "Replace bare 'except:' with 'except ValueError:' to catch only the expected conversion error.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "try-except",
          recallPrompt:
            "What is the difference between the else and finally clauses in a try/except block?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s7-te-predict-1",
          "s7-te-fill-1",
          "s7-te-debug-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["try-except"],
      },
    },

    /* ── Lesson 4 ── */
    {
      id: "s7-raising-exceptions",
      stageId: "stage-07",
      title: "Raising and Validating",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Use the raise statement to throw an exception with a descriptive message",
        "Apply the guard clause pattern to validate function inputs early",
        "Use assert for internal consistency checks during development",
      ],
      prerequisites: ["s7-try-except"],
      concepts: ["raise", "input-validation"],
      contentBlocks: [
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## The problem: bad inputs causing confusing failures deep inside functions\n\nImagine a function that calculates a discount. If someone passes a negative price, the function might silently return a negative discount and the bug only surfaces two screens later when a payment amount looks wrong. The further from the source the error is detected, the harder it is to diagnose.\n\nThe solution is to detect bad inputs at the very entrance of a function and stop immediately with a clear, descriptive message. This moves the error message from a confusing crash deep in the code to a precise explanation at the function boundary.",
        },
        /* SECTION 2 — PREREQUISITES */
        {
          kind: "mental-model",
          title: "Guard Clauses: Check Before Proceeding",
          analogy:
            "A nightclub bouncer checks your ID at the door. If you do not meet the requirements, you are turned away immediately — you do not get inside only to be removed from the dance floor ten minutes later. A guard clause is a bouncer at the start of a function.",
          explanation:
            "Guard clauses sit at the top of a function and check every precondition. If any check fails, the function raises an exception immediately and returns nothing. This means that any code after the guard clauses can safely assume the inputs are valid.",
        },
        /* SECTION 3 — CORE CONCEPTS: raise */
        {
          kind: "text",
          markdown:
            "## Deliberately triggering an exception\n\n**The need:** You want to stop execution and communicate to the caller that the input they provided is unacceptable — and you want to say exactly what is wrong.\n\n**Plain construction:** You write a statement that says 'stop here and report this specific problem with this specific message.' The statement provides both the category of problem and a human-readable explanation.\n\n**The name:** This statement is called `raise`. The syntax is:\n\n```python\nraise ExceptionType(\"descriptive message\")\n```\n\nYou can raise any of the built-in exception types. `ValueError` is the most appropriate for invalid values; `TypeError` for wrong types.",
        },
        {
          kind: "code",
          language: "python",
          code: `def set_age(age):
    # Guard clauses — check inputs before doing anything else
    if age < 0:
        raise ValueError(f"age must be non-negative, got {age}")
    if age > 150:
        raise ValueError(f"age {age} is unrealistically large")
    return age   # only reached when both checks pass

print(set_age(25))    # 25
set_age(-5)           # raises ValueError immediately`,
          caption:
            "SETUP: Guard clauses at the top of a function raise ValueError immediately when the input violates the contract.",
        },
        {
          kind: "output",
          text: "25\nValueError: age must be non-negative, got -5",
          isError: true,
        },
        {
          kind: "text",
          markdown:
            "**Step-by-step narration:**\n\n1. `set_age(25)` — `25 >= 0` passes, `25 <= 150` passes, returns `25`.\n2. `set_age(-5)` — `-5 < 0` is True, so `raise ValueError(...)` is reached immediately. Python stops, creates a ValueError with the message `age must be non-negative, got -5`, and propagates it upward.\n\n**Variation:** What would happen if the raise statement were at the *end* of the function instead of the beginning? Bad inputs would still trigger the exception, but all the code between the start and the raise would run first — potentially doing partial work on invalid data before stopping.",
        },
        /* SECTION 3 — CORE CONCEPTS: assert */
        {
          kind: "text",
          markdown:
            "## assert — checking your own internal assumptions\n\n**The need:** While writing a function, you sometimes want to document an assumption you are relying on — for example, 'at this point in the code, this list should never be empty'. You want Python to immediately alert you if that assumption turns out to be wrong during development.\n\n**Plain construction:** You write a check that says 'this must be true — if it is not, something in my own logic is wrong'. Unlike a guard clause for user inputs, this check is aimed at catching mistakes in your own code during development.\n\n**The name:** This check is called an `assert` statement:\n\n```python\nassert condition, \"message if condition is False\"\n```\n\nIf the condition is False, Python raises an `AssertionError`.",
        },
        {
          kind: "code",
          language: "python",
          code: `def average(numbers):
    assert len(numbers) > 0, "Cannot average an empty list"
    return sum(numbers) / len(numbers)

print(average([10, 20, 30]))  # 20.0
average([])                   # AssertionError: Cannot average an empty list`,
          caption:
            "SETUP: assert is a developer-facing check. It verifies your own logic, not user inputs.",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "comparison",
          leftLabel: "raise — for validating caller inputs",
          rightLabel: "assert — for checking your own assumptions",
          leftCode: `def set_price(price):
    if price < 0:
        raise ValueError(
            "price cannot be negative"
        )
    return price
# Always enforced, even in production`,
          rightCode: `def compute(items):
    assert len(items) > 0, (
        "items should never be empty here"
    )
    return sum(items)
# Can be disabled with python -O flag`,
          caption:
            "Use raise for anything a caller controls. Use assert for invariants about your own code's logic.",
        },
        /* SECTION 5 — BREAKDOWN CASES */
        {
          kind: "callout",
          variant: "danger",
          title: "Using assert for user input validation",
          body: "Python can be run with the -O (optimise) flag which disables all assert statements. If you use assert to validate user inputs, those checks silently disappear in optimised runs. Always use raise for any validation that must be enforced in production.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Raising descriptive exceptions at the boundary of your functions gives callers actionable error messages. 'ValueError: age must be non-negative, got -5' tells a developer exactly what to fix in about two seconds. A cryptic crash 20 lines later might take twenty minutes to trace back to its source. The next lesson builds on all of this — combining systematic debugging techniques with the reading and raising skills you now have.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "You are writing a function `calculate_discount(price, percent)`. The function should raise a ValueError if percent is outside 0–100. Write the guard clause (just the if/raise lines) from memory.",
        },
      ],
      interactions: [
        {
          id: "s7-ra-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the function by adding a guard clause that raises a ValueError if the divisor is zero.",
          beginnerPurpose:
            "Practice writing raise with a descriptive error message.",
          expectedConceptIds: ["raise", "input-validation"],
          codeTemplate: `def safe_divide(a, b):
    if b == 0:
        ___raise___ ValueError("divisor cannot be zero")
    return a / b

print(safe_divide(10, 2))`,
          blanks: [
            {
              placeholder: "___raise___",
              answer: "raise",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The keyword that triggers an exception is 'raise', followed by the exception and message.",
            },
          ],
          feedback: {
            correct:
              "Correct! raise ValueError('message') triggers a ValueError with a helpful message.",
            incorrect:
              "Use 'raise ValueError(\"divisor cannot be zero\")' to signal the invalid input.",
          },
        },
        {
          id: "s7-ra-predict-1",
          kind: "predict-output",
          prompt:
            "What is printed when this code runs? Include any exception output.",
          beginnerPurpose:
            "Trace a raise statement inside a function called inside a try/except.",
          expectedConceptIds: ["raise", "try-except"],
          code: `def validate_score(score):
    if score < 0 or score > 100:
        raise ValueError("score must be 0-100")
    return score

try:
    print(validate_score(85))
    print(validate_score(110))
except ValueError as e:
    print("Invalid:", e)`,
          expectedOutput: "85\nInvalid: score must be 0-100",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "validate_score(85) returns 85. validate_score(110) raises ValueError which the except block catches.",
            },
          ],
          feedback: {
            correct:
              "Correct! 85 is valid (prints 85), 110 > 100 raises ValueError caught by except.",
            incorrect:
              "First call: 85 is in range, prints 85. Second call: 110 > 100, raises ValueError. The except block prints 'Invalid: score must be 0-100'.",
          },
        },
        {
          id: "s7-ra-mc-1",
          kind: "multiple-choice",
          prompt:
            "When should you use `assert` instead of `raise ValueError`?",
          beginnerPurpose:
            "Understand the appropriate use cases for assert vs raise.",
          expectedConceptIds: ["raise"],
          options: [
            {
              id: "s7-ra-mc-1-a",
              text: "When validating user input from a web form or command line.",
              isCorrect: false,
              explanation:
                "assert can be disabled with the -O flag. External input must always be validated with explicit raise.",
            },
            {
              id: "s7-ra-mc-1-b",
              text: "When checking your own assumptions about internal program state during development.",
              isCorrect: true,
              explanation:
                "assert is meant for developer-facing checks. It signals 'this should never happen given correct logic.'",
            },
            {
              id: "s7-ra-mc-1-c",
              text: "When you want to provide a friendly error message to end users.",
              isCorrect: false,
              explanation:
                "User-facing errors should use raise with a clear message. AssertionError is a developer signal.",
            },
            {
              id: "s7-ra-mc-1-d",
              text: "When handling network timeouts or file not found errors.",
              isCorrect: false,
              explanation:
                "File/network errors are handled with try/except, not assert.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "assert is a development tool. raise is for enforcing contracts with callers.",
            },
          ],
          feedback: {
            correct:
              "Correct! assert is for documenting invariants about your own code, not for validating inputs.",
            incorrect:
              "assert can be disabled at runtime. For anything a caller controls, use raise.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "raise",
          recallPrompt:
            "Write from memory a guard clause that raises ValueError when a list is empty.",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "input-validation",
          recallPrompt:
            "What is the guard clause pattern and why should validation happen at the top of a function?",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s7-ra-fill-1",
          "s7-ra-predict-1",
          "s7-ra-mc-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["raise", "input-validation"],
      },
    },

    /* ── Lesson 5 ── */
    {
      id: "s7-debugging-strategy",
      stageId: "stage-07",
      title: "Debugging Systematically",
      kind: "debugging",
      difficulty: "intermediate",
      objectives: [
        "Apply print-based debugging to inspect variable values at runtime",
        "Reduce a bug to the smallest possible reproducing example",
        "Describe the rubber duck debugging technique",
        "Follow a systematic debugging sequence rather than guessing",
      ],
      prerequisites: ["s7-raising-exceptions"],
      concepts: ["debugging-strategy"],
      contentBlocks: [
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## The problem: bugs that resist guessing\n\nEvery developer eventually stares at a program that produces the wrong output, with no traceback, no obvious typo, and no clear idea what is wrong. The instinct is to start changing things at random and re-running, hoping something helps. This approach is slow, often introduces new bugs, and is demoralising.\n\nThe alternative is to treat debugging as a systematic investigation: gather evidence, form a hypothesis, test it with a single change, and update the hypothesis based on the result. This turns an unpredictable ordeal into a skill that improves with practice.",
        },
        /* SECTION 2 — PREREQUISITES */
        {
          kind: "mental-model",
          title: "Debugging Is Scientific Method",
          analogy:
            "A scientist doesn't guess randomly — they form a hypothesis ('I think the temperature is causing this reaction'), run a controlled experiment (change only the temperature), observe the result, and update the hypothesis. Debugging is the same process applied to code.",
          explanation:
            "State your hypothesis before you change code. Make exactly one change to test it. If you change three things at once, you will not know which one fixed — or broke — things. Disciplined one-change-at-a-time testing is the difference between debugging and flailing.",
        },
        /* SECTION 3 — CORE CONCEPTS: print-based debugging */
        {
          kind: "text",
          markdown:
            "## Inspecting variable values with print statements\n\n**The need:** When a program produces wrong output, the cause is almost always that a variable holds a value different from what you expect. You need to see what values variables actually hold at specific moments in the program's execution.\n\n**Plain construction:** The simplest way to observe what a variable contains is to print it. You insert a temporary print statement just before the line that goes wrong, labelling each output so you know which variable you are looking at. You run the program, read the output, and compare the actual values to what you expected.\n\n**The name:** This technique is called **print-based debugging** or **printf debugging** (after a similar technique in C).",
        },
        {
          kind: "code",
          language: "python",
          code: `# Buggy code — off-by-one in a loop
def sum_list(numbers):
    total = 0
    for i in range(len(numbers) + 1):  # BUG: +1 causes IndexError on last step
        total += numbers[i]
    return total

# Debug with print statements — add these temporarily
def sum_list_debug(numbers):
    total = 0
    print(f"List length: {len(numbers)}")   # check the length
    for i in range(len(numbers) + 1):
        print(f"  i={i}, trying numbers[{i}]")  # reveal the index at each step
        total += numbers[i]
    return total

sum_list_debug([10, 20, 30])`,
          caption:
            "SETUP: Adding labelled print statements reveals that i reaches 3 (= len(numbers)), which is out of range for a 3-element list.",
        },
        {
          kind: "output",
          text: "List length: 3\n  i=0, trying numbers[0]\n  i=1, trying numbers[1]\n  i=2, trying numbers[2]\n  i=3, trying numbers[3]\nIndexError: list index out of range",
          isError: true,
        },
        {
          kind: "text",
          markdown:
            "**Step-by-step narration:**\n\n1. The print on line 11 confirms the list has 3 elements (valid indices: 0, 1, 2).\n2. The print inside the loop shows `i` reaching `3` — one past the last valid index.\n3. The crash at `i=3` confirms the bug: `range(len(numbers) + 1)` should be `range(len(numbers))`.\n\n**Variation:** What would happen if you removed the print statements and just ran the original buggy code? You would get an `IndexError` but would not know *which* value of `i` caused it — you would have to guess or add the prints anyway.",
        },
        /* SECTION 3 — CORE CONCEPTS: minimal reproducing example */
        {
          kind: "text",
          markdown:
            "## Reducing to the smallest failing example\n\n**The need:** In a large program, a bug might only appear under specific conditions involving many functions and data. The more code is involved, the harder it is to isolate the problem.\n\n**Plain construction:** You progressively strip out everything unrelated to the bug — other functions, other data, other logic — until you have the smallest possible program that still shows the same wrong behaviour. This smaller program is easier to reason about, faster to run, and easier to share with someone else for help.\n\n**The name:** This smallest failing program is called a **minimal reproducing example** (sometimes abbreviated MRE).",
        },
        /* SECTION 3 — CORE CONCEPTS: rubber duck debugging */
        {
          kind: "text",
          markdown:
            "## Explaining the code aloud\n\n**The need:** Sometimes you have stared at code for so long that you no longer truly read it — you see what you expect to be there rather than what is actually there.\n\n**Plain construction:** Force yourself to explain every line of the code to an imaginary listener — or a physical object on your desk. When you say words out loud, you must be precise and sequential. That precision forces you to notice the gap between what you *thought* the line did and what it *actually* does.\n\n**The name:** This technique is called **rubber duck debugging**, named after the practice of explaining code to a rubber duck.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Rubber duck debugging",
          body: "Place any object on your desk. Explain your code to it line by line out loud. The act of verbalising forces you to be precise, and that precision often reveals the exact moment your assumption diverges from reality — usually mid-sentence.",
        },
        /* SECTION 4 — VARIATIONS: the full systematic sequence */
        {
          kind: "text",
          markdown:
            "## A systematic debugging sequence\n\nCombining everything above gives a repeatable process:\n\n1. **Read the error message completely** — don't skim. The exception type and message often contain the answer.\n2. **Find the exact line** — the traceback shows it.\n3. **Add print statements** — inspect variable values just before the crash.\n4. **Form a specific hypothesis** — 'I think `x` is None here because...'\n5. **Make exactly one change** — test your hypothesis.\n6. **Verify the result** — did it fix the bug? If not, update the hypothesis.\n7. **If stuck, reduce** — create a minimal example. Or rubber-duck: explain the code aloud.",
        },
        /* SECTION 5 — BREAKDOWN CASES */
        {
          kind: "callout",
          variant: "danger",
          title: "Changing multiple things at once",
          body: "A common debugging mistake is to try three different fixes simultaneously, run the code, see it works, and have no idea which change fixed it. Worse, two of those changes might have cancelled each other out, leaving a latent bug. Change exactly one thing at a time and verify before the next change.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Every developer spends a large fraction of their time debugging. A systematic approach — reading the error, adding strategic prints, forming hypotheses, changing one thing at a time — reduces debugging from a frustrating game of chance to a methodical skill. With this lesson you have completed Stage 7: you can read any traceback, recognise the exception category, handle it with try/except, raise descriptive errors yourself, and debug systematically when the cause is not immediately obvious.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A function `calculate_average(data)` returns `0` instead of the correct average for the list `[4, 8, 12]`. There is no traceback. Describe in order the debugging steps you would take, starting with what print statements you would add and what hypothesis you would form first.",
        },
      ],
      interactions: [
        {
          id: "s7-ds-debug-1",
          kind: "debug-code",
          prompt:
            "This function should return the sum of only the positive numbers in a list. It currently returns wrong results. Find and fix the bug.",
          beginnerPurpose:
            "Apply systematic debugging: identify what is wrong, why, and apply a minimal fix.",
          expectedConceptIds: ["debugging-strategy"],
          brokenCode: `def sum_positives(numbers):
    total = 0
    for n in numbers:
        if n > 0:
            total = n     # BUG: should be +=
    return total

print(sum_positives([1, -2, 3, -4, 5]))`,
          bugDescription:
            "The line 'total = n' replaces the total with each positive number instead of accumulating. It should be 'total += n'.",
          fixedCode: `def sum_positives(numbers):
    total = 0
    for n in numbers:
        if n > 0:
            total += n
    return total

print(sum_positives([1, -2, 3, -4, 5]))`,
          errorType: "logic",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "Add a print inside the loop: print(f'n={n}, total={total}'). Watch what happens to total after each iteration.",
            },
            {
              level: "syntax",
              text: "total = n replaces total. total += n adds n to total. Which does accumulation require?",
            },
          ],
          feedback: {
            correct:
              "Correct! total += n accumulates; total = n only keeps the last positive number.",
            incorrect:
              "Check the assignment operator: = replaces the value, += adds to it.",
          },
        },
        {
          id: "s7-ds-explain-1",
          kind: "plain-language-explain",
          prompt:
            "A colleague's program has a bug but they can't find it after staring at it for an hour. Describe the systematic steps you would suggest they follow.",
          beginnerPurpose:
            "Internalise a reusable debugging process rather than randomly trying changes.",
          expectedConceptIds: ["debugging-strategy"],
          code: `# Hypothetical buggy function they can't figure out
def calculate_tax(income, rate):
    return income * rate / 100`,
          keyPointsToHit: [
            "Read the full error message and traceback carefully",
            "Identify the specific line where the failure occurs",
            "Add print statements to inspect variable values before the failure",
            "Form a hypothesis about the cause before changing code",
            "Make one change at a time and verify the result",
            "Reduce to the smallest code that still shows the bug",
          ],
          sampleAnswer:
            "First, read the complete error message and traceback — the exception type and line number often point directly to the bug. Then add print() statements just before the crash to check what values variables actually hold (not what you expect them to hold). Form a hypothesis: 'I think X is the wrong type'. Make exactly one change to test that hypothesis. If the bug is hard to isolate, strip the program to the smallest version that still fails. Finally, try explaining the code line by line aloud — you'll often spot the wrong assumption mid-sentence.",
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Think about the order: read error → find line → check assumptions → hypothesise → test one change at a time.",
            },
          ],
          feedback: {
            correct:
              "Excellent! Systematic debugging is a skill — the process you described shortens every debugging session.",
            incorrect:
              "Cover at minimum: reading the error, using print for inspection, forming a hypothesis, and changing one thing at a time.",
          },
        },
        {
          id: "s7-ds-reorder-1",
          kind: "reorder-code",
          prompt:
            "Arrange these debugging steps in the most effective order.",
          beginnerPurpose:
            "Build a mental template for the systematic debugging process.",
          expectedConceptIds: ["debugging-strategy"],
          lines: [
            "Make exactly one code change to test the hypothesis.",
            "Read the full error message and traceback.",
            "Add print statements to inspect variable values near the failure.",
            "Form a hypothesis about what is causing the bug.",
            "Verify the fix resolves the issue (or refine the hypothesis).",
          ],
          correctOrder: [1, 2, 3, 0, 4],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Start with information gathering (read error, inspect values), then hypothesise, then act.",
            },
          ],
          feedback: {
            correct:
              "Correct! Read → inspect → hypothesise → change one thing → verify.",
            incorrect:
              "Information gathering comes first. Only change code once you have a specific hypothesis.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "debugging-strategy",
          recallPrompt:
            "Name four steps in the systematic debugging process. Why should you change only one thing at a time?",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s7-ds-debug-1",
          "s7-ds-explain-1",
          "s7-ds-reorder-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["debugging-strategy"],
      },
    },
  ],
  project: {
    id: "s7-project",
    stageId: "stage-07",
    title: "Robust Input Validator",
    brief:
      "Write functions that safely parse and validate different types of user input (age, email format, positive number) with proper exception handling and clear error messages.",
    requirements: [
      "validate_age(value) checks type and range (0–120), raises ValueError on bad input",
      "validate_positive_number(value) converts to float and raises ValueError if non-positive",
      "validate_email_format(value) checks for exactly one '@' and a '.' after it",
      "All functions raise ValueError with a descriptive message on invalid input",
      "A test section calls each function with at least one valid and one invalid input",
    ],
    acceptanceCriteria: [
      "Running the script does not crash — invalid inputs are caught and reported",
      "Each validation function raises ValueError (not a generic exception) on bad input",
      "Error messages describe what was wrong, not just 'invalid'",
      "validate_age(25) returns 25 without raising",
      "validate_age(-1) raises ValueError",
    ],
    conceptIds: ["exception", "try-except", "raise", "input-validation"],
    difficulty: "intermediate",
    starterCode: `# Robust Input Validator

def validate_age(value):
    """Return value as int if it is a valid age (0-120).

    Raises:
        ValueError: if value is not a valid age.
    """
    # your code here
    pass
`,
  },
} satisfies Stage;
