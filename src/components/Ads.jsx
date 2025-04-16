import React, { useState, useEffect, useRef } from "react";
import CarouselPage from "./CarouselPage.jsx";
import ChannelSection from "./ChannelSection.jsx";
import WhatsAppPopup from "./WhatsappPopup.jsx";
import PWAInstall from "./PWAInstall.jsx";

// Adsterra Component
const AdsterraBanner = () => {
  const adRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//trashycontinuousbubbly.com/329e4e16be857e74719c7bd77be59ed9/invoke.js";
    script.async = true;
    if (adRef.current) {
      adRef.current.innerHTML = "";
      adRef.current.appendChild(script);
    }
  }, []);

  return <div id="ad-container" ref={adRef} style={{ width: "728px", height: "90px", margin: "20px auto" }} />;
};
