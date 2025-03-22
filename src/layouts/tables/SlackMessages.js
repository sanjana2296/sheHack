import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";

const SlackMessages = () => {
  const [summary, setSummary] = useState('');
  const channelId = "C08JXG5U4SW";

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages?channelId=${channelId}`);
        setSummary(response.data.summary);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchSummary();
  }, [channelId]);

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
      <p>{summary}</p>
    </div>
    </MDBox>
    </DashboardLayout>
  );
};

export default SlackMessages;
