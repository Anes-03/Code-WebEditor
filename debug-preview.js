const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = 'file://' + require('path').resolve('index.html');
  await page.goto(filePath);
  await page.waitForTimeout(500);
  await page.click('#start-example-button');
  await page.waitForTimeout(500);
  const frame = page.frames().find((f) => f !== page.mainFrame());
  const srcdoc = await frame.evaluate(() => document.documentElement.outerHTML);
  console.log(srcdoc.split('\n').slice(700-5, 700+5).join('\n'));
  console.log('---');
  console.log(srcdoc.split('\n').slice(994-5, 994+5).join('\n'));
  await browser.close();
})();
