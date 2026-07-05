# Interactive Slides: Sprint Timeline Simulation

This document specifies the behavior, metrics, and animation flow for the interactive sprint simulation featured on **Slide 6 (The Scaling Problem vs. The Automation Engine)**.

## Visual Design & Layout

The slide displays a side-by-side split comparison to contrast QA and QE scaling models under identical feature load increases over 10 sprints:

* **Left Panel:** QA Bottleneck (Manual Testing)
* **Right Panel:** QE Automation Engine (Continuous Testing)

Each panel contains:
1. **Conveyor Belt Board:** Visual lanes with developers (`👩‍💻`/`👨‍💻`) pushing features (code blocks `{ }`) towards a tester (`🕵️` manual, or `🤖` automation node).
2. **Dashboard Counter:**
   * **Built:** Cumulative features developed. This is demonstrated by a 'product' block growing larger as the sprints progress as a result of the new dev work being added to the conveyor belt.
   * **Verified:** Cumulative features successfully verified. This is demonstrated by a 'Verified' block turning from red to green and the product getting larger as the sprints progress as a result of the manual or automated verification of features.
   * **Escaped Bugs:** Cumulative features shipped to production untested due to bottleneck. This is demonstrated by an 'Escaped Bugs' block growing larger as the sprints progress. Escaped bugs stay red as they are added to the product.
   * **Rejected Work:** If work is reviewed and rejected (25% chance), it is sent back for rework rather than being added to the product. Visually, the block turns amber and passes back to the devs.
3. **Explanatory Log:** Text summarizing the sprint's outcome.

---

## Conceptual Scenarios (QA vs. QE)

### Scenario A (The QA Bottleneck)
*   **Setup:** 5 developers to 1 QA.
*   **Flow:** Developers produce code. QA manually tests that code while developers wait. Developers then produce more code.
*   **The Problem:** The code builds up, aggregating into "the product". In successive releases, there is more product to test as the developers have built more code, but the QA still only has a fixed amount of bandwidth.
*   **The Result:** Testing becomes a bottleneck. Eventually, there is too much code to test, so QA reduces what they test to only the critical path (risk-based testing), leaving the customer to find the remaining bugs.

### Scenario B (The QE Automation Engine)
*   **Setup:** 5 developers to 1 QE.
*   **Flow:** Developers produce code. QE builds automated tests to cover it, embedding tests early in the pipeline so the feedback loop is direct and fast.
*   **The Solution:** As developers produce more code, QE produces more automated tests. QE does not become overwhelmed, and developers get immediate feedback.
*   **The Result:** The project becomes much more predictable. Early feedback leads to a shorter time to usable delivery for the customer.

---

## Simulation Rules & Sprint Specifications

As Sprints progress from 1 to 10, the volume of features built increases, simulating a growing team/codebase.

| Sprint | Features Built (per lane) | QA Manual Capacity (per lane) | QE Automated Capacity (per lane) | Sprint Description / Visual Impact |
| :--- | :---: | :---: | :---: | :--- |
| **Sprint 1** | 3 | 3 | 3 | **QA:** Keeps pace. Manual regression covers all new features.<br>**QE:** Initial automation scripts created. CI/CD set up. Initial feedback loops in place |
| **Sprint 2** | 4 | 3 | 4 | **QA:** Codebase grows. QA manual regression takes longer. Stress builds.<br>**QE:** Automation handles regression. QE builds more scripts for new features. |
| **Sprint 3** | 5 | 3 | 5 | **QA:** Risk-based testing starts. Minor features low risk features are skipped.<br>**QE:** Automation reaches 60% coverage. All tests run on every commit. |
| **Sprint 4** | 6 | 3 | 6 | **QA:** Bottleneck starts. Manual testing cannot keep up.<br>**QE:** Tests run in parallel. Feedback loop completes in minutes. |
| **Sprint 5** | 7 | 3 | 7 | **QA:** Queue overflows. Some integration validations must be skipped to keep schedule.<br>**QE:** Automation hits 80%. QE works on test infrastructure. |
| **Sprint 6** | 8 | 3 | 8 | **QA:** Devs wait days for manual results. Feedback loops break.<br>**QE:** Continuous delivery enabled. Releases are stable and frequent. |
| **Sprint 7** | 9 | 3 | 9 | **QA:** Only critical path verified. Escaped bugs rise rapidly.<br>**QE:** No manual gatekeepers needed. Framework scales instantly. |
| **Sprint 8** | 10 | 3 | 10 | **QA:** QA overwhelmed. Bug fixes slow down as context is lost. Regressions appear in unusual places<br>**QE:** 100% of critical paths automated. Devs build quality in. |
| **Sprint 9** | 11 | 3 | 11 | **QA:** Testing quality drops. Production incidents rise.<br>**QE:** Capacity matches development growth. No friction. |
| **Sprint 10** | 13 | 3 | 13 | **QA:** Siloed model fails. High costs, slow releases, bugs in wild.<br>**QE:** Predictable, safe, scalable releases. Quality-driven culture. People sleep at night|

---

## Animation & State Machine

* **Code Blocks (`{ }`):**
  * Span on left next to dev icons, and move rightward along the conveyor building into the growing product bouncing back to the devs if rework is needed
  * Staggered spawn delay (`index * 150ms`) to simulate development flow.
* **QA Belt Logic:**
  * Blocks move to the manual tester (`🕵️`).
  * The first 3 blocks are verified (turn green, fade out).
  * Blocks 4+ turn amber (queued), then turn red (skipped) and slide off the right edge of the screen, representing unchecked code releasing to production. This increments the **Escaped Bugs** counter.
* **QE Belt Logic:**
  * Blocks move to the automation node (`🤖`).
  * Automation scales instantly to match count. All blocks are processed rapidly, turn green, and fade out.
  * **Escaped Bugs** remains at **0**.
* **Autoplay:**
  * In `Timed` mode, the sprints automatically run sequentially from 1 to 10 (with a .5s delay per sprint) to show the full visual progression automatically.
