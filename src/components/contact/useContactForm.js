import { useReducer, useCallback, useRef, useEffect, useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_STATE = {
  formData: { name: '', email: '', message: '', website: '' },
  focused: { name: false, email: false, message: false },
  touched: { name: false, email: false, message: false },
  errors: { name: '', email: '', message: '' },
  isSubmitting: false,
  submitStatus: ''
};

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, formData: { ...state.formData, [action.field]: action.value } };
    case 'FOCUS_FIELD':
      return { ...state, focused: { ...state.focused, [action.field]: true } };
    case 'BLUR_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
        focused: { ...state.focused, [action.field]: !!state.formData[action.field] }
      };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.error } };
    case 'SET_ALL_TOUCHED':
      return { ...state, touched: { name: true, email: true, message: true } };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.isSubmitting, submitStatus: action.status || state.submitStatus };
    case 'SET_SUBMIT_STATUS':
      return { ...state, submitStatus: action.status };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

function validateField(name, value) {
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
}

async function sendMessage(data) {
  const resp = await fetch('/contact/send.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await resp.json();
  if (!resp.ok || !json.success) throw new Error(json.error || 'Unknown error');
  return json;
}

export function useContactForm(source = 'contact') {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const statusRef = useRef(null);
  const lastSubmitTime = useRef(0);
  const [csrf, setCsrf] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/csrf.php')
      .then(r => r.json())
      .then(d => { if (active) { setCsrf(d.csrf); setCaptchaQuestion(d.captchaQuestion); } })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
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
    const error = validateField(field, state.formData[field]);
    dispatch({ type: 'SET_ERROR', field, error });
  }, [state.formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmitTime.current < 3000) {
      dispatch({ type: 'SET_SUBMIT_STATUS', status: 'Please wait before submitting again.' });
      return;
    }
    if (state.formData.website) {
      dispatch({ type: 'SET_SUBMIT_STATUS', status: 'Message sent successfully!' });
      setTimeout(() => dispatch({ type: 'RESET' }), 2000);
      return;
    }
    dispatch({ type: 'SET_ALL_TOUCHED' });
    const errors = {
      name: validateField('name', state.formData.name),
      email: validateField('email', state.formData.email),
      message: validateField('message', state.formData.message)
    };
    Object.keys(errors).forEach(f => dispatch({ type: 'SET_ERROR', field: f, error: errors[f] }));
    if (Object.values(errors).some(e => e)) {
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
        website: state.formData.website,
        csrf,
        captchaAnswer,
        source
      });
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false, status: 'Message sent successfully!' });
      setTimeout(() => { if (statusRef.current) statusRef.current.focus(); }, 100);
      setTimeout(() => dispatch({ type: 'RESET' }), 3000);
    } catch (err) {
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false, status: 'Oh Noes! Yous Broke It! Try Snail Mail Next Time' });
    }
  }, [state.formData, csrf, captchaAnswer, source]);

  return {
    state,
    statusRef,
    captchaQuestion,
    setCaptchaAnswer,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit
  };
}
