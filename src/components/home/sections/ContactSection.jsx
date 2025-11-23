import { SectionHeader, SocialLinks } from "../../common";
import { useContactForm } from "../../contact/useContactForm";
import ContactForm from "../../contact/ContactForm";

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
          <SocialLinks variant="connect" />

          <ContactForm 
            state={state}
            statusRef={statusRef}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            captchaQuestion={captchaQuestion}
            setCaptchaAnswer={setCaptchaAnswer}
            isSubmitting={state.isSubmitting}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
