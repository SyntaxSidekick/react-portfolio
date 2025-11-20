import React from "react";
import tailwindIcon from "../../../assets/images/tailwind-brands.svg";
import illustratorIcon from "../../../assets/images/illustrator-brands.svg";
import photoshopIcon from "../../../assets/images/photoshop-brands.svg";
import adobeCCIcon from "../../../assets/images/adobe-cc-brands.svg";
import xdIcon from "../../../assets/images/xd-brands.svg";
import nextjsIcon from "../../../assets/images/next-js.svg";
import typescriptIcon from "../../../assets/images/Typescript_logo_2020.svg";

const SKILL_GROUPS = [
  {
    id: "languages-heading",
    title: "Languages:",
    ariaLabel: "Programming languages",
    skills: [
      { icon: "fab fa-html5", label: "HTML5" },
      { icon: "fab fa-css3-alt", label: "CSS3" },
      { icon: "fab fa-js", label: "JavaScript" },
      { icon: "svg", svg: typescriptIcon, label: "TypeScript", altText: "TypeScript logo - typed JavaScript for scalable applications" },
      { icon: "fab fa-php", label: "PHP" },
    ],
    startIndex: 0
  },
  {
    id: "frameworks-heading",
    title: "Frameworks/Libraries:",
    ariaLabel: "Front-end frameworks and libraries",
    skills: [
      { icon: "fab fa-react", label: "React/Redux" },
      { icon: "svg", svg: nextjsIcon, label: "Next.js", altText: "Next.js logo - React framework for production" },
      { icon: "svg", svg: tailwindIcon, label: "Tailwind CSS", altText: "Tailwind CSS logo - utility-first CSS framework" },
      { icon: "fab fa-node-js", label: "Node.js" },
      { icon: "fab fa-sass", label: "Sass/SCSS" },
      { icon: "fab fa-vuejs", label: "Vue.js" },
    ],
    startIndex: 10
  },
  {
    id: "tools-heading",
    title: "Tools/Platforms:",
    ariaLabel: "Development tools and platforms",
    skills: [
      { icon: "fab fa-git-alt", label: "Git" },
      { icon: "fab fa-aws", label: "AWS" },
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
      { icon: "fab fa-figma", label: "Figma" },
      { icon: "svg", svg: xdIcon, label: "Adobe XD", altText: "Adobe XD logo - design and prototyping tool" },
      { icon: "svg", svg: adobeCCIcon, label: "Adobe CC", altText: "Adobe Creative Cloud logo - creative design suite" },
      { icon: "svg", svg: photoshopIcon, label: "Photoshop", altText: "Adobe Photoshop logo - image editing software" },
      { icon: "svg", svg: illustratorIcon, label: "Illustrator", altText: "Adobe Illustrator logo - vector graphics editor" },
    ],
    startIndex: 30
  },
  {
    id: "analytics-heading",
    title: "Analytics/SEO:",
    ariaLabel: "Analytics and SEO tools",
    skills: [
      { icon: "fab fa-google", label: "Google Analytics" },
      { icon: "fab fa-google", label: "GTM" },
      { icon: "fab fa-hotjar", label: "Hotjar" },
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
      { icon: "fab fa-angular", label: "AngularJS" },
      { icon: "fab fa-js jquery-icon", label: "jQuery" },
      { icon: "fab fa-bootstrap", label: "Bootstrap" },
      { icon: "fab fa-gulp", label: "Gulp" },
      { icon: "fab fa-wordpress", label: "WordPress" },
      { icon: "fab fa-drupal", label: "Drupal" },
      { icon: "fab fa-magento", label: "Magento" },
    ],
    startIndex: 50
  }
];

const SkillsSection = ({ skillsRefs }) => {
  return (
    <section className="bio-skills-section" aria-labelledby="skills-heading">
      <header>
        <h2 id="skills-heading">My Skills</h2>
        <p>I've built a deep and focused set of front-end skills over my career—skills shaped by real engineering challenges, design systems work, and high-performance UI development.</p>
      </header>
      <div className="section-content">
        <div className="bio-skills-wrapper">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="skills-group" role="region" aria-labelledby={group.id}>
              <h3 id={group.id}>{group.title}</h3>
              <ul className="bio-skills" aria-label={group.ariaLabel}>
                {group.skills.map((skill, i) => (
                  <li key={skill.label} ref={(el) => (skillsRefs.current[group.startIndex + i] = el)}>
                    {skill.icon === "svg" ? (
                      <img src={skill.svg} alt={skill.altText || skill.label} className="skill-svg-icon" title={skill.label} />
                    ) : (
                      <i className={skill.icon} aria-hidden="true"></i>
                    )}
                    {" "}{skill.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
