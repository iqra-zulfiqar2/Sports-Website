import React from "react";
import { FaWhatsapp } from "react-icons/fa"; 
import { IoClose } from "react-icons/io5";


const WhatsAppPopup = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* Background Overlay (Black with Opacity) */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Pop-up Container */}
      <div className="relative bg-black px-6 py-5 rounded-lg shadow-lg text-center w-96 border border-black">
        {/* Close Button (White Color) */}
       {/* Close Button (White Icon) */}
       <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300 text-2xl"
        >
          <IoClose />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white mb-2">Live Match Zone</h2>

        {/* Message */}
        <p className="text-[#17A56B] font-medium mb-4">
          📢 Follow Our WhatsApp Channel to Get Live Streaming Links Instantly!
        </p>

        {/* Button to WhatsApp */}
        <a
          href="https://wa.me/your-whatsapp-link" // Replace with actual WhatsApp channel link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#17A56B] text-white px-5 py-2 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition"
        >
          <FaWhatsapp className="text-2xl" /> Follow for Live Streaming Links
        </a>
      </div>
    </div>
  );
};

export default WhatsAppPopup;
