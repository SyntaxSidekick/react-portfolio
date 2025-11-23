import React from "react";
import { SectionHeader, SocialLinks } from "../../common";

const ConnectSection = () => {
  return (
    <section className="bio-connect-section" aria-labelledby="connect-heading">
      <SectionHeader
        id="connect-heading"
        title="Let's Connect"
        subtitle="If you're interested in front-end engineering, design systems, or accessible UI development, let's connect. I share work, insights, and experiments across the platforms below."
      />
      <div className="section-content">
        <div className="bio-connect">
          <SocialLinks variant="connect" />
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
