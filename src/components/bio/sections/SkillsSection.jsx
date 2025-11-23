import React from "react";
import SectionHeader from "../../common/SectionHeader";
import TechIcon from "../../TechIcon";

const SKILL_GROUPS = [
  {
    id: "languages-heading",
    title: "Languages:",
    ariaLabel: "Programming languages",
    skills: [
      { name: "HTML5", label: "HTML5" },
      { name: "CSS3", label: "CSS3" },
      { name: "JavaScript", label: "JavaScript" },
      { name: "TypeScript", label: "TypeScript" },
      { name: "PHP", label: "PHP" },
    ],
    startIndex: 0
  },
  {
    id: "frameworks-heading",
    title: "Frameworks/Libraries:",
    ariaLabel: "Front-end frameworks and libraries",
    skills: [
      { name: "React", label: "React/Redux" },
      { name: "Tailwind", label: "Tailwind CSS" },
      { name: "Node", label: "Node.js" },
      { name: "Sass", label: "Sass/SCSS" },
      { name: "Vue", label: "Vue.js" },
    ],
    startIndex: 10
  },
  {
    id: "tools-heading",
    title: "Tools/Platforms:",
    ariaLabel: "Development tools and platforms",
    skills: [
      { name: "Git", label: "Git" },
      { name: "Aws", label: "AWS" },
      { icon: "fab fa-microsoft", label: "Azure" },
      { icon: "fas fa-cube", label: "Webpack" },
    ],
    startIndex: 20
  },
  {
    id: "design-heading",
    title: "UX/UI & Design:",
    ariaLabel: "UX, UI, and design tools",
    skills: [
      { icon: "fas fa-layer-group", label: "Design Systems" },
      { icon: "fas fa-mobile-alt", label: "Responsive Design" },
      { name: "Figma", label: "Figma" },
      { name: "Xd", label: "Adobe XD" },
      { name: "Adobe", label: "Adobe CC" },
      { name: "Photoshop", label: "Photoshop" },
      { name: "Illustrator", label: "Illustrator" },
    ],
    startIndex: 30
  },
  {
    id: "analytics-heading",
    title: "Analytics/SEO:",
    ariaLabel: "Analytics and SEO tools",
    skills: [
      { name: "Google", label: "Google Analytics" },
      { name: "GTM", label: "GTM" },
      { name: "Hotjar", label: "Hotjar" },
      { icon: "fas fa-vial", label: "A/B Testing" },
      { icon: "fas fa-search", label: "SEO" },
    ],
    startIndex: 40
  },
  {
    id: "past-heading",
    title: "Past Experience:",
    ariaLabel: "Previously used technologies",
    skills: [
      { name: "Angular", label: "AngularJS" },
      { icon: "fab fa-js", label: "jQuery" },
      { name: "Bootstrap", label: "Bootstrap" },
      { name: "Gulp", label: "Gulp" },
      { name: "Wordpress", label: "WordPress" },
      { name: "Drupal", label: "Drupal" },
      { name: "Magento", label: "Magento" },
    ],
    startIndex: 50
  }
];

const SkillsSection = ({ skillsRefs }) => {
  return (
    <section className="bio-skills-section" aria-labelledby="skills-heading">
      <SectionHeader
        id="skills-heading"
        title="My Skills"
        subtitle="I've built a deep and focused set of front-end skills over my career—skills shaped by real engineering challenges, design systems work, and high-performance UI development."
      />
      <div className="section-content">
        <div className="bio-skills-wrapper">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="skills-group" role="region" aria-labelledby={group.id}>
              <h3 id={group.id}>{group.title}</h3>
              <ul className="bio-skills" aria-label={group.ariaLabel}>
                {group.skills.map((skill, i) => {
                  const raw = (skill.name || skill.label);
                  const slug = raw.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <li
                      key={skill.label}
                      className={`skill-item skill-${slug}`}
                      ref={(el) => (skillsRefs.current[group.startIndex + i] = el)}
                    >
                    <TechIcon
                      name={skill.name || skill.label}
                      icon={skill.icon}
                      decorative
                      size="md"
                      className="skill-icon"
                    />
                    {" "}{skill.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
