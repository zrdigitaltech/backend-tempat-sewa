import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListTestimoni } from '@/redux/action/testimoni/creator';

export default function Index() {
  const testimoniList = useSelector((state) => state.testimoni.testimoniList);
  const dispatch = useDispatch();

  const fetchTestimoniList = async () => {
    dispatch(getListTestimoni());
  };

  useEffect(() => {
    fetchTestimoniList();
  }, []);
  return (
    <section id="testimonials" className="testimonials-wrapper">
      <div className="container">
        <div className="section-title">
          <h2>
            Testimoni Klien
            <span className="title-border-white"></span>
          </h2>
        </div>
      </div>
      <div className="container">
        <div id="our-testimonials" className="owl-carousel owl-theme">
          {testimoniList?.map((item, x) => (
            <div className="item" key={item?.id || x} data-aos="flip-right" data-aos-delay="0">
              <div className="testimonials-inner">
                <div className="test-quote">
                  <p>{item?.description}</p>
                </div>
                <div className="testmonials-info">
                  <div className="testmonials-pic">
                    {' '}
                    <img src={item?.image} alt="" />{' '}
                  </div>
                  <div className="testmonials-details">
                    <h4>{item?.nama}</h4>
                    <span>{item?.position}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
