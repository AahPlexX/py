import type { Stage } from "@/course/course.schema";

export const stage48 = {
  id: "stage-48",
  number: 48,
  title: "Desktop GUI Applications",
  summary:
    "Build native desktop applications using tkinter and PyQt/PySide, understand the event loop model, and structure GUI apps with the MVC pattern.",
  level: "advanced",
  masteryGateConceptIds: ["gui-event-loop", "tkinter-widgets"],
  lessons: [
    {
      id: "s48-gui-concepts",
      stageId: "stage-48",
      title: "GUI Programming Concepts",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain the event loop model",
        "Distinguish widgets, events, and callbacks",
        "Compare tkinter, PyQt, and wxPython",
      ],
      prerequisites: [],
      concepts: ["gui-event-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## GUI Event Loop\n\nGUI programs are event-driven — they wait for user input and respond:\n\n```\n┌─────────────────────────────┐\n│         Event Loop          │\n│   ┌───────────────────┐    │\n│   │  Wait for event   │    │\n│   └─────────┬─────────┘    │\n│             ↓              │\n│   ┌───────────────────┐    │\n│   │  Dispatch event   │    │\n│   │  to handler       │    │\n│   └─────────┬─────────┘    │\n│             ↓              │\n│   ┌───────────────────┐    │\n│   │  Update display   │    │\n│   └─────────┬─────────┘    │\n│             ↑              │\n│             └──────────────┘\n└─────────────────────────────┘\n```\n\n**Key concepts:**\n- **Widget**: a UI element (button, label, entry, listbox)\n- **Event**: user action (click, keypress, window resize)\n- **Callback**: function called when event occurs\n- **Mainloop**: the infinite event-processing loop\n\n| Library | Use when |\n|---------|----------|\n| tkinter | Simple apps, ships with Python, no install |\n| PyQt6/PySide6 | Professional apps, rich widgets, signals/slots |\n| wxPython | Native look and feel on each OS |",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Never block the event loop",
          body: "Running time.sleep() or a long computation in a callback freezes the GUI. For long operations, use threading or QThread (PyQt) to run work in the background while keeping the GUI responsive.",
        },
      ],
      interactions: [
        {
          id: "s48-gui-mc",
          kind: "multiple-choice",
          prompt: "What happens if you call time.sleep(5) in a button click callback?",
          beginnerPurpose: "Understand event loop blocking",
          expectedConceptIds: ["gui-event-loop"],
          options: [
            { id: "a", text: "The GUI pauses for 5 seconds, then continues normally", isCorrect: false, explanation: "The GUI freezes — the window won't respond to any events or redraw requests during sleep." },
            { id: "b", text: "The GUI freezes completely for 5 seconds", isCorrect: true, explanation: "Correct! Blocking the event loop freezes the whole application — it can't process any other events." },
            { id: "c", text: "Python runs the sleep in a background thread automatically", isCorrect: false, explanation: "Python doesn't automatically thread callbacks. You must explicitly spawn a thread for long work." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The event loop can't process events while a callback is running." }],
          feedback: { correct: "Correct! Blocking the event loop freezes the GUI.", incorrect: "time.sleep() blocks the event loop — the GUI becomes completely unresponsive." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s48-gui-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s48-tkinter-basics",
      stageId: "stage-48",
      title: "tkinter: Widgets, Layout, and Callbacks",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Create a window with labels, entries, and buttons",
        "Use grid layout manager",
        "Connect callbacks to button clicks",
      ],
      prerequisites: ["s48-gui-concepts"],
      concepts: ["tkinter-widgets"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## tkinter Basics\n\n```python\nimport tkinter as tk\nfrom tkinter import ttk\n\nclass App(tk.Tk):\n    def __init__(self):\n        super().__init__()\n        self.title(\"Calculator\")\n        self.resizable(False, False)\n\n        # Widgets\n        self.label = ttk.Label(self, text=\"Enter a number:\")\n        self.entry = ttk.Entry(self)\n        self.result = ttk.Label(self, text=\"Result: \")\n        self.btn = ttk.Button(self, text=\"Square\", command=self.calculate)\n\n        # Grid layout\n        self.label.grid(row=0, column=0, padx=10, pady=5)\n        self.entry.grid(row=0, column=1, padx=10, pady=5)\n        self.btn.grid(row=1, column=0, columnspan=2, pady=5)\n        self.result.grid(row=2, column=0, columnspan=2, pady=5)\n\n    def calculate(self):\n        try:\n            value = float(self.entry.get())\n            self.result.config(text=f\"Result: {value ** 2}\")\n        except ValueError:\n            self.result.config(text=\"Invalid input\")\n\nif __name__ == '__main__':\n    app = App()\n    app.mainloop()\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use ttk widgets, not tk directly",
          body: "The ttk (themed tk) widgets look better on all platforms. Use ttk.Button, ttk.Label, ttk.Entry instead of tk.Button etc. They support themes and look native.",
        },
      ],
      interactions: [
        {
          id: "s48-tkinter-fill",
          kind: "fill-code",
          prompt: "Connect the button to the on_click function using the command parameter.",
          beginnerPurpose: "Wire up a callback",
          expectedConceptIds: ["tkinter-widgets"],
          codeTemplate: "import tkinter as tk\nfrom tkinter import ttk\n\nroot = tk.Tk()\n\ndef on_click():\n    print(\"clicked\")\n\nbtn = ttk.Button(root, text=\"Click Me\", _____=on_click)\nbtn.pack()\nroot.mainloop()",
          blanks: [{ placeholder: "_____", answer: "command", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The Button parameter for the click handler is 'command'." }],
          feedback: { correct: "Correct! command=on_click wires the callback.", incorrect: "Use command=on_click to connect the button to the callback function." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s48-tkinter-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s48-mvc-pattern",
      stageId: "stage-48",
      title: "MVC Pattern in GUI Applications",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Separate model, view, and controller in a GUI app",
        "Use observer pattern to update view from model changes",
        "Understand why MVC prevents spaghetti GUI code",
      ],
      prerequisites: ["s48-tkinter-basics"],
      concepts: ["gui-event-loop"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## MVC in GUI Apps\n\n**Model**: data and business logic — no GUI code\n**View**: widgets and display — no business logic\n**Controller**: responds to events, updates model, refreshes view\n\n```python\nclass TaskModel:\n    def __init__(self):\n        self.tasks: list[str] = []\n        self._observers: list = []\n\n    def add_task(self, task: str) -> None:\n        self.tasks.append(task)\n        self._notify_observers()\n\n    def subscribe(self, callback) -> None:\n        self._observers.append(callback)\n\n    def _notify_observers(self) -> None:\n        for callback in self._observers:\n            callback()\n\nclass TaskView(tk.Frame):\n    def __init__(self, parent):\n        super().__init__(parent)\n        self.listbox = tk.Listbox(self)\n        self.listbox.pack()\n\n    def refresh(self, tasks: list[str]) -> None:\n        self.listbox.delete(0, tk.END)\n        for task in tasks:\n            self.listbox.insert(tk.END, task)\n\nclass TaskController:\n    def __init__(self, model: TaskModel, view: TaskView):\n        self.model = model\n        self.view = view\n        self.model.subscribe(self.on_model_changed)\n\n    def add_task(self, task: str) -> None:\n        self.model.add_task(task)  # controller updates model\n\n    def on_model_changed(self) -> None:\n        self.view.refresh(self.model.tasks)  # model change updates view\n```",
        },
        {
          kind: "why-matters",
          body: "Without MVC, GUI apps become unmanageable — UI code and business logic are tangled together. MVC makes GUI code testable: the Model can be unit-tested without a display, and Views can be mocked.",
        },
      ],
      interactions: [
        {
          id: "s48-mvc-mc",
          kind: "multiple-choice",
          prompt: "In the MVC pattern, which component should contain the business rules for validating a task's title?",
          beginnerPurpose: "Apply MVC separation",
          expectedConceptIds: ["gui-event-loop"],
          options: [
            { id: "a", text: "The View — it displays the validation error", isCorrect: false, explanation: "The View only displays. Validation logic belongs in the Model, which enforces the rules." },
            { id: "b", text: "The Model — it owns business rules and data", isCorrect: true, explanation: "Correct! The Model contains all business rules, including validation. Views just display." },
            { id: "c", text: "The Controller — it handles user input", isCorrect: false, explanation: "The Controller routes events but delegates business logic to the Model." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Which MVC component owns data and business rules?" }],
          feedback: { correct: "Correct! Business rules belong in the Model.", incorrect: "The Model owns all business logic and rules — not the View or Controller." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s48-mvc-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s48-project",
    stageId: "stage-48",
    title: "Task Manager Desktop App",
    brief:
      "Build a functional task manager desktop application using tkinter with MVC architecture, including add/complete/delete operations, local persistence, and background thread support for any long operations.",
    requirements: [
      "MVC architecture: Model, View, Controller in separate modules",
      "Tasks persisted to JSON file on disk",
      "Add, complete, and delete task operations",
      "Grid layout with proper padding and alignment",
      "Long operations run in a background thread (use threading)",
    ],
    acceptanceCriteria: [
      "GUI remains responsive during all operations",
      "Tasks persist between application restarts",
      "Model has zero tkinter imports",
    ],
    conceptIds: ["gui-event-loop", "tkinter-widgets"],
    difficulty: "advanced",
  },
} satisfies Stage;
