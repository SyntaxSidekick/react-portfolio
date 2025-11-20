import React, { useEffect, useState, lazy, Suspense } from "react";
import { projects as portfolioProjects } from "../portfolio/projects";
import { HeroSection, AboutSection, FeaturedWorkSection, BlogSection, ContactSection } from "./sections";

const PortfolioModal = lazy(() => import("../portfolio/PortfolioModal"));

const Home = () => {
  const [years, setYears] = useState(0);
  const [projects] = useState(portfolioProjects.filter((p) => p.featured));
  const [blogPosts, setBlogPosts] = useState([]);
  const [modalProject, setModalProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  // Years of service calculation
  useEffect(() => {
    const startYear = 2009;
    setYears(new Date().getFullYear() - startYear);

    // Fetch latest 2 blog posts from WordPress REST API
    fetch("https://blog.riadkilani.com/wp-json/wp/v2/posts?per_page=2&_embed")
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
    const HERO_TITLES_LENGTH = 4; // Number of titles in HeroSection
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % HERO_TITLES_LENGTH);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (project) => {
    setModalProject(project);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setModalProject(null);
  };

  return (
    <main className="home-page" id="main-content" role="main">
      <HeroSection years={years} titleIndex={titleIndex} />
      <AboutSection years={years} />
      <FeaturedWorkSection projects={projects} onProjectClick={openModal} />
      <BlogSection blogPosts={blogPosts} />
      <ContactSection />

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
