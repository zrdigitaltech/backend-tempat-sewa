import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <Fragment>
      {/* Booster Section - Full Width */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Kiri: Gambar */}
            <div className="col-lg-6 mb-4 mb-lg-0 text-center">
              <img
                src="https://placehold.co/686x375?text=Member+Mulai+99"
                alt="Paket Iklan TempatSewa.Com"
                className="img-fluid rounded shadow"
                style={{ height: '321px', objectFit: 'cover', width: '100%' }}
              />
            </div>

            {/* Kanan: Teks dan Booster */}
            <div className="col-lg-6 text-lg-start text-center">
              <p className="fw-bold fs-2 mb-3">Iklan Dilihat Lebih Banyak dengan Booster</p>
              <p className="lead mb-4">
                Buat posisi iklanmu berada di bagian atas agar lebih menonjol dari yang lain. Dengan{' '}
                <strong>Booster</strong>, iklanmu berpotensi lebih cepat ditemukan dan tersewa!
              </p>
              <Link to="/fitur#ProdukBooster" className="btn btn-warning fw-bold px-4 py-2">
                Cek Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
