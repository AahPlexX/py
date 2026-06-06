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
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## What Problem Does This Solve?\n\nComputers are extraordinarily fast and precise, but they have one limitation: they do exactly what they are told, nothing more. Left alone, a computer sits idle. To make it do anything useful — sort a list of names, display a webpage, play a sound — you need a way to give it clear, unambiguous instructions.\n\nThis lesson is about that very thing: what a set of instructions for a computer looks like, and how Python lets you write one.",
        },
        /* SECTION 3 — CORE CONCEPTS: program */
        {
          kind: "text",
          markdown:
            "## The Need for Ordered Instructions\n\nImagine asking someone to bake a cake by shouting a jumbled list of tasks at them all at once. They would not know where to start or what order to follow, and the result would be chaos.\n\nWhat actually works is a **recipe**: a numbered list of steps written in the right order, precise enough that any competent person can follow them and get the same result every time.\n\nA computer program is exactly that recipe — a written list of steps that a computer can follow precisely, one after another, to accomplish a task. In Python, each step is written on its own line, and the computer works through them from top to bottom.\n\nThe technical term for this ordered list of steps is a **program**.",
        },
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
            "### Your First Program\n\nThe example below is a complete Python program. It contains a single instruction: display the word `Hello` on the screen.\n\nNotice the structure: the word `print`, then parentheses, then a piece of text wrapped in quotes. You will learn exactly what each part means in the next few lessons. For now, focus on the big picture — this is what one step in a program looks like.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("Hello")',
          caption:
            "The simplest Python program: one instruction that tells Python to display the word Hello.",
        },
        {
          kind: "text",
          markdown:
            "### Step by Step\n\nWhen Python runs the program above, it reads the instruction on line 1, carries it out (displaying `Hello`), and then stops because there are no more instructions. If you add more lines, Python works through each one in order.\n\nThat thing doing the reading and carrying-out is called the **interpreter** — the program that reads your Python code and executes it. You will explore it in depth in the next lesson. For now, picture it as the cook following your recipe.",
        },
        /* SECTION 3 — core concept: output */
        {
          kind: "text",
          markdown:
            "## Showing Results: Output\n\nA program that does useful work usually needs to communicate its results back to you. The simplest way is to write text to the screen. In programming, anything a program sends to the screen (or to another destination) is called **output**.\n\n`print()` is Python's built-in tool for producing output. Whatever you place inside its parentheses appears on the screen when that line runs.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("Hello, world!")\nprint("This is my first program.")\nprint("Each print call adds one line.")',
          caption:
            "Three print() calls produce three lines of output, in order.",
        },
        {
          kind: "text",
          markdown:
            "### What Just Happened\n\n1. Python reads line 1 and displays `Hello, world!`.\n2. Python reads line 2 and displays `This is my first program.`\n3. Python reads line 3 and displays `Each print call adds one line.`\n\nEach `print()` call produces exactly one line of output. More calls produce more lines.\n\n**Variation:** What would happen if you moved line 3 above line 1? Python would display `Each print call adds one line.` first, then the other two in their new order. The output always follows the order of the instructions.",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "## Variations: Multiple Instructions\n\nA real program is rarely just one line. You can write as many instructions as you need, and Python will run them all in sequence.",
        },
        {
          kind: "code",
          language: "python",
          code: '# A small program with five instructions\nprint("Step 1: Start")\nprint("Step 2: Doing work...")\nprint("Step 3: More work...")\nprint("Step 4: Almost done.")\nprint("Step 5: Finished!")',
          caption:
            "A five-step program. Each line is one instruction. Python follows them in order.",
        },
        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "What Breaks: Missing Parentheses",
          body: "If you forget the parentheses on a print call, Python raises a SyntaxError and stops. The instruction is incomplete — Python cannot tell what you meant. Every print() call must have opening and closing parentheses.",
        },
        {
          kind: "code",
          language: "python",
          code: '# BROKEN — missing parentheses\nprint "Hello"',
          caption:
            "This is Python 2 syntax. In Python 3, print without parentheses is a SyntaxError.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Understanding that programs are just sequences of instructions removes the mystery from programming. There is no magic — just clear, ordered steps. Once you internalise this, reading and writing code becomes a matter of thinking through steps, not memorising spells. You can now read any short Python program and trace what it will do line by line.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "Consider this program:\n\n```python\nprint(\"Banana\")\nprint(\"Apple\")\nprint(\"Cherry\")\n```\n\nA classmate claims the output will be: Apple, Banana, Cherry — alphabetical order. Are they right? If not, what will the output actually be, and why?",
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
          prompt: "What will Python print when it runs this code?",
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
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## What Problem Does This Solve?\n\nIn the previous lesson you wrote Python instructions and saw that they run in order. But a question remains: what actually runs them? You write text in a file — how does that text become action on the screen?\n\nUnderstanding this will let you predict exactly what your program will do, and will help you diagnose problems when things do not happen in the order you expected.",
        },
        /* SECTION 2 — PREREQUISITES */
        {
          kind: "text",
          markdown:
            "### What You Need to Know First\n\nThis lesson builds on the idea that a Python program is a sequence of instructions. If you have not completed the previous lesson, review it first. The key idea to carry forward: a program is a list of steps written in order.",
        },
        /* SECTION 3 — CORE CONCEPTS: interpreter */
        {
          kind: "text",
          markdown:
            "## What Actually Runs Your Code?\n\nWhen you write a Python program, you are writing plain text. Plain text by itself does nothing. Something has to read that text and translate each instruction into action.\n\nThat something is called the **interpreter**. The Python interpreter is a program that:\n\n1. Reads your code from the top.\n2. Translates the first line into something the computer can perform.\n3. Carries it out.\n4. Moves to the next line and repeats.\n\nThis process — reading and executing one line at a time — is called **interpreted execution**. It is why Python is called an interpreted language. The interpreter is always present, silently doing its work as your code runs.",
        },
        {
          kind: "mental-model",
          title: "Reading a Book Top to Bottom",
          analogy:
            "Imagine reading a book: you start at the first word on the first line, read left to right, then move to the next line. You never jump ahead or skip back (unless the story tells you to). Python's interpreter works the same way.",
          explanation:
            "The interpreter processes line 1 completely before moving to line 2. If line 1 causes an error, execution stops there — lines 2 and 3 never run.",
        },
        {
          kind: "text",
          markdown:
            "### Seeing Execution Order in Action\n\nThe example below has three `print()` calls. Because the interpreter works from top to bottom, the output will appear in exactly the same order as the lines in the code.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("First")   # interpreter runs this first\nprint("Second")  # then this\nprint("Third")   # then this',
          caption:
            "Python runs these three lines in order: First, then Second, then Third.",
        },
        {
          kind: "text",
          markdown:
            "### Step-by-Step Narration\n\n1. The interpreter reads line 1: `print(\"First\")`. It carries out the instruction and displays `First`.\n2. It moves to line 2: `print(\"Second\")`. It displays `Second`.\n3. It moves to line 3: `print(\"Third\")`. It displays `Third`.\n4. There are no more lines. The program ends.\n\n**Variation:** What would happen if line 2 (`print(\"Second\")`) were deleted? The output would be `First` then `Third` — exactly the remaining two lines, in their new order. The interpreter always works with whatever lines exist, from top to bottom.",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "## What Happens If a Line Has an Error?\n\nThe interpreter stops the moment it encounters something it cannot execute. Lines that come after the error never run. This is important: an error on line 2 means line 3 is silently skipped.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("Line 1 runs fine")\nprint("Line 2 also runs")\n# If there were a broken line here, line 4 would never execute\nprint("Line 4 runs because line 3 is a comment, not an error")',
          caption:
            "As long as each line is valid, the interpreter reaches the end. An error at any line stops all subsequent lines.",
        },
        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "What Breaks: Assuming Lines Run Out of Order",
          body: "A common mistake is writing code that assumes a later line has already run. For example, trying to use a value that is only created three lines later. The interpreter never looks ahead — it only knows about lines it has already executed. Always arrange instructions so each line can rely only on what the lines above it have already done.",
        },
        {
          kind: "code",
          language: "python",
          code: '# BROKEN — trying to use a name before it is defined\nprint(message)      # Error: message does not exist yet\nmessage = "Hello"   # This line never runs because the error above stopped everything',
          caption:
            "The interpreter reaches line 1 first. message has not been created yet, so a NameError stops execution.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Now that you understand the interpreter, you can predict any program's output just by reading from top to bottom. You also know why errors on one line prevent later lines from running — a critical insight for debugging. In the next lesson you will learn to produce output in more detail, and the lesson after that shows you how to read the error messages the interpreter produces when something goes wrong.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A classmate writes this program:\n\n```python\nprint(\"Ready\")\nprint(\"Set\")\nprint(\"Go\")\n```\n\nThey then swap lines 1 and 3 so it becomes:\n\n```python\nprint(\"Go\")\nprint(\"Set\")\nprint(\"Ready\")\n```\n\nWhat will the output be now, and why does this demonstrate how the interpreter works?",
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
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## What Problem Does This Solve?\n\nYou have seen `print()` appear in examples, but you have not yet looked closely at what it requires or how it works. Without understanding the rules for writing output, you cannot produce even the simplest program reliably. This lesson gives you that foundation.",
        },
        /* SECTION 2 — PREREQUISITES */
        {
          kind: "text",
          markdown:
            "### What You Need to Know First\n\nThis lesson assumes you understand that a program is a sequence of instructions and that the interpreter runs them top to bottom. You also need to understand what output means — text that your program sends to the screen. Both of these were covered in the previous two lessons.",
        },
        /* SECTION 3 — CORE CONCEPTS: print() and strings */
        {
          kind: "text",
          markdown:
            "## The Need to Display Information\n\nImagine writing a program that calculates the answer to a maths problem, but never tells you the answer. That would be useless. Programs need a way to hand results back to the person running them.\n\nPython's built-in tool for doing this is called `print()`. You pass it a piece of text — or a value — and it displays that text on the screen. The technical term for what `print()` does is producing **output**.",
        },
        {
          kind: "text",
          markdown:
            "## Representing Text: String Literals\n\nBefore you can display text, Python needs to know that what you typed is text and not an instruction. The way you mark something as text in Python is to wrap it in quote marks.\n\nAny piece of text wrapped in quotes is called a **string**. You can use either single quotes or double quotes — both work. The only rule is that the same type of quote must open and close the string.",
        },
        {
          kind: "code",
          language: "python",
          code: '# Single quotes\nprint(\'Hello from single quotes\')\n\n# Double quotes\nprint("Hello from double quotes")\n\n# Both produce identical output',
          caption:
            "Single and double quotes both create strings. Choose whichever is cleaner for your content.",
        },
        {
          kind: "text",
          markdown:
            "### Step-by-Step Narration\n\n1. Python reads `print('Hello from single quotes')`.\n2. It sees the text between the single quotes: `Hello from single quotes`.\n3. It displays that text on the screen. The quotes themselves do not appear.\n4. It moves to the next line and repeats.\n\n**Variation:** What if you typed `print('Hello')` with double quotes inside, like `print(\"Hello\")`? The output would be identical: `Hello`. The choice of quote type only matters when the text itself contains a quote character.",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "## Calling print() Multiple Times\n\nEach call to `print()` produces one line of output. To produce multiple lines, write multiple `print()` calls. There is no limit to how many you can write.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("Line one")\nprint("Line two")\nprint("Line three")\nprint("Line four")',
          caption:
            "Four print() calls produce four lines of output, in order.",
        },
        {
          kind: "text",
          markdown:
            "## Printing an Empty Line\n\nCalling `print()` with nothing inside the parentheses prints an empty line — useful for spacing output.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("Section A")\nprint()           # empty line for spacing\nprint("Section B")',
          caption:
            "print() with no argument outputs a blank line.",
        },
        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "What Breaks: Forgetting Quotes",
          body: "If you write print(Hello) without quotes, Python looks for a variable called Hello. If no variable by that name exists, you get a NameError. The quotes are what tell Python this is a piece of text, not a name. Always wrap text in quotes inside print().",
        },
        {
          kind: "code",
          language: "python",
          code: "# BROKEN — no quotes around the text\nprint(Hello)\n\n# FIXED\nprint(\"Hello\")",
          caption:
            "Without quotes, Python treats Hello as a variable name. With quotes, it treats it as text.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "With print() and string literals, you can make any program communicate its results. Every program you write from here on will use output in some form. In the next lesson you will learn what Python does when something goes wrong and how to read its error messages — an essential skill for fixing your own programs.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "Consider this code:\n\n```python\nprint('It\\'s a test')\n```\n\nA classmate says this will raise a SyntaxError because the string contains a single quote. Another classmate says it will print `It's a test` just fine. Who is right, and what is the backslash doing?",
        },
      ],
      interactions: [
        {
          id: "s1-yfo-fill-print",
          kind: "fill-code",
          prompt: "Complete the print() call so it outputs: Hello, Python!",
          beginnerPurpose: "Practice writing a complete print() call with a string argument.",
          expectedConceptIds: ["output"],
          codeTemplate: "print(___)",
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
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## What Problem Does This Solve?\n\nEvery programmer, at every level, writes code that fails to run. When Python cannot execute your instructions, it stops and prints a message explaining what went wrong. Without knowing how to read that message, you are left guessing. With it, you can find and fix problems quickly.\n\nThis lesson teaches you to read Python's error messages confidently, turning what feels like failure into useful information.",
        },
        /* SECTION 2 — PREREQUISITES */
        {
          kind: "text",
          markdown:
            "### What You Need to Know First\n\nThis lesson builds on your knowledge of `print()` and string literals. The broken code examples below involve mistakes in those areas, so make sure you are comfortable with how `print()` works before continuing.",
        },
        /* SECTION 3 — CORE CONCEPTS: SyntaxError */
        {
          kind: "text",
          markdown:
            "## When Python Cannot Understand Your Code: SyntaxError\n\nImagine sending someone a sentence with the grammar so broken that they cannot tell what it means at all. They would stop and ask you to clarify. Python does the same thing.\n\nA **SyntaxError** occurs when Python reads a line that it cannot parse — the code does not follow Python's grammatical rules. Python detects this before even trying to run the program. The most common cause for beginners is a missing or mismatched quote.\n\nWhen Python encounters a SyntaxError, it prints a message that includes:\n- The **file name** and **line number** where the problem was detected\n- A copy of the **problematic line**\n- A caret `^` pointing to the approximate location of the issue\n- The label `SyntaxError` followed by a short description",
        },
        {
          kind: "code",
          language: "python",
          code: '# BROKEN — closing quote is missing\nprint("Hello, world!)',
          caption: "Can you spot the bug? The closing double quote is missing on line 2.",
        },
        {
          kind: "text",
          markdown:
            "When you run the broken code above, Python produces output similar to:\n\n```\nFile \"example.py\", line 2\n    print(\"Hello, world!)\n          ^\nSyntaxError: EOL while scanning string literal\n```\n\nReading this message:\n1. **Line 2** is where the problem is.\n2. The `^` points near the start of the string.\n3. `EOL while scanning string literal` means Python reached the end of the line without finding the closing quote.\n\n**The fix:** add the missing closing quote: `print(\"Hello, world!\")`",
        },
        /* SECTION 3 — CORE CONCEPTS: NameError */
        {
          kind: "text",
          markdown:
            "## When Python Cannot Find a Name: NameError\n\nNow imagine asking someone \"Please pass me the thingamabob\" when they have never heard of a thingamabob and there is no such object in the room. They cannot comply.\n\nPython faces the same situation when you use a word that it has never been given a definition for. A **NameError** occurs when Python encounters a name — a variable or function — that has not been defined at that point in the program.\n\nThe message includes the label `NameError` and tells you which name it could not find.",
        },
        {
          kind: "code",
          language: "python",
          code: "# BROKEN — the variable 'message' was never defined\nprint(message)",
          caption: "NameError: Python looks up 'message', finds nothing, and stops.",
        },
        {
          kind: "text",
          markdown:
            "Python produces output like:\n\n```\nNameError: name 'message' is not defined\n```\n\nThe fix is either to define `message` before using it, or — if you meant to print a string literal — to add quotes: `print(\"message\")`.\n\nSyntaxError and NameError are the two most common errors beginners encounter. Being able to tell them apart speeds up debugging considerably.",
        },
        {
          kind: "comparison",
          leftLabel: "SyntaxError",
          rightLabel: "NameError",
          leftCode: "# Broken grammar — Python cannot parse it\nprint(\"Hello)",
          rightCode: "# Valid grammar, unknown name\nprint(greeting)",
          caption:
            "SyntaxError: Python cannot even read the line. NameError: Python read it fine, but found an undefined name.",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "## Errors Are Information, Not Judgement\n\nBeginner programmers sometimes feel embarrassed when their code produces an error. This is the wrong way to think about it. Every professional programmer sees errors dozens of times a day. An error message is Python handing you a map to the exact location of the problem.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "How to Read Any Error Message",
          body: "Step 1: Find the line number. Step 2: Look at that line in your code. Step 3: Read the error type (SyntaxError, NameError, etc.). Step 4: Read the short description after the colon. Step 5: Fix that specific issue. Do not try to fix everything at once — fix one error, run again, repeat.",
        },
        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "What Breaks: Ignoring the Line Number",
          body: "When beginners see an error, they sometimes start changing random parts of the code hoping something will work. This makes things worse. The line number in the error message tells you exactly where to look. Trust it. Go to that line and read carefully before changing anything.",
        },
        {
          kind: "code",
          language: "python",
          code: '# Python reports the error on line 3\nname = "Alice"\nprint(nme)         # typo: nme instead of name\nprint("Done")',
          caption:
            "The NameError points to line 3. Only line 3 needs fixing. Lines 1, 2, and 4 are fine.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Reading errors is the foundation of debugging. Every lesson from here on will involve writing code, running it, and fixing any errors that appear. The faster you can read an error message and locate the problem, the faster you will learn. In the next lesson you will learn about comments — a way to add notes to your code that the interpreter ignores completely.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "You run a program and see this error:\n\n```\nNameError: name 'total' is not defined\n```\n\nYour first instinct is to add quotes around `total` so it becomes `print(\"total\")`. Is this always the right fix? Describe a situation where the correct fix would be different.",
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
        /* SECTION 1 — ORIENTATION */
        {
          kind: "text",
          markdown:
            "## What Problem Does This Solve?\n\nCode is written once but read many times — by you, by teammates, and by your future self who has forgotten why you made certain choices. A program that works but cannot be understood is almost as dangerous as one that does not work at all.\n\nThis lesson introduces a tool that lets you leave notes inside your code without affecting how the program runs: the comment.",
        },
        /* SECTION 2 — PREREQUISITES */
        {
          kind: "text",
          markdown:
            "### What You Need to Know First\n\nThis lesson assumes you can write Python instructions and understand that the interpreter runs them in order. You also need to know what a `print()` call looks like, since the examples mix code and comments.",
        },
        /* SECTION 3 — CORE CONCEPTS: comment */
        {
          kind: "text",
          markdown:
            "## The Need to Leave Notes\n\nImagine returning to a recipe you wrote six months ago. You followed some unusual step — say, adding vinegar before the flour — and now you have no idea why. If only you had written a note next to that step explaining your reasoning.\n\nCode has the same problem. A line of Python instructions tells you *what* happens, but not *why* it happens that way. You need a way to write notes inside the code that explain the reasoning — notes that the computer ignores entirely.\n\nIn Python, anything on a line after the `#` character is called a **comment**. The interpreter skips it completely. Comments exist solely for the humans reading the code.",
        },
        {
          kind: "mental-model",
          title: "Comments Are Sticky Notes on Your Code",
          analogy:
            "Picture a printed document with yellow sticky notes attached. The sticky notes explain the document but are not part of it. A reader can read the document without the sticky notes, but the notes add valuable context. A Python comment is exactly that sticky note.",
          explanation:
            "The Python interpreter processes your code but ignores every comment. The comment is invisible to the program at runtime — it has zero effect on what the program does. Its only audience is a human reading the source file.",
        },
        {
          kind: "text",
          markdown:
            "### Writing Comments\n\nYou write a comment by placing a `#` anywhere on a line. Everything from the `#` to the end of that line is the comment.\n\n- A **whole-line comment** starts at the beginning: `# this is a comment`\n- An **inline comment** follows code on the same line: `print(\"Hello\")  # greet the user`",
        },
        {
          kind: "code",
          language: "python",
          code: "# This program greets the user\n# Written by: a Python learner\n\nprint(\"Hello!\")        # display a greeting\nprint(\"Welcome.\")     # display a welcome message",
          caption:
            "Two whole-line comments at the top, two inline comments on the print lines. The output is the same as if the comments were not there.",
        },
        {
          kind: "text",
          markdown:
            "### Step-by-Step Narration\n\n1. The interpreter reads line 1. It sees `#` and skips the rest of the line.\n2. It reads line 2. Same: skipped.\n3. It reads line 3. It is blank — also skipped.\n4. It reads line 4 up to the `#`: `print(\"Hello!\")`. It runs this instruction and displays `Hello!`. The comment after `#` is ignored.\n5. It reads line 5 and does the same.\n\n**Variation:** What would happen if you wrote `# print(\"Hello!\")` — a whole-line comment around a print call? Python would ignore it entirely. No output would be produced by that line. This is called **commenting out** a line — a useful debugging technique.",
        },
        /* SECTION 4 — VARIATIONS */
        {
          kind: "text",
          markdown:
            "## When to Comment\n\nNot every line needs a comment. Commenting everything creates noise and makes the code harder to read, not easier. Good comments explain:\n\n- **Why** a choice was made (not what the code does — the code itself says that)\n- **Non-obvious logic** that would confuse a reader\n- **Section headers** that divide a long program into meaningful parts",
        },
        {
          kind: "comparison",
          leftLabel: "Over-commented (noise)",
          rightLabel: "Well-commented (signal)",
          leftCode: "# assign 5 to x\nx = 5\n# assign 3 to y\ny = 3\n# add x and y and store in total\ntotal = x + y",
          rightCode: "x = 5\ny = 3\ntotal = x + y  # sum used in later tax calculation",
          caption:
            "The left column restates what the code already says clearly. The right column adds the one piece of context the code cannot convey on its own.",
        },
        /* SECTION 5 — BREAKDOWN */
        {
          kind: "callout",
          variant: "danger",
          title: "What Breaks: Putting # Inside a String",
          body: "A # inside a string is not a comment — it is just the hash character. Only a # that appears outside of quotes starts a comment. Be careful: print(\"Hello # world\") prints Hello # world including the hash. The hash inside the quotes is part of the string, not a comment marker.",
        },
        {
          kind: "code",
          language: "python",
          code: 'print("Hello # world")    # this IS a comment (outside the string)\n# print("Goodbye")        # this is also a comment — the print never runs',
          caption:
            "The # inside the string is plain text. The # outside the string starts a comment.",
        },
        /* SECTION 6 — WHAT THIS OPENS UP */
        {
          kind: "why-matters",
          body: "Comments are your primary tool for making code readable to humans. You have now covered all five foundational ideas of this stage: what programs are, how the interpreter runs them, how to produce output, how to read errors, and how to annotate your code. You are ready to move into Stage 2, where you will store and manipulate data using variables.",
        },
        /* SECTION 7 — COMPREHENSION CHECK */
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension Check",
          body: "A classmate has this code:\n\n```python\nprint(\"Starting\")\n# print(\"Middle\")\nprint(\"Ending\")\n```\n\nThey expect to see three lines of output. What will they actually see, and why? What change would make their expectation correct?",
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
              "Correct! Only the two uncommented print() calls run. The commented-out print is ignored.",
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
