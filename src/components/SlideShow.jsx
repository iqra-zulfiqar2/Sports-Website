import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "https://livematchzone.com/wp-content/uploads/2025/03/IPL-2025-Team-2.webp",
    videoUrl: "https://example.com/embed/ipl-live-stream", // Replace with the actual embed link
  },
  {
    image: "https://livematchzone.com/wp-content/uploads/2025/03/UEFA-Champions-League.webp",
    videoUrl: "https://example.com/embed/uefa-live-stream",
  },
  {
    image: "https://livematchzone.com/wp-content/uploads/2025/03/IPL-2025-Team-2.webp",
    videoUrl: "https://example.com/embed/ipl-live-stream",
  },
];

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleWatchNow = () => {
    navigate(`/video?url=${encodeURIComponent(slides[currentSlide].videoUrl)}`);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={handleWatchNow}
          className="bg-[#17A56B] text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg"
        >
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default SlideShow;
