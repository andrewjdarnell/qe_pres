import puppeteer from 'puppeteer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, 'generated/posters');
fs.mkdirSync(OUT_DIR, { recursive: true });

// A0 portrait at 300dpi: 841mm x 1189mm => 9933 x 14043 px.
// We render the body at its physical mm size and capture full page.
const posters = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['poster_1_shift', 'poster_2_shiftleft', 'poster_3_roi', 'poster_4_action', 'poster_5_slides'];

// 300 dpi: CSS renders at 96 dpi, so scale by 300/96.
const SCALE = 300 / 96;

(async () => {
  // Software rendering: GPU raster produces black patches / truncated output
  // at 300 dpi surface sizes (~9934 x 14043 px).
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--force-color-profile=srgb', '--disable-gpu', '--use-angle=swiftshader'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1700, deviceScaleFactor: SCALE });

  for (const name of posters) {
    const file = 'file://' + resolve(__dirname, 'posters', `${name}.html`);
    console.log('Rendering', name);
    await page.goto(file, { waitUntil: 'networkidle0' });
    await page.evaluate(async () => { await document.fonts.ready; });
    await new Promise(r => setTimeout(r, 400));

    // The body is a fixed A0 box (841 x 1189 mm). Clip to its exact rendered
    // box so every poster comes out at an identical, true-A0 aspect ratio
    // (fullPage would otherwise include sub-pixel overflow from the glows).
    const box = await page.evaluate(() => {
      const r = document.body.getBoundingClientRect();
      return { width: Math.round(r.width), height: Math.round(r.height) };
    });
    await page.setViewport({ width: box.width, height: box.height, deviceScaleFactor: SCALE });
    await page.screenshot({
      path: resolve(OUT_DIR, `${name}.png`),
      clip: { x: 0, y: 0, width: box.width, height: box.height },
    });
  }

  await browser.close();
  console.log('Done.');
})();
