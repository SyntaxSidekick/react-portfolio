import React from "react";
import { TechBadge } from "../../common";

const CodePenSection = ({ codepenProjects, show }) => {
  if (!show) return null;

  return (
    <section className="portfolio-codepen-section" aria-labelledby="codepen-heading">
      <header className="section-header">
        <h2 id="codepen-heading">CodePen Experiments</h2>
        <p>Creative micro-interactions, animations, and UI components exploring the boundaries of CSS, JavaScript, and accessibility.</p>
      </header>
      <div className="section-content">
        <div className="codepen-grid">
          {codepenProjects.map((pen, index) => (
            <article key={`codepen-${index}-${pen.title.replace(/\s+/g, '-').toLowerCase()}`} className="codepen-card">
              <div className="codepen-embed">
                {import.meta.env.VITE_DISABLE_CODEPEN_IFRAMES === 'true' ? (
                  <div className="codepen-embed-fallback">
                    <p>{pen.previewVideo ? 'Embed disabled (showing preview only).' : 'Embeds disabled due to strict CSP.'}</p>
                    <a 
                      href={pen.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      title={`Open ${pen.title} on CodePen`}
                    >
                      Open on CodePen
                    </a>
                  </div>
                ) : (
                  <iframe
                    height="400"
                    style={{ width: '100%' }}
                    scrolling="no"
                    title={pen.title}
                    src={`${pen.embedUrl}${pen.embedUrl.includes('?') ? '&' : '?'}editable=false&default-tab=result`}
                    frameBorder="0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="clipboard-write; fullscreen"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                )}
              </div>
              <div className="codepen-content">
                <h3>{pen.title}</h3>
                <p>{pen.description}</p>
                <div className="codepen-tags">
                  {pen.tags.map((tag, idx) => (
                    <TechBadge key={`codepen-${index}-tag-${idx}`} name={tag} type="tag" />
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
