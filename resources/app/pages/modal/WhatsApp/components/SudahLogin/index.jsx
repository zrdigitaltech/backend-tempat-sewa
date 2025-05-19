import React, { Fragment, useRef } from 'react';
import useTooltips from '@/app/components/Tooltips';
import * as bootstrap from 'bootstrap';

const Index = props => {
  const { dataItem } = props;

  const copyBtnRef = useRef(null);
  const tooltipRef = useRef(null);

  const handleCopy = phoneNumber => {
    // navigator.clipboard
    //   .writeText(phoneNumber)
    //   .then(() => {
    //     alert('Nomor berhasil disalin!');
    //   })
    //   .catch(() => {
    //     alert('Gagal menyalin nomor.');
    //   });
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        if (copyBtnRef.current) {
          copyBtnRef.current.setAttribute('title', 'Nomor berhasil disalin!');

          if (tooltipRef.current) {
            tooltipRef.current.dispose();
            tooltipRef.current = null;
          }

          tooltipRef.current = new bootstrap.Tooltip(copyBtnRef.current);
          tooltipRef.current.show();

          setTimeout(() => {
            if (tooltipRef.current) {
              tooltipRef.current.hide();
              tooltipRef.current.dispose();
              tooltipRef.current = null;
            }

            copyBtnRef.current.removeAttribute('title');
          }, 1000);
        }
      })
      .catch(err => console.error('Gagal menyalin nomor:', err));
  };

  useTooltips();

  return (
    <Fragment>
      <small className="mb-3">
        Permintaan sudah dikirim kepada pengiklan, kamu bisa langsung menghubungi atau melanjutkan
        dulu proses pencarian kamu.
      </small>
      <div className="d-flex justify-content-center mt-3">
        <div className="text-center position-relative">
          <div className="d-flex justify-content-center">
            <div className="position-relative" style={{ width: '120px' }}>
              <img
                src={dataItem?.pemilikImage + dataItem?.pemilik}
                alt="Foto Profil"
                className="rounded-circle img-fluid"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <i
                className="fa fa-check-circle text-primary"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  fontSize: '14px'
                }}
              ></i>
            </div>
          </div>
          <div className="mt-1">
            <strong>{dataItem?.pemilik}</strong>
          </div>
          <div className="mt-3">
            <span
              className="text-primary"
              onClick={() => handleCopy(dataItem?.no_whatsapp)}
              data-bs-toggle={'tooltip'}
              data-bs-placement="top"
              ref={copyBtnRef}
            >
              {dataItem?.no_whatsapp} <i className="fa-solid fa-copy cursor-pointer"></i>
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
