---
name: project-docs
description: Work in the weather-realteeth project only after reading the project instructions and product/design documents first. Use when Codex is asked to implement, review, refactor, debug, or answer questions about this repository's weather app, especially UI behavior, project conventions, PRD requirements, layout/design constraints, favorites, location search, weather data, or frontend architecture.
---

# Project Docs

## Overview

Use this skill to ground work in the repository's required instructions before answering or editing. Always prefer the live project documents over memory or assumptions.

## Required Context Pass

Before answering a substantive project question or changing files, read these files from the repository root:

1. `AGENTS.md`
2. `docs/PRD.md`
3. `docs/layout.md`

Then follow references from those files only when relevant:

- Read `DESIGN.md` before any UI, styling, layout, shadcn, icon, responsive, or visual-design work.
- Inspect `docs/images/apple-weather-desktop.png` when matching desktop layout or reviewing visual similarity.
- Inspect existing `src/` code and configuration before proposing architecture or edits.

Do not answer from stale memory if these files may decide the answer.

## Document Priority

Apply requirements in this order when documents overlap:

1. User's latest explicit request.
2. `AGENTS.md` coding and component conventions.
3. `DESIGN.md` for visual-system rules.
4. `docs/layout.md` for screen structure and responsive layout.
5. `docs/PRD.md` for product behavior and scope.
6. Existing codebase patterns.

If `layout.md` says to follow the Apple Weather reference but `DESIGN.md` forbids a visual treatment, follow the design document.

## Working Rules

- Keep this skill as a routing layer, not a duplicated copy of project rules.
- Apply `AGENTS.md`, `DESIGN.md`, and the docs listed above from their source files after reading them.
- For UI work, preserve the required app shell from `docs/layout.md`.

## Response Pattern

After reading the required documents, answer normally. Mention the document basis briefly when it affects the decision, but do not produce a long document summary unless the user asks for one.

If a requested change conflicts with the required documents, state the conflict and make the smallest reasonable document-compliant choice unless the user explicitly overrides it.

When anything remains ambiguous, do not guess: surface every uncertainty and let the user make the decision.
