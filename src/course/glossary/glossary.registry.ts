import type { GlossaryEntry } from "@/course/course.schema";

export const glossaryEntries: readonly GlossaryEntry[] = [
  {
    term: "program",
    conceptId: "program",
    shortDefinition:
      "A sequence of instructions that a computer executes in order.",
    extendedDefinition:
      "Programs are written in a programming language and tell the computer exactly what to do, step by step.",
    examples: ['print("Hello")', "x = 5"],
    relatedTerms: ["interpreter", "script", "statement"],
    firstAppearsInLessonId: "s1-what-is-a-program",
  },
  {
    term: "interpreter",
    conceptId: "interpreter",
    shortDefinition:
      "A program that reads and runs your Python code line by line.",
    extendedDefinition:
      "Python is an interpreted language. The CPython interpreter reads each statement and executes it immediately, rather than compiling the whole program first.",
    examples: ["python main.py"],
    relatedTerms: ["program", "REPL", "CPython"],
    firstAppearsInLessonId: "s1-how-python-runs",
  },
  {
    term: "print()",
    conceptId: "output",
    shortDefinition:
      "A built-in Python function that displays values to the screen.",
    extendedDefinition:
      "print() converts its argument to text and writes it to standard output, followed by a newline by default.",
    examples: ['print("Hello, world!")', "print(42)", "print(1, 2, 3)"],
    relatedTerms: ["function call", "output", "string"],
    firstAppearsInLessonId: "s1-your-first-output",
  },
  {
    term: "string",
    conceptId: "str-type",
    shortDefinition: "A sequence of characters enclosed in quotes.",
    extendedDefinition:
      "Strings can be enclosed in single quotes (''), double quotes (\"\"), or triple quotes (\"\"\"\"\"\" or '''). They are immutable in Python.",
    examples: ['"Hello"', "'world'", '"""multi\nline"""'],
    relatedTerms: ["f-string", "concatenation", "len()"],
    firstAppearsInLessonId: "s1-your-first-output",
  },
  {
    term: "variable",
    conceptId: "variable",
    shortDefinition: "A named container that stores a value.",
    extendedDefinition:
      "Variables are created by assignment (=). The name points to a value stored in memory. Python variables are dynamically typed.",
    examples: ["age = 25", 'name = "Alice"', "pi = 3.14159"],
    relatedTerms: ["assignment", "value", "type"],
    firstAppearsInLessonId: "s2-variables-assignment",
  },
  {
    term: "assignment",
    conceptId: "assignment",
    shortDefinition:
      "The = operator that binds a name to a value in memory.",
    extendedDefinition:
      "Assignment does not mean equality. x = 5 means 'make x point to the value 5'. Use == to test equality.",
    examples: ["x = 5", "x = x + 1"],
    relatedTerms: ["variable", "reassignment", "augmented assignment"],
    firstAppearsInLessonId: "s2-variables-assignment",
  },
  {
    term: "f-string",
    conceptId: "string-formatting",
    shortDefinition:
      "A string prefixed with f that embeds expressions in curly braces.",
    extendedDefinition:
      "F-strings (formatted string literals, PEP 498) evaluate expressions inside {} at runtime. They are the preferred way to format strings in Python 3.6+.",
    examples: ['f"Hello, {name}!"', 'f"2 + 2 = {2 + 2}"'],
    relatedTerms: ["string", "expression", "format()"],
    firstAppearsInLessonId: "s2-string-formatting",
  },
  {
    term: "int",
    conceptId: "int",
    shortDefinition: "Python's integer type — whole numbers with no decimal.",
    extendedDefinition:
      "Python integers have unlimited precision. They support all arithmetic operators. type(42) == int.",
    examples: ["42", "-7", "1_000_000"],
    relatedTerms: ["float", "arithmetic", "type()"],
    firstAppearsInLessonId: "s3-integers-floats",
  },
  {
    term: "float",
    conceptId: "float",
    shortDefinition:
      "Python's floating-point type — numbers with a decimal point.",
    extendedDefinition:
      "Floats follow IEEE 754 double precision. Use Decimal for exact decimal arithmetic.",
    examples: ["3.14", "-0.5", "1e10"],
    relatedTerms: ["int", "division", "Decimal"],
    firstAppearsInLessonId: "s3-integers-floats",
  },
  {
    term: "bool",
    conceptId: "bool",
    shortDefinition: "A type with exactly two values: True and False.",
    extendedDefinition:
      "bool is a subclass of int in Python. True == 1 and False == 0. Comparison operators return bool values.",
    examples: ["True", "False", "5 > 3", "bool(0)"],
    relatedTerms: ["truthiness", "comparison", "int"],
    firstAppearsInLessonId: "s3-booleans-comparisons",
  },
  {
    term: "None",
    conceptId: "none-type",
    shortDefinition: "The absence of a value. Python's null equivalent.",
    extendedDefinition:
      "None is the sole value of the NoneType. Functions that don't explicitly return a value return None. Test with `is None`, not `== None`.",
    examples: ["x = None", "if x is None:"],
    relatedTerms: ["NoneType", "null", "falsy"],
    firstAppearsInLessonId: "s3-none-type",
  },
  {
    term: "truthiness",
    conceptId: "truthiness",
    shortDefinition:
      "Whether a value evaluates to True or False in a boolean context.",
    extendedDefinition:
      "Falsy values: None, False, 0, 0.0, empty string \"\", empty list [], empty dict {}, empty set set(). Everything else is truthy.",
    examples: ["bool(0)  # False", 'bool("hi")  # True', "bool([])  # False"],
    relatedTerms: ["bool", "None", "if statement"],
    firstAppearsInLessonId: "s3-truthiness",
  },
  {
    term: "if statement",
    conceptId: "if-statement",
    shortDefinition:
      "A control flow statement that runs a block when a condition is true.",
    extendedDefinition:
      "The if keyword is followed by a boolean expression and a colon. The indented block executes only when the condition evaluates to True.",
    examples: ["if x > 0:\n    print('positive')"],
    relatedTerms: ["elif", "else", "boolean", "indentation"],
    firstAppearsInLessonId: "s4-if-else",
  },
  {
    term: "for loop",
    conceptId: "for-loop",
    shortDefinition:
      "A loop that iterates over each element in an iterable.",
    extendedDefinition:
      "The for keyword binds a loop variable to each item in sequence in turn. Use range() to iterate over numbers.",
    examples: [
      "for x in [1, 2, 3]:\n    print(x)",
      "for i in range(5):\n    print(i)",
    ],
    relatedTerms: ["range", "iterable", "loop variable", "break", "continue"],
    firstAppearsInLessonId: "s4-for-loops-range",
  },
  {
    term: "function",
    conceptId: "function-definition",
    shortDefinition:
      "A named, reusable block of code that takes inputs and produces an output.",
    extendedDefinition:
      "Functions are defined with `def`, have a name, zero or more parameters, and optionally return a value. They encapsulate logic for reuse.",
    examples: ["def add(a, b):\n    return a + b"],
    relatedTerms: ["parameter", "return", "call", "scope", "docstring"],
    firstAppearsInLessonId: "s5-defining-functions",
  },
  {
    term: "list",
    conceptId: "list",
    shortDefinition:
      "An ordered, mutable sequence of values enclosed in square brackets.",
    extendedDefinition:
      "Lists can hold values of any type. They are zero-indexed. Append with .append(), access with [], slice with [start:stop].",
    examples: ["[1, 2, 3]", '["a", "b"]', "[1, \"mixed\", True]"],
    relatedTerms: ["tuple", "index", "slice", "append", "list comprehension"],
    firstAppearsInLessonId: "s6-lists",
  },
  {
    term: "dict",
    conceptId: "dict",
    shortDefinition:
      "A mapping of unique keys to values, enclosed in curly braces.",
    extendedDefinition:
      "Dictionaries preserve insertion order (Python 3.7+). Access values with d[key]. Use .get() to avoid KeyError on missing keys.",
    examples: ['{"name": "Alice", "age": 30}', "d.get('key', 'default')"],
    relatedTerms: ["key", "value", "KeyError", "items()", "dict comprehension"],
    firstAppearsInLessonId: "s6-dictionaries",
  },
  {
    term: "exception",
    conceptId: "exception",
    shortDefinition:
      "An error that interrupts normal program flow and can be caught.",
    extendedDefinition:
      "Exceptions are objects. When raised, Python unwinds the call stack looking for a matching except block. Common ones: TypeError, ValueError, KeyError.",
    examples: ["raise ValueError('bad input')", "except TypeError as e:"],
    relatedTerms: ["try", "except", "raise", "traceback", "error"],
    firstAppearsInLessonId: "s7-common-exceptions",
  },
  {
    term: "class",
    conceptId: "class",
    shortDefinition:
      "A blueprint for creating objects that bundle data and behaviour.",
    extendedDefinition:
      "Classes are defined with `class`. Instances are created by calling the class. Methods receive self as the first argument.",
    examples: [
      "class Dog:\n    def __init__(self, name):\n        self.name = name",
    ],
    relatedTerms: ["object", "method", "attribute", "self", "__init__"],
    firstAppearsInLessonId: "s9-classes-objects",
  },
];
