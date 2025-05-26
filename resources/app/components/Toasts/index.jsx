import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as bootstrap from 'bootstrap';

const ToastContainer = ({ message, show, onClose }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (show && toastRef.current) {
      const toastInstance = new bootstrap.Toast(toastRef.current, { delay: 5000 });
      toastInstance.show();

      const handleHidden = () => {
        onClose();
      };

      toastRef.current.addEventListener('hidden.bs.toast', handleHidden);

      return () => {
        if (toastRef.current) {
          toastRef.current.removeEventListener('hidden.bs.toast', handleHidden);
        }
      };
    }
  }, [show, onClose]);

  if (!show) return null;

  return createPortal(
    <div
      className="
    bottom-0 p-3 start-50 toast-container translate-middle-x"
      style={{ zIndex: 9999999 }}
    >
      <div
        className="toast align-items-center text-bg-dark"
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
