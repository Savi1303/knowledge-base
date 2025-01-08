"use client"
// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cheerio = require('cheerio');
import { useState } from 'react';

interface ScreenshotComponentProps {
  url: string;
}


const ScreenshotComponent: React.FC<ScreenshotComponentProps> = ({ url }) => {
  const [, setScreenshotUrl] = useState('');

  const fetchData = async () => {
    try{
      const res = await axios.get(url)
      const $ = await cheerio.load(res.data);
      $(
        "#__docusaurus_skipToContent_fallback > div > div > main > div > div > div > div > article"
      )
    } catch (error) {
      console.log(error)
    } 
    const newScreenshotUrl = '...'; // Replace this with the actual URL you get
    setScreenshotUrl(newScreenshotUrl);
  }; fetchData();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setScreenshotUrl(e.target.value)}
        className="px-3 py-2 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      />
      <button 
        onClick={fetchData} 
        className="mt-5 px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-700"
      >
        Take Screenshot
      </button>
    </div>
  );

}

export default ScreenshotComponent;