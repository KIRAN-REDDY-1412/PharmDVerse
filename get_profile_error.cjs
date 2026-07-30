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
  await page.goto('http://localhost:5173/student/new-case/patient-profile', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'screenshot_profile.png' });
  await browser.close();
})();
