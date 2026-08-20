import { lazy, Suspense } from "react";
import { Callout } from "@/shared/ui/Callout";
import type { ContentBlock } from "@/course/course.schema";
import { assertNever } from "@/shared/lib/assert-never";

const CodeHighlighter = lazy(() =>
  import("@uiw/react-codemirror").then((m) => ({ default: m.default }))
);

interface LessonReaderProps {
  title: string;
  objectives: readonly string[];
  contentBlocks: readonly ContentBlock[];
}

export function LessonReader({
  title,
  objectives,
  contentBlocks,
}: LessonReaderProps) {
  return (
    <div className="prose max-w-none">
      <h1>{title}</h1>

      {objectives.length > 0 && (
        <div className="not-prose mb-8 rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-2)] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
            Learning objectives
          </p>
          <ul className="space-y-2">
            {objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                <span className="flex-none mt-0.5 size-4 rounded-full bg-[var(--color-accent-primary-subtle)] text-[var(--color-accent-primary)] text-xs flex items-center justify-center font-semibold">
                  {i + 1}
                </span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {contentBlocks.map((block, i) => (
        <ContentBlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <div
          dangerouslySetInnerHTML={{ __html: markdownToHtml(block.markdown) }}
        />
      );

    case "code":
      return (
        <div className="not-prose my-5">
          {block.caption && (
            <p className="text-xs text-[var(--color-text-muted)] mb-1.5 font-medium">
              {block.caption}
            </p>
          )}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-code-border)] overflow-hidden">
            <Suspense
              fallback={
                <pre className="bg-[var(--color-code-bg)] p-4 font-mono text-sm overflow-x-auto">
                  {block.code}
                </pre>
              }
            >
              <CodeHighlighter
                value={block.code}
                readOnly
                extensions={[]}
                theme="dark"
                basicSetup={{ lineNumbers: true, foldGutter: false }}
                style={{
                  fontSize: "var(--font-size-sm)",
                  fontFamily: "var(--font-family-mono)",
                }}
              />
            </Suspense>
          </div>
        </div>
      );

    case "callout":
      return (
        <div className="not-prose my-5">
          <Callout variant={block.variant} title={block.title}>
            {block.body}
          </Callout>
        </div>
      );

    case "comparison":
      return (
        <div className="not-prose my-5">
          {block.caption && (
            <p className="text-xs text-[var(--color-text-muted)] mb-2 font-medium">
              {block.caption}
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: block.leftLabel, code: block.leftCode },
              { label: block.rightLabel, code: block.rightCode },
            ].map(({ label, code }) => (
              <div
                key={label}
                className="rounded-[var(--radius-lg)] border border-[var(--color-code-border)] overflow-hidden"
              >
                <div className="px-3 py-1.5 bg-[var(--color-bg-emphasis)] border-b border-[var(--color-code-border)]">
                  <span className="text-xs font-medium text-[var(--color-text-muted)]">
                    {label}
                  </span>
                </div>
                <pre className="bg-[var(--color-code-bg)] p-4 font-mono text-sm overflow-x-auto text-[var(--color-text-primary)]">
                  {code}
                </pre>
              </div>
            ))}
          </div>
        </div>
      );

    case "output":
      return (
        <div className="not-prose my-3">
          <div
            className={[
              "rounded-[var(--radius-lg)] px-4 py-3 font-mono text-sm",
              block.isError
                ? "bg-[var(--color-accent-danger-subtle)] border border-[var(--color-accent-danger)] text-[var(--color-accent-danger)]"
                : "bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] text-[var(--color-text-primary)]",
            ].join(" ")}
          >
            <span className="text-[var(--color-text-muted)] text-xs mr-2">
              {block.isError ? "error:" : "output:"}
            </span>
            <pre className="inline whitespace-pre-wrap">{block.text}</pre>
          </div>
        </div>
      );

    case "mental-model":
      return (
        <div className="not-prose my-6 rounded-[var(--radius-xl)] border border-[var(--color-border-default)] bg-[var(--color-surface-2)] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent-primary)] mb-2">
            Mental model — {block.title}
          </p>
          <p className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
            Think of it like: <span className="italic">{block.analogy}</span>
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {block.explanation}
          </p>
        </div>
      );

    case "why-matters":
      return (
        <div className="not-prose my-5">
          <Callout variant="tip" title="Why this matters">
            {block.body}
          </Callout>
        </div>
      );

    case "glossary-term":
      return (
        <div className="not-prose my-4 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-surface-2)] px-4 py-3">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm text-[var(--color-text-primary)]">
              {block.term}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">noun</span>
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {block.definition}
          </p>
          {block.example && (
            <pre className="mt-2 font-mono text-xs text-[var(--color-text-muted)]">
              {block.example}
            </pre>
          )}
        </div>
      );

    default:
      return assertNever(block);
  }
}

function markdownToHtml(md: string): string {
  const fenceBlocks: string[] = [];

  // Extract fenced code blocks before HTML escaping so their content is preserved exactly.
  let text = md.replace(/```(\w*)\n?([\s\S]*?)```/g, (_match, lang: string, code: string) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const cls = lang ? ` class="language-${lang}"` : "";
    fenceBlocks.push(`<pre><code${cls}>${escaped}</code></pre>`);
    return `FENCEBLOCK${fenceBlocks.length - 1}END`;
  });

  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/gs, "<ul>$&</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hul])(.+)$/gm, (line) =>
      line ? `<p>${line}</p>` : ""
    );

  // Restore code blocks, unwrapping any <p> wrapper the paragraph pass added.
  return text.replace(/<p>FENCEBLOCK(\d+)END<\/p>|FENCEBLOCK(\d+)END/g, (_m, a, b) =>
    fenceBlocks[parseInt(a ?? b)]
  );
}
