import React, { Fragment } from 'react';
// Components
import { UseModals } from '@/app/components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './preview.scss';
import { ShareModal } from '@/app/pages/modal';

const Index = props => {
  const {
    show,
    onClose,
    preview,
    kontrakanDetail,
    showShare,
    setShowShare,
    handleWhatsApp,
    handlePhone
  } = props;

  // Temukan index gambar yang cocok dengan preview
  const initialIndex = kontrakanDetail?.image?.findIndex(img => img === preview);

  return (
    <UseModals
      title="Preview"
      show={show}
      onClose={onClose}
      position="center"
      modalDialog="modal-fullscreen"
      modalBackdrop={false}
      modalBody={
        <Fragment>
          <div className="position-relative">
            <Carousel
              selectedItem={initialIndex !== -1 ? initialIndex : 0}
              showArrows={true}
              autoPlay={false}
              infiniteLoop={false}
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
            <div
              className="position-absolute"
              style={{
                bottom: '7rem',
                left: '30%',
                transform: 'translateX(-50%)'
              }}
            >
              <button className="btn bg-white w-100 shadow" onClick={() => setShowShare(true)}>
                <i className="fa fa-share-alt"></i> Bagikan
              </button>
            </div>
            <div
              className="d-flex gap-2 ms-auto position-absolute"
              style={{
                bottom: '7rem',
                right: '4%',
                transform: 'translateX(-50%)'
              }}
            >
              <div>
                <button className="btn btn-primary w-100 shadow" onClick={handlePhone}>
                  <i className="fa fa-phone" aria-hidden="true"></i> {kontrakanDetail?.no_whatsapp}
                </button>
              </div>
              <div>
                <button
                  className="btn btn-success w-100 text-white shadow"
                  onClick={handleWhatsApp}
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Tanya Detail
                </button>
              </div>
            </div>
          </div>

          <ShareModal show={showShare} onClose={() => setShowShare(false)} data={kontrakanDetail} />
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default Index;
