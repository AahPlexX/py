import type { Stage } from "@/course/course.schema";

export const stage13 = {
  id: "stage-13",
  number: 13,
  title: "Data Workflows",
  summary:
    "Clean, validate, transform, group, aggregate, and export data using standard-library-first techniques.",
  level: "advanced",
  masteryGateConceptIds: [
    "data-cleaning",
    "data-validation",
    "grouping",
    "aggregation",
    "pipeline",
    "csv-processing",
    "report-generation",
  ],
  lessons: [
    /* ── Lesson 1: Data Cleaning ─────────────────────────────────────────── */
    {
      id: "s13-data-cleaning",
      stageId: "stage-13",
      title: "Data Cleaning Techniques",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Identify common data quality issues: missing values, type mismatches, whitespace, duplicates",
        "Normalise string fields: strip, lowercase, replace",
        "Convert and coerce types safely with fallbacks",
        "Flag vs drop bad rows based on severity",
      ],
      prerequisites: [],
      concepts: ["data-cleaning", "missing-value", "type-coercion"],
      contentBlocks: [
        {
          kind: "text",
          markdown: `## Why Data is Always Dirty

Real-world data arrives with:
- **Missing values** — empty strings, \`None\`, or sentinel values like \`-1\`
- **Type mismatches** — a number stored as a string (\`"42"\`)
- **Whitespace** — \`" Alice "\` instead of \`"Alice"\`
- **Duplicates** — the same row entered twice
- **Inconsistent formats** — \`"2025-01-01"\` vs \`"01/01/2025"\`

Cleaning is often 80% of the work in any data pipeline.`,
        },
        {
          kind: "code",
          language: "python",
          code: `def clean_string(s: object) -> str:
    """Normalise a string field: strip whitespace, lowercase."""
    if s is None or str(s).strip() == "":
        return ""
    return str(s).strip().lower()

def parse_float(value: object, default: float = 0.0) -> float:
    """Safely convert value to float, returning default on failure."""
    try:
        return float(str(value).replace(",", ""))
    except (ValueError, TypeError):
        return default

# Example usage
rows = [
    {"name": "  Alice ", "score": "98.5"},
    {"name": None,        "score": "bad"},
    {"name": "BOB",       "score": "1,234.0"},
]
cleaned = [
    {"name": clean_string(r["name"]), "score": parse_float(r["score"])}
    for r in rows
]
print(cleaned)
# [{'name': 'alice', 'score': 98.5}, {'name': '', 'score': 0.0}, {'name': 'bob', 'score': 1234.0}]`,
          caption: "Small, focused helper functions compose into a cleaning pipeline.",
        },
        {
          kind: "code",
          language: "python",
          code: `def deduplicate(rows: list[dict], key: str) -> list[dict]:
    """Remove duplicate rows based on a key field, keeping last occurrence."""
    seen: dict[object, dict] = {}
    for row in rows:
        seen[row[key]] = row
    return list(seen.values())

data = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 1, "name": "Alice Updated"},  # duplicate id
]
print(deduplicate(data, "id"))
# [{'id': 1, 'name': 'Alice Updated'}, {'id': 2, 'name': 'Bob'}]`,
          caption:
            "Using a dict keyed by the identifier naturally keeps the last occurrence of each duplicate.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Flag or drop? Choose explicitly",
          body: "For missing data, decide upfront: skip the row (drop), replace with a default (impute), or mark it with a flag column. Documenting your choice is as important as making it. Silently dropping rows hides data quality problems.",
        },
        {
          kind: "why-matters",
          body: "Dirty data produces wrong results — no matter how sophisticated your analysis. Professional data engineers spend more time on cleaning and validation than on analysis itself. These skills make the analysis trustworthy.",
        },
      ],
      interactions: [
        {
          id: "s13-dc-predict-clean",
          kind: "predict-output",
          prompt: "What does `clean_string('  HELLO  ')` return?",
          beginnerPurpose: "Trace string normalization.",
          expectedConceptIds: ["data-cleaning"],
          code: `def clean_string(s: object) -> str:
    if s is None or str(s).strip() == "":
        return ""
    return str(s).strip().lower()

print(clean_string("  HELLO  "))`,
          expectedOutput: "hello",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`strip()` removes whitespace, `lower()` converts to lowercase." }],
          feedback: {
            correct: "Correct! Strip whitespace first, then lowercase → `'hello'`.",
            incorrect: "`strip()` removes leading/trailing spaces, then `lower()` gives `'hello'`.",
          },
        },
        {
          id: "s13-dc-fill-coerce",
          kind: "fill-code",
          prompt: "Complete the safe integer parser that returns `0` on failure.",
          beginnerPurpose: "Practice type coercion with fallback.",
          expectedConceptIds: ["data-cleaning", "type-coercion"],
          codeTemplate: `def parse_int(value: object, default: int = 0) -> int:
    try:
        return ___BLANK_1___(value)
    except (___BLANK_2___, TypeError):
        return default`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "int", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "ValueError", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `int(value)` inside a try, catch `ValueError` for bad strings." }],
          feedback: {
            correct: "Correct! `int(value)` with `ValueError` and `TypeError` handling covers the common cases.",
            incorrect: "Use `int(value)` in the try block and catch `ValueError` and `TypeError`.",
          },
        },
        {
          id: "s13-dc-mc-dedup",
          kind: "multiple-choice",
          prompt:
            "You have a list of dicts with duplicate `email` keys. Which approach efficiently deduplicates them while keeping the last occurrence?",
          beginnerPurpose: "Understand the dict-keyed deduplication pattern.",
          expectedConceptIds: ["data-cleaning"],
          options: [
            { id: "a", text: "Sort by email and remove adjacent duplicates.", isCorrect: false, explanation: "Sorting is O(n log n) and doesn't cleanly keep 'last' — more complex." },
            { id: "b", text: "Build a `dict[email, row]`, each assignment overwrites the previous, then take `dict.values()`.", isCorrect: true, explanation: "Correct! This is O(n) and naturally keeps the last occurrence." },
            { id: "c", text: "Compare every row to every other row.", isCorrect: false, explanation: "O(n²) — inefficient for large datasets." },
            { id: "d", text: "Convert to a set of dicts.", isCorrect: false, explanation: "Dicts are unhashable and cannot be put in a set." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Dict assignment overwrites — use this property." }],
          feedback: {
            correct: "Exactly! O(n) dict keying is the idiomatic Python deduplication.",
            incorrect: "Build a `{email: row}` dict iterating in order; the last assignment wins. Then take `values()`.",
          },
        },
        {
          id: "s13-dc-run-clean-pipeline",
          kind: "run-code",
          prompt: "Write `clean_price(s: str) -> float` that strips `$`, commas, and whitespace, then converts to float. Return 0.0 on failure.",
          beginnerPurpose: "Practice a real-world string-to-number cleaning function.",
          expectedConceptIds: ["data-cleaning", "type-coercion"],
          starterCode: `def clean_price(s: str) -> float:
    # Remove $, commas, whitespace, then convert to float
    pass

print(clean_price("$1,234.56"))  # 1234.56
print(clean_price("  99.0 "))    # 99.0
print(clean_price("N/A"))        # 0.0
`,
          task: "Return the float value, or 0.0 for unparseable input.",
          expectedOutputContains: ["1234.56", "99.0", "0.0"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Chain `.replace('$','').replace(',','').strip()` then `float(...)` in a try/except." }],
          feedback: {
            correct: "Price cleaner works for all cases!",
            incorrect: "Strip `$`, commas, and whitespace with `.replace()` and `.strip()`, then try `float(...)`, catch `ValueError`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "data-cleaning", recallPrompt: "List three common data quality problems you should always check for.", nextReviewAfterDays: 2 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s13-dc-predict-clean", "s13-dc-fill-coerce", "s13-dc-mc-dedup"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["data-cleaning"],
      },
    },

    /* ── Lesson 2: Validation Patterns ──────────────────────────────────── */
    {
      id: "s13-validation-patterns",
      stageId: "stage-13",
      title: "Validation Patterns for Data Pipelines",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Build a schema validator for tabular data",
        "Collect all validation errors instead of stopping at the first",
        "Use rule-based validation with composable predicates",
        "Return structured validation results with row numbers",
      ],
      prerequisites: ["s13-data-cleaning"],
      concepts: ["data-validation", "validation-schema", "error-collection"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `from typing import Callable
from dataclasses import dataclass, field

@dataclass
class ValidationError:
    row: int
    field: str
    message: str

@dataclass
class ValidationResult:
    errors: list[ValidationError] = field(default_factory=list)

    @property
    def is_valid(self) -> bool:
        return len(self.errors) == 0

    def add(self, row: int, field_name: str, message: str) -> None:
        self.errors.append(ValidationError(row, field_name, message))`,
          caption: "Collecting all errors (not stopping at first) gives a complete picture of data quality.",
        },
        {
          kind: "code",
          language: "python",
          code: `Rule = Callable[[object], bool]

RULES: dict[str, list[tuple[Rule, str]]] = {
    "name": [
        (lambda v: isinstance(v, str) and len(v) > 0, "must be a non-empty string"),
    ],
    "price": [
        (lambda v: isinstance(v, (int, float)), "must be a number"),
        (lambda v: float(v) >= 0, "must be non-negative"),  # type: ignore[arg-type]
    ],
    "quantity": [
        (lambda v: isinstance(v, int), "must be an integer"),
        (lambda v: int(v) >= 0, "must be non-negative"),   # type: ignore[arg-type]
    ],
}

def validate_rows(
    rows: list[dict],
    rules: dict[str, list[tuple[Rule, str]]],
) -> ValidationResult:
    result = ValidationResult()
    for i, row in enumerate(rows):
        for field_name, field_rules in rules.items():
            value = row.get(field_name)
            for rule_fn, message in field_rules:
                if value is not None and not rule_fn(value):
                    result.add(i, field_name, message)
    return result`,
          caption: "Rule-based validation keeps rules composable and data-driven.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Validate at the pipeline entrance",
          body: "The cheapest place to catch bad data is at the input boundary — before any processing. Catching a missing `price` field on row 1 is far easier than debugging why your totals are wrong on row 10,000.",
        },
        {
          kind: "why-matters",
          body: "Data pipelines that fail silently produce wrong answers that look right. Building validation into your pipeline transforms 'mysterious wrong results' into 'clear error messages pointing to row 42, field price'.",
        },
      ],
      interactions: [
        {
          id: "s13-vp-fill-validator",
          kind: "fill-code",
          prompt: "Complete the validator that checks `email` contains `@`.",
          beginnerPurpose: "Write a simple predicate-based validation rule.",
          expectedConceptIds: ["data-validation"],
          codeTemplate: `def validate_email(value: str) -> bool:
    return ___BLANK_1___ in ___BLANK_2___

print(validate_email("alice@example.com"))  # True
print(validate_email("not-an-email"))       # False`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: '"@"', caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "value", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Check `'@' in value`." }],
          feedback: {
            correct: "Correct! `'@' in value` is a simple but effective email check.",
            incorrect: "Use `'@' in value` to check for the `@` character.",
          },
        },
        {
          id: "s13-vp-mc-collect-errors",
          kind: "multiple-choice",
          prompt: "Why should a data validator collect ALL errors before reporting, rather than stopping at the first?",
          beginnerPurpose: "Understand why error collection matters in data pipelines.",
          expectedConceptIds: ["error-collection"],
          options: [
            { id: "a", text: "It runs faster.", isCorrect: false, explanation: "Collecting all errors is slightly slower, but the benefit is completeness." },
            { id: "b", text: "It gives a complete picture of all data quality issues, so they can be fixed in one pass.", isCorrect: true, explanation: "Correct! Stopping at the first error forces repeated fix-and-rerun cycles." },
            { id: "c", text: "Python requires it.", isCorrect: false, explanation: "Python has no such requirement." },
            { id: "d", text: "It makes validation simpler to code.", isCorrect: false, explanation: "Collecting errors is slightly more complex to implement." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Imagine a file with 500 bad rows — how many runs would fix-one-at-a-time require?" }],
          feedback: {
            correct: "Exactly! Complete error collection means one fix cycle, not 500.",
            incorrect: "Stopping at the first error forces repeated cycles. Complete collection shows all issues at once.",
          },
        },
        {
          id: "s13-vp-debug-validation",
          kind: "debug-code",
          prompt: "The validator silently skips the `price` check when `price` is `None`. Fix it to flag missing required fields.",
          beginnerPurpose: "Handle missing required fields in validation.",
          expectedConceptIds: ["data-validation", "missing-value"],
          brokenCode: `def validate_row(row: dict) -> list[str]:
    errors: list[str] = []
    price = row.get("price")
    if price is not None and price < 0:   # skips None silently
        errors.append("price must be non-negative")
    return errors

print(validate_row({"price": None}))  # [] — should flag missing`,
          bugDescription: "When `price` is `None`, the check is skipped entirely. A missing required field should be flagged as an error.",
          fixedCode: `def validate_row(row: dict) -> list[str]:
    errors: list[str] = []
    price = row.get("price")
    if price is None:
        errors.append("price is required")
    elif price < 0:
        errors.append("price must be non-negative")
    return errors

print(validate_row({"price": None}))  # ['price is required']`,
          errorType: "LogicError",
          allowedAttempts: 4,
          hints: [{ level: "concept", text: "Check for `None` explicitly before checking the value." }],
          feedback: {
            correct: "Correct! Always check for missing required fields as a distinct case.",
            incorrect: "Add an explicit `if price is None: errors.append('price is required')` branch.",
          },
        },
        {
          id: "s13-vp-run-full-validator",
          kind: "run-code",
          prompt:
            "Write `count_invalid_rows(rows: list[dict]) -> int` that counts rows where `quantity` is missing or negative.",
          beginnerPurpose: "Implement targeted validation logic.",
          expectedConceptIds: ["data-validation"],
          starterCode: `def count_invalid_rows(rows: list[dict]) -> int:
    count = 0
    for row in rows:
        q = row.get("quantity")
        # flag if q is None OR q < 0
        pass
    return count

data = [
    {"quantity": 5},
    {"quantity": -1},
    {"quantity": None},
    {"quantity": 0},
]
print(count_invalid_rows(data))  # 2
`,
          task: "Count rows where `quantity` is `None` or negative. Should return 2.",
          expectedOutputContains: ["2"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Check `if q is None or q < 0: count += 1`." }],
          feedback: {
            correct: "Correct! Two invalid rows detected.",
            incorrect: "Check `if q is None or q < 0: count += 1` for each row.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "data-validation", recallPrompt: "Why collect all validation errors instead of stopping at the first?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s13-vp-fill-validator", "s13-vp-mc-collect-errors", "s13-vp-debug-validation"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["data-validation"],
      },
    },

    /* ── Lesson 3: Grouping and Aggregation ─────────────────────────────── */
    {
      id: "s13-grouping-aggregation",
      stageId: "stage-13",
      title: "Grouping and Aggregation",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Group records by a key using `collections.defaultdict`",
        "Compute sum, count, min, max, and average per group",
        "Use `itertools.groupby` for pre-sorted data",
        "Sort and rank groups by aggregated values",
      ],
      prerequisites: ["s13-validation-patterns"],
      concepts: ["grouping", "aggregation", "defaultdict"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `from collections import defaultdict

sales = [
    {"category": "Electronics", "amount": 299.99},
    {"category": "Books",       "amount": 14.99},
    {"category": "Electronics", "amount": 149.99},
    {"category": "Books",       "amount": 24.99},
    {"category": "Electronics", "amount": 79.99},
]

# Group by category
groups: dict[str, list[float]] = defaultdict(list)
for sale in sales:
    groups[sale["category"]].append(sale["amount"])

# Aggregate per group
for category, amounts in sorted(groups.items()):
    total = sum(amounts)
    count = len(amounts)
    average = total / count
    print(f"{category}: total={total:.2f}, count={count}, avg={average:.2f}")`,
          caption: "`defaultdict(list)` eliminates the 'key exists?' check when building groups.",
        },
        {
          kind: "code",
          language: "python",
          code: `from collections import defaultdict
from typing import Any

def group_by(
    records: list[dict[str, Any]],
    key: str,
) -> dict[Any, list[dict[str, Any]]]:
    """Group a list of dicts by a given key."""
    groups: dict[Any, list[dict[str, Any]]] = defaultdict(list)
    for record in records:
        groups[record[key]].append(record)
    return dict(groups)

def aggregate(
    groups: dict[Any, list[dict[str, Any]]],
    value_key: str,
) -> dict[Any, dict[str, float]]:
    """Compute sum, count, min, max, avg per group."""
    result = {}
    for group_key, rows in groups.items():
        values = [r[value_key] for r in rows]
        result[group_key] = {
            "sum": sum(values),
            "count": len(values),
            "min": min(values),
            "max": max(values),
            "avg": sum(values) / len(values),
        }
    return result`,
          caption: "Reusable `group_by` and `aggregate` functions work on any list of dicts.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "`Counter` for simple frequency counts",
          body: "`from collections import Counter; Counter(row['status'] for row in rows)` gives you a frequency dict in one line. Use it instead of a manual `defaultdict(int)` pattern when you just need counts.",
        },
        {
          kind: "why-matters",
          body: "Grouping and aggregation are the core of business intelligence. 'Total sales by region', 'average order value by customer segment', 'top 10 products by revenue' — these are all group-by-aggregate operations you can write with standard Python.",
        },
      ],
      interactions: [
        {
          id: "s13-ga-predict-group",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Trace a `defaultdict(int)` grouping operation.",
          expectedConceptIds: ["grouping", "defaultdict"],
          code: `from collections import defaultdict

words = ["apple", "banana", "apricot", "blueberry", "avocado"]
by_letter: dict[str, int] = defaultdict(int)
for word in words:
    by_letter[word[0]] += 1

print(dict(sorted(by_letter.items())))`,
          expectedOutput: "{'a': 3, 'b': 2}",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Count words starting with 'a' and 'b' separately." }],
          feedback: {
            correct: "Correct! 3 words start with 'a', 2 with 'b'.",
            incorrect: "apple, apricot, avocado start with 'a' (3); banana, blueberry start with 'b' (2).",
          },
        },
        {
          id: "s13-ga-fill-aggregate",
          kind: "fill-code",
          prompt: "Compute the average of a list of floats using `sum` and `len`.",
          beginnerPurpose: "Practice the most common aggregation formula.",
          expectedConceptIds: ["aggregation"],
          codeTemplate: `def average(values: list[float]) -> float:
    if not values:
        return 0.0
    return ___BLANK_1___(values) / ___BLANK_2___(values)

print(average([10.0, 20.0, 30.0]))  # 20.0`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "sum", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "len", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Average = total / count." }],
          feedback: {
            correct: "Correct! `sum(values) / len(values)` is the average.",
            incorrect: "Average = `sum(values) / len(values)`.",
          },
        },
        {
          id: "s13-ga-run-group-agg",
          kind: "run-code",
          prompt:
            "Group the orders by `category` and compute the total `amount` per category. Print each category and its total.",
          beginnerPurpose: "Apply group-then-aggregate pattern end-to-end.",
          expectedConceptIds: ["grouping", "aggregation"],
          starterCode: `from collections import defaultdict

orders = [
    {"category": "A", "amount": 10},
    {"category": "B", "amount": 20},
    {"category": "A", "amount": 30},
    {"category": "B", "amount": 40},
    {"category": "C", "amount": 5},
]

# Group by category and sum amounts
totals: dict[str, float] = defaultdict(float)
for order in orders:
    pass  # add amount to the right category

for cat, total in sorted(totals.items()):
    print(f"{cat}: {total}")
`,
          task: "Print A: 40, B: 60, C: 5 (in sorted order).",
          expectedOutputContains: ["A: 40", "B: 60", "C: 5"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "`totals[order['category']] += order['amount']`." }],
          feedback: {
            correct: "Grouping and aggregation working correctly!",
            incorrect: "Add `totals[order['category']] += order['amount']` inside the loop.",
          },
        },
        {
          id: "s13-ga-mc-defaultdict",
          kind: "multiple-choice",
          prompt: "What is the advantage of `defaultdict(list)` over a plain `dict` when building groups?",
          beginnerPurpose: "Understand the convenience of `defaultdict`.",
          expectedConceptIds: ["defaultdict", "grouping"],
          options: [
            { id: "a", text: "It is faster than a plain dict.", isCorrect: false, explanation: "Performance difference is negligible. The benefit is ergonomics." },
            { id: "b", text: "It automatically creates an empty list for new keys, eliminating `if key not in dict` checks.", isCorrect: true, explanation: "Correct! `defaultdict(list)` calls `list()` on first access of a new key." },
            { id: "c", text: "It prevents duplicate keys.", isCorrect: false, explanation: "`defaultdict` does not deduplicate keys." },
            { id: "d", text: "It sorts the keys automatically.", isCorrect: false, explanation: "Sorting is separate from storage; `defaultdict` doesn't sort." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what you'd have to write to safely append to a group without `defaultdict`." }],
          feedback: {
            correct: "Exactly! It auto-initialises missing keys to an empty list.",
            incorrect: "`defaultdict(list)` auto-creates `[]` for new keys, replacing the verbose `if key not in d: d[key] = []` pattern.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "grouping", recallPrompt: "How do you group a list of dicts by a key in Python without pandas?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s13-ga-predict-group", "s13-ga-fill-aggregate", "s13-ga-run-group-agg"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["grouping"],
      },
    },

    /* ── Lesson 4: Date and Time Processing ─────────────────────────────── */
    {
      id: "s13-date-time-processing",
      stageId: "stage-13",
      title: "Date and Time Processing",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Parse date strings using `datetime.strptime`",
        "Compute date differences and time periods",
        "Format dates for reports and filenames",
        "Handle timezone-aware datetimes",
      ],
      prerequisites: ["s13-grouping-aggregation"],
      concepts: ["datetime", "date-parsing", "time-delta"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `from datetime import datetime, date, timedelta

# Parsing
order_date = datetime.strptime("2025-03-15", "%Y-%m-%d")
print(order_date.date())   # 2025-03-15

# Formatting
print(order_date.strftime("%d %B %Y"))   # 15 March 2025
print(order_date.strftime("%Y%m%d"))     # 20250315 (useful in filenames)

# Arithmetic
thirty_days = order_date + timedelta(days=30)
print(thirty_days.date())  # 2025-04-14

# Difference
start = date(2025, 1, 1)
end = date(2025, 12, 31)
print((end - start).days)  # 364`,
          caption: "`strptime` parses strings; `strftime` formats datetimes. Memorise `%Y-%m-%d` and `%H:%M:%S`.",
        },
        {
          kind: "code",
          language: "python",
          code: `from datetime import datetime
import re

def parse_date_flexible(s: str) -> date | None:
    """Try multiple date formats."""
    from datetime import date
    for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%m-%d-%Y", "%B %d, %Y"):
        try:
            return datetime.strptime(s.strip(), fmt).date()
        except ValueError:
            continue
    return None

print(parse_date_flexible("2025-03-15"))    # 2025-03-15
print(parse_date_flexible("15/03/2025"))    # 2025-03-15
print(parse_date_flexible("March 15, 2025")) # 2025-03-15
print(parse_date_flexible("not-a-date"))    # None`,
          caption:
            "Real-world data has inconsistent date formats. Try each format until one succeeds.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Store dates as `datetime` objects early",
          body: "Parse date strings at the input boundary and store as `datetime.date` or `datetime.datetime` objects. Doing arithmetic on strings like `'2025-03-15'` is error-prone. Parse once, use everywhere.",
        },
        {
          kind: "why-matters",
          body: "Almost all real-world datasets contain dates. Whether you're grouping sales by month, calculating customer tenure, or filtering records to a date range, date handling is a core data skill.",
        },
      ],
      interactions: [
        {
          id: "s13-dt-predict-strptime",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Practice reading `strptime` format codes.",
          expectedConceptIds: ["date-parsing"],
          code: `from datetime import datetime
d = datetime.strptime("15-06-2025", "%d-%m-%Y")
print(d.year, d.month, d.day)`,
          expectedOutput: "2025 6 15",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`%d` = day, `%m` = month number, `%Y` = 4-digit year." }],
          feedback: {
            correct: "Correct! `'15-06-2025'` parsed as day=15, month=6, year=2025.",
            incorrect: "`%d-` matches 15, `%m-` matches 06 (month 6), `%Y` matches 2025.",
          },
        },
        {
          id: "s13-dt-fill-delta",
          kind: "fill-code",
          prompt: "Calculate the number of days between two dates.",
          beginnerPurpose: "Practice date arithmetic with `timedelta`.",
          expectedConceptIds: ["time-delta"],
          codeTemplate: `from datetime import date

start = date(2025, 1, 1)
end = date(2025, 12, 31)
delta = ___BLANK_1___ - ___BLANK_2___
print(delta.___BLANK_3___)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "end", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "start", caseSensitive: true },
            { placeholder: "___BLANK_3___", answer: "days", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Subtract dates to get a `timedelta`; access `.days` attribute." }],
          feedback: {
            correct: "Correct! `end - start` gives a `timedelta`; `.days` extracts the count.",
            incorrect: "Subtract dates: `end - start` gives a `timedelta`. Use `.days` to get the count.",
          },
        },
        {
          id: "s13-dt-run-group-by-month",
          kind: "run-code",
          prompt: "Group a list of date strings by month (format `YYYY-MM`) and count entries per month.",
          beginnerPurpose: "Combine date parsing with grouping.",
          expectedConceptIds: ["date-parsing", "grouping"],
          starterCode: `from datetime import datetime
from collections import defaultdict

dates = ["2025-01-05", "2025-01-20", "2025-02-10", "2025-02-28", "2025-03-01"]
by_month: dict[str, int] = defaultdict(int)

for d in dates:
    # Parse d, extract YYYY-MM, increment count
    pass

for month, count in sorted(by_month.items()):
    print(f"{month}: {count}")
`,
          task: "Print month counts: 2025-01: 2, 2025-02: 2, 2025-03: 1.",
          expectedOutputContains: ["2025-01: 2", "2025-02: 2", "2025-03: 1"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Parse with `datetime.strptime(d, '%Y-%m-%d')`, then format `.strftime('%Y-%m')`." }],
          feedback: {
            correct: "Date grouping works perfectly!",
            incorrect: "Parse each date with `strptime`, format the year-month with `strftime('%Y-%m')`, then increment the count.",
          },
        },
        {
          id: "s13-dt-mc-strftime",
          kind: "multiple-choice",
          prompt: "Which format string makes `datetime(2025, 3, 7).strftime(...)` return `'2025-03-07'`?",
          beginnerPurpose: "Learn the `strftime` codes for ISO date format.",
          expectedConceptIds: ["datetime"],
          options: [
            { id: "a", text: "`\"%Y-%m-%d\"`", isCorrect: true, explanation: "Correct! `%Y` = 4-digit year, `%m` = zero-padded month, `%d` = zero-padded day." },
            { id: "b", text: "`\"%y-%m-%d\"`", isCorrect: false, explanation: "`%y` is 2-digit year, giving `'25-03-07'`." },
            { id: "c", text: "`\"%Y-%d-%m\"`", isCorrect: false, explanation: "This swaps day and month, giving `'2025-07-03'`." },
            { id: "d", text: "`\"%YYYY-%MM-%DD\"`", isCorrect: false, explanation: "There are no `%YYYY` codes; the codes are single-character after `%`." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "ISO 8601 format is YYYY-MM-DD. Use `%Y-%m-%d`." }],
          feedback: {
            correct: "Correct! `%Y-%m-%d` is the ISO 8601 date format.",
            incorrect: "The ISO 8601 format is `%Y-%m-%d` — 4-digit year, 2-digit month, 2-digit day.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "date-parsing", recallPrompt: "How do you parse `'2025-03-15'` into a `datetime.date` object?", nextReviewAfterDays: 2 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s13-dt-predict-strptime", "s13-dt-fill-delta", "s13-dt-run-group-by-month"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["date-parsing"],
      },
    },

    /* ── Lesson 5: CSV/JSON Pipelines ───────────────────────────────────── */
    {
      id: "s13-csv-json-pipelines",
      stageId: "stage-13",
      title: "CSV and JSON Data Pipelines",
      kind: "practice",
      difficulty: "advanced",
      objectives: [
        "Read CSV files with `csv.DictReader`",
        "Write clean output with `csv.DictWriter`",
        "Build a multi-step pipeline: read → clean → validate → aggregate → write",
        "Generate both JSON and text report outputs",
      ],
      prerequisites: ["s13-date-time-processing"],
      concepts: ["csv-processing", "pipeline", "report-generation"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `import csv
import io

# Reading CSV with DictReader
csv_data = """category,amount,date
Electronics,299.99,2025-01-10
Books,14.99,2025-01-15
Electronics,149.99,2025-02-03
"""

reader = csv.DictReader(io.StringIO(csv_data))
rows = list(reader)
print(rows[0])
# {'category': 'Electronics', 'amount': '299.99', 'date': '2025-01-10'}`,
          caption:
            "`csv.DictReader` maps each row to a dict using the header as keys. All values are strings — remember to convert types after reading.",
        },
        {
          kind: "code",
          language: "python",
          code: `import csv, io, json
from collections import defaultdict

def run_pipeline(csv_text: str) -> dict:
    # 1. Read
    reader = csv.DictReader(io.StringIO(csv_text))
    rows = list(reader)

    # 2. Clean & convert
    cleaned = []
    for row in rows:
        try:
            cleaned.append({
                "category": row["category"].strip(),
                "amount": float(row["amount"]),
            })
        except (KeyError, ValueError):
            continue

    # 3. Aggregate
    totals: dict[str, float] = defaultdict(float)
    for row in cleaned:
        totals[row["category"]] += row["amount"]

    # 4. Report
    return dict(sorted(totals.items()))`,
          caption: "Each pipeline step is a distinct function or block: read → clean → aggregate → output.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "`io.StringIO` lets you treat a string like a file",
          body: "`io.StringIO(text)` wraps a string in a file-like object. This is invaluable for testing: you can pass string data to functions that expect a file without writing actual files.",
        },
        {
          kind: "why-matters",
          body: "CSV and JSON are the most common data exchange formats in business. A well-structured pipeline is readable, testable (each step in isolation), and easy to extend when the requirements change.",
        },
      ],
      interactions: [
        {
          id: "s13-cp-predict-dictreader",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Understand that DictReader values are always strings.",
          expectedConceptIds: ["csv-processing"],
          code: `import csv, io
data = "name,age\nAlice,30\n"
reader = csv.DictReader(io.StringIO(data))
row = next(reader)
print(type(row["age"]).__name__)
print(row["age"] + " years")`,
          expectedOutput: "str\n30 years",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`csv.DictReader` returns all values as strings." }],
          feedback: {
            correct: "Correct! CSV values are always strings. `'30' + ' years'` = `'30 years'`.",
            incorrect: "`csv.DictReader` gives strings. `row['age']` is `'30'` (str), so concatenation works.",
          },
        },
        {
          id: "s13-cp-fill-pipeline",
          kind: "fill-code",
          prompt: "Complete the pipeline step that converts `amount` from string to float.",
          beginnerPurpose: "Practice the clean step of a data pipeline.",
          expectedConceptIds: ["pipeline", "csv-processing"],
          codeTemplate: `rows = [{"category": "Books", "amount": "14.99"}]
cleaned = []
for row in rows:
    cleaned.append({
        "category": row["category"].strip(),
        "amount": ___BLANK_1___(row["___BLANK_2___"]),
    })
print(cleaned[0]["amount"])  # 14.99`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "float", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "amount", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Convert with `float(row['amount'])`." }],
          feedback: {
            correct: "Correct! `float(row['amount'])` converts the string to a number.",
            incorrect: "Use `float(row['amount'])` to convert the string to a float.",
          },
        },
        {
          id: "s13-cp-run-full-pipeline",
          kind: "run-code",
          prompt:
            "Implement `summarize_csv(csv_text: str) -> dict[str, float]` that reads CSV with `category` and `amount` columns and returns total amount per category.",
          beginnerPurpose: "Build a complete mini data pipeline end to end.",
          expectedConceptIds: ["csv-processing", "pipeline", "aggregation"],
          starterCode: `import csv
import io
from collections import defaultdict

def summarize_csv(csv_text: str) -> dict[str, float]:
    totals: dict[str, float] = defaultdict(float)
    reader = csv.DictReader(io.StringIO(csv_text))
    for row in reader:
        # Add float(row['amount']) to the right category
        pass
    return dict(totals)

csv_data = """category,amount
Electronics,100.0
Books,25.0
Electronics,50.0
Books,15.0
"""

result = summarize_csv(csv_data)
for cat, total in sorted(result.items()):
    print(f"{cat}: {total}")
`,
          task: "Print `Books: 40.0` and `Electronics: 150.0`.",
          expectedOutputContains: ["Books: 40.0", "Electronics: 150.0"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "`totals[row['category']] += float(row['amount'])`." }],
          feedback: {
            correct: "Full pipeline working! CSV read, converted, and aggregated.",
            incorrect: "Add `totals[row['category']] += float(row['amount'])` inside the loop.",
          },
        },
        {
          id: "s13-cp-mc-io-stringio",
          kind: "multiple-choice",
          prompt: "Why use `io.StringIO` when testing CSV processing functions?",
          beginnerPurpose: "Understand the testing benefit of `io.StringIO`.",
          expectedConceptIds: ["pipeline"],
          options: [
            { id: "a", text: "It makes reading faster.", isCorrect: false, explanation: "Speed is not the primary benefit." },
            { id: "b", text: "It wraps a string as a file-like object, enabling tests without creating real files.", isCorrect: true, explanation: "Correct! `io.StringIO` lets you test file-reading code with in-memory strings." },
            { id: "c", text: "It automatically parses CSV.", isCorrect: false, explanation: "`io.StringIO` wraps a string; `csv.DictReader` does the CSV parsing." },
            { id: "d", text: "It is required by `csv.DictReader`.", isCorrect: false, explanation: "`csv.DictReader` can take any iterable; `io.StringIO` is just convenient for strings." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what you'd have to do without `io.StringIO` — write actual files?" }],
          feedback: {
            correct: "Correct! `io.StringIO` eliminates the need for temporary files in tests.",
            incorrect: "`io.StringIO` creates an in-memory file — you can test your CSV code without writing real files.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "pipeline", recallPrompt: "Name the four steps of a typical data pipeline.", nextReviewAfterDays: 3 },
        { conceptId: "csv-processing", recallPrompt: "What type does `csv.DictReader` return for each cell value?", nextReviewAfterDays: 2 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s13-cp-predict-dictreader", "s13-cp-fill-pipeline", "s13-cp-run-full-pipeline"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["pipeline", "csv-processing"],
      },
    },
  ],

  /* ── Project ──────────────────────────────────────────────────────────── */
  project: {
    id: "s13-sales-analyzer",
    stageId: "stage-13",
    title: "Sales Data Analyzer",
    brief:
      "Build a pipeline that reads a CSV of sales records, cleans and validates the data, calculates category totals, and generates both a JSON summary and a human-readable text report.",
    requirements: [
      "Read a CSV with columns: `date`, `category`, `product`, `quantity`, `unit_price`",
      "Clean: strip whitespace, parse `unit_price` to float, parse `date` to `datetime.date`",
      "Validate: all required fields present, `quantity` >= 0, `unit_price` >= 0",
      "Compute `line_total = quantity * unit_price` for each valid row",
      "Group by `category` and compute: total revenue, item count, average order value",
      "Write a `report.json` with the aggregated data",
      "Write a `report.txt` with a formatted, human-readable summary table",
    ],
    acceptanceCriteria: [
      "Invalid rows are logged and skipped, not crashing the pipeline",
      "JSON report contains totals per category",
      "Text report is formatted with aligned columns",
      "Running the pipeline twice produces identical output (idempotent)",
      "All code has type hints",
    ],
    conceptIds: ["data-cleaning", "data-validation", "grouping", "aggregation", "pipeline", "csv-processing", "report-generation"],
    difficulty: "advanced",
    starterCode: `import csv
import io
import json
import logging
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, date

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

SAMPLE_CSV = """date,category,product,quantity,unit_price
2025-01-10,Electronics,Laptop,2,999.99
2025-01-15,Books,Python Book,5,49.99
2025-02-03,Electronics,Mouse,10,29.99
2025-02-20,Books,Data Science,3,
2025-03-01,Electronics,Keyboard,bad_qty,79.99
"""

@dataclass
class SaleRecord:
    date: date
    category: str
    product: str
    quantity: int
    unit_price: float
    line_total: float

def parse_row(row: dict) -> SaleRecord | None:
    # TODO: clean, validate, return SaleRecord or None on error
    pass

def summarize(records: list[SaleRecord]) -> dict:
    # TODO: group by category, compute totals
    pass

def main() -> None:
    reader = csv.DictReader(io.StringIO(SAMPLE_CSV))
    records = [r for row in reader if (r := parse_row(row)) is not None]
    summary = summarize(records)
    print(json.dumps(summary, indent=2))

if __name__ == "__main__":
    main()
`,
  },
} satisfies Stage;
