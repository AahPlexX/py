import type { Stage } from "@/course/course.schema";

export const stage25 = {
  id: "stage-25",
  number: 25,
  title: "Standard Library Data Structures and Algorithms",
  summary:
    "Master Python's collections module, utility data structures, and algorithm helpers — Counter, defaultdict, deque, heapq, bisect, and more — with hands-on exercises.",
  level: "intermediate",
  masteryGateConceptIds: [
    "collections-counter",
    "collections-defaultdict",
    "collections-deque",
    "collections-namedtuple",
    "heapq-module",
    "bisect-module",
  ],

  lessons: [
    /* ── Lesson 25.1: collections.Counter ─────────────────────────────────── */
    {
      id: "s25-counter",
      stageId: "stage-25",
      title: "collections.Counter",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a Counter from an iterable or keyword arguments",
        "Use most_common() to find the top N elements",
        "Perform arithmetic on Counters (add, subtract, intersection, union)",
        "Recognize when Counter is the right tool over a plain dict",
      ],
      prerequisites: [],
      concepts: ["collections-counter"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### The counting problem\n\nCounting occurrences of items is one of the most common data tasks: word frequencies, vote tallies, inventory counts, log-level summaries. Without a specialized tool you would write a `for` loop, check `if key in d`, increment, and repeat. Python's `collections.Counter` does all of that in one step.",
        },
        {
          kind: "text",
          markdown:
            "### What Counter does\n\n`Counter` is a dict subclass that maps each element to the number of times it appears. You can pass any iterable to the constructor and it counts automatically. Missing keys return `0` instead of raising `KeyError`.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import Counter\n\nwords = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']\ncounts = Counter(words)\n\nprint(counts)                # Counter({'apple': 3, 'banana': 2, 'cherry': 1})\nprint(counts['apple'])       # 3\nprint(counts['mango'])       # 0  — missing key is safe\nprint(counts.most_common(2)) # [('apple', 3), ('banana', 2)]",
          caption: "Counter from an iterable; most_common() returns (element, count) pairs sorted by frequency.",
        },
        {
          kind: "mental-model",
          title: "Counter — a tally sheet",
          analogy:
            "Picture a tally sheet where every time you see an item you add a mark. Counter automates that sheet and also lets you merge sheets or compare them.",
          explanation:
            "Counter stores counts as integer values. Arithmetic operators merge two counters: + combines counts, - removes elements (only positive counts survive), & takes the minimum count per key, | takes the maximum.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import Counter\n\na = Counter(cats=3, dogs=1)\nb = Counter(cats=1, dogs=2, birds=5)\n\nprint(a + b)   # Counter({'birds': 5, 'cats': 4, 'dogs': 3})\nprint(a - b)   # Counter({'cats': 2})  — only positive counts kept\nprint(a & b)   # Counter({'cats': 1, 'dogs': 1})  — minimum\nprint(a | b)   # Counter({'birds': 5, 'cats': 3, 'dogs': 2})  — maximum",
          caption: "Counter arithmetic merges two counters. Subtraction drops non-positive results.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Update and subtract",
          body: "Use `counter.update(iterable)` to add more items after construction, and `counter.subtract(iterable)` to reduce counts (allowing negative counts, unlike -).",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Counter vs dict for missing keys",
          body: "A plain `dict` raises `KeyError` for missing keys. `Counter` silently returns `0`. This makes it safe to access any key, but it also means you can inadvertently create zero-count keys if you do `counts['x']` without checking.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "Given `c = Counter('aabbccca')`, what does `c.most_common(1)` return? What does `c['z']` return?",
        },
      ],
      interactions: [
        {
          id: "s25-counter-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Trace Counter construction and most_common() to confirm you understand frequency ranking.",
          expectedConceptIds: ["collections-counter"],
          code: "from collections import Counter\nc = Counter('mississippi')\nprint(c.most_common(2))",
          expectedOutput: "[('s', 4), ('i', 4)]",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Count each letter in 'mississippi' manually: m=1, i=4, s=4, p=2." },
            { level: "syntax", text: "most_common(2) returns the 2 highest-count (element, count) pairs. Ties can appear in any order — the answer accepts either ordering." },
          ],
          feedback: {
            correct: "Correct! 's' and 'i' both appear 4 times, so they tie for first place.",
            incorrect: "Count each letter: m=1, i=4, s=4, p=2. most_common(2) picks the top two.",
          },
        },
        {
          id: "s25-counter-fill",
          kind: "fill-code",
          prompt: "Complete the code to count words and print the single most common word.",
          beginnerPurpose: "Practice constructing a Counter and calling most_common().",
          expectedConceptIds: ["collections-counter"],
          codeTemplate: "from collections import Counter\nwords = ['go', 'stop', 'go', 'go', 'stop']\nc = ___(words)\nprint(c.___(1))",
          blanks: [
            { placeholder: "___", answer: "Counter", caseSensitive: true },
            { placeholder: "___", answer: "most_common", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The class is Counter; the method is most_common(n)." },
          ],
          feedback: {
            correct: "Correct! Counter(words).most_common(1) gives [('go', 3)].",
            incorrect: "Import Counter from collections, then call most_common(1) to get the single top element.",
          },
        },
        {
          id: "s25-counter-mc",
          kind: "multiple-choice",
          prompt: "What does `Counter('aab')['z']` return?",
          beginnerPurpose: "Confirm understanding that Counter returns 0 for missing keys, unlike a plain dict.",
          expectedConceptIds: ["collections-counter"],
          options: [
            { id: "opt-a", text: "KeyError", isCorrect: false, explanation: "Counter never raises KeyError for missing keys." },
            { id: "opt-b", text: "0", isCorrect: true, explanation: "Counter returns 0 for any key not in the count, making it safe to access unseen elements." },
            { id: "opt-c", text: "None", isCorrect: false, explanation: "Counter returns 0, not None, for missing keys." },
            { id: "opt-d", text: "False", isCorrect: false, explanation: "Counter returns an integer 0, not a boolean." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Counter is a dict subclass that returns 0 for missing keys." }],
          feedback: {
            correct: "Right! Missing keys return 0 — no KeyError.",
            incorrect: "Counter is designed so that any unseen key returns 0.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "collections-counter", recallPrompt: "How do you find the 3 most common elements in a list using Counter?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-counter-predict", "s25-counter-fill", "s25-counter-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["collections-counter"],
      },
    },

    /* ── Lesson 25.2: collections.defaultdict ─────────────────────────────── */
    {
      id: "s25-defaultdict",
      stageId: "stage-25",
      title: "collections.defaultdict",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Construct a defaultdict with a factory function",
        "Explain how defaultdict eliminates KeyError on first access",
        "Group items using defaultdict(list)",
        "Choose the right default factory for a given problem",
      ],
      prerequisites: ["s25-counter"],
      concepts: ["collections-defaultdict"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### The grouping problem\n\nA classic task: group a list of `(key, value)` pairs so that all values for the same key end up in a list together. With a plain dict you must write `if key not in d: d[key] = []` before appending. `defaultdict` automates that guard.",
        },
        {
          kind: "text",
          markdown:
            "### How defaultdict works\n\n`defaultdict(factory)` behaves exactly like a `dict` except that when you access a missing key it calls `factory()` to produce the default value and stores it. The factory is any zero-argument callable: `list`, `int`, `set`, `lambda: 'N/A'`, etc.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import defaultdict\n\n# Group words by first letter\nwords = ['apple', 'ant', 'banana', 'blueberry', 'cherry']\nby_letter = defaultdict(list)\nfor word in words:\n    by_letter[word[0]].append(word)\n\nprint(dict(by_letter))\n# {'a': ['apple', 'ant'], 'b': ['banana', 'blueberry'], 'c': ['cherry']}",
          caption: "defaultdict(list) creates an empty list automatically when a new key is first accessed.",
        },
        {
          kind: "comparison",
          leftLabel: "defaultdict(list) — clean",
          rightLabel: "plain dict — verbose",
          leftCode: "from collections import defaultdict\nd = defaultdict(list)\nfor k, v in pairs:\n    d[k].append(v)",
          rightCode: "d = {}\nfor k, v in pairs:\n    if k not in d:\n        d[k] = []\n    d[k].append(v)",
          caption: "defaultdict eliminates the guard clause that checks for key existence.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import defaultdict\n\n# Count with defaultdict(int) — int() returns 0\ncounts = defaultdict(int)\nfor ch in 'hello world':\n    counts[ch] += 1\n\nprint(counts['l'])  # 3\nprint(counts['z'])  # 0 — auto-created with factory int()",
          caption: "defaultdict(int) is an alternative to Counter for simple counting.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Auto-creation on read",
          body: "Accessing a missing key in a defaultdict creates the key with the default value — even if you only read it (e.g., in an `if` check). Use `.get(key)` if you want to check without creating.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "You have a defaultdict(set). After `d['x'].add(1)` and `d['x'].add(2)`, what is `d['x']`? What is `d['y']` after checking it with `d['y']`?",
        },
      ],
      interactions: [
        {
          id: "s25-defaultdict-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Trace defaultdict(int) to confirm auto-initialization to zero.",
          expectedConceptIds: ["collections-defaultdict"],
          code: "from collections import defaultdict\nd = defaultdict(int)\nd['a'] += 5\nd['b'] += 3\nd['a'] += 2\nprint(d['a'], d['b'], d['c'])",
          expectedOutput: "7 3 0",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "defaultdict(int) starts each new key at int() == 0." },
            { level: "syntax", text: "d['c'] was never set, so it defaults to 0." },
          ],
          feedback: {
            correct: "Correct! a=5+2=7, b=3, c never touched so auto-created as 0.",
            incorrect: "Each new key auto-initializes to int() = 0, then increments happen normally.",
          },
        },
        {
          id: "s25-defaultdict-fill",
          kind: "fill-code",
          prompt: "Complete the defaultdict so it groups strings by their length.",
          beginnerPurpose: "Practice choosing the right factory (list) and using defaultdict for grouping.",
          expectedConceptIds: ["collections-defaultdict"],
          codeTemplate: "from collections import defaultdict\nwords = ['hi', 'bye', 'ok', 'yes']\nby_len = defaultdict(___)\nfor w in words:\n    by_len[len(w)].append(w)\nprint(dict(by_len))",
          blanks: [
            { placeholder: "___", answer: "list", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "You want each key to map to a list of words — so the factory should produce lists." },
          ],
          feedback: {
            correct: "Correct! defaultdict(list) creates an empty list for each new key automatically.",
            incorrect: "Use `list` as the factory so that each new length key starts with an empty list.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "collections-defaultdict", recallPrompt: "What factory would you pass to defaultdict to group items into sets?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-defaultdict-predict", "s25-defaultdict-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["collections-defaultdict"],
      },
    },

    /* ── Lesson 25.3: collections.deque ───────────────────────────────────── */
    {
      id: "s25-deque",
      stageId: "stage-25",
      title: "collections.deque",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain why deque provides O(1) appends and pops from both ends",
        "Use appendleft/popleft for queue and stack operations",
        "Use maxlen to implement a sliding window or recent-history buffer",
        "Distinguish deque from list for front-insertion workloads",
      ],
      prerequisites: ["s25-defaultdict"],
      concepts: ["collections-deque"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### The performance problem with list\n\nPython lists are excellent for appending to the right end (`list.append`) — that is O(1) amortized. But inserting or removing from the left end (`list.insert(0, x)` or `list.pop(0)`) is O(n) because every element must shift. For queues or sliding windows, this matters.",
        },
        {
          kind: "text",
          markdown:
            "### deque — double-ended queue\n\n`collections.deque` is implemented as a doubly-linked list of fixed-size blocks. Appending and popping from either end is always O(1). It supports the same `.append()` and `.pop()` as a list, plus `.appendleft()` and `.popleft()`.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import deque\n\n# BFS queue — popleft makes it FIFO\nqueue = deque(['start'])\nqueue.append('middle')\nqueue.append('end')\nprint(queue.popleft())  # start\nprint(queue.popleft())  # middle\n\n# Stack — append/pop from the right\nstack = deque()\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(stack.pop())  # 3  (LIFO)",
          caption: "deque supports both FIFO (queue) and LIFO (stack) patterns efficiently.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import deque\n\n# Sliding window — last 3 readings\nbuffer = deque(maxlen=3)\nfor reading in [10, 20, 30, 40, 50]:\n    buffer.append(reading)\n    print(list(buffer))\n# [10]\n# [10, 20]\n# [10, 20, 30]\n# [20, 30, 40]  <-- 10 evicted\n# [30, 40, 50]  <-- 20 evicted",
          caption: "maxlen causes the oldest element to be automatically evicted when the deque is full.",
        },
        {
          kind: "mental-model",
          title: "deque — conveyor belt",
          analogy:
            "A deque is like a conveyor belt — items can enter or exit from either end at the same cost. A list is like a queue of people in a hallway: adding to the front means everyone moves one step back, which is expensive.",
          explanation:
            "Use deque whenever you need efficient operations at both ends. Use a list when you need fast random access by index — deque random access is O(n).",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Random access is O(n)",
          body: "Unlike a list, `deque[i]` for arbitrary index i is O(n) — deques are not arrays. If you need frequent index-based access, use a list.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "You have `d = deque([1,2,3], maxlen=3)` and call `d.append(4)`. What does `list(d)` return?",
        },
      ],
      interactions: [
        {
          id: "s25-deque-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Trace deque operations to understand FIFO order and maxlen eviction.",
          expectedConceptIds: ["collections-deque"],
          code: "from collections import deque\nd = deque([1, 2, 3], maxlen=3)\nd.append(4)\nd.appendleft(0)\nprint(list(d))",
          expectedOutput: "[0, 1, 2]",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "maxlen=3 means adding a 4th element evicts from the opposite end." },
            { level: "syntax", text: "After d.append(4): [2,3,4] (1 evicted). After d.appendleft(0): [0,2,3] (4 evicted)." },
          ],
          feedback: {
            correct: "Correct! Each append evicts from the opposite end when maxlen is reached.",
            incorrect: "With maxlen=3, append evicts from the left, appendleft evicts from the right.",
          },
        },
        {
          id: "s25-deque-mc",
          kind: "multiple-choice",
          prompt: "Which operation is O(1) for deque but O(n) for a list?",
          beginnerPurpose: "Understand the performance advantage of deque over list.",
          expectedConceptIds: ["collections-deque"],
          options: [
            { id: "opt-a", text: "Appending to the right end", isCorrect: false, explanation: "Both deque and list have O(1) right-append." },
            { id: "opt-b", text: "Inserting at the front (index 0)", isCorrect: true, explanation: "deque.appendleft() is O(1); list.insert(0, x) shifts all elements — O(n)." },
            { id: "opt-c", text: "Accessing element by index", isCorrect: false, explanation: "Random index access is O(1) for list but O(n) for deque." },
            { id: "opt-d", text: "Checking length with len()", isCorrect: false, explanation: "Both are O(1) for len()." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The key deque advantage is at the left/front end." }],
          feedback: {
            correct: "Correct! Front insertion is the core advantage of deque over list.",
            incorrect: "deque's speed advantage is at the front end: appendleft/popleft are O(1).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "collections-deque", recallPrompt: "Why would you use deque instead of list when implementing a queue?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-deque-predict", "s25-deque-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["collections-deque"],
      },
    },

    /* ── Lesson 25.4: collections.namedtuple ──────────────────────────────── */
    {
      id: "s25-namedtuple",
      stageId: "stage-25",
      title: "collections.namedtuple",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a namedtuple class with named fields",
        "Access fields by name and by index",
        "Explain namedtuple's memory advantage over a dict",
        "Use _replace() to produce a modified copy",
      ],
      prerequisites: ["s25-deque"],
      concepts: ["collections-namedtuple"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Lightweight records\n\nSometimes you want a simple data container — a point with x and y, a color with r/g/b — but a plain tuple loses the meaning of each position. A dict is readable but heavier. `namedtuple` gives you a tuple with field names and no extra memory overhead.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import namedtuple\n\nPoint = namedtuple('Point', ['x', 'y'])\np = Point(3, 4)\n\nprint(p.x, p.y)   # 3 4\nprint(p[0], p[1]) # 3 4  — index access still works\nprint(p)          # Point(x=3, y=4)\n\n# Immutable — like a regular tuple\n# p.x = 10  # AttributeError",
          caption: "namedtuple creates a class whose instances look like tuples but have named attributes.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import namedtuple\n\nColor = namedtuple('Color', 'red green blue')  # space-separated string also works\nwhite = Color(255, 255, 255)\nblue = white._replace(red=0, green=0)  # produces a new instance\nprint(blue)  # Color(red=0, green=0, blue=255)",
          caption: "_replace() creates a modified copy without mutating the original.",
        },
        {
          kind: "mental-model",
          title: "namedtuple — a self-documenting tuple",
          analogy:
            "A regular tuple is like a numbered locker — you must remember that locker 0 is the name and locker 1 is the age. A namedtuple puts labels on the lockers so you can open them by name.",
          explanation:
            "namedtuple instances are regular tuples under the hood — same memory, same speed. They just add attribute-style access and a helpful repr. They are immutable, so they work as dict keys and in sets.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Prefer dataclasses for mutable records",
          body: "If you need mutable fields, default values, or methods, consider `dataclasses.dataclass` (Python 3.7+) instead of namedtuple.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "Given `Card = namedtuple('Card', ['rank', 'suit'])` and `c = Card('A', 'spades')`, what does `c[1]` return? What does `c._asdict()` return?",
        },
      ],
      interactions: [
        {
          id: "s25-namedtuple-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Confirm you can access namedtuple fields by name and by index.",
          expectedConceptIds: ["collections-namedtuple"],
          code: "from collections import namedtuple\nCar = namedtuple('Car', ['make', 'year'])\nc = Car('Toyota', 2020)\nprint(c.make)\nprint(c[1])\nprint(c)",
          expectedOutput: "Toyota\n2020\nCar(make='Toyota', year=2020)",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Named attributes and positional index both work on namedtuples." },
          ],
          feedback: {
            correct: "Correct! Field name access, index access, and a readable repr all work.",
            incorrect: "c.make gives 'Toyota'; c[1] gives the second field (2020); repr shows the field names.",
          },
        },
        {
          id: "s25-namedtuple-fill",
          kind: "fill-code",
          prompt: "Complete the code to create a namedtuple representing a 2D point with fields x and y.",
          beginnerPurpose: "Practice the namedtuple constructor syntax.",
          expectedConceptIds: ["collections-namedtuple"],
          codeTemplate: "from collections import namedtuple\nPoint = namedtuple('Point', ___)\np = Point(1, 2)\nprint(p.x + p.y)",
          blanks: [
            { placeholder: "___", answer: "['x', 'y']", caseSensitive: false },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The second argument is a list of field name strings, like ['x', 'y'], or the space-separated string 'x y'." },
          ],
          feedback: {
            correct: "Correct! namedtuple('Point', ['x', 'y']) creates a Point class with x and y fields.",
            incorrect: "Pass a list of strings ['x', 'y'] or 'x y' as the second argument to namedtuple.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "collections-namedtuple", recallPrompt: "How does namedtuple differ from a regular tuple and from a dataclass?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-namedtuple-predict", "s25-namedtuple-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["collections-namedtuple"],
      },
    },

    /* ── Lesson 25.5: collections.OrderedDict ─────────────────────────────── */
    {
      id: "s25-ordereddict",
      stageId: "stage-25",
      title: "collections.OrderedDict",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain when OrderedDict still matters over a plain dict in Python 3.7+",
        "Use move_to_end() to reorder keys",
        "Implement a simple LRU cache structure with OrderedDict",
      ],
      prerequisites: ["s25-namedtuple"],
      concepts: ["collections-ordereddict"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### A brief history\n\nBefore Python 3.7, plain `dict` did not guarantee insertion order. `OrderedDict` was the solution. Since Python 3.7, regular dicts preserve insertion order as a language guarantee. But `OrderedDict` still offers two unique operations: `move_to_end()` and order-sensitive equality.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import OrderedDict\n\n# Two OrderedDicts with different insertion order are NOT equal\nod1 = OrderedDict([('a', 1), ('b', 2)])\nod2 = OrderedDict([('b', 2), ('a', 1)])\nprint(od1 == od2)  # False — order matters\n\n# Plain dict ignores order\nd1 = {'a': 1, 'b': 2}\nd2 = {'b': 2, 'a': 1}\nprint(d1 == d2)    # True",
          caption: "OrderedDict equality is order-sensitive; plain dict equality is not.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import OrderedDict\n\n# Simple LRU cache: move accessed key to end\ncache = OrderedDict()\n\ndef get(key):\n    if key in cache:\n        cache.move_to_end(key)  # mark as recently used\n        return cache[key]\n    return None\n\ncache['a'] = 1\ncache['b'] = 2\ncache['c'] = 3\nget('a')              # access 'a' — moves to end\nprint(list(cache))    # ['b', 'c', 'a']",
          caption: "move_to_end() is the key building block for an LRU (Least Recently Used) cache.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "functools.lru_cache is better for most use cases",
          body: "For a production LRU cache, use `functools.lru_cache` or `functools.cache` (Python 3.9+). OrderedDict-based LRU is a useful learning exercise but rarely needed in practice.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "If you compare two plain dicts `{'x': 1, 'y': 2}` and `{'y': 2, 'x': 1}`, do they compare equal? What about two OrderedDicts with the same keys in different order?",
        },
      ],
      interactions: [
        {
          id: "s25-ordereddict-mc",
          kind: "multiple-choice",
          prompt: "Which feature makes OrderedDict still useful in Python 3.7+?",
          beginnerPurpose: "Understand when to reach for OrderedDict over a plain dict.",
          expectedConceptIds: ["collections-ordereddict"],
          options: [
            { id: "opt-a", text: "It preserves insertion order (plain dict doesn't)", isCorrect: false, explanation: "Plain dict also preserves insertion order since Python 3.7." },
            { id: "opt-b", text: "It provides move_to_end() and order-sensitive equality", isCorrect: true, explanation: "These two operations are unique to OrderedDict." },
            { id: "opt-c", text: "It is faster than plain dict", isCorrect: false, explanation: "OrderedDict is actually slightly slower due to extra bookkeeping." },
            { id: "opt-d", text: "It allows duplicate keys", isCorrect: false, explanation: "No dict-like structure allows duplicate keys." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what plain dict lacks that OrderedDict provides as methods." }],
          feedback: {
            correct: "Right! move_to_end() and order-sensitive == are the two unique features.",
            incorrect: "Since Python 3.7, plain dicts also preserve order. OrderedDict's remaining advantages are move_to_end() and order-aware equality.",
          },
        },
        {
          id: "s25-ordereddict-predict",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Trace move_to_end() to understand how it reorders keys.",
          expectedConceptIds: ["collections-ordereddict"],
          code: "from collections import OrderedDict\nod = OrderedDict(a=1, b=2, c=3)\nod.move_to_end('a')\nprint(list(od.keys()))",
          expectedOutput: "['b', 'c', 'a']",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "move_to_end() moves the key to the last position by default." },
          ],
          feedback: {
            correct: "Correct! 'a' moves to the end, leaving ['b', 'c', 'a'].",
            incorrect: "move_to_end('a') places 'a' at the last position (last=True by default).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "collections-ordereddict", recallPrompt: "Name one use case where OrderedDict is better than a plain dict in Python 3.7+.", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-ordereddict-mc", "s25-ordereddict-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["collections-ordereddict"],
      },
    },

    /* ── Lesson 25.6: collections.ChainMap ────────────────────────────────── */
    {
      id: "s25-chainmap",
      stageId: "stage-25",
      title: "collections.ChainMap",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a ChainMap from multiple dicts",
        "Explain lookup priority in a ChainMap",
        "Use ChainMap for layered configuration or scope resolution",
        "Add a new child scope with new_child()",
      ],
      prerequisites: ["s25-ordereddict"],
      concepts: ["collections-chainmap"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Layered lookups\n\nMany systems use layered configuration: environment variables override config file settings which override defaults. `ChainMap` models this pattern — it groups multiple dicts into a single logical view where the first dict wins on key conflicts.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import ChainMap\n\ndefaults   = {'color': 'blue', 'size': 'medium', 'font': 'Arial'}\nconfig     = {'color': 'red',  'size': 'large'}\nenv_vars   = {'color': 'green'}\n\ncombined = ChainMap(env_vars, config, defaults)\nprint(combined['color'])  # green  — first map wins\nprint(combined['size'])   # large  — from config\nprint(combined['font'])   # Arial  — falls through to defaults",
          caption: "ChainMap searches maps left-to-right. The first map to have a key wins.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import ChainMap\n\n# Simulating variable scopes\nglobal_scope = {'x': 10, 'y': 20}\nlocal_scope  = ChainMap({}, global_scope)  # empty local scope\nlocal_scope['x'] = 99   # writes only to the FIRST (local) map\n\nprint(local_scope['x'])         # 99  — local wins\nprint(local_scope['y'])         # 20  — falls through to global\nprint(global_scope['x'])        # 10  — global unchanged",
          caption: "Writes go to the first map only, leaving deeper maps untouched — exactly like Python's scoping model.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "new_child() for scoping",
          body: "`cm.new_child(m)` returns a new ChainMap with `m` prepended — a convenient way to add a scope. `cm.parents` returns the ChainMap without the first map (the parent scope).",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "Given `ChainMap({'a': 1}, {'a': 2, 'b': 3})`, what is `cm['a']`? What is `cm['b']`?",
        },
      ],
      interactions: [
        {
          id: "s25-chainmap-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Trace ChainMap lookup priority to understand which map wins.",
          expectedConceptIds: ["collections-chainmap"],
          code: "from collections import ChainMap\ncm = ChainMap({'x': 1}, {'x': 2, 'y': 5}, {'z': 9})\nprint(cm['x'])\nprint(cm['y'])\nprint(cm['z'])",
          expectedOutput: "1\n5\n9",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "ChainMap searches from left to right; the first map with the key wins." },
          ],
          feedback: {
            correct: "Correct! x=1 (first map), y=5 (second map), z=9 (third map).",
            incorrect: "ChainMap searches maps in order; the first one that contains the key provides the value.",
          },
        },
        {
          id: "s25-chainmap-mc",
          kind: "multiple-choice",
          prompt: "When you assign a value to a key in a ChainMap (`cm['new'] = 10`), which map is modified?",
          beginnerPurpose: "Understand that ChainMap writes target only the first map.",
          expectedConceptIds: ["collections-chainmap"],
          options: [
            { id: "opt-a", text: "All maps that contain the key", isCorrect: false, explanation: "Writes always go to the first (front) map regardless of where the key appears." },
            { id: "opt-b", text: "The first (frontmost) map", isCorrect: true, explanation: "ChainMap writes only to the first map, preserving the immutability of deeper layers." },
            { id: "opt-c", text: "The last (deepest) map", isCorrect: false, explanation: "Writes target the first map, not the last." },
            { id: "opt-d", text: "A new internal map created automatically", isCorrect: false, explanation: "No new map is created on write; the first map is modified." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about layered scopes — you write to the innermost (first) scope." }],
          feedback: {
            correct: "Correct! Writes always modify the first map, leaving deeper layers untouched.",
            incorrect: "ChainMap writes go to the first map only — this preserves the read-only nature of deeper layers.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "collections-chainmap", recallPrompt: "Describe a real scenario where ChainMap is the right tool.", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-chainmap-predict", "s25-chainmap-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["collections-chainmap"],
      },
    },

    /* ── Lesson 25.7: collections.UserDict ────────────────────────────────── */
    {
      id: "s25-userdict",
      stageId: "stage-25",
      title: "collections.UserDict",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain why subclassing UserDict is safer than subclassing dict directly",
        "Override __setitem__ to add validation logic",
        "Access the underlying data via self.data",
      ],
      prerequisites: ["s25-chainmap"],
      concepts: ["collections-userdict"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Why not just subclass dict?\n\nSubclassing `dict` directly can produce surprising bugs because dict's C-level methods (like `update()`) bypass your overridden Python `__setitem__`. `UserDict` stores everything in a plain Python dict at `self.data` and routes all operations through Python, so your overrides always apply.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import UserDict\n\nclass TypedDict(UserDict):\n    \"\"\"A dict that only accepts string keys.\"\"\"\n    def __setitem__(self, key, value):\n        if not isinstance(key, str):\n            raise TypeError(f\"Keys must be str, got {type(key).__name__}\")\n        super().__setitem__(key, value)\n\ntd = TypedDict()\ntd['name'] = 'Alice'   # OK\nprint(td['name'])       # Alice\ntry:\n    td[42] = 'bad'      # TypeError: Keys must be str, got int\nexcept TypeError as e:\n    print(e)",
          caption: "UserDict routes all writes through __setitem__, so the validation always fires.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Access raw storage via self.data",
          body: "Inside a UserDict subclass, `self.data` is the underlying plain dict. You can read from or write to it directly to bypass your own validation if needed.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "If you subclass `dict` and override `__setitem__`, will `dict.update()` call your `__setitem__`? What about `UserDict.update()`?",
        },
      ],
      interactions: [
        {
          id: "s25-userdict-mc",
          kind: "multiple-choice",
          prompt: "Why is UserDict preferred over directly subclassing dict for custom dict classes?",
          beginnerPurpose: "Understand the reliability guarantee that UserDict provides.",
          expectedConceptIds: ["collections-userdict"],
          options: [
            { id: "opt-a", text: "UserDict is faster than dict", isCorrect: false, explanation: "UserDict is actually slightly slower since it uses a Python-level dict." },
            { id: "opt-b", text: "dict subclasses cannot be pickled", isCorrect: false, explanation: "dict subclasses can be pickled; that is not the issue." },
            { id: "opt-c", text: "dict's C methods can bypass overridden Python methods; UserDict routes all operations through Python", isCorrect: true, explanation: "This is the core reason — Python-level overrides are guaranteed to be called with UserDict." },
            { id: "opt-d", text: "UserDict supports more methods than dict", isCorrect: false, explanation: "The API is essentially the same; the difference is in method dispatch reliability." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what happens when dict's built-in C code calls setitem internally." }],
          feedback: {
            correct: "Correct! UserDict ensures all internal operations go through your Python-level overrides.",
            incorrect: "When you subclass dict, its C implementation may bypass your Python __setitem__. UserDict avoids this.",
          },
        },
        {
          id: "s25-userdict-fill",
          kind: "fill-code",
          prompt: "Complete the LowerCaseDict so that all string keys are automatically lowercased on insertion.",
          beginnerPurpose: "Practice overriding __setitem__ in a UserDict subclass.",
          expectedConceptIds: ["collections-userdict"],
          codeTemplate: "from collections import UserDict\nclass LowerCaseDict(UserDict):\n    def __setitem__(self, key, value):\n        super().__setitem__(___, value)\nd = LowerCaseDict()\nd['Name'] = 'Alice'\nprint(d['name'])",
          blanks: [
            { placeholder: "___", answer: "key.lower()", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "Call .lower() on the key before passing it to super().__setitem__." },
          ],
          feedback: {
            correct: "Correct! key.lower() normalizes all keys to lowercase before storage.",
            incorrect: "Apply str.lower() to the key: super().__setitem__(key.lower(), value).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "collections-userdict", recallPrompt: "When would you choose UserDict over subclassing dict directly?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-userdict-mc", "s25-userdict-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["collections-userdict"],
      },
    },

    /* ── Lesson 25.8: collections.UserList ────────────────────────────────── */
    {
      id: "s25-userlist",
      stageId: "stage-25",
      title: "collections.UserList",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Subclass UserList to create a custom list with extra behaviour",
        "Override append or __setitem__ to enforce type constraints",
        "Access the raw list via self.data",
      ],
      prerequisites: ["s25-userdict"],
      concepts: ["collections-userlist"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Custom list types\n\n`UserList` is to `list` what `UserDict` is to `dict` — a Python-level wrapper that routes all mutations through your overridable methods. Use it when you want a list that enforces a type constraint, fires events on mutation, or restricts the allowed values.",
        },
        {
          kind: "code",
          language: "python",
          code: "from collections import UserList\n\nclass IntList(UserList):\n    \"\"\"A list that only accepts integers.\"\"\"\n    def append(self, item):\n        if not isinstance(item, int):\n            raise TypeError(f\"Only ints allowed, got {type(item).__name__}\")\n        super().append(item)\n\nil = IntList([1, 2, 3])\nil.append(4)\nprint(il)           # [1, 2, 3, 4]\ntry:\n    il.append('x')  # TypeError\nexcept TypeError as e:\n    print(e)",
          caption: "Overriding append in a UserList subclass enforces type constraints on every insertion.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "self.data is the underlying list",
          body: "Inside a UserList subclass, `self.data` holds the actual Python list. You can bypass your own overrides by writing to `self.data` directly when needed.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "If you override `append` in a UserList subclass, does `extend()` also call your `append`? Try to reason from the UserList source before testing.",
        },
      ],
      interactions: [
        {
          id: "s25-userlist-mc",
          kind: "multiple-choice",
          prompt: "What does `self.data` refer to inside a UserList subclass?",
          beginnerPurpose: "Confirm understanding of UserList internal storage.",
          expectedConceptIds: ["collections-userlist"],
          options: [
            { id: "opt-a", text: "A reference to the UserList instance itself", isCorrect: false, explanation: "self.data is the underlying plain Python list, not the UserList." },
            { id: "opt-b", text: "The underlying plain Python list", isCorrect: true, explanation: "UserList stores all items in self.data, a regular list." },
            { id: "opt-c", text: "A dict mapping indices to values", isCorrect: false, explanation: "UserList stores data in a plain list, not a dict." },
            { id: "opt-d", text: "A tuple of the list elements", isCorrect: false, explanation: "self.data is a mutable list, not an immutable tuple." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "UserList is a wrapper; the actual storage is a plain Python list attribute." }],
          feedback: {
            correct: "Correct! self.data is the plain list that UserList wraps.",
            incorrect: "UserList stores items in self.data, which is a regular Python list.",
          },
        },
        {
          id: "s25-userlist-fill",
          kind: "fill-code",
          prompt: "Complete the MaxList so that it raises ValueError if you try to append beyond max_size.",
          beginnerPurpose: "Practice building constraint-enforcing list subclasses with UserList.",
          expectedConceptIds: ["collections-userlist"],
          codeTemplate: "from collections import UserList\nclass MaxList(UserList):\n    def __init__(self, max_size):\n        super().__init__()\n        self.max_size = max_size\n    def append(self, item):\n        if len(self.data) >= ___:\n            raise ValueError('List is full')\n        super().append(item)\nml = MaxList(2)\nml.append(1)\nml.append(2)\nprint(len(ml))",
          blanks: [
            { placeholder: "___", answer: "self.max_size", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "Compare the current length to the stored max_size attribute." },
          ],
          feedback: {
            correct: "Correct! Comparing len(self.data) against self.max_size gates the append.",
            incorrect: "Use self.max_size in the comparison: if len(self.data) >= self.max_size.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "collections-userlist", recallPrompt: "Name a real use case for subclassing UserList instead of list.", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-userlist-mc", "s25-userlist-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["collections-userlist"],
      },
    },

    /* ── Lesson 25.9: array module ────────────────────────────────────────── */
    {
      id: "s25-array-module",
      stageId: "stage-25",
      title: "The array Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create an array with a specific type code",
        "Explain memory efficiency of array vs list for numeric data",
        "Append, extend, and slice an array",
        "Convert an array to a list or bytes",
      ],
      prerequisites: ["s25-userlist"],
      concepts: ["array-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Typed arrays for memory efficiency\n\nA Python `list` can hold any mix of objects, so each element stores a full Python object reference (typically 8 bytes) plus the object itself. For large sequences of numbers this is wasteful. The `array` module provides typed arrays that store raw numeric values with no per-element object overhead — like C arrays.",
        },
        {
          kind: "code",
          language: "python",
          code: "import array\n\n# 'd' = double (64-bit float), 'i' = signed int\nfloats = array.array('d', [1.1, 2.2, 3.3, 4.4])\nprint(floats)           # array('d', [1.1, 2.2, 3.3, 4.4])\nprint(floats[0])        # 1.1\nfloats.append(5.5)\nfloats.extend([6.6, 7.7])\nprint(len(floats))      # 7\nprint(floats.tolist())  # [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]",
          caption: "array.array requires a type code — 'd' for double, 'i' for signed int, 'b' for signed byte.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "For heavy numeric work, use NumPy",
          body: "The `array` module reduces memory but does not accelerate computation. For numeric algorithms, use NumPy arrays which provide vectorized operations and are far faster.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "What happens if you try to append a string to an `array.array('i', [])`? Why?",
        },
      ],
      interactions: [
        {
          id: "s25-array-mc",
          kind: "multiple-choice",
          prompt: "What is the primary advantage of `array.array` over a Python `list` for storing 1 million integers?",
          beginnerPurpose: "Understand when to reach for the array module.",
          expectedConceptIds: ["array-module"],
          options: [
            { id: "opt-a", text: "Faster element access by index", isCorrect: false, explanation: "Both list and array have O(1) index access; speed is similar." },
            { id: "opt-b", text: "Significantly lower memory usage", isCorrect: true, explanation: "array stores raw C values without Python object overhead, using much less memory for numeric data." },
            { id: "opt-c", text: "Support for mixed element types", isCorrect: false, explanation: "array is strictly typed — all elements must be the same type." },
            { id: "opt-d", text: "Built-in sorting algorithms", isCorrect: false, explanation: "array.sort() exists, but that is not the primary advantage over list." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what a list stores per element versus what a typed array stores." }],
          feedback: {
            correct: "Correct! array stores raw numeric values without Python object overhead.",
            incorrect: "The main benefit is memory: array stores typed C values without per-element Python object overhead.",
          },
        },
        {
          id: "s25-array-fill",
          kind: "fill-code",
          prompt: "Complete the code to create an array of signed integers and append the value 42.",
          beginnerPurpose: "Practice the array constructor and append syntax.",
          expectedConceptIds: ["array-module"],
          codeTemplate: "import array\narr = array.array(___, [1, 2, 3])\narr.append(42)\nprint(arr[-1])",
          blanks: [
            { placeholder: "___", answer: "'i'", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The type code for signed integer is 'i'. Pass it as a string." },
          ],
          feedback: {
            correct: "Correct! 'i' is the type code for a signed C integer.",
            incorrect: "Use 'i' (signed int) as the type code: array.array('i', [1, 2, 3]).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "array-module", recallPrompt: "When would you choose array.array over a list, and when would you choose NumPy instead?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-array-mc", "s25-array-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["array-module"],
      },
    },

    /* ── Lesson 25.10: heapq ──────────────────────────────────────────────── */
    {
      id: "s25-heapq",
      stageId: "stage-25",
      title: "heapq — Heap Operations",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Push and pop elements using heappush and heappop",
        "Explain the min-heap invariant",
        "Use heapq.nlargest and heapq.nsmallest for top-N queries",
        "Implement a priority queue using tuples in a heap",
      ],
      prerequisites: ["s25-array-module"],
      concepts: ["heapq-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Why heaps?\n\nA heap is a data structure that lets you find (and remove) the smallest element in O(log n) time while inserting also costs O(log n). Python's `heapq` module provides heap operations on a plain list — the list is kept in a special order (heap invariant) so the smallest element is always at index 0.",
        },
        {
          kind: "code",
          language: "python",
          code: "import heapq\n\nnums = [5, 3, 8, 1, 9, 2]\nheapq.heapify(nums)          # rearranges in-place — O(n)\nprint(nums[0])               # 1  — always the minimum\n\nheapq.heappush(nums, 0)      # add 0, maintaining invariant\nprint(heapq.heappop(nums))   # 0  — remove smallest\nprint(heapq.heappop(nums))   # 1",
          caption: "heapify converts a list to a min-heap in O(n). heappush/heappop maintain the invariant.",
        },
        {
          kind: "code",
          language: "python",
          code: "import heapq\n\nscores = [45, 92, 67, 88, 55, 73]\nprint(heapq.nlargest(3, scores))   # [92, 88, 73]\nprint(heapq.nsmallest(3, scores))  # [45, 55, 67]\n\n# Priority queue using (priority, item) tuples\ntasks = []\nheapq.heappush(tasks, (3, 'low priority task'))\nheapq.heappush(tasks, (1, 'urgent task'))\nheapq.heappush(tasks, (2, 'normal task'))\nprint(heapq.heappop(tasks)[1])   # urgent task",
          caption: "nlargest/nsmallest are efficient for small N. Tuples let you attach priorities.",
        },
        {
          kind: "mental-model",
          title: "Heap — the always-sorted front",
          analogy:
            "A heap is like a tournament bracket where the winner (smallest) always bubbles to the top. When you remove the winner, the bracket reorganizes efficiently to find the next winner.",
          explanation:
            "Python's heap is a min-heap — the smallest value is at index 0. For a max-heap, negate values on push and negate again on pop.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Max-heap trick",
          body: "heapq only provides min-heap. To get a max-heap, push `-value` and negate when you pop: `heapq.heappush(h, -x)`, then `-heapq.heappop(h)` gives the largest.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "After `heapq.heapify([10, 5, 3, 8])`, what is at index 0? What is the time complexity of heappush and heappop?",
        },
      ],
      interactions: [
        {
          id: "s25-heapq-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Trace heappush/heappop to confirm the min-heap always returns the smallest value first.",
          expectedConceptIds: ["heapq-module"],
          code: "import heapq\nh = []\nheapq.heappush(h, 7)\nheapq.heappush(h, 2)\nheapq.heappush(h, 5)\nprint(heapq.heappop(h))\nprint(heapq.heappop(h))",
          expectedOutput: "2\n5",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "heapq is a min-heap — heappop always returns the smallest remaining element." },
          ],
          feedback: {
            correct: "Correct! Min-heap pops 2 first (smallest), then 5.",
            incorrect: "heapq is a min-heap. heappop always removes and returns the smallest value.",
          },
        },
        {
          id: "s25-heapq-fill",
          kind: "fill-code",
          prompt: "Complete the code to find the 2 largest scores using heapq.",
          beginnerPurpose: "Practice using heapq.nlargest for top-N queries.",
          expectedConceptIds: ["heapq-module"],
          codeTemplate: "import heapq\nscores = [55, 92, 78, 65, 88]\nresult = heapq.___(2, scores)\nprint(result)",
          blanks: [
            { placeholder: "___", answer: "nlargest", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "heapq has nlargest(n, iterable) and nsmallest(n, iterable)." },
          ],
          feedback: {
            correct: "Correct! heapq.nlargest(2, scores) returns [92, 88].",
            incorrect: "Use heapq.nlargest(n, iterable) to get the N largest elements.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "heapq-module", recallPrompt: "How do you implement a max-heap using heapq?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-heapq-predict", "s25-heapq-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["heapq-module"],
      },
    },

    /* ── Lesson 25.11: bisect ─────────────────────────────────────────────── */
    {
      id: "s25-bisect",
      stageId: "stage-25",
      title: "bisect — Sorted List Operations",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use bisect_left and bisect_right to find insertion points",
        "Use insort to insert into a sorted list in O(log n) search + O(n) shift",
        "Implement grade boundaries or range lookups with bisect",
      ],
      prerequisites: ["s25-heapq"],
      concepts: ["bisect-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Binary search on sorted lists\n\nIf you have a sorted list and want to find where a value belongs — without scanning every element — binary search finds the position in O(log n). Python's `bisect` module provides this as `bisect_left` (insertion point before duplicates) and `bisect_right` (after duplicates).",
        },
        {
          kind: "code",
          language: "python",
          code: "import bisect\n\nsorted_scores = [60, 70, 75, 80, 90, 95]\n\npos = bisect.bisect_left(sorted_scores, 75)\nprint(pos)   # 2 — position where 75 would go (at or before existing 75)\n\nbisect.insort(sorted_scores, 85)  # insert 85, keeping list sorted\nprint(sorted_scores)  # [60, 70, 75, 80, 85, 90, 95]",
          caption: "bisect_left returns the leftmost insertion point. insort maintains sort order.",
        },
        {
          kind: "code",
          language: "python",
          code: "import bisect\n\n# Grade boundaries lookup\nboundaries = [60, 70, 80, 90]\ngrades     = ['F', 'D', 'C', 'B', 'A']\n\ndef letter_grade(score):\n    return grades[bisect.bisect_left(boundaries, score)]\n\nprint(letter_grade(85))  # B\nprint(letter_grade(60))  # D\nprint(letter_grade(59))  # F",
          caption: "bisect_left maps a numeric score to a grade bucket in O(log n).",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "insort is O(n) overall",
          body: "bisect finds the position in O(log n), but the actual insertion into a list is O(n) because elements must shift. For large datasets needing frequent inserts, use a sorted container library like `sortedcontainers.SortedList`.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "Given `[1, 2, 2, 3]`, what does `bisect_left(lst, 2)` return? What does `bisect_right(lst, 2)` return?",
        },
      ],
      interactions: [
        {
          id: "s25-bisect-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Trace bisect_left vs bisect_right to understand insertion point differences.",
          expectedConceptIds: ["bisect-module"],
          code: "import bisect\ndata = [1, 3, 3, 5, 7]\nprint(bisect.bisect_left(data, 3))\nprint(bisect.bisect_right(data, 3))",
          expectedOutput: "1\n3",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "bisect_left gives the leftmost position (before duplicates); bisect_right gives after duplicates." },
          ],
          feedback: {
            correct: "Correct! bisect_left(3)=1 (before the 3s), bisect_right(3)=3 (after both 3s).",
            incorrect: "There are two 3s at indices 1 and 2. bisect_left gives 1 (before them), bisect_right gives 3 (after them).",
          },
        },
        {
          id: "s25-bisect-mc",
          kind: "multiple-choice",
          prompt: "What is the time complexity of bisect.bisect_left(sorted_list, x)?",
          beginnerPurpose: "Confirm understanding of binary search complexity.",
          expectedConceptIds: ["bisect-module"],
          options: [
            { id: "opt-a", text: "O(n)", isCorrect: false, explanation: "O(n) would be a linear scan — bisect uses binary search." },
            { id: "opt-b", text: "O(log n)", isCorrect: true, explanation: "Binary search halves the search space each step — O(log n)." },
            { id: "opt-c", text: "O(1)", isCorrect: false, explanation: "O(1) would require the position to be known without search." },
            { id: "opt-d", text: "O(n log n)", isCorrect: false, explanation: "O(n log n) is the complexity of sorting, not searching." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Binary search divides the search space in half each time." }],
          feedback: {
            correct: "Correct! Binary search is O(log n).",
            incorrect: "bisect uses binary search, which is O(log n).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "bisect-module", recallPrompt: "Describe a practical use case where bisect gives you a clean solution.", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-bisect-predict", "s25-bisect-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["bisect-module"],
      },
    },

    /* ── Lesson 25.12: queue module ───────────────────────────────────────── */
    {
      id: "s25-queue-module",
      stageId: "stage-25",
      title: "queue Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish queue.Queue from collections.deque for thread-safety",
        "Use put() and get() for thread-safe communication",
        "Use queue.LifoQueue for a thread-safe stack",
        "Use queue.PriorityQueue for a thread-safe priority queue",
      ],
      prerequisites: ["s25-bisect"],
      concepts: ["queue-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Thread-safe queues\n\n`collections.deque` is not thread-safe for concurrent producers and consumers. The `queue` module provides `Queue`, `LifoQueue`, and `PriorityQueue` — all of which use locks internally so multiple threads can safely call `put()` and `get()` simultaneously.",
        },
        {
          kind: "code",
          language: "python",
          code: "from queue import Queue\nimport threading\n\nq = Queue(maxsize=5)\n\ndef producer():\n    for i in range(5):\n        q.put(i)\n        print(f'Produced {i}')\n\ndef consumer():\n    for _ in range(5):\n        item = q.get()\n        print(f'Consumed {item}')\n        q.task_done()\n\nt1 = threading.Thread(target=producer)\nt2 = threading.Thread(target=consumer)\nt1.start(); t2.start()\nt1.join(); t2.join()",
          caption: "Queue.put() and Queue.get() are thread-safe. task_done() signals the consumer is done.",
        },
        {
          kind: "comparison",
          leftLabel: "queue.Queue — thread-safe",
          rightLabel: "collections.deque — not thread-safe",
          leftCode: "from queue import Queue\nq = Queue()\nq.put(item)     # safe across threads\nq.get()         # blocks until item available",
          rightCode: "from collections import deque\nd = deque()\nd.append(item)  # not safe if another thread\nd.popleft()     # reads/writes concurrently",
          caption: "Use queue.Queue when multiple threads share a queue; use deque for single-threaded use.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "When would you use `queue.PriorityQueue` instead of `queue.Queue`? How does it differ from `heapq`?",
        },
      ],
      interactions: [
        {
          id: "s25-queue-mc",
          kind: "multiple-choice",
          prompt: "Which queue module class should you use when multiple threads produce and consume items?",
          beginnerPurpose: "Choose the right queue implementation for thread-safe scenarios.",
          expectedConceptIds: ["queue-module"],
          options: [
            { id: "opt-a", text: "collections.deque", isCorrect: false, explanation: "deque is not thread-safe for concurrent access." },
            { id: "opt-b", text: "queue.Queue", isCorrect: true, explanation: "queue.Queue uses internal locking and is safe for concurrent producer/consumer patterns." },
            { id: "opt-c", text: "list", isCorrect: false, explanation: "list is not thread-safe for concurrent append/pop." },
            { id: "opt-d", text: "heapq", isCorrect: false, explanation: "heapq operates on a plain list and is not thread-safe." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Thread safety requires locking mechanisms — only the queue module provides these." }],
          feedback: {
            correct: "Correct! queue.Queue is designed for thread-safe producer/consumer patterns.",
            incorrect: "For concurrent threads, use queue.Queue which has built-in locking.",
          },
        },
        {
          id: "s25-queue-fill",
          kind: "fill-code",
          prompt: "Complete the code to create a thread-safe LIFO queue and push then pop one item.",
          beginnerPurpose: "Practice using queue.LifoQueue as a thread-safe stack.",
          expectedConceptIds: ["queue-module"],
          codeTemplate: "from queue import LifoQueue\nstack = ___()\nstack.put('first')\nstack.put('second')\nprint(stack.get())",
          blanks: [
            { placeholder: "___", answer: "LifoQueue", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The thread-safe LIFO queue class is queue.LifoQueue." },
          ],
          feedback: {
            correct: "Correct! LifoQueue.get() returns the most recently put item ('second').",
            incorrect: "Use LifoQueue for a thread-safe LIFO (last-in, first-out) structure.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "queue-module", recallPrompt: "Why is queue.Queue preferred over deque when sharing data between threads?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-queue-mc", "s25-queue-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["queue-module"],
      },
    },

    /* ── Lesson 25.13: weakref ────────────────────────────────────────────── */
    {
      id: "s25-weakref",
      stageId: "stage-25",
      title: "weakref Module",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain the difference between strong and weak references",
        "Create a weakref.ref and check if the referent is alive",
        "Use weakref.WeakValueDictionary to cache objects without preventing GC",
        "Recognize circular reference scenarios that weakref resolves",
      ],
      prerequisites: ["s25-queue-module"],
      concepts: ["weakref-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Strong vs weak references\n\nA normal Python variable is a *strong reference* — it keeps the object alive. A *weak reference* does not prevent garbage collection. When the only references to an object are weak, the GC can reclaim the object. This is useful for caches: you want to keep objects around while something else uses them, but you do not want the cache to be the sole reason they stay in memory.",
        },
        {
          kind: "code",
          language: "python",
          code: "import weakref\n\nclass BigObject:\n    def __init__(self, name):\n        self.name = name\n\nobj = BigObject('data')\nweak = weakref.ref(obj)   # weak reference\n\nprint(weak())             # <BigObject ...>  — still alive\nprint(weak().name)        # data\n\ndel obj                   # remove the only strong reference\nprint(weak())             # None  — object was garbage collected",
          caption: "weakref.ref() creates a weak reference. Call it as a function to get the object (or None if collected).",
        },
        {
          kind: "code",
          language: "python",
          code: "import weakref\n\n# WeakValueDictionary: values are held weakly\ncache = weakref.WeakValueDictionary()\n\nclass Session:\n    def __init__(self, sid):\n        self.sid = sid\n\ns = Session('abc')\ncache['abc'] = s\nprint('abc' in cache)   # True\ndel s\nprint('abc' in cache)   # False — removed when session was GC'd",
          caption: "WeakValueDictionary auto-removes entries when the value object is garbage collected.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Weak references require __weakref__ slot",
          body: "Classes with `__slots__` must explicitly include `'__weakref__'` in their slot list, or weak references to instances will raise TypeError.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "You have a cache of `{user_id: User}` objects. Why would `WeakValueDictionary` be better than a plain `dict` here?",
        },
      ],
      interactions: [
        {
          id: "s25-weakref-mc",
          kind: "multiple-choice",
          prompt: "What does `weakref.ref(obj)()` return after the original object has been deleted?",
          beginnerPurpose: "Confirm understanding of weakref lifetime semantics.",
          expectedConceptIds: ["weakref-module"],
          options: [
            { id: "opt-a", text: "The original object (still alive via the weakref)", isCorrect: false, explanation: "A weakref does not keep the object alive; once the strong reference is deleted, the object may be collected." },
            { id: "opt-b", text: "None", isCorrect: true, explanation: "When the referent is garbage collected, calling the weakref returns None." },
            { id: "opt-c", text: "A ReferenceError", isCorrect: false, explanation: "No exception is raised; the weakref simply returns None." },
            { id: "opt-d", text: "The string 'dead'", isCorrect: false, explanation: "weakref returns None for collected objects, not a string." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "A weakref does not prevent GC. After collection, calling the ref returns a sentinel value." }],
          feedback: {
            correct: "Correct! A dead weakref returns None when called.",
            incorrect: "After the object is garbage collected, calling weakref.ref(obj)() returns None.",
          },
        },
        {
          id: "s25-weakref-explain",
          kind: "plain-language-explain",
          prompt: "Explain when and why you would use a WeakValueDictionary instead of a plain dict.",
          beginnerPurpose: "Articulate the GC-friendly cache pattern in your own words.",
          expectedConceptIds: ["weakref-module"],
          code: "import weakref\ncache = weakref.WeakValueDictionary()\n# Entries are automatically removed when values are garbage collected",
          keyPointsToHit: [
            "Plain dict holds strong references, preventing GC",
            "WeakValueDictionary holds values weakly, allowing GC",
            "Useful for caches that should not prevent object cleanup",
          ],
          sampleAnswer: "Use WeakValueDictionary when you want to cache objects but don't want the cache to be the reason those objects stay alive. With a plain dict, storing an object keeps it alive even if no other code needs it. With WeakValueDictionary, the entry disappears automatically when the object is garbage collected — the cache cleans itself up.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about the difference between 'I need this object' and 'I'd like this object if it still exists'." }],
          feedback: {
            correct: "Great explanation! The key is that WeakValueDictionary allows GC while plain dict prevents it.",
            incorrect: "Focus on: strong references prevent GC; weak references don't; WeakValueDictionary is self-cleaning.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "weakref-module", recallPrompt: "What does weakref.ref(obj)() return when obj has been garbage collected?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-weakref-mc", "s25-weakref-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["weakref-module"],
      },
    },

    /* ── Lesson 25.14: copy module ────────────────────────────────────────── */
    {
      id: "s25-copy-module",
      stageId: "stage-25",
      title: "copy — Shallow and Deep Copy",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish shallow copy from deep copy",
        "Use copy.copy() for a one-level duplicate",
        "Use copy.deepcopy() for fully independent nested structures",
        "Identify when assignment, shallow copy, or deep copy is appropriate",
      ],
      prerequisites: ["s25-weakref"],
      concepts: ["copy-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### The aliasing problem\n\nAssigning a list to another variable does not copy it — both variables point to the same object. Modifying through one name changes the other. To get an independent copy, you must explicitly copy. The question is: how deeply?",
        },
        {
          kind: "comparison",
          leftLabel: "Assignment (alias)",
          rightLabel: "copy.copy() (shallow)",
          leftCode: "a = [1, [2, 3]]\nb = a          # same object\nb[0] = 99\nprint(a[0])    # 99 — a is affected",
          rightCode: "import copy\na = [1, [2, 3]]\nb = copy.copy(a)  # new list, same inner objects\nb[0] = 99\nprint(a[0])       # 1 — outer is independent\nb[1][0] = 88\nprint(a[1][0])    # 88 — inner list still shared!",
          caption: "Shallow copy creates a new container but shares nested objects.",
        },
        {
          kind: "code",
          language: "python",
          code: "import copy\n\noriginal = [[1, 2], [3, 4]]\ndeep = copy.deepcopy(original)\ndeep[0][0] = 99\n\nprint(original[0][0])  # 1  — completely independent",
          caption: "deepcopy recursively copies all nested objects, producing a fully independent structure.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "deepcopy can be slow",
          body: "deepcopy recursively copies every nested object, including following object references. On large or deeply nested structures this can be slow. Consider restructuring data or using immutable objects to avoid needing deepcopy.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "You have `d = {'a': [1, 2, 3]}`. After `e = copy.copy(d)` and `e['a'].append(4)`, what is `d['a']`?",
        },
      ],
      interactions: [
        {
          id: "s25-copy-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Trace shallow copy behavior to see that nested objects are still shared.",
          expectedConceptIds: ["copy-module"],
          code: "import copy\na = [[1, 2], [3, 4]]\nb = copy.copy(a)\nb[0].append(99)\nb.append([5, 6])\nprint(a)",
          expectedOutput: "[[1, 2, 99], [3, 4]]",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Shallow copy creates a new outer list, but the inner lists are shared." },
            { level: "syntax", text: "b[0].append(99) modifies the inner list shared between a and b. b.append([5,6]) adds to b only." },
          ],
          feedback: {
            correct: "Correct! The inner list [1,2] is shared, so appending 99 affects a[0] too. The new [5,6] goes only into b.",
            incorrect: "Shallow copy: the outer list is new, but inner lists are shared. Appending to b[0] also changes a[0].",
          },
        },
        {
          id: "s25-copy-mc",
          kind: "multiple-choice",
          prompt: "Which function should you use to create a fully independent copy of `[[1, 2], [3, [4, 5]]]`?",
          beginnerPurpose: "Choose between copy() and deepcopy() for nested structures.",
          expectedConceptIds: ["copy-module"],
          options: [
            { id: "opt-a", text: "copy.copy()", isCorrect: false, explanation: "copy.copy() creates a shallow copy — nested objects are still shared." },
            { id: "opt-b", text: "copy.deepcopy()", isCorrect: true, explanation: "deepcopy recursively copies all nested objects, producing a fully independent structure." },
            { id: "opt-c", text: "list()", isCorrect: false, explanation: "list() also produces a shallow copy — nested objects are shared." },
            { id: "opt-d", text: "Assignment (=)", isCorrect: false, explanation: "Assignment creates an alias, not a copy at all." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "You need all levels to be independent, including nested lists." }],
          feedback: {
            correct: "Correct! Only deepcopy fully separates nested structures.",
            incorrect: "For nested structures that must be fully independent at all levels, use copy.deepcopy().",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "copy-module", recallPrompt: "What is the difference between assignment, copy.copy(), and copy.deepcopy()?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-copy-predict", "s25-copy-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["copy-module"],
      },
    },

    /* ── Lesson 25.15: pprint ─────────────────────────────────────────────── */
    {
      id: "s25-pprint",
      stageId: "stage-25",
      title: "pprint — Pretty Printing",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use pprint.pprint() to display nested data structures readably",
        "Configure width and depth parameters",
        "Use pprint.pformat() to get the formatted string instead of printing",
      ],
      prerequisites: ["s25-copy-module"],
      concepts: ["pprint-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Readable output for nested data\n\nWhen debugging programs that work with deeply nested dicts, lists, or JSON-like structures, `print()` outputs everything on one unreadable line. `pprint.pprint()` formats the data with indentation so structure is visible.",
        },
        {
          kind: "code",
          language: "python",
          code: "from pprint import pprint\n\ndata = {\n    'users': [\n        {'name': 'Alice', 'scores': [95, 87, 92]},\n        {'name': 'Bob',   'scores': [78, 81, 90]},\n    ],\n    'metadata': {'version': 2, 'active': True},\n}\n\npprint(data, width=50, depth=3)",
          caption: "pprint formats nested data with indentation. width limits line length; depth limits recursion.",
        },
        {
          kind: "code",
          language: "python",
          code: "from pprint import pformat\n\ndata = {'key': [1, 2, 3], 'other': 'value'}\nformatted = pformat(data)\nprint(f'Data is:\\n{formatted}')",
          caption: "pformat returns the formatted string instead of printing it — useful for logging.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Quick debugging with pprint",
          body: "Add `from pprint import pprint` to your debug imports. It is especially helpful with API responses, config dicts, and nested data from JSON files.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "When would you use `pformat()` instead of `pprint()`?",
        },
      ],
      interactions: [
        {
          id: "s25-pprint-mc",
          kind: "multiple-choice",
          prompt: "Which pprint function returns a formatted string rather than printing it?",
          beginnerPurpose: "Distinguish pprint() from pformat() for different use cases.",
          expectedConceptIds: ["pprint-module"],
          options: [
            { id: "opt-a", text: "pprint.pprint()", isCorrect: false, explanation: "pprint() prints directly; it doesn't return the string." },
            { id: "opt-b", text: "pprint.pformat()", isCorrect: true, explanation: "pformat() returns the formatted string, useful for logging or embedding in other output." },
            { id: "opt-c", text: "pprint.pstr()", isCorrect: false, explanation: "pstr() does not exist in the pprint module." },
            { id: "opt-d", text: "pprint.dumps()", isCorrect: false, explanation: "dumps() is from the json module, not pprint." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The 'f' in pformat stands for 'format' — it formats rather than prints." }],
          feedback: {
            correct: "Correct! pformat() returns the pretty-printed string.",
            incorrect: "pformat() is the function that returns a string; pprint() prints directly.",
          },
        },
        {
          id: "s25-pprint-fill",
          kind: "fill-code",
          prompt: "Complete the code to pretty-print a nested dict limited to depth 2.",
          beginnerPurpose: "Practice passing parameters to pprint.",
          expectedConceptIds: ["pprint-module"],
          codeTemplate: "from pprint import pprint\ndata = {'a': {'b': {'c': 'deep'}}}\npprint(data, ___=2)",
          blanks: [
            { placeholder: "___", answer: "depth", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The parameter to limit recursion depth is called 'depth'." },
          ],
          feedback: {
            correct: "Correct! depth=2 limits how many levels deep pprint will expand.",
            incorrect: "Use the depth= keyword argument to control recursion depth.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "pprint-module", recallPrompt: "What is the difference between pprint() and pformat()?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-pprint-mc", "s25-pprint-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["pprint-module"],
      },
    },

    /* ── Lesson 25.16: reprlib ────────────────────────────────────────────── */
    {
      id: "s25-reprlib",
      stageId: "stage-25",
      title: "reprlib",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use reprlib.repr() to get a length-limited repr of objects",
        "Understand when reprlib helps avoid flooding logs with huge repr output",
        "Customize reprlib.Repr to set maxlist, maxdict, etc.",
      ],
      prerequisites: ["s25-pprint"],
      concepts: ["reprlib-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Controlling repr length\n\nIn production logging or error messages, a plain `repr()` of a large list or dict produces thousands of characters. `reprlib.repr()` truncates the output with ellipsis while still showing the type and approximate content.",
        },
        {
          kind: "code",
          language: "python",
          code: "import reprlib\n\nbig_list = list(range(1000))\nprint(repr(big_list)[:80])       # [0, 1, 2, 3, 4, ...  (very long)\nprint(reprlib.repr(big_list))    # [0, 1, 2, 3, 4, 5, ...]  (truncated)",
          caption: "reprlib.repr() limits output length to avoid flooding logs.",
        },
        {
          kind: "code",
          language: "python",
          code: "import reprlib\n\n# Customize limits\nrp = reprlib.Repr()\nrp.maxlist = 3    # show only 3 list items\nrp.maxstring = 10 # truncate strings to 10 chars\nprint(rp.repr(['apple', 'banana', 'cherry', 'date']))\n# [\"apple\", \"banana\", \"cherry\", ...]",
          caption: "Create a Repr instance and set maxlist, maxdict, maxstring attributes to customize limits.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use reprlib in custom __repr__ methods",
          body: "When writing `__repr__` for a class that contains a large collection, call `reprlib.repr(self.data)` instead of `repr(self.data)` to keep the output manageable.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "What does `reprlib.repr(['a'] * 100)` print? How is it different from `repr(['a'] * 100)`?",
        },
      ],
      interactions: [
        {
          id: "s25-reprlib-mc",
          kind: "multiple-choice",
          prompt: "What is the primary purpose of reprlib.repr()?",
          beginnerPurpose: "Understand the motivating use case for reprlib.",
          expectedConceptIds: ["reprlib-module"],
          options: [
            { id: "opt-a", text: "To produce a prettier, indented repr like pprint", isCorrect: false, explanation: "reprlib focuses on length limiting, not indentation. pprint handles indentation." },
            { id: "opt-b", text: "To produce a truncated repr safe for logging large objects", isCorrect: true, explanation: "reprlib.repr() limits output to a manageable length to avoid flooding logs." },
            { id: "opt-c", text: "To serialize objects to JSON", isCorrect: false, explanation: "JSON serialization uses the json module, not reprlib." },
            { id: "opt-d", text: "To evaluate repr strings back into objects", isCorrect: false, explanation: "eval() can eval repr output in some cases; reprlib only formats, does not parse." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what 'repr-lib' does — it is a library for safe repr output." }],
          feedback: {
            correct: "Correct! reprlib produces concise, length-limited repr output for logging.",
            incorrect: "reprlib.repr() creates a truncated representation to prevent extremely long log lines.",
          },
        },
        {
          id: "s25-reprlib-fill",
          kind: "fill-code",
          prompt: "Complete the code to use reprlib to print a length-limited repr of a large set.",
          beginnerPurpose: "Practice using reprlib.repr() in place of repr().",
          expectedConceptIds: ["reprlib-module"],
          codeTemplate: "import reprlib\nbig_set = set(range(500))\nprint(___.repr(big_set))",
          blanks: [
            { placeholder: "___", answer: "reprlib", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "Import the module as `import reprlib` and call reprlib.repr()." },
          ],
          feedback: {
            correct: "Correct! reprlib.repr(big_set) produces a truncated representation.",
            incorrect: "After `import reprlib`, call reprlib.repr(obj) to get a length-limited repr.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "reprlib-module", recallPrompt: "When would you use reprlib.repr() instead of the built-in repr()?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-reprlib-mc", "s25-reprlib-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["reprlib-module"],
      },
    },

    /* ── Lesson 25.17: enum as data structure ─────────────────────────────── */
    {
      id: "s25-enum-data-structure",
      stageId: "stage-25",
      title: "enum Revisited as a Data Structure",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use IntEnum and IntFlag for bitwise operations",
        "Use auto() to assign values automatically",
        "Iterate over enum members and use them as dict keys",
        "Choose between Enum, IntEnum, StrEnum, and Flag",
      ],
      prerequisites: ["s25-reprlib"],
      concepts: ["enum-data-structure"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Enum as a mapping and set of values\n\nBeyond naming constants, `enum` members can serve as dict keys, can be iterated, and can participate in bitwise operations (via `Flag`). Treating an Enum as a collection of structured values — not just labels — unlocks powerful patterns.",
        },
        {
          kind: "code",
          language: "python",
          code: "from enum import Enum, auto\n\nclass Direction(Enum):\n    NORTH = auto()  # assigned 1\n    SOUTH = auto()  # assigned 2\n    EAST  = auto()  # assigned 3\n    WEST  = auto()  # assigned 4\n\n# Iterate over members\nfor d in Direction:\n    print(d.name, d.value)\n\n# Use as dict key\nsteps = {Direction.NORTH: (0, 1), Direction.SOUTH: (0, -1)}\nprint(steps[Direction.NORTH])  # (0, 1)",
          caption: "auto() assigns values automatically. Enum members are iterable and hashable (usable as dict keys).",
        },
        {
          kind: "code",
          language: "python",
          code: "from enum import Flag, auto\n\nclass Permission(Flag):\n    READ    = auto()  # 1\n    WRITE   = auto()  # 2\n    EXECUTE = auto()  # 4\n\nuser_perms = Permission.READ | Permission.WRITE\nprint(user_perms)                         # Permission.READ|WRITE\nprint(Permission.READ in user_perms)      # True\nprint(Permission.EXECUTE in user_perms)   # False",
          caption: "Flag supports bitwise operations — combine permissions with | and test membership with `in`.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "StrEnum for string-valued enums",
          body: "Python 3.11 introduced `StrEnum` where members behave like strings: `member == 'value'` is True. Useful for JSON keys and config values.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "You have `class Color(IntEnum): RED=1; GREEN=2; BLUE=4`. What does `Color.RED | Color.BLUE` equal? Can you use `Color.RED` as a dict key?",
        },
      ],
      interactions: [
        {
          id: "s25-enum-ds-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Trace Flag bitwise operations to understand permission composition.",
          expectedConceptIds: ["enum-data-structure"],
          code: "from enum import Flag, auto\nclass Perm(Flag):\n    R = auto()\n    W = auto()\n    X = auto()\np = Perm.R | Perm.W\nprint(Perm.R in p)\nprint(Perm.X in p)",
          expectedOutput: "True\nFalse",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Perm.R | Perm.W creates a combined flag. 'in' tests if a specific flag is set." },
          ],
          feedback: {
            correct: "Correct! R is set in R|W; X is not set.",
            incorrect: "p = R | W combines two flags. `in` checks whether a specific flag bit is present.",
          },
        },
        {
          id: "s25-enum-ds-mc",
          kind: "multiple-choice",
          prompt: "What does `auto()` do when used as an Enum member's value?",
          beginnerPurpose: "Understand the auto() helper for enums.",
          expectedConceptIds: ["enum-data-structure"],
          options: [
            { id: "opt-a", text: "Assigns the member's name as its value", isCorrect: false, explanation: "auto() assigns an integer (starting at 1 by default), not the name." },
            { id: "opt-b", text: "Automatically assigns the next integer value", isCorrect: true, explanation: "auto() generates values automatically: 1, 2, 3, ... in definition order." },
            { id: "opt-c", text: "Makes the member optional", isCorrect: false, explanation: "There is no concept of optional enum members." },
            { id: "opt-d", text: "Picks a random value each run", isCorrect: false, explanation: "auto() is deterministic — it assigns sequential integers." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "auto() eliminates manual value assignment." }],
          feedback: {
            correct: "Correct! auto() assigns sequential integers starting at 1.",
            incorrect: "auto() automatically assigns the next integer value in sequence.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "enum-data-structure", recallPrompt: "When would you use Flag instead of Enum, and how do you combine Flag members?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-enum-ds-predict", "s25-enum-ds-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["enum-data-structure"],
      },
    },

    /* ── Lesson 25.18: Data-structure selection project ───────────────────── */
    {
      id: "s25-ds-selection-project",
      stageId: "stage-25",
      title: "Data-Structure Selection Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Choose the right data structure for each of several problem specifications",
        "Implement solutions using at least 4 different structures from this stage",
        "Justify each choice with a performance or API argument",
      ],
      prerequisites: ["s25-enum-data-structure"],
      concepts: ["collections-counter", "collections-defaultdict", "collections-deque", "heapq-module", "bisect-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Putting it all together\n\nChoosing the right data structure is as important as the algorithm. Given a problem statement, you must reason about access patterns, mutation needs, ordering requirements, and thread safety to pick the optimal structure.",
        },
        {
          kind: "text",
          markdown:
            "### Problem scenarios to solve\n\n1. **Word frequency ranking** — given a large text file, find the 10 most common words.\n2. **Event log grouping** — given `(timestamp, event_type, message)` triples, group by event type.\n3. **Real-time top-3 scores** — maintain the top 3 scores as new scores arrive (efficient insertion).\n4. **Sliding window average** — compute the average of the last 100 sensor readings.\n5. **Grade bucketing** — map integer scores to letter grades without a chain of if/elif.",
        },
        {
          kind: "code",
          language: "python",
          code: "# Starter: choose the structure and implement each\nfrom collections import Counter, defaultdict, deque\nimport heapq, bisect\n\n# 1. Word frequency — Counter\ntext = \"the quick brown fox jumps over the lazy dog the\"\nword_freq = Counter(text.split())\nprint(word_freq.most_common(3))\n\n# 2. Event grouping — defaultdict(list)\nevents = [('10:00', 'ERROR', 'disk full'), ('10:01', 'INFO', 'started'), ('10:02', 'ERROR', 'oom')]\nby_type = defaultdict(list)\nfor ts, etype, msg in events:\n    by_type[etype].append((ts, msg))\nprint(dict(by_type))\n\n# 3. Top-3 scores — heapq (min-heap of size 3)\ntop3 = []\nfor score in [55, 92, 73, 88, 60, 95, 78]:\n    heapq.heappush(top3, score)\n    if len(top3) > 3:\n        heapq.heappop(top3)\nprint(sorted(top3, reverse=True))\n\n# 4. Sliding window — deque(maxlen=5)\nreadings = deque(maxlen=5)\nfor r in [10, 20, 30, 40, 50, 60]:\n    readings.append(r)\nprint(sum(readings) / len(readings))\n\n# 5. Grade bucketing — bisect\nbounds = [60, 70, 80, 90]\nlabels = ['F', 'D', 'C', 'B', 'A']\ndef grade(s): return labels[bisect.bisect_left(bounds, s)]\nprint(grade(85))",
          caption: "Each problem calls for a different standard library structure — the right tool makes the solution elegant.",
        },
        {
          kind: "why-matters",
          body: "Data structure selection is a core engineering skill. Knowing that Counter, defaultdict, deque, heapq, and bisect exist — and when each is the right choice — separates professional Python from beginner Python.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "For each of the 5 scenarios, write one sentence justifying your data structure choice in terms of performance or API fit.",
        },
      ],
      interactions: [
        {
          id: "s25-ds-project-mc",
          kind: "multiple-choice",
          prompt: "You need to maintain the current top 10 scores from a stream of millions of incoming scores. Which structure gives the best performance?",
          beginnerPurpose: "Apply data structure selection reasoning to a real scenario.",
          expectedConceptIds: ["heapq-module"],
          options: [
            { id: "opt-a", text: "Sort the full list each time", isCorrect: false, explanation: "Sorting the full list is O(n log n) per insertion — far too slow for millions of items." },
            { id: "opt-b", text: "A min-heap of size 10 using heapq", isCorrect: true, explanation: "A fixed-size min-heap processes each score in O(log 10) = O(1) time — constant regardless of stream size." },
            { id: "opt-c", text: "A Counter of all scores", isCorrect: false, explanation: "Counter stores all scores in memory and still needs sorting to find top 10." },
            { id: "opt-d", text: "A deque(maxlen=10)", isCorrect: false, explanation: "deque keeps the last 10 items in arrival order, not the top 10 by value." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "You need to efficiently maintain a small 'top-N' set as new items arrive." }],
          feedback: {
            correct: "Correct! A fixed-size min-heap maintains the top N items in O(log N) per insertion.",
            incorrect: "A min-heap of size 10 is the classic top-N structure: each new score either replaces the minimum or is discarded.",
          },
        },
        {
          id: "s25-ds-project-run",
          kind: "run-code",
          prompt: "Implement a sliding window that tracks the last 5 values and prints the current average after each new value.",
          beginnerPurpose: "Build a complete deque-based sliding window to consolidate lesson knowledge.",
          expectedConceptIds: ["collections-deque"],
          starterCode: "from collections import deque\nwindow = deque(maxlen=5)\nvalues = [10, 20, 30, 40, 50, 60, 70]\nfor v in values:\n    window.append(v)\n    avg = sum(window) / len(window)\n    print(f'Added {v}, avg={avg:.1f}')",
          task: "Run the code and observe how the window average changes as old values are evicted.",
          expectedOutputContains: ["avg=10.0", "avg=40.0", "avg=50.0"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "deque(maxlen=5) automatically evicts the oldest value when the 6th is added." },
          ],
          feedback: {
            correct: "Great! The sliding window average correctly tracks the last 5 values.",
            incorrect: "Make sure you append each value to the deque and compute sum/len after each append.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "collections-counter", recallPrompt: "Which data structure would you use to find the top 10 words in a text?", nextReviewAfterDays: 3 },
        { conceptId: "heapq-module", recallPrompt: "How does a fixed-size heap let you track top-N in a stream efficiently?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s25-ds-project-mc", "s25-ds-project-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["collections-counter", "heapq-module"],
      },
    },
  ],

  project: {
    id: "s25-project",
    stageId: "stage-25",
    title: "Data-Structure Selection Project",
    brief:
      "Solve a set of data processing problems, choosing the optimal standard library data structure for each. Problems include word frequency, event grouping, top-N tracking, sliding windows, and range lookups.",
    requirements: [
      "Solve at least 5 distinct data processing problems",
      "Use at least 4 different structures from this stage (Counter, defaultdict, deque, heapq, bisect, etc.)",
      "Include a comment for each solution justifying the structure choice",
      "Handle edge cases (empty input, single-element input)",
      "Add type annotations to all functions",
    ],
    acceptanceCriteria: [
      "Each solution uses the most appropriate structure",
      "All solutions produce correct output for provided test cases",
      "Comments clearly justify each structure choice",
      "Code is readable and follows Python conventions",
    ],
    conceptIds: ["collections-counter", "collections-defaultdict", "collections-deque", "heapq-module", "bisect-module"],
    difficulty: "intermediate",
  },
} satisfies Stage;
