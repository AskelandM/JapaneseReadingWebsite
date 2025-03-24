import express from "express";
import path from "path";
import cors from "cors";
import supabase from "./supabaseclient.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.get("/api/leaderboard", async (req, res) => {
  const response = await supabase
    .from("users")
    .select("*")
    .order("score", { ascending: false });
  const data = response.data;
  const leaderboardData = data.map((user, index) => ({
    name: user.name,
    score: user.score,
    rank: index + 1,
  }));
  res.json(leaderboardData);
});

app.get("/api/lessons", async (req, res) => {
  const lessons = await supabase.from("lessons").select("*");
  return res.json(lessons.data);
});
app.listen(4000, () => {
  console.log("App running on http://localhost:4000");
});
