import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const defaultTitle = "Riad Kilani - Web Developer & Designer";
const defaultDescription =
  "Riad Kilani - Professional front-end developer and designer with 12+ years of experience. Specializing in modern web development, UI/UX design, and performance optimization.";

const routeTitles = [
  {
    path: /^\/$/,
    title: "Riad Kilani | Senior Front-End Engineer & UX Engineer",
    description:
      "Senior Front-End Engineer with 17+ years of experience building scalable, accessible, high-performance web applications, UX, and design systems.",
  },
  {
    path: /^\/home$/,
    title: "Riad Kilani | Senior Front-End Engineer & UX Engineer",
    description:
      "Senior Front-End Engineer with 17+ years of experience building scalable, accessible, high-performance web applications, UX, and design systems.",
  },
  {
    path: /^\/bio$/,
    title:
      "About Riad Kilani | Front-End Engineer, UX Engineer & Design Systems",
    description:
      "Learn about Riad Kilani's experience designing accessible interfaces, front-end architecture, UX, performance optimization, and enterprise design systems.",
  },
  {
    path: /^\/portfolio$/,
    title: "Portfolio | Front-End Engineering, UX & Design Systems",
    description:
      "Explore case studies featuring React, TypeScript, accessibility, design systems, performance optimization, and enterprise front-end engineering.",
  },
  {
    path: /^\/blog$/,
    title: "Insights | Front-End Engineering, UX & Accessibility",
    description:
      "Articles covering modern CSS, React, accessibility, UX engineering, design systems, AI-assisted development, and front-end architecture.",
  },
  {
    path: /^\/blog\//,
    title: "Article | Riad Kilani",
    description:
      "Front-end engineering, UX engineering, accessibility, design systems, and modern web development insights.",
  },
  {
    path: /^\/contact$/,
    title: "Contact Riad Kilani | Front-End & UX Engineer",
    description:
      "Let's discuss front-end engineering, UX, design systems, accessibility, consulting, or your next web application.",
  },
];

export default function DynamicTitle({ postTitle, postDescription }) {
  const location = useLocation();

  useEffect(() => {
    let matched = routeTitles.find((r) => r.path.test(location.pathname));

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
        metaDescription.setAttribute("content", postDescription);
      } else {
        metaDescription.setAttribute(
          "content",
          matched ? matched.description : defaultDescription,
        );
      }
    }

    // Update OG meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) {
      ogTitle.setAttribute("content", document.title);
    }
    if (ogDescription && metaDescription) {
      ogDescription.setAttribute(
        "content",
        metaDescription.getAttribute("content"),
      );
    }
    if (ogUrl) {
      ogUrl.setAttribute(
        "content",
        `https://riadkilani.com${location.pathname}`,
      );
    }

    // Update Twitter meta tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]',
    );

    if (twitterTitle) {
      twitterTitle.setAttribute("content", document.title);
    }
    if (twitterDescription && metaDescription) {
      twitterDescription.setAttribute(
        "content",
        metaDescription.getAttribute("content"),
      );
    }

    // Update canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        "href",
        `https://riadkilani.com${location.pathname}`,
      );
    }
  }, [location, postTitle, postDescription]);

  return null;
}
