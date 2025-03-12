import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const VideoPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get("url");

  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

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
      <h1 className="text-2xl font-bold mt-6 mb-4">Watch Live Stream</h1>
      
      <div className="relative w-full max-w-4xl aspect-video bg-black">
        {!isPlaying ? (
          <>
            <img
              src="https://via.placeholder.com/800x450/000000/FFFFFF?text=Click+to+Play"
              alt="Thumbnail"
              className="w-full h-full object-cover"
            />
            <button
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
              onClick={handlePlayVideo}
            >
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <polygon points="5,3 19,10 5,17" fill="white" />
              </svg>
            </button>
          </>
        ) : (
          <iframe
            ref={iframeRef}
            className="w-full h-full"
            src={videoUrl}
            frameBorder="0"
            allowFullScreen
            title="Live Stream"
          ></iframe>
        )}
      </div>

      <button
        onClick={handleFullscreen}
        className="mt-4 mb-10 bg-[#17A56B] px-4 py-2 rounded-full text-white"
      >
        Go Fullscreen
      </button>
    </div>
  );
};

export default VideoPage;
