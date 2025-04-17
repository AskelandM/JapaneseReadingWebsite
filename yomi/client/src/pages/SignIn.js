import { Link } from "react-router-dom";
import supabase from "../supabaseclient.js";
import "../signin.css";

const SignIn = () => {
  const handleLogin = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1>Welcome to YOMI!</h1>
        <img
          src="/images/duo.png"
          alt="YOMI logo"
          className="signin-image"
        />
        <button className="google-btn" onClick={handleLogin}>
          Sign in with your UFL email
        </button>
      </div>
    </div>
  );
};

export default SignIn;
