import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "password") {
      navigate("/dashboard"); // Redirect after "successful" login
    } else {
      alert("Incorrect password! Try 'password'");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(); // Call login function when Enter is pressed
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
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
    </div>
  );
}

export default Login;
