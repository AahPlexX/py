import type { Stage } from "@/course/course.schema";

export const stage47 = {
  id: "stage-47",
  number: 47,
  title: "Scientific and Numerical Python",
  summary:
    "Use NumPy, SciPy, and Matplotlib to perform numerical computation, data analysis, and scientific visualization at research grade.",
  level: "advanced",
  masteryGateConceptIds: ["numpy-arrays", "scipy-analysis"],
  lessons: [
    {
      id: "s47-numpy-arrays",
      stageId: "stage-47",
      title: "NumPy Arrays: The Foundation",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Create and manipulate ndarray objects",
        "Apply broadcasting and vectorized operations",
        "Use array indexing and slicing",
      ],
      prerequisites: [],
      concepts: ["numpy-arrays"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## NumPy ndarray\n\nNumPy's `ndarray` is a homogeneous, multi-dimensional array stored in contiguous memory:\n\n```python\nimport numpy as np\n\n# Create arrays\narr = np.array([1, 2, 3, 4, 5])\nmatrix = np.array([[1, 2, 3], [4, 5, 6]])\nzeros = np.zeros((3, 4))      # 3x4 array of 0.0\nlinspace = np.linspace(0, 1, 100)  # 100 evenly-spaced values\n\n# Array properties\nmatrix.shape   # (2, 3)\nmatrix.dtype   # dtype('int64')\nmatrix.ndim    # 2\n\n# Vectorized operations (no Python loop)\narr ** 2               # [1, 4, 9, 16, 25]\narr[arr > 2]           # [3, 4, 5] — boolean indexing\nmatrix[:, 1]           # [2, 5] — column 1\nmatrix[0, :]           # [1, 2, 3] — row 0\n\n# Broadcasting\na = np.array([[1, 2, 3], [4, 5, 6]])  # shape (2, 3)\nb = np.array([10, 20, 30])             # shape (3,)\na + b  # [[11, 22, 33], [14, 25, 36]] — b broadcast across rows\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "dtype matters for performance",
          body: "NumPy arrays are typed. np.float32 uses half the memory of float64 and can be 2x faster on modern hardware. Choose the smallest dtype that gives enough precision for your computation.",
        },
      ],
      interactions: [
        {
          id: "s47-numpy-mc",
          kind: "multiple-choice",
          prompt: "What does `arr[arr > 3]` do on `arr = np.array([1, 2, 3, 4, 5])`?",
          beginnerPurpose: "Understand boolean indexing",
          expectedConceptIds: ["numpy-arrays"],
          options: [
            { id: "a", text: "Returns True/False for each element", isCorrect: false, explanation: "arr > 3 alone returns booleans. arr[arr > 3] uses them to select elements." },
            { id: "b", text: "Returns array([4, 5]) — elements where condition is True", isCorrect: true, explanation: "Correct! Boolean indexing selects elements where the condition is True." },
            { id: "c", text: "Returns the index positions 3 and 4", isCorrect: false, explanation: "Boolean indexing returns values, not positions. Use np.where() for positions." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "arr > 3 creates a boolean mask. arr[mask] selects True positions." }],
          feedback: { correct: "Correct! Boolean indexing returns matching elements.", incorrect: "arr[arr > 3] uses boolean indexing to return the elements greater than 3." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s47-numpy-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s47-scipy",
      stageId: "stage-47",
      title: "SciPy: Scientific Algorithms",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Use scipy.stats for statistical analysis",
        "Solve optimization problems with scipy.optimize",
        "Perform numerical integration with scipy.integrate",
      ],
      prerequisites: ["s47-numpy-arrays"],
      concepts: ["scipy-analysis"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## SciPy\n\nSciPy builds on NumPy with algorithms for scientific computing:\n\n```python\nfrom scipy import stats, optimize, integrate\nimport numpy as np\n\n# Statistical tests\ndata1 = [2.1, 2.5, 2.3, 2.8, 2.2]\ndata2 = [3.1, 3.5, 2.9, 3.4, 3.0]\nt_stat, p_value = stats.ttest_ind(data1, data2)\nprint(f\"p-value: {p_value:.4f}\")\n\n# Optimization: find minimum of f(x) = x^2 + 2x + 1\nresult = optimize.minimize_scalar(lambda x: x**2 + 2*x + 1)\nprint(f\"Minimum at x = {result.x:.4f}\")  # -1.0\n\n# Numerical integration: integral of sin(x) from 0 to pi\nvalue, error = integrate.quad(np.sin, 0, np.pi)\nprint(f\"Integral = {value:.6f}\")  # 2.0 (exactly)\n```\n\nSciPy also includes: signal processing, image processing, sparse matrices, spatial algorithms, and linear algebra.",
        },
        {
          kind: "why-matters",
          body: "SciPy implements decades of numerical algorithms from LAPACK, FITPACK, and other scientific libraries. What would take weeks to implement from scratch is a one-liner in SciPy — and battle-tested.",
        },
      ],
      interactions: [
        {
          id: "s47-scipy-mc",
          kind: "multiple-choice",
          prompt: "Which scipy module finds the minimum of a mathematical function?",
          beginnerPurpose: "Navigate scipy modules",
          expectedConceptIds: ["scipy-analysis"],
          options: [
            { id: "a", text: "scipy.stats", isCorrect: false, explanation: "scipy.stats is for statistical distributions and tests. Optimization is in scipy.optimize." },
            { id: "b", text: "scipy.optimize", isCorrect: true, explanation: "Correct! scipy.optimize has minimize(), minimize_scalar(), and curve_fit() for optimization problems." },
            { id: "c", text: "scipy.integrate", isCorrect: false, explanation: "scipy.integrate computes integrals. Minimization is in scipy.optimize." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Finding minima is an 'optimization' problem." }],
          feedback: { correct: "Correct! scipy.optimize handles minimization.", incorrect: "scipy.optimize is the module for finding function minima and maxima." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s47-scipy-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s47-matplotlib",
      stageId: "stage-47",
      title: "Matplotlib: Scientific Visualization",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Create line plots, scatter plots, and histograms",
        "Customize axes, labels, and legends",
        "Use subplots for multiple views",
      ],
      prerequisites: ["s47-scipy"],
      concepts: ["numpy-arrays"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Matplotlib\n\n```python\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# Line plot\nx = np.linspace(0, 2 * np.pi, 100)\ny = np.sin(x)\n\nplt.figure(figsize=(10, 4))\nplt.plot(x, y, 'b-', label='sin(x)')\nplt.plot(x, np.cos(x), 'r--', label='cos(x)')\nplt.xlabel('x')\nplt.ylabel('y')\nplt.title('Trigonometric Functions')\nplt.legend()\nplt.grid(True)\nplt.savefig('trig.png', dpi=150)\nplt.show()\n\n# Subplots\nfig, axes = plt.subplots(1, 2, figsize=(12, 4))\naxes[0].scatter(x, y, s=1)\naxes[0].set_title('Scatter')\naxes[1].hist(np.random.normal(0, 1, 1000), bins=50)\naxes[1].set_title('Histogram')\nplt.tight_layout()\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use the object-oriented API",
          body: "Prefer `fig, ax = plt.subplots()` and `ax.plot()` over `plt.plot()`. The OO API is more explicit, composable, and essential when creating multiple subplots or embedding in GUIs.",
        },
      ],
      interactions: [
        {
          id: "s47-matplotlib-fill",
          kind: "fill-code",
          prompt: "Create a figure with two side-by-side subplots.",
          beginnerPurpose: "Use matplotlib subplots",
          expectedConceptIds: ["numpy-arrays"],
          codeTemplate: "import matplotlib.pyplot as plt\n\nfig, _____ = plt.subplots(1, 2, figsize=(10, 4))",
          blanks: [{ placeholder: "_____", answer: "axes", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "plt.subplots returns (fig, axes) — unpack into two variables." }],
          feedback: { correct: "Correct! axes is the array of subplot Axes objects.", incorrect: "Unpack plt.subplots(1, 2) as fig, axes — axes is an array of two Axes." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s47-matplotlib-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s47-project",
    stageId: "stage-47",
    title: "Data Analysis and Visualization Pipeline",
    brief:
      "Analyze a real dataset using NumPy and SciPy: compute descriptive statistics, run a statistical hypothesis test, fit a curve, and produce a publication-quality multi-panel figure with Matplotlib.",
    requirements: [
      "Load dataset into NumPy array",
      "Compute mean, std, median, percentiles with NumPy",
      "Run scipy.stats t-test or chi-squared test with p-value",
      "Fit a curve with scipy.optimize.curve_fit",
      "Multi-panel Matplotlib figure with at least 3 subplots",
    ],
    acceptanceCriteria: [
      "All statistics are computed without pandas",
      "p-value interpreted correctly in analysis",
      "Figure saved as PNG with proper labels and legends",
    ],
    conceptIds: ["numpy-arrays", "scipy-analysis"],
    difficulty: "advanced",
  },
} satisfies Stage;
