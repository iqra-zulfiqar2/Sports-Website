import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firebase config
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { FaCommentDots } from "react-icons/fa";

const LiveChat = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "messages"),
      (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );
    return () => unsubscribe();
  }, []);

  // Send message
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };

  return (
    <div>
      {/* Chat Bubble Button */}
      <button
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg text-white hover:bg-green-600"
        onClick={() => setShowChat(!showChat)}
      >
        <FaCommentDots size={24} />
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-16 right-6 w-80 bg-white text-black rounded-lg shadow-lg">
          <div className="p-4 border-b bg-green-500 text-white font-bold">
            Live Chat
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-2 p-2 bg-gray-200 rounded">
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 rounded-r"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
