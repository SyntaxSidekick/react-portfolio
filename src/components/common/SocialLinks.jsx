/**
 * Reusable social media links component
 * @param {string} variant - 'footer' | 'cta' | 'connect'
 * @param {boolean} showLabels - Show text labels (default: false for footer, true for connect)
 * @param {Array} links - Optional custom links array
 */
const SocialLinks = ({ 
  variant = 'footer', 
  showLabels,
  links,
  className = ""
}) => {
  const defaultLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/riad-kilani',
      icon: 'fab fa-linkedin',
      label: showLabels ? 'LinkedIn' : 'Visit my LinkedIn profile',
      brandClass: 'linkedin'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/SyntaxSidekick',
      icon: 'fab fa-github',
      label: showLabels ? 'GitHub' : 'Visit my GitHub profile',
      brandClass: 'github'
    },
    {
      name: 'CodePen',
      url: 'https://codepen.io/SyntaxSidekick',
      icon: 'fab fa-codepen',
      label: showLabels ? 'CodePen' : 'View my CodePen projects',
      brandClass: 'codepen'
    },
    {
      name: 'X',
      url: 'https://x.com/f1ss1on',
      icon: 'fab fa-x-twitter',
      label: showLabels ? 'X' : 'Follow me on X (Twitter)',
      brandClass: 'twitter'
    }
  ];

  // Auto-enable labels for connect variant
  const displayLabels = showLabels !== undefined ? showLabels : variant === 'connect';

  const socialLinks = links || defaultLinks;
  
  // Footer uses .socials with direct <a> children (no .social-link class)
  // Connect/Contact page uses .social-links with .social-link children (card grid)
  const containerClass = variant === 'footer' ? 'socials' : 
                         variant === 'cta' ? 'cta-links' : 
                         'social-links';

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

  // Footer variant has no .social-link class on anchors
  if (variant === 'footer') {
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
  }

  // Connect variant uses card grid with labels, Contact uses same styling
  return (
    <nav className={`${containerClass} ${className}`} aria-label="Social media profiles">
      {socialLinks.map((link) => (
        <a 
          key={link.name}
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`social-link ${link.brandClass || ''}`}
          aria-label={link.label}
          title={link.name}
        >
          <i className={link.icon} aria-hidden="true"></i>
          {displayLabels && <span>{link.name}</span>}
        </a>
      ))}
    </nav>
  );
};

export default SocialLinks;
