import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";

const SlackMessages = () => {
  const [summary, setSummary] = useState('');
  const [channels, setChannels] = useState([]);
  const [channelId, setChannelId] = useState(''); 

  // Fetch channel list
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/channels`);
        setChannels(response.data.channels);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchChannels();
  }, []);

  // Fetch summary whenever channelId changes
  useEffect(() => {
    const fetchSummary = async () => {
      if (!channelId) return; 

      try {
        const response = await axios.get(`http://localhost:5001/api/messages?channelId=${channelId}`);
        setSummary(response.data.summary);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchSummary();
  }, [channelId]);

  const handleChannelChange = (e) => {
    setChannelId(e.target.value); 
  };

  return (
    <DashboardLayout>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <div>
          <h1>Slack Messages Summary</h1>

          {/* Dropdown for selecting channels */}
          <div className="dropdown-container">
            <label htmlFor="channel-select" className="dropdown-label">
              Select a slack channel
            </label>
            <select 
              id="channel-select" 
              onChange={handleChannelChange} 
              value={channelId} 
              className="dropdown-select"
            >
              {/* <option value="">Select a channel</option> */}
              {channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))}
            </select>
          </div>

          {/* Display the summary */}
          <p>{summary}</p>
        </div>
      </MDBox>

      <style jsx>{`
        /* Container for the dropdown */
        .dropdown-container {
          margin-bottom: 20px;
        }

        /* Label for the dropdown */
        .dropdown-label {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 8px;
          display: block;
          color: #333;
        }

        /* Styling for the select dropdown */
        .dropdown-select {
          width: 250px;
          padding: 10px 15px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #fff;
          color: #333;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }

        /* Hover effect for the select dropdown */
        .dropdown-select:hover {
          border-color: #007bff;
        }

        /* Focus effect for the select dropdown */
        .dropdown-select:focus {
          outline: none;
          border-color: #0056b3;
          box-shadow: 0 0 5px rgba(0, 91, 255, 0.3);
        }

        /* Option styling */
        .dropdown-select option {
          padding: 10px;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default SlackMessages;
