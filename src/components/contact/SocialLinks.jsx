import React from "react";
import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/riad-kilani",
    className: "linkedin",
    icon: "fab fa-linkedin",
    label: "Connect with Riad Kilani on LinkedIn",
    name: "LinkedIn"
  },
  {
    href: "https://github.com/SyntaxSidekick",
    className: "github",
    icon: "fab fa-github",
    label: "View Riad Kilani's code on GitHub",
    name: "GitHub"
  },
  {
    href: "https://codepen.io/SyntaxSidekick",
    className: "codepen",
    icon: "fab fa-codepen",
    label: "See Riad Kilani's experiments on CodePen",
    name: "CodePen"
  },
  {
    href: "https://x.com/syntaxsidekick",
    className: "twitter",
    icon: "fab fa-x-twitter",
    label: "Follow Riad Kilani on X (formerly Twitter)",
    name: "X (Twitter)"
  }
];

const SocialLinks = () => {
  return (
    <motion.nav 
      className="social-links" 
      aria-label="Social media links"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {SOCIAL_LINKS.map((link, index) => (
        <motion.a 
          key={link.className}
          href={link.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`social-link ${link.className}`}
          aria-label={link.label}
          title={link.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <i className={link.icon} aria-hidden="true"></i>
          <span>{link.name}</span>
        </motion.a>
      ))}
    </motion.nav>
  );
};

export default SocialLinks;
