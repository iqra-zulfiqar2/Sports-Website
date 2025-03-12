import React from "react";
import SlideShow from "./SlideShow.jsx";
import CarouselPage from "./CarouselPage.jsx";
import ChannelSection from "./ChannelSection.jsx";

const Home = () => {
  return (
    <>
      <SlideShow />
      <CarouselPage />
      <ChannelSection/>

      {/* Live Cricket Section */}
      <section className="bg-black text-white mr-58 py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
        <span>🏏</span> Live Cricket Matches – Watch Anytime, Anywhere!
          </h3>
          <p className="text-lg text-gray-300 mb-6">
            Welcome to Live Match Zone, the ultimate destination for live cricket streaming! Whether it’s international clashes, domestic leagues, or thrilling T20 tournaments, we bring you high-quality live streams so you never miss a moment of the action.
          </p>

          <h3 className="text-2xl font-bold flex items-center gap-2 mb-3">
            <span>📺</span> Watch Live Cricket Online
          </h3>
          <ul className="text-lg text-gray-300 space-y-3">
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
      <section className="bg-black text-white mr-58 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
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

