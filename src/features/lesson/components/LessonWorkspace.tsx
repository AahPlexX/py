import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { LessonReader } from "./LessonReader";
import { InteractionBlock } from "./InteractionBlock";
import { MasteryGate } from "./MasteryGate";
import type { Lesson } from "@/course/course.schema";
import type { Progress } from "@/features/progress/lib/progress-store";
import {
  getLessonMasteryFraction,
  markLessonComplete,
  recordInteractionResult,
  saveProgress,
} from "@/features/progress/lib/progress-store";
import { addToReviewQueue } from "@/features/progress/lib/review-queue";

interface LessonWorkspaceProps {
  lesson: Lesson;
  progress: Progress;
  onProgressChange: (next: Progress) => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

type PaneView = "lesson" | "practice";

export function LessonWorkspace({
  lesson,
  progress,
  onProgressChange,
  onNavigateNext,
  onNavigatePrev,
  hasNext = false,
  hasPrev = false,
}: LessonWorkspaceProps) {
  const [view, setView] = useState<PaneView>("lesson");

  const masteryFraction = getLessonMasteryFraction(
    progress,
    lesson.masteryCriteria.requiredInteractionIds
  );
  const passed =
    masteryFraction >= lesson.masteryCriteria.minimumCorrectFraction;
  const isCompleted = progress.completedLessonIds.includes(lesson.id);

  const handleInteractionComplete = useCallback(
    (interactionId: string, correct: boolean) => {
      let next = recordInteractionResult(progress, interactionId, correct);

      if (correct) {
        const hook = lesson.reviewHooks.find(
          (h) =>
            lesson.interactions.find((i) => i.id === interactionId)
              ?.expectedConceptIds.includes(h.conceptId)
        );
        if (hook) {
          next = addToReviewQueue(next, {
            conceptId: hook.conceptId,
            lessonId: lesson.id,
            recallPrompt: hook.recallPrompt,
          });
        }
      }

      const newFraction = getLessonMasteryFraction(
        next,
        lesson.masteryCriteria.requiredInteractionIds
      );
      if (
        newFraction >= lesson.masteryCriteria.minimumCorrectFraction &&
        !isCompleted
      ) {
        next = markLessonComplete(next, lesson.id);
      }

      saveProgress(next);
      onProgressChange(next);
    },
    [progress, lesson, isCompleted, onProgressChange]
  );

  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-2)]">
        <div className="flex items-center px-4 h-10 gap-1">
          <TabButton
            active={view === "lesson"}
            onClick={() => setView("lesson")}
          >
            Read
          </TabButton>
          <TabButton
            active={view === "practice"}
            onClick={() => setView("practice")}
          >
            Practice
            {lesson.interactions.length > 0 && (
              <span className="ml-1.5 size-4 rounded-full bg-[var(--color-accent-primary-subtle)] text-[var(--color-accent-primary)] text-xs flex items-center justify-center font-semibold">
                {lesson.interactions.length}
              </span>
            )}
          </TabButton>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {view === "lesson" && (
            <LessonReader
              title={lesson.title}
              objectives={lesson.objectives}
              contentBlocks={lesson.contentBlocks}
            />
          )}

          {view === "practice" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-1">
                  Practice
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Work through each check. You can use hints if you get stuck.
                </p>
              </div>

              {lesson.interactions.map((interaction) => (
                <InteractionBlock
                  key={interaction.id}
                  interaction={interaction}
                  lessonId={lesson.id}
                  onComplete={handleInteractionComplete}
                  completedCorrectly={
                    progress.interactionResults[interaction.id] === true
                  }
                />
              ))}

              <MasteryGate
                lessonId={lesson.id}
                masteryFraction={masteryFraction}
                requiredFraction={lesson.masteryCriteria.minimumCorrectFraction}
              />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-2)] px-4 py-3 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigatePrev}
          disabled={!hasPrev}
          leftIcon={<ChevronLeft className="size-4" />}
          aria-label="Previous lesson"
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {view === "lesson" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setView("practice")}
              rightIcon={<ChevronRight className="size-4" />}
            >
              Practice
            </Button>
          )}
          {view === "practice" && passed && (
            <Button
              variant="primary"
              size="sm"
              onClick={onNavigateNext}
              disabled={!hasNext}
              rightIcon={<ChevronRight className="size-4" />}
            >
              Next lesson
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center h-9 px-3 text-sm font-medium rounded-[var(--radius-md)]",
        "transition-colors duration-[var(--duration-fast)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]",
        active
          ? "text-[var(--color-text-primary)] bg-[var(--color-bg-emphasis)]"
          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-overlay)]",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </button>
  );
}
