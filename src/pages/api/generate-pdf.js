/* eslint-disable @typescript-eslint/no-require-imports */
// pages/api/generate-pdf.js
const puppeteer = require('puppeteer');
// const path = require('path');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    try {
      // Launch the Puppeteer browser
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Navigate to the user-provided URL
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Set screen size for the PDF
      await page.setViewport({ width: 1480, height: 1400 });

      // Define the path to save the PDF
    //   const filePath = path.join(process.env.HOME || process.env.USERPROFILE, 'Downloads', 'output.pdf');
    const filePath = 'output.pdf';

      // Generate PDF and save it
      await page.pdf({ path: filePath });

      // Close the browser
      await browser.close();

      // Send a success response with the path to the PDF
      res.status(200).json({ message: 'PDF generated successfully', filePath });
    } catch (error) {
      res.status(500).json({ error: 'Error generating PDF', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
