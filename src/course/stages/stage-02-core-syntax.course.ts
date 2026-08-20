import type { Stage } from "@/course/course.schema";

export const stage02 = {
  id: "stage-02",
  number: 2,
  title: "Python Setup, Interpreter, REPL, and Execution",
  summary:
    "Install Python, use the interactive REPL, run script files, understand standard I/O, and learn the help system — everything needed before writing real programs.",
  level: "beginner",
  masteryGateConceptIds: ["python-installation", "repl-usage", "script-execution"],

  lessons: [
    {
      id: "s2-python-versions",
      stageId: "stage-02",
      title: "Python Versions",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain why Python has multiple versions",
        "Identify the current stable version and how to find it",
        "Understand basic version compatibility between Python 2 and Python 3",
      ],
      prerequisites: [],
      concepts: ["python-versions"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Python Versions\n\nPython is continuously developed, and new versions are released regularly. Versions follow **semantic versioning**: `major.minor.patch` (e.g., `3.12.4`).\n\n**Key points:**\n- **Python 3** is current. Python 2 reached end-of-life in January 2020 and should not be used.\n- The **stable release** is the recommended version for new projects (currently 3.12/3.13).\n- **Minor versions** (3.11, 3.12, 3.13) add features and performance improvements.\n- Code written for 3.10 generally works on 3.12 — minor versions are mostly backward-compatible.\n- Check the official Python website (python.org/downloads) for the current stable version.\n\n```python\nimport sys\nprint(sys.version)  # shows the Python version you're running\n# Example output: 3.12.4 (main, Jun  6 2024, 18:26:44)\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Always use Python 3",
          body: "If you encounter tutorials or code using Python 2 syntax (e.g., `print 'hello'` without parentheses), that code is outdated. Python 3 is the only supported version and has been for years. This course uses Python 3 throughout.",
        },
      ],
      interactions: [
        {
          id: "s2-versions-mc",
          kind: "multiple-choice",
          prompt: "A colleague gives you code that begins with `print 'hello'`. What does this tell you?",
          beginnerPurpose: "Distinguish Python 2 from Python 3 syntax.",
          expectedConceptIds: ["python-versions"],
          options: [
            { id: "a", text: "The code was written for Python 2 and will fail on Python 3", isCorrect: true, explanation: "Correct! `print 'hello'` without parentheses is Python 2 syntax. In Python 3, print is a function: `print('hello')`." },
            { id: "b", text: "The code uses a special fast print mode", isCorrect: false, explanation: "There is no 'fast print mode'. This is simply Python 2 syntax." },
            { id: "c", text: "The code will work fine on any Python version", isCorrect: false, explanation: "Python 3 requires parentheses: `print('hello')`. Python 2 syntax causes a SyntaxError in Python 3." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "In Python 3, print is a function — it needs parentheses." }],
          feedback: { correct: "Correct! Python 2 `print` statements fail with SyntaxError in Python 3.", incorrect: "print without parentheses is Python 2 syntax. Python 3 requires print('hello') with parentheses." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-versions-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-installing-python",
      stageId: "stage-02",
      title: "Installing Python",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Describe the official method for installing Python on your platform",
        "Explain what the PATH environment variable does",
        "Verify a Python installation by checking its version",
      ],
      prerequisites: [],
      concepts: ["python-installation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Installing Python\n\n**Official source**: Always download Python from [python.org](https://python.org/downloads). Avoid unofficial distributions unless you have a specific reason.\n\n**Platform differences:**\n\n| Platform | Method | Notes |\n|----------|--------|---------|\n| Windows | Official installer (.exe) | Check 'Add Python to PATH' during install |\n| macOS | python.org installer or Homebrew | System Python is outdated; install fresh |\n| Linux | Package manager (`apt`, `dnf`, `pacman`) | May already have Python 3 |\n\n**The PATH environment variable** tells your OS where to look for programs. When you type `python` in a terminal, the OS searches the directories listed in PATH. If Python isn't in PATH, you'll see 'command not found'.\n\n**Verify your installation:**\n```bash\n$ python --version\nPython 3.12.4\n\n$ python3 --version   # on macOS/Linux, you may need python3\nPython 3.12.4\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use a virtual environment for projects",
          body: "Once Python is installed, create a virtual environment for each project (`python -m venv .venv`). This isolates project dependencies and prevents version conflicts. You'll learn virtual environments in detail in a later stage.",
        },
      ],
      interactions: [
        {
          id: "s2-install-mc",
          kind: "multiple-choice",
          prompt: "After installing Python on Windows, typing `python` in a terminal gives 'command not found'. What is the most likely cause?",
          beginnerPurpose: "Understand PATH and installation verification.",
          expectedConceptIds: ["python-installation"],
          options: [
            { id: "a", text: "Python was installed for the wrong operating system version", isCorrect: false, explanation: "OS version mismatch would cause a different error during installation, not 'command not found'." },
            { id: "b", text: "Python was not added to the PATH environment variable", isCorrect: true, explanation: "Correct! The PATH is how the terminal finds programs. If Python wasn't added to PATH, the terminal can't find it even though it's installed." },
            { id: "c", text: "Python needs to be activated before use", isCorrect: false, explanation: "Python itself doesn't need activation. Virtual environments do, but not the Python installation itself." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "PATH tells the terminal where to look for programs. If Python isn't there, the terminal won't find it." }],
          feedback: { correct: "Correct! Re-run the installer and check 'Add Python to PATH'.", incorrect: "The most common cause is Python not being in the PATH. Re-run the installer with 'Add Python to PATH' checked." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-install-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-running-from-terminal",
      stageId: "stage-02",
      title: "Running Python from the Terminal",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Run Python from the terminal using python, py, or python3",
        "Understand platform differences in the python command",
        "Identify your current working directory when running Python",
      ],
      prerequisites: [],
      concepts: ["python-installation", "script-execution"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Running Python from the Terminal\n\nOnce Python is installed, you can invoke it from any terminal (Command Prompt, PowerShell, Terminal, bash).\n\n**Platform commands:**\n\n| Platform | Command | Notes |\n|----------|---------|-------|\n| Windows | `python` or `py` | `py` is the Python Launcher (recommended on Windows) |\n| macOS | `python3` | `python` may point to an old system Python |\n| Linux | `python3` | Same as macOS |\n\n```bash\n# Start the interactive interpreter\n$ python3\nPython 3.12.4 ...\n>>>\n\n# Run a script file\n$ python3 my_script.py\n\n# Run a quick one-liner\n$ python3 -c \"print('Hello from terminal!')\"\nHello from terminal!\n```\n\nThe `-c` flag lets you run a short Python expression directly without creating a file.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "py vs python vs python3",
          body: "On Windows, `py` is the Python Launcher — it automatically picks the right Python version. On macOS/Linux, `python3` explicitly runs Python 3. To avoid confusion, use `python3` everywhere when writing documentation or instructions meant to work cross-platform.",
        },
      ],
      interactions: [
        {
          id: "s2-terminal-mc",
          kind: "multiple-choice",
          prompt: "Which command runs a Python script called `calculate.py` from the terminal?",
          beginnerPurpose: "Practice running Python scripts.",
          expectedConceptIds: ["script-execution"],
          options: [
            { id: "a", text: "run calculate.py", isCorrect: false, explanation: "'run' is not a terminal command for Python. Use the python command directly." },
            { id: "b", text: "python3 calculate.py", isCorrect: true, explanation: "Correct! python3 (or python/py depending on platform) followed by the filename runs the script." },
            { id: "c", text: "execute calculate.py", isCorrect: false, explanation: "'execute' is not a standard command for running Python scripts." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The format is: python3 followed by the script filename." }],
          feedback: { correct: "Correct! `python3 calculate.py` runs the script.", incorrect: "Use `python3 calculate.py` (or `python calculate.py` on Windows) to run a Python script." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-terminal-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-interactive-mode",
      stageId: "stage-02",
      title: "Interactive Mode: The REPL",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain what a REPL is and what the acronym stands for",
        "Enter expressions and statements in the Python REPL",
        "Exit the REPL using quit() or Ctrl+D",
      ],
      prerequisites: [],
      concepts: ["repl-usage"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Python REPL\n\n**REPL** stands for **Read–Evaluate–Print Loop**. It's an interactive mode where Python reads what you type, evaluates it, prints the result, and waits for more.\n\n```\n$ python3\nPython 3.12.4\n>>> 2 + 3          # you type this\n5                  # Python prints the result\n>>> print('hello') # you type this\nhello              # Python prints the output\n>>> x = 10         # assignment — no output printed\n>>> x * 2\n20\n>>> quit()         # exit the REPL\n$\n```\n\n**The `>>>` prompt** means Python is ready for input.\n\n**Key behaviors:**\n- Expressions are evaluated and their value printed automatically.\n- Assignments (`x = 10`) don't print anything — there's no value to show.\n- Errors are shown immediately without crashing the REPL — you can keep typing.\n- Use `quit()`, `exit()`, or `Ctrl+D` (macOS/Linux) / `Ctrl+Z` then Enter (Windows) to exit.",
        },
        {
          kind: "why-matters",
          body: "The REPL is the fastest way to experiment with Python. Want to check how a string method works? Try it in the REPL instantly. Want to test a calculation? Type it and see. Every Python programmer uses the REPL for quick exploration and testing.",
        },
      ],
      interactions: [
        {
          id: "s2-repl-mc",
          kind: "multiple-choice",
          prompt: "In the Python REPL, you type `5 * 8`. What happens?",
          beginnerPurpose: "Understand REPL read-evaluate-print behavior.",
          expectedConceptIds: ["repl-usage"],
          options: [
            { id: "a", text: "Nothing — you need to use print() to see output", isCorrect: false, explanation: "In the REPL, bare expressions are automatically printed. print() is only needed in script files." },
            { id: "b", text: "Python prints 40 and shows the >>> prompt again", isCorrect: true, explanation: "Correct! The REPL automatically evaluates expressions and prints their value, then waits for more input." },
            { id: "c", text: "Python stores 40 in a variable called 'result'", isCorrect: false, explanation: "The REPL doesn't automatically save results to a variable. It just shows the value." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "REPL = Read, Evaluate, PRINT, Loop — it always prints the result of an expression." }],
          feedback: { correct: "Correct! The REPL prints 40 and awaits your next input.", incorrect: "In the REPL, any expression is automatically evaluated and its value printed. Type 5 * 8 and you'll see 40." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-repl-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-running-script-files",
      stageId: "stage-02",
      title: "Running Script Files",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Create a .py script file and run it from the terminal",
        "Explain what the working directory is and why it matters",
        "Distinguish between script mode and interactive mode",
      ],
      prerequisites: [],
      concepts: ["script-execution"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Script Files\n\nA **script** is a `.py` file containing Python code that you run as a complete program.\n\n**Creating and running a script:**\n```bash\n# 1. Create hello.py with your editor:\n#    print('Hello from a script!')\n\n# 2. Run it from the terminal:\n$ python3 hello.py\nHello from a script!\n```\n\n**The working directory**: When you run `python3 hello.py`, Python looks for `hello.py` in your current working directory. If the file is elsewhere, use a path:\n```bash\n$ python3 ~/projects/hello.py   # absolute path\n$ python3 scripts/hello.py      # relative path\n```\n\n**Script mode vs REPL:**\n\n| REPL | Script |\n|------|--------|\n| Interactive, line by line | Runs the whole file at once |\n| Results printed automatically | Only prints if you use `print()` |\n| Good for experiments | Good for real programs |\n\nIn script mode, just typing `5 * 8` on a line produces **no output** — you must use `print(5 * 8)`.",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Script vs REPL: print() matters",
          body: "A common beginner mistake: code that shows output in the REPL doesn't show output when run as a script. In a script, bare expressions like `5 + 3` compute the value but don't display it. Always use print() in scripts when you want to see output.",
        },
      ],
      interactions: [
        {
          id: "s2-script-predict",
          kind: "predict-output",
          prompt: "This code is in a script file and run with `python3 script.py`. What is printed?",
          beginnerPurpose: "Understand that scripts require explicit print() calls.",
          expectedConceptIds: ["script-execution"],
          code: "x = 10\ny = 20\nx + y\nprint(x * y)",
          expectedOutput: "200",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "In a script, only print() produces visible output. Bare expressions don't print." }],
          feedback: { correct: "Correct! `x + y` is computed but not printed. Only `print(x * y)` produces output: 200.", incorrect: "In script mode, bare expressions don't print. Only print() statements produce output. x + y is computed silently; print(x * y) outputs 200." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-script-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-source-encoding",
      stageId: "stage-02",
      title: "Source Code Encoding",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain why source file encoding matters",
        "Identify UTF-8 as Python 3's default encoding",
        "Know how to declare a non-default encoding with a coding comment",
      ],
      prerequisites: [],
      concepts: ["source-encoding"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Source Code Encoding\n\nA Python source file is a text file, and all text files have an **encoding** — a mapping from characters to bytes. Python 3 defaults to **UTF-8**, which can represent any Unicode character.\n\n**Why this matters:**\n- UTF-8 handles all languages, symbols, and emoji in your strings and comments.\n- If your editor saves a file in a different encoding (e.g., Latin-1), Python may fail to read it.\n- If you must use a non-UTF-8 file, declare the encoding in the first line:\n\n```python\n# -*- coding: latin-1 -*-\nprint('café')  # now Python knows the file uses Latin-1\n```\n\n**Best practice:** Always save your files as UTF-8. Modern editors (VS Code, PyCharm) default to UTF-8. Check your editor's status bar if unsure.\n\n```python\n# UTF-8 examples that work without any special declaration:\ngreeting = 'こんにちは'  # Japanese: 'Hello'\nprint(greeting)\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Stick with UTF-8",
          body: "Unless you're maintaining a legacy file that was saved with a specific encoding, always use UTF-8. It's the universal standard for Python 3 files. You'll almost never need the coding comment in modern development.",
        },
      ],
      interactions: [
        {
          id: "s2-encoding-mc",
          kind: "multiple-choice",
          prompt: "What is Python 3's default source file encoding?",
          beginnerPurpose: "Know the default encoding for Python files.",
          expectedConceptIds: ["source-encoding"],
          options: [
            { id: "a", text: "ASCII — only standard English characters", isCorrect: false, explanation: "ASCII only covers 128 characters. Python 3 defaults to UTF-8, which covers all Unicode." },
            { id: "b", text: "UTF-8 — supports all Unicode characters", isCorrect: true, explanation: "Correct! Python 3 uses UTF-8 by default, allowing any Unicode character in source files." },
            { id: "c", text: "Latin-1 — common European characters", isCorrect: false, explanation: "Latin-1 is a legacy encoding. Python 3 defaults to the more universal UTF-8." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The universal modern encoding that handles all human languages is UTF-8." }],
          feedback: { correct: "Correct! UTF-8 is Python 3's default encoding.", incorrect: "Python 3 defaults to UTF-8, which can represent any Unicode character from any human language." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-encoding-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-command-line-arguments",
      stageId: "stage-02",
      title: "Command-Line Arguments",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Access command-line arguments using sys.argv",
        "Explain what sys.argv[0] contains",
        "Write a script that accepts and uses an argument",
      ],
      prerequisites: [],
      concepts: ["command-line-args"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Command-Line Arguments with sys.argv\n\nWhen you run a Python script, you can pass **arguments** from the command line. These are accessible via `sys.argv` — a list of strings.\n\n```bash\n$ python3 greet.py Alice\n```\n\n```python\n# greet.py\nimport sys\n\nname = sys.argv[1]      # first argument after the script name\nprint(f'Hello, {name}!')\n# Output: Hello, Alice!\n```\n\n**sys.argv structure:**\n- `sys.argv[0]` — always the script's filename (`'greet.py'`)\n- `sys.argv[1]` — first argument passed (`'Alice'`)\n- `sys.argv[2]` — second argument, and so on\n\n```bash\n$ python3 add.py 5 3\n```\n```python\nimport sys\na = int(sys.argv[1])   # '5' → 5\nb = int(sys.argv[2])   # '3' → 3\nprint(a + b)           # 8\n```\n\n**Important**: All sys.argv values are **strings** — convert them to int or float as needed.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Check argument count before using",
          body: "If you try to access sys.argv[1] but no argument was passed, Python raises an IndexError. In real scripts, check `len(sys.argv) > 1` before accessing arguments. For robust argument handling, use the `argparse` module (covered in the CLI stage).",
        },
      ],
      interactions: [
        {
          id: "s2-argv-predict",
          kind: "predict-output",
          prompt: "Given this script and command: `python3 say.py world`, what does it print?",
          beginnerPurpose: "Trace sys.argv usage.",
          expectedConceptIds: ["command-line-args"],
          code: "import sys\nprint('Hello, ' + sys.argv[1] + '!')",
          expectedOutput: "Hello, world!",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "sys.argv[1] holds the first argument: 'world'." }],
          feedback: { correct: "Correct! sys.argv[1] is 'world', so print outputs 'Hello, world!'.", incorrect: "sys.argv[1] is the first argument passed to the script. When you run `python3 say.py world`, sys.argv[1] = 'world'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-argv-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-standard-io",
      stageId: "stage-02",
      title: "Standard Input, Output, and Error",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain the three standard streams: stdin, stdout, stderr",
        "Use print() to write to stdout",
        "Use sys.stderr.write() to write to stderr",
      ],
      prerequisites: [],
      concepts: ["standard-io"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Three Standard Streams\n\nEvery running program has three default communication channels:\n\n| Stream | Name | Default | Used for |\n|--------|------|---------|----------|\n| stdin | Standard Input | Keyboard | Reading user input |\n| stdout | Standard Output | Screen | Normal program output |\n| stderr | Standard Error | Screen | Error messages and diagnostics |\n\n```python\nimport sys\n\n# Writing to stdout (normal output)\nprint('Processing file...')         # goes to stdout\nsys.stdout.write('Done.\\n')        # same as print, but explicit\n\n# Writing to stderr (errors/warnings)\nsys.stderr.write('Warning: file not found\\n')  # goes to stderr\nprint('Error!', file=sys.stderr)               # print to stderr\n```\n\n**Why have separate streams?**\n- You can redirect stdout to a file while seeing errors on the screen:\n  ```bash\n  $ python3 script.py > output.txt  # stdout goes to file; stderr still shows\n  ```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use stderr for error messages",
          body: "When writing scripts that output data (piped to other tools or saved to files), always write error messages to stderr, not stdout. This lets users redirect the data output independently of the error messages.",
        },
      ],
      interactions: [
        {
          id: "s2-io-mc",
          kind: "multiple-choice",
          prompt: "You're writing a script that processes files and prints results. If the file is missing, where should you write the error message?",
          beginnerPurpose: "Apply the stdout/stderr distinction.",
          expectedConceptIds: ["standard-io"],
          options: [
            { id: "a", text: "stdout — so it appears alongside the normal output", isCorrect: false, explanation: "Error messages should go to stderr, not stdout, so they can be redirected separately." },
            { id: "b", text: "stderr — so error messages can be redirected separately from data output", isCorrect: true, explanation: "Correct! stderr keeps error messages separate from normal output, allowing independent redirection." },
            { id: "c", text: "A log file — error messages should never appear on screen", isCorrect: false, explanation: "Log files are useful for persistence, but the immediate error should still go to stderr." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which stream is specifically designed for error messages?" }],
          feedback: { correct: "Correct! stderr is the right place for error messages.", incorrect: "Write error messages to stderr so users can redirect normal output to a file while still seeing errors on screen." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-io-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-help-system",
      stageId: "stage-02",
      title: "Python Help Systems: help() and dir()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use help() to get documentation for any object",
        "Use dir() to list available attributes and methods",
        "Search Python documentation effectively",
      ],
      prerequisites: [],
      concepts: ["python-help"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Built-in Help\n\nPython includes two essential exploration tools:\n\n**`help()`** — shows documentation (docstring) for any object, function, or module:\n```python\n>>> help(print)\n# Displays: print(value, ..., sep=' ', end='\\n', file=sys.stdout, flush=False)\n# ...with full documentation\n\n>>> help(str.upper)\n# Explains what str.upper() does\n\n>>> help()         # starts interactive help browser\n```\n\n**`dir()`** — lists all attributes and methods of an object:\n```python\n>>> dir(str)\n# Shows all string methods: ['capitalize', 'casefold', 'center', ...]\n\n>>> dir([])        # dir on an empty list\n# Shows list methods: ['append', 'clear', 'copy', 'count', ...]\n```\n\n**Workflow for unknown methods:**\n1. `dir(obj)` — see what's available\n2. `help(obj.method)` — read what it does\n3. Try it in the REPL\n\n**Official docs**: docs.python.org — comprehensive reference for the standard library.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "help() in the REPL is faster than a browser",
          body: "When you're coding and need to quickly check what parameters a function takes, type help(function_name) in the REPL. It's often faster than switching to a browser. The docs are always correct for the exact Python version you're running.",
        },
      ],
      interactions: [
        {
          id: "s2-help-mc",
          kind: "multiple-choice",
          prompt: "Which built-in function lists all methods available on a Python object?",
          beginnerPurpose: "Know when to use help() vs dir().",
          expectedConceptIds: ["python-help"],
          options: [
            { id: "a", text: "help() — shows documentation for an object", isCorrect: false, explanation: "help() shows documentation (docstrings). dir() lists available attributes and methods." },
            { id: "b", text: "dir() — lists attributes and methods of an object", isCorrect: true, explanation: "Correct! dir() returns a list of names (attributes, methods) available on any object." },
            { id: "c", text: "type() — shows the type of an object", isCorrect: false, explanation: "type() returns the type of an object, not its available methods." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "One function shows you WHAT is available; the other shows you how to use it." }],
          feedback: { correct: "Correct! dir() lists what's available; help() explains what it does.", incorrect: "dir() lists all attributes and methods; help() explains how they work." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-help-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-editor-basics",
      stageId: "stage-02",
      title: "Editor Basics for Python",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Save a Python file and run it from the terminal",
        "Identify syntax highlighting as a key editor feature",
        "Use the integrated terminal panel to avoid switching windows",
      ],
      prerequisites: [],
      concepts: ["editor-setup"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Setting Up Your Editor\n\n**Recommended editors** for Python beginners:\n\n| Editor | Why |\n|--------|-----|\n| VS Code | Free, excellent Python extension, integrated terminal |\n| PyCharm Community | Python-specific, powerful refactoring |\n| IDLE | Ships with Python, simple, beginner-friendly |\n\n**Essential features to use:**\n\n**Syntax highlighting** — different colours for keywords, strings, numbers, and operators. Makes it much easier to spot typos.\n\n**Integrated terminal** — run Python scripts without switching windows. In VS Code: `Ctrl+`` ` opens the terminal.\n\n**File saving** — `Ctrl+S` / `Cmd+S`. Python won't see your changes until you save!\n\n```bash\n# Workflow:\n# 1. Write code in editor\n# 2. Save (Ctrl+S)\n# 3. Run in terminal: python3 my_file.py\n# 4. Read output\n# 5. Back to editor to fix or improve\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Always save before running",
          body: "Beginners often edit their file and then run the old version because they forgot to save. The terminal runs the file as it is on disk — not the version in your editor. Get in the habit of saving (Ctrl+S) before every run.",
        },
      ],
      interactions: [
        {
          id: "s2-editor-mc",
          kind: "multiple-choice",
          prompt: "You edit your Python script and run it, but the changes don't appear in the output. What is the most likely cause?",
          beginnerPurpose: "Establish the save-before-run habit.",
          expectedConceptIds: ["editor-setup"],
          options: [
            { id: "a", text: "Python has a cache that needs to be cleared", isCorrect: false, explanation: "Python doesn't normally cache script files in a way that needs manual clearing." },
            { id: "b", text: "You forgot to save the file before running it", isCorrect: true, explanation: "Correct! The terminal runs the saved file. If you didn't save, it runs the old version." },
            { id: "c", text: "You need to restart Python between edits", isCorrect: false, explanation: "Python doesn't need restarting between script runs. Just save and re-run." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The terminal reads the file from disk. What's on disk is what was last saved." }],
          feedback: { correct: "Correct! Always save (Ctrl+S) before running your script.", incorrect: "The terminal runs the file as saved on disk. Unsaved changes aren't included — always save before running." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-editor-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-executable-scripts",
      stageId: "stage-02",
      title: "Executable Scripts: Shebangs and Permissions",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Add a shebang line to make a Python script directly executable",
        "Understand file permissions on Unix-like systems",
        "Explain platform differences in script execution",
      ],
      prerequisites: [],
      concepts: ["executable-scripts"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Making Scripts Directly Executable (Unix/macOS)\n\nOn Unix-like systems (macOS, Linux), you can run a Python script directly without typing `python3` first — if you add a **shebang line** and set execute permissions.\n\n**Step 1: Add a shebang line** (first line of the file):\n```python\n#!/usr/bin/env python3\nprint('Hello, world!')\n```\n\nThe shebang `#!/usr/bin/env python3` tells the OS which interpreter to use. `env python3` finds the python3 in your PATH, making it portable.\n\n**Step 2: Set execute permissions:**\n```bash\n$ chmod +x hello.py\n```\n\n**Step 3: Run directly:**\n```bash\n$ ./hello.py\nHello, world!\n```\n\n**Windows:** Windows uses `.bat` or `.ps1` files for the equivalent. The Python Launcher (`py`) can associate `.py` files for double-clicking.\n\n**When to use shebangs**: Command-line tools and scripts meant to be run directly. For imported modules, omit the shebang.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Use /usr/bin/env for portability",
          body: "Avoid hardcoding the Python path in shebangs (e.g., `#!/usr/local/bin/python3`). Instead, use `#!/usr/bin/env python3` — it finds python3 wherever it's installed, making your script work across different machines.",
        },
      ],
      interactions: [
        {
          id: "s2-shebang-mc",
          kind: "multiple-choice",
          prompt: "What does the shebang line `#!/usr/bin/env python3` tell the operating system?",
          beginnerPurpose: "Understand the purpose of the shebang.",
          expectedConceptIds: ["executable-scripts"],
          options: [
            { id: "a", text: "The Python version required for this script", isCorrect: false, explanation: "The shebang specifies the interpreter, not a version requirement. Use `python3.12` for a specific version." },
            { id: "b", text: "Which interpreter to use to run this file", isCorrect: true, explanation: "Correct! The shebang tells the OS which program (interpreter) should execute this file." },
            { id: "c", text: "That this file should be skipped by Python", isCorrect: false, explanation: "Python treats #! as a comment and ignores it. The OS reads the shebang to decide which interpreter to use." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The OS reads the first line to decide which program should run the file." }],
          feedback: { correct: "Correct! The shebang tells the OS to use python3 as the interpreter.", incorrect: "The shebang (#!/usr/bin/env python3) tells the operating system to use python3 to run this file." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-shebang-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-startup-customization",
      stageId: "stage-02",
      title: "Interactive Startup Files and Customization",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain what PYTHONSTARTUP is and when it runs",
        "Describe usercustomize.py and sitecustomize.py",
        "Know how to add imports to your REPL session automatically",
      ],
      prerequisites: [],
      concepts: ["python-customization"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Customising the Interactive Interpreter\n\nPython lets you run code automatically when the interactive REPL starts, so you don't have to type the same imports every time.\n\n**PYTHONSTARTUP environment variable:**\n```bash\n# Set in your shell profile (~/.bashrc, ~/.zshrc):\nexport PYTHONSTARTUP=~/.python_startup.py\n```\n```python\n# ~/.python_startup.py — runs every time REPL starts\nimport os\nimport sys\nimport json\nfrom pathlib import Path\nprint(f'Python {sys.version.split()[0]} ready.')\n```\n\n**usercustomize.py** — runs for your user account every Python session (not just interactive).\n**sitecustomize.py** — runs for all users; used by system administrators.\n\n**Finding your site-packages directory** (where usercustomize.py goes):\n```python\nimport site\nprint(site.getusersitepackages())\n```\n\nNote: PYTHONSTARTUP only runs for interactive sessions. usercustomize.py runs for all Python invocations.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Keep startup files minimal",
          body: "PYTHONSTARTUP files run every time you open the REPL. Keep them fast and minimal — just essential imports and maybe a greeting message. Avoid slow operations like network calls or large file reads.",
        },
      ],
      interactions: [
        {
          id: "s2-startup-mc",
          kind: "multiple-choice",
          prompt: "You add `import json` to your PYTHONSTARTUP file. When does this import run?",
          beginnerPurpose: "Understand PYTHONSTARTUP scope.",
          expectedConceptIds: ["python-customization"],
          options: [
            { id: "a", text: "Every time any Python script runs, including scripts you run from the terminal", isCorrect: false, explanation: "PYTHONSTARTUP only runs for interactive sessions, not script files." },
            { id: "b", text: "Only when you start an interactive Python session (REPL)", isCorrect: true, explanation: "Correct! PYTHONSTARTUP runs at REPL startup only — not when running script files." },
            { id: "c", text: "Only when you explicitly source the file", isCorrect: false, explanation: "PYTHONSTARTUP runs automatically at interactive startup — you don't need to source it manually." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The clue is in the name: it's a 'startup' file for the interactive interpreter." }],
          feedback: { correct: "Correct! PYTHONSTARTUP only runs for interactive (REPL) sessions.", incorrect: "PYTHONSTARTUP runs automatically when you start an interactive Python session, but not when you run script files." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-startup-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-tab-completion-history",
      stageId: "stage-02",
      title: "Tab Completion and History Editing",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use Tab key to complete names in the REPL",
        "Navigate REPL history with arrow keys",
        "Use readline/rlcompleter for persistent history",
      ],
      prerequisites: [],
      concepts: ["repl-usage"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## REPL Productivity: Tab Completion and History\n\n**Tab completion** lets you autocomplete names without typing them in full:\n```\n>>> import os\n>>> os.pa<TAB>     # press Tab\nos.pardir  os.path  os.pathsep\n>>> os.path.<TAB>  # shows all os.path methods\n```\n\n**History navigation:**\n- **Up/Down arrow keys**: scroll through previous commands\n- **Ctrl+R**: reverse search through history (type part of a command to find it)\n\n**Enabling persistent history** (add to your PYTHONSTARTUP):\n```python\nimport readline\nimport rlcompleter\nreadline.parse_and_bind('tab: complete')\n\n# Save history between sessions\nimport atexit, os\nhistfile = os.path.join(os.path.expanduser('~'), '.python_history')\ntry:\n    readline.read_history_file(histfile)\nexcept FileNotFoundError:\n    pass\natexit.register(readline.write_history_file, histfile)\n```\n\n**Note:** On Windows, readline may not be available. Consider using IPython or Jupyter for a richer REPL.",
        },
        {
          kind: "why-matters",
          body: "Tab completion and history navigation massively speed up REPL exploration. Instead of typing `os.path.join(` from memory, just type `os.path.j` and press Tab. History navigation means you never retype a long expression — just press Up and edit it.",
        },
      ],
      interactions: [
        {
          id: "s2-completion-mc",
          kind: "multiple-choice",
          prompt: "In the Python REPL, you type `str.u` and press Tab. What happens?",
          beginnerPurpose: "Understand tab completion in the REPL.",
          expectedConceptIds: ["repl-usage"],
          options: [
            { id: "a", text: "Python raises a SyntaxError because the expression is incomplete", isCorrect: false, explanation: "Tab completion doesn't evaluate the expression — it completes the name." },
            { id: "b", text: "Python shows all str methods starting with 'u' (upper, ufmt, etc.)", isCorrect: true, explanation: "Correct! Tab completion shows all options matching what you've typed so far." },
            { id: "c", text: "Python deletes what you typed and starts fresh", isCorrect: false, explanation: "Tab never deletes input — it completes or shows options." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Tab completion shows all methods that START with what you've typed." }],
          feedback: { correct: "Correct! Tab shows all str methods beginning with 'u'.", incorrect: "Tab completion shows all completions that match what you've typed so far — in this case, str methods starting with 'u'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-completion-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-alternative-interpreters",
      stageId: "stage-02",
      title: "Alternative Interpreters and Shells",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Identify IDLE as Python's bundled IDE",
        "Describe IPython's enhancements over the standard REPL",
        "Understand when to use Jupyter notebooks",
      ],
      prerequisites: [],
      concepts: ["python-tools"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Alternative Python Environments\n\n**IDLE** — Bundled with Python:\n- Simple GUI IDE and REPL\n- Good for beginners learning Python\n- Run with: `idle3` from terminal, or find it in your applications\n\n**IPython** — Enhanced interactive Python:\n- Better tab completion, syntax highlighting, magic commands\n- `%timeit` to time code, `%run` to run files, `%paste` to paste multi-line code\n- Install: `pip install ipython`\n- Run: `ipython`\n\n**Jupyter Notebooks** — Browser-based interactive computing:\n- Mix code, output, text, and visualisations in one document\n- Excellent for data science, analysis, and sharing results\n- Install: `pip install jupyter`; Run: `jupyter notebook`\n\n| Environment | Best for |\n|-------------|----------|\n| Standard REPL | Quick experiments |\n| IDLE | Python beginners |\n| IPython | Interactive development |\n| Jupyter | Data analysis, reports |",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Standard REPL first, then specialise",
          body: "Learn the standard Python REPL first — it's always available and teaches you fundamentals. Once comfortable, explore IPython or Jupyter if they match your use case. Don't start with Jupyter if you're not doing data science.",
        },
      ],
      interactions: [
        {
          id: "s2-tools-mc",
          kind: "multiple-choice",
          prompt: "A data scientist wants to combine Python code, charts, and written explanations in a shareable document. Which tool is best?",
          beginnerPurpose: "Match tools to use cases.",
          expectedConceptIds: ["python-tools"],
          options: [
            { id: "a", text: "Standard Python REPL — fastest startup time", isCorrect: false, explanation: "The standard REPL doesn't support charts or formatted text — it's for code only." },
            { id: "b", text: "Jupyter Notebook — combines code, output, text, and visualisations", isCorrect: true, explanation: "Correct! Jupyter Notebooks are designed exactly for this: mixing code, output, text, and charts." },
            { id: "c", text: "IDLE — bundled with Python so no installation needed", isCorrect: false, explanation: "IDLE is a basic IDE. It doesn't support rich mixed-content documents." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which tool is famous in the data science community for shareable, visual documents?" }],
          feedback: { correct: "Correct! Jupyter Notebooks are the standard tool for data science reports.", incorrect: "Jupyter Notebooks combine code, outputs, text, and charts in one shareable document — perfect for data science." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-tools-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    {
      id: "s2-first-complete-script",
      stageId: "stage-02",
      title: "First Complete Script: Print, Run, Change, Rerun",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Write a complete Python script from scratch",
        "Run the script from the terminal and observe output",
        "Make a change and rerun to confirm the update",
      ],
      prerequisites: [],
      concepts: ["script-execution", "python-installation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Writing Your First Complete Script\n\nPutting it all together: create a script, run it, modify it, rerun it. This is the core development loop.\n\n**Step 1**: Create `hello.py` in your editor:\n```python\n#!/usr/bin/env python3\n# My first Python script\n\nname = 'Python learner'\nversion = 3.12\n\nprint(f'Hello, {name}!')\nprint(f'Running Python version {version}')\nprint('Everything is working correctly.')\n```\n\n**Step 2**: Save and run:\n```bash\n$ python3 hello.py\nHello, Python learner!\nRunning Python version 3.12\nEverything is working correctly.\n```\n\n**Step 3**: Change the name variable:\n```python\nname = 'Alice'  # changed\n```\n\n**Step 4**: Save and rerun — output updates immediately:\n```bash\n$ python3 hello.py\nHello, Alice!\nRunning Python version 3.12\nEverything is working correctly.\n```\n\nThis edit-save-run cycle is the fundamental rhythm of Python development.",
        },
        {
          kind: "why-matters",
          body: "Every large Python application — Django web framework, NumPy, machine learning models — was built through thousands of repetitions of this exact cycle: write, save, run, observe, improve. Mastering this loop now means everything else builds naturally on top of it.",
        },
      ],
      interactions: [
        {
          id: "s2-script-fill",
          kind: "fill-code",
          prompt: "Complete the script so it prints: Hello, world! Then runs without errors.",
          beginnerPurpose: "Practice the complete write-save-run workflow.",
          expectedConceptIds: ["script-execution"],
          codeTemplate: "#!/usr/bin/env python3\n___('Hello, world!')",
          blanks: [{ placeholder: "___", answer: "print", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The function that displays output in Python is called print." }],
          feedback: { correct: "Correct! print('Hello, world!') outputs the greeting.", incorrect: "Use print() to display output in Python." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s2-script-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s2-project",
    stageId: "stage-02",
    title: "Setup and Exploration Project",
    brief:
      "Verify your Python installation, explore the REPL, and write your first real script. Document what you find at each step.",
    requirements: [
      "Run python3 --version and note the version number",
      "Try at least 5 expressions in the REPL and record results",
      "Write a script that uses print(), a variable, and a comment",
      "Run the script from the terminal and confirm the output",
      "Add a command-line argument to personalise the greeting",
    ],
    acceptanceCriteria: [
      "Script runs without errors",
      "Script accepts a name as sys.argv[1] and prints a personalised greeting",
      "README note: which Python version you're using and how you installed it",
    ],
    conceptIds: ["python-installation", "repl-usage", "script-execution"],
    difficulty: "beginner",
  },
} satisfies Stage;
