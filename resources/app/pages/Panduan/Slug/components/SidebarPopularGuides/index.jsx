import React from 'react';
import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SidebarPopularGuides = props => {
  const { guides, isLoading } = props;
  return (
    <aside className="position-sticky" style={{ top: '85px' }}>
      <h5 className="mb-3">Artikel Populer</h5>
      <ul className="list-unstyled">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <li key={index} className="d-flex mb-3">
                <div className="d-flex gap-2 w-100">
                  <Skeleton width={100} height={70} style={{ borderRadius: '6px' }} />
                  <div className="flex-grow-1">
                    <Skeleton height={15} width={`100%`} className="mb-1" />
                    <Skeleton height={10} width={`60%`} />
                  </div>
                </div>
              </li>
            ))
          : guides?.slice(0, 8).map(item => (
              <li key={item.slug} className="d-flex mb-3">
                <Link
                  to={`/panduan/${item.slug}`}
                  className="d-flex text-decoration-none w-100 gap-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                  <div>
                    <div className="fw-semibold text-dark">
                      <small>{item.title}</small>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {new Date(item.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
      </ul>
    </aside>
  );
};

export default SidebarPopularGuides;
