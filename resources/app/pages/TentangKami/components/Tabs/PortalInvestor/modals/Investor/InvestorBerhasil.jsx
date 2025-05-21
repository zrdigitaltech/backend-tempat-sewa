import React, { Fragment } from 'react';
import Modals from '@/app/components/Modals';

const PermintaanBerhasil = props => {
  const { show, onClose } = props;

  return (
    <Modals
      title="Permintaan Investasi Berhasil Dikirim"
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
                Terima kasih telah mengajukan investasi properti kepada{' '}
                <strong>tempatSewa.Com</strong>.
              </p>
              <p>
                Tim kami akan segera menghubungi Anda untuk membahas peluang investasi yang sesuai
                dengan profil dan target Anda.
              </p>
              <p className="fw-semibold">Tim kami akan menghubungi Anda dalam 1x24 jam.</p>
            </div>
          </div>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default PermintaanBerhasil;
