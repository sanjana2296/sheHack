import React, { useState } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
 
const RTL = () => {
  const [link, setLink] = useState('');
  const [length, setLength] = useState('medium');
  const [language, setLanguage] = useState('en');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 
  const summarize = async () => {
    setLoading(true);
    setError('');
    setSummary('');
 
    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: link,
          summaryType: length,    
          language: language
        })
      });
 
      const data = await response.json();
 
      if (response.ok) {
        setSummary(data.data.summary);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <DashboardLayout>
<MDBox
  display="flex"
  alignItems="center"
  justifyContent="center"
  minHeight="100vh"
>
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-semibold mb-4 text-center">Summarizer</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Article URL</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="https://example.com/article"
          />
        </div>
       
 
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Summary Length</label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
 
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Output Language (ISO Code)</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="en, fr, es, etc."
          />
        </div>
 
        <button
          onClick={summarize}
          disabled={loading || !link}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            loading || !link ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Summarizing...' : 'Get Summary'}
        </button>
 
        {error && <p className="text-red-600 mt-3">{error}</p>}
        <div className="my-4"></div>
        <h2> Summary</h2>
        {summary && (
          <div className="mt-4">
            {/* <label className="block text-sm font-medium mb-1" htmlFor="summaryBox">Summary</label> */}
            <textarea
              readOnly
              value={summary}
              rows={15}
              cols={70}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        )}
      </div>
    </MDBox>
    </DashboardLayout>
  );
};
 
export default RTL;