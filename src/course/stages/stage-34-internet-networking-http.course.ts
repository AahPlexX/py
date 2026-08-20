import type { Stage } from "@/course/course.schema";

export const stage34 = {
  id: "stage-34",
  number: 34,
  title: "Internet, Networking, HTTP, and Data Exchange",
  summary:
    "Master internet, networking, HTTP, and data exchange through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["http-protocol", "urllib-request", "json-apis"],
  lessons: [
    // ─── 34.1 URLs ────────────────────────────────────────────────────────────
    {
      id: "s34-urls",
      stageId: "stage-34",
      title: "URLs",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Identify the components of a URL: scheme, host, port, path, query, fragment",
        "Parse and construct URLs with urllib.parse",
      ],
      prerequisites: [],
      concepts: ["http-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## URLs\n\nA **URL** (Uniform Resource Locator) uniquely identifies a resource on the network. Every HTTP request starts with a URL.",
        },
        {
          kind: "code",
          language: "python",
          code: `from urllib.parse import urlparse, urlencode, urlunparse

# Parse a URL into its parts
parsed = urlparse('https://api.example.com:443/users/42?format=json#profile')
print(parsed.scheme)    # https
print(parsed.netloc)    # api.example.com:443
print(parsed.path)      # /users/42
print(parsed.query)     # format=json
print(parsed.fragment)  # profile

# Build a query string
qs = urlencode({'page': 2, 'limit': 20})
print(qs)   # page=2&limit=20`,
          caption: "Parsing and building URLs",
        },
        {
          kind: "mental-model",
          title: "URL as a Postal Address",
          analogy: "A URL is like a postal address: scheme = delivery service (UPS vs FedEx), host = city/street, port = apartment number, path = recipient name, query = special instructions.",
          explanation: "Each part of the URL narrows down exactly which resource on which server you want to reach.",
        },
        {
          kind: "why-matters",
          body: "Every API call, web scrape, and HTTP request begins with constructing the right URL. Understanding URL structure prevents bugs from malformed requests.",
        },
        {
          kind: "glossary-term",
          term: "Query string",
          definition: "Key-value pairs appended to a URL after '?', used to pass parameters to a server.",
          example: "/search?q=python&page=2",
        },
      ],
      interactions: [
        {
          id: "s34-url-po1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Practice extracting URL components",
          expectedConceptIds: ["http-protocol"],
          code: `from urllib.parse import urlparse
p = urlparse('https://example.com/api/v1?key=abc')
print(p.path)
print(p.query)`,
          expectedOutput: "/api/v1\nkey=abc",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "p.path is everything before the ?, p.query is everything after." }],
          feedback: { correct: "Correct! path is before ?, query is after.", incorrect: "path = before '?', query = after '?'." },
        },
        {
          id: "s34-url-mc1",
          kind: "multiple-choice",
          prompt: "Which part of 'https://api.example.com:8080/v2' is the port?",
          beginnerPurpose: "Identify URL components",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "https", isCorrect: false, explanation: "That is the scheme." },
            { id: "b", text: "api.example.com", isCorrect: false, explanation: "That is the hostname." },
            { id: "c", text: "8080", isCorrect: true, explanation: "8080 is the port number." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The port follows the hostname after a colon." }],
          feedback: { correct: "Correct! 8080 is the port.", incorrect: "Port follows the hostname with a colon separator." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-protocol", recallPrompt: "Name the 5 components of a URL.", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-url-po1", "s34-url-mc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.2 HTTP methods ────────────────────────────────────────────────────
    {
      id: "s34-http-methods",
      stageId: "stage-34",
      title: "HTTP Methods",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Know when to use GET, POST, PUT, DELETE, and PATCH",
        "Understand the semantics of idempotency and safety",
      ],
      prerequisites: ["s34-urls"],
      concepts: ["http-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## HTTP Methods\n\nHTTP methods (also called verbs) tell the server what action to perform on the resource identified by the URL.",
        },
        {
          kind: "code",
          language: "python",
          code: `# Conceptual mapping of HTTP methods to CRUD operations
# GET    /users/42      -> Read user 42 (safe, idempotent)
# POST   /users         -> Create a new user
# PUT    /users/42      -> Replace user 42 entirely (idempotent)
# PATCH  /users/42      -> Update part of user 42
# DELETE /users/42      -> Delete user 42 (idempotent)`,
          caption: "HTTP method semantics",
        },
        {
          kind: "glossary-term",
          term: "Idempotent",
          definition: "An operation that produces the same result regardless of how many times it is repeated. GET, PUT, DELETE are idempotent; POST is not.",
          example: "DELETE /users/42 called twice still leaves user 42 deleted.",
        },
        {
          kind: "why-matters",
          body: "Using the correct HTTP method makes your API predictable, enables caching for GET requests, and lets clients safely retry idempotent requests without unintended side effects.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "POST vs PUT vs PATCH",
          body: "POST creates a new resource (server assigns the ID). PUT replaces a resource at a known URL. PATCH partially updates a resource. Choose based on whether you are creating, replacing, or modifying.",
        },
      ],
      interactions: [
        {
          id: "s34-methods-mc1",
          kind: "multiple-choice",
          prompt: "You want to update only the email field of user 42 without replacing the whole record. Which HTTP method is most appropriate?",
          beginnerPurpose: "Choose the right HTTP method for a partial update",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "PUT", isCorrect: false, explanation: "PUT replaces the entire resource." },
            { id: "b", text: "PATCH", isCorrect: true, explanation: "PATCH applies a partial update." },
            { id: "c", text: "POST", isCorrect: false, explanation: "POST creates a new resource." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think 'patch' as in patching a small hole — not replacing the whole wall." }],
          feedback: { correct: "Correct! PATCH is for partial updates.", incorrect: "PATCH updates part of a resource; PUT replaces it entirely." },
        },
        {
          id: "s34-methods-mc2",
          kind: "multiple-choice",
          prompt: "Which HTTP methods are considered 'safe' (no side effects on the server)?",
          beginnerPurpose: "Understand which methods should not modify state",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "GET and HEAD", isCorrect: true, explanation: "Safe methods only retrieve data; they must not modify server state." },
            { id: "b", text: "GET and POST", isCorrect: false, explanation: "POST creates/modifies resources — it has side effects." },
            { id: "c", text: "PUT and DELETE", isCorrect: false, explanation: "Both modify server state; they are idempotent but not safe." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "'Safe' methods should never change server state — they are read-only." }],
          feedback: { correct: "Correct! GET and HEAD are safe (read-only).", incorrect: "Safe means no side effects — only read operations qualify." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-protocol", recallPrompt: "What is the difference between PUT and PATCH?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-methods-mc1", "s34-methods-mc2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.3 Status codes ────────────────────────────────────────────────────
    {
      id: "s34-status-codes",
      stageId: "stage-34",
      title: "HTTP Status Codes",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Identify the meaning of 2xx, 3xx, 4xx, and 5xx status code families",
        "Handle common status codes like 200, 201, 400, 401, 403, 404, 500",
      ],
      prerequisites: ["s34-http-methods"],
      concepts: ["http-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## HTTP Status Codes\n\nEvery HTTP response includes a three-digit status code that tells the client what happened. The first digit groups codes into families:",
        },
        {
          kind: "code",
          language: "python",
          code: `# Status code families
# 1xx — Informational (rarely used directly)
# 2xx — Success
#   200 OK           — request succeeded
#   201 Created      — resource was created
#   204 No Content   — success, no response body
# 3xx — Redirection
#   301 Moved Permanently
#   302 Found (temporary redirect)
# 4xx — Client errors
#   400 Bad Request  — malformed input
#   401 Unauthorized — authentication required
#   403 Forbidden    — authenticated but not allowed
#   404 Not Found    — resource does not exist
#   429 Too Many Requests — rate limited
# 5xx — Server errors
#   500 Internal Server Error
#   503 Service Unavailable`,
          caption: "HTTP status code families",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "401 vs 403",
          body: "401 means 'who are you?' (authentication required). 403 means 'I know who you are, but you are not allowed' (authorization denied). The distinction matters for debugging API access issues.",
        },
        {
          kind: "why-matters",
          body: "Reading status codes correctly lets you write precise error handling: retry on 503, redirect on 301, raise an auth error on 401, and display a 'not found' message on 404.",
        },
      ],
      interactions: [
        {
          id: "s34-status-mc1",
          kind: "multiple-choice",
          prompt: "An API returns 403. What does this mean?",
          beginnerPurpose: "Distinguish authentication from authorization errors",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "The resource does not exist", isCorrect: false, explanation: "404 means not found." },
            { id: "b", text: "Authentication credentials are missing or invalid", isCorrect: false, explanation: "That is 401 Unauthorized." },
            { id: "c", text: "The authenticated user is not allowed to access this resource", isCorrect: true, explanation: "403 Forbidden means authenticated but not authorized." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "403 = 'I know you, but no entry'. 401 = 'Please identify yourself first'." }],
          feedback: { correct: "Correct! 403 is an authorization error.", incorrect: "403 = authenticated but not authorized. 401 = not authenticated." },
        },
        {
          id: "s34-status-mc2",
          kind: "multiple-choice",
          prompt: "Your POST to /users returns 201. What does that mean?",
          beginnerPurpose: "Know 201 vs 200 for resource creation",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "The request succeeded and returned data", isCorrect: false, explanation: "That is 200 OK." },
            { id: "b", text: "A new resource was successfully created", isCorrect: true, explanation: "201 Created indicates the resource was created." },
            { id: "c", text: "The request was accepted but not yet processed", isCorrect: false, explanation: "That is 202 Accepted." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "201 is specifically for when a resource was created, not just retrieved." }],
          feedback: { correct: "Correct! 201 Created.", incorrect: "201 means the POST created a new resource." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-protocol", recallPrompt: "What are the 5 families of HTTP status codes and what does each mean?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-status-mc1", "s34-status-mc2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.4 Headers ─────────────────────────────────────────────────────────
    {
      id: "s34-headers",
      stageId: "stage-34",
      title: "HTTP Headers",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Set request headers like Content-Type and Authorization",
        "Read response headers to inspect metadata",
        "Understand common headers: Accept, Content-Type, User-Agent, Authorization",
      ],
      prerequisites: ["s34-status-codes"],
      concepts: ["http-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## HTTP Headers\n\nHeaders are key-value metadata sent with every HTTP request and response. They describe the format of the body, authentication credentials, caching rules, and more.",
        },
        {
          kind: "code",
          language: "python",
          code: `import urllib.request
import json

url = 'https://api.github.com/repos/python/cpython'
req = urllib.request.Request(
    url,
    headers={
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'my-python-client/1.0',
        'Authorization': 'Bearer TOKEN_HERE',
    }
)
with urllib.request.urlopen(req) as resp:
    print(resp.status)                      # 200
    print(resp.headers['Content-Type'])     # application/json
    data = json.loads(resp.read())`,
          caption: "Setting and reading headers",
        },
        {
          kind: "glossary-term",
          term: "Content-Type",
          definition: "An HTTP header that describes the media type of the request or response body. Common values: application/json, text/html, multipart/form-data.",
        },
        {
          kind: "why-matters",
          body: "Headers are how clients and servers negotiate format, encoding, and authentication. Forgetting Content-Type is a common cause of 400 errors when posting JSON.",
        },
      ],
      interactions: [
        {
          id: "s34-headers-mc1",
          kind: "multiple-choice",
          prompt: "Which header must you set when sending JSON in a POST request body?",
          beginnerPurpose: "Know the required header for JSON bodies",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "Accept: application/json", isCorrect: false, explanation: "Accept tells the server what format you want in the response, not what you are sending." },
            { id: "b", text: "Content-Type: application/json", isCorrect: true, explanation: "Content-Type tells the server the format of the request body." },
            { id: "c", text: "Authorization: Bearer", isCorrect: false, explanation: "Authorization carries credentials, not body format." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Content-Type describes what you ARE sending; Accept describes what you WANT back." }],
          feedback: { correct: "Correct! Content-Type: application/json is required.", incorrect: "Content-Type tells the server what format your body is in." },
        },
        {
          id: "s34-headers-fc1",
          kind: "fill-code",
          prompt: "Complete the code to set an Authorization Bearer token header:",
          beginnerPurpose: "Practice setting authentication headers",
          expectedConceptIds: ["http-protocol"],
          codeTemplate: `import urllib.request
req = urllib.request.Request('https://api.example.com/data')
req.add_header('___', 'Bearer mytoken123')`,
          blanks: [{ placeholder: "___", answer: "Authorization", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The header for tokens/credentials is 'Authorization'." }],
          feedback: { correct: "Correct! Authorization: Bearer <token> is the standard.", incorrect: "The header name is 'Authorization'." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-protocol", recallPrompt: "What header describes the format of an HTTP request body?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-headers-mc1", "s34-headers-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.5 Query strings ───────────────────────────────────────────────────
    {
      id: "s34-query-strings",
      stageId: "stage-34",
      title: "Query Strings",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Build query strings with urllib.parse.urlencode",
        "Parse query strings with urllib.parse.parse_qs",
        "Percent-encode special characters correctly",
      ],
      prerequisites: ["s34-urls"],
      concepts: ["http-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Query Strings\n\nQuery strings pass parameters in the URL after `?`. They must be URL-encoded so special characters like spaces and `&` are safely transmitted.",
        },
        {
          kind: "code",
          language: "python",
          code: `from urllib.parse import urlencode, parse_qs, quote

# Build a query string
params = {'q': 'python tutorial', 'page': 1, 'lang': 'en'}
qs = urlencode(params)
print(qs)   # q=python+tutorial&page=1&lang=en

# Full URL
url = f'https://search.example.com/results?{qs}'
print(url)

# Parse a query string back to a dict
parsed = parse_qs('q=hello+world&limit=10')
print(parsed)   # {'q': ['hello world'], 'limit': ['10']}

# Manual percent-encoding
print(quote('/path with spaces/'))  # %2Fpath%20with%20spaces%2F`,
          caption: "Building and parsing query strings",
        },
        {
          kind: "callout",
          variant: "info",
          title: "parse_qs returns lists",
          body: "`parse_qs` returns a dict where every value is a list, because a key can appear multiple times. Use `parse_qs(qs, max_num_fields=1000)` and access `parsed['key'][0]` for single values.",
        },
        {
          kind: "why-matters",
          body: "Search APIs, pagination, and filter parameters all travel in query strings. Building them with urlencode prevents subtle bugs from spaces and special characters being misinterpreted.",
        },
      ],
      interactions: [
        {
          id: "s34-qs-po1",
          kind: "predict-output",
          prompt: "What does this code print?",
          beginnerPurpose: "Understand urlencode encoding of spaces",
          expectedConceptIds: ["http-protocol"],
          code: `from urllib.parse import urlencode
print(urlencode({'q': 'hello world', 'n': 5}))`,
          expectedOutput: "q=hello+world&n=5",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "urlencode encodes spaces as '+' in query strings." }],
          feedback: { correct: "Correct! Spaces become + in query strings.", incorrect: "urlencode replaces spaces with + in query string values." },
        },
        {
          id: "s34-qs-fc1",
          kind: "fill-code",
          prompt: "Complete the code to parse a query string into a dict:",
          beginnerPurpose: "Practice parsing query strings",
          expectedConceptIds: ["http-protocol"],
          codeTemplate: `from urllib.parse import ___
result = ___('name=Alice&age=30')
print(result['name'])  # ['Alice']`,
          blanks: [{ placeholder: "___", answer: "parse_qs", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The function that parses a query string is parse_qs." }],
          feedback: { correct: "Correct! parse_qs parses query strings into dicts.", incorrect: "The function is parse_qs from urllib.parse." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-protocol", recallPrompt: "How do you safely encode a dict as a URL query string?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-qs-po1", "s34-qs-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.6 Request bodies ──────────────────────────────────────────────────
    {
      id: "s34-request-bodies",
      stageId: "stage-34",
      title: "Request Bodies",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Send JSON in a POST request body",
        "Send form-encoded data",
        "Set the correct Content-Type for each body format",
      ],
      prerequisites: ["s34-headers"],
      concepts: ["http-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Request Bodies\n\nGET requests have no body — parameters go in the URL. POST, PUT, and PATCH requests carry data in the **body**. The `Content-Type` header tells the server how to decode it.",
        },
        {
          kind: "code",
          language: "python",
          code: `import urllib.request
import json
from urllib.parse import urlencode

# Send JSON body
payload = json.dumps({'name': 'Alice', 'role': 'admin'}).encode()
req = urllib.request.Request(
    'https://api.example.com/users',
    data=payload,
    headers={'Content-Type': 'application/json'},
    method='POST',
)

# Send form-encoded body
form_data = urlencode({'username': 'alice', 'password': 'secret'}).encode()
req2 = urllib.request.Request(
    'https://example.com/login',
    data=form_data,
    headers={'Content-Type': 'application/x-www-form-urlencoded'},
    method='POST',
)`,
          caption: "Sending JSON and form bodies",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Encode bytes before sending",
          body: "urllib expects the body as `bytes`. Call `.encode('utf-8')` on your string or `json.dumps(data).encode()` before passing it as `data=`.",
        },
        {
          kind: "why-matters",
          body: "REST APIs accept JSON bodies; web forms send form-encoded data. Knowing both formats lets you interact with any HTTP endpoint.",
        },
      ],
      interactions: [
        {
          id: "s34-body-mc1",
          kind: "multiple-choice",
          prompt: "You want to POST a JSON object to an API. What Content-Type should you set?",
          beginnerPurpose: "Know the correct MIME type for JSON",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "text/json", isCorrect: false, explanation: "The standard type is application/json, not text/json." },
            { id: "b", text: "application/json", isCorrect: true, explanation: "application/json is the standard Content-Type for JSON bodies." },
            { id: "c", text: "application/x-www-form-urlencoded", isCorrect: false, explanation: "That is for HTML form submissions, not JSON." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The MIME type for JSON uses the 'application' category." }],
          feedback: { correct: "Correct! application/json.", incorrect: "Use application/json for JSON request bodies." },
        },
        {
          id: "s34-body-fc1",
          kind: "fill-code",
          prompt: "Complete the code to send a JSON POST body correctly:",
          beginnerPurpose: "Practice encoding JSON for urllib",
          expectedConceptIds: ["http-protocol"],
          codeTemplate: `import json, urllib.request
data = json.___({'key': 'value'}).encode()
req = urllib.request.Request('https://api.example.com', data=data, method='POST')`,
          blanks: [{ placeholder: "___", answer: "dumps", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "json.dumps() serializes a Python object to a JSON string." }],
          feedback: { correct: "Correct! json.dumps serializes to a string, then .encode() makes it bytes.", incorrect: "json.dumps() converts to string; json.loads() parses from string." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-protocol", recallPrompt: "How do you send a JSON body with urllib.request?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-body-mc1", "s34-body-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.7 urllib.request ──────────────────────────────────────────────────
    {
      id: "s34-urllib-request",
      stageId: "stage-34",
      title: "urllib.request",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Make GET requests with urllib.request.urlopen",
        "Read the response body and decode it",
        "Use urllib.request.Request for custom headers and methods",
      ],
      prerequisites: ["s34-request-bodies"],
      concepts: ["urllib-request"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `urllib.request` — Standard HTTP Client\n\n`urllib.request` is Python's built-in HTTP client. It requires no installation and handles GET/POST requests, redirects, and basic authentication.",
        },
        {
          kind: "code",
          language: "python",
          code: `import urllib.request
import json

# Simple GET
with urllib.request.urlopen('https://httpbin.org/get') as resp:
    body = resp.read()           # bytes
    text = body.decode('utf-8')  # string
    data = json.loads(text)
    print(data['url'])

# GET with custom headers
req = urllib.request.Request(
    'https://api.github.com/zen',
    headers={'Accept': 'application/json'},
)
with urllib.request.urlopen(req) as resp:
    print(resp.status)          # 200
    print(resp.read().decode())`,
          caption: "urllib.request GET requests",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always use a context manager",
          body: "Use `with urllib.request.urlopen(...)` as a context manager. This ensures the HTTP connection is properly closed even if an exception occurs.",
        },
        {
          kind: "why-matters",
          body: "`urllib.request` is always available — no pip install needed. For scripts that run in restricted environments or Docker images without third-party packages, it is the reliable fallback.",
        },
      ],
      interactions: [
        {
          id: "s34-urllib-mc1",
          kind: "multiple-choice",
          prompt: "What does urllib.request.urlopen return?",
          beginnerPurpose: "Understand the type returned by urlopen",
          expectedConceptIds: ["urllib-request"],
          options: [
            { id: "a", text: "A str with the response body", isCorrect: false, explanation: "urlopen returns a response object, not a plain string." },
            { id: "b", text: "An HTTP response object with .read(), .status, and .headers", isCorrect: true, explanation: "The response object has .read() for the body, .status for the code, and .headers for metadata." },
            { id: "c", text: "A dict of the parsed JSON response", isCorrect: false, explanation: "You must call json.loads(resp.read()) yourself." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "urlopen returns a response object — you need to call .read() on it." }],
          feedback: { correct: "Correct! The response object needs .read() to get the body.", incorrect: "urlopen returns a response object with .read(), .status, .headers." },
        },
        {
          id: "s34-urllib-fc1",
          kind: "fill-code",
          prompt: "Complete the code to read and decode the response body:",
          beginnerPurpose: "Practice reading a urllib response",
          expectedConceptIds: ["urllib-request"],
          codeTemplate: `import urllib.request
with urllib.request.urlopen('https://example.com') as r:
    text = r.___().decode('utf-8')
    print(text[:50])`,
          blanks: [{ placeholder: "___", answer: "read", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Call .read() on the response object to get the bytes body." }],
          feedback: { correct: "Correct! .read() returns the response body as bytes.", incorrect: "The method to read the response body is .read()." },
        },
      ],
      reviewHooks: [
        { conceptId: "urllib-request", recallPrompt: "How do you make a GET request with urllib.request?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-urllib-mc1", "s34-urllib-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.8 urllib.parse ────────────────────────────────────────────────────
    {
      id: "s34-urllib-parse",
      stageId: "stage-34",
      title: "urllib.parse",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use urlparse to decompose URLs",
        "Use urljoin to resolve relative URLs",
        "Percent-encode and decode with quote and unquote",
      ],
      prerequisites: ["s34-query-strings"],
      concepts: ["urllib-request"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `urllib.parse` — URL Manipulation\n\n`urllib.parse` provides tools for parsing, constructing, and encoding URLs. It handles the low-level encoding rules so you don't have to.",
        },
        {
          kind: "code",
          language: "python",
          code: `from urllib.parse import urlparse, urljoin, quote, unquote, urlencode

# Resolve relative URL against a base
base = 'https://docs.python.org/3/library/'
link = '../tutorial/index.html'
print(urljoin(base, link))
# https://docs.python.org/3/tutorial/index.html

# Encode a path segment
raw = '/search results/page 1'
encoded = quote(raw, safe='/')
print(encoded)   # /search%20results/page%201

# Decode
print(unquote('/search%20results'))  # /search results`,
          caption: "urllib.parse utilities",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "urljoin for scraping",
          body: "When scraping links from HTML pages, use `urljoin(page_url, href)` to safely resolve relative hrefs like `../images/logo.png` into absolute URLs.",
        },
        {
          kind: "why-matters",
          body: "Web scrapers, link checkers, and API clients all need to resolve relative URLs. `urljoin` handles the edge cases so you don't have to write your own resolver.",
        },
      ],
      interactions: [
        {
          id: "s34-parse-po1",
          kind: "predict-output",
          prompt: "What does urljoin print?",
          beginnerPurpose: "Understand how relative URLs resolve against a base",
          expectedConceptIds: ["urllib-request"],
          code: `from urllib.parse import urljoin
print(urljoin('https://example.com/a/b/', '../c.html'))`,
          expectedOutput: "https://example.com/a/c.html",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: ".. navigates one directory up from b/, which is a/." }],
          feedback: { correct: "Correct! '../c.html' from 'a/b/' resolves to 'a/c.html'.", incorrect: ".. moves up one level from the current path." },
        },
        {
          id: "s34-parse-mc1",
          kind: "multiple-choice",
          prompt: "Which function encodes a string for safe use in a URL path segment?",
          beginnerPurpose: "Know which function percent-encodes path characters",
          expectedConceptIds: ["urllib-request"],
          options: [
            { id: "a", text: "urlencode", isCorrect: false, explanation: "urlencode encodes a dict as a query string, not individual strings." },
            { id: "b", text: "quote", isCorrect: true, explanation: "urllib.parse.quote encodes a string for use in a URL." },
            { id: "c", text: "encode", isCorrect: false, explanation: "str.encode() converts to bytes; it does not percent-encode URL characters." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Percent-encoding is also called 'quoting' in the urllib documentation." }],
          feedback: { correct: "Correct! urllib.parse.quote() percent-encodes strings.", incorrect: "Use urllib.parse.quote() for percent-encoding." },
        },
      ],
      reviewHooks: [
        { conceptId: "urllib-request", recallPrompt: "How do you resolve a relative URL against a base URL in Python?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-parse-po1", "s34-parse-mc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.9 JSON APIs ───────────────────────────────────────────────────────
    {
      id: "s34-json-apis",
      stageId: "stage-34",
      title: "JSON APIs",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Fetch and parse JSON from a REST API",
        "Post JSON data to an API endpoint",
        "Handle nested JSON structures",
      ],
      prerequisites: ["s34-urllib-request", "s34-request-bodies"],
      concepts: ["json-apis"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## JSON APIs\n\nMost modern web APIs exchange data as JSON. Python's `json` module serializes Python objects to JSON strings and deserializes JSON back to Python objects.",
        },
        {
          kind: "code",
          language: "python",
          code: `import urllib.request
import json

def get_user(user_id: int) -> dict:
    url = f'https://jsonplaceholder.typicode.com/users/{user_id}'
    with urllib.request.urlopen(url) as resp:
        return json.loads(resp.read().decode())

def create_post(title: str, body: str, user_id: int) -> dict:
    payload = json.dumps({
        'title': title, 'body': body, 'userId': user_id
    }).encode()
    req = urllib.request.Request(
        'https://jsonplaceholder.typicode.com/posts',
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST',
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())

user = get_user(1)
print(user['name'])  # Leanne Graham`,
          caption: "Full JSON API GET and POST",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "json.loads vs json.load",
          body: "`json.loads(string)` parses a string. `json.load(file_object)` reads from a file. For HTTP responses, use `json.loads(resp.read().decode())`.",
        },
        {
          kind: "why-matters",
          body: "The vast majority of public APIs — weather, finance, GitHub, Stripe, AWS — communicate via JSON over HTTP. Mastering this pattern lets you integrate with any of them.",
        },
      ],
      interactions: [
        {
          id: "s34-json-mc1",
          kind: "multiple-choice",
          prompt: "Which function parses a JSON string into a Python dict?",
          beginnerPurpose: "Distinguish json.loads from json.dumps",
          expectedConceptIds: ["json-apis"],
          options: [
            { id: "a", text: "json.dumps", isCorrect: false, explanation: "json.dumps converts Python to a JSON string." },
            { id: "b", text: "json.loads", isCorrect: true, explanation: "json.loads parses a JSON string into a Python object." },
            { id: "c", text: "json.decode", isCorrect: false, explanation: "json.decode does not exist in the standard library." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "l in 'loads' stands for load-from-string." }],
          feedback: { correct: "Correct! json.loads parses JSON strings.", incorrect: "json.loads (load-string) parses; json.dumps (dump-string) serializes." },
        },
        {
          id: "s34-json-rc1",
          kind: "run-code",
          prompt: "Write a function that fetches a user from jsonplaceholder and returns their email.",
          beginnerPurpose: "Practice making a real JSON API call",
          expectedConceptIds: ["json-apis"],
          starterCode: `import urllib.request
import json

def get_user_email(user_id: int) -> str:
    url = f'https://jsonplaceholder.typicode.com/users/{user_id}'
    # your code here
    pass

print(get_user_email(1))`,
          task: "Fetch the user JSON and return the 'email' field",
          pyodideCompatible: false,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "Use urllib.request.urlopen to GET the URL, then json.loads to parse." },
            { level: "syntax", text: "data = json.loads(resp.read().decode()); return data['email']" },
          ],
          feedback: { correct: "Excellent! You successfully called a JSON API.", incorrect: "Fetch the URL, parse the JSON, and return data['email']." },
        },
      ],
      reviewHooks: [
        { conceptId: "json-apis", recallPrompt: "How do you fetch and parse a JSON API response with standard library only?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-json-mc1", "s34-json-rc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.10 Error handling for network calls ───────────────────────────────
    {
      id: "s34-network-error-handling",
      stageId: "stage-34",
      title: "Error Handling for Network Calls",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Catch urllib.error.HTTPError and URLError",
        "Distinguish network errors from HTTP errors",
        "Extract status codes and error bodies from HTTPError",
      ],
      prerequisites: ["s34-urllib-request"],
      concepts: ["urllib-request"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Network Error Handling\n\nNetwork calls can fail in two ways:\n1. **HTTPError** — the server responded but with an error status (4xx, 5xx)\n2. **URLError** — no response at all (DNS failure, connection refused, timeout)",
        },
        {
          kind: "code",
          language: "python",
          code: `import urllib.request
import urllib.error

def fetch(url: str) -> dict | None:
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            import json
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        print(f'HTTP error: {e.code} {e.reason}')
        # e.code = 404, e.reason = 'Not Found'
        # e.read() = response body (may contain error details)
    except urllib.error.URLError as e:
        print(f'Network error: {e.reason}')
        # DNS failure, refused connection, timeout
    return None`,
          caption: "Handling HTTP and network errors",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Order matters: HTTPError before URLError",
          body: "`HTTPError` is a subclass of `URLError`. Always catch `HTTPError` first, otherwise it will be caught by the `URLError` handler and you will lose the status code.",
        },
        {
          kind: "why-matters",
          body: "Unhandled network errors crash programs and give users cryptic stack traces. Proper error handling lets you present meaningful messages and implement retry logic.",
        },
      ],
      interactions: [
        {
          id: "s34-neterr-mc1",
          kind: "multiple-choice",
          prompt: "Why must you catch urllib.error.HTTPError before urllib.error.URLError?",
          beginnerPurpose: "Understand exception hierarchy for network errors",
          expectedConceptIds: ["urllib-request"],
          options: [
            { id: "a", text: "HTTPError is faster to handle", isCorrect: false, explanation: "Performance is not the reason." },
            { id: "b", text: "HTTPError is a subclass of URLError, so URLError would catch it first if listed first", isCorrect: true, explanation: "Python catches exceptions in order; a subclass must come before its parent." },
            { id: "c", text: "You must always catch the more specific exception last", isCorrect: false, explanation: "It is the opposite — more specific (subclass) should come first." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Python checks except clauses in order; if a parent class comes first, the subclass never gets matched." }],
          feedback: { correct: "Correct! Subclasses must be caught before parent classes.", incorrect: "HTTPError inherits from URLError — it must come first." },
        },
        {
          id: "s34-neterr-debug1",
          kind: "debug-code",
          prompt: "Fix the exception order so HTTPError is handled before URLError.",
          beginnerPurpose: "Practice correct exception ordering",
          expectedConceptIds: ["urllib-request"],
          brokenCode: `import urllib.request, urllib.error
try:
    urllib.request.urlopen('https://example.com/404')
except urllib.error.URLError as e:
    print('Network error')
except urllib.error.HTTPError as e:
    print(f'HTTP {e.code}')`,
          bugDescription: "HTTPError is subclass of URLError; URLError catches it first so HTTPError handler is unreachable",
          fixedCode: `import urllib.request, urllib.error
try:
    urllib.request.urlopen('https://example.com/404')
except urllib.error.HTTPError as e:
    print(f'HTTP {e.code}')
except urllib.error.URLError as e:
    print('Network error')`,
          errorType: "logic",
          allowedAttempts: 4,
          hints: [{ level: "concept", text: "Swap the two except blocks so the subclass (HTTPError) comes first." }],
          feedback: { correct: "Fixed! HTTPError now comes before its parent class URLError.", incorrect: "Move the HTTPError except block above the URLError except block." },
        },
      ],
      reviewHooks: [
        { conceptId: "urllib-request", recallPrompt: "Why must HTTPError be caught before URLError?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-neterr-mc1", "s34-neterr-debug1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.11 Timeouts ───────────────────────────────────────────────────────
    {
      id: "s34-timeouts",
      stageId: "stage-34",
      title: "Timeouts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Set a timeout on urlopen calls",
        "Handle TimeoutError / URLError from expired timeouts",
        "Choose appropriate timeout values",
      ],
      prerequisites: ["s34-network-error-handling"],
      concepts: ["urllib-request"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Timeouts\n\nA **timeout** limits how long a network call will wait for a response. Without a timeout, a hanging server can block your program indefinitely.",
        },
        {
          kind: "code",
          language: "python",
          code: `import urllib.request
import urllib.error

try:
    with urllib.request.urlopen(
        'https://httpbin.org/delay/5',
        timeout=2          # seconds
    ) as resp:
        data = resp.read()
except urllib.error.URLError as e:
    if 'timed out' in str(e.reason).lower():
        print('Request timed out')
    else:
        print(f'Network error: {e.reason}')`,
          caption: "Setting and handling timeouts",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Reasonable timeout values",
          body: "Use 5–30 seconds for external API calls. Use shorter timeouts (1–3s) for health checks. Never use no timeout in production — always protect against hung connections.",
        },
        {
          kind: "why-matters",
          body: "Without timeouts, a single slow upstream service can exhaust your thread pool and take down your entire application. Timeouts are a key part of resilient network code.",
        },
      ],
      interactions: [
        {
          id: "s34-timeout-mc1",
          kind: "multiple-choice",
          prompt: "What happens if you omit the timeout parameter from urlopen in production code?",
          beginnerPurpose: "Understand the risk of no timeout",
          expectedConceptIds: ["urllib-request"],
          options: [
            { id: "a", text: "Python uses a default timeout of 30 seconds", isCorrect: false, explanation: "Without timeout=, urlopen can wait indefinitely." },
            { id: "b", text: "The call can block indefinitely if the server never responds", isCorrect: true, explanation: "No timeout = potentially infinite wait, blocking the thread." },
            { id: "c", text: "A TimeoutError is raised after 10 seconds automatically", isCorrect: false, explanation: "There is no automatic timeout without specifying one." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "No timeout = no safety net — the call waits forever for a reply." }],
          feedback: { correct: "Correct! Always set a timeout to prevent indefinite blocking.", incorrect: "Without a timeout, urlopen can hang forever." },
        },
        {
          id: "s34-timeout-fc1",
          kind: "fill-code",
          prompt: "Complete the urlopen call with a 5-second timeout:",
          beginnerPurpose: "Practice setting timeouts",
          expectedConceptIds: ["urllib-request"],
          codeTemplate: `import urllib.request
with urllib.request.urlopen('https://example.com', ___=5) as r:
    print(r.status)`,
          blanks: [{ placeholder: "___", answer: "timeout", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The parameter name is 'timeout'." }],
          feedback: { correct: "Correct! timeout=5 sets a 5-second limit.", incorrect: "The keyword argument is 'timeout'." },
        },
      ],
      reviewHooks: [
        { conceptId: "urllib-request", recallPrompt: "Why must you always set a timeout on network calls?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-timeout-mc1", "s34-timeout-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.12 Retries ────────────────────────────────────────────────────────
    {
      id: "s34-retries",
      stageId: "stage-34",
      title: "Retries",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Implement simple retry logic with a loop and sleep",
        "Use exponential backoff to avoid hammering a server",
        "Know which status codes warrant retrying",
      ],
      prerequisites: ["s34-network-error-handling", "s34-timeouts"],
      concepts: ["urllib-request"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Retries and Exponential Backoff\n\nTransient failures (timeouts, 503 Service Unavailable) often resolve quickly. Retrying with **exponential backoff** — waiting longer between each attempt — gives the server time to recover without overloading it.",
        },
        {
          kind: "code",
          language: "python",
          code: `import time
import urllib.request
import urllib.error

def fetch_with_retry(url: str, max_attempts: int = 3) -> bytes:
    for attempt in range(max_attempts):
        try:
            with urllib.request.urlopen(url, timeout=10) as resp:
                return resp.read()
        except (urllib.error.URLError, urllib.error.HTTPError) as e:
            if attempt == max_attempts - 1:
                raise
            wait = 2 ** attempt          # 1s, 2s, 4s
            print(f'Attempt {attempt+1} failed; retrying in {wait}s')
            time.sleep(wait)
    raise RuntimeError('unreachable')`,
          caption: "Retry with exponential backoff",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Do not retry on 4xx errors",
          body: "Only retry on transient errors: timeouts, 5xx responses (server errors), and connection resets. 4xx errors (400, 401, 404) are caused by the request itself — retrying will not help.",
        },
        {
          kind: "why-matters",
          body: "Retry logic is essential for reliable production systems. Networks are unreliable, and transient failures are normal. Without retries, every temporary blip becomes an application error.",
        },
      ],
      interactions: [
        {
          id: "s34-retry-mc1",
          kind: "multiple-choice",
          prompt: "Which HTTP status code should trigger a retry?",
          beginnerPurpose: "Know which errors are transient vs client-caused",
          expectedConceptIds: ["urllib-request"],
          options: [
            { id: "a", text: "404 Not Found", isCorrect: false, explanation: "404 means the resource does not exist — retrying will not help." },
            { id: "b", text: "503 Service Unavailable", isCorrect: true, explanation: "503 is a transient server error — the server is temporarily overloaded." },
            { id: "c", text: "400 Bad Request", isCorrect: false, explanation: "400 means your request is malformed — retrying the same request will always fail." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "5xx errors are server problems that may resolve; 4xx errors are client problems that won't." }],
          feedback: { correct: "Correct! 503 is transient and worth retrying.", incorrect: "Only transient server errors (5xx, timeouts) are worth retrying." },
        },
        {
          id: "s34-retry-po1",
          kind: "predict-output",
          prompt: "With max_attempts=3 and exponential backoff starting at 2^0, what are the three wait times?",
          beginnerPurpose: "Calculate exponential backoff delays",
          expectedConceptIds: ["urllib-request"],
          code: `for attempt in range(3):
    wait = 2 ** attempt
    print(wait)`,
          expectedOutput: "1\n2\n4",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "2^0=1, 2^1=2, 2^2=4" }],
          feedback: { correct: "Correct! 1s, 2s, 4s — each attempt doubles the wait.", incorrect: "Calculate 2^0, 2^1, 2^2." },
        },
      ],
      reviewHooks: [
        { conceptId: "urllib-request", recallPrompt: "What is exponential backoff and why is it used for retries?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-retry-mc1", "s34-retry-po1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.13 Rate limits ────────────────────────────────────────────────────
    {
      id: "s34-rate-limits",
      stageId: "stage-34",
      title: "Rate Limits",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Recognize a 429 Too Many Requests response",
        "Read the Retry-After header to honor rate limits",
        "Implement a simple rate-limiting delay between requests",
      ],
      prerequisites: ["s34-retries"],
      concepts: ["urllib-request"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Rate Limits\n\nAPIs protect themselves from abuse by limiting how many requests a client can make per second or minute. Exceeding the limit returns **429 Too Many Requests**.",
        },
        {
          kind: "code",
          language: "python",
          code: `import time
import urllib.request
import urllib.error

def rate_limited_fetch(url: str) -> bytes:
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            return resp.read()
    except urllib.error.HTTPError as e:
        if e.code == 429:
            retry_after = int(e.headers.get('Retry-After', 60))
            print(f'Rate limited; waiting {retry_after}s')
            time.sleep(retry_after)
            # retry once
            with urllib.request.urlopen(url, timeout=10) as resp:
                return resp.read()
        raise

# Add a delay between API calls to stay under limits
for item_id in range(100):
    data = rate_limited_fetch(f'https://api.example.com/items/{item_id}')
    time.sleep(0.1)   # 10 requests/sec max`,
          caption: "Handling rate limits",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Check rate limit headers",
          body: "Many APIs send headers like `X-RateLimit-Remaining` and `X-RateLimit-Reset`. Reading them proactively lets you slow down before hitting the 429.",
        },
        {
          kind: "why-matters",
          body: "Ignoring rate limits causes 429 errors, potential IP bans, and service disruptions. Respecting them keeps your integration reliable and your API access intact.",
        },
      ],
      interactions: [
        {
          id: "s34-ratelimit-mc1",
          kind: "multiple-choice",
          prompt: "What HTTP status code indicates you have exceeded the rate limit?",
          beginnerPurpose: "Know the rate limit status code",
          expectedConceptIds: ["urllib-request"],
          options: [
            { id: "a", text: "400", isCorrect: false, explanation: "400 is a bad request error." },
            { id: "b", text: "429", isCorrect: true, explanation: "429 Too Many Requests is the standard rate limit code." },
            { id: "c", text: "503", isCorrect: false, explanation: "503 is service unavailable, not a rate limit." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "HTTP 429 = Too Many Requests." }],
          feedback: { correct: "Correct! 429 Too Many Requests.", incorrect: "The rate limit status code is 429." },
        },
        {
          id: "s34-ratelimit-fc1",
          kind: "fill-code",
          prompt: "Complete the code to read the Retry-After header when rate limited:",
          beginnerPurpose: "Practice reading response headers after an error",
          expectedConceptIds: ["urllib-request"],
          codeTemplate: `except urllib.error.HTTPError as e:
    if e.code == 429:
        wait = int(e.headers.get('___', 60))
        time.sleep(wait)`,
          blanks: [{ placeholder: "___", answer: "Retry-After", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The header that tells you how long to wait is 'Retry-After'." }],
          feedback: { correct: "Correct! Retry-After tells you exactly how long to wait.", incorrect: "The header name is 'Retry-After'." },
        },
      ],
      reviewHooks: [
        { conceptId: "urllib-request", recallPrompt: "How do you detect and handle a 429 rate limit response?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-ratelimit-mc1", "s34-ratelimit-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.14 http.client ────────────────────────────────────────────────────
    {
      id: "s34-http-client",
      stageId: "stage-34",
      title: "http.client",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Make requests with http.client.HTTPConnection and HTTPSConnection",
        "Understand how http.client differs from urllib.request",
        "Know when to use each",
      ],
      prerequisites: ["s34-urllib-request"],
      concepts: ["http-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `http.client` — Lower-Level HTTP\n\n`http.client` is the lower-level module that `urllib.request` builds on. It gives you direct control over connections, requests, and responses but requires more code.",
        },
        {
          kind: "code",
          language: "python",
          code: `import http.client
import json

conn = http.client.HTTPSConnection('api.github.com')
conn.request(
    'GET', '/repos/python/cpython',
    headers={'User-Agent': 'my-app', 'Accept': 'application/json'},
)
resp = conn.getresponse()
print(resp.status)              # 200
body = resp.read().decode()
data = json.loads(body)
print(data['stargazers_count'])
conn.close()`,
          caption: "http.client for HTTPS requests",
        },
        {
          kind: "comparison",
          leftLabel: "urllib.request",
          rightLabel: "http.client",
          leftCode: `# Higher level, handles redirects
with urllib.request.urlopen(url) as r:
    data = json.loads(r.read())`,
          rightCode: `# Lower level, explicit connection
conn = http.client.HTTPSConnection(host)
conn.request('GET', path)
r = conn.getresponse()
data = json.loads(r.read())
conn.close()`,
          caption: "urllib.request vs http.client",
        },
        {
          kind: "why-matters",
          body: "Understanding http.client demystifies what urllib does internally. It is also useful when you need fine-grained control over HTTP connections, such as connection reuse or custom proxying.",
        },
      ],
      interactions: [
        {
          id: "s34-httpclient-mc1",
          kind: "multiple-choice",
          prompt: "What is the primary reason to use http.client over urllib.request?",
          beginnerPurpose: "Know when each HTTP module is appropriate",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "http.client supports HTTPS; urllib.request does not", isCorrect: false, explanation: "Both support HTTPS." },
            { id: "b", text: "When you need fine-grained control over the HTTP connection itself", isCorrect: true, explanation: "http.client exposes the raw connection, letting you reuse it and control every detail." },
            { id: "c", text: "http.client is faster for all requests", isCorrect: false, explanation: "Performance difference is negligible; the choice is about control." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "urllib wraps http.client; use http.client when you need what the wrapper hides." }],
          feedback: { correct: "Correct! http.client gives lower-level connection control.", incorrect: "http.client is useful for fine-grained connection management." },
        },
        {
          id: "s34-httpclient-po1",
          kind: "predict-output",
          prompt: "What does resp.status contain after a successful HTTPS request?",
          beginnerPurpose: "Understand where the status code appears in http.client",
          expectedConceptIds: ["http-protocol"],
          code: `# Simulated successful response
# conn.getresponse() returns an HTTPResponse
# with .status = 200 for success
import http.client
# (conceptual — assume the request succeeded)
print(200)`,
          expectedOutput: "200",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The status property holds the integer HTTP status code." }],
          feedback: { correct: "Correct! resp.status is 200 for a successful response.", incorrect: "resp.status holds the integer status code." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-protocol", recallPrompt: "When would you use http.client instead of urllib.request?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-httpclient-mc1", "s34-httpclient-po1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.15 http.server ────────────────────────────────────────────────────
    {
      id: "s34-http-server",
      stageId: "stage-34",
      title: "http.server",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Serve static files with http.server.SimpleHTTPRequestHandler",
        "Write a custom handler by subclassing BaseHTTPRequestHandler",
        "Start a server in a thread for testing",
      ],
      prerequisites: ["s34-http-client"],
      concepts: ["http-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `http.server` — Simple HTTP Server\n\n`http.server` provides a minimal HTTP server suitable for development, testing, and file sharing. It is not for production use but is invaluable for local development and integration tests.",
        },
        {
          kind: "code",
          language: "python",
          code: `from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class EchoHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        payload = json.dumps({'path': self.path}).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, *args):
        pass   # silence default logging

# Run in a thread so it does not block
import threading
server = HTTPServer(('localhost', 8765), EchoHandler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()
print('Server running on :8765')`,
          caption: "Custom HTTP request handler",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Not for production",
          body: "`http.server` is single-threaded and has no security hardening. For production, use a proper ASGI/WSGI server like uvicorn, gunicorn, or waitress.",
        },
        {
          kind: "why-matters",
          body: "Local HTTP servers are perfect for integration tests that require a real server, mock APIs, and file serving during development. They are frequently used in test fixtures.",
        },
      ],
      interactions: [
        {
          id: "s34-httpserver-mc1",
          kind: "multiple-choice",
          prompt: "In BaseHTTPRequestHandler, which method handles GET requests?",
          beginnerPurpose: "Know the naming convention for HTTP method handlers",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "handle_get()", isCorrect: false, explanation: "Not the correct naming convention." },
            { id: "b", text: "do_GET()", isCorrect: true, explanation: "The convention is do_METHOD() — e.g., do_GET, do_POST." },
            { id: "c", text: "on_get()", isCorrect: false, explanation: "Not the correct naming convention." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The pattern is do_ followed by the HTTP method name in uppercase." }],
          feedback: { correct: "Correct! do_GET() is the convention.", incorrect: "The naming convention is do_METHOD() — e.g., do_GET, do_POST." },
        },
        {
          id: "s34-httpserver-ple1",
          kind: "plain-language-explain",
          prompt: "Explain what the EchoHandler does and how to send a response in do_GET.",
          beginnerPurpose: "Articulate the three steps to send an HTTP response",
          expectedConceptIds: ["http-protocol"],
          code: `def do_GET(self):
    self.send_response(200)
    self.send_header('Content-Type', 'application/json')
    self.end_headers()
    self.wfile.write(b'{"ok": true}')`,
          keyPointsToHit: [
            "send_response sets the status code",
            "send_header adds response headers",
            "end_headers finalizes the header section",
            "wfile.write sends the body bytes",
          ],
          sampleAnswer: "do_GET responds to HTTP GET requests. First send_response(200) sets the status code. Then send_header adds headers like Content-Type. end_headers signals the end of the header section. Finally, wfile.write sends the response body as bytes.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Describe each of the four method calls in order." }],
          feedback: { correct: "Excellent!", incorrect: "Describe the four steps: send_response, send_header, end_headers, wfile.write." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-protocol", recallPrompt: "What are the steps to send a response in BaseHTTPRequestHandler?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-httpserver-mc1", "s34-httpserver-ple1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.16 socket module ──────────────────────────────────────────────────
    {
      id: "s34-socket-module",
      stageId: "stage-34",
      title: "The socket Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a TCP client socket that connects to a server",
        "Understand the client-server socket lifecycle",
        "Know when to use sockets versus higher-level abstractions",
      ],
      prerequisites: ["s34-http-client"],
      concepts: ["socket-programming"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The `socket` Module\n\nSockets are the lowest-level networking abstraction in Python. HTTP, SMTP, and every other protocol sit on top of TCP sockets. Understanding sockets demystifies how network protocols work.",
        },
        {
          kind: "code",
          language: "python",
          code: `import socket

# TCP client — connect to a server
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect(('example.com', 80))
    # Send raw HTTP/1.0 request
    s.sendall(b'GET / HTTP/1.0\\r\\nHost: example.com\\r\\n\\r\\n')
    # Receive response in chunks
    chunks = []
    while True:
        data = s.recv(4096)
        if not data:
            break
        chunks.append(data)
    response = b''.join(chunks)
    print(response[:200].decode(errors='replace'))`,
          caption: "Raw TCP socket HTTP request",
        },
        {
          kind: "mental-model",
          title: "Sockets as Phone Calls",
          analogy: "A socket is like a phone call: you dial (connect), talk (send/recv), and hang up (close). HTTP is a protocol for what you say during the call — sockets are the call itself.",
          explanation: "urllib and http.client manage the 'phone call' for you; socket gives you access to the phone hardware.",
        },
        {
          kind: "why-matters",
          body: "Knowing sockets lets you implement custom protocols, build network tools, understand network-level debugging, and work with protocols that have no Python library yet.",
        },
      ],
      interactions: [
        {
          id: "s34-socket-mc1",
          kind: "multiple-choice",
          prompt: "Which socket type is used for TCP connections?",
          beginnerPurpose: "Know the socket type constant for TCP",
          expectedConceptIds: ["socket-programming"],
          options: [
            { id: "a", text: "socket.SOCK_DGRAM", isCorrect: false, explanation: "SOCK_DGRAM is for UDP (datagrams), not TCP." },
            { id: "b", text: "socket.SOCK_STREAM", isCorrect: true, explanation: "SOCK_STREAM provides a reliable, ordered byte stream — which is TCP." },
            { id: "c", text: "socket.SOCK_RAW", isCorrect: false, explanation: "SOCK_RAW gives access to raw IP packets; requires root and is rarely used." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "TCP provides a 'stream' of bytes; the constant name reflects this." }],
          feedback: { correct: "Correct! SOCK_STREAM is TCP.", incorrect: "TCP is a stream protocol; the constant is SOCK_STREAM." },
        },
        {
          id: "s34-socket-ple1",
          kind: "plain-language-explain",
          prompt: "Explain in plain language what a socket is and how it relates to HTTP.",
          beginnerPurpose: "Understand the layered relationship between sockets and HTTP",
          expectedConceptIds: ["socket-programming"],
          code: `# HTTP is a text protocol that runs over a TCP socket
# urllib.request creates a socket, sends the HTTP request,
# reads the HTTP response, then closes the socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('example.com', 80))
s.sendall(b'GET / HTTP/1.0\\r\\nHost: example.com\\r\\n\\r\\n')`,
          keyPointsToHit: [
            "A socket is a two-way communication channel over a network",
            "TCP sockets provide ordered, reliable byte streams",
            "HTTP is a protocol that rides on top of TCP sockets",
          ],
          sampleAnswer: "A socket is a low-level two-way communication channel between two machines over a network. TCP sockets (SOCK_STREAM) provide a reliable, ordered stream of bytes. HTTP is a higher-level protocol that runs on top of TCP — it defines the format of messages (request line, headers, body). Libraries like urllib hide the socket details so you work with URLs and response objects instead.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Describe layers: socket = connection, HTTP = what you say over it." }],
          feedback: { correct: "Excellent!", incorrect: "Explain that HTTP rides on top of TCP sockets." },
        },
      ],
      reviewHooks: [
        { conceptId: "socket-programming", recallPrompt: "What socket type constant is used for TCP connections?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-socket-mc1", "s34-socket-ple1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.17 DNS concepts ───────────────────────────────────────────────────
    {
      id: "s34-dns-concepts",
      stageId: "stage-34",
      title: "DNS Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what DNS does at a high level",
        "Resolve a hostname with socket.getaddrinfo",
        "Understand how DNS failures cause URLError",
      ],
      prerequisites: ["s34-socket-module"],
      concepts: ["socket-programming"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## DNS — Domain Name System\n\nDNS translates human-readable hostnames (`example.com`) to IP addresses (`93.184.216.34`). Before any TCP connection is made, Python looks up the hostname in DNS.",
        },
        {
          kind: "code",
          language: "python",
          code: `import socket

# Resolve a hostname to IP addresses
results = socket.getaddrinfo('python.org', 80)
for family, type_, proto, canonname, sockaddr in results:
    print(sockaddr)  # ('151.101.x.x', 80)

# Quick lookup
ip = socket.gethostbyname('python.org')
print(ip)

# Reverse lookup (IP to hostname)
hostname, _, _ = socket.gethostbyaddr('8.8.8.8')
print(hostname)  # dns.google`,
          caption: "DNS lookups with socket",
        },
        {
          kind: "callout",
          variant: "info",
          title: "DNS failures become URLError",
          body: "When a hostname cannot be resolved (e.g., typo in the domain), `urllib.request.urlopen` raises `urllib.error.URLError` with a message like 'Name or service not known'. This is a DNS failure, not an HTTP error.",
        },
        {
          kind: "why-matters",
          body: "Understanding DNS helps you diagnose 'URLError: Name or service not known' errors — they mean the hostname could not be resolved, not that the server returned an error.",
        },
      ],
      interactions: [
        {
          id: "s34-dns-mc1",
          kind: "multiple-choice",
          prompt: "A urllib.request.urlopen call raises URLError with 'Name or service not known'. What is the cause?",
          beginnerPurpose: "Diagnose DNS resolution failures",
          expectedConceptIds: ["socket-programming"],
          options: [
            { id: "a", text: "The server returned a 404 error", isCorrect: false, explanation: "404 would raise HTTPError, not URLError with a DNS message." },
            { id: "b", text: "The hostname could not be resolved to an IP address", isCorrect: true, explanation: "'Name or service not known' is a DNS resolution failure." },
            { id: "c", text: "The request timed out", isCorrect: false, explanation: "Timeouts produce 'timed out' in the URLError reason." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "'Name or service not known' is the OS error message for DNS failure." }],
          feedback: { correct: "Correct! DNS lookup failed.", incorrect: "'Name or service not known' means DNS could not resolve the hostname." },
        },
        {
          id: "s34-dns-fc1",
          kind: "fill-code",
          prompt: "Complete the code to get the IP address for 'python.org':",
          beginnerPurpose: "Practice DNS resolution with socket",
          expectedConceptIds: ["socket-programming"],
          codeTemplate: `import socket
ip = socket.___ ('python.org')
print(ip)`,
          blanks: [{ placeholder: "___", answer: "gethostbyname", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The function gets a host's IP by its name: gethostbyname." }],
          feedback: { correct: "Correct! socket.gethostbyname resolves a hostname.", incorrect: "The function is socket.gethostbyname()." },
        },
      ],
      reviewHooks: [
        { conceptId: "socket-programming", recallPrompt: "What does 'Name or service not known' mean in a URLError?", nextReviewAfterDays: 7 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-dns-mc1", "s34-dns-fc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.18 TLS concepts ───────────────────────────────────────────────────
    {
      id: "s34-tls-concepts",
      stageId: "stage-34",
      title: "TLS Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what TLS provides: encryption, authentication, integrity",
        "Understand SSL certificate verification in Python",
        "Know why disabling SSL verification is dangerous",
      ],
      prerequisites: ["s34-socket-module"],
      concepts: ["http-protocol"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## TLS — Transport Layer Security\n\nTLS (formerly SSL) encrypts network traffic and verifies that you are talking to the real server. HTTPS = HTTP over TLS. Python verifies TLS certificates by default.",
        },
        {
          kind: "code",
          language: "python",
          code: `import ssl
import urllib.request

# Default: certificate verification enabled (safe)
with urllib.request.urlopen('https://python.org') as r:
    print(r.status)  # 200

# Create an SSL context with custom settings
ctx = ssl.create_default_context()
ctx.check_hostname = True     # verify hostname matches cert
ctx.verify_mode = ssl.CERT_REQUIRED  # always verify

# What NOT to do — disables all security
bad_ctx = ssl._create_unverified_context()
# Never use in production!`,
          caption: "TLS and certificate verification",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never disable SSL verification in production",
          body: "Disabling SSL verification (`ssl._create_unverified_context()`) exposes your application to man-in-the-middle attacks. Attackers can intercept and modify all traffic. If you get certificate errors, fix the certificate — do not disable verification.",
        },
        {
          kind: "why-matters",
          body: "HTTPS is the minimum security baseline for any web communication. Understanding TLS helps you troubleshoot certificate errors correctly instead of just disabling verification.",
        },
      ],
      interactions: [
        {
          id: "s34-tls-mc1",
          kind: "multiple-choice",
          prompt: "What does TLS certificate verification protect against?",
          beginnerPurpose: "Understand why TLS verification matters",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "Rate limiting", isCorrect: false, explanation: "Rate limiting is a server policy, not a TLS concern." },
            { id: "b", text: "Man-in-the-middle attacks where an attacker impersonates the server", isCorrect: true, explanation: "Certificate verification ensures you are talking to the real server, not an impersonator." },
            { id: "c", text: "Slow network connections", isCorrect: false, explanation: "TLS does not affect network speed meaningfully." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "TLS verification confirms the server's identity, not just encrypts traffic." }],
          feedback: { correct: "Correct! Verification prevents MITM attacks.", incorrect: "TLS verification confirms you are talking to the legitimate server." },
        },
        {
          id: "s34-tls-mc2",
          kind: "multiple-choice",
          prompt: "You get an SSL certificate verification error in development. What is the CORRECT approach?",
          beginnerPurpose: "Handle certificate errors safely",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "Disable SSL verification with ssl._create_unverified_context()", isCorrect: false, explanation: "This removes all security and is dangerous even in development." },
            { id: "b", text: "Trust the development certificate by adding it to the SSL context's CA bundle", isCorrect: true, explanation: "Adding the dev cert to the trusted CA bundle maintains security while working locally." },
            { id: "c", text: "Use HTTP instead of HTTPS", isCorrect: false, explanation: "This removes encryption entirely." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Fix the certificate problem, not the security mechanism." }],
          feedback: { correct: "Correct! Add the certificate to the trust store.", incorrect: "Fix the certificate rather than disabling security." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-protocol", recallPrompt: "Why should you never disable SSL certificate verification?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-tls-mc1", "s34-tls-mc2"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.19 API client project ─────────────────────────────────────────────
    {
      id: "s34-api-client-project",
      stageId: "stage-34",
      title: "API Client Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Build a typed API client class that wraps urllib.request",
        "Implement retry logic and timeout handling",
        "Parse JSON responses and handle errors gracefully",
      ],
      prerequisites: ["s34-json-apis", "s34-retries", "s34-timeouts"],
      concepts: ["urllib-request", "json-apis"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## API Client Project\n\nBring together URL construction, headers, error handling, retries, and timeouts into a reusable API client class.",
        },
        {
          kind: "code",
          language: "python",
          code: `import json
import time
import urllib.request
import urllib.error
from typing import Any

class APIClient:
    def __init__(self, base_url: str, token: str, timeout: int = 10):
        self.base_url = base_url.rstrip('/')
        self.token = token
        self.timeout = timeout

    def _request(self, method: str, path: str, body: Any = None) -> Any:
        url = f'{self.base_url}{path}'
        data = json.dumps(body).encode() if body else None
        headers: dict[str, str] = {
            'Authorization': f'Bearer {self.token}',
            'Accept': 'application/json',
        }
        if data:
            headers['Content-Type'] = 'application/json'
        req = urllib.request.Request(url, data=data, headers=headers, method=method)
        for attempt in range(3):
            try:
                with urllib.request.urlopen(req, timeout=self.timeout) as r:
                    return json.loads(r.read().decode())
            except urllib.error.HTTPError as e:
                if e.code in (429, 503) and attempt < 2:
                    time.sleep(2 ** attempt)
                    continue
                raise
            except urllib.error.URLError:
                if attempt < 2:
                    time.sleep(2 ** attempt)
                    continue
                raise

    def get(self, path: str) -> Any:
        return self._request('GET', path)

    def post(self, path: str, body: Any) -> Any:
        return self._request('POST', path, body)`,
          caption: "Reusable API client with retries",
        },
        {
          kind: "why-matters",
          body: "Wrapping HTTP calls in a client class keeps retry logic, authentication, and error handling in one place. Every real application that calls external APIs benefits from this pattern.",
        },
      ],
      interactions: [
        {
          id: "s34-apiclient-mc1",
          kind: "multiple-choice",
          prompt: "In the APIClient above, which status codes trigger a retry?",
          beginnerPurpose: "Review the retry policy in the client",
          expectedConceptIds: ["urllib-request"],
          options: [
            { id: "a", text: "404 and 500", isCorrect: false, explanation: "404 is not retried (client error). The client retries 429 and 503." },
            { id: "b", text: "429 and 503", isCorrect: true, explanation: "429 (rate limit) and 503 (temporary unavailability) are transient and worth retrying." },
            { id: "c", text: "All 5xx errors", isCorrect: false, explanation: "Only 429 and 503 are in the retry list; other 5xx errors are re-raised." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Look at the `if e.code in (...)` condition in the code." }],
          feedback: { correct: "Correct! 429 and 503 are retried.", incorrect: "Check the 'if e.code in' condition in _request." },
        },
        {
          id: "s34-apiclient-rc1",
          kind: "run-code",
          prompt: "Implement a simple function that fetches todos from jsonplaceholder with a 5s timeout and returns the first todo's title.",
          beginnerPurpose: "Practice combining urlopen, json, and timeout",
          expectedConceptIds: ["json-apis"],
          starterCode: `import urllib.request
import json

def get_first_todo_title() -> str:
    url = 'https://jsonplaceholder.typicode.com/todos/1'
    # your code here
    pass

print(get_first_todo_title())`,
          task: "Fetch the todo at /todos/1 with timeout=5 and return its title",
          pyodideCompatible: false,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "Use urllib.request.urlopen(url, timeout=5) and json.loads." },
            { level: "syntax", text: "return json.loads(resp.read().decode())['title']" },
          ],
          feedback: { correct: "Excellent API call!", incorrect: "Fetch the URL with timeout=5, parse the JSON, return data['title']." },
        },
      ],
      reviewHooks: [
        { conceptId: "json-apis", recallPrompt: "What components make up a robust API client class?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-apiclient-mc1", "s34-apiclient-rc1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ─── 34.20 Local HTTP server project ──────────────────────────────────────
    {
      id: "s34-local-server-project",
      stageId: "stage-34",
      title: "Local HTTP Server Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Build a local mock API server for testing",
        "Serve JSON responses based on request paths",
        "Start the server in a background thread and shut it down after tests",
      ],
      prerequisites: ["s34-http-server", "s34-json-apis"],
      concepts: ["http-protocol", "urllib-request"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Local HTTP Server Project\n\nBuild a local mock API server that your tests can call. This technique is used widely in integration testing to avoid real network calls.",
        },
        {
          kind: "code",
          language: "python",
          code: `import json
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer

FAKE_DATA = {
    '/users/1': {'id': 1, 'name': 'Alice'},
    '/users/2': {'id': 2, 'name': 'Bob'},
}

class MockAPIHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path in FAKE_DATA:
            payload = json.dumps(FAKE_DATA[self.path]).encode()
            self.send_response(200)
        else:
            payload = b'{"error": "not found"}'
            self.send_response(404)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, *args):
        pass   # suppress output during tests

def start_mock_server(port: int) -> HTTPServer:
    server = HTTPServer(('localhost', port), MockAPIHandler)
    t = threading.Thread(target=server.serve_forever, daemon=True)
    t.start()
    return server

# Use in tests
server = start_mock_server(9876)
import urllib.request
resp = urllib.request.urlopen('http://localhost:9876/users/1')
print(json.loads(resp.read()))  # {'id': 1, 'name': 'Alice'}
server.shutdown()`,
          caption: "Mock API server for integration tests",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use random ports to avoid conflicts",
          body: "Use `HTTPServer(('localhost', 0), Handler)` to let the OS pick a free port. Access the assigned port via `server.server_address[1]`.",
        },
        {
          kind: "why-matters",
          body: "Integration tests that hit real servers are slow and unreliable. A local mock server makes tests fast, deterministic, and free from external dependencies.",
        },
      ],
      interactions: [
        {
          id: "s34-mockserver-mc1",
          kind: "multiple-choice",
          prompt: "Why is daemon=True set when starting the server thread?",
          beginnerPurpose: "Understand daemon threads in test servers",
          expectedConceptIds: ["http-protocol"],
          options: [
            { id: "a", text: "To make the server run faster", isCorrect: false, explanation: "Daemon threads don't affect speed." },
            { id: "b", text: "So the server thread does not prevent the main program from exiting", isCorrect: true, explanation: "Daemon threads are killed automatically when the main thread exits." },
            { id: "c", text: "To allow multiple connections simultaneously", isCorrect: false, explanation: "Threading for concurrency is different from daemon mode." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Daemon threads die when the main thread dies — they don't block process exit." }],
          feedback: { correct: "Correct! Daemon threads exit with the main program.", incorrect: "A daemon thread won't block the process from exiting." },
        },
        {
          id: "s34-mockserver-ple1",
          kind: "plain-language-explain",
          prompt: "Explain how MockAPIHandler decides what to return and how the response is sent.",
          beginnerPurpose: "Trace the mock server request handling",
          expectedConceptIds: ["http-protocol"],
          code: `def do_GET(self):
    if self.path in FAKE_DATA:
        payload = json.dumps(FAKE_DATA[self.path]).encode()
        self.send_response(200)
    else:
        payload = b'{"error": "not found"}'
        self.send_response(404)
    self.send_header('Content-Type', 'application/json')
    self.end_headers()
    self.wfile.write(payload)`,
          keyPointsToHit: [
            "self.path contains the request URL path",
            "Status 200 for found, 404 for not found",
            "JSON body is written to wfile",
          ],
          sampleAnswer: "do_GET checks self.path against FAKE_DATA. If the path is known, it serializes the data as JSON and sets status 200. Otherwise it returns a 404 with an error message. In both cases it sets Content-Type to application/json, ends the headers, and writes the JSON bytes to self.wfile.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Trace what happens for a known path vs unknown path." }],
          feedback: { correct: "Excellent!", incorrect: "Describe the if/else branch, the status codes, and how the body is sent." },
        },
      ],
      reviewHooks: [
        { conceptId: "http-protocol", recallPrompt: "How do you build a local mock HTTP server for tests?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s34-mockserver-mc1", "s34-mockserver-ple1"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s34-project",
    stageId: "stage-34",
    title: "API Client and Local HTTP Server",
    brief:
      "Build a typed API client that fetches data from a public REST API with retry logic and error handling, then write integration tests using a local mock HTTP server.",
    requirements: [
      "Implement an APIClient class with GET and POST methods using urllib.request",
      "Support configurable timeouts and exponential backoff retries for 429 and 503",
      "Parse JSON responses and raise meaningful errors for non-2xx status codes",
      "Build a MockAPIHandler and start_mock_server function for use in tests",
      "Write at least three integration tests using the mock server",
      "Add type annotations to all public functions and methods",
    ],
    acceptanceCriteria: [
      "API client correctly fetches and parses JSON from a real API",
      "Retry logic is tested by simulating 503 responses from the mock server",
      "Mock server returns 200 for known paths and 404 for unknown paths",
      "All type annotations are present and accurate",
    ],
    conceptIds: ["http-protocol", "urllib-request", "json-apis"],
    difficulty: "intermediate",
  },
} satisfies Stage;
