import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TechBadge } from "./";
import { parseProjectTitle, getMetricLabel } from "../../utils/homeUtils";

const ProjectCard = ({ 
  project, 
  index = 0, 
  onClick, 
  variant = "default", // "default" or "featured"
  className = ""
}) => {
  const { mainTitle, type } = parseProjectTitle(project.title);
  const isFeatured = variant === "featured" || project.featured;
  const techContainerRef = useRef(null);
  const [visibleTechCount, setVisibleTechCount] = useState(4);

  // Calculate how many tech badges can fit on one line
  useEffect(() => {
    if (!project.tech || variant === "featured") return;

    const calculateVisibleBadges = () => {
      // Start with conservative estimate based on common badge widths
      // Design Systems, Material-UI are ~120-140px, shorter ones ~80-100px
      const containerWidth = techContainerRef.current?.offsetWidth || 280;
      const moreButtonWidth = 60; // "+N" badge width
      const gap = 8; // gap between badges
      
      // Average badge widths (approximation)
      const badgeWidths = {
        'Design Systems': 140,
        'Material-UI': 120,
        'JavaScript': 105,
        'Photoshop': 110,
        'Illustrator': 105,
        'TypeScript': 110,
        'Bootstrap': 100,
        'Vue.js': 75,
        'React': 75,
        'HTML5': 80,
        'CSS3': 75,
        'Sass': 70,
        'PHP': 65,
        'Git': 60,
        'XD': 55,
      };

      let totalWidth = 0;
      let count = 0;
      const availableWidth = containerWidth - moreButtonWidth - gap;

      for (let i = 0; i < project.tech.length && i < 5; i++) {
        const techName = project.tech[i].name;
        const estimatedWidth = badgeWidths[techName] || 90; // default estimate
        
        if (totalWidth + estimatedWidth + (count > 0 ? gap : 0) <= availableWidth) {
          totalWidth += estimatedWidth + (count > 0 ? gap : 0);
          count++;
        } else {
          break;
        }
      }

      // Ensure at least 3 badges are shown if possible
      setVisibleTechCount(Math.max(3, Math.min(count, 4)));
    };

    calculateVisibleBadges();
    window.addEventListener('resize', calculateVisibleBadges);
    return () => window.removeEventListener('resize', calculateVisibleBadges);
  }, [project.tech, variant]);

  const handleClick = () => {
    if (onClick) onClick(project);
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(project);
    }
  };

  // Common card props
  const cardProps = {
    className: `card card-interactive project-card ${className}`,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    tabIndex: 0,
    role: "button",
    "aria-label": `View details for ${project.title}`
  };

  // Featured variant (for home page)
  if (variant === "featured") {
    return (
      <motion.article
        {...cardProps}
        style={{ '--card-delay': `${index * 0.15}s` }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      >
        <div className="project-card-image">
          <img 
            src={project.img} 
            alt={project.title} 
            loading="lazy" 
            width="600" 
            height="220" 
          />
          <span className="project-featured-badge">⭐ FEATURED</span>
          <div className="project-card-overlay">
            <span className="view-project-text">View Details →</span>
          </div>
        </div>

        <div className="card-body project-card-content">
          <h3 className="card-title project-title">
            {mainTitle}
            {type && (
              <>
                {' - '}
                <span className="project-type">{type}</span>
              </>
            )}
          </h3>
          
          {project.role && (
            <p className="card-subtitle project-role-year">
              {project.role} • {project.year}
            </p>
          )}
          
          <p className="card-text project-excerpt">{project.desc}</p>
          
          {project.metrics && (
            <div className="project-metrics">
              {Object.entries(project.metrics).map(([key, value], idx) => (
                <div key={idx} className="metric-item">
                  <div className="metric-value">{value}</div>
                  <div className="metric-label">{getMetricLabel(key)}</div>
                </div>
              ))}
            </div>
          )}

          {project.tech && project.tech.length > 0 && (
            <div className="project-tech-stack">
              {project.tech.slice(0, 3).map((tech, techIndex) => (
                <TechBadge 
                  key={techIndex}
                  name={tech.name}
                  icon={tech.icon}
                  type="tech"
                />
              ))}
              {project.tech.length > 3 && (
                <span className="badge tech-badge tech-badge-more">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.article>
    );
  }

  // Default variant (for portfolio page)
  return (
    <article {...cardProps}>
      <div className="project-image">
        <img 
          src={project.img} 
          alt=""
          loading="lazy"
          width="600"
          height="400"
          role="presentation"
        />
        {isFeatured && (
          <span className="project-badge" aria-label="Featured project">Featured</span>
        )}
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.desc.split('\n')[0]}</p>
        {project.tech && (
          <div className="project-tech" ref={techContainerRef} aria-label="Technologies used">
            {project.tech.slice(0, visibleTechCount).map((tech, i) => (
              <TechBadge 
                key={i}
                name={tech.name}
                icon={tech.icon}
                type="tech"
                className="tech-tag"
              />
            ))}
            {project.tech.length > visibleTechCount && (
              <span className="tech-tag more" aria-label={`${project.tech.length - visibleTechCount} more technologies`}>
                +{project.tech.length - visibleTechCount}
              </span>
            )}
          </div>
        )}
        <button 
          className="btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          aria-label={`View ${project.title} project details`}
        >
          View Project
          <i className="fas fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
