import React, { useState, useEffect } from "react";

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("matchesByDay");
  const [activeCategory, setActiveCategory] = useState("International");
  const [matches, setMatches] = useState([]);

  const tabs = [
    { id: "currentMatches", label: "Current Matches" },
    { id: "futureSeries", label: "Current & Future Series" },
    { id: "matchesByDay", label: "Matches By Day" },
    { id: "teams", label: "Teams" },
    { id: "seriesArchive", label: "Series Archive" },
  ];

  const categories = ["International", "Domestic & Others", "T20 Leagues", "Women", "All Matches"];

  // Dummy data for testing layout
  const dummyMatches = [
    {
      date: "TUE, MAR 18 2025",
      matches: [
        {
          series: "Canada tour of Namibia, 2025",
          match: "Namibia vs Canada, 1st T20I",
          venue: "Namibia Cricket Ground, Windhoek",
          time: "5:00 PM",
          gmt: "12:00 PM GMT",
          local: "02:00 PM LOCAL",
        },
        {
          series: "Pakistan tour of New Zealand, 2025",
          match: "New Zealand vs Pakistan, 2nd T20I",
          venue: "University Oval, Dunedin",
          time: "6:15 AM",
          gmt: "01:15 AM GMT",
          local: "02:15 PM LOCAL",
        },
      ],
    },
    {
      date: "WED, MAR 19 2025",
      matches: [
        {
          series: "Canada tour of Namibia, 2025",
          match: "Namibia vs Canada, 2nd T20I",
          venue: "Namibia Cricket Ground, Windhoek",
          time: "5:00 PM",
          gmt: "12:00 PM GMT",
          local: "02:00 PM LOCAL",
        },
      ],
    },
    {
        date: "FRI, MAR 21 2025",
        matches: [
          {
            series: "Canada tour of Namibia, 2025",
            match: "Namibia vs Canada, 3rd T20I",
            venue: "Namibia Cricket Ground, Windhoek",
            time: "5:00 PM",
            gmt: "12:00 PM GMT",
            local: "02:00 PM LOCAL",
          },
        ],
      },
  ];

  useEffect(() => {
    // Fetching cricket schedule data from API
    const fetchSchedule = async () => {
      try {
        const response = await fetch("https://api.example.com/cricket-schedule"); // Replace with your actual API endpoint
        const data = await response.json();

        if (data.length > 0) {
          setMatches(data);
        } else {
          setMatches(dummyMatches); // Use dummy data if API returns empty
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setMatches(dummyMatches); // Use dummy data in case of an error
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 mt-6 bg-gray-900 text-white min-h-screen">
      {/* Top Navigation Tabs */}
      <div className="flex space-x-6 border-b border-gray-700 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-lg cursor-pointer ${
              activeTab === tab.id ? "border-b-2 border-green-500 font-semibold text-green-400" : "text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mt-6">Cricket Schedule</h2>

      {/* Category Filters */}
      <div className="flex space-x-4 mt-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full cursor-pointer ${
              activeCategory === category ? "bg-green-500 text-white" : "bg-gray-300 text-gray-900"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Match Schedule */}
      <div className="mt-6 bg-gray-850 p-4 rounded-lg shadow-lg">
        {matches.map((day, index) => (
          <div key={index} className="mb-6">
            {/* Date Section */}
            <div className="bg-gray-700 px-4 py-2 font-semibold text-white">{day.date}</div>

            {/* Match Details (Three Columns) */}
            <div className="border border-gray-700 divide-y divide-gray-700">
              {day.matches.map((match, idx) => (
                <div key={idx} className="p-4 grid grid-cols-3 gap-4 items-center bg-gray-900 hover:bg-gray-800 transition">
                  {/* First Column - Series */}
                  <div className="text-gray-300 font-semibold">{match.series}</div>

                  {/* Second Column - Match and Venue */}
                  <div>
                    <div className="text-lg font-semibold text-white">{match.match}</div>
                    <div className="text-sm text-gray-400">{match.venue}</div>
                  </div>

                  {/* Third Column - Match Timing */}
                  <div className="text-right">
                    <div className="font-bold text-lg text-white">{match.time}</div>
                    <div className="text-sm text-gray-400">{match.gmt} / {match.local}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
