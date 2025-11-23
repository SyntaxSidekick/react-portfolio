import { TechBadge } from "../../common";

const CaseStudiesSection = ({ caseStudies, onCaseStudyClick, show }) => {
  if (!show) return null;

  return (
    <section className="portfolio-case-studies-section" id="case-studies-panel" role="tabpanel" aria-labelledby="case-studies-heading">
      <header className="section-header">
        <h2 id="case-studies-heading">Case Studies</h2>
        <p>In-depth explorations of complex projects showcasing problem-solving, process, and measurable impact.</p>
      </header>
      <div className="section-content">
        <div className="case-studies-grid">
          {caseStudies.map((study, i) => (
            <article 
              key={study.id || `${study.title || 'case-study'}-${i}`} 
              className="case-study-card card-interactive"
              onClick={() => onCaseStudyClick(study)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCaseStudyClick(study);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${study.title} case study details`}
            >
              <div className="case-study-image">
                <img 
                  src={study.thumbnail} 
                  alt={study.title}
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <span className="case-study-category">{study.category}</span>
              </div>
              <div className="case-study-content">
                <div className="case-study-meta">
                  <span className="year">{study.year}</span>
                  <span className="duration">{study.duration}</span>
                </div>
                <h3>{study.title}</h3>
                <p className="subtitle">{study.subtitle}</p>
                <p className="summary">{study.summary}</p>
                <div className="case-study-tags">
                  {study.tags.map((tag, idx) => (
                    <TechBadge key={`${study.id}-tag-${idx}`} name={tag} type="tag" />
                  ))}
                </div>
                <button 
                  className="btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCaseStudyClick(study);
                  }}
                  aria-label={`Read ${study.title} case study`}
                >
                  Read Case Study
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
