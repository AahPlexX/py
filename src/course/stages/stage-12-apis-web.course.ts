import type { Stage } from "@/course/course.schema";

export const stage12 = {
  id: "stage-12",
  number: 12,
  title: "Comprehensions, Iteration Patterns, and Data Transformation",
  summary:
    "Master list, dict, and set comprehensions, generator expressions, and the patterns for filtering, transforming, and cleaning data — replacing verbose loops with concise, readable, Pythonic expressions.",
  level: "intermediate",
  masteryGateConceptIds: ["list-comprehension", "generator-expression", "comprehension-filtering"],
  lessons: [
    /* ── Lesson 12.1 — List comprehensions ──────────────────────────────── */
    {
      id: "s12-list-comprehensions",
      stageId: "stage-12",
      title: "List Comprehensions",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write a list comprehension using [expression for item in iterable]",
        "Transform each element of a sequence into a new list",
        "Recognize the equivalent for-loop and comprehension forms",
      ],
      prerequisites: [],
      concepts: ["list-comprehension"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem: Verbose Loops for Simple Transformations\n\nConsider squaring every number in a list:\n\n```python\n# The loop way — 4 lines for one idea\nnumbers = [1, 2, 3, 4, 5]\nsquares = []\nfor n in numbers:\n    squares.append(n ** 2)\nprint(squares)   # [1, 4, 9, 16, 25]\n```\n\n## List Comprehension: One Line, Same Result\n\nA **list comprehension** wraps the transformation in a single expression:\n\n```python\nnumbers = [1, 2, 3, 4, 5]\nsquares = [n ** 2 for n in numbers]\nprint(squares)   # [1, 4, 9, 16, 25]\n```\n\nRead it as: *'for each n in numbers, compute n squared — collect into a list'*.\n\n## The General Form\n\n```\n[expression  for  variable  in  iterable]\n```\n\n```python\n# Double each value\ndoubled = [x * 2 for x in range(5)]\nprint(doubled)   # [0, 2, 4, 6, 8]\n\n# Uppercase each word\nwords = [\"hello\", \"world\", \"python\"]\nupper = [w.upper() for w in words]\nprint(upper)     # ['HELLO', 'WORLD', 'PYTHON']\n\n# Extract first character\nfirsts = [s[0] for s in words]\nprint(firsts)    # ['h', 'w', 'p']\n```\n\n## Works with Any Iterable\n\n```python\n# From a dict's items\nscores = {\"Alice\": 95, \"Bob\": 87, \"Carol\": 92}\nlabels = [f\"{name}: {score}\" for name, score in scores.items()]\nprint(labels)   # ['Alice: 95', 'Bob: 87', 'Carol: 92']\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehensions always produce a new list",
          body: "A list comprehension never modifies the original iterable — it always creates and returns a brand-new list. The original `numbers` or `words` is unchanged.",
        },
        {
          kind: "mental-model",
          title: "A comprehension is a factory line",
          analogy: "Each item from the input iterable passes through the factory (the expression). The factory transforms it and drops the result into a collecting bin. When all items are processed, you get the full bin as the new list.",
          explanation: "The key insight is that the expression is re-evaluated for every item independently. There is no shared state between items.",
        },
        {
          kind: "why-matters",
          body: "List comprehensions are the idiomatic Python way to transform collections. They are faster than equivalent append-loops (the list is pre-allocated by the C runtime), and the intent — 'I am mapping every element' — is immediately clear to any Python reader.",
        },
      ],
      interactions: [
        {
          id: "s12-list-comp-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a list comprehension that applies a function to each element",
          expectedConceptIds: ["list-comprehension"],
          code: "nums = [1, 2, 3, 4, 5]\nresult = [n * 3 for n in nums]\nprint(result)",
          expectedOutput: "[3, 6, 9, 12, 15]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Each n is multiplied by 3. 1*3=3, 2*3=6, 3*3=9, 4*3=12, 5*3=15." }],
          feedback: { correct: "Correct! Each element multiplied by 3 produces [3,6,9,12,15].", incorrect: "For each n in [1,2,3,4,5], compute n*3: [3,6,9,12,15]." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-list-comp-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.2 — Filtering comprehensions ─────────────────────────── */
    {
      id: "s12-filtering",
      stageId: "stage-12",
      title: "Filtering Comprehensions",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Add an `if` condition to a comprehension to filter elements",
        "Combine transformation and filtering in one expression",
        "Distinguish filter-only from transform-and-filter",
      ],
      prerequisites: [],
      concepts: ["comprehension-filtering"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Adding a Filter with `if`\n\nAppend `if condition` after the `for` clause to include only elements that satisfy the condition:\n\n```python\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Only even numbers\nevens = [n for n in numbers if n % 2 == 0]\nprint(evens)   # [2, 4, 6, 8, 10]\n\n# Only odd numbers\nodds = [n for n in numbers if n % 2 != 0]\nprint(odds)    # [1, 3, 5, 7, 9]\n```\n\n## Combine Transform and Filter\n\nThe expression (left side) transforms; the condition (right side) filters. Both can exist together:\n\n```python\nwords = [\"apple\", \"banana\", \"cherry\", \"date\", \"elderberry\"]\n\n# Upper-case words that are longer than 5 characters\nlong_upper = [w.upper() for w in words if len(w) > 5]\nprint(long_upper)   # ['BANANA', 'CHERRY', 'ELDERBERRY']\n```\n\nRead as: *'for each w in words, if len(w) > 5, take w.upper() — collect into a list'*.\n\n## Filtering Across Multiple Conditions\n\n```python\nscores = [45, 78, 92, 61, 88, 73, 55, 97]\n\n# Scores in the 70–89 range\nmid_range = [s for s in scores if 70 <= s < 90]\nprint(mid_range)   # [78, 88, 73]\n\n# Scores above 80, doubled (as a bonus preview)\nbonuses = [s * 2 for s in scores if s > 80]\nprint(bonuses)     # [184, 176, 194]\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "The if clause is a gate, not an else",
          body: "The `if` in a comprehension filters elements out — items that don't pass the condition are simply not included. There is no `else` branch in the filter clause. For conditional transformation (keep all items but change some), use a ternary in the expression: `[x if x > 0 else 0 for x in items]`.",
        },
      ],
      interactions: [
        {
          id: "s12-filtering-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a comprehension that filters and transforms in one step",
          expectedConceptIds: ["comprehension-filtering"],
          code: "data = [\"alice\", \"bob\", \"carol\", \"dave\", \"eve\"]\nresult = [name.title() for name in data if len(name) > 3]\nprint(result)",
          expectedOutput: "['Alice', 'Carol', 'Dave']",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Filter: len > 3 keeps alice (5), carol (5), dave (4) — bob (3) and eve (3) excluded. Then .title() capitalizes." }],
          feedback: { correct: "Correct! bob and eve have len 3 (excluded); alice, carol, dave pass. .title() capitalizes each.", incorrect: "len('bob')=3, len('eve')=3 — both excluded. alice(5), carol(5), dave(4) pass. .title() gives Title Case." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-filtering-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.3 — Transformation comprehensions ────────────────────── */
    {
      id: "s12-transformation",
      stageId: "stage-12",
      title: "Transformation Comprehensions",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Apply complex expressions including function calls inside comprehensions",
        "Use conditional expressions (ternary) in the output expression",
        "Transform structured data (list of dicts, list of tuples)",
      ],
      prerequisites: [],
      concepts: ["list-comprehension"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Complex Output Expressions\n\nThe expression in a comprehension can be any valid Python expression — including function calls, arithmetic, method calls, and even ternary expressions:\n\n```python\nimport math\n\nnumbers = [1, 4, 9, 16, 25]\nroots   = [math.sqrt(n) for n in numbers]\nprint(roots)   # [1.0, 2.0, 3.0, 4.0, 5.0]\n\n# Ternary in the expression\nnums   = [-3, 0, 5, -1, 8]\nclamped = [n if n > 0 else 0 for n in nums]\nprint(clamped)  # [0, 0, 5, 0, 8]\n```\n\n## Transforming Structured Data\n\n```python\n# List of tuples -> extract one field\nemployees = [(\"Alice\", 95000), (\"Bob\", 72000), (\"Carol\", 88000)]\nnames     = [name for name, _ in employees]\nprint(names)   # ['Alice', 'Bob', 'Carol']\n\n# List of dicts -> select and format fields\nrecords = [\n    {\"name\": \"Alice\", \"age\": 30, \"dept\": \"Engineering\"},\n    {\"name\": \"Bob\",   \"age\": 25, \"dept\": \"Marketing\"},\n]\nsummaries = [f\"{r['name']} ({r['dept']})\" for r in records]\nprint(summaries)   # ['Alice (Engineering)', 'Bob (Marketing)']\n```\n\n## Flattening One Level\n\n```python\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflat   = [n for row in matrix for n in row]\nprint(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "The _ convention for unused loop variables",
          body: "When you unpack a tuple in a comprehension but don't need all fields, use `_` for the ones you ignore: `[name for name, _ in employees]`. This communicates that the salary field is intentionally discarded.",
        },
      ],
      interactions: [
        {
          id: "s12-transform-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a ternary expression in a comprehension",
          expectedConceptIds: ["list-comprehension"],
          code: "values = [10, -5, 0, 3, -2]\nresult = [v if v >= 0 else -v for v in values]\nprint(result)",
          expectedOutput: "[10, 5, 0, 3, 2]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Ternary: keep v when v>=0, otherwise negate it. This computes abs(v)." }],
          feedback: { correct: "Correct! The ternary computes the absolute value: [-5 becomes 5, -2 becomes 2].", incorrect: "For each v: if v>=0 keep v, otherwise use -v. This gives the absolute value of each element." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-transform-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.4 — Nested comprehensions ────────────────────────────── */
    {
      id: "s12-nested-comprehensions",
      stageId: "stage-12",
      title: "Nested Comprehensions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write comprehensions with multiple for clauses",
        "Flatten nested iterables with nested for clauses",
        "Recognize when nested comprehensions reduce readability",
      ],
      prerequisites: [],
      concepts: ["list-comprehension"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Multiple for Clauses\n\nYou can use multiple `for` clauses in a comprehension, which is equivalent to nested loops:\n\n```python\n# Cartesian product of two ranges\npairs = [(x, y) for x in range(3) for y in range(3)]\nprint(pairs)\n# [(0,0),(0,1),(0,2),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2)]\n```\n\nThe leftmost `for` is the outermost loop:\n\n```python\n# Equivalent nested loops:\npairs = []\nfor x in range(3):\n    for y in range(3):\n        pairs.append((x, y))\n```\n\n## Flattening a Matrix\n\n```python\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflat   = [n for row in matrix for n in row]\nprint(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]\n```\n\n## Generating a Multiplication Table\n\n```python\ntable = [(i, j, i * j) for i in range(1, 4) for j in range(1, 4)]\nfor i, j, product in table:\n    print(f\"{i} x {j} = {product}\")\n```\n\n## When to Stop\n\nTwo `for` clauses is usually readable. Three or more signals that a regular nested loop may be clearer:\n\n```python\n# Readable\nflat = [n for row in matrix for n in row]\n\n# Getting hard to read — consider a regular loop\nresult = [f(x, y, z) for x in a for y in b for z in c if condition]\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Order of for clauses mirrors nested loop order",
          body: "In `[x for a in outer for x in a]`, `outer` is iterated first (outermost loop), then `a` (inner loop). Getting this order wrong produces the wrong output. When in doubt, write it as nested loops first, then convert.",
        },
      ],
      interactions: [
        {
          id: "s12-nested-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace nested for clauses as equivalent to nested loops",
          expectedConceptIds: ["list-comprehension"],
          code: "result = [i + j for i in [1, 2] for j in [10, 20]]\nprint(result)",
          expectedOutput: "[11, 21, 12, 22]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Outer loop i: 1, 2. Inner loop j: 10, 20. Pairs: (1,10)→11, (1,20)→21, (2,10)→12, (2,20)→22." }],
          feedback: { correct: "Correct! Nested loops: i=1 with j=10,20 first, then i=2 with j=10,20.", incorrect: "i iterates outer: 1 then 2. For each i, j iterates 10 then 20. Results: 1+10=11, 1+20=21, 2+10=12, 2+20=22." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-nested-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.5 — Dictionary comprehensions ────────────────────────── */
    {
      id: "s12-dict-comprehensions",
      stageId: "stage-12",
      title: "Dictionary Comprehensions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Build a dictionary with {key: value for item in iterable}",
        "Invert a dictionary with a dict comprehension",
        "Filter entries using an if clause",
      ],
      prerequisites: [],
      concepts: ["list-comprehension"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The General Form\n\nReplace `[` with `{` and add `: value` after the key expression:\n\n```python\n{key_expression: value_expression  for  variable  in  iterable}\n```\n\n## Examples\n\n```python\n# Squares dict: number -> square\nsquares = {n: n ** 2 for n in range(1, 6)}\nprint(squares)\n# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n\n# Lower-case all keys\noriginal = {\"Name\": \"Alice\", \"Age\": 30, \"City\": \"London\"}\nnormalized = {k.lower(): v for k, v in original.items()}\nprint(normalized)\n# {'name': 'Alice', 'age': 30, 'city': 'London'}\n```\n\n## Inverting a Dictionary\n\n```python\n# Map English -> Spanish words\nen_to_es = {\"hello\": \"hola\", \"bye\": \"adios\", \"thanks\": \"gracias\"}\n\n# Invert: Spanish -> English\nes_to_en = {v: k for k, v in en_to_es.items()}\nprint(es_to_en)\n# {'hola': 'hello', 'adios': 'bye', 'gracias': 'thanks'}\n```\n\n## With Filtering\n\n```python\nscores = {\"Alice\": 95, \"Bob\": 72, \"Carol\": 88, \"Dave\": 65}\n\n# Only students who passed (score >= 75)\npassed = {name: score for name, score in scores.items() if score >= 75}\nprint(passed)\n# {'Alice': 95, 'Carol': 88}\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Duplicate keys: last value wins",
          body: "If multiple items produce the same key, the last one overwrites the earlier ones — just like regular dict assignment. Be aware when inverting dicts with non-unique values.",
        },
      ],
      interactions: [
        {
          id: "s12-dict-comp-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Build a dict comprehension mapping words to their lengths",
          expectedConceptIds: ["list-comprehension"],
          code: "words = [\"cat\", \"elephant\", \"dog\"]\nlengths = {w: len(w) for w in words}\nprint(lengths[\"elephant\"])",
          expectedOutput: "8",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Dict comprehension maps each word to its length. len('elephant') = 8." }],
          feedback: { correct: "Correct! lengths = {'cat':3, 'elephant':8, 'dog':3}. lengths['elephant'] is 8.", incorrect: "The comprehension creates {word: len(word)} for each word. len('elephant') = 8." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-dict-comp-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.6 — Set comprehensions ───────────────────────────────── */
    {
      id: "s12-set-comprehensions",
      stageId: "stage-12",
      title: "Set Comprehensions",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Create a set with {expression for item in iterable}",
        "Understand that set comprehensions automatically deduplicate",
        "Choose the right comprehension type for the required container",
      ],
      prerequisites: [],
      concepts: ["list-comprehension"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Set Comprehension Syntax\n\nSame as a list comprehension but with curly braces and no colon:\n\n```python\n{expression  for  variable  in  iterable}\n```\n\n```python\n# Unique first characters of words\nwords = [\"apple\", \"avocado\", \"banana\", \"blueberry\", \"cherry\"]\nfirst_chars = {w[0] for w in words}\nprint(first_chars)   # {'a', 'b', 'c'} — order varies\n```\n\n## Automatic Deduplication\n\nUnlike list comprehensions, set comprehensions automatically discard duplicates:\n\n```python\nnums = [1, 2, 2, 3, 3, 3, 4]\nresult_list = [n * 2 for n in nums]   # [2, 4, 4, 6, 6, 6, 8]\nresult_set  = {n * 2 for n in nums}   # {2, 4, 6, 8}\n\nprint(len(result_list))   # 7\nprint(len(result_set))    # 4\n```\n\n## With Filtering\n\n```python\nscores = [45, 78, 92, 61, 88, 73, 55, 97]\npassing_grades = {s // 10 * 10 for s in scores if s >= 60}\nprint(passing_grades)   # {60, 70, 80, 90} — decade buckets, unique\n```",
        },
        {
          kind: "comparison",
          leftLabel: "List comprehension",
          rightLabel: "Set comprehension",
          leftCode: "nums = [1, 2, 2, 3]\nresult = [n * 2 for n in nums]\nprint(result)\n# [2, 4, 4, 6] — keeps duplicates",
          rightCode: "nums = [1, 2, 2, 3]\nresult = {n * 2 for n in nums}\nprint(result)\n# {2, 4, 6} — duplicates removed",
        },
      ],
      interactions: [
        {
          id: "s12-set-comp-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Observe deduplication in a set comprehension",
          expectedConceptIds: ["list-comprehension"],
          code: "data = [3, 1, 4, 1, 5, 9, 2, 6, 5]\nresult = {x % 3 for x in data}\nprint(len(result))",
          expectedOutput: "3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "x % 3 can produce 0, 1, or 2. All three remainders appear in data — 3 unique values." }],
          feedback: { correct: "Correct! x%3 produces 0, 1, or 2. All three appear, giving 3 unique values.", incorrect: "x % 3 gives the remainder when divided by 3. The possible values are 0, 1, 2 — all three appear, so the set has 3 elements." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-set-comp-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.7 — Generator expressions ───────────────────────────── */
    {
      id: "s12-generator-expressions",
      stageId: "stage-12",
      title: "Generator Expressions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write a generator expression using (expression for item in iterable)",
        "Understand that generators are lazy — they compute values on demand",
        "Use generator expressions with sum(), max(), min(), and any()/all()",
      ],
      prerequisites: [],
      concepts: ["generator-expression"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Generators: Lazy Evaluation\n\nA **generator expression** looks like a list comprehension with parentheses instead of brackets:\n\n```python\n# List comprehension — builds the entire list in memory immediately\nsquares_list = [n ** 2 for n in range(1_000_000)]\n\n# Generator expression — computes each value on demand, no list built\nsquares_gen  = (n ** 2 for n in range(1_000_000))\n```\n\nThe generator does not compute any values until something *asks* for the next one.\n\n## Using Generators Directly\n\nGenerator expressions work anywhere an iterable is accepted:\n\n```python\nnumbers = range(1, 11)\n\n# sum() pulls values from the generator one at a time\ntotal   = sum(n ** 2 for n in numbers)\nprint(total)   # 385\n\n# max() and min() do the same\nbiggest = max(abs(x) for x in [-3, 1, -7, 4])\nprint(biggest)  # 7\n\n# any() short-circuits — stops at first True\nhas_even = any(n % 2 == 0 for n in [1, 3, 4, 5])\nprint(has_even)  # True  — stops when it finds 4\n\n# all() short-circuits — stops at first False\nall_pos  = all(n > 0 for n in [1, 2, -1, 3])\nprint(all_pos)   # False — stops when it finds -1\n```\n\n## Memory Efficiency\n\n```python\nimport sys\n\nlist_comp = [n ** 2 for n in range(10_000)]\ngen_expr  = (n ** 2 for n in range(10_000))\n\nprint(sys.getsizeof(list_comp))   # ~87,632 bytes (stores all values)\nprint(sys.getsizeof(gen_expr))    # ~104 bytes (stores only the iterator state)\n```",
        },
        {
          kind: "mental-model",
          title: "A generator is a recipe, not a cake",
          analogy: "A list comprehension bakes the entire cake immediately — you get a complete list in memory. A generator expression is just the recipe — it knows how to produce values but only does so when asked for the next one.",
          explanation: "When you pass a generator to sum(), it asks for one value at a time, adds it, then asks for the next. Only one value exists in memory at any moment. This is why generators can handle sequences of billions of elements that would crash the program if materialized as lists.",
        },
        {
          kind: "why-matters",
          body: "Generator expressions are essential when processing large datasets, reading files line by line, or building data pipelines. A pipeline of generator expressions processes data in a single pass — each element flows through all stages before the next element is even loaded.",
        },
      ],
      interactions: [
        {
          id: "s12-gen-expr-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Use a generator expression with sum() to compute a result without building a list",
          expectedConceptIds: ["generator-expression"],
          code: "total = sum(i * i for i in range(1, 5))\nprint(total)",
          expectedOutput: "30",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "1*1 + 2*2 + 3*3 + 4*4 = 1 + 4 + 9 + 16 = 30." }],
          feedback: { correct: "Correct! 1+4+9+16=30. The generator computes each square lazily as sum() requests it.", incorrect: "sum(i*i for i in range(1,5)) = 1*1+2*2+3*3+4*4 = 1+4+9+16 = 30." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-gen-expr-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.8 — Readability boundaries ───────────────────────────── */
    {
      id: "s12-readability",
      stageId: "stage-12",
      title: "Readability Boundaries",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Identify when a comprehension is too complex and should be a loop",
        "Apply the 'fits on one readable line' guideline",
        "Refactor complex comprehensions into named helpers",
      ],
      prerequisites: [],
      concepts: ["list-comprehension"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## When Comprehensions Are Clear\n\nComprehensions are best when the intent is immediately obvious — simple transformations and filters:\n\n```python\n# Clearly readable\nscores   = [int(s) for s in raw_scores]\nevens    = [n for n in data if n % 2 == 0]\nupper    = [w.upper() for w in words]\n```\n\n## When Comprehensions Become Cryptic\n\nComplex logic, multiple conditions, or deeply nested structures signal that a regular loop is better:\n\n```python\n# Hard to parse — too much in one line\nresult = [f(x) for x in data if g(x) and h(x) and not k(x)]\n\n# Better: extract the filter and name it\ndef should_include(x):\n    return g(x) and h(x) and not k(x)\n\nresult = [f(x) for x in data if should_include(x)]\n\n# Or just use a loop\nresult = []\nfor x in data:\n    if g(x) and h(x) and not k(x):\n        result.append(f(x))\n```\n\n## The 'Can You Read It Aloud?' Test\n\nIf you can read the comprehension as one English sentence and immediately understand it, keep it. If you need to stop and trace through it mentally, rewrite it.\n\n```python\n# OK: \"square each positive number in the list\"\nresult = [n ** 2 for n in numbers if n > 0]\n\n# Not OK: requires mental tracing\nresult = [{k: [v * 2 for v in vs if v % 2 == 0] for k, vs in d.items()} for d in data]\n```\n\n## Multi-Line Comprehensions\n\nWhen a comprehension is long but still readable, format it across multiple lines:\n\n```python\nresult = [\n    process(item)\n    for item in dataset\n    if item.is_valid()\n]",
        },
        {
          kind: "why-matters",
          body: "Code is read many more times than it is written. A comprehension that saves 2 lines but takes 20 seconds to understand every time someone reads it is not a win. The goal is clarity — comprehensions are a tool for that, not an end in themselves.",
        },
      ],
      interactions: [
        {
          id: "s12-readability-mc",
          kind: "multiple-choice",
          prompt: "Which approach is best for this requirement: 'Square each number greater than 0 in the list data'?",
          beginnerPurpose: "Choose the appropriately clear form for a straightforward transformation+filter",
          expectedConceptIds: ["list-comprehension"],
          options: [
            { id: "a", text: "[n**2 for n in data if n > 0]", isCorrect: true, explanation: "Correct! This is a simple filter+transform that reads clearly in one line." },
            { id: "b", text: "list(filter(lambda n: n > 0, map(lambda n: n**2, data)))", isCorrect: false, explanation: "This works but is harder to read than the comprehension. The comprehension form is preferred." },
            { id: "c", text: "A helper function calling both filter() and map()", isCorrect: false, explanation: "For this simple case, the overhead of a helper function is unnecessary — the comprehension is clear enough." },
            { id: "d", text: "A for loop with an if check and .append()", isCorrect: false, explanation: "For this simple case, the comprehension is clearer. Loops are better for complex multi-step logic." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "A comprehension is ideal when it fits on one line and reads like a sentence." }],
          feedback: { correct: "Correct! Simple filter+transform like this is the ideal comprehension use case.", incorrect: "For a simple 'square positives' requirement, the comprehension [n**2 for n in data if n > 0] is the clearest form." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-readability-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.9 — Rewriting loops as comprehensions ────────────────── */
    {
      id: "s12-loops-to-comprehensions",
      stageId: "stage-12",
      title: "Rewriting Loops as Comprehensions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Identify append-loops that can be rewritten as comprehensions",
        "Apply the mechanical transformation: collect → expression → for → if",
        "Preserve correctness while converting loop to comprehension",
      ],
      prerequisites: [],
      concepts: ["list-comprehension"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Conversion Pattern\n\nAny loop that initializes an empty list and appends in each iteration can become a comprehension:\n\n```python\n# Loop form:\nresult = []\nfor item in iterable:\n    result.append(expression)\n\n# Comprehension form:\nresult = [expression for item in iterable]\n```\n\nAdd `if condition` when there is a guard:\n\n```python\n# Loop with filter:\nresult = []\nfor item in iterable:\n    if condition:\n        result.append(expression)\n\n# Comprehension with filter:\nresult = [expression for item in iterable if condition]\n```\n\n## Worked Examples\n\n```python\n# Example 1: Extract year from date strings\ndates = [\"2024-03-15\", \"2023-07-22\", \"2025-01-01\"]\n\n# Loop:\nyears = []\nfor d in dates:\n    years.append(int(d[:4]))\n\n# Comprehension:\nyears = [int(d[:4]) for d in dates]\nprint(years)   # [2024, 2023, 2025]\n\n# Example 2: Strip whitespace from non-empty lines\nlines = [\"  hello  \", \"\", \"  world  \", \"  \", \"python\"]\n\n# Loop:\ncleaned = []\nfor line in lines:\n    stripped = line.strip()\n    if stripped:\n        cleaned.append(stripped)\n\n# Comprehension:\ncleaned = [line.strip() for line in lines if line.strip()]\nprint(cleaned)   # ['hello', 'world', 'python']\n```\n\n## When NOT to Convert\n\nDo not convert loops that:\n- Have multiple side effects (printing, writing to file)\n- Accumulate with operations other than append (sum, max, dict building)\n- Are too complex to read in one line",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Double .strip() is fine here",
          body: "Calling `line.strip()` twice in `[line.strip() for line in lines if line.strip()]` is common and idiomatic. If performance matters, use a walrus operator: `[stripped for line in lines if (stripped := line.strip())]`.",
        },
      ],
      interactions: [
        {
          id: "s12-loops-fill",
          kind: "fill-code",
          prompt: "Convert the loop to a single-line list comprehension that produces the same result.",
          beginnerPurpose: "Apply the mechanical loop-to-comprehension conversion",
          expectedConceptIds: ["list-comprehension"],
          codeTemplate: "# Original loop:\n# result = []\n# for x in range(10):\n#     if x % 2 == 0:\n#         result.append(x ** 2)\n\nresult = [____]\nprint(result)",
          blanks: [{ placeholder: "____", answer: "x ** 2 for x in range(10) if x % 2 == 0", caseSensitive: false }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Pattern: [expression for variable in iterable if condition]. Expression is x**2, variable is x, iterable is range(10), condition is x%2==0." }],
          feedback: { correct: "Correct! [x**2 for x in range(10) if x%2==0] produces [0,4,16,36,64].", incorrect: "The comprehension form: [x**2 for x in range(10) if x%2==0]. Expression first, then for, then optional if." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-loops-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.10 — Rewriting comprehensions as loops ───────────────── */
    {
      id: "s12-comprehensions-to-loops",
      stageId: "stage-12",
      title: "Rewriting Comprehensions as Loops",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Expand any comprehension back to an equivalent loop",
        "Debug comprehension results by expanding to a loop",
        "Understand when the loop form is better than the comprehension",
      ],
      prerequisites: [],
      concepts: ["list-comprehension"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Reverse Pattern\n\nEvery list comprehension has an equivalent loop:\n\n```python\n# Comprehension:\nresult = [expr for var in iterable if condition]\n\n# Equivalent loop:\nresult = []\nfor var in iterable:\n    if condition:\n        result.append(expr)\n```\n\n## Why Expand?\n\nExpanding a comprehension to a loop is useful when:\n1. Debugging — you can add `print()` statements inside\n2. Adding complex logic — multiple assignments, multi-line conditionals\n3. Sharing results with colleagues unfamiliar with comprehensions\n\n```python\n# Original comprehension:\nresult = [process(x) for x in data if validate(x)]\n\n# Expanded for debugging:\nresult = []\nfor x in data:\n    if validate(x):\n        processed = process(x)\n        print(f\"  {x} -> {processed}\")  # debug\n        result.append(processed)\n```\n\n## Nested Comprehension → Nested Loops\n\n```python\n# Comprehension:\npairs = [(x, y) for x in range(3) for y in range(3) if x != y]\n\n# Expanded:\npairs = []\nfor x in range(3):\n    for y in range(3):\n        if x != y:\n            pairs.append((x, y))\n\n# Both produce:\n# [(0,1),(0,2),(1,0),(1,2),(2,0),(2,1)]\n```",
        },
        {
          kind: "why-matters",
          body: "Being able to translate between comprehension and loop forms fluently makes you a more effective debugger. When a comprehension produces wrong output, expanding it to a loop and printing intermediate values is the fastest diagnostic tool.",
        },
      ],
      interactions: [
        {
          id: "s12-comp-to-loop-predict",
          kind: "predict-output",
          prompt: "What does this loop — the expansion of a comprehension — print?",
          beginnerPurpose: "Verify understanding by reading an expanded comprehension as a loop",
          expectedConceptIds: ["list-comprehension"],
          code: "result = []\nfor n in range(1, 6):\n    if n % 2 == 1:\n        result.append(n ** 2)\nprint(result)",
          expectedOutput: "[1, 9, 25]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Odd numbers in 1-5: 1, 3, 5. Squares: 1, 9, 25." }],
          feedback: { correct: "Correct! Odd numbers in range(1,6): 1,3,5. Squares: 1,9,25.", incorrect: "n%2==1 selects odd numbers: 1,3,5. Squaring gives 1,9,25." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-comp-to-loop-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.11 — Data cleaning patterns ──────────────────────────── */
    {
      id: "s12-data-cleaning",
      stageId: "stage-12",
      title: "Data Cleaning Patterns",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Strip whitespace and normalize case in string collections",
        "Remove None, empty strings, and invalid entries using comprehensions",
        "Parse and validate values inside a comprehension",
      ],
      prerequisites: [],
      concepts: ["comprehension-filtering"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Common Data-Cleaning Tasks\n\nReal data is messy. Comprehensions are the most concise tool for systematic cleaning:\n\n```python\n# 1. Strip whitespace and normalize case\nraw_tags = [\"  Python  \", \"JAVA\", \" javascript \", \"Rust\"]\ncleaned  = [tag.strip().lower() for tag in raw_tags]\nprint(cleaned)   # ['python', 'java', 'javascript', 'rust']\n\n# 2. Remove None and empty strings\nraw = [\"Alice\", None, \"\", \"Bob\", \"  \", \"Carol\"]\nvalid = [name.strip() for name in raw if name and name.strip()]\nprint(valid)   # ['Alice', 'Bob', 'Carol']\n\n# 3. Parse and validate numbers\nraw_nums = [\"42\", \"invalid\", \"7\", \"\", \"99\", \"abc\"]\ndef safe_int(s):\n    try:\n        return int(s)\n    except (ValueError, TypeError):\n        return None\n\nnumbers = [n for s in raw_nums if (n := safe_int(s)) is not None]\nprint(numbers)   # [42, 7, 99]\n\n# 4. De-duplicate while preserving order\nentries = [\"alice\", \"Bob\", \"alice\", \"CAROL\", \"bob\"]\nunique  = list(dict.fromkeys(e.lower() for e in entries))\nprint(unique)    # ['alice', 'bob', 'carol']\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "The walrus operator := in comprehensions",
          body: "The walrus operator (`:=`, available from Python 3.8) assigns a value to a name inside an expression. It is useful in comprehensions to avoid calling the same function twice: `[n for s in raw if (n := safe_int(s)) is not None]`.",
        },
      ],
      interactions: [
        {
          id: "s12-cleaning-run",
          kind: "run-code",
          prompt: "Clean the `raw_names` list: strip whitespace, convert to title case, and remove empty strings. Print each cleaned name on its own line.",
          beginnerPurpose: "Apply multiple cleaning operations in one comprehension",
          expectedConceptIds: ["comprehension-filtering"],
          starterCode: `raw_names = ["  alice  ", "BOB", "", "  carol  ", "   ", "dave"]

# Clean: strip, title case, remove empties
cleaned = []  # replace with a comprehension

for name in cleaned:
    print(name)`,
          task: "Print Alice, Bob, Carol, Dave — one per line, title-cased.",
          expectedOutputContains: ["Alice", "Bob", "Carol", "Dave"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Use [name.strip().title() for name in raw_names if name.strip()] — strip first to test emptiness, then title-case." }],
          feedback: { correct: "Correct! Stripping, filtering empties, and title-casing produces Alice, Bob, Carol, Dave.", incorrect: "Use [name.strip().title() for name in raw_names if name.strip()] to strip, filter, and title-case in one step." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-cleaning-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.12 — Data transformation pipelines ───────────────────── */
    {
      id: "s12-pipelines",
      stageId: "stage-12",
      title: "Data Transformation Pipelines",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Chain multiple comprehension/generator steps into a pipeline",
        "Process data in stages: load, clean, filter, transform, aggregate",
        "Use generator expressions to avoid materializing intermediate lists",
      ],
      prerequisites: [],
      concepts: ["generator-expression"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Chaining Steps\n\nComplex data processing is clearest when broken into named stages:\n\n```python\nraw_data = [\n    \"Alice,95,Engineering\",\n    \"Bob,,Marketing\",       # missing score\n    \"Carol,88,Engineering\",\n    \"Dave,72,Marketing\",\n    \"Eve,91\",               # missing department\n]\n\n# Stage 1: parse rows\ndef parse_row(row):\n    parts = row.split(\",\")\n    if len(parts) < 3 or not parts[1]:\n        return None\n    name, score, dept = parts\n    return {\"name\": name, \"score\": int(score), \"dept\": dept}\n\nrows = [parse_row(r) for r in raw_data]\n\n# Stage 2: remove invalid rows\nvalid = [r for r in rows if r is not None]\n\n# Stage 3: filter by department\neng  = [r for r in valid if r[\"dept\"] == \"Engineering\"]\n\n# Stage 4: extract scores and compute average\nscores = [r[\"score\"] for r in eng]\navg    = sum(scores) / len(scores)\nprint(f\"Engineering average: {avg}\")   # 91.5\n```\n\n## Generator Pipeline: No Intermediate Lists\n\nFor very large datasets, use generator expressions to avoid allocating intermediate lists:\n\n```python\n# Each expression is lazy — only one element in memory at a time\nlines    = open(\"data.csv\")           # lazy file reading\nparsed   = (parse_row(l) for l in lines)\nvalid    = (r for r in parsed if r)\neng_only = (r for r in valid if r[\"dept\"] == \"Engineering\")\nscores   = (r[\"score\"] for r in eng_only)\n\ntotal  = sum(scores)  # triggers the whole pipeline, one element at a time\n```",
        },
        {
          kind: "mental-model",
          title: "Pipeline as an assembly line",
          analogy: "Each stage in the pipeline is a station on an assembly line. Raw material (data) enters at one end and passes through each station in sequence. Generator expressions mean only one piece of material is on the line at a time — the rest stays in the warehouse (file/database) until needed.",
          explanation: "This contrasts with list comprehensions, which are like running all material through each station completely before moving to the next station — building huge intermediate piles that occupy memory.",
        },
      ],
      interactions: [
        {
          id: "s12-pipeline-predict",
          kind: "predict-output",
          prompt: "What does this pipeline print?",
          beginnerPurpose: "Trace a chained pair of comprehensions as a two-stage pipeline",
          expectedConceptIds: ["generator-expression"],
          code: "data   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nstep1  = [x for x in data if x % 2 == 0]\nstep2  = [x ** 2 for x in step1]\nprint(step2)",
          expectedOutput: "[4, 16, 36, 64, 100]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Step 1: evens from 1-10 = [2,4,6,8,10]. Step 2: square each = [4,16,36,64,100]." }],
          feedback: { correct: "Correct! Filter evens first [2,4,6,8,10], then square [4,16,36,64,100].", incorrect: "First filter evens from 1-10: [2,4,6,8,10]. Then square each: [4,16,36,64,100]." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-pipeline-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.13 — Comprehension debugging drills ──────────────────── */
    {
      id: "s12-debugging-drills",
      stageId: "stage-12",
      title: "Comprehension Debugging Drills",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Identify and fix common comprehension mistakes",
        "Trace through comprehensions to predict output",
        "Expand broken comprehensions to loops for debugging",
      ],
      prerequisites: [],
      concepts: ["list-comprehension", "comprehension-filtering"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Common Mistake 1: Filter and Transform Swapped\n\nThe `if` clause filters — it belongs *after* the `for`, not inside the expression:\n\n```python\n# Bug: if in expression position\n# result = [x if x > 0 for x in data]   # SyntaxError\n\n# Fix: if as a filter\nresult = [x for x in data if x > 0]\n\n# Note: x if x > 0 else 0 in the EXPRESSION is valid (ternary):\nresult = [x if x > 0 else 0 for x in data]\n```\n\n## Common Mistake 2: Nested Loops in Wrong Order\n\n```python\nrows = [[1, 2], [3, 4], [5, 6]]\n\n# Bug — iterates inner list first\n# wrong = [row for row in n for n in rows]  # NameError\n\n# Fix — outer iterable first\ncorrect = [n for row in rows for n in row]\nprint(correct)   # [1, 2, 3, 4, 5, 6]\n```\n\n## Common Mistake 3: Missing the Condition\n\n```python\nwords = [\"hello\", \"\", \"world\", \"\", \"python\"]\n\n# Bug: no filter, empty strings included\nwith_empties = [w.upper() for w in words]\nprint(with_empties)   # ['HELLO', '', 'WORLD', '', 'PYTHON']\n\n# Fix: add filter\nfiltered = [w.upper() for w in words if w]\nprint(filtered)   # ['HELLO', 'WORLD', 'PYTHON']\n```\n\n## Debugging Technique: Expand and Print\n\nWhen the result is wrong, expand the comprehension to a loop and add print statements:\n\n```python\n# Suspicious comprehension:\nresult = [int(x) for x in [\"1\", \"2\", \"bad\", \"4\"]]\n# Crashes with ValueError on 'bad'\n\n# Expanded with debugging:\nresult = []\nfor x in [\"1\", \"2\", \"bad\", \"4\"]:\n    print(f\"Processing: {x!r}\")   # see which value causes crash\n    result.append(int(x))\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Ternary vs filter: two different things",
          body: "`[x if x > 0 else 0 for x in data]` — ternary in the expression: transforms every element (negative→0, positive→kept). `[x for x in data if x > 0]` — filter: skips negative elements entirely. Different semantics!",
        },
      ],
      interactions: [
        {
          id: "s12-debugging-debug",
          kind: "debug-code",
          prompt: "This comprehension should produce squares of only the positive numbers. Fix the bug.",
          beginnerPurpose: "Identify that the ternary is used where a filter is needed",
          expectedConceptIds: ["comprehension-filtering"],
          brokenCode: "data = [-3, 1, -1, 4, -2, 5]\nresult = [n**2 if n > 0 for n in data]\nprint(result)",
          bugDescription: "The ternary expression `n**2 if n > 0` is missing the `else` branch, making it a syntax error. To filter (skip negatives), move the `if` to the filter position after `for`.",
          fixedCode: "data = [-3, 1, -1, 4, -2, 5]\nresult = [n**2 for n in data if n > 0]\nprint(result)",
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "To filter (exclude negatives), write: [n**2 for n in data if n > 0]. The `if` goes after the `for`, not in the expression." }],
          feedback: { correct: "Correct! [n**2 for n in data if n > 0] filters out negatives and squares the rest.", incorrect: "Move the `if` to the filter position: [n**2 for n in data if n > 0]. This skips negatives entirely." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-debugging-debug"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 12.14 — Transformation project ──────────────────────────── */
    {
      id: "s12-transformation-project",
      stageId: "stage-12",
      title: "Transformation Project",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Apply comprehensions and generators to process a realistic dataset",
        "Build a multi-stage transformation pipeline",
        "Produce summary statistics using generator expressions",
      ],
      prerequisites: [],
      concepts: ["list-comprehension", "comprehension-filtering", "generator-expression"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project: Student Score Report Generator\n\nProcess raw CSV-like student data through multiple transformation stages and produce a formatted report.\n\n### Raw Data\n\n```python\nraw_records = [\n    \"Alice,92,85,88,90\",\n    \"Bob,70,,68,72\",      # missing one score\n    \"Carol,95,91,93,97\",\n    \"Dave,55,60,58,\",     # trailing comma\n    \"Eve,88,82,85,80\",\n]\n```\n\n### Stage 1: Parse\n\n```python\ndef parse_record(row):\n    parts = row.split(\",\")\n    name  = parts[0]\n    scores = [int(s) for s in parts[1:] if s.strip().isdigit()]\n    return {\"name\": name, \"scores\": scores}\n\nparsed = [parse_record(r) for r in raw_records]\n```\n\n### Stage 2: Compute Averages\n\n```python\nwith_avgs = [\n    {**r, \"avg\": round(sum(r[\"scores\"]) / len(r[\"scores\"]), 1)}\n    for r in parsed\n    if r[\"scores\"]   # skip records with no valid scores\n]\n```\n\n### Stage 3: Assign Grade Letters\n\n```python\ndef grade(avg):\n    if avg >= 90: return \"A\"\n    if avg >= 80: return \"B\"\n    if avg >= 70: return \"C\"\n    if avg >= 60: return \"D\"\n    return \"F\"\n\nwith_grades = [{**r, \"grade\": grade(r[\"avg\"])} for r in with_avgs]\n```\n\n### Stage 4: Summary Statistics (generator expressions)\n\n```python\nall_avgs = [r[\"avg\"] for r in with_grades]\nprint(f\"Class average: {sum(all_avgs)/len(all_avgs):.1f}\")\nprint(f\"Highest:       {max(r['avg'] for r in with_grades):.1f}\")\nprint(f\"Passing:       {sum(1 for r in with_grades if r['avg'] >= 70)}\")\n\nby_grade = {g: [r['name'] for r in with_grades if r['grade']==g]\n            for g in 'ABCDF'}\nfor g, names in by_grade.items():\n    if names:\n        print(f\"{g}: {', '.join(names)}\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "{**r, 'key': value} — non-destructive dict update",
          body: "`{**r, 'avg': computed}` creates a new dict with all keys from `r` plus the new 'avg' key. This is the comprehension equivalent of `r.copy(); r['avg'] = computed` — it does not modify the original.",
        },
      ],
      interactions: [
        {
          id: "s12-project-run",
          kind: "run-code",
          prompt: "Given the scores list, use a comprehension to produce a list of (name, average) tuples for students with average >= 80. Print each tuple.",
          beginnerPurpose: "Combine filter, computation, and tuple construction in one comprehension",
          expectedConceptIds: ["list-comprehension", "comprehension-filtering"],
          starterCode: `students = [
    ("Alice",  [92, 85, 88, 90]),
    ("Bob",    [70, 68, 68, 72]),
    ("Carol",  [95, 91, 93, 97]),
    ("Dave",   [55, 60, 58, 57]),
    ("Eve",    [88, 82, 85, 80]),
]

# Produce (name, avg) for students with avg >= 80
result = []  # replace with a comprehension

for item in result:
    print(item)`,
          task: "Print (Alice, 88.75), (Carol, 94.0), (Eve, 83.75) — or similar tuples with name and average.",
          expectedOutputContains: ["Alice", "Carol", "Eve"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Use [(name, sum(scores)/len(scores)) for name, scores in students if sum(scores)/len(scores) >= 80]." }],
          feedback: { correct: "Correct! Alice, Carol, and Eve all have averages >= 80. Bob and Dave do not.", incorrect: "Comprehension: [(name, sum(scores)/len(scores)) for name, scores in students if sum(scores)/len(scores) >= 80]." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s12-project-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s12-project",
    stageId: "stage-12",
    title: "Data Transformation Pipeline",
    brief:
      "Build a multi-stage data transformation pipeline using comprehensions and generator expressions. The pipeline reads raw CSV-like records, parses and validates each row, cleans string fields, computes derived values, groups results by category, and produces summary statistics — all without writing a single explicit append loop.",
    requirements: [
      "Parse raw CSV strings into dicts using a list comprehension",
      "Clean and normalize string fields (strip, lower/title) using comprehensions",
      "Filter invalid or incomplete records using comprehension if clauses",
      "Compute a derived field (e.g., average, total, grade) for each valid record",
      "Use a dict comprehension to group records by a category field",
      "Use generator expressions (not list comprehensions) for all aggregate statistics",
    ],
    acceptanceCriteria: [
      "No explicit for-loop with .append() — all collection building uses comprehensions",
      "All aggregates (sum, max, min, count) use generator expressions passed directly to built-ins",
      "Invalid/incomplete records are silently excluded via comprehension filtering",
      "Final grouped output is correct and matches expected groupings",
    ],
    conceptIds: ["list-comprehension", "generator-expression", "comprehension-filtering"],
    difficulty: "intermediate",
  },
} satisfies Stage;
