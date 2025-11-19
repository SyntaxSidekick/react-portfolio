import React, { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/images/riad-kilani-profile.jpg";
import { PageHeader } from "../";

const Bio = () => {
  const [years, setYears] = useState(0);
  const bioContentRef = useRef(null);
  const processRefs = useRef([]);
  const skillsRefs = useRef([]);

  // Years of service calculation
  useEffect(() => {
    const startYear = 2009;
    setYears(new Date().getFullYear() - startYear);
  }, []);

  // Fade-in/intersection animations
  useEffect(() => {
    const elements = [
      bioContentRef.current,
      ...processRefs.current,
      ...skillsRefs.current,
    ].filter(Boolean);
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });
    if ("IntersectionObserver" in window) {
      const observer = new window.IntersectionObserver(
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
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    } else {
      // Fallback
      elements.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 300 + i * 150);
      });
    }
  }, []);

    return (
    <section className="bio-section container" aria-labelledby="bio-title" role="region" aria-label="About Riad Kilani">
      <PageHeader 
        title="About Riad Kilani" 
        subtitle="Senior Front-End Developer | React & UI/UX Expert" 
      />
      <div className="bio-content" ref={bioContentRef} role="group" aria-label="Bio content">
        <div className="bio-about">
          <div className="bio-image">
            <img src={profileImg} alt="Riad Kilani Portrait" />
          </div>
          <div className="text-wrap">
            <p>
              With <span>{years}</span>+ years of front-end experience, I focus on building modern, accessible, and high-performance interfaces that scale. I'm passionate about turning complex ideas into intuitive, user-centered digital experiences powered by strong design systems and reliable engineering practices.
            </p>
            <p>
              I've partnered with startups, agencies, and global brands to deliver interfaces that balance craftsmanship with performance. My toolkit includes React, modern CSS, Sass, Figma, and deep expertise across HTML, CSS, and JavaScript—supported by a strong understanding of usability, accessibility, and interaction design.
            </p>
          </div>
        </div>
        <h3>My Front-End Process</h3>
        <ol className="bio-process" aria-label="Front-End Process Steps">
          {[
            "Discovery & Planning: Understand project goals, target audience, and requirements.",
            "Wireframing & Design: Create wireframes and UI designs using tools like Figma.",
            "Development: Build responsive layouts with HTML, CSS (Sass), and JavaScript frameworks (React).",
            "Testing & Accessibility: Ensure cross-browser compatibility and WCAG accessibility standards.",
            "Optimization: Optimize performance, assets, and code for fast load times.",
            "Deployment & Maintenance: Launch the site and provide ongoing support and improvements.",
          ].map((text, i) => (
            <li key={i} ref={(el) => (processRefs.current[i] = el)}>
              {text.includes(":") ? (
                <>
                  <strong>{text.split(":")[0]}:</strong> {text.split(":")[1]}
                </>
              ) : (
                text
              )}
            </li>
          ))}
        </ol>
        </div>
        <div className="section-header" role="presentation">
          <h3>My Skills</h3>
          <p>I’ve developed a very particular set of front-end skills, skills I’ve acquired over a long career, skills that make me a nightmare for bad code.</p>
        </div>
        <div className="bio-skills-wrapper" role="group" aria-label="Skills">
          
          {/* Grouped skills by category */}
          <div className="skills-group">
            <h4>Languages:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-html5", label: "HTML5" },
                { icon: "fab fa-css3-alt", label: "CSS3/SCSS" },
                { icon: "fab fa-js", label: "JavaScript (ES6+)" },
                { icon: "fab fa-php", label: "PHP" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group">
            <h4>Frameworks/Libraries:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-react", label: "React/Redux" },
                { icon: "fab fa-vuejs", label: "Vue.js" },
                { icon: "fab fa-angular", label: "AngularJS" },
                { icon: "fab fa-js jquery-icon", label: "jQuery" },
                { icon: "fab fa-bootstrap", label: "Bootstrap" },
                { icon: "fab fa-node-js", label: "Node.js" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[10 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group">
            <h4>Tools/Platforms:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-git-alt", label: "Git" },
                { icon: "fab fa-gulp", label: "Gulp" },
                { icon: "fab fa-aws", label: "AWS" },
                { icon: "fab fa-microsoft", label: "Azure" },
                { icon: "fas fa-cube", label: "Webpack" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[20 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group">
            <h4>CMS:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-wordpress", label: "WordPress" },
                { icon: "fab fa-drupal", label: "Drupal" },
                { icon: "fab fa-magento", label: "Magento" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[30 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group">
            <h4>UX/UI &amp; Design:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-figma", label: "Figma" },
                { icon: "fas fa-pencil-ruler", label: "Illustrator" },
                { icon: "fas fa-image", label: "Photoshop" },
                { icon: "fas fa-cloud", label: "Adobe CC" },
                { icon: "fas fa-mobile-alt", label: "Responsive Design" },
                { icon: "fas fa-th", label: "CSS Grid/Flexbox" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[40 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group">
            <h4>Analytics/SEO:</h4>
            <ul className="bio-skills">
              {[
                { icon: "fab fa-google", label: "Google Analytics" },
                { icon: "fab fa-google", label: "GTM" },
                { icon: "fab fa-hotjar", label: "Hotjar" },
                { icon: "fas fa-vial", label: "A/B Testing" },
                { icon: "fas fa-search", label: "SEO" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[50 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bio-connect">
          <h3>Let's Connect</h3>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/riadkilani"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/f1ss1on"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
            >
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
            <a 
              href="https://codepen.io/f1ss1on" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link codepen"
            >
              <i className="fab fa-codepen"></i>
              <span>CodePen</span>
            </a>
            <a 
              href="https://x.com/f1ss1on" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link twitter"
            >
              <i className="fab fa-x-twitter"></i>
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>
      
    </section>
  );
};

export default Bio;
