import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as bootstrap from 'bootstrap';

const ToastContainer = ({ message, show, onClose }) => {
  const toastRef = useRef(null);
  const toastInstanceRef = useRef(null);

  useEffect(() => {
    if (show && toastRef.current) {
      toastInstanceRef.current = new bootstrap.Toast(toastRef.current, { delay: 5000 });
      toastInstanceRef.current.show();

      const handleHidden = () => {
        onClose?.(); // Safe check
      };

      const el = toastRef.current;
      el.addEventListener('hidden.bs.toast', handleHidden);

      return () => {
        el.removeEventListener('hidden.bs.toast', handleHidden);
        toastInstanceRef.current?.dispose?.();
      };
    }
  }, [show, onClose]);

  if (!show) return null;

  return createPortal(
    <div
      className="toast-container position-fixed bottom-0 start-50 p-3 translate-middle-x"
      style={{ zIndex: 9999999 }}
    >
      <div
        className="toast align-items-center text-bg-dark show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref={toastRef}
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ToastContainer;
