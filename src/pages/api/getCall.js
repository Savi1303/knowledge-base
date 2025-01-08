// pages/api/vapi-call.js
import { VapiClient } from '@vapi-ai/server-sdk';

const token = process.env.NEXT_PUBLIC_SAVI_VAPI_KEY;
const client = new VapiClient({ token });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { response } = req.body; // The response that needs to be passed into the create call.

    if (!response) {
      return res.status(400).json({ error: 'Response data is required to create a call' });
    }

    try {
      // Step 1: Create the call using VapiClient
      const createdCall = await client.calls.create(response); // Create the call using the provided response

      // Step 2: After creating the call, extract the call ID
      const callId = createdCall.id; // Assuming the response from the `create` call has an `id` field.

      // Step 3: Fetch additional data about the call using a GET request
      const fetchResponse = await fetch(`https://api.vapi.ai/call/${callId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Authorization header with the token
        },
      });

      if (!fetchResponse.ok) {
        throw new Error('Failed to fetch call data');
      }

      const callDetails = await fetchResponse.json(); // Parse the response from the API

      // Step 4: Return the fetched details to the frontend
      return res.status(200).json(callDetails); // Send the details back to the frontend
    } catch (error) {
      console.error('Error creating or fetching call data:', error);
      return res.status(500).json({ error: 'Failed to create or fetch call data' });
    }
  } else {
    // If it's not a POST request, return a Method Not Allowed response
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
