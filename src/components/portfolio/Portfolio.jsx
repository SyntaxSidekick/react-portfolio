import React, { useState, useEffect, useRef } from "react";
import { PageHeader } from "../";
import DynamicTitle from "../../DynamicTitle";
import { projects, designShowcase, githubProjects, codepenProjects, caseStudies } from "./projects";
import PortfolioModal from "./PortfolioModal";
import { Modal } from "../common";
import {
  FilterTabs,
  FrontEndProjectsSection,
  DesignShowcaseSection,
  GitHubProjectsSection,
  CodePenSection,
  CaseStudiesSection,
  CTASection,
} from "./sections";

// Filter categories
const FILTERS = [
  { key: "all", label: "All", icon: "fas fa-th" },
  { key: "frontend", label: "Front-End Projects", icon: "fas fa-code" },
  { key: "design", label: "UI/UX & Design", icon: "fas fa-paint-brush" },
  { key: "case-studies", label: "Case Studies", icon: "fas fa-book-open" },
  { key: "github", label: "GitHub", icon: "fab fa-github" },
  { key: "codepen", label: "CodePen", icon: "fab fa-codepen" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [designModalOpen, setDesignModalOpen] = useState(false);
  const projectRefs = useRef([]);

  // Open project modal
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  // Close project modal
  const closeProjectModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  // Open design modal
  const openDesignModal = (design) => {
    setSelectedDesign(design);
    setDesignModalOpen(true);
  };

  // Close design modal
  const closeDesignModal = () => {
    setDesignModalOpen(false);
    setSelectedDesign(null);
  };
  
  // Handle case study click
  const handleCaseStudyClick = (study) => {
    openProjectModal({
      title: study.title,
      img: study.thumbnail,
      desc: study.summary,
      fullDesc: study.summary,
      problem: study.challenge.content,
      role: study.role.position,
      year: study.year,
      tech: study.tech,
      approach: study.approach,
      results: study.results,
      conclusion: study.conclusion,
      deliverables: study.results.map(r => `${r.title}\n${r.description}`).join('\n\n')
    });
  };

  // Intersection observer for scroll animations
  useEffect(() => {
    const elements = projectRefs.current.filter(Boolean);
    
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "50px" }
      );
      
      elements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        observer.observe(el);
      });
      
      return () => observer.disconnect();
    }
  }, []);

  return (
    <main className="portfolio-page container" id="main-content" aria-labelledby="page-title">
      <DynamicTitle />
      <PageHeader 
        title="Selected Work" 
        subtitle="A curated collection of front-end engineering, UI/UX design, and code experiments."
      />

      <FilterTabs 
        filters={FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <FrontEndProjectsSection
        projects={projects}
        projectRefs={projectRefs}
        onProjectClick={openProjectModal}
        show={activeFilter === "all" || activeFilter === "frontend"}
      />

      <DesignShowcaseSection
        designShowcase={designShowcase}
        onDesignClick={openDesignModal}
        show={activeFilter === "all" || activeFilter === "design"}
      />

      <GitHubProjectsSection
        githubProjects={githubProjects}
        show={activeFilter === "all" || activeFilter === "github"}
      />

      <CodePenSection
        codepenProjects={codepenProjects}
        show={activeFilter === "all" || activeFilter === "codepen"}
      />

      <CaseStudiesSection
        caseStudies={caseStudies}
        onCaseStudyClick={handleCaseStudyClick}
        show={activeFilter === "all" || activeFilter === "case-studies"}
      />

      <CTASection />
      
      <PortfolioModal 
        modalOpen={modalOpen}
        modalProject={selectedProject}
        closeModal={closeProjectModal}
      />

      <Modal
        isOpen={designModalOpen}
        onClose={closeDesignModal}
        size="xl"
        className="design-modal-overlay"
      >
        {selectedDesign && (
          <div className="design-modal-content">
            <div className="design-modal-image">
              <img 
                src={selectedDesign.image} 
                alt={selectedDesign.title}
              />
            </div>
            
            <div className="design-modal-info">
              <span className="design-category-badge">{selectedDesign.category}</span>
              <h2>{selectedDesign.title}</h2>
              <p className="design-description">{selectedDesign.description}</p>
              
              {selectedDesign.breakdown && (
                <div className="ux-breakdown">
                  <h3>UX Breakdown</h3>
                  <div className="breakdown-content">
                    {selectedDesign.breakdown}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
      
    </main>
  );
};

export default Portfolio;
