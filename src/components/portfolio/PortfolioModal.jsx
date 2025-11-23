import React, { useEffect, useRef } from "react";
import { Modal, Backdrop, Fade } from "@mui/material";
import TechIcon from "../TechIcon";

const PortfolioModal = ({ modalOpen, modalProject, closeModal }) => {
  const lastActiveElement = useRef(null);

  // Focus trap and keyboard navigation
  useEffect(() => {
    if (modalOpen) {
      lastActiveElement.current = document.activeElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        const closeButton = document.querySelector('.portfolio-modal .modal-close-btn');
        if (closeButton) closeButton.focus();
      }, 100);

      const handleKeyDown = (e) => {
        if (e.key === "Escape") closeModal();
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = '';
        if (lastActiveElement.current) lastActiveElement.current.focus();
      };
    }
  }, [modalOpen, closeModal]);

  if (!modalProject) return null;

  return (
    <Modal
      open={modalOpen}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="portfolio-modal-title"
      aria-modal="true"
      className="portfolio-modal"
    >
      <Fade in={modalOpen}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="modal-wrapper">
          
          {/* Close Button */}
          <button 
            className="modal-close-btn"
            onClick={closeModal}
            aria-label="Close project details"
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Hero Image */}
          <div className="modal-hero">
            <img
              src={modalProject.img}
              alt={modalProject.title}
              className="hero-image"
              width="1200"
              height="675"
            />
          </div>

          {/* Content Container */}
          <div className="modal-content-wrapper">
            
            {/* Header Section */}
            <div className="modal-header-section">
              <div className="title-group">
                <h1 className="project-title">{modalProject.title}</h1>
                <div className="project-meta">
                  {modalProject.role && (
                    <span className="meta-item">
                      <i className="fas fa-user-tie"></i>
                      {modalProject.role}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {(modalProject.liveUrl || modalProject.githubUrl) && (
                <div className="action-buttons">
                  {modalProject.liveUrl && (
                    <a 
                      href={modalProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-action btn-primary"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      Live Demo
                    </a>
                  )}
                  {modalProject.githubUrl && (
                    <a 
                      href={modalProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-action btn-secondary"
                    >
                      <i className="fab fa-github"></i>
                      View Code
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Two Column Layout */}
            <div className="modal-grid">
              
              {/* Main Content Column */}
              <div className="main-column">
                
                {/* Overview Card */}
                <div className="content-card">
                  <h2 className="card-title">
                    <i className="fas fa-info-circle"></i>
                    Overview
                  </h2>
                  <div className="card-content">
                    {modalProject.desc && modalProject.desc.split('\n\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Problem Statement Card */}
                {modalProject.problem && (
                  <div className="content-card">
                    <h2 className="card-title">
                      <i className="fas fa-lightbulb"></i>
                      The Challenge
                    </h2>
                    <div className="card-content" dangerouslySetInnerHTML={{ __html: modalProject.problem }} />
                  </div>
                )}

                {/* Key Challenges Card */}
                {modalProject.challenges && (
                  <div className="content-card">
                    <h2 className="card-title">
                      <i className="fas fa-tasks"></i>
                      Key Challenges
                    </h2>
                    <div className="card-content">
                      <ul className="challenge-list">
                        {(Array.isArray(modalProject.challenges) 
                          ? modalProject.challenges 
                          : modalProject.challenges.split('\n\n')
                        ).map((challenge, idx) => (
                          <li key={idx}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* What I Learned Card */}
                {modalProject.learnings && (
                  <div className="content-card">
                    <h2 className="card-title">
                      <i className="fas fa-graduation-cap"></i>
                      What I Learned
                    </h2>
                    <div className="card-content">
                      <ul className="learning-list">
                        {(Array.isArray(modalProject.learnings) 
                          ? modalProject.learnings 
                          : modalProject.learnings.split('\n\n')
                        ).map((learning, idx) => (
                          <li key={idx}>{learning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Outcome Card */}
                {modalProject.deliverables && (
                  <div className="content-card">
                    <h2 className="card-title">
                      <i className="fas fa-trophy"></i>
                      Outcome & Impact
                    </h2>
                    <div className="card-content" dangerouslySetInnerHTML={{ __html: modalProject.deliverables }} />
                  </div>
                )}

              </div>

              {/* Sidebar Column */}
              <div className="sidebar-column">
                
                {/* Tech Stack Card */}
                {modalProject.tech && modalProject.tech.length > 0 && (
                  <div className="content-card sticky-card">
                    <h2 className="card-title">
                      <i className="fas fa-code"></i>
                      Tech Stack
                    </h2>
                    <div className="card-content">
                      <div className="tech-stack-grid">
                        {modalProject.tech.map((tech, idx) => (
                          <div key={idx} className="tech-item">
                            <TechIcon name={tech.name} icon={tech.icon} />
                            <span>{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Metrics Card */}
                {modalProject.metrics && Object.keys(modalProject.metrics).length > 0 && (
                  <div className="content-card">
                    <h2 className="card-title">
                      <i className="fas fa-chart-line"></i>
                      Key Metrics
                    </h2>
                    <div className="card-content">
                      <div className="metrics-list">
                        {Object.entries(modalProject.metrics).map(([key, value]) => (
                          <div key={key} className="metric-item">
                            <span className="metric-value">{value}</span>
                            <span className="metric-label">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Media Gallery (Full Width) */}
            {(modalProject.secimg || modalProject.addimg || modalProject.videos) && (
              <div className="content-card media-card">
                <h2 className="card-title">
                  <i className="fas fa-images"></i>
                  Project Gallery
                </h2>
                <div className="card-content">
                  <div className="media-gallery">
                    
                    {/* Videos */}
                    {modalProject.videos && modalProject.videos.length > 0 && (
                      modalProject.videos.map((video, idx) => (
                        <div key={`video-${idx}`} className="media-item">
                          <video 
                            controls 
                            preload="metadata"
                            aria-label={`${modalProject.title} - Demo video ${idx + 1}`}
                          >
                            <source src={video} type="video/mp4" />
                            <track kind="captions" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ))
                    )}

                    {/* Secondary Image */}
                    {modalProject.secimg && (
                      <div className="media-item">
                        <img src={modalProject.secimg} alt={`${modalProject.title} - Additional view`} />
                      </div>
                    )}

                    {/* Additional Images */}
                    {modalProject.addimg && typeof modalProject.addimg === "string" && (
                      modalProject.addimg.split(",").map((img, idx) => {
                        const trimmed = img.trim();
                        if (!trimmed) return null;
                        return (
                          <div key={`img-${idx}`} className="media-item">
                            <img src={trimmed} alt={`${modalProject.title} - Screenshot ${idx + 1}`} />
                          </div>
                        );
                      })
                    )}

                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
    </div>
      </Fade>
    </Modal>
  );
};

export default PortfolioModal;
