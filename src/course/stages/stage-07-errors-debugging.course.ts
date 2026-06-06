import type { Stage } from "@/course/course.schema";

export const stage07 = {
  id: "stage-07",
  number: 7,
  title: "Structural Pattern Matching",
  summary:
    "Master Python's match/case statement: literal patterns, wildcard, capture, OR patterns, guard clauses, sequence patterns, mapping patterns, class patterns, nested patterns, and practical pattern-matching applications.",
  level: "intermediate",
  masteryGateConceptIds: ["match-statement", "pattern-matching"],

  lessons: [
    /* ── Lesson 7.1 — match statement syntax ─────────────────────────────── */
    {
      id: "s7-match-syntax",
      stageId: "stage-07",
      title: "match Statement Syntax",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write a match statement with case clauses",
        "Explain how Python selects which case runs",
        "Understand that match is structural, not just equality checking",
      ],
      prerequisites: [],
      concepts: ["match-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## A Better Way to Dispatch on Structure\n\nLong chains of `if/elif/else` comparing a value against many possibilities are common in Python code — parsing commands, handling message types, processing config values. They work, but they're verbose and only compare for equality. Python 3.10 introduced `match/case` as a more expressive way to handle these scenarios.\n\n## Basic match Syntax\n\n```python\ncommand = 'quit'\n\nmatch command:           # subject: the value being examined\n    case 'quit':         # case pattern: matches if command == 'quit'\n        print(\"Quitting...\")\n    case 'help':         # another pattern\n        print(\"Available commands: quit, help, run\")\n    case 'run':\n        print(\"Running...\")\n    case _:              # wildcard: matches anything (like else)\n        print(f\"Unknown command: {command}\")\n```\n\n## How Python Selects a Case\n\nPython tries each `case` from top to bottom. The first one whose pattern **matches** the subject runs. The remaining cases are skipped. If no case matches and there is no wildcard, nothing runs.\n\n## match Is Python 3.10+\n\n```python\nimport sys\nprint(sys.version)   # must be 3.10 or higher\n```\n\nOn older Python, `match` is not a reserved keyword and the statement doesn't exist.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "match Is Not a Function Call",
          body: "`match` is a statement, not a function. `match command:` examines the value of `command`. The colon and the indented case blocks are required syntax.",
        },
        {
          kind: "why-matters",
          body: "match/case makes code that dispatches on the shape or type of data dramatically cleaner. It scales from simple string matching to complex nested data structures where if/elif would become unmanageable.",
        },
      ],
      interactions: [
        {
          id: "s7-match-syntax-predict",
          kind: "predict-output",
          prompt: "What does this print when status = 'pending'?",
          beginnerPurpose: "Trace a match statement finding the first matching case",
          expectedConceptIds: ["match-statement"],
          code: "status = 'pending'\nmatch status:\n    case 'active':\n        print(\"Running\")\n    case 'pending':\n        print(\"Waiting\")\n    case 'done':\n        print(\"Finished\")\n    case _:\n        print(\"Unknown\")",
          expectedOutput: "Waiting",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Python tries each case top-down. 'active' doesn't match. 'pending' matches → runs that case → stops." }],
          feedback: { correct: "Correct! 'pending' matches the second case.", incorrect: "Python finds the first matching case. 'pending' matches case 'pending': → prints 'Waiting'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-match-syntax-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.2 — Literal patterns ───────────────────────────────────── */
    {
      id: "s7-literal-patterns",
      stageId: "stage-07",
      title: "Literal Patterns",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Match against literal values: strings, integers, floats, booleans, None",
        "Explain that literal patterns use value equality (==)",
        "Apply literal patterns to status codes, command strings, and option values",
      ],
      prerequisites: [],
      concepts: ["match-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Literal Patterns: Match Exact Values\n\nA literal pattern matches when the subject equals the given value. You can match integers, floats, strings, booleans, and `None`:\n\n```python\ndef describe_status_code(code):\n    match code:\n        case 200:\n            return \"OK\"\n        case 201:\n            return \"Created\"\n        case 400:\n            return \"Bad Request\"\n        case 401:\n            return \"Unauthorized\"\n        case 404:\n            return \"Not Found\"\n        case 500:\n            return \"Internal Server Error\"\n        case _:\n            return f\"Unknown status: {code}\"\n\nprint(describe_status_code(404))  # Not Found\nprint(describe_status_code(999))  # Unknown status: 999\n```\n\n## Matching None and Booleans\n\n```python\ndef describe(value):\n    match value:\n        case None:\n            return \"nothing\"\n        case True:\n            return \"yes\"\n        case False:\n            return \"no\"\n        case _:\n            return f\"something: {value}\"\n```\n\n**Note**: Because `True == 1` and `False == 0`, put `True`/`False` cases before integer cases to avoid unexpected matches.\n\n## Multiple Literals Inline (OR Pattern)\n\nCovered in detail later, but the syntax for matching several literals:\n\n```python\nmatch response:\n    case 'y' | 'yes' | 'Y':\n        print(\"Confirmed\")\n    case 'n' | 'no' | 'N':\n        print(\"Cancelled\")\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "True Matches 1, False Matches 0",
          body: "Because bool is a subclass of int in Python, True == 1 and False == 0. If you match True/False alongside integers, put the bool cases FIRST — otherwise the integer patterns may match them unexpectedly.",
        },
      ],
      interactions: [
        {
          id: "s7-literal-patterns-mc",
          kind: "multiple-choice",
          prompt: "What does `match 0: case False: print('F') case 0: print('Z')` print?",
          beginnerPurpose: "Understand bool/int literal matching order",
          expectedConceptIds: ["match-statement"],
          options: [
            { id: "a", text: "F — because False == 0", isCorrect: true, explanation: "Correct! False matches 0 because bool is a subclass of int. The first matching case wins, and case False: matches 0." },
            { id: "b", text: "Z — because 0 is an integer", isCorrect: false, explanation: "Python tries cases top-down. case False matches 0 (False == 0), so 'F' prints. case 0 is never reached." },
            { id: "c", text: "Both F and Z", isCorrect: false, explanation: "match/case runs only the FIRST matching case. After 'F' is printed, the remaining cases are skipped." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Python tries cases in order. False == 0 is True, so case False: matches 0." }],
          feedback: { correct: "Correct! False == 0, so case False: is the first match.", incorrect: "False == 0 in Python. The first matching case wins. case False: fires before case 0:." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-literal-patterns-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.3 — Wildcard patterns ──────────────────────────────────── */
    {
      id: "s7-wildcard-patterns",
      stageId: "stage-07",
      title: "Wildcard Patterns",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use _ as the wildcard pattern that matches anything",
        "Place _ last in a match statement as the default case",
        "Explain that _ does not bind a name — the value is discarded",
      ],
      prerequisites: [],
      concepts: ["match-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Wildcard: Match Anything\n\nThe `_` (underscore) pattern matches any value without binding it to a name. It serves as the default 'catch everything else' case — equivalent to `else` in an if/elif chain:\n\n```python\nmatch direction:\n    case 'north':\n        move_north()\n    case 'south':\n        move_south()\n    case 'east':\n        move_east()\n    case 'west':\n        move_west()\n    case _:                         # matches anything\n        print(f\"Invalid direction\")\n```\n\n## _ Is Not a Variable\n\nUnlike other patterns, `_` does not store the matched value. The value is simply ignored:\n\n```python\nmatch some_value:\n    case _:\n        # 'some_value' is NOT accessible as '_' inside here\n        # Use a capture pattern instead if you need the value\n        print(\"matched but didn't capture\")\n```\n\n## Wildcard Inside Complex Patterns\n\n`_` can appear inside larger patterns to match-and-ignore a sub-element:\n\n```python\nmatch point:\n    case (x, _):      # match a 2-tuple; capture first element, ignore second\n        print(f\"x = {x}\")\n    case (x, y, _):   # match a 3-tuple; ignore third element\n        print(f\"x={x}, y={y}\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "_ at the Top Level Must Be Last",
          body: "A `case _:` at the top level always matches, so it must be the last case. Placing it earlier would shadow all subsequent cases (Python raises a warning for this).",
        },
      ],
      interactions: [
        {
          id: "s7-wildcard-patterns-mc",
          kind: "multiple-choice",
          prompt: "What prints when `match 'xyz': case 'a': print('A') case _: print('default')`?",
          beginnerPurpose: "Apply wildcard as default case",
          expectedConceptIds: ["match-statement"],
          options: [
            { id: "a", text: "A", isCorrect: false, explanation: "'xyz' does not equal 'a', so that case doesn't match." },
            { id: "b", text: "default", isCorrect: true, explanation: "Correct! 'xyz' doesn't match 'a', so the wildcard _ catches it and prints 'default'." },
            { id: "c", text: "Nothing (no match)", isCorrect: false, explanation: "The wildcard _ matches anything, so it catches 'xyz' and prints 'default'." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "_ matches any value that no previous case handled." }],
          feedback: { correct: "Correct! Wildcard _ is the catch-all default.", incorrect: "_ catches anything not matched earlier. 'xyz' didn't match 'a', so _ fires." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-wildcard-patterns-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.4 — Capture patterns ───────────────────────────────────── */
    {
      id: "s7-capture-patterns",
      stageId: "stage-07",
      title: "Capture Patterns",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Bind the matched value to a name using a capture pattern",
        "Use the captured name inside the case body",
        "Distinguish a capture pattern from a literal pattern",
      ],
      prerequisites: [],
      concepts: ["pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Capture: Name the Matched Value\n\nA **capture pattern** is a name (not `_`). It matches anything and binds the subject's value to that name for use in the case body:\n\n```python\nmatch user_input:\n    case 'quit':\n        print(\"Exiting\")\n    case command:           # capture pattern — binds any value to 'command'\n        print(f\"Unknown command: {command}\")\n```\n\nThe capture pattern acts like a variable assignment: whatever `user_input` is gets stored in `command`.\n\n## Capture Inside Larger Patterns\n\nCapture patterns shine inside sequence and mapping patterns:\n\n```python\nmatch point:\n    case (0, 0):\n        print(\"Origin\")\n    case (x, 0):     # x captures the first element; second must be 0\n        print(f\"On x-axis at {x}\")\n    case (0, y):     # first must be 0; y captures the second\n        print(f\"On y-axis at {y}\")\n    case (x, y):     # both elements captured\n        print(f\"Point at ({x}, {y})\")\n```\n\n## Capture vs Wildcard\n\n| Pattern | Syntax | Binds a name? |\n|---------|--------|---------------|\n| Wildcard | `_` | No — value is discarded |\n| Capture | `name` | Yes — value bound to `name` |\n\n**Important**: A bare name in a case is always a capture, never a value lookup. To match a named constant, use dotted names like `Color.RED` (class patterns).",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Bare Names Are Always Captures",
          body: "If you write `case my_variable:` where my_variable already exists, Python does NOT compare against its value — it creates a new capture binding. To match an existing value, store it in a dotted attribute (`MyEnum.VALUE`) or use a guard: `case n if n == my_variable:`.",
        },
      ],
      interactions: [
        {
          id: "s7-capture-patterns-predict",
          kind: "predict-output",
          prompt: "What does this print when value = 42?",
          beginnerPurpose: "Trace a capture pattern binding a name",
          expectedConceptIds: ["pattern-matching"],
          code: "value = 42\nmatch value:\n    case 0:\n        print(\"zero\")\n    case n:\n        print(f\"got {n}\")",
          expectedOutput: "got 42",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "42 doesn't match literal 0. The capture 'n' matches anything and binds 42 to n." }],
          feedback: { correct: "Correct! The capture pattern binds 42 to n.", incorrect: "42 != 0, so case 0 doesn't match. case n: captures 42 into n and prints 'got 42'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-capture-patterns-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.5 — OR patterns ─────────────────────────────────────────── */
    {
      id: "s7-or-patterns",
      stageId: "stage-07",
      title: "OR Patterns",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use the | operator to match any of several alternatives in one case",
        "Apply OR patterns to consolidate multiple synonymous cases",
        "Understand that all alternatives in an OR pattern must bind the same names",
      ],
      prerequisites: [],
      concepts: ["pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Matching Multiple Alternatives at Once\n\nSometimes several different values should trigger the same action. Instead of repeating case clauses or using `or` in a guard, use the `|` (pipe) operator to combine patterns:\n\n```python\nmatch response.lower():\n    case 'y' | 'yes' | 'yeah' | 'yep':  # any of these matches\n        print(\"Confirmed\")\n    case 'n' | 'no' | 'nope' | 'nah':\n        print(\"Declined\")\n    case _:\n        print(\"Please answer yes or no\")\n```\n\n## OR Patterns with Integers\n\n```python\nmatch exit_code:\n    case 0:\n        print(\"Success\")\n    case 1 | 2 | 3:       # any of 1, 2, or 3\n        print(\"Error\")\n    case _:\n        print(f\"Unknown exit code: {exit_code}\")\n```\n\n## OR Patterns with Captures\n\nIf any alternative in an OR pattern uses a capture, all alternatives must bind the same name:\n\n```python\nmatch value:\n    case 0 | 1 | n:     # SyntaxError or warning — n only present in one alternative\n        print(n)        # which alternative captures n?\n\n# Correct — all alternatives bind 'n' consistently:\nmatch value:\n    case n if n in (0, 1, 2):  # use a guard instead\n        print(f\"small: {n}\")\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "OR Patterns Replace Long if/elif Chains",
          body: "Before match/case, consolidating several elif branches required membership testing: `if x in ('a', 'b', 'c'):`. With match, `case 'a' | 'b' | 'c':` is more explicit and also works inside complex nested patterns.",
        },
      ],
      interactions: [
        {
          id: "s7-or-patterns-mc",
          kind: "multiple-choice",
          prompt: "What does `match 'nope': case 'yes' | 'y': print('Y') case 'no' | 'nope': print('N') case _: print('?')` print?",
          beginnerPurpose: "Apply OR pattern matching",
          expectedConceptIds: ["pattern-matching"],
          options: [
            { id: "a", text: "Y", isCorrect: false, explanation: "'nope' is not in the 'yes'|'y' group." },
            { id: "b", text: "N", isCorrect: true, explanation: "Correct! 'nope' matches 'no' | 'nope', so the second case fires and prints 'N'." },
            { id: "c", text: "?", isCorrect: false, explanation: "'nope' matches the OR pattern 'no' | 'nope' before reaching the wildcard." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "'nope' is listed in the second case's OR pattern." }],
          feedback: { correct: "Correct! 'nope' matches the 'no' | 'nope' OR pattern → prints 'N'.", incorrect: "'nope' matches case 'no' | 'nope': → prints 'N'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-or-patterns-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.6 — Guard clauses ──────────────────────────────────────── */
    {
      id: "s7-guards",
      stageId: "stage-07",
      title: "Guard Clauses in match",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Add an if guard to a case to impose additional conditions",
        "Combine pattern matching with guard expressions",
        "Understand that a case with a failing guard is skipped even if the pattern matches",
      ],
      prerequisites: [],
      concepts: ["pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Guards: Extra Conditions on a Case\n\nA pattern alone sometimes isn't enough — you need to test additional conditions on the captured values. A **guard** is an `if` expression added after the pattern:\n\n```python\nmatch temperature:\n    case t if t < 0:\n        print(f\"Freezing: {t}°C\")\n    case t if t < 20:\n        print(f\"Cold: {t}°C\")\n    case t if t < 35:\n        print(f\"Comfortable: {t}°C\")\n    case t:\n        print(f\"Hot: {t}°C\")\n```\n\nEach case captures `t` then adds an `if` condition. The case is only entered if BOTH the pattern matches AND the guard is True.\n\n## Guards with Structural Patterns\n\n```python\nmatch point:\n    case (x, y) if x == y:       # pattern matches a 2-tuple AND x equals y\n        print(f\"On diagonal: ({x}, {y})\")\n    case (x, y) if x > 0 and y > 0:\n        print(f\"First quadrant: ({x}, {y})\")\n    case (x, y):\n        print(f\"Point: ({x}, {y})\")\n```\n\n## Why Guards Are Needed\n\nPatterns can only test structure and equality. Guards let you test any Python expression — ranges, membership, function calls:\n\n```python\nmatch user_age:\n    case age if age < 0 or age > 150:\n        print(\"Invalid age\")\n    case age if age < 18:\n        print(f\"Minor: {age}\")\n    case age:\n        print(f\"Adult: {age}\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Pattern Must Match First, Then Guard Is Evaluated",
          body: "Guards are evaluated only if the pattern itself matches. If the pattern doesn't match, Python moves to the next case without evaluating the guard at all.",
        },
      ],
      interactions: [
        {
          id: "s7-guards-predict",
          kind: "predict-output",
          prompt: "What does this print when n = 7?",
          beginnerPurpose: "Trace a case with a guard condition",
          expectedConceptIds: ["pattern-matching"],
          code: "n = 7\nmatch n:\n    case x if x % 2 == 0:\n        print(f\"{x} is even\")\n    case x if x % 2 != 0:\n        print(f\"{x} is odd\")",
          expectedOutput: "7 is odd",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "7 captures to x=7. 7%2=1 ≠ 0 so first guard fails. Second guard: 7%2 != 0 is True." }],
          feedback: { correct: "Correct! x=7, first guard fails (7%2=1≠0), second guard passes.", incorrect: "n=7 → x=7. Guard 1: 7%2==0 is False → skip. Guard 2: 7%2!=0 is True → prints '7 is odd'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-guards-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.7 — Sequence patterns ──────────────────────────────────── */
    {
      id: "s7-sequence-patterns",
      stageId: "stage-07",
      title: "Sequence Patterns",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Match lists and tuples using sequence patterns",
        "Capture individual elements in a sequence pattern",
        "Use *rest to capture variable-length tails",
      ],
      prerequisites: [],
      concepts: ["pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Matching Sequences by Structure\n\nA sequence pattern matches a list or tuple of a specific length and structure. Elements can be literals, wildcards, or captures:\n\n```python\ndef describe_point(point):\n    match point:\n        case []:\n            return \"empty\"\n        case [x]:             # exactly one element, captured as x\n            return f\"1D point: {x}\"\n        case [x, y]:          # exactly two elements\n            return f\"2D point: ({x}, {y})\"\n        case [x, y, z]:       # exactly three elements\n            return f\"3D point: ({x}, {y}, {z})\"\n        case _:\n            return \"too many dimensions\"\n\nprint(describe_point([1, 2]))    # 2D point: (1, 2)\nprint(describe_point([5]))       # 1D point: 5\n```\n\n## Star Pattern for Variable Length\n\nUse `*rest` to capture the tail of a sequence of any length:\n\n```python\nmatch items:\n    case []:\n        print(\"empty\")\n    case [first]:\n        print(f\"single: {first}\")\n    case [first, *rest]:   # first element + any remaining\n        print(f\"head: {first}, tail: {rest}\")\n```\n\n## Matching with Literals Inside Sequences\n\n```python\nmatch command:\n    case ['go', direction]:          # list starting with 'go'\n        print(f\"Moving {direction}\")\n    case ['pick', 'up', item]:       # three-element list\n        print(f\"Picking up {item}\")\n    case ['quit']:\n        print(\"Quitting\")\n    case _:\n        print(\"Unknown command\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Sequence Patterns Work on Lists and Tuples",
          body: "Sequence patterns match any sequence type (list, tuple) but NOT strings or bytes (they are sequences but excluded from this pattern for practical reasons). To match a string character by character, loop or slice instead.",
        },
      ],
      interactions: [
        {
          id: "s7-sequence-patterns-predict",
          kind: "predict-output",
          prompt: "What does this print when cmd = ['go', 'north']?",
          beginnerPurpose: "Trace a sequence pattern matching a list",
          expectedConceptIds: ["pattern-matching"],
          code: "cmd = ['go', 'north']\nmatch cmd:\n    case ['go', direction]:\n        print(f\"Moving {direction}\")\n    case ['stop']:\n        print(\"Stopped\")\n    case _:\n        print(\"Unknown\")",
          expectedOutput: "Moving north",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "['go', 'north'] matches ['go', direction]: first element is 'go' (literal match) and second is captured as direction='north'." }],
          feedback: { correct: "Correct! ['go', 'north'] matches ['go', direction], binding direction='north'.", incorrect: "The list ['go', 'north'] matches ['go', direction]: 'go' matches literally, 'north' is captured. Prints 'Moving north'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-sequence-patterns-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.8 — Mapping patterns ───────────────────────────────────── */
    {
      id: "s7-mapping-patterns",
      stageId: "stage-07",
      title: "Mapping Patterns",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Match dictionaries by key presence and value using mapping patterns",
        "Capture values from specific keys",
        "Use **rest to capture remaining keys",
      ],
      prerequisites: [],
      concepts: ["pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Matching Dictionaries by Key-Value Structure\n\nA mapping pattern matches a dictionary that contains at least the specified keys, with values matching the given sub-patterns:\n\n```python\ndef handle_event(event):\n    match event:\n        case {'type': 'click', 'x': x, 'y': y}:\n            print(f\"Click at ({x}, {y})\")\n        case {'type': 'key', 'key': key}:\n            print(f\"Key pressed: {key}\")\n        case {'type': 'quit'}:\n            print(\"Quit event\")\n        case _:\n            print(f\"Unknown event: {event}\")\n\nhandle_event({'type': 'click', 'x': 100, 'y': 200, 'button': 'left'})\n# Click at (100, 200)  — extra keys ('button') are allowed!\n```\n\n## Extra Keys Are Allowed by Default\n\nA mapping pattern matches if the dictionary has AT LEAST the specified keys — extra keys are ignored. This is unlike sequence patterns which require exact length.\n\n## Capturing Remaining Keys with **rest\n\n```python\nmatch config:\n    case {'host': host, **rest}:    # capture 'host' + all other keys\n        print(f\"Host: {host}, extras: {rest}\")\n```\n\n## Nested Mapping and Sequence Patterns\n\n```python\nmatch message:\n    case {'action': 'create', 'data': {'name': name, 'age': int(age)}}:\n        print(f\"Creating user: {name}, age {age}\")\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Mapping Patterns Are Great for JSON/API Responses",
          body: "Mapping patterns work perfectly for dispatching on dictionary data from JSON APIs. Match on the 'type' or 'action' key while capturing the payload values you need — all in one clean case clause.",
        },
      ],
      interactions: [
        {
          id: "s7-mapping-patterns-mc",
          kind: "multiple-choice",
          prompt: "Does `case {'x': x}:` match `{'x': 1, 'y': 2}`?",
          beginnerPurpose: "Understand that mapping patterns allow extra keys",
          expectedConceptIds: ["pattern-matching"],
          options: [
            { id: "a", text: "No — the pattern requires an exact match with no extra keys", isCorrect: false, explanation: "Mapping patterns do NOT require exact matches. They only check that the specified keys exist with matching values." },
            { id: "b", text: "Yes — mapping patterns match if the specified keys are present", isCorrect: true, explanation: "Correct! Mapping patterns match dicts that have AT LEAST the listed keys. Extra keys like 'y' are allowed." },
            { id: "c", text: "Only if y is None", isCorrect: false, explanation: "The value of 'y' doesn't matter. Mapping patterns ignore extra keys entirely." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Mapping patterns are 'at least these keys' checks, not 'exactly these keys'." }],
          feedback: { correct: "Correct! Mapping patterns allow extra keys. 'x' is present and captured.", incorrect: "Mapping patterns match if the required keys exist. Extra keys are ignored." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-mapping-patterns-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.9 — Class patterns ─────────────────────────────────────── */
    {
      id: "s7-class-patterns",
      stageId: "stage-07",
      title: "Class Patterns",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Match instances of specific classes using class patterns",
        "Capture attribute values with positional and keyword class patterns",
        "Use dataclasses and __match_args__ with class patterns",
      ],
      prerequisites: [],
      concepts: ["pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Matching by Type and Attribute\n\nA class pattern matches an instance of a specific class and optionally checks or captures its attributes:\n\n```python\nfrom dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\n@dataclass\nclass Circle:\n    center: Point\n    radius: float\n\ndef describe_shape(shape):\n    match shape:\n        case Point(x=0, y=0):       # keyword: x must be 0, y must be 0\n            return \"Origin\"\n        case Point(x=x, y=0):       # x captured, y must be 0\n            return f\"On x-axis at {x}\"\n        case Point(x=x, y=y):       # both captured\n            return f\"Point ({x}, {y})\"\n        case Circle(center=Point(x=0, y=0), radius=r):\n            return f\"Circle centered at origin, r={r}\"\n        case _:\n            return \"Unknown shape\"\n\nprint(describe_shape(Point(3, 0)))   # On x-axis at 3\n```\n\n## Positional Class Patterns with __match_args__\n\nDataclasses automatically set `__match_args__` to the field names in order, allowing positional patterns:\n\n```python\n@dataclass\nclass Color:\n    r: int\n    g: int\n    b: int\n\nmatch color:\n    case Color(0, 0, 0):\n        print(\"Black\")\n    case Color(255, 255, 255):\n        print(\"White\")\n    case Color(r, g, b):\n        print(f\"RGB({r}, {g}, {b})\")\n```\n\n## Built-in Class Patterns\n\nSome built-in types support class patterns with captures:\n\n```python\nmatch value:\n    case int(n):     # matches ints, captures value as n\n        print(f\"integer: {n}\")\n    case str(s):     # matches strings\n        print(f\"string: {s}\")\n    case float(f):\n        print(f\"float: {f}\")\n```",
        },
        {
          kind: "why-matters",
          body: "Class patterns make match/case useful for object-oriented dispatch — routing different message types to different handlers, processing heterogeneous collections, and implementing visitor patterns cleanly.",
        },
      ],
      interactions: [
        {
          id: "s7-class-patterns-mc",
          kind: "multiple-choice",
          prompt: "What does `__match_args__` enable in dataclasses?",
          beginnerPurpose: "Understand positional class pattern matching",
          expectedConceptIds: ["pattern-matching"],
          options: [
            { id: "a", text: "Positional pattern matching without keyword names", isCorrect: true, explanation: "Correct! __match_args__ defines the order of attributes for positional patterns. Dataclasses set this automatically." },
            { id: "b", text: "Faster attribute access", isCorrect: false, explanation: "__match_args__ is solely for pattern matching, not for attribute access performance." },
            { id: "c", text: "Automatic string conversion", isCorrect: false, explanation: "__match_args__ defines the field order for positional class patterns in match statements." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "__match_args__ tells match which attribute corresponds to which positional slot." }],
          feedback: { correct: "Correct! __match_args__ enables positional syntax like `case Point(x, y):` instead of `case Point(x=x, y=y):`.", incorrect: "__match_args__ maps positional slots to attribute names, enabling shorter positional class patterns." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-class-patterns-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.10 — Nested patterns ───────────────────────────────────── */
    {
      id: "s7-nested-patterns",
      stageId: "stage-07",
      title: "Nested Patterns",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Compose patterns within patterns to match complex nested structures",
        "Match lists of dicts, tuples inside dicts, and class instances inside sequences",
        "Evaluate whether a nested match is clearer than equivalent if/isinstance checks",
      ],
      prerequisites: [],
      concepts: ["pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Patterns Can Contain Other Patterns\n\nAll pattern types can be composed — a sequence pattern can contain class patterns, mapping patterns can contain sequence patterns, and so on:\n\n```python\n# Match a list where each item is a dict with a 'type' key:\nmatch items:\n    case [{'type': 'user', 'name': name}, *rest]:\n        print(f\"First item is user: {name}, then {len(rest)} more items\")\n    case [{'type': 'admin'}, *_]:\n        print(\"First item is an admin\")\n    case []:\n        print(\"Empty list\")\n```\n\n## Nested Sequence in Mapping\n\n```python\nmatch data:\n    case {'points': [first, *rest], 'label': label}:\n        print(f\"Label: {label}, first point: {first}\")\n        print(f\"{len(rest)} more points\")\n```\n\n## Practical: Protocol Message Router\n\n```python\ndef route(message):\n    match message:\n        case {'op': 'read', 'path': str(path)}:\n            return read_file(path)\n        case {'op': 'write', 'path': str(path), 'data': bytes(data)}:\n            return write_file(path, data)\n        case {'op': 'delete', 'path': str(path)} if path.startswith('/safe/'):\n            return delete_file(path)\n        case {'op': op}:\n            return f\"Unknown operation: {op}\"\n        case _:\n            return \"Malformed message\"\n```\n\n## Readability Limit\n\nNested patterns become hard to read beyond 2–3 levels. If a match statement feels like a puzzle, consider breaking it into separate match statements or helper functions.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Test Nested Patterns Incrementally",
          body: "When building complex nested patterns, test each level in isolation first. Confirm the outer structure matches, then add inner patterns one at a time. This prevents debugging a pattern that's wrong in an invisible inner part.",
        },
      ],
      interactions: [
        {
          id: "s7-nested-patterns-mc",
          kind: "multiple-choice",
          prompt: "Which structure does `case [{'id': n}, *_]:` match?",
          beginnerPurpose: "Read a nested sequence+mapping pattern",
          expectedConceptIds: ["pattern-matching"],
          options: [
            { id: "a", text: "A list where the first element is a dict with an 'id' key", isCorrect: true, explanation: "Correct! The sequence pattern requires a list. The first element must be a mapping with at least an 'id' key (captured as n). *_ ignores the rest." },
            { id: "b", text: "Any dict with an 'id' key", isCorrect: false, explanation: "The outer pattern is a sequence (list), not a mapping. It matches a LIST whose first element is a dict with 'id'." },
            { id: "c", text: "A list of any length with no specific structure", isCorrect: false, explanation: "The first element is specifically required to be a dict with an 'id' key." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The outer [] is a sequence pattern. Inside, {id: n} is a mapping pattern. *_ ignores remaining elements." }],
          feedback: { correct: "Correct! A list whose first element is a dict containing 'id'.", incorrect: "Outer []: list pattern. First element {'id': n}: dict pattern. *_: any remaining list items." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-nested-patterns-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.11 — Pattern matching vs if/elif ────────────────────────── */
    {
      id: "s7-match-vs-if",
      stageId: "stage-07",
      title: "Pattern Matching vs if / elif",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Identify when match/case is clearer than if/elif",
        "Recognize the limitations of match vs if",
        "Make informed choices between the two approaches",
      ],
      prerequisites: [],
      concepts: ["match-statement", "pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Choosing Between match and if/elif\n\nBoth match/case and if/elif can express conditional logic. The right choice depends on what you're testing.\n\n## When match/case Is Better\n\n```python\n# Dispatching on shape of data — match shines:\nmatch event:\n    case {'type': 'click', 'x': x, 'y': y}:\n        handle_click(x, y)\n    case {'type': 'key', 'key': k}:\n        handle_key(k)\n    case {'type': 'quit'}:\n        quit()\n\n# Equivalent if/elif is more verbose and less safe:\nif event.get('type') == 'click':\n    x, y = event.get('x'), event.get('y')\n    handle_click(x, y)\nelif event.get('type') == 'key':\n    handle_key(event.get('key'))\nelif event.get('type') == 'quit':\n    quit()\n```\n\n## When if/elif Is Better\n\n```python\n# Range checks — if/elif is cleaner:\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\n\n# match version is more verbose for ranges:\nmatch score:\n    case s if s >= 90:\n        grade = 'A'\n    case s if s >= 80:\n        grade = 'B'\n    # (guard-only cases lose the structural benefit)\n```\n\n## Summary\n\n| Use match when | Use if/elif when |\n|----------------|------------------|\n| Dispatching on data structure/type | Range comparisons |\n| Multiple keys to extract simultaneously | Simple boolean conditions |\n| Nested data with complex shape | Short chains (2-3 cases) |\n| Python 3.10+ is guaranteed | Python < 3.10 must be supported |",
        },
        {
          kind: "why-matters",
          body: "Neither construct is universally better. match/case adds real value when the shape or type of the data determines the action. if/elif remains clearer for numeric comparisons, range checks, and simple boolean conditions.",
        },
      ],
      interactions: [
        {
          id: "s7-match-vs-if-mc",
          kind: "multiple-choice",
          prompt: "For which task is match/case MOST advantageous over if/elif?",
          beginnerPurpose: "Identify the primary use case for match/case",
          expectedConceptIds: ["match-statement"],
          options: [
            { id: "a", text: "Checking if a number is greater than 100", isCorrect: false, explanation: "Simple numeric comparisons work fine with if/elif. match adds no structural benefit here." },
            { id: "b", text: "Dispatching on the type and structure of a dictionary from an API", isCorrect: true, explanation: "Correct! Mapping patterns let you match on key presence and capture values simultaneously — something if/elif cannot do as cleanly." },
            { id: "c", text: "Validating that a string is not empty", isCorrect: false, explanation: "Simple truthiness checks work naturally with if. match doesn't help here." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "match/case adds the most value when structure (type, keys, length) drives the dispatch." }],
          feedback: { correct: "Correct! Structural dispatch on dicts is exactly where match shines.", incorrect: "match/case is most powerful for structural dispatch: matching on shapes, types, and key presence." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-match-vs-if-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.12 — Command parser exercise ────────────────────────────── */
    {
      id: "s7-command-parser",
      stageId: "stage-07",
      title: "Command Parser Exercise",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Build a text command parser using sequence and literal patterns",
        "Handle variable-length command arguments with *rest",
        "Provide helpful error messages for unrecognized commands",
      ],
      prerequisites: [],
      concepts: ["match-statement", "pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Building a Command Parser with match\n\nText-based command parsers are a natural fit for match/case. Commands typically have a verb followed by arguments:\n\n```python\ndef parse_command(text):\n    parts = text.strip().split()\n    \n    match parts:\n        case []:\n            return \"Empty command\"\n        case ['quit'] | ['exit'] | ['q']:\n            return \"quit\"\n        case ['help']:\n            return \"Available: quit, go <dir>, pick <item>, drop <item>\"\n        case ['go', direction]:\n            return f\"move:{direction}\"\n        case ['go']:\n            return \"Error: 'go' requires a direction\"\n        case ['pick', 'up', item] | ['pick', item]:\n            return f\"pickup:{item}\"\n        case ['drop', item]:\n            return f\"drop:{item}\"\n        case ['look', *_]:\n            return \"look\"\n        case [verb, *_]:\n            return f\"Error: unknown command '{verb}'\"\n\n# Test:\nprint(parse_command(\"go north\"))        # move:north\nprint(parse_command(\"pick up sword\"))   # pickup:sword\nprint(parse_command(\"fly\"))             # Error: unknown command 'fly'\nprint(parse_command(\"\"))                # Empty command\n```\n\n## Handling Quoted Arguments\n\nFor more complex parsers, shlex.split() handles quoted strings:\n\n```python\nimport shlex\n\ntext = 'say \"Hello World\" loudly'\nparts = shlex.split(text)   # ['say', 'Hello World', 'loudly']\nmatch parts:\n    case ['say', message, *modifiers]:\n        print(f\"Message: {message}, modifiers: {modifiers}\")\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "split() Before match",
          body: "The pattern `text.strip().split()` converts a command string into a list, which sequence patterns can then match. This split-then-match approach is the standard way to parse text commands.",
        },
      ],
      interactions: [
        {
          id: "s7-command-parser-mc",
          kind: "multiple-choice",
          prompt: "In `case ['go', direction]:`, what happens when the input is `['go', 'north', 'fast']`?",
          beginnerPurpose: "Understand exact-length sequence matching",
          expectedConceptIds: ["pattern-matching"],
          options: [
            { id: "a", text: "Matches — direction = 'north', 'fast' is ignored", isCorrect: false, explanation: "Sequence patterns require EXACT length (without *). ['go', direction] only matches a 2-element list." },
            { id: "b", text: "Does not match — the list has 3 elements, pattern expects 2", isCorrect: true, explanation: "Correct! case ['go', direction]: matches only 2-element lists. ['go', 'north', 'fast'] has 3 elements, so it doesn't match." },
            { id: "c", text: "Raises IndexError", isCorrect: false, explanation: "Pattern matching doesn't raise IndexError — a non-matching pattern simply moves to the next case." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Sequence patterns (without *) require exact length. ['go', direction] needs exactly 2 elements." }],
          feedback: { correct: "Correct! Without *, sequence patterns require exact length. Use ['go', direction, *_] to allow extras.", incorrect: "Sequence patterns match exact length by default. 3 elements won't match a 2-element pattern." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-command-parser-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.13 — Data classifier exercise ───────────────────────────── */
    {
      id: "s7-data-classifier",
      stageId: "stage-07",
      title: "Data Classifier Exercise",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Use class patterns to dispatch on the type of a value",
        "Combine class patterns with guards to classify by type AND value",
        "Build a flexible data classifier for heterogeneous collections",
      ],
      prerequisites: [],
      concepts: ["pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Classifying Heterogeneous Data\n\nmatch/case with class patterns provides clean type dispatch — replacing chains of `isinstance()` checks:\n\n```python\ndef classify(value):\n    match value:\n        case None:\n            return \"null\"\n        case bool(b):            # bool before int — bool is subclass of int!\n            return f\"boolean: {b}\"\n        case int(n) if n < 0:\n            return f\"negative integer: {n}\"\n        case int(n) if n == 0:\n            return \"zero\"\n        case int(n):\n            return f\"positive integer: {n}\"\n        case float(f) if f != f:  # NaN check: NaN != NaN\n            return \"NaN (not a number)\"\n        case float(f):\n            return f\"float: {f}\"\n        case str(s) if len(s) == 0:\n            return \"empty string\"\n        case str(s):\n            return f\"string: '{s}' ({len(s)} chars)\"\n        case list(items):\n            return f\"list with {len(items)} items\"\n        case dict(d):\n            return f\"dict with {len(d)} keys\"\n        case _:\n            return f\"other: {type(value).__name__}\"\n\nfor v in [None, True, -5, 0, 42, 3.14, float('nan'), '', 'hello', [1,2], {'a':1}]:\n    print(f\"{v!r:15} → {classify(v)}\")\n```\n\n## Comparing to isinstance Chain\n\n```python\n# if/isinstance version — verbose:\nif value is None:\n    result = \"null\"\nelif isinstance(value, bool):   # must check bool before int!\n    result = f\"boolean: {value}\"\nelif isinstance(value, int) and value < 0:\n    result = f\"negative integer: {value}\"\n# ...\n```\n\nThe match version is more concise and its structure makes the intent clearer.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Always Put bool Cases Before int Cases",
          body: "bool is a subclass of int. If you put int(n) before bool(b) in a match, True and False will match the integer pattern. Always order bool before int in data classifiers.",
        },
      ],
      interactions: [
        {
          id: "s7-data-classifier-mc",
          kind: "multiple-choice",
          prompt: "Why must `case bool(b):` appear before `case int(n):` in a type classifier?",
          beginnerPurpose: "Understand why bool must precede int in match/case",
          expectedConceptIds: ["pattern-matching"],
          options: [
            { id: "a", text: "Because bool values are less common than ints", isCorrect: false, explanation: "Frequency has nothing to do with pattern ordering. Order matters because of type hierarchy." },
            { id: "b", text: "Because bool is a subclass of int — True and False would match int(n) first", isCorrect: true, explanation: "Correct! bool is a subclass of int. int(n) would match True and False if it came first, since they are ints. bool(b) must come first to capture them as booleans." },
            { id: "c", text: "Because bool values cannot be captured by int(n)", isCorrect: false, explanation: "bool values CAN be captured by int(n) — that's exactly the problem. True → n=1, False → n=0." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "In Python, isinstance(True, int) is True. So True matches int() patterns." }],
          feedback: { correct: "Correct! bool is a subclass of int — bool cases must come first.", incorrect: "bool is a subclass of int. True/False match int(n) patterns. Put bool(b) first to handle them correctly." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-data-classifier-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 7.14 — Message router exercise ────────────────────────────── */
    {
      id: "s7-message-router",
      stageId: "stage-07",
      title: "Message Router Exercise",
      kind: "practice",
      difficulty: "advanced",
      objectives: [
        "Build a message router using mapping and class patterns",
        "Combine nested patterns with guards for complex routing logic",
        "Return structured responses from pattern-matched handlers",
      ],
      prerequisites: [],
      concepts: ["match-statement", "pattern-matching"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## A Complete Message Router\n\nMessage routers are one of the most common use cases for structural pattern matching. They dispatch JSON-like messages to handlers based on structure:\n\n```python\nfrom dataclasses import dataclass\nfrom typing import Any\n\n@dataclass\nclass Response:\n    status: int\n    body: Any\n\ndef route(message: dict) -> Response:\n    match message:\n        # Authentication\n        case {'action': 'login', 'user': str(user), 'pass': str(pwd)}:\n            if authenticate(user, pwd):\n                return Response(200, {'token': generate_token(user)})\n            return Response(401, {'error': 'Invalid credentials'})\n        \n        # Read operations\n        case {'action': 'get', 'resource': str(resource), 'id': int(id_)}:\n            data = fetch(resource, id_)\n            if data is None:\n                return Response(404, {'error': f'{resource} {id_} not found'})\n            return Response(200, data)\n        \n        # Create operations  \n        case {'action': 'create', 'resource': str(resource), 'data': dict(data)}:\n            created = create(resource, data)\n            return Response(201, created)\n        \n        # Admin operations with guard\n        case {'action': str(action), 'admin': True} if action in ADMIN_ACTIONS:\n            return handle_admin(action, message)\n        \n        # Unknown action\n        case {'action': str(action)}:\n            return Response(400, {'error': f'Unknown action: {action}'})\n        \n        # Malformed message\n        case _:\n            return Response(400, {'error': 'Malformed message — missing action'})\n```\n\n## Why This Beats if/elif\n\n1. Each case simultaneously validates structure AND extracts data\n2. The pattern is self-documenting — you see the expected shape at a glance\n3. Guards add business rules without nested if statements\n4. Exhaustive handling is visible — every case has a clear role",
        },
        {
          kind: "why-matters",
          body: "Message routing is ubiquitous in real software: REST API handlers, event-driven systems, chatbot command processors, and protocol parsers all dispatch on message structure. Structural pattern matching makes these routers concise and readable — a real advantage over chains of isinstance and dict.get().",
        },
      ],
      interactions: [
        {
          id: "s7-message-router-mc",
          kind: "multiple-choice",
          prompt: "What advantage does `case {'action': 'get', 'id': int(id_)}:` have over `if msg['action'] == 'get' and isinstance(msg.get('id'), int):`?",
          beginnerPurpose: "Articulate the structural advantage of mapping patterns",
          expectedConceptIds: ["match-statement"],
          options: [
            { id: "a", text: "The pattern simultaneously validates presence, type, and captures in one expression", isCorrect: true, explanation: "Correct! The case simultaneously checks that 'action' exists and equals 'get', that 'id' exists and is an int, and captures the int value as id_ — all at once." },
            { id: "b", text: "The pattern is faster at runtime", isCorrect: false, explanation: "match/case is not significantly faster — the advantage is readability and correctness, not speed." },
            { id: "c", text: "The pattern works without importing isinstance", isCorrect: false, explanation: "This is a minor incidental benefit, not the primary advantage. The main benefit is the combined validation and capture." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The pattern does three things at once: presence check, type check, and value capture." }],
          feedback: { correct: "Correct! One pattern replaces separate presence, type, and value checks.", incorrect: "The main advantage: the pattern validates key presence, checks the type (int), and captures the value — all simultaneously." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s7-message-router-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s7-project",
    stageId: "stage-07",
    title: "Structural Pattern Matching Application",
    brief:
      "Build a text adventure game engine or API message router that uses all major pattern types: literal patterns for commands, sequence patterns for structured commands, mapping patterns for JSON-like messages, OR patterns for synonyms, guards for business rules, and nested patterns for complex data.",
    requirements: [
      "At least 5 distinct match/case handlers",
      "Use of literal, sequence, and mapping patterns",
      "At least one OR pattern (|) and one guard (if condition)",
      "Wildcard _ as the final fallback case",
      "Informative error messages for unrecognized inputs",
    ],
    acceptanceCriteria: [
      "All pattern types (literal, sequence, mapping, OR, guard) present and working",
      "No unhandled cases — wildcard ensures graceful handling of unexpected input",
      "Guards correctly restrict cases that would otherwise over-match",
      "Code compares favorably to an equivalent if/elif implementation in readability",
    ],
    conceptIds: ["match-statement", "pattern-matching"],
    difficulty: "intermediate",
  },
} satisfies Stage;
