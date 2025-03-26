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
  }, [tabSlug]); // Change useEffect dependency to tabSlug

  // Function to get API details based on active tab
  const getApiDetails = () => {
    switch (activeTab) {
      case "Live":
        return {
          url: "https://cricbuzz-cricket2.p.rapidapi.com/matches/v1/live",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY_LIVE,
            "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST_LIVE,
          },
        };
      case "Recent":
        return {
          url: "https://cricbuzz-cricket2.p.rapidapi.com/matches/v1/recent",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY_RECENT,
            "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST_RECENT,
          },
        };
      case "Upcoming":
        return {
          url: "https://cricbuzz-cricket2.p.rapidapi.com/matches/v1/upcoming",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY_UPCOMING,
            "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST_UPCOMING,
          },
        };
      default:
        return {
          url: "https://cricbuzz-cricket2.p.rapidapi.com/matches/v1/live",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY_LIVE,
            "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST_LIVE,
          },
        };
    }
  };

  const fetchMatches = async () => {
    try {
      const { url, headers } = getApiDetails();
      console.log("Fetching from:", url);
      console.log("Headers:", headers);

      const response = await fetch(url, { method: "GET", headers });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      // Extract matches from nested structure
      let extractedMatches = [];
      if (data.typeMatches) {
        data.typeMatches.forEach((typeMatch) => {
          typeMatch.seriesMatches.forEach((series) => {
            if (series.seriesAdWrapper?.matches) {
              extractedMatches.push(...series.seriesAdWrapper.matches);
            }
          });
        });
      }

      console.log("Extracted Matches:", extractedMatches);
      setMatchData(extractedMatches); // Update state with extracted matches
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
    <div className="bg-gray-900 text-white p-6 mt-6 mx-4 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4">Live Cricket Score</h2>

      {/* Tabs (Always Visible) */}
      <div className="flex gap-4 mb-4 border-b pb-2 border-gray-700">
        {["Live", "Recent", "Upcoming"].map((tabName) => (
          <button
            key={tabName}
            className={`text-lg font-semibold ${
              activeTab === tabName
                ? "text-green-400 border-b-2 border-green-400"
                : "text-white"
            }`}
            onClick={() => handleTabClick(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      {matchData.map((match, index) => (
        <div key={index} className="border border-gray-700 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold bg-gray-800 px-3 py-2 rounded">
            {match.matchInfo.seriesName}
          </h3>
          <div className="p-3">
            <p className="text-md font-bold">
              {match.matchInfo.matchDesc},
              <span className="text-gray-400"> {match.matchInfo.status}</span>
            </p>
            <p className="text-gray-400 text-sm">
              Venue: {match.matchInfo.venueInfo.ground},{" "}
              {match.matchInfo.venueInfo.city}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveScores;
