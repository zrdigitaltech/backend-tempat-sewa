import React, { Fragment } from 'react';
import Modals from '@/app/components/Modals';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './preview.scss';

const Index = props => {
  const { show, onClose, preview, kontrakanDetail } = props;

  // Temukan index gambar yang cocok dengan preview
  const initialIndex = kontrakanDetail?.image?.findIndex(img => img === preview);

  return (
    <Modals
      title="Preview"
      show={show}
      onClose={onClose}
      position="center"
      modalDialog="modal-fullscreen"
      modalBody={
        <Fragment>
          <Carousel
            selectedItem={initialIndex !== -1 ? initialIndex : 0}
            showArrows={false}
            autoPlay={false}
            infiniteLoop={true}
            showStatus={true}
            showIndicators={false}
            swipeable={true}
            emulateTouch={true}
            showThumbs={true}
          >
            {kontrakanDetail?.image?.map((img, index) => (
              <div key={index}>
                <img
                  key={index}
                  src={img}
                  alt={kontrakanDetail?.name}
                  style={{
                    maxHeight: '60vh', // Batasi tinggi gambar agar tidak melebihi tinggi layar
                    objectFit: 'contain', // Jaga proporsi tanpa crop
                    width: '100%', // Agar tidak overflow
                    height: 'auto' // Tinggi otomatis berdasarkan lebar
                  }}
                />
              </div>
            ))}
          </Carousel>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default Index;
