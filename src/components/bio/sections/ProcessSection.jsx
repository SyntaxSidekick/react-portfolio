import React from "react";
import SectionHeader from "../../common/SectionHeader";
import step1Image from "../../../assets/images/steps/discovery-planning-step-1.png";
import step2Image from "../../../assets/images/steps/wirefaming-design-step-2.png";
import step3Image from "../../../assets/images/steps/development-step-3.png";
import step4Image from "../../../assets/images/steps/testing-accessibility-step-4.png";
import step5Image from "../../../assets/images/steps/performance-optimization-step-5.png";
import step6Image from "../../../assets/images/steps/deployment-maintenance-step-6.png";

const PROCESS_STEPS = [
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
];

const ProcessSection = ({ processRefs, bioContentRef }) => {
  return (
    <section className="bio-process-section" ref={bioContentRef} aria-labelledby="process-heading">
      <SectionHeader
        id="process-heading"
        title="My Front-End Process"
        subtitle="I follow a clear, structured front-end process designed to turn complex ideas into fast, accessible, and intuitive user experiences. From early discovery to long-term optimization, every stage is focused on quality, clarity, and performance."
      />
      <div className="section-content">
        <ol className="bio-process" aria-label="Six-step front-end development process">
          {PROCESS_STEPS.map((step, i) => (
            <li key={i} ref={(el) => (processRefs.current[i] = el)}>
              <div className="process-image">
                <img 
                  src={step.image} 
                  alt={`Illustration for ${step.title} step in the front-end development process`}
                  width="600" 
                  height="400"
                  loading="lazy" 
                />
              </div>
              <div className="process-content">
                <strong>{step.title}:</strong> {step.description}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
