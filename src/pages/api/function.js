import { VapiClient } from "@vapi-ai/web";
import formidable from "formidable";
import fs from "fs";

const client = new VapiClient({ token: "7a609915-e523-4156-ac74-a8212b7fa3be" });
export const config = {
   api: {
       bodyParser: false, // Disable body parsing to handle file uploads
   },
};
export async function handler(req, res) {
   if (req.method === 'POST') {
       const form = new formidable.IncomingForm();
       form.parse(req, async (err, fields, files) => {
           if (err) {
               return res.status(500).json({ error: 'Error parsing the file' });
           }
           const file = files.fileInput;
           try {
               const response = await client.files.create(fs.createReadStream(file.filepath));
               console.log(response);
               return res.status(200).json({ message: 'File uploaded successfully', url: response.url });
           } catch (error) {
               console.error("Error uploading file:", error);
               return res.status(500).json({ error: error.message });
           }
       });
   } else {
       res.setHeader('Allow', ['POST']);
       res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}
