import React from "react";

/**
 * Reusable contact info card component
 * @param {string} icon - Font Awesome icon class
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} link - URL
 * @param {string} linkText - Link display text
 */
const ContactInfoCard = ({ icon, title, description, link, linkText }) => (
  <div className="contact-info-card">
    <div className="info-icon">
      <i className={icon} aria-hidden="true"></i>
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer" className="contact-link">
      {linkText}
    </a>
  </div>
);

export default ContactInfoCard;
