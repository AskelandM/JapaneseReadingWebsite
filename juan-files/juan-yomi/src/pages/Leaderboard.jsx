import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.log(error);
        setError("Unable to load leaderboard. Please try again later.");
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>
      <Link to="/dashboard" className="text-blue-400 hover:underline">
          Back to Dashboard
      </Link>
      {error ? (
        <p className="text-red-500 text-center mt-4">{error}</p>
      ) : (
        <div className="w-full max-w-2xl">
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-4 py-2">Rank</th>
                <th className="border border-gray-600 px-4 py-2">Name</th>
                <th className="border border-gray-600 px-4 py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr key={user.rank} className="bg-gray-900 even:bg-gray-800">
                  <td className="border border-gray-600 px-4 py-2 text-center">
                    {user.rank === 1 ? (
                      <FaTrophy color="gold" />
                    ) : user.rank === 2 ? (
                      <FaTrophy color="silver" />
                    ) : user.rank === 3 ? (
                      <FaTrophy color="brown" />
                    ) : (
                      user.rank
                    )}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-600 px-4 py-2 text-right">{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
