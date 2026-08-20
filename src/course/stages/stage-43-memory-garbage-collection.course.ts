import type { Stage } from "@/course/course.schema";

export const stage43 = {
  id: "stage-43",
  number: 43,
  title: "Memory Management and Garbage Collection",
  summary:
    "Understand Python's reference counting and cyclic garbage collector, identify memory leaks, and use tools like tracemalloc and weakref to manage memory effectively.",
  level: "advanced",
  masteryGateConceptIds: ["reference-counting", "garbage-collection"],
  lessons: [
    {
      id: "s43-reference-counting",
      stageId: "stage-43",
      title: "Reference Counting: How Python Frees Memory",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain reference counting as Python's primary memory management",
        "Use sys.getrefcount() to observe reference counts",
        "Identify when objects are freed immediately",
      ],
      prerequisites: [],
      concepts: ["reference-counting"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Reference Counting\n\nEvery Python object has a **reference count** — the number of variables pointing to it. When the count reaches zero, the object is freed immediately:\n\n```python\nimport sys\n\ndata = [1, 2, 3]\nsys.getrefcount(data)  # 2 (data + the argument to getrefcount)\n\nalias = data           # same object, count increases\nsys.getrefcount(data)  # 3\n\ndel alias              # count decreases\nsys.getrefcount(data)  # 2\n\ndel data               # count = 0 → freed immediately\n```\n\n## The Problem: Circular References\n\n```python\na = []\nb = []\na.append(b)  # a holds reference to b\nb.append(a)  # b holds reference to a\n\ndel a\ndel b\n# Both objects still have reference count > 0\n# Reference counting alone cannot free them\n```",
        },
        {
          kind: "callout",
          variant: "info",
          title: "getrefcount adds 1",
          body: "sys.getrefcount(x) itself holds a reference to x while executing, so the count is always at least 1 higher than you might expect. Subtract 1 for the 'real' count.",
        },
      ],
      interactions: [
        {
          id: "s43-refcount-mc",
          kind: "multiple-choice",
          prompt: "When does Python free an object using reference counting?",
          beginnerPurpose: "Understand reference counting",
          expectedConceptIds: ["reference-counting"],
          options: [
            { id: "a", text: "When the garbage collector runs", isCorrect: false, explanation: "Reference counting frees objects immediately when count reaches 0, independent of the GC." },
            { id: "b", text: "Immediately when the reference count reaches zero", isCorrect: true, explanation: "Correct! Reference counting is immediate — no GC cycle needed for objects without cycles." },
            { id: "c", text: "When the program exits", isCorrect: false, explanation: "Objects are freed as soon as their count hits 0, not just at exit." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Reference counting is deterministic — it happens the moment the count hits zero." }],
          feedback: { correct: "Correct! Reference counting is immediate.", incorrect: "Python frees objects immediately when their reference count reaches zero." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s43-refcount-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s43-cyclic-gc",
      stageId: "stage-43",
      title: "Cyclic Garbage Collector",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Explain why cyclic references need a separate GC",
        "Use gc module to inspect and control the collector",
        "Understand the three-generation model",
      ],
      prerequisites: ["s43-reference-counting"],
      concepts: ["garbage-collection"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The Cyclic GC\n\nPython's `gc` module handles objects in reference cycles that reference counting can't free:\n\n```python\nimport gc\n\n# Check if GC is enabled\ngc.isenabled()   # True by default\n\n# Run collection manually\nfreed = gc.collect()  # returns number of unreachable objects freed\nprint(f\"Freed {freed} objects\")\n\n# Inspect what's in each generation\ngc.get_count()   # (gen0_count, gen1_count, gen2_count)\n\n# Disable for performance-critical code (use with care)\ngc.disable()\n# ... performance-sensitive code ...\ngc.enable()\ngc.collect()  # manually collect any cycles\n```\n\n## Generational Collection\n\n- **Gen 0**: New objects — collected frequently (fastest)\n- **Gen 1**: Survived one collection — collected less often\n- **Gen 2**: Long-lived objects — collected rarely\n\nMost objects die young — generational GC is efficient because it mostly checks Gen 0.",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "When to call gc.collect() manually",
          body: "In long-running servers, calling gc.collect() after processing a large batch can immediately free cyclic garbage instead of waiting for the next automatic cycle. Useful when memory is tight.",
        },
      ],
      interactions: [
        {
          id: "s43-gc-mc",
          kind: "multiple-choice",
          prompt: "Why can't reference counting alone free `a` and `b` when they reference each other?",
          beginnerPurpose: "Understand cyclic reference problem",
          expectedConceptIds: ["garbage-collection"],
          options: [
            { id: "a", text: "Reference counting doesn't work for lists", isCorrect: false, explanation: "Reference counting works for lists. The issue is cycles — each object's count never reaches 0." },
            { id: "b", text: "Each object still has a reference count > 0 because the other object holds a reference", isCorrect: true, explanation: "Correct! a.count = 1 (b holds it) and b.count = 1 (a holds it). Neither reaches 0." },
            { id: "c", text: "Reference counting only tracks scalar values", isCorrect: false, explanation: "Reference counting tracks all objects. Cycles are the specific problem." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "After 'del a; del b', what is the reference count of each object?" }],
          feedback: { correct: "Correct! Cycles keep reference counts above zero.", incorrect: "In a cycle, each object holds a reference to the other, keeping both counts above 0 indefinitely." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s43-gc-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s43-weakref",
      stageId: "stage-43",
      title: "Weak References and Memory Leaks",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Use weakref.ref() to hold references that don't prevent garbage collection",
        "Implement a cache with WeakValueDictionary",
        "Identify common memory leak patterns",
      ],
      prerequisites: ["s43-cyclic-gc"],
      concepts: ["reference-counting"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Weak References\n\nA **weak reference** doesn't increase the reference count — the object can be freed even if a weak ref exists:\n\n```python\nimport weakref\n\nclass ExpensiveObject:\n    def __init__(self, name):\n        self.name = name\n\nobj = ExpensiveObject(\"data\")\nweak = weakref.ref(obj)  # weak reference\n\nweak()          # ExpensiveObject('data') — object alive\ndel obj         # ref count → 0, object freed\nweak()          # None — object gone\n```\n\n## WeakValueDictionary for Caches\n\n```python\nfrom weakref import WeakValueDictionary\n\ncache: WeakValueDictionary[str, ExpensiveObject] = WeakValueDictionary()\n\nobj = ExpensiveObject(\"item1\")\ncache['item1'] = obj\nlen(cache)  # 1\n\ndel obj         # no other strong refs → object freed\nlen(cache)  # 0 — automatically removed from cache!\n```\n\nWeakValueDictionary automatically removes entries when their values are garbage collected.",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Common memory leak patterns",
          body: "Leaks in Python usually come from: (1) global caches/lists that grow forever, (2) callbacks registered but never removed, (3) class-level lists accumulating instances. Profile with tracemalloc to find them.",
        },
      ],
      interactions: [
        {
          id: "s43-weakref-mc",
          kind: "multiple-choice",
          prompt: "After `del obj` (the only strong reference), calling `weak()` returns:",
          beginnerPurpose: "Understand weak reference behavior",
          expectedConceptIds: ["reference-counting"],
          options: [
            { id: "a", text: "The original object — weak refs keep it alive", isCorrect: false, explanation: "Weak refs don't keep objects alive. Once strong refs are gone, the object is freed." },
            { id: "b", text: "None — the object was freed", isCorrect: true, explanation: "Correct! With no strong references, the object is freed. weak() returns None for dead references." },
            { id: "c", text: "Raises ReferenceError", isCorrect: false, explanation: "weakref.ref() returns None when the object is gone — it doesn't raise an exception." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Weak references don't prevent garbage collection." }],
          feedback: { correct: "Correct! Dead weak references return None.", incorrect: "When the object is freed, the weak reference returns None — no exception." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s43-weakref-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
    {
      id: "s43-tracemalloc",
      stageId: "stage-43",
      title: "Profiling Memory with tracemalloc",
      kind: "concept",
      difficulty: "advanced",
      objectives: [
        "Use tracemalloc to find where memory is allocated",
        "Take snapshots and compare them",
        "Identify the top memory consumers",
      ],
      prerequisites: ["s43-weakref"],
      concepts: ["garbage-collection"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## tracemalloc\n\n`tracemalloc` tracks Python memory allocations with tracebacks:\n\n```python\nimport tracemalloc\n\ntracemalloc.start()\n\n# Code under investigation\ndata = [dict(x=i) for i in range(10000)]\n\nsnapshot = tracemalloc.take_snapshot()\ntop_stats = snapshot.statistics('lineno')\n\nfor stat in top_stats[:5]:\n    print(stat)  # file:line: size blocks\n\ntracemalloc.stop()\n```\n\n## Comparing Snapshots\n\n```python\ntracemalloc.start()\nbefore = tracemalloc.take_snapshot()\n\n# Suspect code\nprocess_data(large_dataset)\n\nafter = tracemalloc.take_snapshot()\nstats = after.compare_to(before, 'lineno')\n\nfor stat in stats[:3]:\n    print(stat)  # shows INCREASE in allocation\n```",
        },
        {
          kind: "why-matters",
          body: "Memory leaks in long-running Python servers can take hours to surface. tracemalloc pinpoints the exact file and line number allocating the most memory, turning a multi-day debugging session into minutes.",
        },
      ],
      interactions: [
        {
          id: "s43-tracemalloc-mc",
          kind: "multiple-choice",
          prompt: "What does snapshot.compare_to(before, 'lineno') show?",
          beginnerPurpose: "Use tracemalloc for leak detection",
          expectedConceptIds: ["garbage-collection"],
          options: [
            { id: "a", text: "Total memory usage at a point in time", isCorrect: false, explanation: "take_snapshot() captures total. compare_to() shows the DIFFERENCE between two snapshots." },
            { id: "b", text: "The change in memory allocation between two snapshots, grouped by source line", isCorrect: true, explanation: "Correct! compare_to shows which lines allocated more memory between the two snapshots." },
            { id: "c", text: "The garbage collector's activity log", isCorrect: false, explanation: "tracemalloc tracks allocations, not GC activity. compare_to shows allocation differences." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "compare_to = diff between two allocation snapshots." }],
          feedback: { correct: "Correct! compare_to shows allocation growth per line.", incorrect: "compare_to shows the memory allocation difference between two points in time." },
        },
      ],
      reviewHooks: [],
      masteryCriteria: {
        requiredInteractionIds: ["s43-tracemalloc-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s43-project",
    stageId: "stage-43",
    title: "Memory-Efficient Data Pipeline",
    brief:
      "Build a data processing pipeline that handles large datasets without loading everything into memory. Use generators, weakrefs for caching, and tracemalloc to verify memory stays bounded.",
    requirements: [
      "Generator-based pipeline that processes rows lazily",
      "WeakValueDictionary cache for expensive computed results",
      "tracemalloc profiling to verify peak memory stays under limit",
      "Explicit cycle avoidance in data structures",
      "Memory usage report comparing naive vs generator approaches",
    ],
    acceptanceCriteria: [
      "Peak memory stays under 50MB for 1M row dataset",
      "Cache entries are freed when not referenced",
      "tracemalloc report shows no unbounded growth",
    ],
    conceptIds: ["reference-counting", "garbage-collection"],
    difficulty: "advanced",
  },
} satisfies Stage;
