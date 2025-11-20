import { Link } from "react-router-dom";
import { SocialLinks } from "./common";

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
        <SocialLinks variant="footer" />
      </div>      
    </div>
    <div className="copyright">© {new Date().getFullYear()} Riad Kilani. All rights reserved.</div>
  </footer>
);

export default Footer; 