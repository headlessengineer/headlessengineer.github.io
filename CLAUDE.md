# CLAUDE.md - headlessengineer website

Next.js marketing + product site for **headlessengineer** ("tech solutions for
business problems"). Built AI-assisted but to professional standards: SDLC +
Spec-Driven Development, SOLID, KISS, YAGNI, Fit-for-Purpose.

## Stack
- Next.js (App Router) · TypeScript (strict) · React Server Components by default
- CSS: design tokens from `.claude/skills/design-system/` (monochrome + one accent). No UI library.
- Tests: Vitest + React Testing Library (unit), Playwright (e2e)
- Lint/format: ESLint + Prettier · Type: `tsc --noEmit`

## Commands
```bash
pnpm dev            # local dev
pnpm build          # production build
pnpm lint           # eslint
pnpm typecheck      # tsc --noEmit
pnpm test           # vitest run
pnpm test:e2e       # playwright
```

## Non-negotiable workflow (Spec-Driven Development)
1. **No code before an approved spec.** Every feature starts as an EPIC → User
   Story → Task in `docs/`. Implementation may only begin once the spec is
   marked `status: approved`.
2. **Test-first.** Write failing tests from the spec's acceptance criteria before
   implementation.
3. **Document every iteration after approval.** When work is approved/merged,
   the `documentation` skill records it in `docs/iterations/`.
4. **Definition of Done:** spec satisfied · tests pass · lint + typecheck clean ·
   a11y AAA · iteration documented.

## Architecture principles (apply to every change)
- **SOLID** - single responsibility per module; depend on abstractions; small,
  focused interfaces.
- **KISS** - the simplest design that meets the spec. No cleverness.
- **YAGNI** - build only what the current spec requires. No speculative features,
  config, or abstraction.
- **Fit-for-Purpose** - match the solution's complexity to the problem. Don't
  over- or under-engineer.
- When a rule and a deadline conflict, the rule wins; flag the tradeoff instead.

## Documentation rules
- All docs are **structured Markdown** in `docs/` (see `docs/README.md`).
- Use **Mermaid** diagrams whenever a flow, architecture, sequence, or data model
  is clearer visually than in prose.
- EPICs → `docs/epics/`, stories → `docs/stories/`, tasks → `docs/tasks/`, specs →
  `docs/specs/`, decisions → `docs/adr/`, iteration logs → `docs/iterations/`.

## Conventions
- Detailed conventions live in `.claude/rules/*.md` and load by path.
- Branch/commit: conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`,
  `test:`, `chore:`). One logical change per commit.
- Never read or write `.env*` or `secrets/`. Never commit without explicit
  approval. Never start code for an unapproved spec.

## How the assistant should behave
- Don't babysit me, but don't skip the gates above. Paste the goal; follow the
  spec → plan → test → implement → review → document → ship loop.
- Prefer editing existing files over creating new ones unless the design needs it.
- Keep responses focused; do the retrieval/work in this turn rather than offering.
