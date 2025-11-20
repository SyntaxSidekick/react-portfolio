// Cleaned: removed stray, unassigned array/object at the top
export const projects = [
  {
    title: "Vistana – Mobile App Design",
    img: "/images/portfolio/projects/vistana-1.png",
    desc: "Comprehensive design system for luxury vacation ownership platform serving 500K+ users across three resort brands.",
    fullDesc: `The Vistana Signature Experiences mobile app** is designed to make planning, managing, and enjoying vacations seamless for travelers and owners alike. Users can browse destinations, explore resort amenities, and get inspired with vacation ideas, photos, and activities. The app provides access to upcoming reservations, resort details, and special offers, ensuring that members and guests stay informed and prepared for their trips. With a clean interface and imagery-driven design, the app balances inspiration with practical functionality.\n\nFor Vistana owners, the app extends further by offering access to ownership details such as benefit levels, StarOptions, and balances. Members can log in with their existing vistana.com credentials to view personalized dashboards, manage their profiles, and even share vacation photos, videos, and stories with the community. While some content is available without logging in, full functionality requires an account, making the app both a travel planning tool and an ownership companion that connects inspiration, management, and community in one platform.\n\n The project was originally designed with simple mockups and wireframes and then shipped off to an overseas development team. However, the overseas team needed more direction than mocks with generic text and images. That's where I came in. I took the initial wireframes and mockups and created a full design system with reusable components, a style guide, and a comprehensive page by page designs in photoshop and indesign. This ensured that the overseas developers had clear guidelines and assets to work with, leading to a more cohesive and efficient development process.`,
    problem: "The overseas development team received basic wireframes and mockups with generic placeholder content, but lacked the detailed guidance needed for consistent implementation across three distinct brands (Vistana Signature Experiences, Sheraton Vacation Club, Westin Vacation Club). This resulted in repeated clarification requests, inconsistent UI implementations, and development delays.\n\nThe app needed to serve both public users (browsing destinations and amenities) and authenticated owners (accessing reservations, ownership details, StarOptions balances). Without a comprehensive design system, the risk of fragmented user experiences across platforms (iOS/Android) and brands was high.",
    secimg: "/images/portfolio/projects/vistana-2.png",
    addimg:
      "/images/portfolio/projects/vistana-3.png, /images/portfolio/projects/vistana-4.png",
    deliverables:
      "Vistana Signature Experiences had one of the most comprehensive designs ever pushed out to a dev team resulting in true pixel perfect app development for all 3 of their brands. \n\n Deliverables were: UI/UX Design, Prototyping, User Flows, Wireframes, Visual Design, Interactive Prototype, Interaction Design.",
    challenges: [
      "Creating a unified design system that worked across three luxury vacation brands while maintaining each brand's unique identity",
      "Documenting 200+ reusable components with precise specifications for offshore development teams",
      "Balancing inspirational, imagery-heavy design with practical account management functionality",
      "Designing dual-mode experiences (authenticated vs. public) without confusing navigation patterns",
      "Producing page-by-page Photoshop and InDesign assets detailed enough to eliminate ambiguity for developers in different time zones"
    ],
    learnings: [
      "Comprehensive design systems eliminate 80% of back-and-forth with development teams, dramatically accelerating delivery",
      "Over-communication in design documentation is never wasted—what seems obvious to designers often isn't to developers",
      "Reusable component libraries must be exhaustively documented with states, variants, and edge cases to be truly effective",
      "Working with offshore teams requires anticipating questions before they arise through detailed specifications",
      "Design systems are living documents—version control and update protocols are as important as initial creation"
    ],
    githubUrl: null, // Proprietary enterprise project
    liveUrl: "https://apps.apple.com/us/app/vistana-signature-experiences/id1342705498",
    featured: true,
    metrics: {
      users: "500K+",
      components: "200+",
      //brands: "3"
    },
    role: "Lead UI/UX Designer & Design System Architect",
    year: "2019",
    tech: [
      { name: "Photoshop", icon: "fab fa-photoshop" },
      { name: "Illustrator", icon: "fab fa-illustrator" },
      { name: "InDesign", icon: "fab fa-indesign" },
      { name: "Design Systems", icon: "fas fa-layer-group" },
      { name: "Sketch", icon: "fab fa-sketch" },
      { name: "InVision", icon: "fas fa-mobile-alt" },
    ],
  },
  {
    title: "Virtued Online - Virtual Tutoring Platform",
    img: "/images/portfolio/projects/virtued-1.png",
    desc: "Full-stack React tutoring platform rescued from near-failure and delivered in 7 months with complete framework rebuild.",
    fullDesc: "VirtuedOnline is a virtual tutoring platform that reimagines and elevates the online learning experience. Through live, interactive sessions, the platform connects students with skilled educators in a seamless digital ecosystem—offering tutoring, personalized learning paths, and on-demand support—all wrapped in a responsive, intuitive interface. Its mission centers on accessibility and innovation, striving to create an environment where learners can thrive regardless of location. The product itself is built with modern web technologies that prioritize speed, reliability, and ease of use.\n\nWhen I joined the project, it was at risk of being shelved—after more than a year in development, the existing framework was failing to deliver results. As Project Lead and Lead Front-End Developer, I implemented a comprehensive project plan in Jira that brought clarity, accountability, and measurable progress. Simultaneously, I designed and developed a completely new front-end React framework to replace the faltering one, and within just seven months, transformed the project into a fully fledged virtual tutoring app—on time, on spec, and ready for users. \n\n Due to NDA agreements, I am unable to share the live site or codebase, but I can provide detailed insights into the technologies and methodologies used.",
    problem: "After more than a year in development, the virtual tutoring platform was at risk of being shelved. The existing framework was failing to deliver results, leaving stakeholders frustrated and questioning the project's viability. There was no clear project roadmap, limited accountability across teams, and mounting technical debt that made progress nearly impossible.\n\nThe platform needed to support live video tutoring sessions, user authentication, scheduling, payment processing, and a comprehensive admin dashboard—all while maintaining performance and scalability. Without intervention, the project would have been abandoned, representing significant lost investment and opportunity.",
    secimg: "/images/portfolio/projects/virtued-2.png",
    addimg: "",
    deliverables:
      "Virtued Online has become a contender in the virtual tutoring world that allows certified teachers to focus more on tutoring while allowing the platform to handle the business side of the teachers side hustle.\n\nDeliverables were: Project Managment and Documentation, UI/UX Design/ Development, Prototyping, User stories and flows, HTML/CSS/JS templating, React Development",
    challenges: [
      "Inheriting a failing codebase with over a year of technical debt and poor architecture decisions",
      "Establishing project management processes and accountability across distributed teams with no existing framework",
      "Building a complete React framework from scratch while maintaining feature parity with original specs",
      "Integrating real-time video streaming, secure payment processing, and complex scheduling logic",
      "Delivering a production-ready platform in 7 months despite starting from ground zero",
      "Managing stakeholder expectations while rebuilding trust in the project's viability"
    ],
    learnings: [
      "Sometimes the best path forward is a complete rebuild rather than trying to salvage broken architecture",
      "Clear project management frameworks (Jira, sprint planning, daily standups) can transform team productivity overnight",
      "Stakeholder communication and transparency are just as important as technical execution in rescuing failing projects",
      "Modern React patterns and component architecture enable rapid development when properly structured",
      "Technical leadership means making hard decisions quickly and standing behind them with execution"
    ],
    githubUrl: null, // NDA restrictions
    liveUrl: null, // NDA restrictions
    featured: true,
    metrics: {
      delivery: "7 months",
      rebuild: "100%"
    },
    role: "Project Lead & Lead Front-End Developer",
    year: "2020",
    tech: [
      {
        name: "React",
        icon: "fab fa-react",
      },
      {
        name: "JavaScript",
        icon: "fab fa-js",
      },
      {
        name: "HTML5",
        icon: "fab fa-html5",
      },
      {
        name: "CSS3",
        icon: "fab fa-css3-alt",
      },
      {
        name: "Sass",
        icon: "fab fa-sass",
      },
      {
        name: "Bootstrap",
        icon: "fab fa-bootstrap",
      },
      {
        name: "Figma",
        icon: "fab fa-figma",
      },
      {
        name: "Git",
        icon: "fab fa-git-alt",
      },
      {
        name: "Gulp",
        icon: "fab fa-gulp",
      },
      {
        name: "Photoshop",
        icon: "fab fa-photoshop",
      },
    ],
  },
  {
    title: "Time 2 Visit - Travel Booking Platform",
    img: "/images/portfolio/projects/time2visit-1.png",
    desc: "Vue.js travel platform rebuilt from static HTML to fully functional booking system with automated workflows.",
    fullDesc: "Time 2 Visit is a travel platform that specializes in discounted vacation packages and hotel deals, connecting travelers with exclusive offers from resorts, hotels, and vacation clubs. The platform allows users to purchase open-dated travel packages, manage booking requests, and access important trip information such as confirmations and paperwork. With a user-friendly interface and integrated communication features, Time 2 Visit streamlines the booking process and provides a simple way for travelers to plan affordable getaways while partners promote their destinations through sponsored rates and campaigns.\n\nWhen I stepped into the project, it had been stalled and originally hardcoded in plain HTML rather than being properly developed on schedule. As Project Lead and Lead Front-End Developer, I restructured the effort by introducing a project plan in Jira while keeping development moving forward simultaneously. I implemented a full front-end templating system in Vue.js with PHP as the backend, building reusable, scalable components for destination and hotel displays, booking flows, confirmations, and automated email notifications. Beyond development, I also designed and developed ad campaigns and UI mockups, ensuring that the product not only functioned smoothly but also delivered a polished, market-ready experience.",
    secimg: "/images/portfolio/projects/time2visit-2.png",
    addimg: "",
    deliverables:
      "By restructuring the development process and implementing a modern Vue.js front-end with a PHP backend, the Time 2 Visit platform was successfully transformed from a static, hardcoded site into a fully functional travel booking application. The project was put back on schedule and delivered within the set timeframe, resulting in a scalable, user-friendly system capable of handling bookings, confirmations, and automated communications. The improved interface and campaign materials directly contributed to stronger user engagement and a professional market presence.\n\nKey deliverables included a reusable front-end templating system built in Vue.js, integrated booking and confirmation workflows, automated email confirmation templates, and account management features. I also delivered complete UI mockups for travel destination and hotel displays, as well as designed and developed digital ad campaigns to support the platform’s launch and marketing initiatives. Together, these deliverables provided both the technical foundation and the polished presentation needed for the platform’s success.",
    featured: true,
    metrics: {
      timeline: "On schedule",
      automation: "Full system"
    },
    role: "Project Lead & Lead Front-End Developer",
    year: "2018",
    tech: [
      {
        name: "JavaScript",
        icon: "fab fa-js",
      },
      {
        name: "HTML5",
        icon: "fab fa-html5",
      },
      {
        name: "CSS3",
        icon: "fab fa-css3-alt",
      },
      {
        name: "Sass",
        icon: "fab fa-sass",
      },
      {
        name: "Bootstrap",
        icon: "fab fa-bootstrap",
      },
      {
        name: "Git",
        icon: "fab fa-git-alt",
      },
      {
        name: "Gulp",
        icon: "fab fa-gulp",
      },
      {
        name: "Vue.js",
        icon: "fab fa-vuejs",
      },
      {
        name: "PHP",
        icon: "fab fa-php",
      },
      {
        name: "Illustrator",
        icon: "fab fa-illustrator",
      },
      {
        name: "Photoshop",
        icon: "fab fa-photoshop",
      },
    ],
  },
  {
    title: "Andor Health - Virtual Healthcare App",
    img: "/images/portfolio/projects/andor.png",
    desc: "Healthcare platform with admin, physician, and patient dashboards designed to streamline communications and clinical workflows.",
    secimg: "/images/portfolio/projects/andor-2.png",
    addimg: "",
    deliverables:
      "The redesign and front-end work significantly improved usability and engagement across all user types. Admins could more easily monitor system metrics and user activity, physicians benefited from streamlined workflows for patient messaging and data review, and patients found the dashboard clear, responsive, and motivating. Overall, the platform achieved better alignment with user needs, resulting in fewer support requests, smoother interactions, and enhanced trust among users.\n\nDeliverables included high-fidelity mockups and interactive prototypes, implemented responsive React dashboards with key features like messaging and data visualizations, and documented user flows and use cases to guide development and QA.\n\n Due to NDA agreements, I am unable to share the live site or codebase, but I can provide detailed insights into the technologies and methodologies used.",
    featured: false,
    tech: [
      {
        name: "React",
        icon: "fab fa-react",
      },
      {
        name: "JavaScript",
        icon: "fab fa-js",
      },
      {
        name: "HTML5",
        icon: "fab fa-html5",
      },
      {
        name: "CSS3",
        icon: "fab fa-css3-alt",
      },
      {
        name: "Sass",
        icon: "fab fa-sass",
      },
      {
        name: "Git",
        icon: "fab fa-git-alt",
      },
      {
        name: "Illustrator",
        icon: "fab fa-illustrator",
      },
      {
        name: "Photoshop",
        icon: "fab fa-photoshop",
      },
      {
        name: "InVision",
        icon: "fab fa-invision",
      },
      {
        name: "Tailwind CSS",
        icon: "fab fa-tailwind",
      },
    ],
  },
  {
    title: "Saveur - Cooking Site",
    img: "images/portfolio/projects/saveur.png",
    desc: "Led complete Drupal migration and created modular SCSS framework that became the foundation for all future brand deployments.",
    secimg: "images/portfolio/projects/saveur-1.png",
    addimg: "",
    deliverables: `Saveur became the flagship site for all subsequent brand migrations to the latest version of Drupal. I led the complete front-end redevelopment, architecting a modular SCSS system that evolved into a scalable front-end framework—still in use today—enabling rapid deployment and consistent UI implementation across brands. This foundation streamlined future development cycles and standardized design execution throughout the organization.

Deliverables were: UI Development, Front-end Architecture, Drupal, Theming & Template Integration, Performance Optimization, Responsive Design, Accessibility Compliance`,
    featured: !1,
    tech: [
      { name: "JavaScript", icon: "fab fa-js" },
      { name: "HTML5", icon: "fab fa-html5" },
      { name: "CSS3", icon: "fab fa-css3-alt" },
      { name: "Sass", icon: "fab fa-sass" },
      { name: "Git", icon: "fab fa-git-alt" },
      { name: "PHP", icon: "fab fa-php" },
      { name: "Drupal", icon: "fab fa-drupal" },
    ],
  },
  {
    title: "Popular Science - Editorial Site",
    img: "images/portfolio/projects/popsci.png",
    desc: "Led front-end redevelopment of Popular Science during Drupal migration with modular SCSS architecture and optimized performance.",
    secimg: "images/portfolio/projects/popsci-1.png",
    addimg: "",
    deliverables: `The new front-end architecture significantly improved site performance, scalability, and development efficiency. The modular SCSS system enabled faster updates, easier maintenance, and consistent UI implementation across multiple templates—resulting in a smoother editorial workflow and an enhanced user experience.

Deliverables were: UI Development, Front-End Architecture, Drupal Theming, Modular SCSS Framework, Responsive Design Implementation, Performance Optimization, Accessibility Compliance, Cross-Browser Testing, Component Documentation, Code Optimization`,
    featured: !1,
    tech: [
      { name: "HTML5", icon: "fab fa-html5" },
      { name: "CSS3", icon: "fab fa-css3-alt" },
      { name: "Sass", icon: "fab fa-sass" },
      { name: "Drupal", icon: "fab fa-drupal" },
      { name: "Git", icon: "fab fa-git-alt" },
      { name: "PHP", icon: "fab fa-php" },
    ],
  },
];

export const designShowcase = [
  {
    id: 1,
    title: "Vistana Mobile App - Ownership Portal",
    category: "Mobile App Design",
    image: "/images/portfolio/mobile/vistana-signature-experiences-connect-ownership.png",
    description: "Designed comprehensive ownership dashboard allowing members to view balances, benefits, and StarOptions in a clean, accessible interface.",
    tags: ["Mobile UI", "Design System", "User Portal"]
  },
  {
    id: 2,
    title: "Vistana Mobile App - Destinations",
    category: "Mobile App Design",
    image: "/images/portfolio/mobile/vistana-signature-experiences-destinations.png",
    description: "Created imagery-driven destination browser with seamless navigation and inspirational photography to drive engagement.",
    tags: ["Mobile UI", "Visual Design", "Navigation"]
  },
  {
    id: 3,
    title: "Vistana Mobile App - Profile Management",
    category: "Mobile App Design",
    image: "/images/portfolio/mobile/vistana-signature-experiences-profile.png",
    description: "Built intuitive profile management system with clear information hierarchy and easy access to account settings.",
    tags: ["Mobile UI", "User Settings", "Forms"]
  },
  {
    id: 4,
    title: "Time2Visit - Credit Card Payment Modal",
    category: "Interaction Prototype",
    image: "/images/portfolio/mockups/time2visit-credit-card-modal.png",
    description: "Designed secure payment modal with clear visual feedback and error handling for seamless checkout experience.",
    tags: ["UI Components", "Forms", "Payment Flow"]
  },
  {
    id: 5,
    title: "Time2Visit - Package Confirmation",
    category: "Wireframe to High-Fidelity",
    image: "/images/portfolio/mockups/time2visit-package-confirmation.jpg",
    description: "Developed confirmation flow from low-fidelity wireframes to polished UI with clear call-to-actions and booking details.",
    tags: ["Wireframes", "Visual Design", "Booking Flow"]
  },
  {
    id: 6,
    title: "LG Rewards Me - Social Layout",
    category: "Component Design",
    image: "/images/portfolio/mockups/lg-rewards-me-social-layout.jpg",
    description: "Created modular social feed components with card-based design and flexible content layouts for rewards platform.",
    tags: ["Components", "Social Features", "Card Design"]
  },
  {
    id: 7,
    title: "Paetec Rewards Program",
    category: "Figma Preview",
    image: "/images/portfolio/mockups/paetec-rewards-program.jpg",
    description: "Designed comprehensive rewards program interface with tier visualization and point tracking system.",
    tags: ["Figma", "Visual Design", "Dashboard"]
  },
  {
    id: 8,
    title: "Time2Visit - Package Booking Page",
    category: "High-Fidelity UI",
    image: "/images/portfolio/mockups/time2visit-package-page.jpg",
    description: "Built detailed package booking interface with image galleries, pricing breakdowns, and seamless booking flow.",
    tags: ["UI Design", "E-commerce", "Visual Hierarchy"]
  },
  {
    id: 9,
    title: "American Concept & Design",
    category: "Figma Preview",
    image: "/images/portfolio/mockups/american-concept-and-design.png",
    description: "Corporate website design featuring clean typography, professional imagery, and service-focused layouts.",
    tags: ["Figma", "Corporate Design", "Web Layout"]
  }
];

export const galleryTabs = [
  {
    key: "mobile",
    label: "Mobile App Design",
    icon: "fas fa-mobile-alt",
    images: [
      "/images/portfolio/mobile/vistana-signature-experiences-connect-ownership-600px.png",
      "/images/portfolio/mobile/vistana-signature-experiences-destinations-600px.png",
      "/images/portfolio/mobile/vistana-signature-experiences-profile-600px.png",
      "/images/portfolio/mobile/vistana-signature-experiences-splash-600px.png",
      "/images/portfolio/mobile/vistana-signature-experiences-vacation-life-600px.png",
      "/images/portfolio/mobile/vistana-signature-experiences-vacations-600px.png",
    ],
  },
  {
    key: "mockups",
    label: "Mockups",
    icon: "fas fa-desktop",
    images: [
      "/images/portfolio-optimized/mockups/time2visit-credit-card-modal-1600.webp",
      "/images/portfolio-optimized/mockups/lg-rewards-me-social-layout-1600.webp",
      "/images/portfolio-optimized/mockups/time2visit-package-popup-1600.webp",
      "/images/portfolio-optimized/mockups/paetec-rewards-alt-1600.webp",
      "/images/portfolio-optimized/mockups/paetec-rewards-form-1600.webp",
      "/images/portfolio-optimized/mockups/paetec-rewards-program-1600.webp",
      "/images/portfolio-optimized/mockups/paetec-rewards-1600.webp",
      "/images/portfolio-optimized/mockups/time2visit-package-confirmation-1600.webp",
      "/images/portfolio-optimized/mockups/time2visit-subscribe-ad-1600.webp",
      "/images/portfolio-optimized/mockups/time2visit-package-booked-1600.webp",
      "/images/portfolio-optimized/mockups/time2visit-package-page-1600.webp",
      "/images/portfolio-optimized/mockups/time2visit-top-packages-1600.webp",
      "/images/portfolio-optimized/mockups/american-concept-and-design-1600.webp",
      "/images/portfolio-optimized/mockups/maximum-booking-home-1600.webp",
      "/images/portfolio-optimized/mockups/vistana-signature-experiences-better-way-1600.webp",
    ],
  },
  {
    key: "design",
    label: "Design",
    icon: "fas fa-paint-brush",
    images: [
      "/images/portfolio/design/2-0-ball.jpg",
      "/images/portfolio/design/abstract-nature-wallpaper.jpg",
      "/images/portfolio/design/future-planet.jpg",
      "/images/portfolio/design/glass-ball.jpg",
      "/images/portfolio/design/green-latern-wp.jpg",
      "/images/portfolio/design/greenwell-home-inspections-logo.png",
      "/images/portfolio/design/land-after-time_0.jpg",
      "/images/portfolio/design/msi-amd-am4.jpg",
      "/images/portfolio/design/sway-palm.jpg",
      "/images/portfolio/design/text-glow.jpg",
      "/images/portfolio/design/f1ss1on-logo.png",
      "/images/portfolio/design/dualtacular-logo.png",
      "/images/portfolio/design/team-divinity-logo.png",
      "/images/portfolio/design/artic-soundfeatured-image.jpg",
      "/images/portfolio/design/athlon-200g-featured-image.jpg",
      "/images/portfolio/design/corsair-h100i-rgb-featured-image.jpg",
    ],
  },
];

// ============================================================================
// GITHUB PROJECTS
// ============================================================================

export const githubProjects = [
  {
    id: 1,
    name: "JS Learning Lab",
    description: "A collection of JavaScript exercises, tutorials, and experiments for learning core concepts and modern practices",
    url: "https://github.com/SyntaxSidekick/js-learning-lab",
    liveUrl: "https://syntaxsidekick.github.io/js-learning-lab",
    thumbnail: "/images/portfolio/github/js-learning-lab.png",
    topics: ["JavaScript", "Learning", "Tutorials", "ES6+"],
    language: "JavaScript",
    icon: "fab fa-js"
  },
  {
    id: 2,
    name: "HistoriSnap",
    description: "Interactive historical timeline application with snapshot visualizations and educational content",
    url: "https://github.com/SyntaxSidekick/historisnap",
    liveUrl: "https://syntaxsidekick.github.io/historisnap",
    thumbnail: "/images/portfolio/github/historiSnap.png",
    topics: ["React", "History", "Visualization", "Education"],
    language: "JavaScript",
    icon: "fab fa-react"
  },
  {
    id: 3,
    name: "Vanilla Card Slider",
    description: "Lightweight, dependency-free card carousel component built with pure JavaScript",
    url: "https://github.com/SyntaxSidekick/vanilla-cardSlider",
    liveUrl: "https://syntaxsidekick.github.io/vanilla-cardSlider",
    thumbnail: "/images/portfolio/github/vanilla-cardSlider.png",
    topics: ["JavaScript", "Carousel", "UI Component", "Vanilla JS"],
    language: "JavaScript",
    icon: "fab fa-js"
  },
  {
    id: 4,
    name: "Flash Cards",
    description: "Interactive flashcard application for studying and memorization with spaced repetition",
    url: "https://github.com/SyntaxSidekick/flash-cards",
    liveUrl: "https://syntaxsidekick.github.io/flash-cards",
    thumbnail: "/images/portfolio/github/flash-cards.png",
    topics: ["React", "Education", "Learning Tool", "SPA"],
    language: "JavaScript",
    icon: "fab fa-react"
  },
  {
    id: 5,
    name: "Video Carousel",
    description: "Responsive video carousel component with controls, autoplay, and lazy loading",
    url: "https://github.com/SyntaxSidekick/video-carousel",
    liveUrl: "https://syntaxsidekick.github.io/video-carousel",
    thumbnail: "/images/portfolio/github/video-carousel.png",
    topics: ["JavaScript", "Video", "Carousel", "Media"],
    language: "JavaScript",
    icon: "fab fa-js"
  },
  {
    id: 6,
    name: "Modern Card Collection",
    description: "Collection of modern, responsive card components with various styles and animations",
    url: "https://github.com/SyntaxSidekick/modern-card-collection",
    liveUrl: "https://syntaxsidekick.github.io/modern-card-collection",
    thumbnail: "/images/portfolio/github/modern-card-collection.png",
    topics: ["CSS", "UI Components", "Animations", "Responsive"],
    language: "CSS",
    icon: "fab fa-css3-alt"
  }
];

// ============================================================================
// CODEPEN EXPERIMENTS
// ============================================================================

export const codepenProjects = [
  {
    id: 1,
    title: "Interactive Component",
    description: "Creative UI experiment with animations and interactions",
    url: "https://codepen.io/SyntaxSidekick/pen/myVXvdQ",
    embedUrl: "https://codepen.io/SyntaxSidekick/embed/myVXvdQ?default-tab=result",
    tags: ["Animation", "Interactive", "UI"],
    featured: true
  },
  {
    id: 2,
    title: "Creative Animation",
    description: "Exploring modern CSS animations and transitions",
    url: "https://codepen.io/SyntaxSidekick/pen/WbrMgJW",
    embedUrl: "https://codepen.io/SyntaxSidekick/embed/WbrMgJW?default-tab=result",
    tags: ["CSS", "Animation", "Design"],
    featured: true
  },
  {
    id: 3,
    title: "UI Component",
    description: "Interactive UI component with smooth transitions",
    url: "https://codepen.io/SyntaxSidekick/pen/KwVeLmY",
    embedUrl: "https://codepen.io/SyntaxSidekick/embed/KwVeLmY?default-tab=result",
    tags: ["JavaScript", "UI", "Interactive"],
    featured: true
  },
  {
    id: 4,
    title: "Visual Effect",
    description: "Creative visual effect using CSS and JavaScript",
    url: "https://codepen.io/SyntaxSidekick/pen/GgoGqyK",
    embedUrl: "https://codepen.io/SyntaxSidekick/embed/GgoGqyK?default-tab=result",
    tags: ["CSS", "JavaScript", "Effects"],
    featured: true
  },
  {
    id: 5,
    title: "Interactive Demo",
    description: "Experimental interaction with modern web technologies",
    url: "https://codepen.io/SyntaxSidekick/pen/JoGZKOa",
    embedUrl: "https://codepen.io/SyntaxSidekick/embed/JoGZKOa?default-tab=result",
    tags: ["Interactive", "Demo", "Web"],
    featured: true
  },
  {
    id: 6,
    title: "Animation Showcase",
    description: "Showcasing advanced animation techniques and timing",
    url: "https://codepen.io/SyntaxSidekick/pen/MYaZoRG",
    embedUrl: "https://codepen.io/SyntaxSidekick/embed/MYaZoRG?default-tab=result",
    tags: ["Animation", "CSS", "Showcase"],
    featured: true
  }
];

// ============================================================================
// CASE STUDIES
// ============================================================================

export const caseStudies = [
  {
    id: "virtued-modernization",
    title: "VirtuedOnline Platform Modernization",
    subtitle: "Modernizing a Learning & Coaching Platform Through Scalable Front-End Architecture and UX Engineering",
    category: "UX Engineering",
    tags: ["Front-End Architecture", "UX Engineering", "Performance", "Accessibility"],
    thumbnail: "/images/portfolio/projects/virtued-1.png",
    featured: true,
    
    summary: "VirtuedOnline needed a cleaner, more intuitive, and scalable front-end to support their growing platform. I led the front-end engineering and UX modernization efforts, focusing on improving usability, redesigning core flows, and implementing a more maintainable and high-performance interface architecture.",
    
    challenge: {
      title: "The Challenge",
      content: `VirtuedOnline was expanding quickly, but the UI was held back by:

• Outdated front-end structure with legacy patterns and frameworks
• Inconsistent UI patterns across different sections and pages
• Limited scalability for implementing new features without breaking existing functionality
• Performance bottlenecks causing slow page loads and poor user experience
• Accessibility gaps and inconsistent interaction patterns failing WCAG standards
• Hard-to-maintain CSS and scattered components making updates time-consuming

The team needed a modern, cohesive UI foundation that would allow them to iterate faster without compromising quality.`
    },
    
    role: {
      title: "My Role",
      position: "Senior Front-End Engineer / UX Engineer",
      responsibilities: [
        "Rebuilding UI components into a modern, scalable architecture",
        "Improving key user flows and removing UX friction",
        "Establishing consistent interaction patterns",
        "Implementing accessibility best practices (WCAG-focused)",
        "Optimizing performance across the entire front-end",
        "Collaborating with leadership and product teams to align UX with business goals"
      ]
    },
    
    approach: [
      {
        title: "UI/UX Audit & Information Architecture Review",
        description: "Performed a full audit of the platform's UI components, flows, and design inconsistencies.",
        deliverables: [
          "Component inventory and pattern analysis",
          "Interaction design issues documentation",
          "Performance bottleneck analysis",
          "Recommendations for navigation and layout patterns"
        ]
      },
      {
        title: "Modern Component-Based Architecture",
        description: "Rebuilt the front-end structure using a component-driven approach.",
        deliverables: [
          "Consolidated duplicated UI patterns into reusable components",
          "Established layout templates and interaction models",
          "Created architecture allowing team to add features without breaking existing UI",
          "Implemented clear naming conventions and modular Sass architecture"
        ]
      },
      {
        title: "Experience Design Improvements",
        description: "Redesigned critical areas of the platform to reduce cognitive load and improve usability.",
        areas: [
          "Dashboard layouts",
          "Course/lesson views",
          "Coaching and communication tools",
          "Profile and settings flows",
          "Payment and subscription interactions"
        ],
        goals: [
          "Reducing cognitive load",
          "Improving visual hierarchy",
          "Making navigation predictable",
          "Adding consistent spacing, alignment, and responsivity"
        ]
      },
      {
        title: "Accessibility Enhancements",
        description: "Ensured an inclusive platform meeting WCAG 2.1 AA standards.",
        improvements: [
          "Improved semantic HTML structure",
          "Added proper ARIA labels and roles where needed",
          "Implemented keyboard navigation and focus management",
          "Improved color contrast ratios",
          "Ensured forms, modals, and interactive elements were fully accessible"
        ]
      },
      {
        title: "Performance Optimization",
        description: "Improved platform performance through strategic refactoring and optimization.",
        optimizations: [
          "Refactored heavy scripts and reduced bundle sizes",
          "Reduced DOM complexity",
          "Optimized image assets and implemented lazy loading",
          "Improved CSS for faster rendering",
          "Cleaned up unused code and dependencies"
        ]
      },
      {
        title: "Collaboration & Documentation",
        description: "Created comprehensive documentation to ensure long-term maintainability.",
        documentation: [
          "Component documentation and usage guidelines",
          "Code standards and best practices",
          "Reusable templates for UI patterns",
          "Guidelines for spacing, typography, and component usage"
        ]
      }
    ],
    
    results: [
      {
        title: "Faster Development Velocity",
        description: "Reusable components and cleaner architecture reduced development time for new features."
      },
      {
        title: "Improved Usability and Engagement",
        description: "Refined flows and modern UI patterns made the platform easier for users to navigate and understand."
      },
      {
        title: "Stronger Design Consistency",
        description: "Users experienced predictable interactions and visuals across all parts of the platform."
      },
      {
        title: "Accessibility Compliance",
        description: "Platform moved significantly closer to WCAG AA, reducing friction for keyboard and assistive-tech users."
      },
      {
        title: "Performance Improvements",
        description: "Reduced load times and improved perceived performance across core pages."
      },
      {
        title: "Easier Long-Term Maintenance",
        description: "Clear patterns and documentation reduced tech debt and made the UI future-proof."
      }
    ],
    
    conclusion: "My work on VirtuedOnline brought modern engineering practices, improved UX foundation, and scalable UI architecture to a platform that continues to grow. By combining front-end development with UX engineering, I helped create a cleaner, more accessible, and more maintainable experience for users and developers alike.",
    
    tech: [
      { name: "React", icon: "fab fa-react" },
      { name: "Sass", icon: "fab fa-sass" },
      { name: "JavaScript", icon: "fab fa-js" },
      { name: "WCAG 2.1", icon: "fas fa-universal-access" },
      { name: "Performance", icon: "fas fa-tachometer-alt" }
    ],
    
    year: "2020-2021",
    duration: "6 months"
  }
];

