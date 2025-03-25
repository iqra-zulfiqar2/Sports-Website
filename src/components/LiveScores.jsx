import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const tabMapping = {
  "live-matches": "Live",
  "recent-matches": "Recent",
  "upcoming-matches": "Upcoming",
};

const slugMapping = {
  Live: "live-matches",
  Recent: "recent-matches",
  Upcoming: "upcoming-matches",
};

const LiveScores = () => {
  const navigate = useNavigate();
  const { tabSlug } = useParams(); // Read tab slug from URL
  const activeTab = tabMapping[tabSlug] || "Live"; // Convert slug to tab name
  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, [activeTab]);

   // Function to get API details based on active tab
   const getApiDetails = () => {
    switch (activeTab) {
      case "Live":
        return {
          url: "https://cricbuzz-cricket2.p.rapidapi.com/matches/v1/live",
          headers: {
            "X-RapidAPI-Host": "cricbuzz-cricket2.p.rapidapi.com",
            "X-RapidAPI-Key": "6f06e5e892msh2b8dac0aa6aca06p19c763jsn94ae09acb456", // Replace with actual Live API key
          },
        };
      case "Recent":
        return {
          url: "https://cricbuzz-cricket2.p.rapidapi.com/matches/v1/recent",
          headers: {
            "X-RapidAPI-Host": "cricbuzz-cricket2.p.rapidapi.com",
            "X-RapidAPI-Key": "6f06e5e892msh2b8dac0aa6aca06p19c763jsn94ae09acb456", // Replace with actual Recent API key
          },
        };
      case "Upcoming":
        return {
          url: "https://cricbuzz-cricket2.p.rapidapi.com/matches/v1/upcoming",
          headers: {
            "X-RapidAPI-Host": "cricbuzz-cricket2.p.rapidapi.com",
            "X-RapidAPI-Key": "6f06e5e892msh2b8dac0aa6aca06p19c763jsn94ae09acb456", // Replace with actual Upcoming API key
          },
        };
      default:
        return {
          url: "https://cricbuzz-cricket2.p.rapidapi.com/matches/v1/live",
          headers: {
            "X-RapidAPI-Host": "cricbuzz-cricket2.p.rapidapi.com",
            "X-RapidAPI-Key": "YOUR_LIVE_API_KEY_HERE",
          },
        };
    }
  };


  const fetchMatches = async () => {
    try {
      const { url } = getApiDetails();
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "cricbuzz-cricket2.p.rapidapi.com",
          "X-RapidAPI-Key": "YOUR_API_KEY", // Replace with actual API key
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setMatchData(data.matches || []);
    } catch (error) {
      console.error("Error fetching match data:", error.message);
      setMatchData([]);
    }
  };

  // Update URL on tab click (without reloading)
  const handleTabClick = (tabName) => {
    navigate(`/live-scores/${slugMapping[tabName]}`); // Change URL using slug
  };

  return (
    <div className="bg-gray-900 text-white p-6 mt-6 mx-4 md:mx-8 lg:mx-16 xl:mx-24 rounded-lg shadow-md">

      <h2 className="text-2xl font-bold mb-4">Live Cricket Score</h2>

      {/* Tabs (Always Visible) */}
      <div className="flex gap-4 mb-4 border-b pb-2 border-gray-700">
        {["Live", "Recent", "Upcoming"].map((tabName) => (
          <button
            key={tabName}
            className={`text-lg font-semibold ${
              activeTab === tabName ? "text-green-400 border-b-2 border-green-400" : "text-white"
            }`}
            onClick={() => handleTabClick(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* Match List (Content Updates) */}
      {matchData.length > 0 ? (
        matchData.map((match, index) => (
          <div key={index} className="border border-gray-700 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold bg-gray-800 px-3 py-2 rounded">{match.series}</h3>
            <div className="p-3">
              <p className="text-md font-bold">
                {match.match}, <span className="text-gray-400">{match.status}</span>
              </p>
              <p className="text-gray-400 text-sm">{match.time}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No matches available</p>
      )}
    </div>
  );
};

export default LiveScores;
