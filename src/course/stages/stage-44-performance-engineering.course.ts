import type { Stage } from "@/course/course.schema";

export const stage44 = {
  id: "stage-44",
  number: 44,
  title: "Performance Engineering",
  summary:
    "Measure, profile, and optimize Python code using cProfile, line_profiler, Cython, ctypes, and algorithmic improvements to achieve significant speedups.",
  level: "advanced",
  masteryGateConceptIds: ["profiling", "python-optimization"],
  lessons: [
    {
      id: "s44-profiling-first",
      stageId: "stage-44",
      title: "Profile Before Optimizing",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain why profiling must precede optimization",
        "Use timeit for microbenchmarks",
        "Use cProfile to find hotspots in a program",
      ],
      prerequisites: [],
      concepts: ["profiling"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Profile First\n\n> \"Premature optimization is the root of all evil.\" — Donald Knuth\n\nBefore optimizing, measure. The slowest part is rarely where you think:\n\n```python\nimport timeit\n\n# Microbenchmark: compare two approaches\ntime1 = timeit.timeit('\" \".join(str(i) for i in range(100))', number=10000)\ntime2 = timeit.timeit('\" \".join([str(i) for i in range(100)])', number=10000)\nprint(f\"Generator: {time1:.3f}s  List comp: {time2:.3f}s\")\n```\n\n## cProfile\n\n```python\nimport cProfile\n\ndef slow_function():\n    total = 0\n    for i in range(1_000_000):\n        total += i ** 2\n    return total\n\ncProfile.run('slow_function()')\n# Output shows: ncalls, tottime, cumtime per function\n```\n\nRun from the command line: `python -m cProfile -s cumulative myscript.py`",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Sort by cumtime to find the bottleneck",
          body: "cProfile shows 'tottime' (time in function only) and 'cumtime' (including all callees). Sort by cumtime to find the function responsible for the most wall-clock time.",
        },
        {
          kind: "why-matters",
          body: "Experienced engineers waste weeks optimizing the wrong code. One profiling session can show that 90% of time is in a single function that's easy to fix — or that the algorithm needs replacing entirely.",
        },
      ],
      interactions: [
        {
          id: "s44-profile-mc",
          kind: "multiple-choice",
          prompt: "You think `process_records()` is slow. What is the correct first step?",
          beginnerPurpose: "Apply profile-first discipline",
          expectedConceptIds: ["profiling"],
          options: [
            { id: "a", text: "Rewrite it in C immediately", isCorrect: false, explanation: "C rewrites are expensive and often unnecessary. Profile first to confirm it's actually the bottleneck." },
            { id: "b", text: "Profile the program with cProfile to confirm it's the actual bottleneck", isCorrect: true, explanation: "Correct! Confirm the bottleneck before investing optimization effort." },
            { id: "c", text: "Move it to a background thread", isCorrect: false, explanation: "Threading doesn't speed up CPU-bound work due to the GIL, and you haven't confirmed it's the bottleneck." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Don't optimize what you haven't measured." }],
          feedback: { correct: "Correct! Always profile first.", incorrect: "Profile with cProfile before making any optimization decisions." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s44-profile-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s44-python-speedups",
      stageId: "stage-44",
      title: "Pure-Python Optimization Techniques",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Use local variable lookups instead of global/attribute lookups",
        "Apply functools.lru_cache for memoization",
        "Prefer built-in functions and comprehensions over Python loops",
      ],
      prerequisites: ["s44-profiling-first"],
      concepts: ["python-optimization"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Pure-Python Speedups\n\n### 1. Memoization with lru_cache\n\n```python\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n: int) -> int:\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nfib(100)  # instant (vs exponential without cache)\n```\n\n### 2. Prefer built-ins over Python loops\n\n```python\n# Slow: Python loop\ntotal = 0\nfor x in numbers:\n    total += x\n\n# Fast: built-in (implemented in C)\ntotal = sum(numbers)\n\n# Slow: loop with condition\nresult = []\nfor x in data:\n    if x > 0:\n        result.append(x)\n\n# Fast: list comprehension (optimized bytecode)\nresult = [x for x in data if x > 0]\n```\n\n### 3. Local variable lookup is fastest\n\n```python\n# Slow: repeated attribute lookup in loop\nfor i in range(1000000):\n    math.sqrt(i)  # global + attribute lookup each iteration\n\n# Fast: local alias\nsqrt = math.sqrt\nfor i in range(1000000):\n    sqrt(i)  # single local lookup\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Built-ins beat Python loops",
          body: "sum(), max(), min(), map(), filter(), any(), all() are all implemented in C. A Python for-loop over a million items is 10-100x slower than sum(). Always prefer built-ins when they fit.",
        },
      ],
      interactions: [
        {
          id: "s44-speedup-fill",
          kind: "fill-code",
          prompt: "Add memoization to avoid recomputing Fibonacci values.",
          beginnerPurpose: "Apply lru_cache",
          expectedConceptIds: ["python-optimization"],
          codeTemplate: "from functools import lru_cache\n\n@_____(maxsize=None)\ndef fib(n: int) -> int:\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)",
          blanks: [{ placeholder: "_____", answer: "lru_cache", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The decorator for memoization in functools is lru_cache." }],
          feedback: { correct: "Correct! lru_cache memoizes the results.", incorrect: "Use @lru_cache(maxsize=None) to cache all computed results." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s44-speedup-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s44-numpy-vectorization",
      stageId: "stage-44",
      title: "Vectorization with NumPy",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Replace Python loops with NumPy vectorized operations",
        "Understand broadcasting",
        "Measure speedup with timeit",
      ],
      prerequisites: ["s44-python-speedups"],
      concepts: ["python-optimization"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## NumPy Vectorization\n\nNumPy operations execute in C — often 100x faster than Python loops:\n\n```python\nimport numpy as np\nimport timeit\n\n# Python loop: slow\ndef python_sum_squares(n):\n    return sum(i**2 for i in range(n))\n\n# NumPy: fast\ndef numpy_sum_squares(n):\n    arr = np.arange(n)\n    return (arr ** 2).sum()\n\n# NumPy is ~100x faster for large arrays\nt1 = timeit.timeit(lambda: python_sum_squares(100_000), number=10)\nt2 = timeit.timeit(lambda: numpy_sum_squares(100_000), number=10)\nprint(f\"Python: {t1:.3f}s  NumPy: {t2:.3f}s\")\n```\n\n## Broadcasting\n\n```python\narr = np.array([1, 2, 3, 4, 5])\narr * 2          # [2, 4, 6, 8, 10] — no Python loop\narr[arr > 3]    # [4, 5] — boolean indexing\narr + np.array([10, 20, 30, 40, 50])  # element-wise\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Avoid Python loops over NumPy arrays",
          body: "If you find yourself writing `for item in numpy_array`, stop. There's almost always a vectorized NumPy operation that's orders of magnitude faster. Use np.where, np.vectorize, or array operations instead.",
        },
      ],
      interactions: [
        {
          id: "s44-numpy-mc",
          kind: "multiple-choice",
          prompt: "Why is `(np.arange(1000000) ** 2).sum()` much faster than `sum(i**2 for i in range(1000000))`?",
          beginnerPurpose: "Understand vectorization",
          expectedConceptIds: ["python-optimization"],
          options: [
            { id: "a", text: "NumPy uses multiple threads automatically", isCorrect: false, explanation: "Basic NumPy is single-threaded. The speedup comes from C execution, not threading." },
            { id: "b", text: "NumPy executes the math in compiled C code on the whole array at once", isCorrect: true, explanation: "Correct! NumPy operations run in C — no Python interpreter overhead per element." },
            { id: "c", text: "NumPy arrays use less memory than Python lists", isCorrect: false, explanation: "Memory efficiency is a benefit, but the speedup comes from C execution." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Where does NumPy's math actually execute?" }],
          feedback: { correct: "Correct! NumPy executes in C, avoiding Python interpreter overhead.", incorrect: "NumPy operations run as compiled C code — no per-element Python overhead." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s44-numpy-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s44-ctypes-cffi",
      stageId: "stage-44",
      title: "Calling C from Python: ctypes and cffi",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Use ctypes to call functions from a shared library",
        "Pass Python types to C functions",
        "Know when ctypes vs cffi vs Cython is appropriate",
      ],
      prerequisites: ["s44-numpy-vectorization"],
      concepts: ["python-optimization"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## ctypes: Calling C Libraries\n\nctypes lets Python call C shared libraries directly:\n\n```python\nimport ctypes\nimport ctypes.util\n\n# Load the standard C library\nlibc_name = ctypes.util.find_library('c')\nlibc = ctypes.CDLL(libc_name)\n\n# Call C's printf\nlibc.printf(b\"Hello from C!\\n\")\n\n# Call with typed arguments\nlibc.abs.restype = ctypes.c_int\nlibc.abs.argtypes = [ctypes.c_int]\nlibc.abs(-42)  # 42\n```\n\n## Calling a Custom C Library\n\n```python\n# Your C code (compiled to libmath.so):\n# int fast_sum(int* arr, int n) { ... }\n\nlib = ctypes.CDLL('./libmath.so')\nlib.fast_sum.restype = ctypes.c_int\nlib.fast_sum.argtypes = [ctypes.POINTER(ctypes.c_int), ctypes.c_int]\n\narr = (ctypes.c_int * 5)(1, 2, 3, 4, 5)\nresult = lib.fast_sum(arr, 5)  # 15\n```\n\n## Choosing the Right Tool\n\n| Tool | Use when |\n|------|----------|\n| ctypes | Quick FFI, no compilation step |\n| cffi | More Pythonic FFI, better for complex APIs |\n| Cython | Optimize existing Python code with static types |\n| C extension | Maximum control, full CPython API access |",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "cffi is often easier than ctypes",
          body: "cffi lets you paste the C function signature directly from the header file, rather than manually specifying argtypes. For anything beyond simple calls, cffi is more maintainable.",
        },
      ],
      interactions: [
        {
          id: "s44-ctypes-mc",
          kind: "multiple-choice",
          prompt: "You have a hot path in Python that does math on arrays. You want to rewrite just that function in C. Which tool lets you call it from Python without rewriting the whole program?",
          beginnerPurpose: "Choose FFI tools",
          expectedConceptIds: ["python-optimization"],
          options: [
            { id: "a", text: "subprocess — run a C program separately", isCorrect: false, explanation: "subprocess has high per-call overhead. ctypes/cffi call C functions in-process, much faster." },
            { id: "b", text: "ctypes or cffi — call the C function from the same process", isCorrect: true, explanation: "Correct! ctypes and cffi call C library functions directly from Python, in the same process." },
            { id: "c", text: "multiprocessing — run C in a separate process", isCorrect: false, explanation: "Multiprocessing spawns Python processes. ctypes calls C directly with minimal overhead." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Foreign Function Interface (FFI) lets Python call C libraries." }],
          feedback: { correct: "Correct! ctypes/cffi are the FFI tools for calling C from Python.", incorrect: "ctypes and cffi let Python call compiled C code directly, with minimal overhead." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s44-ctypes-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s44-project",
    stageId: "stage-44",
    title: "Performance Optimization Sprint",
    brief:
      "Profile a provided slow Python program, identify its top three bottlenecks, and optimize each using appropriate techniques (algorithmic improvement, lru_cache, NumPy vectorization, or ctypes).",
    requirements: [
      "cProfile run with -s cumtime to identify top 3 bottlenecks",
      "lru_cache applied to recursive/repeated computations",
      "NumPy vectorization for the array-processing bottleneck",
      "Before/after timeit benchmarks for each optimization",
      "Total speedup of at least 10x on the benchmark workload",
    ],
    acceptanceCriteria: [
      "Bottlenecks identified with cProfile evidence",
      "Each optimization has a measured before/after benchmark",
      "Total runtime reduced by at least 10x",
    ],
    conceptIds: ["profiling", "python-optimization"],
    difficulty: "advanced",
  },
} satisfies Stage;
