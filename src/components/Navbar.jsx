import React, { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isFootballOpen, setIsFootballOpen] = useState(false);
  const [isCricketOpen, setIsCricketOpen] = useState(false);
  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [isTNTSubmenuOpen, setIsTNTSubmenuOpen] = useState(false);
  const [isStarSubmenuOpen, setIsStarSubmenuOpen] = useState(false);

  const toggleFootballMenu = () => {
    setIsFootballOpen(!isFootballOpen);
    setIsCricketOpen(false);
    setIsChannelsOpen(false);
  };

  const toggleCricketMenu = () => {
    setIsCricketOpen(!isCricketOpen);
    setIsFootballOpen(false);
    setIsChannelsOpen(false);
  };

  const toggleChannelsMenu = () => {
    setIsChannelsOpen(!isChannelsOpen);
    setIsFootballOpen(false);
    setIsCricketOpen(false);
  };

  return (
    <nav className="bg-black text-white p-4 flex items-center justify-between relative z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 mr-2 ml-8" />
      </div>
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-1.5 rounded-full border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-0 w-80"
        />
      </div>
      <div className="flex space-x-6 mr-4">
        <a href="#home" className="text-[#17A56B] font-semibold">
          Home
        </a>

        {/* Football Dropdown */}
        <div className="relative">
          <button
            className={`font-semibold ${
              isFootballOpen ? "text-[#17A56B]" : "text-white"
            } hover:text-[#17A56B]`}
            onClick={toggleFootballMenu}
          >
            Football ▾
          </button>
          {isFootballOpen && (
            <div className="absolute left-0 w-48 bg-[#17A56B] text-white shadow-lg mt-1 z-50">
              <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
                UEFA Champions League
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
                Premier League
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
                La Liga League
              </a>
            </div>
          )}
        </div>

        {/* Cricket Dropdown */}
        <div className="relative">
          <button
            className={`font-semibold ${
              isCricketOpen ? "text-[#17A56B]" : "text-white"
            } hover:text-[#17A56B]`}
            onClick={toggleCricketMenu}
          >
            Cricket ▾
          </button>
          {isCricketOpen && (
            <div className="absolute left-0 w-48 bg-[#17A56B] text-white shadow-lg mt-1 z-50">
              <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
                BBL Matches
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
                BPL Matches
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
                IPL Matches
              </a>
            </div>
          )}
        </div>


        {/* Channels Dropdown */}
        <div className="relative">
  <button
    className={`font-semibold ${
      isChannelsOpen ? "text-[#17A56B]" : "text-white"
    } hover:text-[#17A56B]`}
    onClick={toggleChannelsMenu}
  >
    Channels ▾
  </button>
  {isChannelsOpen && (
    <div className="absolute left-[-80px] w-50 bg-[#17A56B] text-white shadow-lg mt-1 z-50">
      <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
        Willow Cricket
      </a>
      <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
        Sky Sports Cricket
      </a>

      {/* TNT Sports 1 Submenu */}
      <div
        className="relative"
        onMouseEnter={() => setIsTNTSubmenuOpen(true)}
        onMouseLeave={() => setIsTNTSubmenuOpen(false)}
      >
        <a href="#" className="block px-4 py-2 bg-white text-[#17A56B] font-bold">
          TNT Sports 1 ▸
        </a>
        {isTNTSubmenuOpen && (
          <div className="absolute left-full top-0 w-48 bg-[#17A56B] text-white shadow-lg">
            <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
              TNT Extra 1
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
              TNT Extra 2
            </a>
          </div>
        )}
      </div>

      <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
        A Sports HD
      </a>
      <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
        PTV Sports
      </a>
      <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
        T Sports HD
      </a>

      {/* Star Sports 1 Submenu */}
      <div
        className="relative"
        onMouseEnter={() => setIsStarSubmenuOpen(true)}
        onMouseLeave={() => setIsStarSubmenuOpen(false)}
      >
        <a href="#" className="block px-4 py-2 bg-white text-[#17A56B] font-bold">
          Star Sports 1 ▸
        </a>
        {isStarSubmenuOpen && (
          <div className="absolute left-full top-0 w-48 bg-[#17A56B] text-white shadow-lg">
            <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
              Star Extra 1
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
              Star Extra 2
            </a>
          </div>
        )}
      </div>

      <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
        Supersport Cricket
      </a>
      <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
        Ten Sports
      </a>
      <a href="#" className="block px-4 py-2 hover:bg-white hover:text-[#17A56B]">
        Astro Cricket
      </a>
    </div>
  )}
</div>

      </div>
    </nav>
  );
};

export default Navbar;



