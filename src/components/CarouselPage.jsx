import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SA from "../assets/SA.jpg";
import BBL from "../assets/BBL.jpg";
import BPL from "../assets/BPL.jpg";
import PSL from "../assets/PSL.jpg";
import ILT20 from "../assets/ILT20.jpg";

const t20Leagues = [
  { name: "BBL", src: BBL, slug: "bbl", url: "https://example.com/bbl" },
  { name: "PSL", src: PSL, slug: "psl", url: "https://example.com/psl" },
  { name: "BPL", src: BPL, slug: "bpl", url: "https://example.com/bpl" },
  { name: "SA20", src: SA, slug: "sa20", url: "https://example.com/sa20" },
  { name: "ILT20", src: ILT20, slug: "ilt20", url: "https://example.com/ilt20" },
];

const footballLeagues = [
  { name: "La Liga", src: "https://livematchzone.com/wp-content/uploads/2025/03/La-Liga-1024x597.webp", slug: "la-liga", url: "https://example.com/laliga" },
  { name: "EPL", src: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp", slug: "epl", url: "https://example.com/epl" },
  { name: "UEFA Champions League", src: "https://livematchzone.com/wp-content/uploads/2025/03/Champion-League.webp", slug: "ucl", url: "https://example.com/ucl" },
  { name: "Premier League", src: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp", slug: "premier-league", url: "https://example.com/ucl" },
];

const CarouselPage = () => {
  const navigate = useNavigate();

  const handleImageClick = (slug) => {
    navigate(`/league/${slug}`);
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
    <div className="w-full max-w-6xl mx-auto text-white">
      {/* T20 League Section */}
      <h2 className="text-3xl text-white font-bold mb-4 mt-8">T20 League</h2>
      <Slider {...sliderSettings}>
        {t20Leagues.map((league, index) => (
          <div key={index} className="px-2">
            <img
              src={league.src}
              alt={league.name}
              className="w-full rounded-lg cursor-pointer"
              onClick={() => handleImageClick(league.slug)}
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
              alt={league.name}
              className="w-full rounded-lg cursor-pointer"
              onClick={() => handleImageClick(league.slug)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselPage;
