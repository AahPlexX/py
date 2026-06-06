import type { Stage } from "@/course/course.schema";

export const stage35 = {
  id: "stage-35",
  number: 35,
  title: "Databases, Persistence, and Local Storage",
  summary:
    "Store and query structured data using SQLite with Python's sqlite3 module, with proper parameterized queries and transaction management.",
  level: "intermediate",
  masteryGateConceptIds: ["sqlite-database", "sql-injection-prevention"],
  lessons: [
    {
      id: "s35-persistence-concepts",
      stageId: "stage-35",
      title: "Persistence Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what persistence means",
        "Compare persistence options in Python",
        "Choose the right storage approach for a use case",
      ],
      prerequisites: [],
      concepts: ["sqlite-database"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Persistence\n\n**Persistence** means data survives after the program exits.\n\n| Approach | Best for |\n|----------|----------|\n| JSON/CSV files | Simple, human-readable data |\n| SQLite | Structured, queryable data — no server needed |\n| Pickle/Shelve | Fast Python-native objects |\n| PostgreSQL/MySQL | Multi-user, concurrent access |\n\nFor most local applications, **SQLite** via Python's built-in `sqlite3` module is the right choice.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "SQLite is a file, not a server",
          body: "SQLite stores data in a single `.db` file. No server to start, no credentials, no network. It's embedded in the same process as your Python code.",
        },
      ],
      interactions: [
        {
          id: "s35-persist-mc",
          kind: "multiple-choice",
          prompt: "You're building a local task manager app. User data must persist between runs. What's the simplest approach?",
          beginnerPurpose: "Choose the right persistence tool",
          expectedConceptIds: ["sqlite-database"],
          options: [
            { id: "a", text: "Set up a PostgreSQL server", isCorrect: false, explanation: "A server is overkill for a local single-user app." },
            { id: "b", text: "Use SQLite via the sqlite3 module", isCorrect: true, explanation: "Correct! SQLite is built in, serverless, and perfect for local apps." },
            { id: "c", text: "Store in global variables", isCorrect: false, explanation: "Global variables disappear when the program exits — no persistence." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The lightest solution for local data is SQLite." }],
          feedback: { correct: "Correct! SQLite is ideal for local applications.", incorrect: "SQLite is the right fit — serverless, built-in, persistent." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s35-persist-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s35-sqlite-basics",
      stageId: "stage-35",
      title: "sqlite3: Connect, Create, Insert, Select",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Connect to an SQLite database",
        "Create tables with CREATE TABLE",
        "Insert and retrieve rows",
      ],
      prerequisites: ["s35-persistence-concepts"],
      concepts: ["sqlite-database"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## sqlite3 Basics\n\n```python\nimport sqlite3\n\n# Connect (creates file if it doesn't exist)\nconn = sqlite3.connect('tasks.db')\ncursor = conn.cursor()\n\n# Create table\ncursor.execute('''\n    CREATE TABLE IF NOT EXISTS tasks (\n        id    INTEGER PRIMARY KEY AUTOINCREMENT,\n        title TEXT NOT NULL,\n        done  INTEGER DEFAULT 0\n    )\n''')\n\n# Insert a row\ncursor.execute('INSERT INTO tasks (title) VALUES (?)', ('Buy groceries',))\nconn.commit()  # save changes\n\n# Select rows\nfor row in cursor.execute('SELECT id, title, done FROM tasks'):\n    print(row)\n\nconn.close()\n```\n\nUse `:memory:` as the filename for an in-memory database (useful for tests).",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Use context managers for connections",
          body: "Use `with sqlite3.connect('db.db') as conn:` — this automatically commits on success and rolls back on exception. You still need to call conn.close() or use a second with.",
        },
      ],
      interactions: [
        {
          id: "s35-sqlite-fill",
          kind: "fill-code",
          prompt: "Complete the INSERT to use parameterized query.",
          beginnerPurpose: "Use parameterized queries",
          expectedConceptIds: ["sqlite-database"],
          codeTemplate: "import sqlite3\nconn = sqlite3.connect(':memory:')\nc = conn.cursor()\nc.execute('CREATE TABLE users (name TEXT, age INTEGER)')\n\nname, age = 'Alice', 30\nc.execute('INSERT INTO users VALUES (?, ?)', (_____, _____))\nconn.commit()",
          blanks: [
            { placeholder: "_____", answer: "name", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Pass the values as a tuple in the second argument." }],
          feedback: { correct: "Correct! (name, age) passes the values safely.", incorrect: "Pass (name, age) as the tuple of values." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s35-sqlite-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s35-sql-injection",
      stageId: "stage-35",
      title: "Parameterized Queries and SQL Injection Prevention",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what SQL injection is",
        "Always use parameterized queries (never string formatting)",
        "Identify vulnerable vs safe SQL patterns",
      ],
      prerequisites: ["s35-sqlite-basics"],
      concepts: ["sql-injection-prevention"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## SQL Injection\n\n**SQL injection** happens when user input is inserted directly into a SQL string, allowing an attacker to modify the query:\n\n```python\n# VULNERABLE -- never do this\nname = \"' OR '1'='1\"  # attacker-controlled\ncursor.execute(f\"SELECT * FROM users WHERE name = '{name}'\")\n# Executed query: SELECT * FROM users WHERE name = '' OR '1'='1'\n# This returns ALL users!\n```\n\n**Safe — always use parameterized queries:**\n```python\nname = \"' OR '1'='1\"\ncursor.execute('SELECT * FROM users WHERE name = ?', (name,))\n# The ? placeholder is treated as a value, never as SQL code\n# Returns no rows (correct behavior)\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never format user input into SQL",
          body: "No amount of manual sanitization is safe. f-strings, %-formatting, and .format() in SQL strings are all dangerous. Always use ? placeholders.",
        },
        {
          kind: "why-matters",
          body: "SQL injection is one of the most common and dangerous web vulnerabilities. It can expose all database data, modify or delete records, and bypass authentication.",
        },
      ],
      interactions: [
        {
          id: "s35-injection-mc",
          kind: "multiple-choice",
          prompt: "Which SQL execution is safe from injection?",
          beginnerPurpose: "Identify safe vs vulnerable patterns",
          expectedConceptIds: ["sql-injection-prevention"],
          options: [
            { id: "a", text: "cursor.execute(f\"SELECT * FROM users WHERE id = {user_id}\")", isCorrect: false, explanation: "f-string formatting in SQL is vulnerable to injection." },
            { id: "b", text: "cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))", isCorrect: true, explanation: "Correct! The ? placeholder treats user_id as a value, never as SQL." },
            { id: "c", text: "cursor.execute('SELECT * FROM users WHERE id = ' + str(user_id))", isCorrect: false, explanation: "String concatenation is also vulnerable — user_id could contain malicious SQL." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The safe form uses ? as a placeholder." }],
          feedback: { correct: "Correct! Always use ? placeholders.", incorrect: "Only ? placeholders are safe. Never format user input into SQL strings." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s35-injection-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s35-transactions",
      stageId: "stage-35",
      title: "Transactions, Commits, and Rollbacks",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain what a database transaction is",
        "Use commit() to save changes",
        "Use rollback() to undo uncommitted changes",
      ],
      prerequisites: ["s35-sql-injection"],
      concepts: ["sqlite-database"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Transactions\n\nA **transaction** is a sequence of operations that succeeds completely or fails completely — no partial states.\n\n```python\nimport sqlite3\n\nconn = sqlite3.connect('bank.db')\ntry:\n    conn.execute('UPDATE accounts SET balance = balance - 100 WHERE id = 1')\n    conn.execute('UPDATE accounts SET balance = balance + 100 WHERE id = 2')\n    conn.commit()  # both changes saved atomically\nexcept Exception:\n    conn.rollback()  # undo both changes if anything failed\nfinally:\n    conn.close()\n```\n\nWithout transactions, if the second UPDATE fails, account 1 loses money but account 2 never receives it.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "sqlite3 auto-commit mode",
          body: "By default, sqlite3 opens a transaction automatically and you must call commit(). Pass isolation_level=None to disable transactions (auto-commit), but this is rarely what you want.",
        },
      ],
      interactions: [
        {
          id: "s35-tx-mc",
          kind: "multiple-choice",
          prompt: "Two account updates are in one transaction. The second fails. What happens to the first?",
          beginnerPurpose: "Understand atomicity",
          expectedConceptIds: ["sqlite-database"],
          options: [
            { id: "a", text: "The first update stays committed", isCorrect: false, explanation: "Without commit, no changes are saved. If you rollback, both are undone." },
            { id: "b", text: "Both updates are rolled back", isCorrect: true, explanation: "Correct! Transactions are atomic — all-or-nothing. A failure rolls back all uncommitted changes." },
            { id: "c", text: "The first update is committed automatically", isCorrect: false, explanation: "Auto-commit is off by default in sqlite3. You must call commit() explicitly." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Atomic = all succeed or all are undone." }],
          feedback: { correct: "Correct! Transactions are atomic.", incorrect: "Transactions are all-or-nothing — if one operation fails, everything is rolled back." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s35-tx-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s35-project",
    stageId: "stage-35",
    title: "Database-Backed CLI Application",
    brief:
      "Build a contact management CLI that stores contacts in SQLite with full CRUD operations, parameterized queries, and proper transaction management.",
    requirements: [
      "Commands: add, list, search, update, delete",
      "SQLite storage in a contacts.db file",
      "All queries use parameterized ? placeholders",
      "Changes wrapped in transactions",
      "Type annotations on all functions",
    ],
    acceptanceCriteria: [
      "All CRUD operations work correctly",
      "No SQL injection vulnerabilities",
      "Data persists between program runs",
    ],
    conceptIds: ["sqlite-database", "sql-injection-prevention"],
    difficulty: "intermediate",
  },
} satisfies Stage;
