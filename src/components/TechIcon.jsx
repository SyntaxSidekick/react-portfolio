import React from "react";
import photoshopIcon from "../assets/images/photoshop-brands.svg";
import illustratorIcon from "../assets/images/illustrator-brands.svg";
import indesignIcon from "../assets/images/indesign-brands.svg";
import invisionIcon from "../assets/images/invision-brand.svg";

/**
 * TechIcon Component
 * Displays technology icons using either SVG files or Font Awesome icons
 * Automatically applies brand colors from UI kit
 * 
 * @param {Object} props
 * @param {string} props.name - Technology name (e.g., "React", "Photoshop")
 * @param {string} props.icon - Font Awesome class (e.g., "fab fa-react")
 * @param {string} props.className - Additional CSS classes
 */
const TechIcon = ({ name, icon, className = "" }) => {
  const techNameLower = name?.toLowerCase() || "";

  // SVG icon mapping
  const svgIcons = {
    photoshop: photoshopIcon,
    illustrator: illustratorIcon,
    indesign: indesignIcon,
    invision: invisionIcon,
  };

  // Check if we have an SVG for this technology
  if (svgIcons[techNameLower]) {
    return (
      <img
        src={svgIcons[techNameLower]}
        alt=""
        className={`tech-svg-icon ${className}`}
        aria-hidden="true"
      />
    );
  }

  // Otherwise use Font Awesome icon
  return <i className={`${icon} ${className}`} aria-hidden="true"></i>;
};

export default TechIcon;
