import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import SlideShow from './components/SlideShow.jsx'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import VideoPage from './components/VideoPage.jsx';
import ChannelPage from './components/ChannelPage.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/league/:slug" element={<VideoPage />} />
        <Route path="/channel/:slug" element={<ChannelPage />} />
      </Routes>
      <Footer/>
    </>
    
  );
}

export default App
