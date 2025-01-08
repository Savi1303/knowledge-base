
// import { VapiClient } from "@vapi/server-sdk";

// const client = new VapiClient({ token: "YOUR_TOKEN" });
// await client.calls.create();



// // // Create Call (POST /call)
// const response = await fetch("https://api.vapi.ai/call", {
//     method: "POST",
//     headers: {
//       "Authorization": "Bearer 7a609915-e523-4156-ac74-a8212b7fa3be",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       "name": "user call",
//       "type": "outboundPhoneCall",
//       "assistant": {
//         "clientMessages": [
//           "conversation-update",
//           "tool-calls",
//           "hang",
//           "function-call",
//           "tool-calls-result"
//         ],
//         "firstMessageMode": "assistant-speaks-first-with-model-generated-message",
//         "serverMessages": [
//           "conversation-update"
//         ],
//         "firstMessage": "This is Camie AI, how can we help you today",
//         "endCallMessage": "Thank you for your time and have a good day",
//         "messagePlan": {
//           "idleMessages": [
//             "Hello, are you still there.................",
//             "Sorry, can you repeat that ",
//             "I apologize for the inconvenience but I'm having trouble understanding you"
//           ],
//           "idleMessageMaxSpokenCount": 3,
//           "idleTimeoutSeconds": 3
//         },
//         "backgroundSound": "office",
//         "backgroundDenoisingEnabled": true,
//         "transportConfigurations": [],
//         "name": "",
//         "endCallPhrases": [
//           "We hope to hear from you again, Goodbye for now",
//           "Good night"
//         ],
//         "analysisPlan": {
//           "summaryPlan": {
//             "messages": [
//               {
//                 "content": ""
//               }
//             ],
//             "enabled": true
//           }
//         },
//         "startSpeakingPlan": {
//           "smartEndpointingEnabled": true
//         },
//         "server": {
//           "url": ""
//         }
//       },
//       "phoneNumber": {
//         "twilioAccountSid": "ACdfffc5627b3f599274178705f1a65beda",
//         "twilioAuthToken": "6c806b128f116c090c7356063b060017",
//         "twilioPhoneNumber": "+1 (717) 276 0698",
//         "assistantId": "cc966f41-dba5-4fb8-a186-0dbb9486d8fc"
//       },
//       "customerId": "",
//       "customer": {
//         "numberE164CheckEnabled": true,
//         "number": ""
//       },
//       "assistantId": ""
//     }),
//   });
  
//   const body = await response.json();
//   console.log(body);

