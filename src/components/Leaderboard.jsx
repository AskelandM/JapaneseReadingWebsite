import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";
import supabase from "../supabaseclient.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import "../styling/leaderboard.css"

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const correctPoints = async () => {
      const { data: correctData, error } = await supabase
        .from("leaderBoard_points")
        .select("*");

      if (error) {
        console.error("Error fetching leaderboard:", error);
        setError(error);
      } else {
        const mapped = correctData
          .sort((a, b) => b.user_points - a.user_points)
          .map((row, index) => ({
            rank: index + 1,
            name: row.userName,
            score: row.user_points,
          }));

        setLeaderboardData(mapped);
      }
    };

    correctPoints();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <h1 className="leaderboard-title">Leaderboard</h1>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user) => (
              <tr key={user.rank}>
                <td>
                  {user.rank === 1 ? (
                    <FaTrophy className="trophy-icon" color="gold" />
                  ) : user.rank === 2 ? (
                    <FaTrophy className="trophy-icon" color="silver" />
                  ) : user.rank === 3 ? (
                    <FaTrophy className="trophy-icon" color="saddlebrown" />
                  ) : (
                    user.rank
                  )}
                </td>
                <td>{user.name}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Leaderboard;
