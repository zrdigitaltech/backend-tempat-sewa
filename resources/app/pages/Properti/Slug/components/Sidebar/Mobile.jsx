import React from 'react';
import { formatPriceLocale, formatPhone } from '@/app/helpers';

const Mobile = ({ kontrakanDetail, handlePhone, handleWhatsApp, isLoading = false }) => {
  if (isLoading || kontrakanDetail?.status?.toLowerCase() !== 'tersedia') return null;

  return (
    <div
      className="d-lg-none w-100 bg-white border-top shadow-lg p-3 position-fixed"
      style={{ bottom: 0, left: 0, zIndex: 1 }}
    >
      <div>
        <div className="d-flex">
          <h2 className="fw-bold text-primary d-block">
            Rp {formatPriceLocale(kontrakanDetail?.harga)}{' '}
            <span className="text-capitalize">/ {kontrakanDetail?.durasi}</span>
          </h2>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn flex-fill" onClick={handlePhone}>
            <i className="fa fa-phone"></i> {formatPhone(kontrakanDetail?.no_whatsapp)}
          </button>
          <button className="btn btn-success btn flex-fill text-white" onClick={handleWhatsApp}>
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
