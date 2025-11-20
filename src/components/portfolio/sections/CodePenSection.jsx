import React from "react";
import { TechBadge } from "../../common";

const CodePenSection = ({ codepenProjects, show }) => {
  if (!show) return null;

  return (
    <section className="portfolio-codepen-section" aria-labelledby="codepen-heading">
      <header>
        <h2 id="codepen-heading">CodePen Experiments</h2>
        <p>Creative micro-interactions, animations, and UI components exploring the boundaries of CSS, JavaScript, and accessibility.</p>
      </header>
      <div className="section-content">
        <div className="codepen-grid">
          {codepenProjects.map((pen) => (
            <article key={pen.id} className="codepen-card">
              <div className="codepen-embed">
                <iframe
                  height="400"
                  style={{ width: '100%' }}
                  scrolling="no"
                  title={pen.title}
                  src={pen.embedUrl}
                  frameBorder="no"
                  loading="lazy"
                  allowFullScreen={true}
                >
                </iframe>
              </div>
              <div className="codepen-content">
                <h3>{pen.title}</h3>
                <p>{pen.description}</p>
                <div className="codepen-tags">
                  {pen.tags.map((tag, idx) => (
                    <TechBadge key={idx} name={tag} type="tag" />
                  ))}
                </div>
                <a 
                  href={pen.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  title={`View ${pen.title} on CodePen`}
                >
                  View on CodePen
                  <i className="fab fa-codepen" aria-hidden="true"></i>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodePenSection;
