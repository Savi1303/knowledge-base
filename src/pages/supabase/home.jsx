"use client";
import React from "react";
import { useEffect, useState} from "react";
import supabase from "./Config/supabase";

const Home = () => {
//   console.log(supabase)
    const [files, setPosts] = useState([])
    const [file, setPost] = useState({ file_name: "", file_url: "", vapi_id: "", openai_id: ""})
    const { file_name, file_url, vapi_id, openai_id } = file
    const [openFiles, setOpenFiles] = useState({});

    useEffect(() => {
        async function fetchPosts() {
            const { data } = await supabase.from("Knowledge_base").select()
            setPosts(data)
            // console.log("data:", data)   
        }
    fetchPosts();

    }, [])
    async function createPost() {
        await supabase
        .from("Knowledge_base")
        .insert([
            {file_name, file_url, vapi_id, openai_id}
        ])
        .single()
            setPost({ file_name: "", file_url: "", vapi_id: "", openai_id: ""})
      
    }
    
    return (
        <div className="text-center text-black">
            <input
                className="rounded-xl p-2 border-2 border-slate-900 ml-2"
                placeholder="File Name"
                value={file_name}
                onChange={e => setPost({ ...file, file_name: e.target.value })}
            />
              <input
              className="p-2 rounded-xl border-solid border-2 border-slate-900 mx-2"
                placeholder="File Url"
                value={file_url}
                onChange={e => setPost({ ...file, file_url: e.target.value })}
            />
                      <input
              className="p-2 rounded-xl border-solid border-2 border-slate-900 mx-2"
                placeholder="Vapi Id"
                value={vapi_id}
                onChange={e => setPost({ ...file, vapi_id: e.target.value })}
            />
                      <input
              className="p-2 rounded-xl border-solid border-2 border-slate-900 mx-2"
                placeholder="OpenAI Id"
                value={openai_id}
                onChange={e => setPost({ ...file, openai_id: e.target.value })}
            />
            {(  file_url === '' || file_name === '' ? <button className="bg-red-700 text-white font-bold py-2 px-4 rounded cursor-text"> Cannot create file</button>  : <button className="bg-blue-500 text-white font-bold p-2 px-4 rounded-2xl mx-2" onClick={createPost}>Create Post</button> )}
            {
                files.map(file => {
                    const isOpen = openFiles[file.id] || false;
                    return (
                        <div key={file.id} className="border-b border-gray-300">
                            <button 
                                className="flex justify-between items-center w-full p-4 text-left bg-gray-100 hover:bg-gray-200"
                                onClick={() => setOpenFiles({ ...openFiles, [file.id]: !isOpen })}
                            >
                                <h2 className="text-xl font-bold text-blue-600">{file.file_name}</h2>
                                <span className="text-gray-500">{isOpen ? '-' : '+'}</span>
                            </button>
                            {isOpen && (
                                <div className="pl-4 pb-2">
                                    <p className="text-gray-700">URL:{file.file_url}</p>
                                    <p className="text-gray-700">CONTENT:{file.file_content}</p>
                                    <p className="text-gray-600">VAPI ID:{file.vapi_id}</p>
                                    <p className="text-gray-600">OPENAI:{file.openai_id}</p>
                                </div>
                            )}
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Home; 