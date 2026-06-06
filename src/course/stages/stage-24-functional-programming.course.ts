import type { Stage } from "@/course/course.schema";

export const stage24 = {
  id: "stage-24",
  number: 24,
  title: "Functional Programming Tools",
  summary:
    "Apply first-class functions, higher-order functions, decorators, and functools utilities to write composable, reusable Python code.",
  level: "intermediate",
  masteryGateConceptIds: ["first-class-functions", "decorator-pattern"],
  lessons: [
    {
      id: "s24-first-class-functions",
      stageId: "stage-24",
      title: "First-Class Functions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Assign functions to variables",
        "Pass functions as arguments to other functions",
        "Return functions from functions",
      ],
      prerequisites: [],
      concepts: ["first-class-functions"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## First-Class Functions\n\nIn Python, functions are objects. You can assign them to variables, store them in data structures, pass them as arguments, and return them from other functions.\n\n```python\ndef double(x: int) -> int:\n    return x * 2\n\noperation = double  # assign to variable\nprint(operation(5))  # 10\n\noperations = [double, abs, str]\nfor op in operations:\n    print(op(-3))  # 6, 3, \"-3\"\n```\n\nThe key insight: `double` without parentheses is the function object; `double(5)` calls it.",
        },
        {
          kind: "mental-model",
          title: "Functions as values",
          analogy: "A function is like a recipe card you can hand to someone. You can put it in a drawer (variable), mail it to a friend (pass as argument), or have a machine print copies (return from function).",
          explanation: "This enables callbacks, strategy patterns, and dynamic dispatch without if/elif chains.",
        },
        {
          kind: "why-matters",
          body: "First-class functions are the foundation of decorators, callbacks, event handlers, and functional pipelines. Without them, you'd need class-based patterns for every case.",
        },
      ],
      interactions: [
        {
          id: "s24-first-class-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace function-as-value",
          expectedConceptIds: ["first-class-functions"],
          code: "def add_one(x):\n    return x + 1\n\nf = add_one\nresult = f(f(f(0)))\nprint(result)",
          expectedOutput: "3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "f(0) = 1, f(1) = 2, f(2) = 3." }],
          feedback: { correct: "Correct! f is an alias for add_one.", incorrect: "f(f(f(0))) = f(f(1)) = f(2) = 3." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s24-first-class-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s24-lambda-map-filter",
      stageId: "stage-24",
      title: "lambda, map(), and filter()",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write lambda expressions for simple functions",
        "Apply map() to transform sequences",
        "Apply filter() to select elements",
      ],
      prerequisites: ["s24-first-class-functions"],
      concepts: ["first-class-functions"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## lambda\n\nA `lambda` is an anonymous function limited to a single expression:\n\n```python\ndouble = lambda x: x * 2\nprint(double(5))  # 10\n```\n\nLambdas are useful as short callbacks — use named functions for anything complex.\n\n## map() and filter()\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nsquares = list(map(lambda x: x**2, numbers))  # [1, 4, 9, 16, 25]\nevens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]\n```\n\nBoth `map()` and `filter()` return lazy iterators — wrap with `list()` to materialize.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Prefer comprehensions over map/filter",
          body: "List comprehensions are usually more readable than map/filter with lambda. Use [x**2 for x in nums] over list(map(lambda x: x**2, nums)). Reserve map/filter for when you already have a named function to pass.",
        },
        {
          kind: "comparison",
          leftLabel: "map/filter (functional style)",
          rightLabel: "Comprehension (Pythonic)",
          leftCode: "squares = list(map(lambda x: x**2, nums))\nevens = list(filter(lambda x: x%2==0, nums))",
          rightCode: "squares = [x**2 for x in nums]\nevens = [x for x in nums if x % 2 == 0]",
        },
      ],
      interactions: [
        {
          id: "s24-map-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace map with lambda",
          expectedConceptIds: ["first-class-functions"],
          code: "words = [\"hello\", \"world\", \"python\"]\nlengths = list(map(lambda w: len(w), words))\nprint(lengths)",
          expectedOutput: "[5, 5, 6]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "len('hello')=5, len('world')=5, len('python')=6." }],
          feedback: { correct: "Correct!", incorrect: "map applies len to each word: 5, 5, 6." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s24-map-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s24-functools",
      stageId: "stage-24",
      title: "functools: partial, lru_cache, wraps",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use functools.partial to pre-fill arguments",
        "Apply functools.lru_cache to memoize expensive functions",
        "Use functools.wraps to preserve metadata in decorators",
      ],
      prerequisites: ["s24-lambda-map-filter"],
      concepts: ["first-class-functions"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## functools.partial\n\nCreate a new function with some arguments pre-filled:\n\n```python\nfrom functools import partial\n\ndef power(base, exp):\n    return base ** exp\n\nsquare = partial(power, exp=2)\ncube = partial(power, exp=3)\n\nprint(square(5))  # 25\nprint(cube(3))    # 27\n```\n\n## functools.lru_cache\n\nMemoize expensive function calls:\n\n```python\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n: int) -> int:\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(100))  # instant, cached\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "lru_cache requires hashable arguments",
          body: "lru_cache caches based on argument values. Arguments must be hashable (no lists or dicts). Use tuples if you need to pass sequences.",
        },
      ],
      interactions: [
        {
          id: "s24-partial-mc",
          kind: "multiple-choice",
          prompt: "What does `partial(print, end='')` create?",
          beginnerPurpose: "Understand partial application",
          expectedConceptIds: ["first-class-functions"],
          options: [
            { id: "a", text: "A new function that calls print() with end='' pre-set", isCorrect: true, explanation: "Correct! partial returns a new callable with end='' already bound." },
            { id: "b", text: "Calls print() immediately with end=''", isCorrect: false, explanation: "partial doesn't call the function — it returns a new partial function object." },
            { id: "c", text: "Removes the end parameter from print()", isCorrect: false, explanation: "partial pre-fills arguments, it doesn't remove them." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "partial returns a new function, not a result." }],
          feedback: { correct: "Correct! partial creates a new callable.", incorrect: "partial returns a new function with some args pre-filled — it doesn't call the function." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s24-partial-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s24-decorators",
      stageId: "stage-24",
      title: "Decorators",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what a decorator is and how @ syntax works",
        "Write a decorator that wraps a function",
        "Use functools.wraps to preserve decorated function metadata",
      ],
      prerequisites: ["s24-functools"],
      concepts: ["decorator-pattern"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Decorators\n\nA decorator is a function that takes a function, wraps it in additional behavior, and returns the result:\n\n```python\nfrom functools import wraps\nimport time\n\ndef timer(func):\n    @wraps(func)  # preserve __name__, __doc__\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        print(f\"{func.__name__}: {time.perf_counter()-start:.3f}s\")\n        return result\n    return wrapper\n\n@timer\ndef slow_sum(n: int) -> int:\n    return sum(range(n))\n\nslow_sum(1_000_000)  # slow_sum: 0.023s\n```\n\n`@timer` is syntactic sugar for `slow_sum = timer(slow_sum)`.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always use @functools.wraps",
          body: "Without @wraps, the wrapper function replaces __name__, __doc__, and __module__. @wraps copies these from the original function to the wrapper.",
        },
        {
          kind: "why-matters",
          body: "Decorators implement cross-cutting concerns (logging, timing, caching, authentication) once and apply them to many functions without modifying their code.",
        },
      ],
      interactions: [
        {
          id: "s24-deco-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace decorator wrapping",
          expectedConceptIds: ["decorator-pattern"],
          code: "def twice(func):\n    def wrapper(*args, **kwargs):\n        func(*args, **kwargs)\n        func(*args, **kwargs)\n    return wrapper\n\n@twice\ndef say(msg: str) -> None:\n    print(msg)\n\nsay(\"hi\")",
          expectedOutput: "hi\nhi",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "@twice replaces say with wrapper, which calls the original twice." }],
          feedback: { correct: "Correct! The decorator calls the function twice.", incorrect: "wrapper calls func twice, so 'hi' prints twice." },
        },
        {
          id: "s24-deco-fill",
          kind: "fill-code",
          prompt: "Complete the decorator that only calls the function if the argument is positive.",
          beginnerPurpose: "Write a guarding decorator",
          expectedConceptIds: ["decorator-pattern"],
          codeTemplate: "from functools import wraps\n\ndef positive_only(func):\n    @wraps(func)\n    def wrapper(n):\n        if n > 0:\n            return func(n)\n        return None\n    _____ wrapper\n\n@positive_only\ndef double(n): return n * 2\n\nprint(double(5))   # 10\nprint(double(-1))  # None",
          blanks: [{ placeholder: "_____", answer: "return", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "A decorator must return the wrapper function." }],
          feedback: { correct: "Correct! return wrapper makes the decorator work.", incorrect: "The decorator must return the wrapper function." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s24-deco-predict", "s24-deco-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s24-project",
    stageId: "stage-24",
    title: "Function Pipeline Project",
    brief:
      "Build a composable data transformation pipeline using higher-order functions, decorators, and functools. The pipeline should support chaining transformations and operations like map, filter, and reduce with type annotations.",
    requirements: [
      "Pipeline class supporting pipe(transform) chaining",
      "Built-in transforms: map_values, filter_values, take, drop",
      "Retry decorator for flaky operations",
      "lru_cache applied to an expensive pure function",
      "Type annotations throughout",
    ],
    acceptanceCriteria: [
      "Pipeline chains produce correct results",
      "Retry decorator retries on exception",
      "lru_cache measurably speeds up repeated calls",
    ],
    conceptIds: ["first-class-functions", "decorator-pattern"],
    difficulty: "intermediate",
  },
} satisfies Stage;
