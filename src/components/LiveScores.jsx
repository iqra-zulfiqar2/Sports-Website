import React, { useState, useEffect } from "react";

const LiveScores = () => {
  const [activeTab, setActiveTab] = useState("Live");
  const [category, setCategory] = useState("All");
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

  // Fetch Matches based on active tab
  const fetchMatches = async () => {
    try {
      const { url, headers } = getApiDetails();
      console.log("Fetching data from:", url); // Debugging log

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMatchData(data.matches || []); // Ensure matchData is always an array
    } catch (error) {
      console.error("Error fetching match data:", error.message);
      setMatchData([]); // Reset matchData in case of an error
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 mt-6 max-w-5xl mx-auto rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Live Cricket Score</h2>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-4 border-b pb-2 border-gray-700">
        {["Live", "Recent", "Upcoming"].map((tab) => (
          <button
            key={tab}
            className={`text-lg font-semibold ${
              activeTab === tab ? "text-green-400 border-b-2 border-green-400" : "text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Category Buttons */}
      <div className="flex gap-4 mb-6">
        {["All", "International", "Domestic", "Women"].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer ${
              category === cat ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Match List */}
      {matchData.length > 0 ? (
        matchData.map((match, index) => (
          <div key={index} className="border border-gray-700 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold bg-gray-800 px-3 py-2 rounded">{match.series}</h3>
            <div className="p-3">
              <p className="text-md font-bold">
                {match.match}, <span className="text-gray-400">{match.status}</span>
              </p>
              <p className="text-gray-400 text-sm">{match.time}</p>
              {match.teams && match.teams.length > 0 ? (
                <div className="border border-gray-700 rounded-md mt-3 p-3 bg-gray-800">
                  {match.teams.map((team, i) => (
                    <div key={i} className="flex justify-between text-lg font-medium">
                      <span>{team.name}</span>
                      <span className={`${team.winner ? "text-green-400 font-bold" : "text-white"}`}>
                        {team.score}
                      </span>
                    </div>
                  ))}
                  <p className="text-green-400 font-semibold mt-2">{match.result}</p>
                </div>
              ) : (
                <p className="text-gray-400">No team data available</p>
              )}
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
