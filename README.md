# Sakti — Personal Developer Portfolio Monograph

An architectural print monograph and interactive portfolio built for **Sakti** (Full-Stack Developer & Game Development Enthusiast).

## Visual & Creative Direction
- **Concept:** *Architectural Print & Interactive Atelier* — structured 12-column blueprint grid, `1px` structural hairlines, tabular monospace telemetry (`JetBrains Mono`), and expressive humanist typography (`Plus Jakarta Sans`).
- **Dual Theme:**
  - **Obsidian Atelier (Dark Default):** `#111315` Obsidian canvas, `#1D2124` Graphite elevated surfaces, `#F0F0E9` Off-White chalk ink, `#B8F36B` Acid Lime signal accent, and `#E5A93C` Warm Ochre game-dev indicator.
  - **Archival Paper (Light Theme):** `#F4F3EF` warm archival stone canvas with `#141618` carbon ink and `#275312` botanical green signal.

## Route Architecture (`next-intl`)
- `/en` & `/id` — Homepage (Hero, Selected Works Dossiers, Dual Practice Focus, Profile Preview, Tech Spec Matrix, Experience & Credentials Ledger, Contact).
- `/en/projects` & `/id/projects` — Interactive Works Catalog with discipline filter and live System Anatomy preview.
- `/en/projects/[slug]` & `/id/projects/[slug]` — Editorial Case Studies (`critiplay`, `laundryflow`, `negeri-kelabu`).
- `/en/about` & `/id/about` — Full Developer Biography, Engineering Principles & Specification Sheet.
- `/en/experience` & `/id/experience` — Engineering Trajectory & Career Milestone Slots.
- `/en/certificates` & `/id/certificates` — Credentials Registry.

## Editing Portfolio Content
All project case studies, technology specifications, experience entries, certificates, and contact links live in a single strongly-typed file:
- `src/data/portfolio.ts`
- UI translations live in `messages/en.json` and `messages/id.json`.

