import React,{ Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/homePage.jsx';
import ChatBox from './components/chatBox/chatBox.jsx';

function App() {
  return (
    <Fragment>  
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api/messages" element={<ChatBox />} />
      </Routes>
    </Router>
    </Fragment>
  );
}

export default App;
