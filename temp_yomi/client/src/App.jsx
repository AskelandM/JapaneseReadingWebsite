import { BrowserRouter, Routes, Route } from "react-router"
import { useEffect, useState } from "react"
import supabase from "../pages/supabaseclient"

// Components/Pages
import Layout from "../pages/Layout"
import Home from "../pages/Home"
import NoPage from "../pages/NoPage"
import Quizzes from "../pages/Quizzes"
import Flashcards from "../pages/Flashcards"
import Leaderboard from "../pages/Leaderboard"
import Lessons from "../pages/Lessons"
import SignIn from "../pages/SignIn"
import Profile from "../pages/Profile"

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkSession()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <Route path="*" element={<SignIn />} />
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="flashcards" element={<Flashcards />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}
