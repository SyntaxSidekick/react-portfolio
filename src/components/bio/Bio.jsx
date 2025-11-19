import React, { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/images/riad-kilani-profile.jpg";
import tailwindIcon from "../../assets/images/tailwind-brands.svg";
import illustratorIcon from "../../assets/images/illustrator-brands.svg";
import photoshopIcon from "../../assets/images/photoshop-brands.svg";
import adobeCCIcon from "../../assets/images/adobe-cc-brands.svg";
import xdIcon from "../../assets/images/xd-brands.svg";
import nextjsIcon from "../../assets/images/next-js.svg";
import typescriptIcon from "../../assets/images/Typescript_logo_2020.svg";

// Process step images
import step1Image from "../../assets/images/steps/discovery-planning-step-1.png";
import step2Image from "../../assets/images/steps/wirefaming-design-step-2.png";
import step3Image from "../../assets/images/steps/development-step-3.png";
import step4Image from "../../assets/images/steps/testing-accessibility-step-4.png";
import step5Image from "../../assets/images/steps/performance-optimization-step-5.png";
import step6Image from "../../assets/images/steps/deployment-maintenance-step-6.png";
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
    <main className="bio-section container" id="main-content" aria-labelledby="page-title">
      <PageHeader 
        title="About Riad Kilani" 
        subtitle="Senior Front-End Engineer | React Specialist | UX & Interface Architecture"
      />      <section className="bio-about" aria-label="Professional Overview">
        <div className="bio-about-card">
          <span className="section-badge">Professional Overview</span>
          <div className="bio-about-content">
            <div className="bio-image">
              <img 
                src={profileImg} 
                alt="Riad Kilani, Senior Front-End Developer" 
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

      <section className="bio-process-section" ref={bioContentRef} aria-labelledby="process-heading">
        <header>
          <h2 id="process-heading">My Front-End Process</h2>
          <p>I follow a clear, structured front-end process designed to turn complex ideas into fast, accessible, and intuitive user experiences. From early discovery to long-term optimization, every stage is focused on quality, clarity, and performance.</p>
        </header>
        <div className="section-content">
          <ol className="bio-process" aria-label="Six-step front-end development process">
            {[
              { 
                image: step1Image,
                title: "Discovery & Planning",
                description: "Clarify goals, user needs, technical constraints, and success metrics to establish a strong foundation for the project."
              },
              { 
                image: step2Image,
                title: "Wireframing & Design",
                description: "Create low-fidelity flows and high-fidelity UI designs in Figma, ensuring usability, accessibility, and design-system alignment from the start."
              },
              { 
                image: step3Image,
                title: "Development",
                description: "Implement responsive, scalable interfaces using modern HTML, CSS/Sass, and React—focused on clean architecture, component reusability, and maintainability."
              },
              { 
                image: step4Image,
                title: "Testing & Accessibility",
                description: "Validate functionality across devices and browsers, and ensure full compliance with WCAG standards through structured accessibility testing."
              },
              { 
                image: step5Image,
                title: "Performance Optimization",
                description: "Refine code, assets, and rendering behavior to achieve fast load times, smooth interactions, and efficient runtime performance."
              },
              { 
                image: step6Image,
                title: "Deployment & Maintenance",
                description: "Deploy production-ready builds, monitor performance and usability, and deliver ongoing improvements to keep the experience stable and future-proof."
              },
            ].map((step, i) => (
              <li key={i} ref={(el) => (processRefs.current[i] = el)}>
                <div className="process-image">
                  <img src={step.image} alt={step.title} loading="lazy" />
                </div>
                <div className="process-content">
                  <strong>{step.title}:</strong> {step.description}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bio-skills-section" aria-labelledby="skills-heading">
        <header>
          <h2 id="skills-heading">My Skills</h2>
          <p>I've built a deep and focused set of front-end skills over my career—skills shaped by real engineering challenges, design systems work, and high-performance UI development.</p>
        </header>
        <div className="section-content">
          <div className="bio-skills-wrapper">
          
          {/* Grouped skills by category */}
          <div className="skills-group" role="region" aria-labelledby="languages-heading">
            <h3 id="languages-heading">Languages:</h3>
            <ul className="bio-skills" aria-label="Programming languages">
              {[
                { icon: "fab fa-html5", label: "HTML5" },
                { icon: "fab fa-css3-alt", label: "CSS3" },
                { icon: "fab fa-js", label: "JavaScript" },
                { icon: "svg", svg: typescriptIcon, label: "TypeScript" },
                { icon: "fab fa-php", label: "PHP" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[i] = el)}>
                  {skill.icon === "svg" ? (
                    <img src={skill.svg} alt={skill.label} className="skill-svg-icon" />
                  ) : (
                    <i className={skill.icon}></i>
                  )}
                  {" "}{skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group" role="region" aria-labelledby="frameworks-heading">
            <h3 id="frameworks-heading">Frameworks/Libraries:</h3>
            <ul className="bio-skills" aria-label="Front-end frameworks and libraries">
              {[
                { icon: "fab fa-react", label: "React/Redux" },
                { icon: "svg", svg: nextjsIcon, label: "Next.js" },
                { icon: "svg", svg: tailwindIcon, label: "Tailwind CSS" },
                { icon: "fab fa-node-js", label: "Node.js" },
                { icon: "fab fa-sass", label: "Sass/SCSS" },
                { icon: "fab fa-vuejs", label: "Vue.js" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[10 + i] = el)}>
                  {skill.icon === "svg" ? (
                    <img src={skill.svg} alt={skill.label} className="skill-svg-icon" />
                  ) : (
                    <i className={skill.icon}></i>
                  )}
                  {" "}{skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group" role="region" aria-labelledby="tools-heading">
            <h3 id="tools-heading">Tools/Platforms:</h3>
            <ul className="bio-skills" aria-label="Development tools and platforms">
              {[
                { icon: "fab fa-git-alt", label: "Git" },
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
          <div className="skills-group" role="region" aria-labelledby="design-heading">
            <h3 id="design-heading">UX/UI &amp; Design:</h3>
            <ul className="bio-skills" aria-label="UX, UI, and design tools">
              {[
                { icon: "fas fa-layer-group", label: "Design Systems" },
                { icon: "fas fa-mobile-alt", label: "Responsive Design" },
                { icon: "fab fa-figma", label: "Figma" },
                { icon: "svg", svg: xdIcon, label: "Adobe XD" },
                { icon: "svg", svg: adobeCCIcon, label: "Adobe CC" },
                { icon: "svg", svg: photoshopIcon, label: "Photoshop" },
                { icon: "svg", svg: illustratorIcon, label: "Illustrator" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[30 + i] = el)}>
                  {skill.icon === "svg" ? (
                    <img src={skill.svg} alt={skill.label} className="skill-svg-icon" />
                  ) : (
                    <i className={skill.icon}></i>
                  )}
                  {" "}{skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group" role="region" aria-labelledby="analytics-heading">
            <h3 id="analytics-heading">Analytics/SEO:</h3>
            <ul className="bio-skills" aria-label="Analytics and SEO tools">
              {[
                { icon: "fab fa-google", label: "Google Analytics" },
                { icon: "fab fa-google", label: "GTM" },
                { icon: "fab fa-hotjar", label: "Hotjar" },
                { icon: "fas fa-vial", label: "A/B Testing" },
                { icon: "fas fa-search", label: "SEO" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[40 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="skills-group" role="region" aria-labelledby="past-heading">
            <h3 id="past-heading">Past Experience:</h3>
            <ul className="bio-skills" aria-label="Previously used technologies">
              {[
                { icon: "fab fa-angular", label: "AngularJS" },
                { icon: "fab fa-js jquery-icon", label: "jQuery" },
                { icon: "fab fa-bootstrap", label: "Bootstrap" },
                { icon: "fab fa-gulp", label: "Gulp" },
                { icon: "fab fa-wordpress", label: "WordPress" },
                { icon: "fab fa-drupal", label: "Drupal" },
                { icon: "fab fa-magento", label: "Magento" },
              ].map((skill, i) => (
                <li key={skill.label} ref={(el) => (skillsRefs.current[50 + i] = el)}>
                  <i className={skill.icon}></i> {skill.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </section>
        
      <section className="bio-connect-section" aria-labelledby="connect-heading">
        <header>
          <h2 id="connect-heading">Let's Connect</h2>
          <p>If you're interested in front-end engineering, design systems, or accessible UI development, let's connect. I share work, insights, and experiments across the platforms below.</p>
        </header>
        <div className="section-content">
          <div className="bio-connect">
            <nav className="social-links" aria-label="Social media profiles">
            <a
              href="https://linkedin.com/in/riad-kilani"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
              aria-label="Connect with Riad Kilani on LinkedIn"
            >
              <i className="fab fa-linkedin" aria-hidden="true"></i>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/SyntaxSidekick"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
              aria-label="View Riad Kilani's code on GitHub"
            >
              <i className="fab fa-github" aria-hidden="true"></i>
              <span>GitHub</span>
            </a>
            <a 
              href="https://codepen.io/SyntaxSidekick" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link codepen"
              aria-label="See Riad Kilani's experiments on CodePen"
            >
              <i className="fab fa-codepen" aria-hidden="true"></i>
              <span>CodePen</span>
            </a>
            <a 
              href="https://x.com/syntaxsidekick" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link twitter"
              aria-label="Follow Riad Kilani on X (formerly Twitter)"
            >
              <i className="fab fa-x-twitter" aria-hidden="true"></i>
              <span>X (Twitter)</span>
            </a>
          </nav>
          </div>
        </div>
      </section>
      
    </main>
  );
};

export default Bio;
