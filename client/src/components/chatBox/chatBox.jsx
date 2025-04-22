import React, { useState, useEffect, useRef } from 'react';
import './chatBox.css';
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleDeleteChat = async () => {
    try {
      await axios.delete('http://localhost:6006/api/messages');
      setMessages([]);
      setShowConfirm(false);
    } catch (err) {
      console.error('Error deleting chat history:', err);
    }
  };

  return (
    <div className="chatbox-wrapper">
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
  <button className="inline-delete-btn" onClick={() => setShowConfirm(true)}>
    🗑️
  </button>
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

  <button className="side-delete-btn" onClick={() => setShowConfirm(true)}>
    🗑️
  </button>

  {showConfirm && (
    <div className="confirmation-overlay">
      <div className="confirmation-box">
        <p>Are you sure you want to delete the chat history?</p>
        <div className="confirmation-buttons">
          <button className="confirm" onClick={handleDeleteChat}>Yes</button>
          <button className="cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default ChatBox;
