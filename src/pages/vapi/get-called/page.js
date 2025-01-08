import { useState } from 'react';

export default function Home() {
  const [id, setId] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!id) {
      alert("Please enter an ID.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Log the full URL for debugging
      console.log(`Fetching from: https://api.vapi.ai/call/${id}`);

      const res = await fetch(`https://api.vapi.ai/call/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer 37714ad0-e383-4e06-893d-ce55ec28521b', // Use your own token
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Enter ID for API Call</h1>

      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={handleClick}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

// 0d870be0-deb2-429b-9c8e-f6cbad98ddb3