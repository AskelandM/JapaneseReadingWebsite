import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Flashcard from './pages/Flashcards';
import Katakana from './pages/Katakana';
import NoPage from './pages/NoPage'
import Leaderboard from './pages/Leaderboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/flashcards' element={<Flashcard />} />
        <Route path='/katakana' element={<Katakana />} />
        <Route path='/404' element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
