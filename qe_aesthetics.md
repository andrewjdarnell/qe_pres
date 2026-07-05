# Presentation Aesthetics & Look and Feel

This document details the visual style, typography, color palette, and user interface controls defined for the Quality Engineering vs. Quality Assurance presentation.

## Core Design Principles

### 1. Color Palette - Choosing option 2
* Option 1
*   **Background:** Premium Dark Mode (Obsidian / Deep Charcoal, `#0f1115`).
*   **Slide Containers:** Frosted Glass / Glassmorphism (`rgba(26, 29, 36, 0.75)`).
*   **Accent Color:** Vibrant Electric Purple (`#9d4edd`), representing modern automation and innovation. Used for headers, progress bars, glowing borders, active buttons, and key highlights.
*   **Status Colors:**
    *   **QA Bottleneck / Failures:** Alert Red (`#ef4444`).
    *   **QE Verification / Success:** Success Green (`#10b981`).
    *   **In-Progress / Warning:** Warning Amber (`#f59e0b`).
* Option 2
    *   **Background:** Premium Dark Mode (Obsidian / Deep Charcoal, `#0f1115`).
    *   **Slide Containers:** Frosted Glass / Glassmorphism (`rgba(26, 29, 36, 0.75)`).
    *   **Accent Color:** Deep Ocean Cyan (`#0ea5e9`), representing fluid data processing, architecture pathways, and programmatic flow. Used for core component blocks, data stream nodes, infrastructure boundaries, and primary system labels.
    *   **Status & Component Colors:**
        *   **Data Pipelines & Producers:** Streaming Purple (`#a855f7`). Used to highlight ingestion points, messaging queues, and upstream event streams.
        *   **External Integrations:** Webhook Orange (`#f97316`). Used for external API gateways, third-party syncs, and public-facing endpoints.
        *   **Active States / Healthy Nodes:** Vibrant Emerald (`#10b981`). Used to indicate healthy execution steps, verified paths, and successful automated microservices.
        *   **System Text & Outlines:** Crisp Silver/White (`#f8fafc`) for high-contrast typography, paired with Muted Slate (`#64748b`) for secondary structural connections and grid lines.


### 2. Typography
*   **Header Font:** **Space Grotesk** (imported from Google Fonts). A clean, geometric, tech-focused sans-serif font designed for headings.
*   **Body Font:** **Inter** (imported from Google Fonts). A highly legible, neutral sans-serif font optimized for UI elements and reading.
*   **Hierarchy:**
    *   **Slide Title (H1):** `3.2rem` with a white-to-cyan gradient (`linear-gradient(135deg, #ffffff 40%, #0ea5e9)`).
    *   **Section Header (H2):** `2.2rem` with a cyan left border accent (`5px solid`).
    *   **Body / List text:** `1.15rem` to `1.2rem` with high contrast for easy reading during presentations.

### 3. Glassmorphism UI & Motion
*   **Slide Cards:** Centralized card containers with semi-transparent backgrounds, subtle borders (`1px solid rgba(255, 255, 255, 0.08)`), and soft drop shadows to create multi-layered depth.
*   **Slide Transitions:** Card transitions use smooth slide-up and scale-in easing (fade from `0%` to `100%` opacity and scale up from `0.98` to `1.0`).
*   **Ambient Background:** Three colored, highly blurred background orbs (`#0ea5e9`, `#10b981`, `#a855f7`) drift slowly across the screen behind the slides. A static SVG noise texture overlay gives the dark background a premium textured finish.
*   **Fixed Aspect Ratio:** The content is designed to target a 16:9 canvas layout (`1280x720`) and scale dynamically to fit any viewport (projector, screen, or fallback 4:3 ratios) without wrapping or spilling over borders.

---

## Interactive & Timing Controls

Located in the bottom-right corner of the viewport, the presentation controls allow toggling between two display modes:

### 1. Manual Mode (Default)
*   Slides advance only on user input.
*   **Controls:** 
    *   Keyboard: `ArrowRight` or `Space` to go forward; `ArrowLeft` or `Backspace` to go back.
    *   Click: Click the right half of the screen to go forward, left half to go back.

### 2. Timed Mode (Autoplay)
*   Slides advance automatically based on custom durations:
    *   **Slide 6 (Sprint Simulation):** 60 seconds (allows full simulation to play out).
    *   **Slide 13 (Contact Slide):** 30 seconds (before looping back to Slide 1).
    *   **All other slides:** 20 seconds.
*   **Visual Indicator:** A thin, high-contrast cyan progress bar at the very top of the viewport (`#timer-progress-bar`) animates from `0%` to `100%` over the duration of the current slide.
*   **Auto-Loop:** After the timer on Slide 13 expires, the presentation automatically cycles back to Slide 1.
*   **Manual Override:** Navigating manually while in Timed mode resets the active timer.
