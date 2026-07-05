# Interactive Slides: Sprint Timeline Simulation

This document specifies the behavior, metrics, and animation flow for the interactive sprint simulation featured on **Slide 6 (The Scaling Problem vs. The Automation Engine)**.

## Visual Design & Layout

The slide displays a side-by-side split comparison to contrast QA and QE scaling models under identical feature load increases over 10 sprints:

* **Left Panel:** QA Bottleneck (Manual Testing)
* **Right Panel:** QE Automation Engine (Continuous Testing)

Each panel contains:
1. **Conveyor Belt Board:** Visual lanes with developers (`👩‍💻`/`👨‍💻`) pushing features (code blocks `{ }`) towards a tester (`🕵️` manual, or `🤖` automation node).
2. **Dashboard Counter:**
   * **Built:** Cumulative features developed.
   * **Verified:** Cumulative features successfully verified.
   * **Escaped Bugs:** Cumulative features shipped to production untested due to bottleneck.
3. **Explanatory Log:** Text summarizing the sprint's outcome.

---

## Simulation Rules & Sprint Specifications

As Sprints progress from 1 to 10, the volume of features built increases, simulating a growing team/codebase.

| Sprint | Features Built (per lane) | QA Manual Capacity (per lane) | QE Automated Capacity (per lane) | Sprint Description / Visual Impact |
| :--- | :---: | :---: | :---: | :--- |
| **Sprint 1** | 3 | 3 | 3 | **QA:** Keeps pace. Manual regression covers all new features.<br>**QE:** Initial automation scripts created. Loops begin to form. |
| **Sprint 2** | 4 | 3 | 4 | **QA:** Codebase grows. QA manual regression takes longer. Stress builds.<br>**QE:** Automation handles regression. QE builds more scripts. |
| **Sprint 3** | 5 | 3 | 5 | **QA:** Risk-based testing starts. Minor features are skipped.<br>**QE:** Automation reaches 60% coverage. Tests run on every commit. |
| **Sprint 4** | 6 | 3 | 6 | **QA:** Bottleneck starts. Manual testing cannot keep up.<br>**QE:** Tests run in parallel. Feedback loop completes in minutes. |
| **Sprint 5** | 7 | 3 | 7 | **QA:** Queue overflows. Integration validations must be skipped.<br>**QE:** Automation hits 80%. QE works on test infrastructure. |
| **Sprint 6** | 8 | 3 | 8 | **QA:** Devs wait days for manual results. Feedback loops break.<br>**QE:** Continuous delivery enabled. Releases are stable and frequent. |
| **Sprint 7** | 9 | 3 | 9 | **QA:** Only critical path verified. Escaped bugs rise rapidly.<br>**QE:** No manual gatekeepers needed. Framework scales instantly. |
| **Sprint 8** | 10 | 3 | 10 | **QA:** QA overwhelmed. Bug fixes slow down as context is lost.<br>**QE:** 100% of critical paths automated. Devs build quality in. |
| **Sprint 9** | 11 | 3 | 11 | **QA:** Testing quality drops. Production incidents rise.<br>**QE:** Capacity matches development growth. No friction. |
| **Sprint 10** | 13 | 3 | 13 | **QA:** Siloed model fails. High costs, slow releases, bugs in wild.<br>**QE:** Predictable, safe, scalable releases. Quality-driven culture. |

---

## Animation & State Machine

* **Code Blocks (`{ }`):**
  * Span on left next to dev icons, and move rightward along the conveyor.
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
  * In `Timed` mode, the sprints automatically run sequentially from 1 to 10 (with a 2.5s delay per sprint) to show the full visual progression automatically.
