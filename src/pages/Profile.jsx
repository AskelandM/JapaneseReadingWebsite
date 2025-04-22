import React, { useEffect, useState } from "react";
import supabase from "../supabaseclient";
import "../styling/profile.css";

function Profile() {
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setEmail(user.email);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  

  return (
    <div className="profile-container">
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      <div className="profile-header">
        <img src="/images/oni.png" alt="avatar" className="profile-avatar" />
        <div className="profile-info">
          <h4>{email}</h4>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <p>This is where you can add user stats, activity, or bio.</p>
        </div>
      </div>
      <p>Credits:</p>
      <div className="profile-content">
        <div className="profile-card">
          <p>Mascot Image 'Profile': Ryuuko - Artist: Zayna Latife</p>
          <p>Mascot Image 'Sign In': Mike & Mikan - Artist: Cynthia Nguyen </p>
          <p>Mascot Image 'Title': Wanika - Artist: Christian Lepillan</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
