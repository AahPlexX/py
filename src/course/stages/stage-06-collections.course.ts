import type { Stage } from "@/course/course.schema";

export const stage06 = {
  id: "stage-06",
  number: 6,
  title: "Collections",
  summary:
    "Use lists, tuples, dictionaries, sets, comprehensions, slicing, and nested data structures.",
  level: "intermediate",
  masteryGateConceptIds: [
    "list",
    "tuple",
    "dict",
    "set",
    "comprehension",
    "slicing",
    "iteration",
    "mutation",
  ],
  lessons: [
    /* ── Lesson 1 ── */
    {
      id: "s6-lists",
      stageId: "stage-06",
      title: "Lists: Ordered, Mutable Sequences",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a list literal with square brackets",
        "Access elements using zero-based positive and negative indices",
        "Use len() to get the number of elements",
        "Append items with .append() and understand that lists are mutable",
      ],
      prerequisites: ["s5-default-parameters"],
      concepts: ["list", "mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Lists\n\nA **list** is an ordered collection of items enclosed in square brackets `[]`. Items can be any type and can be mixed.\n\n```python\nfruits = [\"apple\", \"banana\", \"cherry\"]\nnumbers = [1, 2, 3, 4, 5]\nmixed = [1, \"hello\", True, 3.14]\n```\n\nLists are **indexed starting at 0**. The first element is `fruits[0]`, the last is `fruits[-1]`.",
        },
        {
          kind: "code",
          language: "python",
          code: `fruits = ["apple", "banana", "cherry"]

print(fruits[0])    # first element
print(fruits[-1])   # last element
print(len(fruits))  # number of elements`,
          caption: "Zero-based indexing and negative indexing.",
          highlight: [3, 4, 5],
        },
        {
          kind: "output",
          text: "apple\ncherry\n3",
          isError: false,
        },
        {
          kind: "text",
          markdown:
            "## Mutation\n\nLists are **mutable** — you can change them after creation. The most common way to add an item is `.append()`.",
        },
        {
          kind: "code",
          language: "python",
          code: `colors = ["red", "green"]
colors.append("blue")
print(colors)

colors[0] = "purple"   # replace an element
print(colors)`,
          caption: "append() adds to the end; index assignment replaces an element.",
          highlight: [2, 5],
        },
        {
          kind: "output",
          text: "['red', 'green', 'blue']\n['purple', 'green', 'blue']",
          isError: false,
        },
        {
          kind: "callout",
          variant: "danger",
          title: "IndexError on out-of-range access",
          body: "Accessing an index that doesn't exist raises an IndexError. For a list with 3 items, valid indices are 0, 1, 2 (or -3, -2, -1). Accessing index 3 or -4 raises an error.",
        },
        {
          kind: "mental-model",
          title: "A List Is Like a Numbered Shelf",
          analogy:
            "Imagine a shelf with numbered slots starting at 0. You can read what's in slot 0, replace it with something else, or add a new item to the end. The shelf keeps its order.",
          explanation:
            "Lists maintain insertion order. Unlike variables that hold one value, a list is a single variable that holds many values in sequence.",
        },
        {
          kind: "glossary-term",
          term: "list",
          definition:
            "An ordered, mutable sequence of items written as a comma-separated list inside square brackets.",
          example: `scores = [95, 87, 72]`,
        },
      ],
      interactions: [
        {
          id: "s6-li-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Practise zero-based indexing and negative indexing on a list.",
          expectedConceptIds: ["list"],
          code: `items = [10, 20, 30, 40, 50]
print(items[1])
print(items[-2])
print(len(items))`,
          expectedOutput: "20\n40\n5",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Index 1 is the second item. Index -2 is the second-to-last item.",
            },
          ],
          feedback: {
            correct:
              "Correct! items[1]=20, items[-2]=40 (one from the end), len=5.",
            incorrect:
              "Remember: indices start at 0. Index -2 counts 2 from the right: [10,20,30,40,50] → -2 is 40.",
          },
        },
        {
          id: "s6-li-fill-1",
          kind: "fill-code",
          prompt: "Complete the code to append 'grape' to the fruits list.",
          beginnerPurpose: "Practice using .append() to mutate a list.",
          expectedConceptIds: ["list", "mutation"],
          codeTemplate: `fruits = ["apple", "banana"]
fruits.___append___("grape")
print(fruits)`,
          blanks: [
            {
              placeholder: "___append___",
              answer: "append",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The list method that adds an item to the end is called 'append'.",
            },
          ],
          feedback: {
            correct:
              "Correct! .append() mutates the list in place by adding the item at the end.",
            incorrect:
              "The method to add to the end of a list is .append(item).",
          },
        },
        {
          id: "s6-li-debug-1",
          kind: "debug-code",
          prompt:
            "This code crashes with an IndexError. Fix it so it prints the last item safely.",
          beginnerPurpose:
            "Understand how IndexError occurs and use -1 indexing to avoid it.",
          expectedConceptIds: ["list"],
          brokenCode: `letters = ["a", "b", "c"]
print(letters[3])`,
          bugDescription:
            "letters has 3 items (indices 0, 1, 2). Index 3 is out of range. Use letters[-1] or letters[len(letters)-1] to get the last item.",
          fixedCode: `letters = ["a", "b", "c"]
print(letters[-1])`,
          errorType: "IndexError",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "A list of 3 items has valid indices 0, 1, 2. Index 3 does not exist.",
            },
            {
              level: "syntax",
              text: "Use index -1 to always get the last element, regardless of list length.",
            },
          ],
          feedback: {
            correct:
              "Correct! Index -1 always refers to the last element, making the code safe.",
            incorrect:
              "Change letters[3] to letters[-1]. The last valid index for a 3-item list is 2.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "list",
          recallPrompt:
            "How do you access the last element of a list without knowing its length? What does 'mutable' mean for a list?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s6-li-predict-1",
          "s6-li-fill-1",
          "s6-li-debug-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["list"],
      },
    },

    /* ── Lesson 2 ── */
    {
      id: "s6-list-slicing-methods",
      stageId: "stage-06",
      title: "Slicing Lists and List Methods",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Slice a list with [start:stop:step] notation",
        "Use insert(), remove(), pop(), sort(), reverse(), and copy()",
        "Distinguish methods that mutate the list from those that return a new value",
      ],
      prerequisites: ["s6-lists"],
      concepts: ["slicing", "mutation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Slicing\n\nA **slice** extracts a sub-list: `list[start:stop:step]`. The `stop` index is **exclusive**.\n\n| Slice | Meaning |\n|-------|---------|\n| `a[1:4]` | items at indices 1, 2, 3 |\n| `a[:3]` | first 3 items |\n| `a[2:]` | from index 2 to the end |\n| `a[::2]` | every second item |\n| `a[::-1]` | reversed copy |",
        },
        {
          kind: "code",
          language: "python",
          code: `nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(nums[2:5])    # [2, 3, 4]
print(nums[:4])     # [0, 1, 2, 3]
print(nums[7:])     # [7, 8, 9]
print(nums[::3])    # [0, 3, 6, 9]
print(nums[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]`,
          caption:
            "Slicing always returns a new list — the original is unchanged.",
          highlight: [3, 4, 5, 6, 7],
        },
        {
          kind: "output",
          text: "[2, 3, 4]\n[0, 1, 2, 3]\n[7, 8, 9]\n[0, 3, 6, 9]\n[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]",
          isError: false,
        },
        {
          kind: "text",
          markdown:
            "## Useful list methods\n\n| Method | Mutates? | Description |\n|--------|----------|-------------|\n| `.append(x)` | yes | add x at end |\n| `.insert(i, x)` | yes | insert x at index i |\n| `.remove(x)` | yes | remove first x |\n| `.pop(i)` | yes | remove & return item at i (default last) |\n| `.sort()` | yes | sort in place |\n| `.reverse()` | yes | reverse in place |\n| `.copy()` | no | return a shallow copy |",
        },
        {
          kind: "code",
          language: "python",
          code: `data = [3, 1, 4, 1, 5, 9]
data.sort()
print(data)          # [1, 1, 3, 4, 5, 9]

removed = data.pop()
print(removed)       # 9
print(data)          # [1, 1, 3, 4, 5]`,
          caption:
            "sort() mutates the list. pop() removes and returns the last item.",
          highlight: [2, 5],
        },
        {
          kind: "output",
          text: "[1, 1, 3, 4, 5, 9]\n9\n[1, 1, 3, 4, 5]",
          isError: false,
        },
        {
          kind: "callout",
          variant: "warning",
          title: "sort() vs sorted()",
          body: "list.sort() mutates the list and returns None. sorted(list) returns a new sorted list and leaves the original unchanged. Using the return value of .sort() is a common mistake.",
        },
      ],
      interactions: [
        {
          id: "s6-ls-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Trace slicing notation to get exact sub-lists.",
          expectedConceptIds: ["slicing"],
          code: `letters = ["a", "b", "c", "d", "e"]
print(letters[1:4])
print(letters[::2])
print(letters[-3:])`,
          expectedOutput: "['b', 'c', 'd']\n['a', 'c', 'e']\n['c', 'd', 'e']",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "letters[1:4] means indices 1, 2, 3 (stop is exclusive). letters[::2] takes every other element starting at 0. letters[-3:] starts 3 from the end.",
            },
          ],
          feedback: {
            correct:
              "Correct! [1:4] → b,c,d; [::2] → a,c,e; [-3:] → c,d,e.",
            incorrect:
              "Slice stop is exclusive. [1:4] → indices 1,2,3. [-3:] starts at the third-from-last element.",
          },
        },
        {
          id: "s6-ls-fill-1",
          kind: "fill-code",
          prompt:
            "Use the correct method to insert 'mango' at index 1 in the fruits list.",
          beginnerPurpose: "Practice using .insert() with index and value.",
          expectedConceptIds: ["list", "mutation"],
          codeTemplate: `fruits = ["apple", "banana", "cherry"]
fruits.___insert___(1, "mango")
print(fruits)`,
          blanks: [
            {
              placeholder: "___insert___",
              answer: "insert",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The list method that adds an item at a specific position is 'insert(index, item)'.",
            },
          ],
          feedback: {
            correct:
              "Correct! .insert(1, 'mango') places 'mango' at index 1, pushing the rest right.",
            incorrect:
              "The method is .insert(index, value). Use .insert(1, 'mango').",
          },
        },
        {
          id: "s6-ls-mc-1",
          kind: "multiple-choice",
          prompt:
            "Which of the following is true about `list.sort()`?",
          beginnerPurpose:
            "Understand the mutation vs return-value distinction for sort().",
          expectedConceptIds: ["mutation"],
          options: [
            {
              id: "s6-ls-mc-1-a",
              text: "It returns a new sorted list and leaves the original unchanged.",
              isCorrect: false,
              explanation:
                "That describes sorted(), not list.sort(). sort() modifies the list in place.",
            },
            {
              id: "s6-ls-mc-1-b",
              text: "It sorts the list in place and returns None.",
              isCorrect: true,
              explanation:
                "list.sort() mutates the list directly and returns None. Assigning the result to a variable gives None.",
            },
            {
              id: "s6-ls-mc-1-c",
              text: "It returns the sorted list and also modifies the original.",
              isCorrect: false,
              explanation:
                "sort() returns None, not the list. If you need the sorted list as a value, use sorted().",
            },
            {
              id: "s6-ls-mc-1-d",
              text: "It raises an error if the list has duplicate values.",
              isCorrect: false,
              explanation:
                "sort() handles duplicates without error — duplicates simply appear adjacent in the sorted result.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Methods that 'mutate in place' change the list directly and typically return None.",
            },
          ],
          feedback: {
            correct:
              "Correct! sort() mutates in place and returns None. Use sorted() when you need a new list.",
            incorrect:
              "list.sort() modifies the list directly (mutation) and its return value is None.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "slicing",
          recallPrompt:
            "What does list[2:5] return, and is the stop index included?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "mutation",
          recallPrompt:
            "Name two list methods that mutate the list and two that do not.",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s6-ls-predict-1",
          "s6-ls-fill-1",
          "s6-ls-mc-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["slicing", "mutation"],
      },
    },

    /* ── Lesson 3 ── */
    {
      id: "s6-tuples-sets",
      stageId: "stage-06",
      title: "Tuples and Sets",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a tuple and explain why it is immutable",
        "Choose between tuple and list based on whether the data should change",
        "Create a set and understand that sets contain only unique elements",
        "Use the in operator and perform basic set operations (union, intersection)",
      ],
      prerequisites: ["s6-list-slicing-methods"],
      concepts: ["tuple", "set"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Tuples\n\nA **tuple** is like a list but **immutable** — once created, its contents cannot change. Tuples use parentheses.\n\n```python\npoint = (3, 7)\nprint(point[0])  # 3\npoint[0] = 99   # TypeError — tuples are immutable\n```\n\nUse a tuple when the data should not change: coordinates, RGB colours, database rows.",
        },
        {
          kind: "comparison",
          leftLabel: "List (mutable)",
          rightLabel: "Tuple (immutable)",
          leftCode: `scores = [10, 20, 30]
scores[0] = 99       # OK
scores.append(40)    # OK`,
          rightCode: `point = (3, 7)
point[0] = 99        # TypeError
# no .append() either`,
          caption:
            "Lists support item assignment; tuples do not.",
        },
        {
          kind: "text",
          markdown:
            "## Sets\n\nA **set** is an unordered collection of **unique** values written with curly braces `{}` or `set()`.\n\n```python\nnums = {1, 2, 2, 3, 3, 3}\nprint(nums)  # {1, 2, 3}  — duplicates removed\n```\n\nSets support fast membership testing and mathematical operations like union (`|`), intersection (`&`), and difference (`-`).",
        },
        {
          kind: "code",
          language: "python",
          code: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(3 in a)       # True  — fast membership test
print(a | b)        # {1, 2, 3, 4, 5, 6}  union
print(a & b)        # {3, 4}  intersection
print(a - b)        # {1, 2}  difference`,
          caption: "Set operations mirror mathematical set theory.",
          highlight: [4, 5, 6, 7],
        },
        {
          kind: "output",
          text: "True\n{1, 2, 3, 4, 5, 6}\n{3, 4}\n{1, 2}",
          isError: false,
        },
        {
          kind: "callout",
          variant: "info",
          title: "Empty set vs empty dict",
          body: "An empty set must be written as `set()`, not `{}`. Curly braces alone `{}` create an empty dictionary.",
        },
        {
          kind: "why-matters",
          body: "Sets make deduplication trivial (`list(set(items))`) and membership checks (`x in my_set`) are O(1) — much faster than scanning a list. Tuples are used as dictionary keys and as lightweight records where immutability is a guarantee, not just a convention.",
        },
      ],
      interactions: [
        {
          id: "s6-ts-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Confirm that sets remove duplicates and are unordered (output may vary — but the standard CPython small-int set produces a deterministic order for these small integers).",
          expectedConceptIds: ["set"],
          code: `raw = [1, 3, 2, 3, 1, 4, 2]
unique = set(raw)
print(len(unique))
print(2 in unique)`,
          expectedOutput: "4\nTrue",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "A set stores only unique values. Count the distinct numbers in the list.",
            },
          ],
          feedback: {
            correct:
              "Correct! {1,2,3,4} has 4 unique values, and 2 is in the set.",
            incorrect:
              "Count the distinct values: 1,2,3,4. That's 4 unique elements. 2 is present.",
          },
        },
        {
          id: "s6-ts-mc-1",
          kind: "multiple-choice",
          prompt:
            "Which collection type is the right choice for storing the (x, y) coordinates of a fixed point that should never be modified?",
          beginnerPurpose:
            "Apply the tuple-vs-list decision rule in a practical context.",
          expectedConceptIds: ["tuple"],
          options: [
            {
              id: "s6-ts-mc-1-a",
              text: "list",
              isCorrect: false,
              explanation:
                "A list is mutable — someone could accidentally change the coordinates. Use a tuple to enforce immutability.",
            },
            {
              id: "s6-ts-mc-1-b",
              text: "tuple",
              isCorrect: true,
              explanation:
                "A tuple is immutable, making it the right choice for fixed data like coordinates.",
            },
            {
              id: "s6-ts-mc-1-c",
              text: "set",
              isCorrect: false,
              explanation:
                "Sets are unordered and hold unique values — they're not designed for a pair of coordinates.",
            },
            {
              id: "s6-ts-mc-1-d",
              text: "dict",
              isCorrect: false,
              explanation:
                "A dict maps keys to values and is not the natural container for a single (x, y) pair.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "When the data should not change after creation, prefer an immutable type.",
            },
          ],
          feedback: {
            correct:
              "Correct! Tuples are the idiomatic Python type for small, fixed collections of related values.",
            incorrect:
              "Coordinates should not be modified — use a tuple to make that explicit.",
          },
        },
        {
          id: "s6-ts-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the code to create a set from the list and print the number of unique elements.",
          beginnerPurpose: "Practice converting a list to a set to deduplicate.",
          expectedConceptIds: ["set"],
          codeTemplate: `words = ["hello", "world", "hello", "python", "world"]
unique_words = ___set___(words)
print(len(unique_words))`,
          blanks: [
            {
              placeholder: "___set___",
              answer: "set",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The built-in function that creates a set from an iterable is 'set()'.",
            },
          ],
          feedback: {
            correct:
              "Correct! set(iterable) creates a set, removing all duplicates.",
            incorrect:
              "Pass the list to the built-in set() function to deduplicate: set(words).",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "tuple",
          recallPrompt:
            "What makes a tuple different from a list, and when should you prefer a tuple?",
          nextReviewAfterDays: 4,
        },
        {
          conceptId: "set",
          recallPrompt:
            "What two properties define a set — and how do you write an empty set?",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s6-ts-predict-1",
          "s6-ts-mc-1",
          "s6-ts-fill-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["tuple", "set"],
      },
    },

    /* ── Lesson 4 ── */
    {
      id: "s6-dictionaries",
      stageId: "stage-06",
      title: "Dictionaries: Key-Value Mapping",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a dictionary literal with string and integer keys",
        "Access values by key using [] and .get()",
        "Iterate over .keys(), .values(), and .items()",
        "Add and update keys; understand KeyError",
      ],
      prerequisites: ["s6-tuples-sets"],
      concepts: ["dict"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Dictionaries\n\nA **dictionary** maps **keys** to **values**. Write one with curly braces and colons:\n\n```python\nperson = {\"name\": \"Alice\", \"age\": 30}\n```\n\nKeys must be immutable (strings, numbers, tuples). Values can be anything. Dictionaries maintain insertion order (Python 3.7+).",
        },
        {
          kind: "code",
          language: "python",
          code: `person = {"name": "Alice", "age": 30}

print(person["name"])       # direct access
print(person.get("age"))    # same via .get()
print(person.get("city", "Unknown"))  # default if key missing

person["email"] = "alice@example.com"   # add new key
person["age"] = 31                       # update existing key
print(person)`,
          caption:
            "Key access with [] raises KeyError if key is absent. .get() returns None (or a default) safely.",
          highlight: [3, 4, 5, 7, 8],
        },
        {
          kind: "output",
          text: 'Alice\n30\nUnknown\n{\'name\': \'Alice\', \'age\': 31, \'email\': \'alice@example.com\'}',
          isError: false,
        },
        {
          kind: "text",
          markdown:
            "## Iterating over a dict\n\n`.keys()` → all keys, `.values()` → all values, `.items()` → (key, value) pairs.",
        },
        {
          kind: "code",
          language: "python",
          code: `scores = {"Alice": 95, "Bob": 87, "Carol": 92}

for name, score in scores.items():
    print(name, "scored", score)`,
          caption:
            ".items() unpacks each entry into a (key, value) tuple.",
          highlight: [3],
        },
        {
          kind: "output",
          text: "Alice scored 95\nBob scored 87\nCarol scored 92",
          isError: false,
        },
        {
          kind: "callout",
          variant: "danger",
          title: "KeyError for missing keys",
          body: "Using dict[key] when the key does not exist raises KeyError. Use .get(key) or check with `key in dict` to avoid the error.",
        },
        {
          kind: "glossary-term",
          term: "dictionary",
          definition:
            "A mutable mapping of unique keys to values. Written as {key: value, ...}.",
          example: `config = {"debug": True, "timeout": 30}`,
        },
      ],
      interactions: [
        {
          id: "s6-di-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Trace dictionary creation, access, and .get() with a default.",
          expectedConceptIds: ["dict"],
          code: `stock = {"apple": 5, "banana": 3}
print(stock["apple"])
print(stock.get("cherry", 0))
stock["banana"] += 2
print(stock["banana"])`,
          expectedOutput: "5\n0\n5",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: ".get('cherry', 0) returns 0 because 'cherry' is not in the dict. += 2 adds 2 to the existing value 3.",
            },
          ],
          feedback: {
            correct:
              "Correct! apple=5, cherry not found so default 0, then banana=3+2=5.",
            incorrect:
              "stock['apple'] is 5. .get('cherry', 0) returns the default 0. stock['banana'] starts at 3 and += 2 gives 5.",
          },
        },
        {
          id: "s6-di-debug-1",
          kind: "debug-code",
          prompt:
            "This code raises a KeyError. Fix it using .get() so missing keys return 0 instead of crashing.",
          beginnerPurpose:
            "Practice using .get() as a safe alternative to direct key access.",
          expectedConceptIds: ["dict"],
          brokenCode: `inventory = {"hammer": 10, "nails": 200}
print(inventory["screws"])`,
          bugDescription:
            "'screws' is not in inventory. Accessing it with [] raises KeyError. Use .get('screws', 0) to return a default value of 0.",
          fixedCode: `inventory = {"hammer": 10, "nails": 200}
print(inventory.get("screws", 0))`,
          errorType: "KeyError",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "When a key might not exist, use .get(key, default) instead of dict[key].",
            },
          ],
          feedback: {
            correct:
              "Correct! .get('screws', 0) returns 0 when 'screws' is absent instead of raising KeyError.",
            incorrect:
              "Replace inventory['screws'] with inventory.get('screws', 0).",
          },
        },
        {
          id: "s6-di-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the loop to print each student and their score in the format 'Name: score'.",
          beginnerPurpose:
            "Practice iterating over dictionary items with .items().",
          expectedConceptIds: ["dict", "iteration"],
          codeTemplate: `grades = {"Alice": 90, "Bob": 85, "Carol": 92}
for name, score in grades.___items___():
    print(f"{name}: {score}")`,
          blanks: [
            {
              placeholder: "___items___",
              answer: "items",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The dict method that yields (key, value) pairs is .items().",
            },
          ],
          feedback: {
            correct:
              "Correct! .items() returns (key, value) pairs suitable for unpacking in a for loop.",
            incorrect:
              "Use .items() to iterate over key-value pairs: for name, score in grades.items().",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "dict",
          recallPrompt:
            "What is the difference between dict[key] and dict.get(key)? When would you prefer .get()?",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s6-di-predict-1",
          "s6-di-debug-1",
          "s6-di-fill-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["dict"],
      },
    },

    /* ── Lesson 5 ── */
    {
      id: "s6-comprehensions",
      stageId: "stage-06",
      title: "List Comprehensions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write a basic list comprehension [expr for item in iterable]",
        "Add a filter condition [expr for item in iterable if condition]",
        "Recognise a dict comprehension {k: v for ...}",
        "Explain when a comprehension is cleaner than an explicit loop",
      ],
      prerequisites: ["s6-dictionaries"],
      concepts: ["comprehension", "iteration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## List comprehensions\n\nA **list comprehension** builds a new list by applying an expression to every item in an iterable, all in one line.\n\n```python\n# verbose loop\nsquares = []\nfor n in range(5):\n    squares.append(n ** 2)\n\n# equivalent comprehension\nsquares = [n ** 2 for n in range(5)]\n```\n\nBoth produce `[0, 1, 4, 9, 16]`, but the comprehension is more readable once you're used to the pattern.",
        },
        {
          kind: "comparison",
          leftLabel: "Explicit loop",
          rightLabel: "List comprehension",
          leftCode: `evens = []
for n in range(10):
    if n % 2 == 0:
        evens.append(n)`,
          rightCode: `evens = [n for n in range(10)
         if n % 2 == 0]`,
          caption:
            "The comprehension is shorter and reads almost like English: 'n for every n in range(10) if n is even'.",
        },
        {
          kind: "code",
          language: "python",
          code: `names = ["alice", "bob", "carol", "dave"]

# capitalise each name
caps = [name.capitalize() for name in names]
print(caps)

# only names longer than 3 characters
long_names = [name for name in names if len(name) > 3]
print(long_names)`,
          caption:
            "A filter condition comes after the for clause.",
          highlight: [4, 8],
        },
        {
          kind: "output",
          text: "['Alice', 'Bob', 'Carol', 'Dave']\n['alice', 'carol', 'dave']",
          isError: false,
        },
        {
          kind: "text",
          markdown:
            "## Dict comprehensions (brief overview)\n\nThe same idea applies to dictionaries:\n\n```python\nsquares = {n: n**2 for n in range(5)}\n# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Keep comprehensions simple",
          body: "A comprehension with a single for and optional simple if is usually readable. If you need nested loops or complex conditions, a regular loop is clearer.",
        },
        {
          kind: "why-matters",
          body: "Comprehensions are everywhere in professional Python. They make data transformation concise: filtering a list, transforming each element, or building a dict — all without boilerplate append loops.",
        },
      ],
      interactions: [
        {
          id: "s6-co-predict-1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose:
            "Trace a comprehension with a filter condition step by step.",
          expectedConceptIds: ["comprehension"],
          code: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = [n * 3 for n in nums if n % 3 == 0]
print(result)`,
          expectedOutput: "[9, 18, 27]",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "First apply the filter: keep only n where n % 3 == 0. From 1–10, those values are 3, 6, and 9.",
            },
            {
              level: "syntax",
              text: "After filtering, multiply each kept value by 3: 3*3=9, 6*3=18, 9*3=27.",
            },
          ],
          feedback: {
            correct:
              "Correct! Multiples of 3 in 1–10 are 3, 6, 9 → multiplied by 3 gives [9, 18, 27].",
            incorrect:
              "Filter first: which values in 1–10 divide evenly by 3? They are 3, 6, 9. Then multiply each by 3.",
          },
        },
        {
          id: "s6-co-fill-1",
          kind: "fill-code",
          prompt:
            "Complete the comprehension that produces a list of the lengths of each word.",
          beginnerPurpose:
            "Write the expression and iterable parts of a comprehension.",
          expectedConceptIds: ["comprehension"],
          codeTemplate: `words = ["cat", "elephant", "ox", "penguin"]
lengths = [___len(word)___ for word in words]
print(lengths)`,
          blanks: [
            {
              placeholder: "___len(word)___",
              answer: "len(word)",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The expression part of a comprehension is evaluated for each item. To get the length of a string, use len().",
            },
          ],
          feedback: {
            correct:
              "Correct! len(word) is evaluated for each word in the list.",
            incorrect:
              "The expression before 'for' should be len(word) — it applies to each word in the list.",
          },
        },
        {
          id: "s6-co-explain-1",
          kind: "plain-language-explain",
          prompt:
            "Explain this list comprehension in plain English, describing what it does step by step.",
          beginnerPurpose:
            "Build the mental model of reading comprehensions from left to right.",
          expectedConceptIds: ["comprehension", "iteration"],
          code: `temperatures_c = [0, 20, 37, 100]
temperatures_f = [c * 9 / 5 + 32 for c in temperatures_c]`,
          keyPointsToHit: [
            "Iterates over each value c in temperatures_c",
            "Applies the formula c * 9/5 + 32 to convert Celsius to Fahrenheit",
            "Builds a new list with the converted values",
            "The original list is not modified",
          ],
          sampleAnswer:
            "For every temperature c in temperatures_c, compute c * 9/5 + 32 (the Celsius-to-Fahrenheit formula) and collect the results into a new list called temperatures_f. The original list is unchanged.",
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Read a comprehension left to right: 'expression' for each 'variable' in 'iterable'.",
            },
          ],
          feedback: {
            correct:
              "Great explanation! Reading comprehensions left-to-right as 'do X for each Y in Z' is the key mental model.",
            incorrect:
              "Describe: what expression is applied? To what variable? From what source? Is the original changed?",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "comprehension",
          recallPrompt:
            "Write the comprehension pattern from memory: how do you add a filter condition?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "iteration",
          recallPrompt:
            "What is the difference between iterating with a for loop and using a list comprehension?",
          nextReviewAfterDays: 4,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s6-co-predict-1",
          "s6-co-fill-1",
          "s6-co-explain-1",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["comprehension", "iteration"],
      },
    },
  ],
  project: {
    id: "s6-project",
    stageId: "stage-06",
    title: "Student Grade Tracker",
    brief:
      "Build a grade tracking program using dictionaries and lists to store student scores, calculate averages, and produce a formatted summary report.",
    requirements: [
      "Store grades in a dict mapping student name (str) to list of scores (list[int])",
      "Calculate average score per student",
      "Find the highest and lowest scoring student",
      "Use a list comprehension to filter students scoring above a threshold",
      "Print a formatted report for all students",
    ],
    acceptanceCriteria: [
      "The grades dict has at least 4 students with multiple scores each",
      "Average is computed correctly using sum() / len()",
      "Highest and lowest scorer names and averages are printed",
      "A list comprehension is used for filtering above-threshold students",
      "The report output is formatted (f-strings or .format())",
    ],
    conceptIds: ["dict", "list", "comprehension", "iteration"],
    difficulty: "intermediate",
    starterCode: `# Student Grade Tracker

grades = {
    "Alice": [85, 92, 78, 90],
    "Bob": [70, 65, 80, 75],
    # add more students...
}

def calculate_average(scores):
    """Return the average of a list of scores."""
    # your code here
    pass
`,
  },
} satisfies Stage;
