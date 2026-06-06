import type { Stage } from "@/course/course.schema";

export const stage01 = {
  id: "stage-01",
  number: 1,
  title: "Zero Start: What Programming Is",
  summary:
    "Understand what a program is, how Python runs code, how to produce output, how to read errors, and how to write comments. No prior experience needed.",
  level: "beginner",
  masteryGateConceptIds: ["program", "output", "error", "comment", "interpreter"],

  lessons: [
    /* ── Lesson 1: What Is a Program? ─────────────────────────────────────── */
    {
      id: "s1-what-is-a-program",
      stageId: "stage-01",
      title: "What Is a Program?",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Define what a computer program is in plain language",
        "Recognise that Python programs are sequences of instructions",
        "Write and mentally trace a single print() call",
      ],
      prerequisites: [],
      concepts: ["program", "output", "interpreter"],
      contentBlocks: [
        {
          kind: "mental-model",
          title: "A Program Is Like a Recipe",
          analogy:
            "Think of a recipe: it lists exact steps in order, and the cook follows every step precisely. A computer program is the same thing — a list of exact steps written for a computer to follow.",
          explanation:
            "Just as a recipe cannot skip steps or guess what the chef meant, a program must be completely unambiguous. The computer executes every instruction exactly as written, one after another.",
        },
        {
          kind: "text",
          markdown:
            "## What Is a Program?\n\nA **program** is a sequence of instructions that a computer can execute. When you run a Python program, Python reads your instructions and carries them out one by one.\n\nEvery app on your phone, every website you visit, and every video game you play is built from programs — collections of instructions that tell the computer exactly what to do.\n\nPython is a **high-level language**: you write instructions in something close to English, and Python translates them into operations the machine can perform.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("Hello")',
          caption:
            "The simplest Python program: one instruction that tells Python to display the word Hello.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Python as an Instruction Set",
          body: "Every line of Python code you write is an instruction. print(\"Hello\") is the instruction \"display Hello on the screen\". Python executes that instruction the moment it reaches that line.",
        },
        {
          kind: "why-matters",
          body: "Understanding that programs are just sequences of instructions removes the mystery from programming. There is no magic — just clear, ordered steps. Once you internalise this, reading and writing code becomes a matter of thinking through steps, not memorising spells.",
        },
      ],
      interactions: [
        {
          id: "s1-wip-mc-what-is-program",
          kind: "multiple-choice",
          prompt: "Which of the following best describes what a computer program is?",
          beginnerPurpose: "Confirm the learner can state a correct definition of a program.",
          expectedConceptIds: ["program"],
          options: [
            {
              id: "opt-a",
              text: "A piece of hardware inside the computer",
              isCorrect: false,
              explanation:
                "Hardware is the physical equipment. A program is software — instructions, not physical parts.",
            },
            {
              id: "opt-b",
              text: "A sequence of instructions that a computer executes",
              isCorrect: true,
              explanation:
                "Exactly right. A program is an ordered set of instructions the computer follows step by step.",
            },
            {
              id: "opt-c",
              text: "A type of file that stores images",
              isCorrect: false,
              explanation:
                "Image files store pictures, not instructions for the computer to execute.",
            },
            {
              id: "opt-d",
              text: "A collection of random numbers",
              isCorrect: false,
              explanation:
                "Programs are meaningful, ordered instructions — not random data.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Think about the recipe analogy: what is a recipe in terms of steps?",
            },
          ],
          feedback: {
            correct: "Correct! A program is a sequence of instructions — like a recipe for the computer.",
            incorrect:
              "Not quite. A program is a set of instructions the computer follows in order, similar to how a recipe is a set of cooking steps.",
          },
        },
        {
          id: "s1-wip-predict-hello-world",
          kind: "predict-output",
          prompt: 'What will Python print when it runs this code?',
          beginnerPurpose:
            "Practice tracing a single print() call to build the habit of predicting output before running code.",
          expectedConceptIds: ["output", "program"],
          code: 'print("Hello, world!")',
          expectedOutput: "Hello, world!",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "print() displays whatever is inside the parentheses.",
            },
            {
              level: "syntax",
              text: "The quotes are not printed — only the text between them appears.",
            },
          ],
          feedback: {
            correct: "Exactly! Python prints the text inside the quotes, without the quotes themselves.",
            incorrect:
              "Look carefully at what is inside the parentheses — that text is what gets displayed. Quotes are not shown in the output.",
            misconception:
              "Many beginners include the quotes in their answer. Python strips the quotes; they are syntax, not content.",
          },
        },
        {
          id: "s1-wip-explain-program",
          kind: "plain-language-explain",
          prompt:
            "In your own words, explain what a program does and how the recipe analogy applies to Python code.",
          beginnerPurpose:
            "Force the learner to articulate the concept in plain language, deepening retention.",
          expectedConceptIds: ["program", "interpreter"],
          code: 'print("Step 1")\nprint("Step 2")\nprint("Step 3")',
          keyPointsToHit: [
            "A program is a list of instructions",
            "The computer follows instructions in order",
            "Python executes each line one at a time",
          ],
          sampleAnswer:
            "A program is like a recipe: it lists instructions that the computer follows exactly, one after another. Just like a chef follows cooking steps in order, Python runs each line of code from top to bottom without skipping or reordering anything.",
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Focus on order and exactness — what makes a recipe different from a shopping list?",
            },
          ],
          feedback: {
            correct:
              "Great explanation! You captured the key ideas: ordered steps and exact execution.",
            incorrect:
              "Try to mention that instructions are followed in order and that Python is the one carrying them out.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "program",
          recallPrompt: "In one sentence, what is a computer program?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s1-wip-mc-what-is-program",
          "s1-wip-predict-hello-world",
          "s1-wip-explain-program",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["program"],
      },
    },

    /* ── Lesson 2: How Python Runs Your Code ──────────────────────────────── */
    {
      id: "s1-how-python-runs",
      stageId: "stage-01",
      title: "How Python Runs Your Code",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain that Python uses an interpreter to execute code line by line",
        "Predict the order of output for a multi-line program",
        "Understand that execution always flows top to bottom by default",
      ],
      prerequisites: ["s1-what-is-a-program"],
      concepts: ["interpreter", "output"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Python Interpreter\n\nPython is an **interpreted language**. That means there is a program called the **interpreter** that reads your code and executes each instruction immediately, one line at a time, starting from the top.\n\nThis is different from compiled languages (like C) where the entire program is translated before running. With Python, each line is processed and run in sequence.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("First")\nprint("Second")\nprint("Third")',
          caption:
            "Python runs these three lines in order: First, then Second, then Third.",
          highlight: [1, 2, 3],
        },
        {
          kind: "output",
          text: "First\nSecond\nThird",
          isError: false,
        },
        {
          kind: "mental-model",
          title: "Reading a Book Top to Bottom",
          analogy:
            "Imagine reading a book: you start at the first word on the first line, read left to right, then move to the next line. You never jump ahead or skip back (unless the story tells you to). Python's interpreter works the same way.",
          explanation:
            "The interpreter processes line 1 completely before moving to line 2. If line 1 causes an error, execution stops there — lines 2 and 3 never run.",
        },
      ],
      interactions: [
        {
          id: "s1-hrp-predict-order",
          kind: "predict-output",
          prompt: "What will Python print when it runs this program? Write each word on its own line.",
          beginnerPurpose:
            "Verify the learner understands top-to-bottom execution order.",
          expectedConceptIds: ["interpreter", "output"],
          code: 'print("Apple")\nprint("Banana")\nprint("Cherry")',
          expectedOutput: "Apple\nBanana\nCherry",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Python runs lines from top to bottom. What is on line 1? Line 2? Line 3?",
            },
          ],
          feedback: {
            correct:
              "Perfect! Python executes each print() in order: Apple first, then Banana, then Cherry.",
            incorrect:
              "Remember, Python starts at the top. Line 1 runs first, then line 2, then line 3.",
          },
        },
        {
          id: "s1-hrp-reorder-execution",
          kind: "reorder-code",
          prompt:
            "Arrange these lines so the program prints: Red, Green, Blue (one colour per line).",
          beginnerPurpose:
            "Reinforce that output order is determined by the order of the lines in the program.",
          expectedConceptIds: ["interpreter", "output"],
          lines: [
            'print("Green")',
            'print("Blue")',
            'print("Red")',
          ],
          correctOrder: [2, 0, 1],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "The first line Python runs produces the first line of output.",
            },
            {
              level: "structural",
              text: "Which print statement outputs Red? That needs to come first.",
            },
          ],
          feedback: {
            correct: "Correct order! print(\"Red\") first, then Green, then Blue.",
            incorrect:
              "Think about which line prints each colour, and match them to the desired output order.",
          },
        },
        {
          id: "s1-hrp-mc-execution-order",
          kind: "multiple-choice",
          prompt:
            "Given this program, which word is printed LAST?\n\n```python\nprint(\"cat\")\nprint(\"dog\")\nprint(\"fish\")\n```",
          beginnerPurpose:
            "Confirm understanding that the last line in the file is the last to execute.",
          expectedConceptIds: ["interpreter"],
          options: [
            {
              id: "opt-a",
              text: "cat",
              isCorrect: false,
              explanation: "cat is printed first because print(\"cat\") is on line 1.",
            },
            {
              id: "opt-b",
              text: "dog",
              isCorrect: false,
              explanation: "dog is printed second.",
            },
            {
              id: "opt-c",
              text: "fish",
              isCorrect: true,
              explanation:
                "fish is on the last line, so it is printed last.",
            },
            {
              id: "opt-d",
              text: "All three are printed at the same time",
              isCorrect: false,
              explanation:
                "Python executes lines sequentially — one at a time, never simultaneously.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Python starts at line 1 and works its way down.",
            },
          ],
          feedback: {
            correct: "Right! The interpreter reaches print(\"fish\") last, so fish appears last in the output.",
            incorrect:
              "Remember: the interpreter reads top to bottom. The last line of code produces the last line of output.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "interpreter",
          recallPrompt:
            "What does the Python interpreter do, and in what order does it process your code?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s1-hrp-predict-order",
          "s1-hrp-reorder-execution",
          "s1-hrp-mc-execution-order",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["interpreter"],
      },
    },

    /* ── Lesson 3: Your First Output ──────────────────────────────────────── */
    {
      id: "s1-your-first-output",
      stageId: "stage-01",
      title: "Your First Output",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Use print() to display text to the screen",
        "Write string literals with single and double quotes",
        "Call print() multiple times to produce multiple lines of output",
      ],
      prerequisites: ["s1-how-python-runs"],
      concepts: ["output"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The print() Function\n\n`print()` is Python's built-in way to display output. Whatever you put inside the parentheses gets shown on the screen.\n\nThe text you pass to `print()` must be surrounded by quotes — either single quotes `'like this'` or double quotes `\"like this\"`. That piece of text is called a **string**.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("Hello, Python!")\nprint(\'Single quotes work too!\')\nprint("I can print multiple lines")\nprint("just by calling print() more than once")',
          caption: "Four calls to print() produce four lines of output.",
        },
        {
          kind: "glossary-term",
          term: "string",
          definition:
            "A sequence of characters (letters, digits, spaces, punctuation) enclosed in quotes. Strings represent text data in Python.",
          example: '"Hello"  \'Python\'  "123"  \'hello world\'',
        },
        {
          kind: "glossary-term",
          term: "function call",
          definition:
            "A function call is an instruction that tells Python to run a named piece of code. You write the function name followed by parentheses, and you can pass values inside the parentheses.",
          example: "print(\"Hello\")  — this calls the print function with the string \"Hello\"",
        },
      ],
      interactions: [
        {
          id: "s1-yfo-fill-print",
          kind: "fill-code",
          prompt: 'Complete the print() call so it outputs: Hello, Python!',
          beginnerPurpose: "Practice writing a complete print() call with a string argument.",
          expectedConceptIds: ["output"],
          codeTemplate: 'print(___)',
          blanks: [
            {
              placeholder: "___",
              answer: '"Hello, Python!"',
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "Strings must be wrapped in quotes inside the parentheses.",
            },
            {
              level: "syntax",
              text: 'Try: "Hello, Python!" — with double quotes around the text.',
            },
          ],
          feedback: {
            correct: 'Correct! print("Hello, Python!") outputs Hello, Python!',
            incorrect:
              "Make sure the text is wrapped in quotes inside the parentheses.",
          },
        },
        {
          id: "s1-yfo-run-three-prints",
          kind: "run-code",
          prompt:
            "Write a program that prints your name, your favourite colour, and your favourite number — each on its own line.",
          beginnerPurpose:
            "Build confidence by writing multiple print() calls from scratch.",
          expectedConceptIds: ["output"],
          starterCode: "# Print your name, favourite colour, and favourite number below\n",
          task: "Use three print() calls. Each call should output one piece of information on its own line.",
          expectedOutputContains: [],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            {
              level: "concept",
              text: "You need three separate print() calls, one for each piece of information.",
            },
            {
              level: "syntax",
              text: 'Each call looks like: print("your text here")',
            },
          ],
          feedback: {
            correct: "Well done! Three print() calls, three lines of output.",
            incorrect: "Make sure you have three separate print() calls, each with a string inside.",
          },
        },
        {
          id: "s1-yfo-predict-quotes",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose:
            "Verify the learner understands that quotes delimit strings but do not appear in output.",
          expectedConceptIds: ["output"],
          code: "print('Python is fun')\nprint(\"I agree!\")",
          expectedOutput: "Python is fun\nI agree!",
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "Single quotes and double quotes both work — neither type of quote appears in the output.",
            },
          ],
          feedback: {
            correct: "Correct! The quotes are syntax only — they don't appear in the output.",
            incorrect:
              "The text inside the quotes is what gets printed. The quotes themselves are never shown.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "output",
          recallPrompt: "How do you display text on the screen in Python?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s1-yfo-fill-print",
          "s1-yfo-run-three-prints",
          "s1-yfo-predict-quotes",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["output"],
      },
    },

    /* ── Lesson 4: Reading Python Errors ─────────────────────────────────── */
    {
      id: "s1-reading-errors",
      stageId: "stage-01",
      title: "Reading Python Errors",
      kind: "debugging",
      difficulty: "beginner",
      objectives: [
        "Identify a SyntaxError and understand when it occurs",
        "Identify a NameError and understand when it occurs",
        "Read a traceback to locate the line that caused an error",
        "Treat error messages as helpful information, not failures",
      ],
      prerequisites: ["s1-your-first-output"],
      concepts: ["error"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Errors Are Your Friends\n\nWhen Python cannot execute your code, it stops and prints an **error message** (also called a **traceback**). Error messages tell you:\n\n1. **Which file and line** caused the problem\n2. **What type of error** occurred\n3. A **short description** of what went wrong\n\nLearning to read error messages is one of the most valuable skills you can develop. Every programmer — beginner and expert alike — sees errors constantly.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("Hello, world!)\nprint("This line never runs")',
          caption: "Can you spot the bug? The closing quote is missing on line 1.",
        },
        {
          kind: "output",
          text: '  File "example.py", line 1\n    print("Hello, world!)\n          ^\nSyntaxError: EOL while scanning string literal',
          isError: true,
        },
        {
          kind: "code",
          language: "python",
          code: "print(message)",
          caption: "NameError: the variable 'message' was never defined before being used.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Errors Are Not Failures",
          body: "Getting an error does not mean you are bad at programming. It means Python found something it could not understand and is asking for clarification. Read the error message, find the line it points to, and fix the specific issue described.",
        },
      ],
      interactions: [
        {
          id: "s1-re-debug-missing-quote",
          kind: "debug-code",
          prompt:
            "This code raises a SyntaxError. Find and fix the bug so it prints: Welcome to Python!",
          beginnerPurpose:
            "Practice identifying and fixing a missing-quote SyntaxError, the most common beginner mistake.",
          expectedConceptIds: ["error"],
          brokenCode: 'print("Welcome to Python!)',
          bugDescription: "The closing double quote is missing from the string.",
          fixedCode: 'print("Welcome to Python!")',
          errorType: "SyntaxError",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "A SyntaxError often means Python couldn't understand how you wrote something.",
            },
            {
              level: "syntax",
              text: "Every string that starts with \" must end with \". Count the quotes.",
            },
          ],
          feedback: {
            correct: 'Fixed! The string now has both an opening and closing quote: "Welcome to Python!"',
            incorrect:
              "Look at the string inside print(). Every opening quote needs a matching closing quote.",
          },
        },
        {
          id: "s1-re-mc-error-type",
          kind: "multiple-choice",
          prompt:
            "Python raises a **NameError** when:\n\n```python\nprint(greeting)\n```\n\nWhat is the most likely cause of this NameError?",
          beginnerPurpose:
            "Distinguish between error types so the learner can diagnose bugs faster.",
          expectedConceptIds: ["error"],
          options: [
            {
              id: "opt-a",
              text: "The quotes around greeting are missing",
              isCorrect: false,
              explanation:
                "Missing quotes would cause a SyntaxError. A NameError is about an undefined name.",
            },
            {
              id: "opt-b",
              text: "The variable `greeting` was never assigned a value before this line",
              isCorrect: true,
              explanation:
                "A NameError means Python looked up the name `greeting` and couldn't find it. You need to assign it a value first.",
            },
            {
              id: "opt-c",
              text: "print() is spelled incorrectly",
              isCorrect: false,
              explanation:
                "If print were misspelled, that would also be a NameError — but in this code print is correct; the issue is the undefined variable `greeting`.",
            },
            {
              id: "opt-d",
              text: "The program is too short to run",
              isCorrect: false,
              explanation:
                "Python can run a program with a single line. Length is not the issue.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "NameError means Python heard a name it doesn't recognise. Where do names come from in Python?",
            },
          ],
          feedback: {
            correct:
              "Exactly! A NameError occurs when you use a variable or function name that Python has never seen defined.",
            incorrect:
              "A NameError is specifically about an unknown name. The variable `greeting` was never given a value before Python tried to use it.",
          },
        },
        {
          id: "s1-re-predict-error",
          kind: "predict-output",
          prompt:
            "Will this code run without errors? If not, what type of error will Python raise?",
          beginnerPurpose:
            "Build the habit of reading code for errors before running it.",
          expectedConceptIds: ["error"],
          code: 'name = "Alice"\nprint(name)',
          expectedOutput: "Alice",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Check: is name assigned a value before print(name) is called?",
            },
          ],
          feedback: {
            correct:
              "Correct! name is assigned on line 1, so print(name) on line 2 succeeds and prints Alice.",
            incorrect:
              "Trace through the code: line 1 assigns the string \"Alice\" to name, and line 2 prints it. No error occurs.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "error",
          recallPrompt:
            "Name two common Python error types and describe what causes each.",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s1-re-debug-missing-quote",
          "s1-re-mc-error-type",
          "s1-re-predict-error",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["error"],
      },
    },

    /* ── Lesson 5: Comments and Code Clarity ──────────────────────────────── */
    {
      id: "s1-comments-and-clarity",
      stageId: "stage-01",
      title: "Comments and Code Clarity",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write single-line comments using the # character",
        "Explain why comments exist and when to use them",
        "Understand that comments are ignored by the Python interpreter",
      ],
      prerequisites: ["s1-reading-errors"],
      concepts: ["comment"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Is a Comment?\n\nA **comment** is a note written in your code that Python completely ignores. It is meant for humans — you, your teammates, or your future self — not for the computer.\n\nIn Python, any text that follows a `#` on a line is a comment:\n\n```python\n# This is a comment — Python ignores it\nprint(\"Hello\")  # This part is code; this part is a comment\n```\n\nComments help explain *why* code works the way it does, not just *what* it does.",
        },
        {
          kind: "comparison",
          leftLabel: "Without Comments",
          rightLabel: "With Comments",
          leftCode:
            'print("Hello, Alice")\nprint("You have 3 messages")\nprint("Last login: Monday")',
          rightCode:
            '# Greet the user by name\nprint("Hello, Alice")\n# Show notification count\nprint("You have 3 messages")\n# Show last login date\nprint("Last login: Monday")',
          caption:
            "Both programs produce identical output, but the version on the right is far easier to understand at a glance.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "When to Add a Comment",
          body: "Add a comment when the *reason* for a line isn't obvious from reading the code. You don't need to comment every single line — that creates noise. Focus on the 'why', not the 'what'.",
        },
      ],
      interactions: [
        {
          id: "s1-cc-mc-valid-comment",
          kind: "multiple-choice",
          prompt: "Which of the following is a valid Python comment?",
          beginnerPurpose:
            "Confirm the learner can identify correct comment syntax.",
          expectedConceptIds: ["comment"],
          options: [
            {
              id: "opt-a",
              text: "// This is a comment",
              isCorrect: false,
              explanation:
                "// is used for comments in languages like JavaScript and C, not Python.",
            },
            {
              id: "opt-b",
              text: "/* This is a comment */",
              isCorrect: false,
              explanation:
                "/* */ is block-comment syntax from C/Java — not valid Python comment syntax.",
            },
            {
              id: "opt-c",
              text: "# This is a comment",
              isCorrect: true,
              explanation:
                "Correct! The # character starts a comment in Python. Everything after # on that line is ignored.",
            },
            {
              id: "opt-d",
              text: "-- This is a comment",
              isCorrect: false,
              explanation: "-- is used for comments in SQL and Lua, not Python.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "syntax",
              text: "Python uses a single special character to start a comment.",
            },
          ],
          feedback: {
            correct: "Right! # is the comment character in Python.",
            incorrect:
              "Python uses the # character to start a comment. Everything after # on that line is ignored by the interpreter.",
          },
        },
        {
          id: "s1-cc-fill-comment",
          kind: "fill-code",
          prompt:
            "Add a comment on the blank line that explains the purpose of the print statement.",
          beginnerPurpose: "Practice writing a comment in the correct location with correct syntax.",
          expectedConceptIds: ["comment"],
          codeTemplate: "___\nprint(\"Program starting...\")",
          blanks: [
            {
              placeholder: "___",
              answer: "# Display startup message",
              caseSensitive: false,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "A comment line starts with # followed by your description.",
            },
          ],
          feedback: {
            correct: "Good! Your comment starts with # and describes what the code does.",
            incorrect: "Remember: a comment starts with # on its own line or after code.",
          },
        },
        {
          id: "s1-cc-predict-comment-output",
          kind: "predict-output",
          prompt:
            "What will this program print? (Be careful — look at every line.)",
          beginnerPurpose:
            "Prove that comments produce no output — they are invisible to the interpreter.",
          expectedConceptIds: ["comment"],
          code: '# This program greets the world\nprint("Hello!")\n# The next line is also a comment\n# print("This won\'t print")\nprint("Goodbye!")',
          expectedOutput: "Hello!\nGoodbye!",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Python ignores everything on a line after #. How many print() calls are NOT commented out?",
            },
          ],
          feedback: {
            correct:
              'Correct! Only the two uncommented print() calls run. The commented-out print("This won\'t print") is ignored.',
            incorrect:
              "Comments are completely invisible to Python. Lines starting with # produce no output, even if they contain print().",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "comment",
          recallPrompt: "How do you write a comment in Python, and what effect does it have when the program runs?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s1-cc-mc-valid-comment",
          "s1-cc-fill-comment",
          "s1-cc-predict-comment-output",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["comment"],
      },
    },
  ],

  project: {
    id: "s1-project",
    stageId: "stage-01",
    title: "Hello, World — Your First Program",
    brief:
      "Write a complete Python program that introduces yourself using multiple print statements and at least two comments.",
    requirements: [
      "At least 4 print() calls",
      "At least 2 comments (lines starting with #)",
      "No errors when run",
      "Output reads as a coherent introduction",
    ],
    acceptanceCriteria: [
      "Program runs without errors",
      "Output contains your name",
      "Comments explain what the code does",
    ],
    conceptIds: ["output", "comment", "program", "interpreter"],
    difficulty: "beginner",
    starterCode: "# My first Python program\n# Write your introduction below\n\n",
  },
} satisfies Stage;
