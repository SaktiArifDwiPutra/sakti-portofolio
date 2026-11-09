---
name: editorial-art-direction
description: >-
  Creative web design, digital art direction, editorial layout composition,
  expressive typography, and visual storytelling for personal portfolios and
  digital publications. Use when designing or critiquing bespoke web experiences
  that must not look like SaaS templates or generic developer portfolios.
---

# Editorial Art Direction & Visual Storytelling

## 1. Anti-Template Mandate (What to Eliminate Immediately)
A creative portfolio must never resemble a SaaS dashboard, a documentation portal, or a boxy wireframe template. Eliminate:
- **The Split Hero Cliché:** Never open with a left-aligned headline + 2 rectangular buttons on the left and a stacked info box / card on the right.
- **Screaming Monospace Eyebrows:** Do not prefix every section with `01 / SECTION NAME` in tracked-out uppercase monospace inside a bordered header bar.
- **Uniform Boxy Containers:** Do not wrap the entire website in a single `border-x` spreadsheet table where every section is just another row of bordered cells.
- **Icon-Decorated Skill Cards:** Never place Lucide icons (`Code2`, `Gamepad2`, `Cpu`, `Layers`) in the corners of boxes to "illustrate" abstract concepts.
- **Repetitive Project Cards:** Never render projects as identical left-text / right-image 50/50 split boxes stacked vertically.

## 2. Compositional Architecture: Pacing, Rhythm & Asymmetry
An art-directed publication relies on **contrast of scale, rhythm, and breathing room**:
1. **Poster-Scale Typographic Opening:**
   - Open with an unmistakable typographic presence—monumental display type spanning the full viewport width, paired with quiet, asymmetric editorial marginalia and a tactile, living visual focal piece.
2. **Alternating Spatial Cadence:**
   - Alternate between **expansive full-bleed exhibition spreads** (for featured works), **intimate single-column literary essays** (for philosophy and biography), and **open typographic indexes** (where horizontal hairlines and scale shifts replace boxes and cards).
3. **Asymmetric Column Offsets:**
   - Use 12-column CSS grids where content intentionally leaves columns `1–3` or `10–12` empty as active negative space. Let headlines span columns `1–9` while body copy indents to columns `5–10`.
4. **Distinct Project Personalities:**
   - Do not force 3 different projects into 1 identical card layout:
     - **Project I (CritiPlay — Web Editorial Platform):** Present as a wide, magazine-style feature spread with an interactive live rating & critique composition canvas.
     - **Project II (LaundryFlow — Mobile + ERP Operations):** Present as an offset vertical diptych pairing a tall, tactile mobile workflow simulator alongside the operational narrative.
     - **Project III (Negeri Kelabu — Indie Life-Sim RPG):** Present as an atmospheric widescreen stage with an interactive day/dusk/night world-state and branching dialogue vignette.

## 3. Expressive Typographic System
- Contrast an **expressive high-character display serif** (`Instrument Serif` or `Newsreader`) with a **razor-sharp neo-grotesque sans** (`Syne` or `Plus Jakarta Sans`) and **quiet archival numerals** (`JetBrains Mono` used sparingly for edition numbers and coordinates, never for screaming headers).
- Use scale contrast (`clamp(3.25rem, 8.5vw, 7.5rem)` for display statements vs. `1.0625rem` for long-form prose) so typography itself acts as the primary graphic architecture.
