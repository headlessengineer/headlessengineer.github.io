---
id: ADR-001
title: Each section owns its inner max-width container; <main> is unconstrained
status: accepted
created: 2026-07-05
---
# ADR-001 · Each section owns its inner max-width container; `<main>` is unconstrained

## Context

The initial codebase had `#main-content { max-width: var(--max-width); margin: 0
auto; padding: 0 var(--space-4); }`. This worked for single-column content but
clipped full-bleed section backgrounds - sections with `background-color` set on
the `<section>` element were cropped to 1280px instead of spanning the full
viewport width. The HTML reference (all pages) uses full-bleed sections with an
inner `.container` div that constrains content.

The bug was discovered during visual review of US-017 (`CoreServices` and
`HomeServices` section-alt backgrounds were clipped).

## Decision

`#main-content` is unconstrained: `flex: 1; width: 100%` only. Every section that
renders content is responsible for its own inner container:

```css
.container {
  max-width: var(--max-width);   /* 1280px */
  margin: 0 auto;
  padding: 0 var(--sp-xl);
}
```

Sections with a narrower constraint (e.g. about page hero at 860px) use their own
`.heroContainer` class with the appropriate `max-width`.

**Invariant:** no section may rely on a parent element for horizontal containment.
Every `<section>` that renders text or card content must wrap that content in a
container div with explicit `max-width`, `margin: 0 auto`, and horizontal `padding`.

## Alternatives considered

- **Keep max-width on `#main-content`, use negative margins on sections** -
  rejected; fragile, browser-inconsistent, produces horizontal scroll on some
  viewports.
- **Wrapper `<div>` around each section in page.tsx** - rejected; pollutes the
  page component with layout concerns that belong in the section's own CSS.
- **CSS `width: 100vw; margin-left: calc(-50vw + 50%)` trick** - rejected; KISS
  violation, obscure to readers, breaks with scrollbar width on some OSes.

## Consequences

- **Positive:** full-bleed backgrounds work correctly on all viewport widths.
  Section backgrounds paint edge-to-edge; content stays centred at 1280px (or
  the section's own max-width). Consistent with the HTML reference design.
- **Positive:** each organism is self-contained - it can be dropped into any page
  without relying on the parent layout to constrain it.
- **Negative / tradeoff:** every new section must add its own `.container` class.
  Forgetting it causes edge-to-edge content, which is visually obvious and easy
  to catch in review.
