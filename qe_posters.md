# Quality Engineering Presentation - A0 Posters

This document outlines the rationale, design aesthetic, and generation instructions for the four A0 poster options created from the Quality Engineering presentation deck.

## 1. Design Rationale & Aesthetic

The goal was to adapt the core concepts from the Reveal.js presentation into high-impact, physical A0 portrait posters (`841mm x 1189mm`). Rather than directly printing the dark-themed slides, the posters were designed with a **premium, visually striking aesthetic** to capture attention in physical spaces (like a conference hall or engineering bullpen).

Key design decisions:
- **AI-Generated Artwork:** Each poster features a unique 8k abstract background generated specifically for its theme, moving away from flat CSS backgrounds.
- **Advanced Glassmorphism:** The content panels utilize strong background blur (`backdrop-filter: blur(40px)`), semi-transparent dark backgrounds, and subtle white inner-borders. This makes the text panels appear as frosted glass floating over the vivid artwork.
- **Custom CSS Typography:** Headlines utilize `Space Grotesk` with gradient text clipping, while body copy utilizes `Inter` for maximum readability at large print scales.

## 2. The Four Poster Options

### Option 1: The Shift-Left Infographic (`poster_infographic.html`)
- **Focus:** Tells the high-level story of moving from reactive Quality Assurance (QA) to proactive Quality Engineering (QE).
- **Design:** Uses a stacked vertical progression (QA Bottleneck -> Evolution Matrix -> QE Pipeline).
- **Background Art:** `assets/bg_infographic.png` (Glowing deep purple and neon blue mesh gradients representing a paradigm shift).

### Option 2: The Reference Matrix (`poster_reference.html`)
- **Focus:** Acts as a detailed cheat sheet for engineering teams, containing the full comparison matrix, feedback loop diagrams, and actionable upskilling checklists.
- **Design:** Dense, multi-column layout optimized for close-up reading.
- **Background Art:** `assets/bg_reference.png` (Teal and magenta neon data matrix visualization).

### Option 3: The Delivery Pipeline Flow (`poster_flow.html`)
- **Focus:** A massive, vertical flowchart visualizing the continuous testing pipeline from Code Commit to Production deployment.
- **Design:** Split top-to-bottom layout with a custom SVG viewBox grid (`0 0 800 1000`) ensuring the diagram scales perfectly to A0 height.
- **Background Art:** `assets/bg_flow.png` (Dark cyber aesthetic with glowing green and red circuitry pathways).

### Option 4: The Slide Array (`poster_slides.html`)
- **Focus:** Displays the entire presentation deck at a glance.
- **Design:** A 3x5 CSS Grid containing high-resolution screenshots of all 15 presentation slides.
- **Background Art:** `assets/bg_slides.png` (Clean, ethereal deep space aurora mesh gradient, providing a smooth backdrop that doesn't compete with the slide content).

---

## 3. How to Generate & Capture the Posters

The posters are built as standalone HTML files within the Vite project. To convert them into printable images, we utilize a headless browser script (Puppeteer) to render the DOM at the exact A0 pixel dimensions and capture full-page screenshots.

### Step 1: Start the Local Development Server
The scripts rely on the Vite server hosting the assets and HTML files.
```bash
npm run dev
```
*(Ensure it is running on `http://localhost:5173`)*

### Step 2: Capture the Presentation Slides (For Option 4)
If you update the content in `index.html`, you need to re-capture the 15 slide screenshots before generating the Option 4 poster.
Run the slide capture script:
```bash
node capture_slides.js
```
- This script navigates to the presentation, clicks through the navigation buttons, and saves 16:9 screenshots to `assets/slides/slide_1.png` through `slide_15.png`.

### Step 3: Render the A0 Posters
Once the server is running (and slides are captured if needed), run the master screenshot script:
```bash
node poster_screenshot.js
```
- This script loads each of the 4 poster HTML files at a scaled A0 Portrait viewport (`1121px x 1585px`).
- It outputs four high-resolution PNGs into the root directory:
  - `poster_infographic.png`
  - `poster_reference.png`
  - `poster_flow.png`
  - `poster_slides.png`

These final PNG files can then be sent to a commercial printer.
