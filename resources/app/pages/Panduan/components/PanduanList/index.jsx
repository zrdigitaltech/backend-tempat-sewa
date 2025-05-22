import React, { Fragment } from 'react';
import { PanduanCard } from '@/app/pages/Panduan/components';
import { unFormatStrip } from '@/app/helpers';

const Index = props => {
  const { guides, keyword, kategori } = props;
  if (guides.length === 0) {
    return (
      <Fragment>
        <div className="text-center pt-5">
          <i className="fa-4x fa-search fas mb-3"></i>
          <h5 className="fw-bold mb-2">Tidak Ditemukan Panduan yang Sesuai</h5>
          <p className="text-muted">
            Maaf, panduan dengan kata kunci{' '}
            <strong className="text-capitalize">
              {unFormatStrip(kategori)} {unFormatStrip(keyword)}
            </strong>{' '}
            tidak ditemukan.
            <br />
            Silakan cari panduan dengan kata kunci lainnya, ya!
          </p>
        </div>
      </Fragment>
    );
  }

  return (
    <div className="row">
      {guides.map((item, idx) => (
        <PanduanCard key={item?.id || idx} guide={item} />
      ))}
    </div>
  );
};

export default Index;
