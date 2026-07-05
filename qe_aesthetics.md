# Presentation Aesthetics & Look and Feel

This document details the visual style, typography, color palette, and user interface controls implemented for the Quality Engineering vs. Quality Assurance presentation.

## Core Design Principles

### 1. Color Palette
* **Background:** Premium Dark Mode (Obsidian / Deep Charcoal, `#0f1115`).
* **Slide Containers:** Frosted Glass / Glassmorphism (`rgba(26, 29, 36, 0.75)`).
* **Accent Color:** Vibrant Electric Purple (`#9d4edd`), representing modern automation and innovation. Used for headers, progress bars, glowing borders, active buttons, and key highlights.
* **Status Colors:**
  * **QA Bottleneck / Failures:** Alert Red (`#ef4444`).
  * **QE Verification / Success:** Success Green (`#10b981`).
  * **In-Progress / Warning:** Warning Amber (`#f59e0b`).

### 2. Typography
* **Font Family:** **Inter** (imported from Google Fonts). A clean, geometric, high-readability sans-serif font designed for screens.
* **Hierarchy:**
  * **Slide Title (H1):** `3.2rem` with a white-to-purple gradient (`linear-gradient(135deg, #ffffff 40%, #9d4edd)`).
  * **Section Header (H2):** `2.2rem` with an electric purple left border accent (`5px solid`).
  * **Body / List text:** `1.15rem` to `1.2rem` with high contrast for easy reading during presentations.

### 3. Glassmorphism UI
* Slides are structured inside a centralized card container with semi-transparent backgrounds, subtle borders (`1px solid rgba(255, 255, 255, 0.08)`), and soft drop shadows to create a multi-layered depth.
* **Transitions:** Card transitions use smooth, hardware-accelerated CSS scaling and fading:
  ```css
  transform: translateY(20px) scale(0.98);
  opacity: 0;
  /* Transitions to */
  transform: translateY(0) scale(1);
  opacity: 1;
  ```

---

## Interactive & Timing Controls

Located in the bottom-right corner of the viewport, the presentation controls allow toggling between two display modes:

### 1. Manual Mode (Default)
* Slides advance only on user input.
* **Controls:** 
  * Keyboard: `ArrowRight` or `Space` to go forward; `ArrowLeft` or `Backspace` to go back.
  * Click: Click the right half of the screen to go forward, left half to go back.

### 2. Timed Mode (Autoplay)
* Slides advance automatically based on custom durations:
  * **Slide 6 (Sprint Simulation):** 60 seconds (allows full simulation to play out).
  * **Slide 13 (Contact Slide):** 30 seconds (before looping back to Slide 1).
  * **All other slides:** 20 seconds.
* **Visual Indicator:** A thin, high-contrast purple progress bar at the very top of the viewport (`#timer-progress-bar`) animates from `0%` to `100%` over the duration of the current slide.
* **Auto-Loop:** After the timer on Slide 13 expires, the presentation automatically cycles back to Slide 1.
* **Manual Override:** Navigating manually while in Timed mode resets the active timer.
