import React from "react";
import { PortfolioSection } from "../../common";

const GitHubProjectsSection = ({ githubProjects, show }) => {
  return (
    <PortfolioSection
      show={show}
      headingId="github-heading"
      title="GitHub Projects"
      description="Open source contributions, utilities, and tools showcasing clean code architecture and engineering best practices."
      className="github"
    >
      <div className="github-grid">
        {githubProjects.map((repo, index) => (
          <article key={`github-${index}-${repo.name.replace(/\s+/g, '-').toLowerCase()}`} className="github-card">
            {repo.thumbnail && (
              <div className="github-thumbnail">
                <img src={repo.thumbnail} alt={`${repo.name} preview`} loading="lazy" />
              </div>
            )}
            <div className="github-content">
              <div className="github-header">
                <i className={repo.icon} aria-hidden="true"></i>
                <h3>{repo.name}</h3>
              </div>
              <p>{repo.description}</p>
              <div className="github-tech">
                {repo.topics.map((topic, idx) => (
                  <span key={`github-${index}-topic-${idx}`} className="tech-pill">{topic}</span>
                ))}
              </div>
              <div className="github-actions">
                {repo.liveUrl && (
                  <a 
                    href={repo.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary"
                    title={`View ${repo.name} live demo`}
                  >
                    Live Demo
                    <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                  </a>
                )}
                <a 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  title={`View ${repo.name} on GitHub`}
                >
                  View Code
                  <i className="fab fa-github" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PortfolioSection>
  );
};

export default GitHubProjectsSection;
