import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const defaultTitle = "Riad Kilani - Web Developer & Designer";
const defaultDescription = "Riad Kilani - Professional front-end developer and designer with 12+ years of experience. Specializing in modern web development, UI/UX design, and performance optimization.";

const routeTitles = [
  { 
    path: /^\/$/, 
    title: "Riad Kilani - Front-end Developer | React Specialist | UI/UX Modernist",
    description: "Professional front-end developer and designer with 12+ years of experience. Specializing in React, modern web development, UI/UX design, and performance optimization."
  },
  { 
    path: /^\/home$/, 
    title: "Riad Kilani - Front-end Developer | React Specialist | UI/UX Modernist",
    description: "Professional front-end developer and designer with 12+ years of experience. Specializing in React, modern web development, UI/UX design, and performance optimization."
  },
  { 
    path: /^\/bio$/, 
    title: "About Riad Kilani | Senior Front-End Engineer & React Specialist",
    description: "Learn about Riad Kilani's 16+ years of experience in front-end engineering, specializing in React, accessible UI development, design systems, and high-performance web applications."
  },
  { 
    path: /^\/portfolio$/, 
    title: "Portfolio | Riad Kilani - Web Development Projects",
    description: "Explore Riad Kilani's portfolio of web development projects, UI/UX design work, and modern web applications built with React and JavaScript."
  },
  { 
    path: /^\/blog$/, 
    title: "Blog | Riad Kilani - Web Development & Design Insights",
    description: "Read articles and insights about web development, React, UI/UX design, and front-end best practices from Riad Kilani."
  },
  { 
    path: /^\/blog\//, 
    title: "Blog Post | Riad Kilani",
    description: "Read articles and insights about web development, design, and technology from Riad Kilani."
  },
  { 
    path: /^\/contact$/, 
    title: "Contact Riad Kilani | Get In Touch",
    description: "Contact Riad Kilani for web development projects, collaborations, or inquiries about front-end development and design services."
  },
];

export default function DynamicTitle({ postTitle, postDescription }) {
  const location = useLocation();

  useEffect(() => {
    let matched = routeTitles.find(r => r.path.test(location.pathname));
    
    // Update title
    if (location.pathname.startsWith("/blog/") && postTitle) {
      document.title = `${postTitle} | Riad Kilani`;
    } else {
      document.title = matched ? matched.title : defaultTitle;
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      if (location.pathname.startsWith("/blog/") && postDescription) {
        metaDescription.setAttribute('content', postDescription);
      } else {
        metaDescription.setAttribute('content', matched ? matched.description : defaultDescription);
      }
    }
    
    // Update OG meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    
    if (ogTitle) {
      ogTitle.setAttribute('content', document.title);
    }
    if (ogDescription && metaDescription) {
      ogDescription.setAttribute('content', metaDescription.getAttribute('content'));
    }
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://riadkilani.com${location.pathname}`);
    }
    
    // Update Twitter meta tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    
    if (twitterTitle) {
      twitterTitle.setAttribute('content', document.title);
    }
    if (twitterDescription && metaDescription) {
      twitterDescription.setAttribute('content', metaDescription.getAttribute('content'));
    }
    
    // Update canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://riadkilani.com${location.pathname}`);
    }
  }, [location, postTitle, postDescription]);

  return null;
}
