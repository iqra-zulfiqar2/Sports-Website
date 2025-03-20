import React from "react";
import { useEffect, useState } from "react";
import CarouselPage from "./CarouselPage.jsx";
import ChannelSection from "./ChannelSection.jsx";
import logo from "../assets/logo.png";

const Home = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Check if notification has been shown in this session
    const notificationShown = sessionStorage.getItem("notificationShown");

    if (!notificationShown) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        sessionStorage.setItem("notificationShown", "true"); // Store it in sessionStorage
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, []);

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <>
      {/* Push Notification - Floating Box */}
      {showNotification && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-b-lg shadow-lg text-center max-w-sm z-50 border border-gray-300 w-full sm:w-auto">
          {/* Centered and Enlarged Logo */}
          <img src={logo} alt="Logo" className="h-12 ml-32 mx-auto mb-3" />
          <h2 className="text-sm text-gray-600 font-bold">
            Don't miss out on Live Matches!
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Let Live Match Zone keep you updated & entertained with AWESOME content!
          </p>
          <div className="flex justify-center gap-3 mt-3">
            <button
              onClick={handleClose}
              className="px-3 py-1 border rounded text-gray-700 text-xs hover:bg-gray-200 transition"
            >
              No
            </button>
            <button
              onClick={handleClose}
              className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition"
            >
              Yes
            </button>
          </div>
        </div>
      )}

      <CarouselPage />
      <ChannelSection />

      {/* Live Cricket Section */}
      <section className="w-full bg-black text-white py-12 px-1">
        <div className="w-full px-1">
          <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
            <span>🏏</span> Live Cricket Matches – Watch Anytime, Anywhere!
          </h3>
          <p className="text-lg text-gray-300 mb-6">
            Welcome to Live Match Zone, the ultimate destination for live cricket streaming! Whether it’s international clashes, domestic leagues, or thrilling T20 tournaments, we bring you high-quality live streams so you never miss a moment of the action.
          </p>

          <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
            <span>📺</span> Watch Live Cricket Online
          </h3>
          <ul className="text-lg text-gray-300 space-y-1">
            <li>🔥 <strong>HD Streaming</strong> – Enjoy smooth and buffer-free streaming in high definition.</li>
            <li>⚡ <strong>Real-Time Updates</strong> – Live scores, ball-by-ball commentary, and match stats.</li>
            <li>🏆 <strong>All Major Tournaments</strong> – ICC World Cup, IPL, PSL, BBL, The Ashes, and more!</li>
            <li>📱 <strong>Watch on Any Device</strong> – Mobile, tablet, or desktop – cricket is always with you.</li>
          </ul>

          <h3 className="text-2xl font-bold flex items-center gap-2 mt-8 mb-3">
            <span>🎙️</span> Expert Analysis & Match Highlights
          </h3>
          <p className="text-lg text-gray-300">
            Missed the game? No worries! Catch up with our match highlights, expert opinions, and post-match analysis for all the insights you need.
          </p>
        </div>
      </section>

      {/* Why Choose Live Match Zone Section */}
      <section className="w-full bg-black text-white px-1">
        <div className="w-full px-1">
          <h3 className="text-3xl font-bold flex items-center gap-2 mb-4">
            <span>🚀</span> Why Choose Live Match Zone?
          </h3>
          <ul className="text-lg text-gray-300 space-y-3">
            <li>✅ <strong>24/7 Live Cricket Streaming</strong></li>
            <li>✅ <strong>No Subscription Required</strong></li>
            <li>✅ <strong>Fast & Ad-Free Experience (Optional)</strong></li>
            <li>✅ <strong>Exclusive Coverage & Match Previews</strong></li>
          </ul>
          <p className="text-lg text-gray-300 mt-6">
            💡 Never miss a six, a wicket, or a thrilling last-over finish! Stay connected to the game you love – watch live cricket now! 🏏🔥
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
