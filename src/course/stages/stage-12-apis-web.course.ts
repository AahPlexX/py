import type { Stage } from "@/course/course.schema";

export const stage12 = {
  id: "stage-12",
  number: 12,
  title: "Web, APIs, and Data Exchange",
  summary:
    "Consume HTTP APIs, work with JSON contracts, validate API responses, handle errors, and understand basic web service patterns.",
  level: "intermediate",
  masteryGateConceptIds: [
    "http-request",
    "json-contract",
    "api-response",
    "status-code",
    "retry-strategy",
    "data-validation",
  ],
  lessons: [
    /* ── Lesson 1: HTTP Concepts ─────────────────────────────────────────── */
    {
      id: "s12-http-concepts",
      stageId: "stage-12",
      title: "HTTP Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand the request-response cycle",
        "Identify common HTTP methods: GET, POST, PUT, DELETE",
        "Interpret HTTP status codes (2xx, 4xx, 5xx)",
        "Understand headers, query parameters, and request bodies",
      ],
      prerequisites: [],
      concepts: ["http-request", "status-code", "http-method"],
      contentBlocks: [
        {
          kind: "mental-model",
          title: "HTTP is a menu order at a restaurant",
          analogy:
            "You (the client) hand a request to the waiter (HTTP). The waiter takes it to the kitchen (server). The kitchen prepares your order and sends back a response — either the food you asked for (200 OK) or a note saying it's not on the menu (404 Not Found) or the kitchen is on fire (500 Internal Server Error).",
          explanation:
            "Every HTTP interaction follows this pattern: client sends a request with a method and URL; server returns a response with a status code and optional body. REST APIs use this pattern for all data exchange.",
        },
        {
          kind: "text",
          markdown: `## HTTP Methods and Status Codes

| Method | Purpose |
|--------|---------|
| GET    | Retrieve data (no side effects) |
| POST   | Create a new resource |
| PUT    | Replace an existing resource |
| PATCH  | Update part of a resource |
| DELETE | Remove a resource |

| Code Range | Meaning |
|-----------|---------|
| 200–299 | Success |
| 301–302 | Redirect |
| 400 | Bad request (your fault) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Rate limited |
| 500–599 | Server error (their fault) |`,
        },
        {
          kind: "code",
          language: "python",
          code: `# Conceptual representation of an HTTP request
# (not actual code — shows the structure)

# GET /api/users/42 HTTP/1.1
# Host: api.example.com
# Authorization: Bearer <token>
# Accept: application/json

# HTTP/1.1 200 OK
# Content-Type: application/json
# {
#   "id": 42,
#   "name": "Alice",
#   "email": "alice@example.com"
# }

# In Python using the requests library:
# import requests
# resp = requests.get(
#     "https://api.example.com/api/users/42",
#     headers={"Authorization": "Bearer token123"},
# )
# user = resp.json()`,
          caption:
            "This lesson uses conceptual examples because in-browser Python (Pyodide) cannot make real HTTP calls. The `requests` library is the standard for HTTP in Python.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "requests vs urllib",
          body: "Python's standard library has `urllib.request`, but the third-party `requests` library is far more ergonomic and is used in >95% of production Python code. Install it with `pip install requests`.",
        },
        {
          kind: "why-matters",
          body: "Modern software is built from services that talk to each other over HTTP. Understanding how HTTP works means you can consume any REST API, debug connection issues, and design your own services.",
        },
      ],
      interactions: [
        {
          id: "s12-hc-mc-statuscode",
          kind: "multiple-choice",
          prompt: "An API returns status code 404. What does this mean?",
          beginnerPurpose: "Recognise the meaning of common HTTP status codes.",
          expectedConceptIds: ["status-code"],
          options: [
            { id: "a", text: "The server crashed.", isCorrect: false, explanation: "Server crashes typically return 500-series codes." },
            { id: "b", text: "The request was malformed.", isCorrect: false, explanation: "Malformed requests return 400." },
            { id: "c", text: "The requested resource was not found.", isCorrect: true, explanation: "Correct! 404 means the URL path doesn't match any resource." },
            { id: "d", text: "Authentication is required.", isCorrect: false, explanation: "Authentication required is 401." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "404 is the most famous HTTP status code — you've probably seen it in a browser." }],
          feedback: {
            correct: "Correct! 404 = Not Found. The resource doesn't exist at that URL.",
            incorrect: "404 means 'Not Found' — the server received the request but has no resource at that path.",
          },
        },
        {
          id: "s12-hc-mc-method",
          kind: "multiple-choice",
          prompt: "Which HTTP method should you use to retrieve a user's profile without modifying it?",
          beginnerPurpose: "Understand that GET is the read-only method.",
          expectedConceptIds: ["http-method", "http-request"],
          options: [
            { id: "a", text: "POST", isCorrect: false, explanation: "POST is for creating new resources." },
            { id: "b", text: "GET", isCorrect: true, explanation: "Correct! GET retrieves data without side effects." },
            { id: "c", text: "DELETE", isCorrect: false, explanation: "DELETE removes resources." },
            { id: "d", text: "PUT", isCorrect: false, explanation: "PUT replaces an existing resource." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Read-only operations use GET." }],
          feedback: {
            correct: "Right! GET is the safe, idempotent method for reading data.",
            incorrect: "GET is the correct method for retrieving data without modifying it.",
          },
        },
        {
          id: "s12-hc-fill-concepts",
          kind: "fill-code",
          prompt: "Label the parts of this mock HTTP response by filling in the status code meaning.",
          beginnerPurpose: "Reinforce status code knowledge.",
          expectedConceptIds: ["status-code", "api-response"],
          codeTemplate: `# HTTP Response parts:
# Status line: HTTP/1.1 ___BLANK_1___ OK
# Header: Content-Type: application/json
# Body: {"message": "Resource created"}

# Code ___BLANK_1___ means the request succeeded
# and a new resource was ___BLANK_2___`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "201", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "created", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "201 is the 'success + new resource created' status code." }],
          feedback: {
            correct: "Correct! 201 Created indicates a successful POST that produced a new resource.",
            incorrect: "201 is the status code for 'Created' — used when a POST request creates a new resource.",
          },
        },
        {
          id: "s12-hc-plain-explain",
          kind: "plain-language-explain",
          prompt: "Explain what happens during an HTTP GET request to `https://api.example.com/users/1`.",
          beginnerPurpose: "Articulate the full request-response cycle.",
          expectedConceptIds: ["http-request", "api-response"],
          code: `# Pseudo-code representation
# client → GET /users/1 → server
# server → 200 OK + JSON body → client
# client parses JSON into a Python dict`,
          keyPointsToHit: [
            "Client sends a GET request to a URL",
            "Server processes the request and looks up user 1",
            "Server responds with a status code (200) and a JSON body",
            "Client parses the JSON into Python data",
          ],
          sampleAnswer:
            "The client sends a GET request to `https://api.example.com/users/1`. The server looks up user 1 in its database, formats the result as JSON, and sends back a `200 OK` response with the JSON body. The client receives this and parses the JSON into a Python dictionary to use in the program.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think step by step: what does the client send, what does the server do, what comes back?" }],
          feedback: {
            correct: "Excellent! You described the full request-response cycle clearly.",
            incorrect: "Cover all four steps: client sends GET, server looks up data, server responds with 200+JSON, client parses.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "status-code", recallPrompt: "What HTTP status codes indicate client errors vs server errors?", nextReviewAfterDays: 2 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s12-hc-mc-statuscode", "s12-hc-mc-method", "s12-hc-fill-concepts"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["status-code"],
      },
    },

    /* ── Lesson 2: Consuming APIs ────────────────────────────────────────── */
    {
      id: "s12-consuming-apis",
      stageId: "stage-12",
      title: "Consuming REST APIs",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Make GET and POST requests with the `requests` library",
        "Pass query parameters and headers",
        "Parse JSON responses",
        "Handle connection errors and timeouts",
      ],
      prerequisites: [],
      concepts: ["http-request", "api-response", "json-contract"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `import requests

# GET with query parameters and auth header
resp = requests.get(
    "https://api.github.com/repos/python/cpython/issues",
    params={"state": "open", "per_page": 5},
    headers={"Accept": "application/vnd.github.v3+json"},
    timeout=10,          # always set a timeout
)
resp.raise_for_status()  # raises HTTPError for 4xx/5xx
issues = resp.json()     # parse response body as JSON
for issue in issues:
    print(issue["title"])`,
          caption:
            "`raise_for_status()` is the simplest way to turn bad status codes into exceptions. Always set `timeout=` to prevent hanging forever.",
        },
        {
          kind: "code",
          language: "python",
          code: `import requests

# POST with a JSON body
payload = {
    "title": "Found a bug",
    "body": "Steps to reproduce...",
    "labels": ["bug"],
}

resp = requests.post(
    "https://api.example.com/issues",
    json=payload,               # sets Content-Type: application/json automatically
    headers={"Authorization": "Bearer YOUR_TOKEN"},
    timeout=10,
)
resp.raise_for_status()
created = resp.json()
print(f"Created issue #{created['id']}")`,
          caption:
            "Pass `json=` instead of `data=` to automatically serialize the payload and set the correct `Content-Type` header.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Always set a timeout",
          body: "Without `timeout=`, a request can hang indefinitely if the server is unresponsive. Use `timeout=(connect_timeout, read_timeout)` for fine-grained control, e.g. `timeout=(3, 30)` means 3s to connect, 30s to read.",
        },
        {
          kind: "mental-model",
          title: "A REST API is a remote function call",
          analogy:
            "Calling `GET /users/42` is like calling `get_user(42)` on a remote computer. The URL is the function name, the query parameters are keyword arguments, and the JSON response is the return value. The status code tells you whether the function succeeded.",
          explanation:
            "This mental model helps you predict how to interact with any REST API: what URL to call, what data to send, and what to expect back.",
        },
        {
          kind: "why-matters",
          body: "Most modern services expose REST APIs. Knowing how to consume them means you can integrate payment processors, send emails, read weather data, access databases, and build automation — all from Python.",
        },
      ],
      interactions: [
        {
          id: "s12-ca-fill-request",
          kind: "fill-code",
          prompt: "Complete the GET request with a timeout of 5 seconds and parse the JSON response.",
          beginnerPurpose: "Practice the basic requests.get pattern.",
          expectedConceptIds: ["http-request", "api-response"],
          codeTemplate: `import requests

resp = requests.___BLANK_1___(
    "https://api.example.com/data",
    timeout=___BLANK_2___,
)
resp.raise_for_status()
data = resp.___BLANK_3___()`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "get", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "5", caseSensitive: true },
            { placeholder: "___BLANK_3___", answer: "json", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Method is `.get()`, parse response with `.json()`." }],
          feedback: {
            correct: "Correct! `requests.get`, `timeout=5`, and `.json()` are the three key pieces.",
            incorrect: "Use `requests.get(url, timeout=5)` and then `resp.json()` to parse.",
          },
        },
        {
          id: "s12-ca-mc-raise-for-status",
          kind: "multiple-choice",
          prompt: "What does `resp.raise_for_status()` do?",
          beginnerPurpose: "Understand the purpose of `raise_for_status`.",
          expectedConceptIds: ["api-response", "status-code"],
          options: [
            { id: "a", text: "Prints the status code.", isCorrect: false, explanation: "`raise_for_status` raises exceptions, it doesn't print." },
            { id: "b", text: "Raises `requests.HTTPError` if the status code is 4xx or 5xx.", isCorrect: true, explanation: "Correct! It converts bad status codes into Python exceptions." },
            { id: "c", text: "Retries the request on failure.", isCorrect: false, explanation: "`raise_for_status` doesn't retry — it raises an exception." },
            { id: "d", text: "Returns the status code as an integer.", isCorrect: false, explanation: "The status code is at `resp.status_code`. `raise_for_status` raises or does nothing." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The name says it: 'raise for status' — raise an exception for bad statuses." }],
          feedback: {
            correct: "Correct! `raise_for_status()` turns HTTP errors into Python exceptions you can catch.",
            incorrect: "`raise_for_status()` raises `HTTPError` for 4xx/5xx responses and does nothing for 2xx.",
          },
        },
        {
          id: "s12-ca-predict-params",
          kind: "predict-output",
          prompt: "What URL does this request send to?",
          beginnerPurpose: "Understand how `params` are appended as a query string.",
          expectedConceptIds: ["http-request"],
          code: `import requests

# This is conceptual — showing the URL that would be requested
url = "https://api.example.com/search"
params = {"q": "python", "page": 2}
req = requests.Request("GET", url, params=params)
prepared = req.prepare()
print(prepared.url)`,
          expectedOutput: "https://api.example.com/search?q=python&page=2",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`params` dict is URL-encoded and appended as a query string after `?`." }],
          feedback: {
            correct: "Correct! Query params become `?key=value&key=value` appended to the URL.",
            incorrect: "The `params` dict becomes `?q=python&page=2` appended to the base URL.",
          },
        },
        {
          id: "s12-ca-run-mock-api",
          kind: "run-code",
          prompt:
            "Simulate an API response by writing a function `parse_user_response(json_str: str) -> dict` that extracts name and email from a JSON string.",
          beginnerPurpose: "Practice parsing JSON as you would from an API response.",
          expectedConceptIds: ["api-response", "json-contract"],
          starterCode: `import json

def parse_user_response(json_str: str) -> dict:
    # Parse json_str and return {"name": ..., "email": ...}
    pass

raw = '{"id": 1, "name": "Alice", "email": "alice@example.com", "role": "admin"}'
result = parse_user_response(raw)
print(result["name"])
print(result["email"])
`,
          task: "Return only `name` and `email` from the parsed JSON.",
          expectedOutputContains: ["Alice", "alice@example.com"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Use `json.loads(json_str)` then extract `name` and `email` keys." }],
          feedback: {
            correct: "API response parsed and filtered correctly!",
            incorrect: "Parse with `json.loads`, then return `{'name': data['name'], 'email': data['email']}`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "http-request", recallPrompt: "Why should you always set `timeout=` on HTTP requests?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s12-ca-fill-request", "s12-ca-mc-raise-for-status", "s12-ca-predict-params"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["http-request"],
      },
    },

    /* ── Lesson 3: JSON Contracts ────────────────────────────────────────── */
    {
      id: "s12-json-contracts",
      stageId: "stage-12",
      title: "JSON Contracts and Serialization",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Understand JSON as the lingua franca of REST APIs",
        "Serialize Python objects to JSON strings and back",
        "Handle dates, decimals, and custom types in JSON",
        "Define and document an API contract",
      ],
      prerequisites: [],
      concepts: ["json-contract", "serialization"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `import json
from datetime import datetime, date

# Python → JSON
data = {
    "name": "Alice",
    "score": 98.6,
    "active": True,
    "tags": ["admin", "user"],
    "metadata": None,
}
json_str = json.dumps(data, indent=2)
print(json_str)

# JSON → Python
restored = json.loads(json_str)
print(restored["name"])  # Alice`,
          caption:
            "`json.dumps` converts Python → JSON string; `json.loads` converts JSON string → Python. Note: Python's `None` becomes JSON `null`, `True` becomes `true`.",
        },
        {
          kind: "code",
          language: "python",
          code: `import json
from datetime import date

def default_encoder(obj: object) -> object:
    if isinstance(obj, date):
        return obj.isoformat()
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

event = {
    "name": "PyCon",
    "date": date(2025, 5, 15),
}
print(json.dumps(event, default=default_encoder))
# {"name": "PyCon", "date": "2025-05-15"}`,
          caption:
            "Custom types (like `date`) need a `default` encoder function to be JSON-serializable.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "An API contract is a promise",
          body: "A JSON contract defines the structure of request and response bodies: field names, types, required/optional status, and meaning. When you rely on `user['email']`, you are trusting the contract. Always validate responses rather than trusting blindly.",
        },
        {
          kind: "why-matters",
          body: "JSON is the universal data exchange format for REST APIs. Understanding serialization — what converts cleanly and what doesn't — prevents runtime surprises when you try to send a `datetime` object directly to an API.",
        },
      ],
      interactions: [
        {
          id: "s12-jc-predict-json",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Understand Python↔JSON type mapping.",
          expectedConceptIds: ["json-contract", "serialization"],
          code: `import json
data = {"active": True, "count": None, "score": 1.5}
result = json.loads(json.dumps(data))
print(result["active"], type(result["active"]).__name__)
print(result["count"])`,
          expectedOutput: "True bool\nNone",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "JSON `true` maps to Python `True`; JSON `null` maps to Python `None`." }],
          feedback: {
            correct: "Correct! `True` stays `True` (bool) and `null` becomes `None`.",
            incorrect: "JSON `true` → Python `True`, JSON `null` → Python `None`. Types are preserved through the round-trip.",
          },
        },
        {
          id: "s12-jc-fill-dumps",
          kind: "fill-code",
          prompt: "Serialize a Python dict to a pretty-printed JSON string with 2-space indentation.",
          beginnerPurpose: "Practice `json.dumps` with indent.",
          expectedConceptIds: ["serialization"],
          codeTemplate: `import json
data = {"name": "Bob", "age": 30}
output = json.___BLANK_1___(data, ___BLANK_2___=2)
print(output)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "dumps", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "indent", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "`json.dumps(data, indent=2)` produces formatted output." }],
          feedback: {
            correct: "Correct! `json.dumps` with `indent=2` produces human-readable JSON.",
            incorrect: "Use `json.dumps(data, indent=2)`.",
          },
        },
        {
          id: "s12-jc-mc-unsupported",
          kind: "multiple-choice",
          prompt: "Which Python value is NOT directly serializable to JSON with `json.dumps`?",
          beginnerPurpose: "Know which types need custom handling.",
          expectedConceptIds: ["json-contract", "serialization"],
          options: [
            { id: "a", text: "`[1, 2, 3]`", isCorrect: false, explanation: "Lists are natively JSON-serializable as arrays." },
            { id: "b", text: "`{'a': 1}`", isCorrect: false, explanation: "Dicts with string keys are natively serializable." },
            { id: "c", text: "`True`", isCorrect: false, explanation: "`True` serializes as JSON `true`." },
            { id: "d", text: "`datetime.now()`", isCorrect: true, explanation: "Correct! `datetime` objects are not JSON-serializable by default; use `.isoformat()` or a custom encoder." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "JSON only has string, number, boolean, null, array, and object types." }],
          feedback: {
            correct: "Correct! `datetime` objects require a custom encoder or `.isoformat()` call.",
            incorrect: "`datetime` is not a JSON primitive and needs a custom encoder.",
          },
        },
        {
          id: "s12-jc-debug-json",
          kind: "debug-code",
          prompt: "The JSON serialization fails. Fix it.",
          beginnerPurpose: "Recognise and fix a non-serializable type error.",
          expectedConceptIds: ["serialization"],
          brokenCode: `import json
from decimal import Decimal

price = {"amount": Decimal("19.99"), "currency": "USD"}
print(json.dumps(price))   # TypeError`,
          bugDescription: "`Decimal` is not JSON-serializable. Convert it to `float` or `str` before serializing.",
          fixedCode: `import json
from decimal import Decimal

price = {"amount": float(Decimal("19.99")), "currency": "USD"}
print(json.dumps(price))`,
          errorType: "TypeError",
          allowedAttempts: 4,
          hints: [{ level: "syntax", text: "Convert `Decimal` to `float` with `float()` before serializing." }],
          feedback: {
            correct: "Correct! `float(Decimal('19.99'))` converts to a JSON-serializable number.",
            incorrect: "Wrap `Decimal('19.99')` in `float(...)` to convert it to a serializable float.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "json-contract", recallPrompt: "Name two Python types that are NOT directly serializable to JSON.", nextReviewAfterDays: 2 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s12-jc-predict-json", "s12-jc-fill-dumps", "s12-jc-mc-unsupported"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["json-contract"],
      },
    },

    /* ── Lesson 4: API Errors and Retries ───────────────────────────────── */
    {
      id: "s12-api-errors-retries",
      stageId: "stage-12",
      title: "Handling API Errors and Retries",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish between connection errors, timeouts, and HTTP errors",
        "Implement exponential back-off for transient failures",
        "Understand idempotent vs non-idempotent retry safety",
        "Use the retry pattern with a maximum attempt limit",
      ],
      prerequisites: [],
      concepts: ["retry-strategy", "status-code", "error-handling"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `import time
import logging
from typing import Callable, TypeVar

logger = logging.getLogger(__name__)
T = TypeVar("T")

def with_retry(
    fn: Callable[[], T],
    max_attempts: int = 3,
    base_delay: float = 1.0,
) -> T:
    """Call fn(), retrying up to max_attempts times with exponential back-off."""
    for attempt in range(1, max_attempts + 1):
        try:
            return fn()
        except Exception as exc:
            if attempt == max_attempts:
                logger.error("All %d attempts failed: %s", max_attempts, exc)
                raise
            wait = base_delay * (2 ** (attempt - 1))
            logger.warning("Attempt %d failed (%s). Retrying in %.1fs.", attempt, exc, wait)
            time.sleep(wait)
    raise RuntimeError("unreachable")`,
          caption:
            "Exponential back-off: wait 1s, then 2s, then 4s. This avoids hammering a struggling server.",
        },
        {
          kind: "text",
          markdown: `## When to Retry

**Safe to retry (idempotent):**
- GET, HEAD, OPTIONS — reading doesn't change state
- 429 Too Many Requests — back off and try again
- 503 Service Unavailable — transient server issue

**Do NOT retry:**
- POST (creates resources) — unless the API provides idempotency keys
- 400 Bad Request — retrying won't fix a malformed request
- 401/403 — authentication/authorization errors won't resolve automatically
- 404 — the resource doesn't exist; retrying won't create it`,
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Jitter prevents thundering herds",
          body: "If 100 clients all fail and all wait exactly 2 seconds, they'll all retry at the same instant — possibly overwhelming the server again. Add random jitter: `wait = base_delay * (2 ** attempt) + random.uniform(0, 0.5)`.",
        },
        {
          kind: "why-matters",
          body: "Networks are unreliable. APIs go down briefly. A script that crashes on the first transient error forces a human to re-run it. A script with a sensible retry strategy runs reliably overnight without supervision.",
        },
      ],
      interactions: [
        {
          id: "s12-ar-mc-retry-safe",
          kind: "multiple-choice",
          prompt: "Which HTTP response is safe to automatically retry?",
          beginnerPurpose: "Know which status codes warrant a retry.",
          expectedConceptIds: ["retry-strategy", "status-code"],
          options: [
            { id: "a", text: "400 Bad Request", isCorrect: false, explanation: "A bad request won't succeed on retry — the request itself is wrong." },
            { id: "b", text: "401 Unauthorized", isCorrect: false, explanation: "Retrying won't fix missing credentials." },
            { id: "c", text: "503 Service Unavailable", isCorrect: true, explanation: "Correct! 503 is transient — the server is temporarily unavailable and may recover." },
            { id: "d", text: "404 Not Found", isCorrect: false, explanation: "Retrying a 404 won't make the resource appear." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Transient errors are temporary — permanent errors are not worth retrying." }],
          feedback: {
            correct: "Correct! 503 is temporary. Back off and retry.",
            incorrect: "Only retry transient errors like 429 and 503. Errors 400, 401, and 404 won't be fixed by retrying.",
          },
        },
        {
          id: "s12-ar-predict-backoff",
          kind: "predict-output",
          prompt: "What are the wait times for attempts 1, 2, and 3 with this back-off?",
          beginnerPurpose: "Calculate exponential back-off delays.",
          expectedConceptIds: ["retry-strategy"],
          code: `base = 1.0
for attempt in range(1, 4):
    wait = base * (2 ** (attempt - 1))
    print(f"Attempt {attempt}: wait {wait}s")`,
          expectedOutput: "Attempt 1: wait 1.0s\nAttempt 2: wait 2.0s\nAttempt 3: wait 4.0s",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "2^0=1, 2^1=2, 2^2=4" }],
          feedback: {
            correct: "Correct! The delays double each time: 1s, 2s, 4s.",
            incorrect: "Compute `1.0 * 2^0 = 1`, `1.0 * 2^1 = 2`, `1.0 * 2^2 = 4`.",
          },
        },
        {
          id: "s12-ar-fill-retry",
          kind: "fill-code",
          prompt: "Complete the retry loop to attempt a call up to 3 times.",
          beginnerPurpose: "Practice writing a simple retry loop.",
          expectedConceptIds: ["retry-strategy"],
          codeTemplate: `import time

def fetch_data() -> str:
    raise ConnectionError("Network error")

for attempt in range(1, ___BLANK_1___ + 1):
    try:
        result = fetch_data()
        break
    except ConnectionError:
        if attempt == ___BLANK_1___:
            raise
        time.sleep(___BLANK_2___ ** attempt)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "3", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "2", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Max attempts is 3; back-off uses `2 ** attempt`." }],
          feedback: {
            correct: "Correct! 3 max attempts with `2 ** attempt` exponential back-off.",
            incorrect: "Use `3` as max attempts and `2 ** attempt` for the wait time.",
          },
        },
        {
          id: "s12-ar-run-error-handling",
          kind: "run-code",
          prompt:
            "Write a `safe_divide(a, b)` that returns the result or `None` on `ZeroDivisionError`, simulating graceful error handling in an API-like context.",
          beginnerPurpose: "Practice error handling patterns used when calling APIs.",
          expectedConceptIds: ["error-handling"],
          starterCode: `def safe_divide(a: float, b: float) -> float | None:
    # Return a / b, or None if b is 0
    pass

print(safe_divide(10, 2))    # 5.0
print(safe_divide(10, 0))    # None
`,
          task: "Return `a/b` or `None` on division by zero.",
          expectedOutputContains: ["5.0", "None"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Use try/except ZeroDivisionError: return None" }],
          feedback: {
            correct: "Correct! Graceful error handling in action.",
            incorrect: "Wrap `return a / b` in a `try` block and catch `ZeroDivisionError` to return `None`.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "retry-strategy", recallPrompt: "Name two HTTP status codes worth retrying and two that are not.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s12-ar-mc-retry-safe", "s12-ar-predict-backoff", "s12-ar-fill-retry"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["retry-strategy"],
      },
    },

    /* ── Lesson 5: Data Validation ──────────────────────────────────────── */
    {
      id: "s12-data-validation",
      stageId: "stage-12",
      title: "Validating API Data",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Validate required fields are present in API responses",
        "Check field types and value ranges",
        "Raise informative `ValueError` on invalid data",
        "Build a reusable validation helper",
      ],
      prerequisites: [],
      concepts: ["data-validation", "api-response"],
      contentBlocks: [
        {
          kind: "code",
          language: "python",
          code: `def validate_user(data: dict) -> dict:
    """Validate a user dict from an API response.
    Raises ValueError with a descriptive message on failure."""
    required = {"id", "name", "email"}
    missing = required - data.keys()
    if missing:
        raise ValueError(f"Missing required fields: {missing}")

    if not isinstance(data["id"], int) or data["id"] <= 0:
        raise ValueError(f"'id' must be a positive int, got {data['id']!r}")

    if "@" not in data["email"]:
        raise ValueError(f"'email' appears invalid: {data['email']!r}")

    return data   # return validated data for chaining

# Usage
raw = {"id": 5, "name": "Alice", "email": "alice@example.com"}
user = validate_user(raw)`,
          caption:
            "Never assume API responses are correct. Validate early and raise clear errors — debugging an `AttributeError` on line 200 is far harder than a `ValueError` on line 10.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Pydantic for real-world validation",
          body: "For production code, the `pydantic` library (used by FastAPI, OpenAI SDK, and many others) provides declarative data validation with automatic parsing, type coercion, and error messages. The manual validation shown here teaches the concepts; pydantic automates them.",
        },
        {
          kind: "code",
          language: "python",
          code: `from typing import Any

def expect_keys(data: dict[str, Any], *keys: str) -> None:
    """Raise ValueError if any key is missing from data."""
    missing = [k for k in keys if k not in data]
    if missing:
        raise ValueError(f"Response missing keys: {missing}")

def expect_type(data: dict, key: str, expected_type: type) -> None:
    """Raise ValueError if data[key] is not the expected type."""
    if not isinstance(data[key], expected_type):
        raise ValueError(
            f"Expected {key!r} to be {expected_type.__name__}, "
            f"got {type(data[key]).__name__}"
        )`,
          caption: "Small reusable helpers reduce repeated validation boilerplate.",
        },
        {
          kind: "why-matters",
          body: "APIs change without warning. A field gets renamed, a type changes from int to string, or a required field disappears. Validation catches these changes immediately rather than letting them silently corrupt downstream data.",
        },
      ],
      interactions: [
        {
          id: "s12-dv-fill-validate",
          kind: "fill-code",
          prompt: "Write a check that raises `ValueError` if `data['score']` is not between 0 and 100.",
          beginnerPurpose: "Practice defensive value-range validation.",
          expectedConceptIds: ["data-validation"],
          codeTemplate: `def validate_score(data: dict) -> None:
    score = data.get("score")
    if not (___BLANK_1___ <= score <= ___BLANK_2___):
        raise ___BLANK_3___(f"Score {score} out of range 0-100")`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "0", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "100", caseSensitive: true },
            { placeholder: "___BLANK_3___", answer: "ValueError", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use chained comparison `0 <= score <= 100` and raise `ValueError`." }],
          feedback: {
            correct: "Correct! `0 <= score <= 100` is the Pythonic range check.",
            incorrect: "Check `0 <= score <= 100` and raise `ValueError` if it fails.",
          },
        },
        {
          id: "s12-dv-debug-missing-key",
          kind: "debug-code",
          prompt: "The validation function crashes instead of raising a clear error. Fix it.",
          beginnerPurpose: "Replace silent crashes with informative validation errors.",
          expectedConceptIds: ["data-validation"],
          brokenCode: `def get_username(data: dict) -> str:
    return data["username"]   # KeyError if missing

result = get_username({"name": "Alice"})`,
          bugDescription:
            "Accessing `data['username']` raises `KeyError` when the key is missing, giving an unhelpful error. Validate first and raise `ValueError` with context.",
          fixedCode: `def get_username(data: dict) -> str:
    if "username" not in data:
        raise ValueError("Response is missing 'username' field")
    return data["username"]

result = get_username({"name": "Alice"})`,
          errorType: "KeyError",
          allowedAttempts: 4,
          hints: [{ level: "concept", text: "Check for the key's existence before accessing it and raise `ValueError` with a clear message." }],
          feedback: {
            correct: "Correct! Explicit validation gives much more useful error messages.",
            incorrect: "Check `if 'username' not in data: raise ValueError(...)` before accessing the key.",
          },
        },
        {
          id: "s12-dv-run-validator",
          kind: "run-code",
          prompt:
            "Write `validate_product(data: dict)` that requires `name` (str), `price` (float > 0), and `stock` (int >= 0). Print 'valid' for valid data.",
          beginnerPurpose: "Build a complete validation function from scratch.",
          expectedConceptIds: ["data-validation"],
          starterCode: `def validate_product(data: dict) -> None:
    # Check: name (str), price (float > 0), stock (int >= 0)
    # Raise ValueError if any check fails
    pass

try:
    validate_product({"name": "Widget", "price": 9.99, "stock": 100})
    print("valid")
except ValueError as e:
    print(f"invalid: {e}")
`,
          task: "Validate all three fields and print 'valid' for correct data.",
          expectedOutputContains: ["valid"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [{ level: "syntax", text: "Check `isinstance(data['price'], (int, float))` and `data['price'] > 0`." }],
          feedback: {
            correct: "Validation passes for valid product data!",
            incorrect: "Check name is str, price is float/int > 0, and stock is int >= 0. Raise ValueError otherwise.",
          },
        },
        {
          id: "s12-dv-mc-why-validate",
          kind: "multiple-choice",
          prompt: "Why should you validate API response data even from trusted sources?",
          beginnerPurpose: "Understand defensive programming in API consumption.",
          expectedConceptIds: ["data-validation", "api-response"],
          options: [
            { id: "a", text: "APIs from trusted sources never send bad data.", isCorrect: false, explanation: "APIs change: fields get renamed, types change, new nullable fields appear." },
            { id: "b", text: "Validation catches API contract changes early, preventing silent data corruption downstream.", isCorrect: true, explanation: "Correct! Even trusted APIs change, and catching contract violations at the boundary is far safer." },
            { id: "c", text: "Python would raise an error automatically for wrong types.", isCorrect: false, explanation: "Python doesn't validate dict values automatically — wrong types silently propagate." },
            { id: "d", text: "It makes the code run faster.", isCorrect: false, explanation: "Validation adds a small overhead; the benefit is correctness, not performance." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what happens if an API renames a field you rely on." }],
          feedback: {
            correct: "Exactly! Validate at the boundary so contract changes fail loudly and immediately.",
            incorrect: "Even 'trusted' APIs change. Early validation catches those changes before they corrupt downstream data.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "data-validation", recallPrompt: "Where in your code should API response validation happen?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s12-dv-fill-validate", "s12-dv-debug-missing-key", "s12-dv-run-validator"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["data-validation"],
      },
    },
  ],

  /* ── Project ──────────────────────────────────────────────────────────── */
  project: {
    id: "s12-mock-api-client",
    stageId: "stage-12",
    title: "Mock API Client",
    brief:
      "Build a mock API client that simulates fetching, validating, and transforming JSON data — using Python dicts and functions to represent what a real HTTP client would do.",
    requirements: [
      "Define a `MockHttpClient` class with `get(url: str) -> dict` that returns pre-defined mock responses",
      "Implement a `UserApiClient` that uses `MockHttpClient` to fetch user data",
      "Validate all responses: check required fields, types, and value ranges",
      "Implement retry logic (up to 3 attempts) for simulated connection errors",
      "Transform raw API dicts into typed dataclass objects",
      "Write at least 3 tests verifying validation and transformation",
    ],
    acceptanceCriteria: [
      "Valid responses are parsed into user dataclasses",
      "Missing required fields raise `ValueError` with a descriptive message",
      "Simulated connection errors trigger retry with back-off",
      "After 3 failed retries, the error is re-raised",
      "All tests pass",
    ],
    conceptIds: ["http-request", "json-contract", "api-response", "data-validation", "retry-strategy"],
    difficulty: "intermediate",
    starterCode: `from dataclasses import dataclass
import time

@dataclass
class User:
    id: int
    name: str
    email: str

# Simulated responses
MOCK_RESPONSES: dict[str, dict] = {
    "/users/1": {"id": 1, "name": "Alice", "email": "alice@example.com"},
    "/users/2": {"id": 2, "name": "Bob", "email": "bob@example.com"},
}

class MockHttpClient:
    def get(self, url: str) -> dict:
        if url not in MOCK_RESPONSES:
            raise KeyError(f"No mock for {url}")
        return dict(MOCK_RESPONSES[url])

class UserApiClient:
    def __init__(self, client: MockHttpClient) -> None:
        self._client = client

    def get_user(self, user_id: int) -> User:
        # TODO: fetch, validate, transform
        pass

# Demo
client = UserApiClient(MockHttpClient())
user = client.get_user(1)
print(user.name)  # Alice
`,
  },
} satisfies Stage;
