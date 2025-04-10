import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";
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
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.log(error);
        setError("Unable to load leaderboard. Please try again later.");
      }
    }

    fetchData();
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
