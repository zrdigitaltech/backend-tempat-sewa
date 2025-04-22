import React from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  const iconLabel = label => {
    switch (label?.toLowerCase()) {
      case 'kost':
        return '🛏️';
      case 'rumah':
        return '🏠';
      case 'apartemen':
        return '🏢';
      case 'ruko':
        return '🏬';
      case 'kios':
        return '🛒';
      case 'gudang':
        return '🏗️';
      default:
        return '🏡'; // fallback icon
    }
  };
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center fw-semibold mb-3">Kategori Cepat</h2>
        <div
          className="d-flex flex-nowrap justify-content-start gap-3 overflow-auto px-2 py-4"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          {[
            { label: 'Kost', slug: 'kost' },
            { label: 'Rumah', slug: 'rumah' },
            { label: 'Apartemen', slug: 'apartemen' },
            { label: 'Ruko', slug: 'ruko' },
            { label: 'Kios', slug: 'kios' },
            { label: 'Gudang', slug: 'gudang' }
          ].map((cat, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                flex: '1 1 calc(33.333% - 1rem)', // 3 columns on desktop
                maxWidth: 'calc(33.333% - 1rem)', // 3 columns
                minWidth: '140px', // Minimum width for mobile
                flexBasis: '140px'
              }}
            >
              <Link to={`/sewa/${cat.slug}`} className="text-decoration-none text-dark">
                <div className="card text-center border-0 shadow h-100 rounded-3 overflow-hidden">
                  <div className="card-body py-4">
                    <div className="fs-2 mb-2">{iconLabel(cat.label)}</div>
                    <h5 className="card-title mb-0">Sewa {cat.label}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
