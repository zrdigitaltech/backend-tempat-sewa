import React, { useEffect, useState } from 'react';
import { formatPhone } from '@/app/helpers';
import classNames from 'classnames'; // optional: to simplify class toggling
import './sidebar.scss';

const Mobile = ({ data, handlePhone, handleWhatsApp, isLoading = false, handleBagikan }) => {
  const [showOnScroll, setShowOnScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const actionEl = document.getElementById('actionButtons');
      if (!actionEl) return;

      const rect = actionEl.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY;

      setShowOnScroll(window.scrollY > offsetTop + rect.height);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return null;

  return (
    <div
      className={classNames(
        'ST--mobile-bar-transition',
        'd-lg-none w-100 bg-white border-top shadow-lg p-3 position-fixed',
        showOnScroll ? 'show' : 'hide'
      )}
      style={{ bottom: 0, left: 0, zIndex: 1030 }}
    >
      <div className="d-flex gap-2">
        <button className="btn btn-success flex-fill text-white" onClick={handleWhatsApp}>
          <i className="fa-brands fa-whatsapp"></i> WhatsApp
        </button>
        <button className="btn btn-outline-primary flex-fill" onClick={handlePhone}>
          <i className="fa fa-phone"></i> {formatPhone(data?.no_whatsapp)}
        </button>
        <button
          className="btn border border-black bg-white d-flex align-items-center"
          onClick={handleBagikan}
        >
          <i className="fa fa-share-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default Mobile;
