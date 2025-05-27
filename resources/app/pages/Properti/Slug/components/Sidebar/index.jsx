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
        <Fragment>
          <h2 className="fw-bold text-primary mb-0 text-lg-center d-none d-lg-block">
            Rp {formatPriceLocale(kontrakanDetail?.harga)}{' '}
            <span className="text-capitalize">/ {kontrakanDetail?.durasi}</span>
          </h2>
          <h3 className="fw-bold text-primary mb-0 text-lg-center d-block d-lg-none">
            Kontak Pengiklan
          </h3>
        </Fragment>
      )}
      <hr className="my-3 border-primary-subtle" />
      <div className="d-flex justify-content-lg-center mb-3">
        <Link
          to={`/pemilik/${kontrakanDetail?.pemilikSlug}`}
          className="text-lg-center position-relative d-flex d-lg-block"
        >
          <div className="d-flex justify-content-lg-center">
            <div className="position-relative me-2 me-lg-0" style={{ width: '80px' }}>
              {isLoading ? (
                <Skeleton circle height={80} width={80} />
              ) : (
                <img
                  src={kontrakanDetail?.pemilikImage + kontrakanDetail?.pemilik}
                  alt="Foto Profil"
                  className="rounded-circle img-fluid"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
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
          <div className="mt-lg-1">
            {isLoading ? (
              <Fragment>
                <Skeleton width={100} />
                <Skeleton width={50} />
              </Fragment>
            ) : (
              <Fragment>
                <strong
                  className="d-block ST--Text"
                  title={kontrakanDetail?.pemilik?.length > 50 ? kontrakanDetail?.pemilik : ''}
                >
                  {(kontrakanDetail?.pemilik || '').length > 50
                    ? kontrakanDetail.pemilik.substring(0, 50) + '...'
                    : kontrakanDetail?.pemilik}
                </strong>
                <small className="text-secondary">Pemilik</small>
              </Fragment>
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
            <div className="align-items-center d-flex d-lg-block gap-3">
              <button className="btn btn-success w-100 text-white" onClick={handleWhatsApp}>
                <i className="fa-brands fa-whatsapp"></i> WhatsApp
              </button>

              <button className="btn btn-outline-primary w-100 mt-lg-2" onClick={handlePhone}>
                <i className="fa fa-phone"></i> {formatPhone(kontrakanDetail?.no_whatsapp)}
              </button>

              {/* <Link className="btn btn-primary w-100 mt-2 mb-2" to={`/properti/${slug}/booking`}>
              Booking Sekarang
            </Link> */}
            </div>
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
