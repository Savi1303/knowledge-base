"use client";
 import Vapi from "@vapi-ai/web";

const vapiCall = () => { 
    const vapi = new Vapi("359c9dd5-f36e-41d9-bf16-45c4c584602d");
    // const assistantOverrides = {
//       transcriber: {
//         provider: "deepgram",
//         model: "nova-2",
//         language: "en-US",
//       },
//       recordingEnabled: false,
//       variableValues: {
//         name: "John",
//       },
//     };
//      vapi.start("cc966f41-dba5-4fb8-a186-0dbb9486d8fc");

    return(
             <div> Make a Call
                 <button className="bg-indigo-400 text-white px-4 py-2 rounded-md ml-3" onClick={() => vapi.start("cc966f41-dba5-4fb8-a186-0dbb9486d8fc")}>Start</button>
             </div>
        )
 }

 export default vapiCall
