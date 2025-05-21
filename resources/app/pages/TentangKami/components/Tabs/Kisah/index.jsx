import React, { Fragment } from 'react';

export default function Index(props) {
  const { refs } = props;

  return (
    <Fragment>
      <section ref={refs.kisahRef} className="container py-5">
        <div className="d-flex justify-content-center row">
          <div className="col-12 col-sm-6 text-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <b>Kisah Pendirian</b>
              </h2>
              <p className="mb-3">
                tempatSewa.Com berawal dari kebutuhan akan platform yang bisa menyatukan pencari
                hunian dan pemilik properti dalam satu ekosistem yang nyaman, aman, dan efisien.
              </p>
              <p className="mb-3">
                Didirikan oleh para profesional yang memahami kesulitan dalam mencari atau
                menyewakan tempat tinggal, kami hadir dengan solusi digital yang memudahkan
                pencarian properti — mulai dari <strong>kontrakan</strong>, <strong>kost</strong>,
                hingga berbagai jenis
                <strong> properti sewa lainnya</strong>.
              </p>
              <p className="mb-3">
                Dengan fokus pada <strong>kecepatan, kenyamanan, dan keamanan</strong>,
                tempatSewa.Com menjadi jembatan antara penyewa dan pemilik properti secara langsung,
                tanpa kerumitan.
              </p>
              <p>
                Untuk para pemilik properti, kami menyediakan platform lengkap yang membantu
                <strong> memasarkan dan mengelola properti</strong> secara praktis, mulai dari
                unggah data hingga komunikasi dengan calon penyewa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
