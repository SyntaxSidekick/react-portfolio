import React from "react";
import { SectionHeader, ContactInfoCard } from "../../common";
import { useContactForm } from "../../contact/useContactForm";
import FormStatus from "../../contact/FormStatus";

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
  const {
    state,
    statusRef,
    captchaQuestion,
    setCaptchaAnswer,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit
  } = useContactForm('home');

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

          <div className="contact-form-wrapper mini-contact-form" aria-labelledby="home-contact-form-title">
            <h3 id="home-contact-form-title" className="form-title">Quick Message</h3>
            <FormStatus ref={statusRef} status={state.submitStatus} />
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="website-home">Website</label>
                <input
                  type="text"
                  id="website-home"
                  name="website"
                  value={state.formData.website}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="home-name">Name <span className="required">*</span></label>
                <input
                  id="home-name"
                  name="name"
                  type="text"
                  value={state.formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  aria-invalid={!!state.errors.name}
                  aria-describedby={state.errors.name ? 'home-name-error' : undefined}
                  placeholder="Your name"
                  className="form-control"
                  disabled={state.isSubmitting}
                  required
                />
                {state.errors.name && <div id="home-name-error" className="field-error">{state.errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="home-email">Email <span className="required">*</span></label>
                <input
                  id="home-email"
                  name="email"
                  type="email"
                  value={state.formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={!!state.errors.email}
                  aria-describedby={state.errors.email ? 'home-email-error' : undefined}
                  placeholder="you@example.com"
                  className="form-control"
                  disabled={state.isSubmitting}
                  required
                />
                {state.errors.email && <div id="home-email-error" className="field-error">{state.errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="home-message">Message <span className="required">*</span></label>
                <textarea
                  id="home-message"
                  name="message"
                  rows="4"
                  value={state.formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  aria-invalid={!!state.errors.message}
                  aria-describedby={state.errors.message ? 'home-message-error' : undefined}
                  placeholder="Brief project overview..."
                  className="form-control"
                  disabled={state.isSubmitting}
                  required
                />
                {state.errors.message && <div id="home-message-error" className="field-error">{state.errors.message}</div>}
              </div>

              {captchaQuestion && (
                <div className="form-group captcha-group">
                  <label htmlFor="home-captcha">Anti-spam: {captchaQuestion}</label>
                  <input
                    id="home-captcha"
                    name="captcha"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => setCaptchaAnswer(e.target.value.trim())}
                    className="form-control captcha-input"
                    disabled={state.isSubmitting}
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn-primary btn-submit"
                disabled={state.isSubmitting || !captchaQuestion}
                aria-disabled={state.isSubmitting || !captchaQuestion}
                aria-busy={state.isSubmitting}
              >
                <i className="fas fa-paper-plane" aria-hidden="true"></i>
                {state.isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
