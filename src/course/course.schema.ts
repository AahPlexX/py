import { z } from "zod";

/* ─── Primitives ────────────────────────────────────────────────────────── */

export const LessonKindSchema = z.enum([
  "concept",
  "practice",
  "debugging",
  "project",
  "assessment",
  "review",
]);
export type LessonKind = z.infer<typeof LessonKindSchema>;

export const InteractionKindSchema = z.enum([
  "predict-output",
  "multiple-choice",
  "fill-code",
  "reorder-code",
  "run-code",
  "debug-code",
  "plain-language-explain",
]);
export type InteractionKind = z.infer<typeof InteractionKindSchema>;

export const DifficultySchema = z.enum(["beginner", "intermediate", "advanced"]);
export type Difficulty = z.infer<typeof DifficultySchema>;

export const ContentBlockKindSchema = z.enum([
  "text",
  "code",
  "callout",
  "comparison",
  "output",
  "mental-model",
  "why-matters",
  "glossary-term",
]);
export type ContentBlockKind = z.infer<typeof ContentBlockKindSchema>;

/* ─── Content blocks ────────────────────────────────────────────────────── */

export const TextBlockSchema = z.object({
  kind: z.literal("text"),
  markdown: z.string().min(1),
});

export const CodeBlockSchema = z.object({
  kind: z.literal("code"),
  language: z.string().default("python"),
  code: z.string().min(1),
  caption: z.string().optional(),
  highlight: z.array(z.number()).optional(),
});

export const CalloutVariantSchema = z.enum(["info", "warning", "tip", "danger", "success"]);

export const CalloutBlockSchema = z.object({
  kind: z.literal("callout"),
  variant: CalloutVariantSchema,
  title: z.string().min(1),
  body: z.string().min(1),
});

export const ComparisonBlockSchema = z.object({
  kind: z.literal("comparison"),
  leftLabel: z.string(),
  rightLabel: z.string(),
  leftCode: z.string(),
  rightCode: z.string(),
  caption: z.string().optional(),
});

export const OutputBlockSchema = z.object({
  kind: z.literal("output"),
  text: z.string(),
  isError: z.boolean().default(false),
});

export const MentalModelBlockSchema = z.object({
  kind: z.literal("mental-model"),
  title: z.string().min(1),
  analogy: z.string().min(1),
  explanation: z.string().min(1),
});

export const WhyMattersBlockSchema = z.object({
  kind: z.literal("why-matters"),
  body: z.string().min(1),
});

export const GlossaryTermBlockSchema = z.object({
  kind: z.literal("glossary-term"),
  term: z.string().min(1),
  definition: z.string().min(1),
  example: z.string().optional(),
});

export const ContentBlockSchema = z.discriminatedUnion("kind", [
  TextBlockSchema,
  CodeBlockSchema,
  CalloutBlockSchema,
  ComparisonBlockSchema,
  OutputBlockSchema,
  MentalModelBlockSchema,
  WhyMattersBlockSchema,
  GlossaryTermBlockSchema,
]);
export type ContentBlock = z.infer<typeof ContentBlockSchema>;

/* ─── Hints ─────────────────────────────────────────────────────────────── */

export const HintSchema = z.object({
  level: z.enum(["concept", "syntax", "structural"]),
  text: z.string().min(1),
});
export type Hint = z.infer<typeof HintSchema>;

/* ─── Feedback ──────────────────────────────────────────────────────────── */

export const FeedbackSchema = z.object({
  correct: z.string().min(1),
  incorrect: z.string().min(1),
  misconception: z.string().optional(),
  explanation: z.string().optional(),
});
export type Feedback = z.infer<typeof FeedbackSchema>;

/* ─── Interactions ──────────────────────────────────────────────────────── */

export const PredictOutputInteractionSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("predict-output"),
  prompt: z.string().min(1),
  beginnerPurpose: z.string().min(1),
  expectedConceptIds: z.array(z.string()),
  code: z.string().min(1),
  expectedOutput: z.string().min(1),
  allowedAttempts: z.number().int().min(1).default(3),
  hints: z.array(HintSchema),
  feedback: FeedbackSchema,
});

export const MultipleChoiceOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  isCorrect: z.boolean(),
  explanation: z.string().optional(),
});

export const MultipleChoiceInteractionSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("multiple-choice"),
  prompt: z.string().min(1),
  beginnerPurpose: z.string().min(1),
  expectedConceptIds: z.array(z.string()),
  options: z.array(MultipleChoiceOptionSchema).min(2),
  allowMultiple: z.boolean().default(false),
  allowedAttempts: z.number().int().min(1).default(2),
  hints: z.array(HintSchema),
  feedback: FeedbackSchema,
});

export const FillCodeInteractionSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("fill-code"),
  prompt: z.string().min(1),
  beginnerPurpose: z.string().min(1),
  expectedConceptIds: z.array(z.string()),
  codeTemplate: z.string().min(1),
  blanks: z.array(
    z.object({
      placeholder: z.string().min(1),
      answer: z.string().min(1),
      caseSensitive: z.boolean().default(true),
    })
  ).min(1),
  allowedAttempts: z.number().int().min(1).default(3),
  hints: z.array(HintSchema),
  feedback: FeedbackSchema,
});

export const ReorderCodeInteractionSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("reorder-code"),
  prompt: z.string().min(1),
  beginnerPurpose: z.string().min(1),
  expectedConceptIds: z.array(z.string()),
  lines: z.array(z.string()).min(2),
  correctOrder: z.array(z.number()),
  allowedAttempts: z.number().int().min(1).default(3),
  hints: z.array(HintSchema),
  feedback: FeedbackSchema,
});

export const RunCodeInteractionSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("run-code"),
  prompt: z.string().min(1),
  beginnerPurpose: z.string().min(1),
  expectedConceptIds: z.array(z.string()),
  starterCode: z.string(),
  task: z.string().min(1),
  expectedOutputContains: z.array(z.string()).optional(),
  pyodideCompatible: z.boolean().default(true),
  allowedAttempts: z.number().int().min(1).default(10),
  hints: z.array(HintSchema),
  feedback: FeedbackSchema,
});

export const DebugCodeInteractionSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("debug-code"),
  prompt: z.string().min(1),
  beginnerPurpose: z.string().min(1),
  expectedConceptIds: z.array(z.string()),
  brokenCode: z.string().min(1),
  bugDescription: z.string().min(1),
  fixedCode: z.string().min(1),
  errorType: z.string().optional(),
  allowedAttempts: z.number().int().min(1).default(4),
  hints: z.array(HintSchema),
  feedback: FeedbackSchema,
});

export const PlainLanguageExplainInteractionSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("plain-language-explain"),
  prompt: z.string().min(1),
  beginnerPurpose: z.string().min(1),
  expectedConceptIds: z.array(z.string()),
  code: z.string().min(1),
  keyPointsToHit: z.array(z.string()).min(1),
  sampleAnswer: z.string().min(1),
  allowedAttempts: z.number().int().min(1).default(2),
  hints: z.array(HintSchema),
  feedback: FeedbackSchema,
});

export const InteractionSchema = z.discriminatedUnion("kind", [
  PredictOutputInteractionSchema,
  MultipleChoiceInteractionSchema,
  FillCodeInteractionSchema,
  ReorderCodeInteractionSchema,
  RunCodeInteractionSchema,
  DebugCodeInteractionSchema,
  PlainLanguageExplainInteractionSchema,
]);
export type Interaction = z.infer<typeof InteractionSchema>;

/* ─── Review hooks ──────────────────────────────────────────────────────── */

export const ReviewHookSchema = z.object({
  conceptId: z.string().min(1),
  recallPrompt: z.string().min(1),
  nextReviewAfterDays: z.number().int().min(1).default(3),
});
export type ReviewHook = z.infer<typeof ReviewHookSchema>;

/* ─── Mastery criteria ──────────────────────────────────────────────────── */

export const MasteryCriteriaSchema = z.object({
  requiredInteractionIds: z.array(z.string()),
  minimumCorrectFraction: z.number().min(0).max(1).default(0.8),
  reviewHookIds: z.array(z.string()),
});
export type MasteryCriteria = z.infer<typeof MasteryCriteriaSchema>;

/* ─── Lesson ────────────────────────────────────────────────────────────── */

export const LessonSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/, "Lesson IDs must be kebab-case"),
  stageId: z.string().min(1),
  title: z.string().min(1),
  kind: LessonKindSchema,
  difficulty: DifficultySchema,
  objectives: z.array(z.string().min(1)).min(1),
  prerequisites: z.array(z.string()),
  concepts: z.array(z.string().min(1)),
  contentBlocks: z.array(ContentBlockSchema).min(1),
  interactions: z.array(InteractionSchema).min(1),
  reviewHooks: z.array(ReviewHookSchema),
  masteryCriteria: MasteryCriteriaSchema,
});
export type Lesson = z.infer<typeof LessonSchema>;

/* ─── Concept ───────────────────────────────────────────────────────────── */

export const ConceptSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/, "Concept IDs must be kebab-case"),
  name: z.string().min(1),
  aliases: z.array(z.string()),
  plainDefinition: z.string().min(1),
  technicalDefinition: z.string().min(1),
  firstLessonId: z.string().min(1),
  relatedConceptIds: z.array(z.string()),
  tags: z.array(z.string()),
});
export type Concept = z.infer<typeof ConceptSchema>;

/* ─── Assessment question ───────────────────────────────────────────────── */

export const AssessmentQuestionSchema = z.object({
  id: z.string().min(1),
  conceptIds: z.array(z.string()).min(1),
  interaction: InteractionSchema,
});

export const AssessmentSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  scope: z.union([
    z.object({ type: z.literal("lesson"), lessonId: z.string() }),
    z.object({ type: z.literal("stage"), stageId: z.string() }),
    z.object({ type: z.literal("capstone"), stageIds: z.array(z.string()) }),
  ]),
  title: z.string().min(1),
  questions: z.array(AssessmentQuestionSchema).min(1),
  passCriteria: z.object({
    minimumCorrectFraction: z.number().min(0).max(1),
    requiredConceptIds: z.array(z.string()),
  }),
  retryPolicy: z.object({
    cooldownMinutes: z.number().int().min(0).default(0),
    maxAttempts: z.number().int().min(1).default(3),
  }),
});
export type Assessment = z.infer<typeof AssessmentSchema>;

/* ─── Project ───────────────────────────────────────────────────────────── */

export const ProjectSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  stageId: z.string().min(1),
  title: z.string().min(1),
  brief: z.string().min(1),
  requirements: z.array(z.string().min(1)).min(1),
  acceptanceCriteria: z.array(z.string().min(1)).min(1),
  conceptIds: z.array(z.string()),
  difficulty: DifficultySchema,
  starterCode: z.string().optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

/* ─── Stage ─────────────────────────────────────────────────────────────── */

export const StageSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  number: z.number().int().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  level: DifficultySchema,
  lessons: z.array(LessonSchema).min(1),
  project: ProjectSchema,
  masteryGateConceptIds: z.array(z.string()).min(1),
});
export type Stage = z.infer<typeof StageSchema>;

/* ─── Glossary entry ────────────────────────────────────────────────────── */

export const GlossaryEntrySchema = z.object({
  term: z.string().min(1),
  conceptId: z.string().min(1),
  shortDefinition: z.string().min(1),
  extendedDefinition: z.string().optional(),
  examples: z.array(z.string()),
  relatedTerms: z.array(z.string()),
  firstAppearsInLessonId: z.string().min(1),
});
export type GlossaryEntry = z.infer<typeof GlossaryEntrySchema>;

/* ─── Course ────────────────────────────────────────────────────────────── */

export const CourseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  pythonVersion: z.string().min(1),
  stages: z.array(StageSchema).min(1),
  glossary: z.array(GlossaryEntrySchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Course = z.infer<typeof CourseSchema>;

/* ─── Validation helpers ────────────────────────────────────────────────── */

export function validateCourse(raw: unknown): Course {
  return CourseSchema.parse(raw);
}

export function validateLesson(raw: unknown): Lesson {
  return LessonSchema.parse(raw);
}

export function validateStage(raw: unknown): Stage {
  return StageSchema.parse(raw);
}
