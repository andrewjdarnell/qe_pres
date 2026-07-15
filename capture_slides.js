import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set viewport to the presentation's 16:9 ratio
  await page.setViewport({ width: 1280, height: 720 });
  
  // Make sure the output directory exists
  fs.mkdirSync('assets/slides', { recursive: true });

  console.log('Navigating to presentation...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  const slideCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log(`Found ${slideCount} slides.`);
  for (let i = 0; i < slideCount; i++) {
    console.log(`Capturing slide ${i + 1}...`);
    
    // Click the nav button to jump directly to the slide
    await page.evaluate((index) => {
      const btns = document.querySelectorAll('.slide-nav-btn');
      if (btns && btns[index]) {
        btns[index].click();
      }
    }, i);

    // Wait for the CSS transition to complete (0.5s transition time)
    await new Promise(resolve => setTimeout(resolve, 800));

    const slideNum = String(i + 1).padStart(2, '0');
    await page.screenshot({ path: `assets/slides/slide_${slideNum}.png` });
  }

  await browser.close();
  console.log('All slides captured successfully!');
})();
