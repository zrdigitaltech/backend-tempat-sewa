// Slug.jsx
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Heads from '@/app/components/Heads';
import Breadcrumb from '@/app/components/Breadcrumb';
import ShareModal from '@/app/pages/Properti/Slug/Modal/Share';
import PreviewModal from '@/app/pages/Properti/Slug/Modal/Preview';
import SliderImage from '@/app/pages/Properti/Slug/components/SliderImage';
import PropertiLainnya from '@/app/pages/Properti/Slug/components/PropertiLainnya';
import Sidebar from '@/app/pages/Properti/Slug/components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { getPropertiDetail } from '@/app/redux/action/kontrakan/creator';
import DeskripsiExpandable from '@/app/components/DeskripsiExpandable';
import './slug.scss';
import WhatsAppModal from '@/app/pages/modal/WhatsApp';
import LaporkanIklanModal from '@/app/pages/modal/LaporkanIklan';

const Index = () => {
  const { slug } = useParams();
  const kontrakanDetail = useSelector(state => state?.kontrakan?.kontrakanDetail);
  const dispatch = useDispatch();

  const [showShare, setShowShare] = useState(false);
  const [showPreview, setShowPreview] = useState(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showLaporkanIklan, setShowLaporkanIklan] = useState(false);

  const [dragging, setDragging] = useState(false);

  const handleMouseDown = () => setDragging(false);
  const handleMouseMove = () => setDragging(true);
  const handleClick = img => {
    if (!dragging) {
      setShowPreview(img);
    }
  };

  const fetchPropertiDetail = () => {
    dispatch(getPropertiDetail(slug));
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
          <button className="btn bg-white w-100 shadow" onClick={() => setShowShare(true)}>
            <i className="fa fa-share-alt"></i> Bagikan
          </button>
        </div>
      </section>

      <section className="mb-5">
        {/* Gambar Utama */}
        <div className="responsive mb-3">
          <SliderImage
            images={kontrakanDetail?.image}
            nama={kontrakanDetail?.nama}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleClick={img => handleClick(img)}
          />
        </div>
        <div className="container">
          {/* Detail Info */}
          <div className="row g-4">
            <div className="col-md-8">
              {/* Breadcrumb */}
              <Breadcrumb containerClassName="px-0 mb-2" />
              <div className="mb-2 overflow-auto">
                <div className="d-flex flex-nowrap gap-2">
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
                </div>
              </div>

              <h2
                className="fw-bold text-primary mb-0 ST__text"
                title={kontrakanDetail?.nama?.length > 50 ? kontrakanDetail?.nama : null}
              >
                {kontrakanDetail?.nama}
              </h2>
              <p className="text-muted">{kontrakanDetail?.alamat}</p>

              {/* Fasilitas */}
              <h5 className="fw-semibold mt-4">Fasilitas</h5>
              <ul className="list-unstyled row">
                {kontrakanDetail?.fasilitas?.map((item, i) => (
                  <li key={item || i} className="col-6 mb-2">
                    ✅ {item}
                  </li>
                ))}
              </ul>

              {/* Deskripsi */}
              <h5 className="fw-semibold mt-4">Deskripsi</h5>
              <DeskripsiExpandable deskripsi={kontrakanDetail?.deskripsi} />
            </div>

            {/* Sidebar */}
            <div className="col-md-4">
              <Sidebar
                slug={slug}
                kontrakanDetail={kontrakanDetail}
                handlePhone={() => setShowWhatsApp(true)}
                handleWhatsApp={() => setShowWhatsApp(true)}
                handleLaporkanIklan={() => setShowLaporkanIklan(true)}
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
      <WhatsAppModal show={showWhatsApp} onClose={() => setShowWhatsApp(false)} />
      <LaporkanIklanModal show={showLaporkanIklan} onClose={() => setShowLaporkanIklan(false)} />
    </Fragment>
  );
};

export default Index;
