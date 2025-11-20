import React from "react";

/**
 * Reusable tech badge/tag component
 * @param {string} name - Technology name
 * @param {string} icon - Font Awesome icon class (optional)
 * @param {string} color - Badge color (optional)
 * @param {string} type - 'tech' | 'tag' | 'category'
 */
const TechBadge = ({ 
  name, 
  icon, 
  color,
  type = 'tech',
  className = ""
}) => {
  const techColors = {
    'Photoshop': '#31a8ff',
    'Illustrator': '#ff9a00',
    'InDesign': '#ff3366',
    'Design Systems': '#6366f1',
    'React': '#61dafb',
    'JavaScript': '#f0db4f',
    'TypeScript': '#3178c6',
    'HTML5': '#e44d26',
    'CSS3': '#1572b6',
    'Sass': '#cd6799',
    'Bootstrap': '#7952b3',
    'Figma': '#f24e1e',
    'Git': '#f05032',
    'Gulp': '#da4648',
  };

  const badgeColor = color || techColors[name] || '#3060BF';
  const baseClass = type === 'tech' ? 'tech-badge' : type === 'category' ? 'category-badge' : 'tag';

  const handleMouseEnter = (e) => {
    if (type === 'tech') {
      e.currentTarget.style.boxShadow = `0 0 12px ${badgeColor}60, 0 4px 8px ${badgeColor}40`;
      e.currentTarget.style.backgroundColor = `${badgeColor}15`;
    }
  };

  const handleMouseLeave = (e) => {
    if (type === 'tech') {
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.backgroundColor = '';
    }
  };

  return (
    <span 
      className={`badge ${baseClass} ${className}`}
      title={name}
      style={type === 'tech' ? { 
        borderColor: badgeColor,
        color: badgeColor 
      } : {}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon && <i className={icon} aria-hidden="true"></i>}
      {name}
    </span>
  );
};

export default TechBadge;
