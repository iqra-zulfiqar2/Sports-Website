import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
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
    { date: "2025-04-14", team1: "Islamabad United", team2: "Peshawar Zalmi" },
    { date: "2025-04-15", team1: "Karachi Kings", team2: "Lahore Qalandars" },
    { date: "2025-04-16", team1: "Islamabad United", team2: "Multan Sultans" },
    { date: "2025-04-18", team1: "Karachi Kings", team2: "Quetta Gladiators" },
    { date: "2025-04-19", team1: "Multan Sultans", team2: "Peshawar Zalmi" },
    { date: "2025-04-20", team1: "Karachi Kings", team2: "Islamabad United" },
    { date: "2025-04-21", team1: "Karachi Kings", team2: "Peshawar Zalmi" },
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

    const fetchVotes = async () => {
      const voteDoc = doc(db, "votes", todayDate);
      const voteSnap = await getDoc(voteDoc);

      if (voteSnap.exists()) {
        setVotes(voteSnap.data());
      } else {
        setVotes({ team1: 0, team2: 0 });
      }
    };

    fetchVotes();
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

      setVotes((prevVotes) => ({
        ...prevVotes,
        [team]: prevVotes[team] + 1,
      }));

      setHasVoted(true);
    }
  };

  const totalVotes = votes.team1 + votes.team2;
  const team1WinChance = totalVotes > 0 ? ((votes.team1 / totalVotes) * 100).toFixed(1) : 0;
  const team2WinChance = totalVotes > 0 ? ((votes.team2 / totalVotes) * 100).toFixed(1) : 0;

  return (
    <div className="bg-black border border-[#17A56B] text-white p-4 rounded-2xl w-full max-w-md mx-auto mt-10 shadow-xl">
      <h1 className="text-2xl font-extrabold text-[#17A56B] mb-2">
        🏏 Who will win today's match?
      </h1>

      {teams ? (
        <>
          <div className="flex flex-col items-center justify-center mt-2">
            <div className="text-lg font-medium text-white">
              {teams.team1} <span className="text-red-500">vs</span> {teams.team2}
            </div>
            <div className="text-sm text-gray-300 mb-1">{matchStatus}</div>
          </div>

          <div className="flex justify-around mt-4 gap-2">
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
                className="w-8 h-8 object-contain rounded-full"
              />
              {teams.team1}
            </button>
            <button
              onClick={() => handleVote("team2")}
              disabled={hasVoted}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
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

          {/* Voting Results */}
          <div className="mt-5 text-sm text-white bg-green-950 rounded-lg p-3 space-y-1">
            <div>
              <span className="text-green-400 font-semibold">{team1WinChance}%</span>{" "}
              chance for <span className="font-medium">{teams.team1}</span>
            </div>
            <div>
              <span className="text-green-400 font-semibold">{team2WinChance}%</span>{" "}
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

export default PSL;
