import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Quizzes from "./pages/Quizzes";
import Flashcards from "./pages/Flashcards";
import Leaderboard from "./pages/Leaderboard";
import supabase from "../../client/src/pages/supabaseclient";
import Lessons from "./pages/Lessons";
import Profile from "./pages/Profile";

export default function App() {
  const handleLogin = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return (
    <BrowserRouter>
      <button onClick={handleLogin}>Sign in with Google</button>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />8
        </Route>
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
