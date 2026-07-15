# Quality Engineering — A0 Poster Series

A cohesive set of four A0 **portrait** posters (`841 × 1189 mm`) adapted from the
Quality Engineering deck. They are designed as a *series*: each shares one visual
language and is numbered `01 → 04` in the masthead so they read as a wall set.

## 1. Design system

The goal was print-first design, not a blown-up slide. Everything is sized for the
real A0 canvas (~3.2 k px wide when rasterised), so type is bold and legible from
across a room, and whitespace is deliberate rather than accidental.

- **Layout** — a fixed masthead (brand + `NN / 04` index), a large gradient
  headline, and content organised into a few strong horizontal bands. No
  `flex:1 + center` panels (the flaw in the previous version, which collapsed
  content into the middle of huge empty boxes).
- **Typography** — `Space Grotesk` for display headlines (with a white→accent
  gradient on the key word), `Inter` for body copy, and `JetBrains Mono` for
  technical eyebrows, labels and figures.
- **Colour** — deep obsidian base (`#08090d`); accents drawn from the deck's
  palette: cyan `#38bdf8`, emerald `#34d399`, coral `#fb7185`, purple `#c084fc`,
  amber `#fbbf24`. Each poster leans on one or two accents for identity.
- **Background** — generated entirely in CSS/SVG (no external art): a masked
  blueprint grid, a few soft colour glows placed to support the layout, a fine
  grain overlay, a vignette, and a thin inset frame. This keeps text crisp and
  never lets the background fight the content.

## 2. The four posters

| # | File | Theme | Centrepiece |
|---|------|-------|-------------|
| 01 | `poster_1_shift.html` | **The Shift** — QA → QE manifesto | Four "From → To" mindset shifts + pull-quote |
| 02 | `poster_2_shiftleft.html` | **Shift Left & Feedback Loops** | Cost-of-a-late-defect bar chart (1×→100×) + test pyramid |
| 03 | `poster_3_roi.html` | **The Economics of Automation** | Giant `504` runs/yr with the release maths + manual-vs-automated bars |
| 04 | `poster_4_action.html` | **Make the Shift** — call to action | Six-step action plan, build-skills chips, QE Guild CTA + contact |

## 3. Regenerating the PNGs

The posters are standalone HTML — **no dev server or external assets required.**
`render_posters.js` loads each file over `file://`, waits for web fonts, and
captures a screenshot clipped to the exact A0 box into `generated/posters/`.

```bash
make posters          # renders all four -> generated/posters/poster_*.png
make view-posters     # opens the rendered posters in Preview (macOS)
# or render a subset:
node render_posters.js poster_2_shiftleft poster_3_roi
```

Output PNGs are exactly **3179 × 4494 px** (true A0 ratio, ≈ 96 dpi) and
print-ready. For a commercial printer needing higher dpi, bump
`deviceScaleFactor` in `render_posters.js` (e.g. `2` for ~192 dpi) — the layout
is resolution-independent.

### Generated output layout

```
generated/
  posters/   poster_1_shift.png … poster_4_action.png   (make posters)
  slides/    slide_1.png … slide_15.png                 (make slides)
```

`make view-posters` / `make view-slides` open each set in Preview on macOS.
`make slides` re-captures the deck (needs the Vite dev server, started
automatically by the target).
