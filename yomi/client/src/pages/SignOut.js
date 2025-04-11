// SignOut.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from './supabaseclient.js';
import '../auth.css';

const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const signOut = async () => {
            await supabase.auth.signOut();
            navigate('/'); // redirect to home or sign-in
        };

        signOut();
    }, [navigate]);

    return (
        <div className="auth-container">
            <h2 className="auth-title">Signing you out...</h2>
        </div>
    );
};

export default SignOut;
