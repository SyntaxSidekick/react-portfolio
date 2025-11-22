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
      <svg className="sun-moon" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="sun" cx="12" cy="12" r="5" />
        <g className="sun-beams">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
      </svg>
    </button>
  );
};

export default DarkModeToggle;