import React from "react";
import { motion } from "framer-motion";
import { SectionHeader, CTAButton, ProjectCard } from "../../common";

const FeaturedWorkSection = ({ projects, onProjectClick }) => {
  return (
    <section className="featured-work" id="featured-work" aria-labelledby="portfolio-title">
      <div className="container">
        <SectionHeader 
          badge="Portfolio"
          title="Featured Work"
          subtitle="Discover my most impactful projects showcasing modern web development, design excellence, and user-centered solutions."
          id="portfolio-title"
        />
        
        <motion.div 
          className="featured-work-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {projects.slice(0, 2).map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              onClick={onProjectClick}
              variant="featured"
            />
          ))}
        </motion.div>
        
        <div className="featured-work-cta">
          <CTAButton 
            href="/portfolio"
            icon="fas fa-briefcase"
            title="View Full Portfolio"
            subtitle="Explore all projects and case studies"
            ariaLabel="View my complete portfolio and project case studies"
            variant="portfolio"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;
