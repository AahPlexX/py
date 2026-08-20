import type { Stage } from "@/course/course.schema";

export const stage26 = {
  id: "stage-26",
  number: 26,
  title: "Numeric Computing, Math, and Precision",
  summary:
    "Understand floating-point representation, rounding, the math and statistics modules, random number generation, and the Decimal/Fraction types for exact arithmetic.",
  level: "intermediate",
  masteryGateConceptIds: [
    "floating-point-precision",
    "decimal-module",
    "math-module",
    "random-module",
  ],

  lessons: [
    /* ── Lesson 26.1: Floating-point representation ────────────────────────── */
    {
      id: "s26-floating-point-representation",
      stageId: "stage-26",
      title: "Floating-Point Representation",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain that floats are stored in binary (IEEE 754)",
        "Predict that most decimal fractions cannot be represented exactly in binary",
        "Use sys.float_info to inspect float limits",
        "Distinguish float precision from float range",
      ],
      prerequisites: [],
      concepts: ["floating-point-precision"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### How computers store fractional numbers\n\nPython's `float` uses IEEE 754 double-precision format: 64 bits split into 1 sign bit, 11 exponent bits, and 52 mantissa bits. This format can represent numbers across an enormous range, but it stores values in *binary* (base-2). Most decimal fractions — like 0.1 or 0.3 — have no exact binary equivalent, just as 1/3 has no exact decimal representation.",
        },
        {
          kind: "code",
          language: "python",
          code: "# The famous floating-point surprise\nprint(0.1 + 0.2)          # 0.30000000000000004\nprint(0.1 + 0.2 == 0.3)   # False\n\n# See the exact stored value\nprint(format(0.1, '.20f'))  # 0.10000000000000000555\nprint(format(0.3, '.20f'))  # 0.29999999999999998890\n\nimport sys\nprint(sys.float_info.max)   # ~1.8e308\nprint(sys.float_info.epsilon)  # ~2.2e-16 (smallest distinguishable diff from 1.0)",
          caption: "0.1 is not exactly 0.1 in binary. The tiny error accumulates in addition.",
        },
        {
          kind: "mental-model",
          title: "Float — base-2 scientific notation",
          analogy:
            "A float is like scientific notation but in binary: you get a fixed number of significant digits, and the position of the decimal point floats. Decimal fractions that would need infinite binary digits (like 0.1 = 0.000110011... in binary) get rounded to the nearest representable value.",
          explanation:
            "The 52-bit mantissa gives about 15-17 significant decimal digits of precision. Numbers outside a tiny fraction of the number line are approximations.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Never use == with floats",
          body: "Because floats are approximations, direct equality comparison (`a == b`) is usually wrong. Use `math.isclose(a, b)` or compare with a tolerance: `abs(a - b) < 1e-9`.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "Why does `0.1 + 0.2 != 0.3` in Python (and most other languages)? What does IEEE 754 stand for?",
        },
      ],
      interactions: [
        {
          id: "s26-fp-repr-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Confront the canonical floating-point surprise to build accurate mental models.",
          expectedConceptIds: ["floating-point-precision"],
          code: "print(0.1 + 0.2 == 0.3)\nprint(round(0.1 + 0.2, 10) == round(0.3, 10))",
          expectedOutput: "False\nTrue",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "0.1 + 0.2 has tiny binary representation error, so == 0.3 is False. Rounding both to 10 decimal places makes them match." },
          ],
          feedback: {
            correct: "Correct! Direct == fails due to floating-point error; rounding both values first makes the comparison work.",
            incorrect: "Floating-point addition accumulates tiny errors. Direct == often fails; use round() or math.isclose().",
          },
        },
        {
          id: "s26-fp-repr-mc",
          kind: "multiple-choice",
          prompt: "How many significant decimal digits does a Python float (IEEE 754 double) provide?",
          beginnerPurpose: "Know the practical precision of floats.",
          expectedConceptIds: ["floating-point-precision"],
          options: [
            { id: "opt-a", text: "7", isCorrect: false, explanation: "7 significant digits is single-precision (32-bit). Python uses 64-bit double." },
            { id: "opt-b", text: "15–17", isCorrect: true, explanation: "IEEE 754 double precision provides approximately 15-17 significant decimal digits." },
            { id: "opt-c", text: "100", isCorrect: false, explanation: "100 significant digits requires the Decimal module with custom precision." },
            { id: "opt-d", text: "Unlimited", isCorrect: false, explanation: "floats have fixed precision. For unlimited precision, use the Decimal module." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "64-bit IEEE 754 double uses 52 mantissa bits." }],
          feedback: {
            correct: "Correct! About 15-17 significant decimal digits for a 64-bit double.",
            incorrect: "Python floats use 64-bit IEEE 754 double precision, giving ~15-17 significant decimal digits.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "floating-point-precision", recallPrompt: "Why is 0.1 + 0.2 != 0.3 in Python?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-fp-repr-predict", "s26-fp-repr-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["floating-point-precision"],
      },
    },

    /* ── Lesson 26.2: Representation error ────────────────────────────────── */
    {
      id: "s26-representation-error",
      stageId: "stage-26",
      title: "Representation Error",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Define representation error as the gap between a decimal value and its nearest float",
        "Use math.isclose() to compare floats safely",
        "Explain error accumulation in repeated arithmetic",
      ],
      prerequisites: ["s26-floating-point-representation"],
      concepts: ["floating-point-precision"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### What is representation error?\n\nEvery time Python stores a decimal fraction like `0.1`, it stores the nearest representable 64-bit binary number, which differs slightly from the true mathematical value. This difference is the *representation error*. Alone it is tiny (~1e-17 for 0.1), but repeated arithmetic amplifies it.",
        },
        {
          kind: "code",
          language: "python",
          code: "import math\n\n# Error accumulation — adding 0.1 ten times\ntotal = 0.0\nfor _ in range(10):\n    total += 0.1\nprint(total)              # 0.9999999999999999\nprint(total == 1.0)       # False\n\n# Safe comparison with math.isclose\nprint(math.isclose(total, 1.0))              # True\nprint(math.isclose(total, 1.0, rel_tol=1e-9))  # True",
          caption: "Adding 0.1 ten times gives 0.999...999 instead of 1.0. math.isclose() handles this gracefully.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use math.isclose() for float equality",
          body: "`math.isclose(a, b, rel_tol=1e-9, abs_tol=0.0)` returns True if the relative difference is within `rel_tol` or the absolute difference is within `abs_tol`. For currency and near-zero values, also set `abs_tol`.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "What would you use instead of `total == 1.0` when `total` is the result of floating-point arithmetic?",
        },
      ],
      interactions: [
        {
          id: "s26-repr-error-mc",
          kind: "multiple-choice",
          prompt: "Which comparison correctly checks if a floating-point sum equals 1.0?",
          beginnerPurpose: "Replace broken float equality with safe comparison.",
          expectedConceptIds: ["floating-point-precision"],
          options: [
            { id: "opt-a", text: "total == 1.0", isCorrect: false, explanation: "Direct equality fails due to floating-point representation error." },
            { id: "opt-b", text: "math.isclose(total, 1.0)", isCorrect: true, explanation: "math.isclose() compares with a tolerance to handle representation error." },
            { id: "opt-c", text: "total is 1.0", isCorrect: false, explanation: "`is` tests object identity, not numeric equality — definitely wrong for floats." },
            { id: "opt-d", text: "str(total) == str(1.0)", isCorrect: false, explanation: "String conversion hides precision issues but does not reliably handle edge cases." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The math module provides a function specifically for approximate float comparison." }],
          feedback: {
            correct: "Correct! math.isclose() is the idiomatic way to compare floats.",
            incorrect: "Use math.isclose(a, b) for float equality comparisons.",
          },
        },
        {
          id: "s26-repr-error-fill",
          kind: "fill-code",
          prompt: "Complete the code to safely check if two floating-point values are approximately equal.",
          beginnerPurpose: "Practice using math.isclose() instead of ==.",
          expectedConceptIds: ["floating-point-precision"],
          codeTemplate: "import math\na = 0.1 + 0.2\nb = 0.3\nprint(math.___(a, b))",
          blanks: [
            { placeholder: "___", answer: "isclose", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The function in the math module for approximate float equality is isclose()." },
          ],
          feedback: {
            correct: "Correct! math.isclose(a, b) returns True even though a != b exactly.",
            incorrect: "Use math.isclose(a, b) to compare floats with a tolerance.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "floating-point-precision", recallPrompt: "Why is direct == comparison wrong for floats, and what should you use instead?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-repr-error-mc", "s26-repr-error-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["floating-point-precision"],
      },
    },

    /* ── Lesson 26.3: Rounding behavior ───────────────────────────────────── */
    {
      id: "s26-rounding-behavior",
      stageId: "stage-26",
      title: "Rounding Behavior",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain Python's banker's rounding (round half to even)",
        "Use round(x, n) to round to n decimal places",
        "Use math.floor, math.ceil, math.trunc",
        "Distinguish rounding from truncation",
      ],
      prerequisites: ["s26-representation-error"],
      concepts: ["floating-point-precision"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Banker's rounding\n\nPython's built-in `round()` uses *round half to even* (also called banker's rounding): when the value is exactly halfway between two integers, it rounds to the nearest *even* number. This reduces statistical bias when rounding many values. Most people expect *round half up*, so the behavior can surprise.",
        },
        {
          kind: "code",
          language: "python",
          code: "# Banker's rounding — halfway cases go to the even integer\nprint(round(0.5))   # 0  (even)\nprint(round(1.5))   # 2  (even)\nprint(round(2.5))   # 2  (even)\nprint(round(3.5))   # 4  (even)\n\n# Rounding to N decimal places\nprint(round(3.14159, 2))  # 3.14\nprint(round(2.675, 2))    # 2.67  — surprise! (float representation issue)",
          caption: "Halfway values round to even. round(2.675, 2) rounds down due to float representation.",
        },
        {
          kind: "code",
          language: "python",
          code: "import math\n\nprint(math.floor(2.7))    # 2  — largest integer <= x\nprint(math.ceil(2.3))     # 3  — smallest integer >= x\nprint(math.trunc(2.9))    # 2  — truncate toward zero\nprint(math.trunc(-2.9))   # -2 — truncate toward zero (not floor!)",
          caption: "floor and trunc differ for negative numbers: floor(-2.9)=-3, trunc(-2.9)=-2.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "round() is not always what you expect",
          body: "For financial rounding where you always want round-half-up, use `decimal.Decimal.quantize()` with `ROUND_HALF_UP`. Python's built-in round() uses banker's rounding which rounds half to even.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "What does `round(2.5)` return in Python? What does `round(3.5)` return? Why are these the 'expected' results under banker's rounding?",
        },
      ],
      interactions: [
        {
          id: "s26-rounding-predict",
          kind: "predict-output",
          prompt: "What does this program print? (Banker's rounding applies.)",
          beginnerPurpose: "Experience banker's rounding to avoid surprises in production code.",
          expectedConceptIds: ["floating-point-precision"],
          code: "print(round(0.5))\nprint(round(1.5))\nprint(round(4.5))",
          expectedOutput: "0\n2\n4",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Python uses banker's rounding: halfway values round to the nearest EVEN integer." },
          ],
          feedback: {
            correct: "Correct! 0.5 → 0 (even), 1.5 → 2 (even), 4.5 → 4 (even).",
            incorrect: "Python rounds halfway to even: 0.5→0, 1.5→2, 2.5→2, 3.5→4, 4.5→4.",
          },
        },
        {
          id: "s26-rounding-mc",
          kind: "multiple-choice",
          prompt: "What is the difference between `math.floor(-2.3)` and `math.trunc(-2.3)`?",
          beginnerPurpose: "Distinguish floor from truncation for negative numbers.",
          expectedConceptIds: ["floating-point-precision"],
          options: [
            { id: "opt-a", text: "Both return -2", isCorrect: false, explanation: "math.floor(-2.3) returns -3 (rounds toward negative infinity), not -2." },
            { id: "opt-b", text: "floor returns -3; trunc returns -2", isCorrect: true, explanation: "floor rounds toward negative infinity (-3), trunc rounds toward zero (-2)." },
            { id: "opt-c", text: "floor returns -2; trunc returns -3", isCorrect: false, explanation: "It is the opposite: floor goes toward -inf, trunc goes toward zero." },
            { id: "opt-d", text: "Both return -3", isCorrect: false, explanation: "Only floor returns -3; trunc returns -2." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "floor always rounds toward negative infinity; trunc always rounds toward zero." }],
          feedback: {
            correct: "Correct! floor(-2.3)=-3 (toward -inf), trunc(-2.3)=-2 (toward 0).",
            incorrect: "floor rounds toward negative infinity (-3); trunc rounds toward zero (-2).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "floating-point-precision", recallPrompt: "What does Python's round() do when the value is exactly halfway between two integers?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-rounding-predict", "s26-rounding-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["floating-point-precision"],
      },
    },

    /* ── Lesson 26.4: math module ─────────────────────────────────────────── */
    {
      id: "s26-math-module",
      stageId: "stage-26",
      title: "math Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use math.sqrt, math.log, math.exp for common mathematical functions",
        "Use math.pi and math.e as constants",
        "Use math.factorial and math.comb for combinatorics",
        "Use math.isnan and math.isinf to test special float values",
      ],
      prerequisites: ["s26-rounding-behavior"],
      concepts: ["math-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### The math module\n\nPython's `math` module provides standard mathematical functions operating on floats. It wraps C library math functions, so it is both fast and precise. All functions operate on real numbers; for complex numbers, use `cmath`.",
        },
        {
          kind: "code",
          language: "python",
          code: "import math\n\n# Constants\nprint(math.pi)    # 3.141592653589793\nprint(math.e)     # 2.718281828459045\nprint(math.tau)   # 6.283185307179586  (2*pi)\nprint(math.inf)   # inf\nprint(math.nan)   # nan\n\n# Common functions\nprint(math.sqrt(16))       # 4.0\nprint(math.log(math.e))    # 1.0\nprint(math.log(100, 10))   # 2.0  — log base 10\nprint(math.log2(8))        # 3.0  — log base 2\nprint(math.exp(1))         # 2.718...  — e^1",
          caption: "math provides standard constants and functions for real-number arithmetic.",
        },
        {
          kind: "code",
          language: "python",
          code: "import math\n\n# Combinatorics\nprint(math.factorial(5))    # 120\nprint(math.comb(10, 3))     # 120  — combinations C(10,3)\nprint(math.perm(10, 3))     # 720  — permutations P(10,3)\n\n# Special values\nprint(math.isnan(float('nan')))  # True\nprint(math.isinf(math.inf))      # True\nprint(math.isfinite(1.0))        # True",
          caption: "math.comb and math.perm (Python 3.8+) for combinatorics. isnan/isinf test special values.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "math.isfinite() for validation",
          body: "In numeric code that receives external data, use `math.isfinite(x)` to reject NaN or Inf before computation — these can silently propagate through arithmetic and corrupt results.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "What is the difference between `math.log(x)` and `math.log10(x)`? What is `math.comb(5, 2)`?",
        },
      ],
      interactions: [
        {
          id: "s26-math-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Trace math function calls to build familiarity with the module.",
          expectedConceptIds: ["math-module"],
          code: "import math\nprint(math.sqrt(9))\nprint(math.log2(8))\nprint(math.factorial(4))",
          expectedOutput: "3.0\n3.0\n24",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "sqrt(9)=3.0, log2(8)=3.0 (2^3=8), factorial(4)=4*3*2*1=24." },
          ],
          feedback: {
            correct: "Correct! sqrt returns float, log2(8)=3.0, factorial returns int.",
            incorrect: "sqrt(9)=3.0 (float), log2(8)=3.0 (2^3=8), factorial(4)=24 (int).",
          },
        },
        {
          id: "s26-math-fill",
          kind: "fill-code",
          prompt: "Complete the code to calculate the number of ways to choose 3 items from 10 (combinations).",
          beginnerPurpose: "Practice using math.comb for combinatorics.",
          expectedConceptIds: ["math-module"],
          codeTemplate: "import math\nresult = math.___(10, 3)\nprint(result)",
          blanks: [
            { placeholder: "___", answer: "comb", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The function for combinations C(n, k) is math.comb(n, k)." },
          ],
          feedback: {
            correct: "Correct! math.comb(10, 3) = 120.",
            incorrect: "Use math.comb(n, k) for combinations, math.perm(n, k) for permutations.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "math-module", recallPrompt: "List 5 functions from the math module and what they compute.", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-math-predict", "s26-math-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["math-module"],
      },
    },

    /* ── Lesson 26.5: cmath ───────────────────────────────────────────────── */
    {
      id: "s26-cmath",
      stageId: "stage-26",
      title: "cmath — Complex Math",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create complex numbers using the j literal syntax",
        "Use cmath.sqrt, cmath.exp, cmath.polar, cmath.rect",
        "Distinguish cmath from math for complex inputs",
      ],
      prerequisites: ["s26-math-module"],
      concepts: ["cmath-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Complex numbers in Python\n\nPython has built-in complex number support with the `j` suffix for the imaginary part. The `cmath` module mirrors `math` but works on complex numbers — `math.sqrt(-1)` raises ValueError, but `cmath.sqrt(-1)` returns `1j`.",
        },
        {
          kind: "code",
          language: "python",
          code: "import cmath\n\nz = 3 + 4j              # complex literal\nprint(z.real)           # 3.0\nprint(z.imag)           # 4.0\nprint(abs(z))           # 5.0  — magnitude\n\nprint(cmath.sqrt(-1))   # 1j\nprint(cmath.polar(z))   # (5.0, 0.9272...)  — (r, theta)\nprint(cmath.rect(5, cmath.pi/4))  # convert back from polar",
          caption: "Complex numbers use j for imaginary part. cmath.polar converts to (magnitude, angle).",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "What does `cmath.sqrt(-4)` return? How does Python represent a pure imaginary number?",
        },
      ],
      interactions: [
        {
          id: "s26-cmath-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Verify understanding of Python complex number syntax and cmath.sqrt.",
          expectedConceptIds: ["cmath-module"],
          code: "import cmath\nz = 2 + 3j\nprint(z.real)\nprint(z.imag)\nprint(cmath.sqrt(-4))",
          expectedOutput: "2.0\n3.0\n2j",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "real and imag are always float. sqrt(-4) = 2j (sqrt(4) * sqrt(-1) = 2j)." },
          ],
          feedback: {
            correct: "Correct! Real and imaginary parts are floats; sqrt(-4)=2j.",
            incorrect: "z.real=2.0, z.imag=3.0 (always float). cmath.sqrt(-4) = 2j.",
          },
        },
        {
          id: "s26-cmath-mc",
          kind: "multiple-choice",
          prompt: "What happens when you call `math.sqrt(-1)` (the regular math module, not cmath)?",
          beginnerPurpose: "Understand the difference between math and cmath for negative inputs.",
          expectedConceptIds: ["cmath-module"],
          options: [
            { id: "opt-a", text: "Returns 1j", isCorrect: false, explanation: "math.sqrt does not handle complex numbers — use cmath for that." },
            { id: "opt-b", text: "Raises ValueError", isCorrect: true, explanation: "math.sqrt(-1) raises ValueError: math domain error. Use cmath.sqrt(-1) for complex results." },
            { id: "opt-c", text: "Returns NaN", isCorrect: false, explanation: "math.sqrt raises an exception rather than returning NaN for negative inputs." },
            { id: "opt-d", text: "Returns -1.0", isCorrect: false, explanation: "math.sqrt computes the real square root — negative inputs have no real square root." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The math module operates on real numbers only." }],
          feedback: {
            correct: "Correct! math.sqrt raises ValueError for negative inputs. Use cmath.sqrt for complex results.",
            incorrect: "math.sqrt only handles non-negative reals. For complex results, use cmath.sqrt.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "cmath-module", recallPrompt: "How do you create a complex number in Python, and when would you use cmath instead of math?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-cmath-predict", "s26-cmath-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["cmath-module"],
      },
    },

    /* ── Lesson 26.6: statistics module ───────────────────────────────────── */
    {
      id: "s26-statistics-module",
      stageId: "stage-26",
      title: "statistics Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use statistics.mean, median, mode, stdev, variance",
        "Understand when to use statistics vs NumPy",
        "Use statistics.NormalDist for probability calculations",
      ],
      prerequisites: ["s26-cmath"],
      concepts: ["statistics-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Standard library statistics\n\nPython's `statistics` module (Python 3.4+) provides basic statistical functions for small datasets. Unlike NumPy, it operates on plain Python sequences and returns exact `Decimal` or `Fraction` results when given those types. Use it for small datasets; use NumPy for performance-critical work.",
        },
        {
          kind: "code",
          language: "python",
          code: "import statistics\n\ndata = [2, 4, 4, 4, 5, 5, 7, 9]\nprint(statistics.mean(data))       # 5.0\nprint(statistics.median(data))     # 4.5\nprint(statistics.mode(data))       # 4\nprint(statistics.stdev(data))      # 2.0  — sample std dev\nprint(statistics.variance(data))   # 4.0",
          caption: "statistics provides familiar descriptive statistics. mode() raises StatisticsError if no unique mode.",
        },
        {
          kind: "code",
          language: "python",
          code: "from statistics import NormalDist\n\n# IQ scores: mean=100, stdev=15\niq = NormalDist(mu=100, sigma=15)\nprint(f\"{iq.cdf(115):.3f}\")    # 0.841 — prob of score <= 115\nprint(f\"{iq.pdf(100):.4f}\")    # 0.0266 — prob density at mean\nprint(f\"{iq.inv_cdf(0.975):.1f}\")  # 129.4 — 97.5th percentile",
          caption: "NormalDist (Python 3.8+) enables probability calculations without scipy.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use statistics.fmean() for faster mean",
          body: "`statistics.fmean()` (Python 3.8+) converts inputs to floats first and is faster than `mean()` for large datasets. Use `mean()` when you need exact arithmetic with Decimals.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "What is the difference between `statistics.stdev()` and `statistics.pstdev()`?",
        },
      ],
      interactions: [
        {
          id: "s26-stats-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Practice reading statistics module output for common descriptive stats.",
          expectedConceptIds: ["statistics-module"],
          code: "import statistics\ndata = [1, 2, 3, 4, 5]\nprint(statistics.mean(data))\nprint(statistics.median(data))",
          expectedOutput: "3\n3",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "mean([1,2,3,4,5]) = 15/5 = 3; median of 5 items is the 3rd = 3." },
          ],
          feedback: {
            correct: "Correct! mean=3, median=3 for [1,2,3,4,5].",
            incorrect: "mean = sum / count = 15/5 = 3; median of sorted [1,2,3,4,5] is the middle value = 3.",
          },
        },
        {
          id: "s26-stats-mc",
          kind: "multiple-choice",
          prompt: "Which statistics function should you use for the spread of a sample (not the whole population)?",
          beginnerPurpose: "Distinguish sample vs population standard deviation.",
          expectedConceptIds: ["statistics-module"],
          options: [
            { id: "opt-a", text: "statistics.pstdev()", isCorrect: false, explanation: "pstdev() is for the full population standard deviation (divides by N)." },
            { id: "opt-b", text: "statistics.stdev()", isCorrect: true, explanation: "stdev() calculates sample standard deviation, dividing by N-1 (Bessel's correction)." },
            { id: "opt-c", text: "statistics.variance()", isCorrect: false, explanation: "variance() returns the variance (stdev squared), not the standard deviation." },
            { id: "opt-d", text: "statistics.mean()", isCorrect: false, explanation: "mean() is a measure of central tendency, not spread." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Sample statistics use N-1 in the denominator (Bessel's correction)." }],
          feedback: {
            correct: "Correct! stdev() uses N-1 for sample standard deviation.",
            incorrect: "stdev() is sample std dev (N-1). pstdev() is population std dev (N).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "statistics-module", recallPrompt: "Name 4 functions from the statistics module and what each measures.", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-stats-predict", "s26-stats-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["statistics-module"],
      },
    },

    /* ── Lesson 26.7: random module ───────────────────────────────────────── */
    {
      id: "s26-random-module",
      stageId: "stage-26",
      title: "random Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Generate random integers with random.randint and randrange",
        "Generate random floats with random.random and uniform",
        "Shuffle a list and pick random items with random.shuffle and random.choice",
        "Explain why random is not cryptographically secure",
      ],
      prerequisites: ["s26-statistics-module"],
      concepts: ["random-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Pseudo-random number generation\n\nPython's `random` module implements the Mersenne Twister PRNG — a high-quality pseudo-random number generator suitable for simulations, sampling, and games, but **not** for security purposes. For tokens, passwords, or cryptographic use, use the `secrets` module instead.",
        },
        {
          kind: "code",
          language: "python",
          code: "import random\n\n# Random integers\nprint(random.randint(1, 6))      # die roll: 1–6 inclusive\nprint(random.randrange(0, 100, 5))  # 0,5,10,...,95\n\n# Random floats\nprint(random.random())           # [0.0, 1.0)\nprint(random.uniform(1.5, 6.5))  # [1.5, 6.5]\n\n# Sequences\nitems = ['a', 'b', 'c', 'd']\nprint(random.choice(items))      # random element\nprint(random.choices(items, k=3))  # 3 with replacement\nprint(random.sample(items, 2))   # 2 without replacement\nrandom.shuffle(items)            # in-place shuffle\nprint(items)",
          caption: "random provides functions for integers, floats, and sequence operations.",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "random is NOT secure",
          body: "The random module's PRNG is predictable if an attacker knows the seed. For passwords, tokens, or any security-sensitive randomness, use `secrets.token_hex()` or `secrets.randbelow()` from the `secrets` module.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "What is the difference between `random.choice(items)` and `random.sample(items, 1)`? When would you use each?",
        },
      ],
      interactions: [
        {
          id: "s26-random-mc",
          kind: "multiple-choice",
          prompt: "Which function should you use to generate a cryptographically secure random token?",
          beginnerPurpose: "Understand the security limitation of the random module.",
          expectedConceptIds: ["random-module"],
          options: [
            { id: "opt-a", text: "random.random()", isCorrect: false, explanation: "random.random() uses Mersenne Twister which is not cryptographically secure." },
            { id: "opt-b", text: "random.randint()", isCorrect: false, explanation: "randint() is also based on Mersenne Twister — not secure." },
            { id: "opt-c", text: "secrets.token_hex()", isCorrect: true, explanation: "The secrets module uses the OS's cryptographically secure RNG." },
            { id: "opt-d", text: "random.getrandbits()", isCorrect: false, explanation: "getrandbits() is still Mersenne Twister — not cryptographically secure." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The standard random module is predictable. Python has a separate module for secure randomness." }],
          feedback: {
            correct: "Correct! The secrets module uses the OS CSPRNG and is safe for security applications.",
            incorrect: "For security purposes, use the secrets module, not the random module.",
          },
        },
        {
          id: "s26-random-fill",
          kind: "fill-code",
          prompt: "Complete the code to pick 3 unique items from a list (no repeats).",
          beginnerPurpose: "Distinguish random.sample (no replacement) from random.choices (with replacement).",
          expectedConceptIds: ["random-module"],
          codeTemplate: "import random\nitems = ['a', 'b', 'c', 'd', 'e']\npicked = random.___(items, 3)\nprint(len(picked), len(set(picked)))",
          blanks: [
            { placeholder: "___", answer: "sample", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "sample() picks without replacement; choices() picks with replacement." },
          ],
          feedback: {
            correct: "Correct! random.sample() picks unique items (no replacement).",
            incorrect: "Use random.sample() for picking without replacement, random.choices() for with replacement.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "random-module", recallPrompt: "When should you use secrets instead of random?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-random-mc", "s26-random-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["random-module"],
      },
    },

    /* ── Lesson 26.8: Reproducibility with seeds ──────────────────────────── */
    {
      id: "s26-random-reproducibility",
      stageId: "stage-26",
      title: "Random Reproducibility with Seeds",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use random.seed() to make a random sequence reproducible",
        "Explain why reproducibility matters for testing and debugging",
        "Create an isolated Random instance with random.Random(seed)",
      ],
      prerequisites: ["s26-random-module"],
      concepts: ["random-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Why seeding matters\n\nA pseudo-random number generator is *deterministic* given the same starting state (seed). By calling `random.seed(n)` before generating numbers, you guarantee that the same sequence is produced every run. This is essential for reproducible experiments, tests, and debugging.",
        },
        {
          kind: "code",
          language: "python",
          code: "import random\n\nrandom.seed(42)\nprint([random.randint(1, 10) for _ in range(5)])  # same every run\n\nrandom.seed(42)  # reset to same seed\nprint([random.randint(1, 10) for _ in range(5)])  # identical output",
          caption: "Same seed → same sequence. Resetting the seed reproduces the exact same numbers.",
        },
        {
          kind: "code",
          language: "python",
          code: "import random\n\n# Isolated PRNG — doesn't affect global state\nrng = random.Random(seed=99)\nprint(rng.random())\nprint(rng.randint(1, 100))\n# global random state is unchanged",
          caption: "random.Random(seed) creates an independent generator instance — useful in libraries and tests.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Seed with None for unpredictable output",
          body: "`random.seed(None)` (or calling `random.seed()` with no argument) seeds from the OS entropy source — each run gives different numbers. This is the default behavior.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "Why is `random.seed(42)` useful in a unit test that checks a function using random sampling?",
        },
      ],
      interactions: [
        {
          id: "s26-seed-predict",
          kind: "predict-output",
          prompt: "What does this program print? (The seed makes it deterministic.)",
          beginnerPurpose: "Confirm that random.seed() produces the same sequence every run.",
          expectedConceptIds: ["random-module"],
          code: "import random\nrandom.seed(0)\nprint(random.randint(1, 10))\nrandom.seed(0)\nprint(random.randint(1, 10))",
          expectedOutput: "6\n6",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Same seed → same first output. Resetting to seed 0 gives the same number again." },
          ],
          feedback: {
            correct: "Correct! Resetting to seed 0 reproduces the same sequence.",
            incorrect: "Seeding with the same value always produces the same sequence from that point.",
          },
        },
        {
          id: "s26-seed-mc",
          kind: "multiple-choice",
          prompt: "When is setting a random seed most useful?",
          beginnerPurpose: "Understand practical use cases for seeding.",
          expectedConceptIds: ["random-module"],
          options: [
            { id: "opt-a", text: "To make output less predictable", isCorrect: false, explanation: "Seeding makes output MORE predictable and reproducible." },
            { id: "opt-b", text: "To reproduce results in experiments and tests", isCorrect: true, explanation: "A fixed seed guarantees the same random sequence, making experiments and tests reproducible." },
            { id: "opt-c", text: "To improve the quality of random numbers", isCorrect: false, explanation: "Seeding doesn't change the quality of the PRNG — same Mersenne Twister regardless." },
            { id: "opt-d", text: "To enable parallelism", isCorrect: false, explanation: "Seeding doesn't help with parallelism; use random.Random() instances for that." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about debugging or testing a function that uses random numbers." }],
          feedback: {
            correct: "Correct! Fixed seeds make experiments and tests reproducible.",
            incorrect: "Seeding is for reproducibility — the same seed always produces the same sequence.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "random-module", recallPrompt: "How do you make a random sequence reproducible in Python?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-seed-predict", "s26-seed-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["random-module"],
      },
    },

    /* ── Lesson 26.9: decimal module ──────────────────────────────────────── */
    {
      id: "s26-decimal-module",
      stageId: "stage-26",
      title: "decimal Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create Decimal values from strings (not floats)",
        "Perform exact decimal arithmetic without floating-point error",
        "Use Decimal for financial calculations",
        "Understand Decimal's arbitrary precision",
      ],
      prerequisites: ["s26-random-reproducibility"],
      concepts: ["decimal-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Exact decimal arithmetic\n\nFor financial calculations, floating-point errors are unacceptable. `decimal.Decimal` stores numbers in base-10 with user-configurable precision. `Decimal('0.1') + Decimal('0.2')` is exactly `Decimal('0.3')` — no surprises.",
        },
        {
          kind: "code",
          language: "python",
          code: "from decimal import Decimal\n\n# Always create Decimal from a STRING, not a float!\ngood = Decimal('0.1') + Decimal('0.2')\nbad  = Decimal(0.1) + Decimal(0.2)   # inherits float error!\n\nprint(good)   # 0.3  — exact\nprint(bad)    # 0.3000000000000000166533453694  — oops\n\n# Financial calculation\nprice = Decimal('19.99')\ntax   = Decimal('0.08')\ntotal = price * (1 + tax)\nprint(total)  # 21.5892 — exact",
          caption: "Always initialize Decimal from a string literal. Decimal(float) inherits the float's representation error.",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Never pass a float to Decimal()",
          body: "`Decimal(0.1)` does NOT give you the exact decimal 0.1 — it converts the float's binary approximation. Always write `Decimal('0.1')` with a string.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "Why is `Decimal(0.1)` different from `Decimal('0.1')`? When would you use Decimal over float?",
        },
      ],
      interactions: [
        {
          id: "s26-decimal-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Contrast Decimal string construction (exact) vs float construction (inexact).",
          expectedConceptIds: ["decimal-module"],
          code: "from decimal import Decimal\nprint(Decimal('0.1') + Decimal('0.2') == Decimal('0.3'))\nprint(0.1 + 0.2 == 0.3)",
          expectedOutput: "True\nFalse",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "Decimal from strings is exact; float arithmetic has representation error." },
          ],
          feedback: {
            correct: "Correct! Decimal from strings is exact; float arithmetic gives 0.30000000000000004.",
            incorrect: "Decimal('0.1') + Decimal('0.2') is exactly 0.3. Float 0.1 + 0.2 has tiny error.",
          },
        },
        {
          id: "s26-decimal-fill",
          kind: "fill-code",
          prompt: "Complete the Decimal calculation for a cart total (price + tax), always creating Decimals from strings.",
          beginnerPurpose: "Practice building a correct Decimal-based financial calculation.",
          expectedConceptIds: ["decimal-module"],
          codeTemplate: "from decimal import Decimal\nprice = ___('9.99')\ntax   = ___('0.10')\ntotal = price + price * tax\nprint(total)",
          blanks: [
            { placeholder: "___", answer: "Decimal", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "Use Decimal('string') to create exact decimal values." },
          ],
          feedback: {
            correct: "Correct! Decimal('9.99') + Decimal('9.99') * Decimal('0.10') = 10.989.",
            incorrect: "Use Decimal('9.99') and Decimal('0.10') — always from strings.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "decimal-module", recallPrompt: "Why should you create Decimal values from strings, not floats?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-decimal-predict", "s26-decimal-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["decimal-module"],
      },
    },

    /* ── Lesson 26.10: Decimal contexts ───────────────────────────────────── */
    {
      id: "s26-decimal-contexts",
      stageId: "stage-26",
      title: "Decimal Contexts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use getcontext() to configure precision and rounding mode",
        "Use localcontext() for temporary context changes",
        "Understand ROUND_HALF_UP vs ROUND_HALF_EVEN in Decimal",
      ],
      prerequisites: ["s26-decimal-module"],
      concepts: ["decimal-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Configuring Decimal arithmetic\n\nThe `decimal` module uses a *context* to control precision (number of significant digits), rounding mode, and trap conditions. The global context is accessible via `decimal.getcontext()`. For temporary changes, use `decimal.localcontext()` as a context manager.",
        },
        {
          kind: "code",
          language: "python",
          code: "import decimal\nfrom decimal import Decimal, ROUND_HALF_UP\n\n# Set global precision to 4 significant digits\ndecimal.getcontext().prec = 4\nprint(Decimal('1') / Decimal('3'))    # 0.3333  (4 sig digits)\n\n# Temporary context\nwith decimal.localcontext() as ctx:\n    ctx.prec = 10\n    print(Decimal('1') / Decimal('3'))  # 0.3333333333\n\n# After context manager, back to prec=4\nprint(Decimal('1') / Decimal('3'))    # 0.3333",
          caption: "getcontext() modifies global settings; localcontext() scopes changes to a block.",
        },
        {
          kind: "code",
          language: "python",
          code: "from decimal import Decimal, ROUND_HALF_UP, ROUND_HALF_EVEN\n\namt = Decimal('2.5')\nprint(amt.quantize(Decimal('1'), rounding=ROUND_HALF_UP))    # 3 — always rounds 0.5 up\nprint(amt.quantize(Decimal('1'), rounding=ROUND_HALF_EVEN))  # 2 — banker's rounding",
          caption: "quantize() rounds to a specific place. ROUND_HALF_UP is the 'usual' rounding; ROUND_HALF_EVEN is banker's.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use quantize() for monetary formatting",
          body: "`Decimal('19.9').quantize(Decimal('0.01'))` rounds to 2 decimal places — perfect for displaying currency amounts.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "What is the default precision of Decimal? How would you set precision to 50 significant digits for a high-precision calculation?",
        },
      ],
      interactions: [
        {
          id: "s26-decimal-ctx-mc",
          kind: "multiple-choice",
          prompt: "Which function makes a temporary Decimal context change that restores settings after the block?",
          beginnerPurpose: "Choose the right context management tool for scoped Decimal settings.",
          expectedConceptIds: ["decimal-module"],
          options: [
            { id: "opt-a", text: "decimal.getcontext()", isCorrect: false, explanation: "getcontext() returns the global context and modifies it permanently." },
            { id: "opt-b", text: "decimal.localcontext()", isCorrect: true, explanation: "localcontext() is a context manager that creates a copy, restoring the original on exit." },
            { id: "opt-c", text: "decimal.setcontext()", isCorrect: false, explanation: "setcontext() replaces the global context permanently." },
            { id: "opt-d", text: "decimal.Context()", isCorrect: false, explanation: "Context() creates a new context object, but doesn't automatically scope and restore it." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Look for the function that works as a context manager with `with`." }],
          feedback: {
            correct: "Correct! localcontext() as a context manager restores the original settings on exit.",
            incorrect: "Use decimal.localcontext() in a with statement to make temporary scoped changes.",
          },
        },
        {
          id: "s26-decimal-ctx-fill",
          kind: "fill-code",
          prompt: "Complete the code to round a Decimal to 2 decimal places using ROUND_HALF_UP.",
          beginnerPurpose: "Practice using quantize() with a rounding mode.",
          expectedConceptIds: ["decimal-module"],
          codeTemplate: "from decimal import Decimal, ROUND_HALF_UP\namt = Decimal('2.675')\nresult = amt.quantize(Decimal('0.01'), rounding=___)\nprint(result)",
          blanks: [
            { placeholder: "___", answer: "ROUND_HALF_UP", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "Import ROUND_HALF_UP from decimal and pass it as the rounding argument." },
          ],
          feedback: {
            correct: "Correct! ROUND_HALF_UP rounds 2.675 to 2.68.",
            incorrect: "Pass ROUND_HALF_UP as the rounding keyword argument to quantize().",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "decimal-module", recallPrompt: "How do you temporarily change Decimal precision within a code block?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-decimal-ctx-mc", "s26-decimal-ctx-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["decimal-module"],
      },
    },

    /* ── Lesson 26.11: fractions module ───────────────────────────────────── */
    {
      id: "s26-fractions-module",
      stageId: "stage-26",
      title: "fractions Module",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create Fraction from numerator/denominator or a string",
        "Perform exact rational arithmetic",
        "Use Fraction.limit_denominator() to convert floats to nearest fraction",
      ],
      prerequisites: ["s26-decimal-contexts"],
      concepts: ["fractions-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Exact rational arithmetic\n\n`fractions.Fraction` represents numbers as exact rational fractions (numerator/denominator). Unlike floats, there is no representation error. Unlike Decimal, fractions can represent any rational number exactly without choosing a precision.",
        },
        {
          kind: "code",
          language: "python",
          code: "from fractions import Fraction\n\na = Fraction(1, 3)    # 1/3 exactly\nb = Fraction('1/6')   # from string\nc = a + b             # 1/3 + 1/6 = 1/2 exactly\n\nprint(a)          # 1/3\nprint(c)          # 1/2\nprint(float(c))   # 0.5\n\n# Auto-reduces\nprint(Fraction(4, 8))  # 1/2  — reduces to lowest terms",
          caption: "Fractions are always in lowest terms. Arithmetic is exact rational arithmetic.",
        },
        {
          kind: "code",
          language: "python",
          code: "from fractions import Fraction\n\n# Convert float to nearest simple fraction\npi_approx = Fraction(3.14159265).limit_denominator(1000)\nprint(pi_approx)         # 355/113  — classic pi approximation\nprint(float(pi_approx))  # 3.1415929...",
          caption: "limit_denominator() finds the nearest fraction with a denominator at most n.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Fractions can be slow for large computations",
          body: "Because fractions store exact rational numbers, operations may require computing GCDs of very large integers. For performance-critical numeric work, use Decimal or NumPy instead.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "What does `Fraction(1, 3) + Fraction(1, 6)` produce? How is this different from `1/3 + 1/6` with floats?",
        },
      ],
      interactions: [
        {
          id: "s26-fractions-predict",
          kind: "predict-output",
          prompt: "What does this program print?",
          beginnerPurpose: "Confirm that Fraction arithmetic is exact and auto-reduces.",
          expectedConceptIds: ["fractions-module"],
          code: "from fractions import Fraction\na = Fraction(1, 4)\nb = Fraction(1, 4)\nprint(a + b)\nprint(a * b)",
          expectedOutput: "1/2\n1/16",
          allowedAttempts: 3,
          hints: [
            { level: "concept", text: "1/4 + 1/4 = 2/4 = 1/2 (auto-reduced); 1/4 * 1/4 = 1/16." },
          ],
          feedback: {
            correct: "Correct! Fractions are automatically reduced to lowest terms.",
            incorrect: "1/4 + 1/4 = 2/4 which reduces to 1/2; 1/4 * 1/4 = 1/16.",
          },
        },
        {
          id: "s26-fractions-mc",
          kind: "multiple-choice",
          prompt: "What does `Fraction(0.1)` give you?",
          beginnerPurpose: "Understand that creating Fraction from a float inherits float imprecision.",
          expectedConceptIds: ["fractions-module"],
          options: [
            { id: "opt-a", text: "Fraction(1, 10) exactly", isCorrect: false, explanation: "Fraction(0.1) converts the float 0.1, which is not exactly 1/10 in binary." },
            { id: "opt-b", text: "A fraction representing the exact binary value of 0.1", isCorrect: true, explanation: "Fraction(0.1) gives 3602879701896397/36028797018963968 — the exact rational equivalent of the float." },
            { id: "opt-c", text: "An error", isCorrect: false, explanation: "Fraction accepts floats — it just gives the exact rational for that float, not 1/10." },
            { id: "opt-d", text: "Fraction(1, 10)", isCorrect: false, explanation: "Use Fraction('1/10') or Fraction(1, 10) for exactly 1/10; Fraction(0.1) uses the float's binary value." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "0.1 as a float is not exactly 1/10 — Fraction captures the exact float value." }],
          feedback: {
            correct: "Correct! Fraction(float) gives the exact rational equivalent of the float's binary value.",
            incorrect: "Fraction(0.1) gives the exact rational for the binary float 0.1, which is NOT 1/10. Use Fraction('0.1') or Fraction(1,10) for exact 1/10.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "fractions-module", recallPrompt: "How do you create an exact Fraction for 1/3? What does Fraction(1,3) + Fraction(1,6) return?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-fractions-predict", "s26-fractions-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["fractions-module"],
      },
    },

    /* ── Lesson 26.12–14 combined: Numeric tower, ABCs, performance ────────── */
    {
      id: "s26-numeric-tower",
      stageId: "stage-26",
      title: "Numeric Tower, ABCs, and Performance",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Describe the Python numeric tower: Integral → Rational → Real → Complex",
        "Use numbers.Number ABCs for type checking",
        "Compare performance of int, float, Decimal, and Fraction",
        "Choose the right numeric type for a given problem",
      ],
      prerequisites: ["s26-fractions-module"],
      concepts: ["numeric-tower"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### The numeric tower\n\nPython defines an abstract hierarchy of numeric types in the `numbers` module: `Complex → Real → Rational → Integral`. Each is a subtype of the one to its right. `complex` is a `numbers.Complex`, `float` is a `numbers.Real`, `Fraction` is a `numbers.Rational`, `int` is a `numbers.Integral`.",
        },
        {
          kind: "code",
          language: "python",
          code: "import numbers\nfrom decimal import Decimal\nfrom fractions import Fraction\n\nprint(isinstance(42, numbers.Integral))      # True\nprint(isinstance(3.14, numbers.Real))         # True\nprint(isinstance(Fraction(1,3), numbers.Rational))  # True\nprint(isinstance(1+2j, numbers.Complex))     # True\nprint(isinstance(Decimal('1.5'), numbers.Number))  # True",
          caption: "The numbers ABCs let you write functions that accept any numeric type at a given level.",
        },
        {
          kind: "text",
          markdown:
            "### Performance comparison\n\n| Type | Speed | Precision | Use case |\n|------|-------|-----------|----------|\n| `int` | Very fast | Exact (arbitrary precision) | Counts, indices |\n| `float` | Fast | ~15-17 decimal digits | Physics, ML, general math |\n| `Decimal` | Slower | Configurable (default 28) | Finance, exact decimal |\n| `Fraction` | Slowest | Exact rational | Symbolic math, rare |\n\nFor large-scale numeric computing, always prefer NumPy arrays over any of these.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "isinstance with numbers ABCs",
          body: "Use `isinstance(x, numbers.Real)` to accept both int and float in a function. This is more robust than `isinstance(x, (int, float))` because it also accepts Decimal and Fraction.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "Is a Python `float` a `numbers.Rational`? Is a Python `int` a `numbers.Complex`? Trace the hierarchy.",
        },
      ],
      interactions: [
        {
          id: "s26-numeric-tower-mc",
          kind: "multiple-choice",
          prompt: "Which numeric type should you use for a financial calculation that requires exactly 2 decimal places?",
          beginnerPurpose: "Apply numeric type selection reasoning to a concrete scenario.",
          expectedConceptIds: ["numeric-tower"],
          options: [
            { id: "opt-a", text: "float", isCorrect: false, explanation: "float has representation error — 0.1 + 0.2 ≠ 0.3, which is unacceptable for finance." },
            { id: "opt-b", text: "int (multiply by 100 and work in cents)", isCorrect: false, explanation: "Integer cent arithmetic works but Decimal is cleaner and handles complex rounding modes." },
            { id: "opt-c", text: "Decimal with quantize()", isCorrect: true, explanation: "Decimal provides exact decimal arithmetic with configurable rounding modes, ideal for financial work." },
            { id: "opt-d", text: "Fraction", isCorrect: false, explanation: "Fraction can represent financial values exactly, but Decimal is more natural and widely used in finance." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Financial calculations need base-10 exactness and configurable rounding." }],
          feedback: {
            correct: "Correct! Decimal with quantize() is the standard choice for financial arithmetic.",
            incorrect: "Decimal is the standard for financial Python code — exact base-10 arithmetic with ROUND_HALF_UP.",
          },
        },
        {
          id: "s26-numeric-tower-fill",
          kind: "fill-code",
          prompt: "Complete the isinstance check to accept any numeric type (int, float, Decimal, etc.).",
          beginnerPurpose: "Use the numbers ABC for generic numeric type checking.",
          expectedConceptIds: ["numeric-tower"],
          codeTemplate: "import numbers\nfrom decimal import Decimal\nx = Decimal('3.14')\nprint(isinstance(x, numbers.___))",
          blanks: [
            { placeholder: "___", answer: "Number", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [
            { level: "syntax", text: "The base class for all numeric types in the numbers module is Number." },
          ],
          feedback: {
            correct: "Correct! numbers.Number is the root of the numeric tower.",
            incorrect: "Use numbers.Number as the base ABC that all numeric types satisfy.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "numeric-tower", recallPrompt: "What are the 4 levels of the Python numeric tower? Which type occupies each level?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-numeric-tower-mc", "s26-numeric-tower-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["numeric-tower"],
      },
    },

    /* ── Lesson 26.15–16: Validation drills and project ───────────────────── */
    {
      id: "s26-precision-project",
      stageId: "stage-26",
      title: "Precision-Sensitive Calculator Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Build a financial calculator using Decimal for exact arithmetic",
        "Implement safe float comparison using math.isclose",
        "Apply appropriate rounding modes for different contexts",
        "Validate numeric inputs and handle edge cases",
      ],
      prerequisites: ["s26-numeric-tower"],
      concepts: ["decimal-module", "floating-point-precision", "math-module"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "### Building a precision-sensitive calculator\n\nThis project combines everything from the stage: you will implement a financial calculator that correctly handles currency rounding, interest calculation, and input validation.",
        },
        {
          kind: "code",
          language: "python",
          code: "from decimal import Decimal, ROUND_HALF_UP\nimport math\n\ndef format_currency(amount: Decimal) -> str:\n    \"\"\"Round to 2 decimal places and format as currency string.\"\"\"\n    rounded = amount.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)\n    return f'${rounded}'\n\ndef compound_interest(principal: str, rate: str, years: int) -> Decimal:\n    \"\"\"Calculate compound interest using exact Decimal arithmetic.\"\"\"\n    p = Decimal(principal)\n    r = Decimal(rate)\n    return p * (1 + r) ** years\n\ndef safe_divide(a: float, b: float, tol: float = 1e-9) -> float:\n    \"\"\"Divide a by b, returning None if b is effectively zero.\"\"\"\n    if math.isclose(b, 0.0, abs_tol=tol):\n        return None\n    return a / b\n\n# Test\nresult = compound_interest('1000', '0.05', 10)\nprint(format_currency(result))   # $1628.89\nprint(safe_divide(10.0, 0.0))    # None",
          caption: "A complete financial calculator using Decimal for exactness and math.isclose for safety.",
        },
        {
          kind: "why-matters",
          body: "Numeric precision bugs in financial software cause real monetary losses. Knowing when to use float vs Decimal, how to compare floats safely, and how to round correctly is a professional skill that distinguishes careful engineers from careless ones.",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Comprehension check",
          body: "In the project code, why is `principal` passed as a string to `compound_interest()` rather than as a float?",
        },
      ],
      interactions: [
        {
          id: "s26-project-run",
          kind: "run-code",
          prompt: "Implement a function that calculates simple interest (P * R * T) using Decimal and returns the result as a formatted currency string.",
          beginnerPurpose: "Build a Decimal-based financial function from scratch.",
          expectedConceptIds: ["decimal-module"],
          starterCode: "from decimal import Decimal, ROUND_HALF_UP\n\ndef simple_interest(principal: str, rate: str, time: int) -> str:\n    p = Decimal(principal)\n    r = Decimal(rate)\n    interest = p * r * time\n    rounded = interest.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)\n    return f'${rounded}'\n\nprint(simple_interest('1000', '0.05', 3))\nprint(simple_interest('500', '0.10', 2))",
          task: "Run the code to confirm correct Decimal-based interest calculation.",
          expectedOutputContains: ["$150.00", "$100.00"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "concept", text: "simple interest = P * R * T; quantize with ROUND_HALF_UP for currency." },
          ],
          feedback: {
            correct: "Correct! Decimal arithmetic gives exact results for financial calculations.",
            incorrect: "Multiply P * R * T as Decimals, then quantize to 2 decimal places.",
          },
        },
        {
          id: "s26-project-mc",
          kind: "multiple-choice",
          prompt: "A function receives a user-entered price as a string '19.99'. What is the correct way to create a Decimal for arithmetic?",
          beginnerPurpose: "Reinforce that Decimal must be initialized from a string for exactness.",
          expectedConceptIds: ["decimal-module"],
          options: [
            { id: "opt-a", text: "Decimal(float('19.99'))", isCorrect: false, explanation: "float('19.99') introduces floating-point error before Decimal even sees it." },
            { id: "opt-b", text: "Decimal('19.99')", isCorrect: true, explanation: "Passing the string directly to Decimal gives the exact base-10 value." },
            { id: "opt-c", text: "Decimal(19.99)", isCorrect: false, explanation: "Decimal(19.99) converts the float literal 19.99 which has representation error." },
            { id: "opt-d", text: "float('19.99')", isCorrect: false, explanation: "float gives a floating-point approximation, not exact Decimal arithmetic." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The string is already in exact decimal form — pass it straight to Decimal." }],
          feedback: {
            correct: "Correct! Decimal('19.99') preserves exact decimal representation.",
            incorrect: "Always initialize Decimal from the string: Decimal('19.99').",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "decimal-module", recallPrompt: "Write a one-line function that takes a string price and returns a Decimal rounded to 2 places.", nextReviewAfterDays: 3 },
        { conceptId: "floating-point-precision", recallPrompt: "Name 3 situations where float is fine and 2 situations where you need Decimal.", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s26-project-run", "s26-project-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: ["decimal-module", "floating-point-precision"],
      },
    },
  ],

  project: {
    id: "s26-project",
    stageId: "stage-26",
    title: "Precision-Sensitive Calculator",
    brief:
      "Build a financial calculator using the Decimal module to avoid floating-point precision errors. The calculator should handle compound interest, currency rounding, and input validation.",
    requirements: [
      "Use Decimal (never float) for all monetary calculations",
      "Always initialize Decimal from string inputs",
      "Apply ROUND_HALF_UP for final currency display",
      "Use math.isclose() for any float comparisons needed",
      "Handle invalid inputs (non-numeric strings, negative rates) gracefully",
      "Include type annotations on all functions",
    ],
    acceptanceCriteria: [
      "All monetary calculations produce exact decimal results",
      "Currency output is always rounded to 2 decimal places",
      "Invalid inputs raise descriptive errors",
      "Tests pass with known expected values",
    ],
    conceptIds: ["decimal-module", "floating-point-precision", "math-module"],
    difficulty: "intermediate",
  },
} satisfies Stage;
