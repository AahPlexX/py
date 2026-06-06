import type { Stage } from "@/course/course.schema";

export const stage40 = {
  id: "stage-40",
  number: 40,
  title: "Project Architecture and Design Patterns",
  summary:
    "Structure large Python projects using SOLID principles, common design patterns, and proven architectural patterns like layered architecture and the repository pattern.",
  level: "advanced",
  masteryGateConceptIds: ["solid-principles", "design-patterns"],
  lessons: [
    {
      id: "s40-solid-principles",
      stageId: "stage-40",
      title: "SOLID Principles in Python",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain each of the five SOLID principles",
        "Identify SOLID violations in Python code",
        "Apply SRP and OCP to a real class",
      ],
      prerequisites: [],
      concepts: ["solid-principles"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## SOLID Principles\n\n**S** — Single Responsibility: a class has one reason to change.\n**O** — Open/Closed: open for extension, closed for modification.\n**L** — Liskov Substitution: subtypes must be substitutable for their base types.\n**I** — Interface Segregation: clients shouldn't depend on methods they don't use.\n**D** — Dependency Inversion: depend on abstractions, not concretions.\n\n```python\n# SRP violation: one class does too much\nclass Order:\n    def calculate_total(self): ...\n    def save_to_db(self): ...\n    def send_email_confirmation(self): ...\n\n# SRP fixed: split responsibilities\nclass Order:\n    def calculate_total(self): ...\n\nclass OrderRepository:\n    def save(self, order: Order): ...\n\nclass OrderNotifier:\n    def send_confirmation(self, order: Order): ...\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Start with SRP",
          body: "If you can only apply one SOLID principle, apply SRP. Classes that do one thing are easy to test, easy to change, and easy to understand.",
        },
        {
          kind: "why-matters",
          body: "SOLID principles emerged from decades of experience with large codebases. Code that violates them tends to become rigid, fragile, and hard to extend as requirements change.",
        },
      ],
      interactions: [
        {
          id: "s40-solid-mc",
          kind: "multiple-choice",
          prompt: "A UserService class handles login, registration, password reset, and email sending. Which SOLID principle does it violate?",
          beginnerPurpose: "Identify SRP violations",
          expectedConceptIds: ["solid-principles"],
          options: [
            { id: "a", text: "Open/Closed Principle", isCorrect: false, explanation: "OCP is about modification vs extension. The issue here is too many responsibilities." },
            { id: "b", text: "Single Responsibility Principle", isCorrect: true, explanation: "Correct! UserService has multiple reasons to change — auth logic, email logic, and registration logic should be separate." },
            { id: "c", text: "Liskov Substitution Principle", isCorrect: false, explanation: "LSP is about subclass behavior. The issue here is one class doing too many things." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "How many reasons might this class change? Each reason points to a responsibility." }],
          feedback: { correct: "Correct! Too many responsibilities = SRP violation.", incorrect: "A class doing login, registration, AND email violates SRP — too many reasons to change." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s40-solid-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s40-design-patterns",
      stageId: "stage-40",
      title: "Classic Design Patterns",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Implement the Factory, Strategy, and Observer patterns",
        "Identify which pattern solves which problem",
        "Use Python idioms instead of Java-style patterns where appropriate",
      ],
      prerequisites: ["s40-solid-principles"],
      concepts: ["design-patterns"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Factory Pattern\n\nCreates objects without specifying the exact class:\n\n```python\nclass Animal:\n    def speak(self) -> str: ...\n\nclass Dog(Animal):\n    def speak(self) -> str:\n        return \"Woof\"\n\nclass Cat(Animal):\n    def speak(self) -> str:\n        return \"Meow\"\n\ndef animal_factory(kind: str) -> Animal:\n    match kind:\n        case \"dog\": return Dog()\n        case \"cat\": return Cat()\n        case _: raise ValueError(f\"Unknown: {kind}\")\n```\n\n## Strategy Pattern\n\nDefines a family of algorithms, makes them interchangeable:\n\n```python\nfrom typing import Callable\n\nSortStrategy = Callable[[list], list]\n\ndef sort_data(data: list, strategy: SortStrategy) -> list:\n    return strategy(data)\n\n# Usage\nsorted_data = sort_data(items, sorted)  # built-in\nsorted_data = sort_data(items, lambda x: sorted(x, reverse=True))\n```\n\nIn Python, Strategy is often just a callable — no class hierarchy needed.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Python idioms vs. Gang of Four patterns",
          body: "Many GoF patterns are workarounds for Java's lack of first-class functions. In Python, Strategy = callable, Command = callable, Template Method = function with callbacks. Use the simplest approach.",
        },
      ],
      interactions: [
        {
          id: "s40-patterns-mc",
          kind: "multiple-choice",
          prompt: "You need to support multiple sorting algorithms that can be swapped at runtime. Which pattern fits best?",
          beginnerPurpose: "Match patterns to problems",
          expectedConceptIds: ["design-patterns"],
          options: [
            { id: "a", text: "Factory pattern", isCorrect: false, explanation: "Factory creates objects. Strategy encapsulates interchangeable algorithms." },
            { id: "b", text: "Strategy pattern", isCorrect: true, explanation: "Correct! Strategy defines a family of algorithms and makes them interchangeable — perfect for swappable sorting." },
            { id: "c", text: "Observer pattern", isCorrect: false, explanation: "Observer is for event notification. Strategy is for interchangeable algorithms." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The pattern for swappable algorithms is Strategy." }],
          feedback: { correct: "Correct! Strategy is for interchangeable algorithms.", incorrect: "When you need to swap algorithms at runtime, use the Strategy pattern." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s40-patterns-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s40-layered-architecture",
      stageId: "stage-40",
      title: "Layered Architecture and the Repository Pattern",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Describe the presentation/domain/data layer separation",
        "Implement the Repository pattern to abstract data access",
        "Explain why dependency inversion enables testability",
      ],
      prerequisites: ["s40-design-patterns"],
      concepts: ["solid-principles"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Layered Architecture\n\n```\n┌─────────────────────┐\n│  Presentation Layer │  CLI, web handlers, API routes\n├─────────────────────┤\n│    Domain Layer     │  Business logic, entities, use cases\n├─────────────────────┤\n│     Data Layer      │  Database, file I/O, external APIs\n└─────────────────────┘\n```\n\nEach layer only calls the layer below it — never the layer above.\n\n## Repository Pattern\n\n```python\nfrom typing import Protocol\n\nclass UserRepository(Protocol):\n    def get(self, user_id: int) -> User: ...\n    def save(self, user: User) -> None: ...\n\nclass SqliteUserRepository:\n    def get(self, user_id: int) -> User:\n        # real SQLite implementation\n        ...\n    def save(self, user: User) -> None:\n        ...\n\nclass InMemoryUserRepository:\n    def get(self, user_id: int) -> User:\n        # for tests — no database\n        ...\n    def save(self, user: User) -> None:\n        ...\n\nclass UserService:\n    def __init__(self, repo: UserRepository):\n        self.repo = repo  # injected — can be real or test\n```",
        },
        {
          kind: "why-matters",
          body: "The Repository pattern decouples business logic from storage. You can test UserService with InMemoryUserRepository — no database needed. Swap to PostgreSQL in production with zero business logic changes.",
        },
      ],
      interactions: [
        {
          id: "s40-repo-mc",
          kind: "multiple-choice",
          prompt: "Why does UserService accept a UserRepository parameter instead of creating one internally?",
          beginnerPurpose: "Understand dependency injection",
          expectedConceptIds: ["solid-principles"],
          options: [
            { id: "a", text: "To follow the Dependency Inversion Principle — depend on abstractions, not concretions", isCorrect: true, explanation: "Correct! Injecting the repo means UserService depends on the Protocol, not a specific implementation." },
            { id: "b", text: "Because constructors can't create objects", isCorrect: false, explanation: "Constructors can create objects. The reason is testability and flexibility, not capability." },
            { id: "c", text: "To reduce memory usage", isCorrect: false, explanation: "DIP is about coupling, not memory." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which SOLID principle says 'depend on abstractions'?" }],
          feedback: { correct: "Correct! Dependency injection enables DIP and testability.", incorrect: "Injecting dependencies follows DIP — business logic depends on the abstraction, not the database implementation." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s40-repo-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s40-project-layout",
      stageId: "stage-40",
      title: "Python Project Layout and Module Organization",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Organize a Python project with src/ layout",
        "Distinguish public API from internal modules",
        "Use __init__.py to control package public interface",
      ],
      prerequisites: ["s40-layered-architecture"],
      concepts: ["solid-principles"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Recommended Project Layout\n\n```\nmy-project/\n├── pyproject.toml\n├── src/\n│   └── mypackage/\n│       ├── __init__.py      # public API\n│       ├── domain/\n│       │   ├── __init__.py\n│       │   ├── models.py\n│       │   └── services.py\n│       ├── data/\n│       │   ├── __init__.py\n│       │   └── repositories.py\n│       └── cli.py\n├── tests/\n│   ├── test_models.py\n│   └── test_services.py\n└── README.md\n```\n\n## Controlling Public API with `__init__.py`\n\n```python\n# mypackage/__init__.py\nfrom .domain.models import User, Order\nfrom .domain.services import UserService\n\n__all__ = [\"User\", \"Order\", \"UserService\"]\n```\n\nPublic: `from mypackage import User`\nInternal: `mypackage.domain.models` — implementation detail, may change.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "src/ layout prevents import surprises",
          body: "With src/ layout, you can't accidentally import the local package instead of the installed one. Tests always import the installed (or editable-installed) version, catching packaging issues early.",
        },
      ],
      interactions: [
        {
          id: "s40-layout-fill",
          kind: "fill-code",
          prompt: "Complete the __init__.py to export User and UserService as the public API.",
          beginnerPurpose: "Control package public interface",
          expectedConceptIds: ["solid-principles"],
          codeTemplate: "# mypackage/__init__.py\nfrom .domain.models import User\nfrom .domain.services import UserService\n\n_____ = [\"User\", \"UserService\"]",
          blanks: [{ placeholder: "_____", answer: "__all__", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The special variable that controls what 'from package import *' exports." }],
          feedback: { correct: "Correct! __all__ defines the public API.", incorrect: "Use __all__ to list the public symbols." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s40-layout-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s40-project",
    stageId: "stage-40",
    title: "Refactor to Layered Architecture",
    brief:
      "Refactor a monolithic Python application into a layered architecture with clear separation of concerns, a Repository pattern for data access, and dependency injection throughout.",
    requirements: [
      "src/ project layout with domain/, data/, presentation/ layers",
      "Repository Protocol with SQLite and InMemory implementations",
      "UserService depends on the Protocol, not the concrete class",
      "All SOLID principles applied and documented",
      "Tests use InMemoryRepository — no real database required",
    ],
    acceptanceCriteria: [
      "All layers are clearly separated",
      "Business logic has zero database imports",
      "Tests run without any database file",
    ],
    conceptIds: ["solid-principles", "design-patterns"],
    difficulty: "advanced",
  },
} satisfies Stage;
