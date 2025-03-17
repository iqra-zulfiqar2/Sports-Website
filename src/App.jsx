import React from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import LeaguePage from './components/LeaguePage.jsx';
import ChannelPage from './components/ChannelPage.jsx';
import LiveScores from './components/LiveScores.jsx';
import Schedule from './components/Schedule.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/league/:slug" element={<LeaguePage />} />
        <Route path="/channel/:slug" element={<ChannelPage />} />
        <Route path="/schedule" element={<Schedule />} /> 
        <Route path="/live-scores" element={<LiveScores />} />  
      </Routes>
      <Footer/>
    </>
    
  );
}

export default App
