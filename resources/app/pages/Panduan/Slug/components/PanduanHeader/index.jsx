import React from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';
import { Link } from 'react-router-dom';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PanduanHeader = props => {
  const { panduanDetail, isLoading } = props;
  return (
    <>
      <section className="my-3">
        {isLoading ? (
          <div className="container">
            <Skeleton height={30} width={250} />
          </div>
        ) : (
          <Breadcrumb title={panduanDetail?.title} />
        )}
      </section>

      <section>
        <div className="container">
          {isLoading ? (
            <>
              <h1 className="fs-3 fw-bold text-dark">
                <Skeleton height={32} width={400} />
              </h1>
              <div className="text-muted mb-2">
                <Skeleton height={20} width={300} />
              </div>
            </>
          ) : (
            <>
              <h1 className="fs-3 fw-bold text-dark">{panduanDetail?.title}</h1>
              <div className="text-muted mb-2">
                Ditulis oleh{' '}
                <Link to={`/panduan/author/${panduanDetail?.authorSlug}`}>
                  <b>{panduanDetail?.author}</b>
                </Link>{' '}
                pada{' '}
                {panduanDetail?.date &&
                  new Date(panduanDetail?.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PanduanHeader;
