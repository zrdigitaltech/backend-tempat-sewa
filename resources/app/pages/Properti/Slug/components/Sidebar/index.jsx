import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPriceLocale } from '@/app/helpers';

const Index = props => {
  const { slug, kontrakanDetail, handlePhone, handleWhatsApp, handleLaporkanIklan } = props;

  return (
    <div
      className="card shadow-sm p-4 position-sticky"
      style={{
        top: '100px' // jarak dari atas saat sticky
      }}
    >
      <h2 className="fw-bold text-primary mb-0 text-center">
        Rp {formatPriceLocale(kontrakanDetail?.harga)}{' '}
        <span className="text-capitalize">/ {kontrakanDetail?.durasi}</span>
      </h2>
      <hr className="my-3" />
      <div className="d-flex justify-content-center mb-3">
        <div className="text-center position-relative">
          <div className="d-flex justify-content-center">
            <div className="position-relative" style={{ width: '80px' }}>
              <img
                src="https://placehold.co/800x600?text=Image+1"
                alt="Foto Profil"
                className="rounded-circle img-fluid"
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              />
              <i
                className="fa fa-check-circle text-primary"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  fontSize: '14px'
                }}
              ></i>
            </div>
          </div>
          <div className="mt-1">
            <strong
              className="d-block ST__text"
              title={kontrakanDetail?.pemilik?.length > 50 ? kontrakanDetail?.pemilik : ''}
            >
              {(kontrakanDetail?.pemilik || '').length > 50
                ? kontrakanDetail.pemilik.substring(0, 50) + '...'
                : kontrakanDetail?.pemilik}
            </strong>
          </div>
        </div>
      </div>
      {kontrakanDetail?.status?.toLowerCase() === 'tersedia' && (
        <Fragment>
          <button className="btn btn-success w-100 text-white" onClick={handleWhatsApp}>
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </button>

          <button className="btn btn-outline-primary w-100 mt-2" onClick={handlePhone}>
            <i className="fa fa-phone"></i> {kontrakanDetail?.no_whatsapp}
          </button>

          <Link className="btn btn-primary w-100 mt-2 mb-2" to={`/properti/${slug}/booking`}>
            Booking Sekarang
          </Link>
        </Fragment>
      )}

      <small
        className="position-absolute cursor-pointer"
        style={{
          right: '0',
          bottom: '-2rem'
        }}
        onClick={handleLaporkanIklan}
      >
        Laporkan Iklan
      </small>
    </div>
  );
};

export default Index;
