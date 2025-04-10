import { Outlet, Link } from "react-router-dom";
import { FaHome, FaUser, FaTrophy } from "react-icons/fa"; // Import FaTrophy for leaderboard icon
import { useState, useEffect } from "react";
import supabase from './supabaseclient.js';

const Layout = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: userData } = await supabase
        .from("usersLogin")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!userData) {
        await supabase.from("usersLogin").insert([ 
          {
            id: user.id,
            email: user.email,
          },
        ]);
      } else {
        console.log("found user!");
      }
    };

    checkUser();
  }, []);

  return (
    <>
      <header style={styles.header}>
        <nav style={styles.nav}>
          {/* Home Button */}
          <Link
            to="/"
            style={{
              ...styles.homeIcon,
              color: hoveredIcon === "home" ? "orange" : "white", // Change color on hover
            }}
            onMouseEnter={() => setHoveredIcon("home")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <FaHome style={{ fontSize: "2rem" }} />
          </Link>

          {/* Leaderboard Button */}
          <Link
            to="/leaderboard"
            style={{
              ...styles.leaderboardIcon,
              color: hoveredIcon === "leaderboard" ? "orange" : "white", // Change color on hover
            }}
            onMouseEnter={() => setHoveredIcon("leaderboard")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <FaTrophy style={{ fontSize: "2rem" }} />
          </Link>

          <h1>YOMI</h1>

          {/* Profile Button */}
          <Link
            to="/profile"
            style={{
              ...styles.profileIcon,
              color: hoveredIcon === "profile" ? "orange" : "white", // Change color on hover
            }}
            onMouseEnter={() => setHoveredIcon("profile")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <FaUser style={{ fontSize: "2rem" }} />
          </Link>
        </nav>
      </header>

      <Outlet />
    </>
  );
};

const styles = {
  header: {
    backgroundColor: "#A7C7E7",
    padding: "10px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
  },
  homeIcon: {
    textDecoration: "none",
    transition: "color 0.1s",
    marginRight: "20px", // Space between Home and Leaderboard buttons
  },
  leaderboardIcon: {
    textDecoration: "none",
    transition: "color 0.1s",
    marginRight: "895px", // Space between Leaderboard and Profile buttons
  },
  profileIcon: {
    textDecoration: "none",
    transition: "color 0.1s",
    marginLeft: "930px",
  },
};

export default Layout;
