import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuToggle from "/src/components/common/MenuToggleBtn";
import DarkModeToggle from "/src/components/common/DarkModeToggleBtn";
import logo from "../assets/images/riad-kilani-logo.webp";

const navLinks = Object.freeze([
  { to: "/bio", label: "Bio", title: "View Bio" },
  { to: "/portfolio", label: "Portfolio", title: "View Portfolio" },
  { to: "/blog", label: "Blog", title: "View Blog" },
  { to: "/contact", label: "Contact", title: "Contact Riad Kilani" },
]);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const location = useLocation();

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
    // Save preference
    localStorage.setItem("darkMode", darkMode);
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
      requestAnimationFrame(() => el.focus());
    }
  };

  useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape") setMenuOpen(false);
  };
  document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth > 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
  }, [menuOpen]);

  return (
    <header id="header" className="site-header" role="banner">
      <a
        href="#main-content"
        className="skip-link"
        tabIndex={0}
        aria-label="Skip to main content"
        onClick={handleSkip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleSkip(e);
        }}
      >
        Skip to main content
      </a>
      <div className="container">
        <div className="site-branding">
          <Link to="/" className="logo" aria-label="Go to home">
            <img
              src={logo}
              alt="Riad Kilani — Senior Front-End Developer"
              width="400"
              height="77"
            />
          </Link>
        </div>
        <MenuToggle menuOpen={menuOpen} onToggle={handleToggle} />
        <DarkModeToggle darkMode={darkMode} onToggle={handleDarkModeToggle} />
        <nav
          id="main-navigation"
          aria-label="Primary"
          className={menuOpen ? "active" : ""}
        >
          <ul onClick={handleNavClick}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={"nav-link"}
                  aria-current={
                    location.pathname === link.to ? "page" : undefined
                  }
                  tabIndex={menuOpen || isDesktop ? 0 : -1}
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
