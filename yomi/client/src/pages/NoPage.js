import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>404</h1>
        <h2 style={styles.subheading}>Oops! Page not found.</h2>
        <p style={styles.message}>
          The page you were looking for doesn't exist or has been moved. But
          don't worry, we’ve got you covered!
        </p>
        <Link to="/" style={styles.homeButton}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    fontFamily: "'Arial', sans-serif",
  },
  content: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "80px",
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: "20px",
  },
  subheading: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "15px",
  },
  message: {
    fontSize: "16px",
    color: "#7f8c8d",
    marginBottom: "20px",
  },
  homeButton: {
    padding: "12px 20px",
    fontSize: "18px",
    backgroundColor: "#3498db",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

export default NotFound;
