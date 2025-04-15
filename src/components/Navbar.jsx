import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import tsports from "../assets/tsports.png";
import Willow from "../assets/Willow.png";
import gtv from "../assets/gtv.png";
import foxsports from "../assets/foxsports.jpg";
import logo1 from "../assets/logo1.png";
import mainLogo from "../assets/mainLogo.png";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  const generateSlug = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const footballItems = [
    { name: "UEFA Champions League" },
    { name: "Premier League" },
    { name: "La Liga" },
  ];

  const cricketItems = [
    { name: "BPL" },
    { name: "IPL" },
    { name: "ILT20" },
    { name: "PSL" },
  ];

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
      name: "Star Sports 1",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/01/Star-Sports-1.jpg",
    },
    {
      name: "Star Sports 2",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-2.jpg",
    },
    {
      name: "Star Sports 3",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-3.jpg",
    },
    {
      name: "Sky Sports",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/01/Sky-Sports-Cricket.jpg",
    },
    {
      name: "SuperSport",
      image:
        "https://livematchzone.com/wp-content/uploads/2025/01/SuperSport-Cricket.jpg",
    },
    {
      name: "T Sports",
      image: tsports,
    },
    {
      name: "Willow 2",
      image: Willow,
    },
    {
      name: "GTV",
      image: gtv,
    },
    {
      name: "Fox Sports",
      image: foxsports,
    },
  ];
  const channelsItems = [
    { name: "Willow Sports"},
    { name: "Sky Sports" },
    {
      name: "TNT Sports 1",
      submenu: ["TNT Sports 2", "TNT Sports 3", "TNT Sports 4"],
    },
    { name: "A Sports" },
    { name: "PTV Sports" },
    { name: "T Sports HD" },
    {
      name: "Star Sports 1",
      submenu: ["Star Sports 2", "Star Sports 3"],
    },
    { name: "SuperSport" },
    { name: "Ten Sports" },
    { name: "Astro Cricket" },
    { name: "Willow 2"},
    { name: "GTV"},
    { name: "Fox Sports"},
  ];


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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


  const handleCricketNavigation = (name) => {
    const slug = name.toLowerCase();
    if (slug === "ipl") {
      navigate("/cricket/t20-league/watch-live-free-ipl-matches");
    } else if (slug === "psl") {
      navigate("/cricket/t20-league/watch-live-free-psl-matches");
    } else if (slug === "bpl") {
      navigate("/cricket/t20-league/watch-live-free-bpl-matches");
    } else if (slug === "ilt20") {
      navigate("/cricket/t20-league/watch-live-free-ilt20-matches");
    } else {
      navigate(`/league/${generateSlug(name)}`);
    }
    setActiveDropdown(null);
  };

  const handleFootballNavigation = (name) => {
    navigate(`/${generateSlug(name)}-live-streaming-free/`);
    setActiveDropdown(null);
  };

  const handleSearchSelect = (item) => {
    setSearchTerm("");
    setSearchResults([]);
  
    const isFootball = footballItems.some((f) => f.name === item.name);
    const isCricket = cricketItems.some((c) => c.name === item.name);
  
    if (isFootball) {
      navigate(`/${generateSlug(item.name)}-live-streaming-free/`);
    } else if (isCricket) {
      const slug = item.name.toLowerCase();
      if (slug === "ipl") {
        navigate("/cricket/t20-league/watch-live-free-ipl-matches");
      } else if (slug === "psl") {
        navigate("/cricket/t20-league/watch-live-free-psl-matches");
      } else if (slug === "bpl") {
        navigate("/cricket/t20-league/watch-live-free-bpl-matches");
      } else if (slug === "ilt20") {
        navigate("/cricket/t20-league/watch-live-free-ilt20-matches");
      } else {
        navigate(`/league/${generateSlug(item.name)}`);
      }
    } else if (channelItems.some((channel) => channel.name === item.name)) {
      navigate(`/channel/${generateSlug(item.name)}`);
    }
  };
  



  return (
    <nav className="bg-black text-white p-1 flex items-center justify-between relative z-50 shadow-md">
      <div className="flex items-center space-x-6">
        <Link to="/">
          <img src={mainLogo} alt="Logo" className="h-15 mr-4 ml-2 cursor-pointer" />
        </Link>

        <Link to="/" className="text-[#17A56B] font-semibold hover:text-white">Home</Link>
        <Link to="/live-scores" className="text-white font-semibold hover:text-[#17A56B]">Live Scores</Link>
        <Link to="/schedule" className="text-white font-semibold hover:text-[#17A56B]">Schedule</Link>

        {/* Football Dropdown */}
        <div
          className="relative dropdown"
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
                  onClick={() => handleFootballNavigation(item.name)}
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
                  onClick={() => handleCricketNavigation(item.name)}
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
          onMouseEnter={() => setActiveDropdown("channels")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button className="font-semibold hover:text-[#17A56B] transition">
            Channels ▾
          </button>
          {activeDropdown === "channels" && (
            <div className="absolute left-0 w-48 bg-[#17A56B] text-white shadow-lg mt-2 rounded-md z-50 border border-[#128B58]">
              {channelsItems.map((channel, index) => (
                <div key={index} className="relative">
                  <span
                    onMouseEnter={() =>
                      channel.submenu
                        ? setActiveSubmenu(channel.name)
                        : setActiveSubmenu(null)
                    }
                    onClick={() => {
                      if (!channel.submenu) {
                        navigate(`/channel/${generateSlug(channel.name)}`);
                        setActiveDropdown(null);
                      }
                    }}
                    className={`block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer transition ${
                      channel.submenu ? "flex justify-between items-center" : ""
                    }`}
                  >
                    {channel.name}
                    {channel.submenu && "▸"}
                  </span>

                  {/* Submenu */}
                  {channel.submenu && activeSubmenu === channel.name && (
                    <div className="absolute left-full top-0 w-48 bg-[#17A56B] text-white shadow-lg rounded-md z-50 border border-[#128B58]">
                      {channel.submenu.map((sub, subIndex) => (
                        <span
                          key={subIndex}
                          onClick={() => {
                            navigate(`/channel/${generateSlug(sub)}`);
                            setActiveDropdown(null);
                            setActiveSubmenu(null);
                          }}
                          className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer transition"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <Link
          to="/games"
          className="text-white font-semibold hover:text-[#17A56B] transition"
        >
          Games
        </Link>
      </div>

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
    </nav>
  );
};

export default Navbar;
