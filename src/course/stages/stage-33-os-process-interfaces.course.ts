import type { Stage } from "@/course/course.schema";

export const stage33 = {
  id: "stage-33",
  number: 33,
  title: "Operating System, Process, and Runtime Interfaces",
  summary:
    "Master operating system, process, and runtime interfaces through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["os-module", "subprocess-module", "pathlib-paths"],
  lessons: [
    // ─── 33.1 os module ───────────────────────────────────────────────────────
    {
      id: "s33-os-module",
      stageId: "stage-33",
      title: "The os Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use os.environ to read and write environment variables",
        "Navigate the filesystem with os.getcwd, os.chdir, os.listdir",
        "Create and remove directories with os.makedirs and os.rmdir",
      ],
      prerequisites: [],
      concepts: ["os-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The `os` Module\n\nThe `os` module gives Python programs a portable interface to the operating system. Whether you are on Linux, macOS, or Windows, the same API works — Python translates it for you.",
        },
        {
          kind: "code",
          language: "python",
          code: `import os

# Current working directory
print(os.getcwd())          # /home/user/project

# List directory contents
print(os.listdir('.'))      # ['main.py', 'data', 'tests']

# Environment variables
home = os.environ.get('HOME', '/tmp')
print(home)                 # /home/user

# Create nested directories
os.makedirs('output/reports', exist_ok=True)

# Remove a file
os.remove('old_file.txt')`,
          caption: "Core os operations",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use exist_ok=True",
          body: "Pass `exist_ok=True` to `os.makedirs()` so the call succeeds even if the directory already exists, avoiding a FileExistsError.",
        },
        {
          kind: "why-matters",
          body: "Scripts that automate builds, deployments, or data pipelines constantly interact with the OS — reading config from environment variables, creating output folders, and cleaning up stale files. The `os` module is the foundation for all of that.",
        },
        {
          kind: "glossary-term",
          term: "Environment variable",
          definition: "A named value stored in the process environment, inherited by child processes. Common examples: PATH, HOME, DATABASE_URL.",
          example: "os.environ['MY_VAR'] = 'hello'",
        },
        {
          kind: "mental-model",
          title: "The OS as a Service Desk",
          analogy: "Think of the OS as a service desk. Your Python program is a customer that requests services — 'list these files', 'create this folder', 'what is my current directory?'. The `os` module is the help desk counter where you make those requests.",
          explanation: "The OS manages the actual hardware and filesystem; `os` simply provides the API to communicate your requests.",
        },
      ],
      interactions: [
        {
          id: "s33-os-mc1",
          kind: "multiple-choice",
          prompt: "Which call creates all intermediate directories automatically?",
          beginnerPurpose: "Distinguish between os.mkdir and os.makedirs",
          expectedConceptIds: ["os-module"],
          options: [
            { id: "a", text: "os.mkdir('a/b/c')", isCorrect: false, explanation: "os.mkdir only creates one directory and fails if parents are missing." },
            { id: "b", text: "os.makedirs('a/b/c')", isCorrect: true, explanation: "os.makedirs creates all intermediate directories in the path." },
            { id: "c", text: "os.mkdirs('a/b/c')", isCorrect: false, explanation: "os.mkdirs does not exist in the standard library." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The 'make directories' variant (plural) is the recursive one." }],
          feedback: { correct: "Correct! os.makedirs handles the full path.", incorrect: "Check which function handles nested paths automatically." },
        },
        {
          id: "s33-os-po1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Practice reading environment variables with a fallback",
          expectedConceptIds: ["os-module"],
          code: `import os
val = os.environ.get('MISSING_KEY', 'default')
print(val)`,
          expectedOutput: "default",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "os.environ.get returns the second argument when the key is absent." }],
          feedback: { correct: "Right — get() returns the fallback when the key is missing.", incorrect: "Remember that get() does not raise KeyError; it returns the default." },
        },
      ],
      reviewHooks: [
        { conceptId: "os-module", recallPrompt: "Name three things the `os` module can do for you.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-os-mc1", "s33-os-po1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.2 os.path ─────────────────────────────────────────────────────────
    {
      id: "s33-os-path",
      stageId: "stage-33",
      title: "os.path",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Join and split paths portably with os.path.join and os.path.split",
        "Test existence and type of paths with os.path.exists, isfile, isdir",
        "Extract filename and extension with os.path.basename and splitext",
      ],
      prerequisites: ["s33-os-module"],
      concepts: ["os-path"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `os.path` — Portable Path Operations\n\n`os.path` provides functions for building and inspecting file paths without hard-coding path separators (`/` vs `\\`).",
        },
        {
          kind: "code",
          language: "python",
          code: `import os.path

base = '/home/user'
file = os.path.join(base, 'data', 'report.csv')
print(file)                          # /home/user/data/report.csv

print(os.path.exists(file))          # True or False
print(os.path.isfile(file))          # True if it is a regular file
print(os.path.isdir('/home/user'))   # True if it is a directory

name = os.path.basename(file)        # report.csv
stem, ext = os.path.splitext(name)   # ('report', '.csv')
print(stem, ext)`,
          caption: "os.path essentials",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Avoid string concatenation for paths",
          body: "Never build paths with `'/' + filename`. Use `os.path.join()` so your code works on both Unix and Windows.",
        },
        {
          kind: "why-matters",
          body: "Path manipulation errors are a common source of bugs in scripts that handle files. Using `os.path` keeps your code cross-platform and self-documenting.",
        },
        {
          kind: "glossary-term",
          term: "Basename",
          definition: "The final component of a path — the filename with extension, without the directory part.",
          example: "os.path.basename('/data/report.csv') == 'report.csv'",
        },
      ],
      interactions: [
        {
          id: "s33-path-fc1",
          kind: "fill-code",
          prompt: "Complete the code to safely join a directory and filename:",
          beginnerPurpose: "Practice portable path joining",
          expectedConceptIds: ["os-path"],
          codeTemplate: `import os.path
path = os.path.___('output', 'results.txt')
print(path)`,
          blanks: [{ placeholder: "___", answer: "join", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The function that joins path components is os.path.join()." }],
          feedback: { correct: "Correct! os.path.join is the portable way to combine paths.", incorrect: "The function name is 'join'." },
        },
        {
          id: "s33-path-po1",
          kind: "predict-output",
          prompt: "What does splitext return for this filename?",
          beginnerPurpose: "Understand how splitext splits name from extension",
          expectedConceptIds: ["os-path"],
          code: `import os.path
stem, ext = os.path.splitext('archive.tar.gz')
print(stem)
print(ext)`,
          expectedOutput: "archive.tar\n.gz",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "splitext splits at the last dot only." }],
          feedback: { correct: "Right — splitext splits at the last dot.", incorrect: "splitext only strips the last extension (.gz), not all of them." },
        },
      ],
      reviewHooks: [
        { conceptId: "os-path", recallPrompt: "What function joins path components portably?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-path-fc1", "s33-path-po1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.3 pathlib vs os.path ──────────────────────────────────────────────
    {
      id: "s33-pathlib",
      stageId: "stage-33",
      title: "pathlib vs os.path",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create Path objects and navigate directories with /",
        "Read and write files using Path methods",
        "Know when to prefer pathlib over os.path",
      ],
      prerequisites: ["s33-os-path"],
      concepts: ["pathlib-paths"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `pathlib` — Object-Oriented Paths\n\nPython 3.4+ includes `pathlib.Path`, which represents paths as objects rather than strings. You can navigate with the `/` operator and call methods instead of passing strings to functions.",
        },
        {
          kind: "comparison",
          leftLabel: "os.path style",
          rightLabel: "pathlib style",
          leftCode: `import os, os.path

base = os.path.join('/data', 'reports')
full = os.path.join(base, 'jan.csv')
if os.path.exists(full):
    with open(full) as f:
        text = f.read()`,
          rightCode: `from pathlib import Path

base = Path('/data') / 'reports'
full = base / 'jan.csv'
if full.exists():
    text = full.read_text()`,
          caption: "pathlib is more concise and readable",
        },
        {
          kind: "code",
          language: "python",
          code: `from pathlib import Path

p = Path('.')
# Iterate over Python files in a directory
for f in p.rglob('*.py'):
    print(f.stem, f.suffix)

# Read / write text
Path('hello.txt').write_text('Hello, world!')
content = Path('hello.txt').read_text()`,
          caption: "Common pathlib operations",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Prefer pathlib for new code",
          body: "For new Python 3 code, prefer `pathlib.Path` over `os.path`. It is more readable, supports method chaining, and integrates well with `open()` and file-reading APIs.",
        },
        {
          kind: "why-matters",
          body: "Modern Python codebases and libraries (like `shutil`, `open()`, many third-party packages) all accept `Path` objects directly. Learning pathlib makes you comfortable with idiomatic Python 3 file handling.",
        },
      ],
      interactions: [
        {
          id: "s33-pathlib-mc1",
          kind: "multiple-choice",
          prompt: "Which pathlib expression navigates into 'src/utils'?",
          beginnerPurpose: "Understand the / operator on Path objects",
          expectedConceptIds: ["pathlib-paths"],
          options: [
            { id: "a", text: "Path('src') + 'utils'", isCorrect: false, explanation: "Path objects use / not + for joining." },
            { id: "b", text: "Path('src') / 'utils'", isCorrect: true, explanation: "The / operator joins Path components." },
            { id: "c", text: "Path.join('src', 'utils')", isCorrect: false, explanation: "pathlib does not have a static join() class method like os.path.join." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "pathlib overloads the division operator for path joining." }],
          feedback: { correct: "Correct! / is pathlib's path separator.", incorrect: "pathlib overloads the / operator for joining paths." },
        },
        {
          id: "s33-pathlib-ple1",
          kind: "plain-language-explain",
          prompt: "Explain in plain language how pathlib.Path differs from os.path and when you would choose one over the other.",
          beginnerPurpose: "Articulate the design difference between the two APIs",
          expectedConceptIds: ["pathlib-paths"],
          code: `from pathlib import Path
p = Path('/data') / 'files' / 'report.csv'
print(p.stem)    # report
print(p.parent)  # /data/files`,
          keyPointsToHit: [
            "pathlib uses objects; os.path uses plain strings",
            "/ operator joins path components",
            "Prefer pathlib for new Python 3 code",
          ],
          sampleAnswer: "pathlib.Path treats file paths as objects rather than strings. You chain paths together with the / operator and call methods like .read_text() directly on the object. os.path takes plain strings and has standalone functions. For new code, pathlib is preferred because it is more readable and self-contained.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Focus on the object vs string distinction and the / operator." }],
          feedback: { correct: "Excellent explanation!", incorrect: "Mention that pathlib uses objects and the / operator for joining." },
        },
      ],
      reviewHooks: [
        { conceptId: "pathlib-paths", recallPrompt: "How do you join two path components using pathlib?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-pathlib-mc1", "s33-pathlib-ple1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.4 sys module ──────────────────────────────────────────────────────
    {
      id: "s33-sys-module",
      stageId: "stage-33",
      title: "The sys Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Read command-line arguments from sys.argv",
        "Exit a program with sys.exit and a meaningful code",
        "Inspect the Python interpreter via sys.version and sys.platform",
      ],
      prerequisites: ["s33-os-module"],
      concepts: ["sys-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The `sys` Module\n\n`sys` exposes information about the Python interpreter itself — command-line arguments, the module search path, standard I/O streams, and hooks for exiting.",
        },
        {
          kind: "code",
          language: "python",
          code: `import sys

# Command-line arguments (sys.argv[0] is the script name)
print(sys.argv)          # ['script.py', '--verbose', 'file.txt']

# Python version
print(sys.version)       # '3.12.0 (main, ...)'
print(sys.platform)      # 'linux', 'darwin', or 'win32'

# Module search path
print(sys.path[:2])      # ['/usr/lib/python312', ...]

# Write directly to stderr
print("Error occurred", file=sys.stderr)

# Exit with a non-zero code to signal failure
sys.exit(1)`,
          caption: "sys module essentials",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "sys.exit() raises SystemExit",
          body: "Calling `sys.exit()` raises `SystemExit`. This means it can be caught by except clauses if you are not careful. Use it at the top level of scripts, not deep inside library code.",
        },
        {
          kind: "why-matters",
          body: "CLI scripts rely on `sys.argv` to receive arguments from the shell. Proper exit codes let shell scripts and CI pipelines detect whether your program succeeded or failed.",
        },
      ],
      interactions: [
        {
          id: "s33-sys-po1",
          kind: "predict-output",
          prompt: "If this script is run as: python script.py hello world, what does it print?",
          beginnerPurpose: "Understand the structure of sys.argv",
          expectedConceptIds: ["sys-module"],
          code: `import sys
print(len(sys.argv))
print(sys.argv[1])`,
          expectedOutput: "3\nhello",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "sys.argv[0] is the script name, then each argument follows." }],
          feedback: { correct: "Correct! sys.argv[0] is 'script.py', so argv has 3 elements and argv[1] is 'hello'.", incorrect: "Remember argv[0] is the script name, so 'hello' is at index 1." },
        },
        {
          id: "s33-sys-mc1",
          kind: "multiple-choice",
          prompt: "What is the correct way to signal a script failure to the shell?",
          beginnerPurpose: "Learn how exit codes communicate success or failure",
          expectedConceptIds: ["sys-module"],
          options: [
            { id: "a", text: "sys.exit(0)", isCorrect: false, explanation: "Exit code 0 means success." },
            { id: "b", text: "sys.exit(1)", isCorrect: true, explanation: "Any non-zero exit code signals failure to the shell." },
            { id: "c", text: "raise SystemError()", isCorrect: false, explanation: "SystemError is for Python interpreter errors, not graceful script exits." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "By convention, exit code 0 = success, non-zero = failure." }],
          feedback: { correct: "Correct! Non-zero exit codes signal failure.", incorrect: "Remember: 0 means success, non-zero means failure." },
        },
      ],
      reviewHooks: [
        { conceptId: "sys-module", recallPrompt: "How do you access command-line arguments in Python?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-sys-po1", "s33-sys-mc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.5 platform module ─────────────────────────────────────────────────
    {
      id: "s33-platform-module",
      stageId: "stage-33",
      title: "The platform Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Detect the OS and architecture at runtime with platform functions",
        "Write cross-platform conditional code",
      ],
      prerequisites: ["s33-sys-module"],
      concepts: ["platform-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The `platform` Module\n\nThe `platform` module provides detailed information about the system the program is running on — OS name, version, machine type, and Python implementation.",
        },
        {
          kind: "code",
          language: "python",
          code: `import platform

print(platform.system())      # 'Linux', 'Darwin', 'Windows'
print(platform.release())     # Kernel or OS version
print(platform.machine())     # 'x86_64', 'arm64', etc.
print(platform.python_version())  # '3.12.0'

# Cross-platform conditional
if platform.system() == 'Windows':
    config_dir = 'C:/Users/user/AppData'
else:
    config_dir = '/home/user/.config'`,
          caption: "platform module usage",
        },
        {
          kind: "callout",
          variant: "info",
          title: "platform vs sys.platform",
          body: "`sys.platform` returns a short string like `'linux'` or `'win32'`. `platform.system()` returns a more human-readable name like `'Linux'` or `'Windows'`. For conditional logic, `sys.platform` is usually sufficient; `platform` gives richer details.",
        },
        {
          kind: "why-matters",
          body: "Tools like installers, development environment setup scripts, and cross-platform applications need to detect the OS to choose the right paths, commands, and configuration.",
        },
      ],
      interactions: [
        {
          id: "s33-platform-mc1",
          kind: "multiple-choice",
          prompt: "Which call returns the human-readable OS name like 'Linux' or 'Windows'?",
          beginnerPurpose: "Distinguish between platform.system and sys.platform",
          expectedConceptIds: ["platform-module"],
          options: [
            { id: "a", text: "sys.platform", isCorrect: false, explanation: "sys.platform returns a short key like 'linux' or 'win32'." },
            { id: "b", text: "platform.system()", isCorrect: true, explanation: "platform.system() returns 'Linux', 'Windows', or 'Darwin'." },
            { id: "c", text: "os.name", isCorrect: false, explanation: "os.name returns 'posix', 'nt', or 'java' — even more abbreviated." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The platform module is designed for human-readable system info." }],
          feedback: { correct: "Correct!", incorrect: "Check what each attribute actually returns." },
        },
        {
          id: "s33-platform-fc1",
          kind: "fill-code",
          prompt: "Complete the call to get the current Python version string:",
          beginnerPurpose: "Practice using platform to inspect the Python runtime",
          expectedConceptIds: ["platform-module"],
          codeTemplate: `import platform
ver = platform.___()
print(ver)  # e.g. '3.12.0'`,
          blanks: [{ placeholder: "___", answer: "python_version", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The function name combines 'python' and 'version' with an underscore." }],
          feedback: { correct: "Correct!", incorrect: "The function is platform.python_version()." },
        },
      ],
      reviewHooks: [
        { conceptId: "platform-module", recallPrompt: "Which function returns 'Linux', 'Windows', or 'Darwin'?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-platform-mc1", "s33-platform-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.6 shutil module ───────────────────────────────────────────────────
    {
      id: "s33-shutil-module",
      stageId: "stage-33",
      title: "The shutil Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Copy files and directories with shutil.copy and shutil.copytree",
        "Move and rename files with shutil.move",
        "Delete directory trees with shutil.rmtree",
        "Create archives with shutil.make_archive",
      ],
      prerequisites: ["s33-pathlib"],
      concepts: ["shutil-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `shutil` — High-Level File Operations\n\n`os` operates on individual files; `shutil` (shell utilities) handles higher-level operations like copying directory trees, moving files, and creating archives.",
        },
        {
          kind: "code",
          language: "python",
          code: `import shutil

# Copy a single file (preserves metadata with copy2)
shutil.copy('src/config.toml', 'backup/config.toml')
shutil.copy2('src/data.csv', 'backup/data.csv')  # + metadata

# Copy an entire directory tree
shutil.copytree('src/', 'backup/src/')

# Move / rename
shutil.move('old_name.txt', 'new_name.txt')

# Delete a directory tree (use with care!)
shutil.rmtree('temp_output/')

# Create a zip archive of a directory
shutil.make_archive('backup_2024', 'zip', 'output/')`,
          caption: "shutil operations",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "shutil.rmtree is irreversible",
          body: "`shutil.rmtree()` permanently deletes the directory and all its contents. Always verify the path before calling it, and consider making a backup first.",
        },
        {
          kind: "why-matters",
          body: "Automation scripts for deployments, backups, and build systems routinely copy, move, and archive directories. `shutil` provides all of these operations in one import.",
        },
      ],
      interactions: [
        {
          id: "s33-shutil-mc1",
          kind: "multiple-choice",
          prompt: "Which function recursively copies an entire directory?",
          beginnerPurpose: "Distinguish single-file copy from directory tree copy",
          expectedConceptIds: ["shutil-module"],
          options: [
            { id: "a", text: "shutil.copy('src/', 'dst/')", isCorrect: false, explanation: "shutil.copy only copies a single file." },
            { id: "b", text: "shutil.copytree('src/', 'dst/')", isCorrect: true, explanation: "copytree recursively copies a whole directory." },
            { id: "c", text: "shutil.copydir('src/', 'dst/')", isCorrect: false, explanation: "copydir does not exist in shutil." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The 'tree' in the function name hints at recursive directory copying." }],
          feedback: { correct: "Correct! copytree handles the whole directory recursively.", incorrect: "Look for a function whose name implies a tree/recursive copy." },
        },
        {
          id: "s33-shutil-fc1",
          kind: "fill-code",
          prompt: "Complete the code to create a zip archive named 'release' from the 'dist/' directory:",
          beginnerPurpose: "Practice using shutil.make_archive",
          expectedConceptIds: ["shutil-module"],
          codeTemplate: `import shutil
shutil.___(  'release', 'zip', 'dist/')`,
          blanks: [{ placeholder: "___", answer: "make_archive", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The function combines 'make' and 'archive'." }],
          feedback: { correct: "Correct! shutil.make_archive creates zip or tar archives.", incorrect: "The function is shutil.make_archive." },
        },
      ],
      reviewHooks: [
        { conceptId: "shutil-module", recallPrompt: "How do you recursively copy a directory with shutil?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-shutil-mc1", "s33-shutil-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.7 glob module ─────────────────────────────────────────────────────
    {
      id: "s33-glob-module",
      stageId: "stage-33",
      title: "The glob Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Find files matching a pattern using glob.glob",
        "Recursively search with ** patterns",
      ],
      prerequisites: ["s33-os-path"],
      concepts: ["glob-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `glob` — Pattern-Based File Finding\n\nThe `glob` module finds files whose names match a shell-style pattern. `*` matches any characters in a single directory level; `**` matches across multiple levels when `recursive=True`.",
        },
        {
          kind: "code",
          language: "python",
          code: `import glob

# All CSV files in data/
csv_files = glob.glob('data/*.csv')
print(csv_files)   # ['data/jan.csv', 'data/feb.csv']

# All Python files anywhere under src/ (recursive)
py_files = glob.glob('src/**/*.py', recursive=True)
print(py_files)

# Sorted results for reproducibility
for f in sorted(glob.glob('logs/*.log')):
    print(f)`,
          caption: "glob patterns",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "pathlib.Path.glob() is an alternative",
          body: "If you are already using `pathlib`, use `Path('.').glob('**/*.py')` instead of importing `glob` separately. Both work the same way.",
        },
        {
          kind: "why-matters",
          body: "Data pipelines often need to process all files of a given type in a directory. `glob` lets you express that concisely without manually listing and filtering directory contents.",
        },
      ],
      interactions: [
        {
          id: "s33-glob-mc1",
          kind: "multiple-choice",
          prompt: "Which glob pattern finds all .log files in any subdirectory?",
          beginnerPurpose: "Understand when to use ** for recursive matching",
          expectedConceptIds: ["glob-module"],
          options: [
            { id: "a", text: "glob.glob('*.log')", isCorrect: false, explanation: "This only matches in the current directory." },
            { id: "b", text: "glob.glob('**/*.log', recursive=True)", isCorrect: true, explanation: "** with recursive=True matches across all subdirectories." },
            { id: "c", text: "glob.glob('*/*.log')", isCorrect: false, explanation: "This matches exactly one directory level deep, not any depth." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The ** pattern with recursive=True is needed for multi-level matching." }],
          feedback: { correct: "Correct! ** with recursive=True searches all subdirectories.", incorrect: "Remember that ** only works across multiple levels when recursive=True is set." },
        },
        {
          id: "s33-glob-po1",
          kind: "predict-output",
          prompt: "If 'data/' contains only 'sales.csv' and 'notes.txt', what does this print?",
          beginnerPurpose: "Predict glob pattern matching results",
          expectedConceptIds: ["glob-module"],
          code: `import glob
files = glob.glob('data/*.csv')
print(len(files))`,
          expectedOutput: "1",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Only files matching *.csv count; .txt files do not match." }],
          feedback: { correct: "Correct! Only sales.csv matches *.csv.", incorrect: "Count only files that match the *.csv pattern." },
        },
      ],
      reviewHooks: [
        { conceptId: "glob-module", recallPrompt: "How do you find all Python files recursively with glob?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-glob-mc1", "s33-glob-po1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.8 fnmatch module ──────────────────────────────────────────────────
    {
      id: "s33-fnmatch-module",
      stageId: "stage-33",
      title: "The fnmatch Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Test whether a filename matches a shell-style pattern using fnmatch.fnmatch",
        "Filter a list of filenames with fnmatch.filter",
      ],
      prerequisites: ["s33-glob-module"],
      concepts: ["fnmatch-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `fnmatch` — Filename Pattern Matching\n\n`fnmatch` tests whether a filename string matches a shell-style wildcard pattern. Unlike `glob`, it works on strings in memory — it does not touch the filesystem.",
        },
        {
          kind: "code",
          language: "python",
          code: `import fnmatch

# Test a single filename
print(fnmatch.fnmatch('report_2024.csv', '*.csv'))   # True
print(fnmatch.fnmatch('report_2024.csv', '*.txt'))   # False

# Filter a list
names = ['jan.csv', 'feb.csv', 'notes.txt', 'mar.csv']
csv_names = fnmatch.filter(names, '*.csv')
print(csv_names)   # ['jan.csv', 'feb.csv', 'mar.csv']`,
          caption: "fnmatch basics",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Case sensitivity",
          body: "On case-insensitive systems (Windows), `fnmatch.fnmatch` is case-insensitive. On Unix, it is case-sensitive. Use `fnmatch.fnmatchcase` for consistent behavior across platforms.",
        },
        {
          kind: "why-matters",
          body: "When you already have a list of filenames — from a database, an API, or a directory scan — `fnmatch` lets you filter them with the same familiar wildcard patterns as `glob`, without hitting the filesystem again.",
        },
      ],
      interactions: [
        {
          id: "s33-fnmatch-po1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Understand what fnmatch.filter returns",
          expectedConceptIds: ["fnmatch-module"],
          code: `import fnmatch
names = ['a.py', 'b.txt', 'c.py', 'd.md']
result = fnmatch.filter(names, '*.py')
print(result)`,
          expectedOutput: "['a.py', 'c.py']",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "fnmatch.filter returns only the names that match the pattern." }],
          feedback: { correct: "Correct! Only the .py files match.", incorrect: "fnmatch.filter keeps only names that match the pattern." },
        },
        {
          id: "s33-fnmatch-mc1",
          kind: "multiple-choice",
          prompt: "What is the key difference between glob.glob and fnmatch.fnmatch?",
          beginnerPurpose: "Distinguish filesystem-based searching from string-based pattern matching",
          expectedConceptIds: ["fnmatch-module"],
          options: [
            { id: "a", text: "fnmatch supports ** for recursive matching; glob does not", isCorrect: false, explanation: "It is the other way around." },
            { id: "b", text: "glob searches the real filesystem; fnmatch matches strings in memory", isCorrect: true, explanation: "glob hits the disk; fnmatch only works on strings." },
            { id: "c", text: "They are identical except for import name", isCorrect: false, explanation: "They serve different purposes." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about whether each one needs to read the disk." }],
          feedback: { correct: "Correct! glob reads the filesystem; fnmatch matches strings.", incorrect: "Consider which one actually looks at the disk." },
        },
      ],
      reviewHooks: [
        { conceptId: "fnmatch-module", recallPrompt: "When would you use fnmatch instead of glob?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-fnmatch-po1", "s33-fnmatch-mc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.9 subprocess module ───────────────────────────────────────────────
    {
      id: "s33-subprocess-module",
      stageId: "stage-33",
      title: "The subprocess Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Run external commands with subprocess.run",
        "Understand the difference between shell=True and shell=False",
        "Capture stdout/stderr output from subprocesses",
      ],
      prerequisites: ["s33-sys-module"],
      concepts: ["subprocess-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The `subprocess` Module\n\n`subprocess` lets Python scripts launch external programs and interact with their input/output. It replaces older functions like `os.system`.",
        },
        {
          kind: "code",
          language: "python",
          code: `import subprocess

# Run a command; check=True raises on non-zero exit
result = subprocess.run(['ls', '-la'], check=True)

# Capture output
result = subprocess.run(
    ['git', 'log', '--oneline', '-5'],
    capture_output=True,
    text=True,       # decode bytes to str
    check=True,
)
print(result.stdout)
print(result.returncode)  # 0 = success`,
          caption: "subprocess.run basics",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Prefer lists over shell strings",
          body: "Pass commands as a list `['git', 'log']` rather than a single string. This avoids shell injection vulnerabilities and unexpected shell expansion.",
        },
        {
          kind: "why-matters",
          body: "Python scripts often need to call system tools — git, compilers, database CLIs, cloud CLIs. `subprocess` is the correct, safe way to do this.",
        },
      ],
      interactions: [
        {
          id: "s33-subprocess-mc1",
          kind: "multiple-choice",
          prompt: "Which subprocess.run argument makes it raise an exception when the command exits with a non-zero code?",
          beginnerPurpose: "Learn how to detect subprocess failures automatically",
          expectedConceptIds: ["subprocess-module"],
          options: [
            { id: "a", text: "check=True", isCorrect: true, explanation: "check=True raises subprocess.CalledProcessError on non-zero exit codes." },
            { id: "b", text: "capture_output=True", isCorrect: false, explanation: "capture_output captures stdout/stderr; it does not raise on failure." },
            { id: "c", text: "text=True", isCorrect: false, explanation: "text=True decodes output as a string; it does not affect error handling." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The argument name literally means 'check the return code'." }],
          feedback: { correct: "Correct! check=True raises CalledProcessError on failure.", incorrect: "Look for the argument that causes an exception on non-zero exit." },
        },
        {
          id: "s33-subprocess-fc1",
          kind: "fill-code",
          prompt: "Complete the call to capture the output of 'echo hello' as text:",
          beginnerPurpose: "Practice capturing subprocess output",
          expectedConceptIds: ["subprocess-module"],
          codeTemplate: `import subprocess
r = subprocess.run(['echo', 'hello'], capture_output=True, ___=True)
print(r.stdout.strip())`,
          blanks: [{ placeholder: "___", answer: "text", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The argument that decodes bytes to str is named after text." }],
          feedback: { correct: "Correct! text=True decodes stdout to a Python string.", incorrect: "The argument is 'text'." },
        },
      ],
      reviewHooks: [
        { conceptId: "subprocess-module", recallPrompt: "What does check=True do in subprocess.run?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-subprocess-mc1", "s33-subprocess-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.10 Process creation ───────────────────────────────────────────────
    {
      id: "s33-process-creation",
      stageId: "stage-33",
      title: "Process Creation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand what happens when Python creates a child process",
        "Use subprocess.Popen for long-running processes",
        "Stream output from a long-running child process",
      ],
      prerequisites: ["s33-subprocess-module"],
      concepts: ["subprocess-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Process Creation\n\n`subprocess.run` is a convenience wrapper around `subprocess.Popen`. `Popen` gives you full control: you can write to a process's stdin, read from stdout line-by-line, and communicate asynchronously.",
        },
        {
          kind: "code",
          language: "python",
          code: `import subprocess

# Popen for streaming output
with subprocess.Popen(
    ['ping', '-c', '3', 'localhost'],
    stdout=subprocess.PIPE,
    text=True,
) as proc:
    for line in proc.stdout:
        print(line, end='')   # print each line as it arrives
    proc.wait()               # wait for process to finish

print('Return code:', proc.returncode)`,
          caption: "Streaming output with Popen",
        },
        {
          kind: "mental-model",
          title: "Popen as a Remote Control",
          analogy: "subprocess.run is like pressing a single button on a remote — one action, one result. Popen is the full remote control — you can interact, pause, query the TV's state while it is running.",
          explanation: "Use Popen when you need to interact with a long-running process (stream output, write stdin, check if still alive). Use run for simple one-shot commands.",
        },
        {
          kind: "why-matters",
          body: "Build systems, test runners, and monitoring tools often need to stream output from subprocesses in real time rather than waiting for them to complete.",
        },
      ],
      interactions: [
        {
          id: "s33-popen-mc1",
          kind: "multiple-choice",
          prompt: "When should you prefer subprocess.Popen over subprocess.run?",
          beginnerPurpose: "Understand the use case for Popen",
          expectedConceptIds: ["subprocess-module"],
          options: [
            { id: "a", text: "When you want to stream output line-by-line as it arrives", isCorrect: true, explanation: "Popen lets you read stdout as the process produces it." },
            { id: "b", text: "When you need the command to run faster", isCorrect: false, explanation: "Popen does not speed up the subprocess." },
            { id: "c", text: "When you want to avoid capturing output", isCorrect: false, explanation: "Both Popen and run can operate without capturing output." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about real-time vs. all-at-once output." }],
          feedback: { correct: "Correct! Popen is for streaming and interactive processes.", incorrect: "Popen's advantage is real-time interaction with the process." },
        },
        {
          id: "s33-popen-ple1",
          kind: "plain-language-explain",
          prompt: "Explain in your own words what subprocess.Popen does and when you would use it instead of subprocess.run.",
          beginnerPurpose: "Consolidate understanding of Popen vs run",
          expectedConceptIds: ["subprocess-module"],
          code: `with subprocess.Popen(['tail', '-f', 'log.txt'], stdout=subprocess.PIPE, text=True) as p:
    for line in p.stdout:
        process(line)`,
          keyPointsToHit: [
            "Popen gives a handle to the running process",
            "Useful for streaming output in real time",
            "run is simpler for one-shot commands",
          ],
          sampleAnswer: "subprocess.Popen starts a child process and gives you a handle to interact with it while it runs. You can read stdout line-by-line as the process produces output. subprocess.run is simpler — it waits for the command to finish and returns all output at once. Use Popen when you need streaming or interactivity.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Focus on the real-time streaming advantage of Popen." }],
          feedback: { correct: "Excellent!", incorrect: "Mention real-time streaming and interaction." },
        },
      ],
      reviewHooks: [
        { conceptId: "subprocess-module", recallPrompt: "When would you use Popen instead of subprocess.run?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-popen-mc1", "s33-popen-ple1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.11 Capturing command output ──────────────────────────────────────
    {
      id: "s33-capturing-output",
      stageId: "stage-33",
      title: "Capturing Command Output",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Capture stdout and stderr separately",
        "Combine stdout and stderr with stderr=subprocess.STDOUT",
        "Handle output encoding correctly",
      ],
      prerequisites: ["s33-subprocess-module"],
      concepts: ["subprocess-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Capturing stdout and stderr\n\nWhen a subprocess writes to stdout and stderr, you can capture them separately or merge them. This is useful for logging, testing CLI tools, and parsing command output.",
        },
        {
          kind: "code",
          language: "python",
          code: `import subprocess

# Capture stdout and stderr separately
r = subprocess.run(
    ['python3', '-c', 'import sys; print("out"); print("err", file=sys.stderr)'],
    capture_output=True,
    text=True,
)
print('STDOUT:', r.stdout)   # out
print('STDERR:', r.stderr)   # err

# Merge stderr into stdout
r2 = subprocess.run(
    ['ls', '/nonexistent'],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,   # merge into stdout
    text=True,
)
print(r2.stdout)   # error message appears in stdout`,
          caption: "Capturing and merging streams",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "capture_output=True shorthand",
          body: "`capture_output=True` is equivalent to `stdout=subprocess.PIPE, stderr=subprocess.PIPE`. It is available from Python 3.7+.",
        },
        {
          kind: "why-matters",
          body: "CI systems and test harnesses need to capture both stdout and stderr to report failures accurately. Understanding the difference prevents hard-to-debug issues where error messages disappear.",
        },
      ],
      interactions: [
        {
          id: "s33-capture-mc1",
          kind: "multiple-choice",
          prompt: "Which argument makes stderr appear in r.stdout instead of r.stderr?",
          beginnerPurpose: "Learn how to merge stderr into stdout",
          expectedConceptIds: ["subprocess-module"],
          options: [
            { id: "a", text: "stderr=subprocess.STDOUT", isCorrect: true, explanation: "This redirects stderr into the stdout pipe." },
            { id: "b", text: "merge_streams=True", isCorrect: false, explanation: "merge_streams is not a real argument." },
            { id: "c", text: "capture_output=True", isCorrect: false, explanation: "capture_output=True captures them separately." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "stderr= can be set to the constant subprocess.STDOUT." }],
          feedback: { correct: "Correct! stderr=subprocess.STDOUT merges the streams.", incorrect: "Use subprocess.STDOUT as the value of the stderr= argument." },
        },
        {
          id: "s33-capture-fc1",
          kind: "fill-code",
          prompt: "Complete the code to capture both stdout and stderr as text strings:",
          beginnerPurpose: "Practice using capture_output and text together",
          expectedConceptIds: ["subprocess-module"],
          codeTemplate: `import subprocess
r = subprocess.run(['echo', 'hi'], ___=True, text=True)
print(r.stdout)`,
          blanks: [{ placeholder: "___", answer: "capture_output", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The shorthand for PIPE+PIPE is capture_output." }],
          feedback: { correct: "Correct! capture_output=True captures both streams.", incorrect: "The argument is capture_output." },
        },
      ],
      reviewHooks: [
        { conceptId: "subprocess-module", recallPrompt: "How do you merge stderr into stdout in subprocess.run?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-capture-mc1", "s33-capture-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.12 Return codes ───────────────────────────────────────────────────
    {
      id: "s33-return-codes",
      stageId: "stage-33",
      title: "Return Codes from Subprocesses",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Read subprocess.returncode to determine success or failure",
        "Distinguish different non-zero codes for different failure modes",
        "Use check=True to raise automatically on failure",
      ],
      prerequisites: ["s33-capturing-output"],
      concepts: ["subprocess-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Return Codes\n\nEvery process exits with a numeric **return code** (also called exit code). By convention:\n- **0** = success\n- **Non-zero** = failure (different values indicate different errors)\n\nAlways check the return code when correctness matters.",
        },
        {
          kind: "code",
          language: "python",
          code: `import subprocess

r = subprocess.run(['grep', 'pattern', 'file.txt'])
if r.returncode == 0:
    print('Pattern found')
elif r.returncode == 1:
    print('Pattern not found')
else:
    print('Error occurred')

# Or let Python raise automatically
try:
    subprocess.run(['false'], check=True)
except subprocess.CalledProcessError as e:
    print(f'Command failed with code {e.returncode}')`,
          caption: "Checking return codes",
        },
        {
          kind: "callout",
          variant: "info",
          title: "grep exit codes",
          body: "`grep` returns 0 if a match is found, 1 if no match, and 2 on an error. Many Unix tools follow similar conventions with documented exit codes.",
        },
        {
          kind: "why-matters",
          body: "Shell scripts and orchestration tools use exit codes to branch on success or failure. If you ignore return codes, your automation may silently succeed even when something went wrong.",
        },
      ],
      interactions: [
        {
          id: "s33-retcode-po1",
          kind: "predict-output",
          prompt: "What does this print when 'pattern' is not found in the file?",
          beginnerPurpose: "Understand grep return codes",
          expectedConceptIds: ["subprocess-module"],
          code: `import subprocess
r = subprocess.run(['grep', 'zzznotfound', 'setup.py'])
print(r.returncode)`,
          expectedOutput: "1",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "grep exits with 1 when no lines match the pattern." }],
          feedback: { correct: "Correct! grep returns 1 when no match is found.", incorrect: "grep returns 1 for no-match (not an error — just no results)." },
        },
        {
          id: "s33-retcode-mc1",
          kind: "multiple-choice",
          prompt: "What exception does subprocess.run raise when check=True and the command exits with code 2?",
          beginnerPurpose: "Know which exception to catch for subprocess failures",
          expectedConceptIds: ["subprocess-module"],
          options: [
            { id: "a", text: "subprocess.CalledProcessError", isCorrect: true, explanation: "CalledProcessError is raised for any non-zero exit code when check=True." },
            { id: "b", text: "OSError", isCorrect: false, explanation: "OSError is raised when the executable cannot be found, not for non-zero exit codes." },
            { id: "c", text: "ValueError", isCorrect: false, explanation: "ValueError is not raised for subprocess failures." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The exception name describes a process that was called and returned an error." }],
          feedback: { correct: "Correct! CalledProcessError carries the returncode, stdout, and stderr.", incorrect: "The exception is subprocess.CalledProcessError." },
        },
      ],
      reviewHooks: [
        { conceptId: "subprocess-module", recallPrompt: "What return code indicates success? What does non-zero mean?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-retcode-po1", "s33-retcode-mc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.13 Shell injection risks ─────────────────────────────────────────
    {
      id: "s33-shell-injection",
      stageId: "stage-33",
      title: "Shell Injection Risks",
      kind: "debugging",
      difficulty: "intermediate",
      objectives: [
        "Explain why shell=True is dangerous with untrusted input",
        "Prevent injection by using a list of arguments instead of a shell string",
        "Sanitize inputs when shell=True is unavoidable",
      ],
      prerequisites: ["s33-subprocess-module"],
      concepts: ["subprocess-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Shell Injection\n\nWhen you use `shell=True` and build the command string from user input, an attacker can inject arbitrary shell commands.",
        },
        {
          kind: "comparison",
          leftLabel: "Vulnerable (shell=True)",
          rightLabel: "Safe (list, no shell)",
          leftCode: `# BAD: user controls 'filename'
filename = "file.txt; rm -rf /"
cmd = f"cat {filename}"
subprocess.run(cmd, shell=True)
# rm -rf / runs!`,
          rightCode: `# GOOD: list bypasses shell
filename = "file.txt; rm -rf /"
subprocess.run(['cat', filename])
# 'cat' gets the literal string — no shell`,
          caption: "Always prefer list arguments",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never use shell=True with user-supplied data",
          body: "If you must use shell=True, validate and sanitize the input using `shlex.quote()`. Better yet, redesign to avoid shell=True entirely.",
        },
        {
          kind: "why-matters",
          body: "Shell injection is a critical security vulnerability. Attackers can run arbitrary commands on your server if you build shell strings from untrusted input. This class of bug has led to many real-world breaches.",
        },
      ],
      interactions: [
        {
          id: "s33-inject-mc1",
          kind: "multiple-choice",
          prompt: "Which subprocess call is vulnerable to shell injection?",
          beginnerPurpose: "Identify the dangerous pattern",
          expectedConceptIds: ["subprocess-module"],
          options: [
            { id: "a", text: "subprocess.run(['cat', user_file])", isCorrect: false, explanation: "Lists bypass the shell; no injection is possible." },
            { id: "b", text: "subprocess.run(f'cat {user_file}', shell=True)", isCorrect: true, explanation: "String interpolation + shell=True enables injection." },
            { id: "c", text: "subprocess.run(['cat', shlex.quote(user_file)])", isCorrect: false, explanation: "shlex.quote escapes special characters, and a list is used — safe." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Look for shell=True combined with user-controlled input embedded in the string." }],
          feedback: { correct: "Correct! String + shell=True is the dangerous combination.", incorrect: "Injection requires shell=True AND user input embedded in the string." },
        },
        {
          id: "s33-inject-debug1",
          kind: "debug-code",
          prompt: "This code is vulnerable to shell injection. Fix it to be safe.",
          beginnerPurpose: "Practice converting a vulnerable call to a safe one",
          expectedConceptIds: ["subprocess-module"],
          brokenCode: `import subprocess
filename = input("File: ")
subprocess.run(f"wc -l {filename}", shell=True)`,
          bugDescription: "shell=True with user input enables shell injection",
          fixedCode: `import subprocess
filename = input("File: ")
subprocess.run(["wc", "-l", filename])`,
          errorType: "security",
          allowedAttempts: 4,
          hints: [
            { level: "concept", text: "Switch from a format string to a list of arguments." },
            { level: "syntax", text: "Remove shell=True and split the command into a list." },
          ],
          feedback: { correct: "Fixed! Using a list bypasses the shell entirely.", incorrect: "Convert the command string into a list and remove shell=True." },
        },
      ],
      reviewHooks: [
        { conceptId: "subprocess-module", recallPrompt: "Why is subprocess.run with shell=True dangerous?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-inject-mc1", "s33-inject-debug1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.14 signal module ──────────────────────────────────────────────────
    {
      id: "s33-signal-module",
      stageId: "stage-33",
      title: "The signal Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Register signal handlers with signal.signal",
        "Handle SIGINT for graceful shutdown on Ctrl-C",
        "Understand which signals are commonly used",
      ],
      prerequisites: ["s33-process-creation"],
      concepts: ["signal-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The `signal` Module\n\nOperating systems send **signals** to processes to notify them of events. Python's `signal` module lets you register handler functions that run when a signal arrives.",
        },
        {
          kind: "code",
          language: "python",
          code: `import signal
import sys

def handle_sigint(signum, frame):
    print('\\nShutting down gracefully...')
    # Clean up resources here
    sys.exit(0)

# Register the handler for Ctrl-C
signal.signal(signal.SIGINT, handle_sigint)

print('Running... press Ctrl-C to stop')
while True:
    pass  # do work`,
          caption: "Graceful SIGINT handling",
        },
        {
          kind: "glossary-term",
          term: "Signal",
          definition: "An asynchronous notification sent by the OS to a process. Common signals: SIGINT (Ctrl-C), SIGTERM (graceful stop), SIGKILL (force stop).",
          example: "signal.signal(signal.SIGTERM, cleanup_handler)",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "SIGKILL cannot be caught",
          body: "`SIGKILL` (kill -9) immediately terminates the process and cannot be caught or ignored. Design graceful shutdown for `SIGTERM` instead.",
        },
        {
          kind: "why-matters",
          body: "Long-running servers and daemons must handle SIGTERM gracefully — flushing buffers, closing database connections, and finishing in-flight requests before exiting.",
        },
      ],
      interactions: [
        {
          id: "s33-signal-mc1",
          kind: "multiple-choice",
          prompt: "Which signal is sent when the user presses Ctrl-C?",
          beginnerPurpose: "Know the most commonly handled signal",
          expectedConceptIds: ["signal-module"],
          options: [
            { id: "a", text: "SIGTERM", isCorrect: false, explanation: "SIGTERM is the graceful termination signal, typically sent by process managers." },
            { id: "b", text: "SIGKILL", isCorrect: false, explanation: "SIGKILL force-stops the process; it is not sent by Ctrl-C." },
            { id: "c", text: "SIGINT", isCorrect: true, explanation: "SIGINT (interrupt) is sent to the foreground process when the user presses Ctrl-C." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The signal name for 'interrupt' from the keyboard." }],
          feedback: { correct: "Correct! SIGINT is the interrupt signal from Ctrl-C.", incorrect: "Ctrl-C sends the INTerrupt signal." },
        },
        {
          id: "s33-signal-fc1",
          kind: "fill-code",
          prompt: "Complete the code to register a handler for SIGTERM:",
          beginnerPurpose: "Practice registering signal handlers",
          expectedConceptIds: ["signal-module"],
          codeTemplate: `import signal
def shutdown(signum, frame):
    print('Stopping...')

signal.___(signal.SIGTERM, shutdown)`,
          blanks: [{ placeholder: "___", answer: "signal", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "signal.signal(SIGNUM, handler) registers the handler." }],
          feedback: { correct: "Correct! signal.signal registers the handler function.", incorrect: "The function to register a handler is signal.signal()." },
        },
      ],
      reviewHooks: [
        { conceptId: "signal-module", recallPrompt: "How do you register a graceful Ctrl-C handler in Python?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-signal-mc1", "s33-signal-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.15 atexit module ──────────────────────────────────────────────────
    {
      id: "s33-atexit-module",
      stageId: "stage-33",
      title: "The atexit Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Register cleanup functions with atexit.register",
        "Understand when atexit handlers run and when they do not",
      ],
      prerequisites: ["s33-signal-module"],
      concepts: ["atexit-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `atexit` — Register Exit Handlers\n\n`atexit.register()` schedules a function to run when the Python interpreter exits normally. This is simpler than signal handling for routine cleanup.",
        },
        {
          kind: "code",
          language: "python",
          code: `import atexit

def cleanup():
    print('Cleanup: closing resources')
    # close database, flush logs, etc.

atexit.register(cleanup)

# You can also register with arguments
def save_state(filename):
    print(f'Saving state to {filename}')

atexit.register(save_state, 'state.json')

print('Program running...')
# cleanup() and save_state('state.json') run when the program exits`,
          caption: "atexit registration",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "atexit does not run on SIGKILL or os._exit",
          body: "atexit handlers only run on normal interpreter exit (end of script, sys.exit). They do NOT run if the process is killed with SIGKILL or if `os._exit()` is called directly.",
        },
        {
          kind: "why-matters",
          body: "atexit is perfect for lightweight cleanup — flushing log buffers, printing a final summary, or releasing temporary files — without needing a try/finally throughout your code.",
        },
      ],
      interactions: [
        {
          id: "s33-atexit-mc1",
          kind: "multiple-choice",
          prompt: "When does an atexit handler NOT run?",
          beginnerPurpose: "Know the limits of atexit",
          expectedConceptIds: ["atexit-module"],
          options: [
            { id: "a", text: "When sys.exit() is called", isCorrect: false, explanation: "sys.exit() triggers atexit handlers." },
            { id: "b", text: "When the script ends normally", isCorrect: false, explanation: "Normal script end triggers atexit handlers." },
            { id: "c", text: "When the process receives SIGKILL", isCorrect: true, explanation: "SIGKILL immediately terminates the process; no handlers run." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which kill signal is unblockable and gives the process no chance to run code?" }],
          feedback: { correct: "Correct! SIGKILL is unblockable — atexit handlers never get a chance to run.", incorrect: "atexit handlers run on normal exit and sys.exit(), but not on SIGKILL." },
        },
        {
          id: "s33-atexit-po1",
          kind: "predict-output",
          prompt: "What does this program print (in order)?",
          beginnerPurpose: "Understand when atexit runs relative to program logic",
          expectedConceptIds: ["atexit-module"],
          code: `import atexit
atexit.register(lambda: print('bye'))
print('hello')`,
          expectedOutput: "hello\nbye",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "The atexit handler runs after the script body completes." }],
          feedback: { correct: "Correct! 'hello' prints first, then atexit runs 'bye' on exit.", incorrect: "atexit handlers run after the normal program code finishes." },
        },
      ],
      reviewHooks: [
        { conceptId: "atexit-module", recallPrompt: "What does atexit.register do and when does it NOT fire?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-atexit-mc1", "s33-atexit-po1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.16 tempfile module ────────────────────────────────────────────────
    {
      id: "s33-tempfile-module",
      stageId: "stage-33",
      title: "The tempfile Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create temporary files that auto-delete with NamedTemporaryFile",
        "Create temporary directories with TemporaryDirectory",
        "Understand when to use mkstemp vs NamedTemporaryFile",
      ],
      prerequisites: ["s33-pathlib"],
      concepts: ["tempfile-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `tempfile` — Safe Temporary Files\n\nThe `tempfile` module creates temporary files and directories in a safe, cross-platform way. The OS assigns unique names, preventing collisions and race conditions.",
        },
        {
          kind: "code",
          language: "python",
          code: `import tempfile

# Temporary file — auto-deleted when context exits
with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=True) as f:
    f.write('temporary data')
    print(f.name)   # /tmp/tmpabc123.txt
# file is deleted here

# Temporary directory — auto-deleted with all contents
with tempfile.TemporaryDirectory() as tmpdir:
    print(tmpdir)   # /tmp/tmpXYZabc
    # create files inside tmpdir
# directory and all contents deleted here`,
          caption: "NamedTemporaryFile and TemporaryDirectory",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use delete=False for debugging",
          body: "Set `delete=False` on `NamedTemporaryFile` if you want to inspect the temp file after the context exits. Remember to delete it manually later.",
        },
        {
          kind: "why-matters",
          body: "Test suites, data pipelines, and compilers frequently need scratch space. Using `tempfile` instead of hardcoded paths prevents collisions when multiple instances run simultaneously.",
        },
      ],
      interactions: [
        {
          id: "s33-tempfile-mc1",
          kind: "multiple-choice",
          prompt: "When does a NamedTemporaryFile with default settings get deleted?",
          beginnerPurpose: "Understand the lifetime of a temp file",
          expectedConceptIds: ["tempfile-module"],
          options: [
            { id: "a", text: "When the Python script ends", isCorrect: false, explanation: "With default settings (delete=True), it deletes when the context manager exits, not necessarily when the script ends." },
            { id: "b", text: "When the 'with' block exits", isCorrect: true, explanation: "With delete=True (default), the file is deleted when the context manager's __exit__ is called." },
            { id: "c", text: "When garbage collection runs", isCorrect: false, explanation: "Deletion is tied to the context manager exit, not GC." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "NamedTemporaryFile is a context manager — think about when __exit__ runs." }],
          feedback: { correct: "Correct! The file is deleted when the with block exits.", incorrect: "The context manager controls when deletion happens." },
        },
        {
          id: "s33-tempfile-fc1",
          kind: "fill-code",
          prompt: "Complete the code to create a temporary directory that auto-cleans up:",
          beginnerPurpose: "Practice using TemporaryDirectory",
          expectedConceptIds: ["tempfile-module"],
          codeTemplate: `import tempfile
with tempfile.___ () as tmpdir:
    print(tmpdir)`,
          blanks: [{ placeholder: "___", answer: "TemporaryDirectory", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The class for temporary directories is TemporaryDirectory." }],
          feedback: { correct: "Correct!", incorrect: "The class is tempfile.TemporaryDirectory()." },
        },
      ],
      reviewHooks: [
        { conceptId: "tempfile-module", recallPrompt: "How do you create a temp directory that auto-deletes in Python?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-tempfile-mc1", "s33-tempfile-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.17 resource module ────────────────────────────────────────────────
    {
      id: "s33-resource-module",
      stageId: "stage-33",
      title: "The resource Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Query process resource limits with resource.getrlimit",
        "Set limits to constrain memory or file descriptors",
        "Know when resource limits are useful",
      ],
      prerequisites: ["s33-sys-module"],
      concepts: ["resource-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The `resource` Module\n\nThe `resource` module (Unix only) allows querying and setting limits on resources like memory, CPU time, and open file descriptors for the current process.",
        },
        {
          kind: "code",
          language: "python",
          code: `import resource

# Get current memory limit (soft, hard)
soft, hard = resource.getrlimit(resource.RLIMIT_AS)
print(f'Memory limit: {soft} / {hard}')

# Limit memory to 512 MB
MB = 1024 * 1024
resource.setrlimit(resource.RLIMIT_AS, (512 * MB, hard))

# Limit open file descriptors
soft_fd, hard_fd = resource.getrlimit(resource.RLIMIT_NOFILE)
print(f'Open files: {soft_fd} / {hard_fd}')`,
          caption: "Reading and setting resource limits",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Unix-only",
          body: "The `resource` module is only available on Unix-like systems (Linux, macOS). On Windows, use the `psutil` third-party library for resource monitoring.",
        },
        {
          kind: "why-matters",
          body: "Sandboxed execution environments, test runners, and competitive programming judges use resource limits to prevent runaway processes from consuming all system memory or CPU.",
        },
      ],
      interactions: [
        {
          id: "s33-resource-mc1",
          kind: "multiple-choice",
          prompt: "What does resource.getrlimit return?",
          beginnerPurpose: "Understand the structure of resource limit values",
          expectedConceptIds: ["resource-module"],
          options: [
            { id: "a", text: "A single integer limit", isCorrect: false, explanation: "It returns a tuple, not a single value." },
            { id: "b", text: "A tuple of (soft_limit, hard_limit)", isCorrect: true, explanation: "getrlimit returns (soft, hard) where soft <= hard." },
            { id: "c", text: "A list of all current resource usage values", isCorrect: false, explanation: "That is resource.getrusage, not getrlimit." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Resource limits come in pairs: what the process can request vs the absolute maximum." }],
          feedback: { correct: "Correct! (soft, hard) — soft is the current limit; hard is the ceiling.", incorrect: "getrlimit returns a (soft, hard) tuple." },
        },
        {
          id: "s33-resource-ple1",
          kind: "plain-language-explain",
          prompt: "Explain in plain language what the soft and hard resource limits mean and why there are two.",
          beginnerPurpose: "Understand the two-tier limit design",
          expectedConceptIds: ["resource-module"],
          code: `soft, hard = resource.getrlimit(resource.RLIMIT_NOFILE)
# soft = current limit the process operates under
# hard = ceiling; unprivileged processes cannot raise soft above hard`,
          keyPointsToHit: [
            "Soft limit is what the process currently enforces",
            "Hard limit is the ceiling; soft cannot exceed hard",
            "Only root can raise the hard limit",
          ],
          sampleAnswer: "The soft limit is the effective limit the process operates under right now. The hard limit is the ceiling — a normal process can raise its soft limit up to the hard limit, but cannot exceed it. Only root (superuser) can raise the hard limit. This two-tier design allows programs to self-impose stricter limits without permanently raising them.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think of soft as the current setting and hard as the maximum allowed." }],
          feedback: { correct: "Excellent explanation!", incorrect: "Cover the soft=current limit and hard=ceiling distinction." },
        },
      ],
      reviewHooks: [
        { conceptId: "resource-module", recallPrompt: "What is the difference between a soft and hard resource limit?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-resource-mc1", "s33-resource-ple1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.18 Filesystem automation project ─────────────────────────────────
    {
      id: "s33-filesystem-automation",
      stageId: "stage-33",
      title: "Filesystem Automation Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Build a script that scans a directory and organizes files by extension",
        "Use pathlib, shutil, and glob together",
        "Add logging and graceful error handling",
      ],
      prerequisites: ["s33-pathlib", "s33-shutil-module", "s33-glob-module"],
      concepts: ["os-module", "pathlib-paths", "shutil-module", "glob-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Filesystem Automation Project\n\nBring together `pathlib`, `shutil`, and `glob` to build a file organizer that sorts files in a messy directory into subdirectories by extension.",
        },
        {
          kind: "code",
          language: "python",
          code: `from pathlib import Path
import shutil

def organize(source: Path, dest: Path) -> None:
    dest.mkdir(parents=True, exist_ok=True)
    for item in source.iterdir():
        if item.is_file():
            ext = item.suffix.lstrip('.') or 'misc'
            target_dir = dest / ext
            target_dir.mkdir(exist_ok=True)
            shutil.move(str(item), target_dir / item.name)
            print(f'Moved {item.name} -> {ext}/')

if __name__ == '__main__':
    import sys
    organize(Path(sys.argv[1]), Path(sys.argv[2]))`,
          caption: "File organizer script",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Test with a temp directory",
          body: "Use `tempfile.TemporaryDirectory()` in your tests so the organizer can safely move real files without touching your actual data.",
        },
        {
          kind: "why-matters",
          body: "File automation scripts are a practical and common use of Python. This project exercises the entire OS interface toolkit you learned in this stage.",
        },
      ],
      interactions: [
        {
          id: "s33-fsauto-mc1",
          kind: "multiple-choice",
          prompt: "Which method iterates over all items (files and dirs) directly inside a Path?",
          beginnerPurpose: "Know the right pathlib iteration method",
          expectedConceptIds: ["pathlib-paths"],
          options: [
            { id: "a", text: "p.listdir()", isCorrect: false, explanation: "listdir is an os function, not a Path method." },
            { id: "b", text: "p.iterdir()", isCorrect: true, explanation: "Path.iterdir() yields Path objects for each item in the directory." },
            { id: "c", text: "p.scandir()", isCorrect: false, explanation: "scandir is in the os module, not pathlib." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The pathlib method name starts with 'iter'." }],
          feedback: { correct: "Correct! Path.iterdir() yields directory contents.", incorrect: "The pathlib method is .iterdir()." },
        },
        {
          id: "s33-fsauto-rc1",
          kind: "run-code",
          prompt: "Write a function that returns all .py files in a given directory as a sorted list of Path objects.",
          beginnerPurpose: "Practice combining pathlib and glob",
          expectedConceptIds: ["pathlib-paths"],
          starterCode: `from pathlib import Path

def list_python_files(directory: str) -> list:
    p = Path(directory)
    # your code here
    pass

# Test
import tempfile, os
with tempfile.TemporaryDirectory() as d:
    Path(d, 'a.py').touch()
    Path(d, 'b.py').touch()
    Path(d, 'c.txt').touch()
    result = list_python_files(d)
    print([f.name for f in result])`,
          task: "Implement list_python_files to return sorted .py file Paths",
          expectedOutputContains: ["a.py", "b.py"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "Use Path.glob('*.py') to find Python files." },
            { level: "syntax", text: "Wrap the result in sorted() to sort by path." },
          ],
          feedback: { correct: "Excellent! You combined pathlib and glob correctly.", incorrect: "Use p.glob('*.py') and sort the results." },
        },
      ],
      reviewHooks: [
        { conceptId: "pathlib-paths", recallPrompt: "How do you list and filter files by extension with pathlib?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-fsauto-mc1", "s33-fsauto-rc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 33.19 Process orchestration project ─────────────────────────────────
    {
      id: "s33-process-orchestration",
      stageId: "stage-33",
      title: "Process Orchestration Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Build a script that runs multiple subprocesses in sequence",
        "Check return codes and abort on failure",
        "Log subprocess output and capture errors",
      ],
      prerequisites: ["s33-return-codes", "s33-capturing-output", "s33-shell-injection"],
      concepts: ["subprocess-module", "os-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Process Orchestration Project\n\nBuild a lightweight CI runner that executes a series of shell commands (lint, test, build) and reports success or failure for each step.",
        },
        {
          kind: "code",
          language: "python",
          code: `import subprocess
import sys

STEPS = [
    ('Lint',  ['python', '-m', 'flake8', 'src/']),
    ('Test',  ['python', '-m', 'pytest', '-q']),
    ('Build', ['python', '-m', 'build']),
]

def run_steps(steps: list) -> bool:
    for name, cmd in steps:
        print(f'--- {name} ---')
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.stdout:
            print(result.stdout)
        if result.returncode != 0:
            print(f'FAILED: {name}', file=sys.stderr)
            print(result.stderr, file=sys.stderr)
            return False
    return True

if run_steps(STEPS):
    print('All steps passed!')
    sys.exit(0)
else:
    sys.exit(1)`,
          caption: "Simple CI pipeline runner",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Real CI runners work similarly",
          body: "GitHub Actions, Jenkins, and other CI tools are essentially more sophisticated versions of this pattern — running commands in sequence, checking exit codes, and reporting results.",
        },
        {
          kind: "why-matters",
          body: "Understanding how to orchestrate processes in Python demystifies CI/CD pipelines and gives you the power to build custom automation for any workflow.",
        },
      ],
      interactions: [
        {
          id: "s33-orch-mc1",
          kind: "multiple-choice",
          prompt: "In the pipeline runner above, what happens when a step fails (non-zero return code)?",
          beginnerPurpose: "Trace control flow on subprocess failure",
          expectedConceptIds: ["subprocess-module"],
          options: [
            { id: "a", text: "The pipeline continues to the next step", isCorrect: false, explanation: "The function returns False immediately on failure." },
            { id: "b", text: "The function returns False and stops processing further steps", isCorrect: true, explanation: "The early return False means no further steps run." },
            { id: "c", text: "An exception is raised", isCorrect: false, explanation: "check=True is not used here, so no exception is raised." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Trace what happens when returncode != 0: there is a return statement." }],
          feedback: { correct: "Correct! The early return stops the pipeline.", incorrect: "Follow the code: when returncode != 0, the function returns False." },
        },
        {
          id: "s33-orch-ple1",
          kind: "plain-language-explain",
          prompt: "Explain how the run_steps function implements a simple CI pipeline. What does it do when a step fails?",
          beginnerPurpose: "Consolidate understanding of the orchestration pattern",
          expectedConceptIds: ["subprocess-module"],
          code: `def run_steps(steps):
    for name, cmd in steps:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            return False
    return True`,
          keyPointsToHit: [
            "Iterates over steps in order",
            "Checks return code after each step",
            "Returns False and stops on first failure",
            "Returns True only if all steps succeed",
          ],
          sampleAnswer: "run_steps iterates over each (name, command) pair and runs it with subprocess.run. After each step it checks the return code — 0 means success, non-zero means failure. If any step fails, the function immediately returns False and no further steps run. If all steps succeed, it returns True.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Describe the loop, the return code check, and the early exit." }],
          feedback: { correct: "Excellent explanation!", incorrect: "Describe the loop, the return code check, and the early exit on failure." },
        },
      ],
      reviewHooks: [
        { conceptId: "subprocess-module", recallPrompt: "How do you build a multi-step pipeline that stops on the first failure?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s33-orch-mc1", "s33-orch-ple1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s33-project",
    stageId: "stage-33",
    title: "Filesystem Automation Tool",
    brief:
      "Build a file organization tool that uses os, pathlib, shutil, and subprocess to automate file sorting, directory management, and report generation.",
    requirements: [
      "Accept a source directory and destination directory as CLI arguments via sys.argv",
      "Scan the source with pathlib and organize files by extension into subdirectories",
      "Create a zip archive of the organized output using shutil.make_archive",
      "Run an optional post-processing shell command and check its return code",
      "Handle errors gracefully: missing paths, permission errors, and failed subprocesses",
      "Add type annotations to all public functions",
    ],
    acceptanceCriteria: [
      "Files are moved into correctly named extension subdirectories",
      "A zip archive is created at the specified output path",
      "Script exits with code 0 on success and 1 on failure",
      "Type annotations are present and accurate",
    ],
    conceptIds: ["os-module", "pathlib-paths", "shutil-module", "subprocess-module"],
    difficulty: "intermediate",
  },
} satisfies Stage;
