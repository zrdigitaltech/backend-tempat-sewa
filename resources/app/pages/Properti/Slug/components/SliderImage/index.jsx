import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Index = props => {
  const { images, nama, handleMouseDown, handleMouseMove, handleClick } = props;

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      {images?.map((x, i) => (
        <div key={x || i}>
          <img
            style={{ width: '100%', height: '400px', objectFit: 'cover', padding: '0 0.3rem' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            className="cursor-pointer"
            src={x}
            allt={nama}
            onClick={() => handleClick(images[i])}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Index;
