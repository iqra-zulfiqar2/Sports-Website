import React, { useState } from "react";

const LiveScores = () => {
  const [activeTab, setActiveTab] = useState("Live");
  const [category, setCategory] = useState("All");

  const matchData = [
    {
      series: "MALAYSIA TRI-NATION T20I SERIES, 2025",
      match: "Hong Kong vs Bahrain",
      status: "Final",
      time: "Today • 8:00 AM at Kuala Lumpur, Bayuemas Oval",
      teams: [
        { name: "HK", score: "126-5 (20 Ovs)" },
        { name: "BHR", score: "129-2 (16.4 Ovs)", winner: true },
      ],
      result: "Bahrain won by 8 wkts",
    },
    {
      series: "FALKLAND ISLANDS TOUR OF COSTA RICA 2025",
      match: "Costa Rica vs Falkland Islands",
      status: "6th T20I",
      time: "Mar 13 • 8:00 PM at Guacima, Los Reyes Polo Club",
      teams: [
        { name: "CRI", score: "102 (20 Ovs)" },
        { name: "FALK", score: "55-9 (20 Ovs)" },
      ],
      result: "Costa Rica won by 47 runs",
    },
  ];

  return (
    <div className="bg-gray-900 text-white p-6 mt-6 max-w-5xl mx-auto rounded-lg shadow-md">
      {/* Top Navigation Tabs */}
      <div className="flex border-b border-gray-700 mb-4">
        {["Current Matches", "Current & Future Series", "Matches By Day", "Teams", "Series Archive"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === tab ? "text-green-400 border-b-2 border-green-400" : "text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Live Cricket Score Heading */}
      <h2 className="text-2xl font-bold mb-4">Live Cricket Score</h2>

      {/* Live, Recent, Upcoming Tabs */}
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

      {/* Category Filters */}
      <div className="flex gap-4 mb-6">
        {["All", "International", "Domestic", "Women"].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              category === cat ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Match Cards */}
      {matchData.map((match, index) => (
        <div key={index} className="border border-gray-700 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold bg-gray-800 px-3 py-2 rounded">{match.series}</h3>
          <div className="p-3">
            <p className="text-md font-bold">{match.match}, <span className="text-gray-400">{match.status}</span></p>
            <p className="text-gray-400 text-sm">{match.time}</p>
            {match.teams.length > 0 && (
              <div className="border border-gray-700 rounded-md mt-3 p-3 bg-gray-800">
                {match.teams.map((team, i) => (
                  <div key={i} className="flex justify-between text-lg font-medium">
                    <span>{team.name}</span>
                    <span className={`${team.winner ? "text-green-400 font-bold" : "text-white"}`}>{team.score}</span>
                  </div>
                ))}
                <p className="text-green-400 font-semibold mt-2">{match.result}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveScores;
