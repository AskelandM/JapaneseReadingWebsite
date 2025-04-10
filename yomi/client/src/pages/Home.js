import React from "react";
import Leaderboard from "./Leaderboard";
import Lessons from "./Lessons";
import { Link } from "react-router-dom";
import CircularProgressWithLabel from "../components/ProgressCircle";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.leftColumn}>
        <div style={styles.leaderboard}>
          <Leaderboard> </Leaderboard>
        </div>
        <div style={{ textAlign: "center" }}>
          <h1>
            <Link to={{pathname: "/sentences"}}>Example Sentence Search</Link>
            <br/>
            <strong>Total Progress</strong>
          </h1>
          <CircularProgressWithLabel value={50} size={200} fontSize={20} />
        </div>
      </div>
      <div style={styles.rightColumn}>
        <Lessons />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    height: "100vh",
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
    flex: "1",
    justifyContent: "center",
  },
};
