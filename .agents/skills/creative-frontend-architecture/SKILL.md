---
name: creative-frontend-architecture
description: >-
  High-craft frontend implementation, fluid CSS Grid choreography, bespoke
  interactive project canvases, and purposeful motion design. Use when building
  interactive web portfolios, case studies, and responsive editorial layouts.
---

# Creative Frontend Architecture & Interactive Craft

## 1. Living Project Demonstrations Over Static Wireframes
Because Sakti is both a **Full-Stack Developer** and a **Game Developer**, the portfolio should prove technical and interactive mastery through **playable, tactile micro-systems** embedded directly in the project spreads—without using fake code editors or hacker terminals:
- **CritiPlay Interactive Critique Studio:** Allow visitors to actually filter game titles, adjust multi-criteria rating sliders (Narrative, Systems, Atmosphere), and watch the relational aggregate score and histogram respond in real time.
- **LaundryFlow Live Order Dispatch & Odoo Sync:** Allow visitors to advance a live laundry batch through operational stages (`Received` → `Washing` → `Pressing` → `Ready for Pickup`) and observe the synchronized Odoo `laundry.order` state record update instantaneously.
- **Negeri Kelabu Interactive World & Dialogue Stage:** Allow visitors to shift the time of day (`07:00 Morning Mist`, `17:40 Dusk Rain`, `22:15 Night Lanterns`) in the scene canvas and click through a branching life-sim conversation that updates world memory flags.

## 2. Fluid CSS Layout & Responsive Adaptation
- **No Box-in-Box Nesting:** Avoid nesting bordered boxes inside bordered boxes (`border` inside `border` inside `border`). Use open canvas backgrounds, generous vertical margins (`py-24` to `py-36`), and single horizontal hairlines only where a true structural separation is needed.
- **Intentional Mobile Composition:**
  - On mobile, preserve the editorial poster typography with tailored `clamp()` fluid sizing, comfortable thumb-zone navigation, and full-width interactive project stages that never feel squished.

## 3. Motion & Micro-Interaction Discipline
- Use `motion/react` (Framer Motion) for smooth layout transitions (`layoutId`), subtle scroll-triggered editorial reveals, and spring-damped interactive controls—while strictly honoring `prefers-reduced-motion`.
