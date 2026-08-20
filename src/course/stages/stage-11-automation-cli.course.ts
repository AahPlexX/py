import type { Stage } from "@/course/course.schema";

export const stage11 = {
  id: "stage-11",
  number: 11,
  title: "Sets and Mathematical Collections",
  summary:
    "Master Python sets: creation, uniqueness, membership testing, all set operations (union, intersection, difference, symmetric difference), frozen sets, and real-world patterns like deduplication, group comparison, and validation.",
  level: "beginner",
  masteryGateConceptIds: ["set-creation", "set-operations", "set-membership"],
  lessons: [
    /* ── Lesson 11.1 — Set creation ─────────────────────────────────────── */
    {
      id: "s11-set-creation",
      stageId: "stage-11",
      title: "Set Creation",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Create sets with curly-brace literals and the set() constructor",
        "Create an empty set with set() (not {})",
        "Understand that sets hold only hashable elements",
      ],
      prerequisites: [],
      concepts: ["set-creation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Is a Set?\n\nA **set** is an unordered collection of unique elements. Think of a mathematical set: {1, 2, 3} — no duplicates, no guaranteed order. Python's `set` is the direct programming equivalent.\n\n## Creating Sets\n\nCurly braces with comma-separated values create a set:\n\n```python\ncolors = {\"red\", \"green\", \"blue\"}\nprimes = {2, 3, 5, 7, 11, 13}\nmixed  = {1, \"hello\", True, (1, 2)}   # hashable types OK\n\nprint(type(colors))   # <class 'set'>\nprint(len(primes))    # 6\n```\n\n## The Empty Set Trap\n\n`{}` creates an empty **dict**, not an empty set. Always use `set()` for an empty set:\n\n```python\nempty_dict = {}       # dict!\nempty_set  = set()    # set\n\nprint(type(empty_dict))   # <class 'dict'>\nprint(type(empty_set))    # <class 'set'>\n```\n\n## Creating from Iterables\n\n`set()` converts any iterable to a set, removing duplicates:\n\n```python\nfrom_list   = set([1, 2, 2, 3, 3, 3])   # {1, 2, 3}\nfrom_string = set(\"banana\")              # {'b', 'a', 'n'}\nfrom_range  = set(range(5))              # {0, 1, 2, 3, 4}\n\nprint(from_list)    # {1, 2, 3}\nprint(len(from_string))  # 3  (b, a, n — order varies)\n```\n\n## Sets Are Unordered\n\nSets do not maintain insertion order. When you print a set, elements appear in an arbitrary order that may change between runs.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "{} creates an empty dict, not an empty set",
          body: "This is one of Python's most common gotchas. To create an empty set, always use `set()`. Curly braces without key:value pairs still create a dict.",
        },
        {
          kind: "why-matters",
          body: "Sets provide O(1) membership testing, automatic deduplication, and built-in mathematical operations (union, intersection, difference). They are the right tool whenever you care about presence and uniqueness — not position or count.",
        },
      ],
      interactions: [
        {
          id: "s11-set-creation-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Observe that set() from a list removes duplicates",
          expectedConceptIds: ["set-creation"],
          code: "data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]\ns = set(data)\nprint(len(s))",
          expectedOutput: "7",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "set() removes duplicates. Unique values in data: 1,2,3,4,5,6,9 — 7 unique." }],
          feedback: { correct: "Correct! set() keeps only unique values: 1,2,3,4,5,6,9 — 7 elements.", incorrect: "set() eliminates duplicates. The unique values in data are 1,2,3,4,5,6,9 — 7 unique elements." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-set-creation-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.2 — Uniqueness ────────────────────────────────────────── */
    {
      id: "s11-uniqueness",
      stageId: "stage-11",
      title: "Uniqueness",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Understand that sets automatically enforce uniqueness",
        "Use sets for deduplication of lists",
        "Know which types can and cannot be set elements",
      ],
      prerequisites: [],
      concepts: ["set-creation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Sets Cannot Contain Duplicates\n\nAdding an element that is already in a set has no effect:\n\n```python\ns = {1, 2, 3}\ns.add(2)   # 2 is already there — no change\ns.add(4)\nprint(s)   # {1, 2, 3, 4}\n```\n\n## Deduplication Pattern\n\nConverting a list to a set and back removes duplicates instantly:\n\n```python\nvisits = [\"home\", \"about\", \"contact\", \"home\", \"about\", \"home\"]\nunique = list(set(visits))\nprint(unique)        # some order of ['home', 'about', 'contact']\nprint(len(unique))   # 3\n```\n\n**Limitation:** Sets are unordered. The output order is unpredictable.\n\nTo preserve insertion order while deduplicating, use `dict.fromkeys()`:\n\n```python\nunique_ordered = list(dict.fromkeys(visits))\nprint(unique_ordered)   # ['home', 'about', 'contact'] — order preserved!\n```\n\n## Elements Must Be Hashable\n\nOnly hashable (immutable) objects can be set elements:\n\n```python\n# Valid:\nvalid = {1, \"hello\", (1, 2), True, 3.14}\n\n# Invalid — raises TypeError:\n# {[1, 2]}    # TypeError: unhashable type: 'list'\n```",
        },
        {
          kind: "comparison",
          leftLabel: "list — duplicates allowed",
          rightLabel: "set — duplicates impossible",
          leftCode: "items = [1, 2, 2, 3, 3, 3]\nitems.append(2)\nprint(items)\n# [1, 2, 2, 3, 3, 3, 2]",
          rightCode: "items = {1, 2, 2, 3, 3, 3}\nitems.add(2)\nprint(items)\n# {1, 2, 3}  — still 3 unique",
        },
      ],
      interactions: [
        {
          id: "s11-uniqueness-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Confirm that adding an existing element to a set has no effect",
          expectedConceptIds: ["set-creation"],
          code: "s = {\"a\", \"b\", \"c\"}\ns.add(\"b\")\ns.add(\"d\")\nprint(len(s))",
          expectedOutput: "4",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Adding 'b' again has no effect (already present). Adding 'd' is new. Original 3 + 1 new = 4." }],
          feedback: { correct: "Correct! 'b' was already present (no change); 'd' is new — total 4.", incorrect: "Sets reject duplicates silently. 'b' already exists, so only 'd' is truly added. 3+1=4." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-uniqueness-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.3 — Membership ────────────────────────────────────────── */
    {
      id: "s11-membership",
      stageId: "stage-11",
      title: "Membership Testing",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Test element presence with `in` and `not in`",
        "Understand why set membership is O(1) while list membership is O(n)",
        "Choose sets over lists when frequent membership tests are needed",
      ],
      prerequisites: [],
      concepts: ["set-membership"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `in` for Set Membership\n\nThe `in` operator tests whether an element is in a set:\n\n```python\nallowed = {\"admin\", \"editor\", \"moderator\"}\n\nprint(\"admin\" in allowed)      # True\nprint(\"viewer\" in allowed)     # False\nprint(\"viewer\" not in allowed) # True\n```\n\n## O(1) vs O(n): The Speed Advantage\n\nA list membership test scans every element (O(n) — linear time). A set uses hashing to jump directly to the right location (O(1) — constant time), regardless of size.\n\nFor 1,000,000 elements:\n- List: up to 1,000,000 comparisons\n- Set: roughly 1 hash lookup\n\n## Practical Pattern: Fast Allow/Deny Lists\n\n```python\nBANNED_WORDS = {\"spam\", \"phishing\", \"scam\", \"malware\"}\n\ndef is_clean(text):\n    words = text.lower().split()\n    return not any(w in BANNED_WORDS for w in words)\n\nprint(is_clean(\"Hello world\"))    # True\nprint(is_clean(\"Buy this spam\"))  # False\n```",
        },
        {
          kind: "why-matters",
          body: "Set membership is one of the few cases where the right data structure makes orders-of-magnitude difference in speed. A web application processing thousands of requests per second can validate each request in microseconds using a set — far faster than a list or a database call for common lookups.",
        },
      ],
      interactions: [
        {
          id: "s11-membership-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Confirm set membership testing with `in` and `not in`",
          expectedConceptIds: ["set-membership"],
          code: "roles = {\"admin\", \"editor\"}\nprint(\"editor\" in roles)\nprint(\"viewer\" in roles)\nprint(\"viewer\" not in roles)",
          expectedOutput: "True\nFalse\nTrue",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "'editor' is in the set (True). 'viewer' is not (False). 'not in' negates the absent check (True)." }],
          feedback: { correct: "Correct! 'editor' present (True), 'viewer' absent (False), 'not in' reverses (True).", incorrect: "`in` returns True if element is in set. `not in` returns True if absent." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-membership-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.4 — Adding and removing items ─────────────────────────── */
    {
      id: "s11-add-remove",
      stageId: "stage-11",
      title: "Adding and Removing Items",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Add elements with .add() and .update()",
        "Remove elements with .remove(), .discard(), and .pop()",
        "Understand the difference between .remove() and .discard()",
      ],
      prerequisites: [],
      concepts: ["set-creation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Adding Elements\n\n- `.add(element)` adds one element\n- `.update(iterable)` adds all elements from an iterable\n\n```python\ncolors = {\"red\", \"green\"}\ncolors.add(\"blue\")\ncolors.update([\"yellow\", \"purple\"])\nprint(len(colors))   # 5\n```\n\n## Removing Elements\n\nThree methods with different behaviour on missing elements:\n\n```python\nfruits = {\"apple\", \"banana\", \"cherry\"}\n\n# .remove() — raises KeyError if element absent\nfruits.remove(\"banana\")\nprint(fruits)   # {'apple', 'cherry'}\n# fruits.remove(\"mango\")  # KeyError\n\n# .discard() — silent if element absent\nfruits.discard(\"cherry\")   # removes\nfruits.discard(\"mango\")    # no error\nprint(fruits)   # {'apple'}\n\n# .pop() — removes and returns an arbitrary element\nval = fruits.pop()\nprint(val)      # 'apple'\nprint(fruits)   # set()\n```\n\n## .clear() — Remove All\n\n```python\ns = {1, 2, 3}\ns.clear()\nprint(s)   # set()\n```",
        },
        {
          kind: "comparison",
          leftLabel: ".remove() — strict",
          rightLabel: ".discard() — safe",
          leftCode: "s = {1, 2, 3}\ns.remove(4)  # KeyError: 4\n# Use when 4 MUST be present",
          rightCode: "s = {1, 2, 3}\ns.discard(4)  # no error, no change\n# Use when 4 might not be there",
        },
      ],
      interactions: [
        {
          id: "s11-add-remove-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace .add() and .discard() on a set",
          expectedConceptIds: ["set-creation"],
          code: "s = {1, 2, 3}\ns.add(4)\ns.discard(2)\ns.discard(99)  # 99 not present — no error\nprint(len(s))",
          expectedOutput: "3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Start 3. +4=4. -2=3. -99 no change. Final: 3." }],
          feedback: { correct: "Correct! Start 3, add 4→4, discard 2→3, discard 99 (silent)→3.", incorrect: "3 → add 4 → 4 → discard 2 → 3 → discard 99 (silent, no change) → 3." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-add-remove-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.5 — Union ─────────────────────────────────────────────── */
    {
      id: "s11-union",
      stageId: "stage-11",
      title: "Union",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Compute the union of two sets with | and .union()",
        "Update a set in place with |=",
        "Understand that union contains all elements from both sets without duplicates",
      ],
      prerequisites: [],
      concepts: ["set-operations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Union: All Elements from Either Set\n\nThe **union** of two sets contains every element that appears in *either* set (or both). Duplicates are still removed:\n\n```python\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\n# | operator — creates a new set\nu = a | b\nprint(u)   # {1, 2, 3, 4, 5, 6}\n\n# |= — in-place update\na |= b\nprint(a)   # {1, 2, 3, 4, 5, 6}\n```\n\n## Union with Multiple Sets\n\n```python\ngroup1 = {\"Alice\", \"Bob\"}\ngroup2 = {\"Carol\", \"Dave\"}\ngroup3 = {\"Eve\", \"Bob\"}     # Bob in group1 too\n\nall_people = group1 | group2 | group3\nprint(len(all_people))   # 5 — Bob counted once\n```\n\n## Real Use: Combining Data Sources\n\n```python\nday1_visitors = {\"alice\", \"bob\", \"carol\"}\nday2_visitors = {\"bob\", \"dave\", \"eve\"}\n\nall_visitors = day1_visitors | day2_visitors\nprint(f\"Total unique visitors: {len(all_visitors)}\")\n# Total unique visitors: 5\n```",
        },
        {
          kind: "mental-model",
          title: "Union is OR — anyone from either group",
          analogy: "If set A is people who like pizza and set B is people who like sushi, the union is everyone who likes pizza OR sushi (or both). Bob who likes both is counted once.",
          explanation: "The `|` symbol echoes the `|` (OR) operator in logic. The union is always at least as large as the larger input set.",
        },
      ],
      interactions: [
        {
          id: "s11-union-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace union combining elements from both sets without duplicates",
          expectedConceptIds: ["set-operations"],
          code: "a = {1, 2, 3}\nb = {2, 3, 4, 5}\nprint(len(a | b))",
          expectedOutput: "5",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Union: all elements from both. {1,2,3,4,5} — 2 and 3 appear once. Length 5." }],
          feedback: { correct: "Correct! a|b = {1,2,3,4,5} — 5 unique elements.", incorrect: "Union combines both sets and removes duplicates: {1,2,3}|{2,3,4,5} = {1,2,3,4,5} — 5 elements." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-union-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.6 — Intersection ──────────────────────────────────────── */
    {
      id: "s11-intersection",
      stageId: "stage-11",
      title: "Intersection",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Compute the intersection of two sets with & and .intersection()",
        "Understand that intersection contains only elements present in both sets",
        "Apply intersection to find common elements between data sets",
      ],
      prerequisites: [],
      concepts: ["set-operations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Intersection: Elements in Both Sets\n\nThe **intersection** contains only elements that are present in *every* specified set:\n\n```python\na = {1, 2, 3, 4, 5}\nb = {3, 4, 5, 6, 7}\n\ni = a & b\nprint(i)   # {3, 4, 5}\n```\n\n## Intersection with Multiple Sets\n\n```python\nmath_students    = {\"Alice\", \"Bob\", \"Carol\", \"Dave\"}\nphysics_students = {\"Bob\", \"Carol\", \"Eve\"}\nchem_students    = {\"Carol\", \"Bob\", \"Frank\"}\n\n# Students enrolled in ALL three subjects\nall_three = math_students & physics_students & chem_students\nprint(all_three)   # {'Bob', 'Carol'}\n```\n\n## Real Use: Common Tags / Interests\n\n```python\nuser_a_tags = {\"python\", \"web\", \"api\", \"databases\"}\nuser_b_tags = {\"python\", \"machine-learning\", \"api\", \"data\"}\n\ncommon = user_a_tags & user_b_tags\nprint(f\"Common interests: {common}\")\n# Common interests: {'python', 'api'}\n```",
        },
        {
          kind: "mental-model",
          title: "Intersection is AND — in this set AND that set",
          analogy: "If set A is people who speak English and set B is people who speak Spanish, the intersection is people who speak BOTH English AND Spanish.",
          explanation: "The `&` symbol echoes the `&` (AND) operator in logic. The result is always a subset of both input sets.",
        },
      ],
      interactions: [
        {
          id: "s11-intersection-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace intersection finding only shared elements",
          expectedConceptIds: ["set-operations"],
          code: "a = {\"x\", \"y\", \"z\"}\nb = {\"y\", \"z\", \"w\"}\nprint(a & b)",
          expectedOutput: "{'y', 'z'}",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Intersection: only elements in BOTH a AND b. 'y' and 'z' are in both." }],
          feedback: { correct: "Correct! 'y' and 'z' are in both sets — the intersection is {'y', 'z'}.", incorrect: "Intersection keeps only elements present in both sets. Only 'y' and 'z' appear in both a and b." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-intersection-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.7 — Difference ────────────────────────────────────────── */
    {
      id: "s11-difference",
      stageId: "stage-11",
      title: "Difference",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Compute the set difference with - and .difference()",
        "Understand that a - b contains elements in a but not in b",
        "Distinguish a - b from b - a",
      ],
      prerequisites: [],
      concepts: ["set-operations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Difference: Elements in One But Not the Other\n\nThe **difference** `a - b` contains elements in `a` but NOT in `b`. Order matters:\n\n```python\na = {1, 2, 3, 4, 5}\nb = {3, 4, 5, 6, 7}\n\nprint(a - b)   # {1, 2}    — in a but not b\nprint(b - a)   # {6, 7}    — in b but not a\n```\n\n## Real-World Uses\n\n```python\n# Unverified users\nregistered = {\"alice\", \"bob\", \"carol\", \"dave\"}\nverified   = {\"alice\", \"carol\"}\n\nunverified = registered - verified\nprint(unverified)   # {'bob', 'dave'}\n\n# Features added / removed between versions\nold_features = {\"login\", \"dashboard\", \"profile\"}\nnew_features = {\"login\", \"dashboard\", \"analytics\", \"export\"}\n\nadded   = new_features - old_features   # {'analytics', 'export'}\nremoved = old_features - new_features   # {'profile'}\nprint(f\"Added:   {added}\")\nprint(f\"Removed: {removed}\")\n```",
        },
        {
          kind: "mental-model",
          title: "Difference is subtraction — remove what is in B",
          analogy: "Start with set A and cross out every element that also appears in B. What is left is the difference.",
          explanation: "Unlike arithmetic subtraction, set difference is not commutative: {1,2,3}-{2,3}={1}, but {2,3}-{1,2,3}={}. Order determines which set you start with and which provides the elements to remove.",
        },
      ],
      interactions: [
        {
          id: "s11-difference-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace set difference to find elements unique to one set",
          expectedConceptIds: ["set-operations"],
          code: "all_students = {\"Alice\", \"Bob\", \"Carol\"}\npassed       = {\"Alice\", \"Carol\"}\nfailed = all_students - passed\nprint(failed)",
          expectedOutput: "{'Bob'}",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "a - b keeps elements in a that are NOT in b. 'Bob' is in all_students but not in passed." }],
          feedback: { correct: "Correct! all_students - passed removes Alice and Carol, leaving {'Bob'}.", incorrect: "Set difference keeps elements that are in a but NOT in b. 'Bob' is not in passed, so he remains." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-difference-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.8 — Symmetric difference ─────────────────────────────── */
    {
      id: "s11-symmetric-difference",
      stageId: "stage-11",
      title: "Symmetric Difference",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Compute symmetric difference with ^ and .symmetric_difference()",
        "Understand it returns elements unique to each set (not shared)",
        "Apply symmetric difference to find what changed between two sets",
      ],
      prerequisites: [],
      concepts: ["set-operations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Symmetric Difference: Unique to Either — Not Both\n\nThe **symmetric difference** `a ^ b` contains elements in `a` or `b`, but NOT in both:\n\n```python\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\nprint(a ^ b)            # {1, 2, 5, 6}  — unique to each\nprint(a & b)            # {3, 4}         — shared (excluded from ^)\nprint((a | b) - (a & b)) # {1, 2, 5, 6}  — equivalent\n```\n\n## Real Use: Finding Changes Between Versions\n\n```python\nold_config = {\"debug\", \"logging\", \"caching\", \"auth\"}\nnew_config = {\"logging\", \"caching\", \"monitoring\", \"auth\", \"tracing\"}\n\nchanged = old_config ^ new_config\nprint(f\"Changed: {changed}\")\n# Changed: {'debug', 'monitoring', 'tracing'}\n# debug was removed; monitoring and tracing were added\n\nadded   = new_config - old_config   # {'monitoring', 'tracing'}\nremoved = old_config - new_config   # {'debug'}\n```",
        },
        {
          kind: "mental-model",
          title: "Symmetric difference is XOR — one or the other, but not both",
          analogy: "People who came to Monday's meeting OR Tuesday's meeting — but NOT both days.",
          explanation: "The `^` echoes XOR (exclusive OR) in logic. It is commutative: a ^ b == b ^ a. Useful whenever you need to identify what is different between two versions of a set.",
        },
      ],
      interactions: [
        {
          id: "s11-sym-diff-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace symmetric difference to find uniquely owned elements",
          expectedConceptIds: ["set-operations"],
          code: "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(len(a ^ b))",
          expectedOutput: "2",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "a^b: elements unique to each. 1 (only in a) and 4 (only in b). 2 and 3 shared — excluded. Length 2." }],
          feedback: { correct: "Correct! 1 is only in a; 4 only in b; 2,3 are shared and excluded. Length: 2.", incorrect: "Symmetric difference excludes shared elements (2,3). Only 1 (unique to a) and 4 (unique to b) remain." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-sym-diff-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.9 — Subset and superset checks ────────────────────────── */
    {
      id: "s11-subset-superset",
      stageId: "stage-11",
      title: "Subset and Superset Checks",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Test subset relationship with <= and .issubset()",
        "Test superset relationship with >= and .issuperset()",
        "Apply subset checks to permission validation",
      ],
      prerequisites: [],
      concepts: ["set-operations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Subset: Every Element of A Is in B\n\n`a <= b` returns True if every element of `a` is also in `b`:\n\n```python\na = {1, 2, 3}\nb = {1, 2, 3, 4, 5}\nc = {1, 2}\n\nprint(c <= b)   # True  — c is a subset of b\nprint(a <= b)   # True  — a is a subset of b\nprint(b <= a)   # False — b has elements not in a\nprint(a <= a)   # True  — every set is a subset of itself\n```\n\n## Proper Subset\n\n`a < b` requires a to be a subset of b AND smaller (not equal):\n\n```python\nprint(c < b)   # True  — proper subset\nprint(a < a)   # False — a equals itself\n```\n\n## Superset: B Contains All of A\n\n```python\nprint(b >= a)   # True  — b is a superset of a\nprint(b > a)    # True  — proper superset\n```\n\n## Real Use: Permission Checking\n\n```python\nrequired_perms = {\"read\", \"write\"}\nuser_perms     = {\"read\", \"write\", \"admin\"}\n\nif required_perms <= user_perms:\n    print(\"Access granted\")\nelse:\n    missing = required_perms - user_perms\n    print(f\"Missing: {missing}\")\n# Access granted\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: ".issubset() and .issuperset() accept any iterable",
          body: "The method forms (`a.issubset(b)`) accept lists, tuples, or any iterable as the argument. The operator forms (`a <= b`) require both sides to be sets.",
        },
      ],
      interactions: [
        {
          id: "s11-subset-mc",
          kind: "multiple-choice",
          prompt: "What does `{1, 2} <= {1, 2, 3}` evaluate to?",
          beginnerPurpose: "Identify the subset relationship using the <= operator",
          expectedConceptIds: ["set-operations"],
          options: [
            { id: "a", text: "True", isCorrect: true, explanation: "Correct! {1,2} is a subset of {1,2,3} — every element of the left set is in the right set." },
            { id: "b", text: "False", isCorrect: false, explanation: "{1,2} is indeed a subset of {1,2,3}. <= means 'is a subset of (or equal to)'." },
            { id: "c", text: "{1, 2}", isCorrect: false, explanation: "Subset comparison returns a boolean (True/False), not a set." },
            { id: "d", text: "TypeError", isCorrect: false, explanation: "Both sides are sets, so <= is valid and returns True." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "a <= b means 'every element of a is also in b'. 1 is in {1,2,3}, 2 is in {1,2,3} — True." }],
          feedback: { correct: "Correct! Every element of {1,2} appears in {1,2,3}, so it is a subset (True).", incorrect: "Both 1 and 2 from the left set appear in the right set {1,2,3}. Subset check is True." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-subset-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.10 — Frozen sets ─────────────────────────────────────── */
    {
      id: "s11-frozenset",
      stageId: "stage-11",
      title: "Frozen Sets",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create immutable sets with frozenset()",
        "Use frozen sets as dictionary keys and set elements",
        "Apply all read-only set operations to frozen sets",
      ],
      prerequisites: [],
      concepts: ["set-creation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## frozenset: Immutable Sets\n\nA `frozenset` is an immutable version of a set. Like tuples vs lists, frozen sets sacrifice mutability to gain hashability:\n\n```python\nfs = frozenset([1, 2, 3])\nprint(fs)         # frozenset({1, 2, 3})\n\n# Cannot be modified:\n# fs.add(4)       # AttributeError\n# fs.remove(1)    # AttributeError\n```\n\n## As Dictionary Keys\n\nBecause frozen sets are hashable, they can be dict keys:\n\n```python\ntiers = {\n    frozenset([\"read\"]):                \"free\",\n    frozenset([\"read\", \"write\"]):        \"basic\",\n    frozenset([\"read\", \"write\", \"api\"]): \"pro\",\n}\n\nuser_perms = frozenset([\"read\", \"write\"])\nprint(tiers.get(user_perms, \"unknown\"))   # basic\n```\n\n## As Set Elements\n\n```python\n# A set of frozensets — valid\nsets_of_sets = {frozenset([1, 2]), frozenset([3, 4])}\nprint(len(sets_of_sets))   # 2\n```\n\n## All Read Operations Work\n\n```python\nfs = frozenset([1, 2, 3, 4, 5])\nprint(3 in fs)         # True\nprint(fs & frozenset([3, 4, 5, 6]))   # frozenset({3, 4, 5})\nprint(len(fs))         # 5\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "frozenset for constants and cache keys",
          body: "Frozen sets are ideal for fixed collections used as dict keys or stored inside other sets: permission sets, allowed values, configuration flag groups. They signal 'this collection will not change'.",
        },
      ],
      interactions: [
        {
          id: "s11-frozenset-mc",
          kind: "multiple-choice",
          prompt: "Which of the following is a valid use of frozenset?",
          beginnerPurpose: "Identify why frozensets enable dict-key usage",
          expectedConceptIds: ["set-creation"],
          options: [
            { id: "a", text: "As a dictionary key", isCorrect: true, explanation: "Correct! frozenset is hashable and immutable, so it can be used as a dict key." },
            { id: "b", text: "Appending elements to it", isCorrect: false, explanation: "frozenset is immutable — it has no .add() or .append() method." },
            { id: "c", text: "Creating a frozenset of lists", isCorrect: false, explanation: "Lists are unhashable and cannot be elements of a frozenset." },
            { id: "d", text: "Iterating in sorted order by default", isCorrect: false, explanation: "Sets and frozensets are unordered — they have no guaranteed iteration order." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "frozenset is immutable = hashable. Hashable objects can be dict keys." }],
          feedback: { correct: "Correct! frozenset is hashable, so it can be used as a dict key.", incorrect: "frozenset is immutable and hashable — that is what makes it valid as a dict key." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-frozenset-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.11 — Removing duplicates ─────────────────────────────── */
    {
      id: "s11-removing-duplicates",
      stageId: "stage-11",
      title: "Removing Duplicates",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Deduplicate a list using set() conversion",
        "Preserve insertion order while deduplicating using dict.fromkeys()",
        "Choose the right deduplication approach for each situation",
      ],
      prerequisites: [],
      concepts: ["set-creation"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Fastest Approach: set()\n\nConverting to a set removes all duplicates instantly:\n\n```python\nvisits = [\"home\", \"about\", \"contact\", \"home\", \"about\", \"home\"]\nunique = list(set(visits))\nprint(unique)       # some order of ['home', 'about', 'contact']\nprint(len(unique))  # 3\n```\n\n**Limitation:** Output order is unpredictable.\n\n## Order-Preserving: dict.fromkeys()\n\n`dict.fromkeys(iterable)` creates a dict with unique keys in insertion order. Since dicts preserve insertion order (Python 3.7+), this reliably deduplicates while maintaining the first occurrence:\n\n```python\nvisits = [\"home\", \"about\", \"home\", \"contact\", \"about\", \"home\"]\nunique_ordered = list(dict.fromkeys(visits))\nprint(unique_ordered)   # ['home', 'about', 'contact'] — order preserved!\n```\n\n## Deduplicating Tuples\n\n```python\ncoords = [(1, 2), (3, 4), (1, 2), (5, 6), (3, 4)]\nunique_coords = list(set(coords))\nprint(len(unique_coords))   # 3\n```",
        },
        {
          kind: "comparison",
          leftLabel: "set() — fast, unordered",
          rightLabel: "dict.fromkeys() — ordered",
          leftCode: "items = [3, 1, 2, 1, 3]\nprint(list(set(items)))\n# Some order: [1, 2, 3] or [2, 1, 3]...\n# Order is NOT guaranteed",
          rightCode: "items = [3, 1, 2, 1, 3]\nprint(list(dict.fromkeys(items)))\n# [3, 1, 2] — first occurrences, preserved",
        },
      ],
      interactions: [
        {
          id: "s11-dedup-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace deduplication using set() conversion",
          expectedConceptIds: ["set-creation"],
          code: "nums = [1, 3, 2, 1, 4, 3, 5, 2]\nprint(len(set(nums)))",
          expectedOutput: "5",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "set() removes duplicates. Unique values: 1,2,3,4,5 — 5 elements." }],
          feedback: { correct: "Correct! Unique values are 1,2,3,4,5 — 5 unique elements.", incorrect: "set() keeps only unique values. From [1,3,2,1,4,3,5,2] the unique values are 1,2,3,4,5." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-dedup-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.12 — Comparing groups ────────────────────────────────── */
    {
      id: "s11-comparing-groups",
      stageId: "stage-11",
      title: "Comparing Groups",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use isdisjoint() to check if two sets share no elements",
        "Combine multiple set operations to answer complex membership questions",
        "Test set equality with ==",
      ],
      prerequisites: [],
      concepts: ["set-operations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## isdisjoint(): No Elements in Common\n\n`a.isdisjoint(b)` returns True if the two sets share no elements:\n\n```python\neven = {2, 4, 6, 8}\nodd  = {1, 3, 5, 7}\n\nprint(even.isdisjoint(odd))     # True  — no overlap\nprint(even.isdisjoint({4, 9}))  # False — 4 is shared\n```\n\n## Complex Group Analysis\n\n```python\nmonday    = {\"Alice\", \"Bob\", \"Carol\", \"Dave\"}\ntuesday   = {\"Bob\", \"Carol\", \"Eve\", \"Frank\"}\nwednesday = {\"Carol\", \"Eve\", \"Alice\", \"George\"}\n\n# Attended all three days\nall_days  = monday & tuesday & wednesday\nprint(f\"All 3 days: {all_days}\")    # {'Carol'}\n\n# Attended at least one day\nany_day   = monday | tuesday | wednesday\nprint(f\"Total people: {len(any_day)}\")  # 7\n\n# Attended Monday only (not Tuesday, not Wednesday)\nmon_only  = monday - tuesday - wednesday\nprint(f\"Mon only: {mon_only}\")      # {'Dave'}\n```\n\n## Set Equality\n\n```python\na = {1, 2, 3}\nb = {3, 1, 2}   # same elements, different insertion order\nprint(a == b)   # True — sets compare by content\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Sets compare by content, not order",
          body: "Two sets are equal if they contain the same elements, regardless of how they were created. `{1,2,3} == {3,2,1}` is True. This differs from lists where order matters.",
        },
      ],
      interactions: [
        {
          id: "s11-comparing-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Combine intersection and difference to analyze group membership",
          expectedConceptIds: ["set-operations"],
          code: "a = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7, 8}\nprint(len(a & b), len(a - b), len(b - a))",
          expectedOutput: "2 3 3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "a&b: {4,5}=2. a-b: {1,2,3}=3. b-a: {6,7,8}=3." }],
          feedback: { correct: "Correct! Intersection {4,5}=2, a-b {1,2,3}=3, b-a {6,7,8}=3.", incorrect: "a&b keeps shared (4,5)→2. a-b removes b's elements from a (1,2,3)→3. b-a removes a's elements from b (6,7,8)→3." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-comparing-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.13 — Set-based validation ─────────────────────────────── */
    {
      id: "s11-set-validation",
      stageId: "stage-11",
      title: "Set-Based Validation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Validate inputs against an allowed-values set",
        "Find unexpected or missing values using set operations",
        "Build efficient lookup structures for permission checking",
      ],
      prerequisites: [],
      concepts: ["set-membership", "set-operations"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Validation with Sets\n\nSets are the natural tool for checking whether values belong to an expected collection:\n\n```python\nVALID_COLORS = {\"red\", \"green\", \"blue\", \"yellow\", \"orange\"}\n\ndef validate_color(color):\n    if color not in VALID_COLORS:\n        raise ValueError(f\"Invalid color '{color}'.\")\n    return color\n\nvalidate_color(\"red\")     # OK\n# validate_color(\"pink\")  # ValueError\n```\n\n## Batch Validation: Find Invalid Inputs\n\n```python\nVALID_STATUSES = {\"pending\", \"active\", \"suspended\", \"deleted\"}\n\ndef find_invalid(statuses):\n    return set(statuses) - VALID_STATUSES\n\nuser_statuses = [\"active\", \"pending\", \"banned\", \"active\", \"ghost\"]\ninvalid = find_invalid(user_statuses)\nprint(f\"Invalid: {invalid}\")   # {'banned', 'ghost'}\n```\n\n## Required Fields Validation\n\n```python\nREQUIRED_FIELDS = {\"name\", \"email\", \"age\"}\n\ndef validate_form(data: dict):\n    present = set(data.keys())\n    missing = REQUIRED_FIELDS - present\n    unknown = present - REQUIRED_FIELDS\n\n    if missing:\n        raise ValueError(f\"Missing: {missing}\")\n    if unknown:\n        print(f\"Warning: unexpected fields: {unknown}\")\n\nvalidate_form({\"name\": \"Alice\", \"email\": \"a@b.com\", \"age\": 30})\n# No errors\n```",
        },
        {
          kind: "why-matters",
          body: "Set-based validation is O(1) per lookup. A web API receiving thousands of requests per second can validate each request in microseconds using a set — far faster than checking a list or querying a database. This pattern appears in every high-performance Python system.",
        },
      ],
      interactions: [
        {
          id: "s11-validation-fill",
          kind: "fill-code",
          prompt: "Fill in the blank to find which submitted tags are not in ALLOWED_TAGS.",
          beginnerPurpose: "Apply set difference for batch validation",
          expectedConceptIds: ["set-operations"],
          codeTemplate: "ALLOWED_TAGS = {\"python\", \"java\", \"javascript\", \"rust\", \"go\"}\nsubmitted    = {\"python\", \"cobol\", \"brainfuck\", \"java\"}\n\ninvalid_tags = ____ - ALLOWED_TAGS\nprint(invalid_tags)",
          blanks: [{ placeholder: "____", answer: "submitted", caseSensitive: false }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Set difference: submitted - ALLOWED_TAGS gives elements in submitted that are NOT allowed." }],
          feedback: { correct: "Correct! submitted - ALLOWED_TAGS = {'cobol', 'brainfuck'}.", incorrect: "Use submitted - ALLOWED_TAGS to find elements in submitted that are not in the allowed set." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-validation-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 11.14 — Set operations project ───────────────────────────── */
    {
      id: "s11-set-project",
      stageId: "stage-11",
      title: "Set Operations Project",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Apply all set operations in a cohesive program",
        "Use sets for deduplication, membership validation, and group analysis",
        "Choose the right set operation for each real-world problem",
      ],
      prerequisites: [],
      concepts: ["set-creation", "set-operations", "set-membership"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project: Course Enrollment Analyzer\n\nGiven student enrollment data across multiple courses, answer analysis questions using set operations.\n\n```python\nenrollments = {\n    \"math\":    {\"Alice\", \"Bob\", \"Carol\", \"Dave\", \"Eve\"},\n    \"physics\": {\"Bob\", \"Carol\", \"Frank\", \"Grace\"},\n    \"chem\":    {\"Carol\", \"Dave\", \"Eve\", \"Hank\"},\n    \"bio\":     {\"Alice\", \"Frank\", \"Grace\", \"Hank\"},\n}\n```\n\n### All Unique Students\n\n```python\nall_students = set().union(*enrollments.values())\nprint(f\"Total unique students: {len(all_students)}\")\n# Total unique students: 8\n```\n\n### Students in Math AND Physics but Not Chemistry\n\n```python\nmath_and_physics = enrollments[\"math\"] & enrollments[\"physics\"]\nmatch_not_chem   = math_and_physics - enrollments[\"chem\"]\nprint(f\"Math+Physics, not Chem: {match_not_chem}\")\n# {'Bob'}\n```\n\n### Validation: Names Must Be Title-Case\n\n```python\nfor course, students in enrollments.items():\n    invalid = {s for s in students if not s.istitle()}\n    if invalid:\n        print(f\"{course} has invalid names: {invalid}\")\n# No output — all names are title-case\n```\n\n### Find Students Enrolled in Exactly One Course\n\n```python\nfrom collections import Counter\n\nstudent_count = Counter()\nfor students in enrollments.values():\n    for s in students:\n        student_count[s] += 1\n\none_course_only = {s for s, c in student_count.items() if c == 1}\nprint(f\"Only one course: {one_course_only}\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "set.union(*iterables) — union of many sets at once",
          body: "`set.union(*enrollments.values())` starts with an empty set and takes the union with every value set. The `*` unpacks the dict values into separate arguments.",
        },
      ],
      interactions: [
        {
          id: "s11-project-run",
          kind: "run-code",
          prompt: "Find students in 'math' but NOT in 'physics'. Print each name sorted alphabetically, one per line.",
          beginnerPurpose: "Apply set difference to a real enrollment dataset",
          expectedConceptIds: ["set-operations"],
          starterCode: `enrollments = {
    "math":    {"Alice", "Bob", "Carol", "Dave", "Eve"},
    "physics": {"Bob", "Carol", "Frank", "Grace"},
}

# Students in math but not physics — sorted alphabetically
`,
          task: "Print Alice, Dave, Eve on separate lines in alphabetical order.",
          expectedOutputContains: ["Alice", "Dave", "Eve"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Use enrollments['math'] - enrollments['physics'] for set difference, then sorted() to sort." }],
          feedback: { correct: "Correct! math - physics = {Alice, Dave, Eve}. Sorted alphabetically.", incorrect: "Set difference: enrollments['math'] - enrollments['physics'] gives {Alice, Dave, Eve}. Sort with sorted()." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s11-project-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s11-project",
    stageId: "stage-11",
    title: "Permission System with Sets",
    brief:
      "Build a role-based permission system using sets and frozensets. Each role is a frozenset of permission strings. The system checks whether a user has all required permissions, finds missing permissions, validates that permissions belong to a known set, and compares roles using set operations.",
    requirements: [
      "Define at least 4 roles as frozensets of permission strings",
      "Implement has_permission(user_roles, required_perms) returning True if user has all required perms",
      "Implement missing_permissions(user_roles, required_perms) returning the set of missing perms",
      "Implement validate_permissions(perms) checking against a KNOWN_PERMISSIONS set and returning invalid perms",
      "Implement roles_in_common(role_a, role_b) returning shared permissions between two roles",
    ],
    acceptanceCriteria: [
      "Role definitions use frozenset for hashability",
      "Permission checks use set operations (<=, &, -) not loops",
      "validate_permissions uses set difference against KNOWN_PERMISSIONS",
      "All five functions work correctly on the provided test cases",
    ],
    conceptIds: ["set-creation", "set-operations", "set-membership"],
    difficulty: "intermediate",
  },
} satisfies Stage;
