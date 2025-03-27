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
import supabase from "./supabaseclient";
import { useEffect, useState } from "react";

function Profile() {
  const [Username, setUsername] = useState(null);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUsername(user.email);
      console.log(user);
    };
    

    checkUser();
  }, []);


  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: 2 }}>
      {/* Profile Header Section */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <Avatar
          alt="User Avatar"
          src="https://via.placeholder.com/150"
          sx={{ width: 100, height: 100, marginRight: 3 }}
        />
        <Box>
          <Typography variant="h4">{Username}</Typography>
          <Typography variant="body1" color="text.secondary">
            Student
          </Typography>
        </Box>
      </Box>

      {/* Profile Information */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 3,
          border: "4px solid black",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6">Personal Information</Typography>
            <Typography variant="body1">UFID: 123456789</Typography>
            <Typography variant="body1">Year: Junior</Typography>
            <Typography variant="body1">
              Class: Beginner Japanese (Prof. Ogata)
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Activity</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Task</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Lesson</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Points Earned</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>Quiz</TableCell>
                    <TableCell>Lesson 1: New Friends</TableCell>
                    <TableCell style={{ color: 50 >= 0 ? "green" : "inherit" }}>
                      +50
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Created flashcards</TableCell>
                    <TableCell>Lesson 1: New Friends</TableCell>
                    <TableCell style={{ color: 10 >= 0 ? "green" : "inherit" }}>
                      +10
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Profile;
