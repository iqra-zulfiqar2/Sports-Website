import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image:
      "https://livematchzone.com/wp-content/uploads/2025/03/IPL-2025-Team-2.webp",
    slug: "ipl",
  },
  {
    image:
      "https://livematchzone.com/wp-content/uploads/2025/03/UEFA-Champions-League.webp",
    slug: "uefa-champions-league",
  },
];

const t20Leagues = [
  {
    name: "PSL",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pakistan-Super-League.webp",
    slug: "psl",
  },
  {
    name: "BPL",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/BPL-League.webp",
    slug: "bpl",
  },
  {
    name: "PAK VS NZ",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pakistan-vs-New-Zealand-1.webp",
    slug: "pakistan-vs-new-zealand",
  },
  {
    name: "ILT20",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/ILT20-League.webp",
    slug: "ilt20",
  },
];

const footballLeagues = [
  {
    name: "La Liga",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/La-Liga-1024x597.webp",
    slug: "la-liga",
  },
  {
    name: "EPL",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp",
    slug: "epl",
  },
  {
    name: "Premier League",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp",
    slug: "premier-league",
  },
  {
    name: "UEFA Champions League",
    src: "https://livematchzone.com/wp-content/uploads/2025/03/Champion-League.webp",
    slug: "uefa-champions-league",
  },
];

const CarouselPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full text-white">
      <div className="relative w-full h-[500px] overflow-hidden mb-10">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={prevSlide}
        >
          <FaChevronLeft size={18} />
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={nextSlide}
        >
          <FaChevronRight size={18} />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleWatchNow}
            className="bg-[#17A56B] text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg cursor-pointer"
          >
            Watch Now
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl text-white font-bold mb-4">T20 League</h2>
        <Slider {...sliderSettings}>
          {t20Leagues.map((league, index) => (
            <div key={index} className="px-2">
              <img
                src={league.src}
                alt={league.name}
                className="w-full rounded-lg cursor-pointer"
                onClick={() => navigate(`/league/${league.slug}`)}
              />
            </div>
          ))}
        </Slider>

        <h2 className="text-3xl text-white font-bold mt-10 mb-4">
          Football League
        </h2>
        <Slider {...sliderSettings}>
          {footballLeagues.map((league, index) => (
            <div key={index} className="px-2">
              <img
                src={league.src}
                alt={league.name}
                className="w-full rounded-lg cursor-pointer"
                onClick={() => navigate(`/league/${league.slug}`)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarouselPage;
