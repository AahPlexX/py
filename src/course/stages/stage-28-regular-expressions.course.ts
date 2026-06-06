import type { Stage } from "@/course/course.schema";

export const stage28 = {
  id: "stage-28",
  number: 28,
  title: "Regular Expressions and Text Parsing",
  summary:
    "Master Python's re module to match, search, extract, and replace patterns in text using regular expressions.",
  level: "intermediate",
  masteryGateConceptIds: ["regex-patterns", "regex-groups"],
  lessons: [
    {
      id: "s28-re-overview",
      stageId: "stage-28",
      title: "re Module Overview",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Import and use the re module",
        "Distinguish re.match, re.search, and re.findall",
        "Compile patterns for reuse",
      ],
      prerequisites: [],
      concepts: ["regex-patterns"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The re Module\n\nPython's `re` module provides regular expression operations.\n\n```python\nimport re\n\ntext = \"My phone is 555-1234 and backup is 555-5678\"\n\n# re.search — find first match anywhere\nm = re.search(r\"\\d{3}-\\d{4}\", text)\nprint(m.group())  # 555-1234\n\n# re.findall — find all matches, return list\nnumbers = re.findall(r\"\\d{3}-\\d{4}\", text)\nprint(numbers)  # ['555-1234', '555-5678']\n\n# re.match — match only at string start\nm = re.match(r\"My\", text)\nprint(m.group())  # My\n```\n\nUse raw strings `r\"...\"` to avoid double-escaping backslashes.",
        },
        {
          kind: "comparison",
          leftLabel: "re.match — start only",
          rightLabel: "re.search — anywhere",
          leftCode: "import re\ntext = \"hello world\"\nprint(re.match(r\"world\", text))  # None\nprint(re.match(r\"hello\", text))  # match",
          rightCode: "import re\ntext = \"hello world\"\nprint(re.search(r\"world\", text))  # match\nprint(re.search(r\"hello\", text))  # match",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always use raw strings for regex",
          body: "Write r\"\\d+\" not \"\\\\d+\". Raw strings prevent Python from interpreting backslashes before the regex engine sees them.",
        },
      ],
      interactions: [
        {
          id: "s28-re-mc",
          kind: "multiple-choice",
          prompt: "Which re function returns ALL matches as a list?",
          beginnerPurpose: "Choose the right re function",
          expectedConceptIds: ["regex-patterns"],
          options: [
            { id: "a", text: "re.search()", isCorrect: false, explanation: "search() returns the first match object, not a list." },
            { id: "b", text: "re.findall()", isCorrect: true, explanation: "Correct! findall() returns all non-overlapping matches as a list of strings." },
            { id: "c", text: "re.match()", isCorrect: false, explanation: "match() checks only at the string start and returns one match object." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The function name contains 'all'." }],
          feedback: { correct: "Correct! findall returns all matches.", incorrect: "Use re.findall() to get all matches as a list." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s28-re-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s28-pattern-basics",
      stageId: "stage-28",
      title: "Character Classes, Quantifiers, and Anchors",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use character classes like \\d, \\w, \\s and custom [...]",
        "Apply quantifiers: *, +, ?, {n,m}",
        "Use anchors ^ and $ to match positions",
      ],
      prerequisites: ["s28-re-overview"],
      concepts: ["regex-patterns"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Character Classes\n\n| Pattern | Matches |\n|---------|--------|\n| `\\d` | Digit [0-9] |\n| `\\D` | Non-digit |\n| `\\w` | Word char [a-zA-Z0-9_] |\n| `\\W` | Non-word char |\n| `\\s` | Whitespace |\n| `[abc]` | a, b, or c |\n| `[a-z]` | Any lowercase letter |\n| `[^abc]` | Not a, b, or c |\n\n## Quantifiers\n\n| Quantifier | Meaning |\n|------------|---------|\n| `*` | 0 or more |\n| `+` | 1 or more |\n| `?` | 0 or 1 |\n| `{3}` | Exactly 3 |\n| `{2,5}` | 2 to 5 |\n\n## Anchors\n\n- `^` — start of string (or line with re.MULTILINE)\n- `$` — end of string\n- `\\b` — word boundary\n\n```python\nimport re\nprint(re.findall(r\"^\\d+\", \"123 hello\"))  # ['123']\nprint(re.findall(r\"\\d+$\", \"hello 456\"))  # ['456']\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Greedy vs non-greedy",
          body: "* and + are greedy by default — they match as much as possible. Add ? to make them non-greedy: *? matches as little as possible. Use .*? to match minimal text between delimiters.",
        },
      ],
      interactions: [
        {
          id: "s28-pattern-predict",
          kind: "predict-output",
          prompt: "What does this return?",
          beginnerPurpose: "Apply quantifiers and character classes",
          expectedConceptIds: ["regex-patterns"],
          code: "import re\nresult = re.findall(r'\\d+', 'abc 123 def 45 ghi 6')\nprint(result)",
          expectedOutput: "['123', '45', '6']",
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "\\d+ matches one or more digits." }],
          feedback: { correct: "Correct! \\d+ finds all runs of digits.", incorrect: "\\d+ matches each group of consecutive digits." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s28-pattern-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s28-groups",
      stageId: "stage-28",
      title: "Groups and Named Groups",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use parentheses to create capturing groups",
        "Extract groups from match objects",
        "Use named groups with (?P<name>...)",
      ],
      prerequisites: ["s28-pattern-basics"],
      concepts: ["regex-groups"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Groups\n\nParentheses create **capturing groups** that you can extract:\n\n```python\nimport re\n\ntext = \"John Smith, born 1990-05-15\"\nm = re.search(r\"(\\w+) (\\w+), born (\\d{4}-\\d{2}-\\d{2})\", text)\n\nif m:\n    print(m.group(0))  # full match\n    print(m.group(1))  # John\n    print(m.group(2))  # Smith\n    print(m.group(3))  # 1990-05-15\n```\n\n## Named Groups\n\n```python\nm = re.search(\n    r\"(?P<first>\\w+) (?P<last>\\w+), born (?P<dob>\\d{4}-\\d{2}-\\d{2})\",\n    text\n)\nif m:\n    print(m.group('first'))  # John\n    print(m.groupdict())     # {'first': 'John', 'last': 'Smith', 'dob': '1990-05-15'}\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use named groups for clarity",
          body: "Named groups make patterns self-documenting. m.group('date') is clearer than m.group(3), especially in complex patterns.",
        },
      ],
      interactions: [
        {
          id: "s28-groups-fill",
          kind: "fill-code",
          prompt: "Extract the domain from an email address using a named group.",
          beginnerPurpose: "Apply named groups",
          expectedConceptIds: ["regex-groups"],
          codeTemplate: "import re\nemail = \"user@example.com\"\nm = re.search(r\"\\w+@(?P<domain>[\\w.]+)\", email)\nif m:\n    print(m.group(_____))",
          blanks: [{ placeholder: "_____", answer: "'domain'", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Access named groups with m.group('name')." }],
          feedback: { correct: "Correct! m.group('domain') extracts the domain.", incorrect: "Use m.group('domain') to access the named group." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s28-groups-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s28-sub-compile",
      stageId: "stage-28",
      title: "re.sub() and Compiled Patterns",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use re.sub() to replace matches",
        "Compile patterns with re.compile() for reuse",
        "Apply flags like re.IGNORECASE",
      ],
      prerequisites: ["s28-groups"],
      concepts: ["regex-patterns"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## re.sub()\n\n```python\nimport re\n\n# Replace phone numbers with REDACTED\ntext = \"Call 555-1234 or 555-9876\"\ncleaned = re.sub(r\"\\d{3}-\\d{4}\", \"REDACTED\", text)\nprint(cleaned)  # Call REDACTED or REDACTED\n\n# Use backreferences in replacement\ntext = \"John Smith\"\nswapped = re.sub(r\"(\\w+) (\\w+)\", r\"\\2, \\1\", text)\nprint(swapped)  # Smith, John\n```\n\n## Compiled Patterns\n\n```python\n# Compile once, use many times\nphone_pat = re.compile(r\"\\d{3}-\\d{4}\")\nmatches = phone_pat.findall(\"555-1234 and 555-5678\")\nprint(matches)  # ['555-1234', '555-5678']\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Compile when used repeatedly",
          body: "re.compile() pre-compiles the pattern into a regex object. In tight loops over many strings, this avoids re-parsing the pattern on every call.",
        },
      ],
      interactions: [
        {
          id: "s28-sub-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Trace re.sub replacement",
          expectedConceptIds: ["regex-patterns"],
          code: "import re\ntext = \"The price is $10.00 and $5.99\"\nresult = re.sub(r\"\\$[\\d.]+\", \"PRICE\", text)\nprint(result)",
          expectedOutput: "The price is PRICE and PRICE",
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "\\$ matches a literal dollar sign. [\\d.]+ matches digits and dots." }],
          feedback: { correct: "Correct!", incorrect: "re.sub replaces every match with 'PRICE'." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s28-sub-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s28-project",
    stageId: "stage-28",
    title: "Log Parser and Validator",
    brief:
      "Build a log file parser that extracts timestamps, log levels, and messages from Apache/Nginx-style access logs, and a validator that checks email addresses and URLs using regular expressions.",
    requirements: [
      "Parse log lines into structured dicts (timestamp, level, message)",
      "Validate email format with regex",
      "Validate URL format with regex",
      "Count occurrences of each log level",
      "Extract all IP addresses from log lines",
    ],
    acceptanceCriteria: [
      "Parser correctly handles all sample log lines",
      "Validator correctly accepts/rejects test cases",
      "Count output matches expected frequency",
    ],
    conceptIds: ["regex-patterns", "regex-groups"],
    difficulty: "intermediate",
  },
} satisfies Stage;
