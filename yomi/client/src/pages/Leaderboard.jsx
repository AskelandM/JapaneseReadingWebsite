import { useEffect, useState } from "react";
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
  }, []);

  return (
    <>
      <Typography align="center" gutterBottom>
        <h1>
          <strong>Weekly Leaderboard</strong>
        </h1>
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 4, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Rank</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Score</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((user) => (
              <TableRow key={user.rank}>
                <TableCell>
                  {user.rank === 1 ? (
                    <FaTrophy color="gold" />
                  ) : user.rank === 2 ? (
                    <FaTrophy color="silver" />
                  ) : user.rank === 3 ? (
                    <FaTrophy color="brown" />
                  ) : (
                    user.rank
                  )}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell align="right">{user.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Leaderboard;
