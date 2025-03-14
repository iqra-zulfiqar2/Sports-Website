import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons

const slides = [
  {
    image: "https://livematchzone.com/wp-content/uploads/2025/03/IPL-2025-Team-2.webp",
    slug: "ipl", // Slug for VideoPage
  },
  {
    image: "https://livematchzone.com/wp-content/uploads/2025/03/UEFA-Champions-League.webp",
    slug: "ucl",
  },
  {
    image: "https://livematchzone.com/wp-content/uploads/2025/03/IPL-2025-Team-2.webp",
    slug: "ipl",
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
    navigate(`/league/${slides[currentSlide].slug}`);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
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

      {/* Left Arrow Button (Smaller Size) */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        <FaChevronLeft size={18} />
      </button>

      {/* Right Arrow Button (Smaller Size) */}
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        <FaChevronRight size={18} />
      </button>

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
