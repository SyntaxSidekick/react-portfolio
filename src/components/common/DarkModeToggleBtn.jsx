import React from "react";

const DarkModeToggle = ({ darkMode, onToggle }) => {
  const darkModeLabel = darkMode 
  ? "Switch to light mode" 
  : "Switch to dark mode";
  
  return (
    <button
      className="dark-mode-toggle"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onToggle}
      title={darkModeLabel}
      role="switch"
      aria-checked={darkMode}
    >
      <i className="fas fa-sun toggle-icon light-icon" aria-hidden="true"></i>
      <i className="fas fa-moon toggle-icon dark-icon" aria-hidden="true"></i>
      <span className="toggle-slider"></span>
    </button>
  );
};

export default DarkModeToggle;