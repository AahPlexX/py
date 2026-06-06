import type { Stage } from "@/course/course.schema";

export const stage05 = {
  id: "stage-05",
  number: 5,
  title: "Functions and Problem Decomposition",
  summary:
    "Write reusable functions with parameters, return values, default parameters, scope, and docstrings.",
  level: "beginner",
  masteryGateConceptIds: [
    "function-definition",
    "parameter",
    "return-value",
    "scope",
    "default-parameter",
    "docstring",
  ],
  lessons: [
    /* ── Lesson 1 ── */
    {
      id: "s5-defining-functions",
      stageId: "stage-05",
      title: "Defining and Calling Functions",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use the def keyword to define a function",
        "Write a function body with correct indentation",
        "Call a function by its name followed by parentheses",
        "Understand that a function is a reusable named block of code",
      ],
      prerequisites: ["s4-break-continue"],
      concepts: ["function-definition"],
      contentBlocks: [
        {
          kind: "mental-model",
          title: "A Function Is a Recipe",
          analogy:
            "Think of a function as a recipe card. You write the recipe once, then you can follow it any number of times. The def keyword is you writing the card; calling the function is you following it.",
          explanation:
            "When Python encounters a def statement it stores the instructions but does not run them yet. Running only happens when you call the function by name with parentheses.",
        },
        {
          kind: "text",
          markdown:
            "## Defining a function\n\nA function definition has three parts:\n\n1. The `def` keyword followed by the function name and `():`\n2. An indented body of one or more statements\n3. (Optionally) a call somewhere else to actually run it\n\n```\ndef name():\n    # body\n```\n\nPython's convention for function names is **snake_case** — all lowercase, words separated by underscores.",
        },
        {
          kind: "code",
          language: "python",
          code: `def greet():
    print("Hello, world!")

# Call the function — this runs the body
greet()
greet()
greet()`,
          caption:
            "Defining greet() once and calling it three times. Each call prints the same line.",
          highlight: [1, 2, 5, 6, 7],
        },
        {
          kind: "output",
          text: "Hello, world!\nHello, world!\nHello, world!",
          isError: false,
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Indentation is mandatory",
          body: "Python uses indentation (4 spaces by convention) to mark the function body. Every line of the body must be indented consistently. A line at the original indentation level signals the end of the function.",
        },
        {
          kind: "why-matters",
          body: "Functions let you name a chunk of logic so you can reuse it without copy-pasting. This makes programs shorter, easier to read, and simpler to fix — change the function body once and every call site benefits.",
        },
        {
          kind: "glossary-term",
          term: "function definition",
          definition:
            "A block of code introduced by the def keyword that names a reusable operation. The body is not executed until the function is called.",
          example: "def greet():\n    print('Hello')",
        },
      ],
      interactions: [
        {
          id: "s5-df-predict-1",
          kind: "predict-output",
          prompt:
            "What will be printed when this code runs? Type the output exactly, one line per line.",
          beginnerPurpose:
            "Confirms you understand that a function body only runs when the function is called.",
          expectedConceptIds: ["function-definition"],
          code: `def say_hi():
    print("Hi!")

say_hi()
say_hi()`,
          expectedOutput: "Hi!\nHi!",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "The def block stores the function — it does not print anything by itself.",
            },
            {
              level: "syntax",
              text: "Count the number of times say_hi() is called on lines after the definition.",
            },
          ],
          feedback: {
            correct:
              "Correct! The function body runs once for each call, so 'Hi!' prints twice.",
            incorrect:
              "Check how many times say_hi() is called after the definition.",
            misconception:
              "The def block itself produces no output — it only stores the instructions.",
          },
        },
        {
          id: "s5-df-fill-1",
          kind: "fill-code",
          prompt: "Complete the function so it prints 'Good morning!'.",
          beginnerPurpose:
            "Practice writing the def line and calling the function.",
          expectedConceptIds: ["function-definition"],
          codeTemplate: `___def___ morning():
    print("Good morning!")

morning()`,
          blanks: [
            {
              placeholder: "___def___",
              answer: "def",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The keyword that starts every function definition is three letters.",
            },
          ],
          feedback: {
            correct:
              "Correct! 'def' tells Python you're defining a new function.",
            incorrect: "The keyword that begins a function definition is 'def'.",
          },
        },
        {
          id: "s5-df-reorder-1",
          kind: "reorder-code",
          prompt:
            "Arrange these lines so the function is defined before it is called, and the body is correctly indented (represented here as a flat list).",
          beginnerPurpose:
            "Reinforces that a function must be defined before calling it.",
          expectedConceptIds: ["function-definition"],
          lines: [
            "announce()",
            '    print("Ready!")',
            "def announce():",
            "announce()",
          ],
          correctOrder: [2, 1, 0, 3],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "The def line must come before any call to the function.",
            },
            {
              level: "structural",
              text: "The indented print line is the function body — it belongs directly under the def.",
            },
          ],
          feedback: {
            correct:
              "Correct! Define first, then call. The indented print is the body.",
            incorrect:
              "Make sure the def line comes first, the indented body second, and then the calls.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "function-definition",
          recallPrompt:
            "What keyword starts a function definition, and what must every line in the function body have?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s5-df-predict-1",
          "s5-df-fill-1",
          "s5-df-reorder-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["function-definition"],
      },
    },

    /* ── Lesson 2 ── */
    {
      id: "s5-parameters-arguments",
      stageId: "stage-05",
      title: "Parameters and Arguments",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Distinguish between a parameter (in the definition) and an argument (in the call)",
        "Define functions that accept one or more positional parameters",
        "Pass arguments in the correct order",
      ],
      prerequisites: ["s5-defining-functions"],
      concepts: ["parameter"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Parameters and arguments\n\nA **parameter** is the variable name listed inside the `def` parentheses. An **argument** is the actual value you supply when you *call* the function.\n\n| Term | Where it lives | Example |\n|------|---------------|---------|\n| parameter | `def` line | `name` in `def greet(name):` |\n| argument | call site | `\"Alice\"` in `greet(\"Alice\")` |",
        },
        {
          kind: "code",
          language: "python",
          code: `def greet(name):          # 'name' is the parameter
    print("Hello,", name)

greet("Alice")            # "Alice" is the argument
greet("Bob")              # "Bob" is the argument`,
          caption:
            "Same function, two different arguments — the parameter acts as a local variable inside the body.",
          highlight: [1, 4, 5],
        },
        {
          kind: "output",
          text: "Hello, Alice\nHello, Bob",
          isError: false,
        },
        {
          kind: "text",
          markdown:
            "## Multiple parameters\n\nYou can list as many parameters as you need, separated by commas. Arguments are matched **positionally** — first argument → first parameter, and so on.",
        },
        {
          kind: "code",
          language: "python",
          code: `def add(a, b):
    print(a + b)

add(3, 4)    # a=3, b=4
add(10, 20)  # a=10, b=20`,
          caption: "Two parameters matched by position to two arguments.",
        },
        {
          kind: "output",
          text: "7\n30",
          isError: false,
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Argument count must match parameter count",
          body: "Calling a function with the wrong number of arguments raises a TypeError. Python checks this before executing the function body.",
        },
      ],
      interactions: [
        {
          id: "s5-pa-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Verifies that you can trace positional argument mapping.",
          expectedConceptIds: ["parameter"],
          code: `def describe(animal, sound):
    print(animal, "goes", sound)

describe("cat", "meow")
describe("dog", "woof")`,
          expectedOutput: "cat goes meow\ndog goes woof",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Arguments are matched left-to-right to the parameter list.",
            },
          ],
          feedback: {
            correct:
              "Correct! Each call maps its arguments to the parameters in order.",
            incorrect:
              "Trace each call: the first argument fills 'animal', the second fills 'sound'.",
          },
        },
        {
          id: "s5-pa-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the function so it prints the full name by joining first and last.",
          beginnerPurpose:
            "Practice defining a function with two parameters and using them in the body.",
          expectedConceptIds: ["parameter"],
          codeTemplate: `def full_name(___first___, ___last___):
    print(first, last)

full_name("Jane", "Doe")`,
          blanks: [
            {
              placeholder: "___first___",
              answer: "first",
              caseSensitive: true,
            },
            {
              placeholder: "___last___",
              answer: "last",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The parameter names must match what is used inside the body ('first' and 'last').",
            },
          ],
          feedback: {
            correct:
              "Correct! Parameters declared in the def line become local variables in the body.",
            incorrect:
              "The parameter names need to match what's used in the print statement: 'first' and 'last'.",
          },
        },
        {
          id: "s5-pa-mc-1",
          kind: "multiple-choice",
          prompt:
            "In `def greet(name):` followed by `greet(\"Alice\")`, which term describes `\"Alice\"`?",
          beginnerPurpose:
            "Distinguish the vocabulary of parameters versus arguments.",
          expectedConceptIds: ["parameter"],
          options: [
            {
              id: "s5-pa-mc-1-a",
              text: "Parameter",
              isCorrect: false,
              explanation:
                "A parameter is the name in the def line, not the value in the call.",
            },
            {
              id: "s5-pa-mc-1-b",
              text: "Argument",
              isCorrect: true,
              explanation:
                "An argument is the actual value passed at the call site.",
            },
            {
              id: "s5-pa-mc-1-c",
              text: "Variable",
              isCorrect: false,
              explanation:
                "While 'Alice' does get bound to a variable (name), the precise term for the value at the call site is 'argument'.",
            },
            {
              id: "s5-pa-mc-1-d",
              text: "Return value",
              isCorrect: false,
              explanation:
                "A return value is what a function sends back to the caller, not what is passed in.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Parameters live in the definition; arguments live in the call.",
            },
          ],
          feedback: {
            correct:
              "Correct! 'Alice' is the argument — the concrete value provided when calling the function.",
            incorrect:
              "Remember: parameters are placeholders in the def line; arguments are the real values at the call.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "parameter",
          recallPrompt:
            "What is the difference between a parameter and an argument?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s5-pa-predict-1",
          "s5-pa-fill-1",
          "s5-pa-mc-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["parameter"],
      },
    },

    /* ── Lesson 3 ── */
    {
      id: "s5-return-values",
      stageId: "stage-05",
      title: "Returning Values",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use the return statement to send a value back to the caller",
        "Store and use a function's return value",
        "Understand that functions without return send back None",
        "Apply early return to exit a function before the last line",
      ],
      prerequisites: ["s5-parameters-arguments"],
      concepts: ["return-value"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The return statement\n\nSo far our functions have printed things but not *produced* values. The `return` statement makes a function hand a value back to wherever it was called.\n\n```python\ndef square(n):\n    return n * n\n\nresult = square(5)   # result is now 25\nprint(result)        # 25\n```\n\nThe value after `return` can be any expression. Python evaluates it and sends the result to the caller.",
        },
        {
          kind: "code",
          language: "python",
          code: `def square(n):
    return n * n

result = square(5)
print(result)
print(square(3) + square(4))  # use return value directly`,
          caption:
            "square() returns a value that can be assigned to a variable or used in an expression.",
          highlight: [2],
        },
        {
          kind: "output",
          text: "25\n25",
          isError: false,
        },
        {
          kind: "callout",
          variant: "info",
          title: "Functions without return produce None",
          body: "If a function has no return statement (or just `return` with no value), Python automatically returns `None`. Trying to use that result as a number or string usually causes a TypeError.",
        },
        {
          kind: "text",
          markdown:
            "## Early return\n\nYou can use `return` anywhere in the function body, not just at the end. Execution stops immediately and the value is sent back.",
        },
        {
          kind: "code",
          language: "python",
          code: `def safe_divide(a, b):
    if b == 0:
        return 0        # early return — skip the rest
    return a / b

print(safe_divide(10, 2))   # 5.0
print(safe_divide(7, 0))    # 0`,
          caption:
            "Early return exits the function as soon as b == 0, preventing a ZeroDivisionError.",
          highlight: [3],
        },
        {
          kind: "output",
          text: "5.0\n0",
          isError: false,
        },
        {
          kind: "why-matters",
          body: "Return values are what allow functions to compose. You can pass the output of one function as the input of another, building complex programs from small, testable pieces.",
        },
      ],
      interactions: [
        {
          id: "s5-rv-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Trace a return value from inside a function to where it is used.",
          expectedConceptIds: ["return-value"],
          code: `def double(x):
    return x * 2

a = double(4)
b = double(a)
print(b)`,
          expectedOutput: "16",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "double(4) returns 8, which is stored in a. Then double(a) is double(8).",
            },
          ],
          feedback: {
            correct:
              "Correct! double(4) → 8, then double(8) → 16. Return values can be chained.",
            incorrect:
              "Step through it: double(4) returns 4*2=8. Then double(8) returns 8*2=16.",
          },
        },
        {
          id: "s5-rv-debug-1",
          kind: "debug-code",
          prompt:
            "This function should return the sum of two numbers, but the result is always None. Fix it.",
          beginnerPurpose:
            "Learn that printing a value inside a function does not return it.",
          expectedConceptIds: ["return-value"],
          brokenCode: `def add(a, b):
    print(a + b)

result = add(3, 5)
print(result)`,
          bugDescription:
            "The function prints the sum but does not return it. Without a return statement the function returns None, so `result` is None.",
          fixedCode: `def add(a, b):
    return a + b

result = add(3, 5)
print(result)`,
          errorType: "logic",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "print() shows a value on screen but does not send it back to the caller. Use return instead.",
            },
          ],
          feedback: {
            correct:
              "Correct! Replacing print with return makes the function produce a usable value.",
            incorrect:
              "Change `print(a + b)` to `return a + b` so the result is sent back to the caller.",
          },
        },
        {
          id: "s5-rv-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the function so it returns the absolute difference between two numbers.",
          beginnerPurpose: "Practice writing a return statement with an expression.",
          expectedConceptIds: ["return-value"],
          codeTemplate: `def abs_diff(a, b):
    ___return___ abs(a - b)

print(abs_diff(10, 3))   # 7
print(abs_diff(3, 10))   # 7`,
          blanks: [
            {
              placeholder: "___return___",
              answer: "return",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The keyword that sends a value back to the caller is 'return'.",
            },
          ],
          feedback: {
            correct: "Correct! 'return' sends the computed value back to the caller.",
            incorrect:
              "The missing keyword is 'return'. It must appear before the expression you want to send back.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "return-value",
          recallPrompt:
            "What does a function without a return statement produce, and why is that a problem when you try to use the result?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s5-rv-predict-1",
          "s5-rv-debug-1",
          "s5-rv-fill-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["return-value"],
      },
    },

    /* ── Lesson 4 ── */
    {
      id: "s5-scope",
      stageId: "stage-05",
      title: "Scope: Where Variables Live",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Define local scope and explain that function variables are invisible outside the function",
        "Define global scope and distinguish it from local scope",
        "Predict a NameError when code references a variable that is out of scope",
      ],
      prerequisites: ["s5-return-values"],
      concepts: ["scope"],
      contentBlocks: [
        {
          kind: "mental-model",
          title: "Scope Is Like a Private Room",
          analogy:
            "A function is like a private room. Variables you create inside the room stay inside. The hallway (global scope) has its own things. You can carry a value out through the door (return), but the room's furniture doesn't move to the hallway by itself.",
          explanation:
            "Each function call creates a new local scope. Variables assigned inside are local. When the function returns, its local scope is destroyed.",
        },
        {
          kind: "code",
          language: "python",
          code: `def compute():
    result = 42       # local variable — lives inside compute()
    print(result)     # fine here

compute()
print(result)         # NameError: 'result' is not defined`,
          caption:
            "result is local to compute(). Accessing it outside raises a NameError.",
          highlight: [2, 6],
        },
        {
          kind: "output",
          text: "42\nNameError: name 'result' is not defined",
          isError: true,
        },
        {
          kind: "text",
          markdown:
            "## Global scope\n\nVariables assigned at the top level of a module live in **global scope** and can be *read* inside functions, but you should avoid modifying them. Preferring parameters and return values makes functions easier to understand and test.",
        },
        {
          kind: "code",
          language: "python",
          code: `greeting = "Hello"   # global

def show_greeting():
    print(greeting)      # reads the global — OK but not ideal

show_greeting()`,
          caption:
            "Functions can read globals, but relying on globals makes code harder to reason about.",
        },
        {
          kind: "output",
          text: "Hello",
          isError: false,
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Prefer passing data through parameters",
          body: "Instead of reading globals inside a function, pass the value as a parameter. This makes the function self-contained: its output depends only on its inputs, not hidden state.",
        },
        {
          kind: "glossary-term",
          term: "local scope",
          definition:
            "The region of a program where a variable defined inside a function is visible. Local variables are created when the function is called and destroyed when it returns.",
          example: "def f():\n    x = 1  # x is local to f",
        },
      ],
      interactions: [
        {
          id: "s5-sc-predict-1",
          kind: "predict-output",
          prompt:
            "What happens when this code runs? Type the output or the exact error message.",
          beginnerPurpose:
            "Confirm that local variables are invisible outside their function.",
          expectedConceptIds: ["scope"],
          code: `def make_number():
    x = 99

make_number()
print(x)`,
          expectedOutput: "NameError: name 'x' is not defined",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "x is defined inside make_number(), so it only exists during that function call.",
            },
            {
              level: "syntax",
              text: "After make_number() returns, x is gone. The print on line 5 is in global scope where x never existed.",
            },
          ],
          feedback: {
            correct:
              "Correct! x is local to make_number() and cannot be accessed in global scope.",
            incorrect:
              "x is only defined inside make_number(). Once the function returns, x no longer exists.",
          },
        },
        {
          id: "s5-sc-mc-1",
          kind: "multiple-choice",
          prompt:
            "After this code runs, which variable is accessible in global scope?\n\n```python\ncount = 10\n\ndef increment():\n    total = count + 1\n    return total\n\nincrement()\n```",
          beginnerPurpose:
            "Identify which variables belong to local vs global scope.",
          expectedConceptIds: ["scope"],
          options: [
            {
              id: "s5-sc-mc-1-a",
              text: "total",
              isCorrect: false,
              explanation:
                "'total' is defined inside increment() and is a local variable — it is destroyed when the function returns.",
            },
            {
              id: "s5-sc-mc-1-b",
              text: "count",
              isCorrect: true,
              explanation:
                "'count' is assigned at the top level, so it lives in global scope and remains accessible.",
            },
            {
              id: "s5-sc-mc-1-c",
              text: "Both count and total",
              isCorrect: false,
              explanation:
                "'total' is local to increment() and not accessible globally.",
            },
            {
              id: "s5-sc-mc-1-d",
              text: "Neither",
              isCorrect: false,
              explanation:
                "'count' is in global scope and is definitely accessible.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Variables defined inside a function are local. Variables defined at the top level are global.",
            },
          ],
          feedback: {
            correct: "Correct! Only 'count' is global; 'total' is local to increment().",
            incorrect:
              "Remember: assignment inside a function creates a local variable, not a global one.",
          },
        },
        {
          id: "s5-sc-debug-1",
          kind: "debug-code",
          prompt:
            "This code tries to print the discount outside the function. Fix it so the discount is returned and then printed.",
          beginnerPurpose:
            "Practice fixing a scope error by returning a local value instead of relying on global access.",
          expectedConceptIds: ["scope"],
          brokenCode: `def calculate_discount(price):
    discount = price * 0.1

calculate_discount(50)
print(discount)`,
          bugDescription:
            "discount is a local variable inside calculate_discount(). It is not accessible outside. The fix is to return the value and capture it.",
          fixedCode: `def calculate_discount(price):
    discount = price * 0.1
    return discount

result = calculate_discount(50)
print(result)`,
          errorType: "NameError",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "Local variables cannot be accessed outside the function. Use return to send the value out.",
            },
            {
              level: "structural",
              text: "Add 'return discount' inside the function, then capture the result: result = calculate_discount(50).",
            },
          ],
          feedback: {
            correct:
              "Correct! Returning the local variable and capturing it globally is the proper pattern.",
            incorrect:
              "Add 'return discount' inside the function, then do 'result = calculate_discount(50)' before printing.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "scope",
          recallPrompt:
            "Why can't you access a variable defined inside a function from outside it?",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s5-sc-predict-1",
          "s5-sc-mc-1",
          "s5-sc-debug-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["scope"],
      },
    },

    /* ── Lesson 5 ── */
    {
      id: "s5-default-parameters",
      stageId: "stage-05",
      title: "Default Parameters and Docstrings",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Define a function with a default parameter value",
        "Call a function with and without overriding the default",
        "Write a docstring as the first statement of a function",
        "Understand that default parameters must follow non-default ones",
      ],
      prerequisites: ["s5-scope"],
      concepts: ["default-parameter", "docstring"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Default parameter values\n\nYou can give a parameter a default value using `=` in the `def` line. If the caller does not pass an argument for that parameter, the default is used automatically.",
        },
        {
          kind: "code",
          language: "python",
          code: `def greet(name, greeting="Hello"):
    print(greeting + ", " + name + "!")

greet("Alice")              # uses default greeting
greet("Bob", "Good morning")  # overrides the default`,
          caption:
            "greeting has a default of 'Hello'. It can be overridden at the call site.",
          highlight: [1],
        },
        {
          kind: "output",
          text: "Hello, Alice!\nGood morning, Bob!",
          isError: false,
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Default parameters must come after non-default ones",
          body: "Python requires that parameters with defaults appear after parameters without defaults. Writing `def f(a=1, b)` raises a SyntaxError.",
        },
        {
          kind: "text",
          markdown:
            "## Docstrings\n\nA **docstring** is a triple-quoted string placed as the very first statement in a function body. It documents what the function does, its parameters, and its return value. Tools like `help()` display it automatically.",
        },
        {
          kind: "code",
          language: "python",
          code: `def add(a, b):
    """Return the sum of a and b.

    Args:
        a: First number.
        b: Second number.

    Returns:
        The sum of a and b.
    """
    return a + b

help(add)`,
          caption:
            "A docstring lives on the first line of the body, wrapped in triple quotes. help() displays it.",
          highlight: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          kind: "why-matters",
          body: "Docstrings are the official way to document Python code. They are readable by humans and by automated tools, editors, and documentation generators. Writing them is a professional habit that pays off when others (or future you) use your functions.",
        },
        {
          kind: "glossary-term",
          term: "default parameter",
          definition:
            "A function parameter that has a preset value used when no argument is supplied for it at the call site.",
          example: `def greet(name, greeting="Hello"):\n    print(greeting, name)`,
        },
        {
          kind: "glossary-term",
          term: "docstring",
          definition:
            "A string literal that appears as the first statement of a function, class, or module, documenting its purpose and usage.",
          example: `def f():\n    """Does something useful."""\n    pass`,
        },
      ],
      interactions: [
        {
          id: "s5-dp-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Trace which calls use the default and which override it.",
          expectedConceptIds: ["default-parameter"],
          code: `def power(base, exp=2):
    print(base ** exp)

power(3)
power(3, 3)
power(2, 10)`,
          expectedOutput: "9\n27\n1024",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "When exp is not supplied, it defaults to 2. When supplied, the provided value is used.",
            },
          ],
          feedback: {
            correct:
              "Correct! power(3) uses exp=2, power(3,3) uses exp=3, power(2,10) uses exp=10.",
            incorrect:
              "Check each call: power(3) → 3**2=9, power(3,3) → 3**3=27, power(2,10) → 2**10=1024.",
          },
        },
        {
          id: "s5-dp-fill-1",
          kind: "fill-code",
          prompt:
            "Add a docstring to this function that describes what it does.",
          beginnerPurpose:
            "Practice writing a docstring as the first statement of a function.",
          expectedConceptIds: ["docstring"],
          codeTemplate: `def multiply(a, b):
    ___docstring___
    return a * b`,
          blanks: [
            {
              placeholder: "___docstring___",
              answer: '"""Return the product of a and b."""',
              caseSensitive: false,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "A docstring is a triple-quoted string (\"\"\"...\"\"\") placed as the first line inside the function body.",
            },
          ],
          feedback: {
            correct:
              "Correct! Triple-quoted strings at the start of a function body become its docstring.",
            incorrect:
              "Use triple quotes: \"\"\"Describe what this function does.\"\"\"",
          },
        },
        {
          id: "s5-dp-explain-1",
          kind: "plain-language-explain",
          prompt:
            "Explain in your own words what a 'pure function' is and why it makes code easier to test.",
          beginnerPurpose:
            "Solidify understanding of the relationship between parameters, return values, and predictable behavior.",
          expectedConceptIds: ["return-value", "parameter"],
          code: `def celsius_to_fahrenheit(c):
    """Convert Celsius to Fahrenheit."""
    return c * 9 / 5 + 32`,
          keyPointsToHit: [
            "A pure function's output depends only on its inputs",
            "It has no side effects (no printing, no file writes, no global mutation)",
            "Given the same input it always produces the same output",
            "This makes it easy to test: call it with known inputs and check the output",
          ],
          sampleAnswer:
            "A pure function is one whose result depends solely on its arguments — no global variables, no input from the user, no printing. Because the output is entirely determined by the input, you can test it by calling it with specific values and verifying the result. celsius_to_fahrenheit is pure: it always returns the same number for the same argument.",
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Think about what would happen if you called the function 1000 times with the same argument.",
            },
          ],
          feedback: {
            correct:
              "Great explanation! Pure functions are predictable and self-contained — the foundation of testable code.",
            incorrect:
              "Focus on: same input → same output, no side effects (no print, no global changes), easy to test.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "default-parameter",
          recallPrompt:
            "What syntax gives a parameter a default value, and where must default parameters appear relative to non-default ones?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "docstring",
          recallPrompt:
            "Where does a docstring go in a function, and why is it preferred over a comment?",
          nextReviewAfterDays: 5,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s5-dp-predict-1",
          "s5-dp-fill-1",
          "s5-dp-explain-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["default-parameter", "docstring"],
      },
    },
  ],
  project: {
    id: "s5-project",
    stageId: "stage-05",
    title: "Calculator Library",
    brief:
      "Build a set of calculator functions: add, subtract, multiply, divide (with error handling for zero), and a summary function that formats and prints a result.",
    requirements: [
      "5 functions with proper parameters",
      "Each function has a docstring",
      "divide handles zero divisor (return None or a message string)",
      "A display_result function uses f-strings to format output",
      "Call each function at least once and print the results",
    ],
    acceptanceCriteria: [
      "Running the script produces at least 5 lines of output",
      "Calling divide(10, 0) does not raise an exception",
      "Each function body begins with a triple-quoted docstring",
      "display_result uses an f-string",
      "All function names are snake_case",
    ],
    conceptIds: [
      "function-definition",
      "parameter",
      "return-value",
      "default-parameter",
      "docstring",
    ],
    difficulty: "beginner",
    starterCode: `# Calculator Library
# TODO: define add, subtract, multiply, divide, and display_result

def add(a, b):
    """Return the sum of a and b."""
    # your code here
    pass
`,
  },
} satisfies Stage;
