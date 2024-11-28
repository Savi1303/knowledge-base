"use client";
import React, { useState, useEffect } from "react";

const Index = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFileList = async () => {
            const url = "https://api.vapi.ai/file";
            const token = process.env.VAPI_PRIVATE_KEY;

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    console.log(`Failed to fetch files: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("API response:", data);
                if (data && Array.isArray(data)) {
                    setFiles(data); 
                } else {
                    console.log("Unexpected API response structure");
                }
            } catch (error) {
                console.error("Error fetching file list:", error);
                setError(`Failed to load files: ${error.message || error}`);
                setLoading(false); 
            } 
        };
    fetchFileList();  
    }, []);

    if (loading) {
        return <div className="text-center text-lg font-semibold">Loading files...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="bg-indigo-400 min-h-screen p-5">
            <h1 className="text-4xl font-bold text-white mb-4">File List</h1>
            <hr className="border-white mb-4" />
            {files.length === 0 ? (
                <p className="text-white text-lg">No files found.</p>
            ) : (
                files.map((file) => (
                    <div key={file.id} className="p-4 mb-4 bg-white rounded-lg shadow-md">
                        <div className="text-2xl font-semibold text-gray-800">{file.name}</div>
                        <h3 className="text-lg text-gray-600">{file.bucket}</h3>
                        <p className="text-gray-500">{file.url}</p>
                        <p className="text-gray-500">{file.mimetype}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Index;
