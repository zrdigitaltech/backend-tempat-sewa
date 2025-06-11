import React from 'react';

// Slider
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Styles
import './sliderimage.scss';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Index = props => {
  const { images, nama, handleMouseDown, handleMouseMove, handleClick, isLoading = false } = props;

  const SampleNextArrow = props => {
    const { className, style, onClick } = props;
    return null;
  };

  const SamplePrevArrow = props => {
    const { className, style, onClick } = props;
    return null;
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    appendDots: dots => <ul style={{ margin: '0px' }}>{dots}</ul>,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 1
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      {isLoading ? (
        <div>
          <Skeleton height={400} />
        </div>
      ) : (
        images?.map((x, i) => (
          <div key={x || i}>
            <img
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              className="cursor-pointer"
              src={x}
              alt={nama}
              onClick={() => handleClick(images[i])}
            />
          </div>
        ))
      )}
    </Slider>
  );
};

export default Index;
