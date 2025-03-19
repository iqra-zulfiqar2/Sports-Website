import React from "react";
import { FaFacebook, FaXTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-[#17A56B] text-white text-center py-6 px-1 mt-14 min-h-[180px] flex flex-col justify-center">
      <p className="text-sm font-semibold max-w-4xl mx-auto">
        Disclaimer: This website does not host any videos. All streams are embedded from external sites, such as YouTube. We are not responsible for the legality of the content provided.
      </p>

      {/* Social Media Links */}
      <div className="flex justify-center gap-4 mt-5">
        <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={24} className="hover:text-gray-300 transition" />
        </a>
        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={24} className="hover:text-gray-300 transition" />
        </a>
        <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} className="hover:text-gray-300 transition" />
        </a>
        <a href="https://www.youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={24} className="hover:text-gray-300 transition" />
        </a>
      </div>

      <p className="text-sm mt-4">
        Copyright © 2025 Live Match Zone. All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
