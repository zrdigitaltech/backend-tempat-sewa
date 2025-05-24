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
            <h2>
              <i className="fa fa-check-circle fa-5x text-primary"></i>
            </h2>
            <div>
              <p>
                Terima kasih atas laporan Anda!
                <br />
                Tim <small>tempat</small>Sewa.Com akan segera meninjau iklan yang Anda laporkan.
                Jika diperlukan, kami akan menghubungi Anda untuk informasi lebih lanjut.
              </p>
              <p className="mb-0">
                Kami menghargai partisipasi Anda dalam menjaga kualitas platform kami. 😊
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
