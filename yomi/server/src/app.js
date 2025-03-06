const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.get("/api/leaderboard", (req, res) => {
  const leaderboardData = [
    { rank: 1, name: "Alice", score: 2500 },
    { rank: 2, name: "Bob", score: 2200 },
    { rank: 3, name: "Charlie", score: 2100 },
    { rank: 4, name: "David", score: 2000 },
    { rank: 5, name: "Eve", score: 700 },
  ];
  res.json(leaderboardData);
});

app.get("/api/lessons", (req, res) => {
  const lessons = [
    {
      title: "Lesson 1: New Friends",
      progress: 50,
    },
    {
      title: "Lesson 2: Shopping",
      progress: 5,
    },
    {
      title: "Lesson 3: Making a Date",
      progress: (1 / 3) * 100,
    },
    {
      title: "Lesson 4: The First Date",
      progress: 75,
    },
    {
      title: "Lesson 5: A Trip to Okinawa",
      progress: 100,
    },
    {
      title: "Lesson 6: A Day in Robert's Life",
      progress: 0,
    },
    {
      title: "Lesson 7: Family Picture",
      progress: 25,
    },
    {
      title: "Lesson 8: Barbecue",
      progress: 50,
    },
    {
      title: "Lesson 9: Kabuki",
      progress: 75,
    },
    {
      title: "Lesson 10: Winter Vacation Plans",
      progress: 100,
    },
    {
      title: "Lesson 11: After the Vacation",
      progress: 0,
    },
    {
      title: "Lesson 12: Feeling Ill",
      progress: 25,
    },
  ];

  res.json(lessons);
});
app.listen(5000, () => {
  console.log("App running on http://localhost:5000");
});
