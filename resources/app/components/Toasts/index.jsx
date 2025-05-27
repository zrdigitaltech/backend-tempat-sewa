import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as bootstrap from 'bootstrap';

const ToastContainer = ({ message, show, onClose }) => {
  const toastRef = useRef(null);
  const toastInstanceRef = useRef(null);

  // Init toast instance once on mount
  useEffect(() => {
    if (toastRef.current && !toastInstanceRef.current) {
      toastInstanceRef.current = new bootstrap.Toast(toastRef.current, {
        autohide: true,
        delay: 5000
      });

      toastRef.current.addEventListener('hidden.bs.toast', () => {
        onClose?.();
      });
    }
  }, [onClose]);

  // Show toast when `show` becomes true
  useEffect(() => {
    if (show && toastInstanceRef.current) {
      toastInstanceRef.current.show();
    }
  }, [show]);

  return createPortal(
    <div
      className="toast-container position-fixed bottom-0 start-50 p-3 translate-middle-x"
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
