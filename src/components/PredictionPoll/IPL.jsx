import React, { useState, useEffect } from "react";
import { getFirestore, doc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import csk from "../../assets/ipl/csk.jpg";
import mi from "../../assets/ipl/mi.png";
import rcb from "../../assets/ipl/rcb.png";
import dc from "../../assets/ipl/dc.png";
import rr from "../../assets/ipl/rr.png";
import kkr from "../../assets/ipl/kkr.png";
import srh from "../../assets/ipl/srh.png";
import lsg from "../../assets/ipl/lsg.png";
import gt from "../../assets/ipl/gt.jpg";
import pk from "../../assets/ipl/pk.png";

const db = getFirestore();

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
    "Punjab Kings": pk,
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
  
    let foundMatch = matchSchedule.find((match) => match.date === todayDate);
    let upcomingMatch = matchSchedule.find((match) => match.date > todayDate);
  
    if (foundMatch) {
      setTeams({
        team1: foundMatch.team1,
        team2: foundMatch.team2,
      });
      setMatchStatus("Today's Match");
  
      const voteKey = `voted_${todayDate}`;
      if (localStorage.getItem(voteKey)) {
        setHasVoted(true);
      }
  
      const docRef = doc(db, "iplVotes", todayDate);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setVotes(docSnap.data());
        } else {
          setDoc(docRef, { team1: 0, team2: 0 });
        }
      });
  
      return () => unsubscribe();
    } else {
      if (upcomingMatch) {
        setTeams({
          team1: upcomingMatch.team1,
          team2: upcomingMatch.team2,
        });
        setMatchStatus(`Next Match on ${upcomingMatch.date}`);
      } else {
        setTeams(null);
        setMatchStatus("No IPL match today");
      }
    }
  }, []);
  

  const handleVote = async (teamKey) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const voteKey = `voted_${todayDate}`;
  
    if (hasVoted || !teams) return;
  
    const docRef = doc(db, "iplVotes", todayDate);
  
    try {
      await updateDoc(docRef, {
        [teamKey]: votes[teamKey] + 1,
      });
      localStorage.setItem(voteKey, "true"); // store in browser
      setHasVoted(true);
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };
  

  const totalVotes = votes.team1 + votes.team2;
  const team1WinChance =
    totalVotes > 0 ? ((votes.team1 / totalVotes) * 100).toFixed(1) : 0;
  const team2WinChance =
    totalVotes > 0 ? ((votes.team2 / totalVotes) * 100).toFixed(1) : 0;

    return (
      <div className="bg-black border border-[#17A56B] text-white p-4 sm:p-5 rounded-2xl w-[95%] max-w-md mx-auto mt-6 sm:mt-10 shadow-xl">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#17A56B] mb-2 text-center">
          🏏 Who will win today's match?
        </h1>
    
        {teams ? (
          <>
            <div className="flex flex-col items-center justify-center mt-2 text-center">
              <div className="text-base sm:text-lg font-medium text-white">
                {teams.team1} <span className="text-red-500">vs</span> {teams.team2}
              </div>
              <div className="text-sm text-gray-300 mb-1">{matchStatus}</div>
            </div>
    
            <div className="flex flex-col sm:flex-row justify-around items-center mt-4 gap-3">
              <button
                onClick={() => handleVote("team1")}
                disabled={hasVoted}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto justify-center ${
                  hasVoted
                    ? "bg-[#17A56B] cursor-not-allowed"
                    : "bg-[#17A56B] hover:bg-green-700 active:scale-95"
                }`}
              >
                <img
                  src={teamLogos[teams.team1]}
                  alt={teams.team1}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                />
                <span className="text-sm sm:text-base">{teams.team1}</span>
              </button>
    
              <button
                onClick={() => handleVote("team2")}
                disabled={hasVoted}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto justify-center ${
                  hasVoted
                    ? "bg-[#17A56B] cursor-not-allowed"
                    : "bg-[#17A56B] hover:bg-green-700 active:scale-95"
                }`}
              >
                <img
                  src={teamLogos[teams.team2]}
                  alt={teams.team2}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                />
                <span className="text-sm sm:text-base">{teams.team2}</span>
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
              <div className="text-base text-white mt-2 text-center">
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

export default IPL;
