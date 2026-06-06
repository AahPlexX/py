import type { Stage } from "@/course/course.schema";

export const stage39 = {
  id: "stage-39",
  number: 39,
  title: "Packaging, Distribution, and Dependency Management",
  summary:
    "Package Python projects for distribution using pyproject.toml, build wheels, and publish to PyPI following modern packaging standards.",
  level: "intermediate",
  masteryGateConceptIds: ["pyproject-toml", "python-packaging"],
  lessons: [
    {
      id: "s39-packaging-vocabulary",
      stageId: "stage-39",
      title: "Packaging Vocabulary",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define key packaging terms: sdist, wheel, PyPI",
        "Distinguish distribution package from import package",
        "Understand the build-install-use workflow",
      ],
      prerequisites: [],
      concepts: ["python-packaging"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Python Packaging Vocabulary\n\n| Term | Meaning |\n|------|---------|\n| **Distribution package** | A tarball or wheel you install with pip |\n| **Import package** | A directory with `__init__.py` you import |\n| **Module** | A single `.py` file |\n| **sdist** | Source distribution (`.tar.gz`) — contains source code |\n| **wheel** | Binary distribution (`.whl`) — pre-built, installs faster |\n| **PyPI** | Python Package Index — the public package repository |\n| **TestPyPI** | Testing instance of PyPI for practice uploads |\n\n```\npip install requests  # installs from PyPI\npip install .         # installs from local pyproject.toml\npip install dist/*.whl  # installs from local wheel\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Import package ≠ distribution package",
          body: "The `requests` distribution package on PyPI installs the `requests` import package. These names happen to match, but they're different concepts. The `Pillow` distribution installs the `PIL` import package — different names entirely.",
        },
      ],
      interactions: [
        {
          id: "s39-vocab-mc",
          kind: "multiple-choice",
          prompt: "What is a wheel (.whl) file?",
          beginnerPurpose: "Know distribution formats",
          expectedConceptIds: ["python-packaging"],
          options: [
            { id: "a", text: "A zip of Python source code", isCorrect: false, explanation: "That describes an sdist. A wheel is pre-built." },
            { id: "b", text: "A pre-built binary distribution that installs faster than sdist", isCorrect: true, explanation: "Correct! Wheels are pre-built — no compilation needed during installation." },
            { id: "c", text: "A virtual environment archive", isCorrect: false, explanation: "Virtual environments are directories, not .whl files." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Wheel = pre-built = faster install." }],
          feedback: { correct: "Correct! Wheels are pre-built.", incorrect: "A wheel is a pre-built binary distribution that installs without compilation." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s39-vocab-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s39-pyproject-toml",
      stageId: "stage-39",
      title: "pyproject.toml: The Modern Packaging Standard",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Write a minimal valid pyproject.toml",
        "Configure project metadata, dependencies, and entry points",
        "Understand the build-system table",
      ],
      prerequisites: ["s39-packaging-vocabulary"],
      concepts: ["pyproject-toml"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## pyproject.toml\n\n`pyproject.toml` is the modern configuration file for Python projects:\n\n```toml\n[build-system]\nrequires = [\"hatchling\"]\nbuild-backend = \"hatchling.build\"\n\n[project]\nname = \"my-tool\"\nversion = \"1.0.0\"\ndescription = \"A useful tool\"\nrequires-python = \">=3.11\"\ndependencies = [\n    \"requests>=2.28\",\n    \"click>=8.0\",\n]\n\n[project.scripts]\nmy-tool = \"my_tool.cli:main\"\n\n[project.optional-dependencies]\ndev = [\"pytest\", \"mypy\"]\n```\n\n`[project.scripts]` creates a command-line entry point: `my-tool` in PATH that calls `my_tool/cli.py`'s `main` function.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Multiple build backends",
          body: "The [build-system] table specifies the backend: hatchling (Hatch), setuptools, flit, pdm, maturin (Rust extensions). All backends understand the [project] table.",
        },
        {
          kind: "why-matters",
          body: "pyproject.toml replaces setup.py and setup.cfg. Modern tools (pip, build, tox, pytest) all read it. One file replaces three configuration files.",
        },
      ],
      interactions: [
        {
          id: "s39-pyproject-fill",
          kind: "fill-code",
          prompt: "Complete the pyproject.toml section that declares a console script.",
          beginnerPurpose: "Configure an entry point",
          expectedConceptIds: ["pyproject-toml"],
          codeTemplate: "[project._____]\nmycli = \"mypackage.cli:main\"",
          blanks: [{ placeholder: "_____", answer: "scripts", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Console scripts go in [project.scripts]." }],
          feedback: { correct: "Correct! [project.scripts] declares CLI entry points.", incorrect: "Use [project.scripts] for console script entry points." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s39-pyproject-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s39-build-publish",
      stageId: "stage-39",
      title: "Building and Publishing Packages",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Build sdist and wheel with python -m build",
        "Upload to TestPyPI with twine",
        "Understand version specifiers",
      ],
      prerequisites: ["s39-pyproject-toml"],
      concepts: ["python-packaging"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Building and Publishing\n\n```bash\n# Install build tools\npip install build twine\n\n# Build sdist and wheel\npython -m build\n# Creates: dist/my-tool-1.0.0.tar.gz\n#          dist/my_tool-1.0.0-py3-none-any.whl\n\n# Upload to TestPyPI first\ntwine upload --repository testpypi dist/*\n\n# Test install from TestPyPI\npip install --index-url https://test.pypi.org/simple/ my-tool\n\n# Upload to real PyPI\ntwine upload dist/*\n```\n\n## Version Specifiers in Dependencies\n\n```toml\ndependencies = [\n    \"requests>=2.28,<3\",  # >=2.28 and <3\n    \"click~=8.1\",          # compatible: >=8.1, <9\n    \"mypy==1.5.0\",         # exact pin\n]\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always test on TestPyPI first",
          body: "Publishing to PyPI is permanent — you cannot delete a released version. TestPyPI lets you verify the install experience without affecting the real index.",
        },
      ],
      interactions: [
        {
          id: "s39-build-mc",
          kind: "multiple-choice",
          prompt: "What does `python -m build` create?",
          beginnerPurpose: "Know the build output",
          expectedConceptIds: ["python-packaging"],
          options: [
            { id: "a", text: "A virtual environment", isCorrect: false, explanation: "python -m venv creates venvs; python -m build creates distributions." },
            { id: "b", text: "An sdist (.tar.gz) and a wheel (.whl) in the dist/ directory", isCorrect: true, explanation: "Correct! python -m build produces both distribution formats." },
            { id: "c", text: "A compiled .pyc file", isCorrect: false, explanation: ".pyc files are bytecode cache files, not distributions." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The build module produces distribution files in dist/." }],
          feedback: { correct: "Correct! python -m build creates both sdist and wheel.", incorrect: "python -m build creates dist/*.tar.gz and dist/*.whl." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s39-build-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s39-virtual-envs",
      stageId: "stage-39",
      title: "Virtual Environments and Dependency Isolation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create and activate virtual environments with venv",
        "Explain why dependency isolation matters",
        "Generate and use requirements.txt",
      ],
      prerequisites: ["s39-build-publish"],
      concepts: ["python-packaging"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Virtual Environments\n\nA **virtual environment** is an isolated Python installation with its own packages:\n\n```bash\n# Create\npython -m venv .venv\n\n# Activate\nsource .venv/bin/activate   # Linux/Mac\n.venv\\Scripts\\activate      # Windows\n\n# Install packages\npip install requests\n\n# Freeze current packages\npip freeze > requirements.txt\n\n# Install from requirements\npip install -r requirements.txt\n\n# Deactivate\ndeactivate\n```\n\nWithout virtual environments, all projects share the same Python installation — version conflicts become inevitable.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Add .venv to .gitignore",
          body: "Never commit the virtual environment directory. Commit requirements.txt (or pyproject.toml) instead, so others can recreate it with pip install -r requirements.txt.",
        },
      ],
      interactions: [
        {
          id: "s39-venv-mc",
          kind: "multiple-choice",
          prompt: "Why do you need a virtual environment for each project?",
          beginnerPurpose: "Understand isolation purpose",
          expectedConceptIds: ["python-packaging"],
          options: [
            { id: "a", text: "Virtual environments are required by Python", isCorrect: false, explanation: "Python works fine without venvs — but isolation prevents conflicts." },
            { id: "b", text: "Project A needs requests==2.28 and Project B needs requests==2.31 — isolation prevents conflicts", isCorrect: true, explanation: "Correct! Different projects can use different package versions without conflict." },
            { id: "c", text: "Virtual environments make code run faster", isCorrect: false, explanation: "Virtual environments provide isolation, not performance." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think: two projects needing different versions of the same package." }],
          feedback: { correct: "Correct! Isolation prevents version conflicts.", incorrect: "Virtual environments allow different projects to use different package versions." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s39-venv-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s39-project",
    stageId: "stage-39",
    title: "Package and Publish a CLI Tool",
    brief:
      "Package an existing Python CLI tool with pyproject.toml, build sdist and wheel distributions, configure a console script entry point, and publish to TestPyPI.",
    requirements: [
      "pyproject.toml with complete project metadata",
      "Console script entry point that works after pip install",
      "Optional dev dependencies for testing",
      "Built distributions in dist/ directory",
      "Successful upload to TestPyPI",
    ],
    acceptanceCriteria: [
      "pip install from TestPyPI installs correctly",
      "CLI command works after installation",
      "Version number follows semver",
    ],
    conceptIds: ["pyproject-toml", "python-packaging"],
    difficulty: "intermediate",
  },
} satisfies Stage;
