import React from "react";
import logo from "../assets/logo.png";

const WhatsAppPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center z-50">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Pop-up Container (Reduced Height) */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white px-5 py-4 rounded-b-lg shadow-lg text-center w-96">
        {/* Close Button (❌) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
        >
          ❌
        </button>

        {/* Logo */}
        <img
          src={logo}
          alt="Live Match Zone"
          className="mx-auto w-44 h-18 ml-32 mb-3"
        />




        {/* Heading */}
        <h2 className="text-lg font-bold text-black">Live Match Zone</h2>

        {/* Message */}
        <p className="text-[#17A56B] font-medium mb-3">
          📢 Follow Our WhatsApp Channel to Get Live Streaming Links Instantly!
        </p>

        {/* Button to WhatsApp */}
        <a
          href="https://wa.me/your-whatsapp-link" // Replace with your actual WhatsApp channel link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#17A56B] text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-green-600"
        >
          Follow To Get Live Streaming Links
        </a>
      </div>
    </div>
  );
};

export default WhatsAppPopup;
