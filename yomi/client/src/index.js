import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SignIn from "./pages/SignIn";
import Quizzes from "./pages/Quizzes";
import Flashcards from "./pages/Flashcards";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NoPage />} />
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
