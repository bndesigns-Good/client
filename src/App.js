import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Community from './components/Community';
import Profile from './components/Profile';

import { Route, Routes } from 'react-router-dom';

function App() {
  // Example code for how to retrieve data from the server
  //
  // const [message, setMessage] = useState("");
  
  // useEffect(() => {
  //   fetch("http://localhost:8000/message")
  //   .then((res) => res.json())
  //   .then((data) => setMessage(data.message));
  // }, []);

  return (
    <div className="app">
      <Navbar />
      {/* <h1>{message}</h1> */}
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
