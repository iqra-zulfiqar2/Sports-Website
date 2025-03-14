import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";

// Define channel data
const channels = [
  { name: "A Sports", img: "https://livematchzone.com/wp-content/uploads/2025/01/A-Sports-HD.jpg", stream: "https://example.com/a-sports-stream" },
  { name: "TNT Sports 4", img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4-2.jpg", stream: "https://example.com/tnt-sports-4-stream" },
  { name: "TNT Sports 3", img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4.jpg", stream: "https://example.com/tnt-sports-3-stream" },
  { name: "Astro Cricket", img: "https://livematchzone.com/wp-content/uploads/2025/01/Astro-Cricket.jpg", stream: "https://example.com/astro-cricket-stream" },
  { name: "Star Sports 3", img: "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-3.jpg", stream: "https://example.com/star-sports-3-stream" },
  { name: "Star Sports 2", img: "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-2.jpg", stream: "https://example.com/star-sports-2-stream" },
  { name: "Ten Sports", img: "https://livematchzone.com/wp-content/uploads/2025/01/Ten-Sports.jpg", stream: "https://example.com/ten-sports-stream" },
  { name: "Willow Sports", img: "https://livematchzone.com/wp-content/uploads/2025/01/Willow-Cricket.jpg", stream: "https://example.com/willow-sports-stream" },
  { name: "Star Sports 1", img: "https://livematchzone.com/wp-content/uploads/2025/01/Star-Sports-1.jpg", stream: "https://example.com/star-sports-1-stream" },
  { name: "PTV Sports", img: "https://livematchzone.com/wp-content/uploads/2025/01/PTV-Sports.jpg", stream: "https://example.com/ptv-sports-stream" },
  { name: "SuperSport", img: "https://livematchzone.com/wp-content/uploads/2025/01/SuperSport-Cricket.jpg", stream: "https://example.com/supersport-stream" },
  { name: "TNT Sports 1", img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-1.jpg", stream: "https://example.com/tnt-sports-1-stream" },
  { name: "TNT Sports 2", img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-2.jpg", stream: "https://example.com/tnt-sports-2-stream" },
  { name: "Sky Sports", img: "https://livematchzone.com/wp-content/uploads/2025/01/Sky-Sports-Cricket.jpg", stream: "https://example.com/sky-sports-stream" },
];

// Convert name to slug
const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const ChannelPage = () => {
  const { slug } = useParams();
  const channel = channels.find((c) => generateSlug(c.name) === slug);

  const [videoUrl, setVideoUrl] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const handleWatchNow = () => {
    setVideoUrl(channel?.stream || "https://example.com/default-stream");
  };

  const handleFullscreen = () => {
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!channel) {
    return <div className="text-white text-center mt-10">Channel not found!</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mt-6 mb-4">Watch Free Live {channel.name} Online</h1>

      <div ref={containerRef} className="relative w-full max-w-3xl aspect-video bg-black border-2 border-[#17A56B] rounded-lg flex flex-col">
        {videoUrl ? (
          <iframe className="w-full h-full rounded-t-lg" src={videoUrl} frameBorder="0" allowFullScreen title={channel.name}></iframe>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-black">
            <button
              className="bg-[#17A56B] text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition"
              onClick={handleWatchNow}
            >
              Watch Now
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full bg-[#17A56B] flex items-center justify-between px-4 py-2 rounded-b-lg">
          <div className="flex items-center gap-3">
            <img src={channel.img} alt={channel.name} className="w-10 h-10 border-2 border-white rounded-md" />
            <span className="text-white font-semibold text-lg">{channel.name}</span>
          </div>
          {isFullscreen ? <GoScreenNormal size={24} onClick={exitFullscreen} /> : <GoScreenFull size={24} onClick={handleFullscreen} />}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
