import { Link } from "react-router-dom";

const Footer = () => (
  <footer id="footer" className="site-footer" role="contentinfo">
    <div className="container">
      <div className="site-branding">
        {/* If you want this to route internally, use Link. Otherwise, keep as <a> for external. */}
        <Link to="/home" className="logo" aria-label="Riad Kilani Home" title="Riad Kilani - Front-end Developer">
          <span className="site-title">Riad Kilani</span>
          <span className="site-description">Front-End Developer</span>
        </Link>
      </div>
      <div className="footer-contact">
        <div className="socials">
          <a href="https://www.linkedin.com/in/riad-kilani/" target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile"><i className="fa-brands fa-linkedin" aria-hidden="true"></i></a>
          <a href="https://github.com/f1ss1on" target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile"><i className="fa-brands fa-github" aria-hidden="true"></i></a>
          <a href="https://x.com/f1ss1on" target="_blank" rel="noopener noreferrer" aria-label="Follow me on X (Twitter)"><i className="fa-brands fa-x-twitter" aria-hidden="true"></i></a>
          <a href="https://codepen.io/f1ss1on" target="_blank" rel="noopener noreferrer" aria-label="View my CodePen projects"><i className="fa-brands fa-codepen" aria-hidden="true"></i></a>
        </div>
      </div>      
    </div>
    <div className="copyright">© {new Date().getFullYear()} Riad Kilani. All rights reserved.</div>
  </footer>
);

export default Footer; 