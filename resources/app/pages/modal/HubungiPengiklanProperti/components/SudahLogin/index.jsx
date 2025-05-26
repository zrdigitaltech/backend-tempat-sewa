import React, { Fragment, useState, useRef } from 'react';

const Index = props => {
  const { dataItem = '' } = props;
  const copyBtnRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = phoneNumber => {
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(err => console.error('Gagal menyalin nomor:', err));
  };

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
              className="text-primary cursor-pointer"
              onClick={() => handleCopy(dataItem?.no_whatsapp)}
              ref={copyBtnRef}
            >
              {dataItem?.no_whatsapp} <i className="fa-solid fa-copy"></i>
            </span>

            {/* Pesan sukses */}
            {copied && (
              <div className="text- mt-1" style={{ fontSize: '0.875rem' }}>
                ✅ Nomor berhasil disalin!
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
