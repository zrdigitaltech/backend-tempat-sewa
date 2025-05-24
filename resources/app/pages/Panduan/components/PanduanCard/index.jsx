import React from 'react';
import { Link } from 'react-router-dom';

import '@/app/pages/Panduan/panduan.scss';

const kategoriColor = {
  'Panduan Penyewa': 'primary',
  'Panduan Pemilik': 'success',
  'Teknis & Legal': 'warning',
  'Inspirasi & Gaya Hidup': 'info',
  'Berita & Update': 'danger',
  'Bantuan & FAQ': 'secondary'
};

const Index = ({ guide }) => {
  return (
    <div className="card h-100 border-0 shadow-sm hover-shadow transition-all rounded-3">
      {guide.image && (
        <div className="position-relative">
          <Link to={`/panduan/${guide.slug}`}>
            <img
              src={guide.image}
              alt={guide.title}
              className="card-img-top"
              style={{ height: '180px', objectFit: 'cover' }}
            />
          </Link>
          <span className={`ST--badge position-absolute text-white`}>
            <small>{guide.kategori}</small>
          </span>
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          <Link to={`/panduan/${guide.slug}`} className="text-dark  fw-semibold">
            {guide.title}
          </Link>
        </h5>

        <div className="text-muted small mt-2">
          {guide.date && (
            <span className="me-1">
              {new Date(guide.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          )}
          {guide.author && (
            <span>
              by{' '}
              <Link to={`/panduan/author/${guide.authorSlug}`} className="">
                {guide.author}
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
