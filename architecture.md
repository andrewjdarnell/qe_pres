# Presentation Architecture & Design Decisions

This document captures the architectural implementation choices made for the Quality Engineering vs. Quality Assurance presentation. The goal is to provide a single source of truth for the codebase's structure to prevent architectural thrashing in future updates.

For visual design specifications, color palettes, and presentation timing requirements, refer to the [Aesthetics Specification](file:///Users/user/Documents/src/qe_pres/qe_aesthetics.md). For simulation business rules and numbers, refer to the [Interactive Simulation Specification](file:///Users/user/Documents/src/qe_pres/qe_interactive.md).

---

## 1. Core Technology Stack
*   **Build Tool:** [Vite](https://vitejs.dev/) is used for its fast Hot Module Replacement (HMR) and production bundling (`npm run build`).
*   **HTML/CSS:** Semantic HTML5 structure (using `<main>` for the presentation arena, `<section>` for slides, and standard ARIA attributes for accessibility) coupled with Vanilla CSS.
*   **JavaScript:** Vanilla ES Modules (`main.js`). The application has no external UI framework dependencies (like React or Vue), ensuring low overhead.
*   **Animation Library:** [GSAP](https://gsap.com/) is installed as a local npm dependency to manage complex, sequenced simulation timeline animations.

---

## 2. Responsive Scaling & Layout Architecture
To prevent elements from wrapping, breaking, or spilling over on different screens, we use a fixed-canvas layout that scales dynamically:

*   **Fixed Base Dimensions:** The core `#presentation` element is built on a hardcoded 16:9 box (`1280px` by `720px`). This acts as the design boundary.
*   **Scale Transform:** Inside `main.js`, a `resizePresentation` handler listens to the browser `resize` event. It calculates a scale ratio:
    $$\text{scale} = \min\left(\frac{\text{viewportWidth}}{1280}, \frac{\text{viewportHeight}}{720}\right)$$
    It applies this scale to `#presentation` using CSS `transform: scale()`.
*   **Presentation Wrapper:** A parent `#presentation-wrapper` centers `#presentation` vertically and horizontally in the viewport using CSS Flexbox.

---

## 3. Styles & Theming Architecture
The styling implements the visual tokens defined in [qe_aesthetics.md](file:///Users/user/Documents/src/qe_pres/qe_aesthetics.md) using a modern, maintainable CSS structure:

*   **CSS Variables:** Hex codes and transparency values are isolated as CSS Custom Properties in the `:root` block of `style.css` (e.g., `--accent-color`, `--glass-bg`). Any color updates should be performed *only* by altering these variables.
*   **Typography Assets:** Google Fonts imports (`Space Grotesk` and `Inter`) are declared in `index.html`. CSS files reference these fonts using CSS fallback hierarchies.
*   **Visual Enhancements:** 
    *   **Ambient Background:** Implemented via absolute background `.orb` elements with heavy CSS filters (`blur(80px)`) that drift slowly via CSS `@keyframes` animations.
    *   **Texture:** An inline SVG fractal noise filter is layered over the background via CSS `background-image` with low opacity to provide depth.
    *   **Glassmorphism:** Leverages CSS `backdrop-filter: blur(20px)` and semi-transparent border definitions.

---

## 4. Slide Navigation & Timing Engine
*   **State Tracking:** A `currentSlideIndex` integer inside `main.js` tracks the active slide.
*   **Transitions:** Transitions are triggered by adding/removing the `.active` class on slide elements. The visual entrance and exit animations are fully CSS-driven (opacity and transform properties) to keep presentation rendering hardware-accelerated.
*   **Autoplay Timing Loop:** 
    *   When Autoplay mode is active, `main.js` reads slide durations dynamically from a JS helper function (implementing the durations specified in [qe_aesthetics.md](file:///Users/user/Documents/src/qe_pres/qe_aesthetics.md)).
    *   Slide progression is triggered via a recursive `setTimeout` loop.
    *   The visual countdown is handled by resetting a CSS transition on `#timer-progress-bar`, setting its `transition` duration dynamically to match the active slide duration, and moving `width` to `100%`.

---

## 5. Sprint Simulation Architecture (Slide 6)
The interactive conveyor belt is implemented as a stateful, event-driven module in `main.js`:

*   **Data Models:** Sprint statistics and description logs are loaded from a static `sprintData` configuration object.
*   **GSAP Timeline Sequencing:** When a sprint is triggered, `main.js` dynamically creates DOM elements representing code blocks (`{ }`) and constructs a GSAP timeline (`gsap.timeline()`) for each. 
    *   *GSAP usage* avoids nesting timeouts and ensures that animations (moving to tester, blinking the tester icon, and final resolution) execute in a single, predictable sequence.
*   **Rework Loop (Bounce-back):** A random probability checker calculates if a block is rejected. If rejected, the GSAP timeline interpolates the block's `x` position *backwards* to the starting position before fading out.
*   **DOM Lifecycle Management:** To prevent memory leaks during long-running presentations, all dynamically generated block elements are completely removed from the DOM in the timeline's `onComplete` callback.
*   **Dynamic Stacking Math:** Product pile stacking calculates translation coordinates dynamically:
    ```javascript
    const x = (childCount % cols) * 6;
    const y = -Math.floor(childCount / cols) * 6;
    ```
    New blocks animate into these coordinates via a GSAP spring transition.
