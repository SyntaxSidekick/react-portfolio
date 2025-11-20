/**
 * Utility functions for Home component
 */

/**
 * Parse project title to extract main title and type
 * @param {string} title - Full project title
 * @returns {object} Object with mainTitle and type
 */
export const parseProjectTitle = (title) => {
  if (title.includes('–')) {
    const [mainTitle, type] = title.split('–');
    return { mainTitle: mainTitle.trim(), type: type.trim() };
  }
  if (title.includes('-')) {
    const [mainTitle, type] = title.split('-');
    return { mainTitle: mainTitle.trim(), type: type.trim() };
  }
  return { mainTitle: title, type: null };
};

/**
 * Get metric label from key
 * @param {string} key - Metric key
 * @returns {string} Formatted label
 */
export const getMetricLabel = (key) => {
  const labels = {
    users: 'Users Served',
    components: 'Design Components',
    delivery: 'Delivery Time',
    rebuild: 'Framework Rebuild'
  };
  return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
};
