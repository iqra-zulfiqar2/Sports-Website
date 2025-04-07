import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");

  const messages = [
    { username: 'nobita_warrior', message: 'ldrop', flags: ['🇪🇸', '🤖'] },
    { username: 'Nightbot', message: 'Mira 3 minutos: Watch this live stream of minecraft for 3 minutes: unlock the cape 🎮', flags: ['🇪🇸', '🇬🇧'] },
    { username: 'mateo_renzo', message: 'sigma', flags: [] },
    { username: 'Ninroy', message: '!claim', flags: [] }
  ];

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className={`fixed right-0 top-[120px] h-3/4 w-80 bg-black text-white transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      
      {/* Drawer Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 bg-[#17A56B] p-2 rounded-l-md"
      >
        {isOpen ? <ChevronRight className="text-white" /> : <ChevronLeft className="text-white" />}
      </button>

      {/* Chat Header */}
      <div className="bg-gray-800 p-3 flex justify-between items-center">
        <h2 className="text-lg font-bold flex-grow text-center">Stream Chat</h2>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-[calc(100%-160px)] overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 text-sm">
            <span>
              {msg.flags.map((flag, flagIndex) => (
                <span key={flagIndex} className="mr-1">{flag}</span>
              ))}
              <span className="font-bold text-blue-400 mr-1">{msg.username}</span>
            </span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-800 flex items-center space-x-2">
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message" 
          className="flex-grow p-2 bg-gray-700 text-white rounded outline-none"
        />
        <button 
          onClick={sendMessage}
          className="bg-[#17A56B] hover:bg-[#149158] text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
