"use client"

import { useState } from "react";
import OpenAI from "openai";
import supabase from "../supabase/Config/supabase";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true
});

const App = () => {
  // State to hold file, transcription result, and loading state
  const [File, setAudioFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ fileData, setFileData] = useState({ file_name: "", file_content: ""});


  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAudioFile(files[0]);
    }
  };



  // Handle form submission (file upload)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!File) {
      alert("Please select an audio/video file.");
      return;
    }

    setLoading(true);
    setTranscription(null);

    

    // Create a FormData object to send the file to the backend (assuming React frontend)
    const formData = new FormData();
    formData.append("file", File);

    try {
      // Using OpenAI's API to create the transcription
      const transcriptionResult = await openai.audio.transcriptions.create({
        file: File, // Directly pass the audio file
        model: "whisper-1",
      });

      setTranscription(transcriptionResult.text);
      await createPost(transcriptionResult.text);
    } catch (error) {
      console.error("Error during transcription:", error);
      setTranscription("An error occurred while processing the audio.");
    } finally {
      setLoading(false);
    }
  
};

async function createPost(transcriptionText: string) {
    await supabase
    .from("Knowledge_base")
    .insert([
        {
            file_name: 'openai[transcript].txt',
            file_content: transcriptionText,
            file_url: '',
        }
    ])
    .single();
    setFileData({ file_name: "", file_content: "" }); 
}
  

  // Function to download transcription as a text file
  const downloadTranscription = () => {
    if (!transcription) return;

    const blob = new Blob([transcription], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'openai[transcript].txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  };

  

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Audio/Video Transcription with OpenAI</h1>

        {/* Form to upload an audio file */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="file" className="block text-lg font-medium mb-2 text-blue-500">
            Upload File:
          </label>
          <input
            id="file"
            type="file"
            accept=".mp3,.mp4,.mpeg,.mpga,.m4a,.wav,.webm"
            onChange={handleFileChange}
            className="w-full p-3 border border-blue-400 rounded-md mb-4"
            required
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Transcribing..." : "Get Transcription"}
          </button>
        </form>

        {/* Display the transcription result */}
        {transcription && (
          <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-md text-black">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Transcription:</h2>
            <p className="text-black-500">{transcription}</p>
            <button
              onClick={downloadTranscription}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Download Transcription
            </button>
            <button
              onClick={() => createPost(transcription)}
              className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
            >
              Save Transcription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
