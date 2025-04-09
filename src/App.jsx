import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import GamePage from "./components/GamePage.jsx";
import LiveChat from "./components/LiveChat.jsx";
import { generateToken, messaging } from "./notifications/firebase.js";
import { onMessage } from "firebase/messaging";
import Chatango from "./components/Chatango.jsx";
import PredictionPoll from "./components/PredictionPoll.jsx";
import IPLPage from "./components/IPLPage.jsx";
import Chat from "./components/LiveChat/Chat.jsx";
import Auth from "./components/Authentication/Auth.jsx";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function App() {
  
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
    });
  }, []);

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))

  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/league/:slug" element={<LeaguePage />} />
        <Route path="/ipl" element={<IPLPage />} />
        <Route path="/channel/:slug" element={<ChannelPage />} />
        <Route path="/games" element={<GamePage />} />
        <Route path="/live-scores/:tabSlug" element={<LiveScores />} />
        <Route
          path="/live-scores"
          element={<Navigate to="/live-scores/live-matches" replace />}
        />{" "}
        {/* Default Redirect */}
        <Route
          path="/"
          element={<Navigate to="/live-scores/live-matches" replace />}
        />
        <Route path="/schedule/:category" element={<Schedule />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/livechat" element={<Chat />} />
        <Route path="/chat" element={<LiveChat />} />
        <Route path="/poll" element={<PredictionPoll />} />
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
