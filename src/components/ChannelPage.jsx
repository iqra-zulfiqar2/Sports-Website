import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const ChannelPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const channelName = queryParams.get("name");

  const videoSources = {
    "A Sports": "https://example.com/a-sports-stream",
    "TNT Sports 4": "https://example.com/tnt-sports-4-stream",
    "TNT Sports 3": "https://example.com/tnt-sports-3-stream",
    "Astro Cricket": "https://example.com/astro-cricket-stream",
    "Star Sports 3": "https://example.com/star-sports-3-stream",
    "Star Sports 2": "https://example.com/star-sports-2-stream",
    "Ten Sports": "https://example.com/ten-sports-stream",
    "Willow Sports": "https://example.com/willow-sports-stream",
    "Star Sports 1": "https://example.com/star-sports-1-stream",
    "PTV Sports": "https://example.com/ptv-sports-stream",
    "SuperSport": "https://example.com/supersport-stream",
    "TNT Sports 1": "https://example.com/tnt-sports-1-stream",
    "TNT Sports 2": "https://example.com/tnt-sports-2-stream",
    "Sky Sports": "https://example.com/sky-sports-stream",
  };

  const [videoUrl, setVideoUrl] = useState("");
  const iframeRef = useRef(null);

  // Function to start video
  const handleWatchNow = () => {
    setVideoUrl(videoSources[channelName] || "https://example.com/default-stream");
  };

  // Function to enable fullscreen mode
  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.mozRequestFullScreen) {
        iframeRef.current.mozRequestFullScreen(); // Firefox
      } else if (iframeRef.current.webkitRequestFullscreen) {
        iframeRef.current.webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if (iframeRef.current.msRequestFullscreen) {
        iframeRef.current.msRequestFullscreen(); // IE/Edge
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Channel Name */}
      <h1 className="text-3xl font-bold mt-6 mb-4">{channelName}</h1>

      {/* Video Container */}
      <div className="relative w-full max-w-3xl aspect-video bg-black border-2 border-[#17A56B] rounded-lg flex items-center justify-center">
        {videoUrl ? (
          <iframe
            ref={iframeRef}
            className="w-full h-full"
            src={videoUrl}
            frameBorder="0"
            allowFullScreen
            title={channelName}
          ></iframe>
        ) : (
          <button
            className="bg-[#17A56B] text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition"
            onClick={handleWatchNow}
          >
            Watch Now
          </button>
        )}
      </div>

      {/* Show fullscreen button only when video is playing */}
      {videoUrl && (
        <button
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          onClick={handleFullscreen}
        >
          Go Fullscreen
        </button>
      )}
    </div>
  );
};

export default ChannelPage;

