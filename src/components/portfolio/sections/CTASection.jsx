import { SocialLinks } from "../../common";

const CTASection = () => {
  return (
    <section className="portfolio-cta-section" aria-labelledby="cta-heading">
      <div className="cta-card">
        <h2 id="cta-heading">Let's Build Something Great</h2>
        <p>Interested in collaboration, front-end engineering, or design systems? Let's connect and discuss your next project.</p>
        <SocialLinks variant="cta" />
      </div>
    </section>
  );
};

export default CTASection;
