import type { Stage } from "@/course/course.schema";

export const stage42 = {
  id: "stage-42",
  number: 42,
  title: "Import System and Plugin Architecture",
  summary:
    "Understand Python's import machinery, write custom importers, and build extensible plugin systems using entry points, importlib, and dynamic loading.",
  level: "advanced",
  masteryGateConceptIds: ["import-system", "plugin-architecture"],
  lessons: [
    {
      id: "s42-import-mechanics",
      stageId: "stage-42",
      title: "How Python's Import System Works",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Describe the import pipeline: finders and loaders",
        "Explain sys.modules as the module cache",
        "Use importlib.import_module for dynamic imports",
      ],
      prerequisites: [],
      concepts: ["import-system"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Import Pipeline\n\nWhen Python encounters `import foo`, it:\n\n1. Checks `sys.modules` cache — returns immediately if found\n2. Walks `sys.meta_path` finders in order\n3. Each finder either returns a loader or passes\n4. The loader reads and executes the module\n5. Stores result in `sys.modules`\n\n```python\nimport sys\n\n# Check the module cache\n'os' in sys.modules  # True after first import\n\n# Dynamic import by name string\nimport importlib\nmod = importlib.import_module('json')\nmod.dumps({'key': 'value'})\n\n# sys.path controls where Python looks\nprint(sys.path)  # list of directory paths\n```\n\n## Reloading modules\n\n```python\nimport importlib\nimport mymodule\n\n# Force re-execution of module code\nimportlib.reload(mymodule)\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "importlib.import_module for dynamic loading",
          body: "Use importlib.import_module('module.name') instead of __import__(). It's the official, clean API for importing modules by string name at runtime.",
        },
      ],
      interactions: [
        {
          id: "s42-import-mc",
          kind: "multiple-choice",
          prompt: "Python imports 'requests' twice in two different modules. How many times does Python execute requests' code?",
          beginnerPurpose: "Understand module caching",
          expectedConceptIds: ["import-system"],
          options: [
            { id: "a", text: "Twice — once per import statement", isCorrect: false, explanation: "sys.modules caches the module after the first import." },
            { id: "b", text: "Once — sys.modules caches it after the first import", isCorrect: true, explanation: "Correct! sys.modules is a cache. Subsequent imports just return the cached module object." },
            { id: "c", text: "Zero — Python uses compiled .pyc files directly", isCorrect: false, explanation: "Python still needs to load the module the first time. After that, sys.modules caches it." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "sys.modules is the key — look there first." }],
          feedback: { correct: "Correct! sys.modules prevents duplicate execution.", incorrect: "sys.modules caches modules — module code only runs once." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s42-import-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s42-entry-points",
      stageId: "stage-42",
      title: "Entry Points and Plugin Discovery",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Define entry points in pyproject.toml",
        "Discover plugins at runtime with importlib.metadata",
        "Build an extensible application without hardcoded plugin imports",
      ],
      prerequisites: ["s42-import-mechanics"],
      concepts: ["plugin-architecture"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Entry Points for Plugins\n\nEntry points allow installed packages to advertise plugins:\n\n```toml\n# pyproject.toml of a plugin package\n[project.entry-points.\"myapp.plugins\"]\naudio = \"myplugin.audio:AudioPlugin\"\nvideo = \"myplugin.video:VideoPlugin\"\n```\n\nThe host application discovers them at runtime:\n\n```python\nfrom importlib.metadata import entry_points\n\ndef load_plugins() -> list:\n    plugins = []\n    for ep in entry_points(group='myapp.plugins'):\n        plugin_class = ep.load()  # imports the module and returns the class\n        plugins.append(plugin_class())\n    return plugins\n\n# No hardcoded imports! New plugins register themselves via pyproject.toml\nplugins = load_plugins()\n```\n\nThis is how pytest discovers plugins, Flask discovers extensions, and Sphinx discovers extensions — entirely through entry points.",
        },
        {
          kind: "why-matters",
          body: "Entry points let you build truly extensible applications. Users install a package, and your application automatically finds and loads it — no configuration changes, no code edits, no restart of package discovery.",
        },
      ],
      interactions: [
        {
          id: "s42-entrypoints-mc",
          kind: "multiple-choice",
          prompt: "What is the advantage of entry points over hardcoded plugin imports?",
          beginnerPurpose: "Understand plugin extensibility",
          expectedConceptIds: ["plugin-architecture"],
          options: [
            { id: "a", text: "Entry points are faster to import", isCorrect: false, explanation: "Speed isn't the benefit. The benefit is extensibility — new plugins require no code changes in the host." },
            { id: "b", text: "New plugins can be installed without modifying the host application", isCorrect: true, explanation: "Correct! Plugins register themselves via pyproject.toml. The host discovers them without any code changes." },
            { id: "c", text: "Entry points avoid circular imports", isCorrect: false, explanation: "Circular imports are a separate problem. Entry points solve extensibility." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "What changes in the host code when a new plugin is installed?" }],
          feedback: { correct: "Correct! Entry points enable zero-code-change extensibility.", incorrect: "Entry points allow plugins to self-register — the host never needs to be modified to add new plugins." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s42-entrypoints-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s42-custom-importer",
      stageId: "stage-42",
      title: "Custom Import Hooks",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Implement a MetaPathFinder",
        "Load modules from non-standard sources",
        "Understand when custom importers are useful",
      ],
      prerequisites: ["s42-entry-points"],
      concepts: ["import-system"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Custom Import Hooks\n\nYou can intercept imports by adding a finder to `sys.meta_path`:\n\n```python\nimport sys\nimport types\nfrom importlib.abc import MetaPathFinder, Loader\nfrom importlib.machinery import ModuleSpec\n\nclass DatabaseLoader(Loader):\n    def __init__(self, source_code: str):\n        self.source_code = source_code\n\n    def create_module(self, spec):\n        return None  # use default\n\n    def exec_module(self, module):\n        exec(self.source_code, module.__dict__)\n\nclass DatabaseFinder(MetaPathFinder):\n    def __init__(self, db):\n        self.db = db\n\n    def find_spec(self, fullname, path, target=None):\n        # Check if this module is in our database\n        source = self.db.get_module_source(fullname)\n        if source:\n            loader = DatabaseLoader(source)\n            return ModuleSpec(fullname, loader)\n        return None  # let other finders try\n\n# Install the finder\nsys.meta_path.insert(0, DatabaseFinder(my_db))\n```\n\nReal-world uses: loading modules from databases, zip files, network, or generating modules dynamically.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Custom importers are advanced and rarely needed",
          body: "Most applications never need custom import hooks. They're used in frameworks (pytest's conftest system, IPython's magic imports), testing tools, and embedded systems. Understand the concept, but don't reach for it first.",
        },
      ],
      interactions: [
        {
          id: "s42-importer-mc",
          kind: "multiple-choice",
          prompt: "What does a MetaPathFinder's find_spec() return when it can't handle an import?",
          beginnerPurpose: "Understand the finder protocol",
          expectedConceptIds: ["import-system"],
          options: [
            { id: "a", text: "raise ImportError", isCorrect: false, explanation: "Raising ImportError stops the entire import. Returning None passes control to the next finder." },
            { id: "b", text: "None — to let the next finder try", isCorrect: true, explanation: "Correct! Returning None signals 'I don't handle this — try the next finder in sys.meta_path'." },
            { id: "c", text: "An empty ModuleSpec", isCorrect: false, explanation: "An empty spec would indicate 'found but empty'. None means 'not mine — pass'." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "How do you tell the import system to try the next finder?" }],
          feedback: { correct: "Correct! None passes the import to the next finder.", incorrect: "Return None to pass to the next finder. Never raise ImportError from find_spec unless you're sure it should fail." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s42-importer-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s42-project",
    stageId: "stage-42",
    title: "Plugin System with Entry Points",
    brief:
      "Build an extensible data transformation pipeline where each transformation step is a plugin discovered via entry points. Plugins can be installed independently and the pipeline discovers them automatically.",
    requirements: [
      "TransformPlugin Protocol with transform(data) -> data",
      "Entry point group 'mypipeline.transforms'",
      "Host application loads all installed plugins via importlib.metadata",
      "At least two example plugin packages with pyproject.toml",
      "Pipeline runs discovered plugins in order",
    ],
    acceptanceCriteria: [
      "New plugins installed via pip are automatically discovered",
      "Pipeline runs without hardcoded plugin imports",
      "Plugin loading failures are handled gracefully",
    ],
    conceptIds: ["import-system", "plugin-architecture"],
    difficulty: "advanced",
  },
} satisfies Stage;
