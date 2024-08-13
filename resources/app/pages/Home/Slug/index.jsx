import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListGaleri } from '@/redux/action/galeri/creator';

import { Link } from 'react-router-dom';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the Carousel CSS

export default function Index() {
  // const galeriList = useSelector(state => state.galeri.galeriList);
  // const dispatch = useDispatch();

  const onChange = (index, item) => {
    console.log('Changed to:', index, item);
  };

  const onClickItem = (index, item) => {
    console.log('Clicked item:', index, item);
  };

  const onClickThumb = (index, item) => {
    console.log('Clicked thumbnail:', index, item);
  };

  // useEffect(() => {
  // }, []);

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-title">
          <Link to="/">
            <h2>Nama Pemilik Kontrakan</h2>
          </Link>
          <smal>
            Beranda / <b>Slug</b>
          </smal>
          <span className="title-border-white"></span>
        </div>
      </div>
      <div className="container mt-3">
        <div className="d-flex justify-content-center row">
          <div className="col-sm-12 col-md-12" data-aos="slide-up" data-aos-delay="0">
            <Carousel
              showArrows={true}
              autoPlay={true}
              infiniteLoop={true}
              showStatus={false}
              showIndicators={false}
              swipeable={true}
              emulateTouch={true}
            >
              {[1, 2, 3, 4, 5].map((item, idx) => (
                <div key={item?.id || idx}>
                  <img src="https://placehold.co/1200x675/webp" alt="Nama Pemilik Kontrakan" />
                  {/* <p className="legend">Legend 1</p> */}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div data-aos="slide-up" data-aos-delay="200">
            <h3>Slug</h3>
          </div>
        </div>
        <div data-aos="slide-up" data-aos-delay="400">
          <div className="d-flex justify-content-center mt-3 row">
            <div className="col-sm-12 col-md-12">
              <div className="single-content-informasi">Deskripsi</div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3 row">
            <div className="col-sm-12 col-md-12">- Kamar Mandi</div>
          </div>
        </div>
      </div>
    </section>
  );
}
