import React from "react";

/**
 * Reusable stat item component
 * @param {string} number - Stat number/value
 * @param {string} label - Stat description
 */
const StatItem = ({ number, label }) => (
  <div className="stat-item">
    <div className="stat-number">{number}</div>
    <div className="stat-label">{label}</div>
  </div>
);

export default StatItem;
