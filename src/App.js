import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Community from './components/Community';
import Profile from './components/Profile';

import { Route, Routes } from 'react-router-dom';

function App() {
  const [message, setMessage] = useState("");
  const [offerings, setOfferings] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8000/message")
    .then((res) => res.json())
    .then((data) => setMessage(data.message));
  }, []);

  useEffect(() => {
    axios
    .get('/offerings')
    .then(res => res.data)
    .then(offerings => setOfferings(offerings));
  }, []);

  return (
    <div className="app">
      <Navbar />
      <h1>{message}</h1>
      <div className="offerings-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Offeree</th>
            </tr>
          </thead>
          <tbody>
            {offerings.map(offer => (
              // CREATE TABLE didn't automatically add an id column
              <tr key={offer.id}>
                <td>{offer.title}</td>
                <td>{offer.category}</td>
                <td>{offer.price}</td>
                <td>{offer.offeree}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
