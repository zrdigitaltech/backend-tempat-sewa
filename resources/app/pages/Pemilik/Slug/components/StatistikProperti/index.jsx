import React, { Fragment } from 'react';

const PemilikSlugPage = props => {
  const { pemilikProfile } = props;

  return (
    <Fragment>
      <div className="my-4">
        <div className="mb-3">
          <h4 className="fs-5 fw-bold text-dark mb-0">Statistik Properti</h4>
          <small>
            {pemilikProfile?.statistik?.periode?.mulai} –{' '}
            {pemilikProfile?.statistik?.periode?.sampai}
          </small>
        </div>

        {/* Rentang Harga */}
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="bg-white rounded border shadow-sm p-3 h-100">
              <div className="text-muted small mb-1">Rentang Harga</div>
              <div className="fw-bold fs-6 text-dark">
                {pemilikProfile?.statistik?.rentang_harga || '-'}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white rounded border shadow-sm p-3 h-100">
              <div className="text-muted small mb-1">Iklan Aktif</div>
              <div className="fw-bold fs-4 text-dark">
                {pemilikProfile?.statistik?.iklan_aktif ?? '-'}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white rounded border shadow-sm p-3 h-100">
              <div className="text-muted small mb-1">Tersewa</div>
              <div className="fw-bold fs-4 text-dark">
                {pemilikProfile?.statistik?.tersewa ?? '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PemilikSlugPage;
