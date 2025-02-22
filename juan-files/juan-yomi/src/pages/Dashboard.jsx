import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      
      <div className="flex flex-wrap gap-4">
        <Link to="/flashcards" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Flashcards
        </Link>
        <Link to="/katakana" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Katakana Practice
        </Link>
        <Link to="/leaderboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Leaderboard
        </Link>
      </div>

      <Link to="/" className="mt-6 text-blue-400 hover:underline">
        Back to Home
      </Link>
      <Link to="/login" className="mt-6 text-blue-400 hover:underline">
        Logout
      </Link>
    </div>
  );
}

export default Dashboard;
