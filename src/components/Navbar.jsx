import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";


const Navbar = () => {
  const [isFootballOpen, setIsFootballOpen] = useState(false);
  const [isCricketOpen, setIsCricketOpen] = useState(false);
  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  // Function to generate slug from name
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  const footballItems = [
    { name: "UEFA Champions League" },
    { name: "Premier League" },
    { name: "La Liga League" }
  ];

  const cricketItems = [
    { name: "BBL Matches" },
    { name: "BPL Matches" },
    { name: "IPL Matches" }
  ];

  const channelsItems = [
    "A Sports", "Astro Cricket", "Ten Sports",
    "Willow Sports", "PTV Sports", "SuperSport", "Sky Sports"
  ];
 // Dummy Data (Replace with API data if needed)
 const allItems = [
  { name: "UEFA Champions League", image: "https://livematchzone.com/wp-content/uploads/2025/03/Champion-League.webp" },
  { name: "Premier League", image: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp" },
  { name: "La Liga League", image: "https://livematchzone.com/wp-content/uploads/2025/03/La-Liga-1024x597.webp" },
  { name: "ILT20", image: "https://livematchzone.com/wp-content/uploads/2025/03/ILT20-League.webp" },
  { name: "A Sports", image: "https://livematchzone.com/wp-content/uploads/2025/01/A-Sports-HD.jpg" },
  { name: "TNT Sports 4", image: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4-2.jpg" },
  { name: "TNT Sports 3", image: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4.jpg" },
  { name: "Astro Cricket", image: "https://livematchzone.com/wp-content/uploads/2025/01/Astro-Cricket.jpg" },
  { name: "Star Sports 3", image: "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-3.jpg" }
];


useEffect(() => {
  if (searchTerm) {
    const filteredResults = allItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  } else {
    setSearchResults([]);
  }
}, [searchTerm]);

useEffect(() => {
  const handleKeyDown = (e) => {
    if (searchResults.length > 0) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          e.key === "ArrowDown"
            ? (prev + 1) % searchResults.length
            : (prev - 1 + searchResults.length) % searchResults.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSearchSelect(searchResults[activeIndex]);
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [searchResults, activeIndex]);

const handleSearchSelect = (item) => {
  setSearchTerm("");
  setSearchResults([]);
  navigate(`/league/${generateSlug(item.name)}`);
};

return (
  <nav className="bg-black text-white p-4 flex items-center justify-between relative z-50">
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="h-10 mr-2 ml-8" />
    </div>

    {/* Search Bar */}
    <div className="flex-1 flex justify-center relative">
      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 rounded-full border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-0 w-80"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Dropdown List */}
      {searchResults.length > 0 && (
        <div className="absolute top-full w-80 bg-[#1D1E22] text-white shadow-lg mt-1 rounded-md z-50 max-h-60 overflow-y-auto">
          {searchResults.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSearchSelect(item)}
              className={`flex items-center px-4 py-2 cursor-pointer ${
                activeIndex === index ? "bg-[#2A2B2F]" : ""
              }`}
            >
              <img src={item.image} alt={item.name} className="h-8 w-8 mr-3 rounded-full" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
      <div className="flex space-x-6 mr-4">
        <Link to="/" className="text-[#17A56B] font-semibold">Home</Link>

        {/* Football Dropdown */}
        <div
          className="relative"
          tabIndex="0"
          onMouseEnter={() => setIsFootballOpen(true)}
          onMouseLeave={() => setIsFootballOpen(false)}
        >
          <button className="font-semibold hover:text-[#17A56B]">Football ▾</button>
          {isFootballOpen && (
            <div className="absolute left-0 w-56 bg-[#17A56B] text-white shadow-lg mt-1 z-50">
              {footballItems.map((item, index) => (
                <span
                  key={index}
                  onClick={() => navigate(`/video/${generateSlug(item.name)}`)}
                  className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer"
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cricket Dropdown */}
        <div
          className="relative"
          tabIndex="0"
          onMouseEnter={() => setIsCricketOpen(true)}
          onMouseLeave={() => setIsCricketOpen(false)}
        >
          <button className="font-semibold hover:text-[#17A56B]">Cricket ▾</button>
          {isCricketOpen && (
            <div className="absolute left-0 w-36 bg-[#17A56B] text-white shadow-lg mt-1 z-50">
              {cricketItems.map((item, index) => (
                <span
                  key={index}
                  onClick={() => navigate(`/video/${generateSlug(item.name)}`)}
                  className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer"
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Channels Dropdown */}
        <div
          className="relative mr-6"
          tabIndex="0"
          onMouseEnter={() => setIsChannelsOpen(true)}
          onMouseLeave={() => setIsChannelsOpen(false)}
        >
          <button className="font-semibold hover:text-[#17A56B]">Channels ▾</button>
          {isChannelsOpen && (
            <div className="absolute left-[-30px] w-48 bg-[#17A56B] text-white shadow-lg mt-1 z-50">
              {channelsItems.map((name, index) => (
                <span
                  key={index}
                  onClick={() => navigate(`/channel/${generateSlug(name)}`)}
                  className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
