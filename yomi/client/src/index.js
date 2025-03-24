import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Quizzes from "./pages/Quizzes";
import Flashcards from "./pages/Flashcards";
// import Leaderboard from "./pages/Leaderboard";
import { SupabaseLoginButton } from './pages/supabaseclient';
import supabase from "./pages/supabaseclient";
import Lessons from "./pages/Lessons";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { user } } = await supabase.auth.getUser(); 
            setUser(user);
        };
        checkSession();
    }, [setUser]); 

    return (
        <BrowserRouter>
            <Routes>
                {!user ? (
                    <Route path="*" element={<SupabaseLoginButton />} /> 
                ) : (
                  
                    <Route path="/" element={<Layout />}>
                      
                        
                      <Route path="quizzes" element={<Quizzes />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="profile" element={<Profile />} />
                    </Route>
                )}
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
