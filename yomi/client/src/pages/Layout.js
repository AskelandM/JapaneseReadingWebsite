import { Outlet, Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaTrophy,
  FaBook,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import supabase from "../supabaseclient.js";
import "../styling/layout.css";
import authTeacher from "./util.js";

const Layout = ({ setUser }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

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
        if (authTeacher(user.email)) {
          setIsTeacher(true);
        }
        console.log("found user!");
      }
    };

    checkUser();
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav-section">
          <Link to="/">
            <FaHome style={{ fontSize: "2rem" }} />
          </Link>
          <Link to="/leaderboard">
            <FaTrophy style={{ fontSize: "2rem" }} />
          </Link>
          <Link to="/lessons">
            <FaBook style={{ fontSize: "2rem" }} />
          </Link>
          <Link to="/sentences">
            <FaSearch style={{ fontSize: "2rem" }} />
          </Link>
        </div>

        <div className="nav-center">
          <h1>{isTeacher ? "YOMI TEACHER" : "YOMI"} </h1>
          <img
            src="/images/gator_student.png"
            alt="YOMI logo"
            className="logo-image"
          />
        </div>

        <div className="nav-section">
          <Link to="/profile">
            <FaUser style={{ fontSize: "2rem" }} />
          </Link>
          <button
            onClick={handleLogout}
            className="logout-button"
            onMouseEnter={() => setHoveredIcon("logout")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <FaSignOutAlt style={{ fontSize: "2rem" }} />
          </button>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
