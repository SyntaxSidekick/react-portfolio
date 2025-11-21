import React from "react";
import { motion } from "framer-motion";
import FormField from "./FormField";
import FormStatus from "./FormStatus";

const FORM_FIELDS = [
  { 
    name: "name", 
    type: "text", 
    label: "Name", 
    autoComplete: "name",
    helpText: "Enter your full name",
    minLength: 2
  },
  { 
    name: "email", 
    type: "email", 
    label: "Email", 
    autoComplete: "email",
    helpText: "Enter a valid email address"
  },
  { 
    name: "message", 
    type: "textarea", 
    label: "Message",
    helpText: "Enter your message, minimum 10 characters",
    minLength: 10,
    rows: 5
  }
];

const PaperPlaneIcon = React.memo(() => (
  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
));
PaperPlaneIcon.displayName = "PaperPlaneIcon";

const ContactForm = ({ 
  state, 
  statusRef,
  handleChange, 
  handleFocus, 
  handleBlur, 
  handleSubmit,
  captchaQuestion,
  setCaptchaAnswer,
  isSubmitting
}) => {
  return (
    <motion.section 
      className="contact-form-wrapper" 
      aria-labelledby="form-heading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 id="form-heading">Please fill out the form</h2>
      
      <FormStatus ref={statusRef} status={state.submitStatus} />
      
      <form 
        className="contact-form" 
        onSubmit={handleSubmit}
        aria-labelledby="form-heading"
        noValidate
      >
        {/* Honeypot field - hidden from users */}
        <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={state.formData.website}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        {FORM_FIELDS.map((field, index) => (
          <FormField
            key={field.name}
            field={field}
            index={index}
            value={state.formData[field.name]}
            focused={state.focused[field.name]}
            touched={state.touched[field.name]}
            error={state.errors[field.name]}
            isSubmitting={state.isSubmitting}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        ))}

        {/* Temporary math captcha */}
        {captchaQuestion && (
          <div className="form-field captcha-field">
            <label htmlFor="captcha" className="field-label">Anti-spam check</label>
            <div className="captcha-wrapper">
              <span className="captcha-question" aria-live="polite">{captchaQuestion}</span>
              <input
                type="text"
                id="captcha"
                name="captcha"
                inputMode="numeric"
                pattern="[0-9]*"
                className="captcha-input"
                onChange={(e) => setCaptchaAnswer(e.target.value.trim())}
                disabled={isSubmitting}
                aria-required="true"
              />
            </div>
            <small className="help-text">Prove you are human: solve the equation.</small>
          </div>
        )}

        <motion.button 
          type="submit" 
          className="submit-btn"
          aria-label="Send message to Riad Kilani"
          disabled={state.isSubmitting || !captchaQuestion}
          aria-disabled={state.isSubmitting || !captchaQuestion}
          aria-busy={state.isSubmitting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          whileHover={!state.isSubmitting ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
          whileTap={!state.isSubmitting ? { scale: 0.98 } : {}}
        >
          <span>{state.isSubmitting ? 'Sending...' : 'Send Message'}</span>
          <PaperPlaneIcon />
        </motion.button>
      </form>
    </motion.section>
  );
};

export default ContactForm;
