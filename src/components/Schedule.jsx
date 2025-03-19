import React from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";

const categories = [
  { name: "International", path: "international" },
  { name: "Domestic & Others", path: "domestic-others" },
  { name: "T20 Leagues", path: "t20-leagues" },
  { name: "Women", path: "women" },
  { name: "All Matches", path: "all-matches" },
];



const Schedule = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleCategoryChange = (newCategory) => {
    navigate(`/schedule/${newCategory}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mt-6">Cricket Schedule</h2>

      {/* Category Navigation */}
      <div className="flex space-x-4 mt-4">
        {categories.map(({ name, path }) => (
          <button
            key={path}
            onClick={() => handleCategoryChange(path)}
            className={`px-4 py-2 rounded-full cursor-pointer ${
              category === path ? "bg-green-500 text-white" : "bg-gray-300 text-gray-900"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Render the selected category component */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Schedule;
