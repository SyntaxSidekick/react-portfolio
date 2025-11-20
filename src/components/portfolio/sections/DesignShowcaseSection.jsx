import React from "react";

const DesignShowcaseSection = ({ designShowcase, onDesignClick, show }) => {
  if (!show) return null;

  return (
    <section className="portfolio-design-section" aria-labelledby="design-heading">
      <header>
        <h2 id="design-heading">UI/UX & Design</h2>
        <p>Design systems, mobile interfaces, and high-fidelity prototypes demonstrating user-centered thinking and visual craft.</p>
      </header>
      <div className="section-content">
        <div className="design-grid">
          {designShowcase.map((item) => (
            <article key={item.id} className="design-card">
              <div 
                className="design-image" 
                onClick={() => onDesignClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  loading="lazy"
                />
                <span className="design-category">{item.category}</span>
              </div>
              <div className="design-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button 
                  className="btn-link"
                  onClick={() => onDesignClick(item)}
                >
                  View UX Breakdown
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

export default DesignShowcaseSection;
