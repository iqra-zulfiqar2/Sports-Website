import React, { useState, useEffect } from "react";

const International = () => {
  console.log("International Component Loaded");

  const [matches, setMatches] = useState([]);
  const API_URL =
    "https://cricbuzz-cricket2.p.rapidapi.com/schedule/v1/International?lastTime=1729555200000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
          },
        });

        if (!response.ok) {
          throw new Error(`API error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Raw Response:", data);

        if (data?.matchScheduleMap?.length > 0) {
          setMatches(data.matchScheduleMap);
          console.log("Processed Match Data:", data.matchScheduleMap);
        } else {
          console.log("No matches found in response");
          setMatches([]);
        }
      } catch (error) {
        console.error("Error fetching International schedule:", error);
        setMatches([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-850 p-4 rounded-lg shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4">International Cricket Schedule</h2>
      {matches.length > 0 ? (
        matches.map((match, index) => (
          <div key={index} className="mb-6">
            {/* Date Header */}
            <div className="bg-gray-700 px-4 py-2 font-semibold text-white text-lg">
              {match?.date || "Unknown Date"}
            </div>

            {/* Match Details */}
            <div className="border border-gray-700 divide-y divide-gray-700">
              {match?.matchScheduleList?.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 grid grid-cols-3 gap-4 items-center bg-gray-900 hover:bg-gray-800 transition"
                >
                  {/* Left Column - Series Name */}
                  <div className="text-gray-300 font-semibold">
                    {m?.seriesName || "Unknown Series"}
                  </div>

                  {/* Middle Column - Match & Venue */}
                  <div>
                    <div className="text-lg font-semibold text-white">{m?.matchDesc || "Match Info"}</div>
                    <div className="text-sm text-gray-400">{m?.venueInfo?.ground || "Unknown Venue"}</div>
                  </div>

                  {/* Right Column - Match Timing */}
                  <div className="text-right">
                    <div className="font-bold text-lg text-white">
                      {m?.startTime || "TBA"}
                    </div>
                    <div className="text-sm text-gray-400">
                      {m?.startTimeGMT ? `${m.startTimeGMT} GMT` : "Time Unavailable"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No International matches available.</p>
      )}
    </div>
  );
};

export default International;
