# Quality Engineering — A0 Poster Series

A cohesive set of five A0 **portrait** posters (`841 × 1189 mm`) adapted from the
Quality Engineering deck. They are designed as a *series*: each shares one visual
language and is numbered `01 → 05` in the masthead so they read as a wall set.

## 1. Design system

The goal was print-first design, not a blown-up slide. Everything is sized for the
real A0 canvas (~3.2 k px wide when rasterised), so type is bold and legible from
across a room, and whitespace is deliberate rather than accidental.

- **Layout** — a fixed masthead (brand + `NN / 05` index), a large gradient
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
  - **Space** — Let the design breath, but keep a sensible balance between the size of the text and the available space. Don't be afraid to use the whole page. (with a 5% gutter)
  - **Balance** — use the golden ratio when planning the size of boxes and the position of elements.
  - **Consistency** — The posters should read as a cohesive series, so they should all have the same masthead, index, and footer.
  - **Focal Point** — Each poster should have a clear focal point, drawing the eye to the most important element on the page. 

## 2. The five posters

| # | File | Theme | Centrepiece |
|---|------|-------|-------------|
| 01 | `poster_1_shift.html` | **The Shift** — QA → QE manifesto | Four "From → To" mindset shifts + pull-quote |
| 02 | `poster_2_shiftleft.html` | **Shift Left & Feedback Loops** | Cost-of-a-late-defect bar chart (1×→100×) + test pyramid |
| 03 | `poster_3_roi.html` | **The Economics of Automation** | Giant `824` lifetime runs with the release maths + manual-vs-automated bars |
| 04 | `poster_4_action.html` | **Make the Shift** — call to action | Six-step action plan, build-skills chips, QE Guild CTA + contact |
| 05 | `poster_5_slides.html` | **The Deck at a Glance** — slide summary | 3×5 captioned grid of all 14 slides + QE Guild CTA tile |

## 3. Poster copy (source of truth)

The full text of each poster, ready for hand-tweaking. **Edit here first**, then sync the
wording into the `posters/poster_*.html` files and re-run `make posters`. The HTML is
currently in sync with this copy.

Formatting conventions: *italics* mark words rendered in the gradient/accent colour
(`<em>` in the HTML); **bold** marks emphasised words (`<strong>`).

Shared elements on all five posters:

* **Masthead brand:** Quality Engineering · The Guild
* **Masthead index:** `NN / 05`
* **Footer author:** Andrew Darnell — Principal Test Engineer

### Poster 01 — The Shift (`poster_1_shift.html`)

* **Eyebrow:** The Mindset Shift
* **Headline:** Quality isn't a *phase.* It's how we *engineer.*
* **Lead:** Same skills, new timing. QA and QE both exist to **reduce risk** and **protect
  the customer** — Quality Engineering simply moves that expertise upstream, into every
  commit, every pipeline, every day.
* **Shared Foundations strip** — chips: Understand requirements · Identify risk ·
  Design mitigations · Communicate clearly · Execute relentlessly
* **Pull-quote:** We have shared goals, the same core skills and the same commitment to the customer. The difference is approach, timing and execution.
*We build software to test software, and automate the feedback loops so we can move on to the creating the next set of tests, and the developers can focus on the next feature.*

  * Attribution line: Shared purpose · Different practices
* **The four shifts** — column headers **From · Quality Assurance** → **To · Quality Engineering**:
  1. Reactively finding bugs → Proactively mitigating risk
  2. Manual test execution → Automation & observability
  3. Siloed gatekeepers → Embedded quality enablers
  4. A bottleneck to release → An accelerator for speed & scale
* **Footer CTA:** Join the QE Guild

### Poster 02 — Shift Left & Feedback Loops (`poster_2_shiftleft.html`)

* **Eyebrow:** Shift Left & Feedback Loops
* **Headline:** Catch it *early.* Catch it *cheap.*
* **Lead:** A defect's cost explodes the later it's found. **Fast, automated checks in CI**
  turn week-long feedback into minutes — so developers learn and correct before problems grow.
* **Chart card** — title: The cost of a late defect · sub-label: relative cost to fix
  * Y-axis label: COST ↑
  * Bars (stage → multiplier): COMMIT 1× · CODE REVIEW 3× · CI BUILD 6× ·
    INTEGRATION 15× · STAGING 40× · PRODUCTION 100×
  * Axis annotations: ◀ SHIFT LEFT · CHEAP TO FIX — EXPENSIVE TO FIX · ESCAPES ▶
  * Caption: Fixing in production can cost **~100× more** than catching the same defect at
    commit. Every stage you shift left compounds the saving.
* **Feedback-loop principles** — three cards:
  1. `01 · SPEED` — **Minutes, not weeks** — Automated checks run on **every push**, so
     developers correct course while the change is still fresh.
  2. `02 · CONFIDENCE` — **Better decisions** — Shifting left isn't just testing earlier —
     it's **enabling faster, well-informed decisions.**
  3. `03 · BALANCE` — **Right test, right layer** — Lean on cheap lower-layer tests;
     **reserve end-to-end** for critical, system-wide journeys.
* **Pyramid section** — title: Push testing down the stack · sub-label: the test pyramid
  * Layers (top → bottom) with legend, one line each:
    * **End-to-End** — Slow and costly. Reserve for **critical user journeys** and system-wide validation.
    * **Integration** — Moderate cost. Verify that services and modules **work together** across boundaries.
    * **Component** — Cheap and strong. Mid-layer coverage **reduces reliance on brittle end-to-end tests.**
    * **Unit** — Fast and free-flowing. Run in thousands on **every push** — the broad, reliable base.
* **Footer CTA:** Fast feedback, by design

### Poster 03 — The Economics of Automation (`poster_3_roi.html`)

* **Eyebrow:** The Economics of Automation
* **Headline:** Would you run it *800+ times* by hand?
* **Lead:** Systems are built over years and run for years, shipping again and again. A
  reliable automated check **pays for itself many times over** — while a single escaped
  defect costs far more than the test that would have caught it.
* **ROI big-number block:** **824** — **Executions over one system's life** for a single
  test suite. The maths (10-year lifespan):
  * Monthly releases, heavy development (2 yrs × 12) = **24**
  * Quarterly releases (10 yrs × 4) = **40**
  * Daily dev & CI runs, heavy development (2 yrs × 220 working days) = **440**
  * Daily dev & test runs, maintenance (8 yrs × 4 quarterlies × 10 runs) = **320**
  * Total runs = **824**
* **Manual capacity hits a wall** — comparison bars (runs covered over the system's life):
  * By hand — "Only the big releases — daily checks get skipped" = **~64**
  * Automated — "Every release *and* every commit" = **824**
* **Myth-busting** — three cards:
  1. ♻️ **Built to run, again and again** — Automation written once pays back on **every
     one of those 800+ runs** — the cost is spread thin.
  2. 💸 **Escapes cost far more** — A defect loose in production dwarfs the cost of the
     **reliable check** that would have stopped it.
  3. 🛡️ **Near-zero risk appetite** — In high-impact systems the cost of failure is
     **unacceptable** — confidence isn't optional.
* **Punch band:** **800+** — Would you do something manually that you'll run **over eight
  hundred times**? The maths answers itself.
* **Footer CTA:** Automation pays for itself

### Poster 04 — Make the Shift (`poster_4_action.html`)

* **Eyebrow:** Your Move · Make the Shift
* **Headline:** Elevate *our quality.*
* **Lead:** The shift to Quality Engineering is a team sport. Here's how any tester starts
  today — **think big, start small,** and automate the highest-value checks first.
* **The action plan** — sub-label: six steps to start:
  1. **Learn automation** — **Python**, browser & API testing, and solid test design.
  2. **Master the pipeline** — **CI/CD**, deployment environments, and observability.
  3. **Collaborate & ask** — Learn from **colleagues** who've already made the shift.
  4. **Leverage AI** — Accelerate scripting — while **keeping critical thinking.**
  5. **Think big, start small** — Automate the **highest-value** checks first, then expand.
  6. **Evaluate always** — Are your feedback loops **fast, useful & actionable?**
* **Build chips** — label: Learn to build → · chips: Unit · Component · Browser · API · Performance
* **CTA band:** Join the *QE Guild.* — Upskill together, share what works, and **build the
  tools** that raise quality for the whole organisation.
  * → **We're here to help** you write unit, component, browser, API & performance tests.
  * → Bring us that **tricky automation problem** you've been fighting.
  * → Preserve human judgement for **exploratory testing & risk analysis.**
* **Footer:** Andrew Darnell — Principal Test Engineer · Let's connect after the session
* **Footer CTA:** Elevate Our Quality

### Poster 05 — The Deck at a Glance (`poster_5_slides.html`)

> ℹ️ Implemented as `posters/poster_5_slides.html` in the series design system and included
> in the `render_posters.js` defaults. (`posters/poster_slides.html` is the superseded
> old-style attempt and can be deleted.) The tiles map 1:1 onto the 14-slide deck.

A summary poster: every slide of the talk as a captioned thumbnail grid, so the wall set
ends with the deck itself. Doubles as a take-away/reference sheet.

* **Eyebrow:** The Full Story · Deck Summary
* **Headline:** The whole talk, at *a glance.*
* **Lead:** All fourteen slides from the Quality Engineering session — from shared
  foundations, through the automation engine, to your first move. **Scan any tile** that
  catches your eye, or start at 01 and follow the arc.
* **Slide grid** — 3 columns × 5 rows, in deck order. Each tile is a card containing:
  * the slide screenshot (16:9, `object-fit: contain`);
  * a `JetBrains Mono` index chip (`S01` … `S14`);
  * a one-line caption — the slide title per [qe_content.md](qe_content.md):
    Quality Engineering (title) · Shared Foundations · The Traditional Approach: QA ·
    The Evolution: QE · Key Differences · Feedback Loops & Shifting Left ·
    The Regression Scaling Problem · The Economics of Automation ·
    Why Make the Shift? · First Line of Defence · Building Tests That Last ·
    Action Plan · Call to Action · Contact
* **CTA tile (15th cell):** with 14 slides the grid has one spare cell — use it as the
  closing card rather than leaving a gap:
  * Title: Want the *full session?*
  * Body: Join the **QE Guild** — upskill together and bring us your trickiest automation problem.
  * Contact line: Andrew Darnell — Principal Test Engineer
* **Footer CTA:** One wall, whole story

**Image source:** the tiles use the captured deck screenshots
(`assets/slides/slide_01.png` … `slide_14.png`, produced by `make slides` /
`capture_slides.js`, which auto-detects the slide count). Re-capture after any deck change
or the poster silently shows stale slides.

## 4. Regenerating the PNGs

The posters are standalone HTML — **no dev server or external assets required.**
`render_posters.js` loads each file over `file://`, waits for web fonts, and
captures a screenshot clipped to the exact A0 box into `generated/posters/`.

```bash
make posters          # renders the series -> generated/posters/poster_*.png
make view-posters     # opens the rendered posters in Preview (macOS)
# or render a subset:
node render_posters.js poster_2_shiftleft poster_3_roi
```

> ℹ️ Poster 05 depends on up-to-date slide captures (`make slides`) — unlike the others it
> is **not** fully standalone. Run `make slides` before `make posters` after any deck change.

Output PNGs are exactly **3179 × 4494 px** (true A0 ratio, ≈ 96 dpi) and
print-ready. For a commercial printer needing higher dpi, bump
`deviceScaleFactor` in `render_posters.js` (e.g. `2` for ~192 dpi) — the layout
is resolution-independent.

### Generated output layout

```
generated/
  posters/        poster_1_shift.png … poster_5_slides.png   (make posters)
assets/
  slides/         slide_01.png … slide_14.png                (make slides)
```

`make view-posters` / `make view-slides` open each set in Preview on macOS.
`make slides` re-captures the deck (needs the Vite dev server, started
automatically by the target).
