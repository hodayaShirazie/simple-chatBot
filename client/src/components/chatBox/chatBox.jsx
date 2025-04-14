import React, { useState, useEffect, useRef } from 'react';
import './chatBox.css';
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load messages from DB on component mount
  useEffect(() => {
    axios.get('http://localhost:6006/api/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.error('Failed to fetch messages:', err));
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      await axios.post('http://localhost:6006/api/messages', userMessage);
    } catch (err) {
      console.error('Error saving user message:', err);
    }

    setTimeout(async () => {
      const botReply = { sender: 'bot', content: `I got: ${input}` };
      setMessages(prev => [...prev, botReply]);

      try {
        await axios.post('http://localhost:6006/api/messages', botReply);
      } catch (err) {
        console.error('Error saving bot message:', err);
      }
    }, 500); // 800ms delay for realism
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbox-page">
      <div className="chatbox">
        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message-row ${msg.sender}`}>
              <div className="bubble">{msg.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
