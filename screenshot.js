import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  fs.mkdirSync('assets/slides', { recursive: true });
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  const targetSlides = Array.from({ length: 15 }, (_, i) => i + 1);
  let currentSlide = 1;

  // Wait a bit for initial render
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `assets/slides/slide_01.png` });

  while (currentSlide < 15) {
    await page.keyboard.press('ArrowRight');
    currentSlide++;
    await new Promise(r => setTimeout(r, 600)); // wait for transition
    if (targetSlides.includes(currentSlide)) {
      const slideNum = String(currentSlide).padStart(2, '0');
      await page.screenshot({ path: `assets/slides/slide_${slideNum}.png` });
    }
  }
  
  await browser.close();
})();
