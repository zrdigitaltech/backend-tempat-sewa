import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPriceLocale, formatPhone } from '@/app/helpers';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Index = props => {
  const { slug, data, handlePhone, handleWhatsApp, handleLaporkanIklan, isLoading = false } = props;

  return (
    <div
      className="card shadow p-4 position-sticky border-0"
      style={{
        top: '135px' // jarak dari atas saat sticky
      }}
    >
      <hr className="my-3 border-primary-subtle" />
      <div className="d-flex justify-content-center mb-3">
        <Link to={`/pemilik/${data?.pemilikSlug}`} className="text-center position-relative ">
          <div className="d-flex justify-content-center">
            <div className="position-relative" style={{ width: '80px' }}>
              {isLoading ? (
                <Skeleton circle height={60} width={60} />
              ) : (
                <img
                  src={data?.pemilikImage + data?.pemilik}
                  alt="Foto Profil"
                  className="rounded-circle img-fluid"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
              )}
              {!isLoading && data?.pemilik_verified && (
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
                className="d-block ST--Text"
                title={data?.pemilik?.length > 50 ? data?.pemilik : ''}
              >
                {(data?.pemilik || '').length > 50
                  ? data.pemilik.substring(0, 50) + '...'
                  : data?.pemilik}
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
        data?.status?.toLowerCase() === 'tersedia' && (
          <Fragment>
            <button className="btn btn-success w-100 text-white" onClick={handleWhatsApp}>
              <i className="fa-brands fa-whatsapp"></i> WhatsApp
            </button>

            <button className="btn btn-outline-primary w-100 mt-2" onClick={handlePhone}>
              <i className="fa fa-phone"></i> {formatPhone(data?.no_whatsapp)}
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
