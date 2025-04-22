import React from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <section className="my-5">
      <div className="container">
        <div className="d-flex justify-content-center row">
          <div className="col-sm-12 col-md-12 text-center" data-aos="fade-up" data-aos-delay="0">
            <h2>Tidak Ditemukan</h2>
            <p>Halaman yang Anda cari tidak ada.</p>
            <Link to="/" className="btn btn-warning mt-3">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
