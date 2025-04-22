import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/app/redux/action/kontrakan/creator';
import Breadcrumb from '@/app/components/Breadcrumb';
import FormSearch from '@/app/components/FormSearch';
import PropertiCard from '@/app/components/PropertiCard';

export default function Index() {
  const kontrakanList = useSelector(state => state?.kontrakan?.kontrakanList);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(8); // tampilkan 8 properti pertama

  const fetchKontrakan = async () => {
    dispatch(getListKontrakan());
  };

  useEffect(() => {
    fetchKontrakan();
  }, []);

  const handleLoadMore = () => {
    setVisible(prev => prev + 8); // tambah 8 lagi setiap klik
  };

  return (
    <Fragment>
      <Breadcrumb />

      <section className="mb-5 mt-2">
        <div className="container">
          {/* Form Search */}
          <FormSearch page={true} />

          {/* Placeholder hasil pencarian */}
          <div className="my-5">
            <h3 className="fw-bold mb-2">Properti Dijual di Tangerang</h3>
            <p className="text-muted mb-3">
              Ada <strong>10</strong> properti di properti ditemukan
            </p>

            <div className="row g-4">
              {kontrakanList?.slice(0, visible)?.map((item, index) => (
                <div key={index} className="col-6 col-lg-3 col-sm-4">
                  <PropertiCard {...item} />
                </div>
              ))}
            </div>

            {/* Tombol Muat Lainnya */}
            {visible < kontrakanList?.length && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-warning fw-semibold rounded-3 px-5"
                  onClick={handleLoadMore}
                >
                  Muat Lainnya
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
}
