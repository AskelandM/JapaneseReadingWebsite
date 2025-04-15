import { Link } from "react-router-dom";
import supabase from "../supabaseclient.js";

const SignIn = () => {
  const handleLogin = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
      slayyy
    </div>
  );
};

export default SignIn;
