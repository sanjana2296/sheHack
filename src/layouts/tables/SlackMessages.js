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
          <select onChange={handleChannelChange} value={channelId}>
            <option value="">Select a channel</option>
            {channels.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>

          {/* Display the summary */}
          <p>{summary}</p>
        </div>
      </MDBox>
    </DashboardLayout>
  );
};

export default SlackMessages;
