import React, { Fragment } from 'react';

export default function Index(props) {
  const { refs } = props;

  return (
    <Fragment>
      <section ref={refs.perjalananRef} className="container py-5">
        <div className="d-flex justify-content-center row">
          <div className="col-12 col-sm-6 text-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <b>
                  Perjalanan <small>tempat</small>Sewa.Com
                </b>
              </h2>
              <p className="mb-3">
                Perjalanan <strong>tempatSewa.Com</strong> dimulai dari sebuah visi sederhana:
                menciptakan cara yang lebih baik untuk menemukan tempat tinggal yang sesuai
                kebutuhan.
              </p>
              <p className="mb-3">
                Seiring waktu, platform ini berkembang menjadi solusi lengkap bagi pencari hunian —
                dari <strong>kontrakan</strong>, <strong>kost</strong>, hingga{' '}
                <strong>properti sewa lainnya</strong>. Kami terus berinovasi agar pengalaman
                pencarian semakin cepat, mudah, dan aman.
              </p>
              <p className="mb-3">
                Tidak hanya untuk penyewa, kami juga menghadirkan fitur-fitur canggih untuk
                <strong> pemilik properti</strong>: mulai dari unggah properti, kelola harga, hingga
                terhubung langsung dengan calon penyewa.
              </p>
              <p>
                Dengan semangat <strong>transformasi digital properti sewa</strong>, kami terus
                melangkah maju, membangun ekosistem yang mempertemukan kebutuhan penyewa dan pemilik
                dalam satu platform efisien dan terpercaya.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
