# Quality Engineering vs. Quality Assurance Presentation Content

*For details on the design, colors, font, and autoplay mode controls, refer to [qe_aesthetics.md](qe_aesthetics.md).*

> **Restructure note (2026-07-15):** the deck was reworked from 15 to 14 slides — the old
> "Shared Skills and Shared Outcomes" slide was merged into Slide 2, and "The Economics of
> Automation" moved up to directly follow the scaling simulation. `index.html` still implements
> the previous 15-slide structure; syncing it to this document is a follow-up pass.

## Slide 1: Title Slide
* **Title:** Quality Engineering
* **Subtitle:** Building confidence throughout the delivery.
* **Speaker:** Andrew Darnell, Principal Test Engineer
* **Key message:** Quality is engineered into how we deliver — not inspected in at the end.

## Slide 2: Shared Foundations: What QA and QE Have in Common
* **Concept:** Both disciplines exist to reduce risk, protect the customer, and build confidence in the product.
* **Key Points:**
  * Both start from the same skills: understanding requirements, user behaviour, and business context.
  * Both identify risk and likely points of failure, and design practical strategies to reduce them.
  * Both rely on analysis, critical thinking, and communicating issues clearly to stakeholders.
  * Both aim to improve quality, not just detect defects.
  * Automation does not replace that judgment — it extends it, freeing capacity to test more thoroughly where it matters most.
* **Key message:** The difference is never the goal; it is the method, the timing, and the level of integration.

## Slide 3: The Traditional Approach: Quality Assurance (QA)
* **Concept:** Reactive testing at the end of the development cycle.
* **Key Points:**
  * Detects defects after they have been introduced, in a separate phase owned by a distinct team.
  * Relies heavily on manual execution and repetitive regression checks.
  * Feedback arrives late — when fixes are most expensive and developer context has been lost.
  * Fosters the perception that quality is "the QA team's responsibility."
* **Bridge (closing line):** This model can work — right up until delivery speed and product size start to scale.
* **Key message:** Testing at the end means learning about problems at the most expensive possible moment.

## Slide 4: The Evolution: Quality Engineering (QE)
* **Concept:** Proactive integration of quality practices throughout the software lifecycle.
* **Key Points:**
  * Applies the same core QA skills continuously, not only at the end.
  * Prevents defects by improving the engineering process itself.
  * Embeds quality checks into CI/CD pipelines, deployment workflows, and daily development habits.
  * Uses automation and data to deliver fast feedback and scale confidence.
  * Preserves human attention for exploratory testing, risk analysis, and high-value judgment.
* **Key message:** Same skills, new timing — quality becomes a property of the whole delivery system.

## Slide 5: Key Differences (The Shift in Mindset)
*The four shifts, aligned word-for-word with Poster 01:*
* **From QA:** Reactively finding bugs → **To QE:** Proactively mitigating risk
* **From QA:** Manual test execution → **To QE:** Automation & observability
* **From QA:** Siloed gatekeepers → **To QE:** Embedded quality enablers
* **From QA:** A bottleneck to release → **To QE:** An accelerator for speed & scale
* **Key message:** Same destination — protecting the customer — reached by a fundamentally different route.

## Slide 6: Feedback Loops and "Shifting Left"
* Fast feedback is essential: automated checks in CI/CD let developers learn quickly and correct issues before they grow.
* **Highlight — the cost of a late defect:** fixing in production can cost **~100× more** than catching the same issue at commit
  (relative cost by stage: commit 1× → code review 3× → CI build 6× → integration 15× → staging 40× → production 100×).
* Shifting left is about enabling better decisions, not simply moving test execution earlier.
* Strong unit, component, and integration tests reduce reliance on brittle end-to-end coverage.
* End-to-end tests remain essential — but reserved for critical journeys and system-wide validation.
* **Key message:** Every stage you shift left compounds the saving.

## Slide 7: The Scaling Problem vs. The Automation Engine
* **Concept:** A side-by-side interactive simulation demonstrating how manual testing capacity hits a wall as development speed scales, while automated quality engineering grows with the system.
* **Details:** See the full sprint specifications and interactive animations in [qe_interactive.md](qe_interactive.md).
* **Key message:** Manual capacity is fixed; an automated test suite grows with the product.

## Slide 8: The Economics of Automation (Debunking "Automation Is Too Expensive")
* Systems are built over years, run for years, and ship again and again — the upfront cost of automation is recovered many times over.
* The cost of defects escaping into production far exceeds the cost of building reliable checks early.
* In high-impact systems, risk appetite is often near zero and the cost of failure is unacceptable.
* **Highlight box — release maths over a 10-year system life** (styled as a small bar graph with the arithmetic shown alongside each bar):
  * Monthly releases, heavy-development phase: `2 yrs × 12` = **24**
  * Quarterly releases: `10 yrs × 4` = **40**
  * Daily dev & CI runs, heavy-development phase: `2 yrs × 220 working days` = **440**
  * Daily dev & test runs, maintenance phase: `8 yrs × 4 quarterly releases × 10 runs each` = **320**
  * **Total test-suite executions ≈ 824**
  * Closing question (bold, highlighted at the bottom of the box):
    **"Would you do something manually that you'll run over 800 times?"**
* **Key message:** Automation pays for itself — the maths answers the question.

## Slide 9: Why Make the Shift?
* **For the Business (Managers):**
  * More predictable projects and faster time to market.
  * Higher confidence in every release.
  * Lower long-term costs — defects found earlier (shift-left) and prevented proactively.
* **For the Team (QAs):**
  * Let machines handle the scripted regression testing — reclaim that time.
  * Upskill into engineering.
  * Focus on higher-value tests and exploratory testing.
  * Build tools that empower the whole organisation.
* **Key message:** The business gets speed and confidence; testers get better, more valuable work.

## Slide 10: First Line of Defence
* In traditional QA, manual judgment decides what to test — and what to skip — under time pressure.
* In QE, automation becomes the first line of defence, the last line of defence, and everything in between.
* **Guideline:** The testing you avoid today because of the effort and time it takes is your next automation target.
* **Key message:** If a check is worth doing, it is worth doing every time — and only automation makes that possible.

## Slide 11: Building Tests That Last
* The interesting part is not just building tests, but building them so they stay useful as the product changes.
* Good automation is resilient: designed for maintainability, clarity, and reuse — not just short-term success.
* A healthy suite grows with the product rather than collapsing under change.
* Don't automate everything immediately — build a durable foundation and extend it.
* **Key message:** A test suite is a product too; engineer it to last.

## Slide 12: Action Plan: How Do We Go About This?
*The six steps, aligned with Poster 04:*
* **Learn automation skills:** Python, browser automation, API testing, and solid test design.
* **Master the pipeline:** CI/CD practices, deployment environments, and observability.
* **Collaborate and ask:** Learn from colleagues who have already made the shift.
* **Leverage AI thoughtfully:** Use it to accelerate scripting while maintaining critical thinking.
* **Think big, start small:** Automate the highest-value checks first, then expand.
* **Evaluate continuously:** Are your feedback loops fast, useful, and actionable?
* **Key message:** Anyone can start today — pick the highest-value check and automate it.

## Slide 13: Call to Action
* **Headline:** Elevate Our Quality.
* **Action Items:**
  * Join the **QE Guild** to upskill and share knowledge.
  * Learn to build unit tests, component tests, browser tests, API tests, and performance tests (we are here to help!).
  * Reach out to address that tricky automation problem you've been struggling with.
* **Key message:** The shift to Quality Engineering is a team sport — and it starts now.

## Slide 14: Contact Information
* **Name:** Andrew Darnell
* **Role:** Principal Test Engineer
* **Contact:** Let's connect after the session!
