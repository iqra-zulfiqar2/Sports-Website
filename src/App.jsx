import React from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import LeaguePage from "./components/LeaguePage.jsx";
import ChannelPage from "./components/ChannelPage.jsx";
import LiveScores from "./components/LiveScores.jsx";
import Schedule from "./components/Schedule.jsx";
import Footer from "./components/Footer.jsx";
import Women from "./components/ScheduleCategories/Women.jsx";
import League from "./components/ScheduleCategories/League.jsx";
import International from "./components/ScheduleCategories/International.jsx";
import Domestic from "./components/ScheduleCategories/Domestic.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/league/:slug" element={<LeaguePage />} />
        <Route path="/channel/:slug" element={<ChannelPage />} />
        <Route path="/live-scores" element={<LiveScores />} />
        <Route path="/schedule" element={<Schedule />} />

        <Route path="/schedule/international" element={<International />} />
        <Route path="/schedule/domestic-others" element={<Domestic />} />
        <Route path="/schedule/t20-leagues" element={<League />} />
        <Route path="/schedule/women" element={<Women />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
