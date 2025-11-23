import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable section header component
 * @param {string} badge - Optional badge text
 * @param {string} title - Section title
 * @param {string} subtitle - Optional section description
 * @param {string} id - ID for the title element (for aria-labelledby)
 * @param {boolean} animate - Whether to animate on scroll (default: true)
 */
const SectionHeader = ({ 
  badge, 
  title, 
  subtitle, 
  id, 
  animate = true,
  className = ""
}) => {
  const HeaderContent = () => (
    <header className={`section-header ${className}`}>
      {badge && <span className="badge badge-outline">{badge}</span>}
      <h2 id={id}>{title}</h2>
      {subtitle && <p className="section-intro">{subtitle}</p>}
    </header>
  );

  if (!animate) {
    return <HeaderContent />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <HeaderContent />
    </motion.div>
  );
};

export default SectionHeader;
