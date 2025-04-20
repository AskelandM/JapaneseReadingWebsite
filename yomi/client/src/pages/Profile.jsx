import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableRow,
} from "@mui/material";
import supabase from "../supabaseclient";
import { useEffect, useState } from "react";
import "../styling/profile.css";

function Profile() {
  const [Username, setUsername] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUsername(user.email);
    };

    checkUser();
  }, []);

  return (
    <div className="profile-container">
      {/* Profile Header Section */}
      <div className="profile-header">
        <Avatar
          alt="User Avatar"
          src="images/oni.png"
          className="profile-avatar"
        />
        <div className="profile-info">
          <Typography variant="h4">{Username}</Typography>
          <Typography variant="body1" color="text.secondary">
            Student
          </Typography>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        <Card className="profile-card">
          <CardContent>
            <Typography variant="h6">Personal Information</Typography>
            <Typography variant="body1">UFID: 123456789</Typography>
            <Typography variant="body1">Year: Junior</Typography>
            <Typography variant="body1">
              Class: Beginner Japanese (Prof. Ogata)
            </Typography>
          </CardContent>
        </Card>

        <Card className="profile-card">
          <CardContent>
            <Typography variant="h6">Activity</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Task</strong></TableCell>
                    <TableCell><strong>Lesson</strong></TableCell>
                    <TableCell><strong>Points Earned</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Quiz</TableCell>
                    <TableCell>Lesson 1: New Friends</TableCell>
                    <TableCell style={{ color: "green" }}>+50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Practiced flashcards</TableCell>
                    <TableCell>Lesson 1: New Friends</TableCell>
                    <TableCell style={{ color: "green" }}>+10</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
