import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";
import BPL from "../assets/BPL.jpg";
import PSL from "../assets/PSL.jpg";
import ILT20 from "../assets/ILT20.jpg";

// League data with proper slug mapping
const leaguesData = {
  "psl": { 
    name: "PSL", 
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pakistan-Super-League.webp", 
    url: "https://example.com/psl" 
  },
  "bpl": { 
    name: "BPL", 
    src: "https://livematchzone.com/wp-content/uploads/2025/03/BPL-League.webp", 
    url: "https://example.com/bpl" 
  },
  "ipl": { 
    name: "IPL", 
    src: "https://livematchzone.com/wp-content/uploads/2025/03/IPL-2025-Team-2.webp", 
    url: "https://example.com/ipl" 
  },
  "pakistan-vs-new-zealand": { 
    name: "PAK VS NZ", 
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pakistan-vs-New-Zealand-1.webp", 
    url: "https://example.com/pakistan-vs-new-zealand" 
  },
  "ilt20": { 
    name: "ILT20", 
    src: "https://livematchzone.com/wp-content/uploads/2025/03/ILT20-League.webp", 
    url: "https://example.com/ilt20" 
  },
  "la-liga": { 
    name: "La Liga", 
    src: "https://livematchzone.com/wp-content/uploads/2025/03/La-Liga-1024x597.webp", 
    url: "https://example.com/laliga" 
  },
  "epl": { 
    name: "EPL", 
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp", 
    url: "https://example.com/epl" 
  },
  "premier-league": { 
    name: "Premier League", 
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp", 
    url: "https://example.com/premier-league" 
  },
  "uefa-champions-league": { 
    name: "UEFA Champions League", 
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Champion-League.webp", 
    url: "https://example.com/uefa-champions-league" 
  }
};


const LeaguePage = () => {
  const { slug } = useParams();
  const videoWrapperRef = useRef(null);
  const league = leaguesData[slug] || { name: "Live Stream", src: "/default-league.png", url: "" };
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [leagueData, setLeagueData] = useState(league);

  // Update league data dynamically when slug changes
  useEffect(() => {
    setLeagueData(leaguesData[slug] || { name: "Live Stream", src: "/default-league.png", url: "" });
    document.title = `Watch Free Live ${league.name} Online`;
  }, [slug]);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoWrapperRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mt-2 mb-4">Watch Free Live {leagueData.name} Online</h1>

      <div ref={videoWrapperRef} className="relative w-full max-w-3xl h-[400px] border-2 border-[#17A56B] rounded-lg bg-black flex flex-col">
        {!isPlaying ? (
          <div className="flex items-center justify-center flex-1 bg-black">
            <button className="bg-[#17A56B] px-6 py-3 rounded-md text-white font-semibold" onClick={handlePlayVideo}>
              Watch Now
            </button>
          </div>
        ) : (
          <iframe className="w-full h-full rounded-t-lg bg-black" src={leagueData.url} frameBorder="0" allowFullScreen title="Live Stream"></iframe>
        )}

        <div className="absolute bottom-0 left-0 w-full bg-[#17A56B] flex items-center justify-between px-3 py-2 rounded-b-lg">
          <div className="flex items-center gap-3">
            <img
              key={leagueData.src} // Ensures image updates dynamically
              src={leagueData.src}
              alt={leagueData.name}
              className="w-12 h-12 border-2 border-white rounded-md"
            />
            <span className="text-white font-semibold text-lg">{leagueData.name}</span>
          </div>
          <button onClick={toggleFullscreen} className="text-white hover:text-black p-1 rounded-full transition duration-300">
            {isFullscreen ? <GoScreenNormal size={24} /> : <GoScreenFull size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaguePage;
