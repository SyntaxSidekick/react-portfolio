import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "../common";

// Default experimental pens (replace preview paths with real assets in /public/assets/previews)
const defaultExperiments = [
  {
    id: "pen-1",
    title: "Interactive Component",
    description: "Creative UI experiment with animations and interactions.",
    preview: "/assets/previews/interactive-component.mp4",
    type: "video",
    url: "https://codepen.io/SyntaxSidekick/pen/xxxxx",
  },
  {
    id: "pen-2",
    title: "Accessible Focus Ring Demo",
    description: "Improved keyboard focus states and screen reader hints.",
    preview: "/assets/previews/focus-ring.gif",
    type: "gif",
    url: "https://codepen.io/SyntaxSidekick/pen/yyyyy",
  },
  {
    id: "pen-3",
    title: "CSS Grid Cards (animated)",
    description: "Fluid card layout with subtle animations.",
    preview: "/assets/previews/grid-cards.mp4",
    type: "video",
    url: "https://codepen.io/SyntaxSidekick/pen/zzzzz",
  },
];

const cardReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

const CodepenExperiments = ({ experiments = defaultExperiments }) => {
  const videoRefs = useRef({});

  const handlePlay = (id) => {
    const vid = videoRefs.current[id];
    if (vid) {
      const attempt = vid.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => {}); // swallow autoplay rejections
      }
    }
  };

  const handlePauseReset = (id) => {
    const vid = videoRefs.current[id];
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  };

  return (
    <section className="codepen-section container" aria-labelledby="codepen-title">
      <header className="section-head">
        <h2 id="codepen-title">CodePen Experiments</h2>
        <p className="section-sub">
          Creative micro-interactions, accessibility demos, UI components, and JavaScript experiments.
        </p>
      </header>

      <div className="codepen-grid" role="list">
        {experiments.map((exp, i) => (
          <motion.a
            role="listitem"
            key={exp.id}
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="codepen-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardReveal}
            custom={i}
            aria-labelledby={`${exp.id}-title`}
            aria-describedby={`${exp.id}-desc`}
            onMouseEnter={() => { if (exp.type === 'video') handlePlay(exp.id); }}
            onMouseLeave={() => { if (exp.type === 'video') handlePauseReset(exp.id); }}
            onFocus={() => { if (exp.type === 'video') handlePlay(exp.id); }}
            onBlur={() => { if (exp.type === 'video') handlePauseReset(exp.id); }}
          >
            <div className="card-media">
              {exp.type === "video" ? (
                <video
                  className="preview-video"
                  src={exp.preview}
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  aria-hidden="true"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  ref={(el) => { if (el) videoRefs.current[exp.id] = el; }}
                />
              ) : (
                <img
                  className="preview-img"
                  src={exp.preview}
                  alt={exp.title}
                  loading="lazy"
                  width="480"
                  height="270"
                />
              )}
              <div className="media-overlay" aria-hidden="true" />
            </div>

            <div className="card-body">
              <h3 id={`${exp.id}-title`} className="card-title">{exp.title}</h3>
              <p id={`${exp.id}-desc`} className="card-desc">{exp.description}</p>
              <div className="card-footer">
                <span className="view-cta">View on CodePen</span>
                <i className="fas fa-external-link-alt" aria-hidden="true"></i>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="codepen-cta-row">
        <CTAButton
          href="https://codepen.io/SyntaxSidekick"
          icon="fab fa-codepen"
          title="Explore More Pens"
          subtitle="See all experiments on CodePen"
          ariaLabel="Explore all experiments on CodePen"
          variant="codepen"
        />
      </div>
    </section>
  );
};

export default CodepenExperiments;
