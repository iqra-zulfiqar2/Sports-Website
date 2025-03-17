import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  // Function to generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const footballItems = [
    { name: "UEFA Champions League" },
    { name: "Premier League" },
    { name: "La Liga" },
    { name: "EPL" },
  ];

  const cricketItems = [{ name: "BPL" }, { name: "IPL" }, { name: "ILT20" }];

  const channelsItems = [
    "A Sports",
    "Astro Cricket",
    "Ten Sports",
    "Willow Sports",
    "PTV Sports",
    "SuperSport",
    "Sky Sports",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // League Items
  const leagueItems = [
    {
      name: "UEFA Champions League",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/03/Champion-League.webp",
    },
    {
      name: "Premier League",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp",
    },
    {
      name: "La Liga",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/03/La-Liga-1024x597.webp",
    },
    {
      name: "PSL",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/03/Pakistan-Super-League.webp",
    },
    {
      name: "BPL",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/03/BPL-League.webp",
    },
    {
      name: "IPL",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/03/IPL-2025-Team-2.webp",
    },
    {
      name: "ILT20",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/03/ILT20-League.webp",
    },
  ];

  // Channel Items
  const channelItems = [
    {
      name: "A Sports",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/01/A-Sports-HD.jpg",
    },
    {
      name: "TNT Sports 4",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4-2.jpg",
    },
    {
      name: "TNT Sports 3",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4.jpg",
    },
    {
      name: "Astro Cricket",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/01/Astro-Cricket.jpg",
    },
    {
      name: "Star Sports 3",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-3.jpg",
    },
  ];

  useEffect(() => {
    if (searchTerm) {
      const filteredLeagues = leagueItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filteredChannels = channelItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults([
        { category: "Leagues", items: filteredLeagues },
        { category: "Channels", items: filteredChannels },
      ]);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (searchResults.length > 0) {
        let allItems = searchResults.flatMap((group) => group.items);
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prev) =>
            e.key === "ArrowDown"
              ? (prev + 1) % allItems.length
              : (prev - 1 + allItems.length) % allItems.length
          );
        } else if (e.key === "Enter") {
          e.preventDefault();
          handleSearchSelect(allItems[activeIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchResults, activeIndex]);

  // UPDATED FUNCTION: Determines if the search result is a league or a channel
  const handleSearchSelect = (item) => {
    setSearchTerm("");
    setSearchResults([]);

    // Check if it's a league or a channel
    if (leagueItems.some((league) => league.name === item.name)) {
      navigate(`/league/${generateSlug(item.name)}`);
    } else if (channelItems.some((channel) => channel.name === item.name)) {
      navigate(`/channel/${generateSlug(item.name)}`);
    }
  };

  return (
    <nav className="bg-black text-white p-4 flex items-center justify-between relative z-50 shadow-md">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-10 mr-4 ml-8 cursor-pointer" />
      </Link>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 pr-10 rounded-full bg-gray-900 text-white focus:outline-none focus:ring-0 focus:border-none w-80 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <span className="absolute inset-y-0 right-3 flex items-center">
            <IoIosSearch className="text-gray-400 text-xl" />
          </span>
        </div>

        {/* Categorized Search Dropdown */}
        {searchResults.some((group) => group.items.length > 0) && (
          <div className="absolute top-full w-80 bg-[#1D1E22] text-white shadow-lg rounded-md z-50 max-h-60 overflow-y-auto border border-gray-700">
            {searchResults.map((group, groupIndex) =>
              group.items.length > 0 ? (
                <div key={groupIndex}>
                  <div className="bg-gray-700 px-4 py-1 text-sm font-semibold">
                    {group.category}
                  </div>
                  {group.items.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSearchSelect(item)}
                      className={`flex items-center px-4 py-2 cursor-pointer transition ${
                        activeIndex === index
                          ? "bg-[#2A2B2F]"
                          : "hover:bg-gray-800"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-8 w-8 mr-3 rounded-full"
                      />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              ) : null
            )}
          </div>
        )}
      </div>

      <div className="flex space-x-6 mr-6">
        <Link
          to="/"
          className="text-[#17A56B] font-semibold hover:text-white transition"
        >
          Home
        </Link>
        <Link to="/live-scores" className="text-white font-semibold hover:text-[#17A56B] transition">
          Live Scores
        </Link> 
        <Link to="/schedule" className="text-white font-semibold hover:text-[#17A56B] transition">
          Schedule
        </Link>


        {/* Football Dropdown */}
        <div
          className="relative dropdown"
          tabIndex="0"
          onMouseEnter={() => setActiveDropdown("football")}
        >
          <button className="font-semibold hover:text-[#17A56B] transition">
            Football ▾
          </button>
          {activeDropdown === "football" && (
            <div className="absolute left-0 w-56 bg-[#17A56B] text-white shadow-lg mt-2 rounded-md z-50 border border-[#128B58]">
              {footballItems.map((item, index) => (
                <span
                  key={index}
                  onClick={() => {
                    navigate(`/league/${generateSlug(item.name)}`);
                    setActiveDropdown(null);
                  }}
                  className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer transition"
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cricket Dropdown */}
        <div
          className="relative dropdown"
          tabIndex="0"
          onMouseEnter={() => setActiveDropdown("cricket")}
        >
          <button className="font-semibold hover:text-[#17A56B] transition">
            Cricket ▾
          </button>
          {activeDropdown === "cricket" && (
            <div className="absolute left-0 w-36 bg-[#17A56B] text-white shadow-lg mt-2 rounded-md z-50 border border-[#128B58]">
              {cricketItems.map((item, index) => (
                <span
                  key={index}
                  onClick={() => {
                    navigate(`/league/${generateSlug(item.name)}`);
                    setActiveDropdown(null);
                  }}
                  className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer transition"
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Channels Dropdown */}
        <div
          className="relative dropdown"
          tabIndex="0"
          onMouseEnter={() => setActiveDropdown("channels")}
        >
          <button className="font-semibold hover:text-[#17A56B] transition">
            Channels ▾
          </button>
          {activeDropdown === "channels" && (
            <div className="absolute left-[-30px] w-48 bg-[#17A56B] text-white shadow-lg mt-2 rounded-md z-50 border border-[#128B58]">
              {channelsItems.map((name, index) => (
                <span
                  key={index}
                  onClick={() => {
                    navigate(`/channel/${generateSlug(name)}`);
                    setActiveDropdown(null);
                  }}
                  className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer transition"
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
