# Interactive Slides: Sprint Timeline Simulation

This document specifies the behavior, metrics, and animation flow for the interactive sprint simulation featured on **Slide 7 (The Regression Scaling Problem)** (numbering per [qe_content.md](qe_content.md)).

## Visual Design & Layout

The slide displays a side-by-side comparison of two scaling models under the same growth in feature delivery over 10 sprints:

* **Left Panel:** QA Bottleneck (Manual Testing)
* **Right Panel:** QE Automation Engine (Continuous Testing)

The core message is simple: manual testing adds a fixed amount of human capacity, while automation creates reusable checks that can grow with the product. The visual should make that contrast obvious.

Each panel contains:
1. **Conveyor Belt Board:** A lane with 3 developers (`👩‍💻`/`👨‍💻`, rendered large) pushing features (code blocks `{ }`) toward a single tester (also rendered large). In the manual version, that tester is human-only; in the automated version, the tester is supported by an automation node (`🤖`).
2. **Product Growth ("Product" band):** A labelled band directly below the lane (`Product — N features · X working`, where X is the verified count), vertically aligned across the two panels that accumulates one small square block per delivered feature — green for verified features, red for features that shipped unverified. The band is a fixed-height container sized so a full 10-sprint run fits without overflowing (blocks wrap into rows). As the product grows, the amount of regression work also grows, which is the core scaling challenge.
3. **Automated Test Set (QE panel only):** A second labelled band below the Product band, rendered in the **same block style as the Product band** so the two read as parallel structures: one square block per required test, solid green when automated, dashed red outline while still pending. The label shows coverage (`Automated Test Suite (n / total covered)`).
4. **Dashboard Counters:**
   * **Built breakdown (one line, showing the hierarchy):** `Built = Verified + Rejected + Escaped`.
     * **Built:** Cumulative features developed.
     * **Verified:** Cumulative features successfully verified.
     * **Rejected:** Work sent back for rework after review (25% chance); rejected work never ships.
     * **Escaped:** Features that reached production without sufficient verification.
   * **Product Size:** The current product size, split into new features added this sprint and the total amount of product that must be re-checked.
   * **Test Coverage:** `verified / accepted` features, where accepted = built − rejected (rejected work never ships, so it is excluded from the denominator). Updated live as blocks complete.
5. **Explanatory Log:** Highlighted text (accent-bordered box) summarizing the sprint outcome and the reason the panel behaved that way.

---

## Conceptual Scenarios (QA vs. QE)

### Scenario A (The QA Bottleneck)
*   **Setup:** 3 developers to 1 QA.
*   **Flow:** Developers produce code. QA manually tests that code while developers wait. Developers then produce more code.
*   **The Problem:** The challenge is not just that more features are being built; it is that the amount of product that must be re-verified also grows. Human testing capacity stays roughly constant, so the system eventually hits a bottleneck.
*   **The Result:** Testing becomes a constraint on delivery. As the backlog grows, the team has to reduce coverage to the highest-risk paths, and bugs are more likely to escape to customers.

### Scenario B (The QE Automation Engine)
*   **Setup:** 3 developers to 1 QE.
*   **Flow:** Developers produce code. QE builds automated checks to cover it and runs them early in the pipeline so feedback is fast and continuous.
*   **The Solution:** As the product grows, the test suite grows with it. The check-in process becomes a scalable safety net rather than a fixed human bottleneck.
*   **The Result:** The project becomes more predictable. Quality feedback arrives quickly, releases can happen more confidently, and the team spends less time repeating manual regression work.

---

## Simulation Rules & Sprint Specifications

As sprints progress from 1 to 10, the volume of features built increases, simulating a growing team and codebase. The key assumption is that the manual model has fixed human throughput, while the automated model grows its verification capacity as the test suite expands.

| Sprint | Features Built (per lane) | QA Manual Capacity (per lane) | QE Automated Capacity (per lane) | Sprint Description / Visual Impact |
| :--- | :---: | :---: | :---: | :--- |
| **Sprint 1** | 3 | 3 | 3 | **QA:** Keeps pace. Manual regression covers all new features.<br>**QE:** Initial automation scripts created. CI/CD set up. Initial feedback loops in place |
| **Sprint 2** | 4 | 3 | 4 | **QA:** Codebase grows. QA manual regression takes longer. Stress builds.<br>**QE:** Automation handles regression. QE builds more scripts for new features. |
| **Sprint 3** | 5 | 3 | 5 | **QA:** Risk-based testing starts. Low-risk minor features are skipped.<br>**QE:** Automation reaches 60% coverage. All tests run on every commit. |
| **Sprint 4** | 6 | 3 | 6 | **QA:** Bottleneck starts. Manual testing cannot keep up.<br>**QE:** Tests run in parallel. Feedback loop completes in minutes. |
| **Sprint 5** | 7 | 3 | 7 | **QA:** Queue overflows. Some integration validations must be skipped to keep schedule.<br>**QE:** Automation hits 80%. QE works on test infrastructure. |
| **Sprint 6** | 8 | 3 | 8 | **QA:** Devs wait days for manual results. Feedback loops break. Product has bugs, users are disappointed.<br>**QE:** Continuous delivery enabled. Releases are stable and frequent. |
| **Sprint 7** | 9 | 3 | 9 | **QA:** Only critical path verified. Escaped bugs rise rapidly. Product has bugs, users are disappointed.<br>**QE:** No manual gatekeepers needed. Framework scales instantly. |
| **Sprint 8** | 10 | 3 | 10 | **QA:** QA overwhelmed. Bug fixes slow down as context is lost. Regressions appear in unusual places Product has bugs, users are disappointed.<br>**QE:** 100% of critical paths automated. Devs build quality in. |
| **Sprint 9** | 11 | 3 | 11 | **QA:** Testing quality drops. Production incidents rise. Product has bugs, users are disappointed.<br>**QE:** Capacity matches development growth. No friction. |
| **Sprint 10** | 13 | 3 | 13 | **QA:** Siloed model fails. High costs, slow releases, bugs in wild. Product has bugs, users are disappointed.<br>**QE:** Predictable, safe, scalable releases. Quality-driven culture. People sleep at night|

---

## Animation & State Machine

* **Code Blocks (`{ }`):**
  * Spawn on the left next to the developer icons and move rightward along the conveyor, building into the growing product. If work is rejected, the block bounces back to the developers for rework.
  * Use a staggered spawn delay (`index * 150ms`) to simulate development flow.
* **QA Belt Logic:**
  * Blocks move to the manual tester (`🕵️`).
  * The first 3 blocks are verified (turn green, fade out, and pop into the **Product band** as green blocks).
  * As the amount of regression work grows, the tester must split attention between new features and the existing product, so later blocks queue up.
  * Blocks 4+ turn red (skipped) and land in the **Product band as red blocks** — unchecked code that still ships to production. This increases the **Escaped Bugs** counter.
* **QE Belt Logic:**
  * Blocks move to the automation node (`🕵️` + `🤖`).
  * The automated test set grows alongside the product, so the system can keep verifying new work and regression risk without the same human bottleneck.
  * All blocks are processed rapidly, turn green, and pop into the **Product band** while the automation suite band continues to expand in step.
  * **Escaped Bugs** stays at **0**.
* **Autoplay:**
  * In `Timed` mode, the sprints run automatically from 1 to 10, with an `index * 2s` delay per sprint, so the full progression is visible without interaction.
