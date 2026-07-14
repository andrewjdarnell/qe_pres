import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set viewport to the presentation's 16:9 ratio
  await page.setViewport({ width: 1280, height: 720 });
  
  // Make sure assets/slides directory exists
  if (!fs.existsSync('assets')) fs.mkdirSync('assets');
  if (!fs.existsSync('assets/slides')) fs.mkdirSync('assets/slides');

  console.log('Navigating to presentation...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // There are 15 slides
  for (let i = 0; i < 15; i++) {
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

    await page.screenshot({ path: `assets/slides/slide_${i + 1}.png` });
  }

  await browser.close();
  console.log('All slides captured successfully!');
})();
