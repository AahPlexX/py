import type { Course, GlossaryEntry } from "./course.schema";
import { stage01 } from "./stages/stage-01-zero-start.course";
import { stage02 } from "./stages/stage-02-core-syntax.course";
import { stage03 } from "./stages/stage-03-values-types.course";
import { stage04 } from "./stages/stage-04-decisions-loops.course";
import { stage05 } from "./stages/stage-05-functions.course";
import { stage06 } from "./stages/stage-06-collections.course";
import { stage07 } from "./stages/stage-07-errors-debugging.course";
import { stage08 } from "./stages/stage-08-files-modules.course";
import { stage09 } from "./stages/stage-09-oop.course";
import { stage10 } from "./stages/stage-10-testing-types.course";
import { stage11 } from "./stages/stage-11-automation-cli.course";
import { stage12 } from "./stages/stage-12-apis-web.course";
import { stage13 } from "./stages/stage-13-data.course";
import { stage14 } from "./stages/stage-14-async-performance.course";
import { stage15 } from "./stages/stage-15-security-packaging.course";
import { stage16 } from "./stages/stage-16-architecture-capstone.course";
import { stage17 } from "./stages/stage-17-structured-data-formats.course";
import { stage18 } from "./stages/stage-18-modules-imports-packages.course";
import { stage19 } from "./stages/stage-19-object-oriented-programming.course";
import { stage20 } from "./stages/stage-20-python-data-model.course";
import { stage21 } from "./stages/stage-21-dataclasses-enums-abcs.course";
import { stage22 } from "./stages/stage-22-iterators-generators.course";
import { stage23 } from "./stages/stage-23-context-managers.course";
import { stage24 } from "./stages/stage-24-functional-programming.course";
import { stage25 } from "./stages/stage-25-stdlib-data-structures.course";
import { stage26 } from "./stages/stage-26-numeric-computing.course";
import { stage27 } from "./stages/stage-27-date-time-timezones.course";
import { stage28 } from "./stages/stage-28-regular-expressions.course";
import { stage29 } from "./stages/stage-29-command-line-interfaces.course";
import { stage30 } from "./stages/stage-30-logging-debugging-profiling.course";
import { stage31 } from "./stages/stage-31-testing-quality-assurance.course";
import { stage32 } from "./stages/stage-32-static-typing.course";
import { stage33 } from "./stages/stage-33-os-process-interfaces.course";
import { stage34 } from "./stages/stage-34-internet-networking-http.course";
import { stage35 } from "./stages/stage-35-databases-persistence.course";
import { stage36 } from "./stages/stage-36-concurrency-parallelism-async.course";
import { stage37 } from "./stages/stage-37-serialization-binary-data.course";
import { stage38 } from "./stages/stage-38-security-cryptography.course";
import { stage39 } from "./stages/stage-39-packaging-distribution.course";
import { stage40 } from "./stages/stage-40-project-architecture.course";
import { stage41 } from "./stages/stage-41-introspection-metaprogramming.course";
import { stage42 } from "./stages/stage-42-import-system-plugins.course";
import { stage43 } from "./stages/stage-43-memory-garbage-collection.course";
import { stage44 } from "./stages/stage-44-performance-engineering.course";
import { stage45 } from "./stages/stage-45-web-applications.course";
import { stage46 } from "./stages/stage-46-data-engineering-automation.course";
import { stage47 } from "./stages/stage-47-scientific-numerical-python.course";
import { stage48 } from "./stages/stage-48-desktop-gui-applications.course";
import { stage49 } from "./stages/stage-49-documentation-style.course";
import { stage50 } from "./stages/stage-50-cpython-c-api.course";
import { stage51 } from "./stages/stage-51-cpython-internals.course";
import { stage52 } from "./stages/stage-52-final-mastery-capstone.course";
import { glossaryEntries } from "./glossary/glossary.registry";

export const courseRegistry: Course = {
  id: "python-mastery",
  title: "Python Mastery",
  description:
    "A self-paced, no-video, read-and-interact Python course from absolute beginner to advanced mastery.",
  pythonVersion: "3.14.5",
  stages: [
    stage01,
    stage02,
    stage03,
    stage04,
    stage05,
    stage06,
    stage07,
    stage08,
    stage09,
    stage10,
    stage11,
    stage12,
    stage13,
    stage14,
    stage15,
    stage16,
    stage17,
    stage18,
    stage19,
    stage20,
    stage21,
    stage22,
    stage23,
    stage24,
    stage25,
    stage26,
    stage27,
    stage28,
    stage29,
    stage30,
    stage31,
    stage32,
    stage33,
    stage34,
    stage35,
    stage36,
    stage37,
    stage38,
    stage39,
    stage40,
    stage41,
    stage42,
    stage43,
    stage44,
    stage45,
    stage46,
    stage47,
    stage48,
    stage49,
    stage50,
    stage51,
    stage52,
  ],
  glossary: glossaryEntries as GlossaryEntry[],
  createdAt: "2026-06-05T00:00:00.000Z",
  updatedAt: "2026-06-06T00:00:00.000Z",
};
