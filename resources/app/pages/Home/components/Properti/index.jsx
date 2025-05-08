import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/app/redux/action/kontrakan/creator';

import PropertiCard from '@/app/components/PropertiCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Index() {
  const kontrakanList = useSelector(state => state?.kontrakan?.kontrakanList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const fetchKontrakan = async () => {
    setIsLoading(true);
    await dispatch(getListKontrakan());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchKontrakan();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-semibold mb-4">Properti Terbaru</h2>
        <div className="row g-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="col-6 col-lg-3 col-sm-4">
                  <Skeleton height={200} />
                  <Skeleton count={2} />
                </div>
              ))
            : kontrakanList?.map((item, index) => (
                <div key={index} className="col-6 col-lg-3 col-sm-4">
                  <PropertiCard {...item} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
