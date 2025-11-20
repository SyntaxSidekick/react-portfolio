import React, { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/images/riad-kilani-profile.jpg";
import { PageHeader } from "../";
import DynamicTitle from "../../DynamicTitle";
import { ProfessionalOverview, ProcessSection, SkillsSection, ConnectSection } from "./sections";

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

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Riad Kilani",
      "jobTitle": "Senior Front-End Engineer",
      "description": "Senior Front-End Engineer specializing in React, accessible UI development, and high-performance web applications with 16+ years of experience.",
      "url": "https://riadkilani.com",
      "image": "https://riadkilani.com/assets/images/riad-kilani-profile.jpg",
      "sameAs": [
        "https://linkedin.com/in/riad-kilani",
        "https://github.com/SyntaxSidekick",
        "https://codepen.io/SyntaxSidekick",
        "https://x.com/syntaxsidekick"
      ],
      "knowsAbout": [
        "React",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Sass/SCSS",
        "Accessibility",
        "Web Performance",
        "UI/UX Design",
        "Front-End Architecture"
      ],
      "alumniOf": {
        "@type": "Organization",
        "name": "Front-End Development"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
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
    <main className="bio-page container" id="main-content" aria-labelledby="page-title">
      <DynamicTitle />
      <PageHeader 
        title="About Riad Kilani" 
        subtitle="Senior Front-End Engineer | React Specialist | UX & Interface Architecture"
      />
      
      <ProfessionalOverview profileImg={profileImg} years={years} />
      <ProcessSection processRefs={processRefs} bioContentRef={bioContentRef} />
      <SkillsSection skillsRefs={skillsRefs} />
      <ConnectSection />
      
    </main>
  );
};

export default Bio;
