import React from "react";

/**
 * Reusable social media links component
 * @param {string} variant - 'footer' | 'cta' | 'inline'
 * @param {boolean} showLabels - Show text labels (default: false)
 * @param {Array} links - Optional custom links array
 */
const SocialLinks = ({ 
  variant = 'footer', 
  showLabels = false,
  links,
  className = ""
}) => {
  const defaultLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/riad-kilani',
      icon: 'fab fa-linkedin',
      label: showLabels ? 'LinkedIn' : 'Visit my LinkedIn profile'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/SyntaxSidekick',
      icon: 'fab fa-github',
      label: showLabels ? 'GitHub' : 'Visit my GitHub profile'
    },
    {
      name: 'CodePen',
      url: 'https://codepen.io/SyntaxSidekick',
      icon: 'fab fa-codepen',
      label: showLabels ? 'CodePen' : 'View my CodePen projects'
    },
    {
      name: 'X',
      url: 'https://x.com/f1ss1on',
      icon: 'fab fa-x-twitter',
      label: showLabels ? 'X' : 'Follow me on X (Twitter)'
    }
  ];

  const socialLinks = links || defaultLinks;
  const containerClass = variant === 'cta' ? 'cta-links' : variant === 'inline' ? 'inline-socials' : 'socials';

  if (variant === 'cta') {
    return (
      <nav className={`${containerClass} ${className}`} aria-label="Contact and social media links">
        {socialLinks.map((link) => (
          <a 
            key={link.name}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
            title={link.label}
          >
            <i className={link.icon} aria-hidden="true"></i>
            {link.name}
          </a>
        ))}
        <a 
          href="/contact" 
          className="btn-secondary"
          title="Send a message"
        >
          <i className="fas fa-envelope" aria-hidden="true"></i>
          Contact Me
        </a>
      </nav>
    );
  }

  return (
    <div className={`${containerClass} ${className}`}>
      {socialLinks.map((link) => (
        <a 
          key={link.name}
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={link.label}
          title={link.name}
        >
          <i className={link.icon} aria-hidden="true"></i>
          {showLabels && <span>{link.name}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
