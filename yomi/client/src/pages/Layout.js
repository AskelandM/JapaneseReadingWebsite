import { Outlet, Link } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { useState } from "react";

const Layout = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

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
