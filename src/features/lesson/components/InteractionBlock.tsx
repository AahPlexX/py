import { useState, useCallback, type ReactNode } from "react";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Callout } from "@/shared/ui/Callout";
import { CodeLab } from "@/features/lab/components/CodeLab";
import type { Interaction } from "@/course/course.schema";
import { assertNever } from "@/shared/lib/assert-never";

interface InteractionBlockProps {
  interaction: Interaction;
  lessonId: string;
  onComplete?: (interactionId: string, correct: boolean) => void;
  completedCorrectly?: boolean;
}

type AttemptState = "idle" | "correct" | "incorrect" | "exhausted";

export function InteractionBlock({
  interaction,
  onComplete,
  completedCorrectly = false,
}: InteractionBlockProps) {
  const [attempts, setAttempts] = useState(0);
  const [state, setState] = useState<AttemptState>(
    completedCorrectly ? "correct" : "idle"
  );
  const [shownHintIdx, setShownHintIdx] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);

  const maxAttempts = interaction.allowedAttempts;
  const hints = interaction.hints;

  const handleResult = useCallback(
    (correct: boolean) => {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (correct) {
        setState("correct");
        onComplete?.(interaction.id, true);
      } else if (newAttempts >= maxAttempts) {
        setState("exhausted");
        onComplete?.(interaction.id, false);
      } else {
        setState("incorrect");
      }
    },
    [attempts, maxAttempts, interaction.id, onComplete]
  );

  const showNextHint = () => {
    setShownHintIdx((i) => Math.min(i + 1, hints.length - 1));
  };

  const canShowMoreHints = shownHintIdx < hints.length - 1;
  const isTerminal = state === "correct" || state === "exhausted";

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-default)] overflow-hidden">
      <div className="px-5 py-4 bg-[var(--color-surface-2)] border-b border-[var(--color-border-subtle)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <InteractionKindBadge kind={interaction.kind} />
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)] leading-snug">
                {interaction.prompt}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {interaction.beginnerPurpose}
              </p>
            </div>
          </div>
          {state === "correct" && (
            <CheckCircle
              className="size-5 text-[var(--color-accent-success)] flex-none mt-0.5"
              aria-label="Completed correctly"
            />
          )}
          {state === "exhausted" && (
            <XCircle
              className="size-5 text-[var(--color-accent-danger)] flex-none mt-0.5"
              aria-label="Attempts exhausted"
            />
          )}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <InteractionBody
          interaction={interaction}
          state={state}
          onResult={handleResult}
          showAnswer={showAnswer}
        />

        {state === "incorrect" && (
          <Callout variant="warning" title="Not quite">
            {interaction.feedback.incorrect}
            {attempts < maxAttempts && (
              <span className="block mt-1 text-xs">
                {maxAttempts - attempts} attempt
                {maxAttempts - attempts !== 1 ? "s" : ""} remaining.
              </span>
            )}
          </Callout>
        )}

        {state === "correct" && (
          <Callout variant="success" title="Correct!">
            {interaction.feedback.correct}
            {interaction.feedback.explanation && (
              <span className="block mt-1">{interaction.feedback.explanation}</span>
            )}
          </Callout>
        )}

        {state === "exhausted" && (
          <div className="space-y-2">
            <Callout variant="danger" title="Attempts exhausted">
              {interaction.feedback.incorrect}
              {interaction.feedback.misconception && (
                <span className="block mt-1">{interaction.feedback.misconception}</span>
              )}
            </Callout>
            {!showAnswer && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowAnswer(true)}
              >
                Show answer and explanation
              </Button>
            )}
          </div>
        )}

        {!isTerminal && hints.length > 0 && (
          <div className="border-t border-[var(--color-border-subtle)] pt-3 space-y-2">
            {shownHintIdx >= 0 &&
              hints.slice(0, shownHintIdx + 1).map((hint, i) => (
                <div
                  key={i}
                  className="flex gap-2 text-sm text-[var(--color-text-secondary)]"
                >
                  <HelpCircle
                    className="size-3.5 text-[var(--color-accent-info)] mt-0.5 flex-none"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-medium text-[var(--color-text-muted)] capitalize mr-1">
                      {hint.level} hint:
                    </span>
                    {hint.text}
                  </span>
                </div>
              ))}
            {canShowMoreHints && (
              <Button
                variant="ghost"
                size="sm"
                onClick={showNextHint}
                leftIcon={
                  shownHintIdx >= 0 ? (
                    <ChevronDown className="size-3.5" />
                  ) : (
                    <ChevronRight className="size-3.5" />
                  )
                }
              >
                {shownHintIdx >= 0 ? "Next hint" : "Show hint"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InteractionKindBadge({ kind }: { kind: Interaction["kind"] }) {
  const labels: Record<Interaction["kind"], { label: string; colorClass: string }> = {
    "predict-output": { label: "Predict", colorClass: "text-[var(--color-accent-primary)]" },
    "multiple-choice": { label: "Choice", colorClass: "text-[var(--color-accent-info)]" },
    "fill-code": { label: "Fill", colorClass: "text-[var(--color-accent-warning)]" },
    "reorder-code": { label: "Reorder", colorClass: "text-[var(--color-accent-warning)]" },
    "run-code": { label: "Run", colorClass: "text-[var(--color-accent-success)]" },
    "debug-code": { label: "Debug", colorClass: "text-[var(--color-accent-danger)]" },
    "plain-language-explain": { label: "Explain", colorClass: "text-[var(--color-text-muted)]" },
  };
  const cfg = labels[kind];
  return (
    <span
      className={[
        "flex-none text-xs font-semibold uppercase tracking-wide mt-0.5",
        cfg.colorClass,
      ].join(" ")}
    >
      {cfg.label}
    </span>
  );
}

function InteractionBody({
  interaction,
  state,
  onResult,
  showAnswer,
}: {
  interaction: Interaction;
  state: AttemptState;
  onResult: (correct: boolean) => void;
  showAnswer: boolean;
}): ReactNode {
  const isTerminal = state === "correct" || state === "exhausted";

  switch (interaction.kind) {
    case "multiple-choice":
      return (
        <MultipleChoiceBody
          interaction={interaction}
          onResult={onResult}
          disabled={isTerminal}
          showAnswer={showAnswer}
        />
      );
    case "predict-output":
      return (
        <PredictOutputBody
          interaction={interaction}
          onResult={onResult}
          disabled={isTerminal}
          showAnswer={showAnswer}
        />
      );
    case "fill-code":
      return (
        <FillCodeBody
          interaction={interaction}
          onResult={onResult}
          disabled={isTerminal}
          showAnswer={showAnswer}
        />
      );
    case "reorder-code":
      return (
        <ReorderCodeBody
          interaction={interaction}
          onResult={onResult}
          disabled={isTerminal}
          showAnswer={showAnswer}
        />
      );
    case "run-code":
      return (
        <RunCodeBody
          interaction={interaction}
          onResult={onResult}
          disabled={isTerminal}
        />
      );
    case "debug-code":
      return (
        <DebugCodeBody
          interaction={interaction}
          onResult={onResult}
          disabled={isTerminal}
          showAnswer={showAnswer}
        />
      );
    case "plain-language-explain":
      return (
        <PlainLanguageBody
          interaction={interaction}
          onResult={onResult}
          disabled={isTerminal}
          showAnswer={showAnswer}
        />
      );
    default:
      return assertNever(interaction);
  }
}

/* ─── Multiple choice ────────────────────────────────────────────────────── */
function MultipleChoiceBody({
  interaction,
  onResult,
  disabled,
  showAnswer,
}: {
  interaction: Extract<Interaction, { kind: "multiple-choice" }>;
  onResult: (c: boolean) => void;
  disabled: boolean;
  showAnswer: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    if (disabled) return;
    setSelected(optionId);
    const option = interaction.options.find((o) => o.id === optionId);
    onResult(option?.isCorrect ?? false);
  };

  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="sr-only">Choose the correct answer</legend>
      {interaction.options.map((option) => {
        const isSelected = selected === option.id;
        const revealed = showAnswer || (disabled && isSelected);
        const borderClass = isSelected
          ? option.isCorrect
            ? "border-[var(--color-accent-success)] bg-[var(--color-accent-success-subtle)]"
            : "border-[var(--color-accent-danger)] bg-[var(--color-accent-danger-subtle)]"
          : showAnswer && option.isCorrect
            ? "border-[var(--color-accent-success)] bg-[var(--color-accent-success-subtle)]"
            : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)]";

        return (
          <label
            key={option.id}
            className={[
              "flex items-start gap-3 p-3 rounded-[var(--radius-lg)] border cursor-pointer",
              "transition-colors duration-[var(--duration-fast)]",
              disabled ? "cursor-default" : "",
              borderClass,
            ].join(" ")}
          >
            <input
              type={interaction.allowMultiple ? "checkbox" : "radio"}
              name={interaction.id}
              value={option.id}
              checked={isSelected}
              onChange={() => handleSelect(option.id)}
              disabled={disabled}
              className="mt-0.5 flex-none accent-[var(--color-accent-primary)]"
            />
            <div className="min-w-0">
              <span className="text-sm text-[var(--color-text-primary)]">
                {option.text}
              </span>
              {revealed && option.explanation && (
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  {option.explanation}
                </p>
              )}
            </div>
          </label>
        );
      })}
    </fieldset>
  );
}

/* ─── Predict output ─────────────────────────────────────────────────────── */
function PredictOutputBody({
  interaction,
  onResult,
  disabled,
  showAnswer,
}: {
  interaction: Extract<Interaction, { kind: "predict-output" }>;
  onResult: (c: boolean) => void;
  disabled: boolean;
  showAnswer: boolean;
}) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    const correct =
      answer.trim() === interaction.expectedOutput.trim();
    onResult(correct);
  };

  return (
    <div className="space-y-3">
      <pre className="rounded-[var(--radius-lg)] bg-[var(--color-code-bg)] border border-[var(--color-code-border)] p-4 font-mono text-sm text-[var(--color-text-primary)] overflow-x-auto">
        {interaction.code}
      </pre>
      <div>
        <label
          htmlFor={`predict-${interaction.id}`}
          className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
        >
          What will Python print?
        </label>
        <textarea
          id={`predict-${interaction.id}`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={disabled}
          rows={3}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-1)] text-[var(--color-text-primary)] font-mono text-sm p-3 resize-none focus:outline-2 focus:outline-[var(--color-border-focus)] focus:outline-offset-0 disabled:opacity-60"
          placeholder="Type the exact output you expect…"
          aria-label="Your predicted output"
        />
      </div>
      {showAnswer && (
        <div className="rounded-[var(--radius-md)] bg-[var(--color-accent-success-subtle)] border border-[var(--color-accent-success)] p-3">
          <p className="text-xs font-medium text-[var(--color-accent-success)] mb-1">
            Correct output:
          </p>
          <pre className="font-mono text-sm text-[var(--color-text-primary)]">
            {interaction.expectedOutput}
          </pre>
        </div>
      )}
      {!disabled && (
        <Button
          variant="primary"
          size="sm"
          onClick={handleSubmit}
          disabled={!answer.trim()}
        >
          Check answer
        </Button>
      )}
    </div>
  );
}

/* ─── Fill code ──────────────────────────────────────────────────────────── */
function FillCodeBody({
  interaction,
  onResult,
  disabled,
  showAnswer,
}: {
  interaction: Extract<Interaction, { kind: "fill-code" }>;
  onResult: (c: boolean) => void;
  disabled: boolean;
  showAnswer: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const allCorrect = interaction.blanks.every((blank) => {
      const userAnswer = (answers[blank.placeholder] ?? "").trim();
      const expected = blank.answer.trim();
      return blank.caseSensitive
        ? userAnswer === expected
        : userAnswer.toLowerCase() === expected.toLowerCase();
    });
    onResult(allCorrect);
  };

  const parts = interaction.codeTemplate.split(
    /(\$\{[^}]+\})/g
  );

  return (
    <div className="space-y-3">
      <div className="rounded-[var(--radius-lg)] bg-[var(--color-code-bg)] border border-[var(--color-code-border)] p-4 font-mono text-sm leading-relaxed overflow-x-auto">
        {parts.map((part, i) => {
          const match = /^\$\{([^}]+)\}$/.exec(part);
          if (match) {
            const placeholder = match[1]!;
            const blank = interaction.blanks.find(
              (b) => b.placeholder === placeholder
            );
            return (
              <input
                key={i}
                type="text"
                value={answers[placeholder] ?? ""}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [placeholder]: e.target.value,
                  }))
                }
                disabled={disabled}
                aria-label={`Fill in: ${placeholder}`}
                className="inline-block min-w-[6ch] max-w-[20ch] border-b-2 border-[var(--color-accent-primary)] bg-transparent text-[var(--color-accent-primary)] font-mono text-sm px-1 focus:outline-none focus:border-[var(--color-accent-primary-hover)] disabled:opacity-60"
                placeholder={blank?.placeholder ?? "…"}
              />
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
      {showAnswer && (
        <div className="rounded-[var(--radius-md)] bg-[var(--color-accent-success-subtle)] border border-[var(--color-accent-success)] p-3 space-y-1">
          <p className="text-xs font-medium text-[var(--color-accent-success)]">
            Answers:
          </p>
          {interaction.blanks.map((blank) => (
            <p key={blank.placeholder} className="text-sm font-mono text-[var(--color-text-primary)]">
              {blank.placeholder}: <strong>{blank.answer}</strong>
            </p>
          ))}
        </div>
      )}
      {!disabled && (
        <Button
          variant="primary"
          size="sm"
          onClick={handleSubmit}
          disabled={interaction.blanks.some(
            (b) => !(answers[b.placeholder] ?? "").trim()
          )}
        >
          Check
        </Button>
      )}
    </div>
  );
}

/* ─── Reorder code ───────────────────────────────────────────────────────── */
function ReorderCodeBody({
  interaction,
  onResult,
  disabled,
  showAnswer,
}: {
  interaction: Extract<Interaction, { kind: "reorder-code" }>;
  onResult: (c: boolean) => void;
  disabled: boolean;
  showAnswer: boolean;
}) {
  const [order, setOrder] = useState<number[]>(() =>
    interaction.lines.map((_, i) => i)
  );
  const [dragging, setDragging] = useState<number | null>(null);

  const handleDrop = (targetIdx: number) => {
    if (dragging === null || dragging === targetIdx) return;
    const next = [...order];
    const [moved] = next.splice(dragging, 1);
    next.splice(targetIdx, 0, moved!);
    setOrder(next);
    setDragging(null);
  };

  const handleSubmit = () => {
    const correct =
      order.join(",") === interaction.correctOrder.join(",");
    onResult(correct);
  };

  const correctLines = interaction.correctOrder.map(
    (i) => interaction.lines[i]!
  );

  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--color-text-muted)]">
        Drag lines into the correct order.
      </p>
      <div className="space-y-1.5" aria-label="Reorder code lines">
        {order.map((lineIdx, displayIdx) => (
          <div
            key={lineIdx}
            draggable={!disabled}
            onDragStart={() => setDragging(displayIdx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(displayIdx)}
            className={[
              "flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-code-bg)] border px-3 py-2",
              disabled ? "cursor-default" : "cursor-grab active:cursor-grabbing",
              dragging === displayIdx
                ? "border-[var(--color-accent-primary)] opacity-60"
                : "border-[var(--color-border-default)]",
            ].join(" ")}
          >
            <span className="text-[var(--color-text-muted)] select-none text-xs w-4">
              {displayIdx + 1}
            </span>
            <code className="font-mono text-sm text-[var(--color-text-primary)] flex-1">
              {interaction.lines[lineIdx]}
            </code>
          </div>
        ))}
      </div>
      {showAnswer && (
        <div className="rounded-[var(--radius-md)] bg-[var(--color-accent-success-subtle)] border border-[var(--color-accent-success)] p-3">
          <p className="text-xs font-medium text-[var(--color-accent-success)] mb-1.5">
            Correct order:
          </p>
          {correctLines.map((line, i) => (
            <div key={i} className="font-mono text-sm text-[var(--color-text-primary)]">
              {i + 1}. {line}
            </div>
          ))}
        </div>
      )}
      {!disabled && (
        <Button variant="primary" size="sm" onClick={handleSubmit}>
          Check order
        </Button>
      )}
    </div>
  );
}

/* ─── Run code ───────────────────────────────────────────────────────────── */
function RunCodeBody({
  interaction,
  onResult,
  disabled,
}: {
  interaction: Extract<Interaction, { kind: "run-code" }>;
  onResult: (c: boolean) => void;
  disabled: boolean;
}) {
  const [hasRun, setHasRun] = useState(false);

  return (
    <div className="space-y-3">
      <CodeLab
        starterCode={interaction.starterCode ?? ""}
        task={interaction.task}
        pyodideCompatible={interaction.pyodideCompatible}
        readOnly={disabled}
        label="Python code editor for exercise"
        onResult={(result) => {
          setHasRun(true);
          if (!interaction.expectedOutputContains) {
            onResult(result.error === null);
            return;
          }
          const outputLower = result.stdout.toLowerCase();
          const allPresent = interaction.expectedOutputContains.every((s) =>
            outputLower.includes(s.toLowerCase())
          );
          onResult(result.error === null && allPresent);
        }}
      />
      {!hasRun && !disabled && (
        <p className="text-xs text-[var(--color-text-muted)]">
          Write your code and press Run to check.
        </p>
      )}
    </div>
  );
}

/* ─── Debug code ─────────────────────────────────────────────────────────── */
function DebugCodeBody({
  interaction,
  onResult,
  disabled,
  showAnswer,
}: {
  interaction: Extract<Interaction, { kind: "debug-code" }>;
  onResult: (c: boolean) => void;
  disabled: boolean;
  showAnswer: boolean;
}) {
  const [fix, setFix] = useState(interaction.brokenCode);

  const handleSubmit = () => {
    const normalise = (s: string) =>
      s
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .join("\n");
    const correct = normalise(fix) === normalise(interaction.fixedCode);
    onResult(correct);
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-[var(--color-accent-danger)] mb-1.5">
          Broken code — find and fix the bug:
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] mb-2">
          {interaction.bugDescription}
        </p>
        <textarea
          value={fix}
          onChange={(e) => setFix(e.target.value)}
          disabled={disabled}
          rows={Math.max(4, fix.split("\n").length + 1)}
          className="w-full rounded-[var(--radius-lg)] border border-[var(--color-code-border)] bg-[var(--color-code-bg)] text-[var(--color-text-primary)] font-mono text-sm p-3 resize-none focus:outline-2 focus:outline-[var(--color-border-focus)] focus:outline-offset-0 disabled:opacity-60"
          aria-label="Edit the code to fix the bug"
          spellCheck={false}
        />
      </div>
      {showAnswer && (
        <div className="rounded-[var(--radius-md)] bg-[var(--color-accent-success-subtle)] border border-[var(--color-accent-success)] p-3">
          <p className="text-xs font-medium text-[var(--color-accent-success)] mb-1.5">
            Fixed code:
          </p>
          <pre className="font-mono text-sm text-[var(--color-text-primary)]">
            {interaction.fixedCode}
          </pre>
        </div>
      )}
      {!disabled && (
        <Button variant="primary" size="sm" onClick={handleSubmit}>
          Submit fix
        </Button>
      )}
    </div>
  );
}

/* ─── Plain language explain ─────────────────────────────────────────────── */
function PlainLanguageBody({
  interaction,
  onResult,
  disabled,
  showAnswer,
}: {
  interaction: Extract<Interaction, { kind: "plain-language-explain" }>;
  onResult: (c: boolean) => void;
  disabled: boolean;
  showAnswer: boolean;
}) {
  const [explanation, setExplanation] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const handleCheck = () => {
    const allChecked = interaction.keyPointsToHit.every((_, i) =>
      checked[i.toString()]
    );
    onResult(allChecked);
  };

  return (
    <div className="space-y-3">
      <pre className="rounded-[var(--radius-lg)] bg-[var(--color-code-bg)] border border-[var(--color-code-border)] p-4 font-mono text-sm text-[var(--color-text-primary)] overflow-x-auto">
        {interaction.code}
      </pre>
      <div>
        <label
          htmlFor={`explain-${interaction.id}`}
          className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
        >
          Explain this code in plain language:
        </label>
        <textarea
          id={`explain-${interaction.id}`}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          disabled={disabled}
          rows={4}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-1)] text-[var(--color-text-primary)] text-sm p-3 resize-none focus:outline-2 focus:outline-[var(--color-border-focus)] focus:outline-offset-0 disabled:opacity-60"
          placeholder="Describe what this code does in your own words…"
        />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">
          Check your explanation covers these points:
        </p>
        {interaction.keyPointsToHit.map((point, i) => (
          <label
            key={i}
            className="flex items-start gap-2.5 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={checked[i.toString()] ?? false}
              onChange={(e) =>
                setChecked((prev) => ({
                  ...prev,
                  [i.toString()]: e.target.checked,
                }))
              }
              disabled={disabled}
              className="mt-0.5 flex-none accent-[var(--color-accent-primary)]"
            />
            <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]">
              {point}
            </span>
          </label>
        ))}
      </div>
      {showAnswer && (
        <div className="rounded-[var(--radius-md)] bg-[var(--color-accent-success-subtle)] border border-[var(--color-accent-success)] p-3">
          <p className="text-xs font-medium text-[var(--color-accent-success)] mb-1">
            Sample answer:
          </p>
          <p className="text-sm text-[var(--color-text-primary)]">
            {interaction.sampleAnswer}
          </p>
        </div>
      )}
      {!disabled && (
        <Button
          variant="primary"
          size="sm"
          onClick={handleCheck}
          disabled={!explanation.trim()}
        >
          Mark as complete
        </Button>
      )}
    </div>
  );
}
