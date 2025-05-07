import React, { Fragment } from 'react';
import Modals from '@/app/components/Modals';

const BerhasilDiLaporkan = props => {
  const { show, onClose } = props;

  return (
    <Modals
      title="Iklan berhasil dilaporkan"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <div className="text-center">
            <h2 className="mb-0">
              <i className="fa fa-check-circle fa-5x text-primary"></i>
            </h2>
            <div>
              <p>
                Anda akan segera mendapat notifikasi setelah kami meninjau laporan Anda. Terima
                kasih telah membantu kami menjadikan TempatSewa.Com sebagai platform sewa properti
                yang aman, nyaman, dan suportif.
              </p>
            </div>
          </div>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default BerhasilDiLaporkan;
