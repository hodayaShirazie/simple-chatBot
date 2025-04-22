import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/api/messages');
  };

  return (
    <div className="home-container">
      <h1>Welcome to ChatBot</h1>
      <button className="start-button" onClick={handleStartChat}>
        Start Chatting
      </button>
    </div>
  );
};

export default HomePage;
