import type { Stage } from "@/course/course.schema";

export const stage52 = {
  id: "stage-52",
  number: 52,
  title: "Final Mastery Capstone",
  summary:
    "Integrate all course concepts in a substantial production-quality Python project: design, implement, test, document, package, and deploy a complete application.",
  level: "advanced",
  masteryGateConceptIds: ["capstone-integration", "production-readiness"],
  lessons: [
    {
      id: "s52-capstone-planning",
      stageId: "stage-52",
      title: "Planning a Production Python Project",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Define project scope with user stories",
        "Choose appropriate libraries and architecture",
        "Create a project plan with milestones",
      ],
      prerequisites: [],
      concepts: ["capstone-integration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Project Planning\n\nProduction projects require planning before coding:\n\n**1. Define the problem clearly**\n```\nUser story: As a developer, I want to monitor my API endpoints\nso that I can detect failures within 1 minute.\n```\n\n**2. Choose your stack**\n\n| Need | Options |\n|------|---------|\n| HTTP | httpx, requests |\n| Database | sqlite3, SQLAlchemy, SQLModel |\n| CLI | click, typer |\n| Config | pydantic-settings, dynaconf |\n| Testing | pytest, hypothesis |\n| Packaging | pyproject.toml + hatchling |\n\n**3. Architecture first**\n```\nproject/\n├── src/myapp/\n│   ├── domain/     # business logic, no I/O\n│   ├── adapters/   # database, HTTP, external APIs\n│   └── cli.py      # entry point\n├── tests/\n├── pyproject.toml\n└── README.md\n```\n\n**4. Milestones**\n- M1: Core domain model + tests pass\n- M2: Storage adapter + integration tests\n- M3: CLI + end-to-end tests\n- M4: Package + publish to TestPyPI",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Domain-first development",
          body: "Write and test the domain layer (pure Python, no I/O) first. This lets you iterate on the core logic without needing a database or HTTP server. Add adapters only after the domain is correct.",
        },
      ],
      interactions: [
        {
          id: "s52-plan-mc",
          kind: "multiple-choice",
          prompt: "Which layer should you implement and test first in a domain-driven project?",
          beginnerPurpose: "Apply domain-first development",
          expectedConceptIds: ["capstone-integration"],
          options: [
            { id: "a", text: "The database layer — you need somewhere to store data", isCorrect: false, explanation: "Starting with the database couples your design to storage. Build domain logic first, add storage later." },
            { id: "b", text: "The domain layer — pure business logic with no I/O", isCorrect: true, explanation: "Correct! Domain logic is the core. Test it first without any I/O — fast, isolated, and design-clarifying." },
            { id: "c", text: "The CLI — so you can see the app running", isCorrect: false, explanation: "The CLI is a delivery mechanism. Build what matters — the domain — first." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Start with what's most important: the business logic." }],
          feedback: { correct: "Correct! Domain-first gives you a testable core.", incorrect: "Build and test the domain (business logic) first — it's the most valuable part and easiest to test in isolation." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s52-plan-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s52-integration-patterns",
      stageId: "stage-52",
      title: "Integration: Combining Course Concepts",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Apply layered architecture with proper separation",
        "Use type annotations throughout the codebase",
        "Combine asyncio, SQLite, and CLI in one application",
      ],
      prerequisites: ["s52-capstone-planning"],
      concepts: ["capstone-integration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Putting It All Together\n\nA production-quality application combines:\n\n```python\n# domain/models.py — pure data, no I/O\nfrom dataclasses import dataclass, field\nfrom datetime import datetime\nfrom typing import Optional\n\n@dataclass\nclass Endpoint:\n    url: str\n    name: str\n    check_interval: int = 60\n    last_checked: Optional[datetime] = None\n    is_healthy: bool = True\n\n# domain/services.py — business logic\nclass MonitorService:\n    def __init__(self, repo: 'EndpointRepository', notifier: 'Notifier'):\n        self.repo = repo\n        self.notifier = notifier\n\n    async def check_endpoint(self, endpoint: Endpoint) -> bool:\n        # domain logic: determine health, notify if changed\n        ...\n\n# adapters/sqlite_repo.py — persistence\nclass SqliteEndpointRepository:\n    def __init__(self, db_path: str):\n        self.db_path = db_path\n\n    def get_all(self) -> list[Endpoint]:\n        with sqlite3.connect(self.db_path) as conn:\n            rows = conn.execute('SELECT * FROM endpoints').fetchall()\n            return [Endpoint(*row) for row in rows]\n\n# cli.py — delivery mechanism\nimport asyncio\nimport click\n\n@click.group()\ndef cli(): ...\n\n@cli.command()\n@click.argument('url')\ndef add(url: str):\n    \"\"\"Add an endpoint to monitor.\"\"\"\n    service = build_service()  # dependency injection\n    asyncio.run(service.add_endpoint(url))\n```",
        },
        {
          kind: "why-matters",
          body: "This pattern — domain / adapters / delivery — is used in Django, FastAPI, and major Python frameworks. Mastering it means you can build maintainable applications at any scale, and switch databases, CLIs, or web frameworks with minimal changes.",
        },
      ],
      interactions: [
        {
          id: "s52-integration-mc",
          kind: "multiple-choice",
          prompt: "Which file should contain `import sqlite3` in a properly layered application?",
          beginnerPurpose: "Apply layer separation",
          expectedConceptIds: ["capstone-integration"],
          options: [
            { id: "a", text: "domain/services.py", isCorrect: false, explanation: "Domain services should have zero database imports. Database code belongs in adapters." },
            { id: "b", text: "adapters/sqlite_repo.py", isCorrect: true, explanation: "Correct! Database imports belong in the adapter layer. Domain services depend on the Repository Protocol, not SQLite." },
            { id: "c", text: "cli.py", isCorrect: false, explanation: "The CLI is the delivery mechanism — it should orchestrate, not implement storage." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which layer handles storage technology choices?" }],
          feedback: { correct: "Correct! SQLite belongs in the adapter layer.", incorrect: "Database imports belong in adapters (repositories), keeping the domain layer clean." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s52-integration-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s52-production-readiness",
      stageId: "stage-52",
      title: "Production Readiness Checklist",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Apply a production readiness checklist to a Python project",
        "Verify test coverage, type checking, and security",
        "Package and publish to TestPyPI",
      ],
      prerequisites: ["s52-integration-patterns"],
      concepts: ["production-readiness"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Production Readiness Checklist\n\n### Code Quality\n- [ ] `mypy --strict` passes with zero errors\n- [ ] All public functions have type annotations\n- [ ] `ruff check` passes (linting)\n- [ ] `ruff format` applied (formatting)\n\n### Testing\n- [ ] Unit tests for all domain logic\n- [ ] Integration tests for adapters\n- [ ] Edge cases tested (empty input, boundary values)\n- [ ] `pytest --tb=short` passes with zero failures\n\n### Security\n- [ ] All SQL uses parameterized queries (no f-strings)\n- [ ] No secrets in source code\n- [ ] `pip-audit` shows no vulnerable dependencies\n\n### Documentation\n- [ ] README with installation and usage\n- [ ] Docstrings on public API\n- [ ] CHANGELOG.md\n\n### Packaging\n- [ ] `pyproject.toml` with complete metadata\n- [ ] Version follows semver\n- [ ] `python -m build` succeeds\n- [ ] Successfully installs from TestPyPI\n\n### Observability\n- [ ] Structured logging with log levels\n- [ ] Errors logged with full context\n- [ ] Exit codes non-zero on failure",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Automate the checklist with CI",
          body: "Put these checks in a CI pipeline (GitHub Actions) so they run on every push. A green CI badge is evidence of production quality. If it's not automated, it's not consistently applied.",
        },
      ],
      interactions: [
        {
          id: "s52-prod-mc",
          kind: "multiple-choice",
          prompt: "What tool scans Python dependencies for known security vulnerabilities?",
          beginnerPurpose: "Know security tooling",
          expectedConceptIds: ["production-readiness"],
          options: [
            { id: "a", text: "mypy — the type checker", isCorrect: false, explanation: "mypy checks types, not security vulnerabilities. Use pip-audit or safety for vulnerability scanning." },
            { id: "b", text: "pip-audit — scans installed packages against vulnerability databases", isCorrect: true, explanation: "Correct! pip-audit checks your dependencies against CVE databases and flags known vulnerabilities." },
            { id: "c", text: "pytest — the test runner", isCorrect: false, explanation: "pytest runs your tests. Dependency vulnerability scanning requires a dedicated tool like pip-audit." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The tool for auditing pip packages is 'pip-audit'." }],
          feedback: { correct: "Correct! pip-audit scans for vulnerable dependencies.", incorrect: "pip-audit scans installed dependencies against CVE databases to find known vulnerabilities." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s52-prod-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s52-course-reflection",
      stageId: "stage-52",
      title: "Course Reflection: From Zero to Mastery",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Summarize the key concepts mastered across all 52 stages",
        "Identify areas for continued growth",
        "Build a plan for continued Python mastery",
      ],
      prerequisites: ["s52-production-readiness"],
      concepts: ["capstone-integration"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Your Python Mastery Journey\n\nYou've progressed through:\n\n**Foundations (Stages 1–10)**: Variables, control flow, functions, strings, lists, dicts — the building blocks that all Python rests on.\n\n**Intermediate (Stages 11–20)**: OOP, error handling, file I/O, comprehensions, modules — writing real programs.\n\n**Advanced Core (Stages 21–30)**: Dataclasses, iterators, generators, context managers, functional programming, stdlib mastery, CLI development, logging.\n\n**Expert (Stages 31–40)**: Testing, type annotations, OS interfaces, networking, async, concurrency, serialization, security, databases, packaging.\n\n**Mastery (Stages 41–52)**: Metaprogramming, import system, memory management, performance, web applications, data engineering, documentation, scientific computing, GUI, CPython internals.\n\n## Where to Go Next\n\n- **Web backend**: FastAPI or Django for production APIs\n- **Data science**: pandas, scikit-learn, Jupyter\n- **DevOps/infra**: Ansible, Terraform with Python SDKs\n- **Systems programming**: Rust with PyO3 bindings\n- **Open source**: contribute to projects you use\n- **Teaching**: writing technical content reinforces mastery",
        },
        {
          kind: "mental-model",
          title: "Mastery is a direction, not a destination",
          analogy: "Learning Python is like learning a natural language. You reach fluency, then eloquence, then you find you can express ideas you couldn't before. There's always more idiom to internalize, more library to explore, more pattern to recognize.",
          explanation: "The goal isn't to know everything — it's to know how to learn the next thing quickly. You now have that foundation.",
        },
      ],
      interactions: [
        {
          id: "s52-reflect-mc",
          kind: "multiple-choice",
          prompt: "Which approach best describes continued mastery after completing this course?",
          beginnerPurpose: "Plan continued growth",
          expectedConceptIds: ["capstone-integration"],
          options: [
            { id: "a", text: "Study every Python library exhaustively", isCorrect: false, explanation: "There are thousands of Python libraries. Depth in a domain beats shallow breadth across all of them." },
            { id: "b", text: "Build real projects in a domain, reading source code of libraries you use", isCorrect: true, explanation: "Correct! Real projects expose genuine problems. Reading expert source code is one of the fastest ways to learn Python idioms." },
            { id: "c", text: "Re-read the Python documentation from start to finish", isCorrect: false, explanation: "Reference docs are for looking things up, not reading linearly. Build and read source code instead." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "How did you learn most of what you know — theory or practice?" }],
          feedback: { correct: "Correct! Real projects + source reading is the fastest path to mastery.", incorrect: "Building real projects and reading expert code (like CPython itself or popular libraries) is the most effective path forward." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s52-reflect-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s52-project",
    stageId: "stage-52",
    title: "Capstone: Production Python Application",
    brief:
      "Design and build a complete, production-quality Python application that integrates the full course curriculum: layered architecture, type annotations, tests, async where appropriate, database persistence, CLI interface, logging, and packaging.",
    requirements: [
      "Domain layer with type-annotated models and services",
      "Repository pattern with SQLite adapter",
      "Async I/O for any network or concurrent operations",
      "pytest test suite with unit and integration tests",
      "mypy --strict passes with zero errors",
      "CLI with click or typer",
      "Structured logging throughout",
      "pyproject.toml + published to TestPyPI",
    ],
    acceptanceCriteria: [
      "All tests pass",
      "mypy --strict reports zero errors",
      "Application installs from TestPyPI and works correctly",
      "README covers installation, usage, and architecture",
    ],
    conceptIds: ["capstone-integration", "production-readiness"],
    difficulty: "advanced",
  },
} satisfies Stage;
