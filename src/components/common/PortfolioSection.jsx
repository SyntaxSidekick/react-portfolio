import React from "react";

/**
 * Reusable portfolio section wrapper
 * @param {string} id - Section ID
 * @param {string} headingId - Heading element ID for aria-labelledby
 * @param {string} title - Section title
 * @param {string} description - Section description
 * @param {string} className - Additional CSS class
 * @param {boolean} show - Whether to show the section (for filtering)
 * @param {ReactNode} children - Section content
 */
const PortfolioSection = ({ 
  id, 
  headingId, 
  title, 
  description, 
  className = "", 
  show = true,
  children 
}) => {
  if (!show) return null;

  return (
    <section className={`portfolio-${className}-section`} aria-labelledby={headingId}>
      <header className="section-header">
        <h2 id={headingId}>{title}</h2>
        <p>{description}</p>
      </header>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export default PortfolioSection;
