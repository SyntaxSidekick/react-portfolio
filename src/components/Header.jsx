
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/bio", label: "Bio", title: "View Bio" },
  { to: "/portfolio", label: "Portfolio", title: "View Portfolio" },
  { to: "/blog", label: "Blog", title: "View Blog" },
  { to: "/contact", label: "Contact", title: "Contact Riad Kilani" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const location = useLocation();

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    // Save preference
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);
  const handleDarkModeToggle = () => setDarkMode((prev) => !prev);

  // Keyboard accessibility for skip link
  const handleSkip = (e) => {
    e.preventDefault();
    const el = document.getElementById("main-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        if (el.tabIndex < 0) el.tabIndex = -1;
        el.focus();
      }, 300);
    }
  };

  return (
    <header id="header" className="site-header" role="banner">
      <a
        href="#main-content"
        className="skip-link"
        tabIndex={0}
        aria-label="Skip to main content"
        onClick={handleSkip}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") handleSkip(e);
        }}
      >
        Skip to main content
      </a>
      <div className="container">
        <div className="site-branding">
          <Link
            to="/"
            className="logo"
            aria-label="Riad Kilani Home"
            title="Riad Kilani - Front-end Developer"
          >
            {/* Logo image visually, text for screen readers */}
            <span className="sr-only">Riad Kilani</span>
          </Link>
        </div>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          onClick={handleToggle}
        >
          <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true"></i>
        </button>
        <button
          className="dark-mode-toggle"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={handleDarkModeToggle}
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          <i className={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"} aria-hidden="true"></i>
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          role="navigation"
          className={menuOpen ? "active" : ""}
        >
          <ul onClick={handleNavClick}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  title={link.title}
                  className={location.pathname === link.to ? "active" : ""}
                  tabIndex={menuOpen || window.innerWidth > 900 ? 0 : -1}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
