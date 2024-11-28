import { useState } from 'react';
import puppeteer from 'puppeteer';

const PuppeteerScreenshot = () => {
  const [url, setUrl] = useState('');

  const handleScreenshot = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: 'openai.png' });
    await browser.close();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleScreenshot}>Take Screenshot</button>
    </div>
  );
};

export default PuppeteerScreenshot;