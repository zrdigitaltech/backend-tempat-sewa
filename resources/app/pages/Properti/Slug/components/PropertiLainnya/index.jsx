import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListLainnya } from '@/app/redux/action/kontrakan/creator';

// Components
import { GridView } from '@/app/components/PropertiCard';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Index = props => {
  // React Router & Redux
  const { slug } = props;
  const kontrakanListLainnya = useSelector(state => state?.kontrakan?.kontrakanListLainnya);
  const dispatch = useDispatch();

  // UI State
  const [isLoading, setIsLoading] = useState(true);

  const fetchKontrakanLainnya = async () => {
    setIsLoading(true);
    await dispatch(getListLainnya(slug));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchKontrakanLainnya();
  }, [dispatch, slug]);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h5 className="fw-semibold mb-4">Properti Lainnya</h5>
        <div className="position-relative">
          <div
            className="d-flex gap-3 overflow-auto pb-2 ps-1"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0"
                    style={{
                      width: '250px',
                      scrollSnapAlign: 'start'
                    }}
                  >
                    <Skeleton height={200} />
                    <Skeleton count={2} />
                  </div>
                ))
              : kontrakanListLainnya?.map((kontrakan, index) => (
                  <div
                    key={kontrakan?.id || index}
                    className="flex-shrink-0"
                    style={{
                      width: '250px',
                      scrollSnapAlign: 'start'
                    }}
                  >
                    <GridView {...kontrakan} btnTelp={false} swipeable={false} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
