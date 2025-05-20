import React, { Fragment, useRef, useState } from 'react';

export default function Index(props) {
  const { refs } = props;

  return (
    <Fragment>
      <section className="container py-5" ref={refs.tentangRef}>
        <div className="d-flex justify-content-center row">
          <div className="col-12 col-sm-6 text-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <b>
                  Tentang <small>tempat</small>Sewa.Com
                </b>
              </h2>
              <p className="mb-4">
                <strong>tempatSewa.Com</strong> adalah platform tepercaya yang memudahkanmu
                menemukan tempat tinggal impian — mulai dari <strong>kontrakan</strong>,{' '}
                <strong>kost</strong>, hingga <strong>properti sewa lainnya</strong>.
              </p>
              <p className="mb-4">
                Kami hadir untuk menghadirkan{' '}
                <strong>pengalaman pencarian hunian yang cepat, mudah, dan aman</strong>. Dengan
                sistem yang terus dikembangkan, kamu bisa mencari properti sesuai kebutuhan hanya
                dalam beberapa klik.
              </p>
              <p className="mb-4">
                Bagi <strong>pemilik properti</strong>, tempatSewa.Com menyediakan solusi yang
                efisien dan praktis untuk <strong>memasarkan dan mengelola properti</strong> dalam
                satu platform terpadu — mulai dari unggah data, mengatur harga, hingga menghubungkan
                langsung dengan penyewa potensial.
              </p>
              <p className="mb-4">
                Dengan komitmen pada <strong>kemudahan, keamanan, dan transparansi</strong>,
                tempatSewa.Com menjadi pilihan utama bagi para pencari dan pemilik hunian sewa di
                Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
