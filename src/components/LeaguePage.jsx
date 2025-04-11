// ✅ LeaguePage.jsx (with chat toggle logic added)

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import {
  FaFacebook,
  FaXTwitter,
  FaWhatsapp,
  FaReddit,
  FaEye,
} from "react-icons/fa6";
import { Copy } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LiveChat from "./LiveChat.jsx";
import Chat from "./LiveChat/Chat.jsx";

// League data with proper slug mapping
const leaguesData = {
  bpl: {
    name: "BPL",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/BPL-League.webp",
    url: "https://tamashalive.github.io/star-sports-hindi.html",
  },
  ipl: {
    name: "IPL",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/IPL-2025-Team-2.webp",
    url: "https://tamashalive.github.io/willow-cricket.html",
  },
  "pakistan-vs-new-zealand": {
    name: "PAK VS NZ",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pakistan-vs-New-Zealand-1.webp",
    url: "https://tamashalive.github.io/sony-sports-ten-5.html",
  },
  ilt20: {
    name: "ILT20",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/ILT20-League.webp",
    url: "https://tamashalive.github.io/star-sports-hindi.html",
  },
  "la-liga": {
    name: "La Liga",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/La-Liga-1024x597.webp",
    url: "https://tamashalive.github.io/star-sports-hindi.html",
  },
  epl: {
    name: "EPL",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp",
    url: "https://example.com/epl",
  },
  "premier-league": {
    name: "Premier League",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp",
    url: "https://livematchzone.github.io/a-sports-hd.html",
  },
  "uefa-champions-league": {
    name: "UEFA Champions League",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Champion-League.webp",
    url: "https://tamashalive.github.io/star-sports-hindi.html",
  },
};

const LeaguePage = () => {
  const { slug } = useParams();
  const videoWrapperRef = useRef(null);
  const league = leaguesData[slug] || {
    name: "Live Stream",
    src: "/default-league.png",
    url: "",
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [likes, setLikes] = useState(1200);
  const [dislikes, setDislikes] = useState(10);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [adsDisabled, setAdsDisabled] = useState(false);
  const [viewerCount, setViewerCount] = useState(405);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // ✅ Chat toggle logic
  const [showChat, setShowChat] = useState(true);
  const toggleChat = () => setShowChat(!showChat);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 5 + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = `Watch Free Live ${league.name} Online`;
  }, [slug]);

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

  const handleShare = () => setShowShareModal(true);
  const closeModal = () => setShowShareModal(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoWrapperRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <div
        className={`flex flex-col items-center text-center mt-6 ${
          showChat ? "w-[70%]" : "w-full"
        }`}
      >
        <h1 className={`text-3xl font-bold ${showChat ? "mr-86" : "mx-auto"}`}>
          Watch Free Live {league.name} Online
        </h1>

        <marquee className="text-[#17A56B] font-bold text-lg w-[50%]">
          Click "Unmute Stream" Button to Get Voice
        </marquee>
      </div>

      <div className="flex w-full max-w-6xl mt-4">
        {/* 🟩 Video section adjusts based on showChat */}
        <div
          ref={videoWrapperRef}
          className={`${
            showChat ? "w-[70%]" : "w-full"
          } transition-all duration-300 aspect-video bg-black rounded-lg relative`}
        >
          {!isPlaying ? (
            <div className="flex items-center justify-center h-full bg-black">
              <button
                className="bg-[#17A56B] text-white px-4 py-2 rounded-md"
                onClick={() => setIsPlaying(true)}
              >
                Watch Now
              </button>
            </div>
          ) : (
            <iframe
              className="w-full h-full rounded-t-lg"
              src={league.url}
              frameBorder="0"
              allowFullScreen
              title="Live Stream"
            ></iframe>
          )}

          {isPlaying && (
            <div className="absolute top-1 right-3 flex items-center space-x-2 z-20">
              <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                LIVE
              </div>
              <div className="bg-black/60 text-white text-sm px-3 py-1 rounded flex items-center gap-1">
                <FaEye />
                {viewerCount}
              </div>
            </div>
          )}

          {/* Control Bar */}
          <div
            className={`${
              isFullscreen
                ? "fixed bottom-0 left-0 w-full z-50"
                : "absolute bottom-0 left-0 w-full"
            } bg-[#17A56B] flex items-center justify-between px-4 py-1`}
          >
            <div className="flex items-center gap-3">
              <img
                src={league.src}
                alt={league.name}
                className="w-12 h-12 border-2 border-white rounded-md"
              />
              <span className="text-white font-semibold text-lg">
                {league.name}
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
                className="p-2 rounded-lg bg-white text-black hover:bg-gray-300 transition-all"
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
            <Chat onToggleChat={toggleChat} showChat={showChat} />
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

export default LeaguePage;
