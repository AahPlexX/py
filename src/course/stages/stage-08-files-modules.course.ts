import type { Stage } from "@/course/course.schema";

export const stage08 = {
  id: "stage-08",
  number: 8,
  title: "Lists and Mutable Sequences",
  summary:
    "Master Python lists: creation, indexing, slicing, all mutation methods (append, extend, insert, remove, pop, clear, sort, reverse), copying, aliasing bugs, nested lists, stacks, queues, deque, iteration patterns, enumerate, zip, filtering, and transformation.",
  level: "beginner",
  masteryGateConceptIds: ["list-basics", "list-mutation", "list-iteration"],

  lessons: [
    /* ── Lesson 8.1 — List creation ─────────────────────────────────────── */
    {
      id: "s8-list-creation",
      stageId: "stage-08",
      title: "List Creation",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Create lists using literal syntax and list()",
        "Create lists containing mixed types",
        "Create empty lists and lists from ranges",
      ],
      prerequisites: [],
      concepts: ["list-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Is a List?\n\nA **list** is an ordered collection of values. Unlike a string (which holds only characters), a list can hold any mix of types — numbers, strings, other lists, even functions. Lists are one of Python's most-used data structures.\n\n## Creating Lists\n\n```python\n# Literal syntax — most common:\nfruits = ['apple', 'banana', 'cherry']\nnumbers = [1, 2, 3, 4, 5]\nmixed = [42, 'hello', True, 3.14, None]\nempty = []\n\n# list() constructor:\nfrom_range = list(range(5))     # [0, 1, 2, 3, 4]\nfrom_string = list('hello')     # ['h', 'e', 'l', 'l', 'o']\nfrom_tuple = list((1, 2, 3))    # [1, 2, 3]\n\n# Nested lists:\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\npairs = [('Alice', 95), ('Bob', 87)]\n```\n\n## Lists Are Dynamic\n\nUnlike arrays in some languages, Python lists can grow or shrink at any time and hold values of any type:\n\n```python\ndata = []\ndata.append(1)\ndata.append('two')\ndata.append([3, 4])\nprint(data)   # [1, 'two', [3, 4]]\nprint(len(data))  # 3\n```",
        },
        {
          kind: "why-matters",
          body: "Lists are the go-to structure for any ordered collection of items you need to build, modify, or process — reading CSV rows, collecting user inputs, managing a task queue, or storing results from a computation.",
        },
      ],
      interactions: [
        {
          id: "s8-list-creation-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Create and inspect a list",
          expectedConceptIds: ["list-basics"],
          code: "nums = list(range(1, 6))\nprint(nums)\nprint(len(nums))\nprint(type(nums))",
          expectedOutput: "[1, 2, 3, 4, 5]\n5\n<class 'list'>",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "list(range(1,6)) creates [1,2,3,4,5]. len gives count. type gives the class." }],
          feedback: { correct: "Correct! list(range(1,6)) → [1,2,3,4,5], len=5.", incorrect: "range(1,6) gives 1 through 5. list() converts it. len([1,2,3,4,5])=5." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-list-creation-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.2 — Indexing lists ─────────────────────────────────────── */
    {
      id: "s8-indexing-lists",
      stageId: "stage-08",
      title: "Indexing Lists",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Access elements using positive indexes starting at 0",
        "Access elements using negative indexes from the end",
        "Modify an element at a specific index",
      ],
      prerequisites: [],
      concepts: ["list-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## List Indexing\n\nList indexing works exactly like string indexing — 0-based, supports negative indexes:\n\n```python\nfruits = ['apple', 'banana', 'cherry', 'date']\n#          0        1         2         3\n#         -4       -3        -2        -1\n\nprint(fruits[0])    # 'apple'\nprint(fruits[2])    # 'cherry'\nprint(fruits[-1])   # 'date'  — last element\nprint(fruits[-2])   # 'cherry'\n```\n\n## Lists Are Mutable — You Can Change Elements\n\nUnlike strings, you CAN assign to a list index:\n\n```python\nfruits[1] = 'blueberry'   # replace 'banana'\nprint(fruits)              # ['apple', 'blueberry', 'cherry', 'date']\n```\n\n## IndexError on Out-of-Range Access\n\n```python\nfruits[10]   # IndexError: list index out of range\n```\n\n## Swapping Elements\n\n```python\ndata = [3, 1, 2]\ndata[0], data[2] = data[2], data[0]   # swap first and last\nprint(data)   # [2, 1, 3]\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Lists Are Mutable, Strings Are Not",
          body: "The key difference from strings: `my_list[0] = 'new'` works, but `my_string[0] = 'N'` raises TypeError. Lists support item assignment; strings do not.",
        },
      ],
      interactions: [
        {
          id: "s8-indexing-lists-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace list indexing and mutation",
          expectedConceptIds: ["list-basics"],
          code: "data = [10, 20, 30, 40]\ndata[1] = 99\nprint(data[0])\nprint(data[-1])\nprint(data)",
          expectedOutput: "10\n40\n[10, 99, 30, 40]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "data[1]=99 replaces 20. data[0]=10. data[-1]=40 (last). Full list shows mutation." }],
          feedback: { correct: "Correct! Mutation changes index 1 from 20 to 99.", incorrect: "data[1]=99 changes position 1. data[0] is still 10. data[-1] is still 40. List becomes [10,99,30,40]." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-indexing-lists-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.3 — Negative indexes ───────────────────────────────────── */
    {
      id: "s8-negative-indexes",
      stageId: "stage-08",
      title: "Negative Indexes",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Access the last N elements using negative indexes",
        "Mutate elements using negative indexes",
        "Apply negative indexes in practical scenarios (last item, second-to-last, etc.)",
      ],
      prerequisites: [],
      concepts: ["list-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Counting from the End\n\nNegative indexes count backward from the last element. `-1` is the last, `-2` is second to last:\n\n```python\nscores = [85, 92, 78, 96, 88]\n\nprint(scores[-1])   # 88  — last score\nprint(scores[-2])   # 96  — second to last\nprint(scores[-5])   # 85  — same as scores[0]\n```\n\n## Mutating with Negative Indexes\n\n```python\nscores[-1] = 90   # update the last score\nprint(scores)     # [85, 92, 78, 96, 90]\n```\n\n## Practical Uses\n\n```python\nhistory = []\nhistory.append('cmd1')\nhistory.append('cmd2')\nhistory.append('cmd3')\n\n# Get most recent command:\nprint(history[-1])   # 'cmd3'\n\n# Remove the most recent:\nhistory.pop()   # removes last\nprint(history)  # ['cmd1', 'cmd2']\n```\n\n## Equivalence\n\n```python\nlst = ['a', 'b', 'c', 'd']\n# lst[-1] == lst[len(lst) - 1]\nprint(lst[-1] == lst[len(lst) - 1])  # True\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use -1 for Last Element",
          body: "Using `lst[-1]` is always preferred over `lst[len(lst) - 1]`. It's shorter, clearer, and doesn't require computing the length. It also works on empty lists... except it raises IndexError, same as any out-of-range access.",
        },
      ],
      interactions: [
        {
          id: "s8-negative-indexes-mc",
          kind: "multiple-choice",
          prompt: "For `data = [1, 2, 3, 4, 5]`, what is `data[-2]`?",
          beginnerPurpose: "Apply negative indexing",
          expectedConceptIds: ["list-basics"],
          options: [
            { id: "a", text: "3", isCorrect: false, explanation: "-2 is the SECOND to last, which is 4, not 3." },
            { id: "b", text: "4", isCorrect: true, explanation: "Correct! -1 is 5 (last), -2 is 4 (second to last)." },
            { id: "c", text: "2", isCorrect: false, explanation: "-2 counts from the end: -1=5, -2=4." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "-1=5 (last), -2=4 (second to last), -3=3, etc." }],
          feedback: { correct: "Correct! data[-2] is the second-to-last element: 4.", incorrect: "Negative indexes count from the end: -1=5, -2=4." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-negative-indexes-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.4 — Slicing lists ──────────────────────────────────────── */
    {
      id: "s8-slicing-lists",
      stageId: "stage-08",
      title: "Slicing Lists",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Extract sublists using start:stop:step notation",
        "Use slice assignment to replace a portion of a list",
        "Apply slice assignment to insert or delete elements",
      ],
      prerequisites: [],
      concepts: ["list-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Slicing Lists\n\nSlicing extracts a sublist without modifying the original:\n\n```python\ndata = [10, 20, 30, 40, 50, 60]\n\nprint(data[1:4])    # [20, 30, 40]  — indexes 1,2,3\nprint(data[:3])     # [10, 20, 30]  — from start\nprint(data[3:])     # [40, 50, 60]  — to end\nprint(data[::2])    # [10, 30, 50]  — every other\nprint(data[::-1])   # [60, 50, 40, 30, 20, 10]  — reversed\n```\n\n## Slices Return New Lists\n\n```python\noriginal = [1, 2, 3, 4, 5]\ncopy = original[:]    # full slice — creates a new list (shallow copy)\ncopy[0] = 99\nprint(original)   # [1, 2, 3, 4, 5]  — unchanged\nprint(copy)       # [99, 2, 3, 4, 5]\n```\n\n## Slice Assignment — Modify In Place\n\nLists support assigning to a slice:\n\n```python\ndata = [1, 2, 3, 4, 5]\ndata[1:3] = [20, 30, 40]   # replace elements at 1:3 with 3 elements\nprint(data)   # [1, 20, 30, 40, 4, 5]\n\ndata[2:4] = []   # delete elements at 2:4\nprint(data)   # [1, 20, 4, 5]\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "list[:] Creates a Shallow Copy",
          body: "my_list[:] creates a new list with the same items. This is a shallow copy — the list itself is new, but elements inside are the same objects. For nested lists, nested objects are shared.",
        },
      ],
      interactions: [
        {
          id: "s8-slicing-lists-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply list slicing",
          expectedConceptIds: ["list-basics"],
          code: "items = ['a', 'b', 'c', 'd', 'e']\nprint(items[1:4])\nprint(items[-2:])\nprint(items[::2])",
          expectedOutput: "['b', 'c', 'd']\n['d', 'e']\n['a', 'c', 'e']",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "[1:4]→b,c,d. [-2:]→last 2. [::2]→every other from start." }],
          feedback: { correct: "Correct! [1:4]→['b','c','d'], [-2:]→['d','e'], [::2]→['a','c','e'].", incorrect: "items[1:4]: indexes 1,2,3. items[-2:]: last 2. items[::2]: every 2nd starting at 0." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-slicing-lists-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.5 — List mutation ──────────────────────────────────────── */
    {
      id: "s8-list-mutation",
      stageId: "stage-08",
      title: "List Mutation",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain that lists are mutable — they can be changed in place",
        "Distinguish methods that return new objects from methods that mutate in place",
        "Predict the state of a list after a sequence of mutations",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Lists Are Mutable\n\nA list can be changed after creation — elements can be added, removed, or replaced. This is called **mutation**. It is the key difference between lists and tuples (which are immutable).\n\n## In-Place vs Return-a-New-Value\n\nList methods that mutate return `None` — the change happens to the original list:\n\n```python\ndata = [3, 1, 4, 1, 5]\n\n# In-place mutation — returns None:\nresult = data.sort()\nprint(result)   # None  — sort() mutates data in place\nprint(data)     # [1, 1, 3, 4, 5]  — data is changed\n\n# In contrast, sorted() returns a new list:\ndata = [3, 1, 4, 1, 5]\nresult = sorted(data)\nprint(result)   # [1, 1, 3, 4, 5]  — new list\nprint(data)     # [3, 1, 4, 1, 5]  — unchanged\n```\n\n## The Mutation Trap\n\n```python\ndata = [3, 1, 4]\ndata_sorted = data.sort()   # WRONG — data_sorted is None!\nprint(data_sorted)           # None\n\n# Correct:\ndata = [3, 1, 4]\ndata.sort()                  # mutate in place\nprint(data)                  # [1, 3, 4]\n\n# OR keep original:\ndata_sorted = sorted(data)   # new list, data unchanged\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Mutating Methods Return None",
          body: "append(), sort(), reverse(), extend(), insert(), remove(), and clear() all return None. Never write `my_list = my_list.append(item)` — you'll replace the list with None.",
        },
      ],
      interactions: [
        {
          id: "s8-list-mutation-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Identify the None-return mutation trap",
          expectedConceptIds: ["list-mutation"],
          code: "lst = [3, 1, 2]\nresult = lst.sort()\nprint(result)\nprint(lst)",
          expectedOutput: "None\n[1, 2, 3]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "sort() mutates lst in place and returns None. lst is now sorted." }],
          feedback: { correct: "Correct! sort() returns None and mutates lst in place.", incorrect: "sort() returns None (not the sorted list) and changes lst directly." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-list-mutation-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.6 — append() ───────────────────────────────────────────── */
    {
      id: "s8-append",
      stageId: "stage-08",
      title: ".append()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Add a single item to the end of a list with append()",
        "Build a list incrementally using append() in a loop",
        "Explain that append() modifies the list in place and returns None",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## append() — Add One Item to the End\n\n`append()` adds a single item to the end of a list. It modifies the list in place:\n\n```python\nfruits = ['apple', 'banana']\nfruits.append('cherry')\nprint(fruits)   # ['apple', 'banana', 'cherry']\n\nfruits.append(['date', 'elderberry'])   # appends the LIST as one item!\nprint(fruits)   # ['apple', 'banana', 'cherry', ['date', 'elderberry']]\nprint(len(fruits))  # 4 — the nested list is ONE item\n```\n\n## Building Lists with append() in a Loop\n\n```python\nsquares = []\nfor n in range(1, 6):\n    squares.append(n ** 2)\nprint(squares)   # [1, 4, 9, 16, 25]\n```\n\n## append() vs extend()\n\n```python\nlst = [1, 2, 3]\n\nlst.append([4, 5])   # adds [4,5] as ONE item\nprint(lst)           # [1, 2, 3, [4, 5]]\n\nlst2 = [1, 2, 3]\nlst2.extend([4, 5])  # adds 4 and 5 as SEPARATE items\nprint(lst2)          # [1, 2, 3, 4, 5]\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "append() Adds One Item — Even If It's a List",
          body: "fruits.append(['a', 'b']) adds the entire list ['a','b'] as a single nested element. If you want to add all items separately, use extend() instead.",
        },
      ],
      interactions: [
        {
          id: "s8-append-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace append building a list in a loop",
          expectedConceptIds: ["list-mutation"],
          code: "result = []\nfor ch in 'hello':\n    result.append(ch.upper())\nprint(result)",
          expectedOutput: "['H', 'E', 'L', 'L', 'O']",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "append adds one uppercase character per iteration." }],
          feedback: { correct: "Correct! Each character is uppercased and appended individually.", incorrect: "Each ch.upper() is appended as a separate character string: H, E, L, L, O." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-append-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.7 — extend() ───────────────────────────────────────────── */
    {
      id: "s8-extend",
      stageId: "stage-08",
      title: ".extend()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Add multiple items from an iterable using extend()",
        "Distinguish extend() from append() for adding sequences",
        "Use += as shorthand for extend()",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## extend() — Add All Items from an Iterable\n\n`extend()` adds each element of an iterable individually to the end of the list:\n\n```python\nbase = [1, 2, 3]\nbase.extend([4, 5, 6])\nprint(base)   # [1, 2, 3, 4, 5, 6]\n\nbase.extend(range(7, 10))\nprint(base)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\nbase.extend('xy')   # strings are iterables!\nprint(base)   # [1, 2, 3, 4, 5, 6, 7, 8, 9, 'x', 'y']\n```\n\n## += Is Equivalent to extend()\n\n```python\nlst = [1, 2, 3]\nlst += [4, 5]   # same as lst.extend([4, 5])\nprint(lst)      # [1, 2, 3, 4, 5]\n\n# Note: lst = lst + [4, 5] creates a NEW list (less efficient for large lists)\n```\n\n## When to Use extend() vs append()\n\n```python\nfruits = ['apple']\n\n# Add multiple individual fruits:\nfruits.extend(['banana', 'cherry'])   # add each as a separate item\nprint(fruits)   # ['apple', 'banana', 'cherry']\n\n# Add a category as a group:\nfruits.append(['date', 'elderberry'])   # add the whole list as one item\nprint(fruits)   # ['apple', 'banana', 'cherry', ['date', 'elderberry']]\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "extend() Works on Any Iterable",
          body: "extend() accepts any iterable: lists, tuples, ranges, generators, strings, even sets. It iterates through the argument and appends each item individually.",
        },
      ],
      interactions: [
        {
          id: "s8-extend-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Compare append and extend results",
          expectedConceptIds: ["list-mutation"],
          code: "a = [1, 2]\nb = [1, 2]\na.append([3, 4])\nb.extend([3, 4])\nprint(a)\nprint(b)",
          expectedOutput: "[1, 2, [3, 4]]\n[1, 2, 3, 4]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "append adds the list as ONE item. extend adds each item separately." }],
          feedback: { correct: "Correct! append nests the list; extend unpacks it.", incorrect: "append([3,4]) adds the list as a single nested item. extend([3,4]) adds 3 and 4 separately." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-extend-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.8 — insert() ───────────────────────────────────────────── */
    {
      id: "s8-insert",
      stageId: "stage-08",
      title: ".insert()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Insert an item at a specific position with insert(index, item)",
        "Use insert(0, item) to prepend to a list",
        "Understand that insert() shifts subsequent elements",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## insert() — Add at a Specific Position\n\n`insert(index, item)` inserts `item` at position `index`, shifting all elements at or after that position one place to the right:\n\n```python\ndata = ['a', 'b', 'd', 'e']\ndata.insert(2, 'c')   # insert 'c' at index 2\nprint(data)           # ['a', 'b', 'c', 'd', 'e']\n\n# Prepend (insert at the front):\ndata.insert(0, 'FIRST')\nprint(data)   # ['FIRST', 'a', 'b', 'c', 'd', 'e']\n\n# index >= len(lst) appends to the end:\ndata.insert(100, 'LAST')\nprint(data)   # ['FIRST', 'a', 'b', 'c', 'd', 'e', 'LAST']\n```\n\n## insert() Is Slow for Large Lists\n\nInserting at the beginning of a list shifts every other element, making it O(n). For frequent insertions at the front, use `collections.deque` instead:\n\n```python\nfrom collections import deque\ndq = deque([1, 2, 3])\ndq.appendleft(0)   # O(1) — no shifting\nprint(dq)          # deque([0, 1, 2, 3])\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "insert(0, item) Is O(n)",
          body: "Inserting at the beginning of a Python list requires shifting all existing elements one position. For a list with 1 million items, that means 1 million moves. Use deque if you need efficient prepending.",
        },
      ],
      interactions: [
        {
          id: "s8-insert-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace insert() at multiple positions",
          expectedConceptIds: ["list-mutation"],
          code: "lst = [1, 3, 5]\nlst.insert(1, 2)\nlst.insert(3, 4)\nprint(lst)",
          expectedOutput: "[1, 2, 3, 4, 5]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "insert(1,2): [1,2,3,5]. insert(3,4): [1,2,3,4,5]." }],
          feedback: { correct: "Correct! Two inserts build [1,2,3,4,5].", incorrect: "After insert(1,2): [1,2,3,5]. After insert(3,4): [1,2,3,4,5]." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-insert-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.9 — remove() ───────────────────────────────────────────── */
    {
      id: "s8-remove",
      stageId: "stage-08",
      title: ".remove()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Remove the first occurrence of a value using remove()",
        "Handle ValueError when the value is not in the list",
        "Distinguish remove() (by value) from pop() (by index)",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## remove() — Delete by Value\n\n`remove(value)` finds and removes the **first occurrence** of `value`:\n\n```python\nfruits = ['apple', 'banana', 'cherry', 'banana']\nfruits.remove('banana')   # removes first 'banana'\nprint(fruits)              # ['apple', 'cherry', 'banana']\n```\n\n## ValueError If Not Found\n\n```python\nfruits.remove('grape')   # ValueError: list.remove(x): x not in list\n\n# Safe removal:\nif 'grape' in fruits:\n    fruits.remove('grape')\n```\n\n## Removing All Occurrences\n\n```python\ndata = [1, 2, 1, 3, 1, 4]\nwhile 1 in data:\n    data.remove(1)\nprint(data)   # [2, 3, 4]\n\n# Or with list comprehension (cleaner):\ndata = [x for x in data if x != 1]\n```\n\n## remove() vs pop()\n\n| | `remove(value)` | `pop(index)` |\n|-|-----------------|--------------|\n| Targets | A value | An index |\n| Returns | `None` | The removed item |\n| Not found | `ValueError` | `IndexError` |",
        },
        {
          kind: "callout",
          variant: "info",
          title: "remove() Only Removes the First Occurrence",
          body: "If the same value appears multiple times, remove() deletes only the first one. To remove all occurrences, use a loop or a list comprehension that filters the value out.",
        },
      ],
      interactions: [
        {
          id: "s8-remove-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace remove() on first occurrence only",
          expectedConceptIds: ["list-mutation"],
          code: "nums = [1, 2, 3, 2, 4]\nnums.remove(2)\nprint(nums)",
          expectedOutput: "[1, 3, 2, 4]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "remove(2) deletes the FIRST 2 at index 1. The second 2 at index 3 remains." }],
          feedback: { correct: "Correct! First 2 is removed; second 2 stays.", incorrect: "remove() removes only the FIRST occurrence. The second 2 is at a different index and is not touched." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-remove-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.10 — pop() ─────────────────────────────────────────────── */
    {
      id: "s8-pop",
      stageId: "stage-08",
      title: ".pop()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Remove and return the last item with pop()",
        "Remove and return an item at a specific index with pop(index)",
        "Use pop() to implement stack operations",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## pop() — Remove and Return\n\n`pop()` removes and RETURNS the item. Without an argument, it removes the last item. With an index, it removes that specific item:\n\n```python\ndata = [10, 20, 30, 40, 50]\n\nlast = data.pop()     # removes and returns 50\nprint(last)           # 50\nprint(data)           # [10, 20, 30, 40]\n\nfirst = data.pop(0)   # removes and returns 10\nprint(first)          # 10\nprint(data)           # [20, 30, 40]\n```\n\n## Stack Operations (LIFO)\n\n```python\nstack = []\nstack.append('task1')   # push\nstack.append('task2')   # push\nstack.append('task3')   # push\n\ncurrent = stack.pop()   # pop → 'task3' (last in, first out)\nprint(current)          # 'task3'\nprint(stack)            # ['task1', 'task2']\n```\n\n## Empty List Raises IndexError\n\n```python\nempty = []\nempty.pop()   # IndexError: pop from empty list\n\n# Safe pop:\nif data:\n    item = data.pop()\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "pop() vs remove()",
          body: "pop() removes by position (and returns the removed item). remove() removes by value (and returns None). Use pop() when you know WHERE the item is; use remove() when you know WHAT the item is.",
        },
      ],
      interactions: [
        {
          id: "s8-pop-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace pop() returning and removing elements",
          expectedConceptIds: ["list-mutation"],
          code: "lst = ['a', 'b', 'c', 'd']\nprint(lst.pop())\nprint(lst.pop(1))\nprint(lst)",
          expectedOutput: "d\nb\n['a', 'c']",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "pop() removes last ('d'). pop(1) removes at index 1 ('b'). Remaining: ['a','c']." }],
          feedback: { correct: "Correct! pop() → 'd', pop(1) → 'b', remaining → ['a','c'].", incorrect: "pop() removes last item 'd'. After that, list is ['a','b','c']. pop(1) removes 'b'. Remaining: ['a','c']." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-pop-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.11 — clear() ───────────────────────────────────────────── */
    {
      id: "s8-clear",
      stageId: "stage-08",
      title: ".clear()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Remove all items from a list with clear()",
        "Distinguish clear() from reassigning to an empty list",
        "Know when each approach is appropriate",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## clear() — Remove All Items\n\n`clear()` empties a list in place — all items are removed, but the list object itself remains:\n\n```python\ndata = [1, 2, 3, 4, 5]\ndata.clear()\nprint(data)     # []\nprint(len(data)) # 0\n```\n\n## clear() vs Reassignment\n\n```python\noriginal = [1, 2, 3]\nalias = original         # alias and original point to SAME list\n\n# Reassignment replaces the local reference:\noriginal = []            # original now points to NEW empty list\nprint(alias)             # [1, 2, 3]  — alias still points to old list!\n\n# clear() mutates in place:\noriginal = [1, 2, 3]\nalias = original\noriginal.clear()         # empties the same list object\nprint(alias)             # []  — alias sees the change!\n```\n\n## When to Use clear()\n\nUse `clear()` when you want all existing references to see the list become empty. Use `my_list = []` when you only care about your own local reference.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "clear() Affects All References",
          body: "clear() mutates the existing list object. Any variable that references the same list will see it become empty. Reassigning (`data = []`) only changes the local variable — other references to the old list are unaffected.",
        },
      ],
      interactions: [
        {
          id: "s8-clear-mc",
          kind: "multiple-choice",
          prompt: "After `a = [1,2,3]; b = a; a.clear()`, what is `b`?",
          beginnerPurpose: "Understand clear() mutates shared list",
          expectedConceptIds: ["list-mutation"],
          options: [
            { id: "a", text: "[1, 2, 3]", isCorrect: false, explanation: "b points to the same list object as a. clear() empties that object, so b also sees []." },
            { id: "b", text: "[]", isCorrect: true, explanation: "Correct! b and a reference the same list. clear() mutates it in place — both see the empty list." },
            { id: "c", text: "None", isCorrect: false, explanation: "clear() returns None, but b still points to the same (now empty) list object." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "b = a means b and a point to the same list. clear() mutates that list." }],
          feedback: { correct: "Correct! Both a and b reference the same list; clear() empties it for both.", incorrect: "b and a are aliases — they reference the same list. clear() empties that list, so b becomes []." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-clear-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.12 — index() ───────────────────────────────────────────── */
    {
      id: "s8-list-index",
      stageId: "stage-08",
      title: ".index()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Find the index of the first occurrence of a value with index()",
        "Handle ValueError when the value is not found",
        "Use start and end parameters to search within a slice",
      ],
      prerequisites: [],
      concepts: ["list-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## index() — Find a Value's Position\n\n`index(value)` returns the index of the first occurrence of `value`:\n\n```python\ndata = ['a', 'b', 'c', 'b', 'd']\nprint(data.index('b'))    # 1  — first 'b'\n\n# Search within a range:\nprint(data.index('b', 2))    # 3  — search from index 2 onward\nprint(data.index('b', 2, 4)) # 3  — search indexes 2,3 only\n```\n\n## ValueError If Not Found\n\n```python\ndata.index('z')   # ValueError: 'z' is not in list\n\n# Safe approach:\ntry:\n    pos = data.index('z')\nexcept ValueError:\n    pos = -1\n    print(\"Not found\")\n```\n\n## index() vs in\n\n```python\n# To just check presence — use in:\nif 'b' in data:\n    print(\"Found\")\n\n# To get the position — use index():\npos = data.index('b')   # raises ValueError if not found\n\n# Safe position lookup:\npos = data.index('b') if 'b' in data else -1\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use in Before index() for Safety",
          body: "Calling index() on a value that might not exist risks ValueError. Check with `if value in lst:` first, then call `lst.index(value)` — the double lookup is fine for typical list sizes.",
        },
      ],
      interactions: [
        {
          id: "s8-list-index-mc",
          kind: "multiple-choice",
          prompt: "What does `[10, 20, 30, 20].index(20)` return?",
          beginnerPurpose: "Apply index() for first occurrence",
          expectedConceptIds: ["list-basics"],
          options: [
            { id: "a", text: "1", isCorrect: true, explanation: "Correct! The first 20 is at index 1." },
            { id: "b", text: "3", isCorrect: false, explanation: "index() returns the FIRST occurrence. The first 20 is at index 1, not 3." },
            { id: "c", text: "2 (count of 20s)", isCorrect: false, explanation: "index() returns the position, not the count. Use .count() for counting." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "index() returns the position of the FIRST occurrence." }],
          feedback: { correct: "Correct! First 20 is at index 1.", incorrect: "index() returns the first occurrence's index: 1." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-list-index-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.13 — count() ───────────────────────────────────────────── */
    {
      id: "s8-list-count",
      stageId: "stage-08",
      title: ".count()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Count occurrences of a value using count()",
        "Use count() for simple frequency analysis",
        "Understand that count() uses equality comparison",
      ],
      prerequisites: [],
      concepts: ["list-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## count() — How Many Times Does This Value Appear?\n\n`count(value)` counts how many times `value` appears in the list:\n\n```python\ndata = [1, 2, 1, 3, 1, 2, 4]\nprint(data.count(1))   # 3\nprint(data.count(2))   # 2\nprint(data.count(5))   # 0  — no error for missing values\n```\n\n## Frequency Analysis\n\n```python\nresponses = ['yes', 'no', 'yes', 'yes', 'maybe', 'no', 'yes']\n\nfor option in ['yes', 'no', 'maybe']:\n    n = responses.count(option)\n    bar = '#' * n\n    print(f\"{option:6}: {bar} ({n})\")\n# yes   : #### (4)\n# no    : ## (2)\n# maybe : # (1)\n```\n\n## count() vs Counter\n\nFor frequency analysis of all values at once, `collections.Counter` is more efficient:\n\n```python\nfrom collections import Counter\ncounts = Counter(responses)\nprint(counts)   # Counter({'yes': 4, 'no': 2, 'maybe': 1})\nprint(counts['yes'])  # 4\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "count() Returns 0 for Missing Values",
          body: "Unlike index() which raises ValueError for missing values, count() returns 0 — a safe way to check presence and frequency in one call: `if my_list.count(x) > 0:` (though `x in my_list` is cleaner for just presence).",
        },
      ],
      interactions: [
        {
          id: "s8-list-count-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Use count() for simple frequency analysis",
          expectedConceptIds: ["list-basics"],
          code: "votes = ['A', 'B', 'A', 'C', 'A', 'B']\nprint(votes.count('A'))\nprint(votes.count('D'))",
          expectedOutput: "3\n0",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "'A' appears 3 times. 'D' is not present, so count returns 0." }],
          feedback: { correct: "Correct! count('A')=3, count('D')=0 (no error for missing values).", incorrect: "'A' appears 3 times. 'D' is absent so count returns 0, not an error." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-list-count-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.14 — sort() ────────────────────────────────────────────── */
    {
      id: "s8-sort",
      stageId: "stage-08",
      title: ".sort()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Sort a list in ascending order in place with sort()",
        "Sort in descending order with sort(reverse=True)",
        "Use the key parameter for custom sort orders",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## sort() — Sort In Place\n\n`sort()` rearranges the list's elements in ascending order and returns `None`:\n\n```python\ndata = [3, 1, 4, 1, 5, 9, 2, 6]\ndata.sort()\nprint(data)   # [1, 1, 2, 3, 4, 5, 6, 9]\n\nwords = ['banana', 'apple', 'cherry', 'date']\nwords.sort()\nprint(words)  # ['apple', 'banana', 'cherry', 'date']\n```\n\n## Descending Order\n\n```python\ndata.sort(reverse=True)\nprint(data)   # [9, 6, 5, 4, 3, 2, 1, 1]\n```\n\n## Custom Sort Key\n\nThe `key` parameter accepts a function applied to each item for comparison:\n\n```python\nwords = ['banana', 'apple', 'fig', 'cherry']\nwords.sort(key=len)           # sort by string length\nprint(words)   # ['fig', 'apple', 'banana', 'cherry']\n\nwords.sort(key=str.lower)     # case-insensitive sort\n\npeople = [('Bob', 30), ('Alice', 25), ('Charlie', 35)]\npeople.sort(key=lambda p: p[1])   # sort by age\nprint(people)  # [('Alice', 25), ('Bob', 30), ('Charlie', 35)]\n```\n\n## sort() Uses Timsort\n\nPython's sort is stable (preserves relative order of equal elements) and runs in O(n log n) time.",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "sort() Returns None",
          body: "Never write `result = my_list.sort()`. sort() mutates the list in place and returns None. To get a sorted copy without modifying the original, use the built-in `sorted(my_list)` function.",
        },
      ],
      interactions: [
        {
          id: "s8-sort-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply sort with key parameter",
          expectedConceptIds: ["list-mutation"],
          code: "words = ['kiwi', 'apple', 'fig', 'mango']\nwords.sort(key=len)\nprint(words)",
          expectedOutput: "['fig', 'kiwi', 'apple', 'mango']",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Lengths: fig=3, kiwi=4, apple=5, mango=5. Sort by length ascending." }],
          feedback: { correct: "Correct! Sorted by length: 3,4,5,5. Equal lengths keep relative order (stable sort).", incorrect: "key=len sorts by string length. fig(3) < kiwi(4) < apple(5) == mango(5)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-sort-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.15 — sorted() ──────────────────────────────────────────── */
    {
      id: "s8-sorted",
      stageId: "stage-08",
      title: "sorted()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use sorted() to get a sorted copy without modifying the original",
        "Apply sorted() to any iterable, not just lists",
        "Choose between sort() and sorted() appropriately",
      ],
      prerequisites: [],
      concepts: ["list-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## sorted() — Returns a New Sorted List\n\n`sorted(iterable)` is a built-in function that returns a NEW sorted list. The original is not modified:\n\n```python\noriginal = [3, 1, 4, 1, 5, 9]\nsorted_copy = sorted(original)\nprint(sorted_copy)   # [1, 1, 3, 4, 5, 9]\nprint(original)      # [3, 1, 4, 1, 5, 9]  — unchanged!\n```\n\n## sorted() Works on Any Iterable\n\n```python\nprint(sorted('banana'))             # ['a', 'a', 'a', 'b', 'n', 'n']\nprint(sorted({3, 1, 4, 1, 5}))      # [1, 3, 4, 5]  — set → list\nprint(sorted((5, 2, 8, 1)))         # [1, 2, 5, 8]  — tuple → list\n```\n\n## Same Parameters as sort()\n\n```python\nwords = ['banana', 'apple', 'cherry']\nprint(sorted(words, reverse=True))     # descending\nprint(sorted(words, key=len))          # by length\n```\n\n## Choosing sort() vs sorted()\n\n| | `list.sort()` | `sorted()` |\n|-|---------------|------------|\n| Modifies original | Yes | No |\n| Works on | Lists only | Any iterable |\n| Returns | None | New list |\n| Memory | More efficient | Creates a copy |",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use sorted() When You Need the Original Intact",
          body: "sorted() is the safe default when you're unsure — it never changes the original. Switch to sort() only when you intentionally want to modify the list in place and don't need to keep the original order.",
        },
      ],
      interactions: [
        {
          id: "s8-sorted-mc",
          kind: "multiple-choice",
          prompt: "What is printed by: `data = [3,1,2]; result = sorted(data); print(data)`?",
          beginnerPurpose: "Confirm sorted() does not modify the original",
          expectedConceptIds: ["list-basics"],
          options: [
            { id: "a", text: "[1, 2, 3]", isCorrect: false, explanation: "sorted() returns a new list — data is not modified." },
            { id: "b", text: "[3, 1, 2]", isCorrect: true, explanation: "Correct! sorted() creates a new sorted list; the original data is unchanged." },
            { id: "c", text: "None", isCorrect: false, explanation: "sorted() returns a new list (stored in result). data remains [3,1,2]." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "sorted() does not touch the original — it returns a new list." }],
          feedback: { correct: "Correct! sorted() leaves data unchanged.", incorrect: "sorted() creates a NEW list. The original data remains [3,1,2]." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-sorted-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.16 — reverse() ─────────────────────────────────────────── */
    {
      id: "s8-reverse",
      stageId: "stage-08",
      title: ".reverse()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Reverse a list in place with reverse()",
        "Use slicing [::-1] for a reversed copy",
        "Use reversed() to iterate in reverse without modifying the list",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## reverse() — Reverse In Place\n\n`reverse()` reverses a list's order in place and returns `None`:\n\n```python\ndata = [1, 2, 3, 4, 5]\ndata.reverse()\nprint(data)   # [5, 4, 3, 2, 1]\n```\n\n## Reversed Copy Without Modifying the Original\n\n```python\noriginal = [1, 2, 3, 4, 5]\n\n# Slice — creates a new list:\nreversed_copy = original[::-1]\nprint(reversed_copy)   # [5, 4, 3, 2, 1]\nprint(original)        # [1, 2, 3, 4, 5]  — unchanged\n```\n\n## reversed() — Lazy Reverse Iterator\n\n`reversed()` returns an iterator that yields items in reverse without creating a new list:\n\n```python\nfor item in reversed([1, 2, 3, 4, 5]):\n    print(item)\n# 5, 4, 3, 2, 1\n\n# Convert to list if needed:\nprint(list(reversed([1, 2, 3])))   # [3, 2, 1]\n```\n\n## Choosing the Right Tool\n\n| Need | Use |\n|------|-----|\n| Mutate list in place | `lst.reverse()` |\n| New reversed list | `lst[::-1]` |\n| Iterate in reverse | `reversed(lst)` |",
        },
        {
          kind: "callout",
          variant: "info",
          title: "reversed() Is Memory-Efficient",
          body: "reversed() returns a lazy iterator — it doesn't create a copy. For large lists where you only need to iterate once, reversed() is more efficient than [::-1] which creates a full copy in memory.",
        },
      ],
      interactions: [
        {
          id: "s8-reverse-mc",
          kind: "multiple-choice",
          prompt: "What does `lst = [1,2,3]; lst.reverse(); print(lst)` print?",
          beginnerPurpose: "Confirm reverse() mutates in place",
          expectedConceptIds: ["list-mutation"],
          options: [
            { id: "a", text: "[3, 2, 1]", isCorrect: true, explanation: "Correct! reverse() reverses the list in place." },
            { id: "b", text: "None", isCorrect: false, explanation: "reverse() returns None, but print(lst) prints the list itself (now reversed)." },
            { id: "c", text: "[1, 2, 3]", isCorrect: false, explanation: "reverse() mutates lst. It is no longer [1,2,3] — it is [3,2,1]." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "reverse() mutates in place. Print the list, not the return value." }],
          feedback: { correct: "Correct! reverse() reverses lst in place → [3,2,1].", incorrect: "reverse() modifies lst to [3,2,1]. The return value is None but we print lst." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-reverse-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.17 — Copying lists ─────────────────────────────────────── */
    {
      id: "s8-copying-lists",
      stageId: "stage-08",
      title: "Copying Lists",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a shallow copy of a list using copy(), slicing, or list()",
        "Explain the difference between a shallow copy and a deep copy",
        "Use copy.deepcopy() when nested objects must be independent",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Three Ways to Shallow Copy\n\n```python\noriginal = [1, 2, 3, 4, 5]\n\ncopy1 = original.copy()    # .copy() method\ncopy2 = original[:]        # slice notation\ncopy3 = list(original)    # list() constructor\n\n# All three create new list objects:\nprint(copy1 is original)   # False\nprint(copy1 == original)   # True  — same contents\n```\n\n## Shallow vs Deep Copy\n\nA shallow copy creates a new list, but the elements inside are still shared:\n\n```python\nnested = [[1, 2], [3, 4]]\nshallow = nested.copy()\n\nshallow[0].append(99)   # modifies the shared inner list!\nprint(nested)   # [[1, 2, 99], [3, 4]]  — affected!\n\n# Deep copy — all nested objects are also copied:\nimport copy\ndeep = copy.deepcopy(nested)\ndeep[0].append(99)\nprint(nested)   # [[1, 2], [3, 4]]  — NOT affected\n```\n\n## When Each Is Needed\n\n- **Shallow copy**: safe when elements are immutable (numbers, strings, tuples)\n- **Deep copy**: needed when elements are mutable (lists, dicts) and must be independent",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Shallow Copy Shares Nested Objects",
          body: "A shallow copy of `[[1,2],[3,4]]` creates a new outer list but the inner lists `[1,2]` and `[3,4]` are the SAME objects. Modifying a nested list through either copy affects both. Use copy.deepcopy() when independence is required.",
        },
      ],
      interactions: [
        {
          id: "s8-copying-lists-mc",
          kind: "multiple-choice",
          prompt: "After `a = [[1,2]]; b = a.copy(); b[0].append(3)`, what is `a`?",
          beginnerPurpose: "Understand shallow copy shares nested objects",
          expectedConceptIds: ["list-mutation"],
          options: [
            { id: "a", text: "[[1, 2]]", isCorrect: false, explanation: "Shallow copy shares the inner list. Modifying b[0] also modifies a[0]." },
            { id: "b", text: "[[1, 2, 3]]", isCorrect: true, explanation: "Correct! Shallow copy: b is a new list, but b[0] and a[0] point to the SAME inner list. Appending 3 to b[0] affects a[0]." },
            { id: "c", text: "[[1, 2], [3]]", isCorrect: false, explanation: "b.copy() is a shallow copy — b[0] and a[0] are the same list, not two separate lists." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Shallow copy: new outer list, same inner list objects. Mutating inner list via b also changes a." }],
          feedback: { correct: "Correct! Shallow copy shares the inner list. Mutation through b[0] affects a[0].", incorrect: "Shallow copy: outer lists are separate, inner lists are shared. b[0] is a[0] — appending to one changes the other." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-copying-lists-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.18 — Aliasing and mutation bugs ────────────────────────── */
    {
      id: "s8-aliasing-bugs",
      stageId: "stage-08",
      title: "Aliasing and Mutation Bugs",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain that assignment creates an alias, not a copy",
        "Identify and fix aliasing bugs where changes affect unintended variables",
        "Use is to test whether two names reference the same object",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Aliasing: Two Names, One Object\n\nWhen you write `b = a`, both `a` and `b` point to the **same list**. Changes through either name affect both:\n\n```python\na = [1, 2, 3]\nb = a          # alias — same list!\n\nb.append(4)\nprint(a)   # [1, 2, 3, 4]  — a sees the change!\nprint(b)   # [1, 2, 3, 4]\nprint(a is b)  # True — same object\n```\n\n## The Aliasing Bug Pattern\n\n```python\n# BUG: modifying 'defaults' unexpectedly modifies 'config'\ndefaults = [80, 443, 22]\nconfig = defaults      # NOT a copy!\nconfig.append(8080)\nprint(defaults)   # [80, 443, 22, 8080]  — surprise!\n\n# FIX: copy before modifying\ndefaults = [80, 443, 22]\nconfig = defaults.copy()   # now independent\nconfig.append(8080)\nprint(defaults)   # [80, 443, 22]  — unchanged\n```\n\n## When Functions Receive Lists\n\n```python\ndef add_zero(lst):\n    lst.append(0)   # mutates the caller's list!\n\nmy_data = [1, 2, 3]\nadd_zero(my_data)\nprint(my_data)   # [1, 2, 3, 0]  — modified!\n\n# If you don't want to mutate:\ndef add_zero_safe(lst):\n    new = lst.copy()\n    new.append(0)\n    return new\n```",
        },
        {
          kind: "why-matters",
          body: "Aliasing bugs are notoriously subtle because they cause changes in unexpected places and only appear when two parts of the program share the same list. Understanding aliasing prevents an entire class of hard-to-debug errors.",
        },
      ],
      interactions: [
        {
          id: "s8-aliasing-bugs-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace an aliasing bug",
          expectedConceptIds: ["list-mutation"],
          code: "x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)\nprint(x is y)",
          expectedOutput: "[1, 2, 3, 4]\nTrue",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "y = x: same list. Appending to y also changes x. is returns True for same object." }],
          feedback: { correct: "Correct! y is an alias for x. Mutating y also mutates x.", incorrect: "y = x creates an alias, not a copy. y.append(4) modifies the same list x points to." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-aliasing-bugs-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.19 — Nested lists ──────────────────────────────────────── */
    {
      id: "s8-nested-lists",
      stageId: "stage-08",
      title: "Nested Lists",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Access elements in nested lists using chained indexing",
        "Modify elements in nested lists",
        "Create and iterate over a 2D grid as a list of lists",
      ],
      prerequisites: [],
      concepts: ["list-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Lists of Lists\n\nA list can contain other lists, creating a 2D (or deeper) structure:\n\n```python\nmatrix = [\n    [1, 2, 3],   # row 0\n    [4, 5, 6],   # row 1\n    [7, 8, 9],   # row 2\n]\n\nprint(matrix[0])      # [1, 2, 3]  — first row\nprint(matrix[1][2])   # 6          — row 1, column 2\nprint(matrix[-1][-1]) # 9          — last row, last column\n```\n\n## Modifying Nested Elements\n\n```python\nmatrix[1][1] = 99\nprint(matrix[1])   # [4, 99, 6]\n```\n\n## Iterating a 2D Grid\n\n```python\nfor row in matrix:\n    for value in row:\n        print(value, end=' ')\n    print()   # newline after each row\n# 1 2 3\n# 4 99 6\n# 7 8 9\n```\n\n## Creating a Grid\n\n```python\n# Create a 3×3 grid of zeros:\nrows, cols = 3, 3\ngrid = [[0] * cols for _ in range(rows)]\nprint(grid)  # [[0,0,0],[0,0,0],[0,0,0]]\n\n# WARNING: do NOT use [[0]*cols]*rows — that's aliasing!\nbad_grid = [[0] * 3] * 3  # all 3 rows are the SAME list!\nbad_grid[0][0] = 99\nprint(bad_grid)  # [[99,0,0],[99,0,0],[99,0,0]] — all rows changed!\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never Use [[val]*n]*m for 2D Grids",
          body: "[[0]*3]*3 creates three aliases of the same row list. Modifying any row modifies all rows. Always use a list comprehension: [[0]*cols for _ in range(rows)].",
        },
      ],
      interactions: [
        {
          id: "s8-nested-lists-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Access and mutate a nested list element",
          expectedConceptIds: ["list-basics"],
          code: "grid = [[1, 2], [3, 4], [5, 6]]\nprint(grid[1][0])\ngrid[2][1] = 99\nprint(grid[2])",
          expectedOutput: "3\n[5, 99]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "grid[1][0]: row 1 is [3,4], index 0 is 3. grid[2][1]=99 sets row 2 col 1." }],
          feedback: { correct: "Correct! grid[1][0]=3. After mutation, grid[2]=[5,99].", incorrect: "grid[1] is [3,4]; grid[1][0] is 3. grid[2][1]=99 changes second element of row 2." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-nested-lists-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.20 — Lists as stacks ───────────────────────────────────── */
    {
      id: "s8-lists-as-stacks",
      stageId: "stage-08",
      title: "Lists as Stacks",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Implement a stack using append() for push and pop() for pop",
        "Explain LIFO (Last In, First Out) behavior",
        "Apply stacks to practical problems: undo history, expression evaluation",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Stacks: Last In, First Out\n\nA **stack** is a collection where the most recently added item is always the next to be removed — like a stack of plates. Python lists implement stacks naturally:\n\n- **Push** (add to top): `stack.append(item)`\n- **Pop** (remove from top): `stack.pop()`\n- **Peek** (look at top): `stack[-1]`\n\n```python\nstack = []\nstack.append('a')   # push\nstack.append('b')   # push\nstack.append('c')   # push\nprint(stack)         # ['a', 'b', 'c']\n\nprint(stack.pop())   # 'c'  — last in, first out\nprint(stack.pop())   # 'b'\nprint(stack)         # ['a']\n```\n\n## Practical: Undo History\n\n```python\nhistory = []\n\ndef do_action(action):\n    history.append(action)\n    print(f\"Did: {action}\")\n\ndef undo():\n    if not history:\n        print(\"Nothing to undo\")\n        return\n    action = history.pop()\n    print(f\"Undid: {action}\")\n\ndo_action('type hello')\ndo_action('bold')\ndo_action('italic')\nundo()   # Undid: italic\nundo()   # Undid: bold\n```\n\n## Checking for Balanced Brackets\n\n```python\ndef is_balanced(text):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in text:\n        if ch in '([{':\n            stack.append(ch)\n        elif ch in ')]}':  \n            if not stack or stack[-1] != pairs[ch]:\n                return False\n            stack.pop()\n    return len(stack) == 0\n\nprint(is_balanced('([]{})')  )  # True\nprint(is_balanced('([)]'))       # False\n```",
        },
        {
          kind: "why-matters",
          body: "Stacks are used everywhere: browsers use a stack for the Back button, text editors use one for undo, compilers use one to evaluate nested expressions, and recursive call stacks are conceptually stacks too. Knowing the pattern lets you recognize and solve these problems quickly.",
        },
      ],
      interactions: [
        {
          id: "s8-lists-as-stacks-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace LIFO stack operations",
          expectedConceptIds: ["list-mutation"],
          code: "stack = []\nfor n in [1, 2, 3]:\n    stack.append(n)\nresult = []\nwhile stack:\n    result.append(stack.pop())\nprint(result)",
          expectedOutput: "[3, 2, 1]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Push 1,2,3. Pop in reverse: 3,2,1. LIFO reverses the order." }],
          feedback: { correct: "Correct! Stack reverses order: push 1,2,3 → pop 3,2,1.", incorrect: "Push 1, then 2, then 3. Stack top is 3. Pop gives 3,2,1 (LIFO)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-lists-as-stacks-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.21 — Lists as queues ───────────────────────────────────── */
    {
      id: "s8-lists-as-queues",
      stageId: "stage-08",
      title: "Lists as Queues",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain FIFO (First In, First Out) queue behavior",
        "Simulate a queue using append() and pop(0)",
        "Recognize why list-based queues are inefficient and why deque exists",
      ],
      prerequisites: [],
      concepts: ["list-basics"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Queues: First In, First Out\n\nA **queue** processes items in the order they arrived — like a line at a counter. The first person to join the line is the first to be served:\n\n- **Enqueue** (add to back): `queue.append(item)`\n- **Dequeue** (remove from front): `queue.pop(0)`\n\n```python\nqueue = []\nqueue.append('customer1')   # enqueue\nqueue.append('customer2')\nqueue.append('customer3')\nprint(queue)   # ['customer1', 'customer2', 'customer3']\n\nserved = queue.pop(0)   # dequeue first item\nprint(served)   # 'customer1'  — first in, first out\nprint(queue)    # ['customer2', 'customer3']\n```\n\n## The Performance Problem with pop(0)\n\n`pop(0)` removes the first element and shifts all other elements left — O(n) for every dequeue. For small queues this is fine; for large queues, use `deque`:\n\n```python\nfrom collections import deque\nqueue = deque()\nqueue.append('a')      # enqueue: O(1)\nqueue.appendleft('b')  # insert at front: O(1)\nfirst = queue.popleft()  # dequeue: O(1)!\nprint(first)  # 'b'\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Don't Use list.pop(0) for Large Queues",
          body: "pop(0) is O(n) — it shifts every element left. For production queues with thousands of items, use collections.deque which does popleft() in O(1).",
        },
      ],
      interactions: [
        {
          id: "s8-lists-as-queues-mc",
          kind: "multiple-choice",
          prompt: "Why is `list.pop(0)` inefficient for queue operations?",
          beginnerPurpose: "Understand why deque is preferred for FIFO queues",
          expectedConceptIds: ["list-basics"],
          options: [
            { id: "a", text: "It raises IndexError when the list is empty", isCorrect: false, explanation: "IndexError on empty is a correctness concern, not a performance one. The efficiency issue is the element shifting." },
            { id: "b", text: "It shifts all remaining elements left — O(n) operation", isCorrect: true, explanation: "Correct! Removing from the front of a list requires moving every other element one slot left — proportional to the list size." },
            { id: "c", text: "It creates a copy of the list", isCorrect: false, explanation: "pop() does not create a copy. The inefficiency is the O(n) element shifting in the underlying array." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What has to happen to [1,2,3,4] when you remove the first element?" }],
          feedback: { correct: "Correct! Every element after index 0 must shift left — O(n) work.", incorrect: "Removing from position 0 requires shifting all n-1 remaining elements — O(n)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-lists-as-queues-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.22 — collections.deque ────────────────────────────────── */
    {
      id: "s8-deque",
      stageId: "stage-08",
      title: "collections.deque for Queues",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use collections.deque for efficient FIFO queue and double-ended queue operations",
        "Apply appendleft() and popleft() for O(1) front operations",
        "Use maxlen to create a bounded sliding window",
      ],
      prerequisites: [],
      concepts: ["list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## deque: Double-Ended Queue\n\n`collections.deque` is a doubly-linked list that supports O(1) append and pop from both ends:\n\n```python\nfrom collections import deque\n\ndq = deque([1, 2, 3])\ndq.append(4)      # add to right: O(1)\ndq.appendleft(0)  # add to left: O(1)\nprint(dq)         # deque([0, 1, 2, 3, 4])\n\nprint(dq.popleft())  # 0 — remove from left: O(1)\nprint(dq.pop())      # 4 — remove from right: O(1)\nprint(dq)            # deque([1, 2, 3])\n```\n\n## deque as FIFO Queue\n\n```python\nqueue = deque()\nqueue.append('task1')    # enqueue at right\nqueue.append('task2')\nqueue.append('task3')\n\nwhile queue:\n    task = queue.popleft()   # dequeue from left: O(1)\n    print(f\"Processing: {task}\")\n```\n\n## maxlen: Sliding Window / Recent History\n\n```python\n# Keep only last 5 log entries:\nrecent = deque(maxlen=5)\nfor i in range(10):\n    recent.append(f\"event_{i}\")\n\nprint(list(recent))   # ['event_5', 'event_6', 'event_7', 'event_8', 'event_9']\n# When maxlen is reached, oldest items are automatically discarded\n```",
        },
        {
          kind: "why-matters",
          body: "deque is the right tool whenever you need efficient operations at both ends of a sequence. Web server request queues, BFS graph traversal, and sliding window algorithms all benefit from deque's O(1) double-ended operations.",
        },
      ],
      interactions: [
        {
          id: "s8-deque-mc",
          kind: "multiple-choice",
          prompt: "What happens when you append to a `deque(maxlen=3)` that already has 3 items?",
          beginnerPurpose: "Understand deque maxlen behavior",
          expectedConceptIds: ["list-mutation"],
          options: [
            { id: "a", text: "The new item is silently ignored", isCorrect: false, explanation: "The new item IS added — but the oldest item is automatically removed to maintain the maxlen." },
            { id: "b", text: "The oldest item is automatically removed", isCorrect: true, explanation: "Correct! When maxlen is reached, appending to the right discards from the left (oldest). appendleft discards from the right." },
            { id: "c", text: "A ValueError is raised", isCorrect: false, explanation: "deque with maxlen does not raise errors — it silently drops the oldest item." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "maxlen enforces a fixed capacity by removing from the opposite end." }],
          feedback: { correct: "Correct! The oldest item is automatically dropped to make room for the new one.", incorrect: "deque with maxlen automatically evicts the oldest item when capacity is exceeded." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-deque-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.23 — List iteration ────────────────────────────────────── */
    {
      id: "s8-list-iteration",
      stageId: "stage-08",
      title: "List Iteration",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Iterate over list items with a for loop",
        "Avoid modifying a list while iterating over it",
        "Use index-based and value-based iteration appropriately",
      ],
      prerequisites: [],
      concepts: ["list-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Iterating Over a List\n\nA `for` loop processes each element in order:\n\n```python\nfruits = ['apple', 'banana', 'cherry']\nfor fruit in fruits:\n    print(fruit.upper())\n# APPLE\n# BANANA\n# CHERRY\n```\n\n## When You Need the Index: enumerate()\n\n```python\nfor i, fruit in enumerate(fruits):\n    print(f\"{i}: {fruit}\")\n# 0: apple\n# 1: banana\n# 2: cherry\n\n# Start counting from 1:\nfor i, fruit in enumerate(fruits, 1):\n    print(f\"{i}. {fruit}\")\n# 1. apple ...\n```\n\n## Never Modify a List While Iterating It\n\nModifying a list during iteration causes skipped items or errors:\n\n```python\n# BUG — skips items:\ndata = [1, 2, 3, 4, 5]\nfor n in data:\n    if n % 2 == 0:\n        data.remove(n)   # modifies the list being iterated!\nprint(data)   # [1, 3, 5]? Not always — depends on positions!\n\n# CORRECT — iterate a copy or build a new list:\ndata = [n for n in data if n % 2 != 0]\n# OR:\nfor n in data[:]:   # iterate over a copy\n    if n % 2 == 0:\n        data.remove(n)\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never Remove From a List While Iterating It",
          body: "Removing elements during iteration shifts the underlying indexes, causing the loop to skip items silently. Always iterate a copy (`data[:]`) or build a new list with a comprehension.",
        },
      ],
      interactions: [
        {
          id: "s8-list-iteration-mc",
          kind: "multiple-choice",
          prompt: "What is the safest way to remove even numbers from a list while processing it?",
          beginnerPurpose: "Know the correct approach for filtered iteration",
          expectedConceptIds: ["list-iteration"],
          options: [
            { id: "a", text: "Use remove() inside a for loop over the list", isCorrect: false, explanation: "Modifying a list during iteration causes skipped items. This is a common bug." },
            { id: "b", text: "Build a new list with a list comprehension: [x for x in data if x % 2 != 0]", isCorrect: true, explanation: "Correct! A comprehension builds a new filtered list without touching the original during iteration." },
            { id: "c", text: "Use del data[i] inside a for loop using range(len(data))", isCorrect: false, explanation: "Deleting by index while iterating shifts indexes and causes the same skipping bug." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The safe approach: don't modify while iterating. Build a new list instead." }],
          feedback: { correct: "Correct! List comprehensions create filtered lists without iteration bugs.", incorrect: "Modifying during iteration is unsafe. Use a comprehension or iterate over a copy." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-list-iteration-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.24 — enumerate() ───────────────────────────────────────── */
    {
      id: "s8-enumerate",
      stageId: "stage-08",
      title: "enumerate()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use enumerate() to get both index and value in a for loop",
        "Control the starting index with the start parameter",
        "Replace manual counter variables with enumerate()",
      ],
      prerequisites: [],
      concepts: ["list-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## enumerate(): Index and Value Together\n\n`enumerate(iterable)` yields (index, value) pairs:\n\n```python\nfruits = ['apple', 'banana', 'cherry']\n\n# Without enumerate (manual counter):\ni = 0\nfor fruit in fruits:\n    print(i, fruit)\n    i += 1\n\n# With enumerate (cleaner):\nfor i, fruit in enumerate(fruits):\n    print(i, fruit)\n# 0 apple\n# 1 banana\n# 2 cherry\n```\n\n## Custom Start Index\n\n```python\nfor i, item in enumerate(fruits, 1):   # start=1\n    print(f\"{i}. {item}\")\n# 1. apple\n# 2. banana\n# 3. cherry\n```\n\n## Practical Uses\n\n```python\n# Find all positions of a value:\ndata = [10, 20, 10, 30, 10]\npositions = [i for i, v in enumerate(data) if v == 10]\nprint(positions)   # [0, 2, 4]\n\n# Numbered output in reports:\nresults = ['Alice: 95', 'Bob: 87', 'Charlie: 91']\nfor rank, result in enumerate(results, 1):\n    print(f\"#{rank}: {result}\")\n```",
        },
        {
          kind: "why-matters",
          body: "enumerate() is the idiomatic Python alternative to maintaining a manual counter variable. It's more readable, less error-prone, and signals to readers that you need both the index and the value — not just one of them.",
        },
      ],
      interactions: [
        {
          id: "s8-enumerate-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply enumerate with a custom start",
          expectedConceptIds: ["list-iteration"],
          code: "items = ['x', 'y', 'z']\nfor num, item in enumerate(items, 10):\n    print(num, item)",
          expectedOutput: "10 x\n11 y\n12 z",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "enumerate(items, 10) starts counting at 10." }],
          feedback: { correct: "Correct! enumerate with start=10 gives 10,11,12.", incorrect: "enumerate(items, 10) starts counting from 10, giving pairs (10,'x'), (11,'y'), (12,'z')." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-enumerate-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.25 — zip() ─────────────────────────────────────────────── */
    {
      id: "s8-zip",
      stageId: "stage-08",
      title: "zip()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use zip() to pair elements from two or more iterables",
        "Explain that zip() stops at the shortest iterable",
        "Use zip() with dict() to create dictionaries from key/value lists",
      ],
      prerequisites: [],
      concepts: ["list-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## zip(): Pair Elements from Multiple Sequences\n\n`zip(a, b)` yields pairs: `(a[0], b[0])`, `(a[1], b[1])`, etc.:\n\n```python\nnames = ['Alice', 'Bob', 'Charlie']\nscores = [95, 87, 91]\n\nfor name, score in zip(names, scores):\n    print(f\"{name}: {score}\")\n# Alice: 95\n# Bob: 87\n# Charlie: 91\n```\n\n## zip() Stops at the Shortest\n\n```python\na = [1, 2, 3, 4, 5]\nb = ['a', 'b', 'c']\nprint(list(zip(a, b)))   # [(1,'a'), (2,'b'), (3,'c')] — stops at 3\n```\n\nFor equal-length enforcement, use `zip(strict=True)` (Python 3.10+).\n\n## zip() with Three or More Iterables\n\n```python\nfirst = [1, 2, 3]\nsecond = [4, 5, 6]\nthird = [7, 8, 9]\nfor a, b, c in zip(first, second, third):\n    print(a + b + c)   # 12, 15, 18\n```\n\n## Creating Dicts from Two Lists\n\n```python\nkeys = ['name', 'age', 'city']\nvalues = ['Alice', 30, 'Paris']\nprofile = dict(zip(keys, values))\nprint(profile)   # {'name': 'Alice', 'age': 30, 'city': 'Paris'}\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "zip(strict=True) Raises ValueError for Length Mismatches",
          body: "In Python 3.10+, `zip(a, b, strict=True)` raises ValueError if a and b have different lengths. Use this when you expect the sequences to be the same length and want to detect mismatches.",
        },
      ],
      interactions: [
        {
          id: "s8-zip-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply zip to pair and process two lists",
          expectedConceptIds: ["list-iteration"],
          code: "prices = [10, 20, 30]\nquantities = [2, 5, 1]\ntotal = sum(p * q for p, q in zip(prices, quantities))\nprint(total)",
          expectedOutput: "150",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "zip pairs: (10,2), (20,5), (30,1). Products: 20+100+30=150." }],
          feedback: { correct: "Correct! 10*2 + 20*5 + 30*1 = 20+100+30 = 150.", incorrect: "zip gives (10,2),(20,5),(30,1). Multiply and sum: 20+100+30=150." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-zip-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.26 — Manual filtering ─────────────────────────────────── */
    {
      id: "s8-manual-filtering",
      stageId: "stage-08",
      title: "Manual Filtering",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Filter a list using a for loop and conditional append",
        "Understand filtering as selecting items that satisfy a predicate",
        "Compare manual filtering to list comprehensions (preview)",
      ],
      prerequisites: [],
      concepts: ["list-iteration", "list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Filtering: Keeping Items That Pass a Test\n\nFiltering means creating a new list that contains only the items from the original that satisfy some condition:\n\n```python\n# Filter: keep only positive numbers\nnumbers = [3, -1, 4, -1, 5, -9, 2, 6]\n\npositives = []\nfor n in numbers:\n    if n > 0:\n        positives.append(n)\nprint(positives)   # [3, 4, 5, 2, 6]\n```\n\n## Multiple Conditions\n\n```python\nstudents = [\n    {'name': 'Alice', 'grade': 92, 'age': 20},\n    {'name': 'Bob', 'grade': 75, 'age': 22},\n    {'name': 'Charlie', 'grade': 88, 'age': 19},\n]\n\n# Keep students with grade >= 80 and age < 21:\nhonors = []\nfor s in students:\n    if s['grade'] >= 80 and s['age'] < 21:\n        honors.append(s)\nfor s in honors:\n    print(s['name'])  # Alice, Charlie\n```\n\n## Preview: List Comprehension (Upcoming)\n\nThe same filter can be written more concisely as a comprehension:\n\n```python\npositives = [n for n in numbers if n > 0]\nhonors = [s for s in students if s['grade'] >= 80 and s['age'] < 21]\n```\n\nBoth approaches produce the same result; list comprehensions are more Pythonic for simple cases.",
        },
        {
          kind: "why-matters",
          body: "Filtering is one of the three fundamental data transformations (along with mapping and reducing). Every data pipeline — from simple scripts to data engineering — uses filtering to narrow down datasets to relevant rows or items.",
        },
      ],
      interactions: [
        {
          id: "s8-manual-filtering-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace manual filtering with a condition",
          expectedConceptIds: ["list-iteration"],
          code: "data = [5, 12, 3, 8, 20, 1]\nresult = []\nfor n in data:\n    if n > 6:\n        result.append(n)\nprint(result)",
          expectedOutput: "[12, 8, 20]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Keep only items > 6: 5 no, 12 yes, 3 no, 8 yes, 20 yes, 1 no." }],
          feedback: { correct: "Correct! Values > 6: 12, 8, 20.", incorrect: "Filter: 5≤6 skip, 12>6 keep, 3≤6 skip, 8>6 keep, 20>6 keep, 1≤6 skip → [12,8,20]." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-manual-filtering-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.27 — Manual transformation ─────────────────────────────── */
    {
      id: "s8-manual-transformation",
      stageId: "stage-08",
      title: "Manual Transformation",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Transform a list by applying a function to each element",
        "Build a transformed list using a for loop and append",
        "Understand transformation as the 'map' operation",
      ],
      prerequisites: [],
      concepts: ["list-iteration", "list-mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Transformation: Applying a Function to Every Item\n\nTransformation means converting each item in a list to a new value:\n\n```python\n# Double each number:\nnumbers = [1, 2, 3, 4, 5]\ndoubled = []\nfor n in numbers:\n    doubled.append(n * 2)\nprint(doubled)   # [2, 4, 6, 8, 10]\n\n# Convert temperatures F → C:\nfahrenheit = [32, 68, 100, 212]\ncelsius = []\nfor f in fahrenheit:\n    celsius.append((f - 32) * 5 / 9)\nprint(celsius)   # [0.0, 20.0, 37.78..., 100.0]\n```\n\n## Transforming Records\n\n```python\nnames = ['alice', 'bob', 'charlie']\nformatted = []\nfor name in names:\n    formatted.append(name.title())   # capitalize first letter\nprint(formatted)   # ['Alice', 'Bob', 'Charlie']\n```\n\n## Combining Filter and Transform\n\n```python\nscores = [45, 78, 92, 55, 88, 71]\n# Keep scores >= 60 and scale to 0-10:\nscaled_passes = []\nfor s in scores:\n    if s >= 60:\n        scaled_passes.append(round(s / 10, 1))\nprint(scaled_passes)   # [7.8, 9.2, 8.8, 7.1]\n```\n\n## Built-in map()\n\n```python\ndoubled = list(map(lambda n: n * 2, numbers))\n# Equivalent but functional style\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "List Comprehensions Are Better for Transformations",
          body: "For simple transformations, list comprehensions are preferred: `[n*2 for n in numbers]` is more readable than the append loop. Use append loops when the logic is complex enough to need multiple lines.",
        },
      ],
      interactions: [
        {
          id: "s8-manual-transformation-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a transformation loop",
          expectedConceptIds: ["list-iteration"],
          code: "words = ['hello', 'world', 'python']\nresult = []\nfor w in words:\n    result.append(w[0].upper() + w[1:])\nprint(result)",
          expectedOutput: "['Hello', 'World', 'Python']",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "w[0].upper() gives uppercase first letter. + w[1:] adds the rest unchanged." }],
          feedback: { correct: "Correct! Each word gets its first letter uppercased.", incorrect: "w[0].upper() uppercases the first char. w[1:] is the rest. Joined: 'Hello', 'World', 'Python'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-manual-transformation-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 8.28 — List processing project ───────────────────────────── */
    {
      id: "s8-list-processing-project",
      stageId: "stage-08",
      title: "List Processing Project",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Combine multiple list operations into a complete data processing pipeline",
        "Apply sorting, filtering, transformation, and aggregation in sequence",
        "Produce formatted output from processed list data",
      ],
      prerequisites: [],
      concepts: ["list-basics", "list-mutation", "list-iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Building a Complete Data Pipeline\n\nThis project combines all list operations into a real-world data processing task:\n\n```python\n# Dataset: student records\nstudents = [\n    {'name': 'Alice', 'scores': [85, 92, 78, 96]},\n    {'name': 'Bob', 'scores': [70, 65, 80, 75]},\n    {'name': 'Charlie', 'scores': [92, 88, 95, 90]},\n    {'name': 'Diana', 'scores': [60, 55, 70, 65]},\n    {'name': 'Eve', 'scores': [78, 82, 79, 85]},\n]\n\n# Step 1: Calculate average for each student\nfor student in students:\n    avg = sum(student['scores']) / len(student['scores'])\n    student['average'] = round(avg, 1)\n\n# Step 2: Sort by average descending\nstudents.sort(key=lambda s: s['average'], reverse=True)\n\n# Step 3: Assign grades\ndef grade(avg):\n    if avg >= 90: return 'A'\n    if avg >= 80: return 'B'\n    if avg >= 70: return 'C'\n    return 'D'\n\nfor student in students:\n    student['grade'] = grade(student['average'])\n\n# Step 4: Filter top performers\ntop = [s for s in students if s['grade'] in ('A', 'B')]\n\n# Step 5: Print report\nprint(f\"{'Name':<10} {'Average':>8} {'Grade':>6}\")\nprint('-' * 28)\nfor s in students:\n    print(f\"{s['name']:<10} {s['average']:>8.1f} {s['grade']:>6}\")\nprint()\nprint(f\"Top performers ({len(top)}): {', '.join(s['name'] for s in top)}\")\n```\n\nOutput:\n```\nName       Average  Grade\n----------------------------\nCharlie      91.2      A\nAlice        87.8      B\nEve          81.0      B\nBob          72.5      C\nDiana        62.5      D\n\nTop performers (3): Charlie, Alice, Eve\n```",
        },
        {
          kind: "why-matters",
          body: "This pipeline — load, transform, sort, filter, report — is the blueprint for almost all data processing in Python, from simple scripts to pandas DataFrames. Mastering it with plain lists prepares you to understand and use every higher-level library built on the same pattern.",
        },
      ],
      interactions: [
        {
          id: "s8-list-processing-project-mc",
          kind: "multiple-choice",
          prompt: "In the pipeline above, why is `students.sort(key=lambda s: s['average'], reverse=True)` used instead of `sorted()`?",
          beginnerPurpose: "Choose between sort() and sorted() in context",
          expectedConceptIds: ["list-mutation"],
          options: [
            { id: "a", text: "Because sorted() doesn't accept a key parameter", isCorrect: false, explanation: "sorted() accepts all the same parameters as sort() including key and reverse." },
            { id: "b", text: "To sort students in place since we continue using the same list below", isCorrect: true, explanation: "Correct! We need the students list itself to be sorted for the subsequent filtering and printing steps. sort() mutates in place — no need to create a copy." },
            { id: "c", text: "Because sort() is faster on dicts", isCorrect: false, explanation: "There is no meaningful performance difference between sort() and sorted() here. The choice is about whether you need the original intact." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The next steps use the same 'students' variable. Should it be sorted or should you keep the original?" }],
          feedback: { correct: "Correct! sort() in place means subsequent code sees the sorted order.", incorrect: "Since subsequent steps use the same students list, sorting in place with sort() is the right choice." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s8-list-processing-project-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s8-project",
    stageId: "stage-08",
    title: "List-Powered Data Application",
    brief:
      "Build a complete data management application using lists: read a dataset into a list of dicts, perform CRUD operations (create, read, update, delete items), sort and filter on demand, detect and fix aliasing bugs in your design, and produce a formatted report.",
    requirements: [
      "Store records as a list of dicts",
      "Implement add (append), view (enumerate iteration), update (index mutation), delete (remove or pop)",
      "Sort records using sort() with a key function",
      "Filter records using a list comprehension",
      "Demonstrate understanding of aliasing: show that a copy is needed when passing the list to a function that should not mutate the original",
    ],
    acceptanceCriteria: [
      "All list methods (append, remove/pop, sort) used correctly",
      "No aliasing bugs — copies made where needed",
      "enumerate() used for indexed display",
      "Formatted output using f-strings with alignment specifiers",
    ],
    conceptIds: ["list-basics", "list-mutation", "list-iteration"],
    difficulty: "beginner",
  },
} satisfies Stage;
