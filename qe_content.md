# Quality Engineering vs. Quality Assurance Presentation Content

*For details on the design, colors, font, and autoplay mode controls, refer to [qe_aesthetics.md](qe_aesthetics.md).*

## Slide 1: Title Slide
* **Title:** Quality Engineering
* **Subtitle:** Building confidence throughout the delivery.
* **Speaker:** Andrew Darnell, Principal Test Engineer

## Slide 2: Shared Foundations: What QA and QE Have in Common
* **Concept:** Both disciplines exist to reduce risk, protect the customer, and build confidence in the product.
* **Key Points:**
  * Both start with understanding requirements, user needs, and likely failure modes.
  * Both use analysis, critical thinking, and communication to surface issues clearly.
  * Both aim to improve quality, not just detect defects.
  * The difference is not the goal; it is the method, timing, and level of integration.

## Slide 3: The Traditional Approach: Quality Assurance (QA)
* **Concept:** Reactive testing at the end of the development cycle.
* **Key Points:**
  * Focuses on detecting defects after they are introduced.
  * Often performed as a separate phase by a distinct team.
  * Heavy reliance on manual execution, repetitive checks, and late feedback.
  * The common perception is that quality is "the QA team's responsibility."

## Slide 4: The Evolution: Quality Engineering (QE)
* **Concept:** Proactive integration of quality practices throughout the software lifecycle.
* **Key Points:**
  * Reuses the same core QA skills, but applies them continuously rather than only at the end.
  * Focuses on preventing defects and improving engineering processes.
  * Embeds quality into CI/CD pipelines, deployment workflows, and development habits.
  * Uses automation and data to give fast feedback and scale confidence.
  * Preserves human attention for exploratory testing, risk analysis, and high-value judgment.

## Slide 5: Key Differences (The Shift in Mindset)
* **From QA:** Reactive finding of bugs -> **To QE:** Proactive mitigation of risk
* **From QA:** Manual test execution -> **To QE:** Automation, tooling, and observability
* **From QA:** Siloed gatekeepers -> **To QE:** Embedded quality experts and enablers
* **From QA:** Bottleneck to release -> **To QE:** Accelerator for speed, scale, and confidence

## Slide 6: Feedback Loops and "Shifting Left"
* Fast feedback is essential. Automated checks in CI/CD help developers learn quickly and correct issues before they grow.
* This is about enabling better decisions, not simply moving testing earlier.
* Strong component and integration tests reduce the need to rely on brittle end-to-end coverage for everything.
* End-to-end tests remain important for critical journeys and system-wide validation.

## Slide 7: The Scaling Problem vs. the Automation Engine
* **Concept:** A side-by-side visual demonstrating how manual testing capacity hits a wall as development speed scales, while automated quality engineering grows with the system.
* **Details:** See the full sprint specifications and interactive animations in [qe_interactive.md](qe_interactive.md).

## Slide 7: Why Make the Shift?
* **For the Business (Managers):** More predictable projects, faster time to market, higher confidence in releases, and lower long-term costs by finding bugs earlier (Shift-Left)nd proactive prevention of defects
* **For the Team (QAs):** 
  * Let machines handle the scripted regression testing, freeing up your time.
  * Upskill into engineering.
  * Focus on writing higher-value tests and performing exploratory testing.
  * Build tools that empower the whole organization.

## Slide 9: Shared Skills and Shared Outcomes
* Both QA and QE rely on:
  * Understanding requirements, user behavior, and business context
  * Identifying risk and likely points of failure
  * Designing practical strategies to reduce those risks
  * Communicating issues clearly to stakeholders
* Automation does not replace judgment; it extends it.
* With more capacity, teams can test more thoroughly and focus effort where it matters most.

## Slide 10: Debunking the "Automation Is Too Expensive" Fallacy
* Many systems are built over years to run for years and ship repeatedly, so the upfront cost of automation is recovered many many times over
* The cost of defects escaping into production is far greater than the cost of building reliable checks early.
* In high-impact systems, risk appetite is often near zero and the cost of failure is unacceptable.
[-- Highlight box - e.g. Build 2 x 12 monthly releases + 10 x 4 quarterly releases = 24 + 40 = 64 formal releases, and 2 x 220 daily dev and test releases --] 

## Slide 11: First Line of Defence
* In traditional QA, manual judgment often decides what to test and what to skip under time pressure.
* In QE, automation becomes the first line of defence, the last line of defence, and everything in between.
* **Guideline:** Identify the testing you currently avoid because of effort or time, and treat that as your next automation target.

## Slide 12: Building Tests That Last
* The interesting part is not just building tests, but building them in a way that they stay useful over time.
* Good automation is resilient: it adapts as the product changes, supports new scenarios, and avoids becoming brittle.
* Tests should be designed for maintainability, clarity, and reuse, not just short-term success.
* A healthy automation suite grows with the product rather than collapsing under change.
* The goal is not to automate everything immediately, but to create a durable foundation for future quality checks.

## Slide 13: Action Plan: How Do We Go About This?
* **Learn automation skills:** Python, browser automation, API testing, and test design.
* **Master the pipeline:** CI/CD practices, deployment environments, and observability.
* **Collaborate and ask:** Learn from colleagues who have already made the shift.
* **Leverage AI thoughtfully:** Use it to accelerate scripting while maintaining critical thinking.
* **Think big, start small:** Automate the highest-value checks first, then expand.
* **Evaluate continuously:** Ask whether your feedback loops are fast, useful, and actionable.

## Slide 14: Call to Action
* **Headline:** Elevate Our Quality.
* **Action Items:** 
  * Join the **QE Guild** to upskill and share knowledge.
  * Learn to build unit tests, component tests, browser tests, API tests, and performance tests (we are here to help!).
  * Reach out to address that tricky automation problem you've been struggling with.

## Slide 15: Contact Information
* **Name:** Andrew Darnell
* **Role:** Principal Test Engineer
* **Contact:** Let’s connect after the session!
