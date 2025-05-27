import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPriceLocale, formatPhone } from '@/app/helpers';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Index = props => {
  const {
    slug,
    data,
    handlePhone,
    handleWhatsApp,
    handleLaporkanIklan,
    isLoading = false,
    handleBagikan
  } = props;

  return (
    <div
      className="card shadow p-4 position-sticky border-0 d-none d-lg-block"
      style={{
        top: '100px' // jarak dari atas saat sticky
      }}
    >
      <div className="d-flex justify-content-center mb-3">
        {/* <Link to={`/pemilik/${data?.pemilikSlug}`} className="text-center position-relative "> */}
        <div className="d-flex">
          <div className="position-relative me-2" style={{ width: '80px' }}>
            {isLoading ? (
              <Skeleton circle height={80} width={80} />
            ) : (
              <img
                src={data?.avatar + data?.name}
                alt="Foto Profil"
                className="rounded-circle img-fluid"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
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
        <div className="">
          {isLoading ? (
            <Skeleton width={100} />
          ) : (
            <strong className="d-block ST--Text" title={data?.name?.length > 50 ? data?.name : ''}>
              {(data?.name || '').length > 50 ? data.name.substring(0, 50) + '...' : data?.name}
            </strong>
          )}
        </div>
        {/* </Link> */}
      </div>
      {isLoading ? (
        <Fragment>
          <Skeleton height={40} className="mb-2" />
          <Skeleton height={40} className="mb-2" />
          <Skeleton height={40} className="mb-2" />
        </Fragment>
      ) : (
        <Fragment>
          <button className="btn btn-success w-100 text-white" onClick={handleWhatsApp}>
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </button>

          <button className="btn btn-outline-primary w-100 mt-2" onClick={handlePhone}>
            <i className="fa fa-phone"></i> {formatPhone(data?.no_whatsapp)}
          </button>

          <button
            className="btn btn-outline-dark border border-black w-100 mt-2"
            onClick={handleBagikan}
          >
            <i className="fa fa-share-alt me-1"></i> Bagikan
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default Index;
