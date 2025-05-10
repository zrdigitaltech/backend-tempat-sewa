import React from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <section className="text-center py-5 bg-white border-top">
      <div className="container">
        <h2 className="fw-semibold mb-3">Punya Properti untuk Disewakan?</h2>
        <p className="mb-4 text-muted">
          Tak hanya memudahkan pencarian tempat tinggal impian <br />
          <small>tempat</small>Sewa.Com juga hadir sebagai solusi praktis bagi pemilik properti
          untuk memasarkan dan mengelola sewanya dengan efisien.
        </p>
        <Link to="/daftarkan-properti" className="btn btn-warning px-4 py-2 fw-semibold">
          Daftarkan Sekarang
        </Link>
      </div>
    </section>
  );
}
