import React, { useState, useRef, useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PSLChat from "./LiveChat/PSLChat.jsx";
import PredictionPoll from "./PredictionPoll.jsx";

const pslData = {
  name: "PSL",
  src: "https://livematchzone.com/wp-content/uploads/2025/03/Pakistan-Super-League.webp",
  url: "https://tamashalive.github.io/ten-sports.html",
};

const PSLPage = () => {
  const videoWrapperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [likes, setLikes] = useState(1200);
  const [dislikes, setDislikes] = useState(10);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [viewerCount, setViewerCount] = useState(405);
  const [adsDisabled, setAdsDisabled] = useState(false);
  const [showChat, setShowChat] = useState(true);

  const toggleChat = () => setShowChat(!showChat);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 5 + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = `Watch Free Live ${pslData.name} Online`;
  }, []);

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

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoWrapperRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <div
        className={`flex flex-col items-center text-center mt-6 ${
          showChat ? "w-[70%]" : "w-full"
        }`}
      >
        <h1 className={`text-3xl font-bold ${showChat ? "mr-86" : "mx-auto"}`}>
          Watch Free Live {pslData.name} Online
        </h1>
        <marquee className="text-[#17A56B] font-bold text-lg w-[50%]">
          Click "Unmute Stream" Button to Get Voice
        </marquee>
      </div>

      <div className="flex w-full max-w-6xl mt-4">
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
              src={pslData.url}
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

          <div
            className={`${
              isFullscreen
                ? "fixed bottom-0 left-0 w-full z-50"
                : "absolute bottom-0 left-0 w-full"
            } bg-[#17A56B] flex items-center justify-between px-4 py-1`}
          >
            <div className="flex items-center gap-3">
              <img
                src={pslData.src}
                alt={pslData.name}
                className="w-12 h-12 border-2 border-white rounded-md"
              />
              <span className="text-white font-semibold text-lg">
                {pslData.name}
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

        {showChat ? (
          <div className="w-[30%] ml-4">
            <PSLChat onToggleChat={toggleChat} showChat={showChat} />
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

      <button
        className={`mt-4 px-6 py-2 rounded-md text-white transition-all ${
          showChat ? "mr-86" : ""
        }`}
        onClick={() => setAdsDisabled(!adsDisabled)}
        style={{ backgroundColor: adsDisabled ? "#DC3545" : "#17A56B" }}
      >
        {adsDisabled ? "Enable Ads" : "Disable Ads"}
      </button>

      <div className="w-[70%] flex justify-center mt-4 mr-82">
        <PredictionPoll />
      </div>

      <ToastContainer />
    </div>
  );
};

export default PSLPage;
