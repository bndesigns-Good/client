import './App.css';
import React from 'react';
import Navbar from './components/feature/Navbar';
import Community from './components/feature/Community';
import Profile from './components/feature/Profile';
import Registration from './components/feature/Registration';

import useToken from './hooks/useToken';

import { Route, Routes } from 'react-router-dom';

function App() {
  const { token, currentUserId, logIn, logOut } = useToken()

  if (token === "userAuthenticated") {
    return (
      <div className="app">
        <Navbar logOut={logOut} currentUserId={currentUserId} />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Community currentUserId={currentUserId} />} />
            <Route path="/profile/:id" element={<Profile currentUserId={currentUserId} />} />
          </Routes>
        </div>
      </div>
    )
  } else {
    return ( 
      <div className="content-container">
        <Registration logIn={logIn} />
      </div>
    )
  }
}

export default App;
