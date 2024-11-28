"use client"
import { useState} from "react";
import supabase from "../supabase/Config/supabase";


export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [fileData, setFileData] = useState({ file_name: "", file_url: "", vapi_id: ""});

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

    async function createPost() {
        await supabase
        .from("Knowledge_base")
        .insert([
            {file_name: fileData.file_name, file_url: fileData.file_url, vapi_id: fileData.vapi_id }
        ])
        .single()
            setFileData({ file_name: "", file_url: "", vapi_id: "" }) 
  }
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if file is selected
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const token = process.env.NEXT_PUBLIC_SAVI_VAPI_KEY;
  
    console.log(token)

    try {
      const res = await fetch("https://api.vapi.ai/file", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await res.json();
      setResponse(data);
      console.log(data);

      // Save name, id, and url to a text file
      const { name, id, url } = data; // Assuming these fields exist in the response
      const fileContent = `Name: ${name}\nID: ${id}\nURL: ${url}\n`;
      
      // Create a blob and download the file
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Vapi_${name}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Update file data from response
      setFileData({
          file_name: data.name, // Connect name to file_name
          file_url: data.url,   // Connect url to file_url
          vapi_id: data.id      // Connect id to vapi_id
      });

    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: error.message });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Upload File to VAPI AI</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">Choose a file:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="rounded-lg bg-blue-500 text-white p-2 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">Upload</button>
      </form>

      {response && (
        <div>
          <h3 className="text-lg font-semibold text-green-600">Response:</h3>
          <div className="border border-gray-300 p-4 rounded-lg bg-green-200">
            <pre className="whitespace-pre-wrap text-blue-800">{JSON.stringify(response, null, 2)}</pre>
          </div>
          <button 
              onClick={createPost} 
              className="mt-4 rounded-lg bg-green-500 text-white p-2 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
              Save to Supabase
          </button>
        </div>
      )}
    </div>
  );
}
