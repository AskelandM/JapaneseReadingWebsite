import { Outlet, Link } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import supabase from "../supabaseclient.js";

const Layout = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
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
        console.log("found user!");
      }
    };

    checkUser();
  }, []);

  return (
    <>
      <header style={styles.header}>
        <nav style={styles.nav}>
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
          <h1>YOMI</h1>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeIcon: {
    textDecoration: "none",
    transition: "color 0.1s",
  },
  profileIcon: {
    textDecoration: "none",
    transition: "color 0.1s",
  },
};

export default Layout;
