import React from "react";
import Leaderboard from "./Leaderboard";
import Lessons from "./Lessons";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { Button, Typography } from "@mui/material";
import { authTeacher } from "./util";
import "../styling/home.css";

export default function Home(currUser) {
  const [isTeacher, setIsTeacher] = React.useState(
    authTeacher(currUser.currUser.email).then((result) => {
      setIsTeacher(result);
    })
  );
  // Replace with actual logic to determine if the user is a teacher
  return (
    <div className="home-container">
      <div className="home-left">
        <Leaderboard />
      </div>

      <div className="home-right">
        <Lessons />

        {isTeacher && (
          <div className="add-lesson-button">
            <Link to="/custom" className="add-link">
              <Button variant="contained" color="primary">
                <FaPlusCircle className="plus-icon" />
                <Typography sx={{ marginLeft: "8px" }}>Add New Lesson</Typography>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
