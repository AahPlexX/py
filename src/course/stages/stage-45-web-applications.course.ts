import type { Stage } from "@/course/course.schema";

export const stage45 = {
  id: "stage-45",
  number: 45,
  title: "Web Applications and Service Development",
  summary:
    "Master web application development in Python — routing, request/response lifecycle, JSON APIs, authentication, validation, and production concerns like rate limiting, CORS, and pagination.",
  level: "advanced",
  masteryGateConceptIds: ["web-request-response", "http-routing", "json-api", "web-authentication"],
  lessons: [
    // ── 45.1 Web application architecture ───────────────────────────────────
    {
      id: "s45-web-application-architecture",
      stageId: "stage-45",
      title: "Web Application Architecture",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Describe the client–server model and how HTTP connects them",
        "Identify the layers of a typical Python web application",
        "Explain the role of a framework vs. a web server",
      ],
      prerequisites: [],
      concepts: ["web-request-response"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Web Application Architecture\n\nA **web application** listens on a network port, accepts HTTP requests, and returns HTTP responses. The key layers are:\n\n1. **Web server / ASGI/WSGI gateway** — receives raw TCP connections (Uvicorn, Gunicorn)\n2. **Framework** — routes requests to handlers (FastAPI, Flask, Django)\n3. **Application logic** — business rules, database calls\n4. **Data store** — database, cache, blob storage\n\nPython frameworks implement either the WSGI (synchronous) or ASGI (asynchronous) interface so they can plug into any compatible server.",
        },
        {
          kind: "mental-model",
          title: "Restaurant analogy",
          analogy: "Think of a web app like a restaurant. The WSGI/ASGI server is the front door. The framework is the host who seats you and routes you to the right waiter. Your handler function is the chef.",
          explanation: "Each HTTP request walks in the front door, gets routed to the right handler, which prepares a response and hands it back. Multiple requests can be handled concurrently just like multiple tables.",
        },
        {
          kind: "code",
          language: "python",
          code:
`# Minimal FastAPI application — shows all layers in one file
from fastapi import FastAPI

app = FastAPI()          # framework layer

@app.get("/health")      # route registration
def health_check():      # handler / application logic
    return {"status": "ok"}

# uvicorn main:app --reload  ← web server layer (run in terminal)`,
          caption: "A complete (tiny) web application with FastAPI",
        },
        {
          kind: "callout",
          variant: "info",
          title: "WSGI vs ASGI",
          body: "WSGI (Flask, Django default) handles one request per thread. ASGI (FastAPI, Django Channels) uses async/await so a single thread can handle thousands of concurrent connections efficiently.",
        },
        {
          kind: "why-matters",
          body: "Every production Python service follows this layered architecture. Understanding where each concern lives — routing, business logic, persistence — prevents spaghetti code and makes debugging dramatically easier.",
        },
        {
          kind: "glossary-term",
          term: "ASGI",
          definition: "Asynchronous Server Gateway Interface — the async successor to WSGI that supports WebSockets and long-polling in addition to HTTP.",
          example: "FastAPI and Starlette are ASGI frameworks; Uvicorn is an ASGI server.",
        },
      ],
      interactions: [
        {
          id: "s45-arch-mc",
          kind: "multiple-choice",
          prompt: "Which layer is responsible for mapping a URL path like `/users/42` to the correct Python function?",
          beginnerPurpose: "Identify where routing lives in the architecture",
          expectedConceptIds: ["web-request-response"],
          options: [
            { id: "a", text: "The ASGI/WSGI gateway (e.g., Uvicorn)", isCorrect: false, explanation: "The gateway only passes raw requests to the framework; it does not inspect URL paths." },
            { id: "b", text: "The web framework (e.g., FastAPI)", isCorrect: true, explanation: "Correct — frameworks inspect the URL and HTTP method to select the right handler." },
            { id: "c", text: "The database layer", isCorrect: false, explanation: "Databases store data; they know nothing about HTTP URLs." },
            { id: "d", text: "The operating system TCP stack", isCorrect: false, explanation: "The OS stack handles raw network packets, not HTTP semantics." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Look at the four layers listed in the lesson and what each one does." }],
          feedback: { correct: "Exactly right — the framework is the router.", incorrect: "Review the four-layer diagram in the lesson." },
        },
        {
          id: "s45-arch-explain",
          kind: "plain-language-explain",
          prompt: "Explain the difference between a web framework and a web server to a junior developer who is setting up their first Python service.",
          beginnerPurpose: "Solidify the conceptual distinction between framework and server",
          expectedConceptIds: ["web-request-response"],
          code:
`# uvicorn main:app --host 0.0.0.0 --port 8000
# ^--- web server     ^--- framework app object`,
          keyPointsToHit: [
            "Web server (Uvicorn/Gunicorn) handles TCP connections and the HTTP wire protocol",
            "Framework (FastAPI/Flask) handles routing, request parsing, and response formatting",
            "They are connected via WSGI or ASGI protocol",
          ],
          sampleAnswer: "The web server listens on a port and understands raw HTTP bytes. The framework receives already-parsed requests from the server and decides which Python function handles each one. You need both — the server handles the network, the framework handles your application logic.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think of the restaurant analogy: door staff vs. chef." }],
          feedback: { correct: "Great distinction!", incorrect: "Try to explain what each component does with a concrete example." },
        },
      ],
      reviewHooks: [
        { conceptId: "web-request-response", recallPrompt: "Name the four layers of a Python web application stack.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s45-arch-mc", "s45-arch-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.2 Request-response lifecycle ─────────────────────────────────────
    {
      id: "s45-request-response-lifecycle",
      stageId: "stage-45",
      title: "Request-Response Lifecycle",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Trace an HTTP request from client to handler and back",
        "Read HTTP method, path, headers, and body in Python",
        "Construct a well-formed HTTP response with status code and headers",
      ],
      prerequisites: ["s45-web-application-architecture"],
      concepts: ["web-request-response"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Request-Response Lifecycle\n\nEvery HTTP exchange follows the same steps:\n\n1. Client opens a TCP connection and sends an HTTP request\n2. Server parses the request line (`GET /path HTTP/1.1`), headers, and optional body\n3. Framework matches the path and method to a handler\n4. Handler runs, returns data\n5. Framework serialises data into an HTTP response (status line, headers, body)\n6. Server sends response bytes; client reads and closes connection (or reuses it for HTTP/1.1 keep-alive)\n\nStatus codes signal the outcome: `2xx` success, `3xx` redirect, `4xx` client error, `5xx` server error.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, Request, Response

app = FastAPI()

@app.post("/echo")
async def echo(request: Request) -> dict:
    # Inspect incoming request
    method  = request.method                 # "POST"
    path    = request.url.path              # "/echo"
    ct      = request.headers.get("content-type")
    body    = await request.body()          # raw bytes
    return {
        "method": method,
        "path": path,
        "content_type": ct,
        "body_length": len(body),
    }
    # FastAPI automatically sets:
    #   HTTP/1.1 200 OK
    #   Content-Type: application/json`,
          caption: "Accessing request metadata in FastAPI",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Status codes matter",
          body: "Return 201 Created when you create a resource, 204 No Content when you delete one, and 422 Unprocessable Entity for validation errors — not always 200.",
        },
        {
          kind: "why-matters",
          body: "Correct status codes allow clients (browsers, mobile apps, other services) to branch logic without parsing the body. A 404 means 'not found'; a 403 means 'forbidden' — these are not the same.",
        },
      ],
      interactions: [
        {
          id: "s45-lifecycle-predict",
          kind: "predict-output",
          prompt: "What HTTP status code does this FastAPI handler return, and why?",
          beginnerPurpose: "Identify default and explicit status codes",
          expectedConceptIds: ["web-request-response"],
          code:
`from fastapi import FastAPI
app = FastAPI()

@app.get("/nothing")
def nothing():
    return None`,
          expectedOutput: "200",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "FastAPI's default status code for GET handlers is 200 even when the body is `null`." }],
          feedback: { correct: "Correct — FastAPI defaults to 200 OK.", incorrect: "FastAPI uses 200 unless you specify `status_code=` in the decorator." },
        },
        {
          id: "s45-lifecycle-fill",
          kind: "fill-code",
          prompt: "Complete the handler so it returns HTTP 201 and includes a `Location` header pointing to the new resource.",
          beginnerPurpose: "Practice setting custom status code and response headers",
          expectedConceptIds: ["web-request-response"],
          codeTemplate:
`from fastapi import FastAPI, Response
app = FastAPI()

@app.post("/items", status_code=___BLANK_1___)
def create_item(response: Response, item_id: int = 1):
    response.headers["Location"] = f"/items/{item_id}"
    return {"id": item_id}`,
          blanks: [{ placeholder: "___BLANK_1___", answer: "201", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The status code for resource creation is 201." }],
          feedback: { correct: "Correct! 201 Created with a Location header is the REST convention.", incorrect: "Think about which 2xx code signals that a new resource was created." },
        },
      ],
      reviewHooks: [
        { conceptId: "web-request-response", recallPrompt: "What do 2xx, 4xx, and 5xx status codes each mean?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s45-lifecycle-predict", "s45-lifecycle-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.3 Routing ─────────────────────────────────────────────────────────
    {
      id: "s45-routing",
      stageId: "stage-45",
      title: "Routing",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define routes using path parameters and HTTP methods",
        "Organise routes into routers / blueprints",
        "Understand route matching priority",
      ],
      prerequisites: ["s45-request-response-lifecycle"],
      concepts: ["http-routing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Routing\n\nA **router** maps (method, path) pairs to handler functions. Path parameters are captured with curly-brace syntax:\n\n```\nGET  /users/{user_id}   → get_user(user_id)\nPOST /users            → create_user()\nDELETE /users/{user_id} → delete_user(user_id)\n```\n\nRouters can be nested and mounted under a prefix, keeping code modular.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}

@router.post("/")
def create_user(name: str):
    return {"name": name}

# In main.py:
# app.include_router(router)`,
          caption: "Modular router with path parameters",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Route ordering matters",
          body: "In Flask (and some other frameworks) routes are matched top-to-bottom. Place `/users/me` before `/users/{id}` or the literal path will never be reached.",
        },
        {
          kind: "comparison",
          leftLabel: "Flask (WSGI)",
          rightLabel: "FastAPI (ASGI)",
          leftCode:
`from flask import Flask, Blueprint

bp = Blueprint("users", __name__)

@bp.route("/users/<int:user_id>")
def get_user(user_id):
    return {"user_id": user_id}`,
          rightCode:
`from fastapi import APIRouter

router = APIRouter()

@router.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}`,
          caption: "Same route, two popular frameworks",
        },
        {
          kind: "why-matters",
          body: "Well-structured routing is the backbone of any REST API. Clear URL conventions (nouns, not verbs; plural resource names) make APIs intuitive and self-documenting.",
        },
      ],
      interactions: [
        {
          id: "s45-routing-reorder",
          kind: "reorder-code",
          prompt: "Arrange these Flask route definitions so that `/users/me` is reachable — not shadowed by `/users/<id>`.",
          beginnerPurpose: "Understand route ordering and specificity",
          expectedConceptIds: ["http-routing"],
          lines: [
            "@bp.route('/users/<int:user_id>')",
            "def get_user(user_id): ...",
            "@bp.route('/users/me')",
            "def get_me(): ...",
          ],
          correctOrder: [2, 3, 0, 1],
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "More specific (literal) routes should come before parameterised ones." }],
          feedback: { correct: "Right — `/users/me` must be registered first.", incorrect: "Put the literal route above the parameterised route." },
        },
        {
          id: "s45-routing-mc",
          kind: "multiple-choice",
          prompt: "What is the main benefit of grouping routes into an `APIRouter` or Blueprint rather than registering all routes on the main app?",
          beginnerPurpose: "Understand why modular routing matters",
          expectedConceptIds: ["http-routing"],
          options: [
            { id: "a", text: "It makes requests faster by reducing routing table size", isCorrect: false, explanation: "Route lookup is O(1) in both cases; performance is not the reason." },
            { id: "b", text: "It enables code organisation, reuse, and independent testing of route groups", isCorrect: true, explanation: "Correct — routers let you split a large app into focused modules." },
            { id: "c", text: "It automatically adds authentication to every route", isCorrect: false, explanation: "Authentication requires explicit middleware or dependencies." },
            { id: "d", text: "It prevents two routes from having the same path", isCorrect: false, explanation: "Routers do not enforce uniqueness across the whole app." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what happens when your app grows to 50+ routes." }],
          feedback: { correct: "Exactly — modularity and testability.", incorrect: "Think about code organisation as the app scales." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-routing", recallPrompt: "Why should specific routes be registered before parameterised routes?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s45-routing-reorder", "s45-routing-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.4 Query parameters ────────────────────────────────────────────────
    {
      id: "s45-query-parameters",
      stageId: "stage-45",
      title: "Query Parameters",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Read optional and required query parameters in a handler",
        "Apply default values and type coercion to query params",
        "Validate query parameter ranges with Pydantic or framework validators",
      ],
      prerequisites: ["s45-routing"],
      concepts: ["http-routing"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Query Parameters\n\nQuery parameters appear after `?` in a URL: `/items?skip=0&limit=10`. They are ideal for optional filters, pagination controls, and search terms — things that don't identify a specific resource.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/items")
def list_items(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=100),
    q: str | None = None,
):
    return {"skip": skip, "limit": limit, "q": q}

# GET /items?skip=20&limit=5&q=python
# → {"skip": 20, "limit": 5, "q": "python"}`,
          caption: "Query params with defaults and validation constraints",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Query params vs. path params",
          body: "Use **path params** (`/users/{id}`) to identify a specific resource. Use **query params** (`?sort=name`) for filtering, sorting, and pagination.",
        },
        {
          kind: "why-matters",
          body: "Query parameters are the primary mechanism for building flexible, filterable list endpoints — a staple of every REST API.",
        },
      ],
      interactions: [
        {
          id: "s45-qp-fill",
          kind: "fill-code",
          prompt: "Add a required `category` query parameter (string, no default) and an optional `max_price` float parameter defaulting to 999.99.",
          beginnerPurpose: "Practice declaring required vs optional query parameters",
          expectedConceptIds: ["http-routing"],
          codeTemplate:
`from fastapi import FastAPI

app = FastAPI()

@app.get("/products")
def list_products(
    category: ___BLANK_1___,
    max_price: float = ___BLANK_2___,
):
    return {"category": category, "max_price": max_price}`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "str", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "999.99", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "A required parameter has no default value; an optional one uses `= <default>`." }],
          feedback: { correct: "Correct! No default = required; `= 999.99` = optional with default.", incorrect: "A parameter without a default is required; one with `= value` is optional." },
        },
        {
          id: "s45-qp-mc",
          kind: "multiple-choice",
          prompt: "A client calls `GET /items?limit=abc`. What should a well-implemented API return?",
          beginnerPurpose: "Understand type validation of query parameters",
          expectedConceptIds: ["http-routing"],
          options: [
            { id: "a", text: "200 OK with limit treated as 0", isCorrect: false, explanation: "Silently coercing bad input hides bugs." },
            { id: "b", text: "422 Unprocessable Entity with a validation error message", isCorrect: true, explanation: "FastAPI/Pydantic automatically return 422 when a type constraint fails." },
            { id: "c", text: "500 Internal Server Error", isCorrect: false, explanation: "A 500 means the server crashed — proper validation prevents that." },
            { id: "d", text: "404 Not Found", isCorrect: false, explanation: "404 is for missing resources, not invalid parameters." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "`limit` is declared as `int`; the string 'abc' cannot be converted to int." }],
          feedback: { correct: "Correct — 422 tells the client their request was malformed.", incorrect: "Type mismatches are client errors, not server errors." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-qp-fill", "s45-qp-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.5 Request bodies ──────────────────────────────────────────────────
    {
      id: "s45-request-bodies",
      stageId: "stage-45",
      title: "Request Bodies",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define Pydantic models for request body validation",
        "Read and validate JSON request bodies in FastAPI",
        "Return 422 automatically for invalid bodies",
      ],
      prerequisites: ["s45-query-parameters"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Request Bodies\n\nPOST, PUT, and PATCH requests usually carry a body — JSON data describing the resource to create or modify. FastAPI uses **Pydantic models** to declare, parse, and validate the body automatically.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()

class CreateItemRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    price: float = Field(gt=0)
    in_stock: bool = True

@app.post("/items", status_code=201)
def create_item(body: CreateItemRequest):
    # body is already validated and typed
    return {"id": 1, "name": body.name, "price": body.price}`,
          caption: "Pydantic model as request body — validation is automatic",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Automatic OpenAPI docs",
          body: "FastAPI reads your Pydantic models and generates an interactive Swagger UI at `/docs`. Every field constraint is reflected in the schema — no extra work.",
        },
        {
          kind: "why-matters",
          body: "Declaring the request schema as a Pydantic model gives you free validation, serialisation, documentation, and IDE auto-complete in one step.",
        },
      ],
      interactions: [
        {
          id: "s45-body-debug",
          kind: "debug-code",
          prompt: "This handler crashes when it receives a valid JSON body. Find and fix the bug.",
          beginnerPurpose: "Identify how to correctly declare a Pydantic body parameter",
          expectedConceptIds: ["json-api"],
          brokenCode:
`from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post("/items")
def create_item(name: str, price: float):  # bug: not using the model
    return {"name": name, "price": price}`,
          bugDescription: "The handler declares individual `name` and `price` parameters instead of the `Item` Pydantic model, so FastAPI expects them as query params, not in the JSON body.",
          fixedCode:
`from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post("/items")
def create_item(item: Item):
    return {"name": item.name, "price": item.price}`,
          errorType: "RequestValidationError",
          allowedAttempts: 4,
          hints: [{ level: "concept", text: "To read a JSON body, the parameter type must be a Pydantic `BaseModel`." }],
          feedback: { correct: "Fixed! The parameter must be typed as the Pydantic model.", incorrect: "Change the parameter from individual fields to the `Item` model." },
        },
        {
          id: "s45-body-mc",
          kind: "multiple-choice",
          prompt: "What does FastAPI return when a request body fails Pydantic validation?",
          beginnerPurpose: "Know the default error response for body validation failures",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "200 OK with the validation errors in the body", isCorrect: false },
            { id: "b", text: "400 Bad Request", isCorrect: false, explanation: "FastAPI specifically uses 422, not 400, for validation errors." },
            { id: "c", text: "422 Unprocessable Entity with field-level error details", isCorrect: true, explanation: "Correct — 422 includes a `detail` list explaining exactly which fields failed." },
            { id: "d", text: "500 Internal Server Error", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "FastAPI follows the HTTP spec: 422 is for requests that are syntactically valid but semantically wrong." }],
          feedback: { correct: "Correct — 422 with structured error details.", incorrect: "FastAPI specifically returns 422 Unprocessable Entity for validation failures." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-body-debug", "s45-body-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.6 Response formats ────────────────────────────────────────────────
    {
      id: "s45-response-formats",
      stageId: "stage-45",
      title: "Response Formats",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Declare Pydantic response models to filter and shape output",
        "Return different content types (JSON, plain text, HTML)",
        "Understand content negotiation via the Accept header",
      ],
      prerequisites: ["s45-request-bodies"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Response Formats\n\nAPIs can return different formats depending on the client's `Accept` header. The most common for machine-to-machine communication is **JSON**. For browser clients you might return HTML; for exports, CSV or PDF.\n\nFastAPI lets you declare a `response_model` on any route — this Pydantic model acts as a filter, ensuring only fields you explicitly expose are included in the response.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI
from fastapi.responses import PlainTextResponse, HTMLResponse
from pydantic import BaseModel

app = FastAPI()

class UserDB(BaseModel):       # internal model (has password_hash)
    id: int
    email: str
    password_hash: str

class UserOut(BaseModel):      # public model (no password_hash)
    id: int
    email: str

@app.get("/users/{uid}", response_model=UserOut)
def get_user(uid: int):
    db_user = UserDB(id=uid, email="a@b.com", password_hash="secret!")
    return db_user  # FastAPI strips password_hash automatically

@app.get("/ping", response_class=PlainTextResponse)
def ping():
    return "pong"`,
          caption: "`response_model` filters output; `response_class` changes content type",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never leak internal fields",
          body: "Always declare a response_model that excludes sensitive fields (passwords, tokens, internal IDs). Returning the raw ORM object can accidentally expose data.",
        },
        {
          kind: "why-matters",
          body: "Response models give you a security boundary between your internal data layer and the public API — critical for production services.",
        },
      ],
      interactions: [
        {
          id: "s45-response-predict",
          kind: "predict-output",
          prompt: "What fields will the JSON response contain given this response_model?",
          beginnerPurpose: "Understand how response_model filters output",
          expectedConceptIds: ["json-api"],
          code:
`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Full(BaseModel):
    id: int
    name: str
    internal_code: str

class Public(BaseModel):
    id: int
    name: str

@app.get("/item", response_model=Public)
def item():
    return Full(id=1, name="Widget", internal_code="X99")`,
          expectedOutput: '{"id": 1, "name": "Widget"}',
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "`response_model=Public` means only fields on `Public` are included." }],
          feedback: { correct: "Correct — `internal_code` is stripped.", incorrect: "The `response_model` controls which fields are returned, not the object you pass." },
        },
        {
          id: "s45-response-mc",
          kind: "multiple-choice",
          prompt: "A client sends `Accept: text/plain`. Which FastAPI response class should you use to honour this?",
          beginnerPurpose: "Match response classes to content types",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "JSONResponse", isCorrect: false },
            { id: "b", text: "PlainTextResponse", isCorrect: true, explanation: "Correct — PlainTextResponse sets Content-Type: text/plain." },
            { id: "c", text: "HTMLResponse", isCorrect: false },
            { id: "d", text: "StreamingResponse", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The class name matches the content type." }],
          feedback: { correct: "Right!", incorrect: "Match the class name to the content type the client requested." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-response-predict", "s45-response-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.7 JSON APIs ───────────────────────────────────────────────────────
    {
      id: "s45-json-apis",
      stageId: "stage-45",
      title: "JSON APIs",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Apply REST conventions (nouns, HTTP methods, status codes)",
        "Design resource-oriented URL structures",
        "Implement full CRUD for a resource",
      ],
      prerequisites: ["s45-response-formats"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## JSON APIs and REST Conventions\n\nREST (Representational State Transfer) is an architectural style for web APIs. Key conventions:\n\n| Method | Path | Action |\n|--------|------|--------|\n| GET | /items | List all |\n| POST | /items | Create one |\n| GET | /items/{id} | Get one |\n| PUT | /items/{id} | Replace one |\n| PATCH | /items/{id} | Partial update |\n| DELETE | /items/{id} | Delete one |\n\nJSON is the de facto body format. Keep responses consistent: always include an `id`, use snake_case keys, ISO 8601 for dates.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
db: dict[int, dict] = {}
_next_id = 1

class Item(BaseModel):
    name: str
    price: float

@app.get("/items")
def list_items(): return list(db.values())

@app.post("/items", status_code=201)
def create_item(item: Item):
    global _next_id
    row = {"id": _next_id, **item.model_dump()}
    db[_next_id] = row
    _next_id += 1
    return row

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id not in db:
        raise HTTPException(404, "Item not found")
    return db[item_id]

@app.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int):
    if item_id not in db:
        raise HTTPException(404, "Item not found")
    del db[item_id]`,
          caption: "Full CRUD REST API in FastAPI",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "PUT vs PATCH",
          body: "PUT replaces the entire resource (all fields required). PATCH applies a partial update (only send fields you want to change). Use PATCH for large resources where sending all fields is wasteful.",
        },
        {
          kind: "why-matters",
          body: "REST conventions are universally understood by API consumers. Following them reduces the learning curve for your API to near zero.",
        },
      ],
      interactions: [
        {
          id: "s45-json-mc",
          kind: "multiple-choice",
          prompt: "A client wants to update only the `price` field of item 5 without changing `name`. Which method and URL are correct?",
          beginnerPurpose: "Distinguish PUT from PATCH",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "PUT /items/5 with only price in the body", isCorrect: false, explanation: "PUT means replace the whole resource — missing name would be an error." },
            { id: "b", text: "PATCH /items/5 with only price in the body", isCorrect: true, explanation: "Correct — PATCH applies partial updates." },
            { id: "c", text: "POST /items/5/update-price", isCorrect: false, explanation: "Avoid action verbs in URLs; use PATCH instead." },
            { id: "d", text: "GET /items/5?price=9.99", isCorrect: false, explanation: "GET must not have side effects." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about which HTTP method is designed for partial updates." }],
          feedback: { correct: "Right — PATCH for partial updates.", incorrect: "PATCH is the HTTP method for partial updates." },
        },
        {
          id: "s45-json-fill",
          kind: "fill-code",
          prompt: "Complete the delete handler: return 204 No Content and raise 404 if not found.",
          beginnerPurpose: "Implement a DELETE endpoint with correct status codes",
          expectedConceptIds: ["json-api"],
          codeTemplate:
`from fastapi import FastAPI, HTTPException
app = FastAPI()
db = {1: {"id": 1, "name": "A"}}

@app.delete("/items/{item_id}", status_code=___BLANK_1___)
def delete_item(item_id: int):
    if item_id not in db:
        raise HTTPException(___BLANK_2___, "Not found")
    del db[item_id]`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "204", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "404", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Deletion returns 204 on success, 404 when the resource does not exist." }],
          feedback: { correct: "Correct status codes!", incorrect: "Deletion success = 204, not found = 404." },
        },
      ],
      reviewHooks: [
        { conceptId: "json-api", recallPrompt: "List the six standard REST operations and their HTTP methods.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s45-json-mc", "s45-json-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.8 Validation ──────────────────────────────────────────────────────
    {
      id: "s45-validation",
      stageId: "stage-45",
      title: "Validation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use Pydantic field validators and model validators",
        "Return structured 422 responses with field-level errors",
        "Write custom validator logic for business rules",
      ],
      prerequisites: ["s45-json-apis"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Validation\n\nValidation ensures incoming data meets your expectations before your business logic touches it. Pydantic v2 provides:\n\n- **Field constraints** — `min_length`, `gt`, `regex`, `max_items`\n- **`@field_validator`** — custom single-field logic\n- **`@model_validator`** — cross-field logic (e.g., end_date > start_date)\n\nAlways validate at the boundary — the handler function — not deep in business logic.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from pydantic import BaseModel, Field, field_validator, model_validator
from datetime import date

class BookingRequest(BaseModel):
    room_id: int = Field(gt=0)
    check_in: date
    check_out: date
    guests: int = Field(ge=1, le=10)

    @field_validator("check_in")
    @classmethod
    def not_in_past(cls, v: date) -> date:
        if v < date.today():
            raise ValueError("check_in cannot be in the past")
        return v

    @model_validator(mode="after")
    def checkout_after_checkin(self) -> "BookingRequest":
        if self.check_out <= self.check_in:
            raise ValueError("check_out must be after check_in")
        return self`,
          caption: "Field and model validators in Pydantic v2",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Validate early, fail fast",
          body: "Validate all inputs at the HTTP boundary. If you only check constraints inside database calls, you get cryptic DB errors instead of clean 422 responses.",
        },
        {
          kind: "why-matters",
          body: "Good validation protects your database from corrupt data, prevents security issues (e.g., negative prices, future-dated transactions), and provides clear error messages to API consumers.",
        },
      ],
      interactions: [
        {
          id: "s45-val-debug",
          kind: "debug-code",
          prompt: "The validator below never triggers even when `age` is negative. Fix it.",
          beginnerPurpose: "Correctly apply Pydantic field validators",
          expectedConceptIds: ["json-api"],
          brokenCode:
`from pydantic import BaseModel, field_validator

class Person(BaseModel):
    name: str
    age: int

    def validate_age(cls, v):
        if v < 0:
            raise ValueError("age must be non-negative")
        return v`,
          bugDescription: "The validator is missing the `@field_validator('age')` and `@classmethod` decorators, so Pydantic does not register it.",
          fixedCode:
`from pydantic import BaseModel, field_validator

class Person(BaseModel):
    name: str
    age: int

    @field_validator("age")
    @classmethod
    def validate_age(cls, v):
        if v < 0:
            raise ValueError("age must be non-negative")
        return v`,
          errorType: "ValueError",
          allowedAttempts: 4,
          hints: [{ level: "syntax", text: "Pydantic requires `@field_validator('field_name')` and `@classmethod` decorators." }],
          feedback: { correct: "Correct — both decorators are required.", incorrect: "Add the `@field_validator('age')` and `@classmethod` decorators." },
        },
        {
          id: "s45-val-mc",
          kind: "multiple-choice",
          prompt: "When should you use `@model_validator` instead of `@field_validator`?",
          beginnerPurpose: "Know which validator type to use for cross-field rules",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "When you want to validate a single field's format", isCorrect: false },
            { id: "b", text: "When the rule depends on the values of two or more fields together", isCorrect: true, explanation: "Model validators run after all fields are set, so you can compare them." },
            { id: "c", text: "When you want to set a field default dynamically", isCorrect: false },
            { id: "d", text: "When you need to call an external API for validation", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about end_date > start_date — you need both fields." }],
          feedback: { correct: "Correct — cross-field rules need a model validator.", incorrect: "When a rule requires comparing two fields, use @model_validator." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-val-debug", "s45-val-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.9 Authentication concepts ─────────────────────────────────────────
    {
      id: "s45-authentication-concepts",
      stageId: "stage-45",
      title: "Authentication Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish authentication from authorisation",
        "Describe how JWT tokens work at a high level",
        "Implement bearer token extraction with FastAPI dependencies",
      ],
      prerequisites: ["s45-validation"],
      concepts: ["web-authentication"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Authentication Concepts\n\n**Authentication** answers: *who are you?* \n**Authorisation** answers: *what are you allowed to do?*\n\nCommon authentication mechanisms:\n\n| Mechanism | How it works |\n|-----------|-------------|\n| Session cookies | Server stores session; client sends cookie |\n| API keys | Client sends a secret key in a header |\n| JWT (JSON Web Token) | Client sends a signed token; server verifies signature |\n| OAuth2 | Delegate authentication to a third party (Google, GitHub) |\n\nJWTs are stateless — the server doesn't need a database lookup to verify them.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

app = FastAPI()
security = HTTPBearer()
VALID_TOKENS = {"secret-token-123"}

def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(security),
):
    token = creds.credentials
    if token not in VALID_TOKENS:
        raise HTTPException(401, "Invalid token")
    return {"user": "alice"}

@app.get("/me")
def me(user = Depends(get_current_user)):
    return user`,
          caption: "Bearer token authentication with FastAPI Depends",
        },
        {
          kind: "mental-model",
          title: "JWT as a signed ID badge",
          analogy: "A JWT is like a photo ID badge issued by HR (the auth server). Anyone with the HR stamp verification key can confirm the badge is genuine without calling HR again.",
          explanation: "The server signs the token with a secret key. Any server that knows the key can verify the signature — no database lookup needed. Expiry is encoded in the token itself.",
        },
        {
          kind: "why-matters",
          body: "Authentication is the foundation of API security. Getting it wrong exposes user data; over-engineering it slows development. Understanding the trade-offs between session cookies, API keys, and JWTs helps you pick the right tool.",
        },
      ],
      interactions: [
        {
          id: "s45-auth-mc",
          kind: "multiple-choice",
          prompt: "A user is logged in but tries to delete another user's data and gets a 403. Which security concept does this illustrate?",
          beginnerPurpose: "Distinguish authentication from authorisation",
          expectedConceptIds: ["web-authentication"],
          options: [
            { id: "a", text: "Authentication failure — the token is invalid", isCorrect: false },
            { id: "b", text: "Authorisation failure — the user lacks permission for that action", isCorrect: true, explanation: "The user is authenticated (logged in) but not authorised (no permission) for that resource." },
            { id: "c", text: "Rate limiting — too many requests", isCorrect: false },
            { id: "d", text: "CORS restriction", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Authentication = identity. Authorisation = permission." }],
          feedback: { correct: "Correct — 403 Forbidden is an authorisation error.", incorrect: "The user IS authenticated. The issue is permission, which is authorisation." },
        },
        {
          id: "s45-auth-explain",
          kind: "plain-language-explain",
          prompt: "Explain how a JWT allows a server to verify a user's identity without querying a database on every request.",
          beginnerPurpose: "Understand stateless authentication",
          expectedConceptIds: ["web-authentication"],
          code:
`# JWT structure (base64-decoded):
# Header: {"alg": "HS256", "typ": "JWT"}
# Payload: {"sub": "user_42", "exp": 1700000000}
# Signature: HMAC-SHA256(header + payload, SECRET_KEY)`,
          keyPointsToHit: [
            "The server signs the token with a secret key when issuing it",
            "The client sends the token on every request",
            "The server re-computes the signature and compares — no DB lookup",
            "Expiry is stored inside the token itself",
          ],
          sampleAnswer: "When a user logs in, the server creates a JWT and signs it with a secret key only the server knows. The signature is a hash of the token's contents. On every subsequent request, the server recomputes the hash and checks it matches — if someone tampered with the token, the signature won't match. The expiry timestamp is inside the token, so no database check is needed.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Focus on why the server doesn't need to look up the token in a database." }],
          feedback: { correct: "Great explanation of stateless auth!", incorrect: "Make sure you explain both signing and verification." },
        },
      ],
      reviewHooks: [
        { conceptId: "web-authentication", recallPrompt: "What is the difference between authentication and authorisation?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s45-auth-mc", "s45-auth-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.10 Authorization concepts ─────────────────────────────────────────
    {
      id: "s45-authorization-concepts",
      stageId: "stage-45",
      title: "Authorization Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Implement role-based access control (RBAC) with FastAPI dependencies",
        "Enforce resource ownership (user can only edit their own data)",
        "Understand the principle of least privilege",
      ],
      prerequisites: ["s45-authentication-concepts"],
      concepts: ["web-authentication"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Authorization Concepts\n\nOnce you know *who* a user is, you must determine *what they can do*. Two common models:\n\n**RBAC (Role-Based Access Control)** — users have roles (`admin`, `editor`, `viewer`). Each route requires a minimum role.\n\n**Resource ownership** — a user can only access resources they own. Check `resource.owner_id == current_user.id`.\n\n**Principle of Least Privilege** — grant only the permissions needed for a task, nothing more.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, Depends, HTTPException

app = FastAPI()

# Simulated current user (from JWT in real app)
def get_current_user():
    return {"id": 1, "role": "editor"}

def require_admin(user = Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(403, "Admin only")
    return user

@app.delete("/admin/users/{uid}")
def admin_delete_user(uid: int, _=Depends(require_admin)):
    return {"deleted": uid}

# Resource ownership check:
def can_edit_post(post_id: int, user = Depends(get_current_user)):
    post = {"id": post_id, "owner_id": 1}  # fetched from DB
    if post["owner_id"] != user["id"]:
        raise HTTPException(403, "Not your post")
    return post`,
          caption: "RBAC and ownership checks as FastAPI dependencies",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Never trust client-supplied user IDs",
          body: "Always derive the user's identity from the verified token, not from a `?user_id=` query param the client sends. A malicious client will send any ID they want.",
        },
        {
          kind: "why-matters",
          body: "Authorisation bugs are the leading cause of data breaches in web apps. Checking permissions in a reusable FastAPI dependency means you can't forget to add it.",
        },
      ],
      interactions: [
        {
          id: "s45-authz-mc",
          kind: "multiple-choice",
          prompt: "A user with role `editor` calls `DELETE /admin/users/5`. Using the code from this lesson, what happens?",
          beginnerPurpose: "Trace role-based access control logic",
          expectedConceptIds: ["web-authentication"],
          options: [
            { id: "a", text: "The user is deleted successfully", isCorrect: false },
            { id: "b", text: "HTTP 403 Forbidden is returned", isCorrect: true, explanation: "The require_admin dependency raises 403 because role is 'editor', not 'admin'." },
            { id: "c", text: "HTTP 401 Unauthorized is returned", isCorrect: false, explanation: "401 means unauthenticated; 403 means authenticated but forbidden." },
            { id: "d", text: "HTTP 404 Not Found is returned", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Trace through `require_admin`: what does it do when role != 'admin'?" }],
          feedback: { correct: "Correct — 403 Forbidden for insufficient permissions.", incorrect: "Follow the require_admin dependency to see what it raises." },
        },
        {
          id: "s45-authz-fill",
          kind: "fill-code",
          prompt: "Fill in the ownership check so users can only view their own profile.",
          beginnerPurpose: "Implement resource ownership enforcement",
          expectedConceptIds: ["web-authentication"],
          codeTemplate:
`from fastapi import FastAPI, Depends, HTTPException
app = FastAPI()

def get_current_user():
    return {"id": 42}

@app.get("/users/{user_id}/profile")
def get_profile(user_id: int, current_user=Depends(get_current_user)):
    if user_id ___BLANK_1___ current_user["id"]:
        raise HTTPException(___BLANK_2___, "Not your profile")
    return {"profile": "data"}`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "!=", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "403", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "If the requested user_id is NOT the current user's id, deny access with 403." }],
          feedback: { correct: "Correct ownership check!", incorrect: "Use `!=` to detect mismatches, and 403 to deny." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-authz-mc", "s45-authz-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.11 Sessions ───────────────────────────────────────────────────────
    {
      id: "s45-sessions",
      stageId: "stage-45",
      title: "Sessions",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain server-side sessions and how they differ from JWTs",
        "Use Starlette session middleware in a FastAPI app",
        "Understand session fixation and how to prevent it",
      ],
      prerequisites: ["s45-authorization-concepts"],
      concepts: ["web-authentication"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Sessions\n\nA **session** is a server-side dictionary keyed by a session ID stored in a cookie. On each request the client sends the session ID; the server looks up the data.\n\n**Sessions vs JWTs:**\n- Sessions store data server-side — easy to revoke, but requires shared storage (Redis) for multiple servers\n- JWTs store data in the token — stateless, scalable, but hard to revoke before expiry",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, Request
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="change-in-prod!")

@app.post("/login")
def login(request: Request, username: str):
    # In real app: verify username/password against DB
    request.session["user"] = username
    return {"message": "logged in"}

@app.get("/dashboard")
def dashboard(request: Request):
    user = request.session.get("user")
    if not user:
        return {"error": "not logged in"}
    return {"welcome": user}

@app.post("/logout")
def logout(request: Request):
    request.session.clear()
    return {"message": "logged out"}`,
          caption: "Server-side sessions with Starlette SessionMiddleware",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Regenerate session ID after login",
          body: "Session fixation attacks exploit a predictable session ID. After a successful login, always generate a new session ID to prevent an attacker from pre-seeding a session.",
        },
        {
          kind: "why-matters",
          body: "Sessions are simpler than JWTs for traditional web applications with server-rendered HTML. They also support instant revocation — just delete the session from the store.",
        },
      ],
      interactions: [
        {
          id: "s45-session-mc",
          kind: "multiple-choice",
          prompt: "You need to immediately invalidate all sessions for a compromised user account. Which approach is easier?",
          beginnerPurpose: "Compare session vs JWT revocation",
          expectedConceptIds: ["web-authentication"],
          options: [
            { id: "a", text: "Server-side sessions — delete the session record from the store", isCorrect: true, explanation: "Correct — server-side sessions can be deleted instantly." },
            { id: "b", text: "JWTs — update the token payload", isCorrect: false, explanation: "JWTs are stateless; you cannot update already-issued tokens without a blocklist." },
            { id: "c", text: "Both are equally easy", isCorrect: false },
            { id: "d", text: "Neither supports revocation", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which approach stores state on the server?" }],
          feedback: { correct: "Correct — server-side sessions are trivially revocable.", incorrect: "Think about where the session data lives for each approach." },
        },
        {
          id: "s45-session-predict",
          kind: "predict-output",
          prompt: "What does the `/dashboard` endpoint return when called WITHOUT first calling `/login`?",
          beginnerPurpose: "Trace session state across requests",
          expectedConceptIds: ["web-authentication"],
          code:
`# Request: GET /dashboard  (no prior login, no session cookie)
# Using the session middleware code from this lesson`,
          expectedOutput: '{"error": "not logged in"}',
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "What does `request.session.get('user')` return when the session is empty?" }],
          feedback: { correct: "Correct — no session means no user.", incorrect: "Without a prior login, the session has no 'user' key." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-session-mc", "s45-session-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.12 Cookies ────────────────────────────────────────────────────────
    {
      id: "s45-cookies",
      stageId: "stage-45",
      title: "Cookies",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Set and read cookies in FastAPI responses and requests",
        "Apply security attributes: HttpOnly, Secure, SameSite",
        "Explain when cookies are preferable to Authorization headers",
      ],
      prerequisites: ["s45-sessions"],
      concepts: ["web-authentication"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Cookies\n\nCookies are key-value strings stored in the browser and automatically sent on every request to the same origin. They are the underlying transport for session IDs.\n\nCritical security attributes:\n- **HttpOnly** — cookie is inaccessible to JavaScript (prevents XSS token theft)\n- **Secure** — only sent over HTTPS\n- **SameSite=Strict/Lax** — prevents CSRF by restricting cross-origin sending",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, Response, Cookie

app = FastAPI()

@app.post("/set-pref")
def set_preference(response: Response, theme: str = "dark"):
    response.set_cookie(
        key="theme",
        value=theme,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=60 * 60 * 24 * 30,  # 30 days
    )
    return {"theme": theme}

@app.get("/get-pref")
def get_preference(theme: str | None = Cookie(default=None)):
    return {"theme": theme or "default"}`,
          caption: "Setting and reading cookies with security attributes",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never store sensitive data in plain cookies",
          body: "Cookies are readable by the browser (unless HttpOnly). Never store passwords, full JWTs with admin scope, or PII in cookies. Use session IDs that reference server-side data instead.",
        },
        {
          kind: "why-matters",
          body: "Cookies with correct security attributes are the safest way to persist session state for browser clients — safer than storing tokens in localStorage, which is accessible to XSS attacks.",
        },
      ],
      interactions: [
        {
          id: "s45-cookie-mc",
          kind: "multiple-choice",
          prompt: "Which cookie attribute prevents JavaScript from reading the cookie value, protecting against XSS attacks?",
          beginnerPurpose: "Identify the purpose of the HttpOnly attribute",
          expectedConceptIds: ["web-authentication"],
          options: [
            { id: "a", text: "Secure", isCorrect: false, explanation: "Secure means HTTPS-only transmission, not JS inaccessibility." },
            { id: "b", text: "HttpOnly", isCorrect: true, explanation: "Correct — HttpOnly makes the cookie invisible to document.cookie in JavaScript." },
            { id: "c", text: "SameSite=Strict", isCorrect: false, explanation: "SameSite prevents CSRF, not XSS." },
            { id: "d", text: "Max-Age", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The attribute name gives it away — which one is about HTTP-only access?" }],
          feedback: { correct: "Correct — HttpOnly blocks JavaScript access.", incorrect: "HttpOnly is the attribute that blocks JavaScript from reading the cookie." },
        },
        {
          id: "s45-cookie-fill",
          kind: "fill-code",
          prompt: "Set a session cookie that is HttpOnly, Secure, SameSite=lax, and expires in 1 hour.",
          beginnerPurpose: "Practice setting all security attributes on a cookie",
          expectedConceptIds: ["web-authentication"],
          codeTemplate:
`response.set_cookie(
    key="session_id",
    value="abc123",
    httponly=___BLANK_1___,
    secure=True,
    samesite="lax",
    max_age=___BLANK_2___,
)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "True", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "3600", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "1 hour = 60 * 60 = 3600 seconds." }],
          feedback: { correct: "Correct security attributes!", incorrect: "httponly=True and max_age=3600 (1 hour in seconds)." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-cookie-mc", "s45-cookie-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.13 CORS ───────────────────────────────────────────────────────────
    {
      id: "s45-cors",
      stageId: "stage-45",
      title: "CORS",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain why browsers enforce the same-origin policy",
        "Configure CORS middleware in FastAPI",
        "Avoid overly permissive CORS settings in production",
      ],
      prerequisites: ["s45-cookies"],
      concepts: ["web-authentication"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## CORS (Cross-Origin Resource Sharing)\n\nBrowsers enforce the **same-origin policy**: a script at `app.example.com` cannot call `api.example.com` unless the API explicitly permits it via CORS headers.\n\nWhen a browser makes a cross-origin request it sends an `Origin` header. The server responds with `Access-Control-Allow-Origin`. For non-simple requests (e.g., JSON POST) the browser first sends a **preflight** `OPTIONS` request.\n\nCORS is a browser security feature — non-browser clients (curl, Python requests) are not affected.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.example.com"],  # specific origins only
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)`,
          caption: "Restrictive CORS configuration for production",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never use allow_origins=['*'] in production with credentials",
          body: "Wildcard origins with `allow_credentials=True` is invalid per the spec and exposes your API to CSRF attacks. Always list explicit origins in production.",
        },
        {
          kind: "why-matters",
          body: "Misconfigured CORS is a common security vulnerability. Too restrictive: your frontend can't call the API. Too permissive: attackers can make cross-origin requests on behalf of your users.",
        },
      ],
      interactions: [
        {
          id: "s45-cors-mc",
          kind: "multiple-choice",
          prompt: "A browser at `https://frontend.com` makes a CORS request to `https://api.com/data`. Who enforces the CORS policy?",
          beginnerPurpose: "Understand who enforces CORS",
          expectedConceptIds: ["web-authentication"],
          options: [
            { id: "a", text: "The API server rejects the request", isCorrect: false, explanation: "The server sends CORS headers but doesn't block the request itself." },
            { id: "b", text: "The browser blocks the response if CORS headers are missing or incorrect", isCorrect: true, explanation: "Correct — CORS is enforced by the browser, not the server." },
            { id: "c", text: "The CDN between client and server", isCorrect: false },
            { id: "d", text: "The OS network stack", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "curl can call any API cross-origin. What's different about browsers?" }],
          feedback: { correct: "Correct — browsers enforce CORS; curl doesn't.", incorrect: "CORS is a browser security feature; the browser decides whether to expose the response." },
        },
        {
          id: "s45-cors-fill",
          kind: "fill-code",
          prompt: "Configure CORS to allow only `https://myapp.io` and permit GET and POST methods.",
          beginnerPurpose: "Practice restrictive CORS configuration",
          expectedConceptIds: ["web-authentication"],
          codeTemplate:
`app.add_middleware(
    CORSMiddleware,
    allow_origins=[___BLANK_1___],
    allow_methods=["GET", ___BLANK_2___],
)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: '"https://myapp.io"', caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: '"POST"', caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Both values are strings in Python lists." }],
          feedback: { correct: "Correct restrictive CORS config!", incorrect: "Use string literals for the origin URL and method name." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-cors-mc", "s45-cors-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.14 CSRF ───────────────────────────────────────────────────────────
    {
      id: "s45-csrf",
      stageId: "stage-45",
      title: "CSRF",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain how CSRF attacks work",
        "Implement the synchroniser token pattern",
        "Know when SameSite cookies are sufficient",
      ],
      prerequisites: ["s45-cors"],
      concepts: ["web-authentication"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## CSRF (Cross-Site Request Forgery)\n\nCSRF tricks a logged-in user's browser into making an unintended request to your API. Example: an evil page contains `<form action='https://bank.com/transfer' method='POST'>` — the browser automatically sends the user's session cookie.\n\n**Mitigations:**\n1. **SameSite=Strict/Lax** cookies — browser won't send cookies on cross-origin POSTs (modern, simple)\n2. **CSRF token** — include a secret token in forms; server verifies it\n3. **Custom header check** — require `X-Requested-With: XMLHttpRequest`; browsers can't set this cross-origin on simple forms",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, Request, HTTPException

app = FastAPI()

# Simple double-submit cookie pattern
@app.post("/transfer")
async def transfer(request: Request):
    # Check that the CSRF token in the header matches the cookie
    cookie_token = request.cookies.get("csrf_token")
    header_token = request.headers.get("X-CSRF-Token")
    if not cookie_token or cookie_token != header_token:
        raise HTTPException(403, "CSRF token mismatch")
    return {"transferred": True}`,
          caption: "Double-submit cookie CSRF protection pattern",
        },
        {
          kind: "callout",
          variant: "info",
          title: "JSON APIs are naturally less CSRF-vulnerable",
          body: "A browser can't send a cross-origin `Content-Type: application/json` POST without a preflight OPTIONS request, which CORS blocks. Pure JSON APIs using the Authorization header (not cookies) are immune to CSRF.",
        },
        {
          kind: "why-matters",
          body: "CSRF is still a real threat for cookie-based web apps. Understanding it prevents costly vulnerabilities in session-based applications.",
        },
      ],
      interactions: [
        {
          id: "s45-csrf-mc",
          kind: "multiple-choice",
          prompt: "Your API uses only JWT bearer tokens in the Authorization header (no cookies). Do you need CSRF protection?",
          beginnerPurpose: "Understand when CSRF applies",
          expectedConceptIds: ["web-authentication"],
          options: [
            { id: "a", text: "Yes — CSRF affects all APIs", isCorrect: false },
            { id: "b", text: "No — CSRF exploits automatic cookie sending; bearer tokens are not sent automatically by browsers", isCorrect: true, explanation: "Correct — a malicious page can't access or send Authorization headers cross-origin." },
            { id: "c", text: "Only if you use HTTPS", isCorrect: false },
            { id: "d", text: "Yes — but only for DELETE requests", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What does a browser send automatically on every request to a domain?" }],
          feedback: { correct: "Correct — CSRF exploits automatic cookie sending.", incorrect: "Think about what a browser does with cookies vs Authorization headers on cross-origin requests." },
        },
        {
          id: "s45-csrf-explain",
          kind: "plain-language-explain",
          prompt: "Explain a CSRF attack to a developer who has never heard of it. Use a concrete banking example.",
          beginnerPurpose: "Understand the attack vector for CSRF",
          expectedConceptIds: ["web-authentication"],
          code:
`<!-- Malicious page on evil.com -->
<form action="https://bank.com/transfer" method="POST">
  <input name="to" value="attacker_account">
  <input name="amount" value="1000">
</form>
<script>document.forms[0].submit()</script>`,
          keyPointsToHit: [
            "Browser automatically sends session cookies to bank.com",
            "The form is submitted from evil.com without user interaction",
            "The bank's server sees a valid session and executes the transfer",
          ],
          sampleAnswer: "A CSRF attack works because browsers automatically include cookies when submitting to a domain. An attacker puts a hidden form on their evil website that submits to bank.com/transfer. When the victim visits the evil page while logged into the bank, the browser submits the form with the real session cookie — the bank can't tell it wasn't intentional.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Focus on the automatic cookie behavior of browsers." }],
          feedback: { correct: "Clear explanation!", incorrect: "Emphasise that the browser sends cookies automatically, enabling the attack." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-csrf-mc", "s45-csrf-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.15 Rate limiting ──────────────────────────────────────────────────
    {
      id: "s45-rate-limiting",
      stageId: "stage-45",
      title: "Rate Limiting",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain why rate limiting is needed",
        "Implement a simple in-memory rate limiter with FastAPI middleware",
        "Return 429 Too Many Requests with Retry-After header",
      ],
      prerequisites: ["s45-csrf"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Rate Limiting\n\nRate limiting caps how many requests a client can make in a time window. Common algorithms:\n\n- **Fixed window** — reset counter at fixed intervals (simple, bursty)\n- **Sliding window** — smooth average over a rolling period (fairer)\n- **Token bucket** — refill tokens continuously; clients spend tokens per request (most flexible)\n\nReturn **429 Too Many Requests** with a `Retry-After` header indicating when to try again.",
        },
        {
          kind: "code",
          language: "python",
          code:
`import time
from collections import defaultdict
from fastapi import FastAPI, Request, HTTPException

app = FastAPI()

# Simple in-memory fixed-window rate limiter
_requests: dict[str, list[float]] = defaultdict(list)
LIMIT = 5        # requests
WINDOW = 60.0   # seconds

@app.middleware("http")
async def rate_limit(request: Request, call_next):
    ip = request.client.host
    now = time.time()
    window_start = now - WINDOW
    # Remove old timestamps
    _requests[ip] = [t for t in _requests[ip] if t > window_start]
    if len(_requests[ip]) >= LIMIT:
        raise HTTPException(
            429,
            "Too many requests",
            headers={"Retry-After": str(int(WINDOW))},
        )
    _requests[ip].append(now)
    return await call_next(request)`,
          caption: "Fixed-window rate limiter as ASGI middleware",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "In-memory limiters don't scale",
          body: "The in-memory approach only works for a single process. Production systems use Redis with atomic INCR commands to share counters across multiple server instances.",
        },
        {
          kind: "why-matters",
          body: "Without rate limiting, a single abusive client can exhaust your server resources. Rate limiting also prevents credential-stuffing attacks and runaway API consumers.",
        },
      ],
      interactions: [
        {
          id: "s45-rl-mc",
          kind: "multiple-choice",
          prompt: "A client makes 6 requests in 60 seconds, and your limit is 5/minute. What status code do they receive on the 6th request?",
          beginnerPurpose: "Identify the correct HTTP status code for rate limit violations",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "403 Forbidden", isCorrect: false },
            { id: "b", text: "404 Not Found", isCorrect: false },
            { id: "c", text: "429 Too Many Requests", isCorrect: true, explanation: "Correct — 429 is the standard code for rate limit exceeded." },
            { id: "d", text: "503 Service Unavailable", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "HTTP 429 was specifically added to the spec for rate limiting." }],
          feedback: { correct: "Correct — 429 Too Many Requests.", incorrect: "HTTP 429 is the standardised code for rate limit exceeded." },
        },
        {
          id: "s45-rl-fill",
          kind: "fill-code",
          prompt: "Complete the rate limit response to include a `Retry-After` header set to 60 seconds.",
          beginnerPurpose: "Practice returning the correct rate-limit response headers",
          expectedConceptIds: ["json-api"],
          codeTemplate:
`raise HTTPException(
    ___BLANK_1___,
    "Too many requests",
    headers={"Retry-After": ___BLANK_2___},
)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "429", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: '"60"', caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The status code is 429; Retry-After value is a string number of seconds." }],
          feedback: { correct: "Correct!", incorrect: "Status 429, Retry-After as a string." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-rl-mc", "s45-rl-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.16 Pagination ─────────────────────────────────────────────────────
    {
      id: "s45-pagination",
      stageId: "stage-45",
      title: "Pagination",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Implement offset/limit pagination",
        "Implement cursor-based pagination for large datasets",
        "Include pagination metadata in API responses",
      ],
      prerequisites: ["s45-rate-limiting"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Pagination\n\nReturning all records in a single response is rarely feasible. Two common strategies:\n\n**Offset/Limit** — `?skip=20&limit=10`. Simple but slow on large tables (database must scan all skipped rows).\n\n**Cursor-based** — `?after=<last_id>&limit=10`. Uses the last record's ID as a bookmark. Fast even on huge tables because it uses an indexed lookup.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, Query

app = FastAPI()
ITEMS = [{"id": i, "name": f"Item {i}"} for i in range(1, 101)]

# Offset / limit
@app.get("/items/offset")
def list_offset(skip: int = 0, limit: int = 10):
    page = ITEMS[skip: skip + limit]
    return {
        "data": page,
        "total": len(ITEMS),
        "skip": skip,
        "limit": limit,
        "has_more": skip + limit < len(ITEMS),
    }

# Cursor-based
@app.get("/items/cursor")
def list_cursor(after: int = 0, limit: int = 10):
    page = [i for i in ITEMS if i["id"] > after][:limit]
    next_cursor = page[-1]["id"] if len(page) == limit else None
    return {"data": page, "next_cursor": next_cursor}`,
          caption: "Offset/limit vs cursor-based pagination",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always include has_more or next_cursor",
          body: "Clients need to know whether there are more pages. Include `has_more: bool` or `next_cursor: str | null` in every paginated response.",
        },
        {
          kind: "why-matters",
          body: "Pagination is mandatory for any list endpoint that could return more than a few dozen records. Without it, a single request can crash your server or time out the client.",
        },
      ],
      interactions: [
        {
          id: "s45-page-mc",
          kind: "multiple-choice",
          prompt: "For a table with 10 million rows, which pagination strategy performs better at page 500,000?",
          beginnerPurpose: "Compare performance of offset vs cursor pagination at scale",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "Offset/limit — it's simpler and databases are optimised for it", isCorrect: false, explanation: "OFFSET 5,000,000 forces the DB to count and discard millions of rows." },
            { id: "b", text: "Cursor-based — uses an indexed ID lookup regardless of page number", isCorrect: true, explanation: "Correct — `WHERE id > cursor` hits an index and is O(1) regardless of depth." },
            { id: "c", text: "Both perform equally well", isCorrect: false },
            { id: "d", text: "Neither — you must cache all results", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what a database must do to skip 5 million rows." }],
          feedback: { correct: "Correct — cursor pagination scales; offset doesn't.", incorrect: "OFFSET 5,000,000 is very expensive for the database." },
        },
        {
          id: "s45-page-fill",
          kind: "fill-code",
          prompt: "Complete the offset pagination response to include `has_more`.",
          beginnerPurpose: "Build a complete pagination metadata response",
          expectedConceptIds: ["json-api"],
          codeTemplate:
`total = 100
skip = 20
limit = 10
data = []  # imagine fetched items

return {
    "data": data,
    "total": total,
    "has_more": ___BLANK_1___,
}`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "skip + limit < total", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "There are more items if the end of the current page hasn't reached the total." }],
          feedback: { correct: "Correct formula for has_more!", incorrect: "has_more is True when skip + limit < total." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-page-mc", "s45-page-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.17 Background jobs ────────────────────────────────────────────────
    {
      id: "s45-background-jobs",
      stageId: "stage-45",
      title: "Background Jobs",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Offload slow work to background tasks using FastAPI BackgroundTasks",
        "Explain when to use a task queue (Celery, RQ) instead",
        "Return 202 Accepted for async job endpoints",
      ],
      prerequisites: ["s45-pagination"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Background Jobs\n\nSome operations are too slow to complete within an HTTP request (email sending, PDF generation, data exports). The pattern:\n\n1. Client sends request → server creates a job and returns **202 Accepted** immediately\n2. Job runs in the background\n3. Client polls a status endpoint or receives a webhook when done\n\nFor simple cases, FastAPI's `BackgroundTasks` is sufficient. For heavy, distributed workloads use a task queue like Celery or Dramatiq with a Redis/RabbitMQ broker.",
        },
        {
          kind: "code",
          language: "python",
          code:
`import time
from fastapi import FastAPI, BackgroundTasks

app = FastAPI()

def send_email(to: str, subject: str) -> None:
    # Simulate slow operation
    time.sleep(2)
    print(f"Email sent to {to}: {subject}")

@app.post("/reports/send", status_code=202)
def send_report(email: str, tasks: BackgroundTasks):
    tasks.add_task(send_email, to=email, subject="Your report")
    return {"message": "Report queued", "status": "pending"}`,
          caption: "FastAPI BackgroundTasks — runs after response is sent",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "BackgroundTasks share the worker process",
          body: "FastAPI BackgroundTasks run in the same process as your web server. A long-running or failing task can impact request handling. For production workloads, use Celery.",
        },
        {
          kind: "why-matters",
          body: "Returning 202 immediately keeps your API responsive. Users get instant feedback while slow work happens asynchronously — essential for email, image processing, and report generation.",
        },
      ],
      interactions: [
        {
          id: "s45-bg-mc",
          kind: "multiple-choice",
          prompt: "What HTTP status code should an endpoint return when it accepts a job for background processing?",
          beginnerPurpose: "Identify the correct status code for async jobs",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "200 OK", isCorrect: false, explanation: "200 implies the work is done; it isn't yet." },
            { id: "b", text: "201 Created", isCorrect: false, explanation: "201 is for resource creation, not async job acceptance." },
            { id: "c", text: "202 Accepted", isCorrect: true, explanation: "Correct — 202 means 'I received your request and will process it'." },
            { id: "d", text: "204 No Content", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "202 is specifically defined in HTTP for 'accepted for processing'." }],
          feedback: { correct: "Correct — 202 Accepted.", incorrect: "HTTP 202 Accepted is the standard code for async job acceptance." },
        },
        {
          id: "s45-bg-predict",
          kind: "predict-output",
          prompt: "When does `send_email` run relative to the HTTP response being sent to the client?",
          beginnerPurpose: "Understand BackgroundTasks execution order",
          expectedConceptIds: ["json-api"],
          code:
`# Using FastAPI BackgroundTasks
tasks.add_task(send_email, to="a@b.com", subject="hi")
return {"message": "queued"}  # ← this line`,
          expectedOutput: "After the response is sent",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "BackgroundTasks run after FastAPI has sent the response — that's what makes them 'background'." }],
          feedback: { correct: "Correct — background tasks run after the response.", incorrect: "FastAPI sends the response first, then runs background tasks." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-bg-mc", "s45-bg-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.18 File uploads ───────────────────────────────────────────────────
    {
      id: "s45-file-uploads",
      stageId: "stage-45",
      title: "File Uploads",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Accept file uploads with FastAPI UploadFile",
        "Validate file type and size",
        "Stream large uploads without loading them into memory",
      ],
      prerequisites: ["s45-background-jobs"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## File Uploads\n\nFile uploads use `multipart/form-data` encoding. FastAPI's `UploadFile` wraps the file with async read methods and exposes the filename and content-type.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, UploadFile, File, HTTPException

app = FastAPI()

MAX_SIZE = 5 * 1024 * 1024  # 5 MB
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(415, f"Unsupported media type: {file.content_type}")

    content = await file.read()
    if len(content) > MAX_SIZE:
        raise HTTPException(413, "File too large")

    # Save or process content here
    return {"filename": file.filename, "size": len(content)}`,
          caption: "File upload with type and size validation",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "For very large files, stream to disk",
          body: "Reading the entire file into memory with `await file.read()` can exhaust RAM for large uploads. Use `file.read(chunk_size)` in a loop to stream to disk or an object store.",
        },
        {
          kind: "why-matters",
          body: "File upload endpoints are high-value attack targets. Always validate type (by MIME type AND file header magic bytes in production), enforce size limits, and never execute uploaded files.",
        },
      ],
      interactions: [
        {
          id: "s45-upload-mc",
          kind: "multiple-choice",
          prompt: "A client uploads a 10 MB file but your limit is 5 MB. What status code should you return?",
          beginnerPurpose: "Identify the HTTP code for oversized payloads",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "400 Bad Request", isCorrect: false },
            { id: "b", text: "413 Request Entity Too Large", isCorrect: true, explanation: "Correct — 413 is specifically for payloads exceeding the server's limit." },
            { id: "c", text: "415 Unsupported Media Type", isCorrect: false, explanation: "415 is for wrong content type, not size." },
            { id: "d", text: "422 Unprocessable Entity", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "HTTP 413 is for payloads that exceed the server's size limit." }],
          feedback: { correct: "Correct — 413 Request Entity Too Large.", incorrect: "413 is the correct code for oversized request bodies." },
        },
        {
          id: "s45-upload-fill",
          kind: "fill-code",
          prompt: "Complete the upload handler to reject files that are not JPEG.",
          beginnerPurpose: "Practice MIME type validation in upload handlers",
          expectedConceptIds: ["json-api"],
          codeTemplate:
`@app.post("/avatar")
async def upload_avatar(file: UploadFile = File(...)):
    if file.___BLANK_1___ != "image/jpeg":
        raise HTTPException(___BLANK_2___, "Only JPEG allowed")
    return {"ok": True}`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "content_type", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "415", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The attribute for the file's media type is `content_type`; the status code is 415." }],
          feedback: { correct: "Correct!", incorrect: "Use `file.content_type` for MIME type and 415 for unsupported media type." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-upload-mc", "s45-upload-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.19 API error envelopes ────────────────────────────────────────────
    {
      id: "s45-api-error-envelopes",
      stageId: "stage-45",
      title: "API Error Envelopes",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Design a consistent error response structure",
        "Use FastAPI exception handlers to standardise all errors",
        "Include machine-readable error codes alongside human messages",
      ],
      prerequisites: ["s45-file-uploads"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## API Error Envelopes\n\nConsistent error responses let clients branch on error type without string-matching error messages. A good error envelope:\n\n```json\n{\n  \"error\": {\n    \"code\": \"ITEM_NOT_FOUND\",\n    \"message\": \"Item 42 does not exist\",\n    \"details\": {\"item_id\": 42}\n  }\n}\n```\n\nAlways include a machine-readable `code`, a human-readable `message`, and optional `details` for debugging.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

app = FastAPI()

class AppError(Exception):
    def __init__(self, code: str, message: str, status: int = 400):
        self.code = code
        self.message = message
        self.status = status

@app.exception_handler(AppError)
async def app_error_handler(request: Request, exc: AppError):
    return JSONResponse(
        status_code=exc.status,
        content={"error": {"code": exc.code, "message": exc.message}},
    )

@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"error": {"code": "VALIDATION_ERROR", "message": str(exc)}},
    )

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id > 100:
        raise AppError("ITEM_NOT_FOUND", f"Item {item_id} not found", 404)
    return {"id": item_id}`,
          caption: "Custom exception handlers for consistent error envelopes",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Document your error codes",
          body: "Include all error codes in your API documentation so clients can write switch statements against them. Code strings like `ITEM_NOT_FOUND` are far more useful than generic messages.",
        },
        {
          kind: "why-matters",
          body: "Clients (mobile apps, other services) need predictable error shapes to handle failures gracefully. Inconsistent error formats force every client to write custom parsing logic.",
        },
      ],
      interactions: [
        {
          id: "s45-err-mc",
          kind: "multiple-choice",
          prompt: "Why should error responses include a machine-readable `code` field in addition to a `message` string?",
          beginnerPurpose: "Understand the value of structured error codes",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "To make the JSON payload larger so it's easier to debug", isCorrect: false },
            { id: "b", text: "So clients can switch on the code without fragile string matching on the message", isCorrect: true, explanation: "Correct — error codes are stable; message strings can change." },
            { id: "c", text: "Because the HTTP status code alone is not transmitted", isCorrect: false },
            { id: "d", text: "To satisfy OpenAPI spec requirements", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What breaks if you rename an error message from 'Not found' to 'Resource missing'?" }],
          feedback: { correct: "Correct — codes are stable identifiers for error types.", incorrect: "Think about client code that branches on the error type." },
        },
        {
          id: "s45-err-fill",
          kind: "fill-code",
          prompt: "Complete the exception handler to return a structured error envelope.",
          beginnerPurpose: "Implement a consistent error response",
          expectedConceptIds: ["json-api"],
          codeTemplate:
`@app.exception_handler(AppError)
async def handle(request: Request, exc: AppError):
    return JSONResponse(
        status_code=exc.status,
        content={"error": {"code": ___BLANK_1___, "message": exc.message}},
    )`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "exc.code", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The code field comes from the exception object." }],
          feedback: { correct: "Correct!", incorrect: "Use `exc.code` to get the machine-readable error code from the exception." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-err-mc", "s45-err-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.20 API versioning ─────────────────────────────────────────────────
    {
      id: "s45-api-versioning",
      stageId: "stage-45",
      title: "API Versioning",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain the trade-offs between URL and header versioning",
        "Implement URL-based versioning with FastAPI routers",
        "Plan a deprecation strategy for old API versions",
      ],
      prerequisites: ["s45-api-error-envelopes"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## API Versioning\n\nVersioning lets you evolve an API without breaking existing clients. Common strategies:\n\n| Strategy | Example | Pro | Con |\n|----------|---------|-----|-----|\n| **URL prefix** | `/v1/items` | Obvious, easy to test | Duplicates routes |\n| **Header** | `API-Version: 2` | Clean URLs | Harder to test in browser |\n| **Query param** | `/items?v=2` | Easy | Pollutes query space |\n\n**URL prefix** is the most common choice for public APIs.",
        },
        {
          kind: "code",
          language: "python",
          code:
`from fastapi import FastAPI, APIRouter

app = FastAPI()

v1 = APIRouter(prefix="/v1")
v2 = APIRouter(prefix="/v2")

@v1.get("/items")
def list_items_v1():
    return [{"id": 1, "name": "Widget"}]  # old format

@v2.get("/items")
def list_items_v2():
    return {"data": [{"id": 1, "name": "Widget"}], "total": 1}  # new format

app.include_router(v1)
app.include_router(v2)`,
          caption: "URL-based API versioning with FastAPI routers",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Sunset deprecated versions",
          body: "Add a `Sunset` response header with the end-of-life date when deprecating a version. Give clients at least 6 months. Then redirect the old prefix to the new one before finally removing it.",
        },
        {
          kind: "why-matters",
          body: "Versioning is what allows you to iterate on your API design without forcing all clients to update simultaneously — essential for any public or third-party-integrated API.",
        },
      ],
      interactions: [
        {
          id: "s45-ver-mc",
          kind: "multiple-choice",
          prompt: "Which API versioning strategy is easiest to test directly in a web browser or curl?",
          beginnerPurpose: "Compare versioning strategies for testability",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "Header versioning (API-Version: 2)", isCorrect: false, explanation: "Custom headers require extra tooling to set in browsers." },
            { id: "b", text: "URL prefix versioning (/v2/items)", isCorrect: true, explanation: "Correct — you just navigate to the URL; no special headers needed." },
            { id: "c", text: "Accept header versioning", isCorrect: false },
            { id: "d", text: "Cookie-based versioning", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which approach requires nothing more than typing a URL?" }],
          feedback: { correct: "Correct — URL prefix is the most browser-friendly.", incorrect: "Think about which approach requires no special headers to test." },
        },
        {
          id: "s45-ver-fill",
          kind: "fill-code",
          prompt: "Mount a v2 router with prefix `/v2` on the app.",
          beginnerPurpose: "Practice registering versioned routers",
          expectedConceptIds: ["json-api"],
          codeTemplate:
`v2 = APIRouter(prefix=___BLANK_1___)

@v2.get("/items")
def list(): return []

app.___BLANK_2___(v2)`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: '"/v2"', caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "include_router", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Use `APIRouter(prefix='/v2')` and `app.include_router(v2)`." }],
          feedback: { correct: "Correct!", incorrect: "The prefix string is '/v2' and the method is include_router." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-ver-mc", "s45-ver-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.21 Web service testing ────────────────────────────────────────────
    {
      id: "s45-web-service-testing",
      stageId: "stage-45",
      title: "Web Service Testing",
      kind: "practice",
      difficulty: "intermediate",
      objectives: [
        "Write integration tests using FastAPI TestClient",
        "Test authentication, validation, and error paths",
        "Use pytest fixtures to manage test state",
      ],
      prerequisites: ["s45-api-versioning"],
      concepts: ["json-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Web Service Testing\n\nFastAPI provides a `TestClient` (backed by `httpx`) that sends real HTTP requests to your app in-process — no running server needed. This gives you fast, reliable integration tests.",
        },
        {
          kind: "code",
          language: "python",
          code:
`import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id == 0:
        from fastapi import HTTPException
        raise HTTPException(404, "Not found")
    return {"id": item_id}

@pytest.fixture
def client():
    return TestClient(app)

def test_get_item_success(client):
    r = client.get("/items/1")
    assert r.status_code == 200
    assert r.json() == {"id": 1}

def test_get_item_not_found(client):
    r = client.get("/items/0")
    assert r.status_code == 404

def test_get_item_invalid_type(client):
    r = client.get("/items/abc")
    assert r.status_code == 422`,
          caption: "Integration tests with FastAPI TestClient and pytest",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Test all paths: happy, error, and edge cases",
          body: "For every endpoint, test: the success path, each error path (404, 422, 403), and edge cases (empty lists, boundary values). Aim for 100% path coverage on handlers.",
        },
        {
          kind: "why-matters",
          body: "Web service tests catch regressions in routing, validation, and error handling — bugs that unit tests on business logic can't detect.",
        },
      ],
      interactions: [
        {
          id: "s45-test-mc",
          kind: "multiple-choice",
          prompt: "What does FastAPI's TestClient give you that a regular HTTP client (requests library) doesn't?",
          beginnerPurpose: "Understand the value of in-process testing",
          expectedConceptIds: ["json-api"],
          options: [
            { id: "a", text: "Faster serialisation of JSON bodies", isCorrect: false },
            { id: "b", text: "In-process testing without starting a real server, with full exception propagation", isCorrect: true, explanation: "Correct — TestClient runs your app in-process for fast, reliable tests." },
            { id: "c", text: "Automatic authentication header injection", isCorrect: false },
            { id: "d", text: "Support for WebSocket testing", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What would you need to do before using `requests` to test your app?" }],
          feedback: { correct: "Correct — no real server needed.", incorrect: "With requests, you'd need to run a server first. TestClient doesn't." },
        },
        {
          id: "s45-test-fill",
          kind: "fill-code",
          prompt: "Complete the test to assert a 201 status code and that the response contains an `id` field.",
          beginnerPurpose: "Write a test for a POST endpoint",
          expectedConceptIds: ["json-api"],
          codeTemplate:
`def test_create_item(client):
    r = client.post("/items", json={"name": "Foo", "price": 9.99})
    assert r.___BLANK_1___ == 201
    assert "id" in r.___BLANK_2___()`,
          blanks: [
            { placeholder: "___BLANK_1___", answer: "status_code", caseSensitive: true },
            { placeholder: "___BLANK_2___", answer: "json", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The status code attribute is `status_code`; the JSON body is accessed with `.json()`." }],
          feedback: { correct: "Correct test assertions!", incorrect: "Use `r.status_code` for the code and `r.json()` for the body dict." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s45-test-mc", "s45-test-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 45.22 Web API project ────────────────────────────────────────────────
    {
      id: "s45-web-api-project",
      stageId: "stage-45",
      title: "Web API Project",
      kind: "project",
      difficulty: "advanced",
      objectives: [
        "Build a RESTful API combining routing, validation, auth, pagination, and error handling",
        "Apply all stage-45 concepts in an integrated project",
      ],
      prerequisites: ["s45-web-service-testing"],
      concepts: ["web-request-response", "http-routing", "json-api", "web-authentication"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Web API Project\n\nYou will build a **Task Management API** that supports:\n\n- User registration and JWT-based login\n- CRUD for tasks (authenticated)\n- Pagination on the task list\n- Validation on all inputs\n- Consistent error envelopes\n- Rate limiting on the login endpoint\n\nThis project integrates every concept from Stage 45.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Project structure suggestion",
          body: "Organise your code into: `main.py` (app factory), `routers/tasks.py`, `routers/auth.py`, `models.py` (Pydantic schemas), `security.py` (JWT helpers), `middleware.py` (rate limiter).",
        },
        {
          kind: "why-matters",
          body: "Building a complete API end-to-end reinforces how all the pieces fit together — something individual lessons cannot fully convey.",
        },
      ],
      interactions: [
        {
          id: "s45-proj-mc",
          kind: "multiple-choice",
          prompt: "Which combination best protects the login endpoint against brute-force attacks?",
          beginnerPurpose: "Apply multiple security concepts together",
          expectedConceptIds: ["web-authentication", "json-api"],
          options: [
            { id: "a", text: "Rate limiting only", isCorrect: false, explanation: "Rate limiting slows attacks but a slow brute force still works eventually." },
            { id: "b", text: "Rate limiting + account lockout after N failures", isCorrect: true, explanation: "Layered defences — rate limiting slows attempts, lockout stops them." },
            { id: "c", text: "CORS headers only", isCorrect: false },
            { id: "d", text: "Longer JWT expiry", isCorrect: false },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Defence in depth: combine rate limiting with account-level controls." }],
          feedback: { correct: "Correct — layered security is more effective.", incorrect: "Combine multiple defences for better protection." },
        },
        {
          id: "s45-proj-run",
          kind: "run-code",
          prompt: "Write a FastAPI app with a single POST /tasks endpoint that creates a task with `title` (required string) and returns 201 with the task including a generated `id`.",
          beginnerPurpose: "Integrate routing, body validation, and status codes",
          expectedConceptIds: ["json-api", "http-routing"],
          starterCode:
`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Task(BaseModel):
    title: str

# Add your endpoint here
`,
          task: "Implement POST /tasks that accepts a Task body and returns 201 with {id: 1, title: ...}",
          expectedOutputContains: ["201", "title"],
          pyodideCompatible: false,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "Use @app.post('/tasks', status_code=201) and return a dict with id and title." },
            { level: "syntax", text: "def create_task(task: Task): return {'id': 1, 'title': task.title}" },
          ],
          feedback: { correct: "Complete API endpoint!", incorrect: "Make sure you set status_code=201 and return both id and title." },
        },
      ],
      reviewHooks: [
        { conceptId: "json-api", recallPrompt: "What are the four key concerns of a production REST API?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s45-proj-mc", "s45-proj-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s45-project",
    stageId: "stage-45",
    title: "Task Management REST API",
    brief:
      "Build a production-ready Task Management REST API with FastAPI. Implement user authentication (JWT), full CRUD for tasks, pagination, input validation, consistent error envelopes, rate limiting on auth endpoints, and a comprehensive test suite using TestClient.",
    requirements: [
      "User registration and login endpoints returning JWT tokens",
      "CRUD endpoints for tasks (create, list with pagination, get, update, delete)",
      "Ownership enforcement — users can only access their own tasks",
      "Pydantic validation on all request bodies and query parameters",
      "Consistent JSON error envelopes with machine-readable codes",
      "Rate limiting on the login endpoint (5 requests/minute)",
      "Integration tests covering success, 422, 401, 403, and 404 paths",
    ],
    acceptanceCriteria: [
      "All endpoints return correct HTTP status codes",
      "JWT authentication is required for all task endpoints",
      "Pagination metadata (has_more, total, skip, limit) is included in list response",
      "A user cannot access another user's tasks (403 response)",
      "Login endpoint returns 429 after 5 requests per minute",
      "All tests pass with pytest",
    ],
    conceptIds: ["web-request-response", "http-routing", "json-api", "web-authentication"],
    difficulty: "advanced",
  },
} satisfies Stage;
