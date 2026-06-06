import type { Stage } from "@/course/course.schema";

export const stage02 = {
  id: "stage-02",
  number: 2,
  title: "Python Core Syntax",
  summary:
    "Write valid Python statements, assign variables, use operators, format strings, and understand Python style.",
  level: "beginner",
  masteryGateConceptIds: [
    "variable",
    "assignment",
    "expression",
    "operator",
    "string-formatting",
  ],

  lessons: [
    /* ── Lesson 1: Variables and Assignment ────────────────────────────────── */
    {
      id: "s2-variables-assignment",
      stageId: "stage-02",
      title: "Variables and Assignment",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Assign a value to a variable using the = operator",
        "Distinguish assignment (=) from equality comparison (==)",
        "Reassign a variable to a new value",
        "Use a variable in a print() call",
      ],
      prerequisites: ["s1-comments-and-clarity"],
      concepts: ["variable", "assignment"],
      contentBlocks: [
        {
          kind: "mental-model",
          title: "A Variable Is a Labelled Box",
          analogy:
            "Picture a cardboard box with a sticky label on the side. The label is the variable name; whatever is inside the box is the value. You can swap out the contents of the box any time — but the label stays the same.",
          explanation:
            "When you write `score = 10`, Python creates a box labelled `score` and puts `10` inside it. Later, `score = 20` replaces the contents with `20`. The label never changes; the contents can.",
        },
        {
          kind: "text",
          markdown:
            "## Variables Store Values\n\nA **variable** is a named place in memory where you can store a value. You create a variable and give it a value using the **assignment operator** `=`.\n\n```python\nname = \"Alice\"   # store the string \"Alice\" in the variable called name\nage = 25          # store the integer 25 in the variable called age\n```\n\nYou can then use the variable anywhere you would use the value directly:\n\n```python\nprint(name)  # prints: Alice\nprint(age)   # prints: 25\n```\n\nYou can also **reassign** a variable — give it a different value at any time:\n\n```python\nage = 25\nage = 26     # age now holds 26; the old value 25 is gone\n```",
        },
        {
          kind: "code",
          language: "python",
          code: 'score = 0\nprint(score)   # prints: 0\n\nscore = 100\nprint(score)   # prints: 100',
          caption: "Reassigning a variable replaces its old value with the new one.",
        },
        {
          kind: "comparison",
          leftLabel: "Assignment (=)",
          rightLabel: "Equality check (==)",
          leftCode: "x = 5\n# Stores the value 5 in x\n# This is a statement",
          rightCode: "x == 5\n# Asks: is x equal to 5?\n# This produces True or False",
          caption:
            "= and == look similar but do very different things. Mixing them up is a common beginner mistake.",
        },
        {
          kind: "glossary-term",
          term: "variable",
          definition:
            "A named storage location in a program that holds a value. The value can be changed (reassigned) at any time.",
          example: 'city = "London"',
        },
        {
          kind: "glossary-term",
          term: "assignment",
          definition:
            "The act of giving a variable a value using the = operator. The expression on the right is evaluated first, then stored in the variable on the left.",
          example: "total = 10 + 5  # evaluates 10+5=15, stores 15 in total",
        },
      ],
      interactions: [
        {
          id: "s2-va-predict-reassign",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose:
            "Verify the learner understands that reassignment overwrites the previous value.",
          expectedConceptIds: ["variable", "assignment"],
          code: 'color = "red"\ncolor = "blue"\nprint(color)',
          expectedOutput: "blue",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Each assignment replaces the previous value. What is the last value assigned to color?",
            },
          ],
          feedback: {
            correct:
              'Correct! The second assignment (color = "blue") overwrites the first, so print(color) outputs blue.',
            incorrect:
              "Remember: when you reassign a variable, the old value is replaced. Only the most recent assignment matters.",
          },
        },
        {
          id: "s2-va-fill-assignment",
          kind: "fill-code",
          prompt: 'Complete the assignment so the variable `greeting` holds the string "Good morning".',
          beginnerPurpose: "Practice writing a correct variable assignment statement.",
          expectedConceptIds: ["variable", "assignment"],
          codeTemplate: 'greeting = ___\nprint(greeting)',
          blanks: [
            {
              placeholder: "___",
              answer: '"Good morning"',
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The right-hand side of = should be a string literal — text wrapped in quotes.",
            },
          ],
          feedback: {
            correct: 'Correct! greeting = "Good morning" assigns the string to the variable.',
            incorrect:
              "The value on the right side of = needs to be a string (text in quotes).",
          },
        },
        {
          id: "s2-va-mc-valid-name",
          kind: "multiple-choice",
          prompt: "Which of the following is a valid Python variable name?",
          beginnerPurpose:
            "Distinguish valid variable names from invalid ones before the next lesson covers naming conventions.",
          expectedConceptIds: ["variable"],
          options: [
            {
              id: "opt-a",
              text: "2fast",
              isCorrect: false,
              explanation:
                "Variable names cannot start with a digit. 2fast is invalid.",
            },
            {
              id: "opt-b",
              text: "user_name",
              isCorrect: true,
              explanation:
                "user_name is valid: it uses only letters and underscores, and doesn't start with a digit.",
            },
            {
              id: "opt-c",
              text: "my-variable",
              isCorrect: false,
              explanation:
                "Hyphens (-) are not allowed in variable names. Python would interpret this as subtraction.",
            },
            {
              id: "opt-d",
              text: "for",
              isCorrect: false,
              explanation:
                "`for` is a Python keyword — it is reserved for the for-loop syntax and cannot be used as a variable name.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "syntax",
              text: "Variable names can contain letters, digits, and underscores, but cannot start with a digit.",
            },
          ],
          feedback: {
            correct: "Right! user_name follows Python's variable naming rules perfectly.",
            incorrect:
              "Variable names must start with a letter or underscore, and can only contain letters, digits, and underscores. Keywords like `for` are reserved.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "variable",
          recallPrompt: "What is a variable and how do you create one in Python?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "assignment",
          recallPrompt: "What is the difference between = and == in Python?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s2-va-predict-reassign",
          "s2-va-fill-assignment",
          "s2-va-mc-valid-name",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["variable", "assignment"],
      },
    },

    /* ── Lesson 2: Naming Things in Python ────────────────────────────────── */
    {
      id: "s2-naming-conventions",
      stageId: "stage-02",
      title: "Naming Things in Python",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use snake_case for variable names as per Python convention",
        "Choose descriptive names that reveal intent",
        "Avoid Python keywords as variable names",
        "List the rules for valid Python identifiers",
      ],
      prerequisites: ["s2-variables-assignment"],
      concepts: ["variable"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Naming Conventions in Python\n\nPython has both **rules** (your code won't run if you break them) and **conventions** (your code will still run, but other developers will find it harder to read).\n\n### Rules (enforced by Python)\n- Names must start with a letter (`a-z`, `A-Z`) or an underscore `_`\n- After the first character, digits (0–9) are also allowed\n- No spaces or hyphens\n- Cannot be a Python keyword (like `for`, `if`, `while`, `True`, `None`)\n\n### Convention (PEP 8 style guide)\n- Use **snake_case**: all lowercase, words separated by underscores\n- Make names **descriptive** — `user_age` is better than `ua` or `x`",
        },
        {
          kind: "comparison",
          leftLabel: "Poor Names",
          rightLabel: "Good Names (snake_case)",
          leftCode: "x = 25\nTMP = \"John\"\nN = 3.14\nd = \"2024-01-01\"",
          rightCode: "user_age = 25\nfirst_name = \"John\"\npi = 3.14\nbirth_date = \"2024-01-01\"",
          caption:
            "Good names make your code self-documenting. You can read the right column and understand it without extra comments.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Python Keywords Are Reserved",
          body: "Words like `if`, `for`, `while`, `True`, `False`, `None`, `and`, `or`, `not`, `in`, `is`, `return`, `def`, `class`, `import` are reserved by Python. You cannot use them as variable names. Trying to do so causes a SyntaxError.",
        },
        {
          kind: "code",
          language: "python",
          code: "# These names follow Python conventions\ntotal_price = 49.99\nitem_count = 3\ncustomer_name = \"Bob\"\nis_logged_in = True\n\nprint(customer_name, \"has\", item_count, \"items\")",
          caption: "Descriptive snake_case names make the code readable like a sentence.",
        },
      ],
      interactions: [
        {
          id: "s2-nc-mc-valid-name",
          kind: "multiple-choice",
          prompt:
            "A developer wants to store a user's email address. Which variable name follows Python conventions best?",
          beginnerPurpose:
            "Practice identifying the best name from a set of options based on Python style conventions.",
          expectedConceptIds: ["variable"],
          options: [
            {
              id: "opt-a",
              text: "EmailAddress",
              isCorrect: false,
              explanation:
                "EmailAddress uses CapWords (PascalCase) which is reserved for class names in Python, not variables.",
            },
            {
              id: "opt-b",
              text: "e",
              isCorrect: false,
              explanation:
                "Single-letter names are too cryptic. They give no information about what the variable stores.",
            },
            {
              id: "opt-c",
              text: "email_address",
              isCorrect: true,
              explanation:
                "email_address is snake_case, lowercase, and clearly describes what it holds. This is the Pythonic choice.",
            },
            {
              id: "opt-d",
              text: "email-address",
              isCorrect: false,
              explanation:
                "Hyphens are not allowed in Python variable names. Python would read this as email minus address.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Python convention prefers lowercase words joined by underscores.",
            },
          ],
          feedback: {
            correct:
              "Correct! email_address is descriptive snake_case — the Python community's preferred style.",
            incorrect:
              "Python convention for variable names is snake_case: all lowercase, words separated by underscores.",
          },
        },
        {
          id: "s2-nc-fill-rename",
          kind: "fill-code",
          prompt:
            "Rename the poorly-named variable `x` to a descriptive snake_case name that stores a product price.",
          beginnerPurpose:
            "Practise applying snake_case naming to a real variable in context.",
          expectedConceptIds: ["variable"],
          codeTemplate: "___ = 19.99\nprint(f\"The price is {___}\")",
          blanks: [
            {
              placeholder: "___",
              answer: "product_price",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Use lowercase words with underscores to describe what the variable holds.",
            },
            {
              level: "syntax",
              text: "snake_case example: product_price, item_cost, unit_price",
            },
          ],
          feedback: {
            correct: "Great choice! product_price (or a similar descriptive name) follows Python conventions.",
            incorrect:
              "Try a two-word snake_case name that clearly describes a price, like product_price or item_price.",
          },
        },
        {
          id: "s2-nc-explain-naming",
          kind: "plain-language-explain",
          prompt:
            "Why does naming matter? Explain to a fellow beginner why `total_students` is better than `ts` as a variable name.",
          beginnerPurpose:
            "Articulate the value of descriptive naming to solidify the habit.",
          expectedConceptIds: ["variable"],
          code: "ts = 42\ntotal_students = 42\nprint(total_students)",
          keyPointsToHit: [
            "Descriptive names make code easier to read",
            "Short cryptic names require you to remember what they mean",
            "Good names reduce the need for comments",
          ],
          sampleAnswer:
            "total_students tells you exactly what the number 42 represents — the number of students. If you use `ts`, someone reading your code (or you, three months later) has to guess or look back through the code to figure out what it means. Descriptive names make code self-documenting.",
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Think about reading the code six months from now — what would be more helpful?",
            },
          ],
          feedback: {
            correct: "Excellent reasoning! Readable names are one of the highest-value habits in programming.",
            incorrect:
              "Focus on readability: a reader should be able to understand what a variable holds just from its name.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "variable",
          recallPrompt: "What is Python's naming convention for variables, and why does it matter?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s2-nc-mc-valid-name",
          "s2-nc-fill-rename",
          "s2-nc-explain-naming",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["variable"],
      },
    },

    /* ── Lesson 3: Expressions and Operators ──────────────────────────────── */
    {
      id: "s2-expressions-operators",
      stageId: "stage-02",
      title: "Expressions and Operators",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Use Python's arithmetic operators: +, -, *, /, //, %, **",
        "Explain operator precedence (PEMDAS/BODMAS)",
        "Distinguish an expression from a statement",
        "Understand the difference between / (float division) and // (integer division)",
      ],
      prerequisites: ["s2-naming-conventions"],
      concepts: ["expression", "operator"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Arithmetic Operators\n\nPython supports all the standard arithmetic operations:\n\n| Operator | Operation | Example | Result |\n|---|---|---|---|\n| `+` | Addition | `3 + 4` | `7` |\n| `-` | Subtraction | `10 - 3` | `7` |\n| `*` | Multiplication | `3 * 4` | `12` |\n| `/` | Division (float) | `7 / 2` | `3.5` |\n| `//` | Floor division | `7 // 2` | `3` |\n| `%` | Modulo (remainder) | `7 % 2` | `1` |\n| `**` | Exponentiation | `2 ** 3` | `8` |\n\nAn **expression** is any combination of values, variables, and operators that produces a result. `3 + 4` is an expression; so is `x * 2`.\n\nA **statement** is a complete instruction. `x = 3 + 4` is a statement that evaluates the expression `3 + 4` and stores the result in `x`.",
        },
        {
          kind: "code",
          language: "python",
          code: "# Arithmetic examples\nprint(10 + 3)    # 13\nprint(10 - 3)    # 7\nprint(10 * 3)    # 30\nprint(10 / 3)    # 3.3333333333333335\nprint(10 // 3)   # 3   (drops the remainder)\nprint(10 % 3)    # 1   (only the remainder)\nprint(2 ** 8)    # 256",
          caption: "All seven arithmetic operators — check the comments for expected output.",
        },
        {
          kind: "mental-model",
          title: "Python as a Calculator",
          analogy:
            "Python follows the same order-of-operations rules you learned in maths class: parentheses first, then exponents, then multiplication and division (left to right), then addition and subtraction (left to right). When in doubt, use parentheses to be explicit.",
          explanation:
            "2 + 3 * 4 evaluates to 14 (not 20), because * has higher precedence than +. (2 + 3) * 4 evaluates to 20 because parentheses force addition first.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "/ Always Returns a Float",
          body: "In Python 3, the / operator always returns a float, even when dividing two integers: 10 / 2 gives 5.0, not 5. If you want an integer result, use // (floor division).",
        },
      ],
      interactions: [
        {
          id: "s2-eo-predict-arithmetic",
          kind: "predict-output",
          prompt: "What does this program print? (Three separate numbers, one per line.)",
          beginnerPurpose:
            "Practice tracing arithmetic expressions including the % operator which is new to most beginners.",
          expectedConceptIds: ["expression", "operator"],
          code: "print(2 ** 4)\nprint(17 % 5)\nprint(9 // 2)",
          expectedOutput: "16\n2\n4",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "** means 'to the power of'. % gives the remainder after division. // drops the decimal part.",
            },
            {
              level: "syntax",
              text: "2**4 = 2×2×2×2. 17%5: how much is left after dividing 17 by 5 as evenly as possible? 9//2: what is 9 divided by 2, rounded down?",
            },
          ],
          feedback: {
            correct: "Correct! 2**4=16, 17%5=2 (17=3×5+2), 9//2=4 (9÷2=4.5, rounded down).",
            incorrect:
              "Work through each line: ** is exponentiation, % is remainder (modulo), // is floor division (drops the decimal).",
          },
        },
        {
          id: "s2-eo-mc-precedence",
          kind: "multiple-choice",
          prompt: "What is the value of the expression `3 + 2 * 5`?",
          beginnerPurpose:
            "Test understanding of operator precedence (multiplication before addition).",
          expectedConceptIds: ["expression", "operator"],
          options: [
            {
              id: "opt-a",
              text: "25",
              isCorrect: false,
              explanation:
                "25 would be the result if addition were done first: (3+2)*5=25. But multiplication has higher precedence.",
            },
            {
              id: "opt-b",
              text: "13",
              isCorrect: true,
              explanation:
                "Correct! Multiplication runs first: 2*5=10, then 3+10=13.",
            },
            {
              id: "opt-c",
              text: "16",
              isCorrect: false,
              explanation:
                "16 doesn't correspond to any standard interpretation of this expression.",
            },
            {
              id: "opt-d",
              text: "10",
              isCorrect: false,
              explanation: "10 would come from just the 2*5 part, ignoring the +3.",
            },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [
            {
              level: "concept",
              text: "Remember PEMDAS/BODMAS: multiplication before addition.",
            },
          ],
          feedback: {
            correct:
              "Right! * has higher precedence than +, so 2*5=10 is computed first, giving 3+10=13.",
            incorrect:
              "Python follows standard maths precedence: multiplication (*) before addition (+). Compute 2*5=10, then 3+10=13.",
          },
        },
        {
          id: "s2-eo-fill-expression",
          kind: "fill-code",
          prompt:
            "Complete the expression so that `remainder` stores the remainder when 100 is divided by 7.",
          beginnerPurpose: "Practice using the modulo operator in context.",
          expectedConceptIds: ["expression", "operator"],
          codeTemplate: "remainder = 100 ___ 7\nprint(remainder)",
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
              text: "One of Python's arithmetic operators gives you the remainder after division.",
            },
            {
              level: "syntax",
              text: "The modulo operator is the % symbol.",
            },
          ],
          feedback: {
            correct: "Correct! 100 % 7 = 2 (because 100 = 14×7 + 2).",
            incorrect: "The % operator computes the remainder: 100 % 7 gives 2.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "expression",
          recallPrompt: "What is the difference between an expression and a statement?",
          nextReviewAfterDays: 3,
        },
        {
          conceptId: "operator",
          recallPrompt: "What does the // operator do, and how is it different from /?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s2-eo-predict-arithmetic",
          "s2-eo-mc-precedence",
          "s2-eo-fill-expression",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["expression", "operator"],
      },
    },

    /* ── Lesson 4: Working with Strings ───────────────────────────────────── */
    {
      id: "s2-string-basics",
      stageId: "stage-02",
      title: "Working with Strings",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Create string literals using single and double quotes",
        "Concatenate strings with the + operator",
        "Find the length of a string with len()",
        "Understand when to escape characters inside strings",
      ],
      prerequisites: ["s2-expressions-operators"],
      concepts: ["variable", "assignment"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## String Literals\n\nA **string** is a sequence of characters. You create a string literal by surrounding text with matching quotes — either both single `'...'` or both double `\"...\"`.\n\n```python\nfirst = 'Hello'\nsecond = \"world\"\n```\n\n### String Concatenation\n\nYou can join strings together using `+`:\n\n```python\ngreeting = first + \", \" + second\nprint(greeting)   # Hello, world\n```\n\n### String Length\n\n`len()` returns the number of characters in a string:\n\n```python\nprint(len(\"Python\"))   # 6\n```",
        },
        {
          kind: "code",
          language: "python",
          code: "first_name = \"Ada\"\nlast_name = \"Lovelace\"\nfull_name = first_name + \" \" + last_name\nprint(full_name)\nprint(len(full_name))",
          caption: "Concatenation joins strings; len() counts characters including the space.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Quotes Must Match",
          body: "A string opened with ' must end with '. A string opened with \" must end with \". Mixing them causes a SyntaxError. If your string needs to contain a quote character, either use the other quote type to wrap it, or escape it with a backslash: 'It\\'s fine' or \"She said \\\"hello\\\"\".",
        },
        {
          kind: "glossary-term",
          term: "string",
          definition:
            "A sequence of characters used to represent text. Strings are written with enclosing quotes and are one of Python's fundamental data types.",
          example: '"Hello"  \'Python 3\'  "123 Main St"',
        },
        {
          kind: "code",
          language: "python",
          code: "# Demonstrating string operations\nword = \"Python\"\nprint(len(word))          # 6\nprint(word + \"!\"  )       # Python!\nprint(\"Py\" + \"thon\")      # Python",
          caption: "len() counts characters; + joins strings end to end.",
        },
      ],
      interactions: [
        {
          id: "s2-sb-predict-concat",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose:
            "Practice tracing string concatenation to ensure learners understand + for strings vs numbers.",
          expectedConceptIds: ["variable", "assignment"],
          code: 'a = "Hello"\nb = "World"\nprint(a + ", " + b + "!")',
          expectedOutput: "Hello, World!",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "With strings, + joins them together without adding spaces. You need to include spaces explicitly.",
            },
          ],
          feedback: {
            correct: 'Correct! The + operator joins the strings: "Hello" + ", " + "World" + "!" = "Hello, World!"',
            incorrect:
              "String concatenation joins strings in order. Trace each + from left to right.",
          },
        },
        {
          id: "s2-sb-debug-quotes",
          kind: "debug-code",
          prompt:
            "This code raises a SyntaxError because of mismatched quotes. Fix it so it prints: It's working!",
          beginnerPurpose:
            "Practice identifying and fixing mismatched-quote errors in strings.",
          expectedConceptIds: ["variable"],
          brokenCode: "message = 'It's working!'\nprint(message)",
          bugDescription:
            "The string is opened with a single quote, but contains an apostrophe which Python reads as the closing quote, breaking the string.",
          fixedCode: 'message = "It\'s working!"\nprint(message)',
          errorType: "SyntaxError",
          allowedAttempts: 4,
          hints: [
            {
              level: "concept",
              text: "The apostrophe in \"It's\" closes the single-quoted string too early.",
            },
            {
              level: "syntax",
              text: "Use double quotes to wrap a string that contains a single quote (apostrophe).",
            },
          ],
          feedback: {
            correct: "Fixed! Wrapping in double quotes lets you include apostrophes freely.",
            incorrect:
              "When your string contains a single quote (apostrophe), use double quotes to delimit it: \"It's working!\"",
          },
        },
        {
          id: "s2-sb-fill-concat",
          kind: "fill-code",
          prompt:
            "Complete the code so that `full_name` stores the first and last name with a space between them.",
          beginnerPurpose: "Practice string concatenation in an assignment statement.",
          expectedConceptIds: ["variable", "assignment"],
          codeTemplate: 'first = "Grace"\nlast = "Hopper"\nfull_name = first ___ " " ___ last\nprint(full_name)',
          blanks: [
            {
              placeholder: "___",
              answer: "+",
              caseSensitive: true,
            },
            {
              placeholder: "___",
              answer: "+",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "The concatenation operator for strings is +.",
            },
          ],
          feedback: {
            correct: 'Correct! first + " " + last joins the two names with a space: "Grace Hopper".',
            incorrect: "Use + to concatenate strings: first + \" \" + last.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "variable",
          recallPrompt: "How do you join two strings together in Python?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s2-sb-predict-concat",
          "s2-sb-debug-quotes",
          "s2-sb-fill-concat",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["variable"],
      },
    },

    /* ── Lesson 5: Formatting Strings with f-strings ──────────────────────── */
    {
      id: "s2-string-formatting",
      stageId: "stage-02",
      title: "Formatting Strings with f-strings",
      kind: "concept",
      difficulty: "beginner",
      objectives: [
        "Construct f-strings using the f\"...{expression}...\" syntax",
        "Embed variables and expressions inside f-string braces",
        "Explain why f-strings are preferred over concatenation for building messages",
        "Use f-strings to produce formatted output",
      ],
      prerequisites: ["s2-string-basics"],
      concepts: ["string-formatting", "variable"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## f-strings: The Modern Way to Format Strings\n\nAn **f-string** (formatted string literal) lets you embed variable values and expressions directly inside a string. Place an `f` before the opening quote, then wrap any expression in `{curly braces}`:\n\n```python\nname = \"Alice\"\nage = 30\nprint(f\"Hello, {name}! You are {age} years old.\")\n# Output: Hello, Alice! You are 30 years old.\n```\n\nYou can put any Python expression inside `{}` — variables, arithmetic, function calls:\n\n```python\nx = 5\nprint(f\"Double {x} is {x * 2}\")\n# Output: Double 5 is 10\n```",
        },
        {
          kind: "code",
          language: "python",
          code: 'product = "coffee"\nprice = 3.50\nquantity = 2\n\nprint(f"Item: {product}")\nprint(f"Price per unit: ${price}")\nprint(f"Total for {quantity}: ${price * quantity}")',
          caption: "f-strings embed variables and expressions seamlessly into text.",
        },
        {
          kind: "comparison",
          leftLabel: "Concatenation (verbose)",
          rightLabel: "f-string (clean)",
          leftCode: 'name = "Bob"\nscore = 95\nprint("Name: " + name + ", Score: " + str(score))',
          rightCode: 'name = "Bob"\nscore = 95\nprint(f"Name: {name}, Score: {score}")',
          caption:
            "f-strings are shorter, more readable, and don't require converting numbers to strings manually.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "f-strings Are Preferred in Modern Python",
          body: "f-strings were introduced in Python 3.6 and have become the standard way to format strings. Older code may use str.format() or % formatting — you'll encounter these, but f-strings are what you should write today. Python 3.12 made f-strings even more powerful by allowing nested quotes and multi-line expressions.",
        },
      ],
      interactions: [
        {
          id: "s2-sf-predict-fstring",
          kind: "predict-output",
          prompt: "What will this program print?",
          beginnerPurpose:
            "Trace f-string evaluation to confirm understanding of variable substitution inside braces.",
          expectedConceptIds: ["string-formatting", "variable"],
          code: 'city = "Paris"\nyear = 2024\nprint(f"{city} in {year}")',
          expectedOutput: "Paris in 2024",
          allowedAttempts: 3,
          hints: [
            {
              level: "concept",
              text: "Each {variable} in the f-string is replaced by the variable's current value.",
            },
          ],
          feedback: {
            correct: 'Correct! {city} is replaced by "Paris" and {year} by 2024.',
            incorrect:
              "In an f-string, {city} is replaced by the value of city, and {year} by the value of year.",
          },
        },
        {
          id: "s2-sf-fill-fstring",
          kind: "fill-code",
          prompt:
            "Complete the f-string so it prints: My name is Ada and I am 28 years old.",
          beginnerPurpose:
            "Practice embedding variables into an f-string with the correct brace syntax.",
          expectedConceptIds: ["string-formatting"],
          codeTemplate: 'name = "Ada"\nage = 28\nprint(f"My name is ___ and I am ___ years old.")',
          blanks: [
            {
              placeholder: "___",
              answer: "{name}",
              caseSensitive: true,
            },
            {
              placeholder: "___",
              answer: "{age}",
              caseSensitive: true,
            },
          ],
          allowedAttempts: 3,
          hints: [
            {
              level: "syntax",
              text: "Wrap variable names in curly braces inside the f-string: {name} and {age}.",
            },
          ],
          feedback: {
            correct: "Correct! {name} and {age} are replaced by the variable values at runtime.",
            incorrect:
              "Inside an f-string, use curly braces to embed variables: {name} and {age}.",
          },
        },
        {
          id: "s2-sf-run-greeting",
          kind: "run-code",
          prompt:
            "Write a program that stores your name and favourite number in variables, then uses an f-string to print: My name is [name] and my favourite number is [number].",
          beginnerPurpose:
            "Build an f-string from scratch, combining variable assignment with string formatting.",
          expectedConceptIds: ["string-formatting", "variable"],
          starterCode: "# Store your name and favourite number in variables\n# Then use an f-string to print the message\n",
          task: "Use two variables and one f-string to produce the required output.",
          expectedOutputContains: ["My name is", "favourite number is"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            {
              level: "concept",
              text: "Create two variables first, then write print(f\"...\") with both variables embedded.",
            },
            {
              level: "syntax",
              text: 'Example structure: name = "..."\nprint(f"My name is {name} ...")',
            },
          ],
          feedback: {
            correct: "Great work! You used variables and an f-string to produce formatted output.",
            incorrect:
              "Make sure the output contains 'My name is' and 'favourite number is', with your variable values embedded using {braces} inside an f-string.",
          },
        },
      ],
      reviewHooks: [
        {
          conceptId: "string-formatting",
          recallPrompt: "How do you embed a variable's value inside a string in Python?",
          nextReviewAfterDays: 3,
        },
      ],
      masteryCriteria: {
        requiredInteractionIds: [
          "s2-sf-predict-fstring",
          "s2-sf-fill-fstring",
          "s2-sf-run-greeting",
        ],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["string-formatting"],
      },
    },
  ],

  project: {
    id: "s2-project",
    stageId: "stage-02",
    title: "Mad Libs Generator",
    brief:
      "Create a program that stores several words in variables and uses f-strings to assemble a funny story.",
    requirements: [
      "At least 5 different variables",
      "Use f-strings to build sentences",
      "Print the complete story",
      "Use descriptive snake_case variable names",
      "Include at least one arithmetic expression",
    ],
    acceptanceCriteria: [
      "All variables have descriptive names",
      "F-strings used correctly",
      "Output is readable",
    ],
    conceptIds: ["variable", "assignment", "string-formatting", "expression", "operator"],
    difficulty: "beginner",
  },
} satisfies Stage;
