import puppeteer from 'puppeteer';
import fs from 'fs';
import { PNG } from 'pngjs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, 'generated/posters');
fs.mkdirSync(OUT_DIR, { recursive: true });

// A0 portrait at 300dpi: 841mm x 1189mm => 9934 x 14044 px.
// We render the body at its physical mm size and capture full page.
const posters = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['poster_1_shift', 'poster_2_shiftleft', 'poster_3_roi', 'poster_4_action', 'poster_5_slides'];

// Output resolution, settable via POSTER_DPI (default 300 — print-ready).
// CSS renders at 96 dpi, so the capture scale is dpi/96.
const DPI = Number(process.env.POSTER_DPI) || 300;
const SCALE = DPI / 96;

// A single ~140-megapixel capture exceeds Chromium's raster surface limits
// (black patches / truncated output), so capture in viewport-sized horizontal
// tiles by scrolling, then stitch the tiles into one PNG.
const TILE_CSS_HEIGHT = 1200;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--force-color-profile=srgb'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1700, deviceScaleFactor: 1 });

  for (const name of posters) {
    const file = 'file://' + resolve(__dirname, 'posters', `${name}.html`);
    console.log(`Rendering ${name} at ${DPI} dpi`);
    await page.goto(file, { waitUntil: 'networkidle0' });
    await page.evaluate(async () => { await document.fonts.ready; });
    await new Promise(r => setTimeout(r, 400));

    // The body is a fixed A0 box (841 x 1189 mm). Its rendered CSS-pixel box
    // defines the capture area, so every poster comes out at an identical,
    // true-A0 aspect ratio.
    const box = await page.evaluate(() => {
      const r = document.body.getBoundingClientRect();
      return { width: Math.round(r.width), height: Math.round(r.height) };
    });

    await page.setViewport({ width: box.width, height: TILE_CSS_HEIGHT, deviceScaleFactor: SCALE });

    const tiles = [];
    for (let cssY = 0; cssY < box.height; cssY += TILE_CSS_HEIGHT) {
      const scrollY = await page.evaluate(y => {
        window.scrollTo(0, y);
        return window.scrollY; // clamped on the last tile
      }, cssY);
      await new Promise(r => setTimeout(r, 150));
      const buf = await page.screenshot({ captureBeyondViewport: false });
      tiles.push({ png: PNG.sync.read(Buffer.from(buf)), scrollY });
      if (scrollY < cssY) break; // reached the bottom
    }

    const width = tiles[0].png.width;
    const height = Math.round(box.height * SCALE);
    const out = new PNG({ width, height });
    for (const { png, scrollY } of tiles) {
      const destY = Math.round(scrollY * SCALE);
      const rows = Math.min(png.height, height - destY);
      png.data.copy(out.data, destY * width * 4, 0, rows * width * 4);
    }
    fs.writeFileSync(resolve(OUT_DIR, `${name}.png`), PNG.sync.write(out));
  }

  await browser.close();
  console.log('Done.');
})();
