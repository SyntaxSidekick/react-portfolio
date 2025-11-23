import { forwardRef } from "react";

const FormStatus = forwardRef(({ status }, ref) => {
  if (!status) return null;

  const isSuccess = status.includes('success');
  const isError = status.includes('error') || status.includes('fix') || status.includes('wait');

  return (
    <div 
      ref={ref}
      className={`form-status ${isSuccess ? 'success' : ''} ${isError ? 'error' : ''}`}
      role="status" 
      aria-live="assertive"
      aria-atomic="true"
      tabIndex="-1"
    >
      {status}
    </div>
  );
});

FormStatus.displayName = "FormStatus";

export default FormStatus;
