---
# ── REQUIRED ────────────────────────────────────────────────────────────────
title: 'Project Name'
# Slug: lowercase alphanumeric + hyphens only. Must match the filename.
slug: 'project-name'
# One sentence shown in cards and meta tags.
description: 'What the project does in one sentence'
# 2–3 sentences for the project list card. No markdown.
excerpt: 'Slightly longer teaser shown on the projects list. Expand on the description with the key value proposition.'
# Freeform string — used as a tag/badge on the card (e.g. language or domain).
category: 'developer-tooling'
# status options: active | beta | stable | archived
status: 'active'
license: 'MIT'
# Freeform — shown on detail page (e.g. "2 days ago", "2026-07-01").
lastCommit: '1 week ago'
tags: ['tag-one', 'tag-two', 'tag-three']

# ── OPTIONAL: STATS ─────────────────────────────────────────────────────────
# Remove the entire stats block for private/NDA/internal projects.
# The Stats card is hidden when this block is absent.
stats:
  stars: 0
  forks: 0
  contributors: 1
  version: 'v1.0.0'
  # buildStatus: any string — e.g. "passing", "failing", "unknown"
  buildStatus: 'passing'
  # coverage: number (percentage) or string (e.g. "92%")
  coverage: 90

# ── OPTIONAL: LINKS ─────────────────────────────────────────────────────────
# Remove the entire links block if no public URLs exist.
# Individual keys are all optional — only include what exists.
links:
  github: 'https://github.com/headlessengineer/project-name'
  demo: 'https://demo.project-name.dev'
  docs: 'https://docs.project-name.dev'
  # npm: 'https://www.npmjs.com/package/project-name'
  # crates: 'https://crates.io/crates/project-name'

# ── OPTIONAL: FLAGS ─────────────────────────────────────────────────────────
# featured: true — pins the project to the top of the list
featured: false
# published: false — hides the project from all lists and routes
published: false

# ── SEO ─────────────────────────────────────────────────────────────────────
seo:
  metaTitle: 'Project Name - Short Descriptor'
  metaDescription: 'One sentence for Google. Should match or closely paraphrase description. 150–160 chars.'
  keywords: ['keyword-one', 'keyword-two', 'project-name']
  canonicalUrl: '/projects/project-name'
  ogImage: '/images/projects/project-name-og.jpg'
---

## Overview

What the project is and the problem it solves. 2–4 sentences.

## Quick Start

```bash
# Installation or usage example
```

## Features

- Feature one
- Feature two
- Feature three
