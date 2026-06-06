import type { Stage } from "@/course/course.schema";

export const stage11 = {
  id: "stage-11",
  number: 11,
  title: "Automation and CLI Tools",
  summary:
    "Build command-line tools with argparse, logging, config files, batch file operations, and user-friendly error messages.",
  level: "intermediate",
  masteryGateConceptIds: [
    "argparse",
    "cli-argument",
    "logging",
    "config-file",
    "exit-code",
    "batch-operation",
  ],
  lessons: [
    /* ── Lesson 1: CLI Scripts ───────────────────────────────────────────── */
    {
      id: "s11-cli-scripts",
      stageId: "stage-11",
      title: "CLI Scripts and the Entry Point Pattern",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the `if __name__ == '__main__':` guard",
        "Use `sys.argv` to read raw command-line arguments",
        "Exit with meaningful exit codes using `sys.exit()`",
        "Structure a script for import safety",
      ],
      prerequisites: ["s10-refactoring-safely"],
      concepts: ["cli-argument", "exit-code", "entry-point"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## The Entry Point Pattern

Every Python CLI script should use the \`if __name__ == '__main__':\` guard. This ensures the script logic runs when executed directly but not when imported as a module.

\`\`\`python
# greet.py
import sys

def greet(name: str) -> str:
    return f"Hello, {name}!"

def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python greet.py <name>", file=sys.stderr)
        sys.exit(1)       # non-zero = error
    print(greet(sys.argv[1]))
    sys.exit(0)           # 0 = success

if __name__ == "__main__":
    main()
\`\`\`

Run: \`python greet.py Alice\` → prints \`Hello, Alice!\``,
        },
        {
          kind: "mental-model",
          title: "`sys.argv` is a list of words you typed",
          analogy:
            "When you type `python myapp.py --count 5 file.txt`, Python hands you a shopping bag with everything you typed: `['myapp.py', '--count', '5', 'file.txt']`. `sys.argv[0]` is always the script name.",
          explanation:
            "`sys.argv` is a `list[str]`. The first element is the script filename; subsequent elements are the arguments provided by the user. You must parse them manually or use `argparse`.",
        },
        {
          kind: "code",
          language: "python",
          code: `import sys

def main() -> None:
    args = sys.argv[1:]   # skip script name

    if "--help" in args or "-h" in args:
        print("Usage: count.py <number>")
        sys.exit(0)

    if not args:
        print("Error: provide a number", file=sys.stderr)
        sys.exit(2)

    try:
        n = int(args[0])
    except ValueError:
        print(f"Error: '{args[0]}' is not a valid integer", file=sys.stderr)
        sys.exit(2)

    for i in range(1, n + 1):
        print(i)

if __name__ == "__main__":
    main()`,
          caption:
            "Print errors to `sys.stderr` (not stdout). Exit codes: 0 = success, 1 = general error, 2 = usage error.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Exit code conventions",
          body: "Exit code `0` means success. Any non-zero code signals an error. Code `1` is generic error; `2` is misuse/bad arguments. Shell scripts check exit codes to decide whether to proceed.",
        },
        {
          kind: "why-matters",
          body: "Scripts that follow exit code conventions can be chained in shell pipelines (`&&`, `||`) and called from CI systems that treat non-zero exit codes as failures. Getting this right is the difference between a script and a tool.",
        },
      ],
      interactions: [
        {
          id: "s11-cs-predict-argv",
          kind: "predict-output",
          prompt: "If you run `python app.py hello world`, what is `sys.argv[2]`?",
          beginnerPurpose: "Build intuition for `sys.argv` indexing.",
          expectedConceptIds: ["cli-argument"],
          code: `import sys
# Command: python app.py hello world
print(sys.argv[2])`,
          expectedOutput: "world",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`sys.argv[0]` is the script name, `[1]` is the first argument." }],
          feedback: {
            correct: "Correct! `sys.argv` = `['app.py', 'hello', 'world']`, so index 2 is `'world'`.",
            incorrect: "`sys.argv[0]='app.py'`, `[1]='hello'`, `[2]='world'`.",
          },
        },
        {
          id: "s11-cs-fill-exitcode",
          kind: "fill-code",
          prompt: "Complete the script to exit with code 1 if no arguments are given.",
          beginnerPurpose: "Practice using `sys.exit()` for error handling.",
          expectedConceptIds: ["exit-code"],
          codeTemplate: `import sys

def main() -> None:
    if len(sys.argv) < 2:
        print("Error: argument required", file=___BLANK_1___)
        ___BLANK_2___(1)

if __name__ == "__main__":
    main()`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "sys.stderr", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "sys.exit", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Print errors to `sys.stderr` and call `sys.exit(1)` to exit with an error code." }],
          feedback: {
            correct: "Correct! Errors go to `sys.stderr` and `sys.exit(1)` signals failure.",
            incorrect: "Use `sys.stderr` for the error message and `sys.exit(1)` to exit with a non-zero code.",
          },
        },
        {
          id: "s11-cs-mc-main-guard",
          kind: "multiple-choice",
          prompt: "Why do CLI scripts use `if __name__ == '__main__':`?",
          beginnerPurpose: "Understand the import safety purpose of the main guard.",
          expectedConceptIds: ["entry-point"],
          options: [
            { id: "a", text: "It speeds up the script.", isCorrect: false, explanation: "The guard has no performance effect." },
            { id: "b", text: "It prevents the main logic from running when the file is imported as a module.", isCorrect: true, explanation: "Correct! `__name__` is `'__main__'` only when the file is run directly." },
            { id: "c", text: "Python requires it for all scripts.", isCorrect: false, explanation: "It is a convention, not a language requirement." },
            { id: "d", text: "It disables error messages.", isCorrect: false, explanation: "The guard has nothing to do with error handling." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "When a file is imported, `__name__` is set to the module name, not `'__main__'`." }],
          feedback: {
            correct: "Exactly! The guard separates 'run me directly' from 'import me as a library'.",
            incorrect: "When imported, `__name__` is the module name. When run directly, it's `'__main__'`. The guard checks this.",
          },
        },
        {
          id: "s11-cs-reorder-script",
          kind: "reorder-code",
          prompt: "Reorder these lines to form a valid CLI script that prints a greeting.",
          beginnerPurpose: "Practice the full structure of a CLI entry point.",
          expectedConceptIds: ["entry-point", "cli-argument"],
          lines: [
            "import sys",
            "",
            "def main() -> None:",
            "    name = sys.argv[1] if len(sys.argv) > 1 else 'World'",
            "    print(f'Hello, {name}!')",
            "",
            "if __name__ == '__main__':",
            "    main()",
          ],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
          allowedAttempts: 3,
          hints: [{ level: "structural", text: "Imports first, then function definitions, then the main guard at the bottom." }],
          feedback: {
            correct: "Perfect structure! Imports → function → main guard.",
            incorrect: "Standard order: imports at top, function definitions, then `if __name__ == '__main__':` at bottom.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "exit-code", recallPrompt: "What exit code signals success? What signals an error?", nextReviewAfterDays: 2 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s11-cs-predict-argv", "s11-cs-fill-exitcode", "s11-cs-mc-main-guard"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["exit-code"],
      },
    },

    /* ── Lesson 2: argparse ──────────────────────────────────────────────── */
    {
      id: "s11-argparse",
      stageId: "stage-11",
      title: "Building CLI Interfaces with argparse",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a parser with description and arguments",
        "Distinguish positional arguments from optional flags",
        "Set types, defaults, and help text for arguments",
        "Use subparsers for multi-command CLIs",
      ],
      prerequisites: ["s11-cli-scripts"],
      concepts: ["argparse", "cli-argument"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## argparse: Professional CLI Parsing

\`argparse\` converts \`sys.argv\` into a typed namespace and generates help text automatically.

\`\`\`python
import argparse

def main() -> None:
    parser = argparse.ArgumentParser(description="Resize images")
    parser.add_argument("input",          help="Input file path")
    parser.add_argument("--width",  type=int, default=800, help="Target width in px")
    parser.add_argument("--height", type=int, default=600)
    parser.add_argument("--verbose", "-v", action="store_true")

    args = parser.parse_args()
    if args.verbose:
        print(f"Resizing {args.input} to {args.width}x{args.height}")

if __name__ == "__main__":
    main()
\`\`\`

Run \`python resize.py image.png --width 1024 -v\` → uses width=1024, height=600 (default), verbose=True.`,
        },
        {
          kind: "code",
          language: "python",
          code: `import argparse

def main() -> None:
    parser = argparse.ArgumentParser(prog="myapp")
    subparsers = parser.add_subparsers(dest="command")

    # 'add' subcommand
    add_parser = subparsers.add_parser("add", help="Add an item")
    add_parser.add_argument("name", type=str)

    # 'remove' subcommand
    rm_parser = subparsers.add_parser("remove", help="Remove an item")
    rm_parser.add_argument("name", type=str)

    args = parser.parse_args()

    if args.command == "add":
        print(f"Adding: {args.name}")
    elif args.command == "remove":
        print(f"Removing: {args.name}")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()`,
          caption: "Subparsers create Git-style commands: `myapp add item` vs `myapp remove item`.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "argparse generates `--help` for free",
          body: "When you define `add_argument` with `help=` text, argparse automatically builds a formatted `--help` output. Users get usage information without you writing any extra code.",
        },
        {
          kind: "why-matters",
          body: "`argparse` is the standard library's solution for CLI parsing. Every professional Python tool — pip, pytest, black — builds on a parser like this. Learning it means you can build tools that feel native to the command line.",
        },
      ],
      interactions: [
        {
          id: "s11-ap-predict-default",
          kind: "predict-output",
          prompt: "If the user runs `python app.py file.txt` (no `--count`), what does `args.count` equal?",
          beginnerPurpose: "Understand how argparse defaults work.",
          expectedConceptIds: ["argparse", "cli-argument"],
          code: `import argparse
parser = argparse.ArgumentParser()
parser.add_argument("file")
parser.add_argument("--count", type=int, default=5)
args = parser.parse_args(["file.txt"])
print(args.count)`,
          expectedOutput: "5",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "When `--count` is not provided, the `default` value is used." }],
          feedback: {
            correct: "Correct! `default=5` means `args.count` is 5 when `--count` is not given.",
            incorrect: "The `default=5` in `add_argument` provides the fallback value.",
          },
        },
        {
          id: "s11-ap-fill-parser",
          kind: "fill-code",
          prompt: "Complete the parser to accept a required positional `filename` and an optional `--output` flag.",
          beginnerPurpose: "Practice adding positional and optional arguments.",
          expectedConceptIds: ["argparse"],
          codeTemplate: `import argparse

parser = argparse.ArgumentParser()
parser.___BLANK_1___("filename")
parser.___BLANK_2___("--output", default="out.txt")
args = parser.parse_args(["data.csv"])
print(args.filename, args.output)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "add_argument", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "add_argument", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Both positional and optional arguments use `parser.add_argument(...)`." }],
          feedback: {
            correct: "Correct! Both use `add_argument`. The difference is whether the name starts with `--`.",
            incorrect: "Use `parser.add_argument(...)` for both positional and optional arguments.",
          },
        },
        {
          id: "s11-ap-mc-store-true",
          kind: "multiple-choice",
          prompt: "What does `action='store_true'` do for `--verbose`?",
          beginnerPurpose: "Understand boolean flags in argparse.",
          expectedConceptIds: ["argparse"],
          options: [
            { id: "a", text: "Sets `args.verbose` to the string `'true'`.", isCorrect: false, explanation: "`store_true` stores the boolean `True`, not the string `'true'`." },
            { id: "b", text: "Sets `args.verbose = True` when the flag is present; `False` when absent.", isCorrect: true, explanation: "Correct! `store_true` creates a boolean flag." },
            { id: "c", text: "Requires the user to type `--verbose=true`.", isCorrect: false, explanation: "Boolean flags don't take a value; just `--verbose` is enough." },
            { id: "d", text: "Makes `--verbose` a required argument.", isCorrect: false, explanation: "`store_true` does not make the argument required." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Boolean flags are present (True) or absent (False)." }],
          feedback: {
            correct: "Exactly! `--verbose` on the command line sets `args.verbose = True`; without it, it's `False`.",
            incorrect: "`action='store_true'` sets the attribute to `True` when the flag is present.",
          },
        },
        {
          id: "s11-ap-debug-type",
          kind: "debug-code",
          prompt: "The script crashes when `--count 3` is passed. Fix it.",
          beginnerPurpose: "Understand why `type=int` is needed for numeric arguments.",
          expectedConceptIds: ["argparse"],
          brokenCode: `import argparse
parser = argparse.ArgumentParser()
parser.add_argument("--count", default=1)
args = parser.parse_args(["--count", "3"])
total = args.count + 10   # TypeError: can only concatenate str
print(total)`,
          bugDescription: "Without `type=int`, argparse stores the argument as a string `'3'`. Adding a string to an int causes `TypeError`.",
          fixedCode: `import argparse
parser = argparse.ArgumentParser()
parser.add_argument("--count", type=int, default=1)
args = parser.parse_args(["--count", "3"])
total = args.count + 10
print(total)`,
          errorType: "TypeError",
          allowedAttempts: 4,
          hints: [{ level: "syntax", text: "Add `type=int` to `add_argument` to convert the string to an integer." }],
          feedback: {
            correct: "Correct! `type=int` tells argparse to convert the string argument to an integer.",
            incorrect: "Add `type=int` to the `add_argument` call so the value is stored as an `int`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "argparse", recallPrompt: "How do you add an optional flag with a default value using argparse?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s11-ap-predict-default", "s11-ap-fill-parser", "s11-ap-mc-store-true"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["argparse"],
      },
    },

    /* ── Lesson 3: Logging ───────────────────────────────────────────────── */
    {
      id: "s11-logging",
      stageId: "stage-11",
      title: "Logging for Production Scripts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the five standard log levels",
        "Configure the root logger with a handler and formatter",
        "Use module-level loggers with `logging.getLogger(__name__)`",
        "Distinguish between logging and `print` for observability",
      ],
      prerequisites: ["s11-argparse"],
      concepts: ["logging", "log-level", "log-handler"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## Why Logging, Not Print

\`print()\` writes to stdout and can't be filtered or redirected easily.
The \`logging\` module gives you levels, destinations, and formatting for free.

| Level | When to use |
|-------|-------------|
| DEBUG | Detailed diagnostic info for developers |
| INFO  | Confirmation that things are working |
| WARNING | Something unexpected, but recoverable |
| ERROR | A serious problem; a task failed |
| CRITICAL | The application cannot continue |`,
        },
        {
          kind: "code",
          language: "python",
          code: `import logging

# Configure once at the entry point
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)-8s %(name)s: %(message)s",
    datefmt="%H:%M:%S",
)

# Use a module-level logger everywhere else
logger = logging.getLogger(__name__)

def process_file(path: str) -> None:
    logger.info("Processing %s", path)
    try:
        with open(path) as f:
            lines = f.readlines()
        logger.debug("Read %d lines", len(lines))
    except FileNotFoundError:
        logger.error("File not found: %s", path)`,
          caption:
            "Use `%s` style formatting (lazy evaluation) rather than f-strings in logging calls to avoid building the string when the level is suppressed.",
        },
        {
          kind: "comparison",
          leftLabel: "print() debugging",
          rightLabel: "logging",
          leftCode: `# Hard to filter, always visible,
# no timestamps, no levels
print("Starting process...")
print("Error: file missing")
print("Done")`,
          rightCode: `import logging
logger = logging.getLogger(__name__)

logger.info("Starting process...")
logger.error("File missing")
logger.info("Done")
# Output controlled by log level
# Timestamps and names added automatically`,
          caption: "Logging gives you control: set `level=WARNING` and debug noise disappears.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "One `basicConfig` call, many loggers",
          body: "Call `logging.basicConfig()` once in your entry point (`main()`). In all other modules, just call `logging.getLogger(__name__)`. Each module gets its own named logger, but they all share the configuration.",
        },
        {
          kind: "why-matters",
          body: "In production, you can't attach a debugger. Logs are your window into a running system. Scripts that use `logging` properly are infinitely easier to monitor, alert on, and debug after the fact.",
        },
      ],
      interactions: [
        {
          id: "s11-lg-mc-level",
          kind: "multiple-choice",
          prompt: "If the root logger is set to `WARNING`, which messages will appear?",
          beginnerPurpose: "Understand log level filtering.",
          expectedConceptIds: ["logging", "log-level"],
          options: [
            { id: "a", text: "DEBUG, INFO, WARNING, ERROR, CRITICAL", isCorrect: false, explanation: "Setting level to WARNING means DEBUG and INFO are suppressed." },
            { id: "b", text: "WARNING, ERROR, CRITICAL only", isCorrect: true, explanation: "Correct! Levels are hierarchical; `WARNING` suppresses everything below it." },
            { id: "c", text: "Only WARNING messages", isCorrect: false, explanation: "WARNING level passes WARNING *and all higher levels* through." },
            { id: "d", text: "Nothing — WARNING disables all output", isCorrect: false, explanation: "`WARNING` level means 'show WARNING and above', not 'show nothing'." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Each level passes through everything at or above that severity." }],
          feedback: {
            correct: "Correct! Level `WARNING` shows WARNING, ERROR, and CRITICAL, but suppresses DEBUG and INFO.",
            incorrect: "Log levels are hierarchical. `WARNING` shows WARNING, ERROR, and CRITICAL.",
          },
        },
        {
          id: "s11-lg-fill-basicconfig",
          kind: "fill-code",
          prompt: "Configure logging to show INFO and above with a simple format.",
          beginnerPurpose: "Practice calling `logging.basicConfig`.",
          expectedConceptIds: ["logging", "log-handler"],
          codeTemplate: `import logging

logging.___BLANK_1___(
    level=logging.___BLANK_2___,
    format="%(levelname)s: %(message)s",
)
logger = logging.getLogger(__name__)
logger.info("Ready")`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "basicConfig", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "INFO", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The setup function is `basicConfig`; the level constant is `logging.INFO`." }],
          feedback: {
            correct: "Correct! `logging.basicConfig(level=logging.INFO, ...)` sets up the root logger.",
            incorrect: "Use `logging.basicConfig(...)` with `level=logging.INFO`.",
          },
        },
        {
          id: "s11-lg-predict-suppressed",
          kind: "predict-output",
          prompt: "What output does this code produce?",
          beginnerPurpose: "Verify understanding of how level filtering works at runtime.",
          expectedConceptIds: ["logging", "log-level"],
          code: `import logging
logging.basicConfig(level=logging.WARNING, format="%(levelname)s: %(message)s")
logger = logging.getLogger("demo")
logger.debug("step 1")
logger.info("step 2")
logger.warning("step 3")
logger.error("step 4")`,
          expectedOutput: "WARNING: step 3\nERROR: step 4",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "DEBUG and INFO are below WARNING, so they are suppressed." }],
          feedback: {
            correct: "Correct! Only WARNING and ERROR messages pass the filter.",
            incorrect: "Level WARNING suppresses DEBUG and INFO. Only 'step 3' (WARNING) and 'step 4' (ERROR) are shown.",
          },
        },
        {
          id: "s11-lg-run-logging",
          kind: "run-code",
          prompt:
            "Configure a logger that shows all levels from DEBUG up. Log one message at each of DEBUG, INFO, WARNING.",
          beginnerPurpose: "Practice configuring and using the logging module end-to-end.",
          expectedConceptIds: ["logging", "log-level"],
          starterCode: `import logging

# Configure basicConfig with level=DEBUG and a simple format
# Then log one DEBUG, one INFO, one WARNING message

`,
          task: "Log at least three messages (DEBUG, INFO, WARNING) and have them all appear in output.",
          expectedOutputContains: ["DEBUG", "INFO", "WARNING"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Use `logging.basicConfig(level=logging.DEBUG, format='%(levelname)s: %(message)s')`." }],
          feedback: {
            correct: "All three log levels visible — your logger is correctly configured.",
            incorrect: "Set `level=logging.DEBUG` to see all levels, then call `logger.debug(...)`, `logger.info(...)`, `logger.warning(...)`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "logging", recallPrompt: "Why is `logging` preferred over `print` in production scripts?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s11-lg-mc-level", "s11-lg-fill-basicconfig", "s11-lg-predict-suppressed"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["logging"],
      },
    },

    /* ── Lesson 4: Config Files ──────────────────────────────────────────── */
    {
      id: "s11-config-files",
      stageId: "stage-11",
      title: "Config Files and Settings",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Read and write `.ini` / `.cfg` files with `configparser`",
        "Load JSON config files using the `json` module",
        "Understand TOML as the modern config format",
        "Prioritise settings: defaults < config file < env var < CLI flag",
      ],
      prerequisites: ["s11-logging"],
      concepts: ["config-file", "configparser"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `import configparser

config = configparser.ConfigParser()
config.read("settings.ini")

# settings.ini:
# [database]
# host = localhost
# port = 5432

host = config.get("database", "host", fallback="localhost")
port = config.getint("database", "port", fallback=5432)
print(f"Connecting to {host}:{port}")`,
          caption:
            "`configparser` reads `.ini` files. Use `fallback=` to provide safe defaults.",
        },
        {
          kind: "code",
          language: "python",
          code: `import json
from pathlib import Path
from typing import Any

def load_config(path: str = "config.json") -> dict[str, Any]:
    cfg_path = Path(path)
    if not cfg_path.exists():
        return {}
    with cfg_path.open() as f:
        return json.load(f)

def save_config(data: dict[str, Any], path: str = "config.json") -> None:
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

cfg = load_config()
cfg.setdefault("theme", "dark")
save_config(cfg)`,
          caption:
            "JSON config files are easy to read and write with the standard library. `setdefault` adds missing keys without overwriting existing ones.",
        },
        {
          kind: "mental-model",
          title: "Config priority: last writer wins",
          analogy:
            "Imagine stacking sticky notes. A default value is the bottom note. A config file goes on top. An environment variable goes on top of that. A CLI flag goes on top of everything. When you read the value, you see the topmost note.",
          explanation:
            "This priority chain means users can override settings at any level without touching the source code. Defaults < config file < env var < CLI flag is the standard convention.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Never commit secrets in config files",
          body: "Config files like `config.json` often end up in version control. Never put passwords, API keys, or tokens in them. Use environment variables (from a `.env` file that is in `.gitignore`) for secrets.",
        },
        {
          kind: "why-matters",
          body: "Hard-coding settings in scripts forces code changes for every environment. Config files let the same code run in development, staging, and production with different settings — a core DevOps principle.",
        },
      ],
      interactions: [
        {
          id: "s11-cf-fill-configparser",
          kind: "fill-code",
          prompt: "Read the `timeout` integer from the `[network]` section with a fallback of 30.",
          beginnerPurpose: "Practice reading typed values from a configparser.",
          expectedConceptIds: ["config-file", "configparser"],
          codeTemplate: `import configparser
config = configparser.ConfigParser()
config.read("app.ini")
timeout = config.___BLANK_1___("network", "timeout", ___BLANK_2___=30)
print(timeout)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "getint", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "fallback", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `getint` for integers and the `fallback` keyword argument for a default." }],
          feedback: {
            correct: "Correct! `getint` parses the string as an integer; `fallback=30` is the default.",
            incorrect: "Use `config.getint('network', 'timeout', fallback=30)` to get an int with a safe default.",
          },
        },
        {
          id: "s11-cf-mc-priority",
          kind: "multiple-choice",
          prompt:
            "A script has a default `timeout=10`, a config file sets `timeout=30`, and the user passes `--timeout 60`. What value is used?",
          beginnerPurpose: "Understand the config priority chain.",
          expectedConceptIds: ["config-file"],
          options: [
            { id: "a", text: "10 (default always wins)", isCorrect: false, explanation: "Defaults are the lowest priority." },
            { id: "b", text: "30 (config file wins over default)", isCorrect: false, explanation: "Config file beats default, but CLI flags beat config files." },
            { id: "c", text: "60 (CLI flag wins over everything)", isCorrect: true, explanation: "Correct! CLI flags have the highest priority in the standard chain." },
            { id: "d", text: "The script raises a conflict error.", isCorrect: false, explanation: "No conflict error — the priority chain resolves deterministically." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think of the sticky-note stack: CLI flag is on top." }],
          feedback: {
            correct: "Correct! CLI > env var > config file > default.",
            incorrect: "CLI flags always win. The priority is: default < config file < env var < CLI flag.",
          },
        },
        {
          id: "s11-cf-predict-json",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Trace JSON config loading and `setdefault`.",
          expectedConceptIds: ["config-file"],
          code: `import json

raw = '{"theme": "light", "font_size": 14}'
cfg: dict = json.loads(raw)
cfg.setdefault("theme", "dark")
cfg.setdefault("language", "en")
print(cfg["theme"])
print(cfg["language"])`,
          expectedOutput: "light\nen",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`setdefault` only sets a key if it is not already present." }],
          feedback: {
            correct: "Correct! `theme` was already `'light'`, so it wasn't changed. `language` was missing, so it was set to `'en'`.",
            incorrect: "`setdefault` won't overwrite existing keys. `theme='light'` stays; `language='en'` is added.",
          },
        },
        {
          id: "s11-cf-run-config",
          kind: "run-code",
          prompt:
            "Write a function `load_settings(raw_json: str) -> dict` that parses a JSON string and sets a `debug` key to `False` if it's missing.",
          beginnerPurpose: "Practice combining JSON parsing with default setting.",
          expectedConceptIds: ["config-file"],
          starterCode: `import json

def load_settings(raw_json: str) -> dict:
    # Parse raw_json and ensure 'debug' defaults to False
    pass

result = load_settings('{"theme": "dark"}')
print(result["debug"])    # False
print(result["theme"])    # dark
`,
          task: "Return a dict with parsed JSON values plus a `debug` default of `False`.",
          expectedOutputContains: ["False", "dark"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Use `json.loads(raw_json)` then `d.setdefault('debug', False)`." }],
          feedback: {
            correct: "Correct! JSON parsed, default applied — your config loader works.",
            incorrect: "Parse with `json.loads`, then call `.setdefault('debug', False)` on the result.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "config-file", recallPrompt: "What is the standard config priority order from lowest to highest?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s11-cf-fill-configparser", "s11-cf-mc-priority", "s11-cf-predict-json"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["config-file"],
      },
    },

    /* ── Lesson 5: Batch Operations ─────────────────────────────────────── */
    {
      id: "s11-batch-operations",
      stageId: "stage-11",
      title: "Batch File Operations",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Walk directory trees with `pathlib.Path`",
        "Filter files by extension and apply transformations in bulk",
        "Report progress and handle individual file errors gracefully",
        "Implement dry-run mode to preview operations before committing",
      ],
      prerequisites: ["s11-config-files"],
      concepts: ["batch-operation", "pathlib", "dry-run"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `from pathlib import Path

def find_files(root: str, extension: str) -> list[Path]:
    """Return all files with given extension under root."""
    return list(Path(root).rglob(f"*.{extension}"))

# Walk every .txt file under the current directory
txt_files = find_files(".", "txt")
for f in txt_files:
    print(f.name, f.stat().st_size, "bytes")`,
          caption:
            "`Path.rglob(pattern)` recursively finds files matching a glob pattern — no manual `os.walk` needed.",
        },
        {
          kind: "code",
          language: "python",
          code: `from pathlib import Path
import logging

logger = logging.getLogger(__name__)

def rename_batch(
    source_dir: str,
    old_ext: str,
    new_ext: str,
    dry_run: bool = False,
) -> int:
    """Rename all files with old_ext to new_ext. Returns count changed."""
    changed = 0
    for path in Path(source_dir).rglob(f"*.{old_ext}"):
        new_path = path.with_suffix(f".{new_ext}")
        if dry_run:
            logger.info("[DRY RUN] Would rename %s → %s", path.name, new_path.name)
        else:
            try:
                path.rename(new_path)
                changed += 1
                logger.info("Renamed %s → %s", path.name, new_path.name)
            except OSError as e:
                logger.error("Failed to rename %s: %s", path.name, e)
    return changed`,
          caption:
            "Dry-run mode lets users preview what a batch operation will do before it modifies anything. Always implement it for destructive batch operations.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always handle per-file errors in batch scripts",
          body: "Wrap individual file operations in `try/except`. A single unreadable file should not abort processing of 999 others. Log the error and continue.",
        },
        {
          kind: "why-matters",
          body: "Batch scripts automate tedious manual work — renaming files, processing CSVs, compressing images. A script that processes 1,000 files reliably in seconds is one of the most valuable things a Python developer can build.",
        },
      ],
      interactions: [
        {
          id: "s11-bo-fill-rglob",
          kind: "fill-code",
          prompt: "Find all `.log` files recursively under a `logs/` directory.",
          beginnerPurpose: "Practice using `Path.rglob`.",
          expectedConceptIds: ["batch-operation", "pathlib"],
          codeTemplate: `from pathlib import Path

log_files = list(Path("logs").___BLANK_1___("*.___BLANK_2___"))
print(len(log_files))`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "rglob", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "log", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "`Path.rglob(pattern)` recursively finds matching files." }],
          feedback: {
            correct: "Correct! `rglob('*.log')` finds all `.log` files in any subdirectory.",
            incorrect: "Use `Path('logs').rglob('*.log')` to find all log files recursively.",
          },
        },
        {
          id: "s11-bo-mc-dryrun",
          kind: "multiple-choice",
          prompt: "What is the purpose of a `--dry-run` flag in a batch script?",
          beginnerPurpose: "Understand defensive script design.",
          expectedConceptIds: ["batch-operation", "dry-run"],
          options: [
            { id: "a", text: "Run the script faster by skipping slow operations.", isCorrect: false, explanation: "Dry-run is about safety, not speed." },
            { id: "b", text: "Preview what the script would do without actually changing anything.", isCorrect: true, explanation: "Correct! Dry-run lets users verify intent before committing irreversible changes." },
            { id: "c", text: "Disable logging during the run.", isCorrect: false, explanation: "Logging remains active during a dry run." },
            { id: "d", text: "Run only on a random sample of files.", isCorrect: false, explanation: "Dry-run processes all files in preview mode, not a subset." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think: what would you want to check before renaming 10,000 files?" }],
          feedback: {
            correct: "Correct! Dry-run shows what *would* happen without making permanent changes.",
            incorrect: "Dry-run is a safety mechanism: show intended actions without executing them.",
          },
        },
        {
          id: "s11-bo-predict-pathlib",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Practice using `Path` attributes.",
          expectedConceptIds: ["pathlib"],
          code: `from pathlib import Path

p = Path("/home/user/documents/report.pdf")
print(p.name)
print(p.suffix)
print(p.stem)`,
          expectedOutput: "report.pdf\n.pdf\nreport",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`name` is filename + extension, `suffix` is extension only, `stem` is filename without extension." }],
          feedback: {
            correct: "Correct! `.name` = full filename, `.suffix` = extension, `.stem` = name without extension.",
            incorrect: "`name` is `'report.pdf'`, `suffix` is `'.pdf'`, `stem` is `'report'`.",
          },
        },
        {
          id: "s11-bo-run-batch",
          kind: "run-code",
          prompt:
            "Write a function `count_by_extension(paths: list[str]) -> dict[str, int]` that counts files by their extension.",
          beginnerPurpose: "Practice batch processing a list of file paths.",
          expectedConceptIds: ["batch-operation", "pathlib"],
          starterCode: `from pathlib import Path

def count_by_extension(paths: list[str]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for p in paths:
        # get the suffix (extension) and count it
        pass
    return counts

files = ["a.txt", "b.py", "c.txt", "d.md", "e.py", "f.py"]
result = count_by_extension(files)
print(result)
`,
          task: "Return `{'.txt': 2, '.py': 3, '.md': 1}` (or similar order).",
          expectedOutputContains: [".txt", ".py", ".md"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Use `Path(p).suffix` and increment `counts[suffix]` with a default of 0." }],
          feedback: {
            correct: "Correct! Extension counting works perfectly.",
            incorrect: "Use `Path(p).suffix` to get the extension, then `counts[ext] = counts.get(ext, 0) + 1`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "batch-operation", recallPrompt: "Why should you wrap individual file operations in try/except during batch processing?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s11-bo-fill-rglob", "s11-bo-mc-dryrun", "s11-bo-predict-pathlib"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["batch-operation"],
      },
    },
  ],

  /* ── Project ──────────────────────────────────────────────────────────── */
  project: {
    id: "s11-file-organizer-cli",
    stageId: "stage-11",
    title: "File Organizer CLI",
    brief:
      "Build a command-line tool that scans a directory and moves files into subdirectories named after their extension (e.g., `images/`, `documents/`, `code/`).",
    requirements: [
      "Use argparse to accept `source_dir` positional arg and `--dry-run` flag",
      "Use `pathlib` to discover all files in the source directory (non-recursive)",
      "Group files by extension and move them into subdirectories named after the extension",
      "Support `--dry-run` that logs moves without executing them",
      "Log each move with `logging` at INFO level; log errors at ERROR level",
      "Exit with code 0 on success, code 1 if source directory doesn't exist",
    ],
    acceptanceCriteria: [
      "`--help` shows usage information",
      "Running without `--dry-run` physically moves files",
      "`--dry-run` logs actions without moving files",
      "Files with no extension go into an `other/` subdirectory",
      "Exit code 1 if source directory is not found",
      "All error conditions are logged and handled gracefully",
    ],
    conceptIds: ["argparse", "cli-argument", "logging", "batch-operation", "exit-code"],
    difficulty: "intermediate",
    starterCode: `#!/usr/bin/env python3
"""File Organizer CLI — moves files into extension-based subdirectories."""
import argparse
import logging
import sys
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s",
)
logger = logging.getLogger(__name__)


def organize(source: Path, dry_run: bool = False) -> int:
    """Organize files in source into extension subdirectories.
    Returns number of files moved (or that would be moved)."""
    # TODO: implement
    pass


def main() -> None:
    parser = argparse.ArgumentParser(description="Organize files by extension")
    # TODO: add arguments
    args = parser.parse_args()
    # TODO: validate source exists, call organize(), handle exit codes


if __name__ == "__main__":
    main()
`,
  },
} satisfies Stage;
