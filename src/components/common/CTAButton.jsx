import React from "react";

/**
 * Reusable CTA button with consistent styling
 * @param {string} href - Link URL
 * @param {string} icon - Font Awesome icon class
 * @param {string} title - Main title text
 * @param {string} subtitle - Smaller descriptive text
 * @param {string} ariaLabel - Accessibility label
 * @param {string} className - Additional CSS classes
 */
const CTAButton = ({ 
  href, 
  icon, 
  title, 
  subtitle, 
  ariaLabel,
  className = "" 
}) => {
  return (
    <a 
      href={href} 
      className={`${className} cta-button`}
      aria-label={ariaLabel || title}
    >
      <span className="cta-content">
        <i className={icon} aria-hidden="true"></i>
        <span className="cta-text">
          <strong>{title}</strong>
          {subtitle && <small>{subtitle}</small>}
        </span>
      </span>
      <i className="fas fa-arrow-right cta-arrow" aria-hidden="true"></i>
    </a>
  );
};

export default CTAButton;
