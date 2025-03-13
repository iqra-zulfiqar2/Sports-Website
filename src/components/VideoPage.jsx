import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GoScreenFull } from "react-icons/go"; // Fullscreen Icon
import { GoScreenNormal } from "react-icons/go"; // Exit Fullscreen Icon

const VideoPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get("url");
  const leagueName = queryParams.get("name") || "Live Stream";
  const leagueImage = queryParams.get("image") || "/default-league.png"; // Default image if not provided

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); // Track Fullscreen State
  const videoWrapperRef = useRef(null); // Ref for fullscreen

  useEffect(() => {
    document.title = `Watch Free Live ${leagueName} Online`;

    // Event listener to track fullscreen change
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === videoWrapperRef.current ||
        document.webkitFullscreenElement === videoWrapperRef.current ||
        document.mozFullScreenElement === videoWrapperRef.current ||
        document.msFullscreenElement === videoWrapperRef.current
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Enter Fullscreen
      if (videoWrapperRef.current.requestFullscreen) {
        videoWrapperRef.current.requestFullscreen();
      } else if (videoWrapperRef.current.mozRequestFullScreen) {
        videoWrapperRef.current.mozRequestFullScreen(); // Firefox
      } else if (videoWrapperRef.current.webkitRequestFullscreen) {
        videoWrapperRef.current.webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if (videoWrapperRef.current.msRequestFullscreen) {
        videoWrapperRef.current.msRequestFullscreen(); // IE/Edge
      }
    } else {
      // Exit Fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari, Opera
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE/Edge
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mt-6 mb-4">Watch Free Live {leagueName} Online</h1>

      {/* Video Wrapper for Fullscreen Mode */}
      <div
        ref={videoWrapperRef}
        className="relative w-full max-w-3xl h-[400px] border-2 border-[#17A56B] rounded-lg bg-black flex flex-col"
      >
        {!isPlaying ? (
          <div className="flex items-center justify-center flex-1 bg-black">
            <button
              className="bg-[#17A56B] px-6 py-3 rounded-md text-white font-semibold"
              onClick={handlePlayVideo}
            >
              Watch Now
            </button>
          </div>
        ) : (
          <iframe
            className="w-full h-full rounded-t-lg bg-black"
            src={videoUrl}
            frameBorder="0"
            allowFullScreen
            title="Live Stream"
          ></iframe>
        )}

        {/* Control Bar - Reduced Height */}
        <div className="absolute bottom-0 left-0 w-full bg-[#17A56B] flex items-center justify-between px-3 py-2 rounded-b-lg">
          {/* Left Side - Square League Image & Name */}
          <div className="flex items-center gap-3">
            <img
              src={leagueImage}
              alt={leagueName}
              className="w-8 h-8 border border-white"
            />
            <span className="text-white font-semibold text-sm">{leagueName}</span>
          </div>

          {/* Right Side - Fullscreen Button (Toggle) */}
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-black p-1 rounded-full transition duration-300"
          >
            {isFullscreen ? <GoScreenNormal size={20} /> : <GoScreenFull size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
