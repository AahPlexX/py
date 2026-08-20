import type { Stage } from "@/course/course.schema";

export const stage04 = {
  id: "stage-04",
  number: 4,
  title: "Strings, Formatting, and Text Processing",
  summary:
    "Master Python strings: creation, indexing, slicing, all major methods, formatting approaches (f-strings, .format(), %, Template), Unicode, bytes, and encoding.",
  level: "beginner",
  masteryGateConceptIds: ["string-immutability", "string-indexing", "fstring-formatting"],

  lessons: [
    /* ── Lesson 4.1 — String creation and immutability ─────────────────────── */
    {
      id: "s4-string-creation-immutability",
      stageId: "stage-04",
      title: "String Creation and Immutability",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Create strings with single quotes, double quotes, and triple quotes",
        "Explain that strings are immutable — you cannot change characters in place",
        "Use str() to convert other types to strings",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Creating Strings\n\nA string is a sequence of characters enclosed in quotes:\n\n```python\nname = 'Alice'\ngreeting = \"Hello, world!\"\nmultiline = \"\"\"Line one\nLine two\nLine three\"\"\"\n```\n\nSingle and double quotes are identical in Python — use whichever avoids escaping:\n\n```python\nmessage = \"It's a beautiful day\"   # double quotes avoid escaping the apostrophe\nquote = 'She said \"hello\"'           # single quotes avoid escaping the double quotes\n```\n\n## Strings Are Immutable\n\nOnce a string is created, you cannot modify any of its characters:\n\n```python\nword = \"hello\"\nword[0] = 'H'   # TypeError: 'str' object does not support item assignment\n```\n\nTo produce a modified string, create a new one:\n\n```python\nword = \"hello\"\nword = 'H' + word[1:]   # creates a NEW string \"Hello\"\n```\n\n## Converting to String\n\n```python\nage = 25\ntext = str(age)      # '25'\npi = str(3.14)       # '3.14'\nflag = str(True)     # 'True'\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Immutability Is a Feature",
          body: "Because strings cannot be changed, they are safe to share between parts of your program without worrying about accidental modification. String methods that appear to 'modify' a string always return a new string.",
        },
        {
          kind: "why-matters",
          body: "Understanding immutability prevents a whole class of bugs. When you write `word.upper()`, you must use the return value — the original `word` is unchanged. Forgetting this is one of the most common beginner mistakes.",
        },
      ],
      interactions: [
        {
          id: "s4-string-creation-immutability-mc",
          kind: "multiple-choice",
          prompt: "What happens when you run `s = 'hello'; s[0] = 'H'`?",
          beginnerPurpose: "Confirm understanding of string immutability",
          expectedConceptIds: ["string-immutability"],
          options: [
            { id: "a", text: "s becomes 'Hello'", isCorrect: false, explanation: "Strings cannot be changed in place — Python raises a TypeError." },
            { id: "b", text: "Python raises a TypeError", isCorrect: true, explanation: "Correct! Strings are immutable. Item assignment raises TypeError: 'str' object does not support item assignment." },
            { id: "c", text: "s stays 'hello' with no error", isCorrect: false, explanation: "Python doesn't silently ignore the assignment — it raises an error." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Immutable means you cannot modify it — Python enforces this with an error." }],
          feedback: { correct: "Correct! Strings are immutable — item assignment raises TypeError.", incorrect: "Strings are immutable in Python. Trying to change a character raises TypeError." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-string-creation-immutability-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.2 — String indexing ─────────────────────────────────────── */
    {
      id: "s4-string-indexing",
      stageId: "stage-04",
      title: "String Indexing",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Access individual characters using positive indexes starting at 0",
        "Explain why the first character has index 0, not 1",
        "Predict what character a given index returns",
      ],
      prerequisites: [],
      concepts: ["string-indexing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Indexing into Strings\n\nEach character in a string has a position called an **index**. Python indexes start at **0**:\n\n```python\nword = \"Python\"\n#       P y t h o n\n#       0 1 2 3 4 5\n\nprint(word[0])   # 'P'\nprint(word[1])   # 'y'\nprint(word[5])   # 'n'\n```\n\nAccessing an index that doesn't exist raises an `IndexError`:\n\n```python\nword = \"hi\"\nprint(word[5])   # IndexError: string index out of range\n```\n\nIndexes are integers — you can use variables:\n\n```python\ni = 3\nprint(word[i])   # same as word[3]\n```",
        },
        {
          kind: "mental-model",
          title: "Strings as Numbered Slots",
          analogy: "Think of a string as a row of numbered mailboxes starting at 0. The first mailbox is 0, the second is 1, and so on. To get the letter in a specific mailbox, you use its number in square brackets.",
          explanation: "This 0-based numbering is used in most programming languages. It feels unnatural at first but quickly becomes automatic.",
        },
      ],
      interactions: [
        {
          id: "s4-string-indexing-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace string indexing to verify 0-based understanding",
          expectedConceptIds: ["string-indexing"],
          code: "s = \"banana\"\nprint(s[0])\nprint(s[3])\nprint(s[5])",
          expectedOutput: "b\na\na",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "b=0, a=1, n=2, a=3, n=4, a=5" }],
          feedback: { correct: "Correct! b is at index 0, a is at index 3, a is at index 5.", incorrect: "Index 0 is 'b', index 3 is 'a', index 5 is 'a'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-string-indexing-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.3 — Negative indexes ────────────────────────────────────── */
    {
      id: "s4-negative-indexes",
      stageId: "stage-04",
      title: "Negative Indexes",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use negative indexes to access characters from the end of a string",
        "Explain that -1 is the last character, -2 is second-to-last, etc.",
        "Choose the right index (positive or negative) for a given task",
      ],
      prerequisites: [],
      concepts: ["string-indexing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Negative Indexes: Counting from the End\n\nPython allows negative indexes that count backwards from the end:\n\n```python\nword = \"Python\"\n#       P  y  t  h  o  n\n#      -6 -5 -4 -3 -2 -1\n\nprint(word[-1])   # 'n'  (last character)\nprint(word[-2])   # 'o'  (second to last)\nprint(word[-6])   # 'P'  (same as word[0])\n```\n\nNegative indexes are equivalent to `len(s) + negative_index`:\n\n```python\nword = \"Python\"      # len = 6\nword[-1] == word[6 - 1] == word[5]   # True: both give 'n'\n```\n\n### Common Uses\n\n```python\nfilename = \"report.pdf\"\nprint(filename[-3:])   # 'pdf'  — file extension (slicing, covered next)\nprint(filename[-1])    # 'f'\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use -1 for the Last Character",
          body: "Instead of writing `s[len(s) - 1]`, just write `s[-1]`. This is idiomatic Python and avoids calling len() manually.",
        },
      ],
      interactions: [
        {
          id: "s4-negative-indexes-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply negative index knowledge",
          expectedConceptIds: ["string-indexing"],
          code: "s = \"world\"\nprint(s[-1])\nprint(s[-3])\nprint(s[-5])",
          expectedOutput: "d\nr\nw",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "w=0/-5, o=1/-4, r=2/-3, l=3/-2, d=4/-1" }],
          feedback: { correct: "Correct! -1 is 'd', -3 is 'r', -5 is 'w'.", incorrect: "Count from the end: -1 is the last char 'd', -3 is third from end 'r', -5 is first 'w'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-negative-indexes-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.4 — String slicing ──────────────────────────────────────── */
    {
      id: "s4-string-slicing",
      stageId: "stage-04",
      title: "String Slicing: Start, Stop, Step",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Extract substrings using slice notation s[start:stop]",
        "Use the step parameter to skip characters",
        "Apply negative indexes and omitted start/stop in slices",
      ],
      prerequisites: [],
      concepts: ["string-indexing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Slice Notation\n\nA slice extracts a portion of a string: `s[start:stop]` gives characters from index `start` up to (but NOT including) `stop`:\n\n```python\ns = \"Hello, World!\"\nprint(s[0:5])    # 'Hello'\nprint(s[7:12])   # 'World'\nprint(s[7:])     # 'World!'  — omit stop → go to end\nprint(s[:5])     # 'Hello'   — omit start → from beginning\nprint(s[:])      # 'Hello, World!'  — full copy\n```\n\n## Step Parameter\n\n`s[start:stop:step]` skips characters:\n\n```python\ns = \"abcdefgh\"\nprint(s[::2])      # 'aceg'   — every other character\nprint(s[1::2])     # 'bdfh'   — odd-indexed characters\nprint(s[::-1])     # 'hgfedcba' — reverse the string!\n```\n\n## Negative Indexes in Slices\n\n```python\nfilename = \"report.pdf\"\nprint(filename[-3:])   # 'pdf'\nprint(filename[:-4])   # 'report'\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "s[::-1] Reverses a String",
          body: "The idiom s[::-1] is the Pythonic way to reverse a string. Step -1 means 'go backwards one character at a time starting from the end'.",
        },
      ],
      interactions: [
        {
          id: "s4-string-slicing-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace slicing expressions",
          expectedConceptIds: ["string-indexing"],
          code: "s = \"programming\"\nprint(s[0:4])\nprint(s[-4:])\nprint(s[::3])",
          expectedOutput: "prog\nming\npmgig",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "s[0:4] → first 4 chars; s[-4:] → last 4 chars; s[::3] → every 3rd char starting at 0" }],
          feedback: { correct: "Correct! First 4 chars, last 4 chars, every 3rd char.", incorrect: "s[0:4] picks chars 0,1,2,3. s[-4:] picks the last 4. s[::3] picks indices 0,3,6,9." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-string-slicing-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.5 — String length with len() ────────────────────────────── */
    {
      id: "s4-string-length",
      stageId: "stage-04",
      title: "String Length with len()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use len() to get the number of characters in a string",
        "Explain that len() counts all characters including spaces and punctuation",
        "Use len() in conditions and calculations",
      ],
      prerequisites: [],
      concepts: ["string-indexing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## len() — Length of a String\n\n`len()` returns the number of characters in a string:\n\n```python\nprint(len(\"hello\"))        # 5\nprint(len(\"hello world\"))  # 11  (space counts!)\nprint(len(\"\"))             # 0   (empty string)\nprint(len(\"café\"))         # 4   (accented char is 1 character)\n```\n\n## Using len() Practically\n\n```python\npassword = \"secret123\"\n\nif len(password) < 8:\n    print(\"Password too short\")\nelse:\n    print(\"Password length OK\")\n\n# Last valid index is always len(s) - 1\nprint(password[len(password) - 1])  # same as password[-1]\n```\n\n## len() and Iteration\n\n```python\ntext = \"Python\"\nfor i in range(len(text)):\n    print(i, text[i])\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "len() Counts Characters, Not Bytes",
          body: "In Python 3, strings are Unicode. `len()` counts the number of Unicode code points (characters), not bytes. 'café' has 4 characters, even though it might take 5 bytes in UTF-8.",
        },
      ],
      interactions: [
        {
          id: "s4-string-length-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Use len() correctly including spaces",
          expectedConceptIds: ["string-indexing"],
          code: "s = \"Hello, World!\"\nprint(len(s))\nprint(len(s[7:12]))",
          expectedOutput: "13\n5",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Count all characters including comma, space, exclamation. Slice [7:12] gives 'World'." }],
          feedback: { correct: "Correct! 'Hello, World!' has 13 characters; 'World' has 5.", incorrect: "len() counts every character: letters, spaces, punctuation. s[7:12] is 'World' which has 5 chars." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-string-length-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.6 — String concatenation ────────────────────────────────── */
    {
      id: "s4-string-concatenation",
      stageId: "stage-04",
      title: "String Concatenation",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Join strings using the + operator",
        "Use += to append to an existing string variable",
        "Explain why you cannot concatenate a string and a non-string directly",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Concatenation with +\n\nThe `+` operator joins strings together:\n\n```python\nfirst = \"Hello\"\nsecond = \"World\"\nresult = first + \", \" + second + \"!\"\nprint(result)   # 'Hello, World!'\n```\n\n## += for Building Strings\n\n```python\nsentence = \"\"\nsentence += \"The\"\nsentence += \" sky\"\nsentence += \" is blue\"\nprint(sentence)   # 'The sky is blue'\n```\n\n## You Must Convert Before Concatenating\n\n```python\nname = \"Alice\"\nage = 30\n\n# This raises TypeError:\n# print(\"Name: \" + name + \" Age: \" + age)\n\n# Correct — convert age to string first:\nprint(\"Name: \" + name + \" Age: \" + str(age))\n# Or use an f-string (covered later):\nprint(f\"Name: {name} Age: {age}\")\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "TypeError: can only concatenate str (not 'int') to str",
          body: "Python will not automatically convert numbers to strings. Always call str() on numbers before using + with a string. This is a very common beginner error.",
        },
      ],
      interactions: [
        {
          id: "s4-string-concatenation-mc",
          kind: "multiple-choice",
          prompt: "What does `\"Score: \" + 42` do?",
          beginnerPurpose: "Understand TypeError when mixing types with +",
          expectedConceptIds: ["string-immutability"],
          options: [
            { id: "a", text: "Prints 'Score: 42'", isCorrect: false, explanation: "Python does not auto-convert — it raises TypeError." },
            { id: "b", text: "Raises TypeError", isCorrect: true, explanation: "Correct! You cannot concatenate a str and an int. Use str(42) or an f-string." },
            { id: "c", text: "Produces 'Score: ' with 42 ignored", isCorrect: false, explanation: "Python raises an error, it does not silently ignore the integer." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "+ between str and int raises TypeError — you must convert the int first." }],
          feedback: { correct: "Correct! Use str(42) or f'Score: {42}' instead.", incorrect: "You cannot mix str and int with +. Convert: 'Score: ' + str(42)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-string-concatenation-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.7 — String repetition ───────────────────────────────────── */
    {
      id: "s4-string-repetition",
      stageId: "stage-04",
      title: "String Repetition",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Repeat strings using the * operator",
        "Use string repetition to create separators and patterns",
        "Predict the result of string repetition expressions",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Repetition with *\n\nThe `*` operator repeats a string a given number of times:\n\n```python\nprint(\"ha\" * 3)    # 'hahaha'\nprint(\"-\" * 20)    # '--------------------'\nprint(\"ab\" * 0)    # ''  (empty string)\n```\n\nRepetition is useful for formatting:\n\n```python\ntitle = \"Report\"\nprint(title)\nprint(\"-\" * len(title))   # underline matching the title width\n# Output:\n# Report\n# ------\n```\n\nThe integer can be on either side:\n\n```python\nprint(3 * \"ho\")    # 'hohoho'\nprint(\"beep\" * 2)  # 'beepbeep'\n```\n\nMultiplying by zero or a negative number gives an empty string:\n\n```python\nprint(\"hello\" * -1)  # ''\n```",
        },
        {
          kind: "why-matters",
          body: "String repetition is great for creating visual separators in terminal output, building test data, and generating repeated patterns without loops.",
        },
      ],
      interactions: [
        {
          id: "s4-string-repetition-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply * operator to strings",
          expectedConceptIds: ["string-immutability"],
          code: "word = \"go\"\nprint(word * 3)\nprint(\"-\" * 5)\nprint(\"ha\" * 0)",
          expectedOutput: "gogogo\n-----\n",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "'go' * 3 repeats 'go' three times. '-' * 5 gives five dashes. Multiply by 0 gives empty string." }],
          feedback: { correct: "Correct! * repeats the string the specified number of times.", incorrect: "'go'*3 → 'gogogo', '-'*5 → '-----', 'ha'*0 → '' (empty)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-string-repetition-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.8 — Membership with in and not in ────────────────────────── */
    {
      id: "s4-membership-in",
      stageId: "stage-04",
      title: "Membership with in and not in",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Test whether a substring exists in a string using in",
        "Use not in to check absence",
        "Use membership tests in conditions",
      ],
      prerequisites: [],
      concepts: ["string-indexing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The in Operator\n\n`in` tests whether one string is a substring of another. It returns `True` or `False`:\n\n```python\ntext = \"Hello, World!\"\n\nprint(\"World\" in text)    # True\nprint(\"world\" in text)    # False  (case-sensitive!)\nprint(\"Hello\" in text)    # True\nprint(\"xyz\" in text)      # False\n```\n\n## not in\n\n`not in` is the inverse:\n\n```python\nprint(\"xyz\" not in text)    # True\nprint(\"World\" not in text)  # False\n```\n\n## Using in in Conditions\n\n```python\nemail = \"user@example.com\"\n\nif \"@\" in email:\n    print(\"Looks like a valid email\")\nelse:\n    print(\"Missing @ symbol\")\n\nbanned = [\"spam\", \"hack\", \"phish\"]\nmessage = \"This is not spam\"\nfor word in banned:\n    if word in message:\n        print(f\"Blocked: contains '{word}'\")\n        break\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "in Is Case-Sensitive",
          body: "'Hello' in 'hello world' is False because 'H' != 'h'. To do a case-insensitive check, convert both sides to the same case: 'hello' in text.lower().",
        },
      ],
      interactions: [
        {
          id: "s4-membership-in-mc",
          kind: "multiple-choice",
          prompt: "What does `'an' in 'banana'` evaluate to?",
          beginnerPurpose: "Apply in operator to substrings",
          expectedConceptIds: ["string-indexing"],
          options: [
            { id: "a", text: "True", isCorrect: true, explanation: "Correct! 'an' appears in 'banana' (at index 1 and 3), so in returns True." },
            { id: "b", text: "False", isCorrect: false, explanation: "'an' does appear in 'banana' — check positions 1-2 and 3-4." },
            { id: "c", text: "2 (the count of occurrences)", isCorrect: false, explanation: "in returns True/False, not a count. Use .count() for that." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Does 'banana' contain the substring 'an'?" }],
          feedback: { correct: "Correct! 'an' is found in 'banana', so in returns True.", incorrect: "in tests for presence and returns True/False. 'an' exists in 'banana'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-membership-in-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.9 — Case methods ─────────────────────────────────────────── */
    {
      id: "s4-case-methods",
      stageId: "stage-04",
      title: "Case Methods: lower, upper, casefold, title",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Convert strings to lowercase, uppercase, and title case",
        "Explain the difference between lower() and casefold()",
        "Remember that string methods return new strings — the original is unchanged",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Case Conversion Methods\n\n```python\ntext = \"Hello, World!\"\n\nprint(text.lower())     # 'hello, world!'\nprint(text.upper())     # 'HELLO, WORLD!'\nprint(text.title())     # 'Hello, World!'  (each word capitalized)\nprint(text.swapcase())  # 'hELLO, wORLD!'\n```\n\n## casefold() vs lower()\n\n`casefold()` is the aggressive lowercasing for case-insensitive comparisons — it handles edge cases in other languages (like German 'ß' → 'ss'):\n\n```python\nprint(\"Straße\".lower())      # 'straße'\nprint(\"Straße\".casefold())   # 'strasse'  (Unicode-aware)\n```\n\nFor English text, `lower()` and `casefold()` are identical.\n\n## Methods Return New Strings\n\n```python\noriginal = \"python\"\nresult = original.upper()\nprint(original)   # 'python'  — unchanged!\nprint(result)     # 'PYTHON'\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use casefold() for Case-Insensitive Comparisons",
          body: "When comparing user input to a stored value, use casefold() on both: `user_input.casefold() == stored.casefold()`. This handles unusual characters correctly.",
        },
      ],
      interactions: [
        {
          id: "s4-case-methods-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Remember that methods return new strings without changing the original",
          expectedConceptIds: ["string-immutability"],
          code: "s = \"hello WORLD\"\ns.upper()\nprint(s)\nprint(s.title())",
          expectedOutput: "hello WORLD\nHello World",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Calling s.upper() without assigning its result discards the new string. s is unchanged." }],
          feedback: { correct: "Correct! s.upper() is discarded. s is still 'hello WORLD'. s.title() returns 'Hello World'.", incorrect: "String methods return NEW strings. Without `s = s.upper()`, the original s is unchanged." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-case-methods-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.10 — Cleaning methods ───────────────────────────────────── */
    {
      id: "s4-cleaning-methods",
      stageId: "stage-04",
      title: "Cleaning Methods: strip, lstrip, rstrip",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Remove leading and trailing whitespace with strip()",
        "Use lstrip() and rstrip() to target one side only",
        "Strip specific characters by passing them as an argument",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## strip() — Remove Surrounding Whitespace\n\n```python\nraw = \"   hello world   \"\nprint(raw.strip())    # 'hello world'\nprint(raw.lstrip())   # 'hello world   '  (left only)\nprint(raw.rstrip())   # '   hello world'  (right only)\n```\n\n## Stripping Specific Characters\n\nPass a string of characters to strip — it removes any combination of those characters from the edges:\n\n```python\nprint(\"***hello***\".strip('*'))   # 'hello'\nprint(\"...done.\".strip('.'))      # 'done'\nprint(\"xxhelloxx\".strip('x'))     # 'hello'\n```\n\nNote: `strip('xy')` removes **any** leading or trailing `x` or `y`, not the substring `'xy'`.\n\n## Practical Use: Cleaning User Input\n\n```python\nuser_input = input(\"Enter your name: \")\nname = user_input.strip()   # removes accidental spaces\nprint(f\"Hello, {name}!\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "strip() Does Not Modify the Middle",
          body: "strip() only removes characters from the beginning and end of the string. It does not touch anything in the middle. '  hello   world  '.strip() gives 'hello   world'.",
        },
      ],
      interactions: [
        {
          id: "s4-cleaning-methods-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply strip() to clean whitespace",
          expectedConceptIds: ["string-immutability"],
          code: "s = \"  Python  \"\nprint(repr(s.strip()))\nprint(repr(s.lstrip()))\nprint(repr(s.rstrip()))",
          expectedOutput: "'Python'\n'Python  '\n'  Python'",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "strip() removes both sides; lstrip() removes left; rstrip() removes right. repr() shows quotes." }],
          feedback: { correct: "Correct! strip() removes both sides, lstrip() left, rstrip() right.", incorrect: "strip() removes leading+trailing spaces; lstrip() only left; rstrip() only right." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-cleaning-methods-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.11 — Searching methods ─────────────────────────────────── */
    {
      id: "s4-searching-methods",
      stageId: "stage-04",
      title: "Searching Methods: find, index, startswith, endswith",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use find() to locate a substring (returns -1 if not found)",
        "Use index() and understand it raises ValueError if not found",
        "Use startswith() and endswith() to test string boundaries",
      ],
      prerequisites: [],
      concepts: ["string-indexing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## find() and index()\n\nBoth return the position of the first occurrence of a substring:\n\n```python\ntext = \"Hello, World!\"\n\nprint(text.find(\"World\"))   # 7\nprint(text.find(\"xyz\"))     # -1  (not found)\n\nprint(text.index(\"World\"))  # 7\n# text.index(\"xyz\")         # raises ValueError!\n```\n\nKey difference: `find()` returns `-1` on failure; `index()` raises `ValueError`. Use `find()` when absence is expected; use `index()` when absence is a bug.\n\n## startswith() and endswith()\n\n```python\nfilename = \"report_2024.csv\"\n\nprint(filename.startswith(\"report\"))   # True\nprint(filename.endswith(\".csv\"))        # True\nprint(filename.endswith(\".pdf\"))        # False\n```\n\nBoth accept a tuple of options:\n\n```python\nprint(filename.endswith((\".csv\", \".xlsx\", \".tsv\")))   # True\n```\n\n## Optional start and end Parameters\n\n```python\ntext = \"abcabc\"\nprint(text.find(\"b\", 2))    # 4  — search starts at index 2\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "index() Raises ValueError — Find() Returns -1",
          body: "Choose based on whether 'not found' is expected: find() for searching where absence is possible; index() when you're sure the substring exists (and want an error otherwise).",
        },
      ],
      interactions: [
        {
          id: "s4-searching-methods-mc",
          kind: "multiple-choice",
          prompt: "What does `'banana'.find('na')` return?",
          beginnerPurpose: "Apply find() and understand it returns the index of the FIRST match",
          expectedConceptIds: ["string-indexing"],
          options: [
            { id: "a", text: "2 — index of the first 'na'", isCorrect: true, explanation: "Correct! 'na' first appears at index 2 in 'banana': b(0)a(1)n(2)a(3)n(4)a(5)." },
            { id: "b", text: "4 — index of the second 'na'", isCorrect: false, explanation: "find() returns the FIRST occurrence. The first 'na' starts at index 2." },
            { id: "c", text: "-1 — not found", isCorrect: false, explanation: "'na' is definitely in 'banana'. -1 is returned only when the substring is absent." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "b=0, a=1, n=2, a=3, n=4, a=5 — 'na' first appears at index 2." }],
          feedback: { correct: "Correct! find() returns the index of the first occurrence: 2.", incorrect: "find() returns the index of the first match. 'na' first appears at index 2 in 'banana'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-searching-methods-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.12 — replace and split ─────────────────────────────────── */
    {
      id: "s4-replace-split",
      stageId: "stage-04",
      title: "Replacement and Splitting: replace, split, rsplit, splitlines",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Replace substrings using replace()",
        "Split a string into a list using split() and rsplit()",
        "Split on line breaks with splitlines()",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## replace()\n\nReturns a new string with all occurrences of old replaced by new:\n\n```python\ntext = \"I like cats and cats\"\nprint(text.replace(\"cats\", \"dogs\"))   # 'I like dogs and dogs'\nprint(text.replace(\"cats\", \"dogs\", 1))  # 'I like dogs and cats'  (limit=1)\n```\n\n## split()\n\nSplits a string into a list of substrings:\n\n```python\ncsv = \"Alice,30,Engineer\"\nparts = csv.split(\",\")\nprint(parts)   # ['Alice', '30', 'Engineer']\n\nsentence = \"hello world foo\"\nwords = sentence.split()   # splits on any whitespace\nprint(words)   # ['hello', 'world', 'foo']\n```\n\n## rsplit() — Split from the Right\n\n```python\npath = \"usr/local/bin/python\"\nparts = path.rsplit(\"/\", 1)   # split at most 1 time from right\nprint(parts)   # ['usr/local/bin', 'python']\n```\n\n## splitlines()\n\nSplits on newlines (\\n, \\r\\n, \\r):\n\n```python\ntext = \"line1\\nline2\\nline3\"\nlines = text.splitlines()\nprint(lines)   # ['line1', 'line2', 'line3']\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "split() Without Arguments is Powerful",
          body: "Calling split() with no argument splits on any whitespace (spaces, tabs, newlines) and removes empty strings from the result. It's perfect for tokenizing user input.",
        },
      ],
      interactions: [
        {
          id: "s4-replace-split-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply split() and replace()",
          expectedConceptIds: ["string-immutability"],
          code: "s = \"one two three\"\nwords = s.split()\nprint(len(words))\nprint(s.replace(\"two\", \"2\"))",
          expectedOutput: "3\none 2 three",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "split() on whitespace gives ['one','two','three'] — 3 items. replace() swaps 'two' for '2'." }],
          feedback: { correct: "Correct! split() gives 3 words; replace() substitutes 'two' with '2'.", incorrect: "split() without args splits on whitespace → 3 words. replace() returns a new string." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-replace-split-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.13 — Joining strings with join() ────────────────────────── */
    {
      id: "s4-join",
      stageId: "stage-04",
      title: "Joining Strings with join()",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Join a list of strings using join()",
        "Explain why join() is called on the separator, not the list",
        "Use join() as the inverse of split()",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## join() — The Inverse of split()\n\n`join()` assembles a list of strings into one string, using the caller as a separator:\n\n```python\nwords = ['Hello', 'World', 'Python']\n\nresult = \" \".join(words)    # 'Hello World Python'\nresult = \"-\".join(words)    # 'Hello-World-Python'\nresult = \"\".join(words)     # 'HelloWorldPython'  (no separator)\nresult = \", \".join(words)   # 'Hello, World, Python'\n```\n\n## The Idiom: separator.join(iterable)\n\nThe separator string is the *caller*, and the list is the *argument* — the opposite of what beginners often expect:\n\n```python\n# Round-trip: split → process → join\nsentence = \"the quick brown fox\"\nwords = sentence.split()                  # ['the', 'quick', 'brown', 'fox']\nwords[2] = \"red\"                          # ['the', 'quick', 'red', 'fox']\nnew_sentence = \" \".join(words)            # 'the quick red fox'\n```\n\n## Why Not +?\n\n```python\n# Slow (creates many intermediate strings):\nresult = \"\"\nfor word in words:\n    result += word + \" \"   # avoid for large lists\n\n# Fast (join builds it efficiently):\nresult = \" \".join(words)\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "join() Only Works with Strings",
          body: "All items in the list must be strings. If you have numbers, convert them first: ', '.join(str(n) for n in [1, 2, 3])",
        },
      ],
      interactions: [
        {
          id: "s4-join-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply join() correctly with different separators",
          expectedConceptIds: ["string-immutability"],
          code: "parts = ['2024', '06', '15']\nprint(\"-\".join(parts))\nprint(\"/\".join(parts))\nprint(\"\".join(parts))",
          expectedOutput: "2024-06-15\n2024/06/15\n20240615",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "The separator goes BETWEEN each element, not after the last one." }],
          feedback: { correct: "Correct! join() inserts the separator between each element.", incorrect: "join() puts the separator BETWEEN elements: '-'.join(['a','b','c']) gives 'a-b-c'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-join-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.14 — Character classification ───────────────────────────── */
    {
      id: "s4-char-classification",
      stageId: "stage-04",
      title: "Character Classification: isalpha, isdigit, isalnum, isspace",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use isalpha(), isdigit(), isalnum(), and isspace() to classify strings",
        "Understand these methods return True only if ALL characters satisfy the condition",
        "Apply character classification to validate input",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Character Classification Methods\n\nThese methods return `True` if **every** character in the string satisfies the test:\n\n```python\nprint(\"hello\".isalpha())      # True   — all letters\nprint(\"hello3\".isalpha())     # False  — '3' is not a letter\nprint(\"12345\".isdigit())      # True   — all digits\nprint(\"3.14\".isdigit())       # False  — '.' is not a digit\nprint(\"hello3\".isalnum())     # True   — letters and/or digits\nprint(\"   \".isspace())        # True   — all whitespace\nprint(\"\".isalpha())           # False  — empty string returns False\n```\n\n## More Methods\n\n```python\nprint(\"hello\".islower())    # True\nprint(\"HELLO\".isupper())    # True\nprint(\"Hello World\".istitle())  # True\n```\n\n## Practical: Input Validation\n\n```python\nusername = input(\"Username: \")\nif not username.isalnum():\n    print(\"Username must contain only letters and digits\")\nelif len(username) < 3:\n    print(\"Username must be at least 3 characters\")\nelse:\n    print(f\"Welcome, {username}!\")\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "All Characters Must Match",
          body: "These methods return True only when EVERY character qualifies. '123abc'.isdigit() is False because 'a', 'b', 'c' are not digits. An empty string always returns False.",
        },
      ],
      interactions: [
        {
          id: "s4-char-classification-mc",
          kind: "multiple-choice",
          prompt: "Which expression returns True?",
          beginnerPurpose: "Apply character classification methods",
          expectedConceptIds: ["string-immutability"],
          options: [
            { id: "a", text: "'hello world'.isalpha()", isCorrect: false, explanation: "The space is not a letter, so isalpha() returns False." },
            { id: "b", text: "'abc123'.isalnum()", isCorrect: true, explanation: "Correct! isalnum() returns True when all characters are letters or digits. 'abc123' qualifies." },
            { id: "c", text: "'3.14'.isdigit()", isCorrect: false, explanation: "The decimal point '.' is not a digit, so isdigit() returns False." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "isalnum() returns True for letters and/or digits — no spaces, punctuation." }],
          feedback: { correct: "Correct! 'abc123' contains only letters and digits.", incorrect: "isalpha() fails on spaces; isdigit() fails on '.'; only isalnum() passes for 'abc123'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-char-classification-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.15 — Formatted string literals ─────────────────────────── */
    {
      id: "s4-fstrings",
      stageId: "stage-04",
      title: "Formatted String Literals (f-strings)",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Create f-strings with embedded expressions",
        "Embed variables, method calls, and arithmetic in f-strings",
        "Explain why f-strings are preferred over concatenation",
      ],
      prerequisites: [],
      concepts: ["fstring-formatting"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## f-strings: The Modern Way to Format\n\nPrefix a string literal with `f` or `F` and embed expressions in `{}`:\n\n```python\nname = \"Alice\"\nage = 30\nprint(f\"My name is {name} and I am {age} years old.\")\n# 'My name is Alice and I am 30 years old.'\n```\n\n## Any Expression Works Inside {}\n\n```python\nx = 10\nprint(f\"Double: {x * 2}\")\nprint(f\"Square: {x ** 2}\")\nprint(f\"Upper: {'hello'.upper()}\")\nprint(f\"Pi ≈ {22/7:.2f}\")\n```\n\n## Multiline and Nested f-strings\n\n```python\nitems = [\"apple\", \"banana\", \"cherry\"]\nprint(f\"First item: {items[0].title()}\")\nprint(f\"Count: {len(items)} items\")\n\n# Debug format with = (Python 3.8+)\nwidth = 42\nprint(f\"{width=}\")   # 'width=42'\n```\n\n## f-string vs Concatenation\n\n```python\n# Tedious and error-prone:\nprint(\"Hello \" + name + \", you are \" + str(age) + \" years old.\")\n\n# Clean and readable:\nprint(f\"Hello {name}, you are {age} years old.\")\n```",
        },
        {
          kind: "why-matters",
          body: "f-strings were introduced in Python 3.6 and are now the standard way to build strings with embedded values. They are faster than .format(), more readable than concatenation, and support arbitrary expressions.",
        },
      ],
      interactions: [
        {
          id: "s4-fstrings-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Read and trace f-strings with embedded expressions",
          expectedConceptIds: ["fstring-formatting"],
          code: "x = 5\ny = 3\nprint(f\"{x} + {y} = {x + y}\")\nprint(f\"{x * y} is {'odd' if x * y % 2 else 'even'}\")",
          expectedOutput: "5 + 3 = 8\n15 is odd",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Expressions inside {} are evaluated: x+y=8, x*y=15, 15%2=1 which is truthy so 'odd'." }],
          feedback: { correct: "Correct! f-strings evaluate expressions at runtime.", incorrect: "x+y=8, x*y=15. 15%2 is 1 (truthy) so the ternary returns 'odd'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-fstrings-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.16 — Format spec mini-language ─────────────────────────── */
    {
      id: "s4-format-spec",
      stageId: "stage-04",
      title: "Format Spec Mini-Language: Alignment, Padding, Precision",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Format numbers with width, precision, and fill characters",
        "Align text left, right, and center in fixed-width columns",
        "Use format specifiers inside f-strings",
      ],
      prerequisites: [],
      concepts: ["fstring-formatting"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Format Spec Syntax\n\nInside `{}` in f-strings (and `.format()`), after a colon you can write a format spec:\n\n```\n{value:[[fill]align][sign][width][.precision][type]}\n```\n\n## Number Formatting\n\n```python\npi = 3.14159\nprint(f\"{pi:.2f}\")     # '3.14'     — 2 decimal places\nprint(f\"{pi:.4f}\")     # '3.1416'   — 4 decimal places\nprint(f\"{pi:8.2f}\")    # '    3.14'  — width 8, 2 decimals\nprint(f\"{1000000:,}\")  # '1,000,000' — comma separator\nprint(f\"{0.75:.0%}\")   # '75%'       — percentage\n```\n\n## Alignment\n\n```python\nfor name, score in [(\"Alice\", 95), (\"Bob\", 87), (\"Charlie\", 100)]:\n    print(f\"{name:<10}{score:>5}\")\n# Alice          95\n# Bob            87\n# Charlie       100\n```\n\nAlignment characters:\n- `<` left-align\n- `>` right-align\n- `^` center\n- `=` pad after sign (for numbers)\n\n## Fill Character\n\n```python\nprint(f\"{'hello':*^20}\")  # '*******hello********'  — center with *\nprint(f\"{42:0>5}\")        # '00042'                   — zero-padded\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use Format Specs for Table Output",
          body: "Format specifiers make it easy to produce aligned columns. Right-align numbers and left-align text to produce readable tables without manual string padding.",
        },
      ],
      interactions: [
        {
          id: "s4-format-spec-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply format specifiers for number and alignment formatting",
          expectedConceptIds: ["fstring-formatting"],
          code: "price = 9.5\nprint(f\"{price:8.2f}\")\nprint(f\"{'hi':>10}\")",
          expectedOutput: "    9.50\n        hi",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: ":8.2f means width 8, 2 decimal places, right-aligned by default for numbers. :>10 right-aligns in width 10." }],
          feedback: { correct: "Correct! Numbers are right-aligned by default; :> explicitly right-aligns text.", incorrect: "9.5 formatted as :8.2f is '    9.50' (width 8, 2 decimals). 'hi' with :>10 is '        hi' (right-aligned in width 10)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-format-spec-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.17 — .format() method ──────────────────────────────────── */
    {
      id: "s4-format-method",
      stageId: "stage-04",
      title: "The .format() Method",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use str.format() with positional and keyword placeholders",
        "Apply format specifiers inside .format()",
        "Recognise .format() in code written before Python 3.6",
      ],
      prerequisites: [],
      concepts: ["fstring-formatting"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## str.format() — Pre-f-string Formatting\n\n`.format()` uses `{}` placeholders in the string and fills them from arguments:\n\n```python\n# Positional\nprint(\"{} is {} years old\".format(\"Alice\", 30))\n# 'Alice is 30 years old'\n\n# Numbered positions\nprint(\"{0} and {1}, then {0} again\".format(\"spam\", \"eggs\"))\n# 'spam and eggs, then spam again'\n\n# Keyword arguments\nprint(\"{name} scored {score}\".format(name=\"Bob\", score=95))\n# 'Bob scored 95'\n```\n\n## Format Specifiers Work the Same\n\n```python\nprint(\"{:.2f}\".format(3.14159))    # '3.14'\nprint(\"{:>10}\".format(\"hi\"))       # '        hi'\n```\n\n## When You'll See .format()\n\n```python\n# Common in Python 2 code and code written before 3.6:\ntemplate = \"Dear {name},\\nYour balance is {balance:.2f}.\"\nprint(template.format(name=\"Alice\", balance=123.456))\n```\n\nFor new code, prefer f-strings — they're more readable. But you must be able to read `.format()` when maintaining existing codebases.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "f-strings Are Usually Better for New Code",
          body: ".format() is still useful when the template string is stored in a variable or loaded from a file (since f-strings must be literals in source code).",
        },
      ],
      interactions: [
        {
          id: "s4-format-method-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Read and trace .format() with keyword arguments",
          expectedConceptIds: ["fstring-formatting"],
          code: "tmpl = \"Hello, {name}! You have {count} messages.\"\nprint(tmpl.format(name=\"Dana\", count=5))",
          expectedOutput: "Hello, Dana! You have 5 messages.",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "{name} is replaced by the keyword argument name='Dana', etc." }],
          feedback: { correct: "Correct! .format() fills named placeholders from keyword arguments.", incorrect: ".format() replaces {name} with 'Dana' and {count} with 5." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-format-method-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.18 — Old % formatting ──────────────────────────────────── */
    {
      id: "s4-percent-formatting",
      stageId: "stage-04",
      title: "Old % Formatting",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Read and understand %-style format strings",
        "Use %s, %d, %f with a tuple of values",
        "Recognise % formatting as legacy — prefer f-strings in new code",
      ],
      prerequisites: [],
      concepts: ["fstring-formatting"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## % Formatting: The Classic Way\n\nThe `%` operator substitutes values into a format string using C-style format codes:\n\n```python\nname = \"Alice\"\nage = 30\nscore = 98.5\n\nprint(\"Name: %s\" % name)              # 'Name: Alice'\nprint(\"Age: %d\" % age)                # 'Age: 30'\nprint(\"Score: %.1f\" % score)          # 'Score: 98.5'\nprint(\"%s is %d years old\" % (name, age))  # requires tuple for multiple values\n```\n\n## Common Format Codes\n\n| Code | Meaning |\n|------|---------|\n| `%s` | String (calls str()) |\n| `%d` | Integer |\n| `%f` | Float |\n| `%r` | Repr |\n| `%.2f` | Float with 2 decimal places |\n| `%10s` | String right-aligned in width 10 |\n\n## Why You Still Need to Know This\n\n```python\n# Python's logging module uses % formatting:\nimport logging\nlogging.warning(\"User %s failed login %d times\", username, count)\n# (Note: logging passes % args separately — do NOT pre-format them)\n```\n\nYou will encounter `%` formatting in older code, logging, and C extensions. Always use f-strings or `.format()` for new string building.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Use a Tuple for Multiple Values",
          body: "When substituting multiple values with %, you MUST use a tuple: `'%s and %s' % (a, b)`. Using a list or single value when multiple are expected raises TypeError.",
        },
      ],
      interactions: [
        {
          id: "s4-percent-formatting-mc",
          kind: "multiple-choice",
          prompt: "What does `'Hello, %s! You are %d.' % ('Bob', 25)` produce?",
          beginnerPurpose: "Read basic % formatting",
          expectedConceptIds: ["fstring-formatting"],
          options: [
            { id: "a", text: "'Hello, Bob! You are 25.'", isCorrect: true, explanation: "Correct! %s inserts the string 'Bob' and %d inserts the integer 25." },
            { id: "b", text: "'Hello, %s! You are %d.'", isCorrect: false, explanation: "% substitutes the format codes — it doesn't leave them as-is." },
            { id: "c", text: "TypeError", isCorrect: false, explanation: "The tuple has exactly 2 values for 2 format codes — this is correct usage." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "%s substitutes a string; %d substitutes an integer." }],
          feedback: { correct: "Correct! %s → 'Bob', %d → 25.", incorrect: "%s inserts the string 'Bob'; %d inserts the integer 25." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-percent-formatting-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.19 — Template strings ──────────────────────────────────── */
    {
      id: "s4-template-strings",
      stageId: "stage-04",
      title: "Template Strings",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use string.Template with $placeholder syntax",
        "Substitute values using substitute() and safe_substitute()",
        "Explain when Template strings are safer than f-strings for user-supplied templates",
      ],
      prerequisites: [],
      concepts: ["fstring-formatting"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## string.Template\n\nThe `string` module provides `Template` — a simple substitution format that uses `$placeholder` syntax:\n\n```python\nfrom string import Template\n\nt = Template(\"Hello, $name! You have $count messages.\")\nresult = t.substitute(name=\"Alice\", count=5)\nprint(result)   # 'Hello, Alice! You have 5 messages.'\n```\n\n## substitute() vs safe_substitute()\n\n```python\nt = Template(\"Hello, $name and $other\")\n\n# substitute() raises KeyError if a placeholder is missing:\n# t.substitute(name=\"Alice\")   # KeyError: 'other'\n\n# safe_substitute() leaves missing placeholders as-is:\nresult = t.safe_substitute(name=\"Alice\")\nprint(result)   # 'Hello, Alice and $other'\n```\n\n## Escaping $\n\nUse `$$` to produce a literal dollar sign:\n\n```python\nt = Template(\"Price: $$$amount\")\nprint(t.substitute(amount=\"9.99\"))  # 'Price: $9.99'\n```\n\n## When to Use Template\n\nTemplate strings are designed for user-supplied templates — they don't allow arbitrary code execution, unlike f-strings. This makes them safer when the template comes from user input or config files.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Template Strings and Security",
          body: "Never use f-strings or .format() for templates provided by users — they can execute arbitrary code or access internal variables. Use string.Template instead: it only does simple substitution with no expression evaluation.",
        },
      ],
      interactions: [
        {
          id: "s4-template-strings-mc",
          kind: "multiple-choice",
          prompt: "What does `Template('$x + $y = $z').safe_substitute(x=1, y=2)` return?",
          beginnerPurpose: "Understand safe_substitute() behavior with missing keys",
          expectedConceptIds: ["fstring-formatting"],
          options: [
            { id: "a", text: "'1 + 2 = $z'", isCorrect: true, explanation: "Correct! safe_substitute() fills x=1 and y=2, but leaves $z intact since 'z' was not provided." },
            { id: "b", text: "KeyError", isCorrect: false, explanation: "safe_substitute() does NOT raise an error for missing keys — it leaves them as-is." },
            { id: "c", text: "'1 + 2 = '", isCorrect: false, explanation: "safe_substitute() leaves '$z' in the output rather than replacing with empty string." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "safe_substitute() = fill what you have, leave the rest unchanged." }],
          feedback: { correct: "Correct! Missing placeholders are left as $z with safe_substitute().", incorrect: "safe_substitute() fills known placeholders and leaves unknown ones as $z." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-template-strings-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.20 — Python 3.14 template string literals ─────────────── */
    {
      id: "s4-python314-template-strings",
      stageId: "stage-04",
      title: "Python 3.14 Template String Literals",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Describe what t-strings (PEP 750) add to Python 3.14",
        "Explain the key difference between f-strings and t-strings",
        "Understand the use case: safe, lazy, or custom interpolation",
      ],
      prerequisites: [],
      concepts: ["fstring-formatting"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## t-strings: Template Literals (Python 3.14+)\n\nPEP 750 introduces **template string literals** (t-strings) in Python 3.14. They look like f-strings but use the `t` prefix:\n\n```python\n# Python 3.14+\nname = \"Alice\"\nt = t\"Hello, {name}!\"\n```\n\nUnlike f-strings which immediately produce a `str`, a t-string produces a `Template` object that can be inspected or processed before rendering:\n\n```python\nfrom string.templatelib import Template\n\nname = \"<script>alert('xss')</script>\"\n\n# f-string: immediately embeds the raw value\ndangerous = f\"Hello, {name}!\"\n\n# t-string: you control how values are inserted\nsafe_template = t\"Hello, {name}!\"\n# A library can escape HTML before rendering:\n# html = html_render(safe_template)\n```\n\n## Why t-strings Matter\n\nf-strings are eagerly evaluated and always produce plain strings. t-strings give libraries a hook to:\n- Escape HTML/SQL safely\n- Log with structured metadata\n- Translate messages lazily\n- Validate template values before rendering\n\n## Status\n\nt-strings are **new in Python 3.14** (released October 2024). Support in libraries is still developing. The syntax is finalized but real-world patterns are emerging.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "t-strings Are a Foundation for Libraries",
          body: "t-strings are not a replacement for f-strings — they're a building block for libraries that need structured interpolation. For everyday output, f-strings remain the right choice.",
        },
      ],
      interactions: [
        {
          id: "s4-python314-template-strings-mc",
          kind: "multiple-choice",
          prompt: "What is the key difference between an f-string and a t-string (Python 3.14)?",
          beginnerPurpose: "Distinguish eager evaluation (f-string) from lazy template object (t-string)",
          expectedConceptIds: ["fstring-formatting"],
          options: [
            { id: "a", text: "f-strings immediately produce a str; t-strings produce a Template object", isCorrect: true, explanation: "Correct! f-strings are eagerly evaluated to str. t-strings produce a Template object that a library can process before converting to str." },
            { id: "b", text: "t-strings are faster than f-strings", isCorrect: false, explanation: "Speed is not the motivation. t-strings exist for structured, library-controlled interpolation." },
            { id: "c", text: "t-strings only work with string.Template", isCorrect: false, explanation: "t-strings are a new language feature (PEP 750), unrelated to the older string.Template class." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The core value: t-strings defer evaluation to let libraries control how values are inserted." }],
          feedback: { correct: "Correct! t-strings produce Template objects, enabling safe/structured interpolation.", incorrect: "The key: f-strings → immediate str. t-strings → Template object for library-controlled rendering." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-python314-template-strings-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.21 — Unicode concepts ──────────────────────────────────── */
    {
      id: "s4-unicode-concepts",
      stageId: "stage-04",
      title: "Unicode Concepts: Code Points, Normalization, Encoding Boundaries",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what a Unicode code point is and use ord() and chr()",
        "Describe how normalization (NFC, NFD) affects string comparison",
        "Understand the boundary between text (str) and bytes",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Unicode: Every Character Has a Number\n\nUnicode assigns a unique integer (**code point**) to every character:\n\n```python\nprint(ord('A'))      # 65\nprint(ord('€'))      # 8364\nprint(ord('😀'))     # 128512\n\nprint(chr(65))       # 'A'\nprint(chr(8364))     # '€'\nprint('\\u00e9')     # 'é'  (Unicode escape)\nprint('\\U0001F600')  # '😀'\n```\n\n## Python 3 Strings Are Unicode\n\nAll Python 3 strings (`str`) are Unicode. You can include any character:\n\n```python\ngreeting = \"Héllo\"\ncafe = \"café\"\nmessage = \"こんにちは\"\n```\n\n## Normalization\n\nThe same character can be encoded in multiple ways. 'é' can be:\n- **NFC**: one code point U+00E9 (precomposed)\n- **NFD**: two code points U+0065 + U+0301 (base + combining accent)\n\n```python\nimport unicodedata\n\ne_nfc = '\\u00e9'           # é (1 code point)\ne_nfd = 'e\\u0301'          # é (2 code points)\n\nprint(e_nfc == e_nfd)      # False! Same visual, different code points\nprint(len(e_nfc), len(e_nfd))  # 1  2\n\n# Normalize before comparing:\ne1 = unicodedata.normalize('NFC', e_nfc)\ne2 = unicodedata.normalize('NFC', e_nfd)\nprint(e1 == e2)            # True\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Normalize Before Comparing User Input",
          body: "Text from different sources may use different Unicode normalizations. Always normalize to NFC before comparing, sorting, or storing strings that may come from multiple platforms.",
        },
      ],
      interactions: [
        {
          id: "s4-unicode-concepts-mc",
          kind: "multiple-choice",
          prompt: "What does `ord('A')` return?",
          beginnerPurpose: "Use ord() to get a character's Unicode code point",
          expectedConceptIds: ["string-immutability"],
          options: [
            { id: "a", text: "65", isCorrect: true, explanation: "Correct! 'A' has Unicode code point 65 (same as ASCII)." },
            { id: "b", text: "'A'", isCorrect: false, explanation: "ord() returns an integer code point, not a character." },
            { id: "c", text: "1", isCorrect: false, explanation: "ord() does not return the position in the alphabet — it returns the Unicode code point, which is 65 for 'A'." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "ord() converts a character to its integer Unicode code point." }],
          feedback: { correct: "Correct! ord('A') is 65 — the Unicode (and ASCII) code point for 'A'.", incorrect: "ord() returns the integer Unicode code point: ord('A') = 65." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-unicode-concepts-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.22 — Bytes vs strings ───────────────────────────────────── */
    {
      id: "s4-bytes-vs-strings",
      stageId: "stage-04",
      title: "Bytes vs Strings",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain the difference between str and bytes in Python 3",
        "Create bytes literals and access individual bytes",
        "Recognise when you need bytes vs str",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## str vs bytes: Two Distinct Types\n\nIn Python 3, `str` is text (Unicode), and `bytes` is raw binary data. They are completely separate:\n\n```python\ntext = \"hello\"           # str — Unicode text\ndata = b\"hello\"          # bytes — raw bytes\n\nprint(type(text))   # <class 'str'>\nprint(type(data))   # <class 'bytes'>\nprint(text == data) # False — str != bytes!\n```\n\n## bytes Literals\n\nA `b\"...\"` literal can only contain ASCII characters and escape sequences:\n\n```python\nb1 = b\"hello\"\nb2 = bytes([72, 101, 108, 108, 111])   # same thing from int list\nprint(b2)          # b'Hello'\nprint(b2[0])       # 72  — indexing bytes gives an int!\nprint(b2[1:3])     # b'el' — slicing bytes gives bytes\n```\n\n## When Do You Use bytes?\n\n- Reading binary files: images, audio, executables\n- Network sockets and protocols\n- Cryptography and hashing\n- Encoding/decoding text between systems\n\n```python\n# Files opened in binary mode return bytes:\nwith open(\"image.png\", \"rb\") as f:\n    data = f.read()   # bytes object\n    print(type(data), len(data))\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Bytes Indexing Returns Integers",
          body: "While s[0] on a str returns a one-character string, b[0] on a bytes object returns an integer (the byte value 0–255). This is a common source of confusion.",
        },
      ],
      interactions: [
        {
          id: "s4-bytes-vs-strings-mc",
          kind: "multiple-choice",
          prompt: "What does `b'hello'[0]` return?",
          beginnerPurpose: "Distinguish bytes indexing (int) from str indexing (char)",
          expectedConceptIds: ["string-immutability"],
          options: [
            { id: "a", text: "'h'", isCorrect: false, explanation: "Indexing a str gives a character, but indexing bytes gives an integer byte value." },
            { id: "b", text: "104 (the ASCII value of 'h')", isCorrect: true, explanation: "Correct! Indexing a bytes object returns an integer — the byte value. 'h' has ASCII value 104." },
            { id: "c", text: "b'h'", isCorrect: false, explanation: "b'h' is a 1-byte bytes object. Indexing returns an int, not bytes." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "bytes[index] returns an integer, not a character or bytes." }],
          feedback: { correct: "Correct! bytes indexing returns the integer byte value (104 for 'h').", incorrect: "bytes[0] returns an integer (the byte value). str[0] returns a character. They behave differently." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-bytes-vs-strings-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.23 — Encoding and decoding text ─────────────────────────── */
    {
      id: "s4-encoding-decoding",
      stageId: "stage-04",
      title: "Encoding and Decoding Text",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Encode a str to bytes using encode()",
        "Decode bytes back to str using decode()",
        "Explain why UTF-8 is the default and recommended encoding",
      ],
      prerequisites: [],
      concepts: ["string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Encoding: str → bytes\n\n`str.encode()` converts text to bytes using a named encoding:\n\n```python\ntext = \"Hello, café!\"\n\n# UTF-8 (default) — handles all Unicode\nutf8_bytes = text.encode('utf-8')\nprint(utf8_bytes)       # b'Hello, caf\\xc3\\xa9!'\nprint(len(utf8_bytes))  # 13  ('é' takes 2 bytes in UTF-8)\n\n# UTF-16\nutf16_bytes = text.encode('utf-16')\nprint(len(utf16_bytes))  # 26 + BOM\n```\n\n## Decoding: bytes → str\n\n`bytes.decode()` converts bytes back to text:\n\n```python\ndata = b'Hello, world!'\ntext = data.decode('utf-8')\nprint(text)   # 'Hello, world!'\n\n# Error handling:\nbad_bytes = b'\\xff\\xfe'\ntry:\n    text = bad_bytes.decode('utf-8')\nexcept UnicodeDecodeError:\n    text = bad_bytes.decode('utf-8', errors='replace')  # replaces with �\n    print(text)   # '\\ufffd\\ufffd'\n```\n\n## UTF-8 Best Practices\n\n```python\n# Always specify encoding when opening text files:\nwith open('data.txt', 'r', encoding='utf-8') as f:\n    content = f.read()\n\n# Default open() uses the OS locale — may not be UTF-8!\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always Use UTF-8",
          body: "UTF-8 can represent every Unicode character and is the standard on the web and in most modern systems. Always specify `encoding='utf-8'` when opening files to avoid platform-dependent defaults.",
        },
      ],
      interactions: [
        {
          id: "s4-encoding-decoding-mc",
          kind: "multiple-choice",
          prompt: "What does `'hello'.encode('utf-8')` return?",
          beginnerPurpose: "Apply encode() to convert text to bytes",
          expectedConceptIds: ["string-immutability"],
          options: [
            { id: "a", text: "b'hello' (bytes object)", isCorrect: true, explanation: "Correct! encode() converts str to bytes. 'hello' encoded as UTF-8 is b'hello'." },
            { id: "b", text: "'hello' (unchanged string)", isCorrect: false, explanation: "encode() returns bytes, not str. The type changes." },
            { id: "c", text: "[104, 101, 108, 108, 111] (list of ints)", isCorrect: false, explanation: "encode() returns a bytes object, not a list." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "encode() converts str → bytes using the named encoding." }],
          feedback: { correct: "Correct! 'hello'.encode('utf-8') returns b'hello'.", incorrect: "encode() converts str to a bytes object using the specified encoding." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-encoding-decoding-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.24 — Text parsing drills ───────────────────────────────── */
    {
      id: "s4-text-parsing-drills",
      stageId: "stage-04",
      title: "Text Parsing Drills",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Extract structured data from delimited strings using split()",
        "Parse CSV-style lines into fields",
        "Combine multiple string methods in a pipeline",
      ],
      prerequisites: [],
      concepts: ["string-immutability", "string-indexing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Parsing Text Data\n\nReal-world text data often needs to be parsed from structured formats. String methods are your first-line tools:\n\n```python\n# Parse a log line\nlog = \"2024-06-15 10:23:45 ERROR Database connection failed\"\nparts = log.split(' ', 3)   # split at most 3 times\ndate, time, level, message = parts\nprint(date)     # '2024-06-15'\nprint(level)    # 'ERROR'\nprint(message)  # 'Database connection failed'\n```\n\n## CSV-Style Parsing\n\n```python\nrecord = \"  Alice, 30, Engineer  \"\nfields = [f.strip() for f in record.split(',')]\nprint(fields)   # ['Alice', '30', 'Engineer']\n\nname, age, job = fields\nage = int(age)\nprint(f\"{name} is a {age}-year-old {job}\")\n```\n\n## Extracting by Position\n\n```python\nphone = \"(555) 867-5309\"\narea = phone[1:4]     # '555'\nnumber = phone[6:]    # '867-5309'\nprint(f\"Area: {area}, Number: {number}\")\n```\n\n## Method Chaining\n\n```python\nraw = \"   HELLO WORLD   \"\ncleaned = raw.strip().lower().replace(' ', '_')\nprint(cleaned)   # 'hello_world'\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Chain Methods Left to Right",
          body: "Python evaluates method chains left to right. raw.strip().lower() first strips whitespace, then lowercases the result. Each method returns a new string that the next method operates on.",
        },
      ],
      interactions: [
        {
          id: "s4-text-parsing-drills-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace a method chain on a string",
          expectedConceptIds: ["string-immutability"],
          code: "line = \"  Name: Alice  \"\nkey, value = line.strip().split(':')\nprint(key.strip())\nprint(value.strip().upper())",
          expectedOutput: "Name\nALICE",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "strip() removes spaces, split(':') gives ['Name', ' Alice'], then strip+upper on value." }],
          feedback: { correct: "Correct! Strip → split on ':' → strip each part → uppercase value.", incorrect: "line.strip() → 'Name: Alice'. split(':') → ['Name', ' Alice']. key.strip() → 'Name'. value.strip().upper() → 'ALICE'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-text-parsing-drills-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    /* ── Lesson 4.25 — Text report generation drills ─────────────────────── */
    {
      id: "s4-text-report-drills",
      stageId: "stage-04",
      title: "Text Report Generation Drills",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Generate formatted text reports using f-strings and format specifiers",
        "Build aligned tables using width and alignment format specs",
        "Combine join(), format specs, and string methods to produce polished output",
      ],
      prerequisites: [],
      concepts: ["fstring-formatting", "string-immutability"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Building Text Reports\n\nCombine everything you've learned to generate readable, aligned output:\n\n```python\n# Aligned sales report\ndata = [\n    (\"Alice\", 142, 8950.00),\n    (\"Bob\", 87, 5430.50),\n    (\"Charlie\", 213, 13200.75),\n]\n\nheader = f\"{'Name':<10} {'Sales':>6} {'Revenue':>12}\"\nprint(header)\nprint(\"-\" * len(header))\n\nfor name, sales, revenue in data:\n    print(f\"{name:<10} {sales:>6} {revenue:>12,.2f}\")\n```\n\nOutput:\n```\nName        Sales      Revenue\n-------------------------------\nAlice         142     8,950.00\nBob            87     5,430.50\nCharlie       213    13,200.75\n```\n\n## Building a Summary Section\n\n```python\ntotal_sales = sum(s for _, s, _ in data)\ntotal_revenue = sum(r for _, _, r in data)\n\nprint()\nprint(f\"{'TOTAL':<10} {total_sales:>6} {total_revenue:>12,.2f}\")\n```\n\n## Word-Wrapping Long Text\n\n```python\nimport textwrap\n\nlongtext = \"Python is a versatile programming language. It is used for web, data science, automation, and much more.\"\nprint(textwrap.fill(longtext, width=40))\n```",
        },
        {
          kind: "why-matters",
          body: "Generating well-formatted reports is a core skill for data scripts, CLI tools, and log analysis. Mastering format specifiers means you can produce professional output without any external library.",
        },
      ],
      interactions: [
        {
          id: "s4-text-report-drills-mc",
          kind: "multiple-choice",
          prompt: "Which f-string produces `'Alice     '` (Alice left-aligned in a field of width 10)?",
          beginnerPurpose: "Apply left-alignment format spec for table output",
          expectedConceptIds: ["fstring-formatting"],
          options: [
            { id: "a", text: "f\"{'Alice':>10}\"", isCorrect: false, explanation: "> means right-align. This would give '     Alice'." },
            { id: "b", text: "f\"{'Alice':<10}\"", isCorrect: true, explanation: "Correct! < means left-align in a width of 10, giving 'Alice     '." },
            { id: "c", text: "f\"{'Alice':10}\"", isCorrect: false, explanation: "Without an alignment character, strings default to left-aligned for str type, so this would actually work too — but < makes the intent explicit." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "< = left-align, > = right-align, ^ = center in format specs." }],
          feedback: { correct: "Correct! :<10 means left-align in a field of width 10.", incorrect: "Use :<10 for left-alignment: f\"{'Alice':<10}\" gives 'Alice     '." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s4-text-report-drills-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],

  project: {
    id: "s4-project",
    stageId: "stage-04",
    title: "Text Processing Toolkit",
    brief:
      "Build a text processing utility that reads structured text input, parses it into fields, applies transformations (case normalization, cleaning, formatting), and outputs a polished formatted report using f-strings with format specifiers.",
    requirements: [
      "Parse at least one delimited format (CSV-style or log-style) using split()",
      "Apply at least three string methods: e.g., strip(), lower(), replace()",
      "Generate a formatted table using f-string format specifiers for alignment",
      "Include a summary row with totals or counts",
      "Handle an edge case: empty fields, missing values, or mixed case input",
    ],
    acceptanceCriteria: [
      "Parsing correctly extracts fields from the input format",
      "Output is aligned and readable (columns don't shift across rows)",
      "At least one numeric column uses decimal formatting (e.g., :.2f)",
      "Code uses f-strings throughout rather than string concatenation",
    ],
    conceptIds: ["string-immutability", "string-indexing", "fstring-formatting"],
    difficulty: "beginner",
  },
} satisfies Stage;
