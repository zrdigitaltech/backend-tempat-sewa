import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/app/redux/action/kontrakan/creator';

import PropertiCard from '@/app/components/PropertiCard';

export default function Index() {
  const kontrakanList = useSelector(state => state?.kontrakan?.kontrakanList);
  const dispatch = useDispatch();

  const fetchKontrakan = async () => {
    dispatch(getListKontrakan());
  };

  useEffect(() => {
    fetchKontrakan();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-semibold mb-4">Properti Terbaru</h2>
        <div className="row g-4">
          {kontrakanList?.map((item, index) => (
            <div key={index} className="col-6 col-lg-3 col-sm-4">
              <PropertiCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
