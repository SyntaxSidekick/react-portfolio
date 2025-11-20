import React from "react";

const SOCIAL_LINKS = [
  {
    href: "https://linkedin.com/in/riad-kilani",
    icon: "fab fa-linkedin",
    className: "linkedin",
    ariaLabel: "Connect with Riad Kilani on LinkedIn",
    title: "Connect with Riad Kilani on LinkedIn",
    label: "LinkedIn"
  },
  {
    href: "https://github.com/SyntaxSidekick",
    icon: "fab fa-github",
    className: "github",
    ariaLabel: "View Riad Kilani's code on GitHub",
    title: "View Riad Kilani's open source projects and code on GitHub",
    label: "GitHub"
  },
  {
    href: "https://codepen.io/SyntaxSidekick",
    icon: "fab fa-codepen",
    className: "codepen",
    ariaLabel: "See Riad Kilani's experiments on CodePen",
    title: "Explore Riad Kilani's front-end experiments and demos on CodePen",
    label: "CodePen"
  },
  {
    href: "https://x.com/syntaxsidekick",
    icon: "fab fa-x-twitter",
    className: "twitter",
    ariaLabel: "Follow Riad Kilani on X (formerly Twitter)",
    title: "Follow Riad Kilani on X for web development insights and updates",
    label: "X (Twitter)"
  }
];

const ConnectSection = () => {
  return (
    <section className="bio-connect-section" aria-labelledby="connect-heading">
      <header>
        <h2 id="connect-heading">Let's Connect</h2>
        <p>If you're interested in front-end engineering, design systems, or accessible UI development, let's connect. I share work, insights, and experiments across the platforms below.</p>
      </header>
      <div className="section-content">
        <div className="bio-connect">
          <nav className="social-links" aria-label="Social media profiles">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.className}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-link ${link.className}`}
                aria-label={link.ariaLabel}
                title={link.title}
              >
                <i className={link.icon} aria-hidden="true"></i>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
