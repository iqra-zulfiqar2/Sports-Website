import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import International from "./ScheduleCategories/International.jsx";
import Domestic from "./ScheduleCategories/Domestic.jsx";
import League from "./ScheduleCategories/League.jsx";
import Women from "./ScheduleCategories/Women.jsx";

const tabMapping = {
  "international": "International",
  "domestic-others": "Domestic & Others",
  "t20-leagues": "T20 Leagues",
  "women": "Women",
};

const slugMapping = {
  "International": "international",
  "Domestic & Others": "domestic-others",
  "T20 Leagues": "t20-leagues",
  "Women": "women",
};

const tabContent = {
  "International": <International />,
  "Domestic & Others": <Domestic />,
  "T20 Leagues": <League />,
  "Women": <Women />,
};

const Schedule = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const activeTab = tabMapping[category] || "International";

  const handleTabClick = (tabName) => {
    navigate(`/schedule/${slugMapping[tabName]}`);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 mt-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Cricket Schedule
      </h2>
  
      {/* Tabs */}
      <div className="flex overflow-x-auto gap-3 sm:gap-4 mb-6 pb-2 border-b border-gray-700">
        {Object.keys(slugMapping).map((tabName) => (
          <button
            key={tabName}
            onClick={() => handleTabClick(tabName)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap ${
              activeTab === tabName
                ? "bg-green-500 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
          >
            {tabName}
          </button>
        ))}
      </div>
  
      {/* Tab Content */}
      <div className="bg-gray-800 rounded-lg p-3 sm:p-4 shadow-md">
        {tabContent[activeTab] || <p>Select a category.</p>}
      </div>
    </div>
  );
  
};

export default Schedule;
