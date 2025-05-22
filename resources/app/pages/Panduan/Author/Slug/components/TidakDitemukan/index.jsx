import React from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';
import { unFormatStrip } from '@/app/helpers';

const Index = props => {
  const { slug } = props;

  return (
    <div className="pb-5">
      <section className="mt-3">
        <Breadcrumb title={'Panduan Tidak Ditemukan'} />
      </section>
      <div className="text-center pt-5">
        <i className="fa-4x fa-search fas mb-3"></i>
        <h5 className="fw-bold mb-2">Panduan Tidak Ditemukan</h5>
        <p className="text-muted">
          Maaf, panduan dengan kata kunci{' '}
          <strong className="text-capitalize">{unFormatStrip(slug)}</strong> tidak ditemukan.
          <br />
          Silakan cari panduan dengan kata kunci lainnya, ya!
        </p>
      </div>
    </div>
  );
};

export default Index;
