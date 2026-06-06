import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import {
  BookOpen,
  Code2,
  LayoutGrid,
  RotateCcw,
  Search,
  Settings,
  Swords,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/shared/ui/Badge";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { Button } from "@/shared/ui/Button";
import { useTheme } from "./providers/ThemeProvider";
import {
  loadProgress,
  makeEmptyProgress,
  type Progress,
  clearProgress,
  exportProgress,
} from "@/features/progress/lib/progress-store";
import { courseRegistry } from "@/course/course.registry";
import { THEME_LABELS, type ThemeValue } from "@/features/theme/lib/theme-tokens";
import { LessonWorkspace } from "@/features/lesson/components/LessonWorkspace";

declare const __APP_BASE__: string;

/* ─── Root layout ────────────────────────────────────────────────────────── */

function RootLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--color-bg-base)]">
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

function SiteHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors"
          aria-label="Python Mastery — home"
        >
          <Code2
            className="size-5 text-[var(--color-accent-primary)]"
            aria-hidden="true"
          />
          <span className="hidden sm:inline">Python Mastery</span>
          <span className="sm:hidden">PY</span>
        </Link>

        <nav
          className="flex items-center gap-1"
          aria-label="Site navigation"
        >
          <NavLink to="/course" icon={<LayoutGrid className="size-4" />}>
            Course
          </NavLink>
          <NavLink to="/review" icon={<RotateCcw className="size-4" />}>
            Review
          </NavLink>
          <NavLink to="/glossary" icon={<BookOpen className="size-4" />}>
            Glossary
          </NavLink>
          <NavLink to="/settings" icon={<Settings className="size-4" />}>
            Settings
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeCycleButton theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </header>
  );
}

function NavLink({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1.5 px-3 h-8 rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-overlay)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]"
      activeProps={{ className: "!text-[var(--color-text-primary)] !bg-[var(--color-bg-emphasis)]" }}
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </Link>
  );
}

function ThemeCycleButton({
  theme,
  setTheme,
}: {
  theme: ThemeValue;
  setTheme: (t: ThemeValue) => void;
}) {
  const order: ThemeValue[] = ["system", "light", "dark", "ultradark"];
  const next = order[(order.indexOf(theme) + 1) % order.length]!;

  return (
    <button
      onClick={() => setTheme(next)}
      className="h-8 px-3 rounded-[var(--radius-md)] text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-overlay)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]"
      aria-label={`Switch theme (current: ${THEME_LABELS[theme]})`}
      title={`Theme: ${THEME_LABELS[theme]}`}
    >
      {THEME_LABELS[theme]}
    </button>
  );
}

/* ─── Home route ─────────────────────────────────────────────────────────── */

function HomePage() {
  const progressResult = loadProgress();
  const progress =
    progressResult.status !== "corrupt"
      ? progressResult.progress
      : makeEmptyProgress();

  const totalLessons = courseRegistry.stages.reduce(
    (sum, s) => sum + s.lessons.length,
    0
  );
  const completedCount = progress.completedLessonIds.length;
  const completedFraction = totalLessons > 0 ? completedCount / totalLessons : 0;

  const inProgressStage = courseRegistry.stages.find((stage) =>
    stage.lessons.some(
      (l) =>
        !progress.completedLessonIds.includes(l.id) &&
        l.prerequisites.every((p) => progress.completedLessonIds.includes(p))
    )
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <section>
        <div className="mb-2">
          <Badge variant="primary">Python 3.14.5</Badge>
        </div>
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] leading-tight mb-4">
          Python Mastery
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mb-8">
          A self-paced, interactive course from absolute beginner to advanced
          developer. Read, predict, edit, debug, and explain — no video, no
          guessing.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <Link to="/course">
            <Button variant="primary" size="lg">
              {completedCount > 0 ? "Continue learning" : "Start learning"}
            </Button>
          </Link>
          <Link to="/diagnostics">
            <Button variant="secondary" size="lg" leftIcon={<Swords className="size-4" />}>
              Take placement check
            </Button>
          </Link>
        </div>
      </section>

      {completedCount > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-3">
            Your progress
          </h2>
          <ProgressBar
            value={completedFraction * 100}
            label={`${completedCount} of ${totalLessons} lessons completed`}
            showLabel
            size="md"
          />
        </section>
      )}

      {inProgressStage && (
        <section>
          <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-4">
            {completedCount > 0 ? "Continue where you left off" : "Start here"}
          </h2>
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-1)] p-5">
            <p className="text-xs text-[var(--color-text-muted)] mb-1">
              Stage {inProgressStage.number}
            </p>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              {inProgressStage.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              {inProgressStage.summary}
            </p>
            <Link
              to="/course/$stageId"
              params={{ stageId: inProgressStage.id }}
            >
              <Button variant="primary" size="sm">
                Go to stage
              </Button>
            </Link>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-4">
          What you will learn
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Absolute basics — values, types, variables, output",
            "Control flow — decisions, loops, functions",
            "Data structures — lists, dicts, sets, comprehensions",
            "Errors and debugging — tracebacks, exceptions, strategy",
            "Testing and types — pytest patterns, type hints",
            "APIs, files, modules, and environments",
            "Async, performance, and concurrency",
            "Security, packaging, and architecture",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
              <span className="mt-1 size-1.5 rounded-full bg-[var(--color-accent-primary)] flex-none" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─── Course map route ───────────────────────────────────────────────────── */

function CourseMapPage() {
  const progressResult = loadProgress();
  const progress =
    progressResult.status !== "corrupt"
      ? progressResult.progress
      : makeEmptyProgress();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
          Course Map
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {courseRegistry.stages.length} stages · Python{" "}
          {courseRegistry.pythonVersion}
        </p>
      </div>

      <div className="space-y-3">
        {courseRegistry.stages.map((stage) => {
          const completed = stage.lessons.filter((l) =>
            progress.completedLessonIds.includes(l.id)
          ).length;
          const fraction =
            stage.lessons.length > 0 ? completed / stage.lessons.length : 0;
          const isUnlocked =
            stage.number === 1 ||
            courseRegistry.stages
              .filter((s) => s.number < stage.number)
              .flatMap((s) => s.masteryGateConceptIds)
              .every((cid) => progress.masteredConceptIds.includes(cid)) ||
            stage.lessons[0]?.prerequisites.every((p) =>
              progress.completedLessonIds.includes(p)
            ) ||
            completed > 0;

          return (
            <Link
              key={stage.id}
              to="/course/$stageId"
              params={{ stageId: stage.id }}
              className="block rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-1)] p-5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)] transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]"
              aria-label={`Stage ${stage.number}: ${stage.title}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className="flex-none size-8 rounded-[var(--radius-lg)] bg-[var(--color-bg-emphasis)] text-sm font-bold text-[var(--color-text-muted)] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {stage.number}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-[var(--color-text-primary)] leading-snug">
                      {stage.title}
                    </h2>
                    <p className="mt-0.5 text-sm text-[var(--color-text-secondary)] line-clamp-2">
                      {stage.summary}
                    </p>
                  </div>
                </div>
                <div className="flex-none flex items-center gap-2">
                  <Badge
                    variant={
                      stage.level === "beginner"
                        ? "success"
                        : stage.level === "intermediate"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {stage.level}
                  </Badge>
                  {!isUnlocked && (
                    <Badge variant="muted">locked</Badge>
                  )}
                </div>
              </div>
              {completed > 0 && (
                <div className="mt-4">
                  <ProgressBar
                    value={fraction * 100}
                    label={`${completed} of ${stage.lessons.length} lessons`}
                    showLabel
                    size="sm"
                    variant={fraction >= 1 ? "success" : "default"}
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Stage route ────────────────────────────────────────────────────────── */

function StagePage() {
  const { stageId } = useParams({ strict: false }) as { stageId: string };
  const stage = courseRegistry.stages.find((s) => s.id === stageId);
  const progressResult = loadProgress();
  const progress =
    progressResult.status !== "corrupt"
      ? progressResult.progress
      : makeEmptyProgress();

  if (!stage) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-[var(--color-accent-danger)]">Stage not found.</p>
        <Link to="/course">
          <Button variant="secondary" size="sm" className="mt-4">
            Back to course
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
        <Link to="/course" className="hover:text-[var(--color-text-primary)] transition-colors">
          Course
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-secondary)]">
          Stage {stage.number}
        </span>
      </div>

      <div>
        <Badge
          variant={
            stage.level === "beginner"
              ? "success"
              : stage.level === "intermediate"
                ? "warning"
                : "danger"
          }
          className="mb-2"
        >
          {stage.level}
        </Badge>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
          {stage.title}
        </h1>
        <p className="text-base text-[var(--color-text-secondary)] max-w-2xl">
          {stage.summary}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
          Lessons
        </h2>
        {stage.lessons.map((lesson, idx) => {
          const isCompleted = progress.completedLessonIds.includes(lesson.id);
          const isUnlocked =
            idx === 0 ||
            lesson.prerequisites.every((p) =>
              progress.completedLessonIds.includes(p)
            );

          return (
            <Link
              key={lesson.id}
              to="/course/$stageId/$lessonId"
              params={{ stageId: stage.id, lessonId: lesson.id }}
              className={[
                "flex items-center gap-4 px-5 py-4 rounded-[var(--radius-xl)] border transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)]",
                isUnlocked
                  ? "border-[var(--color-border-default)] bg-[var(--color-surface-1)] hover:border-[var(--color-border-strong)]"
                  : "border-[var(--color-border-subtle)] bg-[var(--color-surface-2)] opacity-60 pointer-events-none",
              ].join(" ")}
              aria-disabled={!isUnlocked}
              tabIndex={isUnlocked ? 0 : -1}
            >
              <span
                className={[
                  "flex-none size-7 rounded-full border-2 flex items-center justify-center text-xs font-semibold",
                  isCompleted
                    ? "border-[var(--color-accent-success)] bg-[var(--color-accent-success-subtle)] text-[var(--color-accent-success)]"
                    : "border-[var(--color-border-default)] text-[var(--color-text-muted)]",
                ].join(" ")}
                aria-hidden="true"
              >
                {isCompleted ? "✓" : idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] leading-snug">
                  {lesson.title}
                </p>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)] capitalize">
                  {lesson.kind} · {lesson.difficulty} ·{" "}
                  {lesson.interactions.length} checks
                </p>
              </div>
              {!isUnlocked && (
                <Badge variant="muted">locked</Badge>
              )}
              {isCompleted && (
                <Badge variant="success">done</Badge>
              )}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-[var(--color-border-subtle)] pt-6">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-2)] p-5">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
            Stage project: {stage.project.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            {stage.project.brief}
          </p>
          <Badge
            variant={
              stage.project.difficulty === "beginner"
                ? "success"
                : stage.project.difficulty === "intermediate"
                  ? "warning"
                  : "danger"
            }
          >
            {stage.project.difficulty}
          </Badge>
        </div>
      </div>
    </div>
  );
}

/* ─── Lesson route ───────────────────────────────────────────────────────── */

function LessonPage() {
  const { stageId, lessonId } = useParams({ strict: false }) as {
    stageId: string;
    lessonId: string;
  };
  const navigate = useNavigate();
  const [progress, setProgress] = useState<Progress>(() => {
    const r = loadProgress();
    return r.status !== "corrupt" ? r.progress : makeEmptyProgress();
  });

  const stage = courseRegistry.stages.find((s) => s.id === stageId);
  const lessonIdx = stage?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const lesson = stage?.lessons[lessonIdx];

  const prevLesson = lessonIdx > 0 ? stage?.lessons[lessonIdx - 1] : null;
  const nextLesson =
    stage && lessonIdx < stage.lessons.length - 1
      ? stage.lessons[lessonIdx + 1]
      : null;

  const handleNavigateNext = () => {
    if (nextLesson) {
      void navigate({
        to: "/course/$stageId/$lessonId",
        params: { stageId: stageId, lessonId: nextLesson.id },
      });
    }
  };

  const handleNavigatePrev = () => {
    if (prevLesson) {
      void navigate({
        to: "/course/$stageId/$lessonId",
        params: { stageId: stageId, lessonId: prevLesson.id },
      });
    }
  };

  if (!lesson || !stage) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-[var(--color-accent-danger)]">Lesson not found.</p>
        {stage && (
          <Link to="/course/$stageId" params={{ stageId }}>
            <Button variant="secondary" size="sm" className="mt-4">
              Back to stage
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-3.5rem)]">
      <div className="border-b border-[var(--color-border-subtle)] px-4 sm:px-6 py-2 flex items-center gap-2 text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-2)]">
        <Link to="/course" className="hover:text-[var(--color-text-primary)] transition-colors">Course</Link>
        <span>/</span>
        <Link
          to="/course/$stageId"
          params={{ stageId }}
          className="hover:text-[var(--color-text-primary)] transition-colors"
        >
          {stage.title}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-secondary)] truncate">{lesson.title}</span>
      </div>

      <div className="flex-1 overflow-hidden">
        <LessonWorkspace
          lesson={lesson}
          progress={progress}
          onProgressChange={setProgress}
          onNavigateNext={handleNavigateNext}
          onNavigatePrev={handleNavigatePrev}
          hasNext={!!nextLesson}
          hasPrev={!!prevLesson}
        />
      </div>
    </div>
  );
}

/* ─── Review route ───────────────────────────────────────────────────────── */

function ReviewPage() {
  const progressResult = loadProgress();
  const progress =
    progressResult.status !== "corrupt"
      ? progressResult.progress
      : makeEmptyProgress();
  const due = progress.reviewQueue.filter(
    (item) => new Date(item.nextReviewAt) <= new Date()
  );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
          Spaced Review
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Recall concepts you've learned before they fade.
        </p>
      </div>

      {due.length === 0 ? (
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-2)] p-8 text-center">
          <RotateCcw className="size-8 text-[var(--color-text-muted)] mx-auto mb-3" aria-hidden="true" />
          <p className="text-base font-medium text-[var(--color-text-primary)] mb-1">
            No reviews due
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Come back after you've completed more lessons. Review prompts appear
            here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {due.map((item) => (
            <div
              key={`${item.conceptId}-${item.lessonId}`}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-1)] p-5"
            >
              <p className="text-xs text-[var(--color-text-muted)] mb-1">
                Concept: {item.conceptId}
              </p>
              <p className="text-sm text-[var(--color-text-primary)]">
                {item.recallPrompt}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Glossary route ─────────────────────────────────────────────────────── */

function GlossaryPage() {
  const [query, setQuery] = useState("");
  const entries = courseRegistry.glossary;

  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.shortDefinition.toLowerCase().includes(q)
    );
  }, [entries, query]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
          Glossary
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Definitions for every term used in the course.
        </p>
      </div>

      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms…"
          className="w-full h-10 pl-9 pr-4 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-1)] text-[var(--color-text-primary)] text-sm focus:outline-2 focus:outline-[var(--color-border-focus)] focus:outline-offset-0 placeholder:text-[var(--color-text-placeholder)]"
          aria-label="Search glossary"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)]">No terms match "{query}".</p>
      ) : (
        <div className="divide-y divide-[var(--color-border-subtle)]">
          {filtered.map((entry) => (
            <div key={entry.term} className="py-4">
              <div className="flex items-baseline gap-2 mb-1">
                <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                  {entry.term}
                </h2>
                <span className="text-xs text-[var(--color-text-muted)]">
                  first in{" "}
                  <code className="text-xs">{entry.firstAppearsInLessonId}</code>
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {entry.shortDefinition}
              </p>
              {entry.extendedDefinition && (
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  {entry.extendedDefinition}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Projects route ─────────────────────────────────────────────────────── */

function ProjectsPage() {
  const progressResult = loadProgress();
  const progress =
    progressResult.status !== "corrupt"
      ? progressResult.progress
      : makeEmptyProgress();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
        Projects
      </h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {courseRegistry.stages.map((stage) => {
          const stageCompleted = stage.lessons.every((l) =>
            progress.completedLessonIds.includes(l.id)
          );
          return (
            <div
              key={stage.id}
              className={[
                "rounded-[var(--radius-xl)] border p-5",
                stageCompleted
                  ? "border-[var(--color-accent-success)] bg-[var(--color-accent-success-subtle)]"
                  : "border-[var(--color-border-default)] bg-[var(--color-surface-1)]",
              ].join(" ")}
            >
              <p className="text-xs text-[var(--color-text-muted)] mb-1">
                Stage {stage.number}
              </p>
              <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                {stage.project.title}
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                {stage.project.brief}
              </p>
              <Badge
                variant={
                  stage.project.difficulty === "beginner"
                    ? "success"
                    : stage.project.difficulty === "intermediate"
                      ? "warning"
                      : "danger"
                }
              >
                {stage.project.difficulty}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Diagnostics route ──────────────────────────────────────────────────── */

function DiagnosticsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
        Placement Check
      </h1>
      <p className="text-[var(--color-text-secondary)]">
        Answer a few questions to find your recommended starting point in the
        course.
      </p>
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-2)] p-8 text-center">
        <p className="text-sm text-[var(--color-text-muted)]">
          Placement diagnostics will be available once you've completed Stage 1.
          Start from the beginning for the best experience.
        </p>
        <Link to="/course/$stageId" params={{ stageId: "stage-01" }} className="inline-block mt-4">
          <Button variant="primary" size="sm">Start Stage 1</Button>
        </Link>
      </div>
    </div>
  );
}

/* ─── Settings route ─────────────────────────────────────────────────────── */

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    const result = loadProgress();
    if (result.status === "corrupt") return;
    const data = exportProgress(result.progress);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "python-mastery-progress.json";
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const handleClear = () => {
    if (!confirm("Reset all progress? This cannot be undone.")) return;
    clearProgress();
    window.location.reload();
  };

  const themes: ThemeValue[] = ["system", "light", "dark", "ultradark"];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
        Settings
      </h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
          Appearance
        </h2>
        <div className="flex flex-wrap gap-2">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={[
                "h-9 px-4 rounded-[var(--radius-lg)] text-sm font-medium border transition-colors",
                theme === t
                  ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-primary-subtle)] text-[var(--color-accent-primary)]"
                  : "border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]",
              ].join(" ")}
              aria-pressed={theme === t}
            >
              {THEME_LABELS[t]}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
          Progress data
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExport}
            leftIcon={exported ? <span>✓</span> : undefined}
          >
            {exported ? "Exported!" : "Export progress"}
          </Button>
          <Button variant="danger" size="sm" onClick={handleClear}>
            Reset all progress
          </Button>
        </div>
        <p className="text-xs text-[var(--color-text-muted)]">
          Progress is stored locally in your browser. Exporting creates a JSON
          backup file.
        </p>
      </section>

      <section className="space-y-2 text-xs text-[var(--color-text-muted)]">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
          About
        </h2>
        <p>Python target: Python 3.14.5</p>
        <p>Browser Python runtime: Pyodide 0.29.4</p>
        <p>No account required. No data leaves your device.</p>
      </section>
    </div>
  );
}

/* ─── Router setup ───────────────────────────────────────────────────────── */

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const courseIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/course",
  component: CourseMapPage,
});

const stageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/course/$stageId",
  component: StagePage,
});

const lessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/course/$stageId/$lessonId",
  component: LessonPage,
});

const reviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/review",
  component: ReviewPage,
});

const glossaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/glossary",
  component: GlossaryPage,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: ProjectsPage,
});

const diagnosticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/diagnostics",
  component: DiagnosticsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  courseIndexRoute,
  stageRoute,
  lessonRoute,
  reviewRoute,
  glossaryRoute,
  projectsRoute,
  diagnosticsRoute,
  settingsRoute,
]);

export const router = createRouter({
  routeTree,
  basepath: __APP_BASE__,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
