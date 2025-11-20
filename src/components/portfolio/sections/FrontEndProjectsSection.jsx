import React from "react";
import { ProjectCard } from "../../common";

const FrontEndProjectsSection = ({ projects, projectRefs, onProjectClick, show }) => {
  if (!show) return null;

  return (
    <section className="portfolio-projects-section" aria-labelledby="frontend-heading">
      <header>
        <h2 id="frontend-heading">Front-End Projects</h2>
        <p>Full-stack applications, React platforms, and enterprise-level UI engineering showcasing scalable architecture and modern development practices.</p>
      </header>
      <div className="section-content">
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={idx} ref={(el) => (projectRefs.current[idx] = el)}>
              <ProjectCard
                project={project}
                index={idx}
                onClick={onProjectClick}
                variant="default"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrontEndProjectsSection;
