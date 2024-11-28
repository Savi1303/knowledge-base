"use client";

import React from "react";
import supabase from "./Config/supabase.js";
import { useEffect, useState } from "react";
import FileCard from "./Components/fileCard.js"; 

 const Anon = () => { 
    const [fetchError, setFetchError] = useState(null)
    const [files, setFiles] = useState(null)
    useEffect(() => {
        const fetchFiles = async () => {
            const { data, error } = await supabase
            .from('files')
            .select()
            
            if (error) {
                setFetchError("Couldn't fetch data")
                setFiles(null)
                console.log(error)
            }
             if (data) {
                setFiles(data)
                setFetchError(null)
            }
        }
        fetchFiles();
    }, [])

    return(
        <div>
            {fetchError && (<p>{fetchError}</p>)}
            {files && (
                <div>
                    {files.map(File => (
                        <FileCard key={File.id} File={File} />
                    ))}
                </div>
            )}
        </div>
    )
  }

  export default Anon
