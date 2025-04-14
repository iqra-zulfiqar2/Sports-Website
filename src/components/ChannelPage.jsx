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
import ChannelsChat from "./LiveChat/ChannelsChat.jsx";

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
    stream: "https://tamashalive.github.io/tnt-sports-4.html",
  },
  {
    name: "TNT Sports 3",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4.jpg",
    stream: "https://tamashalive.github.io/tnt-sports-3.html",
  },
  {
    name: "Astro Cricket",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/Astro-Cricket.jpg",
    stream: "//stream.crichd.sc/update/fox501.php",
  },
  {
    name: "Star Sports 3",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-3.jpg",
    stream: "https://tamashalive.github.io/star-sports-hindi.html",
  },
  {
    name: "Star Sports 2",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-2.jpg",
    stream: "https://tamashalive.github.io/star-sports-2.html",
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
    stream: "https://tamashalive.github.io/star-sports-1.html",
  },
  {
    name: "PTV Sports",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/PTV-Sports.jpg",
    stream: "https://tamashalive.github.io/ptv-sports.html",
  },
  {
    name: "SuperSport",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/SuperSport-Cricket.jpg",
    stream: "https://tamashalive.github.io/supersport-cricket.html",
  },
  {
    name: "TNT Sports 1",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-1.jpg",
    stream: "https://tamashalive.github.io/tnt-sports-1.html",
  },
  {
    name: "TNT Sports 2",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-2.jpg",
    stream: "https://tamashalive.github.io/tnt-sports-2.html",
  },
  {
    name: "Sky Sports",
    img: "https://livematchzone.com/wp-content/uploads/2025/01/Sky-Sports-Cricket.jpg",
    stream: "https://livematchzone.github.io/a-sports-hd.html",
  },
  {
    name: "T Sports",
    img: tsports,
    stream: "https://tamashalive.github.io/ten-sports.html",
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

  // ✅ Chat toggle logic
  const [showChat, setShowChat] = useState(true);
  const toggleChat = () => setShowChat(!showChat);

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
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
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
    navigator.clipboard
      .writeText(currentURL)
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
      <div
        className={`flex flex-col items-center text-center mt-6 ${
          showChat ? "w-[70%]" : "w-full"
        }`}
      >
        <h1 className={`text-3xl font-bold ${showChat ? "mr-86" : "mx-auto"}`}>
          Watch Free Live {channel.name} Online
        </h1>

        <marquee className="text-[#17A56B] font-bold text-lg w-[50%]">
          Click "Unmute Stream" Button to Get Voice
        </marquee>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-[1200px] gap-4 mt-4">
        {/* Left side: Video Stream (responsive width like LeaguePage) */}
        <div
          ref={containerRef}
          className={`${
            showChat ? "w-full md:w-[70%]" : "w-full"
          } transition-all duration-300 aspect-video bg-black rounded-lg relative`}
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
                className="bg-[#17A56B] text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                onClick={handleWatchNow}
              >
                Watch Now
              </button>
            </div>
          )}

          {isPlaying && (
            <div className="absolute top-1 right-3 flex items-center space-x-2 z-20">
              <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                LIVE
              </div>
              <div className="bg-black/60 text-white text-sm px-3 py-1 rounded flex items-center gap-1">
                <FaEye />
                {formatCount(viewerCount)}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-0 left-0 w-full bg-[#17A56B] flex items-center justify-between px-4 py-1 rounded-b-lg z-20">
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

        {/* 🟦 Chat panel (conditionally rendered) */}
        {showChat ? (
          <div className="w-[30%] ml-4">
            <ChannelsChat onToggleChat={toggleChat} showChat={showChat} />
          </div>
        ) : (
          <button
            onClick={toggleChat}
            className="fixed right-0 top-[5.5rem] bg-[#14925F] text-white mt-8 p-1 text-2xl rounded-l-md hover:bg-green-700 transition"
          >
            💬
          </button>
        )}
      </div>

      {showShareModal && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 bg-[#1E1F26] p-5 rounded-lg shadow-lg w-[350px] z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg font-bold">Share this game</h3>
            <button
              onClick={() => setShowShareModal(false)}
              className="text-gray-400 hover:text-white"
            >
              ✖
            </button>
          </div>
          <div className="flex gap-3 mb-4 justify-center">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              className="bg-blue-600 p-2 rounded flex items-center justify-center w-10 h-10"
            >
              <FaFacebook size={20} className="text-white" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
              target="_blank"
              className="bg-black p-2 rounded flex items-center justify-center w-10 h-10"
            >
              <FaXTwitter size={20} className="text-white" />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${window.location.href}`}
              target="_blank"
              className="bg-green-500 p-2 rounded flex items-center justify-center w-10 h-10"
            >
              <FaWhatsapp size={20} className="text-white" />
            </a>
            <a
              href={`https://www.reddit.com/submit?url=${window.location.href}`}
              target="_blank"
              className="bg-red-500 p-2 rounded flex items-center justify-center w-10 h-10"
            >
              <FaReddit size={20} className="text-white" />
            </a>
          </div>
          <div className="flex items-center bg-gray-700 rounded overflow-hidden">
            <input
              type="text"
              value={window.location.href}
              readOnly
              className="bg-gray-700 text-white p-2 flex-1"
            />
            <button onClick={copyToClipboard} className="bg-blue-600 p-2">
              <Copy size={16} className="text-white" />
            </button>
          </div>
        </div>
      )}

      <button
        className={`mt-4 px-6 py-2 rounded-md text-white transition-all ${
          showChat ? "mr-86" : ""
        }`}
        onClick={() => setAdsDisabled(!adsDisabled)}
        style={{ backgroundColor: adsDisabled ? "#DC3545" : "#17A56B" }}
      >
        {adsDisabled ? "Enable Ads" : "Disable Ads"}
      </button>

      <ToastContainer />
    </div>
  );
};

export default ChannelPage;
