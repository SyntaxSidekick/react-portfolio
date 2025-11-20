import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable animated card component
 * @param {ReactNode} children - Card content
 * @param {function} onClick - Click handler
 * @param {number} index - Index for stagger animation delay
 * @param {string} className - Additional CSS classes
 * @param {string} ariaLabel - Accessibility label
 */
const AnimatedCard = ({ 
  children, 
  onClick, 
  index = 0, 
  className = "",
  ariaLabel,
  tabIndex = 0
}) => {
  return (
    <motion.article
      className={`card card-interactive ${className}`}
      onClick={onClick}
      onKeyDown={(e) => onClick && (e.key === 'Enter' || e.key === ' ') && onClick()}
      tabIndex={onClick ? tabIndex : undefined}
      aria-label={ariaLabel}
      style={{ '--card-delay': `${index * 0.15}s` }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      {children}
    </motion.article>
  );
};

export default AnimatedCard;
