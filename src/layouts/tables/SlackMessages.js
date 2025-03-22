import React, { useEffect, useState } from "react";
import axios from "axios";

const SlackMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Make the request to your own server
        const response = await axios.get("http://localhost:5000/slack/messages");

        if (response.data) {
          setMessages(response.data);
        } else {
          console.error("Error fetching messages.");
        }
      } catch (error) {
        console.error("Error fetching messages from the server: ", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Messages in Slack Channel</h1>
      {messages.length === 0 ? (
        <p>No messages found or failed to fetch messages.</p>
      ) : (
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.user}:</strong> {message.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SlackMessages;
