import React from "react";
import { SectionHeader, ContactInfoCard } from "../../common";

const CONTACT_INFO = [
  {
    icon: "fab fa-linkedin",
    title: "Connect on LinkedIn",
    description: "Let's grow our network",
    link: "https://www.linkedin.com/in/riadkilani",
    linkText: "linkedin.com/in/riadkilani"
  },
  {
    icon: "fab fa-github",
    title: "GitHub",
    description: "Check out my repositories",
    link: "https://github.com/f1ss1on",
    linkText: "github.com/f1ss1on"
  }
];

const ContactSection = () => {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader 
          badge="Let's Connect"
          title="Get In Touch"
          subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
          id="contact-title"
          animate={false}
        />

        <div className="contact-grid">
          <div className="contact-info">
            {CONTACT_INFO.map((info, idx) => (
              <ContactInfoCard key={idx} {...info} />
            ))}
          </div>

          <div className="contact-form-wrapper">
            <h3 className="form-title">Send a Message</h3>
            <form className="contact-form" method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
              <div className="form-group">
                <label htmlFor="name">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="What's this about?"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  placeholder="Tell me about your project or inquiry..."
                  className="form-control"
                ></textarea>
              </div>

              <button type="submit" className="btn-primary btn-submit">
                <i className="fas fa-paper-plane" aria-hidden="true"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
