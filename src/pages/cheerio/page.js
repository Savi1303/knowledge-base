
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const generatePDF = async () => {
    if (!url) {
      alert('Please enter a valid URL');
      return;
    }

    try {
      setMessage('Generating PDF...');
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`PDF generated successfully. You can find it from your Downloads folder.`);
      } else {
        setMessage(`Error: ${result.error || result.details}`);
      }
    } catch (error) {
      setMessage(`Failed to generate PDF: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Generate PDF from URL</h1>
      <label htmlFor="urlInput">Enter URL:</label>
      <input
        type="text"
        id="urlInput"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        style={{ padding: '8px', width: '300px' }}
      />
      <button
        onClick={generatePDF}
        style={{
          padding: '10px 20px',
          marginLeft: '10px',
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: 'white',
        }}
      >
        Generate PDF
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
