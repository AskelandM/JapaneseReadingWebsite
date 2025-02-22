import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SignIn from "./pages/SignIn";
import Katakana from "./pages/Katakana";
import Leaderboard from "./pages/Leaderboard";
import supabase from './pages/supabaseclient';

export default function App() {
  const handleLogin = async () => {
  supabase.auth.signInWithOAuth({
    provider: 'google',
  })
}
  return (
    <BrowserRouter>
    <button onClick={handleLogin}>Sign in with Google</button>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        
          <Route path="katakana" element={<Katakana />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NoPage />} />
       8
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
