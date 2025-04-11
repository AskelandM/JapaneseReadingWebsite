import React from "react";
import Leaderboard from "./Leaderboard";
import Lessons from "./Lessons";
import CircularProgressWithLabel from "../components/ProgressCircle";
import { Box, Typography, Divider } from "@mui/material";

export default function Home() {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftColumn}>
        <Box sx={styles.leaderboard}>
          <Leaderboard />
        </Box>
        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Total Progress
          </Typography>
          <CircularProgressWithLabel value={50} size={200} fontSize={20} />
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 3, borderColor: "#ccc" }} />

      <Box sx={styles.rightColumn}>
        <Lessons />
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    padding: 3,
    backgroundColor: "#fefefe",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  leaderboard: {
    flexGrow: 1,
  },
  rightColumn: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
  },
};
