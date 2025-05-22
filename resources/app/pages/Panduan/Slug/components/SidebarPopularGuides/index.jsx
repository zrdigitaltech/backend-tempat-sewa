import React from 'react';
import { Link } from 'react-router-dom';

const SidebarPopularGuides = ({ guides }) => {
  return (
    <div className="col-12 col-lg-4">
      <aside className="position-sticky" style={{ top: '85px' }}>
        <h5 className="mb-3">Artikel Populer</h5>
        <ul className="list-unstyled">
          {guides?.slice(0, 8).map(item => (
            <li key={item.slug} className="d-flex mb-3">
              <Link
                to={`/panduan/${item.slug}`}
                className="d-flex text-decoration-none w-100 gap-2"
              >
                <img
                  src={item.coverImage}
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
    </div>
  );
};

export default SidebarPopularGuides;
