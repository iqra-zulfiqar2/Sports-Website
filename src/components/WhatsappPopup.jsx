import React from "react";
import logo from "../assets/logo.png";

const WhatsAppPopup = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50">
      {/* Background Overlay (Black) */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Pop-up Container (Now at the Top) */}
      <div className="relative bg-black px-6 py-5 rounded-b-lg shadow-lg text-center w-96 border border-black">
        {/* Close Button (❌) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-lg"
        >
          ❌
        </button>

        {/* Logo */}
        <img
          src={logo}
          alt="Live Match Zone"
          className="mx-auto w-32 h-auto mb-3"
        />

        {/* Heading */}
        <h2 className="text-xl font-bold text-white">Live Match Zone</h2>

        {/* Message */}
        <p className="text-[#17A56B] font-medium mb-3">
          📢 Follow Our WhatsApp Channel to Get Live Streaming Links Instantly!
        </p>

        {/* Button to WhatsApp */}
        <a
          href="https://wa.me/your-whatsapp-link" // Replace with your actual WhatsApp channel link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#17A56B] text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
        >
          Follow To Get Live Streaming Links
        </a>
      </div>
    </div>
  );
};

export default WhatsAppPopup;
