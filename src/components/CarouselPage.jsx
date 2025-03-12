import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const t20Leagues = [
  { src: "https://livematchzone.com/wp-content/uploads/2025/01/BBL-1024x576.jpg", url: "https://example.com/bbl" },
  { src: "https://livematchzone.com/wp-content/uploads/2025/01/PSL-1024x576.jpg", url: "https://example.com/psl" },
  { src: "https://livematchzone.com/wp-content/uploads/2025/01/BPL-1024x576.jpg", url: "https://example.com/bpl" },
  { src: "https://livematchzone.com/wp-content/uploads/2025/01/SA20.jpg", url: "https://example.com/sa20" },
  { src: "https://livematchzone.com/wp-content/uploads/2025/01/ILT20-1024x576.jpg", url: "https://example.com/ilt20" },
  { src: "https://livematchzone.com/wp-content/uploads/2025/01/SA20-1024x576.jpg", url: "https://example.com/sa20" }
];

const footballLeagues = [
  { src: "https://livematchzone.com/wp-content/uploads/2025/03/La-Liga-1024x597.webp", url: "https://example.com/laliga" },
  { src: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp", url: "https://example.com/epl" },
  { src: "https://livematchzone.com/wp-content/uploads/2025/03/Champion-League.webp", url: "https://example.com/ucl" }
];

const CarouselPage = () => {
  const navigate = useNavigate();

  const handleImageClick = (url) => {
    navigate(`/video?url=${encodeURIComponent(url)}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Set autoplay speed to 5 seconds
    arrows: false, // Hide navigation arrows
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-white">
      {/* T20 League Section */}
      <h2 className="text-3xl text-white font-bold mb-4 mt-8">T20 League</h2>
      <Slider {...sliderSettings}>
        {t20Leagues.map((league, index) => (
          <div key={index} className="px-2">
            <img 
              src={league.src} 
              alt={`T20 League ${index + 1}`} 
              className="w-full rounded-lg cursor-pointer" 
              onClick={() => handleImageClick(league.url)}
            />
          </div>
        ))}
      </Slider>

      {/* Football League Section */}
      <h2 className="text-3xl text-white font-bold mt-10 mb-4">Football League</h2>
      <Slider {...sliderSettings}>
        {footballLeagues.map((league, index) => (
          <div key={index} className="px-2">
            <img 
              src={league.src} 
              alt={`Football League ${index + 1}`} 
              className="w-full rounded-lg cursor-pointer" 
              onClick={() => handleImageClick(league.url)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselPage;
