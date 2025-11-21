import React, { useState, useCallback } from "react";
import { PageHeader } from "../";

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/riad-kilani",
    className: "linkedin",
    icon: "fab fa-linkedin",
    label: "Connect with Riad Kilani on LinkedIn",
    name: "LinkedIn"
  },
  {
    href: "https://github.com/SyntaxSidekick",
    className: "github",
    icon: "fab fa-github",
    label: "View Riad Kilani's code on GitHub",
    title: "View Riad Kilani's open source projects and code on GitHub",
    name: "GitHub"
  },
  {
    href: "https://codepen.io/SyntaxSidekick",
    className: "codepen",
    icon: "fab fa-codepen",
    label: "See Riad Kilani's experiments on CodePen",
    title: "Explore Riad Kilani's front-end experiments and demos on CodePen",
    name: "CodePen"
  },
  {
    href: "https://x.com/syntaxsidekick",
    className: "twitter",
    icon: "fab fa-x-twitter",
    label: "Follow Riad Kilani on X (formerly Twitter)",
    title: "Follow Riad Kilani on X for web development insights and updates",
    name: "X (Twitter)"
  }
];

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  message: ''
};

const INITIAL_FIELD_STATE = {
  name: false,
  email: false,
  message: false
};

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [focused, setFocused] = useState(INITIAL_FIELD_STATE);
  const [touched, setTouched] = useState(INITIAL_FIELD_STATE);
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleFocus = useCallback((field) => {
    setFocused(prev => ({
      ...prev,
      [field]: true
    }));
  }, []);

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    setFocused(prev => ({
      ...prev,
      [field]: !!formData[field]
    }));
  }, [formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true
    });

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('Sending message...');
    
    // Form submission logic here
    console.log('Form submitted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('Message sent successfully!');
      setIsSubmitting(false);
      
      // Reset form after success
      setTimeout(() => {
        setFormData(INITIAL_FORM_STATE);
        setFocused(INITIAL_FIELD_STATE);
        setTouched(INITIAL_FIELD_STATE);
        setFormStatus('');
      }, 3000);
    }, 1000);
  }, [formData]);

  return (
    <main className="contact-page" aria-labelledby="contact-title">
      <PageHeader 
        title="Get In Touch"
        subtitle="Let’s Create Meaningful User Experiences"
      />
      
      <div className="contact-container">
        <div className="contact-grid">
          {/* Social Links - Stacked */}
          <nav className="social-links" aria-label="Social media links">
            {SOCIAL_LINKS.map((link) => (
              <a 
                key={link.className}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`social-link ${link.className}`}
                aria-label={link.label}
                title={link.label}
              >
                <i className={link.icon} aria-hidden="true"></i>
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          {/* Contact Form */}
          <section className="contact-form-wrapper" aria-labelledby="form-heading">
            <h2 id="form-heading">Please fill out the form</h2>
            {formStatus && (
              <div 
                className="form-status" 
                role="status" 
                aria-live="polite"
                aria-atomic="true"
              >
                {formStatus}
              </div>
            )}
            <form 
              className="contact-form" 
              onSubmit={handleSubmit}
              aria-labelledby="form-heading"
              noValidate
            >
              <div className={`form-field ${focused.name || formData.name ? 'focused' : ''} ${touched.name ? 'touched' : ''}`}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                  aria-required="true"
                  aria-describedby="name-help"
                  autoComplete="name"
                  disabled={isSubmitting}
                />
                <span id="name-help" className="visually-hidden">Enter your full name</span>
              </div>

              <div className={`form-field ${focused.email || formData.email ? 'focused' : ''} ${touched.email ? 'touched' : ''}`}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                  aria-required="true"
                  aria-describedby="email-help"
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                <span id="email-help" className="visually-hidden">Enter a valid email address</span>
              </div>

              <div className={`form-field ${focused.message || formData.message ? 'focused' : ''} ${touched.message ? 'touched' : ''}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  required
                  aria-required="true"
                  aria-describedby="message-help"
                  disabled={isSubmitting}
                ></textarea>
                <span id="message-help" className="visually-hidden">Enter your message, minimum 10 characters</span>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                aria-label="Send message to Riad Kilani"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Contact;
