"use client";
// import VapiForm from '../pages/page';
import Vapi from '../pages/vapi/vapiUpload';
import VapiCall from '../pages/vapi/vapi-call';
import Claude from '../pages/claude/page';
import Retell from '../pages/retell/page';
import OpenAI from '../pages/openai/whisper';
import OpenURL from '../pages/openai/page';
// import Pup from '../pages/cheerio/page';
// import Anon from '../pages/supabase/anon';
import Homer from '../pages/supabase/home';

export default function Home() {
  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-white-800 text-center">AI Knowledge Base</h1>
      
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2 text-white-700">URL</h2>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => toggleDropdown('home')}>OpenAI URL</button>
          <div id="home" className="mt-2 hidden">
            <OpenURL />
            {/* <Anon /> */}
          </div>
        </div>
      </div>
      
      {/* Dropdown for File Upload */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2 text-white-700">File Upload</h2>
        <div className="mb-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => toggleDropdown('vapi')}>Vapi</button>
          <div id="vapi" className="mt-2 hidden">
            <Vapi />
            <VapiCall />
          </div>
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => toggleDropdown('retell')}>Retell</button>
          <div id="retell" className="mt-2 hidden">
            <Retell />
          </div>
        </div>
      </div>

            {/* Dropdown for Audio/Video Upload */}
            <div>
        <h2 className="text-2xl font-semibold mb-2 text-white-700">Audio/Video Upload</h2>
        <div className="mb-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => toggleDropdown('claude')}>Claude</button>
          <div id="claude" className="mt-2 hidden">
            <Claude />
          </div>
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => toggleDropdown('openai')}>OpenAI</button>
          <div id="openai" className="mt-2 hidden">
            <OpenAI />
          </div>
        </div>
      </div>

      {/* Dropdown for Supabase Files */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2 text-white-700">Supabase KB</h2>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => toggleDropdown('home')}>Home</button>
          <div id="home" className="mt-2 hidden">
            <Homer />
            {/* <Anon /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Function to toggle dropdown visibility
function toggleDropdown(id: string) {
  const dropdown = document.getElementById(id);
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
}
