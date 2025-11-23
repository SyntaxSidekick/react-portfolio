import React from "react";
import TechIcon from "../TechIcon";

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
    // Adobe Suite
    'Photoshop': '#31a8ff',
    'Illustrator': '#ff9a00',
    'InDesign': '#ff3366',
    'XD': '#ff61f6',
    'InVision': '#ff3366',
    'After Effects': '#9999ff',
    
    // Frameworks & Libraries
    'React': '#61dafb',
    'Vue.js': '#42b883',
    'Angular': '#dd0031',
    'Next.js': '#000000',
    
    // Languages
    'JavaScript': '#f0db4f',
    'TypeScript': '#3178c6',
    'HTML5': '#e44d26',
    'CSS3': '#1572b6',
    'PHP': '#777bb4',
    'Python': '#3776ab',
    
    // CSS Frameworks & Preprocessors
    'Sass': '#cd6799',
    'Bootstrap': '#7952b3',
    'Tailwind CSS': '#06b6d4',
    'Material-UI': '#007fff',
    
    // Design & Prototyping
    'Figma': '#f24e1e',
    'Design Systems': '#6366f1',
    'Sketch': '#f7b500',
    
    // CMS & Platforms
    'Drupal': '#0678be',
    'WordPress': '#21759b',
    'Magento': '#ee672f',
    
    // Build Tools & Dev Tools
    'Vite': '#646cff',
    'Webpack': '#8dd6f9',
    'Gulp': '#da4648',
    'Git': '#f05032',
    'npm': '#cb3837',
    
    // Performance & Accessibility
    'WCAG 2.1': '#059669',
    'Performance': '#7c3aed',
    
    // Cloud & Services
    'AWS': '#ff9900',
    'Azure': '#0078d4',
    'Node.js': '#339933',
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
      {(icon || type === 'tech') && (
        <TechIcon 
          name={name} 
          icon={icon} 
          size="sm"
          decorative={true}
        />
      )}
      {name}
    </span>
  );
};

export default TechBadge;
