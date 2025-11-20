import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from "../../../assets/images/riadkilani-profile.webp";
import profileImgFallback from "../../../assets/images/riadkilani-profile.png";
import { StatItem } from "../../common";

const HERO_TITLES = [
  "Senior Front-End Developer",
  "React Specialist",
  "UI/UX Expert",
  "Design Systems Architect"
];

const HERO_STATS = [
  { number: "100+", label: "Projects Delivered" },
  { number: "1M+", label: "Users Served" },
  { number: "99.4%", label: "Client Satisfaction" }
];

const HeroSection = ({ years, titleIndex }) => {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>
      <div className="container">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
              }
            }
          }}
        >
          {/* Availability Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <span className="badge badge-success">Available for Opportunities</span>
          </motion.div>

          {/* Main Heading with Rotating Text */}
          <motion.h1 
            id="hero-title" 
            className="hero-heading"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <span className="hero-heading-line">I'm a</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                className="hero-heading-animated"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {HERO_TITLES[titleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="hero-heading-line">based in Orlando</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="hero-description"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            Building scalable, performant web experiences with <span className="highlight-text">{years}+ years</span> of expertise. I transform ideas into elegant, user-centric solutions that drive measurable business impact.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="hero-cta-buttons"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <a href="#portfolio" className="btn-primary">
              View My Work
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="#contact" className="btn-secondary">
              Let's Talk
              <i className="fas fa-comments" aria-hidden="true"></i>
            </a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="hero-stats-grid"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <StatItem number={`${years}+`} label="Years Experience" />
            {HERO_STATS.map((stat, idx) => (
              <StatItem key={idx} number={stat.number} label={stat.label} />
            ))}
          </motion.div>
        </motion.div>

        <motion.figure className="hero-image" aria-label="Profile photo">
          <motion.div className="hero-image-wrapper">
            <picture>
              <source srcSet={profileImg} type="image/webp" />
              <img
                src={profileImgFallback}
                alt="Riad Kilani - Front-end Developer"
                className="hero-profile-image"
                loading="eager"
                fetchPriority="high"
                width="360"
                height="360"
              />
            </picture>
          </motion.div>
        </motion.figure>
      </div>
    </section>
  );
};

export default HeroSection;
