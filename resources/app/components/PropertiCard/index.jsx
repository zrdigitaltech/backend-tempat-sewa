import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { formatViews, formatPrice } from '@/app/helpers';

export default function Index(props) {
  const {
    nama,
    harga,
    durasi,
    status,
    slug,
    image,
    alamat,
    pemilik,
    pemilikSlug,
    views = 1000
  } = props;

  const durasiLabel =
    {
      harian: 'per Hari',
      bulanan: 'per Bulan',
      tahunan: 'per Tahun'
    }[durasi] || '';

  return (
    <Link to={`/properti/${slug}`} className="text-decoration-none text-dark">
      <div className="card border-0 shadow-sm h-100 rounded-3">
        <div className="position-relative" style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
          <img
            src="https://placehold.co/800x600"
            className="w-100 h-100 object-fit-cover"
            alt={nama}
          />

          <span
            className="badge bg-warning text-dark position-absolute"
            style={{
              top: '10px',
              left: '10px',
              fontSize: '0.75rem',
              padding: '6px 10px',
              borderRadius: '6px'
            }}
          >
            Pilihan Paket Member
          </span>

          <span
            className={`badge mb-2 position-absolute ${status.toLowerCase() === 'tersedia' ? 'bg-success' : 'bg-danger'}`}
            style={{
              bottom: '0px',
              right: '10px',
              fontSize: '0.75rem',
              padding: '6px 10px',
              borderRadius: '6px'
            }}
          >
            {status}
          </span>

          <div
            className="badge position-absolute d-flex align-items-center mb-2"
            style={{
              bottom: '0px',
              left: '10px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              fontSize: '0.75rem',
              padding: '6px 10px',
              borderRadius: '6px'
            }}
          >
            <i className="fa fa-eye pe-1" aria-hidden="true"></i> {formatViews(views)}
          </div>
        </div>

        <div className="card-body">
          <h5 className="card-title">
            <small>Rp</small>
            {formatPrice(1079000)}/Bulan
          </h5>

          <span className="card-text fw-semibold mb-0">{nama}</span>

          <p className="text-muted small mb-0">Duren Sawit, Jakarta Timur</p>
        </div>
      </div>
    </Link>
  );
}
