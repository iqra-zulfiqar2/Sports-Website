import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import mainLogo from "../assets/mainLogo.png";
import tsports from "../assets/tsports.png";
import Willow from "../assets/Willow.png";
import gtv from "../assets/gtv.png";
import foxsports from "../assets/foxsports.jpg";
import AdBanner from "./AdBanner.jsx";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cricketOpen, setCricketOpen] = useState(false);
  const [footballOpen, setFootballOpen] = useState(false);
  const [channelsOpen, setChannelsOpen] = useState(false);

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
    { name: "UEFA Champions League", image: "https://livematchzone.com/wp-content/uploads/2025/03/Champion-League.webp" },
    { name: "Premier League", image: "https://livematchzone.com/wp-content/uploads/2025/03/Pages-Banners.webp" },
    { name: "La Liga", image: "https://livematchzone.com/wp-content/uploads/2025/03/La-Liga-1024x597.webp" },
    { name: "PSL", image: "https://livematchzone.com/wp-content/uploads/2025/03/Pakistan-Super-League.webp" },
    { name: "BPL", image: "https://livematchzone.com/wp-content/uploads/2025/03/BPL-League.webp" },
    { name: "IPL", image: "https://livematchzone.com/wp-content/uploads/2025/03/IPL-2025-Team-2.webp" },
    { name: "ILT20", image: "https://livematchzone.com/wp-content/uploads/2025/03/ILT20-League.webp" },
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
    { name: "T Sports" },
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
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
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
    if (slug === "ipl") navigate("/cricket/t20-league/watch-live-free-ipl-matches");
    else if (slug === "psl") navigate("/cricket/t20-league/watch-live-free-psl-matches");
    else if (slug === "bpl") navigate("/cricket/t20-league/watch-live-free-bpl-matches");
    else if (slug === "ilt20") navigate("/cricket/t20-league/watch-live-free-ilt20-matches");
    else navigate(`/league/${generateSlug(name)}`);
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
      handleCricketNavigation(item.name);
    } else if (channelItems.some((channel) => channel.name === item.name)) {
      navigate(`/channel/${generateSlug(item.name)}`);
    }
  };

  return (
    <>
      <nav className="bg-black text-white p-2 flex items-center justify-between relative z-50 shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/">
            <img src={mainLogo} alt="Logo" className="h-12 cursor-pointer" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-[#17A56B] font-semibold hover:text-white">Home</Link>
          <Link to="/live-scores" className="font-semibold hover:text-[#17A56B]">Live Scores</Link>
          <Link to="/schedule" className="font-semibold hover:text-[#17A56B]">Schedule</Link>
          <div className="relative dropdown" onMouseEnter={() => setActiveDropdown("football")}>
            <button className="font-semibold hover:text-[#17A56B]">Football ▾</button>
            {activeDropdown === "football" && (
              <div className="absolute left-0 w-56 bg-[#17A56B] text-white shadow-lg mt-2 rounded-md z-50">
                {footballItems.map((item, idx) => (
                  <span key={idx} onClick={() => handleFootballNavigation(item.name)} className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer">
                    {item.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="relative dropdown" onMouseEnter={() => setActiveDropdown("cricket")}>
            <button className="font-semibold hover:text-[#17A56B]">Cricket ▾</button>
            {activeDropdown === "cricket" && (
              <div className="absolute left-0 w-36 bg-[#17A56B] text-white shadow-lg mt-2 rounded-md z-50">
                {cricketItems.map((item, idx) => (
                  <span key={idx} onClick={() => handleCricketNavigation(item.name)} className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer">
                    {item.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="relative dropdown" onMouseEnter={() => setActiveDropdown("channels")}>
            <button className="font-semibold hover:text-[#17A56B]">Channels ▾</button>
            {activeDropdown === "channels" && (
              <div className="absolute left-0 w-48 bg-[#17A56B] text-white shadow-lg mt-2 rounded-md z-50">
                {channelsItems.map((channel, index) => (
                  <div key={index} className="relative">
                    <span onClick={() => {
                      if (!channel.submenu) {
                        navigate(`/channel/${generateSlug(channel.name)}`);
                        setActiveDropdown(null);
                      }
                    }} className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer transition">
                      {channel.name}
                    </span>
                    {channel.submenu && (
                      <div className="absolute left-full top-0 w-48 bg-[#17A56B] shadow-lg rounded-md z-50">
                        {channel.submenu.map((sub, subIndex) => (
                          <span key={subIndex} onClick={() => {
                            navigate(`/channel/${generateSlug(sub)}`);
                            setActiveDropdown(null);
                          }} className="block px-4 py-2 hover:bg-white hover:text-[#17A56B] cursor-pointer">
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
          <Link to="/games" className="font-semibold hover:text-[#17A56B]">Games</Link>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-xs mx-auto md:mx-0 md:w-80">
          <input type="text" placeholder="Search" className="px-4 py-2 pr-10 rounded-full bg-gray-900 text-white w-full focus:outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <IoIosSearch className="text-gray-400 text-xl" />
          </span>
          {searchResults.some(group => group.items.length > 0) && (
            <div className="absolute top-full mt-1 w-full bg-[#1D1E22] text-white shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
              {searchResults.map((group, groupIndex) =>
                group.items.length > 0 && (
                  <div key={groupIndex}>
                    <div className="bg-gray-700 px-4 py-1 text-sm font-semibold">{group.category}</div>
                    {group.items.map((item, index) => (
                      <div key={index} onClick={() => handleSearchSelect(item)} className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
                        <img src={item.image} alt={item.name} className="h-8 w-8 mr-3 rounded-full" />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-2xl ml-4 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <GiHamburgerMenu />
        </button>
      </nav>

      {/* Mobile Menu with Dropdowns */}
      {mobileMenuOpen && (
         <div className="md:hidden bg-black text-white px-4 py-2 space-y-2 z-40">
          <Link to="/" className="block" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/live-scores" className="block" onClick={() => setMobileMenuOpen(false)}>Live Scores</Link>
          <Link to="/schedule" className="block" onClick={() => setMobileMenuOpen(false)}>Schedule</Link>
          <Link to="/games" className="block" onClick={() => setMobileMenuOpen(false)}>Games</Link>

          {/* Cricket Dropdown */}
          <div>
            <button onClick={() => setCricketOpen(!cricketOpen)} className="w-full text-left font-semibold cursor-pointer">
            Cricket {cricketOpen ? "▴" : "▾"}
            </button>
            {cricketOpen && (
              <div className="ml-4 mt-1 space-y-1 cursor-pointer">
                {cricketItems.map((item, idx) => (
                  <span key={idx} className="block" onClick={() => {
                    handleCricketNavigation(item.name);
                    setMobileMenuOpen(false);
                  }}>{item.name}</span>
                ))}
              </div>
            )}
          </div>

          {/* Football Dropdown */}
          <div>
            <button onClick={() => setFootballOpen(!footballOpen)} className="w-full text-left font-semibold cursor-pointer">
            Football {footballOpen ? "▴" : "▾"}
            </button>
            {footballOpen && (
              <div className="ml-4 mt-1 space-y-1 cursor-pointer">
                {footballItems.map((item, idx) => (
                  <span key={idx} className="block" onClick={() => {
                    handleFootballNavigation(item.name);
                    setMobileMenuOpen(false);
                  }}>{item.name}</span>
                ))}
              </div>
            )}
          </div>

     {/* Channels Dropdown */}
<div>
  <button
    onClick={() => {
      setChannelsOpen(!channelsOpen);
      setActiveSubmenu(null); // Reset any open submenu when toggling main dropdown
    }}
    className="w-full text-left font-semibold cursor-pointer"
  >
    Channels {channelsOpen ? "▴" : "▾"}
  </button>

  {channelsOpen && (
    <div className="ml-4 mt-1 space-y-1 cursor-pointer">
      {channelsItems.map((item, idx) => (
        <div key={idx}>
          <span
            className="block"
            onClick={() => {
              if (!item.submenu) {
                navigate(`/channel/${generateSlug(item.name)}`);
                setMobileMenuOpen(false);
              } else {
                setActiveSubmenu((prev) =>
                  prev === item.name ? null : item.name
                );
              }
            }}
          >
            {item.name}
          </span>

          {item.submenu && activeSubmenu === item.name && (
            <div className="ml-4 mt-1 space-y-1">
              {item.submenu.map((sub, subIdx) => (
                <span
                  key={subIdx}
                  className="block"
                  onClick={() => {
                    navigate(`/channel/${generateSlug(sub)}`);
                    setMobileMenuOpen(false);
                  }}
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
</div>
)}

      {/* Ad Banner */}
      <div className="flex justify-start mt-6 mb-10 ml-10">
        <AdBanner />
      </div>
    </>
  );
};

export default Navbar;
