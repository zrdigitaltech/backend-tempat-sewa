import React, { Fragment } from 'react';
import { formatPriceLocale, iconTipeProperti } from '@/app/helpers';
import { Link } from 'react-router-dom';

const Index = props => {
  const { item } = props;

  const renderCombinedInteriorCard = (interior, targets, label, iconClass) => {
    if (!interior || !Array.isArray(interior)) return null;

    const total = targets.reduce((sum, name) => {
      const item = interior.find(i => i.nama === name);
      const val = parseInt(item?.fasilitas?.[0]) || 0;
      return sum + val;
    }, 0);

    if (total === 0) return null;

    return (
      <span
        className="align-content-center text-secondary text-capitalize"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title={label}
      >
        {iconClass && <i className={`fa ${iconClass} me-1`}></i>}
        {total} {label}
      </span>
    );
  };

  const renderSingleInteriorCard = (interior, target, label, iconClass) => {
    if (!interior || !Array.isArray(interior)) return null;

    const item = interior.find(i => i.nama === target);
    const value = item?.fasilitas?.[0];

    if (!value) return null;

    return (
      <span
        className="align-content-center text-secondary text-capitalize"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title={label}
      >
        {iconClass && <i className={`fa ${iconClass} me-1`}></i>}
        {value} {label}
      </span>
    );
  };

  return (
    <Fragment>
      <div className="border-top py-3">
        <Link to={`/properti/${item?.slug}`} className="d-flex flex-column flex-md-row px-1">
          {/* Kolom Iklan */}
          <div style={{ flex: 1 }} className="d-flex flex-row gap-3">
            <img
              src={item.image[0]}
              alt={item.nama}
              className="rounded flex-shrink-0"
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <div className="flex-grow-1">
              <div className="d-flex gap-2 mb-2 overflow-x-auto">
                <span className="bg-primary-subtle align-content-center badge text-secondary text-capitalize">
                  {iconTipeProperti(item.tipe_properti?.nama)}{' '}
                  {typeof item.tipe_properti === 'object'
                    ? item.tipe_properti?.nama.toLowerCase() === 'kost'
                      ? item.tipe_properti?.nama + ' ' + item.tipe_kost
                      : item.tipe_properti?.nama
                    : ''}
                </span>
              </div>
              <h6 className="fw-bold text-dark mb-1" title={item.nama.length > 50 ? item.nama : ''}>
                {item.nama}
              </h6>
              <address className="text-muted small">{item?.alamat}</address>
            </div>
          </div>

          {/* Wrapper Spesifikasi dan Harga */}
          <div
            className="d-flex justify-content-between mt-3 mt-md-0"
            style={{ width: 400, maxWidth: '100%' }}
          >
            {/* Kolom Spesifikasi */}
            <div className="d-flex flex-column justify-content-center gap-1 small text-dark ms-lg-2">
              {renderSingleInteriorCard(
                item?.tipe_properti?.informasi_interior,
                'Tipe Kamar',
                'Ruang',
                'fa-door-open'
              )}
              {renderCombinedInteriorCard(
                item?.tipe_properti?.informasi_interior,
                ['Kamar Tidur', 'Kamar Tidur ART', 'Tipe Kamar'],
                'Kamar Tidur',
                'fa-solid fa-bed'
              )}

              {renderCombinedInteriorCard(
                item?.tipe_properti?.informasi_interior,
                ['Kamar Mandi', 'Kamar Mandi ART'],
                'Kamar Mandi',
                'fa-bath'
              )}
            </div>

            {/* Kolom Harga */}
            <div className="d-flex flex-column justify-content-center text-md-end">
              <div className="fw-bold text-primary text-capitalize">
                Rp {formatPriceLocale(item?.harga)} <br className="d-none d-lg-block" /> /{' '}
                {item?.durasi}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default Index;
