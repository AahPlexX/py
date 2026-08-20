import type { Stage } from "@/course/course.schema";

export const stage27 = {
  id: "stage-27",
  number: 27,
  title: "Date, Time, Time Zones, and Calendars",
  summary:
    "Work with dates, times, durations, and time zones using Python's datetime module and zoneinfo for robust time-aware applications.",
  level: "intermediate",
  masteryGateConceptIds: ["datetime-module", "timezone-aware"],
  lessons: [
    {
      id: "s27-datetime-basics",
      stageId: "stage-27",
      title: "datetime.date, datetime.time, and datetime.datetime",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create date, time, and datetime objects",
        "Access year, month, day, hour, minute, second attributes",
        "Use today() and now() for current time",
      ],
      prerequisites: [],
      concepts: ["datetime-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## datetime Module Basics\n\n```python\nfrom datetime import date, time, datetime\n\n# date — calendar date only\nd = date(2026, 6, 6)\nprint(d)         # 2026-06-06\nprint(d.year)    # 2026\nprint(d.weekday())  # 5 (Saturday)\n\n# time — time of day only (no date)\nt = time(14, 30, 0)\nprint(t)  # 14:30:00\n\n# datetime — both date and time\ndt = datetime(2026, 6, 6, 14, 30)\nprint(dt.date())  # 2026-06-06\nprint(dt.time())  # 14:30:00\n\n# Current time\nprint(date.today())    # today's date\nprint(datetime.now())  # current local datetime\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "All datetime objects are immutable",
          body: "You cannot modify a date or datetime. Operations like + timedelta return new objects.",
        },
        {
          kind: "why-matters",
          body: "Date/time handling is one of the most error-prone areas in software. Wrong time zones, naive vs aware confusion, and DST bugs cause financial errors and scheduling failures.",
        },
      ],
      interactions: [
        {
          id: "s27-dt-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Access datetime attributes",
          expectedConceptIds: ["datetime-module"],
          code: "from datetime import date\nd = date(2026, 6, 6)\nprint(d.month)\nprint(d.day)",
          expectedOutput: "6\n6",
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: ".month and .day are integer attributes." }],
          feedback: { correct: "Correct!", incorrect: "d.month = 6 (June), d.day = 6." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s27-dt-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s27-timedelta",
      stageId: "stage-27",
      title: "timedelta: Arithmetic with Time",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use timedelta for date and datetime arithmetic",
        "Calculate differences between dates",
        "Add and subtract durations",
      ],
      prerequisites: ["s27-datetime-basics"],
      concepts: ["datetime-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## timedelta\n\n`timedelta` represents a duration. Use it for arithmetic:\n\n```python\nfrom datetime import date, timedelta\n\ntoday = date(2026, 6, 6)\ntomorrow = today + timedelta(days=1)\nprint(tomorrow)  # 2026-06-07\n\nnext_week = today + timedelta(weeks=1)\nprint(next_week)  # 2026-06-13\n\n# Difference between dates\nevent = date(2026, 12, 31)\ndiff = event - today\nprint(diff.days)  # 208\n```\n\n`timedelta(days=, seconds=, microseconds=, milliseconds=, minutes=, hours=, weeks=)` — all arguments optional, defaulting to 0.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "timedelta normalizes to days + seconds",
          body: "Internally, timedelta stores (days, seconds, microseconds). Print a timedelta to see its normalized form: timedelta(208, 0) means 208 days, 0 seconds.",
        },
      ],
      interactions: [
        {
          id: "s27-td-fill",
          kind: "fill-code",
          prompt: "Calculate the date 90 days from today (2026-06-06).",
          beginnerPurpose: "Apply timedelta arithmetic",
          expectedConceptIds: ["datetime-module"],
          codeTemplate: "from datetime import date, timedelta\ntoday = date(2026, 6, 6)\nfuture = today + _____(days=90)\nprint(future)",
          blanks: [{ placeholder: "_____", answer: "timedelta", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The class for duration is timedelta." }],
          feedback: { correct: "Correct! timedelta(days=90) adds 90 days.", incorrect: "Use timedelta(days=90)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s27-td-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s27-naive-vs-aware",
      stageId: "stage-27",
      title: "Naive vs Aware Datetimes and Time Zones",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish naive datetimes from aware datetimes",
        "Create timezone-aware datetimes with zoneinfo",
        "Convert between time zones correctly",
      ],
      prerequisites: ["s27-timedelta"],
      concepts: ["timezone-aware"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Naive vs Aware Datetimes\n\nA **naive** datetime has no time zone information — it is ambiguous (local time? UTC?).\nAn **aware** datetime has a `tzinfo` attached — unambiguous.\n\n```python\nfrom datetime import datetime, timezone\nfrom zoneinfo import ZoneInfo\n\n# Aware datetime in UTC\nutc_now = datetime.now(tz=timezone.utc)\nprint(utc_now)  # 2026-06-06 14:30:00+00:00\n\n# Convert to New York time\nny_time = utc_now.astimezone(ZoneInfo(\"America/New_York\"))\nprint(ny_time)  # 2026-06-06 10:30:00-04:00\n\n# Convert to Tokyo time\ntokyo = utc_now.astimezone(ZoneInfo(\"Asia/Tokyo\"))\nprint(tokyo)  # 2026-06-06 23:30:00+09:00\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never use naive datetimes in production",
          body: "Storing naive datetimes creates ambiguity. Always store in UTC (aware), display in local time. Mixing naive and aware datetimes raises TypeError at runtime.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "zoneinfo replaces pytz",
          body: "Python 3.9+ includes zoneinfo in the standard library. It uses the IANA time zone database. Prefer ZoneInfo('America/New_York') over pytz for new code.",
        },
      ],
      interactions: [
        {
          id: "s27-tz-mc",
          kind: "multiple-choice",
          prompt: "Which is the correct way to get the current UTC time as an aware datetime?",
          beginnerPurpose: "Create a timezone-aware UTC datetime",
          expectedConceptIds: ["timezone-aware"],
          options: [
            { id: "a", text: "datetime.utcnow()", isCorrect: false, explanation: "datetime.utcnow() returns a naive datetime — it has no tzinfo despite the name." },
            { id: "b", text: "datetime.now(tz=timezone.utc)", isCorrect: true, explanation: "Correct! Passing tz=timezone.utc returns an aware datetime." },
            { id: "c", text: "datetime.now()", isCorrect: false, explanation: "datetime.now() returns the local time as a naive datetime." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "Pass tz= argument to now() for an aware result." }],
          feedback: { correct: "Correct! datetime.now(tz=timezone.utc) is the right way.", incorrect: "Use datetime.now(tz=timezone.utc) — utcnow() is deprecated (returns naive)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s27-tz-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s27-format-parse",
      stageId: "stage-27",
      title: "Formatting and Parsing Dates",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Format datetimes to strings with strftime",
        "Parse date strings with strptime",
        "Use ISO 8601 format for interchange",
      ],
      prerequisites: ["s27-naive-vs-aware"],
      concepts: ["datetime-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Formatting and Parsing\n\n```python\nfrom datetime import datetime\n\ndt = datetime(2026, 6, 6, 14, 30)\n\n# Format to string\nprint(dt.strftime(\"%Y-%m-%d\"))          # 2026-06-06\nprint(dt.strftime(\"%d %B %Y\"))          # 06 June 2026\nprint(dt.strftime(\"%Y-%m-%dT%H:%M:%S\")) # 2026-06-06T14:30:00\n\n# ISO 8601 shortcut\nprint(dt.isoformat())  # 2026-06-06T14:30:00\n\n# Parse from string\nparsed = datetime.strptime(\"2026-06-06\", \"%Y-%m-%d\")\nprint(parsed)  # 2026-06-06 00:00:00\n```\n\nCommon format codes: `%Y` year, `%m` month, `%d` day, `%H` hour (24h), `%M` minute, `%S` second.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use isoformat() for serialization",
          body: "ISO 8601 format (YYYY-MM-DDTHH:MM:SS) is unambiguous, sortable, and universally understood. Use datetime.fromisoformat() to parse it.",
        },
      ],
      interactions: [
        {
          id: "s27-format-predict",
          kind: "predict-output",
          prompt: "What does this print?",
          beginnerPurpose: "Apply strftime format codes",
          expectedConceptIds: ["datetime-module"],
          code: "from datetime import datetime\ndt = datetime(2026, 1, 5, 9, 3)\nprint(dt.strftime(\"%Y/%m/%d\"))",
          expectedOutput: "2026/01/05",
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "%m and %d zero-pad to 2 digits." }],
          feedback: { correct: "Correct!", incorrect: "%Y=2026, %m=01 (zero-padded), %d=05." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s27-format-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s27-project",
    stageId: "stage-27",
    title: "Scheduling Utility Project",
    brief:
      "Build a scheduling utility that accepts event names and times in multiple time zones, converts everything to UTC for storage, and displays them in any target time zone.",
    requirements: [
      "Parse event time strings with strptime",
      "All storage in UTC (aware datetimes)",
      "Display in any IANA time zone via ZoneInfo",
      "Calculate days-until for each upcoming event",
      "Sort events by time",
    ],
    acceptanceCriteria: [
      "Events display correctly in multiple time zones",
      "Days-until calculation is accurate",
      "Sorted output is chronologically correct",
    ],
    conceptIds: ["datetime-module", "timezone-aware"],
    difficulty: "intermediate",
  },
} satisfies Stage;
