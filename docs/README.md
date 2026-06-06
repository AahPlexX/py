# Python Mastery Interactive Course

Self-paced, no-video, read-and-interact Python course from absolute beginner to advanced mastery.

## Overview

| Area | Detail |
|------|--------|
| Python target | 3.14.5 |
| Frontend | Vite 8 + React 19 + TypeScript 6 + Tailwind CSS 4 |
| Package manager | pnpm 11 |
| Browser Python runtime | Pyodide 0.29.4 (Web Worker) |
| Deployment | Koyeb (primary) + GitHub Pages |
| Auth | Not included (local-first) |
| Monetization | Not included |

## Setup

```bash
corepack enable
pnpm install
pnpm dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start local dev server |
| `pnpm build` | Production build (Koyeb) |
| `pnpm build:gh-pages` | Production build with `/py/` base path |
| `pnpm type-check` | TypeScript strict check |
| `pnpm test` | Unit tests via Vitest |
| `pnpm test:watch` | Watch mode |
| `pnpm validate:course` | Course graph + schema tests |
| `pnpm test:e2e` | Playwright E2E tests |

## Architecture

- **Local-first**: all progress in `localStorage`. No backend, no accounts.
- **Pyodide Worker**: Python execution is isolated in a Web Worker. Never runs on main thread.
- **Typed content schema**: all lessons validated against Zod schemas at test time.
- **Prerequisite graph**: tested for acyclicity and referential integrity.
- **Themes**: light / dark / ultradark / system, persisted via `localStorage`, applied before React hydration.

## Course Authoring

1. Add new concept IDs to `src/course/glossary/glossary.registry.ts`
2. Add a lesson to the appropriate stage file in `src/course/stages/`
3. Declare prerequisites using existing lesson IDs
4. Add at least 3 `contentBlocks` and 3 `interactions`
5. Run `pnpm validate:course` to verify schema and graph integrity
6. IDs must be immutable once released (progress keys depend on them)

## Deployment

### Koyeb

```bash
pnpm build
docker build -t python-mastery .
```

Set build command: `pnpm install --frozen-lockfile && pnpm build`

### GitHub Pages

Triggered automatically on push to `main` via `.github/workflows/deploy.yml`.
Live at: `https://aahplexx.github.io/py/`

## ADRs

| ADR | Decision |
|-----|---------|
| ADR-001 | Local-first, no auth in v1 |
| ADR-002 | Pyodide browser-only execution, no backend runner |
| ADR-003 | Tailwind v4 `@theme` token system |
| ADR-004 | Typed course modules over MDX |
| ADR-005 | Base UI + custom components over stock template UI |
