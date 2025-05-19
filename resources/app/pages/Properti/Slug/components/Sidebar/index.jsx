import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPriceLocale, formatPhone } from '@/app/helpers';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Index = props => {
  const {
    slug,
    kontrakanDetail,
    handlePhone,
    handleWhatsApp,
    handleLaporkanIklan,
    isLoading = false
  } = props;

  return (
    <div
      className="card shadow p-4 position-sticky border-0"
      style={{
        top: '135px' // jarak dari atas saat sticky
      }}
    >
      {isLoading ? (
        <div className="text-center">
          <Skeleton width={150} height={30} />
        </div>
      ) : (
        <h2 className="fw-bold text-primary mb-0 text-center">
          Rp {formatPriceLocale(kontrakanDetail?.harga)}{' '}
          <span className="text-capitalize">/ {kontrakanDetail?.durasi}</span>
        </h2>
      )}
      <hr className="my-3 border-primary-subtle" />
      <div className="d-flex justify-content-center mb-3">
        <Link
          to={`/pemilik/@${kontrakanDetail?.pemilikSlug}`}
          className="text-center position-relative text-decoration-none"
        >
          <div className="d-flex justify-content-center">
            <div className="position-relative" style={{ width: '80px' }}>
              {isLoading ? (
                <Skeleton circle height={60} width={60} />
              ) : (
                <img
                  src={kontrakanDetail?.pemilikImage + kontrakanDetail?.pemilik}
                  alt="Foto Profil"
                  className="rounded-circle img-fluid"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
              )}
              {!isLoading && kontrakanDetail?.pemilik_verified && (
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
              )}
            </div>
          </div>
          <div className="mt-1">
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <strong
                className="d-block ST__text"
                title={kontrakanDetail?.pemilik?.length > 50 ? kontrakanDetail?.pemilik : ''}
              >
                {(kontrakanDetail?.pemilik || '').length > 50
                  ? kontrakanDetail.pemilik.substring(0, 50) + '...'
                  : kontrakanDetail?.pemilik}
              </strong>
            )}
          </div>
        </Link>
      </div>
      {isLoading ? (
        <Fragment>
          <Skeleton height={40} className="mb-2" />
          <Skeleton height={40} className="mb-2" />
          <Skeleton height={40} className="mb-2" />
        </Fragment>
      ) : (
        kontrakanDetail?.status?.toLowerCase() === 'tersedia' && (
          <Fragment>
            <button className="btn btn-success w-100 text-white" onClick={handleWhatsApp}>
              <i className="fa-brands fa-whatsapp"></i> WhatsApp
            </button>

            <button className="btn btn-outline-primary w-100 mt-2" onClick={handlePhone}>
              <i className="fa fa-phone"></i> {formatPhone(kontrakanDetail?.no_whatsapp)}
            </button>

            {/* <Link className="btn btn-primary w-100 mt-2 mb-2" to={`/properti/${slug}/booking`}>
              Booking Sekarang
            </Link> */}
          </Fragment>
        )
      )}

      {!isLoading && (
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
      )}
    </div>
  );
};

export default Index;
