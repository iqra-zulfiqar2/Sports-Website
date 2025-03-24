import React, { useState, useEffect } from "react";
import CarouselPage from "./CarouselPage.jsx";
import ChannelSection from "./ChannelSection.jsx";
import WhatsAppPopup from "./WhatsappPopup.jsx"; // Import Pop-up.
import PWAInstall from "./PWAInstall.jsx";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true); // Show the pop-up when page loads
  }, []);



  return (
    <>
    
      {/* WhatsApp Pop-up */}
      {showPopup && <WhatsAppPopup onClose={() => setShowPopup(false)} />}

      <CarouselPage />
      <ChannelSection />

      {/* Live Cricket Section */}
      <section className="w-full bg-black text-white py-12 px-1">
        <div className="w-full px-1">
          <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
            <span>🏏</span> Live Cricket Matches – Watch Anytime, Anywhere!
          </h3>
          <p className="text-lg text-gray-300 mb-6">
            Welcome to Live Match Zone, the ultimate destination for live
            cricket streaming! Whether it’s international clashes, domestic
            leagues, or thrilling T20 tournaments, we bring you high-quality
            live streams so you never miss a moment of the action.
          </p>
          <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
            <span>📺</span> Watch Live Cricket Online
          </h3>
          <ul className="text-lg text-gray-300 space-y-1">
            <li>
              🔥 <strong>HD Streaming</strong> – Enjoy smooth and buffer-free
              streaming in high definition.
            </li>
            <li>
              ⚡ <strong>Real-Time Updates</strong> – Live scores, ball-by-ball
              commentary, and match stats.
            </li>
            <li>
              🏆 <strong>All Major Tournaments</strong> – ICC World Cup, IPL,
              PSL, BBL, The Ashes, and more!
            </li>
            <li>
              📱 <strong>Watch on Any Device</strong> – Mobile, tablet, or
              desktop – cricket is always with you.
            </li>
          </ul>

          <h3 className="text-2xl font-bold flex items-center gap-2 mt-8 mb-3">
            <span>🎙️</span> Expert Analysis & Match Highlights
          </h3>
          <p className="text-lg text-gray-300">
            Missed the game? No worries! Catch up with our match highlights,
            expert opinions, and post-match analysis for all the insights you
            need.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
