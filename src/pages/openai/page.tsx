import { useState } from "react";
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true,
});

const App = () => {
  // State to hold user input and response
  const [imageURL, setImageURL] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert image URL to base64
      const base64Image = await convertToBase64(imageURL);

      // Check the length of the base64 image and truncate if necessary
      const maxImageLength = 5000; // Set a maximum length for the image data
      const truncatedImage = base64Image.length > maxImageLength ? base64Image.slice(0, maxImageLength) + '...' : base64Image;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "What’s in this image?" }, // Shortened prompt
              { type: "text", text: `![Image](${truncatedImage})` }, // Use truncated image
            ],
          },
        ],
      });

      setResponse(completion.choices[0].message.content);
    } catch (error) {
      console.error("Error during API call:", error);
      setResponse("An error occurred while fetching the response.");
    } finally {
      setLoading(false);
    }
  };

  // Function to convert image URL to base64
  const convertToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg border-2 border-purple-600">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Image Description with OpenAI</h1>
        
        {/* Form to input image URL */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="image-url" className="block text-lg font-medium mb-2 text-purple-600">
            Enter Image URL:
          </label>
          <input
            id="image-url"
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full p-3 border-2 border-purple-400 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            placeholder="https://example.com/image.jpg"
            required
          />

          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Processing..." : "Get Description"}
          </button>
        </form>

        {/* Display the response */}
        {response && (
          <div className="mt-6 p-4 bg-purple-100 border-2 border-purple-300 rounded-md text-black">
            <h2 className="text-xl font-semibold mb-2 text-purple-700">Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
