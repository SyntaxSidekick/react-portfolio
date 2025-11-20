import React from "react";

const ProfessionalOverview = ({ profileImg, years }) => {
  return (
    <section className="bio-about" aria-label="Professional Overview">
      <div className="bio-about-card">
        <span className="section-badge">Professional Overview</span>
        <div className="bio-about-content">
          <div className="bio-image">
            <img 
              src={profileImg} 
              alt="Portrait of Riad Kilani, Senior Front-End Engineer specializing in React and accessible UI development" 
              width="180" 
              height="180"
              loading="eager"
            />
          </div>
          <div className="text-wrap">
            <p>
              With {years}+ years in front-end engineering, I build modern, accessible, high-performance interfaces that scale. I specialize in turning complex requirements into intuitive, user-centered experiences informed by strong design systems and engineering discipline.
            </p>
            <p>
              I've worked with startups and global brands to ship interfaces that balance usability, performance, and maintainability. My expertise spans React, modern CSS, Sass, Figma, and core web technologies—with a deep focus on accessibility and interaction design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalOverview;
