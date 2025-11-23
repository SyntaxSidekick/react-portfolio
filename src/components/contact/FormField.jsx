import { motion } from "framer-motion";

const FormField = ({ 
  field, 
  index, 
  value, 
  focused, 
  touched, 
  error, 
  isSubmitting,
  onChange, 
  onFocus, 
  onBlur 
}) => {
  const fieldClasses = `form-field ${focused || value ? 'focused' : ''} ${touched ? 'touched' : ''} ${error ? 'error' : ''}`;

  return (
    <motion.div 
      className={fieldClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
    >
      <label htmlFor={field.name}>{field.label}</label>
      
      {field.type === 'textarea' ? (
        <textarea
          id={field.name}
          name={field.name}
          rows={field.rows}
          value={value}
          onChange={onChange}
          onFocus={() => onFocus(field.name)}
          onBlur={() => onBlur(field.name)}
          required
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={`${field.name}-help ${error ? `${field.name}-error` : ''}`}
          disabled={isSubmitting}
        ></textarea>
      ) : (
        <input
          type={field.type}
          id={field.name}
          name={field.name}
          value={value}
          onChange={onChange}
          onFocus={() => onFocus(field.name)}
          onBlur={() => onBlur(field.name)}
          required
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={`${field.name}-help ${error ? `${field.name}-error` : ''}`}
          autoComplete={field.autoComplete}
          disabled={isSubmitting}
        />
      )}
      
      <span id={`${field.name}-help`} className="visually-hidden">{field.helpText}</span>
      
      {error && touched && (
        <span id={`${field.name}-error`} className="field-error" role="alert">
          {error}
        </span>
      )}
    </motion.div>
  );
};

export default FormField;
