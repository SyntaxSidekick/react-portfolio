import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionHeader, CTAButton } from "../../common";
import TechIcon from "../../TechIcon";
import { expertiseCards, technologies } from "./aboutData";

const AboutMe = ({ years }) => {
  const prefersReducedMotion = useReducedMotion();
  const [openExpertiseId, setOpenExpertiseId] = useState(expertiseCards[0]?.id ?? null);
  const [selectedTech, setSelectedTech] = useState('javascript'); // Permanently selected (default: javascript)
  const [previewedTech, setPreviewedTech] = useState(null); // Temporarily previewed on hover/focus
  const [arrowPosition, setArrowPosition] = useState(50); // Position of upward arrow in percentage
  const [isMobileLayout, setIsMobileLayout] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const techSectionRef = useRef(null);
  const techButtonRefs = useRef({});
  const techGridRef = useRef(null);

  // The displayed technology is previewed OR selected
  const displayedTechId = previewedTech ?? selectedTech;
  const displayedTech = technologies.find((tech) => tech.id === displayedTechId);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (event) => {
      setIsMobileLayout(event.matches);
      if (event.matches) {
        setPreviewedTech(null);
      }
    };

    setIsMobileLayout(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Calculate arrow position based on active button
  useEffect(() => {
    if (isMobileLayout) {
      return;
    }

    const activeButton = techButtonRefs.current[displayedTechId];
    const grid = techGridRef.current;
    
    if (activeButton && grid) {
      const buttonRect = activeButton.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      const buttonCenter = buttonRect.left + buttonRect.width / 2;
      const gridLeft = gridRect.left;
      const gridWidth = gridRect.width;
      const position = ((buttonCenter - gridLeft) / gridWidth) * 100;
      setArrowPosition(position);
    }
  }, [displayedTechId, isMobileLayout]);

  // Handle Escape key to return to selected technology
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && techSectionRef.current?.contains(document.activeElement)) {
        setPreviewedTech(null); // Clear preview, return to selected
        // Return focus to the selected technology button
        techButtonRefs.current[selectedTech]?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedTech]);

  // Handle technology card click (permanent selection)
  const scrollTechIntoView = (techId) => {
    if (!isMobileLayout) {
      return;
    }

    const rail = techGridRef.current;
    const button = techButtonRefs.current[techId];

    if (!rail || !button) {
      return;
    }

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    const targetScrollLeft = Math.min(button.offsetLeft, maxScrollLeft);

    rail.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handleTechClick = (techId) => {
    setSelectedTech(techId);
    setPreviewedTech(null); // Clear preview when clicking

    scrollTechIntoView(techId);
  };

  useEffect(() => {
    scrollTechIntoView(selectedTech);
  }, [selectedTech, isMobileLayout]);

  const focusTechByIndex = (index) => {
    const tech = technologies[index];

    if (!tech) {
      return;
    }

    handleTechClick(tech.id);
    techButtonRefs.current[tech.id]?.focus();
  };

  // Handle keyboard activation (Enter/Space)
  const handleTechKeyDown = (e, techId) => {
    const currentIndex = technologies.findIndex((tech) => tech.id === techId);

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTechClick(techId);
      return;
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusTechByIndex((currentIndex + 1) % technologies.length);
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusTechByIndex((currentIndex - 1 + technologies.length) % technologies.length);
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      focusTechByIndex(0);
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      focusTechByIndex(technologies.length - 1);
    }
  };

  // Handle mouse hover (preview)
  const handleTechHover = (techId) => {
    if (isMobileLayout) {
      return;
    }

    setPreviewedTech(techId);
  };

  // Handle focus (preview)
  const handleTechFocus = (techId) => {
    if (isMobileLayout) {
      return;
    }

    setPreviewedTech(techId);
  };

  // Handle mouse leave from entire technology section
  const handleSectionMouseLeave = () => {
    if (isMobileLayout) {
      return;
    }

    setPreviewedTech(null); // Return to selected technology
  };

  const handleExpertiseToggle = (cardId) => {
    setOpenExpertiseId((currentId) => (currentId === cardId ? null : cardId));
  };

  const handleExpertiseKeyDown = (event, cardId) => {
    if (event.key === "Escape" && openExpertiseId === cardId) {
      setOpenExpertiseId(null);
      event.currentTarget.blur();
    }
  };

  return (
    <section className="about-me" id="about" aria-labelledby="about-title">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="ABOUT ME"
          title="Crafting Digital Experiences"
          id="about-title"
        />

        {/* Intro Statement */}
        <motion.p
          className="about-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          With over <span className="highlight">{years}+ years</span> of
          experience, I help organizations build scalable, accessible, and
          high-performance digital products by combining front-end engineering,
          UX, accessibility, performance, and design systems.
        </motion.p>

        {/* Expertise Cards */}
        <div className="expertise-grid" role="list" aria-label="Areas of expertise">
          {expertiseCards.map((card, index) => (
            <motion.article
              key={card.id}
              className="expertise-card"
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="card-icon">
                <i className={card.icon} aria-hidden="true"></i>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <hr className="card-divider" aria-hidden="true" />
              <div className="card-metric">{card.metric}</div>
              <div className="card-metric-label">{card.metricLabel}</div>
            </motion.article>
          ))}
        </div>

        <div className="expertise-accordion" aria-label="Areas of expertise">
          {expertiseCards.map((card) => {
            const isOpen = openExpertiseId === card.id;

            return (
              <div key={card.id} className={`expertise-accordion-item ${isOpen ? "is-open" : ""}`}>
                <h3 className="expertise-accordion-heading">
                  <button
                    type="button"
                    className="expertise-accordion-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`expertise-panel-${card.id}`}
                    id={`expertise-trigger-${card.id}`}
                    onClick={() => handleExpertiseToggle(card.id)}
                    onKeyDown={(event) => handleExpertiseKeyDown(event, card.id)}
                  >
                    <span className="expertise-accordion-icon" aria-hidden="true">
                      <i className={card.icon}></i>
                    </span>
                    <span className="expertise-accordion-title">{card.title}</span>
                    <span className="expertise-accordion-metric">{card.metric}</span>
                    <span className="expertise-accordion-chevron" aria-hidden="true">
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key={card.id}
                      id={`expertise-panel-${card.id}`}
                      className="expertise-accordion-panel"
                      role="region"
                      aria-labelledby={`expertise-trigger-${card.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
                    >
                      <div className="expertise-accordion-panel-inner">
                        <p className="expertise-accordion-description">{card.description}</p>
                        <hr className="expertise-accordion-divider" aria-hidden="true" />
                        <div className="expertise-accordion-metric-detail">{card.metric}</div>
                        <div className="expertise-accordion-metric-label">{card.metricLabel}</div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Technology Section */}
        <motion.div
          ref={techSectionRef}
          className="technology-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          onMouseLeave={handleSectionMouseLeave}
        >
          <fieldset className="technology-panel">
            <legend className="technology-legend">
              TECHNOLOGIES I WORK WITH
            </legend>

            {/* Technology Buttons */}
            <div ref={techGridRef} className="technology-grid" role="group" aria-label="Technologies">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  ref={(el) => (techButtonRefs.current[tech.id] = el)}
                  type="button"
                  className={`tech-button ${
                    displayedTechId === tech.id ? "active" : ""
                  }`}
                  onClick={() => handleTechClick(tech.id)}
                  onKeyDown={(e) => handleTechKeyDown(e, tech.id)}
                  onMouseEnter={() => handleTechHover(tech.id)}
                  onFocus={() => handleTechFocus(tech.id)}
                  aria-selected={displayedTechId === tech.id}
                  aria-expanded={displayedTechId === tech.id}
                  aria-controls="tech-detail-panel"
                  aria-label={tech.name}
                >
                  <TechIcon name={tech.techName} size={isMobileLayout ? 36 : 48} decorative />
                  <span className="tech-name">{tech.name}</span>
                </button>
              ))}
            </div>

            {/* Technology Detail Panel - Always visible, content changes */}
            <AnimatePresence mode="wait">
              {displayedTech && (
                <motion.div
                  key={displayedTech.id}
                  id="tech-detail-panel"
                  className="tech-detail-panel"
                  role="region"
                  aria-live="polite"
                  aria-label={`${displayedTech.name} details`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
                >
                  {/* Upward Arrow Indicator */}
                  <div 
                    className="tech-panel-arrow" 
                    style={{ left: `${arrowPosition}%` }}
                    aria-hidden="true"
                  />
                  
                  <div className="tech-detail-content">
                    {/* Column 1: Technology Icon */}
                    <div className="tech-detail-icon">
                      <TechIcon name={displayedTech.techName} size={isMobileLayout ? 56 : 72} decorative />
                    </div>

                    {/* Column 2: Summary */}
                    <div className="tech-detail-summary">
                      <div className="tech-detail-header">
                        <h3 className="tech-detail-name">{displayedTech.name}</h3>
                        <span className="tech-detail-level">{displayedTech.level}</span>
                      </div>
                      <p className="tech-detail-description">
                        {displayedTech.description}
                      </p>
                      <p className="tech-detail-experience">
                        <i className="fas fa-star" aria-hidden="true"></i>
                        {displayedTech.experience}
                      </p>
                    </div>

                    {/* Column 3: What I Use */}
                    <div className="tech-detail-column">
                      <h4 className="tech-detail-heading">WHAT I USE</h4>
                      <ul className="tech-detail-list">
                        {displayedTech.uses.map((item, index) => (
                          <li key={index}>
                            <i className="fas fa-check-circle" aria-hidden="true"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 4: Recent Projects */}
                    <div className="tech-detail-column">
                      <h4 className="tech-detail-heading">RECENT PROJECTS</h4>
                      <ul className="tech-detail-list">
                        {displayedTech.projects.map((project, index) => (
                          <li key={index}>
                            <i className="fas fa-circle" aria-hidden="true"></i>
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </fieldset>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="about-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <CTAButton
            href="/bio"
            icon="fas fa-user-circle"
            title="Learn More About Me"
            subtitle="View my full bio, process, and complete skillset"
            ariaLabel="View my full bio, process, and complete skillset"
            variant="bio"
            trailingIcon="fas fa-arrow-right"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
