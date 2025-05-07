import React, { Fragment, useEffect } from 'react';
import Modals from '@/app/components/Modals';

const Verifikasi = props => {
  const { show, onClose, formData } = props;

  return (
    <Modals
      title="Verifikasi Nomor HP Kamu"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <small>
            Masukkan kode OTP yang telah kami kirimkan melalui{' '}
            {formData?.verifikasi === 'whatsapp' ? 'WhatsApp' : 'SMS'} pada nomor{' '}
            <b className="text-primary">+62{formData?.phone}</b>
          </small>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default Verifikasi;
