import React from "react";
import Leaderboard from "./Leaderboard";
import Lessons from "./Lessons";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { Button, Typography } from "@mui/material";
import { authTeacher } from "./util";
import "../styling/home.css";
import { FaPencil } from "react-icons/fa6";

export default function Home(currUser) {
  const [isTeacher, setIsTeacher] = React.useState(
    authTeacher(currUser.currUser.email).then((result) => {
      setIsTeacher(result);
    })
  );
  React.useEffect(() => {
    // Save current overflow setting
    const originalOverflow = document.body.style.overflow;

    // Disable scroll
    document.body.style.overflow = "hidden";

    // Re-enable scroll on unmount
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Replace with actual logic to determine if the user is a teacher
  return (
    <div className="home-container">
      <div className="home-left">
        <Leaderboard />
        {isTeacher && (
          <div className="add-lesson-button">
            <Link to="/custom" className="add-link">
              <Button variant="contained" color="primary">
                <FaPlusCircle className="plus-icon" />
                <Typography sx={{ marginLeft: "8px" }}>
                  Add New Lesson
                </Typography>
              </Button>
            </Link>
            <Link to="/custom/edit" className="add-link">
              <Button variant="contained" color="primary">
                <FaPencil className="plus-icon" />
                <Typography sx={{ marginLeft: "8px" }}>
                  My Custom Lessons
                </Typography>
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="home-right">
        <div className="lessons-wrapper">
          <Lessons />
        </div>
      </div>
    </div>
  );
}
