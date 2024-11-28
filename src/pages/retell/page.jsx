"use client"
import { useState } from 'react';
const KnowledgeBaseForm = () => {
  const [formData, setFormData] = useState({
    knowledge_base_name: '',
    knowledge_base_texts: [],
    knowledge_base_files: [],
    knowledge_base_urls: [],
    enable_auto_refresh: false,
  });

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [knowledgeBaseId, setKnowledgeBaseId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTextChange = (index, field, value) => {
    const updatedTexts = [...formData.knowledge_base_texts];
    updatedTexts[index][field] = value;
    setFormData({
      ...formData,
      knowledge_base_texts: updatedTexts,
    });
  };

  const handleAddText = () => {
    setFormData({
      ...formData,
      knowledge_base_texts: [...formData.knowledge_base_texts, { title: '', text: '' }],
    });
  };

  const handleRemoveText = (index) => {
    const updatedTexts = formData.knowledge_base_texts.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      knowledge_base_texts: updatedTexts,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { knowledge_base_name, knowledge_base_texts, knowledge_base_files, knowledge_base_urls, enable_auto_refresh } = formData;

    if (!knowledge_base_name || knowledge_base_name.length > 40) {
      setError('Name of the knowledge base is required and must be less than 40 characters.');
      return;
    }
    
    const body = {
      knowledge_base_name,
      knowledge_base_texts,
      knowledge_base_files: Array.from(knowledge_base_files),
      knowledge_base_urls,
      enable_auto_refresh,
    };
    try {
      const token = process.env.NEXT_PUBLIC_RETELL_API_KEY
      const response = await fetch('https://api.retellai.com/create-knowledge-base', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to create knowledge base');
      }

      const data = await response.json();
      setKnowledgeBaseId(data.knowledge_base_id);
      setStatus('Knowledge base created successfully!');
      setError(null);
    } catch (err) {
      setStatus(null);
      setError(err.message);
    }
  };

  return (
    <div className='text-blue-700'>
      <h2 className='text-2xl font-bold mb-4'>Create Knowledge Base</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='mb-4'>
          <label className='block font-medium'>Knowledge Base Name (required, max 40 characters):</label>
          <input
            type="text"
            name="knowledge_base_name"
            value={formData.knowledge_base_name}
            onChange={handleInputChange}
            maxLength={40}
            required
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>

        <div className='mb-4'>
          <label className='block font-medium'>Knowledge Base Texts (title and text):</label>
          {formData.knowledge_base_texts.map((text, index) => (
            <div key={index} className='border p-4 rounded mb-2'>
              <div className='mb-2'>
                <label className='block'>Title:</label>
                <input
                  type="text"
                  value={text.title}
                  onChange={(e) => handleTextChange(index, 'title', e.target.value)}
                  required
                  className='border border-gray-300 p-2 rounded w-full'
                />
              </div>
              <div className='mb-2'>
                <label className='block'>Text:</label>
                <textarea
                  value={text.text}
                  onChange={(e) => handleTextChange(index, 'text', e.target.value)}
                  required
                  className='border border-gray-300 p-2 rounded w-full'
                />
              </div>
              <button type="button" onClick={() => handleRemoveText(index)} className='text-red-500'>Remove Text</button>
            </div>
          ))}
          <button type="button" onClick={handleAddText} className='bg-blue-500 text-white p-2 rounded'>Add Text</button>
        </div>

        <div className='mb-4'>
          <label className='block font-medium'>Knowledge Base Files (up to 25 files, max 50MB per file):</label>
          <input
            type="file"
            name="knowledge_base_files"
            onChange={handleInputChange}
            multiple
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>

        <div className='mb-4'>
          <label className='block font-medium'>Knowledge Base URLs (comma separated):</label>
          <input
            type="url"
            name="knowledge_base_urls"
            value={formData.knowledge_base_urls.join(',')}
            onChange={(e) => handleInputChange({
              target: { name: 'knowledge_base_urls', value: e.target.value.split(',') },
            })}
            className='border border-gray-300 p-2 rounded w-full'
          />
        </div>

        <div className='mb-4'>
          <label className='block font-medium'>Enable Auto Refresh:</label>
          <input
            type="checkbox"
            name="enable_auto_refresh"
            checked={formData.enable_auto_refresh}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className='bg-green-500 text-white p-2 rounded'>Create Knowledge Base</button>
      </form>

      {status && <p className='text-green-600'>{status}</p>}
      {knowledgeBaseId && <p>Knowledge Base ID: {knowledgeBaseId}</p>}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};

export default KnowledgeBaseForm;
