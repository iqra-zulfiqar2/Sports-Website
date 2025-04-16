import React, { useState, useEffect } from "react";
import CarouselPage from "./CarouselPage.jsx";
import ChannelSection from "./ChannelSection.jsx";
import WhatsAppPopup from "./WhatsappPopup.jsx"; 
import SEO from "./SEO.jsx";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true); // Show the pop-up when page loads
  }, []);


  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title="Watch Live Cricket Matches Online for Free - Live Match Zone"
        description="Watch live cricket matches for free on Live Match Zone. Stream your favorite sports in HD, get live scores, and enjoy nonstop action all in one place!"
        url="https://livematchzone.com/"
        canonical="https://livematchzone.com/"
        author="Live Match Zone Team"
        publisher="Live Match Zone Team"
        lang="en-US"
        robots="FOLLOW, INDEX, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1, MAX-IMAGE-PREVIEW:LARGE"
      />

      {/* WhatsApp Pop-up */}
      {showPopup && <WhatsAppPopup onClose={() => setShowPopup(false)} />}


      <CarouselPage />
      <ChannelSection />

      {/* Live Cricket Section */}
      <section className="w-full bg-black text-white py-12 px-1">
        <div className="w-full px-1">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-3">
            <span>🏏</span> Live Cricket Matches – Watch Anytime, Anywhere!
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Welcome to Live Match Zone, the ultimate destination for live
            cricket streaming! Whether it’s international clashes, domestic
            leagues, or thrilling T20 tournaments, we bring you high-quality
            live streams so you never miss a moment of the action.
          </p>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-3">
            <span>📺</span> Watch Live Cricket Online
          </h2>
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

          <h2 className="text-2xl font-bold flex items-center gap-2 mt-8 mb-3">
            <span>🎙️</span> Expert Analysis & Match Highlights
          </h2>
          <p className="text-lg text-gray-300">
            Missed the game? No worries! Catch up with our match highlights,
            expert opinions, and post-match analysis for all the insights you
            need.
          </p>
                    {/* Why Choose Live Match Zone Section */}
                    <h2 className="text-2xl font-bold flex items-center gap-2 mt-8 mb-3">
            <span>🚀</span> Why Choose Live Match Zone?
          </h2>
          <ul className="text-lg text-gray-300 space-y-2">
            <li>✅ <strong>24/7 Live Cricket Streaming</strong></li>
            <li>✅ <strong>No Subscription Required</strong></li>
            <li>✅ <strong>Fast & Ad-Free Experience (Optional)</strong></li>
            <li>✅ <strong>Exclusive Coverage & Match Previews</strong></li>
          </ul>
          <p className="text-lg text-gray-300 mt-4">
            💡 Never miss a six, a wicket, or a thrilling last-over finish! Stay connected to the game you love – watch live cricket now! 🏏🔥
          </p>

        </div>
      </section>
    </>
  );
};

export default Home;
