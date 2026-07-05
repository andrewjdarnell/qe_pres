# Quality Engineering vs. Quality Assurance Presentation Content

## Slide 1: Title Slide
* **Title:** Quality Engineering
* **Subtitle:** Evolving from finding bugs to building quality in.
* **Speaker:** Andrew Darnell, Principal Test Engineer

## Slide 2: The Traditional Approach: Quality Assurance (QA)
* **Concept:** Reactive testing at the end of the development cycle.
* **Key Points:**
  * Focuses on detecting defects *after* they are introduced.
  * Often a separate phase performed by a distinct, siloed team.
  * Heavy reliance on manual execution and repetitive tasks.
  * The unfortunate perception: "Quality is the QA team's responsibility."

## Slide 3: The Evolution: Quality Engineering (QE)
* **Concept:** Proactive integration of quality practices throughout the entire software development lifecycle.
* **Key Points:**
  * The same QA skills are reused, but instead of reviewing quality just once at the end, they are turned into continuous assurance.
  * Focuses on *preventing* defects and improving engineering processes.
  * Integrated directly into CI/CD pipelines for continuous feedback.
  * Empowers teams through automation, tooling, and measurable metrics.
  * Repetitive testing is done by machine, preserving human attention for more creative testing approaches.
  * The reality: "Quality is everyone's responsibility."

## Slide 4: Key Differences (The Shift in Mindset)
* **From QA:** Reactive finding of bugs -> **To QE:** Proactive mitigation of risk
* **From QA:** Manual Test Execution -> **To QE:** Test Automation & Infrastructure creation
* **From QA:** Siloed gatekeepers -> **To QE:** Embedded Quality Experts and enablers
* **From QA:** A bottleneck to release -> **To QE:** An accelerator for speed and scale

## Slide 5: Feedback Loops
* Building unit tests and other automated checks into the CI/CD pipeline gives fast feedback to developers and helps them produce better quality code.
* This short feedback loop is key to the success of QE and enables the team to move faster and with more confidence.
* This is often called "shifting left," but it isn't about pushing testing into development. It's about Quality Engineering working closely with Development to enable quality.
* Solid component and integration tests address the combinatorial complexity of the system and ensure that the system is being built on solid ground. This means that there is less need for extensive end-to-end tests.
* End-to-end tests are still important and should be used to validate that the system components work in concert and for critical business journeys, but they should not be relied upon for the bulk of the testing.

## Slide 6: The Scaling Problem vs. The Automation Engine (Interactive Visual)
* **Concept:** The scenarios play out over a number of sprints (10 for now) showing both scenarios side by side. This will need compact graphics with some text illustrating the points.
* **Scenario A (The QA Bottleneck):**
  * *Setup:* 5 developers to 1 QA.
  * *Flow:* Developers produce code. QA manually tests that code while developers wait. Developers then produce more code.
  * *The Problem:* The code builds up, aggregating into "the product". In successive releases, there is more product to test as the developers have built more code, but the QA still only has a fixed amount of bandwidth.
  * *The Result:* Testing becomes a bottleneck. Eventually, there is too much code to test, so QA reduces what they test to only the critical path (risk-based testing), leaving the customer to find the remaining bugs.
* **Scenario B (The QE Automation Engine):**
  * *Setup:* 5 developers to 1 QE.
  * *Flow:* Developers produce code. QE builds automated tests to cover it, embedding tests early in the pipeline so the feedback loop is direct and fast.
  * *The Solution:* As developers produce more code, QE produces more automated tests. QE does not become overwhelmed, and developers get immediate feedback.
  * *The Result:* The project becomes much more predictable. Early feedback leads to a shorter time to usable delivery for the customer.

## Slide 7: Why Make the Shift?
* **For the Business (Managers):** More predictable projects, faster time to market, higher confidence in releases, and lower long-term costs by finding bugs earlier (Shift-Left).
* **For the Team (QAs):** 
  * Let machines handle the scripted regression testing, freeing up your time.
  * Upskill into engineering.
  * Focus on writing higher-value tests and performing exploratory testing.
  * Build tools that empower the whole organization.

## Slide 8: Shared Skills & Shared Outcomes
* Both QA and QE require similar core competencies:
  * Analyzing specifications and requirements (explicit and implicit).
  * Analyzing potential risks and causes of failure.
  * Designing strategies to reduce those risks.
  * Managing, explaining, and communicating these risks and materialized issues (and their impact) to stakeholders.
* Understanding the likely impact of a change is difficult, which makes moving to manual risk-based testing early in the lifecycle a high-risk gamble.
* Automation empowers us to avoid making those compromises, giving us more confidence that the code we produce is of a high standard.
* We still prioritize our efforts, but we do so with significantly greater capacity.
* Automation acts as a force multiplier—like having a massive, parallel team executing high-value tests across all supported platforms.

## Slide 9: Debunking the "Automation is Too Expensive" Fallacy
* Our projects typically take between 6 to 36 months to develop, and run for at least 5 to 10 years in production.
* Assuming monthly releases, that is between 72 and 120 releases. The upfront cost of automation is paid back many times over in this timeframe.
* Every project we build means a lot to the people it serves. Life-changing decisions are made on the back of the information these systems provide.
* Given the impact of bugs escaping into the wild, we must protect our customers—our biggest asset.
* As an organisation, our risk appetite is near zero.

## Slide 10: First Line of Defence
* In traditional QA, we relied on manual judgment to decide what to test and what to skip due to time limits.
* With QE, the automation framework becomes the first line of defence, the last line of defence, and everything in between.
* *Guideline:* Identify where you are currently limiting your testing due to available effort or time. That is your next automation opportunity.

## Slide 11: Action Plan: How Do We Go About This?
* **Learn Automation Skills:** Python is a great place to start due to its rich library ecosystem. Browser E2E testing and API testing are bread and butter.
* **Master the Pipeline:** Get comfortable with the CI/CD pipeline and deployment environments.
* **Collaborate and Ask:** Reach out to colleagues who have made the transition—we are here to help each other grow.
* **Leverage AI:** Use AI to assist with writing scripts where appropriate, but maintain your critical thinking about what needs to be tested.
* **Think Big:** Ask yourself: *"If I had a team of 1,000 testers, what would I have them test?"* Automation gives you the tools to do exactly that.
* **Start Small:** Focus on what tests you can run right now to solve your immediate pain points.
* **Evaluate:** Constantly ask yourself: *"Are our feedback loops working?"*

## Slide 12: Call to Action
* **Headline:** Elevate Our Quality.
* **Action Items:** 
  * Join the **QE Guild** to upskill and share knowledge.
  * Learn to build unit tests, component tests, browser tests, API tests, and performance tests (we are here to help!).
  * Reach out to address that tricky automation problem you've been struggling with.

## Slide 13: Contact Information
* **Name:** Andrew Darnell
* **Role:** Principal Test Engineer
* **Contact:** Let's connect after the session!
