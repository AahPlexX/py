import type { Stage } from "@/course/course.schema";

export const stage14 = {
  id: "stage-14",
  number: 14,
  title: "Async, Performance, and Concurrency",
  summary:
    "Understand iterators, generators, async/await, I/O-bound vs CPU-bound work, profiling, and caching.",
  level: "advanced",
  masteryGateConceptIds: [
    "iterator",
    "generator",
    "async-await",
    "coroutine",
    "event-loop",
    "io-bound",
    "cpu-bound",
    "profiling",
  ],
  lessons: [
    {
      id: "s14-iterators-generators",
      stageId: "stage-14",
      title: "Iterators and Generators",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain the iterator protocol: __iter__ and __next__",
        "Write generator functions with yield",
        "Use generators for memory-efficient processing",
      ],
      prerequisites: ["s13-date-time-processing"],
      concepts: ["iterator", "generator"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Iterator Protocol\n\nAn **iterator** is any object with `__iter__()` and `__next__()` methods. When Python evaluates `for x in obj:`, it calls `iter(obj)` to get an iterator, then calls `next()` on it repeatedly until `StopIteration` is raised.\n\nA **generator function** uses `yield` instead of `return`. Each time `next()` is called, it resumes from the last `yield` point — making it memory efficient.",
        },
        {
          kind: "code",
          language: "python",
          code: "def count_up(start: int, stop: int):\n    \"\"\"A generator that yields integers from start to stop-1.\"\"\"\n    current = start\n    while current < stop:\n        yield current\n        current += 1\n\n# Only one number in memory at a time\nfor n in count_up(1, 4):\n    print(n)\n\n# Generator expression — like list comprehension but lazy\nbig = (x ** 2 for x in range(1_000_000))  # No memory allocated yet\nprint(next(big))  # 0 — compute just the first one",
          caption: "Generator function and generator expression",
        },
        {
          kind: "output",
          text: "1\n2\n3\n0",
          isError: false,
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Generators are lazy",
          body: "A generator doesn't compute any values until you ask for them. (x**2 for x in range(1_000_000)) uses almost no memory — values are computed one by one as you iterate.",
        },
      ],
      interactions: [
        {
          id: "s14-iter-i1",
          kind: "predict-output",
          prompt: "What does this generator function print?",
          beginnerPurpose: "Trace yield execution step by step",
          expectedConceptIds: ["generator"],
          code: "def letters():\n    yield 'a'\n    yield 'b'\n    yield 'c'\n\nfor ch in letters():\n    print(ch)",
          expectedOutput: "a\nb\nc",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Each yield produces one value, then pauses until next() is called again" }],
          feedback: {
            correct: "Correct! yield produces each letter in sequence.",
            incorrect: "The generator produces 'a', 'b', 'c' one at a time via yield.",
          },
        },
        {
          id: "s14-iter-i2",
          kind: "fill-code",
          prompt: "Complete the generator to yield only even numbers up to n",
          beginnerPurpose: "Practice writing a generator with a condition",
          expectedConceptIds: ["generator"],
          codeTemplate:
            "def evens_up_to(n: int):\n    for i in range(n + 1):\n        if i % 2 == 0:\n            ___BLANK_1___ i\n\nprint(list(evens_up_to(6)))",
          blanks: [
            { placeholder: "___BLANK_1___", answer: "yield", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use 'yield' instead of 'return' to produce values one at a time" }],
          feedback: {
            correct: "Correct! yield produces each even number lazily.",
            incorrect: "Use 'yield' to produce values one at a time.",
          },
        },
        {
          id: "s14-iter-i3",
          kind: "multiple-choice",
          prompt: "Why are generators memory-efficient for processing large files?",
          beginnerPurpose: "Understand the memory benefit of generators",
          expectedConceptIds: ["iterator", "generator"],
          options: [
            { id: "a", text: "They compress the file automatically", isCorrect: false, explanation: "Generators don't compress anything." },
            { id: "b", text: "They only hold one item in memory at a time", isCorrect: true, explanation: "Correct! Generators produce items on demand, not all at once." },
            { id: "c", text: "They run on multiple CPU cores", isCorrect: false, explanation: "Generators are single-threaded." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Generators are 'lazy' — they produce one value at a time" }],
          feedback: {
            correct: "Correct! One item at a time means constant memory usage regardless of file size.",
            incorrect: "Generators produce one value at a time — memory usage is constant, not proportional to input size.",
          },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s14-iter-i1", "s14-iter-i2", "s14-iter-i3"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s14-lazy-evaluation",
      stageId: "stage-14",
      title: "Lazy Evaluation and Generator Pipelines",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Chain generator functions to build lazy data pipelines",
        "Use itertools.islice and itertools.chain for common lazy patterns",
        "Understand when to materialise a generator with list()",
        "Distinguish cpu-bound from io-bound bottlenecks",
      ],
      prerequisites: ["s14-iterators-generators"],
      concepts: ["generator", "iterator", "cpu-bound"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Chaining Generators\n\nEach generator function can act as a pipeline stage — consuming from one iterator and yielding to the next. Nothing is computed until the downstream consumer asks for data.\n\n```python\ndef read_numbers(n: int):\n    yield from range(n)\n\ndef filter_even(nums):\n    for n in nums:\n        if n % 2 == 0:\n            yield n\n\ndef squared(nums):\n    for n in nums:\n        yield n * n\n\npipeline = squared(filter_even(read_numbers(10)))\nprint(list(pipeline))  # [0, 4, 16, 36, 64]\n```\n\nNo intermediate lists are created. Each value flows through the pipeline on demand.",
        },
        {
          kind: "code",
          language: "python",
          code: "import itertools\n\n# islice: take first n from any iterator (even infinite)\ndef naturals():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\nfirst_five = list(itertools.islice(naturals(), 5))\nprint(first_five)   # [0, 1, 2, 3, 4]\n\n# chain: concatenate iterables lazily\ncombined = list(itertools.chain([1, 2], [3, 4], [5]))\nprint(combined)     # [1, 2, 3, 4, 5]",
          caption: "itertools provides composable lazy primitives. islice safely limits infinite generators.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "cpu-bound vs io-bound",
          body: "cpu-bound work (sorting, compression, number crunching) keeps the CPU busy computing. io-bound work (network, disk) has the CPU idle while waiting. Generators help with io-bound pipelines; multiprocessing helps with cpu-bound parallelism.",
        },
        {
          kind: "why-matters",
          body: "Lazy pipelines let you process arbitrarily large datasets with constant memory. A 100 GB log file and a 1 KB file use the same code path when you use generators.",
        },
      ],
      interactions: [
        {
          id: "s14-le-predict-pipeline",
          kind: "predict-output",
          prompt: "What does this pipeline produce?",
          beginnerPurpose: "Trace a two-stage generator pipeline.",
          expectedConceptIds: ["generator"],
          code: "def add_one(nums):\n    for n in nums:\n        yield n + 1\n\ndef only_odd(nums):\n    for n in nums:\n        if n % 2 != 0:\n            yield n\n\nresult = list(only_odd(add_one([1, 2, 3, 4])))\nprint(result)",
          expectedOutput: "[3, 5]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "add_one: [2,3,4,5]. only_odd keeps 3 and 5." }],
          feedback: {
            correct: "Correct! [1,2,3,4] → add_one → [2,3,4,5] → only_odd → [3,5].",
            incorrect: "add_one produces [2,3,4,5], then only_odd keeps [3,5].",
          },
        },
        {
          id: "s14-le-fill-islice",
          kind: "fill-code",
          prompt: "Use itertools.islice to take only the first 4 items from an infinite generator.",
          beginnerPurpose: "Practice limiting infinite generators.",
          expectedConceptIds: ["iterator"],
          codeTemplate:
            "import itertools\n\ndef count():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\nfirst_four = list(itertools.___BLANK_1___(count(), ___BLANK_2___))\nprint(first_four)  # [0, 1, 2, 3]",
          blanks: [
            { placeholder: "___BLANK_1___", answer: "islice", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "4", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "itertools.islice(iterable, n) takes n items." }],
          feedback: {
            correct: "Correct! islice safely consumes only n items from any iterator.",
            incorrect: "Use itertools.islice(count(), 4) to take 4 items.",
          },
        },
        {
          id: "s14-le-mc-materialise",
          kind: "multiple-choice",
          prompt: "When should you convert a generator to a list with list(gen)?",
          beginnerPurpose: "Know when lazy vs eager is appropriate.",
          expectedConceptIds: ["generator", "cpu-bound"],
          options: [
            { id: "a", text: "Always — lists are safer.", isCorrect: false, explanation: "This wastes memory for large datasets." },
            { id: "b", text: "When you need index access or multiple passes over the data.", isCorrect: true, explanation: "Correct! Generators are single-pass and don't support indexing." },
            { id: "c", text: "Only when the generator is finite.", isCorrect: false, explanation: "You materialise based on usage needs, not finiteness." },
            { id: "d", text: "Never — generators are always better.", isCorrect: false, explanation: "Sometimes you genuinely need all values available at once." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think: does my code need to access items more than once?" }],
          feedback: {
            correct: "Right! Materialise when you need indexing or multiple passes.",
            incorrect: "Use list() when you need indexing, length, or multiple passes over the data.",
          },
        },
        {
          id: "s14-le-run-lazy-pipeline",
          kind: "run-code",
          prompt:
            "Build a lazy pipeline: generate numbers 1-20, filter multiples of 4, then double each. Print the result.",
          beginnerPurpose: "Apply chained generators end-to-end.",
          expectedConceptIds: ["generator"],
          starterCode:
            "def multiples_of_4(limit: int):\n    for i in range(1, limit + 1):\n        if i % 4 == 0:\n            yield i\n\ndef doubled(nums):\n    for n in nums:\n        yield n * 2\n\nresult = list(doubled(multiples_of_4(20)))\nprint(result)\n",
          task: "Print [8, 16, 24, 32, 40].",
          expectedOutputContains: ["8", "16", "24", "32", "40"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "concept", text: "The starter code is complete — run it." }],
          feedback: {
            correct: "Lazy pipeline running correctly!",
            incorrect: "Check that multiples_of_4 yields 4,8,12,16,20 and doubled multiplies by 2.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "cpu-bound",
          recallPrompt: "What is the difference between cpu-bound and io-bound work?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s14-le-predict-pipeline", "s14-le-fill-islice", "s14-le-mc-materialise"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["cpu-bound"],
      },
    },
    {
      id: "s14-async-await-basics",
      stageId: "stage-14",
      title: "Async/Await Basics",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain what a coroutine is",
        "Write async functions with async def and await",
        "Run coroutines with asyncio.run()",
      ],
      prerequisites: ["s14-lazy-evaluation"],
      concepts: ["async-await", "coroutine", "event-loop", "io-bound"],
      contentBlocks: [
        {
          kind: "mental-model",
          title: "Async as a Restaurant Kitchen",
          analogy:
            "One chef (single thread) who starts a dish, puts it in the oven, starts another dish while the first bakes, checks back on the first when the oven beeps",
          explanation:
            "Async/await lets one thread handle many tasks that spend time waiting (for I/O). While one coroutine waits for a network response, another runs.",
        },
        {
          kind: "text",
          markdown:
            "## async/await\n\n- `async def` defines a coroutine function\n- `await` suspends the current coroutine until the awaited coroutine completes\n- `asyncio.run()` starts the event loop and runs a coroutine\n- Use async for **I/O-bound** work (network, disk) — not CPU-bound work",
        },
        {
          kind: "code",
          language: "python",
          code: "import asyncio\n\nasync def fetch_data(name: str, delay: float) -> str:\n    \"\"\"Simulate an async I/O operation.\"\"\"\n    print(f\"Starting {name}...\")\n    await asyncio.sleep(delay)  # Simulates waiting for a network response\n    print(f\"{name} done!\")\n    return f\"{name}_result\"\n\nasync def main() -> None:\n    # Run two 'requests' concurrently\n    results = await asyncio.gather(\n        fetch_data(\"A\", 0.1),\n        fetch_data(\"B\", 0.05),\n    )\n    print(results)\n\nasyncio.run(main())",
          caption: "Concurrent coroutines with asyncio.gather",
        },
        {
          kind: "output",
          text: "Starting A...\nStarting B...\nB done!\nA done!\n['A_result', 'B_result']",
          isError: false,
        },
      ],
      interactions: [
        {
          id: "s14-async-i1",
          kind: "predict-output",
          prompt: "What does this async code print? (B finishes before A because it has a shorter delay)",
          beginnerPurpose: "Understand that async tasks run concurrently",
          expectedConceptIds: ["async-await", "coroutine"],
          code: "import asyncio\n\nasync def task(name: str, delay: float):\n    await asyncio.sleep(delay)\n    print(name)\n\nasync def main():\n    await asyncio.gather(task('X', 0.2), task('Y', 0.1))\n\nasyncio.run(main())",
          expectedOutput: "Y\nX",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "asyncio.gather runs both tasks concurrently — Y has a shorter delay so it finishes first" }],
          feedback: {
            correct: "Correct! Y has delay 0.1 so it finishes before X (delay 0.2).",
            incorrect: "Both tasks run concurrently. Y finishes first because its delay is shorter.",
          },
        },
        {
          id: "s14-async-i2",
          kind: "fill-code",
          prompt: "Complete the async function declaration and its call",
          beginnerPurpose: "Practice async def and await syntax",
          expectedConceptIds: ["async-await"],
          codeTemplate:
            "import asyncio\n\n___BLANK_1___ def greet(name: str) -> str:\n    ___BLANK_2___ asyncio.sleep(0)\n    return f\"Hello, {name}!\"\n\nasync def main():\n    msg = await greet(\"Alice\")\n    print(msg)\n\nasyncio.run(main())",
          blanks: [
            { placeholder: "___BLANK_1___", answer: "async", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "await", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "async def declares a coroutine, await suspends it" }],
          feedback: {
            correct: "Correct! async def + await is the async function pattern.",
            incorrect: "Use 'async def' to define and 'await' to call async functions.",
          },
        },
        {
          id: "s14-async-i3",
          kind: "multiple-choice",
          prompt: "When is async/await most useful in Python?",
          beginnerPurpose: "Know when to apply async",
          expectedConceptIds: ["io-bound", "async-await"],
          options: [
            { id: "a", text: "CPU-bound tasks like sorting large lists", isCorrect: false, explanation: "Async doesn't help CPU-bound work — use multiprocessing instead." },
            { id: "b", text: "I/O-bound tasks like network requests or file reads", isCorrect: true, explanation: "Correct! Async shines when tasks spend time waiting for I/O." },
            { id: "c", text: "Mathematical computations", isCorrect: false, explanation: "Math is CPU-bound — async won't speed it up." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Async helps when tasks spend time waiting, not computing" }],
          feedback: {
            correct: "Correct! Async is for I/O-bound work where tasks wait for external responses.",
            incorrect: "Async helps when tasks wait for I/O (network, disk). For CPU work, use multiprocessing.",
          },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s14-async-i1", "s14-async-i2", "s14-async-i3"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s14-profiling-caching",
      stageId: "stage-14",
      title: "Profiling and Caching",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Profile code using cProfile and timeit",
        "Use functools.lru_cache to cache expensive function results",
        "Identify whether a bottleneck is CPU-bound or I/O-bound",
      ],
      prerequisites: ["s14-async-await-basics"],
      concepts: ["profiling", "io-bound"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Measure Before You Optimise\n\n> Premature optimisation is the root of all evil. — Donald Knuth\n\nBefore optimising, measure. Use `cProfile` to find slow functions, then optimise only those.\n\n**Caching** is the simplest optimisation: remember results of expensive function calls so you don't recompute them.",
        },
        {
          kind: "code",
          language: "python",
          code: "import functools\nimport time\n\n# Without cache: recomputes every call\ndef fib_slow(n: int) -> int:\n    if n <= 1:\n        return n\n    return fib_slow(n - 1) + fib_slow(n - 2)\n\n# With LRU cache: each value computed once\n@functools.lru_cache(maxsize=None)\ndef fib_fast(n: int) -> int:\n    if n <= 1:\n        return n\n    return fib_fast(n - 1) + fib_fast(n - 2)\n\n# Measure\nstart = time.perf_counter()\nfib_fast(35)\nend = time.perf_counter()\nprint(f\"fib_fast(35) took {(end - start)*1000:.2f}ms\")",
          caption: "LRU cache for memoisation",
        },
        {
          kind: "callout",
          variant: "info",
          title: "lru_cache vs manual caching",
          body: "@functools.lru_cache is a decorator that automatically caches function results. The 'LRU' stands for Least Recently Used — when the cache is full, the least-recently-used entry is evicted.",
        },
      ],
      interactions: [
        {
          id: "s14-profiling-i1",
          kind: "multiple-choice",
          prompt: "What does @functools.lru_cache do to a function?",
          beginnerPurpose: "Understand memoisation via lru_cache",
          expectedConceptIds: ["profiling"],
          options: [
            { id: "a", text: "Runs the function on multiple CPU cores", isCorrect: false, explanation: "lru_cache is about caching, not parallelism." },
            { id: "b", text: "Stores return values so repeated calls with the same args don't recompute", isCorrect: true, explanation: "Correct! Memoisation: same args → same cached result." },
            { id: "c", text: "Makes the function run asynchronously", isCorrect: false, explanation: "lru_cache is not async." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "LRU = Least Recently Used — it's a cache strategy" }],
          feedback: {
            correct: "Correct! lru_cache memoises results to avoid recomputation.",
            incorrect: "lru_cache stores (caches) function results so identical calls return immediately.",
          },
        },
        {
          id: "s14-profiling-i2",
          kind: "fill-code",
          prompt: "Add LRU caching to this expensive function",
          beginnerPurpose: "Practice applying the lru_cache decorator",
          expectedConceptIds: ["profiling"],
          codeTemplate:
            "import functools\n\n@functools.___BLANK_1___(maxsize=128)\ndef expensive(n: int) -> int:\n    # Simulate expensive computation\n    return sum(range(n))\n\nprint(expensive(1000))",
          blanks: [
            { placeholder: "___BLANK_1___", answer: "lru_cache", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The decorator is functools.lru_cache" }],
          feedback: {
            correct: "Correct! @functools.lru_cache(maxsize=128) caches up to 128 results.",
            incorrect: "Use @functools.lru_cache(maxsize=128) as the decorator.",
          },
        },
        {
          id: "s14-profiling-i3",
          kind: "plain-language-explain",
          prompt: "Explain the difference between I/O-bound and CPU-bound performance bottlenecks, and the appropriate solution for each",
          beginnerPurpose: "Understand when to use async vs parallelism",
          expectedConceptIds: ["io-bound", "profiling"],
          code: "# I/O-bound: time spent waiting for external resources\n# CPU-bound: time spent computing\n\n# Solution for I/O-bound: async/await or threading\n# Solution for CPU-bound: multiprocessing",
          keyPointsToHit: [
            "I/O-bound means waiting for network/disk",
            "CPU-bound means intensive computation",
            "Async/await helps I/O-bound, multiprocessing helps CPU-bound",
          ],
          sampleAnswer:
            "I/O-bound code spends most of its time waiting for external resources — like network requests or disk reads. The solution is async/await or threading, which lets the program do other work while waiting. CPU-bound code spends most of its time computing — like number crunching or sorting. The solution is multiprocessing, which uses multiple CPU cores in parallel.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Ask: is the bottleneck waiting or computing?" }],
          feedback: {
            correct: "Well explained! The key insight is matching the solution to the bottleneck type.",
            incorrect: "Distinguish waiting (I/O) from computing (CPU) and match async vs multiprocessing.",
          },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s14-profiling-i1", "s14-profiling-i2", "s14-profiling-i3"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s14-async-patterns",
      stageId: "stage-14",
      title: "Async Patterns in Practice",
      kind: "practice",
      difficulty: "advanced",
      objectives: [
        "Use asyncio.gather for concurrent tasks",
        "Handle exceptions in async code",
        "Limit concurrency with asyncio.Semaphore",
      ],
      prerequisites: ["s14-profiling-caching"],
      concepts: ["async-await", "coroutine"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: "import asyncio\n\nasync def fetch(url: str, semaphore: asyncio.Semaphore) -> str:\n    async with semaphore:\n        # Simulate a network request\n        await asyncio.sleep(0.1)\n        return f\"result:{url}\"\n\nasync def main() -> None:\n    urls = [f\"https://api.example.com/{i}\" for i in range(10)]\n\n    # Limit to 3 concurrent requests\n    semaphore = asyncio.Semaphore(3)\n\n    tasks = [fetch(url, semaphore) for url in urls]\n    results = await asyncio.gather(*tasks, return_exceptions=True)\n\n    for url, result in zip(urls, results):\n        if isinstance(result, Exception):\n            print(f\"Error for {url}: {result}\")\n        else:\n            print(result)\n\nasyncio.run(main())",
          caption: "Semaphore for bounded concurrency",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Don't run thousands of concurrent requests",
          body: "asyncio.gather without limits will fire all tasks simultaneously. This can overwhelm your own machine or get you rate-limited by the API. Use asyncio.Semaphore to cap concurrency.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "return_exceptions=True in gather",
          body: "By default, asyncio.gather cancels all tasks if one raises an exception. With return_exceptions=True, exceptions are returned as results instead of propagating — letting you handle each individually.",
        },
      ],
      interactions: [
        {
          id: "s14-patterns-i1",
          kind: "multiple-choice",
          prompt: "What does asyncio.Semaphore(3) do in an async context?",
          beginnerPurpose: "Understand concurrency limiting",
          expectedConceptIds: ["async-await"],
          options: [
            { id: "a", text: "Creates 3 worker threads", isCorrect: false, explanation: "Semaphores don't create threads." },
            { id: "b", text: "Limits the number of concurrent async operations to 3", isCorrect: true, explanation: "Correct! At most 3 coroutines can hold the semaphore simultaneously." },
            { id: "c", text: "Retries failed operations 3 times", isCorrect: false, explanation: "Semaphores are about limiting concurrency, not retrying." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "A semaphore is like a parking lot with 3 spaces — only 3 cars at a time" }],
          feedback: {
            correct: "Correct! Semaphore(3) means at most 3 concurrent holders.",
            incorrect: "A Semaphore limits concurrency — only N tasks can proceed at once.",
          },
        },
        {
          id: "s14-patterns-i2",
          kind: "predict-output",
          prompt: "What does asyncio.gather return when return_exceptions=True and one task raises?",
          beginnerPurpose: "Understand exception handling in gather",
          expectedConceptIds: ["async-await", "coroutine"],
          code: "import asyncio\n\nasync def ok():\n    return 42\n\nasync def fail():\n    raise ValueError('oops')\n\nasync def main():\n    results = await asyncio.gather(ok(), fail(), return_exceptions=True)\n    print(type(results[1]).__name__)\n\nasyncio.run(main())",
          expectedOutput: "ValueError",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "return_exceptions=True means exceptions are returned as values, not raised" }],
          feedback: {
            correct: "Correct! With return_exceptions=True, the exception is in the results list.",
            incorrect: "return_exceptions=True causes exceptions to appear as result values rather than propagating.",
          },
        },
        {
          id: "s14-patterns-i3",
          kind: "fill-code",
          prompt: "Complete the semaphore usage inside an async with block",
          beginnerPurpose: "Practice the async with semaphore pattern",
          expectedConceptIds: ["async-await"],
          codeTemplate:
            "import asyncio\n\nsem = asyncio.Semaphore(2)\n\nasync def task(n: int):\n    ___BLANK_1___ with sem:\n        await asyncio.sleep(0.1)\n        print(f\"task {n}\")",
          blanks: [
            { placeholder: "___BLANK_1___", answer: "async", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use 'async with' for async context managers" }],
          feedback: {
            correct: "Correct! 'async with' is the async version of 'with' for async context managers.",
            incorrect: "Use 'async with' (not just 'with') for async context managers like Semaphore.",
          },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s14-patterns-i1", "s14-patterns-i2", "s14-patterns-i3"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s14-project",
    stageId: "stage-14",
    title: "Async Data Fetcher",
    brief:
      "Build an async data fetcher that processes a list of mock URLs concurrently using asyncio. Simulate network latency, limit concurrency with a semaphore, and collect results with error handling.",
    requirements: [
      "async def fetch(url) simulates network call with asyncio.sleep",
      "Limit to 3 concurrent requests with asyncio.Semaphore",
      "Use asyncio.gather with return_exceptions=True",
      "Separate successful results from errors",
      "Print a summary with counts of successes and failures",
    ],
    acceptanceCriteria: [
      "All 10 mock URLs are processed",
      "At most 3 run simultaneously (semaphore enforced)",
      "Errors are caught and counted, not propagated",
    ],
    conceptIds: ["async-await", "coroutine", "io-bound"],
    difficulty: "advanced",
    starterCode:
      "import asyncio\n\nMOCK_URLS = [f'https://api.example.com/item/{i}' for i in range(10)]\n\n# Your async fetcher with semaphore here\n",
  },
} satisfies Stage;
