import React from 'react';
import PropTypes from 'prop-types';

/**
 * Universal Page Header Component
 * Used across Bio, Portfolio, Blog, and Contact pages
 * Simple title/subtitle section that sits at the top of page content
 * 
 * @param {string} title - Main page title (h1)
 * @param {string} subtitle - Optional subtitle/tagline
 * @param {string} className - Additional CSS classes
 */
const PageHeader = ({ title, subtitle, className = '' }) => {
  return (
    <header className={`page-header ${className}`}>
      {title && (
        <h1 className="page-title">{title}</h1>
      )}
      
      {subtitle && (
        <h2 className="page-subtitle">{subtitle}</h2>
      )}
    </header>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default PageHeader;
