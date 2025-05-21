import React, { Fragment } from 'react';
import Modals from '@/app/components/Modals';

const UlasanBerhasil = props => {
  const { show, onClose } = props;

  return (
    <Modals
      title="Ulasan Berhasil Dikirim"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <div className="text-center">
            <h2>
              <i className="fas fa-check-circle fa-5x text-primary"></i>
            </h2>
            <div>
              <p>
                Terima kasih telah memberikan ulasan Anda di <strong>tempatSewa.Com</strong>.
                Masukan Anda sangat berarti bagi kami untuk meningkatkan layanan.
              </p>
              <p className="mb-0">
                Kami akan terus berusaha memberikan pengalaman terbaik untuk Anda. 😊
              </p>
            </div>
          </div>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default UlasanBerhasil;
