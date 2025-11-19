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
      <section 
        className="hero" 
        aria-labelledby="hero-title"
      >
        <div 
          className="hero-background"
        >
          <div 
            className="hero-gradient"
          ></div>
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
          >
            <motion.div 
              className="hero-image-wrapper"
            >
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

      <section
        className="about" 
        id="about" 
        aria-labelledby="about-title"
      >
        <div className="container">
          <motion.header 
            className="home-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="badge badge-outline">About Me</span>
            <h2 id="about-title">Crafting Digital Experiences</h2>
            <p className="section-intro">
              With over <strong>{years}+ years</strong> of experience, I specialize in building modern, 
              accessible, and high-performance web applications using React, TypeScript, and cutting-edge tools.
            </p>
          </motion.header>

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
                {[
                  { name: "React", icon: "fab fa-react", color: "#61dafb", proficiency: 95 },
                  { name: "JavaScript", icon: "fab fa-js", color: "#f0db4f", proficiency: 93 },
                  { name: "HTML5", icon: "fab fa-html5", color: "#e44d26", proficiency: 100 },
                  { name: "CSS3/Sass", icon: "fab fa-sass", color: "#cd6799", proficiency: 100 },
                  { name: "Git", icon: "fab fa-git-alt", color: "#f05032", proficiency: 92 },
                  { name: "Figma", icon: "fab fa-figma", color: "#f24e1e", proficiency: 89 },
                ].map((tech, index) => (
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
              <a 
                href="/bio" 
                className="bio-cta-button"
                aria-label="View my complete bio, skills, and experience"
              >
                <span className="cta-content">
                  <i className="fas fa-user-circle" aria-hidden="true"></i>
                  <span className="cta-text">
                    <strong>Learn More About Me</strong>
                    <small>View my full bio, process, and complete skillset</small>
                  </span>
                </span>
                <i className="fas fa-arrow-right cta-arrow" aria-hidden="true"></i>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        className="featured-work"
        id="featured-work"
        aria-labelledby="portfolio-title"
      >
        <div className="container">
          <motion.header 
            className="home-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="badge badge-outline">Portfolio</span>
            <h2 id="portfolio-title">Featured Work</h2>
            <p className="section-intro">Discover my most impactful projects showcasing modern web development, design excellence, and user-centered solutions.</p>
          </motion.header>
          <motion.div 
            className="featured-work-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {projects.slice(0, 2).map((project, i) => (
              <motion.article
                className="card card-interactive project-card"
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

                <div className="card-body project-card-content">
                  {/* App Title / Type */}
                  <h3 className="card-title project-title">
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
                    <p className="card-subtitle project-role-year">{project.role} • {project.year}</p>
                  )}
                  
                  {/* Project Description */}
                  <p className="card-text project-excerpt">{project.desc}</p>
                  
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
                            className="badge tech-badge" 
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
                        <span className="badge tech-badge tech-badge-more">
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
            <a 
              href="/portfolio" 
              className="portfolio-cta-button"
              aria-label="View my complete portfolio and project case studies"
            >
              <span className="cta-content">
                <i className="fas fa-briefcase" aria-hidden="true"></i>
                <span className="cta-text">
                  <strong>View Full Portfolio</strong>
                  <small>Explore all projects and case studies</small>
                </span>
              </span>
              <i className="fas fa-arrow-right cta-arrow" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>

      <section
        className="blog-section"
        id="blog"
        aria-labelledby="blog-title"
      >
        <div className="container">
          <motion.header 
            className="home-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="badge badge-outline">Insights & Updates</span>
            <h2 id="blog-title">From the Blog</h2>
            <p className="section-intro">
              Sharing knowledge, insights, and experiences from the world of web development and design.
            </p>
          </motion.header>

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
                  className="card card-interactive blog-card" 
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
                    
                    <div className="card-body blog-card-content">
                      <time className="blog-date" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      
                      <h3 
                        className="card-title blog-title"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                      
                      <p className="card-text blog-excerpt">{post.excerpt}</p>
                      
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
            <a 
              href="/blog" 
              className="blog-cta-button"
              aria-label="Read all blog posts and articles"
            >
              <span className="cta-content">
                <i className="fas fa-blog" aria-hidden="true"></i>
                <span className="cta-text">
                  <strong>View All Posts</strong>
                  <small>Read insights, tutorials, and articles</small>
                </span>
              </span>
              <i className="fas fa-arrow-right cta-arrow" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>

      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="container">
          <header className="home-section-header">
            <span className="badge badge-outline">Let's Connect</span>
            <h2 id="contact-title">Get In Touch</h2>
            <p className="section-intro">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
          </header>

          <div className="contact-grid">
            <div className="contact-info">
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
                  height="700"
                  frameBorder="0"
                  title="Contact Form"
                  scrolling="auto"
                  style={{ minHeight: '700px' }}
                  onLoad={(e) => {
                    // Listen for messages from iframe to adjust height
                    window.addEventListener('message', (event) => {
                      if (event.origin === 'https://blog.riadkilani.com') {
                        if (event.data.height) {
                          const newHeight = Math.max(700, event.data.height + 50); // Add padding, minimum 700px
                          e.target.style.height = newHeight + 'px';
                        }
                      }
                    });
                  }}
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
