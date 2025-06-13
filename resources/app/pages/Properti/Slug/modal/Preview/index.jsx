import React, { Fragment, useEffect, useState } from 'react';
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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 480);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // untuk update langsung saat pertama render

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <UseModals
      title="Preview"
      show={show}
      onClose={onClose}
      position="center"
      modalDialog="modal-fullscreen"
      modalBackdrop={false}
      classModalBody="p-0 position-relative"
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
            <div className="d-none d-lg-inline">
              <div
                className="position-absolute"
                style={{
                  bottom: '7rem',
                  left: isMobile ? '8px' : '30%',
                  transform: isMobile ? '' : 'translateX(-50%)'
                }}
              >
                <button className="btn bg-white w-100 shadow" onClick={() => setShowShare(true)}>
                  <i className="fa fa-share-alt me-1"></i>{' '}
                  <span className="d-none d-lg-inline">Bagikan</span>
                </button>
              </div>
              <div
                className="d-flex gap-2 ms-auto position-absolute"
                style={{
                  bottom: '7rem',
                  right: isMobile ? '8px' : '4%',
                  transform: isMobile ? '' : 'translateX(-50%)'
                }}
              >
                <div>
                  <button className="btn btn-primary w-100 shadow" onClick={handlePhone}>
                    <i className="fa fa-phone" aria-hidden="true"></i>{' '}
                    <span className="d-none d-lg-inline">{kontrakanDetail?.no_whatsapp}</span>
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
          </div>

          <div className="position-fixed w-100 bottom-0 bg-white border-top d-lg-none shadow-lg">
            <div className="d-flex px-2 py-3">
              <div className="me-auto">
                <button className="btn bg-white w-100 shadow" onClick={() => setShowShare(true)}>
                  <i className="fa fa-share-alt me-1"></i>{' '}
                  <span className="d-none d-lg-inline">Bagikan</span>
                </button>
              </div>
              <div className="d-flex gap-2 ms-auto ">
                <div>
                  <button className="btn btn-primary w-100 shadow" onClick={handlePhone}>
                    <i className="fa fa-phone" aria-hidden="true"></i>{' '}
                    <span className="d-none d-lg-inline">{kontrakanDetail?.no_whatsapp}</span>
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
          </div>

          <ShareModal show={showShare} onClose={() => setShowShare(false)} data={kontrakanDetail} />
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default Index;
