import type { Stage } from "@/course/course.schema";

export const stage01 = {
  id: "stage-01",
  number: 1,
  title: "Absolute Zero Programming Foundations",
  summary:
    "Understand what a program is, what programming languages do, what Python is, and how to think algorithmically before writing a single line of code.",
  level: "beginner",
  masteryGateConceptIds: ["program-definition", "algorithm-thinking", "python-overview"],

  lessons: [
    {
      id: "s1-what-is-a-program",
      stageId: "stage-01",
      title: "What a Computer Program Is",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Define a computer program in plain language",
        "Explain the concepts of instructions, sequence, input, processing, and output",
        "Recognise that a program is an exact, ordered list of steps",
      ],
      prerequisites: [],
      concepts: ["program-definition"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Is a Computer Program?\n\nA **computer program** is an ordered list of instructions written for a computer to execute. Like a recipe that a cook follows step by step, a program tells the computer exactly what to do — and in what order.\n\nEvery program involves these fundamental ideas:\n\n- **Instructions**: individual commands (`print`, `add`, `compare`)\n- **Sequence**: instructions execute one after another, top to bottom\n- **Input**: data the program receives (from keyboard, file, or network)\n- **Processing**: transforming input into a useful result\n- **Output**: what the program produces (text on screen, a file, a network response)\n\n```python\n# A tiny program demonstrating all five concepts:\nmessage = input('Enter your name: ')   # INPUT\ngreeting = 'Hello, ' + message         # PROCESSING\nprint(greeting)                         # OUTPUT\n```",
        },
        {
          kind: "mental-model",
          title: "A Program Is Like a Recipe",
          analogy:
            "A recipe lists exact steps in order, and the cook follows every step precisely. A computer program does the same — a list of exact steps for the computer to follow.",
          explanation:
            "Just like a recipe cannot skip steps or guess what the chef meant, a program must be completely unambiguous. The computer executes every instruction exactly as written.",
        },
        {
          kind: "why-matters",
          body: "Understanding that programs are just sequences of instructions removes the mystery from programming. There is no magic — just clear, ordered steps. Once you internalise this, reading and writing code becomes a matter of thinking through steps.",
        },
      ],
      interactions: [
        {
          id: "s1-program-mc",
          kind: "multiple-choice",
          prompt: "Which of the following best describes a computer program?",
          beginnerPurpose: "Confirm understanding of the program definition.",
          expectedConceptIds: ["program-definition"],
          options: [
            { id: "a", text: "A piece of hardware inside the computer", isCorrect: false, explanation: "Hardware is physical equipment. A program is software — instructions, not physical parts." },
            { id: "b", text: "An ordered list of instructions that a computer executes", isCorrect: true, explanation: "Correct! A program is an exact, ordered set of instructions the computer follows step by step." },
            { id: "c", text: "A collection of random data stored on disk", isCorrect: false, explanation: "Programs are meaningful, ordered instructions — not random data." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about the recipe analogy: what is a recipe in terms of steps?" }],
          feedback: { correct: "Correct! A program is a sequence of instructions — like a recipe for the computer.", incorrect: "A program is an ordered set of instructions the computer follows step by step." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-program-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-programming-languages",
      stageId: "stage-01",
      title: "What Programming Languages Are",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain why programming languages exist",
        "Distinguish between human-readable source code and machine code",
        "Describe the difference between an interpreter and a compiler",
      ],
      prerequisites: ["s1-what-is-a-program"],
      concepts: ["programming-language"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Why Programming Languages Exist\n\nComputers only understand binary (0s and 1s). Writing programs directly in binary would be tedious and error-prone. **Programming languages** are a middle ground — they let you write instructions in human-readable text, then automatically translate that text into instructions the computer can run.\n\n```\nHuman-readable code   →   Translation   →   Machine execution\nprint('Hello')            (interpreter)      CPU executes\n```\n\n## Interpreters vs Compilers\n\n| Approach | How it works | Examples |\n|----------|-------------|----------|\n| **Interpreter** | Translates and runs code line by line | Python, Ruby |\n| **Compiler** | Translates the entire program first, then runs the result | C, Rust, Go |\n\nPython is an **interpreted** language — the Python interpreter reads your code and runs it immediately, line by line.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "High-level vs Low-level Languages",
          body: "Python is a high-level language — it uses words close to English. Assembly is a low-level language — it uses mnemonic codes close to machine instructions. High-level languages are easier to read and write but require translation. Low-level languages give more control but are harder to write.",
        },
      ],
      interactions: [
        {
          id: "s1-lang-mc",
          kind: "multiple-choice",
          prompt: "What is the key difference between an interpreter and a compiler?",
          beginnerPurpose: "Distinguish the two translation approaches.",
          expectedConceptIds: ["programming-language"],
          options: [
            { id: "a", text: "An interpreter translates and runs code line by line; a compiler translates the whole program first", isCorrect: true, explanation: "Correct! Python uses an interpreter that reads and runs code one line at a time." },
            { id: "b", text: "An interpreter is faster than a compiler at runtime", isCorrect: false, explanation: "Compiled code is usually faster at runtime because the translation is done in advance." },
            { id: "c", text: "A compiler only works with high-level languages", isCorrect: false, explanation: "Both interpreters and compilers can work with high-level languages." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about when the translation happens — before running, or while running?" }],
          feedback: { correct: "Correct! Python is interpreted — it translates each line as it runs.", incorrect: "An interpreter translates and runs code line by line; a compiler translates the entire program before running it." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-lang-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-what-is-python",
      stageId: "stage-01",
      title: "What Python Is",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Describe Python as an interpreted, general-purpose language",
        "Explain Python's emphasis on readability",
        "Name areas where Python is commonly used",
      ],
      prerequisites: ["s1-programming-languages"],
      concepts: ["python-overview"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Python Is\n\nPython is a **general-purpose, interpreted, high-level programming language** created by Guido van Rossum and first released in 1991. Its design philosophy emphasises code readability — Python code often reads almost like plain English.\n\n**Python's key characteristics:**\n- **Interpreted**: code runs line by line; no separate compile step\n- **General-purpose**: used for web development, data science, automation, AI/ML, scripting, and more\n- **High-level**: handles memory management, types, and other low-level details automatically\n- **Large standard library**: hundreds of built-in modules for common tasks\n- **Cross-platform**: runs on Windows, macOS, Linux\n\n```python\n# Python code reads almost like English:\nnames = ['Alice', 'Bob', 'Carol']\nfor name in names:\n    print(f'Hello, {name}!')\n```",
        },
        {
          kind: "why-matters",
          body: "Python is consistently ranked among the top 3 most popular programming languages in the world. It is the dominant language for data science, machine learning, and scripting. Learning Python opens doors to virtually every area of software development.",
        },
      ],
      interactions: [
        {
          id: "s1-python-mc",
          kind: "multiple-choice",
          prompt: "Which characteristic is NOT true of Python?",
          beginnerPurpose: "Confirm understanding of Python's nature.",
          expectedConceptIds: ["python-overview"],
          options: [
            { id: "a", text: "Python is interpreted — it runs code line by line", isCorrect: false, explanation: "This IS true. Python is interpreted." },
            { id: "b", text: "Python requires you to manually manage memory allocation", isCorrect: true, explanation: "Correct — Python handles memory management automatically. You do NOT need to manually allocate or free memory." },
            { id: "c", text: "Python is general-purpose — usable for web, data, automation", isCorrect: false, explanation: "This IS true. Python is indeed general-purpose." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "One of these descriptions fits C/C++ but not Python." }],
          feedback: { correct: "Correct! Python handles memory management for you automatically.", incorrect: "Python is a high-level language that handles memory management automatically — you don't need to manage it yourself." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-python-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-what-programmers-do",
      stageId: "stage-01",
      title: "What a Programmer Does",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Describe the programmer's core workflow: break down, code, test, correct",
        "Explain why precision matters in programming",
        "Recognise that debugging is a normal part of programming",
      ],
      prerequisites: ["s1-what-is-python"],
      concepts: ["programmer-workflow"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What a Programmer Does\n\nA programmer's job is not just typing code — it's **problem-solving**. The core workflow is:\n\n1. **Understand the problem**: what exactly needs to happen?\n2. **Break it down**: divide the problem into smaller, solvable pieces\n3. **Write code**: express the solution as precise instructions\n4. **Test**: check whether the program does what you intended\n5. **Correct**: fix anything that doesn't work and repeat\n\n**Precision matters enormously.** Computers do exactly what you say, not what you mean. A single misplaced character can change a program's behavior completely.\n\n```python\n# These two lines do very different things:\nprint(2 + 3)    # adds 2 and 3 → prints 5\nprint('2 + 3')  # treats it as text → prints 2 + 3\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Debugging is normal",
          body: "Professional programmers spend as much time finding and fixing bugs as writing new code. Getting errors is not a sign of failure — it's a normal part of the process. Every programmer, at every level, writes code that doesn't work on the first try.",
        },
      ],
      interactions: [
        {
          id: "s1-programmer-mc",
          kind: "multiple-choice",
          prompt: "Which step comes AFTER writing code in a programmer's typical workflow?",
          beginnerPurpose: "Understand the iterative nature of programming.",
          expectedConceptIds: ["programmer-workflow"],
          options: [
            { id: "a", text: "Breaking the problem into smaller pieces", isCorrect: false, explanation: "Problem breakdown happens before writing code, not after." },
            { id: "b", text: "Testing to check if the program does what was intended", isCorrect: true, explanation: "Correct! After writing code, you test it to see if it works as expected." },
            { id: "c", text: "Understanding the problem requirements", isCorrect: false, explanation: "Understanding comes first, before writing anything." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The workflow is: understand → break down → write → _____ → correct." }],
          feedback: { correct: "Correct! Testing follows coding — you check whether your code does what you intended.", incorrect: "After writing code, you test it to verify it works correctly, then correct any issues found." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-programmer-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-algorithms-before-code",
      stageId: "stage-01",
      title: "Algorithms Before Code",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Define an algorithm in plain language",
        "Recognise step-by-step thinking, ordering, conditions, and repetition",
        "Write a simple algorithm in plain English before coding",
      ],
      prerequisites: ["s1-what-programmers-do"],
      concepts: ["algorithm-thinking"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Is an Algorithm?\n\nAn **algorithm** is a precise, step-by-step set of instructions for solving a problem. Algorithms exist independently of code — you can describe them in plain English before writing a single line.\n\nGood algorithms include four elements:\n- **Steps**: individual actions\n- **Order**: steps happen in a specific sequence\n- **Conditions**: sometimes a step only happens if something is true\n- **Repetition**: sometimes steps repeat until a condition is met\n\n**Example algorithm — making tea:**\n```\n1. Fill kettle with water\n2. Boil the water\n3. Place teabag in cup\n4. Pour boiling water into cup\n5. Wait 3 minutes\n6. Remove teabag\n7. If you like milk: add milk\n8. Serve\n```\n\nNotice: steps 1–6 are sequential, step 7 is conditional (`if`), and step 5 involves waiting (repetition could be used: 'repeat until 3 minutes pass').",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Think before you type",
          body: "Professional programmers often sketch an algorithm in plain English or pseudocode before writing real code. This catches logical errors early, before they become coding bugs. The algorithm is the thinking; the code is the expression of that thinking.",
        },
      ],
      interactions: [
        {
          id: "s1-algorithm-mc",
          kind: "multiple-choice",
          prompt: "Which of these demonstrates a CONDITIONAL step in an algorithm?",
          beginnerPurpose: "Identify the four elements of an algorithm.",
          expectedConceptIds: ["algorithm-thinking"],
          options: [
            { id: "a", text: "Step 3: Add flour", isCorrect: false, explanation: "This is a plain sequential step, not conditional." },
            { id: "b", text: "Step 4: If the mixture is too dry, add water", isCorrect: true, explanation: "Correct! 'If' signals a conditional step — the action only happens when a condition is true." },
            { id: "c", text: "Step 5: Repeat mixing for 2 minutes", isCorrect: false, explanation: "This is a repetition step, not a conditional step." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "A conditional step only happens when a specific condition is true." }],
          feedback: { correct: "Correct! 'If' marks a conditional — the step only runs when the condition holds.", incorrect: "A conditional step uses 'if' — it only happens when a specific condition is true." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-algorithm-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-mental-models-for-code",
      stageId: "stage-01",
      title: "Mental Models for Code",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain what 'state' means in a running program",
        "Describe how memory, names, and values relate",
        "Trace simple execution flow mentally",
      ],
      prerequisites: ["s1-algorithms-before-code"],
      concepts: ["mental-model-code"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## How to Think About Running Code\n\nTo understand what a program does, you need mental models — ways of picturing what's happening inside the computer.\n\n**Key concepts:**\n\n- **State**: the current values of all variables at a moment in time. A program's state changes as it runs.\n- **Memory**: the computer's working space where values are stored. Think of it as a whiteboard.\n- **Names (variables)**: labels attached to locations in memory. `score = 10` writes `10` on the whiteboard and labels it `score`.\n- **Values**: the actual data stored (`10`, `'Alice'`, `True`).\n- **Execution flow**: the order in which instructions run — normally top to bottom.\n\n```python\nscore = 0        # state: score=0\nscore = score + 5  # state: score=5 (old value + 5)\nscore = score + 3  # state: score=8\nprint(score)     # output: 8\n```\n\nTrace this mentally: after each line, what is the state of `score`?",
        },
        {
          kind: "mental-model",
          title: "Memory as a Whiteboard",
          analogy:
            "Imagine a whiteboard with labeled boxes. `score = 10` writes 10 in a box labeled 'score'. `score = score + 5` reads the box, adds 5, and writes 15 back. At any moment, the whiteboard shows the program's current state.",
          explanation:
            "When you mentally trace code, update your mental whiteboard after each assignment. This is how professional programmers debug: they trace state changes step by step.",
        },
      ],
      interactions: [
        {
          id: "s1-mental-predict",
          kind: "predict-output",
          prompt: "What value does Python print?",
          beginnerPurpose: "Trace state changes through simple assignments.",
          expectedConceptIds: ["mental-model-code"],
          code: "x = 10\nx = x + 5\nx = x * 2\nprint(x)",
          expectedOutput: "30",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Trace step by step: x starts at 10, then becomes 15, then 30." }],
          feedback: { correct: "Correct! x=10, then x=15, then x=30.", incorrect: "Trace each line: x=10 → x=10+5=15 → x=15*2=30 → print(30)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-mental-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-reading-code-top-to-bottom",
      stageId: "stage-01",
      title: "Reading Code Top to Bottom",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain that Python executes statements top to bottom by default",
        "Distinguish between statements and expressions",
        "Identify indentation and comments when reading code",
      ],
      prerequisites: ["s1-mental-models-for-code"],
      concepts: ["execution-order"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## How Python Reads Your Code\n\nBy default, Python executes instructions **top to bottom**, one line at a time. Understanding this lets you predict what any program will do.\n\n**Statements vs expressions:**\n- A **statement** is a complete instruction (`x = 5`, `print('hi')`, `if x > 0:`).\n- An **expression** is a piece of code that produces a value (`2 + 3`, `len('hello')`, `x * y`).\n\n**Indentation**: Python uses indentation (spaces) to group related statements. Indented blocks belong to the line above them (you'll learn this fully in later stages).\n\n**Comments**: Lines starting with `#` are ignored by Python — they're notes for humans.\n\n```python\n# This is a comment — Python ignores it\nx = 5          # statement: assign 5 to x\ny = x + 3      # statement using expression x + 3\nprint(y)       # statement: output y\n# Output: 8\n```\n\nReading from top to bottom: x=5, y=8, print(8).",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Read code like a story",
          body: "When encountering new code, read it top to bottom just as you'd read a story. On the first read, just get the gist. On the second read, trace the values and state changes. This two-pass approach helps you understand even complex programs.",
        },
      ],
      interactions: [
        {
          id: "s1-reading-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Practice top-to-bottom execution tracing.",
          expectedConceptIds: ["execution-order"],
          code: 'print("First")\n# This line is a comment\nprint("Second")\nprint("Third")',
          expectedOutput: "First\nSecond\nThird",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Comments are ignored. Only the print() calls produce output, in order." }],
          feedback: { correct: "Correct! Comments are skipped; the three print calls run in order.", incorrect: "Python ignores comment lines (starting with #). The three print() statements run top to bottom." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-reading-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-beginner-error-literacy",
      stageId: "stage-01",
      title: "Beginner Error Literacy",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Distinguish between syntax errors, runtime errors, and wrong results",
        "Recognise what a SyntaxError and NameError look like",
        "Treat error messages as helpful information",
      ],
      prerequisites: ["s1-reading-code-top-to-bottom"],
      concepts: ["error-types"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Types of Errors\n\nBeginners encounter three categories of problems:\n\n**1. Syntax errors** — Python can't parse your code at all (the grammar is wrong). Python refuses to run the program.\n```python\nprint('Hello'   # SyntaxError: missing closing parenthesis\n```\n\n**2. Runtime errors** — The code is valid Python, but something goes wrong while running.\n```python\nprint(message)  # NameError: 'message' is not defined\n```\n\n**3. Wrong results** — The program runs without errors, but produces incorrect output. These are logic bugs.\n```python\narea = width + height  # should be * not +: logic bug\n```\n\n**Error messages are your friends.** They tell you:\n- The **file and line number** where the problem occurred\n- The **error type** (SyntaxError, NameError, TypeError, etc.)\n- A short **description** of what went wrong\n\nAlways read the last line of an error first — that's the most important part.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Error messages tell you where to look",
          body: "When you see an error, don't panic. Find the line number, go to that line, read the error type, then read the description. Fix only that one issue before re-running. Changing random things hoping something will work always makes debugging harder.",
        },
      ],
      interactions: [
        {
          id: "s1-error-mc",
          kind: "multiple-choice",
          prompt: "A program runs without crashing but produces the wrong answer. What kind of error is this?",
          beginnerPurpose: "Classify the three error categories.",
          expectedConceptIds: ["error-types"],
          options: [
            { id: "a", text: "Syntax error — Python couldn't parse the code", isCorrect: false, explanation: "A syntax error prevents the program from running at all." },
            { id: "b", text: "Runtime error — Python crashed while running", isCorrect: false, explanation: "A runtime error causes the program to crash mid-execution." },
            { id: "c", text: "Logic error — the program runs but produces incorrect results", isCorrect: true, explanation: "Correct! Logic errors produce wrong results without crashing. They're the hardest to find." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "If the program runs but gives wrong output, the error is in your logic, not your syntax." }],
          feedback: { correct: "Correct! Logic errors let the program run but produce wrong results.", incorrect: "A program that runs but gives wrong results has a logic error — the code is syntactically valid but does the wrong thing." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-error-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-using-examples-safely",
      stageId: "stage-01",
      title: "Using Examples Safely",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Describe a safe process for learning from code examples",
        "Explain why copying code without understanding is risky",
        "Practice the copy → modify → observe → explain workflow",
      ],
      prerequisites: ["s1-beginner-error-literacy"],
      concepts: ["learning-from-examples"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Learning from Code Examples\n\nExamples are your best learning tool, but only if you use them actively. The four-step process:\n\n**1. Copy** — Type the example yourself (don't paste). Typing forces you to read every character.\n\n**2. Modify** — Change one thing and predict what will happen. Then run it to see if you were right.\n\n**3. Observe** — Notice what changed. If your prediction was wrong, figure out why.\n\n**4. Explain** — Can you describe in plain English what the example does and why? If not, re-read it.\n\n```python\n# Original example:\nprint('Hello, world!')\n\n# Modification 1: change the message\nprint('Hello, Python!')  # What changed?\n\n# Modification 2: add a second print\nprint('Hello, world!')\nprint('Second line')     # What will the output look like?\n```\n\nIf you can predict the output of every modification you make, you understand the example.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Cargo-cult coding",
          body: "Copying code without understanding it is called 'cargo-cult coding'. It works until something breaks, and then you have no idea how to fix it. Always make sure you can explain what each line does before moving on.",
        },
      ],
      interactions: [
        {
          id: "s1-examples-mc",
          kind: "multiple-choice",
          prompt: "In the 'copy → modify → observe → explain' workflow, what is the purpose of the MODIFY step?",
          beginnerPurpose: "Understand active learning from examples.",
          expectedConceptIds: ["learning-from-examples"],
          options: [
            { id: "a", text: "To make the code shorter and more efficient", isCorrect: false, explanation: "The modify step isn't about efficiency — it's about testing your understanding." },
            { id: "b", text: "To test your mental model by predicting how a change will affect output", isCorrect: true, explanation: "Correct! Modifying forces you to predict and then verify — building a real understanding of how the code works." },
            { id: "c", text: "To fix bugs in the original example", isCorrect: false, explanation: "Examples are usually bug-free. The modify step is for learning, not fixing." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What does changing one thing and predicting the result test?" }],
          feedback: { correct: "Correct! Modifying tests whether your mental model accurately predicts the code's behavior.", incorrect: "The modify step makes a small change and has you predict the outcome — this tests and strengthens your understanding." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-examples-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-non-code-exercises",
      stageId: "stage-01",
      title: "First Non-Code Exercises: Daily Tasks as Algorithms",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Describe a familiar daily task as an algorithm with numbered steps",
        "Include at least one conditional and one repeated action",
        "Recognise that algorithm thinking is programming thinking",
      ],
      prerequisites: ["s1-using-examples-safely"],
      concepts: ["algorithm-thinking"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Thinking Algorithmically Without Code\n\nBefore writing any code, you can practice programming thinking by describing everyday tasks as precise, ordered steps.\n\n**Example: Making toast**\n```\n1. Put bread in toaster\n2. Set toaster to desired darkness level\n3. Press the lever down\n4. Wait until toast pops up\n5. If toast is too light: repeat steps 2–4\n6. Remove toast from toaster\n7. Spread butter on toast (if desired)\n8. Serve\n```\n\nThis algorithm includes:\n- **Sequential steps** (1–4, 6–8)\n- **Repetition** ('Wait until' in step 4; 'repeat' in step 5)\n- **Conditional** ('If toast is too light' in step 5; 'if desired' in step 7)\n\n**Your challenge**: Describe one of these tasks as an algorithm:\n- Sending an email\n- Making a cup of coffee\n- Finding a book in a library\n- Checking if a store is open",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Precision is everything",
          body: "When writing an algorithm, imagine the reader is someone who has never done the task before and will follow your instructions literally. If a step is ambiguous ('add some flour'), the reader will not know what to do. Algorithms must be precise enough that a machine — or a very literal human — can follow them without guessing.",
        },
      ],
      interactions: [
        {
          id: "s1-daily-task-mc",
          kind: "multiple-choice",
          prompt: "Which version of an algorithm step is precise enough for a computer to follow?",
          beginnerPurpose: "Practice writing precise algorithmic steps.",
          expectedConceptIds: ["algorithm-thinking"],
          options: [
            { id: "a", text: "Add some water", isCorrect: false, explanation: "'Some' is ambiguous — a computer needs an exact amount." },
            { id: "b", text: "Add 250ml of cold water", isCorrect: true, explanation: "Correct! This is precise: exact quantity, exact temperature. A computer can act on this without guessing." },
            { id: "c", text: "Add water until it looks right", isCorrect: false, explanation: "'Looks right' requires human judgement — not a precise algorithmic step." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which step leaves nothing to interpretation?" }],
          feedback: { correct: "Correct! Algorithms need precise, measurable steps — not vague judgements.", incorrect: "Algorithmic steps must be exact. '250ml of cold water' leaves nothing to interpretation; 'some water' does." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-daily-task-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-pseudocode-exercises",
      stageId: "stage-01",
      title: "First Pseudocode Exercises",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Write pseudocode that describes a recipe, checklist, or branching decision",
        "Translate a plain-English algorithm into structured pseudocode",
        "Recognise how pseudocode maps to real programming constructs",
      ],
      prerequisites: ["s1-non-code-exercises"],
      concepts: ["algorithm-thinking"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Is Pseudocode?\n\n**Pseudocode** is algorithm-writing that uses programming-like structure but plain English words. It's halfway between a prose description and real code — precise enough to be unambiguous, but not tied to any specific language's syntax.\n\n**Common pseudocode keywords:**\n- `IF ... THEN ... ELSE ... END IF` for conditions\n- `WHILE ... DO ... END WHILE` for loops\n- `FOR each ... DO ... END FOR` for iteration\n- `PRINT`, `INPUT`, `SET` for basic operations\n\n**Example: Checking if a number is positive**\n```\nINPUT number\nIF number > 0 THEN\n    PRINT \"positive\"\nELSE IF number < 0 THEN\n    PRINT \"negative\"\nELSE\n    PRINT \"zero\"\nEND IF\n```\n\nCompare this to real Python:\n```python\nnumber = int(input())\nif number > 0:\n    print('positive')\nelif number < 0:\n    print('negative')\nelse:\n    print('zero')\n```\n\nThe structure is almost identical — pseudocode maps directly to code.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Pseudocode is about thinking, not syntax",
          body: "There's no single correct pseudocode format. The goal is to express the logic clearly enough that anyone could convert it to real code. Focus on the IF/ELSE/WHILE structure — not on getting the exact keywords right.",
        },
      ],
      interactions: [
        {
          id: "s1-pseudocode-mc",
          kind: "multiple-choice",
          prompt: "What does pseudocode help you do BEFORE writing real Python?",
          beginnerPurpose: "Understand the purpose of pseudocode.",
          expectedConceptIds: ["algorithm-thinking"],
          options: [
            { id: "a", text: "Run your algorithm to test it without installing Python", isCorrect: false, explanation: "Pseudocode can't be executed — it's a planning tool, not runnable code." },
            { id: "b", text: "Plan the logical structure of your program without worrying about syntax", isCorrect: true, explanation: "Correct! Pseudocode lets you get the logic right before dealing with Python's specific syntax rules." },
            { id: "c", text: "Automatically generate Python code from English descriptions", isCorrect: false, explanation: "Pseudocode is manually written and read — it doesn't auto-generate code." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What problem does pseudocode solve that writing real code directly doesn't?" }],
          feedback: { correct: "Correct! Pseudocode separates logic planning from syntax concerns.", incorrect: "Pseudocode is a planning tool that lets you think through the logic without Python syntax getting in the way." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-pseudocode-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s1-debugging-habit",
      stageId: "stage-01",
      title: "First Debugging Habit: One Change at a Time",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Apply the 'one change at a time' debugging rule",
        "Explain why changing multiple things simultaneously makes debugging harder",
        "Describe a systematic approach to isolating bugs",
      ],
      prerequisites: ["s1-pseudocode-exercises"],
      concepts: ["debugging-habits"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Most Important Debugging Habit\n\nWhen code doesn't work, the temptation is to change multiple things at once hoping something will fix it. **Resist this urge.** Changing many things at once:\n- Makes it impossible to know which change fixed the bug\n- Can introduce new bugs while fixing the original one\n- Leaves you unable to reproduce your fix\n\n**The rule: isolate one change at a time.**\n\n**Systematic debugging process:**\n```\n1. Observe the problem: what exactly is wrong?\n2. Form a hypothesis: what do you think is causing it?\n3. Make ONE change to test that hypothesis\n4. Run the program\n5. If fixed: done. If not: undo the change and form a new hypothesis\n6. Repeat\n```\n\n**Example:**\n```python\n# Bug: this prints the wrong sum\na = 5\nb = '3'           # Hypothesis: b is a string, not a number\ntotal = a + b     # TypeError: can't add int and str\nprint(total)\n\n# Test: change b to int\nb = 3             # ONE change only\ntotal = a + b\nprint(total)      # Now prints 8 ✓\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Scientific debugging",
          body: "Think of debugging like a science experiment. You have a hypothesis ('b is the wrong type'). You test it by making one change. The result either confirms or refutes your hypothesis. This systematic approach works even for the most complex bugs.",
        },
      ],
      interactions: [
        {
          id: "s1-debug-mc",
          kind: "multiple-choice",
          prompt: "Why is it important to make only ONE change at a time when debugging?",
          beginnerPurpose: "Establish the single-change debugging habit.",
          expectedConceptIds: ["debugging-habits"],
          options: [
            { id: "a", text: "Because Python only allows one change per debugging session", isCorrect: false, explanation: "Python has no such restriction. This is about effective debugging practice." },
            { id: "b", text: "So you know exactly which change fixed (or broke) the problem", isCorrect: true, explanation: "Correct! If you change one thing and the bug is fixed, you know that was the cause. Multiple changes make this impossible to determine." },
            { id: "c", text: "Because debugging with multiple changes causes syntax errors", isCorrect: false, explanation: "Multiple changes don't cause syntax errors — they just make it hard to understand what fixed the bug." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "If you make 3 changes and the bug disappears, which change fixed it?" }],
          feedback: { correct: "Correct! One change at a time lets you pinpoint exactly what caused (and fixed) the bug.", incorrect: "One change at a time is essential so you know which change fixed the bug. With multiple changes, you can't tell which one worked." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s1-debug-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s1-project",
    stageId: "stage-01",
    title: "Algorithm Design: Daily Task as a Program",
    brief:
      "Before writing any Python, design two algorithms in pseudocode: one for a familiar daily task and one for a simple decision (e.g., checking if a shop is open). Then write a brief reflection on what you learned about algorithmic thinking.",
    requirements: [
      "Pseudocode for a sequential algorithm with at least 5 steps",
      "Pseudocode for a decision algorithm using IF/ELSE",
      "Both algorithms use precise, unambiguous language",
      "Reflection notes: one thing that surprised you about algorithmic thinking",
    ],
    acceptanceCriteria: [
      "Algorithms include sequential, conditional, and (where appropriate) repetitive steps",
      "Each step is precise enough for a literal reader to follow without guessing",
      "Reflection identifies a concrete learning insight",
    ],
    conceptIds: ["algorithm-thinking", "program-definition", "python-overview"],
    difficulty: "beginner",
  },
} satisfies Stage;
