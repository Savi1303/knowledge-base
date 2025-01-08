"use client";
 import Vapi from "@vapi-ai/web";

const vapiCall = () => { 
    const vapi = new Vapi("fff6803c-ad0d-4206-916f-7c2adbd9b1e7");
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
                 <button className="bg-indigo-400 text-white px-4 py-2 rounded-md ml-3" onClick={() => vapi.start("eb0780ed-bc05-4c26-a8f8-ac589437b393")}>Start</button>
             </div>
        )
 }

 export default vapiCall

