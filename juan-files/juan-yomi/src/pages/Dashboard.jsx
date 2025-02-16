import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Profile
        </button>
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Settings
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
      <Link to="/" className="mt-6 text-sm text-gray-300 underline">
        Back to Home
      </Link>
    </div>
  );
}

export default Dashboard;
