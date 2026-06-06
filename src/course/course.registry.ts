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
  ],
  glossary: glossaryEntries as GlossaryEntry[],
  createdAt: "2026-06-05T00:00:00.000Z",
  updatedAt: "2026-06-05T00:00:00.000Z",
};
