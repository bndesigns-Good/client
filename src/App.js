import './App.css';

import React from 'react';
import Navbar from './components/Navbar';
import Community from './components/Community';
import Profile from './components/Profile';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
