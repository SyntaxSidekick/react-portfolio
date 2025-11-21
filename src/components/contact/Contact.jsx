import React, { useReducer, useCallback, useRef, useEffect } from "react";
import { PageHeader } from "../";
import SocialLinks from "./SocialLinks";
import ContactForm from "./ContactForm";

// ============================================================================
// CONSTANTS
// ============================================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ============================================================================
// REDUCER
// ============================================================================

const INITIAL_STATE = {
  formData: { name: '', email: '', message: '', website: '' },
  focused: { name: false, email: false, message: false },
  touched: { name: false, email: false, message: false },
  errors: { name: '', email: '', message: '' },
  isSubmitting: false,
  submitStatus: ''
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        }
      };
    
    case 'FOCUS_FIELD':
      return {
        ...state,
        focused: {
          ...state.focused,
          [action.field]: true
        }
      };
    
    case 'BLUR_FIELD':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true
        },
        focused: {
          ...state.focused,
          [action.field]: !!state.formData[action.field]
        }
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };
    
    case 'SET_ALL_TOUCHED':
      return {
        ...state,
        touched: { name: true, email: true, message: true }
      };
    
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting,
        submitStatus: action.status || state.submitStatus
      };
    
    case 'SET_SUBMIT_STATUS':
      return {
        ...state,
        submitStatus: action.status
      };
    
    case 'RESET':
      return INITIAL_STATE;
    
    default:
      return state;
  }
};


// ============================================================================
// VALIDATION
// ============================================================================

const validateField = (name, value) => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return '';
    
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
      return '';
    
    case 'message':
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
      return '';
    
    default:
      return '';
  }
};

// ============================================================================
// API INTEGRATION
// ============================================================================

const sendMessage = async (data) => {
  const resp = await fetch('/contact/send.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await resp.json();
  if (!resp.ok || !json.success) {
    const errorMsg = json.error || 'Unknown error';
    throw new Error(errorMsg);
  }
  return json;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Contact = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [csrf, setCsrf] = React.useState('');
  const [captchaQuestion, setCaptchaQuestion] = React.useState('');
  const [captchaAnswer, setCaptchaAnswer] = React.useState('');
    // Fetch CSRF + captcha on mount
    useEffect(() => {
      let active = true;
      fetch('/api/csrf.php')
        .then(r => r.json())
        .then(d => { if (active) { setCsrf(d.csrf); setCaptchaQuestion(d.captchaQuestion); } })
        .catch(() => {});
      return () => { active = false; };
    }, []);
  const statusRef = useRef(null);
  const lastSubmitTime = useRef(0);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
    
    // Real-time validation
    if (state.touched[name]) {
      const error = validateField(name, value);
      dispatch({ type: 'SET_ERROR', field: name, error });
    }
  }, [state.touched]);

  const handleFocus = useCallback((field) => {
    dispatch({ type: 'FOCUS_FIELD', field });
  }, []);

  const handleBlur = useCallback((field) => {
    dispatch({ type: 'BLUR_FIELD', field });
    
    // Validate on blur
    const error = validateField(field, state.formData[field]);
    dispatch({ type: 'SET_ERROR', field, error });
  }, [state.formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Rate limiting (3 seconds between submissions)
    const now = Date.now();
    if (now - lastSubmitTime.current < 3000) {
      dispatch({ type: 'SET_SUBMIT_STATUS', status: 'Please wait before submitting again.' });
      return;
    }
    
    // Honeypot check
    if (state.formData.website) {
      dispatch({ type: 'SET_SUBMIT_STATUS', status: 'Message sent successfully!' });
      setTimeout(() => dispatch({ type: 'RESET' }), 2000);
      return;
    }
    
    // Mark all fields as touched
    dispatch({ type: 'SET_ALL_TOUCHED' });
    
    // Validate all fields
    const errors = {
      name: validateField('name', state.formData.name),
      email: validateField('email', state.formData.email),
      message: validateField('message', state.formData.message)
    };
    
    // Set all errors
    Object.keys(errors).forEach(field => {
      dispatch({ type: 'SET_ERROR', field, error: errors[field] });
    });
    
    // Check if any errors exist
    if (Object.values(errors).some(error => error)) {
      dispatch({ type: 'SET_SUBMIT_STATUS', status: 'Please fix the errors before submitting.' });
      return;
    }
    
    dispatch({ type: 'SET_SUBMITTING', isSubmitting: true, status: 'Sending message...' });
    lastSubmitTime.current = now;
    
    try {
      await sendMessage({
        name: state.formData.name,
        email: state.formData.email,
        message: state.formData.message,
        website: state.formData.website, // honeypot
        csrf,
        captchaAnswer,
        source: 'contact'
      });
      
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false, status: 'Message sent successfully!' });
      
      // Focus on success message for screen readers
      setTimeout(() => {
        if (statusRef.current) {
          statusRef.current.focus();
        }
      }, 100);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 3000);
    } catch (error) {
      dispatch({ 
        type: 'SET_SUBMITTING', 
        isSubmitting: false, 
        status: 'Oh Noes! Yous Broke It! Try Snail Mail Next Time' 
      });
    }
  }, [state.formData]);

  return (
    <main className="contact-page" aria-labelledby="contact-title">
      <PageHeader 
        title="Get In Touch"
        subtitle="Let’s Create Meaningful User Experiences"
      />
      
      <div className="contact-container">
        <div className="contact-grid">
          <SocialLinks />
          
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
    </main>
  );
}

export default Contact;
