import React, { Fragment } from 'react';

const Index = props => {
  const { data } = props;

  const handleCopy = phoneNumber => {
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        alert('Nomor berhasil disalin!');
      })
      .catch(() => {
        alert('Gagal menyalin nomor.');
      });
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
                src="https://placehold.co/800x600?text=Image+1"
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
            <strong>Nama Pemilik</strong>
          </div>
          <div className="mt-3">
            <span className="text-primary">
              +6285691358038{' '}
              <i
                className="fa-solid fa-copy cursor-pointer"
                onClick={() => handleCopy('+6285691358038')}
              ></i>
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
