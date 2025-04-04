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
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY_INTERNATIONAL,
            "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST_INTERNATIONAL,
          },
        });

        if (!response.ok) {
          throw new Error(`API error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Raw Response:", data);

        if (data?.matchScheduleMap?.length > 0) {
          const filteredMatches = data.matchScheduleMap
            .filter((item) => item.scheduleAdWrapper)
            .map((item) => item.scheduleAdWrapper);

          setMatches(filteredMatches);
          console.log("Filtered Match Data:", filteredMatches);
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

  // Convert timestamp to readable date-time format
  const formatTime = (timestamp) => {
    if (!timestamp) return "Time Unavailable";
    const date = new Date(parseInt(timestamp));
    return date.toUTCString(); // Converts to a readable UTC format
  };

  return (
    <div className="bg-gray-850 p-4 rounded-lg shadow-lg">
      <h1 className="text-white text-xl font-bold mb-4">Cricket Schedule</h1>
      {matches.length > 0 ? (
        matches.map((match, index) => (
          <div key={index} className="mb-6">
            {/* Date Header */}
            <div className="bg-gray-700 px-4 py-2 font-semibold text-white text-lg">
              {match?.date || "Unknown Date"}
            </div>

            {/* Match Details */}
            <div className="border border-gray-700 divide-y divide-gray-700">
              {match?.matchScheduleList?.map((schedule, idx) => (
                <div key={idx} className="p-4 bg-gray-900 hover:bg-gray-800 transition">
                  <div className="text-gray-300 font-semibold text-lg">{schedule?.seriesName || "Unknown Series"}</div>
                  
                  {/* Loop through matchInfo inside matchScheduleList */}
                  {schedule?.matchInfo?.map((m, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 items-center mt-2">
                      {/* Left Column - Series Name */}
                      <div className="text-gray-400">{m?.matchDesc || "Match Info"}</div>

                      {/* Middle Column - Match & Venue */}
                      <div>
                        <div className="text-lg font-semibold text-white">{m?.team1?.teamName} vs {m?.team2?.teamName}</div>
                        <div className="text-sm text-gray-400">{m?.venueInfo?.ground || "Unknown Venue"}</div>
                      </div>

                      {/* Right Column - Match Timing */}
                      <div className="text-right">
                        <div className="font-bold text-lg text-white">
                          {formatTime(m?.startDate)}
                        </div>
                        <div className="text-sm text-gray-400">
                          {m?.venueInfo?.timezone || "Timezone Unavailable"}
                        </div>
                      </div>
                    </div>
                  ))}
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
