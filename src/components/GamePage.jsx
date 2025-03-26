import React from "react";

const GamePage = () => {
  return (
    <div className="game-container flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-extrabold m-5 text-center">Play Our Games</h1>
      {/* Game Description */}
      <p className="text-lg md:text-xl text-white text-center ml-6 mr-6 pl-6 pr-6 w-full">
        Explore a variety of exciting games right here! Whether you love action, puzzle, or adventure games, we have something for everyone. Click and play instantly without downloads.
      </p>
      <iframe
        src="https://littlegames.gg/games-page/"
        title="Game"
        className="w-full h-[4300px] border-none rounded-lg m-4"
      ></iframe>
    </div>
  );
};

export default GamePage;
