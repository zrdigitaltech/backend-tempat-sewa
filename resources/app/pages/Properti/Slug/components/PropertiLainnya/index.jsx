import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListLainnya } from '@/app/redux/action/kontrakan/creator';

import PropertiCard from '@/app/components/PropertiCard';

const Index = props => {
  const { slug } = props;
  const kontrakanListLainnya = useSelector(state => state?.kontrakan?.kontrakanListLainnya);
  const dispatch = useDispatch();

  const fetchKontrakanLainnya = async () => {
    dispatch(getListLainnya(slug));
  };

  useEffect(() => {
    fetchKontrakanLainnya();
  }, [kontrakanListLainnya, dispatch]);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h5 className="fw-semibold mb-4">Properti Lainnya</h5>
        <div className="position-relative">
          <div
            className="d-flex gap-3 overflow-auto pb-2 ps-1"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {kontrakanListLainnya?.map((kontrakan, index) => (
              <div
                key={kontrakan?.id || index}
                className="flex-shrink-0"
                style={{
                  width: '250px',
                  scrollSnapAlign: 'start'
                }}
              >
                <PropertiCard {...kontrakan} btnTelp={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
