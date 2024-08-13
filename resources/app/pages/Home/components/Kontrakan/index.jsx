import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListGaleri } from '@/redux/action/galeri/creator';

import { Link } from 'react-router-dom';

export default function Index() {
  // const galeriList = useSelector(state => state.galeri.galeriList);
  // const dispatch = useDispatch();

  // const fetchSlides = async () => {
  // };

  // useEffect(() => {
  // }, []);

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-title">
          <Link to="/">
            <h2>
              Nama Pemilik Kontrakan<span className="title-border-white"></span>
            </h2>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className={`${[1, 2]?.length <= 2 ? 'd-flex justify-content-center' : 'row'}`}>
          {[1].map((item, idx) => (
            <div
              key={item?.id || idx}
              className="col-md-4 col-sm-6"
              data-aos="flip-right"
              data-aos-delay="0"
            >
              <Link to="/slug">
                <div className="single-service-item">
                  <div className="single-service-icon">
                    <img
                      src="https://placehold.co/1200x675/webp"
                      alt="Nama Pemilik Kontrakan"
                      className="w-100"
                    />
                  </div>
                  <div className="single-service-description">
                    <div className="single-service-title">
                      <h3>Kontrakan {idx + 1}</h3>
                    </div>
                    <div className="single-service-content">
                      <p>Detail</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          <div className="col-md-4 col-sm-6 d-flex" data-aos="flip-right" data-aos-delay="0">
            <div className="single-service-item">
              <div className="single-service-icon grayscale">
                <img
                  src="https://makan-bang.id/_next/image?url=https%3A%2F%2Fdashboard.makan-bang.id%2Fimages%2Fslide%2F37ee04a981cfed9b80bdc76b8df243e53f8c5e06bd69267f7f70ed1afcb84676.jpeg&w=1200&q=75"
                  alt="Nama Pemilik Kontrakan"
                  className="w-100"
                />
              </div>
              <div className="single-service-description">
                <div className="single-service-title">
                  <h3>Kontrakan 4</h3>
                </div>
                <div className="single-service-content"></div>
              </div>

              <div className="single-service-available">Tidak Tersedia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
