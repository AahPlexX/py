import type { Stage } from "@/course/course.schema";

export const stage50 = {
  id: "stage-50",
  number: 50,
  title: "CPython C API and Extension Modules",
  summary:
    "Write CPython extension modules in C using the Python/C API to expose C functions to Python, create custom types, and achieve maximum performance.",
  level: "advanced",
  masteryGateConceptIds: ["cpython-c-api", "python-extension-modules"],
  lessons: [
    {
      id: "s50-c-api-overview",
      stageId: "stage-50",
      title: "The Python/C API Overview",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain what the Python/C API is",
        "Understand PyObject* as the universal Python object pointer",
        "Know the reference counting rules for C code",
      ],
      prerequisites: [],
      concepts: ["cpython-c-api"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Python/C API\n\nCPython exposes an API in C that lets you:\n- Write extension modules (C functions callable from Python)\n- Embed Python in a C application\n- Create new built-in types implemented in C\n\nEvery Python object is a `PyObject*` in C:\n\n```c\n#define PY_SSIZE_T_CLEAN\n#include <Python.h>\n\n/* A simple C function exposed to Python */\nstatic PyObject* py_add(PyObject* self, PyObject* args) {\n    int a, b;\n    \n    /* Parse Python arguments into C integers */\n    if (!PyArg_ParseTuple(args, \"ii\", &a, &b)) {\n        return NULL;  /* Exception already set */\n    }\n    \n    /* Return a new Python integer */\n    return PyLong_FromLong(a + b);\n}\n\n/* Method table */\nstatic PyMethodDef MyMethods[] = {\n    {\"add\", py_add, METH_VARARGS, \"Add two integers.\"},\n    {NULL, NULL, 0, NULL}  /* sentinel */\n};\n```",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Reference counting in C is manual",
          body: "In C extension code, you must manually manage reference counts using Py_INCREF/Py_DECREF. Forgetting to DECREF leaks memory; double-DECREF crashes Python. Understand owned vs borrowed references before writing C extensions.",
        },
      ],
      interactions: [
        {
          id: "s50-api-mc",
          kind: "multiple-choice",
          prompt: "What does returning NULL from a C extension function signal to Python?",
          beginnerPurpose: "Understand C API error protocol",
          expectedConceptIds: ["cpython-c-api"],
          options: [
            { id: "a", text: "The function returned Python's None", isCorrect: false, explanation: "None is Py_None, not NULL. NULL means an exception was raised." },
            { id: "b", text: "An exception occurred — Python checks the exception state", isCorrect: true, explanation: "Correct! NULL signals error. Python checks the exception set with PyErr_Set*()." },
            { id: "c", text: "The function returned 0 (integer)", isCorrect: false, explanation: "PyLong_FromLong(0) returns a Python int object, not NULL." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "NULL is the C API's error sentinel, equivalent to 'raising an exception'." }],
          feedback: { correct: "Correct! NULL signals an exception in C API code.", incorrect: "Returning NULL from a C function tells Python an exception occurred. The exception must be set via PyErr_Set*()." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s50-api-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s50-module-definition",
      stageId: "stage-50",
      title: "Writing and Building an Extension Module",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Write the PyModuleDef structure",
        "Implement PyInit_modulename()",
        "Build with setuptools using Extension",
      ],
      prerequisites: ["s50-c-api-overview"],
      concepts: ["python-extension-modules"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Complete Extension Module\n\n```c\n/* mymath.c */\n#define PY_SSIZE_T_CLEAN\n#include <Python.h>\n\nstatic PyObject* py_square(PyObject* self, PyObject* args) {\n    double x;\n    if (!PyArg_ParseTuple(args, \"d\", &x))\n        return NULL;\n    return PyFloat_FromDouble(x * x);\n}\n\nstatic PyMethodDef MymathMethods[] = {\n    {\"square\", py_square, METH_VARARGS, \"Square a number.\"},\n    {NULL, NULL, 0, NULL}\n};\n\nstatic struct PyModuleDef mymathmodule = {\n    PyModuleDef_HEAD_INIT,\n    \"mymath\",   /* module name */\n    NULL,       /* module docstring */\n    -1,         /* per-interpreter state size */\n    MymathMethods\n};\n\nPyMODINIT_FUNC PyInit_mymath(void) {\n    return PyModule_Create(&mymathmodule);\n}\n```\n\n```python\n# setup.py\nfrom setuptools import setup, Extension\n\nsetup(\n    name='mymath',\n    ext_modules=[\n        Extension('mymath', sources=['mymath.c'])\n    ]\n)\n```\n\nBuild: `pip install -e .` or `python setup.py build_ext --inplace`\n\n```python\nimport mymath\nmymath.square(5.0)  # 25.0\n```",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Cython is often a better choice",
          body: "Writing raw C extension modules requires deep C knowledge and manual reference counting. Cython compiles Python-like code to C automatically, handling reference counting, type conversion, and error checking for you.",
        },
      ],
      interactions: [
        {
          id: "s50-module-fill",
          kind: "fill-code",
          prompt: "Complete the module initialization function name for a module called 'mymath'.",
          beginnerPurpose: "Name the init function correctly",
          expectedConceptIds: ["python-extension-modules"],
          codeTemplate: "PyMODINIT_FUNC _____(void) {\n    return PyModule_Create(&mymathmodule);\n}",
          blanks: [{ placeholder: "_____", answer: "PyInit_mymath", caseSensitive: true }],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The init function must be named PyInit_ followed by the module name." }],
          feedback: { correct: "Correct! PyInit_mymath is the entry point Python calls when importing.", incorrect: "C extension init functions must be named PyInit_{modulename}." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s50-module-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s50-cython-intro",
      stageId: "stage-50",
      title: "Cython: Compiled Python",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Write Cython .pyx files with static type declarations",
        "Compile Cython to C and build with setuptools",
        "Measure speedup vs pure Python",
      ],
      prerequisites: ["s50-module-definition"],
      concepts: ["python-extension-modules"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Cython\n\nCython is a superset of Python that compiles to C:\n\n```python\n# mymath.pyx — Cython source\ndef square(double x) -> double:\n    return x * x\n\ndef fast_sum(list data) -> double:\n    cdef double total = 0.0\n    cdef double item\n    for item in data:  # typed loop — no Python object overhead\n        total += item\n    return total\n```\n\nType declarations with `cdef` eliminate Python object overhead in inner loops.\n\n```python\n# setup.py\nfrom setuptools import setup\nfrom Cython.Build import cythonize\n\nsetup(\n    ext_modules=cythonize(\"mymath.pyx\")\n)\n```\n\nBuild: `pip install cython && pip install -e .`\n\nTypical speedups:\n- Pure Python loop: 1x\n- Cython without types: 1.5x\n- Cython with cdef types: 10–100x\n- Cython calling C stdlib: near-C speed",
        },
        {
          kind: "why-matters",
          body: "NumPy's internals, SciPy, and scikit-learn all use Cython for performance-critical code. Learning Cython lets you write library-grade high-performance Python without leaving the Python ecosystem.",
        },
      ],
      interactions: [
        {
          id: "s50-cython-mc",
          kind: "multiple-choice",
          prompt: "Why does adding `cdef double total = 0.0` make a Cython loop faster?",
          beginnerPurpose: "Understand Cython type declarations",
          expectedConceptIds: ["python-extension-modules"],
          options: [
            { id: "a", text: "It enables multi-threading", isCorrect: false, explanation: "cdef doesn't enable threading. It eliminates Python object overhead for the variable." },
            { id: "b", text: "total is stored as a C double, not a Python float object — no boxing/unboxing overhead", isCorrect: true, explanation: "Correct! Python floats are heap objects with refcount overhead. C doubles are stack values — much faster in loops." },
            { id: "c", text: "It forces the variable into a CPU register", isCorrect: false, explanation: "Register allocation is the compiler's job. cdef's benefit is avoiding Python object overhead." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Python floats are objects with reference counts. C doubles are just 8 bytes." }],
          feedback: { correct: "Correct! cdef eliminates Python object overhead.", incorrect: "cdef variables are stored as C types — no Python object creation, refcounting, or GC pressure." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s50-cython-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s50-project",
    stageId: "stage-50",
    title: "High-Performance C Extension",
    brief:
      "Write a performance-critical algorithm (matrix multiply, string processing, or numerical computation) as both a pure Python version and a Cython extension. Benchmark both and demonstrate the speedup.",
    requirements: [
      "Pure Python implementation as baseline",
      "Cython implementation with cdef type annotations",
      "Extension builds correctly with setuptools",
      "timeit benchmark comparing Python vs Cython",
      "At least 10x speedup on the benchmark",
    ],
    acceptanceCriteria: [
      "Cython module imports and passes all tests",
      "Both implementations produce identical results",
      "Benchmark shows measured speedup ratio",
    ],
    conceptIds: ["cpython-c-api", "python-extension-modules"],
    difficulty: "advanced",
  },
} satisfies Stage;
