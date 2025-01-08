'use client';
import React, { useState } from 'react';

interface InsertDataPayload {
  interaction_id: string;
  vapi: string;
  campaign_id: string;
  company_id: string;
}

const API_URL = '/api/data'; 

const Home: React.FC = () => {
  const [interaction_id, setInteractionId] = useState('');
  const [vapi, setVapi] = useState('');
  const [campaign_id, setCampaignId] = useState('');
  const [company_id, setCompanyId] = useState('');
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const insertData = async () => {
    if (!interaction_id ||!company_id) {
      alert('Please fill in all fields');
      return;
    }

    const payload: InsertDataPayload = {
      interaction_id,
      vapi,
      campaign_id,
      company_id,
    };

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        alert('Data inserted successfully!');
        console.log(result);
      } else {
        alert(`Error: ${result.error}`);
        console.log(result);
      }
    } catch (error) {
      setLoading(false);
      alert('Error inserting data: ' + error);
    }
  };

  // Retrieve data from the backend
  const retrieveData = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setResponseData(result);
    } catch (error) {
      alert('Error retrieving data: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Insert and Retrieve Data</h1>

        <div className="space-y-4 text-black">
          <div>
            <label htmlFor="interaction_id" className="block text-sm font-medium text-gray-700">
              Interaction ID
            </label>
            <input
              id="interaction_id"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Interaction ID"
              value={interaction_id}
              onChange={(e) => setInteractionId(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="vapi" className="block text-sm font-medium text-gray-700">
              VAPI ID
            </label>
            <input
              id="vapi"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VAPI ID"
              value={vapi}
              onChange={(e) => setVapi(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="campaign_id" className="block text-sm font-medium text-gray-700">
              Campaign ID
            </label>
            <input
              id="campaign_id"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Campaign ID"
              value={campaign_id}
              onChange={(e) => setCampaignId(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="company_id" className="block text-sm font-medium text-gray-700">
              Company ID
            </label>
            <input
              id="company_id"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company ID"
              value={company_id}
              onChange={(e) => setCompanyId(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition"
            onClick={insertData}
            disabled={loading || !interaction_id ||!company_id}
          >
            {loading ? 'Inserting...' : 'Insert Data'}
          </button>
        </div>
      </div>

      <hr className="my-8 w-full max-w-md border-gray-300" />

      <div className="max-w-md w-full text-center">
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition"
          onClick={retrieveData}
        >
          Retrieve Data
        </button>
        <div className="mt-4">
          {responseData && (
            <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Fetched Data:</h2>
              <pre className="text-sm text-gray-600">{JSON.stringify(responseData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
