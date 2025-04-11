import React, { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { auth, db } from "../../notifications/firebase";
import Cookies from "universal-cookie";
import Auth from "../Authentication/Auth.jsx"; // Make sure path is correct

const cookies = new Cookies(); // Initialize cookies

const ChannelsChat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const chatRef = useRef(null);

  const messageRef = collection(db, "channels-chat");

  // Get the first name from Firebase's displayName or extract it
  const getFirstName = () => {
    const currentUser = auth.currentUser;
    const fullName = currentUser ? currentUser.displayName : "Guest";
    return fullName.split(" ")[0]; // Get the first part of the name (before any spaces)
  };

  // Assign a color based on user
  const getUserColor = (username) => {
    const colors = [
      "text-pink-500", "text-blue-400", "text-green-500", "text-purple-400",
      "text-amber-500", "text-red-400", "text-cyan-400", "text-orange-400",
      "text-yellow-500", "text-teal-500", "text-lime-500",
      "text-fuchsia-500", "text-violet-500", "text-green-600", "text-pink-600",
    ];

    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(messageRef, orderBy("createdAt", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessages(msgs.reverse());

      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 50);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !isAuthenticated) return;

    const currentUser = auth.currentUser;
    const username = getFirstName(); // Only get the first name

    try {
      await addDoc(messageRef, {
        text: newMessage.trim(),
        createdAt: serverTimestamp(),
        user: username,
        uid: currentUser.uid,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  const handleInputClick = () => {
    if (!isAuthenticated) {
      setIsAuthPopupOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    const firstName = getFirstName();
    if (firstName) {
      setIsAuthenticated(true);
      setIsAuthPopupOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Chat Window */}
      {isChatOpen ? (
        <div
          className="fixed right-0 top-20 w-80 bg-gray-900 mt-6 text-white rounded-l-md overflow-hidden shadow-lg flex flex-col z-50"
          style={{ height: "470px" }}
        >
          {/* Header */}
          <div className="bg-gray-800 py-2 px-4 flex justify-between items-center border-b border-gray-700">
            <span className="font-bold text-sm ml-21">CHANNEL STREAM CHAT</span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Welcome */}
          <div className="text-center py-1 text-gray-500 text-xs">
            Welcome to the chat room!
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 text-sm custom-scrollbar"
            style={{ maxHeight: "calc(400px - 90px)" }}
          >
            {messages.map((message, index) => (
              <div key={index} className="break-words">
                <span className={`${getUserColor(message.user)} font-medium`}>
                  {message.user}:
                </span>
                <span className="text-gray-300 ml-1">{message.text}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="bg-gray-900 p-2 mt-auto">
            <div className="flex gap-1">
              <input
                type="text"
                onClick={handleInputClick}
                className="flex-grow rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                placeholder={
                  isAuthenticated
                    ? "Type your message"
                    : "Please sign in to chat"
                }
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                disabled={!isAuthenticated}
                className="bg-[#17A56B] text-white px-4 py-2 rounded hover:bg-[#14925F] transition-colors text-sm font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed right-0 top-[5.5rem] bg-[#14925F] text-white mt-8 p-1 text-2xl rounded-l-md hover:bg-green-700 transition"
        >
          💬 {/* Chat bubble icon */}
        </button>
      )}

      {/* 🔥 Auth Popup */}
      {isAuthPopupOpen && (
        <Auth
          setIsAuth={handleAuthSuccess}
          onClose={() => setIsAuthPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default ChannelsChat;
