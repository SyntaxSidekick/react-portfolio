import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import profileImg from "../../assets/images/riadkilani-profile.webp";
import profileImgFallback from "../../assets/images/riadkilani-profile.png";
import { Link } from "react-router-dom";
import { projects as portfolioProjects } from "../portfolio/projects";

const PortfolioModal = lazy(() => import("../portfolio/PortfolioModal"));

const Home = () => {
  const [years, setYears] = useState(0);
  const [projects] = useState(portfolioProjects.filter((p) => p.featured));
  const [blogPosts, setBlogPosts] = useState([]);
  const [modalProject, setModalProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // Hero rotating titles
  const [TITLES] = useState([
    "Senior Front-End Developer",
    "React Specialist",
    "UI/UX Expert",
    "Design Systems Architect"
  ]);
  const [titleIndex, setTitleIndex] = useState(0);

  // Parallax scrolling refs
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  
  // Hero parallax
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.95]);
  
  // About parallax
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  
  const aboutY = useTransform(aboutScrollProgress, [0, 1], ["10%", "-10%"]);
  const aboutImageY = useTransform(aboutScrollProgress, [0, 1], ["-20%", "20%"]);

  // Years of service calculation
  useEffect(() => {
    const startYear = 2009;
    setYears(new Date().getFullYear() - startYear);

    // Fetch latest 3 blog posts from WordPress REST API
    fetch("https://blog.riadkilani.com/wp-json/wp/v2/posts?per_page=3&_embed")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogPosts(
            data.map((post) => ({
              id: post.id,
              slug: post.slug,
              title: post.title?.rendered || "",
              date: post.date,
              excerpt:
                post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() || "",
              link: post.link,
              img:
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "/assets/images/projects/project-form.png",
            }))
          );
        }
      })
      .catch(() => {
        // fallback: keep empty or show static posts if needed
      });
  }, []);

  // Rotate hero titles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [TITLES.length]);

  const openModal = (project) => {
    setModalProject(project);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setModalProject(null);
      document.body.style.overflow = "";
    }, 350);
  };

  return (
    <main className="home-section" id="main-content" role="main">
      <motion.section 
        ref={heroRef}
        className="hero" 
        aria-labelledby="hero-title"
        style={{ y: heroY }}
      >
        <motion.div 
          className="hero-background"
          style={{ opacity: heroOpacity }}
        >
          <motion.div 
            className="hero-gradient"
            style={{ scale: heroScale }}
          ></motion.div>
        </motion.div>
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
              className="availability-badge"
            >
              <span className="badge-text">Available for Opportunities</span>
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
                  {TITLES[titleIndex]}
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
              <div className="stat-item">
                <div className="stat-number">{years}+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1M+</div>
                <div className="stat-label">Users Served</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99.4%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.figure 
            className="hero-image" 
            aria-label="Profile photo"
            style={{ y: useTransform(heroScrollProgress, [0, 1], ["0%", "-20%"]) }}
          >
            <motion.div 
              className="hero-image-wrapper"
              style={{ 
                y: useTransform(heroScrollProgress, [0, 1], ["0%", "10%"]),
                rotate: useTransform(heroScrollProgress, [0, 1], [0, 5])
              }}
            >
              <picture>
                <source srcSet={profileImg} type="image/webp" />
                <img
                  src={profileImgFallback}
                  alt="Riad Kilani - Front-end Developer"
                  className="hero-profile-image"
                  loading="eager"
                  fetchpriority="high"
                  width="360"
                  height="360"
                />
              </picture>
            </motion.div>
          </motion.figure>
        </div>
      </motion.section>

      <motion.section 
        ref={aboutRef}
        className="about" 
        id="about" 
        aria-labelledby="about-title"
        style={{ y: aboutY }}
      >
        <div className="container">
          <motion.div 
            className="about-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="section-label">About Me</span>
            <h2 id="about-title">Crafting Digital Experiences</h2>
            <p className="about-intro">
              Senior front-end developer with over <strong>{years}+ years</strong> of experience 
              delivering exceptional websites and web applications. I transform designs into 
              pixel-perfect, accessible, and performant code using modern tools and best practices.
            </p>
          </motion.div>

          <div className="about-content">
            <div className="about-expertise">
              <h3>Core Expertise</h3>
              <motion.div 
                className="expertise-grid"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div 
                  className="expertise-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  <div className="expertise-icon">
                    <i className="fas fa-code" aria-hidden="true"></i>
                  </div>
                  <h4>Front-End Development</h4>
                  <p>Building responsive, accessible web applications with modern JavaScript frameworks and best practices.</p>
                </motion.div>
                <motion.div 
                  className="expertise-card"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.8, 
                        ease: [0.25, 0.1, 0.25, 1],
                        opacity: { duration: 0.6 }
                      } 
                    }
                  }}
                >
                  <div className="expertise-icon">
                    <i className="fas fa-palette" aria-hidden="true"></i>
                  </div>
                  <h4>UI/UX Implementation</h4>
                  <p>Translating design systems into production-ready code with attention to detail and user experience.</p>
                </motion.div>
                <motion.div 
                  className="expertise-card"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.8, 
                        ease: [0.25, 0.1, 0.25, 1],
                        opacity: { duration: 0.6 }
                      } 
                    }
                  }}
                >
                  <div className="expertise-icon">
                    <i className="fas fa-rocket" aria-hidden="true"></i>
                  </div>
                  <h4>Performance Optimization</h4>
                  <p>Optimizing web applications for speed, accessibility, and SEO to deliver exceptional user experiences.</p>
                </motion.div>
              </motion.div>
            </div>

            <div className="about-technologies">
              <h3>Technologies & Tools</h3>
              <div className="tech-showcase">
                <div className="tech-group">
                  <div className="tech-group-header">
                    <i className="fas fa-layer-group" aria-hidden="true"></i>
                    <h4>Front-End Development</h4>
                  </div>
                  <div className="tech-cards">
                    {[
                      { name: "React", level: 95, icon: "fab fa-react", color: "#61dafb" },
                      { name: "TypeScript", level: 88, icon: "fab fa-js", color: "#3178c6" },
                      { name: "JavaScript", level: 92, icon: "fab fa-js", color: "#f0db4f" },
                      { name: "HTML5", level: 100, icon: "fab fa-html5", color: "#e44d26" },
                      { name: "CSS3 / Sass", level: 100, icon: "fab fa-sass", color: "#cd6799" },
                      { name: "Vue.js", level: 85, icon: "fab fa-vuejs", color: "#42b883" },
                    ].map((skill, index) => (
                      <div className="tech-card" key={skill.name} style={{ '--card-delay': `${index * 0.1}s`, '--tech-color': skill.color }}>
                        <div className="tech-card-content">
                          <div className="tech-card-icon">
                            <i className={skill.icon} aria-hidden="true"></i>
                          </div>
                          <h5 className="tech-card-name">{skill.name}</h5>
                        </div>
                        <div className="tech-card-progress">
                          <div className="tech-card-bar-container">
                            <div className="tech-card-bar" style={{ '--skill-level': `${skill.level}%` }}></div>
                          </div>
                          <div className="tech-proficiency-label">Proficiency</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tech-group">
                  <div className="tech-group-header">
                    <i className="fas fa-tools" aria-hidden="true"></i>
                    <h4>Tools & Platforms</h4>
                  </div>
                  <div className="tech-grid">
                    {[
                      { name: "Git", icon: "fab fa-git-alt", color: "#f05032" },
                      { name: "NPM", icon: "fab fa-npm", color: "#cb3837" },
                      { name: "Webpack", icon: "fab fa-node-js", color: "#8dd6f9" },
                      { name: "Vite", icon: "fas fa-bolt", color: "#646cff" },
                      { name: "Gulp", icon: "fab fa-gulp", color: "#da4648" },
                      { name: "REST API", icon: "fas fa-plug", color: "#61dafb" },
                      { name: "WordPress", icon: "fab fa-wordpress", color: "#21759b" },
                      { name: "Drupal", icon: "fab fa-drupal", color: "#0678be" },
                    ].map((tool, index) => (
                      <div className="tech-item" key={tool.name} style={{ '--tech-color': tool.color }}>
                        <div className="tech-icon">
                          <i className={tool.icon} aria-hidden="true"></i>
                        </div>
                        <span className="tech-label">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tech-group">
                  <div className="tech-group-header">
                    <i className="fas fa-pencil-ruler" aria-hidden="true"></i>
                    <h4>Design & Creative</h4>
                  </div>
                  <div className="tech-grid">
                    {[
                      { name: "Figma", icon: "fab fa-figma", color: "#f24e1e" },
                      { name: "Adobe XD", icon: "fas fa-vector-square", color: "#ff61f6" },
                      { name: "Photoshop", icon: "fas fa-image", color: "#31a8ff" },
                      { name: "Illustrator", icon: "fas fa-bezier-curve", color: "#ff9a00" },
                      { name: "Sketch", icon: "fas fa-pen-nib", color: "#f7b500" },
                      { name: "InVision", icon: "fas fa-drafting-compass", color: "#ff3366" },
                    ].map((tool) => (
                      <div className="tech-item" key={tool.name} style={{ '--tech-color': tool.color }}>
                        <div className="tech-icon">
                          <i className={tool.icon} aria-hidden="true"></i>
                        </div>
                        <span className="tech-label">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            className="about-stats"
            style={{ y: aboutImageY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="stat-icon">
                <i className="fas fa-code" aria-hidden="true"></i>
              </div>
              <div className="stat-number">30</div>
              <div className="stat-label">Total Skills</div>
            </motion.div>
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="stat-icon">
                <i className="fas fa-layer-group" aria-hidden="true"></i>
              </div>
              <div className="stat-number">6</div>
              <div className="stat-label">Categories</div>
            </motion.div>
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="stat-icon">
                <i className="fas fa-calendar-check" aria-hidden="true"></i>
              </div>
              <div className="stat-number">{years}+</div>
              <div className="stat-label">Years Experience</div>
            </motion.div>
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="stat-icon">
                <i className="fas fa-chart-line" aria-hidden="true"></i>
              </div>
              <div className="stat-number">91%</div>
              <div className="stat-label">Avg Proficiency</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="featured-work"
        id="featured-work"
        aria-labelledby="portfolio-title"
      >
        <div className="container">
          <motion.div 
            className="featured-work-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="section-label">Portfolio</span>
            <h2 id="portfolio-title">Featured Work</h2>
            <p className="featured-work-intro">Discover my most impactful projects showcasing modern web development, design excellence, and user-centered solutions.</p>
          </motion.div>
          <motion.div 
            className="featured-work-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {projects.slice(0, 2).map((project, i) => (
              <motion.article
                className="project-card"
                key={i}
                onClick={() => openModal(project)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openModal(project)}
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
                style={{ '--card-delay': `${i * 0.15}s` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              >
                {/* Image */}
                <div className="project-card-image">
                  <img src={project.img} alt={project.title} loading="lazy" width="600" height="220" />
                  <span className="project-featured-badge">⭐ FEATURED</span>
                  <div className="project-card-overlay">
                    <span className="view-project-text">View Details →</span>
                  </div>
                </div>

                <div className="project-card-content">
                  {/* App Title / Type */}
                  <h3 className="project-title">
                    {project.title.includes('–') 
                      ? project.title.split('–')[0].trim()
                      : project.title.includes('-')
                      ? project.title.split('-')[0].trim()
                      : project.title}
                    {(project.title.includes('–') || project.title.includes('-')) && (
                      <>
                        {' - '}
                        <span className="project-type">
                          {project.title.includes('–') 
                            ? project.title.split('–')[1].trim()
                            : project.title.split('-')[1].trim()}
                        </span>
                      </>
                    )}
                  </h3>
                  
                  {/* Position / Date */}
                  {project.role && (
                    <p className="project-role-year">{project.role} • {project.year}</p>
                  )}
                  
                  {/* Project Description */}
                  <p className="project-excerpt">{project.desc}</p>
                  
                  {/* 2 Key Accomplishments (Data) */}
                  {project.metrics && (
                    <div className="project-metrics">
                      {Object.entries(project.metrics).map(([key, value], idx) => (
                        <div key={idx} className="metric-item">
                          <div className="metric-value">{value}</div>
                          <div className="metric-label">
                            {key === 'users' ? 'Users Served' : 
                             key === 'components' ? 'Design Components' : 
                             key === 'delivery' ? 'Delivery Time' : 
                             key === 'rebuild' ? 'Framework Rebuild' : 
                             key.charAt(0).toUpperCase() + key.slice(1)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Used */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="project-tech-stack">
                      {project.tech.slice(0, 3).map((tech, techIndex) => {
                        const techColors = {
                          'Photoshop': '#31a8ff',
                          'Illustrator': '#ff9a00',
                          'InDesign': '#ff3366',
                          'Design Systems': '#6366f1',
                          'React': '#61dafb',
                          'JavaScript': '#f0db4f',
                          'TypeScript': '#3178c6',
                          'HTML5': '#e44d26',
                          'CSS3': '#1572b6',
                          'Sass': '#cd6799',
                          'Bootstrap': '#7952b3',
                          'Figma': '#f24e1e',
                          'Git': '#f05032',
                          'Gulp': '#da4648',
                        };
                        const techColor = techColors[tech.name] || '#3060BF';
                        
                        return (
                          <span 
                            key={techIndex} 
                            className="tech-badge" 
                            title={tech.name}
                            style={{ 
                              borderColor: techColor,
                              color: techColor 
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 12px ${techColor}60, 0 4px 8px ${techColor}40`;
                              e.currentTarget.style.backgroundColor = `${techColor}15`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = '';
                              e.currentTarget.style.backgroundColor = '';
                            }}
                          >
                            <i className={tech.icon}></i>
                            {tech.name}
                          </span>
                        );
                      })}
                      {project.tech.length > 3 && (
                        <span className="tech-badge tech-badge-more">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
          
          <div className="featured-work-cta">
            <a href="/portfolio" className="portfolio-cta-button">
              View Full Portfolio
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="blog-section"
        id="blog"
        aria-labelledby="blog-title"
      >
        <div className="container">
          <motion.div 
            className="blog-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="section-label">Insights & Updates</span>
            <h2 id="blog-title">From the Blog</h2>
            <p className="blog-intro">
              Sharing knowledge, insights, and experiences from the world of web development and design.
            </p>
          </motion.div>

          <motion.div 
            className="blog-posts-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {blogPosts.length === 0 ? (
              <div className="blog-loading">Loading latest blog posts...</div>
            ) : (
              blogPosts.slice(0, 3).map((post, i) => (
                <motion.article 
                  className="blog-card" 
                  key={i}
                  style={{ '--card-delay': `${i * 0.1}s` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                >
                  <Link to={`/blog/${post.slug}`} className="blog-card-link">
                    {post.img && (
                      <div className="blog-card-image">
                        <img
                          src={post.img}
                          alt={post.title}
                          loading="lazy"
                          width="400"
                          height="220"
                        />
                        <div className="blog-card-overlay">
                          <span className="read-more-text">Read Article →</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="blog-card-content">
                      <time className="blog-date" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      
                      <h3 
                        className="blog-title"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                      
                      <p className="blog-excerpt">{post.excerpt}</p>
                      
                      <span className="blog-read-more">
                        Read More <i className="fas fa-arrow-right" aria-hidden="true"></i>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))
            )}
          </motion.div>

          <div className="blog-cta">
            <a href="/blog" className="blog-cta-button">
              View All Posts
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </motion.section>

      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="container">
          <div className="contact-header">
            <span className="section-label">Let's Connect</span>
            <h2 id="contact-title">Get In Touch</h2>
            <p className="contact-intro">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-info-card">
                <div className="info-icon">
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                </div>
                <h3>Email Me</h3>
                <p>Let's discuss your project</p>
                <a href="mailto:riad@riadkilani.com" className="contact-link">
                  riad@riadkilani.com
                </a>
              </div>

              <div className="contact-info-card">
                <div className="info-icon">
                  <i className="fab fa-linkedin" aria-hidden="true"></i>
                </div>
                <h3>Connect on LinkedIn</h3>
                <p>Let's grow our network</p>
                <a href="https://www.linkedin.com/in/riadkilani" target="_blank" rel="noopener noreferrer" className="contact-link">
                  linkedin.com/in/riadkilani
                </a>
              </div>

              <div className="contact-info-card">
                <div className="info-icon">
                  <i className="fab fa-github" aria-hidden="true"></i>
                </div>
                <h3>GitHub</h3>
                <p>Check out my repositories</p>
                <a href="https://github.com/f1ss1on" target="_blank" rel="noopener noreferrer" className="contact-link">
                  github.com/f1ss1on
                </a>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h3 className="form-title">Send a Message</h3>
              <div className="contact-form">
                <iframe
                  src="https://blog.riadkilani.com/shortcontact/"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Contact Form"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <PortfolioModal
          modalOpen={modalOpen}
          modalProject={modalProject}
          closeModal={closeModal}
        />
      </Suspense>
    </main>
  );
};

export default Home;
