import React from "react";
import "../styling/nopage.css";

const NoPage = () => {
  const navigateHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="nopage-container">
      <div className="nopage-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button className="home-button" onClick={navigateHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NoPage;