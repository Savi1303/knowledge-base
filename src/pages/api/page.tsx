"use client";

import { useState } from 'react';
import { uploadFile } from './upload.js';

export default function UploadPage() {
    const [output, setOutput] = useState('');

    const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       const file = (event.target as HTMLFormElement).fileInput.files[0];
        if (!file) {
           setOutput('<div>Please select a file to upload.</div>');
           return;
       }
        try {
           const result = await uploadFile(file);
           setOutput(result);
       } catch (error: unknown) {
           if (error instanceof Error) {
               setOutput(`<div>Error uploading file: ${error.message}</div>`);
           } else {
               setOutput(`<div>An unknown error occurred.</div>`);
           }
       }
   };
    return (
       <div>
           <h1>Upload File</h1>
           <form onSubmit={handleUpload}>
               <label htmlFor="fileInput">Choose a file:</label>
               <input type="file" name="fileInput" id="fileInput" />
               <button type="submit">Upload</button>
           </form>
           <div dangerouslySetInnerHTML={{ __html: output }} />
       </div>
   );
}