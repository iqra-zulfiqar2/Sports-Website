import React from "react";


const WinPredictor = ({ match }) => {
    if (!match.matchScore || !match.matchInfo) return null;
  
    const team1 = match.matchInfo.team1;
    const team2 = match.matchInfo.team2;
  
    const team1Score = match.matchScore.team1Score?.inngs1?.runs || 0;
    const team1Overs = match.matchScore.team1Score?.inngs1?.overs || 1;
  
    const team2Score = match.matchScore.team2Score?.inngs1?.runs || 0;
    const team2Overs = match.matchScore.team2Score?.inngs1?.overs || 1;
  
    let team1WinProb = 50, team2WinProb = 50;
  
    if (team2Score > 0) {
      const runRate1 = team1Score / team1Overs;
      const runRate2 = team2Score / team2Overs;
  
      if (team2Score > team1Score) {
        team2WinProb = Math.min(90, (team2Score / team1Score) * 100);
        team1WinProb = 100 - team2WinProb;
      } else {
        team1WinProb = Math.min(90, (team1Score / team2Score) * 100);
        team2WinProb = 100 - team1WinProb;
      }
    }
  
    return (
      <div className="mt-2 p-2 bg-gray-800 rounded">
        <p className="text-green-400 font-bold">
          {team1.teamName} Win Probability: {Math.round(team1WinProb)}%
        </p>
        <p className="text-red-400 font-bold">
          {team2.teamName} Win Probability: {Math.round(team2WinProb)}%
        </p>
      </div>
    );
  };
  
  export default WinPredictor;
  