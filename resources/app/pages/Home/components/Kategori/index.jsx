import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKategori } from '@/app/redux/action/kategori/creator';
import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Index() {
  const kategoriList = useSelector(state => state?.kategori?.kategoriList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const fetchKategori = async () => {
    setIsLoading(true);
    await dispatch(getListKategori());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchKategori();
  }, []);

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
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{
                    flex: '1 1 calc(33.333% - 1rem)',
                    maxWidth: 'calc(33.333% - 1rem)',
                    minWidth: '140px',
                    flexBasis: '140px'
                  }}
                >
                  <div className="card text-center border-0 shadow h-100 rounded-3 overflow-hidden">
                    <div className="card-body py-4">
                      <div className="fs-2 mb-2">
                        <Skeleton circle width={40} height={40} />
                      </div>
                      <Skeleton height={20} width={`80%`} style={{ margin: '0 auto' }} />
                    </div>
                  </div>
                </div>
              ))
            : kategoriList?.map((cat, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{
                    flex: '1 1 calc(33.333% - 1rem)',
                    maxWidth: 'calc(33.333% - 1rem)',
                    minWidth: '140px',
                    flexBasis: '140px'
                  }}
                >
                  <Link to={`/sewa/${cat.slug}`} className="text-decoration-none text-dark">
                    <div className="card text-center border-0 shadow h-100 rounded-3 overflow-hidden">
                      <div className="card-body py-4">
                        <div className="fs-2 mb-2">{iconLabel(cat.nama)}</div>
                        <h5 className="card-title mb-0">Sewa {cat.nama}</h5>
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
