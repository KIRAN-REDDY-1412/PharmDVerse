const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/student/new-case/patient-counselling', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'screenshot_counselling.png' });
  await page.goto('http://localhost:5173/student/new-case/adr-reporting', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'screenshot_adr_fixed.png' });
  await browser.close();
})();
