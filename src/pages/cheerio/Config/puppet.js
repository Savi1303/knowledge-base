// eslint-disable-next-line @typescript-eslint/no-require-imports
const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://pptr.dev/next/guides/getting-started', { waitUntil: 'networkidle0', timeout: 30000});

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});
  let path = (process.env.HOME || process.env.USERPROFILE) + '/Downloads/hn.pdf';

  await page.pdf({
      path: path,
  });
  await browser.close();
})();