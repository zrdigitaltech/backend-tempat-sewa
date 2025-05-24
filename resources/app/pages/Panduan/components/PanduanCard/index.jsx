import React from 'react';
import { Link } from 'react-router-dom';

import '@/app/pages/Panduan/panduan.scss';
import { formatStrip } from '@/app/helpers';

const Index = props => {
  const { guide, linkKategori = false, showAuthor = false } = props;

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
          {linkKategori ? (
            <Link to={`/panduan?kategori=${formatStrip(guide?.kategori)}`}>
              <span className={`ST--badge position-absolute text-white`}>
                <small>{guide.kategori}</small>
              </span>
            </Link>
          ) : (
            <span className={`ST--badge position-absolute text-white`}>
              <small>{guide.kategori}</small>
            </span>
          )}
        </div>
      )}
      <div className="card-body">
        <h5
          className="card-title d-flex justify-content-between align-items-center ST--Text"
          title={guide.title}
        >
          <Link to={`/panduan/${guide.slug}`} className="text-dark  fw-semibold ST--Text">
            {guide.title}
          </Link>
        </h5>

        {/* Deskripsi Singkat */}
        {guide.deskripsi && (
          <p
            className="text-muted small mb-2 ST--Text"
            dangerouslySetInnerHTML={{ __html: guide.deskripsi }}
            title={guide.deskripsi}
          />
        )}

        {/* Info Tanggal dan Penulis */}
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
          {showAuthor && (
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
