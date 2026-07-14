import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  const targetSlides = [1, 2, 4, 6, 7, 10, 11, 12];
  let currentSlide = 1;
  
  // Wait a bit for initial render
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `slide_1.png` });
  
  while (currentSlide < 12) {
    await page.keyboard.press('ArrowRight');
    currentSlide++;
    await new Promise(r => setTimeout(r, 600)); // wait for transition
    if (targetSlides.includes(currentSlide)) {
      await page.screenshot({ path: `slide_${currentSlide}.png` });
    }
  }
  
  await browser.close();
})();
