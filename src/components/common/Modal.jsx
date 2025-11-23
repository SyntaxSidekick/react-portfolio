import React, { useEffect, useRef } from "react";

/**
 * Reusable modal component with accessibility features
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Function to call when modal should close
 * @param {string} title - Modal title for aria-labelledby
 * @param {string} size - Modal size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * @param {boolean} closeOnOverlay - Whether clicking overlay closes modal (default: true)
 * @param {boolean} closeOnEsc - Whether Esc key closes modal (default: true)
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Modal content
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  size = 'lg',
  closeOnOverlay = true,
  closeOnEsc = true,
  className = "",
  children
}) => {
  const lastActiveElement = useRef(null);
  const modalRef = useRef(null);

  // Focus trap and keyboard navigation
  useEffect(() => {
    if (isOpen) {
      // Save the currently focused element
      lastActiveElement.current = document.activeElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus the close button after modal opens
      setTimeout(() => {
        const closeButton = modalRef.current?.querySelector('.modal-close-btn');
        if (closeButton) closeButton.focus();
      }, 100);

      // Handle keyboard events
      const handleKeyDown = (e) => {
        if (e.key === "Escape" && closeOnEsc) {
          onClose();
        }

        // Trap focus within modal
        if (e.key === "Tab" && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = '';
        
        // Restore focus to the element that opened the modal
        if (lastActiveElement.current) {
          lastActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`modal-overlay ${className}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div 
        className={`custom-modal custom-modal-${size}`}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="fas fa-times"></i>
        </button>

        {title && (
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
        )}

        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
