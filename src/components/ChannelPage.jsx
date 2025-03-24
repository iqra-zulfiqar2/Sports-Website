import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { FaFacebook, FaXTwitter, FaWhatsapp, FaReddit } from "react-icons/fa6";
import { Copy } from "lucide-react";
import { FaEye } from "react-icons/fa";
import tsports from "../assets/tsports.png";
import Willow from "../assets/Willow.png";
import gtv from "../assets/gtv.png";
import foxsports from "../assets/foxsports.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


// Define channel data
const channels = [
  {
    name: "A Sports",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/A-Sports-HD.jpg",
    stream: "//stream.crichd.sc/update/asportshd.php",
  },
  {
    name: "TNT Sports 4",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4-2.jpg",
    stream: "https://example.com/tnt-sports-4-stream",
  },
  {
    name: "TNT Sports 3",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4.jpg",
    stream: "https://example.com/tnt-sports-3-stream",
  },
  {
    name: "Astro Cricket",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/Astro-Cricket.jpg",
    stream: "//stream.crichd.sc/update/fox501.php",
  },
  {
    name: "Star Sports 3",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-3.jpg",
    stream: "//stream.crichd.sc/update/star2.php",
  },
  {
    name: "Star Sports 2",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-2.jpg",
    stream: "https://example.com/star-sports-2-stream",
  },
  {
    name: "Ten Sports",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/Ten-Sports.jpg",
    stream: "//stream.crichd.sc/update/tensp.php",
  },
  {
    name: "Willow Sports",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/Willow-Cricket.jpg",
    stream: "//stream.crichd.vip/update/willowcricket.php",
  },
  {
    name: "Star Sports 1",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/Star-Sports-1.jpg",
    stream: "//stream.crichd.sc/update/star.php",
  },
  {
    name: "PTV Sports",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/PTV-Sports.jpg",
    stream: "//stream.crichd.vip/update/ptv.php",
  },
  {
    name: "SuperSport",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/SuperSport-Cricket.jpg",
    stream: "//stream.crichd.sc/update/sscricket.php",
  },
  {
    name: "TNT Sports 1",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-1.jpg",
    stream: "https://example.com/tnt-sports-1-stream",
  },
  {
    name: "TNT Sports 2",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-2.jpg",
    stream: "https://example.com/tnt-sports-2-stream",
  },
  {
    name: "Sky Sports",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/Sky-Sports-Cricket.jpg",
    stream: "//stream.crichd.sc/update/star.php",
  },
  {
    name: "T Sports",
    img: tsports,
    stream: "http://chanel.dekhaott.com/Tsportshd/embed.html",
  },
  {
    name: "Willow 2",
    img: Willow,
    stream: "//stream.crichd.sc/update/willowextra.php",
  },
  {
    name: "GTV",
    img: gtv,
    stream:
      "http://103.89.248.18:8082/1LIVE/embed.html?token=dfca69c3d4326ea1b69df1dfc5cb22563db6b290-6ddc9b8e3669189d8b68fd5a6de65199-1715367020-1715356220&amp;remote=no_check_ip",
  },
  {
    name: "Fox Sports",
    img: foxsports,
    stream: "//stream.crichd.sc/update/fox501.php",
  },
];

// Convert name to slug
const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const ChannelPage = () => {
  const { slug } = useParams();
  const videoWrapperRef = useRef(null);
  const iframeRef = useRef(null);
  const channel = channels.find((c) => generateSlug(c.name) === slug);

  const [videoUrl, setVideoUrl] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const [viewerCount, setViewerCount] = useState(405);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(1200);
  const [dislikes, setDislikes] = useState(10);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [adsDisabled, setAdsDisabled] = useState(false);
  const toggleAds = () => setAdsDisabled(!adsDisabled);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.mozRequestFullScreen) {
          containerRef.current.mozRequestFullScreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) {
          containerRef.current.msRequestFullscreen();
        }
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

  const handleWatchNow = () => {
    setVideoUrl(channel?.stream || "https://example.com/default-stream");
    setIsPlaying(true); // Mark as playing
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 5 + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

   // Detect fullscreen change
   useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const formatCount = (num) => {
    if (num >= 1e9) return Math.floor(num / 1e9) + "B";
    if (num >= 1e6) return Math.floor(num / 1e6) + "M";
    if (num >= 1e3) return Math.floor(num / 1e3) + "K";
    return num;
  };

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1));
    setLiked(!liked);
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    setDislikes(dislikes + (disliked ? -1 : 1));
    setDisliked(!disliked);
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const closeModal = () => {
    setShowShareModal(false);
  };

  if (!channel) {
    return (
      <div className="text-white text-center mt-10">Channel not found!</div>
    );
  }
  
    const currentURL = window.location.href;
    const copyToClipboard = () => {
      navigator.clipboard.writeText(currentURL)
        .then(() => {
          toast.success("Copied to clipboard!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        })
        .catch((error) => console.error("Failed to copy:", error));
    };

    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mt-6 mb-4">
        Watch Free Live {channel.name} Online
      </h1>

      {/* Marquee Message */}
      <div className="w-full max-w-4xl">
        <marquee
          className="text-[#17A56B] font-bold text-lg"
          behavior="scroll"
          direction="left"
          scrollamount="5"
        >
          Click "Unmute Stream" Button to Get Voice
        </marquee>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg"
      >
        {videoUrl ? (
          <iframe
            ref={iframeRef}
            className="w-full h-full rounded-t-lg"
            src={videoUrl}
            frameBorder="0"
            allowFullScreen
            allow="encrypted-media"
            title="Live Stream"
          ></iframe>
        ) : (
          <div className="flex items-center justify-center bg-black h-full">
            <button
              className="bg-[#17A56B] text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
              onClick={handleWatchNow}
            >
              Watch Now
            </button>
          </div>
        )}

        {isPlaying && (
          <div className="absolute top-3 right-3 flex items-center space-x-2 z-20">
            <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              LIVE
            </div>
            <div className="bg-black/60 text-white text-sm px-3 py-1 rounded flex items-center gap-1">
              <FaEye />
              {formatCount(viewerCount)}
            </div>
          </div>
        )}

        {/* Control Bar Always Visible */}
        <div className="absolute bottom-0 left-0 w-full bg-[#17A56B] flex items-center justify-between px-4 py-2 rounded-b-lg z-20">
          <div className="flex items-center gap-3">
            <img
              src={channel.img}
              alt={channel.name}
              className="w-10 h-10 border-2 border-white rounded-md"
            />
            <span className="text-white font-semibold text-lg">
              {channel.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${
                liked
                  ? "bg-white text-green-500"
                  : "bg-white text-black hover:text-green-500"
              }`}
            >
              <AiOutlineLike size={18} /> {formatCount(likes)}
            </button>
            <button
              onClick={handleDislike}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-black transition-all ${
                disliked ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              <AiOutlineDislike size={18} /> {formatCount(dislikes)}
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white text-black hover:bg-gray-300 transition-all"
            >
              <CiShare2 size={18} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white text-black hover:bg-gray-300 transition"
            >
              {isFullscreen ? (
                <GoScreenNormal size={18} />
              ) : (
                <GoScreenFull size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
      {showShareModal && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 bg-[#1E1F26] p-5 rounded-lg shadow-lg w-[350px] z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg font-bold">Share this game</h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-white"
            >
              ✖
            </button>
          </div>
          <div className="flex gap-3 mb-4 justify-center">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
              target="_blank"
              className="bg-blue-600 p-2 rounded flex items-center justify-center w-10 h-10"
            >
              <FaFacebook size={20} className="text-white" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${currentURL}`}
              target="_blank"
              className="bg-black p-2 rounded flex items-center justify-center w-10 h-10"
            >
              <FaXTwitter size={20} className="text-white" />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${currentURL}`}
              target="_blank"
              className="bg-green-500 p-2 rounded flex items-center justify-center w-10 h-10"
            >
              <FaWhatsapp size={20} className="text-white" />
            </a>
            <a
              href={`https://www.reddit.com/submit?url=${currentURL}`}
              target="_blank"
              className="bg-red-500 p-2 rounded flex items-center justify-center w-10 h-10"
            >
              <FaReddit size={20} className="text-white" />
            </a>
          </div>
          <div className="flex items-center bg-gray-700 rounded overflow-hidden">
            <input
              type="text"
              value={currentURL}
              readOnly
              className="bg-gray-700 text-white p-2 flex-1"
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 p-2 hover:bg-blue-500"
            >
              <Copy size={16} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Ads Button */}
      <button
        className="mt-4 px-6 py-2 rounded-md text-white transition-all "
        onClick={toggleAds}
        style={{ backgroundColor: adsDisabled ? "#DC3545" : "#17A56B" }}
      >
        {adsDisabled ? "Enabled Ads" : "Disabled Ads"}
      </button>
    </div>
  );
};

export default ChannelPage;
