// SignIn.js
import { Link } from "react-router-dom";
import supabase from './supabaseclient.js';
import '../auth.css'; // shared CSS for auth UI

const SignIn = () => {
    const handleLogin = async () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Welcome to YOMI</h2>
            <button onClick={handleLogin} className="auth-button">Sign in with Google</button>
        </div>
    );
};

export default SignIn;
