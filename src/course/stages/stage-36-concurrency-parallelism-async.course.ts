import type { Stage } from "@/course/course.schema";

export const stage36 = {
  id: "stage-36",
  number: 36,
  title: "Concurrency, Parallelism, and Async",
  summary:
    "Write concurrent Python programs using threading, multiprocessing, and asyncio to handle I/O-bound and CPU-bound workloads efficiently.",
  level: "advanced",
  masteryGateConceptIds: ["asyncio-coroutines", "thread-safety"],
  lessons: [
    {
      id: "s36-concurrency-vs-parallelism",
      stageId: "stage-36",
      title: "Concurrency vs Parallelism",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Distinguish concurrency from parallelism",
        "Identify CPU-bound vs I/O-bound work",
        "Choose the right concurrency model for a task",
      ],
      prerequisites: [],
      concepts: ["asyncio-coroutines"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Concurrency vs Parallelism\n\n**Concurrency** — multiple tasks make progress, but not necessarily at the same instant. A single CPU juggles tasks by switching between them.\n\n**Parallelism** — multiple tasks literally run simultaneously on multiple CPU cores.\n\n| Work type | Problem | Best tool |\n|-----------|---------|----------|\n| I/O-bound | Waiting for network, disk, user | asyncio or threading |\n| CPU-bound | Computation: math, compression, parsing | multiprocessing |\n\n**The GIL:** Python's Global Interpreter Lock allows only one thread to execute Python bytecode at a time. This means threads don't help for CPU-bound work — use multiprocessing for true parallelism.",
        },
        {
          kind: "mental-model",
          title: "Restaurant analogy",
          analogy: "Concurrency: one waiter serves many tables — takes order at table 1, walks to kitchen, takes order at table 2 while kitchen works. Parallelism: two waiters each serving their own set of tables simultaneously.",
          explanation: "asyncio lets one thread handle many I/O operations by switching when blocked. multiprocessing spawns separate processes that run truly in parallel.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Don't use threading for CPU-bound work",
          body: "The GIL means Python threads can't run Python code in parallel. For CPU-bound work, use multiprocessing or a C extension that releases the GIL.",
        },
      ],
      interactions: [
        {
          id: "s36-cv-mc",
          kind: "multiple-choice",
          prompt: "You're downloading 100 web pages. Which Python tool gives the best speedup?",
          beginnerPurpose: "Apply the I/O-bound vs CPU-bound distinction",
          expectedConceptIds: ["asyncio-coroutines"],
          options: [
            { id: "a", text: "multiprocessing", isCorrect: false, explanation: "Downloading is I/O-bound — the CPU isn't busy. multiprocessing adds process overhead without benefit." },
            { id: "b", text: "asyncio with async HTTP client", isCorrect: true, explanation: "Correct! Downloading is I/O-bound. asyncio concurrently handles all 100 requests with minimal overhead." },
            { id: "c", text: "No concurrency — it's already fast enough", isCorrect: false, explanation: "Sequential downloads are 100× slower than concurrent. Each download takes ~100ms → 10s sequential vs 0.1s concurrent." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Network I/O is I/O-bound — the CPU spends most time waiting." }],
          feedback: { correct: "Correct! asyncio is perfect for I/O-bound work.", incorrect: "For network I/O, asyncio (or threading) beats multiprocessing." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s36-cv-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s36-threading",
      stageId: "stage-36",
      title: "Threading: Threads, Locks, and Race Conditions",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Create and start threads with threading.Thread",
        "Use threading.Lock to prevent race conditions",
        "Explain what a race condition is",
      ],
      prerequisites: ["s36-concurrency-vs-parallelism"],
      concepts: ["thread-safety"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Threading\n\n```python\nimport threading\n\ndef download(url: str) -> None:\n    # simulate download\n    print(f\"Downloading {url}\")\n\nurls = [\"url1\", \"url2\", \"url3\"]\nthreads = [threading.Thread(target=download, args=(url,)) for url in urls]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()  # wait for all to finish\n```\n\n## Race Conditions\n\nWhen threads share mutable state without coordination, the result depends on timing:\n\n```python\ncounter = 0\nlock = threading.Lock()\n\ndef increment():\n    global counter\n    with lock:  # only one thread at a time\n        counter += 1\n```\n\nWithout the lock, concurrent `counter += 1` operations can overlap and lose increments.",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Shared mutable state requires locking",
          body: "If two threads read-modify-write the same variable without a lock, you get race conditions. The fix: use threading.Lock, queue.Queue, or design away from shared state.",
        },
      ],
      interactions: [
        {
          id: "s36-thread-mc",
          kind: "multiple-choice",
          prompt: "Two threads increment `counter` 1000 times each. Without a lock, what is the final value?",
          beginnerPurpose: "Identify race conditions",
          expectedConceptIds: ["thread-safety"],
          options: [
            { id: "a", text: "Always 2000", isCorrect: false, explanation: "Without a lock, increments can overlap and some can be lost." },
            { id: "b", text: "Unpredictable — between 1000 and 2000", isCorrect: true, explanation: "Correct! Race conditions make the result non-deterministic." },
            { id: "c", text: "Always 1000", isCorrect: false, explanation: "The range depends on timing — it varies between runs." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "counter += 1 is three operations: read, add, write. Two threads can interleave these." }],
          feedback: { correct: "Correct! Race conditions make results unpredictable.", incorrect: "Without a lock, concurrent += operations can overlap, losing increments." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s36-thread-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s36-asyncio",
      stageId: "stage-36",
      title: "asyncio: Coroutines, async/await, and the Event Loop",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Write async functions using async def and await",
        "Run coroutines with asyncio.run()",
        "Use asyncio.gather() to run coroutines concurrently",
      ],
      prerequisites: ["s36-threading"],
      concepts: ["asyncio-coroutines"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## asyncio\n\nasyncio enables single-threaded concurrency using **coroutines**:\n\n```python\nimport asyncio\n\nasync def fetch(url: str) -> str:\n    print(f\"Start: {url}\")\n    await asyncio.sleep(1)  # simulate I/O\n    print(f\"Done: {url}\")\n    return f\"data from {url}\"\n\nasync def main():\n    # Run all three concurrently\n    results = await asyncio.gather(\n        fetch(\"url1\"),\n        fetch(\"url2\"),\n        fetch(\"url3\"),\n    )\n    print(results)\n\nasyncio.run(main())\n```\n\nTotal time: ~1 second (not 3) because all sleep concurrently.\n\n- `async def` — defines a coroutine function\n- `await` — suspends the current coroutine until the awaited coroutine completes, letting others run\n- `asyncio.run()` — runs the top-level coroutine",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Don't block the event loop",
          body: "Never call blocking functions (time.sleep, file I/O) inside async functions. Use asyncio.sleep() and async-aware I/O libraries. A blocked event loop freezes all other coroutines.",
        },
        {
          kind: "why-matters",
          body: "asyncio is how Python handles thousands of concurrent connections in web servers and API clients. Understanding it is essential for any I/O-intensive application.",
        },
      ],
      interactions: [
        {
          id: "s36-async-fill",
          kind: "fill-code",
          prompt: "Complete the async function that waits 2 seconds before returning.",
          beginnerPurpose: "Write an async function",
          expectedConceptIds: ["asyncio-coroutines"],
          codeTemplate: "import asyncio\n\nasync def delayed(msg: str) -> str:\n    _____ asyncio.sleep(2)\n    return msg\n\nasyncio.run(delayed(\"done\"))",
          blanks: [{ placeholder: "_____", answer: "await", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use 'await' before asyncio.sleep() to suspend the coroutine." }],
          feedback: { correct: "Correct! await suspends the coroutine.", incorrect: "Use 'await asyncio.sleep(2)' to non-blockingly wait." },
        },
        {
          id: "s36-async-predict",
          kind: "predict-output",
          prompt: "How long does this take to run? (asyncio.sleep(1) represents 1 second of I/O)",
          beginnerPurpose: "Understand concurrent execution with gather",
          expectedConceptIds: ["asyncio-coroutines"],
          code: "import asyncio\n\nasync def task(n):\n    await asyncio.sleep(1)\n    return n\n\nasync def main():\n    results = await asyncio.gather(task(1), task(2), task(3))\n    print(results)\n\nasyncio.run(main())",
          expectedOutput: "[1, 2, 3]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "gather runs all three concurrently — total ~1 second, not 3." }],
          feedback: { correct: "Correct! All three tasks run concurrently.", incorrect: "gather runs all coroutines concurrently, so total time is ~1 second." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s36-async-fill", "s36-async-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s36-concurrent-futures",
      stageId: "stage-36",
      title: "concurrent.futures: Thread and Process Pools",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Use ThreadPoolExecutor for concurrent I/O",
        "Use ProcessPoolExecutor for parallel CPU work",
        "Collect results from futures",
      ],
      prerequisites: ["s36-asyncio"],
      concepts: ["thread-safety"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## concurrent.futures\n\nA higher-level API for thread and process pools:\n\n```python\nfrom concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor\n\n# Thread pool for I/O-bound work\nwith ThreadPoolExecutor(max_workers=10) as executor:\n    futures = [executor.submit(download, url) for url in urls]\n    results = [f.result() for f in futures]\n\n# Process pool for CPU-bound work\ndef compute(n: int) -> int:\n    return sum(range(n))  # CPU-intensive\n\nwith ProcessPoolExecutor() as executor:\n    results = list(executor.map(compute, [10**6, 10**6, 10**6]))\n```\n\n`executor.map()` is like `map()` but runs concurrently. `executor.submit()` gives you a `Future` for individual control.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "executor.map is the simplest interface",
          body: "Use executor.map(func, iterable) when all items have the same processing. It returns results in the same order as input, unlike gather which returns in completion order.",
        },
      ],
      interactions: [
        {
          id: "s36-futures-mc",
          kind: "multiple-choice",
          prompt: "You want to compress 50 large files in parallel. Use ThreadPoolExecutor or ProcessPoolExecutor?",
          beginnerPurpose: "Choose the right executor",
          expectedConceptIds: ["thread-safety"],
          options: [
            { id: "a", text: "ThreadPoolExecutor — threads are simpler", isCorrect: false, explanation: "Compression is CPU-bound. Threads can't bypass the GIL — they won't parallelize CPU work." },
            { id: "b", text: "ProcessPoolExecutor — bypasses the GIL", isCorrect: true, explanation: "Correct! CPU-bound work needs processes. Each process has its own Python interpreter." },
            { id: "c", text: "Either — they're equivalent for this task", isCorrect: false, explanation: "They're not equivalent for CPU-bound work. Threads are limited by the GIL." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Compression is CPU-bound. Threads can't parallelize CPU work due to the GIL." }],
          feedback: { correct: "Correct! ProcessPoolExecutor bypasses the GIL.", incorrect: "CPU-bound work needs processes, not threads." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s36-futures-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s36-project",
    stageId: "stage-36",
    title: "Concurrent Downloader and Async Pipeline",
    brief:
      "Build a concurrent URL downloader using asyncio and an async data processing pipeline that handles multiple data streams simultaneously.",
    requirements: [
      "Download multiple URLs concurrently with asyncio.gather",
      "Process responses through an async pipeline",
      "Rate-limit to max N concurrent requests with asyncio.Semaphore",
      "Report total time vs sequential estimate",
      "Handle download failures gracefully",
    ],
    acceptanceCriteria: [
      "Concurrent downloads are significantly faster than sequential",
      "Rate limiting works correctly",
      "Failed downloads are logged without crashing",
    ],
    conceptIds: ["asyncio-coroutines", "thread-safety"],
    difficulty: "advanced",
  },
} satisfies Stage;
