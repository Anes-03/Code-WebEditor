const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = 'file://' + require('path').resolve('index.html');
  await page.goto(filePath);
  await page.waitForTimeout(300);
  await page.click('#start-example-button');
  await page.waitForTimeout(500);
  const frame = page.frames().find((f) => f !== page.mainFrame());
  const srcdoc = await frame.evaluate(() => document.documentElement.outerHTML);
  fs.writeFileSync('compiled-preview.html', srcdoc, 'utf8');
  await browser.close();
})();
