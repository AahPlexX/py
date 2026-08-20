import type { Stage } from "@/course/course.schema";

export const stage30 = {
  id: "stage-30",
  number: 30,
  title: "Logging, Diagnostics, Debugging, and Profiling",
  summary:
    "Master Python's logging infrastructure, interactive debugger, and profiling tools to diagnose and fix problems in production and development.",
  level: "intermediate",
  masteryGateConceptIds: ["python-logging", "pdb-debugger", "profiling"],
  lessons: [
    // ── 30.1 print() Debugging Limits ────────────────────────────────────
    {
      id: "s30-print-debugging-limits",
      stageId: "stage-30",
      title: "The Limits of print() Debugging",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Identify the four main problems with print() debugging",
        "Explain what the logging module solves",
        "Recognize print() debugging as a temporary technique",
      ],
      prerequisites: [],
      concepts: ["python-logging"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Why print() Falls Short\n\nEvery Python programmer starts with `print()` for debugging. It works — until it does not. The problems compound as programs grow:\n\n1. **Noise in production** — print statements left in code clutter normal output\n2. **No verbosity control** — you must edit code to silence debug messages\n3. **No structure** — plain strings are hard to parse, filter, or aggregate\n4. **No severity** — a critical error looks identical to a debug trace\n5. **No timestamps or context** — you cannot tell when or where a message came from\n\nThe `logging` module solves all five problems without requiring code changes to adjust verbosity.",
        },
        {
          kind: "comparison",
          leftLabel: "print() debugging",
          rightLabel: "logging module",
          leftCode: `print("DEBUG: user =", user)
print("Connecting to DB...")
print("ERROR: connection failed")
# Must edit code to silence any of these`,
          rightCode: `logger.debug("user = %s", user)
logger.info("Connecting to DB")
logger.error("Connection failed")
# Set level=WARNING in one place to silence debug+info`,
          caption: "logging lets you control verbosity without touching every call site",
        },
        {
          kind: "why-matters",
          body: "Every production Python codebase uses logging. Understanding it from the start means you can debug running services, correlate events across threads, and rotate log files automatically.",
        },
      ],
      interactions: [
        {
          id: "s30-print-limits-mc",
          kind: "multiple-choice",
          prompt: "Which problem does print() debugging have that logging.debug() does not?",
          beginnerPurpose: "Identify the key limitation of print() for debugging",
          expectedConceptIds: ["python-logging"],
          options: [
            { id: "a", text: "print() is slower than logging calls", isCorrect: false, explanation: "Performance is not the main concern here." },
            { id: "b", text: "print() output cannot be silenced without editing every call site", isCorrect: true, explanation: "With logging, you set the level once; with print(), you must remove or comment out every statement." },
            { id: "c", text: "print() does not accept keyword arguments", isCorrect: false, explanation: "print() does accept keyword arguments like end= and file=." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "What happens when you want to see debug messages today but hide them tomorrow?" },
          ],
          feedback: {
            correct: "Correct! print() requires editing every statement to change verbosity; logging has a level control.",
            incorrect: "The key problem is that print() cannot be silenced without editing each call site.",
          },
        },
        {
          id: "s30-print-limits-plain",
          kind: "plain-language-explain",
          prompt: "Explain why a developer should replace print() debugging with the logging module.",
          beginnerPurpose: "Articulate the practical benefits of structured logging",
          expectedConceptIds: ["python-logging"],
          code: `# Before
print("DEBUG: fetching user", user_id)
print("Connected to", host)

# After
import logging
logger = logging.getLogger(__name__)
logger.debug("Fetching user %s", user_id)
logger.info("Connected to %s", host)`,
          keyPointsToHit: [
            "Logging levels let you control verbosity in one place",
            "Log messages include timestamps and source context automatically",
            "Logs can be routed to files, services, or silenced without code changes",
          ],
          sampleAnswer: "The logging module lets you set a verbosity level once and suppress lower-priority messages everywhere. It also adds timestamps and module context automatically. Unlike print(), log output can be redirected to files or monitoring services without touching the code that generates the messages.",
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think about what you would need to do to silence all print() calls in a 10,000 line program." },
          ],
          feedback: {
            correct: "Great explanation! Level control, automatic context, and flexible routing are the key benefits.",
            incorrect: "Focus on: level control, automatic context (timestamps, module name), and routing flexibility.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "python-logging", recallPrompt: "Name three problems with print() debugging that the logging module solves.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-print-limits-mc", "s30-print-limits-plain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.2 logging Module Overview ─────────────────────────────────────
    {
      id: "s30-logging-overview",
      stageId: "stage-30",
      title: "logging Module Overview",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Import logging and emit a first log message",
        "Describe the four main components: loggers, handlers, formatters, filters",
        "Use basicConfig() for quick setup",
      ],
      prerequisites: ["s30-print-debugging-limits"],
      concepts: ["python-logging"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The logging Module\n\nPython's `logging` module has four main components:\n\n- **Logger** — the object you call (`logger.info(...)`)  \n- **Handler** — where messages go (console, file, network)\n- **Formatter** — how messages look (timestamp, level, text)\n- **Filter** — optional fine-grained control over which messages pass\n\nFor quick setup, `logging.basicConfig()` configures all of these in one call.",
        },
        {
          kind: "code",
          language: "python",
          code: `import logging

# Quick setup: write DEBUG+ messages to stderr with timestamp
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)-8s %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

logger = logging.getLogger(__name__)

logger.debug("Starting up")
logger.info("Loaded %d records", 42)
logger.warning("Config file not found, using defaults")
logger.error("Cannot connect to database")`,
          caption: "basicConfig() wires everything; logger = getLogger(__name__) is the idiom",
        },
        {
          kind: "output",
          text: `2026-06-06 12:00:00 DEBUG    __main__: Starting up
2026-06-06 12:00:00 INFO     __main__: Loaded 42 records
2026-06-06 12:00:00 WARNING  __main__: Config file not found, using defaults
2026-06-06 12:00:00 ERROR    __main__: Cannot connect to database`,
          isError: false,
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always use __name__ for the logger name",
          body: "Using `getLogger(__name__)` gives your logger the name of its module. This creates a hierarchy matching your package structure, and lets library users silence your logs without affecting their own.",
        },
        {
          kind: "why-matters",
          body: "basicConfig() lets you add production-quality logging to any script in three lines. Once you understand it, you can upgrade to full handler/formatter control.",
        },
      ],
      interactions: [
        {
          id: "s30-logging-overview-fill",
          kind: "fill-code",
          prompt: "Set up logging to show all DEBUG-level and above messages with timestamps.",
          beginnerPurpose: "Practice basicConfig() with level and format",
          expectedConceptIds: ["python-logging"],
          codeTemplate: `import logging
logging.___BLANK_1___(
    level=logging.___BLANK_2___,
    format="%(asctime)s %(levelname)s: %(message)s",
)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "basicConfig", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "DEBUG", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The quick setup function is basicConfig(). The most verbose level is DEBUG." },
          ],
          feedback: {
            correct: "Correct! basicConfig(level=logging.DEBUG) enables all log messages.",
            incorrect: "Use logging.basicConfig() and logging.DEBUG to show all messages.",
          },
        },
        {
          id: "s30-logging-overview-mc",
          kind: "multiple-choice",
          prompt: "Why is `logging.getLogger(__name__)` the standard way to create a logger?",
          beginnerPurpose: "Understand why __name__ is the conventional logger name",
          expectedConceptIds: ["python-logging"],
          options: [
            { id: "a", text: "It avoids creating duplicate loggers for the same module", isCorrect: false, explanation: "That is a side benefit; the main reason is namespace hierarchy." },
            { id: "b", text: "The logger name matches the module path, enabling per-module level control in complex packages", isCorrect: true, explanation: "A logger named 'myapp.db' is a child of 'myapp', so you can control myapp.db independently." },
            { id: "c", text: "__name__ is faster to type than a string literal", isCorrect: false, explanation: "Convenience is not the architectural reason." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Logger names form a hierarchy. 'myapp.db' is a child of 'myapp' — what does that enable?" },
          ],
          feedback: {
            correct: "Correct! __name__ creates a hierarchy matching your package, enabling fine-grained control.",
            incorrect: "The key benefit is hierarchical naming — 'myapp.db' inherits from 'myapp', enabling per-module control.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "python-logging", recallPrompt: "Name the four main components of the logging system.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-logging-overview-fill", "s30-logging-overview-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.3 Logging Levels ───────────────────────────────────────────────
    {
      id: "s30-logging-levels",
      stageId: "stage-30",
      title: "Logging Levels",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "List the five standard logging levels and their numeric values",
        "Choose the appropriate level for different message types",
        "Explain how setting a level filters messages",
      ],
      prerequisites: ["s30-logging-overview"],
      concepts: ["logging-levels"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Five Standard Levels\n\n| Level | Value | Use when |\n|-------|-------|----------|\n| `DEBUG` | 10 | Diagnostic detail for developers |\n| `INFO` | 20 | Confirmation that things are working |\n| `WARNING` | 30 | Unexpected but recoverable situation |\n| `ERROR` | 40 | Failure — a function could not complete |\n| `CRITICAL` | 50 | Program may not be able to continue |\n\nWhen you set `level=logging.WARNING`, only WARNING, ERROR, and CRITICAL messages pass through — DEBUG and INFO are dropped.",
        },
        {
          kind: "code",
          language: "python",
          code: `import logging

logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger("demo")

logger.debug("This will NOT appear (below WARNING)")
logger.info("This will NOT appear (below WARNING)")
logger.warning("This WILL appear")
logger.error("This WILL appear")
logger.critical("This WILL appear")`,
          caption: "Level acts as a floor — only messages at or above it pass through",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Production vs development levels",
          body: "In development, use `DEBUG` to see everything. In production, use `WARNING` or `INFO` to reduce noise. Pass the level via an environment variable: `level=getattr(logging, os.getenv('LOG_LEVEL', 'WARNING'))`.",
        },
        {
          kind: "why-matters",
          body: "Choosing the right level is a discipline. Over-logging at ERROR floods on-call alerts; under-logging at INFO hides problems. Consistent level discipline makes logs actionable.",
        },
      ],
      interactions: [
        {
          id: "s30-levels-predict",
          kind: "predict-output",
          prompt: "How many lines will this code print?",
          beginnerPurpose: "Trace which messages pass the WARNING level filter",
          expectedConceptIds: ["logging-levels"],
          code: `import logging
logging.basicConfig(level=logging.WARNING, format="%(levelname)s")
log = logging.getLogger("t")
log.debug("a")
log.info("b")
log.warning("c")
log.error("d")`,
          expectedOutput: "WARNING\nERROR",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "WARNING=30, ERROR=40. Only messages >= 30 pass. debug=10 and info=20 are filtered out." },
          ],
          feedback: {
            correct: "Correct! Only WARNING (30) and ERROR (40) are >= the WARNING level threshold.",
            incorrect: "The WARNING level filters out DEBUG (10) and INFO (20). Only WARNING and ERROR pass.",
          },
        },
        {
          id: "s30-levels-mc",
          kind: "multiple-choice",
          prompt: "An exception is caught and handled gracefully — the program continues. Which level is most appropriate?",
          beginnerPurpose: "Apply level selection judgment",
          expectedConceptIds: ["logging-levels"],
          options: [
            { id: "a", text: "DEBUG", isCorrect: false, explanation: "DEBUG is for detailed diagnostic information, not handled errors." },
            { id: "b", text: "WARNING", isCorrect: false, explanation: "WARNING fits unexpected-but-recoverable situations. A caught exception might be stronger." },
            { id: "c", text: "ERROR", isCorrect: true, explanation: "ERROR means a function could not complete its task — even if the program continues, the failure should be logged at ERROR." },
            { id: "d", text: "CRITICAL", isCorrect: false, explanation: "CRITICAL means the program may not continue at all." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "The exception indicates a task failed, even though it was handled." },
          ],
          feedback: {
            correct: "Correct! A handled exception that caused a function to fail is an ERROR, even if the program recovers.",
            incorrect: "An exception indicates a task failure — use ERROR even if the program continues.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "logging-levels", recallPrompt: "List the five logging levels from least to most severe with their numeric values.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-levels-predict", "s30-levels-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.4 Loggers ──────────────────────────────────────────────────────
    {
      id: "s30-loggers",
      stageId: "stage-30",
      title: "Loggers",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain the logger hierarchy and propagation",
        "Set the effective level on a specific logger",
        "Disable propagation to isolate a logger",
      ],
      prerequisites: ["s30-logging-levels"],
      concepts: ["logging-loggers"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Logger Hierarchy\n\nLoggers form a tree rooted at the **root logger**. A logger named `myapp.db` is a child of `myapp`, which is a child of the root.\n\nBy default, log records **propagate** up the tree — a record emitted by `myapp.db` also reaches `myapp` and the root. This lets you configure handlers on a parent logger once.",
        },
        {
          kind: "code",
          language: "python",
          code: `import logging

root_logger = logging.getLogger()          # root
app_logger  = logging.getLogger("myapp")   # child of root
db_logger   = logging.getLogger("myapp.db") # child of myapp

# Set debug level on just the db logger
db_logger.setLevel(logging.DEBUG)

# Disable propagation for noisy third-party library
noisy = logging.getLogger("urllib3")
noisy.propagate = False`,
          caption: "Hierarchical control: set level on specific loggers, disable propagation to silence noise",
        },
        {
          kind: "callout",
          variant: "info",
          title: "The root logger is the catch-all",
          body: "basicConfig() configures the root logger. Records from all loggers propagate to it unless propagation is disabled. That is why basicConfig() with level=WARNING silences debug output from every logger in your program.",
        },
        {
          kind: "why-matters",
          body: "Logger hierarchy lets you silence noisy third-party libraries while keeping your own debug output, or enable DEBUG only on a specific module during troubleshooting.",
        },
      ],
      interactions: [
        {
          id: "s30-loggers-mc",
          kind: "multiple-choice",
          prompt: "A logger named 'myapp.db' emits an ERROR record. Assuming no custom level is set on 'myapp.db' or 'myapp', where does the record go?",
          beginnerPurpose: "Understand log record propagation",
          expectedConceptIds: ["logging-loggers"],
          options: [
            { id: "a", text: "Only to the 'myapp.db' logger's handlers", isCorrect: false, explanation: "By default, records propagate up to parent loggers." },
            { id: "b", text: "To 'myapp.db', then 'myapp', then the root logger (all their handlers)", isCorrect: true, explanation: "Propagation sends the record up the hierarchy until it reaches the root." },
            { id: "c", text: "Only to the root logger", isCorrect: false, explanation: "The record passes through each ancestor's handlers on the way up." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think of propagation like a bubble rising through the hierarchy." },
          ],
          feedback: {
            correct: "Correct! Records propagate up through myapp.db → myapp → root, hitting handlers at each level.",
            incorrect: "Log records propagate up through all ancestor loggers by default.",
          },
        },
        {
          id: "s30-loggers-fill",
          kind: "fill-code",
          prompt: "Silence all log output from the 'urllib3' logger by disabling propagation.",
          beginnerPurpose: "Practice disabling propagation on a specific logger",
          expectedConceptIds: ["logging-loggers"],
          codeTemplate: `import logging
urllib3_log = logging.getLogger("urllib3")
urllib3_log.___BLANK_1___ = False`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "propagate", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The attribute that controls whether records bubble up is called 'propagate'." },
          ],
          feedback: {
            correct: "Correct! Setting propagate=False stops urllib3's records from reaching the root handler.",
            incorrect: "Use logger.propagate = False to stop records from reaching parent loggers.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "logging-loggers", recallPrompt: "What does 'propagate' mean in the logging hierarchy, and how do you disable it?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-loggers-mc", "s30-loggers-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.5 Handlers ─────────────────────────────────────────────────────
    {
      id: "s30-handlers",
      stageId: "stage-30",
      title: "Handlers",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Add a StreamHandler and FileHandler to a logger",
        "Set different levels on handlers to route messages",
        "Remove the default handler added by basicConfig()",
      ],
      prerequisites: ["s30-loggers"],
      concepts: ["logging-handlers"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Handlers — Where Logs Go\n\nA **handler** sends log records to a destination. Common handlers:\n\n- `StreamHandler` — writes to a stream (stderr by default)\n- `FileHandler` — writes to a file\n- `RotatingFileHandler` — file with size-based rotation\n- `TimedRotatingFileHandler` — file with time-based rotation\n- `NullHandler` — discards all records (for library code)\n\nOne logger can have multiple handlers, each with its own level.",
        },
        {
          kind: "code",
          language: "python",
          code: `import logging

logger = logging.getLogger("myapp")
logger.setLevel(logging.DEBUG)  # Let everything through to handlers

# Console: only WARNING and above
console = logging.StreamHandler()
console.setLevel(logging.WARNING)
logger.addHandler(console)

# File: everything DEBUG and above
file_h = logging.FileHandler("app.log")
file_h.setLevel(logging.DEBUG)
logger.addHandler(file_h)

logger.debug("Detailed trace")    # → file only
logger.warning("Watch out!")      # → console AND file`,
          caption: "Multiple handlers let you send different levels to different destinations",
          highlight: [5, 6, 9, 10],
        },
        {
          kind: "callout",
          variant: "tip",
          title: "NullHandler for library code",
          body: "Library code should never configure handlers. Instead, add a `logging.NullHandler()` to your library's top-level logger. This prevents 'No handlers could be found' warnings and lets application code decide where library logs go.",
        },
        {
          kind: "why-matters",
          body: "Handler routing is how production systems send DEBUG to a file for forensics while only alerting on ERROR. It is what separates ad hoc print() from a proper observability strategy.",
        },
      ],
      interactions: [
        {
          id: "s30-handlers-predict",
          kind: "predict-output",
          prompt: "With the two-handler setup above, which messages appear in the log file?",
          beginnerPurpose: "Trace which messages reach which handler",
          expectedConceptIds: ["logging-handlers"],
          code: `# File handler level = DEBUG, console level = WARNING
# logger.debug("Detailed trace")
# logger.warning("Watch out!")
# Question: what goes to the FILE?`,
          expectedOutput: "Detailed trace\nWatch out!",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "The file handler level is DEBUG — it accepts everything >= DEBUG." },
          ],
          feedback: {
            correct: "Correct! The file handler at DEBUG level accepts both messages.",
            incorrect: "The file handler is set to DEBUG — both debug and warning messages pass through.",
          },
        },
        {
          id: "s30-handlers-mc",
          kind: "multiple-choice",
          prompt: "Why should library packages add NullHandler instead of StreamHandler?",
          beginnerPurpose: "Understand the contract between library and application logging",
          expectedConceptIds: ["logging-handlers"],
          options: [
            { id: "a", text: "NullHandler is faster than StreamHandler", isCorrect: false, explanation: "Performance is not the reason." },
            { id: "b", text: "It prevents the library from hijacking the application's logging configuration", isCorrect: true, explanation: "Libraries should not decide where log output goes. Adding a NullHandler silences 'no handlers' warnings while leaving routing to the application." },
            { id: "c", text: "Libraries cannot import sys for StreamHandler", isCorrect: false, explanation: "Libraries can import sys; the issue is design philosophy." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Who should decide where a library's log output goes — the library or the application using it?" },
          ],
          feedback: {
            correct: "Correct! Libraries use NullHandler to leave logging configuration to the application.",
            incorrect: "Libraries should not configure handlers — the application decides where logs go.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "logging-handlers", recallPrompt: "What handler should library code add, and why?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-handlers-predict", "s30-handlers-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.6 Formatters ───────────────────────────────────────────────────
    {
      id: "s30-formatters",
      stageId: "stage-30",
      title: "Formatters",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a Formatter with a format string",
        "Use %(name)s, %(levelname)s, %(message)s, and %(asctime)s attributes",
        "Attach a formatter to a handler",
      ],
      prerequisites: ["s30-handlers"],
      concepts: ["logging-formatters"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Formatters — How Log Lines Look\n\nA `Formatter` converts a `LogRecord` into a string. The format string uses `%(attribute)s` placeholders from the `LogRecord`:\n\n| Placeholder | Meaning |\n|-------------|--------|\n| `%(asctime)s` | Timestamp |\n| `%(name)s` | Logger name |\n| `%(levelname)s` | Level as string (DEBUG, INFO…) |\n| `%(message)s` | The log message |\n| `%(filename)s:%(lineno)d` | Source file and line |\n| `%(funcName)s` | Calling function name |",
        },
        {
          kind: "code",
          language: "python",
          code: `import logging

formatter = logging.Formatter(
    fmt="%(asctime)s [%(levelname)-8s] %(name)s:%(lineno)d — %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)

handler = logging.StreamHandler()
handler.setFormatter(formatter)

logger = logging.getLogger("myapp")
logger.setLevel(logging.DEBUG)
logger.addHandler(handler)

logger.info("Server started on port %d", 8080)`,
          caption: "Attach a formatter to a handler with handler.setFormatter()",
        },
        {
          kind: "output",
          text: "2026-06-06T12:00:00 [INFO    ] myapp:14 — Server started on port 8080",
          isError: false,
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Structured JSON logging",
          body: "For cloud environments and log aggregators (Datadog, Splunk), use a JSON formatter like `python-json-logger`. Each log line becomes a JSON object with structured fields, enabling rich filtering.",
        },
        {
          kind: "why-matters",
          body: "Consistent log formats make logs grep-able, parseable, and monitorable. A good format tells you when, where, at what severity, and what happened — in that order.",
        },
      ],
      interactions: [
        {
          id: "s30-formatters-fill",
          kind: "fill-code",
          prompt: "Create and attach a formatter that includes the timestamp and level name.",
          beginnerPurpose: "Practice creating and attaching formatters",
          expectedConceptIds: ["logging-formatters"],
          codeTemplate: `import logging
fmt = logging.___BLANK_1___(fmt="%(asctime)s %(levelname)s: %(message)s")
handler = logging.StreamHandler()
handler.___BLANK_2___(fmt)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "Formatter", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "setFormatter", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The class is logging.Formatter. The handler method to attach it is setFormatter()." },
          ],
          feedback: {
            correct: "Correct! Formatter() creates it; setFormatter() attaches it to the handler.",
            incorrect: "Use logging.Formatter() to create and handler.setFormatter() to attach.",
          },
        },
        {
          id: "s30-formatters-mc",
          kind: "multiple-choice",
          prompt: "Which format placeholder gives you the source file name and line number?",
          beginnerPurpose: "Learn formatter placeholder names",
          expectedConceptIds: ["logging-formatters"],
          options: [
            { id: "a", text: "%(source)s:%(line)d", isCorrect: false, explanation: "These attribute names do not exist in LogRecord." },
            { id: "b", text: "%(filename)s:%(lineno)d", isCorrect: true, explanation: "%(filename)s is the source file name; %(lineno)d is the line number." },
            { id: "c", text: "%(file)s:%(number)d", isCorrect: false, explanation: "These attribute names do not exist in LogRecord." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "syntax", text: "LogRecord has 'filename' and 'lineno' attributes." },
          ],
          feedback: {
            correct: "Correct! %(filename)s:%(lineno)d includes source location in the log line.",
            incorrect: "The correct placeholders are %(filename)s and %(lineno)d.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "logging-formatters", recallPrompt: "What method attaches a Formatter to a Handler?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-formatters-fill", "s30-formatters-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.7 Structured Logging Conventions ──────────────────────────────
    {
      id: "s30-structured-logging",
      stageId: "stage-30",
      title: "Structured Logging Conventions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use % style formatting in logger calls instead of f-strings",
        "Add contextual data with extra= dict",
        "Explain the performance benefit of lazy string formatting",
      ],
      prerequisites: ["s30-formatters"],
      concepts: ["structured-logging"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Structured Logging Best Practices\n\n### Use % formatting, not f-strings\n\n```python\n# Bad — f-string evaluates even if message is filtered\nlogger.debug(f\"User {user_id} fetched {len(results)} items\")\n\n# Good — args evaluated lazily only if message passes the level filter\nlogger.debug(\"User %s fetched %d items\", user_id, len(results))\n```\n\nWith `%s` style, Python only builds the string if the message will actually be emitted.",
        },
        {
          kind: "code",
          language: "python",
          code: `import logging

logger = logging.getLogger(__name__)

# extra= injects additional fields into the LogRecord
logger.info(
    "Request completed",
    extra={"user_id": 42, "duration_ms": 145, "status": 200},
)
# With a JSON formatter, these become top-level JSON fields`,
          caption: "extra= adds structured context that JSON formatters can serialize",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "LoggerAdapter for request-scoped context",
          body: "Use `logging.LoggerAdapter(logger, {'request_id': req_id})` to automatically add context fields to every log call within a request handler, without passing them manually each time.",
        },
        {
          kind: "why-matters",
          body: "The % lazy formatting prevents CPU waste on filtered debug messages in hot paths. In a busy web service, logger.debug('...') might be called millions of times but only log 0.1% of them.",
        },
      ],
      interactions: [
        {
          id: "s30-structured-mc",
          kind: "multiple-choice",
          prompt: "Why is `logger.debug('Value: %s', expensive_fn())` better than `logger.debug(f'Value: {expensive_fn()}')`?",
          beginnerPurpose: "Understand lazy formatting performance benefit",
          expectedConceptIds: ["structured-logging"],
          options: [
            { id: "a", text: "f-strings have a syntax error in logger calls", isCorrect: false, explanation: "f-strings work syntactically; the issue is runtime performance." },
            { id: "b", text: "With %s, expensive_fn() is called only if the debug message will actually be emitted", isCorrect: true, explanation: "The f-string evaluates expensive_fn() before passing the result to logger.debug. The % style passes the function call as an argument, evaluated only if the message passes the level filter." },
            { id: "c", text: "%s is the only format that works with logging.Formatter", isCorrect: false, explanation: "Formatters use their own %(attribute)s syntax; the %s in the logger call is separate." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "When is an f-string expression evaluated relative to when the function call happens?" },
          ],
          feedback: {
            correct: "Correct! f-strings evaluate immediately; % args are evaluated lazily only if needed.",
            incorrect: "f-strings evaluate before the logger call. % args are evaluated lazily — only if the message passes the filter.",
          },
        },
        {
          id: "s30-structured-fill",
          kind: "fill-code",
          prompt: "Log a message with extra structured fields for user_id and status_code.",
          beginnerPurpose: "Practice using extra= for structured context",
          expectedConceptIds: ["structured-logging"],
          codeTemplate: `logger.info("Request done", ___BLANK_1___={"user_id": uid, "status_code": 200})`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "extra", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The keyword argument for additional structured fields is 'extra'." },
          ],
          feedback: {
            correct: "Correct! extra= injects structured fields into the LogRecord.",
            incorrect: "Use extra={'key': value} to add structured context to a log call.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "structured-logging", recallPrompt: "Why is % style formatting preferred over f-strings in logger calls?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-structured-mc", "s30-structured-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.8 warnings Module ──────────────────────────────────────────────
    {
      id: "s30-warnings-module",
      stageId: "stage-30",
      title: "warnings Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Issue deprecation warnings with warnings.warn()",
        "Control warning filters with -W and PYTHONWARNINGS",
        "Distinguish warnings from logging and exceptions",
      ],
      prerequisites: ["s30-logging-overview"],
      concepts: ["python-warnings"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The warnings Module\n\n`warnings.warn()` issues advisory messages about code that works but may change or is deprecated. Unlike exceptions, warnings do not stop execution. Unlike logging, they are aimed at **developers**, not operators.\n\nCommon categories:\n- `DeprecationWarning` — feature will be removed\n- `PendingDeprecationWarning` — may be deprecated in future\n- `RuntimeWarning` — suspicious but technically valid behavior\n- `UserWarning` — generic warning",
        },
        {
          kind: "code",
          language: "python",
          code: `import warnings

def old_api(x, y=None):
    if y is not None:
        warnings.warn(
            "The 'y' parameter is deprecated. Use new_api() instead.",
            DeprecationWarning,
            stacklevel=2,   # points to the CALLER, not this function
        )
    return x

old_api(1, y=2)
# DeprecationWarning: The 'y' parameter is deprecated...`,
          caption: "stacklevel=2 makes the warning point to the caller's source location",
        },
        {
          kind: "callout",
          variant: "info",
          title: "DeprecationWarning is hidden by default",
          body: "Python silences DeprecationWarning in user code by default (it is shown in tests). Use `-W default` or `PYTHONWARNINGS=default` to see all warnings.",
        },
        {
          kind: "why-matters",
          body: "Warnings are the standard mechanism for communicating breaking changes without immediately breaking code. Libraries that skip warnings and go straight to exceptions break users' programs.",
        },
      ],
      interactions: [
        {
          id: "s30-warnings-mc",
          kind: "multiple-choice",
          prompt: "Why is `stacklevel=2` important in warnings.warn()?",
          beginnerPurpose: "Understand how stacklevel controls the warning source location",
          expectedConceptIds: ["python-warnings"],
          options: [
            { id: "a", text: "It makes the warning appear twice", isCorrect: false, explanation: "stacklevel controls location, not repetition." },
            { id: "b", text: "It makes the warning point to the caller rather than the warn() call itself", isCorrect: true, explanation: "With stacklevel=2, the warning shows the user's code that called old_api(), not the line inside old_api() — which is where the user should make changes." },
            { id: "c", text: "It suppresses the warning after two occurrences", isCorrect: false, explanation: "stacklevel is about stack frames, not counts." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "The user needs to know where IN THEIR CODE they called the deprecated function." },
          ],
          feedback: {
            correct: "Correct! stacklevel=2 makes the warning point to the caller — where the user should fix their code.",
            incorrect: "stacklevel=2 shifts the reported location from inside the library to the user's calling code.",
          },
        },
        {
          id: "s30-warnings-fill",
          kind: "fill-code",
          prompt: "Issue a DeprecationWarning pointing to the caller (not this function).",
          beginnerPurpose: "Practice using warnings.warn with correct stacklevel",
          expectedConceptIds: ["python-warnings"],
          codeTemplate: `import warnings
def legacy():
    warnings.___BLANK_1___("legacy() is deprecated", DeprecationWarning, stacklevel=___BLANK_2___)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "warn", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "2", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The function is warnings.warn(). stacklevel=2 points to the caller." },
          ],
          feedback: {
            correct: "Correct! warn() with stacklevel=2 reports the caller's location.",
            incorrect: "Use warnings.warn() and stacklevel=2 to point the warning at the caller.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "python-warnings", recallPrompt: "What category should you use when a function parameter will be removed in a future release?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-warnings-mc", "s30-warnings-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.9 traceback Module ─────────────────────────────────────────────
    {
      id: "s30-traceback-module",
      stageId: "stage-30",
      title: "traceback Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use traceback.format_exc() to capture the current exception as a string",
        "Log exceptions with logger.exception()",
        "Use traceback.print_exc() for quick debugging",
      ],
      prerequisites: ["s30-logging-overview"],
      concepts: ["traceback"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Capturing Tracebacks\n\nWhen handling an exception, the `traceback` module lets you capture the full stack trace as a string or write it to a file. This is essential for logging exceptions from long-running services.",
        },
        {
          kind: "code",
          language: "python",
          code: `import logging, traceback

logger = logging.getLogger(__name__)

try:
    result = 1 / 0
except ZeroDivisionError:
    # Best practice: logger.exception() logs ERROR + full traceback
    logger.exception("Unexpected error during calculation")
    # Equivalent to: logger.error("...", exc_info=True)

# Or capture as string for custom handling
tb_str = traceback.format_exc()
print("Traceback was:", tb_str)`,
          caption: "logger.exception() is the standard way to log a caught exception with its traceback",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "logger.exception() vs logger.error(exc_info=True)",
          body: "`logger.exception(msg)` is equivalent to `logger.error(msg, exc_info=True)`. Both log the message at ERROR level and include the full traceback. Use `exception()` for brevity.",
        },
        {
          kind: "why-matters",
          body: "Logging exceptions with their full traceback is what lets you diagnose production failures after the fact. Without the traceback, you only know that something failed — not why.",
        },
      ],
      interactions: [
        {
          id: "s30-traceback-mc",
          kind: "multiple-choice",
          prompt: "Inside an except block, what is the most convenient way to log the exception with its full traceback?",
          beginnerPurpose: "Know the standard logging idiom for exceptions",
          expectedConceptIds: ["traceback"],
          options: [
            { id: "a", text: "logger.debug(str(e))", isCorrect: false, explanation: "This only logs the exception message at DEBUG level — no traceback." },
            { id: "b", text: "logger.exception('An error occurred')", isCorrect: true, explanation: "logger.exception() logs at ERROR level and automatically includes the full traceback." },
            { id: "c", text: "print(traceback.format_exc())", isCorrect: false, explanation: "This prints to stdout but does not use the logging infrastructure." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "There is a logger method specifically designed for use inside except blocks." },
          ],
          feedback: {
            correct: "Correct! logger.exception() is the standard idiom — ERROR level plus full traceback.",
            incorrect: "Use logger.exception() inside except blocks for ERROR + full traceback automatically.",
          },
        },
        {
          id: "s30-traceback-fill",
          kind: "fill-code",
          prompt: "Log an exception with its traceback using logger.exception().",
          beginnerPurpose: "Practice the exception logging idiom",
          expectedConceptIds: ["traceback"],
          codeTemplate: `import logging
logger = logging.getLogger(__name__)
try:
    int("not a number")
except ValueError:
    logger.___BLANK_1___("Failed to parse input")`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "exception", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The logger method for inside except blocks is exception()." },
          ],
          feedback: {
            correct: "Correct! logger.exception() captures the current exception and traceback automatically.",
            incorrect: "Use logger.exception() to log the message plus the traceback of the active exception.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "traceback", recallPrompt: "What is the difference between logger.error(msg) and logger.exception(msg) inside an except block?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-traceback-mc", "s30-traceback-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.10 pdb Debugger ────────────────────────────────────────────────
    {
      id: "s30-pdb-debugger",
      stageId: "stage-30",
      title: "pdb — The Python Debugger",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Launch pdb with breakpoint() or python -m pdb script.py",
        "Use n (next), s (step), c (continue), q (quit) commands",
        "Inspect variables at a breakpoint",
      ],
      prerequisites: ["s30-print-debugging-limits"],
      concepts: ["pdb-debugger"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## pdb — Interactive Python Debugger\n\n`pdb` is Python's built-in interactive debugger. It pauses execution and gives you a prompt where you can inspect variables, step through code, and evaluate expressions.\n\nLaunch it:\n- `breakpoint()` — inserts a breakpoint at that line (Python 3.7+)\n- `python -m pdb script.py` — debug the whole script from the start\n- `pdb.set_trace()` — programmatic breakpoint (older style)",
        },
        {
          kind: "code",
          language: "python",
          code: `def factorial(n):
    breakpoint()    # ← execution pauses here
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`,
          caption: "breakpoint() pauses execution and opens the pdb prompt",
        },
        {
          kind: "glossary-term",
          term: "pdb commands",
          definition: "n(ext) — run next line; s(tep) — step into function; c(ontinue) — run until next breakpoint; l(ist) — show source; p expr — print expression; q(uit) — exit debugger",
          example: "(Pdb) p n\n5\n(Pdb) n",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Remove breakpoints before committing",
          body: "A `breakpoint()` left in production code will pause every invocation waiting for terminal input, effectively hanging the process. Use a pre-commit hook or grep to catch stray breakpoints.",
        },
        {
          kind: "why-matters",
          body: "pdb lets you inspect the exact state of a program when a bug occurs. Unlike print() debugging, you can explore interactively — evaluate expressions, change variables, and step through logic.",
        },
      ],
      interactions: [
        {
          id: "s30-pdb-mc",
          kind: "multiple-choice",
          prompt: "You are at a pdb prompt inside function foo(). What command steps INTO the next function call?",
          beginnerPurpose: "Know the step vs next distinction in pdb",
          expectedConceptIds: ["pdb-debugger"],
          options: [
            { id: "a", text: "n (next)", isCorrect: false, explanation: "'n' executes the next line but does NOT enter function calls — it steps over them." },
            { id: "b", text: "s (step)", isCorrect: true, explanation: "'s' steps into the called function, pausing at its first line." },
            { id: "c", text: "c (continue)", isCorrect: false, explanation: "'c' runs until the next breakpoint." },
            { id: "d", text: "l (list)", isCorrect: false, explanation: "'l' shows the source code around the current position." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Step INTO vs step OVER — one letter difference in pdb." },
          ],
          feedback: {
            correct: "Correct! 's' steps into function calls; 'n' steps over them.",
            incorrect: "'s' steps into the next function call. 'n' steps over it.",
          },
        },
        {
          id: "s30-pdb-fill",
          kind: "fill-code",
          prompt: "Insert a breakpoint that pauses execution on the line before the loop.",
          beginnerPurpose: "Practice using breakpoint() to add a pdb breakpoint",
          expectedConceptIds: ["pdb-debugger"],
          codeTemplate: `data = [1, 2, 3]
___BLANK_1___()
for item in data:
    print(item)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "breakpoint", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The built-in function to insert a debugger breakpoint is breakpoint()." },
          ],
          feedback: {
            correct: "Correct! breakpoint() is the modern way to insert a pdb breakpoint.",
            incorrect: "Use breakpoint() (no import needed in Python 3.7+) to pause execution.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "pdb-debugger", recallPrompt: "What is the difference between pdb commands 'n' and 's'?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-pdb-mc", "s30-pdb-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.11 Breakpoints ─────────────────────────────────────────────────
    {
      id: "s30-breakpoints",
      stageId: "stage-30",
      title: "Breakpoints",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Set conditional breakpoints in pdb",
        "Use PYTHONBREAKPOINT environment variable to redirect breakpoints",
        "Disable breakpoints in production without removing them",
      ],
      prerequisites: ["s30-pdb-debugger"],
      concepts: ["pdb-breakpoints"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Advanced Breakpoints\n\n### PYTHONBREAKPOINT\n\nSet `PYTHONBREAKPOINT=0` to disable all `breakpoint()` calls without editing code. Set it to a custom debugger like `PYTHONBREAKPOINT=ipdb.set_trace` to use a different debugger.",
        },
        {
          kind: "code",
          language: "python",
          code: `# Conditional breakpoint in pdb:
# At (Pdb) prompt, set a conditional breakpoint on line 10:
#   (Pdb) break 10, x > 100

# Or in code:
def process(x):
    if x > 100:       # only break on interesting values
        breakpoint()
    return x * 2`,
          caption: "Conditional breakpoints avoid stopping on every iteration",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Disable breakpoints in CI/production",
          body: "Set `PYTHONBREAKPOINT=0` in your CI environment to prevent accidental breakpoints from hanging tests. Add this to your CI YAML: `env: PYTHONBREAKPOINT: 0`.",
        },
        {
          kind: "why-matters",
          body: "PYTHONBREAKPOINT gives you one environment variable to control all breakpoints. This is safer than hunting for every breakpoint() call before deploying.",
        },
      ],
      interactions: [
        {
          id: "s30-breakpoints-mc",
          kind: "multiple-choice",
          prompt: "What does setting PYTHONBREAKPOINT=0 do?",
          beginnerPurpose: "Understand the PYTHONBREAKPOINT environment variable",
          expectedConceptIds: ["pdb-breakpoints"],
          options: [
            { id: "a", text: "Redirects breakpoints to ipdb instead of pdb", isCorrect: false, explanation: "Setting to '0' disables breakpoints entirely." },
            { id: "b", text: "Makes all breakpoint() calls no-ops (disabled)", isCorrect: true, explanation: "PYTHONBREAKPOINT=0 causes breakpoint() to do nothing, preventing pauses in CI or production." },
            { id: "c", text: "Makes Python exit with code 0 when a breakpoint is hit", isCorrect: false, explanation: "It disables the breakpoints, not exits." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "0 means 'off' — the breakpoints still exist in the code but do nothing." },
          ],
          feedback: {
            correct: "Correct! PYTHONBREAKPOINT=0 disables all breakpoint() calls without code changes.",
            incorrect: "PYTHONBREAKPOINT=0 makes breakpoint() a no-op — safe for CI and production.",
          },
        },
        {
          id: "s30-breakpoints-fill",
          kind: "fill-code",
          prompt: "Write code that only breaks into pdb when the value exceeds 1000.",
          beginnerPurpose: "Practice conditional breakpoints",
          expectedConceptIds: ["pdb-breakpoints"],
          codeTemplate: `def analyze(value):
    if value > ___BLANK_1___:
        ___BLANK_2___()
    return value`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "1000", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "breakpoint", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "Wrap breakpoint() in an if statement to make it conditional." },
          ],
          feedback: {
            correct: "Correct! Conditional breakpoints avoid stopping on every call.",
            incorrect: "Use an if statement with breakpoint() to trigger only when the condition is met.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "pdb-breakpoints", recallPrompt: "How do you prevent breakpoint() calls from pausing execution in a CI pipeline?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-breakpoints-mc", "s30-breakpoints-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.12 Stepping Through Code ───────────────────────────────────────
    {
      id: "s30-stepping-through-code",
      stageId: "stage-30",
      title: "Stepping Through Code",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use n, s, r, and u/d to navigate during a pdb session",
        "Distinguish stepping over vs stepping into a call",
        "Use 'until' to run to the end of a loop",
      ],
      prerequisites: ["s30-pdb-debugger"],
      concepts: ["pdb-stepping"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## pdb Navigation Commands\n\n| Command | Action |\n|---------|--------|\n| `n` | Execute next line (step over calls) |\n| `s` | Step into the next function call |\n| `r` | Run until the current function returns |\n| `c` | Continue until next breakpoint |\n| `until N` | Run until line N (or loop end) |\n| `u` / `d` | Move up / down the call stack |\n| `where` / `bt` | Print the full call stack |",
        },
        {
          kind: "code",
          language: "python",
          code: `# Common pdb session flow:
#
# (Pdb) where          # see full call stack
# (Pdb) l              # show source around current line
# (Pdb) p some_var     # print variable value
# (Pdb) pp some_dict   # pretty-print a complex object
# (Pdb) !some_var = 99 # change a variable value
# (Pdb) n              # step to next line
# (Pdb) s              # step into next call
# (Pdb) r              # run until function returns
# (Pdb) c              # continue to next breakpoint`,
          caption: "Common pdb commands for a productive debugging session",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "! prefix to execute arbitrary code",
          body: "In pdb, prefix any Python expression with `!` to execute it. This lets you change variables, call functions, or create temporary values without restarting: `(Pdb) !x = 42`.",
        },
        {
          kind: "why-matters",
          body: "Stepping through code lets you verify exactly what values variables have at each line — far more precise than print() debugging which requires knowing in advance what to print.",
        },
      ],
      interactions: [
        {
          id: "s30-stepping-mc",
          kind: "multiple-choice",
          prompt: "You are inside a loop that runs 1000 times. You want to reach the code AFTER the loop. Which pdb command is most efficient?",
          beginnerPurpose: "Choose the right navigation command for each situation",
          expectedConceptIds: ["pdb-stepping"],
          options: [
            { id: "a", text: "n — press it 1000 times", isCorrect: false, explanation: "That would work but takes forever." },
            { id: "b", text: "until <line_after_loop> — run to the specific line after the loop", isCorrect: true, explanation: "'until N' runs until line N is reached, efficiently skipping the loop body." },
            { id: "c", text: "r — run until function returns", isCorrect: false, explanation: "'r' exits the current function, which may go further than intended." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "There is a pdb command that runs until a specific line number is reached." },
          ],
          feedback: {
            correct: "Correct! 'until N' jumps to line N, skipping the remaining loop iterations.",
            incorrect: "Use 'until N' to jump to a specific line number without stepping through a loop.",
          },
        },
        {
          id: "s30-stepping-reorder",
          kind: "reorder-code",
          prompt: "Order these pdb commands for investigating a bug inside a called function.",
          beginnerPurpose: "Practice the sequence of pdb investigation commands",
          expectedConceptIds: ["pdb-stepping"],
          lines: [
            "Hit breakpoint() before the function call",
            "s  (step into the called function)",
            "l  (list source to orient yourself)",
            "p variable  (inspect the suspicious variable)",
            "c  (continue after finding the issue)",
          ],
          correctOrder: [0, 1, 2, 3, 4],
          allowedAttempts: 3,
          hints: [
            { level: "structural", text: "You need to reach the function before you can step into it." },
          ],
          feedback: {
            correct: "Correct! Break → step in → list → inspect → continue is a natural debugging flow.",
            incorrect: "The natural order: break before the call, step in, list source, inspect variables, continue.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "pdb-stepping", recallPrompt: "What pdb command efficiently skips the remaining iterations of a loop?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-stepping-mc", "s30-stepping-reorder"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.13 Inspecting Frames ───────────────────────────────────────────
    {
      id: "s30-inspecting-frames",
      stageId: "stage-30",
      title: "Inspecting Frames",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use u and d to move up and down the call stack in pdb",
        "Inspect local variables in a specific frame",
        "Use the inspect module to examine frames programmatically",
      ],
      prerequisites: ["s30-stepping-through-code"],
      concepts: ["pdb-frames"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Frame Inspection\n\nA **frame** is a snapshot of one function call: its local variables, the current line, and a reference to the caller's frame. When an exception occurs deep in a call stack, you need to inspect frames higher up to find the root cause.",
        },
        {
          kind: "code",
          language: "python",
          code: `# In pdb: navigate frames with u (up) and d (down)
# (Pdb) where          # show full stack
# (Pdb) u              # move to caller's frame
# (Pdb) p locals()     # inspect caller's variables
# (Pdb) d              # back down

# Programmatic frame inspection
import inspect

def deep():
    frame = inspect.currentframe()
    caller = frame.f_back
    print("Caller's locals:", caller.f_locals)
    print("Caller's line:", caller.f_lineno)`,
          caption: "pdb u/d navigates frames; inspect.currentframe() gives programmatic access",
        },
        {
          kind: "callout",
          variant: "info",
          title: "post-mortem debugging",
          body: "Run `python -m pdb script.py` and after a crash type `pm()` to enter post-mortem debugging. This drops you into pdb at the exact frame where the exception occurred — no need to reproduce the crash.",
        },
        {
          kind: "why-matters",
          body: "Frame inspection lets you understand not just what failed but how you got there. In a long call chain, the bug often lives two frames above where the exception was raised.",
        },
      ],
      interactions: [
        {
          id: "s30-frames-mc",
          kind: "multiple-choice",
          prompt: "In pdb, you are stopped at an exception inside helper(). You want to check the state of the calling function process(). What command moves you there?",
          beginnerPurpose: "Practice using u to navigate up the call stack",
          expectedConceptIds: ["pdb-frames"],
          options: [
            { id: "a", text: "d (down)", isCorrect: false, explanation: "'d' moves deeper into the stack, not toward the caller." },
            { id: "b", text: "u (up)", isCorrect: true, explanation: "'u' moves up one frame toward the caller, letting you inspect the caller's local variables." },
            { id: "c", text: "n (next)", isCorrect: false, explanation: "'n' continues execution, not navigate the stack." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "The caller is 'above' you in the call stack." },
          ],
          feedback: {
            correct: "Correct! 'u' moves you up the call stack toward the caller.",
            incorrect: "Use 'u' to move up (toward the caller) in the call stack.",
          },
        },
        {
          id: "s30-frames-plain",
          kind: "plain-language-explain",
          prompt: "Explain what a stack frame is and why inspecting frames above the error is often necessary.",
          beginnerPurpose: "Articulate the concept of call stack frames",
          expectedConceptIds: ["pdb-frames"],
          code: `# Call stack when exception occurs:
# main() → process() → validate() → check()
#                                    ^ exception raised here`,
          keyPointsToHit: [
            "A frame contains local variables and the current line of one function call",
            "The call stack is a chain of frames from main() to the current function",
            "Bugs often originate in a caller frame where bad data was created",
          ],
          sampleAnswer: "A stack frame holds the local variables and current position of one function call. When a chain of functions calls each other, each creates a new frame on the stack. When an exception occurs in a deep function, the bad data causing it often originated in a caller — so you use 'u' in pdb to move up and inspect where the problematic value was created.",
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think about where a bad argument value came from — it was computed in a caller." },
          ],
          feedback: {
            correct: "Excellent! Frames hold local context; bugs often originate in caller frames.",
            incorrect: "A frame = one function's local state. The bug's origin may be in a caller frame.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "pdb-frames", recallPrompt: "What pdb command moves you up the call stack to inspect the calling function's variables?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-frames-mc", "s30-frames-plain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.14 timeit ─────────────────────────────────────────────────────
    {
      id: "s30-timeit",
      stageId: "stage-30",
      title: "timeit — Timing Code",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Time a code snippet with timeit.timeit()",
        "Use the -m timeit command-line interface",
        "Explain why timeit runs code many times to get reliable measurements",
      ],
      prerequisites: ["s30-print-debugging-limits"],
      concepts: ["timeit"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## timeit — Accurate Micro-benchmarks\n\n`timeit` runs a snippet many times and reports the minimum time. It:\n- Disables garbage collection during the run to reduce noise\n- Runs the code multiple times to amortize startup costs\n- Reports the **minimum** time (not average) to exclude OS scheduling noise",
        },
        {
          kind: "code",
          language: "python",
          code: `import timeit

# Time a list comprehension vs map()
list_comp_time = timeit.timeit(
    "[x*2 for x in range(1000)]",
    number=10_000,
)
map_time = timeit.timeit(
    "list(map(lambda x: x*2, range(1000)))",
    number=10_000,
)

print(f"List comp: {list_comp_time:.3f}s")
print(f"Map:       {map_time:.3f}s")`,
          caption: "timeit.timeit() runs the code 'number' times and returns total seconds",
        },
        {
          kind: "code",
          language: "bash",
          code: `# Command-line interface — most convenient for quick benchmarks
python -m timeit "[x*2 for x in range(1000)]"
# 10000 loops, best of 5: 31.9 usec per loop`,
          caption: "-m timeit is the quickest way to benchmark a snippet",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use setup= for expensive initialization",
          body: "Pass `setup='import mymodule; data = list(range(1000))'` to run setup code once before timing. The setup is not included in the timed result.",
        },
        {
          kind: "why-matters",
          body: "timeit is how you answer 'is this optimization actually faster?' with data. Always measure before and after — intuition about Python performance is often wrong.",
        },
      ],
      interactions: [
        {
          id: "s30-timeit-mc",
          kind: "multiple-choice",
          prompt: "Why does timeit report the MINIMUM time rather than the average?",
          beginnerPurpose: "Understand timeit's measurement philosophy",
          expectedConceptIds: ["timeit"],
          options: [
            { id: "a", text: "The minimum is faster to compute", isCorrect: false, explanation: "Computing min vs avg is trivial — performance is not the reason." },
            { id: "b", text: "The minimum best represents the true cost; higher values are caused by OS scheduling noise, not the code", isCorrect: true, explanation: "Random OS events (scheduler interrupts, GC) inflate timing. The minimum captures runs without those perturbations." },
            { id: "c", text: "Averages always include the startup cost of the Python interpreter", isCorrect: false, explanation: "The interpreter start is the same in all runs; it is not the reason for using minimum." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "What could cause some runs to be slower than others besides the code itself?" },
          ],
          feedback: {
            correct: "Correct! The minimum excludes accidental slowdowns from OS scheduling and other noise.",
            incorrect: "The minimum represents the cleanest run — without OS interrupts or GC pressure inflating the time.",
          },
        },
        {
          id: "s30-timeit-fill",
          kind: "fill-code",
          prompt: "Time the expression 'sorted([3,1,2])' running it 100,000 times.",
          beginnerPurpose: "Practice using timeit.timeit() with number=",
          expectedConceptIds: ["timeit"],
          codeTemplate: `import timeit
t = timeit.___BLANK_1___("sorted([3,1,2])", number=___BLANK_2___)
print(f"{t:.4f}s")`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "timeit", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "100_000", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The function in the timeit module is also called timeit(). number= specifies the repetition count." },
          ],
          feedback: {
            correct: "Correct! timeit.timeit(code, number=N) runs the code N times and returns total seconds.",
            incorrect: "Use timeit.timeit(stmt, number=100_000) to run 100,000 repetitions.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "timeit", recallPrompt: "What does the 'number=' parameter control in timeit.timeit()?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-timeit-mc", "s30-timeit-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.15 profile Module ──────────────────────────────────────────────
    {
      id: "s30-profile-module",
      stageId: "stage-30",
      title: "profile Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish profile from cProfile",
        "Run a function under the profiler with profile.run()",
        "Interpret the columns in profile output",
      ],
      prerequisites: ["s30-timeit"],
      concepts: ["profiling"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## profile vs cProfile\n\nPython ships two profilers:\n\n- `profile` — pure Python, higher overhead, better for profiler subclassing\n- `cProfile` — C extension, much lower overhead, preferred for production profiling\n\nBoth produce identical output. Use `cProfile` unless you have a specific reason to use `profile`.",
        },
        {
          kind: "code",
          language: "python",
          code: `import profile

def slow_function():
    return sum(i**2 for i in range(100_000))

profile.run("slow_function()")`,
          caption: "profile.run() profiles the expression and prints a report",
        },
        {
          kind: "output",
          text: `         4 function calls in 0.043 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.043    0.043    0.043    0.043 <string>:1(slow_function)
        1    0.000    0.000    0.043    0.043 <string>:1(<module>)
        1    0.000    0.000    0.043    0.043 {built-in method builtins.exec}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler'}`,
          isError: false,
        },
        {
          kind: "glossary-term",
          term: "tottime vs cumtime",
          definition: "tottime: time spent in this function alone (excluding subcalls). cumtime: total time including all sub-function calls. Sort by tottime to find the function consuming the most CPU itself.",
          example: "A function with high cumtime but low tottime delegates most of its time to subcalls.",
        },
        {
          kind: "why-matters",
          body: "Profiling gives you data-driven answers to where your program spends time. Without it, optimization efforts are guesswork that often improve the wrong function.",
        },
      ],
      interactions: [
        {
          id: "s30-profile-mc",
          kind: "multiple-choice",
          prompt: "A function has tottime=0.001s and cumtime=2.5s. What does this tell you?",
          beginnerPurpose: "Interpret profile output columns",
          expectedConceptIds: ["profiling"],
          options: [
            { id: "a", text: "The function itself is the bottleneck — optimize its internal logic", isCorrect: false, explanation: "Low tottime means the function itself is fast." },
            { id: "b", text: "The function delegates most of its time to other functions it calls — investigate those subcalls", isCorrect: true, explanation: "High cumtime with low tottime means the function calls slow sub-functions. Optimize the sub-functions." },
            { id: "c", text: "The profiler measurement is inaccurate", isCorrect: false, explanation: "This difference is meaningful and expected for wrapper functions." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "cumtime includes subcalls. If cumtime >> tottime, where is the time actually going?" },
          ],
          feedback: {
            correct: "Correct! Low tottime + high cumtime means the function calls slow sub-functions.",
            incorrect: "tottime is the function itself. cumtime includes subcalls. High cumtime → look at subcalls.",
          },
        },
        {
          id: "s30-profile-plain",
          kind: "plain-language-explain",
          prompt: "Explain the difference between the profile and cProfile modules.",
          beginnerPurpose: "Know when to use each profiler",
          expectedConceptIds: ["profiling"],
          code: `import cProfile
cProfile.run("my_function()")`,
          keyPointsToHit: [
            "Both produce the same output format",
            "cProfile is a C extension with much lower overhead",
            "Use cProfile for normal profiling; profile for subclassing",
          ],
          sampleAnswer: "Both profile and cProfile produce identical reports. The difference is that cProfile is implemented in C and has much lower overhead — it slows down your program less during profiling. Use cProfile unless you need to subclass the profiler for custom behavior.",
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "The key difference is implementation language and performance overhead." },
          ],
          feedback: {
            correct: "Correct! Same output, different overhead. cProfile is the practical default.",
            incorrect: "Both have the same output. cProfile is faster (C implementation) — use it by default.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "profiling", recallPrompt: "What is the difference between tottime and cumtime in profile output?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-profile-mc", "s30-profile-plain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.16 cProfile Module ─────────────────────────────────────────────
    {
      id: "s30-cprofile-module",
      stageId: "stage-30",
      title: "cProfile Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Run cProfile from the command line with -m cProfile",
        "Save profile data to a file with -o flag",
        "Use cProfile.Profile() as a context manager",
      ],
      prerequisites: ["s30-profile-module"],
      concepts: ["cprofile"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## cProfile — The Practical Profiler\n\n`cProfile` can be used three ways:\n\n1. **Command line** — `python -m cProfile -o stats.prof script.py`\n2. **profile.run()** — `cProfile.run('func()')`\n3. **Context manager or decorator** — wrap specific code sections",
        },
        {
          kind: "code",
          language: "python",
          code: `import cProfile, pstats, io

# Profile a specific section of code
profiler = cProfile.Profile()
profiler.enable()

# --- code to profile ---
data = [i**2 for i in range(100_000)]
total = sum(data)
# -----------------------

profiler.disable()

stream = io.StringIO()
ps = pstats.Stats(profiler, stream=stream)
ps.sort_stats("cumulative")
ps.print_stats(10)   # top 10 functions
print(stream.getvalue())`,
          caption: "Profile a specific code section with enable()/disable()",
          highlight: [4, 5, 12],
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Save and reload profile data",
          body: "Use `python -m cProfile -o stats.prof script.py` to save profile data, then analyze later with `python -m pstats stats.prof`. This avoids re-running expensive code.",
        },
        {
          kind: "why-matters",
          body: "The -m cProfile flag profiles a whole script without changing a line of code. It is the fastest way to get an initial picture of where time is being spent.",
        },
      ],
      interactions: [
        {
          id: "s30-cprofile-fill",
          kind: "fill-code",
          prompt: "Profile 'expensive()' and save results to 'results.prof' using the command line flag.",
          beginnerPurpose: "Practice the cProfile command-line interface",
          expectedConceptIds: ["cprofile"],
          codeTemplate: `# Complete the shell command:
python -m ___BLANK_1___ -o ___BLANK_2___ script.py`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "cProfile", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "results.prof", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The module name is cProfile. The -o flag specifies the output file." },
          ],
          feedback: {
            correct: "Correct! python -m cProfile -o file.prof profiles and saves stats.",
            incorrect: "Use python -m cProfile -o outputfile.prof script.py.",
          },
        },
        {
          id: "s30-cprofile-mc",
          kind: "multiple-choice",
          prompt: "What is the advantage of saving profile data to a file with -o stats.prof?",
          beginnerPurpose: "Understand the workflow benefit of saving profile stats",
          expectedConceptIds: ["cprofile"],
          options: [
            { id: "a", text: "The file format is human-readable and can be opened in a text editor", isCorrect: false, explanation: "The .prof file is binary; use pstats to read it." },
            { id: "b", text: "You can analyze the stats multiple times with different sort orders without re-running the code", isCorrect: true, explanation: "Saving lets you apply different pstats filters and sorts to the same profiling run." },
            { id: "c", text: "Profile data saved to a file is more accurate than in-memory profiling", isCorrect: false, explanation: "Accuracy is not affected by saving to a file." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "Think about what you would have to do if the profile data only existed in memory." },
          ],
          feedback: {
            correct: "Correct! Saved stats can be analyzed many ways without rerunning expensive code.",
            incorrect: "Saving profile data lets you analyze it with different filters without re-running the program.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cprofile", recallPrompt: "What flag saves cProfile output to a file for later analysis?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-cprofile-fill", "s30-cprofile-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.17 pstats ──────────────────────────────────────────────────────
    {
      id: "s30-pstats",
      stageId: "stage-30",
      title: "pstats — Profile Statistics",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Load a .prof file with pstats.Stats()",
        "Sort by cumulative, tottime, or ncalls",
        "Filter output with print_stats(pattern)",
      ],
      prerequisites: ["s30-cprofile-module"],
      concepts: ["pstats"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## pstats — Analyzing Profile Data\n\n`pstats.Stats` loads profile data and provides sorting, filtering, and printing methods.",
        },
        {
          kind: "code",
          language: "python",
          code: `import pstats

# Load saved profile data
ps = pstats.Stats("stats.prof")

# Strip directory paths from filenames for cleaner output
ps.strip_dirs()

# Sort and print top 20 functions by cumulative time
ps.sort_stats("cumulative")
ps.print_stats(20)

# Filter to only show functions in your own code
ps.print_stats("myapp")    # functions with 'myapp' in the path

# Sort by total time (time in the function itself)
ps.sort_stats("tottime")
ps.print_stats(10)`,
          caption: "pstats provides flexible sorting and filtering of profile data",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "snakeviz for visual profiles",
          body: "`pip install snakeviz` then `snakeviz stats.prof` opens a browser-based interactive visualization — far easier to read than text output for complex profiles.",
        },
        {
          kind: "why-matters",
          body: "pstats transforms raw profile data into actionable insights. Sorting by tottime shows where CPU is actually spent; filtering to your own code cuts out standard library noise.",
        },
      ],
      interactions: [
        {
          id: "s30-pstats-fill",
          kind: "fill-code",
          prompt: "Load 'perf.prof', sort by tottime, and print the top 5 functions.",
          beginnerPurpose: "Practice the pstats workflow",
          expectedConceptIds: ["pstats"],
          codeTemplate: `import pstats
ps = pstats.___BLANK_1___("perf.prof")
ps.sort_stats("___BLANK_2___")
ps.print_stats(5)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "Stats", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "tottime", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The class is pstats.Stats. 'tottime' sorts by time in the function excluding subcalls." },
          ],
          feedback: {
            correct: "Correct! Stats('file').sort_stats('tottime').print_stats(N) is the standard workflow.",
            incorrect: "Use pstats.Stats('file'), then sort_stats('tottime'), then print_stats(5).",
          },
        },
        {
          id: "s30-pstats-mc",
          kind: "multiple-choice",
          prompt: "You want to focus the profile report on functions in your own 'myapp' package only. Which call filters appropriately?",
          beginnerPurpose: "Use pattern filtering in print_stats",
          expectedConceptIds: ["pstats"],
          options: [
            { id: "a", text: "ps.print_stats('myapp')", isCorrect: true, explanation: "Passing a string to print_stats filters to functions where 'myapp' appears in the filename." },
            { id: "b", text: "ps.filter_stats('myapp')", isCorrect: false, explanation: "There is no filter_stats() method — use print_stats with a pattern." },
            { id: "c", text: "ps.sort_stats('myapp')", isCorrect: false, explanation: "sort_stats() takes a sort key like 'cumulative', not a filename filter." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "syntax", text: "print_stats() accepts an optional regex/string pattern to filter by filename." },
          ],
          feedback: {
            correct: "Correct! ps.print_stats('myapp') limits output to functions in files matching 'myapp'.",
            incorrect: "Pass a pattern string to print_stats() to filter by filename.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "pstats", recallPrompt: "What sort key finds functions that use the most CPU time excluding subcalls?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-pstats-fill", "s30-pstats-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.18 Memory Diagnosis ────────────────────────────────────────────
    {
      id: "s30-memory-diagnosis",
      stageId: "stage-30",
      title: "Memory Diagnosis Techniques",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use sys.getsizeof() to check object sizes",
        "Identify memory leaks by tracking object counts with gc and tracemalloc",
        "Explain the difference between memory profiling and CPU profiling",
      ],
      prerequisites: ["s30-cprofile-module"],
      concepts: ["memory-profiling"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Diagnosing Memory Usage\n\nMemory problems come in two forms:\n\n1. **Memory leaks** — objects accumulate and are never freed\n2. **Excessive allocation** — objects are created and freed but at too high a rate\n\nPython's `tracemalloc` module (3.4+) traces allocations back to source lines.",
        },
        {
          kind: "code",
          language: "python",
          code: `import tracemalloc

tracemalloc.start()

# --- code to profile ---
data = [list(range(1000)) for _ in range(100)]
# -----------------------

snapshot = tracemalloc.take_snapshot()
top_stats = snapshot.statistics("lineno")

for stat in top_stats[:5]:
    print(stat)`,
          caption: "tracemalloc.take_snapshot() shows which lines allocated the most memory",
        },
        {
          kind: "code",
          language: "python",
          code: `import sys

# Quick size check
print(sys.getsizeof([]))          # 56 bytes (empty list)
print(sys.getsizeof([1, 2, 3]))   # 88 bytes

# getsizeof does NOT recurse — use total_size() from recipes for nested objects`,
          caption: "sys.getsizeof() gives the shallow size of an object",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "sys.getsizeof() is shallow",
          body: "`sys.getsizeof(my_list)` returns the size of the list object itself, not the objects it contains. For deep size measurement, use a recursive helper or the `pympler` library.",
        },
        {
          kind: "why-matters",
          body: "Memory leaks turn a short-lived script into a runaway process. tracemalloc points directly to the allocation site, cutting diagnosis time from hours to minutes.",
        },
      ],
      interactions: [
        {
          id: "s30-memory-mc",
          kind: "multiple-choice",
          prompt: "sys.getsizeof([1, 2, 3]) returns the size of the list. What does this number NOT include?",
          beginnerPurpose: "Understand the shallow nature of sys.getsizeof()",
          expectedConceptIds: ["memory-profiling"],
          options: [
            { id: "a", text: "The list's internal array of pointers", isCorrect: false, explanation: "The pointer array is part of the list object itself — it is included." },
            { id: "b", text: "The size of the integer objects 1, 2, and 3 that the list references", isCorrect: true, explanation: "getsizeof() is shallow — it counts the list structure but not the objects the list points to." },
            { id: "c", text: "The overhead of the Python object header", isCorrect: false, explanation: "The object header is included in the reported size." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "A list stores references (pointers) to objects. getsizeof() counts the pointers, not the referenced objects." },
          ],
          feedback: {
            correct: "Correct! getsizeof() is shallow — it does not count referenced objects.",
            incorrect: "getsizeof() measures the list structure (pointers) but not the objects those pointers point to.",
          },
        },
        {
          id: "s30-memory-fill",
          kind: "fill-code",
          prompt: "Start tracemalloc, run some code, and take a snapshot.",
          beginnerPurpose: "Practice the tracemalloc workflow",
          expectedConceptIds: ["memory-profiling"],
          codeTemplate: `import tracemalloc
tracemalloc.___BLANK_1___()
data = list(range(10_000))
snap = tracemalloc.___BLANK_2___()`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "start", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "take_snapshot", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "Start tracing with start(), capture state with take_snapshot()." },
          ],
          feedback: {
            correct: "Correct! tracemalloc.start() enables tracing; take_snapshot() captures current allocations.",
            incorrect: "Use tracemalloc.start() to begin and tracemalloc.take_snapshot() to capture.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "memory-profiling", recallPrompt: "What Python standard library module traces memory allocations back to source lines?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-memory-mc", "s30-memory-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.19 Debugging Workflow Project ──────────────────────────────────
    {
      id: "s30-debugging-workflow-project",
      stageId: "stage-30",
      title: "Debugging Workflow Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Replace print() debugging with structured logging",
        "Use pdb to isolate a bug in a multi-function program",
        "Interpret logging output to diagnose a runtime problem",
      ],
      prerequisites: [
        "s30-logging-overview",
        "s30-logging-levels",
        "s30-handlers",
        "s30-pdb-debugger",
        "s30-traceback-module",
      ],
      concepts: ["python-logging", "pdb-debugger"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project: Diagnose a Broken Data Pipeline\n\nThe following script processes a list of records but produces wrong results. Your job is to:\n\n1. Add proper logging (replace the print statements)\n2. Run the script and interpret the logs to find the bug\n3. Use pdb to inspect the state when the bug occurs\n4. Fix the bug and verify with logging",
        },
        {
          kind: "code",
          language: "python",
          code: `# buggy_pipeline.py
import logging

# TODO: set up logging with level=DEBUG and format "%(levelname)s: %(message)s"

def parse_record(raw):
    # TODO: replace print with logger.debug
    print(f"Parsing: {raw}")
    parts = raw.split(",")
    return {"name": parts[0], "value": int(parts[1])}

def process(records):
    total = 0
    for rec in records:
        # Bug is here: can you find it with pdb?
        total += rec["value"]
    return total / len(records)   # BUG: what if records is empty?

def main():
    raw_data = ["alice,10", "bob,20", "carol,thirty"]  # "thirty" will cause ValueError
    records = []
    for raw in raw_data:
        try:
            records.append(parse_record(raw))
        except ValueError as e:
            # TODO: replace print with logger.warning
            print(f"Skipping bad record '{raw}': {e}")
    result = process(records)
    # TODO: replace print with logger.info
    print(f"Average: {result}")

main()`,
          caption: "Buggy pipeline with print() debugging — replace with logging and fix the bugs",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Project checklist",
          body: "1. Add basicConfig() with DEBUG level. 2. Replace all print() with appropriate logger calls. 3. Add logger.exception() where ValueError is caught. 4. Add a guard for empty records list to prevent ZeroDivisionError.",
        },
        {
          kind: "why-matters",
          body: "This project practices the complete debugging workflow: structured logging → inspect logs → add breakpoints → fix root cause → verify. This is the workflow for real production incidents.",
        },
      ],
      interactions: [
        {
          id: "s30-debug-project-run",
          kind: "run-code",
          prompt: "Fix the parse_record function to log a warning instead of raising an exception for non-integer values, and return None.",
          beginnerPurpose: "Apply logging and exception handling in a real debugging scenario",
          expectedConceptIds: ["python-logging", "traceback"],
          starterCode: `import logging
logging.basicConfig(level=logging.DEBUG, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

def parse_record(raw):
    parts = raw.split(",")
    try:
        return {"name": parts[0], "value": int(parts[1])}
    except (ValueError, IndexError) as e:
        logger.warning("Skipping bad record '%s': %s", raw, e)
        return None

records = ["alice,10", "bob,20", "carol,thirty", "dave,30"]
results = [r for r in (parse_record(raw) for raw in records) if r is not None]
print("Valid records:", len(results))
print("Names:", [r["name"] for r in results])`,
          task: "Run the code and verify that 'carol,thirty' is skipped with a warning and 3 valid records remain.",
          expectedOutputContains: ["WARNING", "Skipping", "carol", "Valid records: 3"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "The parse_record function should catch ValueError and log a warning with the raw string." },
          ],
          feedback: {
            correct: "Excellent! The warning is logged and only valid records are processed.",
            incorrect: "Make sure to catch ValueError, log a warning with logger.warning(), and return None for bad records.",
          },
        },
        {
          id: "s30-debug-project-mc",
          kind: "multiple-choice",
          prompt: "After fixing parse_record, the process() function might still crash if all records are skipped. Which guard is correct?",
          beginnerPurpose: "Apply defensive programming to the pipeline",
          expectedConceptIds: ["python-logging"],
          options: [
            { id: "a", text: "if records: return sum(r['value'] for r in records) / len(records)", isCorrect: true, explanation: "Checking 'if records' before dividing prevents ZeroDivisionError on an empty list." },
            { id: "b", text: "try: return total / len(records) except: return 0", isCorrect: false, explanation: "Bare except catches too broadly; a specific guard on empty records is cleaner." },
            { id: "c", text: "return total / max(len(records), 1)", isCorrect: false, explanation: "This silently returns 0 for empty records without logging — the caller would not know processing failed." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "The cleanest guard checks the list before dividing and logs clearly if empty." },
          ],
          feedback: {
            correct: "Correct! Check 'if records' before the division to prevent ZeroDivisionError.",
            incorrect: "Guard with 'if records:' before dividing to handle the empty case explicitly.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "python-logging", recallPrompt: "What is the preferred logging method when catching and handling an exception?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-debug-project-run", "s30-debug-project-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 30.20 Profiling Optimization Project ──────────────────────────────
    {
      id: "s30-profiling-optimization-project",
      stageId: "stage-30",
      title: "Profiling Optimization Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Profile a slow function with cProfile and identify the bottleneck",
        "Apply a targeted optimization based on profile data",
        "Verify the improvement with timeit before and after",
      ],
      prerequisites: ["s30-cprofile-module", "s30-pstats", "s30-timeit"],
      concepts: ["profiling", "cprofile", "timeit"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project: Profile and Optimize\n\nThe function below is slow. Use cProfile to find why, then apply the correct optimization.\n\n**Workflow**: profile → identify hotspot → optimize → measure improvement with timeit.",
        },
        {
          kind: "code",
          language: "python",
          code: `import cProfile, timeit

def find_duplicates_slow(items: list) -> list:
    """Return items that appear more than once."""
    duplicates = []
    for i, item in enumerate(items):
        for j, other in enumerate(items):
            if i != j and item == other and item not in duplicates:
                duplicates.append(item)
    return duplicates

# Profiling target
data = list(range(500)) + list(range(250))   # 750 items, 250 duplicates

# TODO: profile find_duplicates_slow(data) with cProfile
# TODO: optimize to O(n) using Counter or a set
# TODO: verify speed improvement with timeit`,
          caption: "Slow O(n²) duplicate finder — profile shows the inner loop as the hotspot",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Expected optimization",
          body: "The O(n²) nested loop is the hotspot. An O(n) solution uses `collections.Counter` to count occurrences, then filters for counts > 1. Profile again after fixing to confirm the improvement.",
        },
        {
          kind: "why-matters",
          body: "This project practices the full optimization loop: measure → identify → optimize → re-measure. Skipping measurement leads to optimizing the wrong thing.",
        },
      ],
      interactions: [
        {
          id: "s30-profiling-project-run",
          kind: "run-code",
          prompt: "Implement find_duplicates_fast() using Counter and compare its timing to the slow version.",
          beginnerPurpose: "Apply profiling findings to implement a faster algorithm",
          expectedConceptIds: ["profiling", "timeit"],
          starterCode: `from collections import Counter
import timeit

def find_duplicates_slow(items):
    duplicates = []
    for i, item in enumerate(items):
        for j, other in enumerate(items):
            if i != j and item == other and item not in duplicates:
                duplicates.append(item)
    return duplicates

def find_duplicates_fast(items):
    counts = Counter(items)
    return [item for item, count in counts.items() if count > 1]

data = list(range(200)) + list(range(100))  # 300 items, 100 duplicates

# Verify correctness
slow_result = sorted(find_duplicates_slow(data))
fast_result = sorted(find_duplicates_fast(data))
print("Results match:", slow_result == fast_result)

# Compare timing
slow_time = timeit.timeit(lambda: find_duplicates_slow(data), number=100)
fast_time = timeit.timeit(lambda: find_duplicates_fast(data), number=100)
print(f"Slow: {slow_time:.3f}s")
print(f"Fast: {fast_time:.3f}s")
print(f"Speedup: {slow_time/fast_time:.1f}x")`,
          task: "Run the code. Both results should match and the fast version should be significantly faster.",
          expectedOutputContains: ["Results match: True", "Speedup"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "Counter counts occurrences in O(n). Filter for items with count > 1." },
          ],
          feedback: {
            correct: "Excellent! The Counter-based solution is dramatically faster and produces the same result.",
            incorrect: "Make sure find_duplicates_fast uses Counter and returns items with count > 1.",
          },
        },
        {
          id: "s30-profiling-project-mc",
          kind: "multiple-choice",
          prompt: "After profiling, you see that 95% of time is in a standard library function. What should you do first?",
          beginnerPurpose: "Apply profiling results to prioritize optimization work",
          expectedConceptIds: ["profiling"],
          options: [
            { id: "a", text: "Rewrite the standard library function in C", isCorrect: false, explanation: "Standard library functions are often already in C — and you cannot ship a modified stdlib." },
            { id: "b", text: "Find out why your code calls it so many times — reduce the call count", isCorrect: true, explanation: "If a fast function is called 1 million times unnecessarily, reducing calls is the correct optimization." },
            { id: "c", text: "Accept the performance and move on — nothing can be done", isCorrect: false, explanation: "Calling patterns can often be changed to reduce invocation count." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            { level: "concept", text: "If the function itself is fast, the problem is how often it is called." },
          ],
          feedback: {
            correct: "Correct! When a fast function dominates profile output, reduce how often you call it.",
            incorrect: "A fast function dominating the profile means it's called too often — reduce call frequency.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "profiling", recallPrompt: "Describe the four-step optimization loop: measure, identify, optimize, re-measure.", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s30-profiling-project-run", "s30-profiling-project-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s30-project",
    stageId: "stage-30",
    title: "Debugging and Profiling Workflow Project",
    brief: "Diagnose a slow, buggy Python program: replace print() debugging with logging, find and fix bugs with pdb, then profile and optimize the hot path using cProfile and timeit.",
    requirements: [
      "Replace all print() debug statements with appropriate logging calls",
      "Configure logging with basicConfig() at the correct level",
      "Use logger.exception() when catching exceptions",
      "Use pdb breakpoints to isolate at least one bug",
      "Profile the corrected code with cProfile and identify the hotspot",
      "Apply an optimization and verify improvement with timeit",
    ],
    acceptanceCriteria: [
      "No print() calls remain for debugging (only intentional user-facing output)",
      "Logging output includes timestamps, levels, and logger names",
      "Caught exceptions are logged with their full tracebacks",
      "cProfile output correctly identifies the performance bottleneck",
      "timeit confirms at least 2x speedup after optimization",
    ],
    conceptIds: ["python-logging", "pdb-debugger", "profiling", "cprofile", "timeit"],
    difficulty: "intermediate",
  },
} satisfies Stage;
