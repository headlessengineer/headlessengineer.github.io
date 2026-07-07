---
description: Styling - design tokens, monochrome + one accent
paths:
  - "**/*.css"
  - "**/*.tsx"
---
# Styling conventions (see .claude/skills/design-system/ as source of truth)
- Use design tokens only - no raw hex/px in components. Chain: component → semantic → primitive.
- Palette is monochrome + ONE accent slot. Never introduce a second hue.
- Accent is rationed: primary action, links, key figures, focus, active state, one badge. Never body text, large fills, or status.
- Status by icon + shape + text, never by color alone.
- Both themes meet WCAG AAA for text. Accent is large/bold/fill only.
- Rounded scale 4/8/12/16; spacing base-4; fonts: Bitcount (wordmark), JetBrains Mono (code), Inter (everything).
