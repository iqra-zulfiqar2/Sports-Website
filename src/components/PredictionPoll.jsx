import React, { useState, useEffect } from "react";
import { getVotes, updateVotes } from "../notifications/firebase.js"; // Import Firebase functions

const PredictionPoll = () => {
  const [teams, setTeams] = useState(null);
  const [votes, setVotes] = useState({ team1: 0, team2: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [matchStatus, setMatchStatus] = useState("No IPL match today");

 // Static IPL schedule data
 const matchSchedule = [
    { date: "2025-04-03", team1: "Kolkata Knight Riders", team2: "Sunrisers Hyderabad" },
    { date: "2025-04-04", team1: "Lucknow Super Giants", team2: "Mumbai Indians" },
    { date: "2025-04-05", team1: "Chennai Super Kings", team2: "Delhi Capitals" },
    { date: "2025-04-05", team1: "Punjab Kings", team2: "Rajasthan Royals" },
    { date: "2025-04-06", team1: "Sunrisers Hyderabad", team2: "Gujarat Titans" },
    { date: "2025-04-07", team1: "Mumbai Indians", team2: "Royal Challengers Bengaluru" },
    { date: "2025-04-08", team1: "Kolkata Knight Riders", team2: "Lucknow Super Giants" },
    { date: "2025-04-08", team1: "Punjab Kings", team2: "Chennai Super Kings" },
    { date: "2025-04-09", team1: "Gujarat Titans", team2: "Rajasthan Royals" },
    { date: "2025-04-10", team1: "Royal Challengers Bengaluru", team2: "Delhi Capitals" },
    { date: "2025-04-11", team1: "Chennai Super Kings", team2: "Kolkata Knight Riders" },
    { date: "2025-04-12", team1: "Lucknow Super Giants", team2: "Gujarat Titans" },
    { date: "2025-04-12", team1: "Sunrisers Hyderabad", team2: "Punjab Kings" },
    { date: "2025-04-13", team1: "Rajasthan Royals", team2: "Royal Challengers Bengaluru" },
    { date: "2025-04-13", team1: "Delhi Capitals", team2: "Mumbai Indians" },
    { date: "2025-04-14", team1: "Lucknow Super Giants", team2: "Chennai Super Kings" },
    { date: "2025-04-15", team1: "Punjab Kings", team2: "Kolkata Knight Riders" },
    { date: "2025-04-16", team1: "Delhi Capitals", team2: "Rajasthan Royals" },
    { date: "2025-04-17", team1: "Mumbai Indians", team2: "Sunrisers Hyderabad" },
    { date: "2025-04-18", team1: "Royal Challengers Bengaluru", team2: "Punjab Kings" },
    { date: "2025-04-19", team1: "Gujarat Titans", team2: "Delhi Capitals" },
    { date: "2025-04-19", team1: "Rajasthan Royals", team2: "Lucknow Super Giants" },
    { date: "2025-04-20", team1: "Punjab Kings", team2: "Royal Challengers Bengaluru" },
    { date: "2025-04-20", team1: "Mumbai Indians", team2: "Chennai Super Kings" },
    { date: "2025-04-21", team1: "Kolkata Knight Riders", team2: "Gujarat Titans" },
    { date: "2025-04-22", team1: "Lucknow Super Giants", team2: "Delhi Capitals" },
    { date: "2025-04-23", team1: "Sunrisers Hyderabad", team2: "Mumbai Indians" },
    { date: "2025-04-24", team1: "Royal Challengers Bengaluru", team2: "Rajasthan Royals" },
    { date: "2025-04-25", team1: "Chennai Super Kings", team2: "Sunrisers Hyderabad" },
    { date: "2025-04-26", team1: "Kolkata Knight Riders", team2: "Punjab Kings" },
    { date: "2025-04-27", team1: "Mumbai Indians", team2: "Lucknow Super Giants" },
    { date: "2025-04-27", team1: "Delhi Capitals", team2: "Royal Challengers Bengaluru" },
    { date: "2025-04-28", team1: "Rajasthan Royals", team2: "Gujarat Titans" },
    { date: "2025-04-29", team1: "Delhi Capitals", team2: "Kolkata Knight Riders" },
    { date: "2025-04-30", team1: "Chennai Super Kings", team2: "Punjab Kings" },
    { date: "2025-05-01", team1: "Rajasthan Royals", team2: "Mumbai Indians" },
    { date: "2025-05-02", team1: "Gujarat Titans", team2: "Sunrisers Hyderabad" },
    { date: "2025-05-03", team1: "Royal Challengers Bengaluru", team2: "Chennai Super Kings" },
    { date: "2025-05-04", team1: "Kolkata Knight Riders", team2: "Rajasthan Royals" },
    { date: "2025-05-04", team1: "Punjab Kings", team2: "Lucknow Super Giants" },
    { date: "2025-05-05", team1: "Sunrisers Hyderabad", team2: "Delhi Capitals" },
    { date: "2025-05-06", team1: "Mumbai Indians", team2: "Gujarat Titans" },
    { date: "2025-05-07", team1: "Kolkata Knight Riders", team2: "Chennai Super Kings" },
    { date: "2025-05-08", team1: "Punjab Kings", team2: "Delhi Capitals" },
    { date: "2025-05-09", team1: "Lucknow Super Giants", team2: "Royal Challengers Bengaluru" },
    { date: "2025-05-10", team1: "Sunrisers Hyderabad", team2: "Kolkata Knight Riders" },
    { date: "2025-05-11", team1: "Punjab Kings", team2: "Mumbai Indians" },
    { date: "2025-05-11", team1: "Delhi Capitals", team2: "Gujarat Titans" },
    { date: "2025-05-12", team1: "Chennai Super Kings", team2: "Rajasthan Royals" },
    { date: "2025-05-13", team1: "Royal Challengers Bengaluru", team2: "Sunrisers Hyderabad" },
    { date: "2025-05-14", team1: "Gujarat Titans", team2: "Lucknow Super Giants" },
    { date: "2025-05-15", team1: "Mumbai Indians", team2: "Delhi Capitals" },
    { date: "2025-05-16", team1: "Rajasthan Royals", team2: "Punjab Kings" },
    { date: "2025-05-17", team1: "Royal Challengers Bengaluru", team2: "Kolkata Knight Riders" },
    { date: "2025-05-18", team1: "Gujarat Titans", team2: "Chennai Super Kings" },
    { date: "2025-05-18", team1: "Lucknow Super Giants", team2: "Sunrisers Hyderabad" },
    { date: "2025-05-20", team1: "TBC", team2: "TBC" }, // Qualifier 1
    { date: "2025-05-21", team1: "TBC", team2: "TBC" }, // Eliminator
    { date: "2025-05-23", team1: "TBC", team2: "TBC" }, // Qualifier 2
    { date: "2025-05-25", team1: "TBC", team2: "TBC" }  // Final
  ];


  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    // Find today's match or the next match if none today
    let foundMatch = matchSchedule.find((match) => match.date === todayDate);
    let upcomingMatch = matchSchedule.find(
      (match) => match.date > todayDate
    );

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
  const team1WinChance = totalVotes > 0 ? ((votes.team1 / totalVotes) * 100).toFixed(1) : 0;
  const team2WinChance = totalVotes > 0 ? ((votes.team2 / totalVotes) * 100).toFixed(1) : 0;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl w-86 mx-auto mt-8 text-center shadow-lg">
      <h1 className="text-xl font-bold">Who will win today's IPL match?</h1>
      {teams ? (
        <>
          <div className="mt-2 text-md">
            {teams.team1} vs {teams.team2}
          </div>
          <div className="text-sm text-yellow-400">{matchStatus}</div>
          <div className="flex justify-center gap-4 mt-3">
            <button
              className="bg-blue-500 text-white p-1 rounded-lg"
              onClick={() => handleVote("team1")}
            >
              {teams.team1}
            </button>
            <button
              className="bg-red-500 text-white p-1 rounded-lg"
              onClick={() => handleVote("team2")}
            >
              {teams.team2}
            </button>
          </div>
          {totalVotes > 0 && (
            <div className="mt-3 text-sm text-white">
              <div>{team1WinChance}% chance for {teams.team1} to win</div>
              <div>{team2WinChance}% chance for {teams.team2} to win</div>
            </div>
          )}
        </>
      ) : (
        <div>No IPL match today</div>
      )}
    </div>
  );
};

export default PredictionPoll;