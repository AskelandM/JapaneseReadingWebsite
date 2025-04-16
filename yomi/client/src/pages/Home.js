import React from "react";
import Leaderboard from "./Leaderboard";
import Lessons from "./Lessons";
import { Link } from "react-router-dom";
import CircularProgressWithLabel from "../components/ProgressCircle";
import { FaPlusCircle } from "react-icons/fa";
import { Button, Typography } from "@mui/material";
// ...

export default function Home() {
  const isTeacher = true; // Replace with actual logic to determine if the user is a teacher
  return (
    <div style={styles.container}>
      <div style={styles.leftColumn}>
        <div style={styles.leaderboard}>
          <Leaderboard> </Leaderboard>
        </div>
        <div style={{ textAlign: "center" }}>
          <h1>
            <Link to={{ pathname: "/sentences" }}>Example Sentence Search</Link>
            <br />
            <strong>Total Progress</strong>
          </h1>
        </div>
      </div>
      <div style={styles.rightColumn}>
        <Lessons />

        {isTeacher && (
          <div style={styles.plusIcon}>
            <Button>
              <Link to={{ pathname: "/custom" }}>
                <Typography>Add new lesson</Typography>
              </Link>

              <FaPlusCircle></FaPlusCircle>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    height: "85vh",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column", // Stack items vertically
    marginRight: "20px", // Add a gap between left and right columns
    // justifyContent: "space-between", // Align items to the top and bottom
    gap: "100px",
    borderRight: "3px solid black", // Add a dividing line
    paddingRight: "20px",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    justifyContent: "center",
  },
  plusIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
};
