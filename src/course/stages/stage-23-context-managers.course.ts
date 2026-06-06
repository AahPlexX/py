import type { Stage } from "@/course/course.schema";

export const stage23 = {
  id: "stage-23",
  number: 23,
  title: "Context Managers and Resource Management",
  summary:
    "Master the with statement and context manager protocol to guarantee resource cleanup even when exceptions occur.",
  level: "intermediate",
  masteryGateConceptIds: ["context-manager"],
  lessons: [
    {
      id: "s23-resource-lifetime",
      stageId: "stage-23",
      title: "Resource Lifetime and the with Statement",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain why resources must be explicitly released",
        "Use the with statement to guarantee cleanup",
        "Identify the enter and exit phases",
      ],
      prerequisites: [],
      concepts: ["context-manager"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Resource Lifetime\n\nA **resource** is anything that must be acquired and released: file handles, database connections, locks, network sockets. If you acquire a resource and then an exception occurs before you release it, the resource **leaks**.\n\nThe `with` statement guarantees the release code runs:\n\n```python\n# Without with — risky\nf = open(\"data.txt\")\ntry:\n    data = f.read()\nfinally:\n    f.close()  # must remember this!\n\n# With with — safe and concise\nwith open(\"data.txt\") as f:\n    data = f.read()\n# f.close() called automatically, even if read() raises\n```",
        },
        {
          kind: "mental-model",
          title: "with as a safety wrapper",
          analogy: "A with block is like a hotel room keycard. Entering the block acquires the resource (checkin). Leaving — whether normally or via exception — releases it (checkout). The hotel guarantees checkout happens.",
          explanation: "__enter__ is called when you enter the with block; __exit__ is called when you leave, no matter how.",
        },
        {
          kind: "why-matters",
          body: "File descriptor leaks, connection pool exhaustion, and deadlocks from unreleased locks are production bugs caused by missing cleanup. The with statement eliminates this class of bugs.",
        },
      ],
      interactions: [
        {
          id: "s23-with-mc",
          kind: "multiple-choice",
          prompt: "Code inside a with block raises an exception. Does __exit__ get called?",
          beginnerPurpose: "Confirm with guarantees cleanup",
          expectedConceptIds: ["context-manager"],
          options: [
            { id: "a", text: "Yes, __exit__ is always called", isCorrect: true, explanation: "Correct! __exit__ is called whether the block exits normally or via exception." },
            { id: "b", text: "No, exceptions skip __exit__", isCorrect: false, explanation: "The whole point of context managers is that __exit__ runs even on exceptions." },
            { id: "c", text: "Only if you add except:", isCorrect: false, explanation: "No except needed — __exit__ is automatically called by the with machinery." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The with statement is essentially a try/finally around __exit__." }],
          feedback: { correct: "Correct! __exit__ always runs — that's the guarantee.", incorrect: "__exit__ always runs, making with equivalent to try/finally." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s23-with-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s23-contextmanager-decorator",
      stageId: "stage-23",
      title: "contextlib.contextmanager",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use @contextmanager to write a context manager as a generator",
        "Place the yield between setup and teardown code",
        "Handle exceptions in contextmanager generators",
      ],
      prerequisites: ["s23-resource-lifetime"],
      concepts: ["context-manager"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## @contextlib.contextmanager\n\nWriting a class with `__enter__` and `__exit__` is verbose. The `@contextmanager` decorator lets you write a context manager as a simple generator:\n\n```python\nfrom contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timer(label: str):\n    start = time.perf_counter()\n    yield  # control passes to the with block here\n    elapsed = time.perf_counter() - start\n    print(f\"{label}: {elapsed:.3f}s\")\n\nwith timer(\"processing\"):\n    sum(range(1_000_000))\n# processing: 0.021s\n```\n\nEverything before `yield` is `__enter__`. Everything after `yield` is `__exit__`. The yielded value becomes the `as` variable.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Handle exceptions in @contextmanager",
          body: "If the with block raises, the exception is thrown into the generator at the yield point. Use try/finally in your generator to ensure teardown runs.",
        },
        {
          kind: "code",
          language: "python",
          code: "from contextlib import contextmanager\n\n@contextmanager\ndef managed_resource():\n    resource = acquire()\n    try:\n        yield resource\n    finally:\n        release(resource)  # always runs",
          caption: "Safe pattern: try/finally around yield",
        },
      ],
      interactions: [
        {
          id: "s23-cm-fill",
          kind: "fill-code",
          prompt: "Complete the context manager that temporarily changes the working directory.",
          beginnerPurpose: "Apply @contextmanager pattern",
          expectedConceptIds: ["context-manager"],
          codeTemplate: "from contextlib import contextmanager\nimport os\n\n@contextmanager\ndef cd(path: str):\n    old = os.getcwd()\n    os.chdir(path)\n    try:\n        _____\n    finally:\n        os.chdir(old)",
          blanks: [{ placeholder: "_____", answer: "yield", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The yield goes between setup (os.chdir) and teardown (os.chdir back)." }],
          feedback: { correct: "Correct! yield is the dividing line between enter and exit.", incorrect: "Use 'yield' between setup and teardown." },
        },
        {
          id: "s23-cm-predict",
          kind: "predict-output",
          prompt: "What does this print? (assume no exceptions)",
          beginnerPurpose: "Trace contextmanager execution",
          expectedConceptIds: ["context-manager"],
          code: "from contextlib import contextmanager\n\n@contextmanager\ndef demo():\n    print(\"enter\")\n    yield 42\n    print(\"exit\")\n\nwith demo() as v:\n    print(f\"inside: {v}\")",
          expectedOutput: "enter\ninside: 42\nexit",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Before yield = __enter__. Yielded value = as variable. After yield = __exit__." }],
          feedback: { correct: "Correct!", incorrect: "Before yield prints 'enter', yield 42 assigns v=42, after yield prints 'exit'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s23-cm-fill", "s23-cm-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s23-contextlib-utilities",
      stageId: "stage-23",
      title: "contextlib Utilities: suppress, closing, ExitStack",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use contextlib.suppress to ignore specific exceptions",
        "Use contextlib.closing for objects without __exit__",
        "Use contextlib.ExitStack to manage dynamic numbers of resources",
      ],
      prerequisites: ["s23-contextmanager-decorator"],
      concepts: ["context-manager"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## contextlib Utilities\n\n**suppress** — silently ignore specific exception types:\n```python\nfrom contextlib import suppress\nwith suppress(FileNotFoundError):\n    os.remove(\"maybe_exists.tmp\")\n# No error if file doesn't exist\n```\n\n**closing** — wrap objects that have `.close()` but not `__exit__`:\n```python\nfrom contextlib import closing\nwith closing(urllib.request.urlopen(url)) as response:\n    data = response.read()\n```\n\n**ExitStack** — manage a dynamic number of context managers:\n```python\nfrom contextlib import ExitStack\nwith ExitStack() as stack:\n    files = [stack.enter_context(open(f)) for f in filenames]\n    # all files closed when block exits\n```",
        },
        {
          kind: "why-matters",
          body: "ExitStack is essential when the number of resources is determined at runtime (e.g., opening N files from a list). Without it, you'd need nested with statements or manual try/finally chains.",
        },
      ],
      interactions: [
        {
          id: "s23-suppress-mc",
          kind: "multiple-choice",
          prompt: "What does `contextlib.suppress(KeyError)` do?",
          beginnerPurpose: "Use contextlib.suppress",
          expectedConceptIds: ["context-manager"],
          options: [
            { id: "a", text: "Raises KeyError if the block raises any exception", isCorrect: false, explanation: "suppress prevents the exception from propagating, not raises it." },
            { id: "b", text: "Silently ignores KeyError if raised in the block", isCorrect: true, explanation: "Correct! suppress catches the specified exception type and suppresses it." },
            { id: "c", text: "Catches all exceptions", isCorrect: false, explanation: "suppress only catches the specified exception type(s)." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "suppress is a targeted exception swallower for specific types." }],
          feedback: { correct: "Correct! suppress(KeyError) swallows only KeyError.", incorrect: "suppress catches and silences the specified exception type." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s23-suppress-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s23-project",
    stageId: "stage-23",
    title: "Context Manager Project",
    brief:
      "Build a set of reusable context managers: a database connection manager, a file locking manager, and a temporary directory manager. Test that cleanup always runs, even when exceptions occur.",
    requirements: [
      "managed_db_connection() context manager that opens/closes a sqlite3 connection",
      "locked_file() context manager using fcntl or threading.Lock",
      "temp_workspace() that creates a temp dir and deletes it on exit",
      "Each must clean up on both normal and exception exit",
    ],
    acceptanceCriteria: [
      "Connections are always closed after the with block",
      "Locks are always released",
      "Temp directories are always deleted",
    ],
    conceptIds: ["context-manager"],
    difficulty: "intermediate",
  },
} satisfies Stage;
