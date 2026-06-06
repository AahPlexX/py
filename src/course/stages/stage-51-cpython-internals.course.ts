import type { Stage } from "@/course/course.schema";

export const stage51 = {
  id: "stage-51",
  number: 51,
  title: "CPython Internals",
  summary:
    "Understand CPython's bytecode compiler, the evaluation loop, the Global Interpreter Lock, and how Python objects are laid out in memory.",
  level: "advanced",
  masteryGateConceptIds: ["cpython-bytecode", "cpython-gil"],
  lessons: [
    {
      id: "s51-bytecode",
      stageId: "stage-51",
      title: "Bytecode: How Python Compiles and Executes",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain the compile → bytecode → eval loop pipeline",
        "Use dis module to inspect bytecode",
        "Read basic bytecode instructions",
      ],
      prerequisites: [],
      concepts: ["cpython-bytecode"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Python Execution Pipeline\n\n```\nSource code (.py)\n      ↓ compile()\nAST (Abstract Syntax Tree)\n      ↓ compiler\nBytecode (.pyc / code object)\n      ↓ ceval.c\nCPython evaluation loop executes instructions\n```\n\n## Inspecting Bytecode with dis\n\n```python\nimport dis\n\ndef add(a, b):\n    return a + b\n\ndis.dis(add)\n\"\"\"\n  2           0 RESUME               0\n\n  3           2 LOAD_FAST            0 (a)\n              4 LOAD_FAST            1 (b)\n              6 BINARY_OP           0 (+)\n             10 RETURN_VALUE\n\"\"\"\n```\n\nEach instruction:\n- **LOAD_FAST**: push local variable onto the value stack\n- **BINARY_OP**: pop two values, perform operation, push result\n- **RETURN_VALUE**: pop top of stack, return to caller\n\n```python\n# Code objects contain bytecode and metadata\ncode = add.__code__\ncode.co_code          # raw bytecode bytes\ncode.co_varnames      # ('a', 'b')\ncode.co_consts        # (None,)\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Bytecode changes across Python versions",
          body: "Bytecode is an implementation detail of CPython — it changes between versions and is not portable. .pyc files include a magic number (version identifier) so Python recompiles when the version changes.",
        },
      ],
      interactions: [
        {
          id: "s51-bytecode-mc",
          kind: "multiple-choice",
          prompt: "What does LOAD_FAST do in CPython's bytecode?",
          beginnerPurpose: "Read bytecode instructions",
          expectedConceptIds: ["cpython-bytecode"],
          options: [
            { id: "a", text: "Loads a module from disk quickly", isCorrect: false, explanation: "LOAD_FAST loads a local variable onto the value stack — nothing to do with disk." },
            { id: "b", text: "Pushes a local variable's value onto the value stack", isCorrect: true, explanation: "Correct! LOAD_FAST is the fast path for local variable access — direct array index, no dict lookup." },
            { id: "c", text: "Executes a built-in function", isCorrect: false, explanation: "Built-in function calls use CALL_INTRINSIC or CALL instructions. LOAD_FAST is for variables." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "LOAD_FAST loads a *local* variable — 'fast' because locals are indexed arrays, not dicts." }],
          feedback: { correct: "Correct! LOAD_FAST pushes a local variable onto the value stack.", incorrect: "LOAD_FAST pushes a local variable value onto the evaluation stack for use by subsequent instructions." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s51-bytecode-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s51-gil",
      stageId: "stage-51",
      title: "The Global Interpreter Lock (GIL)",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain why the GIL exists",
        "Describe its effect on multi-threaded Python",
        "Know what Python 3.13+ free-threaded mode changes",
      ],
      prerequisites: ["s51-bytecode"],
      concepts: ["cpython-gil"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Global Interpreter Lock\n\nThe GIL is a mutex that protects CPython's internal state. Only one thread can execute Python bytecode at a time:\n\n**Why the GIL exists:**\n- CPython uses reference counting for memory management\n- Without the GIL, multiple threads could simultaneously modify reference counts, causing race conditions and use-after-free bugs\n- The GIL is a pragmatic trade-off: simple implementation, correct behavior, but limited parallelism\n\n**Effects:**\n\n```python\nimport threading\nimport time\n\ndef cpu_work():\n    total = 0\n    for i in range(50_000_000):\n        total += i\n    return total\n\n# Sequential: 5 seconds\n# Parallel with threads: ALSO ~5 seconds (GIL!)\n# Parallel with multiprocessing: ~2.5 seconds (real parallelism)\n```\n\n**GIL is released for:**\n- I/O operations (file, network, sleep)\n- C extensions that explicitly release it (NumPy, hashlib)\n- ctypes calls\n\n**Python 3.13+ free-threaded mode:**\nPEP 703 adds a build option (`--disable-gil`) to run without the GIL. This is experimental but marks the beginning of truly parallel Python.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "I/O releases the GIL",
          body: "When Python calls a blocking I/O function (read, write, socket recv), it releases the GIL before the call and re-acquires it after. This is why threading works well for I/O-bound tasks — threads aren't competing for the GIL while waiting for I/O.",
        },
      ],
      interactions: [
        {
          id: "s51-gil-mc",
          kind: "multiple-choice",
          prompt: "Why doesn't adding more Python threads speed up a CPU-bound computation?",
          beginnerPurpose: "Understand GIL impact",
          expectedConceptIds: ["cpython-gil"],
          options: [
            { id: "a", text: "Python threads are too slow to create", isCorrect: false, explanation: "Thread creation overhead is not the issue. The GIL prevents parallel execution." },
            { id: "b", text: "The GIL allows only one thread to run Python code at a time", isCorrect: true, explanation: "Correct! The GIL serializes Python bytecode execution. More threads don't get more CPU time for Python code." },
            { id: "c", text: "Python threads don't share memory", isCorrect: false, explanation: "Python threads do share memory (unlike processes). The GIL prevents parallel execution." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The GIL is a global lock — only one holder at a time." }],
          feedback: { correct: "Correct! The GIL prevents parallel Python execution.", incorrect: "The GIL serializes Python thread execution — for CPU work, use multiprocessing instead." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s51-gil-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s51-object-model",
      stageId: "stage-51",
      title: "CPython Object Model and Memory Layout",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Describe PyObject_HEAD and its fields",
        "Explain small integer caching and string interning",
        "Understand __slots__ and its memory impact",
      ],
      prerequisites: ["s51-gil"],
      concepts: ["cpython-bytecode"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## PyObject Memory Layout\n\nEvery Python object in memory starts with `PyObject_HEAD`:\n\n```c\ntypedef struct _object {\n    Py_ssize_t ob_refcnt;  /* reference count */\n    PyTypeObject *ob_type; /* pointer to type */\n} PyObject;\n```\n\nAn integer also has `ob_ival` (the C long value). A list adds `ob_size` and `ob_item` (pointer to array).\n\n## Small Integer Caching\n\n```python\na = 256\nb = 256\na is b  # True — same object (CPython caches -5 to 256)\n\nc = 257\nd = 257\nc is d  # False — different objects (outside cache range)\n```\n\n## String Interning\n\n```python\ns1 = 'hello'\ns2 = 'hello'\ns1 is s2  # True — CPython interns short identifier-like strings\n\ns3 = 'hello world'\ns4 = 'hello world'\ns3 is s4  # May be False — strings with spaces not always interned\n```\n\n## __slots__ Saves Memory\n\n```python\nclass WithDict:       # default: __dict__ per instance\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nclass WithSlots:      # no __dict__ — fixed layout\n    __slots__ = ['x', 'y']\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nimport sys\nwith_dict = WithDict(1, 2)\nwith_slots = WithSlots(1, 2)\n# WithSlots uses ~50% less memory per instance\n```",
        },
        {
          kind: "why-matters",
          body: "Understanding CPython's object model explains why `is` checks for small integers work, why strings sometimes share identity, and why __slots__ saves memory. This knowledge prevents subtle bugs and enables informed performance decisions.",
        },
      ],
      interactions: [
        {
          id: "s51-interning-predict",
          kind: "predict-output",
          prompt: "What does this print? (Running in CPython)",
          beginnerPurpose: "Understand integer caching",
          expectedConceptIds: ["cpython-bytecode"],
          code: "a = 100\nb = 100\nprint(a is b)\n\nc = 1000\nd = 1000\nprint(c is d)",
          expectedOutput: "True\nFalse",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "CPython caches integers -5 to 256. 100 is in range; 1000 is not." }],
          feedback: { correct: "Correct! Small integers are cached; large ones are not.", incorrect: "CPython caches -5 to 256. 100 reuses the cached object; 1000 creates new objects each time." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s51-interning-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s51-project",
    stageId: "stage-51",
    title: "CPython Internals Investigation",
    brief:
      "Conduct a systematic investigation of CPython internals: disassemble bytecode for various Python constructs, measure GIL impact on threading vs multiprocessing, analyze object memory layout with __slots__, and document findings.",
    requirements: [
      "dis.dis() analysis of 5 different Python constructs",
      "Benchmark: CPU-bound work with threading vs multiprocessing",
      "Memory measurement: instances with vs without __slots__ (sys.getsizeof)",
      "Integer caching boundary: find the exact cache range",
      "Written analysis explaining the 'why' behind each finding",
    ],
    acceptanceCriteria: [
      "Each finding supported by code evidence and measurement",
      "GIL impact quantified with actual timing numbers",
      "Memory savings from __slots__ measured and explained",
    ],
    conceptIds: ["cpython-bytecode", "cpython-gil"],
    difficulty: "advanced",
  },
} satisfies Stage;
