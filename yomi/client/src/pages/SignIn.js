import supabase from "../supabaseclient.js";
import React, { useState } from "react";
import "../styling/signin.css";

const SignIn = () => {
  const [loginAdmin, setLoginAdmin] = useState(false);
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleAdminLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: adminData.email,
      password: adminData.password,
    });

    if (error) {
      setLoginError(true);
    } else {
      window.location.href = "/";
    }
  };

  const toggleAdminLogin = async () => {
    setLoginAdmin(true);
  };

  if (loginAdmin) {
    return (
      <div className="signin-container">
        <div className="signin-box">
          <h1>Admin Login</h1>
          <img src="/images/duo.png" alt="YOMI logo" className="signin-image" />
          <h2> {loginError ? "Invalid Login" : ""}</h2>
          <input
            type="text"
            placeholder="Admin Email"
            className="admin-input-field"
            value={adminData.username}
            onChange={(e) =>
              setLoginError(false) ||
              setAdminData({ ...adminData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Admin Password"
            className="admin-input-field"
            value={adminData.password}
            onChange={(e) =>
              setLoginError(false) ||
              setAdminData({ ...adminData, password: e.target.value })
            }
          />
          <button className="google-btn" onClick={handleAdminLogin}>
            Log In
          </button>
          <button className="google-btn" onClick={() => setLoginAdmin(false)}>
            Back
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="signin-container">
        <div className="signin-box">
          <h1>Welcome to YOMI!</h1>
          <img src="/images/duo.png" alt="YOMI logo" className="signin-image" />
          <button className="google-btn" onClick={handleLogin}>
            Sign in with your UFL email
          </button>
          <button className="google-btn" onClick={toggleAdminLogin}>
            Admin Sign In
          </button>
        </div>
      </div>
    );
  }
};

export default SignIn;
