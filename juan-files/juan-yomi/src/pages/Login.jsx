import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username !== "student") {
      alert("Username does not exist! Try 'student'");
      return;
    }
    if (password !== "password") {
      alert("Incorrect password! Try 'password'");
      return;
    }
    navigate("/dashboard");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <input
        type="text"
        placeholder="Enter username"
        className="p-2 text-black rounded mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        placeholder="Enter password"
        className="p-2 text-black rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleLogin} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
      <Link to="/" className="mt-6 text-blue-400 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}

export default Login;
