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
      prerequisites: [],
      concepts: ["function-definition"],
      contentBlocks: [
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## Why functions exist\n\nImagine you need to send a greeting message in ten different places in your program. Without any special tool you would copy and paste the same lines of code ten times. If you later needed to change the wording, you would have to find and update every copy. This is fragile and time-consuming.\n\nFunctions solve this problem by letting you write a set of instructions once, give it a name, and then use that name whenever you want those instructions to run. Change the instructions in one place and every use benefits automatically.",
        },
        /* SECTION 3 — CORE CONCEPT: function definition */
        {
          kind: "text",
          markdown:
            "## The need: a named, reusable block\n\nWe need a way to package up a set of steps, give the package a name, and run those steps on demand just by mentioning the name. In Python this package is called a **function**.\n\nYou create a function by writing the word `def` (short for \"define\"), followed by the name you choose, a pair of parentheses, and a colon. Every line that belongs to the function must be indented four spaces beneath that opening line. Python uses indentation — not curly braces — to know where the function body begins and ends.\n\nUsing the function is called **calling** it. You call a function by writing its name followed by parentheses.",
        },
        {
          kind: "mental-model",
          title: "A Function Is a Recipe Card",
          analogy:
            "Think of a function as a recipe card. You write the recipe once (the def block), then you can follow it any number of times just by saying its name (the call). Writing the card does not cook anything — cooking only happens when you decide to follow the recipe.",
          explanation:
            "When Python encounters a def statement it stores the instructions but does not run them yet. Running only happens when you call the function by name with parentheses.",
        },
        {
          kind: "text",
          markdown:
            "## Anatomy of a function definition\n\nA function definition has three parts:\n\n1. The `def` keyword followed by the function name and `():`\n2. An indented body of one or more statements\n3. A call somewhere else in the program to actually run it\n\nPython's convention for function names is **snake_case** — all lowercase, words separated by underscores.",
        },
        {
          kind: "code",
          language: "python",
          code: `# SETUP: showing that defining a function stores it; calling it runs it.

def greet():          # def keyword + name + () + colon
    print("Hello!")   # indented body — stored but not run yet

# Nothing has printed yet. Now we call the function:
greet()   # first call  → runs the body
greet()   # second call → runs the body again
greet()   # third call  → runs the body a third time`,
          caption:
            "Defining greet() once and calling it three times. Each call prints the same line.",
        },
        {
          kind: "text",
          markdown:
            "**What happened step by step:**\n\n1. Python read lines 3–4 and stored the instructions under the name `greet`. Nothing printed.\n2. Line 7: Python saw `greet()`, found the stored instructions, and ran them — printing `Hello!`.\n3. Lines 8 and 9 each triggered the same run, producing two more prints.\n\n**Variation:** What would happen if you removed line 7 entirely and kept only one `greet()` call on line 8? Python would print `Hello!` exactly once — the body runs once per call.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Indentation is mandatory",
          body: "Python uses indentation (4 spaces by convention) to mark the function body. Every line of the body must be indented consistently. A line back at the original indentation level signals the end of the function.",
        },
        /* SECTION 5 — BREAKDOWN CASE */
        {
          kind: "callout",
          variant: "danger",
          title: "Calling a function before defining it",
          body: "If you write greet() before the def greet(): block, Python raises a NameError: name 'greet' is not defined. Python reads files top to bottom; a name only exists after the line that creates it has run.",
        },
        {
          kind: "code",
          language: "python",
          code: `# BROKEN: call before definition
greet()          # NameError — 'greet' doesn't exist yet

def greet():
    print("Hello!")`,
          caption: "Calling before defining causes a NameError.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Functions are the foundation of every program larger than a few lines. Once you can define and call functions you can name any set of steps, build programs out of named pieces, and fix or improve one piece without touching the rest. Every topic in this stage — parameters, return values, scope, defaults — builds directly on this.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "Consider this code:\n\n```python\ndef announce():\n    print('Ready!')\n\nannounce()\nannounce()\n```\n\nA classmate claims the word 'Ready!' will appear three times when this runs. Are they correct? Explain why or why not without running the code.",
        },
        /* GLOSSARY */
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
      prerequisites: [],
      concepts: ["parameter"],
      contentBlocks: [
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## Why functions need inputs\n\nThe greeting function from the last lesson always prints the exact same message. That is only useful if you always want exactly that message. In real programs you want to reuse the same logic with different data — greet a different person each time, add different numbers each time, format different text each time.\n\nFunctions need a way to accept information from the caller so they can work with whatever data the caller provides.",
        },
        /* SECTION 3 — CORE CONCEPT */
        {
          kind: "text",
          markdown:
            "## The need: placeholders for caller-supplied values\n\nWe want to define a function once but let the caller supply the specific value to work with. We need a placeholder name inside the definition that gets replaced with the real value when someone calls the function.\n\nIn Python, these placeholder names are listed inside the parentheses of the `def` line. Each placeholder is called a **parameter**. When you call the function you supply the actual values in the same parentheses — those real values are called **arguments**.\n\nPython matches arguments to parameters **positionally**: the first argument fills the first parameter, the second argument fills the second parameter, and so on. Inside the function body, each parameter works exactly like a regular variable — it holds the value that was passed in.",
        },
        {
          kind: "mental-model",
          title: "Parameters Are Like Labelled Slots",
          analogy:
            "Imagine a form with labelled blank fields: 'Name: ___', 'Age: ___'. The blank fields are the parameters — they exist on the form before anyone fills it in. When someone hands back a completed form, the values they wrote in are the arguments.",
          explanation:
            "Parameters live in the function definition and act as local variable names. Arguments are the concrete values supplied at the call site. Each call can pass different arguments, giving the function different data to work with each time.",
        },
        {
          kind: "code",
          language: "python",
          code: `# SETUP: a function that greets any name passed in.

def greet(name):           # 'name' is the parameter — a placeholder
    print("Hello,", name)  # 'name' holds whatever the caller passed

greet("Alice")   # "Alice" is the argument — fills 'name'
greet("Bob")     # "Bob" is the argument — fills 'name' this time`,
          caption:
            "Same function, two different arguments. The parameter acts as a local variable inside the body.",
        },
        {
          kind: "text",
          markdown:
            "**What happened step by step:**\n\n1. Python stored the function `greet` with a placeholder slot named `name`.\n2. `greet(\"Alice\")`: Python bound `name = \"Alice\"` and ran the body, printing `Hello, Alice`.\n3. `greet(\"Bob\")`: Python bound `name = \"Bob\"` and ran the body again, printing `Hello, Bob`.\n\n**Variation:** What if you called `greet()` with no argument? Python would raise a `TypeError` saying it expected one argument but got zero. The number of arguments must match the number of parameters.",
        },
        {
          kind: "text",
          markdown:
            "## Multiple parameters\n\nYou can list as many parameters as you need, separated by commas. Arguments are matched positionally — first argument fills the first parameter, second argument fills the second, and so on.",
        },
        {
          kind: "code",
          language: "python",
          code: `def describe(animal, sound):     # two parameters
    print(animal, "goes", sound)

describe("cat", "meow")   # animal="cat", sound="meow"
describe("dog", "woof")   # animal="dog", sound="woof"`,
          caption: "Two parameters matched by position to two arguments.",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "## Order matters\n\nBecause matching is positional, swapping the arguments gives a different result — Python does not know that 'meow' belongs to 'cat' by meaning, only by position.",
        },
        {
          kind: "code",
          language: "python",
          code: `def describe(animal, sound):
    print(animal, "goes", sound)

describe("meow", "cat")   # animal="meow", sound="cat" — backwards!
# prints: meow goes cat`,
          caption: "Swapping arguments produces incorrect output. Order is everything.",
        },
        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "Wrong number of arguments raises TypeError",
          body: "Calling a function with too few or too many arguments raises a TypeError before the function body runs. Python checks argument count immediately. Example: calling describe('cat') with only one argument gives TypeError: describe() missing 1 required positional argument: 'sound'.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Parameters are what make functions truly reusable. Without them every function would only ever do exactly one thing with exactly one set of data. With parameters a single function definition can handle an unlimited variety of inputs. The next lesson builds on this by showing how to send a value back out of a function.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "Here is a function:\n\n```python\ndef area(width, height):\n    print(width * height)\n```\n\nA programmer calls it as `area(height=5, width=3)` using keyword syntax. What value will be printed? Now explain what the words 'parameter' and 'argument' refer to in this specific example.",
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
      prerequisites: [],
      concepts: ["return-value"],
      contentBlocks: [
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## The problem: functions that produce results\n\nThe functions we have written so far print things to the screen. Printing is useful for showing output to a person, but it does not let the program do anything further with the result. If a function calculates the area of a room, we might want to store that area, compare it with another area, or add it to a total — none of which is possible if the function only prints.\n\nWe need a way for a function to produce a value that the rest of the program can use.",
        },
        /* SECTION 3 — CORE CONCEPT: return */
        {
          kind: "text",
          markdown:
            "## Sending a value back to the caller\n\nImagine a function as a worker you send on an errand. You want the worker to come back and hand you something — not just go do something and walk away. In Python the word `return` is how the worker hands something back. When Python reaches a `return` statement it immediately stops running the function and passes the value back to whoever called it.\n\nThe caller can store that value in a variable, pass it to another function, or use it in an expression — exactly as if the function call itself were the value.\n\nThis is called a **return value**.",
        },
        {
          kind: "code",
          language: "python",
          code: `# SETUP: a function that computes a value and hands it back.

def square(n):
    return n * n    # stop here and send n*n back to the caller

result = square(5)          # result is now 25
print(result)               # 25
print(square(3) + square(4))  # use return values directly in an expression`,
          caption:
            "square() returns a value that can be assigned to a variable or used in an expression.",
        },
        {
          kind: "text",
          markdown:
            "**What happened step by step:**\n\n1. `square(5)`: Python ran the body, hit `return n * n` with `n=5`, computed `25`, and sent `25` back.\n2. `result = square(5)` stored that `25` in `result`.\n3. `square(3) + square(4)`: both calls returned values (`9` and `16`), and those were added together to give `25`.\n\n**Variation:** What if you wrote `print(square(5))` on one line and then `result = square(5)` on the next? Both would work independently. `print` would display `25`; `result` would hold `25`. The function can be called many times and each call produces a fresh result.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Functions without return produce None",
          body: "If a function has no return statement (or just `return` with no value), Python automatically returns the special value `None`. Trying to use `None` as a number or string usually causes a TypeError later. This is a very common beginner mistake: using print() inside a function when return is what you actually need.",
        },
        /* SECTION 4 — VARIATION: early return */
        {
          kind: "text",
          markdown:
            "## Early return\n\nYou can place a `return` anywhere in the function body — not just at the end. When Python reaches it, execution stops immediately and the value is sent back. This is useful for handling special cases before proceeding to the main logic.",
        },
        {
          kind: "code",
          language: "python",
          code: `def safe_divide(a, b):
    if b == 0:
        return 0        # early return: skip the rest of the function
    return a / b        # only reached when b != 0

print(safe_divide(10, 2))   # 5.0
print(safe_divide(7, 0))    # 0  — no crash`,
          caption:
            "Early return exits the function as soon as b == 0, preventing a ZeroDivisionError.",
        },
        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "print() inside a function does not return a value",
          body: "A very common mistake: writing print(a + b) inside a function and then doing result = add(3, 5). The result variable will be None, not 8, because print returns None. Use return a + b when the caller needs to work with the value.",
        },
        {
          kind: "code",
          language: "python",
          code: `# BROKEN: using print instead of return
def add(a, b):
    print(a + b)    # shows 8 on screen but sends None back

result = add(3, 5)
print(result)       # None — not 8!`,
          caption: "Printing inside a function does not send the value to the caller.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Return values are what allow functions to compose. You can pass the output of one function as the input of another, building complex programs from small, testable pieces. Once you understand return values you can write functions that are completely self-contained — their output depends only on their input — making them easy to test and reason about.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A programmer writes this code:\n\n```python\ndef celsius_to_fahrenheit(c):\n    print(c * 9 / 5 + 32)\n\ntemp = celsius_to_fahrenheit(100)\nprint('Boiling point in F:', temp)\n```\n\nWhat will the second print statement display? Explain why, and describe the minimal change needed to fix the code.",
        },
        /* GLOSSARY */
        {
          kind: "glossary-term",
          term: "return value",
          definition:
            "The value that a function sends back to its caller via the return statement. If no return statement is reached, the function returns None.",
          example: "def square(n):\n    return n * n\n\nresult = square(4)  # result is 16",
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
      prerequisites: [],
      concepts: ["scope"],
      contentBlocks: [
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## The problem: where do variables live?\n\nWhen you create a variable inside a function, you might wonder: can I read it outside the function? Can another function see it? Can two functions have variables with the same name without one breaking the other?\n\nPython answers all of these questions through a concept called **scope** — the set of rules that determine where a variable can be seen and used.",
        },
        /* SECTION 2 — PREREQUISITE: variables */
        {
          kind: "text",
          markdown:
            "## Quick prerequisite: assignment creates a variable\n\nIn Python, writing `x = 5` creates a variable named `x` that holds the value `5`. Where you write that assignment determines which scope the variable belongs to.",
        },
        /* SECTION 3 — CORE CONCEPT: local scope */
        {
          kind: "text",
          markdown:
            "## Local scope: variables born inside a function\n\nEvery time a function is called, Python creates a fresh, private workspace for that call. Any variable you assign inside the function belongs to that private workspace and cannot be seen from outside. When the function finishes, its workspace is discarded — all those variables disappear.\n\nThis private workspace is called the **local scope** of the function. A variable created inside is a **local variable**.",
        },
        {
          kind: "mental-model",
          title: "Scope Is Like a Private Room",
          analogy:
            "A function is like a private room. Variables you create inside the room stay inside — nobody in the hallway can see them. The hallway (global scope) has its own things. You can carry a value out through the door (return), but the room's furniture does not move to the hallway by itself.",
          explanation:
            "Each function call creates a new local scope. Variables assigned inside are local. When the function returns, its local scope is destroyed.",
        },
        {
          kind: "code",
          language: "python",
          code: `# SETUP: demonstrating that a local variable cannot be accessed outside.

def compute():
    result = 42       # local variable — lives only inside compute()
    print(result)     # fine here: we are inside the function

compute()             # prints 42
print(result)         # NameError: 'result' is not defined here`,
          caption:
            "result is local to compute(). Accessing it outside raises a NameError.",
        },
        {
          kind: "text",
          markdown:
            "**What happened step by step:**\n\n1. `compute()` ran, created `result = 42` in its local scope, printed `42`, then returned.\n2. When it returned, its local scope (including `result`) was destroyed.\n3. The final `print(result)` ran in global scope where `result` never existed — NameError.\n\n**Variation:** What if you assigned `result = 100` in global scope before calling `compute()`? The local `result = 42` inside `compute()` would be a completely separate variable — modifying it would not affect the global `result`.",
        },
        /* SECTION 4 — VARIATION: global scope */
        {
          kind: "text",
          markdown:
            "## Global scope: variables at the top level\n\nVariables assigned at the top level of a file (not inside any function) belong to **global scope**. They exist for the entire lifetime of the program and can be *read* inside functions. However, assigning to a global variable inside a function requires the `global` keyword — without it Python creates a new local variable instead.",
        },
        {
          kind: "code",
          language: "python",
          code: `greeting = "Hello"   # global variable

def show_greeting():
    print(greeting)   # reading a global is allowed without any keyword

show_greeting()       # Hello`,
          caption:
            "Functions can read globals, but relying on globals makes code harder to reason about.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Prefer passing data through parameters",
          body: "Instead of reading globals inside a function, pass the value as a parameter. This makes the function self-contained: its output depends only on its inputs, not on hidden state elsewhere in the program.",
        },
        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "Expecting a local variable to persist after a function returns",
          body: "A local variable exists only during the function call. Code that tries to access it after the function returns will get a NameError. The correct pattern is to return the value from the function and capture it in the outer scope.",
        },
        {
          kind: "code",
          language: "python",
          code: `# BROKEN: trying to access a local variable from outside
def calculate_discount(price):
    discount = price * 0.1   # local variable

calculate_discount(50)
print(discount)              # NameError — discount does not exist here`,
          caption: "discount is local. To use it outside, return it.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Understanding scope explains why functions can be called many times without interfering with each other — each call gets its own private workspace. It also explains why you must use return to get values out of a function, and why well-written functions avoid relying on globals. These ideas directly underpin testing, debugging, and building larger programs.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "Consider this program:\n\n```python\ntotal = 0\n\ndef add_to_total(n):\n    total = total + n\n    return total\n\nadd_to_total(5)\nprint(total)\n```\n\nA programmer expects `total` to be `5` after running this. Will that happen? Explain what Python actually does with the name `total` inside the function, and describe the correct approach.",
        },
        /* GLOSSARY */
        {
          kind: "glossary-term",
          term: "local scope",
          definition:
            "The region of a program where a variable defined inside a function is visible. Local variables are created when the function is called and destroyed when it returns.",
          example: "def f():\n    x = 1  # x is local to f; invisible outside",
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
      prerequisites: [],
      concepts: ["default-parameter", "docstring"],
      contentBlocks: [
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## Two finishing touches: convenience and documentation\n\nThis lesson covers two independent improvements you can make to functions. The first lets callers skip an argument when a sensible default already exists. The second gives every function a built-in description that tools and teammates can read automatically.",
        },
        /* SECTION 3 — CORE CONCEPT 1: default parameters */
        {
          kind: "text",
          markdown:
            "## The need: optional arguments\n\nSuppose you write a greeting function that usually says 'Hello' but occasionally needs a different greeting. You could force every caller to supply the greeting word every time, but that is repetitive when the same word is almost always used.\n\nPython lets you attach a **default value** to a parameter by writing `parameter=value` in the `def` line. If the caller does not supply that argument, Python uses the default automatically. If the caller does supply it, their value overrides the default.\n\nThis is called a **default parameter**.",
        },
        {
          kind: "code",
          language: "python",
          code: `# SETUP: a greeting function where 'Hello' is the usual greeting.

def greet(name, greeting="Hello"):   # greeting has a default value
    print(greeting + ", " + name + "!")

greet("Alice")               # caller skips greeting → uses "Hello"
greet("Bob", "Good morning") # caller supplies greeting → overrides default`,
          caption:
            "greeting defaults to 'Hello'. It can be overridden at the call site.",
        },
        {
          kind: "text",
          markdown:
            "**What happened step by step:**\n\n1. `greet(\"Alice\")`: only one argument supplied. Python used `greeting=\"Hello\"` automatically.\n2. `greet(\"Bob\", \"Good morning\")`: two arguments supplied. Python used `\"Good morning\"` instead of the default.\n\n**Variation:** What if you called `greet(greeting=\"Hi\", name=\"Eve\")`? Python allows you to name arguments explicitly (keyword arguments), so order does not matter when you do that. The output would be `Hi, Eve!`.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Default parameters must come after non-default ones",
          body: "Python requires that parameters with defaults appear after parameters without defaults. Writing `def f(a=1, b)` raises a SyntaxError because Python cannot tell which value the caller meant for which parameter when defaults are in the middle.",
        },
        /* SECTION 3 — CORE CONCEPT 2: docstrings */
        {
          kind: "text",
          markdown:
            "## The need: built-in documentation\n\nCode gets read far more than it gets written. You, your teammates, and future you will all need to understand what a function does, what it expects, and what it returns. A comment above the function helps, but Python provides a better mechanism: a string placed as the very first statement inside the function body.\n\nThis string is called a **docstring** (short for documentation string). Python stores it as part of the function object. Tools like `help()`, code editors, and documentation generators display it automatically.",
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

help(add)   # displays the docstring`,
          caption:
            "A docstring lives on the first line of the body, wrapped in triple quotes. help() displays it.",
        },
        {
          kind: "text",
          markdown:
            "**What happened:** The triple-quoted string `\"\"\"Return the sum...\"\"\"` is stored as `add.__doc__`. When `help(add)` is called, Python prints that stored string. The function works exactly as before — docstrings have no effect on execution.",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "## One-line vs multi-line docstrings\n\nFor simple functions a single line is enough. For functions with multiple parameters or complex behaviour, use the multi-line format shown above. The first line should be a short summary sentence ending with a period.",
        },
        {
          kind: "code",
          language: "python",
          code: `def double(n):
    """Return n multiplied by 2."""
    return n * 2`,
          caption: "A one-line docstring is fine for a simple function.",
        },
        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "Putting a default parameter before a required one",
          body: "Writing `def greet(greeting='Hello', name):` causes a SyntaxError: non-default argument follows default argument. Python cannot resolve which value belongs to which parameter when called as greet('Alice'). Always put required parameters first.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Default parameters make APIs friendlier — callers only need to supply the values that differ from the common case. Docstrings are what enable the built-in help() system and most IDE features like hover documentation and autocomplete hints. Together these two features are what separate functions you just wrote from functions others can easily use.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A programmer defines this function:\n\n```python\ndef repeat(text, times=3):\n    \"\"\"Print text the given number of times.\"\"\"\n    for _ in range(times):\n        print(text)\n```\n\nThey call it as `repeat('Go!')`. How many times will 'Go!' be printed, and why? Then they call it as `repeat('Go!', 1)`. What changes and why?",
        },
        /* GLOSSARIES */
        {
          kind: "glossary-term",
          term: "default parameter",
          definition:
            "A function parameter that has a preset value used when no argument is supplied for it at the call site.",
          example: "def greet(name, greeting='Hello'):\n    print(greeting, name)",
        },
        {
          kind: "glossary-term",
          term: "docstring",
          definition:
            "A string literal that appears as the first statement of a function, class, or module, documenting its purpose and usage. Accessible via help() and stored in __doc__.",
          example: "def f():\n    \"\"\"Does something useful.\"\"\"\n    pass",
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
