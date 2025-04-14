import React, { useState, useEffect } from "react";
import csk from "../../assets/ipl/csk.jpg";
import mi from "../../assets/ipl/mi.png";
import rcb from "../../assets/ipl/rcb.png";
import dc from "../../assets/ipl/dc.png";
import rr from "../../assets/ipl/rr.png";
import kkr from "../../assets/ipl/kkr.png";
import srh from "../../assets/ipl/srh.png";
import lsg from "../../assets/ipl/lsg.png";
import gt from "../../assets/ipl/gt.jpg";

const IPL = () => {
  const [teams, setTeams] = useState(null);
  const [votes, setVotes] = useState({ team1: 0, team2: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [matchStatus, setMatchStatus] = useState("No IPL match today");

  // Static IPL schedule data
  const matchSchedule = [
    {
      date: "2025-04-03",
      team1: "Kolkata Knight Riders",
      team2: "Sunrisers Hyderabad",
    },
    {
      date: "2025-04-04",
      team1: "Lucknow Super Giants",
      team2: "Mumbai Indians",
    },
    {
      date: "2025-04-05",
      team1: "Chennai Super Kings",
      team2: "Delhi Capitals",
    },
    { date: "2025-04-05", team1: "Punjab Kings", team2: "Rajasthan Royals" },
    {
      date: "2025-04-06",
      team1: "Sunrisers Hyderabad",
      team2: "Gujarat Titans",
    },
    {
      date: "2025-04-07",
      team1: "Mumbai Indians",
      team2: "Royal Challengers Bengaluru",
    },
    {
      date: "2025-04-08",
      team1: "Kolkata Knight Riders",
      team2: "Lucknow Super Giants",
    },
    { date: "2025-04-08", team1: "Punjab Kings", team2: "Chennai Super Kings" },
    { date: "2025-04-09", team1: "Gujarat Titans", team2: "Rajasthan Royals" },
    {
      date: "2025-04-10",
      team1: "Royal Challengers Bengaluru",
      team2: "Delhi Capitals",
    },
    {
      date: "2025-04-11",
      team1: "Chennai Super Kings",
      team2: "Kolkata Knight Riders",
    },
    {
      date: "2025-04-12",
      team1: "Lucknow Super Giants",
      team2: "Gujarat Titans",
    },
    { date: "2025-04-12", team1: "Sunrisers Hyderabad", team2: "Punjab Kings" },
    {
      date: "2025-04-13",
      team1: "Rajasthan Royals",
      team2: "Royal Challengers Bengaluru",
    },
    { date: "2025-04-13", team1: "Delhi Capitals", team2: "Mumbai Indians" },
    {
      date: "2025-04-14",
      team1: "Lucknow Super Giants",
      team2: "Chennai Super Kings",
    },
    {
      date: "2025-04-15",
      team1: "Punjab Kings",
      team2: "Kolkata Knight Riders",
    },
    { date: "2025-04-16", team1: "Delhi Capitals", team2: "Rajasthan Royals" },
    {
      date: "2025-04-17",
      team1: "Mumbai Indians",
      team2: "Sunrisers Hyderabad",
    },
    {
      date: "2025-04-18",
      team1: "Royal Challengers Bengaluru",
      team2: "Punjab Kings",
    },
    { date: "2025-04-19", team1: "Gujarat Titans", team2: "Delhi Capitals" },
    {
      date: "2025-04-19",
      team1: "Rajasthan Royals",
      team2: "Lucknow Super Giants",
    },
    {
      date: "2025-04-20",
      team1: "Punjab Kings",
      team2: "Royal Challengers Bengaluru",
    },
    {
      date: "2025-04-20",
      team1: "Mumbai Indians",
      team2: "Chennai Super Kings",
    },
    {
      date: "2025-04-21",
      team1: "Kolkata Knight Riders",
      team2: "Gujarat Titans",
    },
    {
      date: "2025-04-22",
      team1: "Lucknow Super Giants",
      team2: "Delhi Capitals",
    },
    {
      date: "2025-04-23",
      team1: "Sunrisers Hyderabad",
      team2: "Mumbai Indians",
    },
    {
      date: "2025-04-24",
      team1: "Royal Challengers Bengaluru",
      team2: "Rajasthan Royals",
    },
    {
      date: "2025-04-25",
      team1: "Chennai Super Kings",
      team2: "Sunrisers Hyderabad",
    },
    {
      date: "2025-04-26",
      team1: "Kolkata Knight Riders",
      team2: "Punjab Kings",
    },
    {
      date: "2025-04-27",
      team1: "Mumbai Indians",
      team2: "Lucknow Super Giants",
    },
    {
      date: "2025-04-27",
      team1: "Delhi Capitals",
      team2: "Royal Challengers Bengaluru",
    },
    { date: "2025-04-28", team1: "Rajasthan Royals", team2: "Gujarat Titans" },
    {
      date: "2025-04-29",
      team1: "Delhi Capitals",
      team2: "Kolkata Knight Riders",
    },
    { date: "2025-04-30", team1: "Chennai Super Kings", team2: "Punjab Kings" },
    { date: "2025-05-01", team1: "Rajasthan Royals", team2: "Mumbai Indians" },
    {
      date: "2025-05-02",
      team1: "Gujarat Titans",
      team2: "Sunrisers Hyderabad",
    },
    {
      date: "2025-05-03",
      team1: "Royal Challengers Bengaluru",
      team2: "Chennai Super Kings",
    },
    {
      date: "2025-05-04",
      team1: "Kolkata Knight Riders",
      team2: "Rajasthan Royals",
    },
    {
      date: "2025-05-04",
      team1: "Punjab Kings",
      team2: "Lucknow Super Giants",
    },
    {
      date: "2025-05-05",
      team1: "Sunrisers Hyderabad",
      team2: "Delhi Capitals",
    },
    { date: "2025-05-06", team1: "Mumbai Indians", team2: "Gujarat Titans" },
    {
      date: "2025-05-07",
      team1: "Kolkata Knight Riders",
      team2: "Chennai Super Kings",
    },
    { date: "2025-05-08", team1: "Punjab Kings", team2: "Delhi Capitals" },
    {
      date: "2025-05-09",
      team1: "Lucknow Super Giants",
      team2: "Royal Challengers Bengaluru",
    },
    {
      date: "2025-05-10",
      team1: "Sunrisers Hyderabad",
      team2: "Kolkata Knight Riders",
    },
    { date: "2025-05-11", team1: "Punjab Kings", team2: "Mumbai Indians" },
    { date: "2025-05-11", team1: "Delhi Capitals", team2: "Gujarat Titans" },
    {
      date: "2025-05-12",
      team1: "Chennai Super Kings",
      team2: "Rajasthan Royals",
    },
    {
      date: "2025-05-13",
      team1: "Royal Challengers Bengaluru",
      team2: "Sunrisers Hyderabad",
    },
    {
      date: "2025-05-14",
      team1: "Gujarat Titans",
      team2: "Lucknow Super Giants",
    },
    { date: "2025-05-15", team1: "Mumbai Indians", team2: "Delhi Capitals" },
    { date: "2025-05-16", team1: "Rajasthan Royals", team2: "Punjab Kings" },
    {
      date: "2025-05-17",
      team1: "Royal Challengers Bengaluru",
      team2: "Kolkata Knight Riders",
    },
    {
      date: "2025-05-18",
      team1: "Gujarat Titans",
      team2: "Chennai Super Kings",
    },
    {
      date: "2025-05-18",
      team1: "Lucknow Super Giants",
      team2: "Sunrisers Hyderabad",
    },
    { date: "2025-05-20", team1: "TBC", team2: "TBC" }, // Qualifier 1
    { date: "2025-05-21", team1: "TBC", team2: "TBC" }, // Eliminator
    { date: "2025-05-23", team1: "TBC", team2: "TBC" }, // Qualifier 2
    { date: "2025-05-25", team1: "TBC", team2: "TBC" }, // Final
  ];

  const teamLogos = {
    "Chennai Super Kings": csk,
    "Mumbai Indians": mi,
    "Royal Challengers Bengaluru": rcb,
    "Delhi Capitals": dc,
    "Rajasthan Royals": rr,
    "Kolkata Knight Riders": kkr,
    "Sunrisers Hyderabad": srh,
    "Lucknow Super Giants": lsg,
    "Gujarat Titans": gt,
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    // Find today's match or the next match if none today
    let foundMatch = matchSchedule.find((match) => match.date === todayDate);
    let upcomingMatch = matchSchedule.find((match) => match.date > todayDate);

    if (foundMatch) {
      setTeams({
        team1: foundMatch.team1,
        team2: foundMatch.team2,
      });
      setMatchStatus("Today's Match");
    } else if (upcomingMatch) {
      setTeams({
        team1: upcomingMatch.team1,
        team2: upcomingMatch.team2,
      });
      setMatchStatus(`Next Match on ${upcomingMatch.date}`);
    } else {
      setTeams(null);
      setMatchStatus("No IPL match today");
    }

    // Fetch initial votes from Firebase Realtime Database
    const fetchVotes = async () => {
      const fetchedVotes = await getVotes(); // Get votes from Firebase
      setVotes(fetchedVotes); // Set votes in state
    };

    fetchVotes(); // Call function to fetch votes from Firebase
  }, []);

  const handleVote = (team) => {
    if (!hasVoted) {
      const updatedVotes = { ...votes, [team]: votes[team] + 1 };
      setVotes(updatedVotes);
      setHasVoted(true);

      // Save votes to Firebase Realtime Database
      updateVotes(updatedVotes); // Update votes in Firebase
    }
  };

  const totalVotes = votes.team1 + votes.team2;
  const team1WinChance =
    totalVotes > 0 ? ((votes.team1 / totalVotes) * 100).toFixed(1) : 0;
  const team2WinChance =
    totalVotes > 0 ? ((votes.team2 / totalVotes) * 100).toFixed(1) : 0;

  return (
    <div className="bg-black border border-[#17A56B] text-white p-4 rounded-2xl w-full max-w-md mx-auto mt-10 shadow-xl">
      <h1 className="text-2xl font-extrabold text-[#17A56B] mb-2">
        🏏 Who will win today's match?
      </h1>

      {teams ? (
        <>
          <div className="flex flex-col items-center justify-center mt-2">
            <div className="text-lg font-medium text-white">
              {teams.team1} <span className="text-red-500">vs</span>{" "}
              {teams.team2}
            </div>
            <div className="text-sm text-gray-300 mb-1">{matchStatus}</div>
          </div>

          <div className="flex justify-around items-center mt-4 gap-2">
            <button
              onClick={() => handleVote("team1")}
              disabled={hasVoted}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                hasVoted
                  ? "bg-[#17A56B] cursor-not-allowed"
                  : "bg-[#17A56B] hover:bg-green-700 active:scale-95"
              }`}
            >
              <img
                src={teamLogos[teams.team1]}
                alt={teams.team1}
                className="w-8 h-8 rounded-full"
              />
              {teams.team1}
            </button>

            <button
              onClick={() => handleVote("team2")}
              disabled={hasVoted}
              className={`flex items-center gap-1 px-2 py-2 rounded-lg font-semibold transition-all duration-300 ${
                hasVoted
                  ? "bg-[#17A56B] cursor-not-allowed"
                  : "bg-[#17A56B] hover:bg-green-700 active:scale-95"
              }`}
            >
              <img
                src={teamLogos[teams.team2]}
                alt={teams.team2}
                className="w-8 h-8 rounded-full"
              />
              {teams.team2}
            </button>
          </div>

          <div className="mt-5 text-sm text-white bg-green-950 rounded-lg p-3 space-y-1">
            <div>
              <span className="text-green-400 font-semibold">
                {team1WinChance}%
              </span>{" "}
              chance for <span className="font-medium">{teams.team1}</span>
            </div>
            <div>
              <span className="text-green-400 font-semibold">
                {team2WinChance}%
              </span>{" "}
              chance for <span className="font-medium">{teams.team2}</span>
            </div>
            <div className="text-lg text-white mt-2 flex flex-col items-center justify-center">
              Total votes: {totalVotes}
            </div>
          </div>
        </>
      ) : (
        <div className="text-sm text-gray-300">{matchStatus}</div>
      )}
    </div>
  );
};

export default IPL;
