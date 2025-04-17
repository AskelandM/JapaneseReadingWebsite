import React from "react";
import Leaderboard from "./Leaderboard";
import Lessons from "./Lessons";
import { Link } from "react-router-dom";
import CircularProgressWithLabel from "../components/ProgressCircle";
import { FaPlusCircle } from "react-icons/fa";
import { Button, Typography } from "@mui/material";
import supabase from "../supabaseclient";

async function authTeacher(email) {
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error("Error fetching teacher data:", error);
    return false;
  }

  return data.length > 0;
}

export default function Home(currUser) {
  const [isTeacher, setIsTeacher] = React.useState(
    authTeacher(currUser.currUser.email).then((result) => {
      setIsTeacher(result);
    })
  );
  // Replace with actual logic to determine if the user is a teacher
  return (
    <div style={styles.container}>
      <div style={styles.leftColumn}>
        <div style={styles.leaderboard}>
          <Leaderboard> </Leaderboard>
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
