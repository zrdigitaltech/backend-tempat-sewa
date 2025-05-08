// Slug.jsx
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Heads from '@/app/components/Heads';
import Breadcrumb from '@/app/components/Breadcrumb';
import DeskripsiExpandable from '@/app/components/DeskripsiExpandable';

// Modals
import ShareModal from '@/app/pages/Properti/Slug/Modal/Share';
import PreviewModal from '@/app/pages/Properti/Slug/Modal/Preview';
import WhatsAppModal from '@/app/pages/modal/WhatsApp';
import LaporkanIklanModal from '@/app/pages/modal/LaporkanIklan';

// Slug-specific components
import SliderImage from '@/app/pages/Properti/Slug/components/SliderImage';
import PropertiLainnya from '@/app/pages/Properti/Slug/components/PropertiLainnya';
import Sidebar from '@/app/pages/Properti/Slug/components/Sidebar';

// Redux Actions
import { getPropertiDetail } from '@/app/redux/action/kontrakan/creator';

// Styles
import './slug.scss';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Index = () => {
  // React Router & Redux
  const { slug } = useParams();
  const dispatch = useDispatch();
  const kontrakanDetail = useSelector(state => state?.kontrakan?.kontrakanDetail);

  // UI State
  const [isLoading, setIsLoading] = useState(true);
  const [isPageVerified, setIsPageVerified] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Modal States
  const [showShare, setShowShare] = useState(false);
  const [showPreview, setShowPreview] = useState(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showLaporkanIklan, setShowLaporkanIklan] = useState(false);

  const handleMouseDown = () => setDragging(false);
  const handleMouseMove = () => setDragging(true);
  const handleClick = img => {
    if (!dragging) {
      setShowPreview(img);
    }
  };

  const fetchPropertiDetail = async () => {
    setIsLoading(true);
    await dispatch(getPropertiDetail(slug));
    setIsLoading(false);
  };

  const iconKategori = nama => {
    switch (nama?.toLowerCase()) {
      case 'kost':
        return '🛏️';
      case 'rumah':
        return '🏠';
      case 'apartemen':
        return '🏢';
      case 'ruko':
        return '🏬';
      case 'kios':
        return '🛒';
      case 'gudang':
        return '🏗️';
      default:
        return '🏡';
    }
  };

  const handleGoToWhatsApp = no_whatsapp => {
    if (!no_whatsapp) {
      alert('Nomor WhatsApp tidak tersedia.');
      return;
    }

    alert(`Redirect langsung ke whatsapp ${no_whatsapp}`);
  };

  useEffect(() => {
    fetchPropertiDetail();
  }, [dispatch, slug]);

  return (
    <Fragment>
      <Heads
        title={`${kontrakanDetail?.nama} - oleh ${kontrakanDetail?.pemilik}`}
        deskripsi={kontrakanDetail?.deskripsi}
        image={kontrakanDetail?.image?.[0]}
      />
      <section className="ST--wrapper__navbar justify-content-end">
        <div className="ST--wrapper__navbar--body">
          {isLoading ? (
            <Skeleton width={100} height={40} borderRadius={8} />
          ) : (
            <button className="btn bg-white shadow" onClick={() => setShowShare(true)}>
              <i className="fa fa-share-alt"></i> Bagikan
            </button>
          )}
        </div>
      </section>

      <section className="mb-5">
        {/* Gambar Utama */}
        <div className="mb-3">
          <SliderImage
            images={kontrakanDetail?.image}
            nama={kontrakanDetail?.nama}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleClick={img => handleClick(img)}
            isLoading={isLoading}
          />
        </div>
        <div className="container">
          {/* Detail Info */}
          <div className="row g-4">
            <div className="col-md-8">
              {/* Breadcrumb */}
              <Breadcrumb containerClassName="px-0 mb-2" isLoading={isLoading} />
              <div className="mb-2 overflow-auto">
                <div className="d-flex flex-nowrap gap-2">
                  {isLoading ? (
                    <>
                      <Skeleton width={100} height={32} borderRadius={6} />
                      <Skeleton width={130} height={32} borderRadius={6} />
                      <Skeleton width={150} height={32} borderRadius={6} />
                    </>
                  ) : (
                    <Fragment>
                      {(kontrakanDetail?.member === 'Super Featured' ||
                        kontrakanDetail?.member === 'Premium') && (
                        <span
                          className={`align-content-center badge p-2 text-uppercase ${
                            kontrakanDetail?.member === 'Super Featured'
                              ? 'text-bg-primary'
                              : 'text-bg-warning'
                          }`}
                        >
                          <i className="fa fa-bolt pe-1"></i>
                          {kontrakanDetail?.member}
                        </span>
                      )}

                      <span className="align-content-center badge border border-secondary text-secondary bg-transparent text-capitalize">
                        {iconKategori(kontrakanDetail?.kategori?.nama)}{' '}
                        {kontrakanDetail?.kategori?.nama}
                      </span>

                      <span className="align-content-center badge border border-secondary text-secondary bg-transparent">
                        <i className="fa fa-clock-o"></i> Diperbaharui: {kontrakanDetail?.upload}
                      </span>
                    </Fragment>
                  )}
                </div>
              </div>

              {isLoading ? (
                <Fragment>
                  <Skeleton height={30} width={300} />
                  <Skeleton height={20} width={250} />
                </Fragment>
              ) : (
                <Fragment>
                  <h2
                    className="fw-bold text-primary mb-0 ST__text"
                    title={kontrakanDetail?.nama?.length > 50 ? kontrakanDetail?.nama : null}
                  >
                    {kontrakanDetail?.nama}
                  </h2>
                  <p className="text-muted">{kontrakanDetail?.alamat}</p>
                </Fragment>
              )}

              {/* Fasilitas */}
              <h5 className="fw-semibold mt-4">Fasilitas</h5>
              {isLoading ? (
                <ul className="list-unstyled row">
                  {/* Skeleton untuk daftar fasilitas */}
                  {Array.from({ length: 6 }).map((_, index) => (
                    <li key={index} className="col-6 mb-2">
                      <Skeleton width={150} height={20} />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-unstyled row">
                  {kontrakanDetail?.fasilitas?.map((item, i) => (
                    <li key={item || i} className="col-6 mb-2">
                      ✅ {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Deskripsi */}
              <h5 className="fw-semibold mt-4">Deskripsi</h5>
              {isLoading ? (
                <Skeleton count={3} height={20} />
              ) : (
                <DeskripsiExpandable deskripsi={kontrakanDetail?.deskripsi} />
              )}
            </div>

            {/* Sidebar */}
            <div className="col-md-4">
              <Sidebar
                slug={slug}
                kontrakanDetail={kontrakanDetail}
                handlePhone={() => setShowWhatsApp(true)}
                handleWhatsApp={() =>
                  isPageVerified
                    ? handleGoToWhatsApp(kontrakanDetail?.no_whatsapp)
                    : setShowWhatsApp(true)
                }
                handleLaporkanIklan={() => setShowLaporkanIklan(true)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </section>

      <PropertiLainnya slug={slug} />

      {/* Share Modal */}
      <ShareModal show={showShare} onClose={() => setShowShare(false)} data={kontrakanDetail} />
      <PreviewModal
        show={showPreview}
        onClose={() => setShowPreview(null)}
        preview={showPreview}
        kontrakanDetail={kontrakanDetail}
        showShare={showShare}
        setShowShare={setShowShare}
        handleWhatsApp
        handleNoTelp
      />
      <WhatsAppModal
        show={showWhatsApp}
        setShowWhatsApp={setShowWhatsApp}
        onClose={() => setShowWhatsApp(false)}
        isPageVerified={isPageVerified}
        setIsPageVerified={setIsPageVerified}
        handleGoWhatsApp={() => handleGoToWhatsApp(kontrakanDetail?.no_whatsapp)}
      />
      <LaporkanIklanModal show={showLaporkanIklan} onClose={() => setShowLaporkanIklan(false)} />
    </Fragment>
  );
};

export default Index;
