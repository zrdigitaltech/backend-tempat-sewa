import React from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';
import { Link } from 'react-router-dom';

const PanduanHeader = ({ title, author, authorSlug, date }) => {
  return (
    <>
      <section className="my-3">
        <Breadcrumb title={title} />
      </section>

      <section>
        <div className="container">
          <h1 className="fs-3 fw-bold text-dark">{title}</h1>
          <div className="text-muted mb-2">
            Ditulis oleh{' '}
            <Link to={`/panduan/author/${authorSlug}`}>
              <b>{author}</b>
            </Link>{' '}
            pada{' '}
            {date &&
              new Date(date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PanduanHeader;
