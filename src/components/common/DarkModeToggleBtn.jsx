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
      <span className="toggle-track">
        <span className="toggle-thumb">
          <i className={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"} aria-hidden="true"></i>
        </span>
      </span>
    </button>
  );
};

export default DarkModeToggle;