import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";
import SA from "../assets/SA.jpg";
import BBL from "../assets/BBL.jpg";
import BPL from "../assets/BPL.jpg";
import PSL from "../assets/PSL.jpg";
import ILT20 from "../assets/ILT20.jpg";

// League data with proper slug mapping
const leaguesData = {
  "bbl-matches": { name: "BBL", src: BBL, url: "https://example.com/bbl" },
  "psl-matches": { name: "PSL", src: PSL, url: "https://example.com/psl" },
  "bpl-matches": { name: "BPL", src: BPL, url: "https://example.com/bpl" },
  "ipl-matches": { name: "IPL", src: "https://livematchzone.com/wp-content/uploads/2025/03/IPL-2025-Team-2.webp", url: "https://example.com/ipl" },
  "sa20": { name: "SA20", src: SA, url: "https://example.com/sa20" },
  "ilt20": { name: "ILT20", src: ILT20, url: "https://example.com/ilt20" },
  "la-liga-league": { name: "La Liga", src: "https://livematchzone.com/wp-content/uploads/2025/03/La-Liga-1024x597.webp", url: "https://example.com/laliga" },
  "premier-league": { name: "Premier League", src: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp", url: "https://example.com/premier-league" },
  "uefa-champions-league": { name: "UEFA Champions League", src: "https://livematchzone.com/wp-content/uploads/2025/03/Champion-League.webp", url: "https://example.com/ucl" },
};

const VideoPage = () => {
  const { slug } = useParams(); // Extract slug from URL
  const videoWrapperRef = useRef(null);

  // Get league details or fallback
  const league = leaguesData[slug] || { name: "Live Stream", src: "/default-league.png", url: "" };

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update document title dynamically
  useEffect(() => {
    document.title = `Watch Free Live ${league.name} Online`;
  }, [league]);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoWrapperRef.current.requestFullscreen) {
        videoWrapperRef.current.requestFullscreen();
      } else if (videoWrapperRef.current.mozRequestFullScreen) {
        videoWrapperRef.current.mozRequestFullScreen();
      } else if (videoWrapperRef.current.webkitRequestFullscreen) {
        videoWrapperRef.current.webkitRequestFullscreen();
      } else if (videoWrapperRef.current.msRequestFullscreen) {
        videoWrapperRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mt-2 mb-4">Watch Free Live {league.name} Online</h1>

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
            src={league.url}
            frameBorder="0"
            allowFullScreen
            title="Live Stream"
          ></iframe>
        )}

        <div className="absolute bottom-0 left-0 w-full bg-[#17A56B] flex items-center justify-between px-3 py-2 rounded-b-lg">
          <div className="flex items-center gap-3">
            <img
              key={league.src} // Ensure image updates when slug changes
              src={league.src}
              alt={league.name}
              className="w-12 h-12 border-2 border-white rounded-md"
            />
            <span className="text-white font-semibold text-lg">{league.name}</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-black p-1 rounded-full transition duration-300"
          >
            {isFullscreen ? <GoScreenNormal size={24} /> : <GoScreenFull size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
