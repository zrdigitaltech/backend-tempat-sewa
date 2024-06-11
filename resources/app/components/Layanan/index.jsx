import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListLayanan } from '@/redux/action/layanan/creator';

export default function Index() {
  const layananList = useSelector(state => state.layanan.layananList);
  const dispatch = useDispatch();

  const fetchLayananList = async () => {
    dispatch(getListLayanan());
  };

  useEffect(() => {
    fetchLayananList();
  }, []);

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-title">
          <h2>
            Layanan<span className="title-border-white"></span>
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {layananList?.slice(0, 9).map((item, x) => (
            <div
              className="col-md-4 col-sm-6"
              data-aos="flip-right"
              data-aos-delay="0"
              key={item?.id || x}
            >
              <div className="single-service-item">
                <div className="single-service-icon">
                  <img src={item?.image} alt={item?.alt} />
                </div>
                <div className="single-service-title">
                  <h3>{item?.title}</h3>
                </div>
                <div className="single-service-content">
                  <p>{item?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center row">
          {layananList?.slice(9).map((item, x) => (
            <div
              className="col-md-4 col-sm-6"
              data-aos="flip-right"
              data-aos-delay={x + 1 + '00'}
              key={item?.id || x}
            >
              <div className="single-service-item">
                <div className="single-service-icon">
                  <img src={item?.image} alt={item?.alt} />
                </div>
                <div className="single-service-title">
                  <h3>{item?.title}</h3>
                </div>
                <div className="single-service-content">
                  <p>{item?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
