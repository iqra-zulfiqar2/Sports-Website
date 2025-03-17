import React from "react";
import { useNavigate } from "react-router-dom";
import tsports from "../assets/tsports.png"
import Willow from "../assets/Willow.png";
import gtv from "../assets/gtv.png";
import foxsports from "../assets/foxsports.jpg"

const channels = [
  { name: "A Sports", img: "https://livematchzone.com/wp-content/uploads/2025/01/A-Sports-HD.jpg" },
  { name: "TNT Sports 4", img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4-2.jpg" },
  { name: "TNT Sports 3", img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-4.jpg" },
  { name: "Astro Cricket", img: "https://livematchzone.com/wp-content/uploads/2025/01/Astro-Cricket.jpg" },
  { name: "Star Sports 3", img: "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-3.jpg" },
  { name: "Star Sports 2", img: "https://livematchzone.com/wp-content/uploads/2025/01/star-sports-2.jpg" },
  { name: "Ten Sports", img: "https://livematchzone.com/wp-content/uploads/2025/01/Ten-Sports.jpg" },
  { name: "Willow Sports", img: "https://livematchzone.com/wp-content/uploads/2025/01/Willow-Cricket.jpg" },
  { name: "Star Sports 1", img: "https://livematchzone.com/wp-content/uploads/2025/01/Star-Sports-1.jpg" },
  { name: "PTV Sports", img: "https://livematchzone.com/wp-content/uploads/2025/01/PTV-Sports.jpg" },
  { name: "SuperSport", img: "https://livematchzone.com/wp-content/uploads/2025/01/SuperSport-Cricket.jpg" },
  { name: "TNT Sports 1", img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-1.jpg" },
  { name: "TNT Sports 2", img: "https://livematchzone.com/wp-content/uploads/2025/01/TNT-Sports-2.jpg" },
  { name: "Sky Sports", img: "https://livematchzone.com/wp-content/uploads/2025/01/Sky-Sports-Cricket.jpg" },
  { name: "T Sports", img: tsports },
  { name: "Willow 2", img: Willow },
  { name: "GTV", img: gtv },
  { name: "Fox Sports", img: foxsports },
];

// Function to generate slug
const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const ChannelSection = () => {
  const navigate = useNavigate();

  const handleChannelClick = (channel) => {
    const slug = generateSlug(channel.name);
    navigate(`/channel/${slug}`);
  };

  return (
    <section className="bg-black text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-9">
          Enjoy Free Live Streaming On These Channels
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {channels.map((channel, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg shadow-gray-700 border-4 border-gray-300 flex items-center justify-center p-2 cursor-pointer"
              onClick={() => handleChannelClick(channel)}
            >
              <div className="w-full aspect-w-1 aspect-h-1">
                <img
                  src={channel.img}
                  alt={channel.name}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChannelSection;
