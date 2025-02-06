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

app.listen(5000, () => {
  console.log("App running on http://localhost:5000");
});
