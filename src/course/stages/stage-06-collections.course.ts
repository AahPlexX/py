import type { Stage } from "@/course/course.schema";

export const stage06 = {
  id: "stage-06",
  number: 6,
  title: "Control Flow",
  summary:
    "Master Python control flow: if/elif/else, guard clauses, while loops, for loops, range(), break, continue, loop else, pass, nested loops, and practical patterns including search loops, validation loops, and menu-driven programs.",
  level: "beginner",
  masteryGateConceptIds: ["if-statement", "while-loop", "for-loop", "loop-control"],

  lessons: [
    /* ── Lesson 6.1 — if statement structure ────────────────────────────── */
    {
      id: "s6-if-structure",
      stageId: "stage-06",
      title: "if Statement Structure",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write a syntactically correct if statement",
        "Identify the condition, the colon, and the indented body",
        "Explain that the body runs only when the condition is truthy",
      ],
      prerequisites: [],
      concepts: ["if-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem: Programs That Always Do the Same Thing\n\nWithout any way to make decisions, a program does the exact same thing every time it runs, regardless of its inputs. A calculator that always prints `42`, a game that always says 'you win', or a login system that never checks the password — all are useless for the same reason: they can't adapt to conditions.\n\n## The if Statement\n\nThe `if` keyword introduces a **conditional block**: a group of lines that Python executes only when a given condition is true.\n\nThe structure has three required parts:\n1. The keyword `if`\n2. A condition (any expression that evaluates to truthy or falsy)\n3. A colon `:` immediately after the condition\n4. An indented body (one or more statements, all indented by the same amount)\n\n```python\ntemperature = 38\n\nif temperature > 37:        # condition: is temperature above 37?\n    print(\"Fever detected\")  # body: runs only when condition is True\n    print(\"See a doctor\")    # also part of the body (same indent)\n\nprint(\"Check complete\")     # NOT part of the if body (no indent)\n```\n\nWhen `temperature = 38`:\n- `38 > 37` is `True` → the indented body runs → both fever messages print\n- `\"Check complete\"` is outside the block so it always prints\n\nWhen `temperature = 36`:\n- `36 > 37` is `False` → the indented body is skipped entirely\n- `\"Check complete\"` still prints (it's outside the block)",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "The Colon Is Required",
          body: "Forgetting the colon after the condition is the most common if-statement syntax error. `if x > 0` without a colon is a SyntaxError. Python uses the colon to signal that an indented block follows.",
        },
        {
          kind: "mental-model",
          title: "if as a Gate",
          analogy: "An if statement is a gate on a path. When the gate is open (condition is True), execution walks through and runs the indented code. When the gate is closed (condition is False), execution jumps over the entire block and continues on the other side.",
          explanation: "The key insight is that indentation defines what's inside the gate. Lines at the same indentation level as 'if' are always reached — they're before or after the gate, not inside it.",
        },
        {
          kind: "why-matters",
          body: "Every meaningful program makes decisions. Login systems check credentials. Games check scores. Medical tools check vital signs. The if statement is the foundation of all conditional logic in Python.",
        },
      ],
      interactions: [
        {
          id: "s6-if-structure-predict",
          kind: "predict-output",
          prompt: "What does this print when score = 45?",
          beginnerPurpose: "Trace which lines are inside the if body vs outside",
          expectedConceptIds: ["if-statement"],
          code: "score = 45\nif score >= 50:\n    print(\"Passed\")\n    print(\"Well done\")\nprint(\"Result processed\")",
          expectedOutput: "Result processed",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "45 >= 50 is False. The indented body is skipped. The non-indented print always runs." }],
          feedback: { correct: "Correct! 45 < 50 so the condition is False and the indented block is skipped. Only the last print runs.", incorrect: "45 >= 50 is False, so both indented prints are skipped. Only 'Result processed' (outside the block) prints." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-if-structure-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.2 — Indented blocks ───────────────────────────────────── */
    {
      id: "s6-indented-blocks",
      stageId: "stage-06",
      title: "Indented Blocks",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Explain that Python uses indentation (not braces) to define code blocks",
        "Use consistent 4-space indentation",
        "Identify IndentationError and how to fix it",
      ],
      prerequisites: [],
      concepts: ["if-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Indentation Is Python's Block Syntax\n\nMost programming languages use symbols like `{}` or `begin/end` to mark where a block starts and stops. Python uses **indentation** — the whitespace at the beginning of a line — to define blocks. This is not optional: it is part of the language syntax.\n\n```python\n# Correct: consistent 4-space indentation\nif True:\n    print(\"line 1\")   # 4 spaces\n    print(\"line 2\")   # 4 spaces — same block\nprint(\"outside\")       # 0 spaces — outside block\n```\n\n## Rules for Python Indentation\n\n1. All lines in the same block must have **exactly the same indentation**\n2. The standard is **4 spaces** per level (set up your editor to insert 4 spaces when you press Tab)\n3. Never mix tabs and spaces — it causes `TabError`\n\n```python\n# Wrong — inconsistent indentation:\nif True:\n    print(\"4 spaces\")     # 4 spaces\n      print(\"6 spaces\")   # IndentationError!\n```\n\n## Nested Blocks: More Indentation\n\nEach level of nesting adds another level of indentation:\n\n```python\nif x > 0:              # level 1: 0 spaces\n    if x > 10:         # level 2: 4 spaces\n        print(\"big\")   # level 3: 8 spaces\n    print(\"positive\")  # level 2: 4 spaces\nprint(\"done\")          # level 1: 0 spaces\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Configure Your Editor for 4 Spaces",
          body: "Set your editor to insert 4 spaces when you press Tab (not a literal tab character). Mixed tabs and spaces are invisible to the eye but cause TabError in Python. Most Python editors (VS Code, PyCharm) handle this automatically.",
        },
      ],
      interactions: [
        {
          id: "s6-indented-blocks-mc",
          kind: "multiple-choice",
          prompt: "Which error does Python raise for inconsistent indentation within a block?",
          beginnerPurpose: "Know how Python reports indentation problems",
          expectedConceptIds: ["if-statement"],
          options: [
            { id: "a", text: "SyntaxError", isCorrect: false, explanation: "SyntaxError covers many issues. Indentation-specific errors are reported as IndentationError." },
            { id: "b", text: "IndentationError", isCorrect: true, explanation: "Correct! Python raises IndentationError when lines in the same block have different amounts of leading whitespace." },
            { id: "c", text: "TabError", isCorrect: false, explanation: "TabError is specifically for mixed tabs and spaces. Inconsistent spacing (all spaces but different counts) is IndentationError." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The error name directly describes the problem: Indentation + Error." }],
          feedback: { correct: "Correct! IndentationError is raised when block lines don't align consistently.", incorrect: "Python reports IndentationError for inconsistent indentation within a block." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-indented-blocks-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.3 — if / else ──────────────────────────────────────────── */
    {
      id: "s6-if-else",
      stageId: "stage-06",
      title: "if / else",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Add an else clause to handle the case when the condition is False",
        "Explain that exactly one branch always executes in an if/else",
        "Write programs that choose between two paths",
      ],
      prerequisites: [],
      concepts: ["if-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Need for a Two-Way Branch\n\nAn `if` alone only handles one case — what to do when the condition is True. But most decisions have two sides: what to do when it's True, AND what to do when it's False. Without a way to specify the second path, you need a second `if` with the opposite condition, which is clunky and error-prone.\n\n## else: The Other Path\n\n`else` provides the alternative branch. It runs when the `if` condition is `False`. The structure guarantees exactly one branch always runs:\n\n```python\npassword = input(\"Password: \")\n\nif password == \"secret123\":   # condition\n    print(\"Access granted\")   # runs when True\nelse:                          # alternative — no condition needed\n    print(\"Access denied\")    # runs when False\n```\n\nThe `else` never has its own condition — it is the catch-all for \"everything that didn't match the if\".\n\n## Exactly One Branch Runs\n\nWith `if/else`, the program always takes exactly one path:\n\n```python\ntemperature = 25\n\nif temperature > 30:\n    print(\"Too hot\")    # temperature is 25, so this is skipped\nelse:\n    print(\"Comfortable\") # this runs\n\n# Both branches cannot run simultaneously\n```\n\n## The else Block Has the Same Indentation Rules\n\n```python\nif score >= 60:\n    print(\"Passed\")    # 4 spaces\n    print(\"Great job\") # 4 spaces\nelse:                   # same level as 'if'\n    print(\"Failed\")    # 4 spaces\n    print(\"Try again\") # 4 spaces\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "else Has No Condition",
          body: "Writing `else x > 0:` is a SyntaxError. else means 'in all other cases' — it doesn't need (and can't have) its own condition. If you need a second condition, use elif (covered next).",
        },
      ],
      interactions: [
        {
          id: "s6-if-else-predict",
          kind: "predict-output",
          prompt: "What does this print when age = 16?",
          beginnerPurpose: "Trace an if/else to confirm exactly one branch runs",
          expectedConceptIds: ["if-statement"],
          code: "age = 16\nif age >= 18:\n    print(\"Adult\")\n    print(\"Can vote\")\nelse:\n    print(\"Minor\")\n    print(\"Cannot vote\")\nprint(\"Check done\")",
          expectedOutput: "Minor\nCannot vote\nCheck done",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "16 >= 18 is False → else branch runs. Then 'Check done' is outside both branches." }],
          feedback: { correct: "Correct! 16 < 18 → else branch. Both else lines print. 'Check done' always prints.", incorrect: "16 >= 18 is False, so the else block runs: 'Minor' then 'Cannot vote'. 'Check done' is outside and always runs." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-if-else-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.4 — if / elif / else ──────────────────────────────────── */
    {
      id: "s6-if-elif-else",
      stageId: "stage-06",
      title: "if / elif / else",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use elif to test additional conditions in a chain",
        "Explain that Python stops at the first matching condition",
        "Order elif clauses correctly to avoid logic errors",
      ],
      prerequisites: [],
      concepts: ["if-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Beyond Two Choices\n\nSome decisions have more than two possibilities: a grade might be A, B, C, D, or F; a traffic light is red, yellow, or green; a menu has five options. An if/else handles only two cases. For three or more, you need `elif`.\n\n## elif: Else-If\n\n`elif` (short for 'else if') adds another condition to check. Python evaluates conditions from top to bottom and runs the **first** block whose condition is True, then skips all remaining branches:\n\n```python\ngrade = 78\n\nif grade >= 90:\n    print(\"A\")\nelif grade >= 80:    # checked only if grade < 90\n    print(\"B\")\nelif grade >= 70:    # checked only if grade < 80\n    print(\"C\")\nelif grade >= 60:    # checked only if grade < 70\n    print(\"D\")\nelse:               # catches everything else (grade < 60)\n    print(\"F\")\n```\n\nFor `grade = 78`: `78 >= 90`? No. `78 >= 80`? No. `78 >= 70`? **Yes** → prints 'C' → done.\n\n## Order Matters\n\nBecause Python stops at the first match, the order of elif clauses is critical:\n\n```python\n# WRONG — every grade from 70 upward gets 'C' because >= 70 matches first\nif grade >= 70:\n    print(\"C\")     # matches 70, 71, ..., 89, 90, 91...\nelif grade >= 80:\n    print(\"B\")     # never reached for grades >= 70!\n```\n\nAlways order from most restrictive to least restrictive.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "elif vs Separate if Statements",
          body: "With elif chains, only ONE branch runs no matter what. With separate if statements, multiple branches can run independently. Use elif when the choices are mutually exclusive (only one should happen).",
        },
      ],
      interactions: [
        {
          id: "s6-if-elif-else-predict",
          kind: "predict-output",
          prompt: "What does this print when n = 0?",
          beginnerPurpose: "Trace an elif chain with zero as the edge case",
          expectedConceptIds: ["if-statement"],
          code: "n = 0\nif n > 0:\n    print(\"positive\")\nelif n < 0:\n    print(\"negative\")\nelse:\n    print(\"zero\")",
          expectedOutput: "zero",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "0 > 0 is False. 0 < 0 is False. The else branch catches everything else." }],
          feedback: { correct: "Correct! 0 satisfies neither n>0 nor n<0, so else runs.", incorrect: "0 is not > 0 and not < 0. The else branch catches this case and prints 'zero'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-if-elif-else-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.5 — Nested conditionals ───────────────────────────────── */
    {
      id: "s6-nested-conditionals",
      stageId: "stage-06",
      title: "Nested Conditionals",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write an if statement inside another if block",
        "Read nested indentation to determine which code belongs to which block",
        "Recognize when nesting vs elif is the right tool",
      ],
      prerequisites: [],
      concepts: ["if-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Nesting: Decisions Inside Decisions\n\nSometimes a decision depends on the result of another decision. You can place an `if` statement inside another `if` block — this is called **nesting**:\n\n```python\nage = 20\nhas_id = True\n\nif age >= 18:             # outer if\n    print(\"Old enough\")   # runs first if age >= 18\n    if has_id:            # inner if — only reached if outer was True\n        print(\"Enter\")\n    else:\n        print(\"No ID — cannot enter\")\nelse:\n    print(\"Too young\")\n```\n\nTrace for age=20, has_id=True:\n1. `20 >= 18` → True → prints \"Old enough\"\n2. Inside that block: `has_id` → True → prints \"Enter\"\n\nTrace for age=20, has_id=False:\n1. `20 >= 18` → True → prints \"Old enough\"\n2. Inside that block: `has_id` → False → else → prints \"No ID — cannot enter\"\n\n## Indentation Shows the Structure\n\n```python\nif A:         # 0 spaces\n    if B:     # 4 spaces — inside A\n        ...   # 8 spaces — inside B (and inside A)\n    else:     # 4 spaces — paired with inner if B\n        ...   # 8 spaces\nelse:         # 0 spaces — paired with outer if A\n    ...\n```\n\n## When to Nest vs elif\n\nNesting creates a tree of decisions (each branch can diverge further). `elif` creates a flat list of mutually exclusive alternatives. Use nesting when the inner check only makes sense after the outer check passes.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Limit Nesting Depth",
          body: "Deeply nested code (3+ levels) becomes hard to read. If you find yourself nesting more than two levels deep, consider extracting the inner logic into a function or using guard clauses (covered next).",
        },
      ],
      interactions: [
        {
          id: "s6-nested-conditionals-predict",
          kind: "predict-output",
          prompt: "What does this print when x = 5, y = 3?",
          beginnerPurpose: "Trace nested if statements at two levels",
          expectedConceptIds: ["if-statement"],
          code: "x = 5\ny = 3\nif x > 0:\n    if y > 0:\n        print(\"both positive\")\n    else:\n        print(\"x positive, y not\")\nelse:\n    print(\"x not positive\")",
          expectedOutput: "both positive",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "x=5 > 0 → True. y=3 > 0 → True. Inner block runs." }],
          feedback: { correct: "Correct! Both conditions are True so the innermost block runs.", incorrect: "x>0 (True) → enters outer block. y>0 (True) → prints 'both positive'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-nested-conditionals-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.6 — Guard clauses ─────────────────────────────────────── */
    {
      id: "s6-guard-clauses",
      stageId: "stage-06",
      title: "Guard Clauses",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use early return or early exit to handle invalid cases first",
        "Reduce nesting by converting nested ifs into guard clauses",
        "Explain why guard clauses improve readability",
      ],
      prerequisites: [],
      concepts: ["if-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem with Deep Nesting\n\nDeep nesting pushes the 'happy path' (the main logic) far to the right and makes code hard to follow:\n\n```python\n# Hard to read — three levels of nesting:\ndef process(user, data):\n    if user is not None:\n        if user.is_active:\n            if data is not None:\n                # finally, the real work\n                return data.process()\n```\n\n## Guard Clauses: Exit Early on Bad Input\n\nA **guard clause** checks for an invalid condition at the top of the function and returns/exits immediately, leaving the main logic unindented:\n\n```python\n# Easy to read — guard clauses eliminate nesting:\ndef process(user, data):\n    if user is None:\n        return None          # guard: bail out immediately\n    if not user.is_active:\n        return None          # guard: bail out\n    if data is None:\n        return None          # guard: bail out\n    \n    # Happy path — no nesting:\n    return data.process()\n```\n\n## Guards in Scripts (Without Functions)\n\nIn scripts, you can use `sys.exit()` or `break` as the guard escape:\n\n```python\nimport sys\n\nfilename = input(\"Enter filename: \").strip()\nif not filename:\n    print(\"Error: filename cannot be empty\")\n    sys.exit(1)   # exit script with error code\n\n# Main logic starts here, no extra nesting:\nprint(f\"Processing {filename}\")\n```\n\n## The Rule of Guard Clauses\n\nHandle errors/edge cases **first**, **briefly**, and **exit early**. Let the main logic flow without nesting.",
        },
        {
          kind: "why-matters",
          body: "Guard clauses are considered a best practice in professional Python (and all languages). They make functions easier to understand by separating error handling from the main logic, and they reduce the nesting that makes code hard to follow.",
        },
      ],
      interactions: [
        {
          id: "s6-guard-clauses-mc",
          kind: "multiple-choice",
          prompt: "What is the main benefit of guard clauses over deeply nested if statements?",
          beginnerPurpose: "Understand the readability motivation for guard clauses",
          expectedConceptIds: ["if-statement"],
          options: [
            { id: "a", text: "They run faster", isCorrect: false, explanation: "Guard clauses are not a performance optimization — they are a readability improvement." },
            { id: "b", text: "They reduce nesting and keep the main logic unindented", isCorrect: true, explanation: "Correct! Guard clauses exit early on bad conditions, so the main (happy-path) logic sits at the top level without nesting." },
            { id: "c", text: "They catch more errors", isCorrect: false, explanation: "Guard clauses don't catch more errors — they handle the same errors more readably." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Guard clauses are about code structure and readability, not correctness or speed." }],
          feedback: { correct: "Correct! Guard clauses reduce nesting by exiting early on invalid conditions.", incorrect: "Guard clauses improve readability by exiting early, keeping the happy path unindented." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-guard-clauses-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.7 — Condition simplification ───────────────────────────── */
    {
      id: "s6-condition-simplification",
      stageId: "stage-06",
      title: "Condition Simplification",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Simplify redundant bool comparisons (e.g., `if x == True` → `if x`)",
        "Apply De Morgan's laws to simplify negated conditions",
        "Remove unnecessary else after a return",
      ],
      prerequisites: [],
      concepts: ["if-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Common Simplifiable Patterns\n\n### 1. Don't Compare to True/False Explicitly\n\n```python\n# Verbose:\nif is_valid == True:\n    ...\nif is_valid == False:\n    ...\n\n# Simplified:\nif is_valid:\n    ...\nif not is_valid:\n    ...\n```\n\n### 2. Don't Return True/False from an if/else\n\n```python\n# Verbose:\ndef is_positive(n):\n    if n > 0:\n        return True\n    else:\n        return False\n\n# Simplified — the comparison IS the boolean:\ndef is_positive(n):\n    return n > 0\n```\n\n### 3. De Morgan's Laws\n\nnot (A and B) == (not A) or (not B)\nnot (A or B)  == (not A) and (not B)\n\n```python\n# Verbose:\nif not (age < 18 or income < 1000):\n    print(\"Eligible\")\n\n# Equivalent (De Morgan applied):\nif age >= 18 and income >= 1000:\n    print(\"Eligible\")\n```\n\n### 4. Collapse Repeated Conditions into Membership\n\n```python\n# Verbose:\nif day == 'Saturday' or day == 'Sunday':\n    print(\"Weekend\")\n\n# Simplified:\nif day in ('Saturday', 'Sunday'):\n    print(\"Weekend\")\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Linters Catch These Automatically",
          body: "Tools like ruff and pylint flag many of these patterns automatically (e.g., E712 for `== True` comparisons). Running a linter teaches you these simplifications as you write code.",
        },
      ],
      interactions: [
        {
          id: "s6-condition-simplification-mc",
          kind: "multiple-choice",
          prompt: "Which is the simplified form of `if x == True: return True\\nelse: return False`?",
          beginnerPurpose: "Apply the pattern: return the expression directly",
          expectedConceptIds: ["if-statement"],
          options: [
            { id: "a", text: "return x == True", isCorrect: false, explanation: "Still redundant — comparing to True is unnecessary. Just return x." },
            { id: "b", text: "return x", isCorrect: true, explanation: "Correct! x is already a boolean (or truthy/falsy). Returning x directly is equivalent and simpler." },
            { id: "c", text: "return bool(x)", isCorrect: false, explanation: "This works but is still more verbose than needed. 'return x' is the idiomatic simplification." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "If x is truthy and you return True when x is true, you're just returning x." }],
          feedback: { correct: "Correct! return x captures the same logic without the if/else.", incorrect: "The if/else just returns x when x is True and False when x is False — that's just 'return x'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-condition-simplification-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.8 — while loops ────────────────────────────────────────── */
    {
      id: "s6-while-loops",
      stageId: "stage-06",
      title: "while Loops",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write a while loop that repeats until a condition becomes False",
        "Identify the three required parts: condition, body, update",
        "Trace a while loop step by step",
      ],
      prerequisites: [],
      concepts: ["while-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Repeating Without Knowing How Many Times\n\nSome tasks must repeat an unknown number of times — asking for a password until it's correct, reading data until there's none left, animating a frame until the user quits. An `if` statement only handles one occurrence. What's needed is a structure that keeps re-checking and re-running.\n\n## The while Loop\n\nA `while` loop checks a condition before each repetition. If it's True, the body runs. Then the condition is checked again. This continues until the condition becomes False:\n\n```python\ncount = 1          # initialization: prepare the state\n\nwhile count <= 5:  # condition: checked before every iteration\n    print(count)   # body: runs when condition is True\n    count += 1     # update: changes state toward termination\n\nprint(\"Done\")\n```\n\nOutput: 1, 2, 3, 4, 5, Done\n\n## The Three Required Parts\n\n1. **Initialization** — set up the variable(s) before the loop\n2. **Condition** — must eventually become False (or loop runs forever)\n3. **Update** — changes state inside the body so the condition can change\n\n## How Python Executes a while Loop\n\n1. Check condition → if False, skip to after the loop\n2. Run the body\n3. Go back to step 1",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Infinite Loop: The Missing Update",
          body: "If the body never changes the variable that the condition tests, the condition never becomes False. The loop runs forever. Press Ctrl+C to stop an infinite loop in the terminal.",
        },
      ],
      interactions: [
        {
          id: "s6-while-loops-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a while loop iteration by iteration",
          expectedConceptIds: ["while-loop"],
          code: "n = 10\nwhile n > 6:\n    print(n)\n    n -= 3",
          expectedOutput: "10\n7",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "n=10: 10>6 True → print 10, n=7. n=7: 7>6 True → print 7, n=4. n=4: 4>6 False → stop." }],
          feedback: { correct: "Correct! 10>6 → print 10, n becomes 7. 7>6 → print 7, n becomes 4. 4>6 is False → stop.", incorrect: "Trace: n=10 (print, n→7), n=7 (print, n→4), n=4 (4>6 False, stop)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-while-loops-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.9 — Loop counters ──────────────────────────────────────── */
    {
      id: "s6-loop-counters",
      stageId: "stage-06",
      title: "Loop Counters",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use a counter variable to track how many times a loop has run",
        "Count up and count down with while loops",
        "Apply a counter to limit loop repetitions",
      ],
      prerequisites: [],
      concepts: ["while-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Counting Iterations\n\nA **loop counter** is a variable that keeps track of how many times a loop has executed. It starts at an initial value, changes by a fixed amount each iteration, and its value controls when the loop ends:\n\n```python\n# Count up from 1 to 5:\ncounter = 1\nwhile counter <= 5:\n    print(f\"Iteration {counter}\")\n    counter += 1   # increment by 1 each time\n\n# Count down from 5 to 1:\ncounter = 5\nwhile counter >= 1:\n    print(counter)\n    counter -= 1   # decrement by 1 each time\nprint(\"Liftoff!\")\n```\n\n## Counting With a Limit\n\nCounters let you cap the number of repetitions:\n\n```python\nmax_attempts = 3\nattempts = 0\n\nwhile attempts < max_attempts:\n    guess = input(\"Guess: \")\n    attempts += 1\n    if guess == \"python\":\n        print(f\"Correct! Took {attempts} attempt(s).\")\n        break\nelse:   # runs if the loop didn't break\n    print(f\"Out of attempts after {max_attempts} tries.\")\n```\n\n## Counting Events Inside a Loop\n\n```python\ntext = \"hello world\"\nvowels = 0\nfor ch in text:\n    if ch in 'aeiou':\n        vowels += 1    # count each vowel found\n\nprint(f\"Vowels: {vowels}\")  # Vowels: 3\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Counters Are Accumulators Set to Zero",
          body: "A counter is just an accumulator that adds 1 each time. Start it at 0 before the loop. Add 1 each time the condition you're counting is met. Read the total after the loop.",
        },
      ],
      interactions: [
        {
          id: "s6-loop-counters-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a counter across loop iterations",
          expectedConceptIds: ["while-loop"],
          code: "count = 0\nn = 1\nwhile n <= 4:\n    count += n\n    n += 1\nprint(count)",
          expectedOutput: "10",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "count accumulates: 0+1=1, 1+2=3, 3+3=6, 6+4=10." }],
          feedback: { correct: "Correct! 1+2+3+4 = 10.", incorrect: "Each iteration: count += n. Totals: 0→1→3→6→10." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-loop-counters-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.10 — Accumulators ──────────────────────────────────────── */
    {
      id: "s6-accumulators",
      stageId: "stage-06",
      title: "Accumulators",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use an accumulator variable to build up a result across iterations",
        "Accumulate sums, products, and strings",
        "Initialize the accumulator to the correct identity value",
      ],
      prerequisites: [],
      concepts: ["while-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Building a Result One Piece at a Time\n\nSome computations build a result incrementally — summing numbers, multiplying a series, concatenating words. An **accumulator** is a variable that starts at a 'neutral' value and collects contributions from each iteration:\n\n```python\n# Sum accumulator:\ntotal = 0          # identity for addition\nfor n in range(1, 6):\n    total += n     # collect each contribution\nprint(total)       # 15\n\n# Product accumulator:\nproduct = 1        # identity for multiplication\nfor n in range(1, 6):\n    product *= n\nprint(product)     # 120 (5 factorial)\n\n# String accumulator:\nresult = ''        # identity for concatenation\nfor word in ['Hello', ' ', 'World']:\n    result += word\nprint(result)      # 'Hello World'\n```\n\n## Choosing the Right Starting Value\n\n| Operation | Starting value | Why |\n|-----------|---------------|-----|\n| Sum | `0` | 0 + anything = anything |\n| Product | `1` | 1 × anything = anything |\n| Max | `-inf` or first item | Start smaller than any value |\n| String join | `''` | Empty string doesn't change anything |\n| List collect | `[]` | Start with an empty list |\n\n```python\n# Collecting items conditionally:\nevens = []\nfor n in range(1, 11):\n    if n % 2 == 0:\n        evens.append(n)\nprint(evens)   # [2, 4, 6, 8, 10]\n```",
        },
        {
          kind: "why-matters",
          body: "The accumulator pattern is one of the most universal patterns in programming. Sum, max, min, count, collect — all are variations of 'initialize, loop, update, read'. Mastering it means you can compute almost any aggregate value.",
        },
      ],
      interactions: [
        {
          id: "s6-accumulators-mc",
          kind: "multiple-choice",
          prompt: "To compute the product of numbers 1 through 5, what should the accumulator be initialized to?",
          beginnerPurpose: "Choose the correct identity value for multiplication",
          expectedConceptIds: ["while-loop"],
          options: [
            { id: "a", text: "0", isCorrect: false, explanation: "Initializing to 0 makes the product always 0 (0 × anything = 0). Use 1 for multiplication." },
            { id: "b", text: "1", isCorrect: true, explanation: "Correct! 1 is the identity for multiplication: 1 × n = n. Starting at 1 doesn't change the first multiplication." },
            { id: "c", text: "The first number (1)", isCorrect: false, explanation: "This works by coincidence here since the first number is 1, but the correct identity is always 1 regardless of the data." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The starting value should not affect the result — it's the value that, when multiplied, leaves anything unchanged." }],
          feedback: { correct: "Correct! 1 is the multiplicative identity — start product accumulators at 1.", incorrect: "Use 1 for product accumulators. 0 would make every product 0 (0×anything=0)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-accumulators-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.11 — Sentinel-controlled loops ─────────────────────────── */
    {
      id: "s6-sentinel-loops",
      stageId: "stage-06",
      title: "Sentinel-Controlled Loops",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use a special 'sentinel' value to signal the end of input",
        "Write a loop that reads until the sentinel is encountered",
        "Choose appropriate sentinel values for different data types",
      ],
      prerequisites: [],
      concepts: ["while-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Loops That Run Until a Signal\n\nSometimes you don't know in advance how many items to process — you keep going until a special 'stop' value appears. A **sentinel** is a value agreed upon in advance to mean 'that's all — stop now':\n\n```python\n# Read numbers until user types 'done'\ntotal = 0\ncount = 0\n\nwhile True:\n    raw = input(\"Enter a number (or 'done' to finish): \")\n    if raw == 'done':   # sentinel check\n        break           # exit loop\n    total += float(raw)\n    count += 1\n\nif count > 0:\n    print(f\"Sum: {total}, Average: {total/count:.2f}\")\nelse:\n    print(\"No numbers entered.\")\n```\n\n## Common Sentinel Values\n\n| Context | Sentinel |\n|---------|----------|\n| User text input | Empty string `''`, `'quit'`, `'done'`, `'exit'` |\n| Numeric input | `-1`, `0`, `999` (something never valid) |\n| File reading | `None` or end-of-file |\n\n## Classic Priming Read Pattern\n\n```python\n# Alternative: read once before the loop, then re-read at the end of each iteration\nvalue = input(\"Enter value (or blank to stop): \")\nwhile value != '':\n    print(f\"Processing: {value}\")\n    value = input(\"Enter value (or blank to stop): \")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Choose a Sentinel That Can't Be Valid Data",
          body: "A sentinel must be a value that could never appear in your actual data. If your program reads ages (always positive), -1 makes a good sentinel. If it reads arbitrary text, 'quit' or an empty line works better.",
        },
      ],
      interactions: [
        {
          id: "s6-sentinel-loops-mc",
          kind: "multiple-choice",
          prompt: "In a sentinel loop that collects positive integers, why is -1 a good sentinel value?",
          beginnerPurpose: "Understand why sentinels must be distinguishable from valid data",
          expectedConceptIds: ["while-loop"],
          options: [
            { id: "a", text: "Because -1 is easy to type", isCorrect: false, explanation: "Ease of typing is not the reason. The sentinel must be something that can never be valid data." },
            { id: "b", text: "Because -1 cannot appear as valid positive integer data", isCorrect: true, explanation: "Correct! Since only positive integers are valid, -1 can never be confused with real data — it's safe to use as the stop signal." },
            { id: "c", text: "Because Python treats -1 as False", isCorrect: false, explanation: "-1 is truthy in Python (non-zero), not False. The reason -1 works is that it's outside the valid data range." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "A sentinel must be a value that is impossible in the valid data set." }],
          feedback: { correct: "Correct! -1 is outside the valid range (positive integers), so it can safely signal 'stop'.", incorrect: "Sentinels work because they can never be confused with real data. -1 is never a positive integer." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-sentinel-loops-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.12 — Infinite loop prevention ──────────────────────────── */
    {
      id: "s6-infinite-loop-prevention",
      stageId: "stage-06",
      title: "Infinite Loop Prevention",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Identify the conditions that cause infinite loops",
        "Apply strategies to ensure every loop terminates",
        "Debug an infinite loop by tracing the update step",
      ],
      prerequisites: [],
      concepts: ["while-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## What Makes a Loop Run Forever\n\nA loop runs forever (an infinite loop) when its condition never becomes False. This happens in two ways:\n\n1. **Missing update**: the variable controlling the condition is never changed\n2. **Wrong update**: the variable moves in the wrong direction\n\n```python\n# Infinite — missing update:\ni = 0\nwhile i < 5:\n    print(i)\n    # i is never incremented — condition is always True!\n\n# Infinite — wrong direction:\ni = 0\nwhile i < 5:\n    print(i)\n    i -= 1   # i goes negative — never reaches 5!\n```\n\n## How to Prevent Infinite Loops\n\n**Strategy 1: Always have an update**\n```python\ni = 0\nwhile i < 5:\n    print(i)\n    i += 1   # update moves i toward the termination condition\n```\n\n**Strategy 2: Use a safety counter for loops that might misbehave**\n```python\nmax_iterations = 1000\nloop_count = 0\n\nwhile some_condition() and loop_count < max_iterations:\n    do_work()\n    loop_count += 1\n\nif loop_count >= max_iterations:\n    print(\"Warning: safety limit hit\")\n```\n\n**Strategy 3: Trace before running**\n\nFor any `while` loop, ask: 'What changes inside the body? Does that change make the condition closer to False?'\n\n## Debugging an Infinite Loop\n\nIf a loop hangs:\n1. Press Ctrl+C to stop it\n2. Add a `print(variable)` inside to watch its value\n3. Check whether the update moves toward the termination condition",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Ctrl+C Stops an Infinite Loop",
          body: "If your program hangs in the terminal, press Ctrl+C to send a KeyboardInterrupt and stop execution. In Jupyter or IDLE, there is usually an interrupt/stop button.",
        },
      ],
      interactions: [
        {
          id: "s6-infinite-loop-prevention-debug",
          kind: "debug-code",
          prompt: "This loop runs forever. Fix it so it prints 1, 2, 3, 4, 5 and stops.",
          beginnerPurpose: "Spot and fix the missing update in an infinite loop",
          expectedConceptIds: ["while-loop"],
          brokenCode: "i = 1\nwhile i <= 5:\n    print(i)",
          bugDescription: "The variable i is never changed inside the loop body, so i <= 5 is always True and the loop never ends.",
          fixedCode: "i = 1\nwhile i <= 5:\n    print(i)\n    i += 1",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "The condition tests i. For it to become False, i must change inside the loop." }],
          feedback: { correct: "Fixed! Adding i += 1 ensures i grows until i <= 5 becomes False.", incorrect: "Add `i += 1` inside the loop body so i increases toward 6, making the condition False." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-infinite-loop-prevention-debug"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.13 — for loops ─────────────────────────────────────────── */
    {
      id: "s6-for-loops",
      stageId: "stage-06",
      title: "for Loops",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write a for loop that iterates over a sequence",
        "Explain that a for loop visits each item exactly once",
        "Distinguish for loops from while loops",
      ],
      prerequisites: [],
      concepts: ["for-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Iterating Over a Sequence\n\nWhen you have a collection of items and want to process each one, a `for` loop is the tool. It automatically moves through the sequence — no counter variable, no explicit update:\n\n```python\nfruits = ['apple', 'banana', 'cherry']\n\nfor fruit in fruits:      # fruit takes each value in turn\n    print(fruit.upper())  # runs once per item\n\n# Output:\n# APPLE\n# BANANA\n# CHERRY\n```\n\n## How a for Loop Works\n\n1. Python takes the first item from the sequence and assigns it to the loop variable\n2. Runs the body\n3. Takes the next item, assigns it, runs the body again\n4. Repeats until no more items\n\n```python\nfor letter in 'hello':   # strings are sequences of characters\n    print(letter)\n# h\n# e\n# l\n# l\n# o\n```\n\n## for vs while\n\n| | for | while |\n|-|-----|-------|\n| When to use | Known sequence / count | Unknown repetitions |\n| Termination | Automatic (end of sequence) | Must update condition manually |\n| Infinite loop risk | Very low | Higher (missing update) |\n| Typical use | List processing, range | Input loops, game loops |",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "for Loops Are Safer for Sequences",
          body: "Use a for loop whenever you have a sequence to iterate over. It's shorter, can't accidentally produce an infinite loop, and is more readable than the equivalent while loop.",
        },
      ],
      interactions: [
        {
          id: "s6-for-loops-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a for loop over a list",
          expectedConceptIds: ["for-loop"],
          code: "total = 0\nfor n in [3, 1, 4, 1, 5]:\n    total += n\nprint(total)",
          expectedOutput: "14",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Sum: 3+1+4+1+5 = 14." }],
          feedback: { correct: "Correct! The for loop adds each number to total: 3+1+4+1+5=14.", incorrect: "Each iteration adds n to total. 3+1=4, +4=8, +1=9, +5=14." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-for-loops-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.14 — range() ───────────────────────────────────────────── */
    {
      id: "s6-range",
      stageId: "stage-06",
      title: "range()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use range(n), range(start, stop), and range(start, stop, step)",
        "Explain that range() does not include the stop value",
        "Generate descending sequences with negative step",
      ],
      prerequisites: [],
      concepts: ["for-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## range(): Generating Numeric Sequences\n\n`range()` generates a sequence of integers without storing them all in memory. It is designed to work with `for` loops:\n\n```python\nfor i in range(5):          # 0, 1, 2, 3, 4\n    print(i)\n\nfor i in range(1, 6):       # 1, 2, 3, 4, 5  (stop=6 excluded)\n    print(i)\n\nfor i in range(0, 10, 2):   # 0, 2, 4, 6, 8  (step=2)\n    print(i)\n\nfor i in range(5, 0, -1):   # 5, 4, 3, 2, 1  (negative step)\n    print(i)\n```\n\n## The Stop Value Is Excluded\n\n`range(1, 6)` gives 1, 2, 3, 4, 5 — NOT 6. This is intentional: `range(len(s))` gives exactly the valid indexes 0 through `len(s)-1`.\n\n```python\nword = 'hello'\nfor i in range(len(word)):   # 0, 1, 2, 3, 4\n    print(i, word[i])\n```\n\n## Converting range to a List\n\n```python\nprint(list(range(5)))       # [0, 1, 2, 3, 4]\nprint(list(range(1, 10, 3))) # [1, 4, 7]\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "range() Is Memory-Efficient",
          body: "range(1000000) does not create a million-item list. It computes values on demand as the loop requests them. This is why range() is preferred over list(range()) in for loops.",
        },
      ],
      interactions: [
        {
          id: "s6-range-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply range() with start, stop, and step",
          expectedConceptIds: ["for-loop"],
          code: "total = 0\nfor i in range(1, 10, 2):\n    total += i\nprint(total)",
          expectedOutput: "25",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "range(1, 10, 2) gives 1, 3, 5, 7, 9. Sum = 25." }],
          feedback: { correct: "Correct! 1+3+5+7+9 = 25.", incorrect: "range(1,10,2) → 1,3,5,7,9. Sum: 1+3=4, +5=9, +7=16, +9=25." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-range-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.15 — Looping over strings ──────────────────────────────── */
    {
      id: "s6-looping-over-strings",
      stageId: "stage-06",
      title: "Looping over Strings",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Iterate character by character over a string with a for loop",
        "Use enumerate() to get both index and character",
        "Build new strings from character-by-character processing",
      ],
      prerequisites: [],
      concepts: ["for-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Strings as Sequences of Characters\n\nA string is a sequence — every character is an item. A `for` loop visits each character in order:\n\n```python\nfor ch in 'hello':\n    print(ch)\n# h\n# e\n# l\n# l\n# o\n```\n\n## Processing Characters\n\n```python\ntext = 'Hello, World!'\nvowels = 0\nfor ch in text:\n    if ch.lower() in 'aeiou':\n        vowels += 1\nprint(f\"{vowels} vowels\")   # 3 vowels\n```\n\n## enumerate(): Index and Character Together\n\n`enumerate()` produces pairs of (index, value) so you can access both:\n\n```python\nword = 'Python'\nfor i, ch in enumerate(word):\n    print(f\"[{i}] = {ch}\")\n# [0] = P\n# [1] = y\n# [2] = t\n# ...\n```\n\n## Building a New String Character by Character\n\n```python\noriginal = 'hello world'\ntransformed = ''\nfor ch in original:\n    if ch == ' ':\n        transformed += '_'   # replace space with underscore\n    else:\n        transformed += ch\nprint(transformed)   # 'hello_world'\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use join() Instead of += for Building Strings",
          body: "For large strings, building character-by-character with += creates many intermediate strings (slow). Use a list accumulator and join at the end: chars = []; for ch in text: chars.append(transform(ch)); result = ''.join(chars)",
        },
      ],
      interactions: [
        {
          id: "s6-looping-over-strings-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a for loop counting specific characters in a string",
          expectedConceptIds: ["for-loop"],
          code: "count = 0\nfor ch in 'programming':\n    if ch in 'aeiou':\n        count += 1\nprint(count)",
          expectedOutput: "3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Vowels in 'programming': r-o-g-r-a-m-m-i-n-g → o, a, i = 3 vowels." }],
          feedback: { correct: "Correct! 'programming' has 3 vowels: o, a, i.", incorrect: "Check each character: p(no) r(no) o(YES) g(no) r(no) a(YES) m(no) m(no) i(YES) n(no) g(no) = 3." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-looping-over-strings-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.16 — break ─────────────────────────────────────────────── */
    {
      id: "s6-break",
      stageId: "stage-06",
      title: "break",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use break to exit a loop immediately",
        "Apply break in search loops to stop when the target is found",
        "Explain that break exits only the innermost loop",
      ],
      prerequisites: [],
      concepts: ["loop-control"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Stopping a Loop Before It Naturally Ends\n\nSometimes you want to stop iterating before reaching the end — when you've found what you were looking for, or when a special condition makes continuing pointless. `break` immediately exits the current loop:\n\n```python\nnumbers = [3, 7, 2, 9, 4, 6]\n\nfor n in numbers:\n    if n == 9:\n        print(f\"Found 9!\")\n        break             # exit the loop immediately\n    print(f\"Checking {n}\")\n\n# Output:\n# Checking 3\n# Checking 7\n# Checking 2\n# Found 9!\n# (4 and 6 are never checked)\n```\n\n## break in while Loops\n\n```python\nwhile True:   # loop would run forever without break\n    command = input(\"> \")\n    if command == 'quit':\n        break   # the only way out\n    print(f\"Command: {command}\")\n\nprint(\"Goodbye\")\n```\n\n## break Exits Only the Innermost Loop\n\n```python\nfor i in range(3):\n    for j in range(3):\n        if j == 1:\n            break    # exits inner loop only\n    print(i)         # outer loop continues normally\n# prints 0, 1, 2\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "break Exits the Innermost Loop Only",
          body: "If you have nested loops and break inside the inner loop, only the inner loop exits. The outer loop continues from its next iteration. To exit multiple loops, you need a flag variable or a function with return.",
        },
      ],
      interactions: [
        {
          id: "s6-break-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace break stopping a for loop mid-sequence",
          expectedConceptIds: ["loop-control"],
          code: "for i in range(1, 8):\n    if i % 4 == 0:\n        break\n    print(i)",
          expectedOutput: "1\n2\n3",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Loop: 1 (1%4=1, print), 2 (2%4=2, print), 3 (3%4=3, print), 4 (4%4=0, break)." }],
          feedback: { correct: "Correct! Prints 1, 2, 3 then break fires when i=4.", incorrect: "i=1,2,3 print. i=4: 4%4==0 → break. Loop exits before printing 4." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-break-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.17 — continue ──────────────────────────────────────────── */
    {
      id: "s6-continue",
      stageId: "stage-06",
      title: "continue",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use continue to skip the rest of the current iteration",
        "Apply continue to filter values in a loop without break",
        "Distinguish break (exit loop) from continue (skip iteration)",
      ],
      prerequisites: [],
      concepts: ["loop-control"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Skipping One Iteration Without Stopping the Loop\n\nSometimes you want to skip a specific item but keep processing the rest. `continue` jumps back to the top of the loop for the next iteration, skipping everything below it in the current pass:\n\n```python\nfor n in range(1, 8):\n    if n % 2 == 0:\n        continue     # skip even numbers\n    print(n)         # only runs for odd numbers\n# 1\n# 3\n# 5\n# 7\n```\n\n## continue vs break\n\n```python\nnumbers = [1, -3, 5, -2, 8]\n\n# continue: skip negatives, process positives\nfor n in numbers:\n    if n < 0:\n        continue\n    print(n)   # prints 1, 5, 8\n\n# break: stop at first negative\nfor n in numbers:\n    if n < 0:\n        break\n    print(n)   # prints 1\n```\n\n## continue in while Loops\n\n```python\ni = 0\nwhile i < 10:\n    i += 1\n    if i % 3 == 0:\n        continue   # skip multiples of 3\n    print(i)\n# prints: 1, 2, 4, 5, 7, 8, 10\n```\n\n**Important**: In a `while` loop, the update (`i += 1`) must come BEFORE the `continue`, or the loop variable won't advance and an infinite loop may occur.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Update Before continue in while Loops",
          body: "In while loops, if the update statement comes after continue, it will be skipped — the loop variable won't change and you may get an infinite loop. Always increment/update before any continue statement.",
        },
      ],
      interactions: [
        {
          id: "s6-continue-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace continue skipping specific iterations",
          expectedConceptIds: ["loop-control"],
          code: "for i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)",
          expectedOutput: "1\n2\n4\n5",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "continue skips just i=3. All other values print normally." }],
          feedback: { correct: "Correct! 3 is skipped by continue. 1, 2, 4, 5 print.", incorrect: "continue skips the current iteration only. i=3 is skipped; others print normally." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-continue-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.18 — else clauses on loops ─────────────────────────────── */
    {
      id: "s6-loop-else",
      stageId: "stage-06",
      title: "else Clauses on Loops",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Add an else clause to a for or while loop",
        "Explain that loop else runs only when the loop ends normally (not via break)",
        "Apply loop else to implement the 'search and report if not found' pattern",
      ],
      prerequisites: [],
      concepts: ["loop-control"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Loop else Clause\n\nPython's `for` and `while` loops can have an `else` clause. The `else` block runs **only if the loop completed normally — without hitting a `break`**:\n\n```python\nprimes = [2, 3, 5, 7, 11]\ntarget = 6\n\nfor p in primes:\n    if p == target:\n        print(f\"{target} found in list!\")\n        break\nelse:\n    # runs only if break was never hit:\n    print(f\"{target} not found in list\")\n# Output: 6 not found in list\n```\n\n## The Pattern: Search Loop\n\nLoop else cleanly implements 'search for X; report if not found':\n\n```python\nusers = ['alice', 'bob', 'charlie']\nsearch = 'dana'\n\nfor user in users:\n    if user == search:\n        print(f\"Found {search}\")\n        break\nelse:\n    print(f\"{search} not in user list\")\n```\n\nWithout loop else, you'd need an extra boolean flag:\n\n```python\nfound = False\nfor user in users:\n    if user == search:\n        found = True\n        break\nif not found:\n    print(f\"{search} not in user list\")\n```\n\n## while/else Works the Same Way\n\n```python\nn = 2\nwhile n < 100:\n    if some_condition(n):\n        break\n    n += 1\nelse:\n    print(\"Condition never met up to 100\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Loop else Is Rarely Used but Useful",
          body: "The loop else clause is a uniquely Python feature. It's not commonly used, but when it fits (search loops, primality testing), it elegantly replaces a boolean flag variable. Many experienced Python developers consider it underutilized.",
        },
      ],
      interactions: [
        {
          id: "s6-loop-else-mc",
          kind: "multiple-choice",
          prompt: "When does the else clause of a for loop execute?",
          beginnerPurpose: "Understand loop else semantics",
          expectedConceptIds: ["loop-control"],
          options: [
            { id: "a", text: "When the loop condition is False from the start", isCorrect: false, explanation: "If the iterable is empty (condition False from start), the else still runs — but that's just the normal completion case." },
            { id: "b", text: "When the loop completes without hitting a break", isCorrect: true, explanation: "Correct! Loop else runs whenever the loop ends normally. If break exits the loop, else is skipped." },
            { id: "c", text: "When the last iteration produces False", isCorrect: false, explanation: "The else clause has nothing to do with what the last iteration produces. It depends only on whether break was used." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think of it as: 'else = no break occurred'." }],
          feedback: { correct: "Correct! Loop else runs when no break exits the loop.", incorrect: "Loop else runs only when the loop finishes normally — break prevents it from running." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-loop-else-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.19 — pass ──────────────────────────────────────────────── */
    {
      id: "s6-pass",
      stageId: "stage-06",
      title: "pass",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use pass as a placeholder where Python requires a statement",
        "Explain that pass does nothing and is used for empty blocks",
        "Recognize when pass is useful vs when to remove it",
      ],
      prerequisites: [],
      concepts: ["loop-control"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Problem: Empty Blocks Are Not Allowed\n\nPython requires at least one statement in every block (after `if`, `for`, `while`, `def`, `class`, etc.). Sometimes you want an empty block — a placeholder you'll fill in later, or a loop that does nothing intentionally. You cannot just leave the block empty:\n\n```python\nif condition:\n    # nothing here yet\n# SyntaxError: expected an indented block!\n```\n\n## pass: A Legal No-Op\n\n`pass` is a statement that does absolutely nothing. It satisfies Python's requirement for a block statement:\n\n```python\n# Placeholder for future code:\nif condition:\n    pass   # TODO: implement this\n\n# Intentionally empty loop (rare but valid):\nwhile not event_occurred():\n    pass   # busy-wait (usually better alternatives exist)\n\n# Stub function:\ndef process(data):\n    pass   # implement later\n```\n\n## When pass Is Appropriate\n\n1. **Placeholder** during development — you'll fill the body in later\n2. **Empty except clause** — silently ignore an exception (use carefully)\n3. **Minimum class/function definition** — create the name before the body\n\n```python\n# Silent exception suppression (use carefully!):\ntry:\n    int('abc')\nexcept ValueError:\n    pass   # intentionally ignore the error\n```\n\n## When NOT to Use pass\n\nDo not leave `pass` in finished code as a substitute for actual logic. If a block genuinely should do nothing, add a comment explaining why.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "pass vs ... (Ellipsis)",
          body: "In Python, `...` (the Ellipsis literal) is sometimes used instead of pass as a stub — especially in type stubs and abstract methods. Both mean 'nothing here', but ... is more often seen in type annotation contexts.",
        },
      ],
      interactions: [
        {
          id: "s6-pass-mc",
          kind: "multiple-choice",
          prompt: "Why does this raise a SyntaxError? `if x > 0:  # check positive`",
          beginnerPurpose: "Understand why pass is needed for empty blocks",
          expectedConceptIds: ["loop-control"],
          options: [
            { id: "a", text: "Because the comment is invalid", isCorrect: false, explanation: "Comments are valid Python — they're ignored by the interpreter. The issue is that no statement follows the colon." },
            { id: "b", text: "Because Python requires at least one statement in every block", isCorrect: true, explanation: "Correct! A comment is not a statement. Python requires at least one actual statement (like pass) in every block." },
            { id: "c", text: "Because the condition is missing parentheses", isCorrect: false, explanation: "Python's if statements don't require parentheses. The error is the missing statement in the body." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "A comment is not a statement. Python needs at least one real statement after the colon." }],
          feedback: { correct: "Correct! Use 'pass' as the statement when the block should be empty.", incorrect: "Python requires a real statement in every block. Comments don't count — use 'pass'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-pass-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.20 — Nested loops ──────────────────────────────────────── */
    {
      id: "s6-nested-loops",
      stageId: "stage-06",
      title: "Nested Loops",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write a for loop inside another for loop",
        "Predict the total number of iterations in a nested loop",
        "Process two-dimensional data using nested loops",
      ],
      prerequisites: [],
      concepts: ["for-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Loops Inside Loops\n\nA **nested loop** is a loop inside the body of another loop. For each iteration of the outer loop, the inner loop runs completely:\n\n```python\nfor i in range(1, 4):         # outer: i = 1, 2, 3\n    for j in range(1, 4):     # inner: j = 1, 2, 3 (each time outer runs)\n        print(f\"{i} × {j} = {i*j}\")\n    print()   # blank line after each row\n```\n\nTotal iterations: 3 × 3 = 9\n\n## Processing a Grid / 2D Data\n\n```python\nmatrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n]\n\nfor row in matrix:        # each row is a list\n    for value in row:     # each value in that row\n        print(value, end=' ')\n    print()               # newline after each row\n# 1 2 3\n# 4 5 6\n# 7 8 9\n```\n\n## Total Iterations = Outer × Inner\n\nIf the outer loop runs M times and the inner loop runs N times, the body of the inner loop runs M × N times total. For large loops, this can be slow — O(n²) complexity.\n\n```python\n# Finding all pairs:\npairs = []\nfor a in range(1, 4):\n    for b in range(a+1, 4):   # b always greater than a\n        pairs.append((a, b))\nprint(pairs)   # [(1,2), (1,3), (2,3)]\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Nested Loops Can Be Slow",
          body: "For each additional level of nesting, the time grows multiplicatively. Two nested loops over n items = n² operations. Three levels = n³. Avoid deep nesting over large data; look for built-in functions or libraries that do the work efficiently.",
        },
      ],
      interactions: [
        {
          id: "s6-nested-loops-predict",
          kind: "predict-output",
          prompt: "How many times does `print('*')` execute?",
          beginnerPurpose: "Calculate total iterations in a nested loop",
          expectedConceptIds: ["for-loop"],
          code: "count = 0\nfor i in range(3):\n    for j in range(4):\n        count += 1\nprint(count)",
          expectedOutput: "12",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Outer runs 3 times. Each time, inner runs 4 times. Total: 3 × 4 = 12." }],
          feedback: { correct: "Correct! 3 × 4 = 12 total inner iterations.", incorrect: "The outer loop runs 3 times (i=0,1,2). Each time, the inner loop runs 4 times (j=0,1,2,3). Total: 3×4=12." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-nested-loops-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.21 — Pattern printing ─────────────────────────────────── */
    {
      id: "s6-pattern-printing",
      stageId: "stage-06",
      title: "Pattern Printing",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Use nested loops to print triangular and rectangular patterns",
        "Control output spacing with end='' in print()",
        "Compute the relationship between row number and characters per row",
      ],
      prerequisites: [],
      concepts: ["for-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Pattern Printing: A Classic Exercise\n\nPrinting patterns with nested loops is a traditional exercise for understanding how inner and outer loop variables interact:\n\n```python\n# Right triangle of stars:\nrows = 5\nfor i in range(1, rows + 1):\n    print('*' * i)\n# *\n# **\n# ***\n# ****\n# *****\n\n# Square grid:\nfor i in range(4):\n    for j in range(4):\n        print('*', end=' ')\n    print()  # newline after each row\n# * * * *\n# * * * *\n# * * * *\n# * * * *\n```\n\n## Number Triangle\n\n```python\nfor i in range(1, 6):\n    for j in range(1, i + 1):\n        print(j, end=' ')\n    print()\n# 1\n# 1 2\n# 1 2 3\n# 1 2 3 4\n# 1 2 3 4 5\n```\n\n## Pyramid\n\n```python\nn = 5\nfor i in range(1, n + 1):\n    spaces = ' ' * (n - i)\n    stars = '*' * (2 * i - 1)\n    print(spaces + stars)\n#     *\n#    ***\n#   *****\n#  *******\n# *********\n```",
        },
        {
          kind: "why-matters",
          body: "Pattern printing teaches you to think about the mathematical relationship between the loop variable and the output — a skill that transfers to table generation, matrix operations, and any problem where you need to compute 'how much of something' based on position.",
        },
      ],
      interactions: [
        {
          id: "s6-pattern-printing-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a nested loop producing a triangle pattern",
          expectedConceptIds: ["for-loop"],
          code: "for i in range(1, 4):\n    print('*' * i)",
          expectedOutput: "*\n**\n***",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "i=1: '*'*1='*'. i=2: '**'. i=3: '***'." }],
          feedback: { correct: "Correct! Each row has i stars.", incorrect: "i=1 → '*', i=2 → '**', i=3 → '***'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-pattern-printing-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.22 — Search loops ──────────────────────────────────────── */
    {
      id: "s6-search-loops",
      stageId: "stage-06",
      title: "Search Loops",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Write a loop that searches a sequence for a target value",
        "Use break to stop as soon as the target is found",
        "Use loop else to handle the 'not found' case cleanly",
      ],
      prerequisites: [],
      concepts: ["loop-control", "for-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Search Loop Pattern\n\nSearching is one of the most fundamental operations: scan a sequence, check each item against a condition, stop when found:\n\n```python\ndata = [12, 45, 7, 89, 23, 56]\ntarget = 89\n\nfor i, value in enumerate(data):\n    if value == target:\n        print(f\"Found {target} at index {i}\")\n        break\nelse:\n    print(f\"{target} not found\")\n\n# Output: Found 89 at index 3\n```\n\n## Searching with a Condition (Not Just Equality)\n\n```python\ntemperatures = [18.2, 22.1, 35.8, 31.0, 28.5]\n\nfor i, temp in enumerate(temperatures):\n    if temp > 35:\n        print(f\"High temperature at day {i+1}: {temp}°C\")\n        break\nelse:\n    print(\"No high temperatures found\")\n# High temperature at day 3: 35.8°C\n```\n\n## Searching Strings\n\n```python\nlog_lines = [\n    \"2024-01-01 INFO Server started\",\n    \"2024-01-01 ERROR Database timeout\",\n    \"2024-01-01 INFO Request processed\",\n]\n\nfor i, line in enumerate(log_lines, 1):\n    if 'ERROR' in line:\n        print(f\"Error on line {i}: {line}\")\n        break\nelse:\n    print(\"No errors found\")\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "in Operator for Simple Membership Checks",
          body: "For simple 'is this value in this list?' checks, use the `in` operator directly: `if target in my_list`. The explicit search loop is needed when you also need the index, want to stop on a condition (not just equality), or need to process the surrounding items.",
        },
      ],
      interactions: [
        {
          id: "s6-search-loops-mc",
          kind: "multiple-choice",
          prompt: "In a search loop with loop else, when does the else clause run?",
          beginnerPurpose: "Apply loop else semantics to the search pattern",
          expectedConceptIds: ["loop-control"],
          options: [
            { id: "a", text: "When the target is found", isCorrect: false, explanation: "When the target is found, break exits the loop and the else is SKIPPED." },
            { id: "b", text: "When the target is NOT found (loop completed without break)", isCorrect: true, explanation: "Correct! else runs when the loop finishes naturally (target was never found, so break was never hit)." },
            { id: "c", text: "On every iteration", isCorrect: false, explanation: "else runs once, after the loop, not on every iteration." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Loop else = 'I finished without breaking'. Breaking means target found → else skipped." }],
          feedback: { correct: "Correct! else runs when break never fires — meaning the target was not found.", incorrect: "Loop else runs when the loop completes normally (no break). In a search, that means target not found." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-search-loops-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.23 — Validation loops ─────────────────────────────────── */
    {
      id: "s6-validation-loops",
      stageId: "stage-06",
      title: "Validation Loops",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Write a loop that keeps re-prompting until valid input is received",
        "Combine try/except with while True and break for robust validation",
        "Handle both type errors and range errors in one loop",
      ],
      prerequisites: [],
      concepts: ["while-loop", "loop-control"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Validation Loop: Keep Asking Until Valid\n\nA validation loop re-prompts the user each time they provide invalid input. The standard structure uses `while True` with `break` to exit on success:\n\n```python\nwhile True:\n    raw = input(\"Enter your age (1-120): \").strip()\n    \n    try:\n        age = int(raw)               # attempt conversion\n    except ValueError:\n        print(\"Please enter a whole number.\")\n        continue                     # go back to prompt\n    \n    if not (1 <= age <= 120):        # range check\n        print(\"Age must be between 1 and 120.\")\n        continue                     # go back to prompt\n    \n    break                            # all checks passed — exit\n\nprint(f\"Valid age: {age}\")\n```\n\n## Reusable Validation Function\n\n```python\ndef get_int_in_range(prompt, lo, hi):\n    while True:\n        try:\n            value = int(input(prompt).strip())\n        except ValueError:\n            print(f\"Please enter a whole number between {lo} and {hi}.\")\n            continue\n        if lo <= value <= hi:\n            return value\n        print(f\"Must be between {lo} and {hi}.\")\n\nmonth = get_int_in_range(\"Month (1-12): \", 1, 12)\nday = get_int_in_range(\"Day (1-31): \", 1, 31)\nprint(f\"Date: {month}/{day}\")\n```\n\n## Validation from a Set of Choices\n\n```python\nvalid = {'yes', 'no', 'y', 'n'}\nwhile True:\n    ans = input(\"Continue? (yes/no): \").strip().lower()\n    if ans in valid:\n        break\n    print(f\"Enter yes or no.\")\n\nif ans in {'yes', 'y'}:\n    print(\"Continuing...\")\n```",
        },
        {
          kind: "why-matters",
          body: "Validation loops are the standard way to make programs robust against user error. Every CLI tool, interactive script, and command-line application that reads user input needs this pattern. Without it, one bad input crashes the program.",
        },
      ],
      interactions: [
        {
          id: "s6-validation-loops-mc",
          kind: "multiple-choice",
          prompt: "In the validation loop above, what does `continue` do when the user enters 'abc'?",
          beginnerPurpose: "Trace continue's role in a validation loop",
          expectedConceptIds: ["while-loop"],
          options: [
            { id: "a", text: "Exits the loop", isCorrect: false, explanation: "continue goes back to the top of the loop — it keeps the loop going, not exits it. break exits the loop." },
            { id: "b", text: "Jumps back to the top of the while loop to re-prompt", isCorrect: true, explanation: "Correct! continue skips the rest of the current iteration and returns to the while True check, which re-prompts." },
            { id: "c", text: "Raises ValueError", isCorrect: false, explanation: "continue is a control-flow statement, not an error. The ValueError was already caught by the except clause." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "continue goes back to the top of the loop — in while True, that means re-prompting." }],
          feedback: { correct: "Correct! continue returns to the while True condition, which loops back to the prompt.", incorrect: "continue jumps back to the top of the loop — re-prompting the user in this pattern." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-validation-loops-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.24 — Menu-driven programs ──────────────────────────────── */
    {
      id: "s6-menu-programs",
      stageId: "stage-06",
      title: "Menu-Driven Programs",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Build a program with a repeated menu that accepts user commands",
        "Dispatch to different actions based on user choice",
        "Combine validation loops, if/elif, and a main application loop",
      ],
      prerequisites: [],
      concepts: ["while-loop", "if-statement"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Menu-Driven Program Structure\n\nA menu-driven program shows options, reads a choice, executes the corresponding action, and loops back to the menu until the user chooses to quit:\n\n```python\ndef show_menu():\n    print(\"\\n=== Simple Calculator ===\")\n    print(\"1. Add\")\n    print(\"2. Subtract\")\n    print(\"3. Multiply\")\n    print(\"4. Divide\")\n    print(\"5. Quit\")\n\ndef get_two_numbers():\n    a = float(input(\"First number: \"))\n    b = float(input(\"Second number: \"))\n    return a, b\n\nwhile True:\n    show_menu()\n    choice = input(\"\\nChoice (1-5): \").strip()\n    \n    if choice == '5':\n        print(\"Goodbye!\")\n        break\n    elif choice not in {'1', '2', '3', '4'}:\n        print(\"Invalid choice. Please enter 1-5.\")\n        continue\n    \n    a, b = get_two_numbers()\n    \n    if choice == '1':\n        print(f\"Result: {a + b}\")\n    elif choice == '2':\n        print(f\"Result: {a - b}\")\n    elif choice == '3':\n        print(f\"Result: {a * b}\")\n    elif choice == '4':\n        if b == 0:\n            print(\"Error: division by zero\")\n        else:\n            print(f\"Result: {a / b:.4f}\")\n```\n\n## Key Structural Elements\n\n1. **Main loop** (`while True`): keeps the program running\n2. **Menu display**: shows options each iteration\n3. **Input reading**: get the user's choice\n4. **Validation**: reject invalid choices with `continue`\n5. **Quit handling**: `break` when user chooses to exit\n6. **Dispatch**: `if/elif` chain to execute the chosen action",
        },
        {
          kind: "why-matters",
          body: "Menu-driven programs are a complete application pattern. Understanding how to combine a main loop, input validation, dispatching, and a quit condition gives you the scaffolding for any interactive command-line tool — from simple calculators to complex database management scripts.",
        },
      ],
      interactions: [
        {
          id: "s6-menu-programs-mc",
          kind: "multiple-choice",
          prompt: "In a menu-driven program, what is the purpose of the outer `while True:` loop?",
          beginnerPurpose: "Understand the role of the main application loop",
          expectedConceptIds: ["while-loop"],
          options: [
            { id: "a", text: "To validate user input", isCorrect: false, explanation: "Input validation uses a separate inner loop. The outer loop keeps the application running between operations." },
            { id: "b", text: "To keep showing the menu until the user chooses to quit", isCorrect: true, explanation: "Correct! The outer loop repeats the menu/action cycle indefinitely until a break (quit) exits it." },
            { id: "c", text: "To catch errors from user input", isCorrect: false, explanation: "Error catching uses try/except blocks. The outer loop provides the repeating menu cycle." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Without the outer loop, the menu would show once and the program would end." }],
          feedback: { correct: "Correct! The outer while True keeps the menu cycling until break exits on quit.", incorrect: "The outer while True loop keeps the program running, showing the menu again after each action." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-menu-programs-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 6.25 — Control-flow refactoring drills ───────────────────── */
    {
      id: "s6-refactoring-drills",
      stageId: "stage-06",
      title: "Control-Flow Refactoring Drills",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Identify redundant or over-complicated control flow and simplify it",
        "Replace nested ifs with guard clauses",
        "Convert verbose boolean patterns to concise expressions",
      ],
      prerequisites: [],
      concepts: ["if-statement", "loop-control"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Drill 1: Remove Redundant Else After Return\n\n```python\n# Before — else is unnecessary after return:\ndef is_adult(age):\n    if age >= 18:\n        return True\n    else:\n        return False\n\n# After — return the expression directly:\ndef is_adult(age):\n    return age >= 18\n```\n\n## Drill 2: Replace Deep Nesting with Guards\n\n```python\n# Before — three levels of nesting:\ndef process(data, user):\n    if data is not None:\n        if user is not None:\n            if user.is_active:\n                return do_work(data)\n    return None\n\n# After — flat with guard clauses:\ndef process(data, user):\n    if data is None:\n        return None\n    if user is None:\n        return None\n    if not user.is_active:\n        return None\n    return do_work(data)\n```\n\n## Drill 3: Collapse Multiple == into in\n\n```python\n# Before:\nif status == 'pending' or status == 'processing' or status == 'queued':\n    handle_active()\n\n# After:\nif status in ('pending', 'processing', 'queued'):\n    handle_active()\n```\n\n## Drill 4: Use for/else Instead of a Flag\n\n```python\n# Before — flag variable:\nfound = False\nfor item in items:\n    if matches(item):\n        found = True\n        break\nif not found:\n    handle_not_found()\n\n# After — for/else:\nfor item in items:\n    if matches(item):\n        break\nelse:\n    handle_not_found()\n```\n\n## Drill 5: Simplify Not-Not\n\n```python\n# Before:\nif not (x != 5):\n    print(\"x is 5\")\n\n# After — double negation cancels:\nif x == 5:\n    print(\"x is 5\")\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Run a Linter After Refactoring",
          body: "After simplifying control flow, run ruff check or pylint to catch any remaining patterns it knows how to flag. Linters are good at spotting redundant conditions, unnecessary else after return, and similar issues.",
        },
      ],
      interactions: [
        {
          id: "s6-refactoring-drills-mc",
          kind: "multiple-choice",
          prompt: "Which is the correct simplification of `if len(items) > 0:`?",
          beginnerPurpose: "Apply truthiness simplification to a length check",
          expectedConceptIds: ["if-statement"],
          options: [
            { id: "a", text: "if items != []:", isCorrect: false, explanation: "This works but comparing a list to [] is not the most Pythonic form. Use truthiness directly." },
            { id: "b", text: "if items:", isCorrect: true, explanation: "Correct! Non-empty sequences are truthy. 'if items:' is the idiomatic Python simplification of 'if len(items) > 0:'." },
            { id: "c", text: "if bool(items) is True:", isCorrect: false, explanation: "This over-complicates it — calling bool() and comparing to True are both unnecessary." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Non-empty lists are truthy. You don't need len() for a simple 'is it empty?' check." }],
          feedback: { correct: "Correct! 'if items:' is the idiomatic way to check 'is this list non-empty?'.", incorrect: "The Pythonic simplification of 'if len(items) > 0:' is just 'if items:'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s6-refactoring-drills-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s6-project",
    stageId: "stage-06",
    title: "Menu-Driven Text Adventure",
    brief:
      "Build a simple text-based interactive story or game using all control flow concepts: if/elif/else for branching, while loop for the main game loop, for loops for processing collections, break/continue for flow control, validation loops for input, and guard clauses for safety checks.",
    requirements: [
      "Main while loop that keeps the game running until the player quits",
      "At least one if/elif/else chain with three or more branches",
      "At least one for loop processing a sequence",
      "Input validation using a validation loop (while True + break)",
      "Guard clauses to handle invalid state before processing",
      "Use of break and continue in appropriate contexts",
    ],
    acceptanceCriteria: [
      "Program does not crash on any user input",
      "Player can always exit cleanly",
      "At least three distinct 'rooms' or 'states' controlled by if/elif/else",
      "All loops have clear termination conditions",
    ],
    conceptIds: ["if-statement", "while-loop", "for-loop", "loop-control"],
    difficulty: "beginner",
  },
} satisfies Stage;
