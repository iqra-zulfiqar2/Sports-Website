import React, { useState, useEffect } from "react";
import { doc, setDoc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from "../../notifications/firebase";

// Team logos (local imports)
import isb from "../../assets/isb.jpg";
import kk from "../../assets/kk.jpg";
import lq from "../../assets/lq.png";
import ms from "../../assets/ms.png";
import qg from "../../assets/qg.png";
import pz from "../../assets/pz.png";

const PSL = () => {
  const [teams, setTeams] = useState(null);
  const [votes, setVotes] = useState({ team1: 0, team2: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [matchStatus, setMatchStatus] = useState("No PSL match today");

  const matchSchedule = [
    { date: "2025-04-11", team1: "Lahore Qalandars", team2: "Islamabad United" },
    { date: "2025-04-12", team1: "Quetta Gladiators", team2: "Peshawar Zalmi" },
    { date: "2025-04-12", team1: "Multan Sultans", team2: "Karachi Kings" },
    { date: "2025-04-13", team1: "Lahore Qalandars", team2: "Quetta Gladiators" },
    { date: "2025-04-14", team1: "Islamabad United", team2: "Peshawar Zalmi" },
    { date: "2025-04-15", team1: "Lahore Qalandars", team2: "Karachi Kings" },
    { date: "2025-04-16", team1: "Islamabad United", team2: "Multan Sultans" },
    { date: "2025-04-18", team1: "Karachi Kings", team2: "Quetta Gladiators" },
    { date: "2025-04-19", team1: "Multan Sultans", team2: "Peshawar Zalmi" },
    { date: "2025-04-20", team1: "Karachi Kings", team2: "Islamabad United" },
    { date: "2025-04-21", team1: "Karachi Kings", team2: "Peshawar Zalmi" },
    { date: "2025-04-22", team1: "Multan Sultans", team2: "Lahore Qalandars" },
    { date: "2025-04-23", team1: "Multan Sultans", team2: "Islamabad United" },
    { date: "2025-04-24", team1: "Lahore Qalandars", team2: "Peshawar Zalmi" },
    { date: "2025-04-25", team1: "Karachi Kings", team2: "Quetta Gladiators" },
    { date: "2025-04-26", team1: "Lahore Qalandars", team2: "Multan Sultans" },
    { date: "2025-04-27", team1: "Peshawar Zalmi", team2: "Quetta Gladiators" },
    { date: "2025-04-29", team1: "Multan Sultans", team2: "Quetta Gladiators" },
    { date: "2025-04-30", team1: "Lahore Qalandars", team2: "Islamabad United" },
    { date: "2025-05-01", team1: "Multan Sultans", team2: "Karachi Kings" },
    { date: "2025-05-01", team1: "Lahore Qalandars", team2: "Quetta Gladiators" },
    { date: "2025-05-02", team1: "Islamabad United", team2: "Peshawar Zalmi" },
    { date: "2025-05-03", team1: "Islamabad United", team2: "Quetta Gladiators" },
    { date: "2025-05-04", team1: "Lahore Qalandars", team2: "Karachi Kings" },
    { date: "2025-05-05", team1: "Multan Sultans", team2: "Peshawar Zalmi" },
    { date: "2025-05-07", team1: "Islamabad United", team2: "Quetta Gladiators" },
    { date: "2025-05-08", team1: "Karachi Kings", team2: "Peshawar Zalmi" },
    { date: "2025-05-09", team1: "Lahore Qalandars", team2: "Peshawar Zalmi" },
    { date: "2025-05-10", team1: "Multan Sultans", team2: "Quetta Gladiators" },
    { date: "2025-05-10", team1: "Islamabad United", team2: "Karachi Kings" },
    { date: "2025-05-13", team1: "TBA", team2: "TBA" }, // Qualifier 1
    { date: "2025-05-14", team1: "TBA", team2: "TBA" }, // Eliminator
    { date: "2025-05-16", team1: "TBA", team2: "TBA" }, // Qualifier 2
    { date: "2025-05-18", team1: "TBA", team2: "TBA" }, // Final
  ];
  

  const teamLogos = {
    "Islamabad United": isb,
    "Peshawar Zalmi": pz,
    "Karachi Kings": kk,
    "Lahore Qalandars": lq,
    "Multan Sultans": ms,
    "Quetta Gladiators": qg,
  };

  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const foundMatch = matchSchedule.find((match) => match.date === todayDate);
    const upcomingMatch = matchSchedule.find((match) => match.date > todayDate);

    if (foundMatch) {
      setTeams({ team1: foundMatch.team1, team2: foundMatch.team2 });
      setMatchStatus("Today's Match");
    } else if (upcomingMatch) {
      setTeams({ team1: upcomingMatch.team1, team2: upcomingMatch.team2 });
      setMatchStatus(`Next Match on ${upcomingMatch.date}`);
    } else {
      setTeams(null);
      setMatchStatus("No PSL match today");
    }

    // Check if user already voted today using localStorage
    const votedKey = `voted-${todayDate}`;
    const hasVotedToday = localStorage.getItem(votedKey);
    setHasVoted(!!hasVotedToday);

    const voteDocRef = doc(db, "votes", todayDate);

    const unsubscribe = onSnapshot(voteDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setVotes(docSnap.data());
      } else {
        setVotes({ team1: 0, team2: 0 });
      }
    });

    return () => unsubscribe();
  }, [todayDate]);

  const handleVote = async (team) => {
    if (!hasVoted) {
      const voteDoc = doc(db, "votes", todayDate);

      try {
        await updateDoc(voteDoc, {
          [team]: increment(1),
        });
      } catch (error) {
        await setDoc(voteDoc, {
          team1: team === "team1" ? 1 : 0,
          team2: team === "team2" ? 1 : 0,
        });
      }

      // Mark as voted in localStorage for this date
      const votedKey = `voted-${todayDate}`;
      localStorage.setItem(votedKey, "true");
      setHasVoted(true);
    }
  };

  const totalVotes = votes.team1 + votes.team2;
  const team1WinChance = totalVotes > 0 ? ((votes.team1 / totalVotes) * 100).toFixed(1) : 0;
  const team2WinChance = totalVotes > 0 ? ((votes.team2 / totalVotes) * 100).toFixed(1) : 0;

  return (
    <div className="bg-black border border-[#17A56B] text-white p-4 rounded-2xl w-full max-w-md mx-auto mt-10 shadow-xl">
      <h1 className="text-2xl font-extrabold text-[#17A56B] mb-2 text-center">
        🏏 Who will win today's match?
      </h1>
  
      {teams ? (
        <>
          <div className="flex flex-col items-center justify-center mt-2 text-center">
            <div className="text-lg font-medium text-white">
              {teams.team1} <span className="text-red-500">vs</span> {teams.team2}
            </div>
            <div className="text-sm text-gray-300 mb-1">{matchStatus}</div>
          </div>
  
          {/* Responsive buttons */}
          <div className="flex flex-col sm:flex-row justify-around mt-4 gap-3 sm:gap-2 w-full">
            <button
              onClick={() => handleVote("team1")}
              disabled={hasVoted}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto ${
                hasVoted
                  ? "bg-[#17A56B] cursor-not-allowed"
                  : "bg-[#17A56B] hover:bg-green-700 active:scale-95"
              }`}
            >
              <img
                src={teamLogos[teams.team1]}
                alt={teams.team1}
                className="w-8 h-8 object-contain rounded-full"
              />
              {teams.team1}
            </button>
  
            <button
              onClick={() => handleVote("team2")}
              disabled={hasVoted}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto ${
                hasVoted
                  ? "bg-[#17A56B] cursor-not-allowed"
                  : "bg-[#17A56B] hover:bg-green-700 active:scale-95"
              }`}
            >
              <img
                src={teamLogos[teams.team2]}
                alt={teams.team2}
                className="w-8 h-8 object-contain rounded-full"
              />
              {teams.team2}
            </button>
          </div>
  
          <div className="mt-5 text-sm text-white bg-green-950 rounded-lg p-3 space-y-1 text-center">
            <div>
              <span className="text-green-400 font-semibold">{team1WinChance}%</span>{" "}
              chance for <span className="font-medium">{teams.team1}</span>
            </div>
            <div>
              <span className="text-green-400 font-semibold">{team2WinChance}%</span>{" "}
              chance for <span className="font-medium">{teams.team2}</span>
            </div>
            <div className="text-lg text-white mt-2">
              Total votes: {totalVotes}
            </div>
          </div>
        </>
      ) : (
        <div className="text-sm text-gray-300 text-center">{matchStatus}</div>
      )}
    </div>
  );
  
};

export default PSL;
