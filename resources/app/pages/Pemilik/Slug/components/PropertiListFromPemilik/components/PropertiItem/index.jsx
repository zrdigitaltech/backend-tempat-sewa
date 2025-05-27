import React, { Fragment } from 'react';
import { formatPriceLocale } from '@/app/helpers';

const Index = props => {
  const { item } = props;

  return (
    <Fragment>
      <div className="border-top py-3">
        <div className="d-flex flex-column flex-md-row px-1">
          {/* Kolom Iklan */}
          <div style={{ flex: 1 }} className="d-flex flex-row gap-3">
            <img
              src={item.foto}
              alt={item.judul}
              className="rounded flex-shrink-0"
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <div className="flex-grow-1">
              <div className="mb-2">
                <span className="badge bg-light text-dark border me-2 mb-1">
                  <i className="bi bi-buildings me-1" /> {item.tipe_properti?.nama}
                </span>
              </div>
              <h6 className="fw-bold text-dark mb-1">{item.nama}</h6>
              <div className="text-muted small">{item?.alamat}</div>
            </div>
          </div>

          {/* Wrapper Spesifikasi dan Harga */}
          <div
            className="d-flex justify-content-between mt-3 mt-md-0"
            style={{ width: 400, maxWidth: '100%' }}
          >
            {/* Kolom Spesifikasi */}
            <div className="d-flex flex-column justify-content-center gap-1 small text-dark ms-lg-1">
              <span>
                <i className="bi bi-house-door me-1" /> {item.kamar} Kamar Tidur
              </span>
              <span>
                <i className="bi bi-droplet me-1" /> {item.kamarMandi} Kamar Mandi
              </span>
            </div>

            {/* Kolom Harga */}
            <div className="d-flex flex-column justify-content-center text-md-end">
              <div className="fw-bold text-primary text-capitalize">
                Rp {formatPriceLocale(item?.harga)} <br className="d-none d-lg-block" /> /{' '}
                {item?.durasi}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
