import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Quizzes from "./pages/Quizzes";
import { Flashcards } from "./pages/Flashcards";
import Leaderboard from "./pages/Leaderboard";
import supabase from "./supabaseclient";
import Lessons from "./pages/Lessons";
import SignIn from "./pages/SignIn";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import React, { useEffect, useState } from "react";
import QuizOptions from "./pages/QuizOptions";
import Sentences from "./pages/Sentences";
import Vocab from "./pages/Vocab";
import CustomLesson from "./pages/CustomLesson";
import Admin from "./pages/Admin";
import EditLessons from "./pages/EditLessons";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    checkSession();
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <Route path="*" element={<SignIn />} />
        ) : (
          <Route path="/" element={<Layout setUser={setUser} />}>
            <Route index element={<Home currUser={user} />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="quizoptions" element={<QuizOptions />} />
            <Route path="flashcards" element={<Flashcards />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="profile" element={<Profile />} />
            <Route path="game" element={<Game />} />
            <Route path="sentences" element={<Sentences />} />
            <Route path="vocab" element={<Vocab />} />
            <Route path="custom" element={<CustomLesson currUser={user} />} />
            <Route
              path="custom/edit"
              element={<EditLessons currUser={user} />}
            />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
