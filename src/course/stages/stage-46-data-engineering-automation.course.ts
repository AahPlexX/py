import type { Stage } from "@/course/course.schema";

export const stage46 = {
  id: "stage-46",
  number: 46,
  title: "Data Engineering and Automation Workflows",
  summary:
    "Master data engineering fundamentals — batch and streaming processing, ETL/ELT pipelines, schema validation, idempotency, retries, checkpointing, data quality, and automation scheduling.",
  level: "advanced",
  masteryGateConceptIds: ["etl-pipeline", "data-quality", "idempotency"],
  lessons: [
    // ── 46.1 Batch processing ────────────────────────────────────────────────
    {
      id: "s46-batch-processing",
      stageId: "stage-46",
      title: "Batch Processing",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define batch processing and contrast it with real-time processing",
        "Identify scenarios where batch processing is the right choice",
        "Implement a simple batch processor in Python",
      ],
      prerequisites: [],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Batch Processing\n\n**Batch processing** collects data over a time window and processes it all at once rather than item-by-item as events arrive.\n\nTypical use cases:\n- Nightly report generation from a day's transactions\n- Hourly syncing of a data warehouse from an OLTP database\n- Weekly email digests\n\nBatch jobs are scheduled by a cron-like scheduler and trade **latency** (data is only as fresh as the last run) for **simplicity** — the processing logic doesn't need to handle concurrency or partial state.",
        },
        {
          kind: "code",
          language: "python",
          code:
`import csv
from pathlib import Path
from datetime import date

def process_orders_batch(orders_file: Path) -> dict:
    """Process a batch of orders and return summary stats."""
    total_revenue = 0.0
    order_count = 0

    with open(orders_file) as f:
        for row in csv.DictReader(f):
            total_revenue += float(row["amount"])
            order_count += 1

    return {
        "date": date.today().isoformat(),
        "orders": order_count,
        "total_revenue": round(total_revenue, 2),
    }

# Called from a nightly cron job
if __name__ == "__main__":
    result = process_orders_batch(Path("orders_today.csv"))
    print(result)`,
          caption: "Simple batch processor that aggregates a CSV file",
        },
        {
          kind: "comparison",
          leftLabel: "Batch Processing",
          rightLabel: "Stream Processing",
          leftCode:
`# Collect all events, process at midnight
for record in load_all_today():
    aggregate(record)
save_report()`,
          rightCode:
`# Process each event as it arrives
for event in kafka_consumer:
    update_running_total(event)
    if should_emit():
        emit_partial_result()`,
          caption: "Batch vs stream: latency vs complexity trade-off",
        },
        {
          kind: "why-matters",
          body: "Batch processing powers most data warehouses, reporting systems, and ML training pipelines. Understanding its characteristics — and limitations — prevents you from building complex streaming systems where a nightly job would suffice.",
        },
      ],
      interactions: [
        {
          id: "s46-batch-mc",
          kind: "multiple-choice",
          prompt: "Which scenario is best suited to batch processing rather than stream processing?",
          beginnerPurpose: "Identify when batch processing is appropriate",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "Detecting credit card fraud within milliseconds of each transaction", isCorrect: false, explanation: "Fraud detection requires real-time stream processing." },
            { id: "b", text: "Generating monthly salary payroll files", isCorrect: true, explanation: "Correct — payroll runs once a month; batch processing is perfect." },
            { id: "c", text: "Updating search rankings as new pages are indexed", isCorrect: false },
            { id: "d", text: "Displaying live sports scores", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Batch is ideal when high latency (minutes to hours) is acceptable." }],
          feedback: { correct: "Correct — periodic, non-real-time workloads suit batch.", incorrect: "Batch is for workloads where processing can wait for a full window to accumulate." },
        },
        {
          id: "s46-batch-fill",
          kind: "fill-code",
          prompt: "Complete the batch function to count records and sum the `amount` field from a list of dicts.",
          beginnerPurpose: "Implement basic batch aggregation logic",
          expectedConceptIds: ["etl-pipeline"],
          codeTemplate:
`def summarise(records: list[dict]) -> dict:
    total = ___BLANK_1___
    for r in records:
        total += float(r["amount"])
    return {"count": len(records), "total": ___BLANK_2___}`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "0.0", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "total", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Initialise the accumulator to 0.0 and return it at the end." }],
          feedback: { correct: "Correct batch aggregation!", incorrect: "Initialise total to 0.0 and return `total` in the dict." },
        },
      ],
      reviewHooks: [
        { conceptId: "etl-pipeline", recallPrompt: "Name one scenario each where batch processing is and isn't appropriate.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s46-batch-mc", "s46-batch-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.2 Streaming concepts ──────────────────────────────────────────────
    {
      id: "s46-streaming-concepts",
      stageId: "stage-46",
      title: "Streaming Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain the publish-subscribe model for event streams",
        "Describe at-least-once vs exactly-once delivery guarantees",
        "Simulate a simple producer-consumer stream in Python",
      ],
      prerequisites: ["s46-batch-processing"],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Streaming Concepts\n\nStream processing handles events **as they arrive**. Core concepts:\n\n- **Producer** — publishes events to a topic/queue\n- **Consumer** — reads events and processes them\n- **Offset** — a position in the stream; consumers track their position so they can resume after failure\n- **Delivery guarantee** — at-most-once (may drop), at-least-once (may duplicate), exactly-once (correct, expensive)\n\nKafka, RabbitMQ, and AWS SQS are common brokers.",
        },
        {
          kind: "code",
          language: "python",
          code:
`import queue
import threading

# Simple in-process pub/sub simulation
event_queue: queue.Queue[dict] = queue.Queue()

def producer(n: int) -> None:
    for i in range(n):
        event = {"type": "order_placed", "id": i, "amount": i * 10.0}
        event_queue.put(event)
        print(f"Produced: {event['id']}")
    event_queue.put(None)  # sentinel

def consumer() -> None:
    while True:
        event = event_queue.get()
        if event is None:
            break
        print(f"Consumed: {event['id']} — \${event['amount']}")

t_prod = threading.Thread(target=producer, args=(5,))
t_cons = threading.Thread(target=consumer)
t_prod.start(); t_cons.start()
t_prod.join(); t_cons.join()`,
          caption: "Producer-consumer pattern with a Python Queue",
        },
        {
          kind: "mental-model",
          title: "Stream as a conveyor belt",
          analogy: "A data stream is like a factory conveyor belt. The producer puts items on one end; consumers pick them up as they arrive. The belt keeps moving — you can't stop it to process a whole batch first.",
          explanation: "Each consumer has a bookmark (offset) marking where they last picked up. If a consumer crashes, it resumes from its bookmark, possibly re-processing some items (at-least-once).",
        },
        {
          kind: "why-matters",
          body: "Streaming is essential for real-time analytics, fraud detection, and event-driven microservices. Understanding delivery semantics prevents data loss and duplicate processing bugs.",
        },
      ],
      interactions: [
        {
          id: "s46-stream-mc",
          kind: "multiple-choice",
          prompt: "A consumer crashes and restarts from its last committed offset. Some events are processed twice. Which delivery guarantee is this?",
          beginnerPurpose: "Identify delivery guarantee from described behaviour",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "At-most-once — events may be skipped", isCorrect: false },
            { id: "b", text: "At-least-once — events may be duplicated", isCorrect: true, explanation: "Correct — reprocessing from offset means some events are seen more than once." },
            { id: "c", text: "Exactly-once — no duplicates or losses", isCorrect: false },
            { id: "d", text: "Best-effort — no guarantees at all", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The consumer reprocesses from the last safe offset — can it miss events? Can it duplicate?" }],
          feedback: { correct: "Correct — at-least-once is the most common guarantee.", incorrect: "Resuming from offset ensures no loss but may cause duplicates = at-least-once." },
        },
        {
          id: "s46-stream-explain",
          kind: "plain-language-explain",
          prompt: "Explain why exactly-once delivery in distributed systems is expensive compared to at-least-once.",
          beginnerPurpose: "Understand delivery guarantee trade-offs",
          expectedConceptIds: ["etl-pipeline"],
          code:
`# At-least-once: commit offset after processing
# (fast, may duplicate on crash)

# Exactly-once: 2-phase commit across broker + consumer
# (slow, complex, requires distributed transaction)`,
          keyPointsToHit: [
            "At-least-once only needs to track offset (cheap)",
            "Exactly-once requires coordinating the broker and consumer in a distributed transaction",
            "Distributed transactions involve locks and multi-phase protocols that reduce throughput",
          ],
          sampleAnswer: "Exactly-once delivery requires the broker and consumer to agree atomically that an event was processed — they must use a distributed transaction. This is expensive because it involves locks and multiple round trips. At-least-once only tracks a position (offset) and replays if something goes wrong — much cheaper.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what coordination is needed to guarantee no duplicates across two separate systems." }],
          feedback: { correct: "Great explanation!", incorrect: "Focus on the distributed coordination required for exactly-once." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-stream-mc", "s46-stream-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.3 ETL ─────────────────────────────────────────────────────────────
    {
      id: "s46-etl",
      stageId: "stage-46",
      title: "ETL (Extract, Transform, Load)",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain the three phases of ETL",
        "Implement a simple ETL pipeline in Python",
        "Identify the risks of transforming data before loading",
      ],
      prerequisites: ["s46-streaming-concepts"],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## ETL — Extract, Transform, Load\n\n**ETL** is the classic data pipeline pattern:\n\n1. **Extract** — pull raw data from sources (databases, APIs, files)\n2. **Transform** — clean, normalize, enrich, and validate\n3. **Load** — write the processed data to the destination (data warehouse, analytics DB)\n\nTransformations happen **before** loading, so the destination only ever sees clean data. This keeps the data warehouse simple but puts complexity in the pipeline.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from dataclasses import dataclass
from typing import Iterable

@dataclass
class RawOrder:
    id: str
    customer: str
    amount_cents: int

@dataclass
class CleanOrder:
    id: str
    customer: str
    amount_usd: float

# ── Extract ──────────────────────────────────────────────────────
def extract(source: list[dict]) -> Iterable[RawOrder]:
    for row in source:
        yield RawOrder(
            id=row["order_id"],
            customer=row["cust_name"].strip(),
            amount_cents=int(row["amount_cents"]),
        )

# ── Transform ────────────────────────────────────────────────────
def transform(raw: RawOrder) -> CleanOrder:
    return CleanOrder(
        id=raw.id,
        customer=raw.customer.title(),        # normalise casing
        amount_usd=raw.amount_cents / 100.0,  # convert units
    )

# ── Load ─────────────────────────────────────────────────────────
def load(orders: Iterable[CleanOrder], dest: list) -> int:
    count = 0
    for order in orders:
        dest.append(order)
        count += 1
    return count

# Pipeline
raw_source = [{"order_id":"1","cust_name":" alice ","amount_cents":"1099"}]
destination: list[CleanOrder] = []
raw = extract(raw_source)
clean = (transform(r) for r in raw)
n = load(clean, destination)
print(f"Loaded {n} orders:", destination)`,
          caption: "ETL pipeline with typed dataclasses",
        },
        {
          kind: "why-matters",
          body: "ETL is the foundation of every data warehouse. Understanding the phases helps you decide where to put transformation logic and how to handle errors in each phase independently.",
        },
      ],
      interactions: [
        {
          id: "s46-etl-reorder",
          kind: "reorder-code",
          prompt: "Arrange the ETL pipeline steps in the correct order.",
          beginnerPurpose: "Recall the three phases of ETL",
          expectedConceptIds: ["etl-pipeline"],
          lines: [
            "raw_data = extract(source)",
            "clean_data = (transform(r) for r in raw_data)",
            "n = load(clean_data, destination)",
            "print(f'Loaded {n} records')",
          ],
          correctOrder: [0, 1, 2, 3],
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Extract → Transform → Load, then report." }],
          feedback: { correct: "Correct ETL order!", incorrect: "Remember: Extract first, then Transform, then Load." },
        },
        {
          id: "s46-etl-mc",
          kind: "multiple-choice",
          prompt: "In traditional ETL, where do transformations (cleaning, normalisation) happen?",
          beginnerPurpose: "Identify the defining characteristic of ETL",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "After loading into the data warehouse", isCorrect: false, explanation: "That would be ELT, not ETL." },
            { id: "b", text: "Before loading — in the pipeline itself", isCorrect: true, explanation: "Correct — in ETL, data is clean before it enters the warehouse." },
            { id: "c", text: "At query time, using SQL views", isCorrect: false },
            { id: "d", text: "In the source database", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what the 'T' in ETL stands for and when it runs." }],
          feedback: { correct: "Correct — transform before load.", incorrect: "In ETL the T (transform) happens before the L (load)." },
        },
      ],
      reviewHooks: [
        { conceptId: "etl-pipeline", recallPrompt: "What are the three phases of ETL and what happens in each?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s46-etl-reorder", "s46-etl-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.4 ELT ─────────────────────────────────────────────────────────────
    {
      id: "s46-elt",
      stageId: "stage-46",
      title: "ELT (Extract, Load, Transform)",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Contrast ELT with ETL and explain when ELT is preferred",
        "Explain how modern data warehouses enable ELT",
        "Identify the risks of loading raw data before transforming",
      ],
      prerequisites: ["s46-etl"],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## ELT — Extract, Load, Transform\n\n**ELT** reverses the T and L: raw data is loaded into the data warehouse first, then transformed in-place using SQL.\n\nModern cloud warehouses (BigQuery, Snowflake, Redshift) are powerful enough to run transformations efficiently at scale. Tools like **dbt** (data build tool) manage ELT transformation SQL.\n\n**Advantages over ETL:**\n- Raw data is preserved — you can re-run transformations without re-extracting\n- Transformations are just SQL — easy to debug and version-control\n- No separate transformation infrastructure needed",
        },
        {
          kind: "comparison",
          leftLabel: "ETL",
          rightLabel: "ELT",
          leftCode:
`# Transform BEFORE loading
raw = extract(source)
clean = transform(raw)   # Python/Spark
load(clean, warehouse)   # only clean data`,
          rightCode:
`# Load raw THEN transform with SQL
raw = extract(source)
load(raw, warehouse)          # raw data lands
# Later: dbt run → SQL transforms
# SELECT *, amount/100 AS usd FROM raw`,
          caption: "ETL vs ELT — when the transformation step runs",
        },
        {
          kind: "callout",
          variant: "info",
          title: "ELT requires a powerful warehouse",
          body: "ELT only makes sense when your destination (BigQuery, Snowflake) is fast enough to transform large datasets. For small databases, ETL may be simpler.",
        },
        {
          kind: "why-matters",
          body: "ELT has largely replaced ETL in modern data stacks. Understanding why helps you make the right architectural choice and use tools like dbt effectively.",
        },
      ],
      interactions: [
        {
          id: "s46-elt-mc",
          kind: "multiple-choice",
          prompt: "An engineer realises their ETL transformation had a bug and discarded useful data. With ELT, could they recover?",
          beginnerPurpose: "Understand raw data preservation in ELT",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "No — ELT has the same problem as ETL", isCorrect: false },
            { id: "b", text: "Yes — raw data is in the warehouse; fix the SQL and re-run", isCorrect: true, explanation: "Correct — ELT keeps raw data, so you can reprocess without re-extracting." },
            { id: "c", text: "Only if they had a backup of the transformation script", isCorrect: false },
            { id: "d", text: "Yes, but only within 24 hours", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "In ELT, what's already in the warehouse after the load step?" }],
          feedback: { correct: "Correct — raw data is preserved in ELT.", incorrect: "ELT loads raw data first — it's always there to re-transform." },
        },
        {
          id: "s46-elt-explain",
          kind: "plain-language-explain",
          prompt: "Explain why modern teams often prefer ELT over ETL for analytics workloads.",
          beginnerPurpose: "Articulate ELT advantages",
          expectedConceptIds: ["etl-pipeline"],
          code:
`# ETL: transform in Python/Spark before loading
# ELT: load raw, transform with SQL in warehouse
# dbt models = SQL files run by dbt in the warehouse`,
          keyPointsToHit: [
            "Raw data is preserved for reprocessing",
            "SQL is easier to debug and version than pipeline code",
            "Modern warehouses are fast enough to transform at scale",
          ],
          sampleAnswer: "With ELT, raw data lands in the warehouse first. If a transformation has a bug, you fix the SQL and re-run without re-extracting from source. The transformation logic is plain SQL, which is easier to read and review than Spark code. Modern warehouses like BigQuery are fast enough to run these transforms efficiently on billions of rows.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Focus on raw data preservation and the power of SQL in modern warehouses." }],
          feedback: { correct: "Great explanation!", incorrect: "Mention raw data preservation and SQL-based transforms." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-elt-mc", "s46-elt-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.5 Data contracts ──────────────────────────────────────────────────
    {
      id: "s46-data-contracts",
      stageId: "stage-46",
      title: "Data Contracts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define a data contract and explain its role in pipelines",
        "Use Pydantic to enforce a data contract at ingestion time",
        "Handle contract violations gracefully",
      ],
      prerequisites: ["s46-elt"],
      concepts: ["data-quality"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Data Contracts\n\nA **data contract** is a formal agreement between a data producer and consumer about the schema, format, and semantics of data. It answers:\n\n- What fields exist and what are their types?\n- Which fields are required vs optional?\n- What are the valid value ranges?\n- How often does the schema change, and how will changes be communicated?\n\nWithout data contracts, upstream schema changes silently break downstream pipelines.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from pydantic import BaseModel, Field, ValidationError
from datetime import datetime

# The data contract for events from the orders service
class OrderEvent(BaseModel):
    order_id: str = Field(min_length=1)
    customer_id: str = Field(min_length=1)
    amount_cents: int = Field(ge=0)
    currency: str = Field(pattern=r"^[A-Z]{3}$")
    created_at: datetime

def ingest(raw: dict) -> OrderEvent | None:
    try:
        return OrderEvent.model_validate(raw)
    except ValidationError as e:
        print(f"Contract violation: {e}")
        return None  # route to dead-letter queue

# Valid event
ok = ingest({"order_id":"1","customer_id":"c1",
             "amount_cents":999,"currency":"USD",
             "created_at":"2024-01-01T00:00:00Z"})
print(ok)

# Invalid event — missing currency
bad = ingest({"order_id":"2","customer_id":"c2","amount_cents":100})
# → prints contract violation, returns None`,
          caption: "Pydantic as an executable data contract",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Dead-letter queues for violations",
          body: "When an event violates the contract, don't silently drop it or crash the pipeline. Route it to a **dead-letter queue (DLQ)** for investigation and potential replay after the producer fixes the issue.",
        },
        {
          kind: "why-matters",
          body: "Data contracts prevent the 'silent corruption' class of bugs — where upstream schema changes break downstream consumers without any error, producing wrong numbers in reports or dashboards.",
        },
      ],
      interactions: [
        {
          id: "s46-contract-mc",
          kind: "multiple-choice",
          prompt: "An upstream team renames `amount_cents` to `amount` in their event payload without telling you. What happens to your pipeline if you have a Pydantic data contract?",
          beginnerPurpose: "Understand how data contracts catch upstream schema changes",
          expectedConceptIds: ["data-quality"],
          options: [
            { id: "a", text: "Nothing — Pydantic handles renaming automatically", isCorrect: false },
            { id: "b", text: "The pipeline crashes silently and loses data", isCorrect: false },
            { id: "c", text: "Pydantic raises a ValidationError — the contract violation is caught and can be routed to a DLQ", isCorrect: true, explanation: "Correct — the missing required field triggers a clear validation error." },
            { id: "d", text: "The event is processed with amount_cents=0", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What does Pydantic do when a required field is missing?" }],
          feedback: { correct: "Correct — ValidationError surfaces the break immediately.", incorrect: "Pydantic raises a ValidationError for missing required fields, making the contract break visible." },
        },
        {
          id: "s46-contract-fill",
          kind: "fill-code",
          prompt: "Complete the ingestion function to catch ValidationError and return None.",
          beginnerPurpose: "Implement safe contract-enforced ingestion",
          expectedConceptIds: ["data-quality"],
          codeTemplate:
`from pydantic import BaseModel, ValidationError

class Event(BaseModel):
    id: str
    value: float

def ingest(raw: dict):
    try:
        return Event.___BLANK_1___(raw)
    except ___BLANK_2___:
        return None`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "model_validate", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "ValidationError", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `model_validate()` to parse a dict, catch `ValidationError` from pydantic." }],
          feedback: { correct: "Correct!", incorrect: "Use `model_validate(raw)` to parse and `ValidationError` to catch failures." },
        },
      ],
      reviewHooks: [
        { conceptId: "data-quality", recallPrompt: "What is a data contract and what problem does it solve?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s46-contract-mc", "s46-contract-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.6 Schema validation ───────────────────────────────────────────────
    {
      id: "s46-schema-validation",
      stageId: "stage-46",
      title: "Schema Validation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Validate JSON and CSV data against a schema at pipeline ingestion",
        "Classify validation errors by severity",
        "Choose between fail-fast and accumulate-errors strategies",
      ],
      prerequisites: ["s46-data-contracts"],
      concepts: ["data-quality"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Schema Validation\n\nSchema validation checks that incoming data matches expected types, ranges, and structure before processing. Two strategies:\n\n**Fail-fast** — stop processing at the first error. Safe but loses partial progress.\n\n**Accumulate errors** — collect all violations, then decide what to do. Gives more information, allows partial processing of valid records.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from pydantic import BaseModel, ValidationError, Field
from typing import NamedTuple

class Product(BaseModel):
    sku: str = Field(min_length=3)
    price: float = Field(gt=0)
    stock: int = Field(ge=0)

class ValidationResult(NamedTuple):
    valid: list[Product]
    errors: list[dict]

def validate_batch(rows: list[dict]) -> ValidationResult:
    """Accumulate-errors strategy: process all rows, collect failures."""
    valid = []
    errors = []
    for i, row in enumerate(rows):
        try:
            valid.append(Product.model_validate(row))
        except ValidationError as e:
            errors.append({"row": i, "data": row, "errors": e.errors()})
    return ValidationResult(valid=valid, errors=errors)

rows = [
    {"sku": "ABC", "price": 9.99, "stock": 5},    # valid
    {"sku": "X", "price": -1.0, "stock": 0},      # sku too short, price negative
    {"sku": "DEF", "price": 4.50, "stock": -1},   # stock negative
]
result = validate_batch(rows)
print(f"Valid: {len(result.valid)}, Errors: {len(result.errors)}")`,
          caption: "Accumulate-errors batch validation returning valid and invalid records",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Classify errors by severity",
          body: "Not all validation errors are equal. A missing required field might require routing to a DLQ. A missing optional field might use a default. A type mismatch might be auto-corrected. Define clear policies.",
        },
        {
          kind: "why-matters",
          body: "Schema validation at the pipeline boundary is the cheapest place to catch bad data — before it propagates into reports, models, or production databases.",
        },
      ],
      interactions: [
        {
          id: "s46-schema-mc",
          kind: "multiple-choice",
          prompt: "You're processing 10,000 rows and 200 have schema errors. Which strategy lets you successfully load the 9,800 valid rows while capturing errors for review?",
          beginnerPurpose: "Choose the right validation strategy for partial datasets",
          expectedConceptIds: ["data-quality"],
          options: [
            { id: "a", text: "Fail-fast — stop at the first error", isCorrect: false, explanation: "Fail-fast would stop at the first of 200 errors, losing 9,800 valid rows." },
            { id: "b", text: "Accumulate errors — process valid rows, collect errors", isCorrect: true, explanation: "Correct — you load the valid records and review errors separately." },
            { id: "c", text: "Skip all validation for performance", isCorrect: false },
            { id: "d", text: "Reject the entire batch", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which strategy allows processing to continue past individual errors?" }],
          feedback: { correct: "Correct — accumulate-errors maximises valid throughput.", incorrect: "Accumulate errors lets you process valid rows despite some failures." },
        },
        {
          id: "s46-schema-predict",
          kind: "predict-output",
          prompt: "How many items are in `result.valid` and `result.errors` after running the code from this lesson?",
          beginnerPurpose: "Trace accumulate-errors validation on sample data",
          expectedConceptIds: ["data-quality"],
          code:
`# rows has 3 entries:
# row 0: valid
# row 1: sku too short + price negative (2 errors)
# row 2: stock negative (1 error)
result = validate_batch(rows)
print(f"Valid: {len(result.valid)}, Errors: {len(result.errors)}")`,
          expectedOutput: "Valid: 1, Errors: 2",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Count which rows pass all constraints and which fail any constraint." }],
          feedback: { correct: "Correct — 1 valid, 2 error rows.", incorrect: "Row 0 passes all checks; rows 1 and 2 each have at least one failure." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-schema-mc", "s46-schema-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.7 Idempotency ─────────────────────────────────────────────────────
    {
      id: "s46-idempotency",
      stageId: "stage-46",
      title: "Idempotency",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define idempotency and explain why it matters in pipelines",
        "Implement idempotent writes using upsert patterns",
        "Use idempotency keys to deduplicate API requests",
      ],
      prerequisites: ["s46-schema-validation"],
      concepts: ["idempotency"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Idempotency\n\nAn operation is **idempotent** if applying it multiple times produces the same result as applying it once. In data pipelines, this is essential because:\n\n- Jobs fail and must be retried\n- Events may be delivered more than once (at-least-once)\n- Network timeouts cause duplicate requests\n\n**Techniques:**\n- Use `INSERT … ON CONFLICT DO UPDATE` (upsert) instead of plain `INSERT`\n- Track processed event IDs in a deduplication table\n- Use a content hash as the primary key",
        },
        {
          kind: "code",
          language: "python",
          code:
`import sqlite3

conn = sqlite3.connect(":memory:")
conn.execute("""
    CREATE TABLE orders (
        order_id TEXT PRIMARY KEY,
        amount   REAL,
        status   TEXT
    )
""")

def upsert_order(order_id: str, amount: float, status: str) -> None:
    """Idempotent write — safe to call multiple times for the same order."""
    conn.execute(
        """
        INSERT INTO orders (order_id, amount, status)
        VALUES (?, ?, ?)
        ON CONFLICT(order_id) DO UPDATE SET
            amount = excluded.amount,
            status = excluded.status
        """,
        (order_id, amount, status),
    )
    conn.commit()

# Calling this twice is safe — no duplicate rows
upsert_order("ORD-1", 99.99, "paid")
upsert_order("ORD-1", 99.99, "paid")  # duplicate → no-op
print(conn.execute("SELECT COUNT(*) FROM orders").fetchone())  # (1,)`,
          caption: "Upsert (INSERT OR REPLACE) — idempotent writes",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Idempotency keys in HTTP APIs",
          body: "APIs like Stripe accept an `Idempotency-Key` header. If you retry a payment request with the same key, the server returns the original response without charging again.",
        },
        {
          kind: "why-matters",
          body: "Non-idempotent pipelines double-charge customers, duplicate rows in reports, and send duplicate emails when retried. Idempotency is the difference between safe and unsafe retries.",
        },
      ],
      interactions: [
        {
          id: "s46-idem-mc",
          kind: "multiple-choice",
          prompt: "A pipeline retries after a network timeout and the same order event is processed twice. Which database operation prevents a duplicate row?",
          beginnerPurpose: "Identify the idempotent write operation",
          expectedConceptIds: ["idempotency"],
          options: [
            { id: "a", text: "INSERT (plain)", isCorrect: false, explanation: "Plain INSERT fails or creates a duplicate on a second call." },
            { id: "b", text: "SELECT then INSERT if not exists", isCorrect: false, explanation: "This has a race condition between the SELECT and INSERT." },
            { id: "c", text: "INSERT … ON CONFLICT DO UPDATE (upsert)", isCorrect: true, explanation: "Correct — upsert is atomic and idempotent." },
            { id: "d", text: "DELETE then INSERT", isCorrect: false, explanation: "This still creates a race condition and is not atomic." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Look for the atomic operation that handles both insert and update in one step." }],
          feedback: { correct: "Correct — upsert is the idempotent write.", incorrect: "Upsert (INSERT … ON CONFLICT DO UPDATE) is the standard idempotent write pattern." },
        },
        {
          id: "s46-idem-predict",
          kind: "predict-output",
          prompt: "What does this code print after calling upsert_order with the same ID twice?",
          beginnerPurpose: "Verify that upsert prevents duplicate rows",
          expectedConceptIds: ["idempotency"],
          code:
`upsert_order("ORD-1", 99.99, "paid")
upsert_order("ORD-1", 99.99, "paid")
print(conn.execute("SELECT COUNT(*) FROM orders").fetchone())`,
          expectedOutput: "(1,)",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "The second upsert updates the existing row — no new row is created." }],
          feedback: { correct: "Correct — upsert results in exactly one row.", incorrect: "The second call updates the existing row, so COUNT is still 1." },
        },
      ],
      reviewHooks: [
        { conceptId: "idempotency", recallPrompt: "What does idempotent mean and why is it critical for data pipelines?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s46-idem-mc", "s46-idem-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.8 Incremental processing ──────────────────────────────────────────
    {
      id: "s46-incremental-processing",
      stageId: "stage-46",
      title: "Incremental Processing",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain incremental vs full-refresh pipeline strategies",
        "Use a high-water mark to track processed records",
        "Handle late-arriving data in incremental pipelines",
      ],
      prerequisites: ["s46-idempotency"],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Incremental Processing\n\n**Full refresh** — re-process all data on every run. Simple but slow and expensive for large datasets.\n\n**Incremental** — only process records that are new or changed since the last run. Tracked using a **high-water mark** (the timestamp or ID of the last processed record).\n\n**Challenge:** late-arriving data. Records with timestamps in the past may arrive after your high-water mark has moved forward.",
        },
        {
          kind: "code",
          language: "python",
          code:
`import json
from pathlib import Path
from datetime import datetime, timezone

WATERMARK_FILE = Path("watermark.json")

def load_watermark() -> datetime:
    if WATERMARK_FILE.exists():
        data = json.loads(WATERMARK_FILE.read_text())
        return datetime.fromisoformat(data["last_processed"])
    return datetime.min.replace(tzinfo=timezone.utc)

def save_watermark(ts: datetime) -> None:
    WATERMARK_FILE.write_text(json.dumps({"last_processed": ts.isoformat()}))

def process_incremental(all_records: list[dict]) -> int:
    watermark = load_watermark()
    new_records = [
        r for r in all_records
        if datetime.fromisoformat(r["updated_at"]) > watermark
    ]
    if not new_records:
        return 0

    # process new_records …
    max_ts = max(datetime.fromisoformat(r["updated_at"]) for r in new_records)
    save_watermark(max_ts)
    return len(new_records)`,
          caption: "High-water mark incremental processing with a JSON watermark file",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Late data and the watermark",
          body: "If a record arrives with `updated_at` older than your current watermark, it will be skipped. Handle late data by using a **lookback window** — always re-process the last N hours.",
        },
        {
          kind: "why-matters",
          body: "Incremental processing can turn a multi-hour full refresh into a seconds-long job. Essential for any pipeline running on large, frequently-updated data sources.",
        },
      ],
      interactions: [
        {
          id: "s46-incr-mc",
          kind: "multiple-choice",
          prompt: "Your high-water mark is `2024-01-10 08:00`. A record with `updated_at = 2024-01-09 23:00` arrives at `2024-01-10 09:00`. What happens without a lookback window?",
          beginnerPurpose: "Identify the late data problem with watermark-based incremental processing",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "The record is processed — it's still in the same day", isCorrect: false },
            { id: "b", text: "The record is skipped — its updated_at is before the watermark", isCorrect: true, explanation: "Correct — the watermark has already moved past this record's timestamp." },
            { id: "c", text: "The pipeline crashes with a date error", isCorrect: false },
            { id: "d", text: "The watermark rolls back to process the late record", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Compare the record's updated_at to the current watermark." }],
          feedback: { correct: "Correct — late data is silently skipped without a lookback window.", incorrect: "The record's timestamp is before the watermark, so it won't be included in the incremental query." },
        },
        {
          id: "s46-incr-fill",
          kind: "fill-code",
          prompt: "Complete the incremental filter to select only records newer than the watermark.",
          beginnerPurpose: "Implement a high-water mark filter",
          expectedConceptIds: ["etl-pipeline"],
          codeTemplate:
`from datetime import datetime

watermark = datetime(2024, 1, 10, 8, 0)
records = [
    {"id": 1, "updated_at": "2024-01-10T09:00:00"},
    {"id": 2, "updated_at": "2024-01-10T07:00:00"},
]

new_records = [
    r for r in records
    if datetime.fromisoformat(r["updated_at"]) ___BLANK_1___ watermark
]
print(len(new_records))  # should print 1`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: ">", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Records newer than the watermark have timestamps greater than it." }],
          feedback: { correct: "Correct — use `>` to select records after the watermark.", incorrect: "Use `>` to filter records with updated_at strictly after the watermark." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-incr-mc", "s46-incr-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.9 Retryable tasks ─────────────────────────────────────────────────
    {
      id: "s46-retryable-tasks",
      stageId: "stage-46",
      title: "Retryable Tasks",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish transient from permanent errors",
        "Implement exponential backoff with jitter",
        "Set maximum retry limits to avoid infinite loops",
      ],
      prerequisites: ["s46-incremental-processing"],
      concepts: ["idempotency"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Retryable Tasks\n\nNetwork calls, API requests, and database writes can fail transiently. The strategy:\n\n1. **Classify the error** — is it transient (network timeout, 503) or permanent (validation error, 404)?\n2. **Only retry transient errors** — retrying a 422 validation error is pointless\n3. **Exponential backoff** — wait 1s, 2s, 4s, 8s… to avoid overwhelming a struggling service\n4. **Jitter** — add random delay to prevent thundering herd (all retries at exactly the same moment)\n5. **Max retries** — stop after N attempts and route to a dead-letter queue",
        },
        {
          kind: "code",
          language: "python",
          code:
`import time
import random

class TransientError(Exception): pass
class PermanentError(Exception): pass

def call_api(url: str) -> dict:
    # Simulated — raises TransientError intermittently
    import random
    if random.random() < 0.7:
        raise TransientError("503 Service Unavailable")
    return {"status": "ok"}

def retry_with_backoff(fn, *args, max_retries=5, base_delay=1.0):
    for attempt in range(max_retries):
        try:
            return fn(*args)
        except PermanentError:
            raise  # never retry permanent errors
        except TransientError as e:
            if attempt == max_retries - 1:
                raise  # exhausted retries
            delay = base_delay * (2 ** attempt) + random.uniform(0, 0.5)
            print(f"Attempt {attempt + 1} failed: {e}. Retry in {delay:.1f}s")
            time.sleep(delay)`,
          caption: "Exponential backoff with jitter and permanent error pass-through",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never retry non-idempotent operations without care",
          body: "Retrying a payment `POST /charge` without idempotency keys can charge a customer twice. Ensure the operation is idempotent (or uses an idempotency key) before enabling retries.",
        },
        {
          kind: "why-matters",
          body: "Transient failures are normal in distributed systems. Intelligent retry logic is the difference between a self-healing pipeline and one that requires manual intervention for every network blip.",
        },
      ],
      interactions: [
        {
          id: "s46-retry-mc",
          kind: "multiple-choice",
          prompt: "An API returns 400 Bad Request (invalid input). Should you retry?",
          beginnerPurpose: "Distinguish transient from permanent errors",
          expectedConceptIds: ["idempotency"],
          options: [
            { id: "a", text: "Yes — retry up to 3 times", isCorrect: false },
            { id: "b", text: "Yes — but only after a 5 second wait", isCorrect: false },
            { id: "c", text: "No — 400 is a permanent error; the input is wrong and retrying won't help", isCorrect: true, explanation: "Correct — client errors (4xx) are permanent. Only retry transient errors (5xx, timeouts)." },
            { id: "d", text: "Yes — all errors should be retried", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Will the same bad input ever become valid on its own?" }],
          feedback: { correct: "Correct — never retry permanent errors.", incorrect: "400 means the input is invalid. No amount of retrying will fix bad input." },
        },
        {
          id: "s46-retry-fill",
          kind: "fill-code",
          prompt: "Complete the exponential backoff delay formula with jitter.",
          beginnerPurpose: "Implement exponential backoff with random jitter",
          expectedConceptIds: ["idempotency"],
          codeTemplate:
`import random

def backoff_delay(attempt: int, base: float = 1.0) -> float:
    return base * (___BLANK_1___ ** attempt) + random.uniform(0, 0.5)

print(backoff_delay(0))  # ~1.0–1.5s
print(backoff_delay(3))  # ~8.0–8.5s`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "2", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Exponential means the delay doubles on each attempt: 2^attempt." }],
          feedback: { correct: "Correct — 2**attempt gives exponential growth.", incorrect: "The exponent base is 2 for exponential backoff." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-retry-mc", "s46-retry-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.10 Checkpointing ──────────────────────────────────────────────────
    {
      id: "s46-checkpointing",
      stageId: "stage-46",
      title: "Checkpointing",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain the purpose of checkpointing in long-running pipelines",
        "Implement checkpoint save and restore in Python",
        "Choose an appropriate checkpoint granularity",
      ],
      prerequisites: ["s46-retryable-tasks"],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Checkpointing\n\nA **checkpoint** is a saved snapshot of pipeline progress. If the job fails, it restarts from the last checkpoint instead of the beginning.\n\nCheckpointing trades **storage overhead** for **reduced re-work** on failure. The right granularity depends on the cost of reprocessing vs the cost of checkpointing:\n\n- Too coarse (e.g., checkpoint every 1M rows) → lots of re-work on failure\n- Too fine (e.g., checkpoint every row) → excessive I/O overhead",
        },
        {
          kind: "code",
          language: "python",
          code:
`import json
from pathlib import Path

CHECKPOINT_FILE = Path("pipeline_checkpoint.json")

def save_checkpoint(last_processed_id: int, records_done: int) -> None:
    CHECKPOINT_FILE.write_text(json.dumps({
        "last_id": last_processed_id,
        "count": records_done,
    }))

def load_checkpoint() -> dict:
    if CHECKPOINT_FILE.exists():
        return json.loads(CHECKPOINT_FILE.read_text())
    return {"last_id": 0, "count": 0}

def run_pipeline(records: list[dict], checkpoint_every: int = 1000) -> None:
    state = load_checkpoint()
    start_id = state["last_id"]
    total = state["count"]

    for record in records:
        if record["id"] <= start_id:
            continue  # skip already-processed records

        # process(record) …
        total += 1

        if total % checkpoint_every == 0:
            save_checkpoint(record["id"], total)
            print(f"Checkpoint at record {record['id']}")

    save_checkpoint(records[-1]["id"] if records else start_id, total)
    CHECKPOINT_FILE.unlink(missing_ok=True)  # clean up on success`,
          caption: "Checkpoint-based pipeline with configurable granularity",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Delete checkpoint on successful completion",
          body: "Always delete the checkpoint file after successful completion so the next scheduled run starts fresh rather than resuming from an old state.",
        },
        {
          kind: "why-matters",
          body: "Without checkpointing, a multi-hour pipeline that fails after 5 hours must restart from the beginning. Checkpointing caps re-work proportional to the checkpoint interval.",
        },
      ],
      interactions: [
        {
          id: "s46-check-mc",
          kind: "multiple-choice",
          prompt: "A pipeline processes 1M records over 8 hours and checkpoints every 100K records. If it fails at record 650K, how many records must be reprocessed?",
          beginnerPurpose: "Calculate re-work with checkpoint granularity",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "650,000 — restart from the beginning", isCorrect: false },
            { id: "b", text: "50,000 — restart from the last checkpoint at 600K", isCorrect: true, explanation: "Correct — 650K - 600K = 50K records since the last checkpoint." },
            { id: "c", text: "100,000 — one full checkpoint interval", isCorrect: false },
            { id: "d", text: "0 — checkpointing is perfectly accurate", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The last checkpoint was at 600K. 650K - 600K = ?" }],
          feedback: { correct: "Correct — 50K records since the last checkpoint.", incorrect: "The last checkpoint is at floor(650K/100K) * 100K = 600K. Re-work = 650K - 600K." },
        },
        {
          id: "s46-check-fill",
          kind: "fill-code",
          prompt: "Complete the checkpoint save to write `last_id` and `count` to a JSON file.",
          beginnerPurpose: "Implement a checkpoint save function",
          expectedConceptIds: ["etl-pipeline"],
          codeTemplate:
`import json
from pathlib import Path

def save_checkpoint(last_id: int, count: int) -> None:
    Path("checkpoint.json").write_text(
        json.___BLANK_1___({"last_id": ___BLANK_2___, "count": count})
    )`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "dumps", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "last_id", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `json.dumps()` to serialise a dict to a JSON string." }],
          feedback: { correct: "Correct checkpoint save!", incorrect: "Use `json.dumps()` and pass `last_id` as the value." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-check-mc", "s46-check-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.11 File ingestion ─────────────────────────────────────────────────
    {
      id: "s46-file-ingestion",
      stageId: "stage-46",
      title: "File Ingestion",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Ingest CSV, JSON, and JSONL files with proper error handling",
        "Track which files have been processed to avoid re-ingestion",
        "Handle encoding issues and malformed rows gracefully",
      ],
      prerequisites: ["s46-checkpointing"],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## File Ingestion\n\nFile-based ingestion reads data from flat files (CSV, JSON, JSONL, Parquet) dropped into a landing zone (S3 bucket, SFTP, local directory).\n\nKey concerns:\n- **Atomicity** — only process complete files (use a `.done` marker or move files after ingestion)\n- **Deduplication** — track which files have been processed using a manifest\n- **Encoding** — always specify `encoding='utf-8'` (or detect with `chardet`)\n- **Malformed rows** — log and skip bad rows rather than crashing",
        },
        {
          kind: "code",
          language: "python",
          code:
`import csv
import json
from pathlib import Path

MANIFEST_FILE = Path("ingested_files.json")

def load_manifest() -> set[str]:
    if MANIFEST_FILE.exists():
        return set(json.loads(MANIFEST_FILE.read_text()))
    return set()

def save_manifest(manifest: set[str]) -> None:
    MANIFEST_FILE.write_text(json.dumps(sorted(manifest)))

def ingest_csv(path: Path) -> list[dict]:
    rows, errors = [], 0
    with open(path, encoding="utf-8") as f:
        for i, row in enumerate(csv.DictReader(f), 1):
            try:
                rows.append({"name": row["name"], "value": float(row["value"])})
            except (KeyError, ValueError) as e:
                print(f"Row {i} skipped: {e}")
                errors += 1
    print(f"Loaded {len(rows)} rows, skipped {errors}")
    return rows

def ingest_landing_zone(directory: Path) -> None:
    manifest = load_manifest()
    for csv_file in sorted(directory.glob("*.csv")):
        if csv_file.name in manifest:
            continue  # already processed
        rows = ingest_csv(csv_file)
        # load rows to warehouse …
        manifest.add(csv_file.name)
        save_manifest(manifest)`,
          caption: "File ingestion with manifest-based deduplication",
        },
        {
          kind: "why-matters",
          body: "File ingestion is the most common data pipeline pattern in enterprises. Files arrive from partners, legacy systems, and batch exports — ingesting them reliably requires manifest tracking and robust error handling.",
        },
      ],
      interactions: [
        {
          id: "s46-file-mc",
          kind: "multiple-choice",
          prompt: "How does the manifest prevent the same file from being ingested twice?",
          beginnerPurpose: "Understand manifest-based file deduplication",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "It deletes the file after processing", isCorrect: false },
            { id: "b", text: "It stores processed filenames and skips files already in the manifest", isCorrect: true, explanation: "Correct — checking the manifest before processing is the deduplication guard." },
            { id: "c", text: "It renames files with a .done extension", isCorrect: false, explanation: "That's another valid strategy, but not what the code does." },
            { id: "d", text: "It locks files using the OS", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Look at the `if csv_file.name in manifest: continue` line." }],
          feedback: { correct: "Correct — the manifest check is the deduplication guard.", incorrect: "The manifest stores processed filenames; the `in manifest` check skips them." },
        },
        {
          id: "s46-file-fill",
          kind: "fill-code",
          prompt: "Complete the manifest check to skip already-ingested files.",
          beginnerPurpose: "Implement manifest-based file deduplication",
          expectedConceptIds: ["etl-pipeline"],
          codeTemplate:
`manifest = load_manifest()
for f in directory.glob("*.csv"):
    if f.name ___BLANK_1___ manifest:
        ___BLANK_2___  # skip already processed
    process(f)
    manifest.add(f.name)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "in", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "continue", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `in` to check membership, and `continue` to skip to the next loop iteration." }],
          feedback: { correct: "Correct manifest check!", incorrect: "Use `in` for membership test and `continue` to skip." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-file-mc", "s46-file-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.12 API ingestion ──────────────────────────────────────────────────
    {
      id: "s46-api-ingestion",
      stageId: "stage-46",
      title: "API Ingestion",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Implement paginated API ingestion with cursor or offset pagination",
        "Handle rate limits with backoff during ingestion",
        "Cache API responses to avoid redundant calls",
      ],
      prerequisites: ["s46-file-ingestion"],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## API Ingestion\n\nAPI ingestion fetches data from HTTP REST or GraphQL endpoints. Key challenges:\n\n- **Pagination** — most APIs return data page by page; you must iterate until no more pages\n- **Rate limits** — APIs throttle requests; respect `Retry-After` headers\n- **Authentication** — rotate API tokens before they expire\n- **Schema drift** — the API may add or rename fields; validate each response",
        },
        {
          kind: "code",
          language: "python",
          code:
`import time
import urllib.request
import json

def fetch_page(base_url: str, cursor: str | None) -> dict:
    url = base_url if cursor is None else f"{base_url}?after={cursor}"
    # In real code use requests or httpx with auth headers
    with urllib.request.urlopen(url) as resp:
        return json.loads(resp.read())

def ingest_all(base_url: str) -> list[dict]:
    all_records: list[dict] = []
    cursor: str | None = None

    while True:
        try:
            page = fetch_page(base_url, cursor)
        except Exception as e:
            print(f"Fetch error: {e}, retrying in 5s")
            time.sleep(5)
            continue

        all_records.extend(page["data"])
        cursor = page.get("next_cursor")
        if cursor is None:
            break  # no more pages

        time.sleep(0.1)  # respect rate limits

    return all_records`,
          caption: "Cursor-paginated API ingestion with basic error handling",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Check for 429 and respect Retry-After",
          body: "When an API returns 429 Too Many Requests, read the `Retry-After` header value and sleep for that many seconds before retrying. Hammering the endpoint after a 429 may get your IP banned.",
        },
        {
          kind: "why-matters",
          body: "APIs are a primary data source for modern pipelines — CRM data, payment events, third-party enrichment. Robust API ingestion handles pagination, rate limits, and transient errors without human intervention.",
        },
      ],
      interactions: [
        {
          id: "s46-api-mc",
          kind: "multiple-choice",
          prompt: "How does the `ingest_all` function know when there are no more pages to fetch?",
          beginnerPurpose: "Trace cursor-based pagination termination",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "When the page returns an empty `data` list", isCorrect: false, explanation: "An empty data list could be a bug; the code checks next_cursor." },
            { id: "b", text: "When `next_cursor` is None (absent) in the response", isCorrect: true, explanation: "Correct — None cursor means there are no more pages." },
            { id: "c", text: "When the HTTP status code is 404", isCorrect: false },
            { id: "d", text: "After a fixed number of pages", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Look at the `if cursor is None: break` line in the code." }],
          feedback: { correct: "Correct — None cursor signals the last page.", incorrect: "The code checks `cursor = page.get('next_cursor')` and breaks when it's None." },
        },
        {
          id: "s46-api-fill",
          kind: "fill-code",
          prompt: "Complete the loop exit condition for cursor-based API pagination.",
          beginnerPurpose: "Implement pagination termination",
          expectedConceptIds: ["etl-pipeline"],
          codeTemplate:
`while True:
    page = fetch_page(url, cursor)
    records.extend(page["data"])
    cursor = page.get("next_cursor")
    if cursor ___BLANK_1___:
        ___BLANK_2___`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "is None", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "break", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Check if cursor is None and use `break` to exit the loop." }],
          feedback: { correct: "Correct pagination termination!", incorrect: "Use `is None` to check for missing cursor and `break` to exit." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-api-mc", "s46-api-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.13 Database ingestion ─────────────────────────────────────────────
    {
      id: "s46-database-ingestion",
      stageId: "stage-46",
      title: "Database Ingestion",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Extract data from a source database using Python",
        "Use change data capture (CDC) concepts for incremental DB ingestion",
        "Avoid locking source tables during extraction",
      ],
      prerequisites: ["s46-api-ingestion"],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Database Ingestion\n\nExtracting data from an OLTP database (Postgres, MySQL) for analytics requires care:\n\n- **Full table scan** — simple but slow, locks the table, misses deletes\n- **Incremental by updated_at** — fast, but rows without `updated_at` are missed\n- **Change Data Capture (CDC)** — reads the database's write-ahead log to capture every insert, update, and delete without touching tables (Debezium, AWS DMS)\n\nFor reporting pipelines, prefer CDC or watermark-based incremental extraction.",
        },
        {
          kind: "code",
          language: "python",
          code:
`import sqlite3
from datetime import datetime, timezone

def extract_new_orders(
    conn: sqlite3.Connection,
    since: datetime,
    batch_size: int = 1000,
) -> list[dict]:
    """Watermark-based incremental extraction from SQLite."""
    cursor = conn.execute(
        """
        SELECT id, customer_id, amount, created_at
        FROM orders
        WHERE created_at > ?
        ORDER BY created_at
        LIMIT ?
        """,
        (since.isoformat(), batch_size),
    )
    return [
        {"id": r[0], "customer_id": r[1], "amount": r[2], "created_at": r[3]}
        for r in cursor.fetchall()
    ]

# Usage
conn = sqlite3.connect("orders.db")
since = datetime(2024, 1, 1, tzinfo=timezone.utc)
batch = extract_new_orders(conn, since)
print(f"Extracted {len(batch)} new orders")`,
          caption: "Watermark-based incremental database extraction",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Use read replicas for analytics extraction",
          body: "Running heavy extraction queries on your production primary database can degrade response times for users. Always extract from a read replica when possible.",
        },
        {
          kind: "why-matters",
          body: "Most enterprise data ultimately lives in relational databases. Efficient extraction — without impacting production — is a foundational data engineering skill.",
        },
      ],
      interactions: [
        {
          id: "s46-db-mc",
          kind: "multiple-choice",
          prompt: "Why is Change Data Capture (CDC) better than `SELECT * FROM orders` for incremental ingestion?",
          beginnerPurpose: "Understand CDC advantages over full scan",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "CDC is simpler to implement", isCorrect: false },
            { id: "b", text: "CDC captures deletes and avoids table scans; full SELECT misses deletes and can lock the table", isCorrect: true, explanation: "Correct — CDC reads the WAL, capturing all changes including deletes without scanning." },
            { id: "c", text: "CDC only works with NoSQL databases", isCorrect: false },
            { id: "d", text: "SELECT queries can't filter by date", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What happens to a deleted row when you do SELECT * WHERE updated_at > ?" }],
          feedback: { correct: "Correct — CDC captures deletes; watermark-based SELECT does not.", incorrect: "Deletes don't update `updated_at`, so watermark queries miss them. CDC captures the delete event." },
        },
        {
          id: "s46-db-fill",
          kind: "fill-code",
          prompt: "Complete the incremental SQL query to extract orders newer than `since`.",
          beginnerPurpose: "Write a watermark-based database extraction query",
          expectedConceptIds: ["etl-pipeline"],
          codeTemplate:
`cursor = conn.execute(
    "SELECT id, amount FROM orders WHERE created_at ___BLANK_1___ ? ORDER BY created_at LIMIT 1000",
    (___BLANK_2___,),
)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: ">", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "since.isoformat()", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `>` for records after the watermark; SQLite needs datetime as ISO string." }],
          feedback: { correct: "Correct incremental query!", incorrect: "Use `>` for strictly after the watermark and `since.isoformat()` as the parameter." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-db-mc", "s46-db-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.14 Data cleaning ──────────────────────────────────────────────────
    {
      id: "s46-data-cleaning",
      stageId: "stage-46",
      title: "Data Cleaning",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Identify common data quality issues (nulls, type mismatches, outliers)",
        "Apply cleaning transformations in Python",
        "Distinguish cleaning from normalisation",
      ],
      prerequisites: ["s46-database-ingestion"],
      concepts: ["data-quality"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Data Cleaning\n\nRaw data is messy. Common issues and remedies:\n\n| Issue | Example | Fix |\n|-------|---------|-----|\n| Missing values | `None`, empty string | Fill with default or drop |\n| Wrong type | `'1,000'` as string | Strip commas, cast to int |\n| Whitespace | `' alice '` | `.strip()` |\n| Inconsistent casing | `'USD'` vs `'usd'` | `.upper()` or `.lower()` |\n| Outliers | age = 999 | Clamp or flag |\n| Duplicates | Same record twice | Deduplicate by ID |",
        },
        {
          kind: "code",
          language: "python",
          code:
`from dataclasses import dataclass

@dataclass
class RawRecord:
    name: str | None
    amount_str: str
    currency: str

@dataclass
class CleanRecord:
    name: str
    amount: float
    currency: str

def clean(raw: RawRecord) -> CleanRecord | None:
    name = (raw.name or "").strip()
    if not name:
        return None  # drop records with no name

    try:
        amount = float(raw.amount_str.replace(",", ""))
    except ValueError:
        return None  # unparseable amount

    if amount < 0:
        return None  # negative amounts are invalid

    return CleanRecord(
        name=name,
        amount=amount,
        currency=raw.currency.upper().strip(),
    )

records = [
    RawRecord("  Alice ", "1,250.00", "usd"),
    RawRecord(None, "50", "GBP"),      # dropped: no name
    RawRecord("Bob", "abc", "EUR"),    # dropped: bad amount
]
clean_records = [c for r in records if (c := clean(r))]
print(clean_records)`,
          caption: "Data cleaning: strip whitespace, parse amounts, drop invalid rows",
        },
        {
          kind: "why-matters",
          body: "Garbage in, garbage out. A report built on uncleaned data produces wrong conclusions. Systematic cleaning with clear drop/fill policies is the foundation of reliable analytics.",
        },
      ],
      interactions: [
        {
          id: "s46-clean-mc",
          kind: "multiple-choice",
          prompt: "What should you do with a record that has a `None` name field, given that name is required for your report?",
          beginnerPurpose: "Apply cleaning policy for missing required fields",
          expectedConceptIds: ["data-quality"],
          options: [
            { id: "a", text: "Fill it with the string 'Unknown'", isCorrect: false, explanation: "Only fill with 'Unknown' if that's meaningful for your use case; often it's better to drop." },
            { id: "b", text: "Drop the record and log it as a data quality issue", isCorrect: true, explanation: "Correct — log the drop so you can investigate the source of missing names." },
            { id: "c", text: "Set name to an empty string and continue", isCorrect: false, explanation: "Empty string is not better than None for reporting." },
            { id: "d", text: "Crash the pipeline with an error", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What decision does the `clean()` function make for `name = None`?" }],
          feedback: { correct: "Correct — drop and log.", incorrect: "The clean function returns None to signal a drop; the caller should log the reason." },
        },
        {
          id: "s46-clean-fill",
          kind: "fill-code",
          prompt: "Complete the amount cleaning to strip commas and convert to float.",
          beginnerPurpose: "Implement amount string parsing",
          expectedConceptIds: ["data-quality"],
          codeTemplate:
`def parse_amount(s: str) -> float | None:
    try:
        return float(s.___BLANK_1___(",", ""))
    except ___BLANK_2___:
        return None`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "replace", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "ValueError", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use str.replace() to strip commas; float() raises ValueError on non-numeric strings." }],
          feedback: { correct: "Correct amount parsing!", incorrect: "Use `.replace(',', '')` and catch `ValueError`." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-clean-mc", "s46-clean-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.15 Data normalisation ─────────────────────────────────────────────
    {
      id: "s46-data-normalisation",
      stageId: "stage-46",
      title: "Data Normalisation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Normalise inconsistent values to a canonical form",
        "Map currency codes and country names to standard formats",
        "Use lookup tables for normalisation",
      ],
      prerequisites: ["s46-data-cleaning"],
      concepts: ["data-quality"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Data Normalisation\n\nNormalisation converts raw values to a **canonical form** so they can be compared and aggregated correctly. Examples:\n\n- `'US'`, `'USA'`, `'United States'` → `'US'` (ISO 3166-1 alpha-2)\n- `'gbp'`, `'GBP'`, `'£'` → `'GBP'` (ISO 4217)\n- `'Y'`, `'yes'`, `'TRUE'`, `'1'` → `True` (boolean)\n\nNormalisation is distinct from cleaning — cleaning removes invalid data; normalisation standardises valid but inconsistent representations.",
        },
        {
          kind: "code",
          language: "python",
          code:
`COUNTRY_MAP: dict[str, str] = {
    "us": "US", "usa": "US", "united states": "US",
    "gb": "GB", "uk": "GB", "united kingdom": "GB",
    "de": "DE", "germany": "DE", "deutschland": "DE",
}

CURRENCY_MAP: dict[str, str] = {
    "usd": "USD", "$": "USD", "dollar": "USD",
    "gbp": "GBP", "£": "GBP", "pound": "GBP",
    "eur": "EUR", "€": "EUR", "euro": "EUR",
}

def normalise_country(raw: str) -> str | None:
    return COUNTRY_MAP.get(raw.strip().lower())

def normalise_currency(raw: str) -> str | None:
    return CURRENCY_MAP.get(raw.strip().lower())

# Test
print(normalise_country("United States"))  # US
print(normalise_currency("£"))            # GBP
print(normalise_country("XYZ"))           # None — unknown`,
          caption: "Lookup-table normalisation for countries and currencies",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Always normalise before aggregating",
          body: "If you aggregate before normalising, `'US'` and `'USA'` appear as different countries in your report. Always normalise first.",
        },
        {
          kind: "why-matters",
          body: "Inconsistent representations are one of the most common causes of wrong numbers in analytics. A revenue dashboard that counts 'USD' and 'usd' as different currencies will be wildly off.",
        },
      ],
      interactions: [
        {
          id: "s46-norm-predict",
          kind: "predict-output",
          prompt: "What does `normalise_country('United Kingdom')` return?",
          beginnerPurpose: "Trace a lookup-table normalisation",
          expectedConceptIds: ["data-quality"],
          code:
`# Using the COUNTRY_MAP from this lesson
print(normalise_country("United Kingdom"))`,
          expectedOutput: "GB",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Look up 'united kingdom' (lowercased) in COUNTRY_MAP." }],
          feedback: { correct: "Correct — 'United Kingdom' normalises to 'GB'.", incorrect: "The key is the lowercased input; 'united kingdom' maps to 'GB'." },
        },
        {
          id: "s46-norm-mc",
          kind: "multiple-choice",
          prompt: "What is the difference between data cleaning and data normalisation?",
          beginnerPurpose: "Distinguish the two data quality steps",
          expectedConceptIds: ["data-quality"],
          options: [
            { id: "a", text: "Cleaning removes duplicates; normalisation removes nulls", isCorrect: false },
            { id: "b", text: "Cleaning removes invalid/corrupt data; normalisation converts valid-but-inconsistent representations to a canonical form", isCorrect: true, explanation: "Correct — both operate on different types of data quality issues." },
            { id: "c", text: "They are the same thing", isCorrect: false },
            { id: "d", text: "Normalisation only applies to database schema design", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think: is 'USA' invalid or just inconsistent?" }],
          feedback: { correct: "Correct distinction!", incorrect: "'USA' is valid but inconsistent with 'US'; normalisation handles this without discarding data." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-norm-predict", "s46-norm-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.16 Data deduplication ─────────────────────────────────────────────
    {
      id: "s46-data-deduplication",
      stageId: "stage-46",
      title: "Data Deduplication",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Detect exact duplicates using hash-based deduplication",
        "Handle near-duplicate records with fuzzy matching concepts",
        "Apply deduplication in a pipeline context",
      ],
      prerequisites: ["s46-data-normalisation"],
      concepts: ["data-quality"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Data Deduplication\n\nDuplicates enter pipelines from retries, multiple data sources, or bugs in producers. Two strategies:\n\n**Exact deduplication** — records are identical; use a hash or unique key to identify and drop duplicates.\n\n**Near-duplicate deduplication** — records represent the same entity but differ slightly (typos, missing fields). Requires fuzzy matching (Levenshtein distance, phonetic matching).\n\nFor pipelines, exact deduplication by business key (e.g., `order_id`) is usually sufficient.",
        },
        {
          kind: "code",
          language: "python",
          code:
`import hashlib
import json

def record_hash(record: dict, key_fields: list[str]) -> str:
    """Hash selected fields to create a stable dedup key."""
    key = {k: record[k] for k in key_fields if k in record}
    return hashlib.md5(json.dumps(key, sort_keys=True).encode()).hexdigest()

def deduplicate(records: list[dict], key_fields: list[str]) -> list[dict]:
    seen: set[str] = set()
    unique: list[dict] = []
    for r in records:
        h = record_hash(r, key_fields)
        if h not in seen:
            seen.add(h)
            unique.append(r)
    return unique

records = [
    {"order_id": "1", "amount": 100},
    {"order_id": "2", "amount": 200},
    {"order_id": "1", "amount": 100},  # duplicate
]
result = deduplicate(records, key_fields=["order_id"])
print(len(result))  # 2`,
          caption: "Hash-based exact deduplication",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Dedup on business key, not hash",
          body: "For records with a natural business key (order_id, user_id), deduplicate on that key directly rather than hashing all fields. This correctly handles updates (same ID, different amount).",
        },
        {
          kind: "why-matters",
          body: "Duplicates inflate metrics — revenue, user counts, conversion rates. A pipeline that ingests the same order event twice reports double the revenue.",
        },
      ],
      interactions: [
        {
          id: "s46-dedup-predict",
          kind: "predict-output",
          prompt: "How many records are in `result` after deduplicating the sample data?",
          beginnerPurpose: "Trace deduplication on sample data with one duplicate",
          expectedConceptIds: ["data-quality"],
          code:
`records = [
    {"order_id": "1", "amount": 100},
    {"order_id": "2", "amount": 200},
    {"order_id": "1", "amount": 100},  # duplicate
]
result = deduplicate(records, key_fields=["order_id"])
print(len(result))`,
          expectedOutput: "2",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Order ID '1' appears twice; only the first occurrence is kept." }],
          feedback: { correct: "Correct — 2 unique records.", incorrect: "The third record has the same order_id as the first, so it's dropped." },
        },
        {
          id: "s46-dedup-mc",
          kind: "multiple-choice",
          prompt: "Same order_id, but the amount changed from 100 to 110 (an update). Hash-based deduplication on `order_id` would…",
          beginnerPurpose: "Understand dedup behaviour with updates",
          expectedConceptIds: ["data-quality"],
          options: [
            { id: "a", text: "Keep both records — different hashes", isCorrect: false, explanation: "We're hashing only the order_id field, so both have the same hash." },
            { id: "b", text: "Keep only the first record — same order_id hash, second is dropped", isCorrect: true, explanation: "Correct — deduplication on order_id treats any record with that ID as a duplicate." },
            { id: "c", text: "Crash with an error", isCorrect: false },
            { id: "d", text: "Keep the record with the higher amount", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "We're hashing only `order_id`, so the amount doesn't affect the hash." }],
          feedback: { correct: "Correct — dedup on business key means updates are treated as duplicates.", incorrect: "The hash is only of order_id, so both records produce the same hash." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-dedup-predict", "s46-dedup-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.17 Data quality checks ────────────────────────────────────────────
    {
      id: "s46-data-quality-checks",
      stageId: "stage-46",
      title: "Data Quality Checks",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Implement statistical and rule-based data quality checks",
        "Alert on quality check failures",
        "Integrate quality checks into a pipeline as a gate",
      ],
      prerequisites: ["s46-data-deduplication"],
      concepts: ["data-quality"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Data Quality Checks\n\nBeyond schema validation, data quality checks catch semantic issues:\n\n- **Completeness** — are all expected records present? (`row_count > 0`)\n- **Freshness** — is the data recent enough? (`max(updated_at) > now - 1h`)\n- **Referential integrity** — do foreign keys exist in the referenced table?\n- **Statistical drift** — is the average order value within ±30% of yesterday?\n- **Uniqueness** — does the primary key have duplicates?\n\nFailing checks should block the pipeline or alert an on-call engineer.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from dataclasses import dataclass

@dataclass
class QualityCheck:
    name: str
    passed: bool
    detail: str

def check_completeness(records: list[dict]) -> QualityCheck:
    passed = len(records) > 0
    return QualityCheck("completeness", passed, f"{len(records)} rows")

def check_no_nulls(records: list[dict], field: str) -> QualityCheck:
    nulls = sum(1 for r in records if r.get(field) is None)
    passed = nulls == 0
    return QualityCheck(f"no_nulls:{field}", passed, f"{nulls} nulls in {field}")

def check_amount_range(records: list[dict]) -> QualityCheck:
    amounts = [r["amount"] for r in records if r.get("amount") is not None]
    avg = sum(amounts) / len(amounts) if amounts else 0
    passed = 0 < avg < 10_000
    return QualityCheck("amount_range", passed, f"avg={avg:.2f}")

def run_checks(records: list[dict]) -> bool:
    checks = [
        check_completeness(records),
        check_no_nulls(records, "order_id"),
        check_amount_range(records),
    ]
    all_passed = True
    for c in checks:
        status = "PASS" if c.passed else "FAIL"
        print(f"[{status}] {c.name}: {c.detail}")
        if not c.passed:
            all_passed = False
    return all_passed`,
          caption: "Composable data quality checks returning pass/fail results",
        },
        {
          kind: "why-matters",
          body: "Quality checks are your last line of defence before bad data enters reports or ML models. They turn silent data corruption into visible, actionable alerts.",
        },
      ],
      interactions: [
        {
          id: "s46-quality-mc",
          kind: "multiple-choice",
          prompt: "Which type of quality check detects that today's batch has 50% fewer rows than yesterday?",
          beginnerPurpose: "Match quality check type to the problem it detects",
          expectedConceptIds: ["data-quality"],
          options: [
            { id: "a", text: "Schema validation", isCorrect: false },
            { id: "b", text: "Completeness check", isCorrect: true, explanation: "Correct — comparing row counts against expectations is a completeness check." },
            { id: "c", text: "Uniqueness check", isCorrect: false },
            { id: "d", text: "Freshness check", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The issue is missing rows — which quality dimension does that fall under?" }],
          feedback: { correct: "Correct — completeness checks detect missing data.", incorrect: "Missing rows = completeness issue." },
        },
        {
          id: "s46-quality-fill",
          kind: "fill-code",
          prompt: "Complete the freshness check to ensure the max `created_at` is within the last hour.",
          beginnerPurpose: "Implement a data freshness quality check",
          expectedConceptIds: ["data-quality"],
          codeTemplate:
`from datetime import datetime, timedelta, timezone

def check_freshness(records: list[dict]) -> bool:
    if not records:
        return False
    cutoff = datetime.now(timezone.utc) - ___BLANK_1___(hours=1)
    max_ts = max(datetime.fromisoformat(r["created_at"]) for r in records)
    return max_ts ___BLANK_2___ cutoff`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "timedelta", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: ">=", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `timedelta(hours=1)` for the window, and `>=` to check if max_ts is after the cutoff." }],
          feedback: { correct: "Correct freshness check!", incorrect: "Use `timedelta(hours=1)` and `>=` to verify data is recent." },
        },
      ],
      reviewHooks: [
        { conceptId: "data-quality", recallPrompt: "Name four types of data quality checks and what each detects.", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s46-quality-mc", "s46-quality-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.18 Report generation ──────────────────────────────────────────────
    {
      id: "s46-report-generation",
      stageId: "stage-46",
      title: "Report Generation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Aggregate pipeline output into summary statistics",
        "Generate CSV and JSON reports from pipeline results",
        "Schedule and deliver reports automatically",
      ],
      prerequisites: ["s46-data-quality-checks"],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Report Generation\n\nThe final stage of many pipelines is producing a report — a summary of the processed data for business stakeholders. Common formats:\n\n- **CSV** — spreadsheet-friendly, universally supported\n- **JSON** — machine-readable, for dashboards and APIs\n- **HTML/PDF** — human-readable, for email delivery\n\nReports should include metadata: generation timestamp, record count, and data freshness.",
        },
        {
          kind: "code",
          language: "python",
          code:
`import csv
import json
from datetime import datetime, timezone
from io import StringIO

def generate_report(records: list[dict]) -> dict:
    """Aggregate records and produce a JSON summary report."""
    if not records:
        return {"error": "no data"}

    total_revenue = sum(r["amount"] for r in records)
    by_currency: dict[str, float] = {}
    for r in records:
        by_currency[r["currency"]] = by_currency.get(r["currency"], 0) + r["amount"]

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "record_count": len(records),
        "total_revenue": round(total_revenue, 2),
        "by_currency": by_currency,
    }

def export_csv(records: list[dict], fields: list[str]) -> str:
    """Export records to a CSV string."""
    buf = StringIO()
    writer = csv.DictWriter(buf, fieldnames=fields, extrasaction="ignore")
    writer.writeheader()
    writer.writerows(records)
    return buf.getvalue()`,
          caption: "Report generation: JSON summary and CSV export",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always include generated_at in reports",
          body: "A report without a generation timestamp is confusing — recipients can't tell if it's from today or last week. Always include `generated_at` in ISO 8601 format.",
        },
        {
          kind: "why-matters",
          body: "Reports are the visible output of data pipelines. Well-structured reports with clear metadata build trust with stakeholders and make debugging straightforward.",
        },
      ],
      interactions: [
        {
          id: "s46-report-mc",
          kind: "multiple-choice",
          prompt: "Which report field helps recipients know if the data is stale?",
          beginnerPurpose: "Identify the purpose of report metadata",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "record_count", isCorrect: false },
            { id: "b", text: "generated_at", isCorrect: true, explanation: "Correct — the generation timestamp tells recipients how fresh the data is." },
            { id: "c", text: "total_revenue", isCorrect: false },
            { id: "d", text: "by_currency", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which field tells you when the report was created?" }],
          feedback: { correct: "Correct — generated_at is the freshness indicator.", incorrect: "The generation timestamp (generated_at) tells you when the data was gathered." },
        },
        {
          id: "s46-report-fill",
          kind: "fill-code",
          prompt: "Complete the report to include the current UTC timestamp as an ISO string.",
          beginnerPurpose: "Add generated_at metadata to a report",
          expectedConceptIds: ["etl-pipeline"],
          codeTemplate:
`from datetime import datetime, timezone

def build_report(records):
    return {
        "generated_at": datetime.now(___BLANK_1___).___BLANK_2___(),
        "count": len(records),
    }`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "timezone.utc", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "isoformat", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `timezone.utc` for UTC and `.isoformat()` to format as ISO 8601 string." }],
          feedback: { correct: "Correct report timestamp!", incorrect: "Use `timezone.utc` and call `.isoformat()` on the datetime." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-report-mc", "s46-report-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.19 Automation scheduler concepts ──────────────────────────────────
    {
      id: "s46-automation-scheduler-concepts",
      stageId: "stage-46",
      title: "Automation Scheduler Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain cron syntax and schedule expressions",
        "Understand the limitations of cron and when to use workflow orchestrators",
        "Use Python schedule library for simple automation",
      ],
      prerequisites: ["s46-report-generation"],
      concepts: ["etl-pipeline"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Automation Scheduler Concepts\n\nSchedulers trigger pipelines on a time-based or event-based schedule.\n\n**Cron** is the Unix scheduling daemon. Cron expressions: `MIN HOUR DAY MONTH WEEKDAY`\n\n```\n0 2 * * *        # every day at 02:00\n*/15 * * * *     # every 15 minutes\n0 9 * * 1-5      # weekdays at 09:00\n```\n\n**Limitations of cron:** no dependency management, no retry, no history, no alerting.\n\n**Workflow orchestrators** (Airflow, Prefect, Dagster) add dependency DAGs, retries, observability, and parameterisation on top of scheduling.",
        },
        {
          kind: "code",
          language: "python",
          code:
`import schedule
import time

def nightly_etl():
    print("Running nightly ETL…")
    # extract() → transform() → load()

def hourly_quality_check():
    print("Running quality checks…")

# Register jobs
schedule.every().day.at("02:00").do(nightly_etl)
schedule.every().hour.do(hourly_quality_check)

# Simple event loop (for demos; use systemd/cron in production)
print("Scheduler started. Waiting for jobs…")
while True:
    schedule.run_pending()
    time.sleep(30)`,
          caption: "Python schedule library for simple automation",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Use an orchestrator for production pipelines",
          body: "Python schedule is great for simple scripts, but for production pipelines with dependencies, retries, and monitoring, use Apache Airflow, Prefect, or Dagster.",
        },
        {
          kind: "why-matters",
          body: "Reliable scheduling is what turns a one-off script into an automated pipeline. Understanding the trade-offs between cron and full orchestrators helps you pick the right tool.",
        },
      ],
      interactions: [
        {
          id: "s46-sched-mc",
          kind: "multiple-choice",
          prompt: "What does the cron expression `0 9 * * 1-5` mean?",
          beginnerPurpose: "Read and interpret a cron expression",
          expectedConceptIds: ["etl-pipeline"],
          options: [
            { id: "a", text: "Every 9 hours on weekdays", isCorrect: false },
            { id: "b", text: "At 09:00 on Monday through Friday", isCorrect: true, explanation: "Correct — minute=0, hour=9, day=any, month=any, weekday=1-5 (Mon-Fri)." },
            { id: "c", text: "Every minute for 9 hours on Fridays", isCorrect: false },
            { id: "d", text: "At 09:00 on the 1st through 5th of each month", isCorrect: false, explanation: "1-5 in the weekday field means Mon-Fri, not day-of-month." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Cron fields: MIN HOUR DAY MONTH WEEKDAY. Weekday 1=Monday, 5=Friday." }],
          feedback: { correct: "Correct — 09:00 weekdays.", incorrect: "The 5th field is weekday (1=Mon, 5=Fri). `1-5` means Monday through Friday." },
        },
        {
          id: "s46-sched-fill",
          kind: "fill-code",
          prompt: "Schedule `daily_report()` to run every day at 06:00 using the Python schedule library.",
          beginnerPurpose: "Use the schedule library to register a daily job",
          expectedConceptIds: ["etl-pipeline"],
          codeTemplate:
`import schedule

def daily_report(): ...

schedule.every().___BLANK_1___.at("06:00").do(___BLANK_2___)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "day", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "daily_report", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `.day.at('06:00')` for daily scheduling and pass the function to `.do()`." }],
          feedback: { correct: "Correct schedule registration!", incorrect: "Use `schedule.every().day.at('06:00').do(daily_report)`." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s46-sched-mc", "s46-sched-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 46.20 Data pipeline project ──────────────────────────────────────────
    {
      id: "s46-data-pipeline-project",
      stageId: "stage-46",
      title: "Data Pipeline Project",
      kind: "project",
      difficulty: "advanced",
      objectives: [
        "Build a complete ETL pipeline with ingestion, cleaning, validation, and reporting",
        "Apply idempotency, checkpointing, and quality checks in an integrated pipeline",
      ],
      prerequisites: ["s46-automation-scheduler-concepts"],
      concepts: ["etl-pipeline", "data-quality", "idempotency"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Data Pipeline Project\n\nYou will build an **Orders ETL Pipeline** that:\n\n1. Ingests CSV order files from a landing directory (skipping already-processed files)\n2. Validates each row against an `Order` Pydantic schema\n3. Cleans and normalises data (trim whitespace, normalise currency codes)\n4. Upserts records into a SQLite database (idempotent writes)\n5. Runs data quality checks (completeness, no nulls, amount range)\n6. Generates a JSON summary report\n7. Can be scheduled to run hourly\n\nThis project integrates all Stage 46 concepts.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Suggested file structure",
          body: "Organise as: `pipeline.py` (orchestrator), `ingest.py` (file reading + manifest), `validate.py` (Pydantic model + schema checks), `clean.py` (cleaning + normalisation), `load.py` (SQLite upsert), `quality.py` (quality checks), `report.py` (JSON report).",
        },
        {
          kind: "why-matters",
          body: "Building a pipeline end-to-end reveals how each stage depends on the others — and why each concept (idempotency, checkpointing, quality) is necessary for a production-ready system.",
        },
      ],
      interactions: [
        {
          id: "s46-proj-mc",
          kind: "multiple-choice",
          prompt: "If your ETL pipeline fails during the load step after processing 500 of 1000 records, what prevents those 500 records from being loaded twice on retry?",
          beginnerPurpose: "Integrate idempotency and checkpointing concepts",
          expectedConceptIds: ["idempotency", "etl-pipeline"],
          options: [
            { id: "a", text: "The manifest file — it marks the input file as done", isCorrect: false, explanation: "The manifest only tracks files, not records within a file." },
            { id: "b", text: "Idempotent upsert writes — re-inserting existing records is a no-op", isCorrect: true, explanation: "Correct — upserts handle the overlap between the first and second run." },
            { id: "c", text: "The pipeline automatically knows to start at record 501", isCorrect: false, explanation: "Without explicit checkpointing, it restarts from the beginning." },
            { id: "d", text: "The quality checks block duplicate records", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which concept makes re-processing the same record harmless?" }],
          feedback: { correct: "Correct — idempotent upserts make retry safe.", incorrect: "Idempotent writes (upsert) ensure re-processing the same record has no effect." },
        },
        {
          id: "s46-proj-run",
          kind: "run-code",
          prompt: "Write a Python function `deduplicate_and_clean(records)` that: removes duplicates by `order_id`, strips whitespace from `name`, and returns only records where `amount > 0`.",
          beginnerPurpose: "Integrate deduplication, cleaning, and filtering in one function",
          expectedConceptIds: ["data-quality", "etl-pipeline"],
          starterCode:
`def deduplicate_and_clean(records: list[dict]) -> list[dict]:
    # Your implementation here
    pass

# Test
test_data = [
    {"order_id": "1", "name": "  Alice  ", "amount": 50.0},
    {"order_id": "2", "name": "Bob", "amount": -10.0},  # negative: drop
    {"order_id": "1", "name": "  Alice  ", "amount": 50.0},  # duplicate: drop
    {"order_id": "3", "name": " Carol ", "amount": 30.0},
]
result = deduplicate_and_clean(test_data)
print(len(result))   # should print 2
print(result[0]["name"])  # should print "Alice"
`,
          task: "Implement deduplicate_and_clean: deduplicate on order_id, strip name whitespace, filter amount > 0",
          expectedOutputContains: ["2", "Alice"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "Use a dict keyed by order_id to deduplicate. Strip name with .strip(). Filter with amount > 0." },
            { level: "syntax", text: "seen = {}; for r in records: if r['order_id'] not in seen and r['amount'] > 0: r['name'] = r['name'].strip(); seen[r['order_id']] = r" },
          ],
          feedback: { correct: "Correct pipeline function!", incorrect: "Ensure you deduplicate by order_id, strip whitespace, and filter out non-positive amounts." },
        },
      ],
      reviewHooks: [
        { conceptId: "etl-pipeline", recallPrompt: "What are the seven stages of the Orders ETL Pipeline project?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s46-proj-mc", "s46-proj-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s46-project",
    stageId: "stage-46",
    title: "Orders ETL Pipeline",
    brief:
      "Build a production-quality Orders ETL pipeline that ingests CSV files from a landing zone, validates and cleans each row using Pydantic, upserts records into SQLite with idempotent writes, runs data quality checks, and generates a JSON summary report. The pipeline should use a manifest file to track ingested files and a checkpoint file for fault tolerance.",
    requirements: [
      "Ingest CSV files from a configurable landing directory using manifest-based deduplication",
      "Validate each row against an Order Pydantic model with appropriate field constraints",
      "Clean data: strip whitespace, normalise currency codes, drop invalid rows",
      "Upsert records into SQLite using INSERT … ON CONFLICT DO UPDATE",
      "Run at least three data quality checks: completeness, no nulls on order_id, amount range",
      "Generate a JSON report with generated_at, record_count, total_revenue, and by_currency breakdown",
      "Include checkpoint support to resume from partial runs",
    ],
    acceptanceCriteria: [
      "Running the pipeline twice on the same files produces identical database state (idempotency)",
      "Rows failing schema validation are logged and counted but do not crash the pipeline",
      "The manifest prevents re-ingestion of already-processed files",
      "Quality checks fail loudly with descriptive messages when thresholds are not met",
      "The JSON report includes generated_at as an ISO 8601 timestamp",
      "All code is type-annotated and has at least one test per pipeline stage",
    ],
    conceptIds: ["etl-pipeline", "data-quality", "idempotency"],
    difficulty: "advanced",
  },
} satisfies Stage;
