import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // All viewports set to scaled A0 Portrait: 1121 x 1585
  const viewport = { width: 1121, height: 1585 };
  await page.setViewport(viewport);

  // Poster 1: Infographic
  console.log('Capturing Poster 1...');
  await page.goto('http://localhost:5173/posters/poster_infographic.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'poster_infographic.png', fullPage: true });

  // Poster 2: Reference Matrix
  console.log('Capturing Poster 2...');
  await page.goto('http://localhost:5173/posters/poster_reference.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'poster_reference.png', fullPage: true });

  // Poster 3: Flow Diagram
  console.log('Capturing Poster 3...');
  await page.goto('http://localhost:5173/posters/poster_flow.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'poster_flow.png', fullPage: true });

  // Poster 4: Slide Array
  console.log('Capturing Poster 4 (Slide Array)...');
  await page.goto('http://localhost:5173/posters/poster_slides.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'poster_slides.png', fullPage: true });

  await browser.close();
  console.log('Done!');
})();
