import React from "react";
import { motion } from "framer-motion";
import { SectionHeader, CTAButton } from "../../common";

const TECH_STACK = [
  { name: "React", icon: "fab fa-react", color: "#61dafb", proficiency: 95 },
  { name: "JavaScript", icon: "fab fa-js", color: "#f0db4f", proficiency: 93 },
  { name: "HTML5", icon: "fab fa-html5", color: "#e44d26", proficiency: 100 },
  { name: "CSS3/Sass", icon: "fab fa-sass", color: "#cd6799", proficiency: 100 },
  { name: "Git", icon: "fab fa-git-alt", color: "#f05032", proficiency: 92 },
  { name: "Figma", icon: "fab fa-figma", color: "#f24e1e", proficiency: 89 },
];

const AboutSection = ({ years }) => {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader 
          badge="About Me"
          title="Crafting Digital Experiences"
          subtitle={`With over ${years}+ years of experience, I specialize in building modern, accessible, and high-performance web applications using React, TypeScript, and cutting-edge tools.`}
          id="about-title"
        />

        <motion.div 
          className="about-content-condensed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="about-tech-preview">
            <h3 className="visually-hidden">Core Technologies</h3>
            <div className="tech-icons-grid" role="list" aria-label="Key technologies and tools">
              {TECH_STACK.map((tech, index) => (
                <motion.div 
                  key={tech.name}
                  className="tech-icon-item" 
                  role="listitem"
                  style={{ 
                    '--tech-color': tech.color,
                    '--proficiency': tech.proficiency 
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.15, y: -5 }}
                >
                  <i className={tech.icon} aria-hidden="true"></i>
                  <span className="tech-name">{tech.name}</span>
                  <div className="tech-proficiency-bar">
                    <div className="tech-proficiency-fill"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="about-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <CTAButton 
              href="/bio"
              icon="fas fa-user-circle"
              title="Learn More About Me"
              subtitle="View my full bio, process, and complete skillset"
              ariaLabel="View my complete bio, skills, and experience"
              className="bio-cta-button"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
