import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/app/redux/action/kontrakan/creator';
import Breadcrumb from '@/app/components/Breadcrumb';
import FormSearch from '@/app/components/FormSearch';
import PropertiCard from '@/app/components/PropertiCard';
import { useLocation } from 'react-router-dom';

export default function Index() {
  const kontrakanList = useSelector(state => state?.kontrakan?.kontrakanList);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(8);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const tipeProperti = searchParams.get('tipeProperti');
  const keyword = searchParams.get('keyword');
  const tipeSewa = searchParams.get('tipeSewa');

  const [formData, setFormData] = useState({
    tipeProperti: '',
    keyword: '',
    tipeSewa: ''
  });

  const fetchFormData = async () => {
    setFormData({
      tipeProperti: tipeProperti,
      keyword: keyword,
      tipeSewa: tipeSewa
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fetchKontrakan = async () => {
    dispatch(getListKontrakan());
  };

  useEffect(() => {
    fetchKontrakan();
    fetchFormData();
  }, []);

  const handleLoadMore = () => {
    setVisible(prev => prev + 8); // tambah 8 lagi setiap klik
  };

  return (
    <Fragment>
      {/* <div className="mt-3">
        <Breadcrumb />
      </div> */}

      <section className="mb-5 mt-3">
        <div className="container">
          {/* Form Search */}
          <div className="mb-5">
            <FormSearch page={true} formData={formData} handleChange={handleChange} />
          </div>

          {/* Placeholder hasil pencarian */}
          <div>
            <h3 className="fw-bold mb-2 text-capitalize">
              Sewa {tipeProperti} {keyword} di Indonesia
            </h3>
            <p className="text-muted mb-3">
              Ada <strong>10</strong> properti di ditemukan
            </p>

            <div className="row g-4">
              {kontrakanList?.slice(0, visible)?.map((item, index) => (
                <div key={index} className="col-12 col-lg-3 col-sm-4">
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
