import type { Stage } from "@/course/course.schema";

export const stage04 = {
  id: "stage-04",
  number: 4,
  title: "Decisions and Repetition",
  summary:
    "Control program flow with if/elif/else, while loops, for loops, range(), break, and continue.",
  level: "beginner",
  masteryGateConceptIds: [
    "if-statement",
    "elif",
    "else-clause",
    "while-loop",
    "for-loop",
    "range",
    "break",
    "continue",
    "loop-variable",
  ],

  lessons: [
    /* ── Lesson 1: Making Decisions with if/else ──────────────────────────── */
    {
      id: "s4-if-else",
      stageId: "stage-04",
      title: "Making Decisions with if/else",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write an if statement with a boolean condition",
        "Use indentation to mark the body of an if block",
        "Add an else clause to handle the alternative case",
        "Explain why the colon (:) is required after the condition",
      ],
      prerequisites: ["s3-truthiness"],
      concepts: ["if-statement", "else-clause"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The if Statement\n\nAn `if` statement lets your program choose between paths depending on a condition. If the condition is truthy, the indented block runs; if it's falsy, Python skips it.\n\n```python\ntemperature = 35\n\nif temperature > 30:\n    print(\"It's hot outside\")\n    print(\"Drink water\")\n\nprint(\"Stay safe\")  # always runs\n```\n\n### The else Clause\n\nAn `else` clause handles the case when the condition is false:\n\n```python\npassword = \"secret123\"\n\nif password == \"secret123\":\n    print(\"Access granted\")\nelse:\n    print(\"Wrong password\")\n```\n\n### Syntax Rules\n- A colon `:` must appear after the condition\n- The body must be **indented** (4 spaces by convention)\n- All lines at the same indentation level belong to the same block",
        },
        {
          kind: "code",
          language: "python",
          code: "score = 72\n\nif score >= 60:\n    print(\"You passed!\")\nelse:\n    print(\"Try again.\")\n\nprint(\"Assessment complete.\")",
          caption:
            "The if/else decides which message to print. The last print always runs regardless.",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Indentation Is Not Optional in Python",
          body: "Python uses indentation (whitespace) to define code blocks. If you forget to indent the body of an if statement, Python raises an IndentationError. Use 4 spaces per level — never mix spaces and tabs.",
        },
        {
          kind: "glossary-term",
          term: "if-statement",
          definition:
            "A control flow statement that executes a block of code only when its condition evaluates to a truthy value.",
          example: "if age >= 18:\n    print(\"Adult\")",
        },
      ],
      interactions: [
        {
          id: "s4-ie-predict-if-else",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose:
            "Trace an if/else to confirm understanding of which branch executes.",
          expectedConceptIds: ["if-statement", "else-clause"],
          code: "x = 10\n\nif x > 20:\n    print(\"big\")\nelse:\n    print(\"small\")\n\nprint(\"done\")",
          expectedOutput: "small\ndone",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Is 10 > 20? If the condition is False, which branch runs?",
            },
          ],
          feedback: {
            correct:
              "Correct! 10 > 20 is False, so the else branch runs (prints 'small'). Then 'done' always prints.",
            incorrect:
              "10 is not greater than 20, so the condition is False and the else block runs. The final print is outside both blocks and always runs.",
          },
        },
        {
          id: "s4-ie-fill-if",
          kind: "fill-code",
          prompt:
            "Complete the if statement so it prints 'Even' when `number` is divisible by 2, and 'Odd' otherwise.",
          beginnerPurpose:
            "Write a complete if/else using the modulo operator learned in Stage 2.",
          expectedConceptIds: ["if-statement", "else-clause"],
          codeTemplate: "number = 7\n\nif number ___ 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")",
          blanks: [
            {
              placeholder: "___",
              answer: "%",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "A number is even when the remainder after dividing by 2 is zero.",
            },
            {
              level: "syntax",
              text: "The modulo operator % gives the remainder: number % 2 == 0 is True for even numbers.",
            },
          ],
          feedback: {
            correct: "Correct! number % 2 == 0 is True for even numbers, False for odd.",
            incorrect: "Use % to get the remainder: if number % 2 == 0 means 'if number is even'.",
          },
        },
        {
          id: "s4-ie-reorder-if-else",
          kind: "reorder-code",
          prompt:
            "Rearrange these lines to form a valid if/else that prints 'Warm' when temp > 20, else 'Cool'.",
          beginnerPurpose:
            "Reinforce correct structure: condition line, then indented body, then else with its indented body.",
          expectedConceptIds: ["if-statement", "else-clause"],
          lines: [
            "    print(\"Cool\")",
            "if temp > 20:",
            "else:",
            "    print(\"Warm\")",
          ],
          correctOrder: [1, 3, 2, 0],
          allowedAttempts: 3,
          hints: [
            {
              level: "structural",
              text: "The if line comes first, then its indented body, then else:, then its indented body.",
            },
          ],
          feedback: {
            correct: "Correct structure! if condition: → indented body → else: → indented body.",
            incorrect:
              "An if/else is structured as: `if condition:` then indented body, then `else:` then indented body.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "if-statement",
          recallPrompt: "What two things must follow the condition in an if statement?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s4-ie-predict-if-else",
          "s4-ie-fill-if",
          "s4-ie-reorder-if-else",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["if-statement"],
      },
    },

    /* ── Lesson 2: Multiple Conditions with elif ──────────────────────────── */
    {
      id: "s4-elif-chains",
      stageId: "stage-04",
      title: "Multiple Conditions with elif",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Add one or more elif clauses to an if/else chain",
        "Explain that elif clauses are tested in order and only the first match runs",
        "Distinguish between an elif chain and separate if statements",
        "Recognise that only one branch in an if/elif/else chain executes",
      ],
      prerequisites: ["s4-if-else"],
      concepts: ["elif", "if-statement", "else-clause"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## elif: Else If\n\nWhen you need to check more than two cases, use `elif` (short for *else if*) between `if` and `else`. Python checks conditions from top to bottom and executes the **first** branch whose condition is truthy — the rest are skipped.\n\n```python\ngrade = 85\n\nif grade >= 90:\n    print(\"A\")\nelif grade >= 80:\n    print(\"B\")\nelif grade >= 70:\n    print(\"C\")\nelse:\n    print(\"F\")\n```\n\nFor `grade = 85`, Python checks:\n1. `85 >= 90`? No → skip\n2. `85 >= 80`? **Yes** → print `B` → stop checking",
        },
        {
          kind: "comparison",
          leftLabel: "elif chain (only ONE branch runs)",
          rightLabel: "Separate ifs (multiple can run)",
          leftCode: "score = 85\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")\nelif score >= 70:\n    print(\"C\")\n# Output: B",
          rightCode: "score = 85\nif score >= 90:\n    print(\"A\")\nif score >= 80:\n    print(\"B\")\nif score >= 70:\n    print(\"C\")\n# Output: B\n#         C",
          caption:
            "With separate if statements, all conditions are tested independently. With elif, Python stops at the first match.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Order Matters in elif Chains",
          body: "Because Python stops at the first matching condition, your elif clauses must be ordered correctly. In the grade example, putting `elif grade >= 70` before `elif grade >= 80` would cause every grade from 70–89 to print 'C', never 'B'.",
        },
        {
          kind: "code",
          language: "python",
          code: "hour = 14\n\nif hour < 12:\n    print(\"Good morning\")\nelif hour < 17:\n    print(\"Good afternoon\")\nelif hour < 21:\n    print(\"Good evening\")\nelse:\n    print(\"Good night\")",
          caption: "A time-of-day greeter: only the first matching branch executes.",
        },
      ],
      interactions: [
        {
          id: "s4-ec-predict-elif",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose:
            "Trace an elif chain to verify understanding that only the first matching branch runs.",
          expectedConceptIds: ["elif", "if-statement"],
          code: "n = 15\n\nif n > 100:\n    print(\"huge\")\nelif n > 50:\n    print(\"big\")\nelif n > 10:\n    print(\"medium\")\nelse:\n    print(\"small\")",
          expectedOutput: "medium",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Check each condition from top to bottom. Stop at the first one that is True.",
            },
            {
              level: "syntax",
              text: "15 > 100? No. 15 > 50? No. 15 > 10? Yes — print 'medium' and stop.",
            },
          ],
          feedback: {
            correct:
              "Correct! 15 > 100 is False, 15 > 50 is False, 15 > 10 is True — so 'medium' prints and the chain stops.",
            incorrect:
              "Trace from top to bottom: which is the first condition that is True for n=15?",
          },
        },
        {
          id: "s4-ec-mc-which-branch",
          kind: "multiple-choice",
          prompt:
            "Given `temp = 20`, which message does this code print?\n\n```python\nif temp > 30:\n    print(\"Hot\")\nelif temp > 20:\n    print(\"Warm\")\nelif temp == 20:\n    print(\"Perfect\")\nelse:\n    print(\"Cold\")\n```",
          beginnerPurpose:
            "Distinguish between > 20 (strict) and == 20 (exact) to catch a common off-by-one confusion in conditions.",
          expectedConceptIds: ["elif", "if-statement"],
          options: [
            {
              id: "opt-a",
              text: "Hot",
              isCorrect: false,
              explanation: "20 > 30 is False.",
            },
            {
              id: "opt-b",
              text: "Warm",
              isCorrect: false,
              explanation: "20 > 20 is False — this is a strict greater-than, so 20 does not satisfy it.",
            },
            {
              id: "opt-c",
              text: "Perfect",
              isCorrect: true,
              explanation:
                "20 > 30 is False, 20 > 20 is False, 20 == 20 is True — so 'Perfect' prints.",
            },
            {
              id: "opt-d",
              text: "Cold",
              isCorrect: false,
              explanation: "Cold would only print if all conditions above it were False. But 20 == 20 is True.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Check each condition strictly: > 20 does NOT include 20 itself; == 20 does.",
            },
          ],
          feedback: {
            correct: "Right! 20 > 20 is False (strict inequality), but 20 == 20 is True, so 'Perfect' prints.",
            incorrect:
              "Be careful: 20 > 20 is False because > is strict. Only == 20 matches exactly 20.",
          },
        },
        {
          id: "s4-ec-fill-elif",
          kind: "fill-code",
          prompt:
            "Complete the elif condition so the program prints 'teenager' for ages 13–17 (inclusive).",
          beginnerPurpose:
            "Practice writing a ranged elif condition using comparison operators.",
          expectedConceptIds: ["elif"],
          codeTemplate: "age = 15\n\nif age < 13:\n    print(\"child\")\nelif age ___ 17:\n    print(\"teenager\")\nelse:\n    print(\"adult\")",
          blanks: [
            {
              placeholder: "___",
              answer: "<=",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "We already know age >= 13 (the first if was False). We need age to be at most 17.",
            },
            {
              level: "syntax",
              text: "Use <= to mean 'less than or equal to': age <= 17.",
            },
          ],
          feedback: {
            correct: "Correct! elif age <= 17 catches ages 13–17 (ages below 13 were already excluded by the if).",
            incorrect:
              "Because the if already ruled out ages below 13, you only need age <= 17 here.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "elif",
          recallPrompt: "How is an elif chain different from a series of separate if statements?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s4-ec-predict-elif",
          "s4-ec-mc-which-branch",
          "s4-ec-fill-elif",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["elif"],
      },
    },

    /* ── Lesson 3: Repeating with while Loops ─────────────────────────────── */
    {
      id: "s4-while-loops",
      stageId: "stage-04",
      title: "Repeating with while Loops",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write a while loop that repeats a block until a condition becomes false",
        "Update the loop variable to prevent infinite loops",
        "Identify and explain what causes an infinite loop",
        "Trace the execution of a while loop step by step",
      ],
      prerequisites: ["s4-elif-chains"],
      concepts: ["while-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The while Loop\n\nA `while` loop repeats a block of code **as long as** its condition is truthy. Python checks the condition before each iteration; if it's False, the loop body is skipped entirely.\n\n```python\ncount = 1\nwhile count <= 5:\n    print(count)\n    count = count + 1   # update — this is crucial!\n\nprint(\"Done\")\n```\n\nOutput:\n```\n1\n2\n3\n4\n5\nDone\n```\n\n### Anatomy of a while Loop\n1. **Condition**: checked before every iteration\n2. **Loop body**: runs while condition is truthy (must be indented)\n3. **Update**: changes the state so the condition eventually becomes False",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Infinite Loops: The Most Common while Mistake",
          body: "If your loop body never makes the condition False, the loop runs forever (an infinite loop). This freezes or crashes your program. Always make sure something inside the loop eventually makes the condition False. Press Ctrl+C to stop an infinite loop in the terminal.",
        },
        {
          kind: "comparison",
          leftLabel: "Correct: updates count",
          rightLabel: "Infinite loop: never updates",
          leftCode: "count = 0\nwhile count < 3:\n    print(count)\n    count += 1\n# Prints: 0, 1, 2 then stops",
          rightCode: "count = 0\nwhile count < 3:\n    print(count)\n    # Missing: count += 1\n# Prints 0 forever!",
          caption:
            "The only difference is the missing count += 1. Always verify your loop has an update step.",
        },
        {
          kind: "glossary-term",
          term: "while-loop",
          definition:
            "A control flow statement that repeatedly executes a block of code as long as a condition is truthy. The condition is checked before each iteration.",
          example: "i = 0\nwhile i < 5:\n    print(i)\n    i += 1",
        },
      ],
      interactions: [
        {
          id: "s4-wl-predict-while",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose:
            "Trace a while loop iteration-by-iteration to confirm understanding of the loop cycle.",
          expectedConceptIds: ["while-loop"],
          code: "n = 10\nwhile n > 7:\n    print(n)\n    n -= 1",
          expectedOutput: "10\n9\n8",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Start with n=10. Check: 10 > 7? Yes → print 10, n becomes 9. Check again...",
            },
            {
              level: "syntax",
              text: "n -= 1 is shorthand for n = n - 1.",
            },
          ],
          feedback: {
            correct: "Correct! n=10 (True→print), n=9 (True→print), n=8 (True→print), n=7 (False→stop).",
            incorrect:
              "Trace step by step: print n while n > 7, decreasing n each time. What is n when the condition becomes False?",
          },
        },
        {
          id: "s4-wl-debug-infinite",
          kind: "debug-code",
          prompt:
            "This loop runs forever. Fix it so it prints the numbers 1 through 4 and then stops.",
          beginnerPurpose:
            "Practice spotting and fixing the missing-update infinite loop bug.",
          expectedConceptIds: ["while-loop"],
          brokenCode: "i = 1\nwhile i < 5:\n    print(i)",
          bugDescription:
            "The variable i is never updated inside the loop, so i < 5 is always True and the loop never ends.",
          fixedCode: "i = 1\nwhile i < 5:\n    print(i)\n    i += 1",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "For the loop to stop, the condition must eventually become False. What must change?",
            },
            {
              level: "syntax",
              text: "Add i += 1 inside the loop body so i grows toward 5.",
            },
          ],
          feedback: {
            correct: "Fixed! Adding i += 1 ensures i increases each iteration until i < 5 is False.",
            incorrect: "Add a line inside the loop that increments i: i += 1",
          },
        },
        {
          id: "s4-wl-fill-while",
          kind: "fill-code",
          prompt: "Complete the while loop so it prints 0, 2, 4, 6, 8 (even numbers below 10).",
          beginnerPurpose:
            "Write the condition and update step for a while loop that counts by twos.",
          expectedConceptIds: ["while-loop"],
          codeTemplate: "num = 0\nwhile num ___ 10:\n    print(num)\n    num += 2",
          blanks: [
            {
              placeholder: "___",
              answer: "<",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "The loop should run while num is still less than 10.",
            },
          ],
          feedback: {
            correct: "Correct! while num < 10 keeps the loop going while num is 0, 2, 4, 6, 8.",
            incorrect: "Use < to keep the loop going while num is still below 10.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "while-loop",
          recallPrompt: "What three things does every correctly-written while loop need?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s4-wl-predict-while",
          "s4-wl-debug-infinite",
          "s4-wl-fill-while",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["while-loop"],
      },
    },

    /* ── Lesson 4: for Loops and range() ──────────────────────────────────── */
    {
      id: "s4-for-loops-range",
      stageId: "stage-04",
      title: "for Loops and range()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Write a for loop using range() to repeat a fixed number of times",
        "Use range(n), range(start, stop), and range(start, stop, step)",
        "Identify the loop variable and its value during each iteration",
        "Explain that range() produces values up to but NOT including the stop value",
      ],
      prerequisites: ["s4-while-loops"],
      concepts: ["for-loop", "range", "loop-variable"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The for Loop\n\nA `for` loop iterates over a sequence. The most common use with `range()` runs the loop a fixed number of times:\n\n```python\nfor i in range(5):    # i takes values 0, 1, 2, 3, 4\n    print(i)\n```\n\n### range() Variants\n\n| Call | Values produced |\n|---|---|\n| `range(5)` | 0, 1, 2, 3, 4 |\n| `range(1, 6)` | 1, 2, 3, 4, 5 |\n| `range(0, 10, 2)` | 0, 2, 4, 6, 8 |\n| `range(5, 0, -1)` | 5, 4, 3, 2, 1 |\n\n**Important**: range() goes up to **but does not include** the stop value.\n\nThe `i` in `for i in range(...)` is the **loop variable** — it holds the current value from the sequence on each iteration. You can name it anything; `i`, `n`, `step` are common.",
        },
        {
          kind: "code",
          language: "python",
          code: "# Count from 1 to 5\nfor i in range(1, 6):\n    print(i)\n\n# Even numbers 0-8\nfor n in range(0, 10, 2):\n    print(n)",
          caption:
            "Two range() patterns: start/stop and start/stop/step.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "for vs while",
          body: "Use a for loop when you know in advance how many times to repeat (or when iterating over a sequence). Use a while loop when you need to repeat until some condition changes. In practice, for loops are more common for counting because they are harder to accidentally make infinite.",
        },
        {
          kind: "glossary-term",
          term: "range",
          definition:
            "A built-in Python function that produces a sequence of integers. Commonly used with for loops. range(stop), range(start, stop), or range(start, stop, step). The stop value is NOT included.",
          example: "range(5)    # 0,1,2,3,4\nrange(1,4)  # 1,2,3",
        },
        {
          kind: "glossary-term",
          term: "loop-variable",
          definition:
            "The variable in a for loop that takes on each successive value from the sequence being iterated. Defined in the `for ... in ...` header.",
          example: "for item in range(3):  # item is the loop variable\n    print(item)",
        },
      ],
      interactions: [
        {
          id: "s4-fl-predict-range",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose:
            "Verify understanding that range(1, 6) includes 1 and excludes 6.",
          expectedConceptIds: ["for-loop", "range", "loop-variable"],
          code: "for i in range(1, 6):\n    print(i * i)",
          expectedOutput: "1\n4\n9\n16\n25",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "range(1, 6) produces 1, 2, 3, 4, 5. For each, compute i * i.",
            },
          ],
          feedback: {
            correct: "Correct! range(1,6) → 1,2,3,4,5. Squaring each: 1,4,9,16,25.",
            incorrect:
              "range(1, 6) gives 1,2,3,4,5 (not including 6). Then i*i for each value.",
          },
        },
        {
          id: "s4-fl-fill-count",
          kind: "fill-code",
          prompt: "Complete the range() call so the loop prints 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
          beginnerPurpose:
            "Practice range() with start and stop to count from 1 to 10 inclusive.",
          expectedConceptIds: ["for-loop", "range"],
          codeTemplate: "for i in range(___, ___):\n    print(i)",
          blanks: [
            {
              placeholder: "___",
              answer: "1",
              caseSensitive: true,
            },
            {
              placeholder: "___",
              answer: "11",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "range(start, stop) produces start, start+1, ..., stop-1. To include 10, stop must be 11.",
            },
          ],
          feedback: {
            correct: "Correct! range(1, 11) produces 1 through 10 inclusive.",
            incorrect: "range(start, stop) includes start but excludes stop. To print 1-10, use range(1, 11).",
          },
        },
        {
          id: "s4-fl-run-times-table",
          kind: "run-code",
          prompt:
            "Write a program that prints the 7 times table: '7 x 1 = 7', '7 x 2 = 14', ..., '7 x 10 = 70'.",
          beginnerPurpose:
            "Combine a for loop with an f-string and arithmetic to produce formatted output.",
          expectedConceptIds: ["for-loop", "range", "loop-variable"],
          starterCode: "# Write your 7 times table loop below\n",
          task: "Use a for loop with range(1, 11) and an f-string to print each multiplication line.",
          expectedOutputContains: [
            "7 x 1 = 7",
            "7 x 5 = 35",
            "7 x 10 = 70",
          ],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            {
              level: "concept",
              text: "Loop i from 1 to 10. Each line: f\"7 x {i} = {7 * i}\"",
            },
            {
              level: "syntax",
              text: "for i in range(1, 11):\n    print(f\"7 x {i} = {7 * i}\")",
            },
          ],
          feedback: {
            correct: "Excellent! A for loop with range(1, 11) and an f-string produces the full times table.",
            incorrect:
              "Use for i in range(1, 11): and inside print with an f-string: f\"7 x {i} = {7 * i}\".",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "for-loop",
          recallPrompt: "What is a loop variable, and what values does range(2, 9, 3) produce?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "range",
          recallPrompt: "Why does range(10) not include 10?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s4-fl-predict-range",
          "s4-fl-fill-count",
          "s4-fl-run-times-table",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["for-loop", "range"],
      },
    },

    /* ── Lesson 5: break and continue ─────────────────────────────────────── */
    {
      id: "s4-break-continue",
      stageId: "stage-04",
      title: "break and continue",
      kind: "practice",
      difficulty: "beginner",
      objectives: [
        "Use break to exit a loop immediately",
        "Use continue to skip the rest of the current iteration and move to the next",
        "Identify which loop break or continue applies to in nested code",
        "Choose between break and continue for a given problem",
      ],
      prerequisites: ["s4-for-loops-range"],
      concepts: ["break", "continue", "for-loop", "while-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## break — Exit the Loop Now\n\n`break` immediately terminates the loop it is in. Execution jumps to the first line after the loop:\n\n```python\nfor i in range(10):\n    if i == 5:\n        break\n    print(i)\n# Prints: 0 1 2 3 4 (stops before 5)\n```\n\n## continue — Skip This Iteration\n\n`continue` skips the rest of the current iteration and goes back to check the loop condition (while) or move to the next value (for):\n\n```python\nfor i in range(6):\n    if i == 3:\n        continue\n    print(i)\n# Prints: 0 1 2 4 5 (3 is skipped)\n```\n\n### When to Use Each\n\n- **`break`**: when you've found what you were searching for, or when a termination condition is met mid-loop\n- **`continue`**: when you want to skip certain items but keep iterating over the rest",
        },
        {
          kind: "comparison",
          leftLabel: "break — exits the loop",
          rightLabel: "continue — skips one iteration",
          leftCode: "for i in range(5):\n    if i == 3:\n        break\n    print(i)\n# Output:\n# 0\n# 1\n# 2",
          rightCode: "for i in range(5):\n    if i == 3:\n        continue\n    print(i)\n# Output:\n# 0\n# 1\n# 2\n# 4",
          caption:
            "break stops the loop entirely; continue just skips the current step and continues with the next.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "break and continue Apply to the Innermost Loop",
          body: "If you have nested loops, break and continue only affect the loop they are directly inside. They do not escape an outer loop.",
        },
        {
          kind: "glossary-term",
          term: "break",
          definition:
            "A statement that immediately exits the loop it is inside. Execution continues with the first statement after the loop.",
          example: "while True:\n    x = int(input())\n    if x == 0:\n        break",
        },
        {
          kind: "glossary-term",
          term: "continue",
          definition:
            "A statement that skips the rest of the current loop iteration and moves on to the next one.",
          example: "for n in range(10):\n    if n % 2 == 0:\n        continue\n    print(n)  # only odd numbers",
        },
      ],
      interactions: [
        {
          id: "s4-bc-predict-break",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose:
            "Trace a for loop with break to verify the learner understands that execution stops at break.",
          expectedConceptIds: ["break", "for-loop"],
          code: "for n in range(1, 8):\n    if n == 4:\n        break\n    print(n)",
          expectedOutput: "1\n2\n3",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "range(1, 8) produces 1 through 7. When n == 4, break exits the loop.",
            },
          ],
          feedback: {
            correct: "Correct! The loop prints 1, 2, 3, then hits break when n=4 and stops.",
            incorrect:
              "When n reaches 4, break exits the loop immediately. 4, 5, 6, 7 are never printed.",
          },
        },
        {
          id: "s4-bc-debug-break-placement",
          kind: "debug-code",
          prompt:
            "This code is supposed to print only the numbers 1 through 5, but it stops too early. Fix the break condition.",
          beginnerPurpose:
            "Debug an off-by-one error in a break condition — a very common mistake.",
          expectedConceptIds: ["break", "for-loop"],
          brokenCode: "for i in range(1, 11):\n    if i == 5:\n        break\n    print(i)",
          bugDescription:
            "The break fires when i == 5, so 5 itself is never printed. The condition should trigger after printing 5, i.e., when i == 6.",
          fixedCode: "for i in range(1, 11):\n    if i == 6:\n        break\n    print(i)",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "break runs BEFORE print(i) in this code. When should you break to include 5 in the output?",
            },
            {
              level: "syntax",
              text: "Change the break condition from i == 5 to i == 6, so 5 gets printed before break fires.",
            },
          ],
          feedback: {
            correct: "Fixed! Breaking when i == 6 lets 1–5 print before the loop exits.",
            incorrect:
              "The break runs before print(i). To print 5, the break should trigger when i == 6, not i == 5.",
          },
        },
        {
          id: "s4-bc-fill-continue",
          kind: "fill-code",
          prompt:
            "Complete the code so it prints only odd numbers from 1 to 9 (skip even numbers using continue).",
          beginnerPurpose:
            "Apply continue to filter out unwanted values from a loop.",
          expectedConceptIds: ["continue", "for-loop"],
          codeTemplate: "for i in range(1, 10):\n    if i % 2 ___ 0:\n        continue\n    print(i)",
          blanks: [
            {
              placeholder: "___",
              answer: "==",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "A number is even when its remainder when divided by 2 equals zero.",
            },
            {
              level: "syntax",
              text: "i % 2 == 0 is True for even numbers. continue skips them.",
            },
          ],
          feedback: {
            correct: "Correct! if i % 2 == 0: continue skips even numbers, so only odd ones are printed.",
            incorrect:
              "Use == to check if the remainder is zero: if i % 2 == 0: continue.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "break",
          recallPrompt: "What is the difference between break and continue inside a loop?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "continue",
          recallPrompt: "Give a real-world example of when you would use continue instead of break.",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s4-bc-predict-break",
          "s4-bc-debug-break-placement",
          "s4-bc-fill-continue",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["break", "continue"],
      },
    },
  ],

  project: {
    id: "s4-project",
    stageId: "stage-04",
    title: "Number Guessing Game Logic",
    brief:
      "Write the core logic for a number guessing game: loop until the guess matches the secret number, give higher/lower hints, and count attempts.",
    requirements: [
      "Use a while loop",
      "Use if/elif/else for hints",
      "Count and display number of attempts",
      "Loop exits when correct guess",
      "Add a maximum attempt limit using break",
    ],
    acceptanceCriteria: [
      "Loop terminates correctly",
      "Hints are accurate",
      "Attempt count is correct",
    ],
    conceptIds: [
      "while-loop",
      "if-statement",
      "elif",
      "break",
      "variable",
      "int",
    ],
    difficulty: "beginner",
    starterCode:
      "secret_number = 42\nmax_attempts = 7\nattempts = 0\n\n# Your guessing loop here\n# For testing, use a hardcoded guess that changes each iteration\n# e.g., guesses = [10, 30, 50, 42]\nguesses = [10, 30, 50, 42]\nguess_index = 0\n\n# Write your while loop below\n",
  },
} satisfies Stage;
