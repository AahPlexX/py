import type { Stage } from "@/course/course.schema";

export const stage29 = {
  id: "stage-29",
  number: 29,
  title: "Command-Line Interfaces and Terminal Applications",
  summary:
    "Build professional command-line tools using argparse, handle standard streams correctly, and package CLI programs with entry points.",
  level: "intermediate",
  masteryGateConceptIds: ["cli-structure", "argparse", "exit-codes"],
  lessons: [
    // ── 29.1 CLI Program Structure ────────────────────────────────────────
    {
      id: "s29-cli-program-structure",
      stageId: "stage-29",
      title: "CLI Program Structure",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Describe the three pillars of a well-structured CLI: argument parsing, execution, and exit",
        "Explain the role of the if __name__ == '__main__' guard",
        "Identify where argument parsing, business logic, and I/O each belong",
      ],
      prerequisites: [],
      concepts: ["cli-structure"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Makes a Good CLI Program?\n\nA **command-line interface (CLI)** is a program that accepts structured input from the terminal and produces structured output. Every well-designed CLI has three layers:\n\n1. **Argument layer** — parse `sys.argv` or use `argparse` to read flags, options, and positional arguments\n2. **Logic layer** — the actual work your program does, independent of I/O\n3. **Exit layer** — return a numeric exit code (`0` = success, non-zero = failure)\n\nKeeping these layers separate makes CLIs testable, composable, and maintainable.",
        },
        {
          kind: "code",
          language: "python",
          code: `#!/usr/bin/env python3
"""greet.py — a minimal but well-structured CLI."""

import argparse
import sys


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="Print a greeting.")
    p.add_argument("name", help="Name to greet")
    p.add_argument("--loud", action="store_true", help="SHOUT the greeting")
    return p


def greet(name: str, loud: bool) -> str:
    msg = f"Hello, {name}!"
    return msg.upper() if loud else msg


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    print(greet(args.name, args.loud))
    return 0


if __name__ == "__main__":
    sys.exit(main())`,
          caption: "Three-layer CLI: parser, logic, entry point",
          highlight: [14, 15, 16, 20, 21, 22, 23, 24],
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Why pass argv to main()?",
          body: "Accepting an optional `argv` list lets tests call `main(['Alice', '--loud'])` directly without spawning a subprocess. This pattern is the single most important thing for testable CLIs.",
        },
        {
          kind: "mental-model",
          title: "CLI as a Unix Filter",
          analogy: "Think of your CLI like a pipe fitting: it accepts bytes/text on the left (stdin + argv), transforms them, and emits bytes/text on the right (stdout). Errors drip out the bottom (stderr).",
          explanation: "This model explains why stdout/stderr separation matters and why exit codes are essential — they let the shell chain commands safely.",
        },
        {
          kind: "why-matters",
          body: "Nearly every Python developer tool, data pipeline, and automation script exposes a CLI. Understanding the three-layer structure from the start prevents the common mistake of mixing argument parsing with business logic, which makes testing nearly impossible.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Shebang line",
          body: "`#!/usr/bin/env python3` at the top of a script tells Unix which interpreter to use when the script is executed directly (e.g., `./greet.py Alice`). It has no effect on Windows.",
        },
      ],
      interactions: [
        {
          id: "s29-cli-structure-mc",
          kind: "multiple-choice",
          prompt: "Which of the following best describes the 'logic layer' in a well-structured CLI?",
          beginnerPurpose: "Check understanding of separation of concerns in CLIs",
          expectedConceptIds: ["cli-structure"],
          options: [
            {
              id: "a",
              text: "The code that calls argparse.ArgumentParser()",
              isCorrect: false,
              explanation: "That is the argument layer — it reads input but does not perform the actual work.",
            },
            {
              id: "b",
              text: "Pure functions that perform the program's work, independent of argument parsing or I/O",
              isCorrect: true,
              explanation: "The logic layer is I/O-free, which makes it easy to unit-test without invoking the CLI.",
            },
            {
              id: "c",
              text: "The sys.exit() call at the bottom of main()",
              isCorrect: false,
              explanation: "That is the exit layer — it communicates success or failure to the shell.",
            },
            {
              id: "d",
              text: "The if __name__ == '__main__' block",
              isCorrect: false,
              explanation: "That guard controls when main() runs, but is not itself the logic layer.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "The logic layer is what you would extract into a library — it has no knowledge of argv or sys.exit." },
          ],
          feedback: {
            correct: "Correct! The logic layer is pure, I/O-free code that can be unit-tested without touching the CLI.",
            incorrect: "Remember the three layers: argument parsing, then the actual business logic, then exit.",
          },
        },
        {
          id: "s29-cli-structure-fill",
          kind: "fill-code",
          prompt: "Complete the `main()` function so it passes a parsed argv list to `greet()` and returns 0.",
          beginnerPurpose: "Practice wiring the three layers together",
          expectedConceptIds: ["cli-structure"],
          codeTemplate: `def main(argv=None):
    args = build_parser().___BLANK_1___(argv)
    print(greet(args.name, args.loud))
    return ___BLANK_2___`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "parse_args", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "0", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "ArgumentParser has a method that converts argv into a Namespace object." },
            { level: "concept", text: "Exit code 0 signals success to the shell." },
          ],
          feedback: {
            correct: "parse_args(argv) and return 0 — that is the correct wiring.",
            incorrect: "Check: the parser method is parse_args(), and success is 0.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cli-structure", recallPrompt: "Name the three layers of a well-structured CLI and what each one is responsible for.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-cli-structure-mc", "s29-cli-structure-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.2 Exit Codes ──────────────────────────────────────────────────
    {
      id: "s29-exit-codes",
      stageId: "stage-29",
      title: "Exit Codes",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what an exit code is and how the shell uses it",
        "Use sys.exit() to return exit codes from Python",
        "Map common error categories to appropriate non-zero codes",
      ],
      prerequisites: ["s29-cli-program-structure"],
      concepts: ["exit-codes"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Exit Codes\n\nWhen a process finishes, it returns a small integer called an **exit code** (also called a return code or status code) to the parent process.\n\n- `0` — success\n- `1` — general error\n- `2` — misuse of command syntax (argparse uses this automatically)\n- `126` — command found but not executable\n- `127` — command not found\n\nIn shell scripts, `$?` holds the exit code of the last command. In Python, call `sys.exit(code)` to set it.",
        },
        {
          kind: "code",
          language: "python",
          code: `import sys

def main() -> int:
    try:
        result = do_work()
    except FileNotFoundError as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1
    except PermissionError as e:
        print(f"Permission denied: {e}", file=sys.stderr)
        return 1
    print(result)
    return 0

if __name__ == "__main__":
    sys.exit(main())`,
          caption: "Return exit codes from main() and pass them to sys.exit()",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "sys.exit() raises SystemExit",
          body: "Calling `sys.exit()` raises `SystemExit`. If you call it inside `main()` instead of returning, tests that call `main()` directly will crash with an exception. Always prefer `return code` inside `main()` and call `sys.exit(main())` only in the `if __name__` guard.",
        },
        {
          kind: "comparison",
          leftLabel: "Bad: sys.exit() inside logic",
          rightLabel: "Good: return code, exit at top",
          leftCode: `def main():
    if not valid():
        sys.exit(1)  # tests crash here
    do_work()`,
          rightCode: `def main() -> int:
    if not valid():
        return 1     # tests get the int
    do_work()
    return 0

sys.exit(main())`,
          caption: "Return exit codes so unit tests can assert on them",
        },
        {
          kind: "why-matters",
          body: "Shell scripts and CI pipelines check exit codes to decide whether to continue. If your tool always exits 0, a failing CI job might pass silently. Correct exit codes make your tool a trustworthy Unix citizen.",
        },
      ],
      interactions: [
        {
          id: "s29-exit-codes-predict",
          kind: "predict-output",
          prompt: "What will `echo $?` print immediately after running this script (assuming no exception)?",
          beginnerPurpose: "Understand how sys.exit() maps to the shell exit code",
          expectedConceptIds: ["exit-codes"],
          code: `import sys

def main() -> int:
    return 42

sys.exit(main())`,
          expectedOutput: "42",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "sys.exit(n) sets the process exit code to n. $? captures it." },
          ],
          feedback: {
            correct: "Exactly — sys.exit(42) makes the process exit with code 42, visible in $?.",
            incorrect: "sys.exit(n) passes n directly as the exit code. main() returns 42.",
          },
        },
        {
          id: "s29-exit-codes-mc",
          kind: "multiple-choice",
          prompt: "Why is `return 1` inside `main()` preferred over `sys.exit(1)` for error conditions?",
          beginnerPurpose: "Understand testability of exit code patterns",
          expectedConceptIds: ["exit-codes"],
          options: [
            {
              id: "a",
              text: "sys.exit() is slower than returning an integer",
              isCorrect: false,
              explanation: "Performance is not the concern here.",
            },
            {
              id: "b",
              text: "Unit tests calling main() can assert on the returned integer without catching SystemExit",
              isCorrect: true,
              explanation: "sys.exit() raises SystemExit, which would propagate out of a test call to main(). Returning an int keeps tests simple.",
            },
            {
              id: "c",
              text: "sys.exit() does not work on Windows",
              isCorrect: false,
              explanation: "sys.exit() works on all platforms.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think about what happens in a test when an exception is raised unexpectedly." },
          ],
          feedback: {
            correct: "Correct! Returning an int makes main() testable without needing pytest.raises(SystemExit).",
            incorrect: "sys.exit() raises SystemExit — returning an int avoids that exception in tests.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "exit-codes", recallPrompt: "What exit code signals success and what does the shell variable $? contain?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-exit-codes-predict", "s29-exit-codes-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.3 sys.argv ────────────────────────────────────────────────────
    {
      id: "s29-sys-argv",
      stageId: "stage-29",
      title: "sys.argv",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what sys.argv contains and why index 0 is the script name",
        "Read positional values from sys.argv manually",
        "Explain why argparse is preferred over raw sys.argv parsing",
      ],
      prerequisites: ["s29-cli-program-structure"],
      concepts: ["sys-argv"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## sys.argv — The Raw Argument List\n\n`sys.argv` is a list of strings representing the command-line tokens passed to the Python interpreter.\n\n- `sys.argv[0]` — the script name (or `''` in interactive mode)\n- `sys.argv[1:]` — the actual arguments the user typed\n\nRunning `python greet.py Alice --loud` gives:\n\n```\nsys.argv == ['greet.py', 'Alice', '--loud']\n```",
        },
        {
          kind: "code",
          language: "python",
          code: `import sys

# Minimal manual parsing (illustrative — use argparse in production)
if len(sys.argv) < 2:
    print("Usage: greet.py <name>", file=sys.stderr)
    sys.exit(2)

name = sys.argv[1]
print(f"Hello, {name}!")`,
          caption: "Reading sys.argv directly — simple but fragile",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Manual sys.argv parsing does not scale",
          body: "As soon as you need optional flags, default values, or type conversion you end up reimplementing argparse badly. Use `argparse` (or `click`) for anything beyond trivial one-argument scripts.",
        },
        {
          kind: "why-matters",
          body: "Understanding sys.argv demystifies where command-line arguments come from. Every argument parsing library is ultimately a wrapper around this list.",
        },
      ],
      interactions: [
        {
          id: "s29-sys-argv-predict",
          kind: "predict-output",
          prompt: "Running `python script.py foo bar` — what does this print?",
          beginnerPurpose: "Understand the structure of sys.argv",
          expectedConceptIds: ["sys-argv"],
          code: `import sys
print(sys.argv[1], len(sys.argv))`,
          expectedOutput: "foo 3",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "sys.argv[0] is the script name, sys.argv[1] is 'foo', sys.argv[2] is 'bar'." },
          ],
          feedback: {
            correct: "Correct! sys.argv[1] is 'foo' and len(['script.py','foo','bar']) is 3.",
            incorrect: "Remember sys.argv[0] is the script name — the user's arguments start at index 1.",
          },
        },
        {
          id: "s29-sys-argv-mc",
          kind: "multiple-choice",
          prompt: "What is the value of sys.argv[0]?",
          beginnerPurpose: "Confirm understanding of sys.argv index 0",
          expectedConceptIds: ["sys-argv"],
          options: [
            {
              id: "a",
              text: "The first argument the user typed after the script name",
              isCorrect: false,
              explanation: "That is sys.argv[1].",
            },
            {
              id: "b",
              text: "The name of the script being run",
              isCorrect: true,
              explanation: "sys.argv[0] is always the script name or path used to invoke the interpreter.",
            },
            {
              id: "c",
              text: "The Python interpreter path",
              isCorrect: false,
              explanation: "The interpreter path is not included in sys.argv.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "By convention, argv[0] is the program name in C and Python alike." },
          ],
          feedback: {
            correct: "Correct! sys.argv[0] is the script name.",
            incorrect: "sys.argv[0] is the script name; user arguments begin at index 1.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "sys-argv", recallPrompt: "What does sys.argv contain, and at which index do user arguments start?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-sys-argv-predict", "s29-sys-argv-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.4 argparse Module Overview ────────────────────────────────────
    {
      id: "s29-argparse-overview",
      stageId: "stage-29",
      title: "argparse Module Overview",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create an ArgumentParser with a description",
        "Call parse_args() and access results as attributes",
        "Explain what argparse generates automatically",
      ],
      prerequisites: ["s29-sys-argv"],
      concepts: ["argparse"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## argparse — Python's Built-In Argument Parser\n\n`argparse` turns a description of your CLI into:\n- **Parsing logic** — converts argv strings to typed Python values\n- **Validation** — rejects unknown arguments and wrong types\n- **Help text** — generates `--help` output automatically\n- **Error messages** — prints usage and exits with code 2 on bad input\n\nThe workflow is always: create a parser → add arguments → parse.",
        },
        {
          kind: "code",
          language: "python",
          code: `import argparse

parser = argparse.ArgumentParser(
    prog="myapp",
    description="Does useful things.",
    epilog="See the docs at https://example.com",
)

# add_argument() calls go here (next lessons)

args = parser.parse_args()  # reads sys.argv[1:] by default`,
          caption: "Basic ArgumentParser setup",
        },
        {
          kind: "output",
          text: `$ python myapp.py --help
usage: myapp [-h]

Does useful things.

options:
  -h, --help  show this help message and exit

See the docs at https://example.com`,
          isError: false,
        },
        {
          kind: "callout",
          variant: "info",
          title: "argparse vs click vs typer",
          body: "`argparse` is in the standard library — no install needed. `click` and `typer` are popular third-party alternatives with a decorator-based API. For a course on the standard library, argparse is the right choice.",
        },
        {
          kind: "why-matters",
          body: "argparse is the backbone of countless Python tools including pip, black, mypy, and pytest. Knowing it well means you can read and extend any of them.",
        },
      ],
      interactions: [
        {
          id: "s29-argparse-fill",
          kind: "fill-code",
          prompt: "Create an ArgumentParser with the program name 'backup' and description 'Backup files to S3.'",
          beginnerPurpose: "Practice constructing an ArgumentParser",
          expectedConceptIds: ["argparse"],
          codeTemplate: `import argparse

parser = argparse.___BLANK_1___(
    prog="___BLANK_2___",
    description="Backup files to S3.",
)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "ArgumentParser", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "backup", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The class is called ArgumentParser, not Argument_Parser." },
          ],
          feedback: {
            correct: "Correct! ArgumentParser(prog='backup', description='...') is the standard setup.",
            incorrect: "The class is argparse.ArgumentParser and prog is the program name shown in --help.",
          },
        },
        {
          id: "s29-argparse-mc",
          kind: "multiple-choice",
          prompt: "What exit code does argparse use when the user provides an invalid argument?",
          beginnerPurpose: "Know argparse's automatic error behavior",
          expectedConceptIds: ["argparse"],
          options: [
            { id: "a", text: "0", isCorrect: false, explanation: "0 signals success." },
            { id: "b", text: "1", isCorrect: false, explanation: "1 is the general error code, not the argument syntax error code." },
            { id: "c", text: "2", isCorrect: true, explanation: "By convention, exit code 2 means command syntax error, which is exactly what argparse uses." },
            { id: "d", text: "127", isCorrect: false, explanation: "127 means 'command not found' — that is a shell code, not argparse." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "POSIX convention reserves exit code 2 for incorrect command usage." },
          ],
          feedback: {
            correct: "Correct! argparse exits with code 2 on syntax errors, matching POSIX convention.",
            incorrect: "argparse uses exit code 2 for command syntax errors.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "argparse", recallPrompt: "What three things does argparse generate automatically when you add arguments?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-argparse-fill", "s29-argparse-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.5 Positional Arguments ────────────────────────────────────────
    {
      id: "s29-positional-arguments",
      stageId: "stage-29",
      title: "Positional Arguments",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Add positional arguments with add_argument()",
        "Specify types for automatic type conversion",
        "Handle multiple positional arguments with nargs",
      ],
      prerequisites: ["s29-argparse-overview"],
      concepts: ["argparse-positional"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Positional Arguments\n\nPositional arguments are required by default and identified by their position, not a flag name.\n\n```python\nparser.add_argument('src', help='Source file')\nparser.add_argument('dst', help='Destination file')\n```\n\nRunning `cp foo.txt bar.txt` — `src='foo.txt'`, `dst='bar.txt'`.",
        },
        {
          kind: "code",
          language: "python",
          code: `import argparse

parser = argparse.ArgumentParser(description="Add numbers.")
parser.add_argument("x", type=float, help="First number")
parser.add_argument("y", type=float, help="Second number")

args = parser.parse_args(["3.5", "1.5"])
print(args.x + args.y)   # 5.0`,
          caption: "type=float converts the string from argv to a float automatically",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "nargs for multiple values",
          body: "Use `nargs='+'` to accept one or more values into a list, or `nargs='*'` for zero or more. The result is a list on `args.name`.",
        },
        {
          kind: "code",
          language: "python",
          code: `parser.add_argument("files", nargs="+", help="Files to process")
# python app.py a.txt b.txt c.txt  →  args.files == ['a.txt','b.txt','c.txt']`,
          caption: "nargs='+' collects multiple positional arguments into a list",
        },
        {
          kind: "why-matters",
          body: "Positional arguments make CLIs feel natural — `git commit message` vs `git --message commit`. Choosing between positional and optional arguments affects usability significantly.",
        },
      ],
      interactions: [
        {
          id: "s29-positional-predict",
          kind: "predict-output",
          prompt: "What does this print when run as: python app.py 10 3",
          beginnerPurpose: "Trace positional argument type conversion",
          expectedConceptIds: ["argparse-positional"],
          code: `import argparse
parser = argparse.ArgumentParser()
parser.add_argument("a", type=int)
parser.add_argument("b", type=int)
args = parser.parse_args(["10", "3"])
print(args.a - args.b)`,
          expectedOutput: "7",
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "type=int converts '10' to 10 and '3' to 3. 10 - 3 = 7." },
          ],
          feedback: {
            correct: "Correct! type=int converts strings to ints before subtraction.",
            incorrect: "type=int converts each string to an integer. 10 - 3 = 7.",
          },
        },
        {
          id: "s29-positional-fill",
          kind: "fill-code",
          prompt: "Add a positional argument 'count' that accepts an integer.",
          beginnerPurpose: "Practice adding typed positional arguments",
          expectedConceptIds: ["argparse-positional"],
          codeTemplate: `parser.add_argument("count", ___BLANK_1___=int, help="How many times")`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "type", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The keyword argument that specifies the type of conversion is called 'type'." },
          ],
          feedback: {
            correct: "Correct! type=int tells argparse to convert the string to an integer.",
            incorrect: "Use type=int to specify automatic type conversion.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "argparse-positional", recallPrompt: "How do you make argparse accept multiple positional values into a list?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-positional-predict", "s29-positional-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.6 Optional Arguments ──────────────────────────────────────────
    {
      id: "s29-optional-arguments",
      stageId: "stage-29",
      title: "Optional Arguments",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Add optional arguments with -- prefix names",
        "Provide default values with default=",
        "Use short and long flag names together",
      ],
      prerequisites: ["s29-positional-arguments"],
      concepts: ["argparse-optional"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Optional Arguments\n\nOptional arguments start with `--` (long form) or `-` (short form). They are not required and have default values.\n\n```python\nparser.add_argument('--output', '-o', default='out.txt', help='Output file')\n```\n\nThe user can write `--output result.txt` or `-o result.txt`. If omitted, `args.output == 'out.txt'`.",
        },
        {
          kind: "code",
          language: "python",
          code: `import argparse

parser = argparse.ArgumentParser()
parser.add_argument("query", help="Search term")
parser.add_argument("--limit", "-n", type=int, default=10, help="Max results")
parser.add_argument("--format", choices=["json", "csv", "table"], default="table")

args = parser.parse_args(["python", "--limit", "5"])
print(args.query, args.limit, args.format)
# python 5 table`,
          caption: "Optional argument with type, default, and choices",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "choices= for validation",
          body: "Use `choices=['a','b','c']` to restrict an optional argument to a fixed set of values. argparse validates and shows the options in --help automatically.",
        },
        {
          kind: "why-matters",
          body: "Optional arguments enable power-user customization without cluttering the common case. A good CLI works with defaults; expert users tweak with flags.",
        },
      ],
      interactions: [
        {
          id: "s29-optional-predict",
          kind: "predict-output",
          prompt: "What prints when parse_args is called with no arguments shown?",
          beginnerPurpose: "Understand that optional arguments use their defaults when absent",
          expectedConceptIds: ["argparse-optional"],
          code: `import argparse
parser = argparse.ArgumentParser()
parser.add_argument("--retries", type=int, default=3)
args = parser.parse_args([])
print(args.retries)`,
          expectedOutput: "3",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "When an optional argument is absent from argv, argparse uses the default= value." },
          ],
          feedback: {
            correct: "Correct! default=3 is used when --retries is not provided.",
            incorrect: "Optional arguments use their default= value when not provided on the command line.",
          },
        },
        {
          id: "s29-optional-mc",
          kind: "multiple-choice",
          prompt: "You want --timeout to accept a float and default to 30.0. Which call is correct?",
          beginnerPurpose: "Practice combining type= and default= on optional arguments",
          expectedConceptIds: ["argparse-optional"],
          options: [
            { id: "a", text: "parser.add_argument('--timeout', type=float, default=30.0)", isCorrect: true, explanation: "type=float converts the string and default=30.0 is used when absent." },
            { id: "b", text: "parser.add_argument('--timeout', float, 30.0)", isCorrect: false, explanation: "Positional parameters are not how add_argument works — use keyword arguments." },
            { id: "c", text: "parser.add_argument('timeout', type=float, default=30.0)", isCorrect: false, explanation: "Without the -- prefix this is a required positional argument, not optional." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "syntax", text: "Optional arguments need the -- prefix, type= keyword for conversion, and default= for the fallback." },
          ],
          feedback: {
            correct: "Correct! -- prefix, type=float, and default=30.0 together make it optional with type conversion.",
            incorrect: "Remember: optional arguments need --, type= for conversion, and default= for the fallback value.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "argparse-optional", recallPrompt: "What keyword argument provides the fallback value when an optional argument is absent?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-optional-predict", "s29-optional-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.7 Flags ───────────────────────────────────────────────────────
    {
      id: "s29-flags",
      stageId: "stage-29",
      title: "Flags (Boolean Arguments)",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Add boolean flags with action='store_true'",
        "Use store_false for inverted flags",
        "Combine multiple flags in a command",
      ],
      prerequisites: ["s29-optional-arguments"],
      concepts: ["argparse-flags"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Flags — Boolean Switches\n\nA **flag** is an optional argument that stores `True` or `False` — no value follows it. Use `action='store_true'` to set it to `True` when present.",
        },
        {
          kind: "code",
          language: "python",
          code: `parser.add_argument("--verbose", "-v", action="store_true", help="Enable verbose output")
parser.add_argument("--no-color", action="store_true", help="Disable colored output")

args = parser.parse_args(["--verbose"])
print(args.verbose)   # True
print(args.no_color)  # False — attribute is args.no_color (dashes become underscores)`,
          caption: "action='store_true' creates a boolean flag",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Dashes become underscores",
          body: "argparse converts `--no-color` to `args.no_color` (dashes replaced with underscores) so the attribute is a valid Python identifier.",
        },
        {
          kind: "comparison",
          leftLabel: "store_true",
          rightLabel: "store_false",
          leftCode: `parser.add_argument("--debug",
    action="store_true")
# --debug  → True
# absent   → False`,
          rightCode: `parser.add_argument("--no-banner",
    action="store_false",
    dest="banner")
# --no-banner → False
# absent      → True`,
          caption: "store_true and store_false are mirrors of each other",
        },
        {
          kind: "why-matters",
          body: "Flags are how CLIs expose expert options without adding clutter to the basic usage. A --verbose or --dry-run flag is far cleaner than --mode=verbose.",
        },
      ],
      interactions: [
        {
          id: "s29-flags-predict",
          kind: "predict-output",
          prompt: "What does this print when argv contains only '--quiet'?",
          beginnerPurpose: "Trace how store_true sets a boolean attribute",
          expectedConceptIds: ["argparse-flags"],
          code: `import argparse
parser = argparse.ArgumentParser()
parser.add_argument("--quiet", action="store_true")
parser.add_argument("--debug", action="store_true")
args = parser.parse_args(["--quiet"])
print(args.quiet, args.debug)`,
          expectedOutput: "True False",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "store_true means: if present set True, if absent leave as False (the default)." },
          ],
          feedback: {
            correct: "Correct! --quiet is present (True), --debug is absent (False).",
            incorrect: "store_true sets the attribute to True when the flag is present; False when absent.",
          },
        },
        {
          id: "s29-flags-fill",
          kind: "fill-code",
          prompt: "Add a --dry-run flag that sets args.dry_run to True when present.",
          beginnerPurpose: "Practice adding a boolean flag",
          expectedConceptIds: ["argparse-flags"],
          codeTemplate: `parser.add_argument("--dry-run", action="___BLANK_1___", help="Simulate without writing")`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "store_true", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The action string for a boolean flag is 'store_true'." },
          ],
          feedback: {
            correct: "Correct! action='store_true' turns --dry-run into a boolean flag.",
            incorrect: "Use action='store_true' for flags that should be True when present.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "argparse-flags", recallPrompt: "What action value creates a boolean flag, and what is the default value when the flag is absent?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-flags-predict", "s29-flags-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.8 Subcommands ─────────────────────────────────────────────────
    {
      id: "s29-subcommands",
      stageId: "stage-29",
      title: "Subcommands",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Add subcommands with add_subparsers()",
        "Associate a handler function with each subcommand using set_defaults(func=)",
        "Dispatch to the correct handler based on the parsed subcommand",
      ],
      prerequisites: ["s29-optional-arguments"],
      concepts: ["argparse-subcommands"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Subcommands\n\nTools like `git`, `pip`, and `docker` use subcommands: `git commit`, `git push`. Each subcommand has its own set of arguments.\n\nIn argparse, `add_subparsers()` creates a dispatcher, and `add_parser()` adds each subcommand.",
        },
        {
          kind: "code",
          language: "python",
          code: `import argparse, sys

def cmd_push(args):
    print(f"Pushing to {args.remote}")
    return 0

def cmd_pull(args):
    print(f"Pulling from {args.remote}")
    return 0

def main(argv=None):
    parser = argparse.ArgumentParser(prog="vcs")
    subs = parser.add_subparsers(dest="command", required=True)

    push = subs.add_parser("push", help="Push commits")
    push.add_argument("remote", default="origin", nargs="?")
    push.set_defaults(func=cmd_push)

    pull = subs.add_parser("pull", help="Pull commits")
    pull.add_argument("remote", default="origin", nargs="?")
    pull.set_defaults(func=cmd_pull)

    args = parser.parse_args(argv)
    return args.func(args)

sys.exit(main())`,
          caption: "set_defaults(func=...) enables clean dispatch without if/elif chains",
          highlight: [14, 19, 24],
        },
        {
          kind: "callout",
          variant: "tip",
          title: "required=True for subparsers",
          body: "Add `required=True` to `add_subparsers()` so argparse errors when no subcommand is given. Without it, omitting a subcommand silently gives `args.command = None`.",
        },
        {
          kind: "why-matters",
          body: "Subcommands let you ship a single executable that covers many operations. They are the foundation of tools like pip, docker, and git — all modeled as one CLI with sub-verbs.",
        },
      ],
      interactions: [
        {
          id: "s29-subcommands-mc",
          kind: "multiple-choice",
          prompt: "What is the purpose of `set_defaults(func=cmd_push)` on a subparser?",
          beginnerPurpose: "Understand how subcommand dispatch works",
          expectedConceptIds: ["argparse-subcommands"],
          options: [
            { id: "a", text: "It makes cmd_push the default function even when a different subcommand is chosen", isCorrect: false, explanation: "set_defaults only applies to the specific subparser it is called on." },
            { id: "b", text: "It stores cmd_push on args.func so the main() dispatcher can call args.func(args)", isCorrect: true, explanation: "This pattern avoids if/elif dispatch — each subcommand injects its own handler." },
            { id: "c", text: "It validates that cmd_push exists before parsing", isCorrect: false, explanation: "argparse does not validate function existence." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "After parse_args(), args.func holds whatever was set with set_defaults(func=...)." },
          ],
          feedback: {
            correct: "Correct! set_defaults(func=...) lets you dispatch with args.func(args) instead of a chain of ifs.",
            incorrect: "set_defaults(func=cmd_push) stores cmd_push on args.func for that subcommand.",
          },
        },
        {
          id: "s29-subcommands-fill",
          kind: "fill-code",
          prompt: "Complete the subcommand registration to add a 'status' subcommand linked to cmd_status.",
          beginnerPurpose: "Practice adding subcommands and binding handler functions",
          expectedConceptIds: ["argparse-subcommands"],
          codeTemplate: `subs = parser.add_subparsers(dest="command", required=True)
status = subs.___BLANK_1___("status", help="Show status")
status.set_defaults(___BLANK_2___=cmd_status)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "add_parser", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "func", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The method to register a new subcommand is add_parser(). The keyword for set_defaults is func." },
          ],
          feedback: {
            correct: "Correct! subs.add_parser('status') registers the subcommand, and set_defaults(func=cmd_status) binds the handler.",
            incorrect: "Use add_parser() to create the subcommand parser and set_defaults(func=...) to link the handler.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "argparse-subcommands", recallPrompt: "Describe the pattern for dispatching to subcommand handlers without an if/elif chain.", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-subcommands-mc", "s29-subcommands-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.9 Help Text Generation ────────────────────────────────────────
    {
      id: "s29-help-text",
      stageId: "stage-29",
      title: "Help Text Generation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write descriptive help strings for each argument",
        "Use description, epilog, and formatter_class to shape --help output",
        "Add metavar to control how arguments appear in usage lines",
      ],
      prerequisites: ["s29-argparse-overview"],
      concepts: ["argparse-help"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Automatic Help Text\n\nargparse generates `--help` output from the metadata you provide:\n- `description=` — shown after the usage line\n- `epilog=` — shown at the bottom\n- `help=` on each argument — shown in the argument list\n- `metavar=` — controls how the value placeholder looks in usage\n\nGood help text is a form of documentation that lives alongside the code.",
        },
        {
          kind: "code",
          language: "python",
          code: `import argparse, textwrap

parser = argparse.ArgumentParser(
    description="Upload files to a remote server.",
    epilog="Example: upload report.pdf --host example.com",
    formatter_class=argparse.RawDescriptionHelpFormatter,
)
parser.add_argument("file", metavar="FILE", help="File to upload")
parser.add_argument("--host", metavar="HOST", required=True, help="Target hostname")
parser.add_argument("--port", type=int, default=22, metavar="PORT", help="SSH port (default: 22)")`,
          caption: "metavar makes the usage line read like human language",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "RawDescriptionHelpFormatter preserves whitespace",
          body: "By default, argparse collapses whitespace in description and epilog. Use `formatter_class=argparse.RawDescriptionHelpFormatter` to preserve newlines and indentation in multi-line help strings.",
        },
        {
          kind: "why-matters",
          body: "A CLI without good help text forces users to read source code. Investing 30 seconds in help= strings eliminates hours of confusion for everyone who uses your tool.",
        },
      ],
      interactions: [
        {
          id: "s29-help-mc",
          kind: "multiple-choice",
          prompt: "What does `metavar='FILE'` control in the --help output?",
          beginnerPurpose: "Understand the role of metavar in argparse help",
          expectedConceptIds: ["argparse-help"],
          options: [
            { id: "a", text: "It sets the default value of the argument to FILE", isCorrect: false, explanation: "That is the default= keyword." },
            { id: "b", text: "It controls the placeholder name shown in usage and argument listings", isCorrect: true, explanation: "Without metavar, argparse uses the dest name (often all-caps). metavar lets you override that display." },
            { id: "c", text: "It restricts the argument to a file that must exist", isCorrect: false, explanation: "That is done with type=argparse.FileType('r')." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "metavar is purely a display name — it does not validate or change values." },
          ],
          feedback: {
            correct: "Correct! metavar controls only the display name in usage lines and help output.",
            incorrect: "metavar is a display-only name for how the value placeholder appears in --help.",
          },
        },
        {
          id: "s29-help-plain",
          kind: "plain-language-explain",
          prompt: "Explain why writing good help= strings for CLI arguments matters.",
          beginnerPurpose: "Articulate the user-experience importance of help text",
          expectedConceptIds: ["argparse-help"],
          code: `parser.add_argument("--timeout", type=float, default=30.0,
    help="Maximum seconds to wait for a response (default: 30)")`,
          keyPointsToHit: [
            "argparse generates --help automatically from help= strings",
            "Good help text serves as inline documentation",
            "Users can understand how to use the tool without reading source code",
          ],
          sampleAnswer: "argparse automatically generates a --help page from the help= strings you provide on each argument. Good help strings serve as documentation that lives with the code — users can run --help to understand what every option does without reading the source. The example shows including the default value in the help string, which is a common convention.",
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think about what a user sees when they run your tool with --help for the first time." },
          ],
          feedback: {
            correct: "Excellent! Help text is user-facing documentation generated for free by argparse.",
            incorrect: "Focus on: what argparse generates from help= strings, and why that benefits users.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "argparse-help", recallPrompt: "What keyword argument controls the placeholder name shown in argparse usage lines?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-help-mc", "s29-help-plain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.10 Error Messages in CLIs ─────────────────────────────────────
    {
      id: "s29-error-messages",
      stageId: "stage-29",
      title: "Error Messages in CLIs",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write error messages to stderr rather than stdout",
        "Use parser.error() for argument validation errors",
        "Format error messages clearly with actionable context",
      ],
      prerequisites: ["s29-argparse-overview", "s29-exit-codes"],
      concepts: ["cli-error-messages"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Writing Error Messages\n\nGood CLI error messages have three properties:\n1. **Specific** — say what was wrong, not just 'error'\n2. **Actionable** — suggest how to fix it\n3. **Correct stream** — go to stderr, not stdout\n\nargparse's `parser.error()` prints a usage line plus your message to stderr and exits with code 2.",
        },
        {
          kind: "code",
          language: "python",
          code: `import argparse, sys

parser = argparse.ArgumentParser()
parser.add_argument("port", type=int)
args = parser.parse_args()

# Custom validation after parsing
if not (1 <= args.port <= 65535):
    parser.error(f"Port {args.port} is out of range 1-65535")
    # ^ prints to stderr: "error: Port 99999 is out of range 1-65535" and exits 2

# For non-argument errors, write to stderr directly:
try:
    connect(args.port)
except ConnectionRefusedError:
    print(f"Cannot connect to port {args.port}", file=sys.stderr)
    sys.exit(1)`,
          caption: "parser.error() for arg validation; sys.stderr for runtime errors",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never print errors to stdout",
          body: "stdout may be piped to another program or redirected to a file. Errors on stdout corrupt that output. Always use `print(..., file=sys.stderr)` or `parser.error()`.",
        },
        {
          kind: "why-matters",
          body: "Clear error messages with actionable guidance are the difference between a tool users love and one they abandon. stdout/stderr separation lets shell pipelines work correctly.",
        },
      ],
      interactions: [
        {
          id: "s29-errors-mc",
          kind: "multiple-choice",
          prompt: "You want to report a validation error after parsing (port out of range). Which is correct?",
          beginnerPurpose: "Choose between parser.error() and sys.stderr for different error types",
          expectedConceptIds: ["cli-error-messages"],
          options: [
            { id: "a", text: "print('Error: port out of range'); sys.exit(1)", isCorrect: false, explanation: "This prints to stdout, which may be piped to another program." },
            { id: "b", text: "parser.error('Port out of range 1-65535')", isCorrect: true, explanation: "parser.error() prints to stderr with a usage line and exits 2 — the correct behavior for argument errors." },
            { id: "c", text: "raise ValueError('port out of range')", isCorrect: false, explanation: "Raising an exception shows a traceback — inappropriate for user-facing CLI errors." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "parser.error() is designed for argument validation errors — it shows the usage and exits cleanly." },
          ],
          feedback: {
            correct: "Correct! parser.error() handles argument validation errors cleanly with proper exit code and stream.",
            incorrect: "Use parser.error() for argument validation errors — it writes to stderr and exits with code 2.",
          },
        },
        {
          id: "s29-errors-fill",
          kind: "fill-code",
          prompt: "Write a runtime error to stderr without raising an exception.",
          beginnerPurpose: "Practice writing to sys.stderr",
          expectedConceptIds: ["cli-error-messages"],
          codeTemplate: `import sys
print(f"Error: cannot open {path}", file=___BLANK_1___)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "sys.stderr", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The file= keyword of print() accepts any file-like object. sys.stderr is the standard error stream." },
          ],
          feedback: {
            correct: "Correct! file=sys.stderr routes the message to the error stream.",
            incorrect: "Use file=sys.stderr to direct error output to the standard error stream.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cli-error-messages", recallPrompt: "Name two ways to write an error message from a CLI without printing to stdout.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-errors-mc", "s29-errors-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.11 getpass ────────────────────────────────────────────────────
    {
      id: "s29-getpass",
      stageId: "stage-29",
      title: "getpass for Passwords",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use getpass.getpass() to read a password without echoing it",
        "Explain why passwords should never be passed as command-line arguments",
        "Retrieve the current user's login name with getpass.getuser()",
      ],
      prerequisites: ["s29-cli-program-structure"],
      concepts: ["getpass"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Secure Password Input\n\nPassing passwords as command-line arguments is insecure — they appear in the process list (`ps aux`), shell history, and logs. The `getpass` module provides a safe alternative: prompt the user to type a password with echo disabled.",
        },
        {
          kind: "code",
          language: "python",
          code: `import getpass

password = getpass.getpass("Database password: ")
# Terminal shows: "Database password: " but hides what the user types

username = getpass.getuser()   # Returns the OS login name (e.g. 'alice')
print(f"Connecting as {username}")`,
          caption: "getpass.getpass() hides input; getuser() gets the OS username",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never accept passwords as arguments",
          body: "Avoid `--password=secret` in argparse. Passwords passed as arguments appear in `ps aux` output, shell history, and CI logs. Always use `getpass.getpass()` or read from an environment variable.",
        },
        {
          kind: "why-matters",
          body: "Security is not optional. A tool that leaks credentials through the process list has a vulnerability that could expose production systems. getpass is a one-function fix for a serious mistake.",
        },
      ],
      interactions: [
        {
          id: "s29-getpass-mc",
          kind: "multiple-choice",
          prompt: "Why is `--password=mysecret` a bad pattern for a CLI?",
          beginnerPurpose: "Understand the security risk of passwords in argv",
          expectedConceptIds: ["getpass"],
          options: [
            { id: "a", text: "argparse cannot parse arguments containing '=' characters", isCorrect: false, explanation: "argparse handles --key=value just fine." },
            { id: "b", text: "The password appears in the process list, shell history, and potentially logs", isCorrect: true, explanation: "Any process on the system can read another process's argv, making command-line passwords visible." },
            { id: "c", text: "Passwords are too long for sys.argv", isCorrect: false, explanation: "Length is not the issue." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Run 'ps aux' and look at the CMD column — you will see full argument lists." },
          ],
          feedback: {
            correct: "Correct! argv is visible to other processes and stored in shell history — unsafe for secrets.",
            incorrect: "Passwords in argv are visible in ps aux output, shell history, and logs.",
          },
        },
        {
          id: "s29-getpass-fill",
          kind: "fill-code",
          prompt: "Read a password securely without echoing it to the terminal.",
          beginnerPurpose: "Practice using getpass.getpass()",
          expectedConceptIds: ["getpass"],
          codeTemplate: `import ___BLANK_1___

pw = ___BLANK_2___.getpass("Enter token: ")`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "getpass", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "getpass", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The module and function share the name 'getpass'." },
          ],
          feedback: {
            correct: "Correct! import getpass, then call getpass.getpass() to prompt without echo.",
            incorrect: "Both the module and the function within it are named 'getpass'.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "getpass", recallPrompt: "Why are --password= style arguments insecure, and what is the correct alternative?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-getpass-mc", "s29-getpass-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.12 Environment Variables ──────────────────────────────────────
    {
      id: "s29-environment-variables",
      stageId: "stage-29",
      title: "Environment Variables",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Read environment variables with os.environ and os.getenv()",
        "Provide sensible defaults when variables are absent",
        "Explain when to use env vars vs command-line flags",
      ],
      prerequisites: ["s29-getpass"],
      concepts: ["env-vars"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Environment Variables in CLIs\n\nEnvironment variables are key-value pairs the OS provides to every process. They are ideal for:\n- **Secrets** — API keys, tokens, passwords (set once, not in history)\n- **Configuration** — deployment environment, feature flags\n- **Defaults** — values that change between environments but rarely between runs\n\nUse `os.getenv('KEY', default)` instead of `os.environ['KEY']` to avoid `KeyError` on missing variables.",
        },
        {
          kind: "code",
          language: "python",
          code: `import os

# Safe read with default
api_key = os.getenv("MY_API_KEY", "")
if not api_key:
    raise SystemExit("MY_API_KEY is not set. Export it before running.")

debug = os.getenv("DEBUG", "0") == "1"   # "1" or "0"
host = os.getenv("HOST", "localhost")
port = int(os.getenv("PORT", "8080"))`,
          caption: "os.getenv() with sensible defaults and type conversion",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Convention: document env vars in --help",
          body: "Add a note like 'Set MY_API_KEY environment variable before running.' in the argparse epilog or a README. Users cannot discover env vars from --help unless you tell them.",
        },
        {
          kind: "comparison",
          leftLabel: "Use env vars for",
          rightLabel: "Use CLI flags for",
          leftCode: `# Secrets (API keys, passwords)
# Per-environment config (dev vs prod)
# Long-lived defaults
# CI/CD configuration`,
          rightCode: `# Per-invocation options
# Things users change run-by-run
# Values that belong in scripts
# Arguments shown in history is OK`,
          caption: "Env vars and flags serve different purposes — use both appropriately",
        },
        {
          kind: "why-matters",
          body: "12-factor app methodology mandates env vars for configuration. Following this pattern makes your tool deployable in Docker, CI, and any cloud environment without code changes.",
        },
      ],
      interactions: [
        {
          id: "s29-env-predict",
          kind: "predict-output",
          prompt: "What does this print if MY_TIMEOUT is not set in the environment?",
          beginnerPurpose: "Understand how os.getenv() falls back to its default",
          expectedConceptIds: ["env-vars"],
          code: `import os
timeout = int(os.getenv("MY_TIMEOUT", "30"))
print(timeout)`,
          expectedOutput: "30",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "When the variable is absent, os.getenv() returns the second argument." },
          ],
          feedback: {
            correct: "Correct! os.getenv('MY_TIMEOUT', '30') returns '30' when unset, then int() converts it.",
            incorrect: "os.getenv() returns the default string '30' when MY_TIMEOUT is not set; int() converts it to 30.",
          },
        },
        {
          id: "s29-env-mc",
          kind: "multiple-choice",
          prompt: "Which is the safest way to read an API key from the environment?",
          beginnerPurpose: "Choose between os.environ[] and os.getenv() for required secrets",
          expectedConceptIds: ["env-vars"],
          options: [
            { id: "a", text: "api_key = os.environ['API_KEY']", isCorrect: false, explanation: "This raises KeyError if the variable is unset — not a user-friendly error." },
            { id: "b", text: "api_key = os.getenv('API_KEY', ''); if not api_key: sys.exit('API_KEY not set')", isCorrect: true, explanation: "This provides a clear, actionable error message when the variable is missing." },
            { id: "c", text: "api_key = os.getenv('API_KEY')", isCorrect: false, explanation: "This returns None silently when unset, which will cause a cryptic AttributeError later." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "The safest pattern checks explicitly for a missing value and exits with a helpful message." },
          ],
          feedback: {
            correct: "Correct! Explicitly checking and exiting with a message is cleaner than KeyError or silent None.",
            incorrect: "The best pattern reads with os.getenv(), then explicitly checks and provides a clear error message.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "env-vars", recallPrompt: "What is the difference between os.environ['KEY'] and os.getenv('KEY', default) when the variable is absent?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-env-predict", "s29-env-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.13 Standard Streams ───────────────────────────────────────────
    {
      id: "s29-standard-streams",
      stageId: "stage-29",
      title: "Standard Streams (stdin, stdout, stderr)",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish the roles of stdin, stdout, and stderr",
        "Read from stdin using sys.stdin and fileinput",
        "Redirect stderr independently from stdout in shell pipelines",
      ],
      prerequisites: ["s29-error-messages"],
      concepts: ["standard-streams"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Three Standard Streams\n\nEvery process starts with three open file handles:\n\n| Stream | Python name | Default | Purpose |\n|--------|-------------|---------|-------|\n| stdin  | `sys.stdin` | keyboard | Input data |\n| stdout | `sys.stdout` | terminal | Normal output |\n| stderr | `sys.stderr` | terminal | Errors, logs |\n\nShells can redirect them independently: `prog 2>/dev/null` silences stderr while preserving stdout.",
        },
        {
          kind: "code",
          language: "python",
          code: `import sys

# Read lines from stdin (pipe-friendly)
for line in sys.stdin:
    print(line.strip().upper())  # to stdout

# OR use fileinput: reads files listed in argv, falls back to stdin
import fileinput
for line in fileinput.input():
    print(line, end="")`,
          caption: "Reading stdin enables 'cat file.txt | myprog' pipelines",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Interactive stdin detection",
          body: "Use `sys.stdin.isatty()` to detect whether stdin is connected to a terminal (interactive) or a pipe (non-interactive). This lets you prompt users when interactive but silently process input when piped.",
        },
        {
          kind: "why-matters",
          body: "Unix philosophy is about composing small programs via pipes. A tool that reads stdin and writes stdout can be combined with any other Unix tool. Mixing errors into stdout breaks composability.",
        },
      ],
      interactions: [
        {
          id: "s29-streams-mc",
          kind: "multiple-choice",
          prompt: "You run `myapp 2>/dev/null`. What effect does this have?",
          beginnerPurpose: "Understand shell stream redirection",
          expectedConceptIds: ["standard-streams"],
          options: [
            { id: "a", text: "Both stdout and stderr go to /dev/null", isCorrect: false, explanation: "Only '2' (stderr) is redirected. '1' (stdout) still goes to the terminal." },
            { id: "b", text: "stderr is discarded; stdout still appears on the terminal", isCorrect: true, explanation: "'2>' redirects file descriptor 2 (stderr) to /dev/null, silencing error output." },
            { id: "c", text: "stdin is read from /dev/null instead of the keyboard", isCorrect: false, explanation: "'0<' or '<' redirects stdin. '2>' redirects stderr." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "File descriptor numbers: 0=stdin, 1=stdout, 2=stderr." },
          ],
          feedback: {
            correct: "Correct! 2>/dev/null silences only stderr; stdout still reaches the terminal.",
            incorrect: "File descriptor 2 is stderr. 2>/dev/null discards only error output.",
          },
        },
        {
          id: "s29-streams-fill",
          kind: "fill-code",
          prompt: "Detect whether stdin is interactive (a terminal) or a pipe.",
          beginnerPurpose: "Practice using sys.stdin.isatty()",
          expectedConceptIds: ["standard-streams"],
          codeTemplate: `import sys
if sys.___BLANK_1___.___BLANK_2___():
    name = input("Enter name: ")
else:
    name = sys.stdin.readline().strip()`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "stdin", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "isatty", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The method to check if a stream is a terminal is isatty()." },
          ],
          feedback: {
            correct: "Correct! sys.stdin.isatty() returns True when stdin is a terminal.",
            incorrect: "Use sys.stdin.isatty() to distinguish interactive from piped input.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "standard-streams", recallPrompt: "Name the three standard streams and their file descriptor numbers.", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-streams-mc", "s29-streams-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.14 Progress Reporting ─────────────────────────────────────────
    {
      id: "s29-progress-reporting",
      stageId: "stage-29",
      title: "Progress Reporting",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Print progress updates that overwrite the same line using \\r",
        "Use sys.stdout.flush() to force immediate output",
        "Understand when and why to write progress to stderr",
      ],
      prerequisites: ["s29-standard-streams"],
      concepts: ["cli-progress"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Progress Reporting in Terminal Programs\n\nLong-running CLIs should report progress so users know the program has not frozen. The simplest technique uses the carriage return character `\\r` to move the cursor back to the start of the line without advancing to a new line.",
        },
        {
          kind: "code",
          language: "python",
          code: `import sys, time

total = 100
for i in range(total + 1):
    pct = i / total * 100
    bar = "#" * (i // 5) + " " * (20 - i // 5)
    print(f"\\r[{bar}] {pct:5.1f}%", end="", flush=True)
    time.sleep(0.05)

print()  # Move to next line when done`,
          caption: "\\r returns cursor to line start; flush=True forces immediate display",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Write progress to stderr",
          body: "If stdout is piped, printing progress there corrupts the output. Write progress to stderr: `print(f'\\r{msg}', end='', file=sys.stderr, flush=True)`. The progress display disappears when captured, leaving only clean data on stdout.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Third-party progress bars",
          body: "`tqdm` is a popular library that handles progress bars, ETA estimation, and nested bars. For production tools, `pip install tqdm` is worth the dependency.",
        },
        {
          kind: "why-matters",
          body: "A program that runs for 30 seconds without feedback looks frozen. A single line of progress output is the difference between users killing your process and waiting patiently.",
        },
      ],
      interactions: [
        {
          id: "s29-progress-mc",
          kind: "multiple-choice",
          prompt: "Why should long-running progress output go to stderr rather than stdout?",
          beginnerPurpose: "Understand stream separation for progress vs data",
          expectedConceptIds: ["cli-progress"],
          options: [
            { id: "a", text: "stderr is faster than stdout", isCorrect: false, explanation: "Both streams have similar performance." },
            { id: "b", text: "When stdout is piped, progress on stdout corrupts the captured data", isCorrect: true, explanation: "Piping 'prog | next' captures stdout. Progress on stdout would mix with the actual data." },
            { id: "c", text: "stderr shows colors that stdout cannot", isCorrect: false, explanation: "Color support depends on terminal detection, not the stream." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think about what happens when the user runs: myapp | wc -l" },
          ],
          feedback: {
            correct: "Correct! Progress on stderr keeps stdout clean for piping and redirection.",
            incorrect: "stdout is often piped or redirected — progress on stdout would corrupt the data output.",
          },
        },
        {
          id: "s29-progress-predict",
          kind: "predict-output",
          prompt: "What appears on the terminal after this loop completes?",
          beginnerPurpose: "Understand how \\r and end='' interact with print",
          expectedConceptIds: ["cli-progress"],
          code: `for i in [10, 50, 100]:
    print(f"\\r{i}%", end="", flush=True)
print()`,
          expectedOutput: "100%",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "\\r returns to the start of the line, overwriting previous content. The final print() adds a newline." },
          ],
          feedback: {
            correct: "Correct! Each \\r overwrites the previous percentage; only 100% remains when the loop ends.",
            incorrect: "\\r moves the cursor to the start of the line, overwriting previous text. The last value (100%) survives.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cli-progress", recallPrompt: "What character returns the cursor to the start of the current line, and why use flush=True?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-progress-mc", "s29-progress-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.15 CLI Configuration Files ────────────────────────────────────
    {
      id: "s29-cli-config-files",
      stageId: "stage-29",
      title: "CLI Configuration Files",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Load configuration from a TOML or INI file using tomllib or configparser",
        "Merge file config with CLI arguments using a priority order",
        "Follow XDG conventions for config file locations",
      ],
      prerequisites: ["s29-environment-variables"],
      concepts: ["cli-config"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Configuration File Priority\n\nProfessional CLIs follow a priority order (highest wins):\n\n1. Command-line flags\n2. Environment variables\n3. User config file (`~/.config/myapp/config.toml`)\n4. System config file (`/etc/myapp/config.toml`)\n5. Built-in defaults\n\nThis lets users set defaults in a config file while overriding them per-run with flags.",
        },
        {
          kind: "code",
          language: "python",
          code: `import tomllib, os
from pathlib import Path

CONFIG_PATH = Path.home() / ".config" / "myapp" / "config.toml"

def load_config() -> dict:
    if CONFIG_PATH.exists():
        with CONFIG_PATH.open("rb") as f:
            return tomllib.load(f)
    return {}

def resolve_options(args, config: dict) -> dict:
    return {
        "host": args.host or config.get("host", "localhost"),
        "port": args.port or config.get("port", 8080),
    }`,
          caption: "tomllib (Python 3.11+) reads TOML; merge CLI args over config file values",
        },
        {
          kind: "callout",
          variant: "info",
          title: "configparser for INI files",
          body: "Use `configparser.ConfigParser()` if you prefer `.ini` style files. It is in the standard library for all Python versions and supports sections like `[database]`.",
        },
        {
          kind: "why-matters",
          body: "Config files prevent users from typing the same --host and --port every time. Well-designed config + CLI argument merging is what separates professional tools from scripts.",
        },
      ],
      interactions: [
        {
          id: "s29-config-mc",
          kind: "multiple-choice",
          prompt: "In the priority model, which source should win when the same option is set in a config file AND passed as a CLI flag?",
          beginnerPurpose: "Understand the CLI/config/env priority order",
          expectedConceptIds: ["cli-config"],
          options: [
            { id: "a", text: "Config file wins because it was set intentionally by the user", isCorrect: false, explanation: "CLI flags are the most specific — the user typed them right now." },
            { id: "b", text: "CLI flag wins because it is the most immediate and specific override", isCorrect: true, explanation: "Command-line flags are highest priority: explicit, per-invocation, and intentional." },
            { id: "c", text: "Environment variable wins over both", isCorrect: false, explanation: "CLI flags are higher priority than env vars in the conventional order." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think of priorities as specificity: flags are most specific, defaults are least specific." },
          ],
          feedback: {
            correct: "Correct! CLI flags always override config files and env vars.",
            incorrect: "The order is: CLI flags > env vars > config file > defaults. CLI flags win.",
          },
        },
        {
          id: "s29-config-plain",
          kind: "plain-language-explain",
          prompt: "Explain why a CLI tool might read a config file in addition to command-line arguments.",
          beginnerPurpose: "Articulate the user experience benefit of config files",
          expectedConceptIds: ["cli-config"],
          code: `# ~/.config/myapp/config.toml
# [server]
# host = "db.prod.example.com"
# port = 5432`,
          keyPointsToHit: [
            "Typing the same flags every run is tedious",
            "Config files store persistent defaults",
            "CLI flags override config for per-run customization",
          ],
          sampleAnswer: "Without a config file, users must type --host and --port every single invocation. A config file stores persistent defaults that are loaded automatically. The CLI flag --host still works and overrides the config, so users get persistent convenience plus per-run flexibility.",
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think about the user experience of running the same tool 50 times a day." },
          ],
          feedback: {
            correct: "Excellent! Config files store persistent defaults so users avoid repetitive typing.",
            incorrect: "Focus on: reducing repetitive typing, persistent vs per-run settings, and overrides.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cli-config", recallPrompt: "List the priority order when the same option is set in a CLI flag, env var, and config file.", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-config-mc", "s29-config-plain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.16 CLI Packaging Entry Points ─────────────────────────────────
    {
      id: "s29-entry-points",
      stageId: "stage-29",
      title: "CLI Packaging Entry Points",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define a [project.scripts] entry point in pyproject.toml",
        "Explain how pip install creates a console script wrapper",
        "Verify an installed entry point works from the shell",
      ],
      prerequisites: ["s29-cli-program-structure"],
      concepts: ["cli-entry-points"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Packaging CLIs with Entry Points\n\nTo distribute a CLI as a `pip install`-able package, declare a **script entry point** in `pyproject.toml`. pip will create a wrapper executable in the user's PATH that calls your `main()` function.",
        },
        {
          kind: "code",
          language: "toml",
          code: `[project]
name = "myapp"
version = "1.0.0"

[project.scripts]
myapp = "myapp.cli:main"
#        ^module  ^function`,
          caption: "pyproject.toml entry point: installs 'myapp' command that calls myapp.cli.main()",
        },
        {
          kind: "code",
          language: "python",
          code: `# myapp/cli.py
import argparse, sys

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("name")
    args = parser.parse_args()
    print(f"Hello, {args.name}!")
    return 0

if __name__ == "__main__":
    sys.exit(main())`,
          caption: "The cli.py module contains main() which the entry point calls",
        },
        {
          kind: "callout",
          variant: "info",
          title: "pip install -e . for development",
          body: "During development, `pip install -e .` installs the package in editable mode so changes to your source code take effect immediately without reinstalling.",
        },
        {
          kind: "why-matters",
          body: "Entry points turn a Python script into a proper installable command-line tool. Users run `pip install myapp` once and then `myapp --help` forever — no knowledge of Python paths required.",
        },
      ],
      interactions: [
        {
          id: "s29-entry-mc",
          kind: "multiple-choice",
          prompt: "What does `myapp = 'myapp.cli:main'` in [project.scripts] tell pip to do?",
          beginnerPurpose: "Understand how entry points map to Python functions",
          expectedConceptIds: ["cli-entry-points"],
          options: [
            { id: "a", text: "Create a shell alias 'myapp' pointing to the myapp.cli module", isCorrect: false, explanation: "pip creates an executable wrapper, not a shell alias." },
            { id: "b", text: "Install an executable 'myapp' that calls the main() function in myapp/cli.py when run", isCorrect: true, explanation: "pip creates a small wrapper script that imports and calls myapp.cli.main()." },
            { id: "c", text: "Make myapp.cli.main() the entry point for all Python scripts in the package", isCorrect: false, explanation: "Entry points are per-name — each script name maps to one function." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "The format is 'module.path:function_name'." },
          ],
          feedback: {
            correct: "Correct! pip creates an executable wrapper that imports and calls myapp.cli.main().",
            incorrect: "The entry point format is 'module:function'. pip creates an executable that calls that function.",
          },
        },
        {
          id: "s29-entry-reorder",
          kind: "reorder-code",
          prompt: "Put the steps in the correct order to go from Python code to an installed CLI command.",
          beginnerPurpose: "Understand the packaging and installation workflow",
          expectedConceptIds: ["cli-entry-points"],
          lines: [
            "Write main() in myapp/cli.py",
            "Add [project.scripts] entry point in pyproject.toml",
            "Run pip install -e .",
            "Run myapp --help from the terminal",
          ],
          correctOrder: [0, 1, 2, 3],
          allowedAttempts: 3,
          hints: [
            { level: "structural", text: "You must write the code before configuring it, configure before installing, and install before running." },
          ],
          feedback: {
            correct: "Correct! Code → configure → install → use is the standard workflow.",
            incorrect: "The order is: write the function, declare the entry point, install the package, then run the command.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cli-entry-points", recallPrompt: "What section of pyproject.toml declares CLI entry points, and what format does each entry use?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-entry-mc", "s29-entry-reorder"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 29.17 CLI Project ────────────────────────────────────────────────
    {
      id: "s29-cli-project",
      stageId: "stage-29",
      title: "CLI Project: Task Manager",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Build a multi-subcommand CLI with add, list, and done subcommands",
        "Persist tasks in a JSON file in the user's home directory",
        "Implement proper exit codes, stderr error messages, and --help text",
        "Package the tool with a pyproject.toml entry point",
      ],
      prerequisites: [
        "s29-cli-program-structure",
        "s29-exit-codes",
        "s29-subcommands",
        "s29-entry-points",
        "s29-environment-variables",
      ],
      concepts: ["cli-structure", "argparse", "argparse-subcommands", "cli-entry-points"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project: Command-Line Task Manager\n\nBuild `tasks` — a CLI task manager. Users should be able to:\n\n```\ntasks add 'Buy groceries'\ntasks add 'Write report' --priority high\ntasks list\ntasks list --priority high\ntasks done 1\ntasks delete 1\n```\n\nTasks are stored in `~/.tasks.json`.",
        },
        {
          kind: "code",
          language: "python",
          code: `# Skeleton for tasks/cli.py
import argparse, json, sys
from pathlib import Path

TASKS_FILE = Path.home() / ".tasks.json"

def load_tasks() -> list[dict]:
    if TASKS_FILE.exists():
        return json.loads(TASKS_FILE.read_text())
    return []

def save_tasks(tasks: list[dict]) -> None:
    TASKS_FILE.write_text(json.dumps(tasks, indent=2))

def cmd_add(args) -> int:
    tasks = load_tasks()
    task = {"id": len(tasks) + 1, "text": args.text,
            "priority": args.priority, "done": False}
    tasks.append(task)
    save_tasks(tasks)
    print(f"Added task {task['id']}: {args.text}")
    return 0

# TODO: implement cmd_list, cmd_done, cmd_delete

def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="tasks", description="Manage your tasks.")
    subs = parser.add_subparsers(dest="command", required=True)

    add_p = subs.add_parser("add", help="Add a task")
    add_p.add_argument("text", help="Task description")
    add_p.add_argument("--priority", choices=["low","medium","high"], default="medium")
    add_p.set_defaults(func=cmd_add)

    # TODO: register list, done, delete subcommands

    return parser

def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    return args.func(args)

if __name__ == "__main__":
    sys.exit(main())`,
          caption: "Project starter — complete the missing subcommands",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Project requirements",
          body: "1. Implement all four subcommands. 2. Write errors to stderr. 3. Use proper exit codes. 4. Add a [project.scripts] entry point named 'tasks'. 5. Handle the edge case where the task file does not exist yet.",
        },
        {
          kind: "why-matters",
          body: "This project integrates all CLI concepts: argument parsing, subcommands, environment/file config, exit codes, and packaging. Completing it gives you a reusable CLI template for any future project.",
        },
      ],
      interactions: [
        {
          id: "s29-project-run",
          kind: "run-code",
          prompt: "Complete the cmd_list function that prints all tasks with their id, priority, text, and done status.",
          beginnerPurpose: "Apply subcommand and JSON file skills in a project context",
          expectedConceptIds: ["cli-structure", "argparse-subcommands"],
          starterCode: `import json
from pathlib import Path

TASKS_FILE = Path.home() / ".tasks.json"

def load_tasks():
    if TASKS_FILE.exists():
        return json.loads(TASKS_FILE.read_text())
    return []

def cmd_list(tasks):
    for t in tasks:
        status = "done" if t["done"] else "todo"
        print(f"[{t['id']}] ({t['priority']}) {t['text']} - {status}")

# Test it
import tempfile, os
tasks_data = [
    {"id": 1, "text": "Buy groceries", "priority": "low", "done": False},
    {"id": 2, "text": "Write report", "priority": "high", "done": True},
]
cmd_list(tasks_data)`,
          task: "Run the code and verify both tasks are printed with their status.",
          expectedOutputContains: ["Buy groceries", "Write report", "done", "todo"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "Iterate over the tasks list and format each task's fields." },
          ],
          feedback: {
            correct: "Excellent! The list command correctly formats and prints all tasks.",
            incorrect: "Make sure to iterate over tasks and print id, priority, text, and done status.",
          },
        },
        {
          id: "s29-project-mc",
          kind: "multiple-choice",
          prompt: "Your 'tasks done' subcommand receives an ID that does not exist. What is the correct behavior?",
          beginnerPurpose: "Apply error handling principles to the project",
          expectedConceptIds: ["cli-error-messages", "exit-codes"],
          options: [
            { id: "a", text: "Print 'Task not found' to stdout and return 0", isCorrect: false, explanation: "Error messages belong on stderr, and the exit code should indicate failure." },
            { id: "b", text: "Print 'Error: task ID not found' to stderr and return 1", isCorrect: true, explanation: "Errors go to stderr; non-zero exit code signals failure to the caller." },
            { id: "c", text: "Raise a KeyError and let Python print the traceback", isCorrect: false, explanation: "Tracebacks are not user-friendly CLI error messages." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Apply the CLI error message rules: stderr, non-zero exit, actionable message." },
          ],
          feedback: {
            correct: "Correct! Errors to stderr with non-zero exit code is the correct CLI pattern.",
            incorrect: "Errors go to stderr, not stdout. Use exit code 1 to signal failure.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cli-structure", recallPrompt: "What are the five things that make a CLI a well-behaved Unix citizen?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s29-project-run", "s29-project-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s29-project",
    stageId: "stage-29",
    title: "CLI Task Manager Application",
    brief: "Build a fully-featured command-line task manager with subcommands (add, list, done, delete), JSON persistence, proper exit codes, stderr error messages, and a pyproject.toml entry point.",
    requirements: [
      "Implement add, list, done, and delete subcommands using argparse subparsers",
      "Persist tasks in ~/.tasks.json using json module",
      "All error messages go to stderr with non-zero exit codes",
      "Provide --priority flag on 'add' with choices low/medium/high",
      "Provide --priority filter on 'list' subcommand",
      "Declare a [project.scripts] entry point named 'tasks'",
    ],
    acceptanceCriteria: [
      "tasks add 'text' creates a task and prints confirmation",
      "tasks list shows all tasks with id, priority, text, and done status",
      "tasks done <id> marks the task done and errors cleanly on bad id",
      "tasks delete <id> removes the task",
      "Non-existent task IDs produce stderr messages and exit code 1",
      "pip install -e . creates a working 'tasks' command",
    ],
    conceptIds: ["cli-structure", "argparse", "argparse-subcommands", "exit-codes", "cli-entry-points"],
    difficulty: "intermediate",
  },
} satisfies Stage;
