import React, { useEffect } from "react";
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
import { FaTrophy } from "react-icons/fa";

// Sample data for the leaderboard

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/leaderboard");
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <Typography variant="h1" align="center" gutterBottom>
        Leaderboard
      </Typography>
      <TableContainer component={Paper}>
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
