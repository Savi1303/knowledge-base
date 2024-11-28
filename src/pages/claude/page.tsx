"use client"

import { useState } from "react";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true,
});

const App = () => {
  // State to hold file input, API response, and loading state
  const [file, setFile] = useState<File | null>(null);
  const [convertedText, setConvertedText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Get the files
    if (files && files.length > 0) { // Check if files is not null and has at least one file
      setFile(files[0]);
    }
  };

  // Handle file processing and sending to Anthropic API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    setLoading(true);
    setConvertedText("");

    try {
      // Read the file content
      const fileContent = await readFileContent(file);
      
      // Send the file content to Anthropic API
      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1000,
        temperature: 0,
        system: "As a data conversion expert, your task is to convert data from different formats (JSON, XML, MP4, MP3, PDF, PNG, JPG etc.) into properly formatted TXT files. The user will provide the input data in the original format, along with any specific requirements or preferences for the TXT output (e.g., column order, delimiter, encoding, audio, docs). Ensure that you have a clear understanding of the data structure and the desired TXT format, asking any clarifying questions as needed. Once you have the necessary information, generate the TXT output by following the appropriate formatting rules, such as using commas as delimiters, enclosing values in quotes if necessary, and handling special characters or line breaks correctly. Finally, provide any additional instructions or tips for saving or using the TXT file.",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Please convert the following FILE data into a TXT file: \n\n${fileContent}`,
              },
            ],
          },
        ],
      });

      setConvertedText(message.toString());
    } catch (error) {
      console.error("Error during API call:", error);
      setConvertedText("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  // Function to read the content of the uploaded file
  const readFileContent = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file); // Assuming text file (JSON, XML, etc.)
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">File Conversion with Claude AI</h1>

        {/* Form to upload a file */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="block text-lg font-medium mb-2 text-gray-700">
            Upload File:
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".json,.xml,.txt,.mp4,.mp3,.pdf,.png,.jpg"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-400 rounded-md mb-4"
            required
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Processing..." : "Convert File"}
          </button>
        </form>

        {/* Display the converted text result */}
        {convertedText && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-md text-black">
            <h2 className="text-xl font-semibold mb-2">Converted Text:</h2>
            <pre className="whitespace-pre-wrap">{convertedText}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
