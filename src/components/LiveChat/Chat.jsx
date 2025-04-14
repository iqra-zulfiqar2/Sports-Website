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
import Auth from "../Authentication/Auth.jsx";

const cookies = new Cookies();

const Chat = ({ onToggleChat, showChat }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const chatRef = useRef(null);

  const messageRef = collection(db, "messages");

  // Get first name from Firebase user
  const getFirstName = () => {
    const user = auth.currentUser;
    const fullName = user?.displayName || cookies.get("first-name") || "Guest";
    return fullName.split(" ")[0];
  };

  const getUserColor = (username) => {
    const colors = [
      "text-pink-500", "text-blue-400", "text-green-500", "text-purple-400",
      "text-amber-500", "text-red-400", "text-cyan-400", "text-orange-400",
      "text-yellow-500", "text-teal-500", "text-indigo-500", "text-lime-500",
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
      setIsAuthenticated(!!user);
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
    
      const user = auth.currentUser;
      const username = getFirstName();
      const messageToSend = newMessage.trim();
    
      setNewMessage(""); // Clear input right away
    
      try {
        await addDoc(messageRef, {
          text: messageToSend,
          createdAt: serverTimestamp(),
          user: username,
          uid: user.uid,
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };
    

  const handleInputClick = () => {
    if (!isAuthenticated) {
      setIsAuthPopupOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthPopupOpen(false);
  };

  return (
    <div className="relative">
      {showChat ? (
        <div
          className="fixed right-0 top-20 w-80 bg-gray-900 mt-6 text-white rounded-l-md overflow-hidden shadow-lg flex flex-col z-50"
          style={{ height: "470px" }}
        >
          <div className="bg-gray-800 py-2 px-4 flex justify-between items-center border-b border-gray-700">
            <span className="font-bold text-sm ml-17">LEAGUE STREAM CHAT</span>
            <button onClick={onToggleChat} className="text-white hover:text-white">
              ✕
            </button>
          </div>

          <div className="text-center py-1 text-gray-500 text-xs">
            Welcome to the chat room!
          </div>

          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 text-sm custom-scrollbar"
            style={{ maxHeight: "calc(400px - 90px)" }}
          >
            {messages.map((message) => (
              <div key={message.id} className="break-words">
                <span className={`${getUserColor(message.user)} font-medium`}>
                  {message.user}:
                </span>
                <span className="text-gray-300 ml-1">{message.text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-900 p-2 mt-auto">
            <div className="flex gap-1">
              <input
                type="text"
                onClick={handleInputClick}
                className="flex-grow rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                placeholder={isAuthenticated ? "Type your message" : "Please sign in to chat"}
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
          onClick={onToggleChat}
          className="fixed right-0 top-[5.5rem] bg-[#14925F] text-white mt-8 p-1 text-2xl rounded-l-md hover:bg-green-700 transition"
        >
          💬
        </button>
      )}

      {isAuthPopupOpen && (
        <Auth
          setIsAuth={handleAuthSuccess}
          onClose={() => setIsAuthPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default Chat;
