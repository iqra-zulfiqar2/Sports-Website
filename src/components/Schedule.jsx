import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import International from "./ScheduleCategories/International.jsx";
import Domestic from "./ScheduleCategories/Domestic.jsx";
import League from "./ScheduleCategories/League.jsx";
import Women from "./ScheduleCategories/Women.jsx";

const categories = [
  { name: "International", key: "international", component: <International /> },
  { name: "Domestic & Others", key: "domestic-others", component: <Domestic/>},
  { name: "T20 Leagues", key: "t20-leagues", component: <League/>},
  { name: "Women", key: "women", component: <Women/>},
];

const Schedule = () => {
  const navigate = useNavigate();
  const { category } = useParams(); 
  const [selectedCategory, setSelectedCategory] = useState(category || "international");

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    navigate(`/schedule/${newCategory}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-6 bg-gray-900 text-white min-h-screen">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mt-6">Cricket Schedule</h2>

      {/* Category Navigation (Always Visible) */}
      <div className="flex space-x-4 mt-4 mb-6">
        {categories.map(({ name, key }) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key)}
            className={`px-4 py-2 rounded-full cursor-pointer transition ${
              selectedCategory === key ? "bg-green-500 text-white" : "bg-gray-300 text-gray-900"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Show Selected Category Data Below */}
      <div className="p-4 bg-gray-800 rounded-lg">
        {categories.find((cat) => cat.key === selectedCategory)?.component || <p>Select a category.</p>}
      </div>
    </div>
  );
};

export default Schedule;

