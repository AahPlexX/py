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
        {
          kind: "text",
          markdown:
            "## Anatomy of a traceback\n\nWhen Python encounters an error it prints a **traceback** — a snapshot of the call stack at the moment the error occurred. The format is always:\n\n```\nTraceback (most recent call last):\n  File \"script.py\", line N, in <function>\n    code that caused the error\nExceptionType: message\n```\n\n**Read bottom-up**: the last line tells you *what* went wrong (exception type and message). The lines above tell you *where* — the chain of function calls that led there.",
        },
        {
          kind: "code",
          language: "python",
          code: `def divide(a, b):
    return a / b

def main():
    result = divide(10, 0)
    print(result)

main()`,
          caption:
            "This code will raise a ZeroDivisionError. The traceback will show both main() and divide() in the call stack.",
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
          kind: "mental-model",
          title: "A Traceback Is a Crime Scene Report",
          analogy:
            "Imagine a chain of people passing a message. Something went wrong with the last person. The traceback lists everyone in the chain (most recent at the bottom) and what they were doing when it failed.",
          explanation:
            "The bottom line is always the actual error. The lines above it show the call chain. Start reading at the bottom to understand the cause, then scan upward to understand context.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "The last line is your friend",
          body: "Most of the time you only need to read the last line of a traceback to know what went wrong. Look at the exception type (e.g., TypeError, NameError) and the message. Then check the line number to find where to fix it.",
        },
        {
          kind: "text",
          markdown:
            "## Key information in a traceback\n\n| Part | Location | What it tells you |\n|------|----------|-------------------|\n| Exception type | Last line, before `:` | Category of error |\n| Exception message | Last line, after `:` | Human-readable description |\n| File name | Each `File` line | Which source file |\n| Line number | `line N` | Where in that file |\n| Code snippet | Indented under `File` line | The exact statement that failed |",
        },
        {
          kind: "glossary-term",
          term: "traceback",
          definition:
            "The error report Python prints when an unhandled exception occurs. It shows the call stack (most recent frame last) and the exception type and message.",
          example: "Traceback (most recent call last):\n  File ...\nValueError: ...",
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
        {
          kind: "text",
          markdown:
            "## The six most common exceptions\n\n| Exception | Typical cause |\n|-----------|---------------|\n| `TypeError` | Wrong type for an operation (`'a' + 1`) |\n| `ValueError` | Right type, wrong value (`int('hello')`) |\n| `NameError` | Variable or function not defined |\n| `IndexError` | List index out of range |\n| `KeyError` | Dictionary key doesn't exist |\n| `ZeroDivisionError` | Dividing by zero |\n\nKnowing these by name helps you decode tracebacks instantly.",
        },
        {
          kind: "code",
          language: "python",
          code: `# TypeError — wrong type
result = "score: " + 42      # can't add str and int

# ValueError — right type, invalid value
number = int("abc")          # "abc" can't be an int

# NameError — typo or missing definition
print(mesage)                # should be 'message'

# IndexError — out of range
items = [1, 2, 3]
print(items[10])             # only indices 0-2 exist

# KeyError — missing dict key
d = {"a": 1}
print(d["b"])                # "b" not in d

# ZeroDivisionError
x = 10 / 0`,
          caption:
            "Each exception type signals a distinct class of mistake.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Fix strategy by exception type",
          body: "TypeError → check types and convert if needed (str(), int(), float()). ValueError → validate the input before conversion. NameError → check spelling or that the variable is defined before use. IndexError → check list length before accessing. KeyError → use .get() or check 'key in dict'. ZeroDivisionError → guard with 'if divisor != 0'.",
        },
        {
          kind: "why-matters",
          body: "Recognising exception types instantly cuts debugging time in half. When you see 'TypeError', your brain immediately thinks 'type mismatch — check what types I'm combining.' You don't need to re-read the whole program.",
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
        {
          kind: "text",
          markdown:
            "## try / except\n\nWrap code that might fail in a `try` block. If an exception occurs, Python jumps to the matching `except` block instead of crashing.\n\n```python\ntry:\n    risky_code()\nexcept SomeError:\n    handle_the_problem()\n```\n\nAlways name the specific exception you expect. Catching the wrong exception masks real bugs.",
        },
        {
          kind: "code",
          language: "python",
          code: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Cannot divide by zero!")
        return None
    else:
        print("Success!")
        return result
    finally:
        print("Division attempted.")

print(safe_divide(10, 2))
print(safe_divide(5, 0))`,
          caption:
            "try runs first. except only runs on error. else runs only on success. finally always runs.",
          highlight: [2, 4, 7, 9],
        },
        {
          kind: "output",
          text: "Division attempted.\nSuccess!\n5.0\nCannot divide by zero!\nDivision attempted.\nNone",
          isError: false,
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never use a bare except:",
          body: "A bare `except:` catches everything — including KeyboardInterrupt and SystemExit. This can make programs impossible to stop and hide completely different bugs. Always specify the exception type: `except ValueError:`, `except (TypeError, ValueError):`.",
        },
        {
          kind: "text",
          markdown:
            "## Catching multiple exception types\n\nUse a tuple to catch more than one:\n\n```python\ntry:\n    value = int(input(\"Enter a number: \"))\nexcept (ValueError, TypeError):\n    print(\"Please enter a valid integer.\")\n```",
        },
        {
          kind: "why-matters",
          body: "Unhandled exceptions crash programs and expose raw error messages to users. Proper exception handling lets you recover gracefully, show helpful error messages, and continue running when expected failure modes occur.",
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
        {
          kind: "text",
          markdown:
            "## The raise statement\n\nUse `raise` to deliberately trigger an exception with a meaningful message. This is how you signal that a caller passed invalid data.\n\n```python\nraise ValueError(\"age must be positive\")\n```\n\nYou can raise any built-in exception or a custom one. Providing a clear message helps the caller understand what went wrong.",
        },
        {
          kind: "code",
          language: "python",
          code: `def set_age(age):
    if age < 0:
        raise ValueError(f"age must be non-negative, got {age}")
    if age > 150:
        raise ValueError(f"age {age} is unrealistically large")
    return age

print(set_age(25))    # 25
set_age(-5)           # raises ValueError`,
          caption:
            "Guard clauses validate at the top of the function and raise immediately on bad input.",
          highlight: [2, 3, 4, 5],
        },
        {
          kind: "output",
          text: "25\nValueError: age must be non-negative, got -5",
          isError: true,
        },
        {
          kind: "text",
          markdown:
            "## assert\n\n`assert condition, message` raises `AssertionError` if the condition is False. It's useful during development to verify your own assumptions about the state of the program — but don't rely on assert for user input validation (it can be disabled with the `-O` flag).",
        },
        {
          kind: "code",
          language: "python",
          code: `def average(numbers):
    assert len(numbers) > 0, "Cannot average an empty list"
    return sum(numbers) / len(numbers)

print(average([10, 20, 30]))  # 20.0
average([])                   # AssertionError`,
          caption:
            "assert is a developer-facing check, not a user-facing validation.",
          highlight: [2],
        },
        {
          kind: "callout",
          variant: "info",
          title: "raise vs assert — which to use?",
          body: "Use raise when validating user or API inputs — it's always enforced. Use assert to document and verify internal assumptions (e.g., a list you built yourself should never be empty at this point). Never use assert to guard external inputs.",
        },
        {
          kind: "why-matters",
          body: "Raising descriptive exceptions at the boundary of your functions gives callers actionable error messages. 'ValueError: age must be non-negative, got -5' tells a developer exactly what to fix, whereas a cryptic crash 20 lines later does not.",
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
        {
          kind: "text",
          markdown:
            "## A systematic debugging process\n\n1. **Read the error message** — don't skim. The type and message often tell you exactly what's wrong.\n2. **Find the line** — traceback shows which line failed.\n3. **Check your assumptions** — add print statements to inspect variables *before* the crash.\n4. **Reduce to a minimal example** — delete everything unrelated until the bug still reproduces.\n5. **Rubber duck** — explain the code aloud as if to someone unfamiliar with it. You'll often spot the bug mid-sentence.",
        },
        {
          kind: "code",
          language: "python",
          code: `# Buggy code — off-by-one in a loop
def sum_list(numbers):
    total = 0
    for i in range(len(numbers) + 1):   # BUG: +1 goes out of range
        total += numbers[i]
    return total

# Debug with print statements
def sum_list_debug(numbers):
    total = 0
    print(f"List length: {len(numbers)}")
    for i in range(len(numbers) + 1):
        print(f"  i={i}, trying numbers[{i}]")
        total += numbers[i]
    return total`,
          caption:
            "Adding print() calls before the crash reveals that i reaches len(numbers), which is out of range.",
          highlight: [4, 11, 12],
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Rubber duck debugging",
          body: "Place a rubber duck (or any object) on your desk. Explain your code to it line by line. The act of verbalising forces you to be precise, and that precision often reveals where your assumption diverges from reality.",
        },
        {
          kind: "text",
          markdown:
            "## Minimal reproducing example\n\nWhen a bug is hard to find, strip your code down to the smallest program that still shows the problem. Remove unrelated functions, data, and logic. You'll either find the bug while trimming, or you'll have a clean example to share with someone else.",
        },
        {
          kind: "mental-model",
          title: "Debugging Is Scientific Method",
          analogy:
            "A scientist doesn't guess randomly — they form a hypothesis ('I think x is causing the crash'), run an experiment (add a print to see x's value), observe the result, and update the hypothesis. Debugging is the same process.",
          explanation:
            "State your hypothesis before you change code. Then make exactly one change to test it. If you change three things at once, you won't know which one fixed (or broke) things.",
        },
        {
          kind: "why-matters",
          body: "Every developer spends a large fraction of their time debugging. A systematic approach — reading the error, adding strategic prints, forming hypotheses — reduces debugging from a frustrating game of chance to a methodical skill that gets faster with practice.",
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
