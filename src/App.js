import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Community from './components/Community';
import Profile from './components/Profile';
import Registration from './components/Registration';

import useToken from './hooks/useToken';

import { Route, Routes } from 'react-router-dom';

function App() {
  const { token, currentUserId, logIn, logOut } = useToken()

  if (token === "userAuthenticated") {
    return (
      <div className="app">
        <Navbar logOut={logOut}/>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Community currentUserId={currentUserId} />} />
            <Route path="/profile" element={<Profile />} />
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
