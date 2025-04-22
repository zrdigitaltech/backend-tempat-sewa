import React from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <section className="text-center py-5 bg-white border-top">
      <div className="container">
        <h2 className="fw-semibold mb-3">Punya Properti yang Belum Tersewa?</h2>
        <p className="mb-4 text-muted">
          Tidak hanya mencari tempat tinggal — kamu juga bisa memasarkan propertimu dan mengelolanya
          secara efisien hanya di TempatSewa.Com.
        </p>
        <Link to="/daftarkan-properti" className="btn btn-warning px-4 py-2 fw-semibold">
          Daftarkan Sekarang
        </Link>
      </div>
    </section>
  );
}
