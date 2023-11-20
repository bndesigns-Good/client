import './App.css';

import React from 'react';
import Navbar from './components/Navbar';
import Groups from './components/Groups';
import Profile from './components/Profile';
import Exchanges from './components/Exchanges';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Groups />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/exchanges" element={<Exchanges />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
