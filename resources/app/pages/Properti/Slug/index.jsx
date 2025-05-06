// Slug.jsx
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { formatPriceLocale } from '@/app/helpers';
import Heads from '@/app/components/Heads';
import Breadcrumb from '@/app/components/Breadcrumb';
import ShareModal from '@/app/pages/Properti/Slug/Modal/Share';
import PreviewModal from '@/app/pages/Properti/Slug/Modal/Preview';
import SliderImage from '@/app/pages/Properti/Slug/components/SliderImage';
import PropertiLainnya from '@/app/pages/Properti/Slug/components/PropertiLainnya';
import { useSelector, useDispatch } from 'react-redux';
import { getPropertiDetail } from '@/app/redux/action/kontrakan/creator';
import DeskripsiExpandable from '@/app/components/DeskripsiExpandable';

const Index = () => {
  const { slug } = useParams();
  const kontrakanDetail = useSelector(state => state?.kontrakan?.kontrakanDetail);
  const dispatch = useDispatch();

  const [showShare, setShowShare] = useState(false);
  const [showPreview, setShowPreview] = useState(null);

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

      <section className="mb-5">
        {/* Gambar Utama */}
        <div className="row">
          <div className="col-12 mb-3">
            <div className="responsive position-relative">
              <SliderImage
                images={kontrakanDetail?.image}
                nama={kontrakanDetail?.nama}
                handleMouseDown={handleMouseDown}
                handleMouseMove={handleMouseMove}
                handleClick={img => handleClick(img)}
              />
              <div
                className="position-absolute"
                style={{
                  top: '10px',
                  right: '10px'
                }}
              >
                <small className="text-secondary">
                  <i className="fa fa-photo"></i> {kontrakanDetail?.image?.length}
                </small>
              </div>
            </div>
          </div>
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

                  <span className="align-content-center badge border border-secondary text-secondary bg-transparent">
                    🛏️ Kost
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
              <div
                className="card shadow-sm p-4 position-sticky"
                style={{
                  top: '100px' // jarak dari atas saat sticky
                }}
              >
                <h2 className="fw-bold text-primary mb-0 text-center">
                  Rp {formatPriceLocale(kontrakanDetail?.harga)}{' '}
                  <span className="text-capitalize">/ {kontrakanDetail?.durasi}</span>
                </h2>
                <hr className="my-3" />
                <div className="d-flex justify-content-center mb-3">
                  <div className="text-center position-relative">
                    <div className="d-flex justify-content-center">
                      <div className="position-relative" style={{ width: '80px' }}>
                        <img
                          src="https://placehold.co/800x600?text=Image+1"
                          alt="Foto Profil"
                          className="rounded-circle img-fluid"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                        <i
                          className="fa fa-check-circle text-primary"
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            right: '8px',
                            background: 'white',
                            borderRadius: '50%',
                            fontSize: '14px'
                          }}
                        ></i>
                      </div>
                    </div>
                    <div className="mt-1">
                      <strong
                        className="d-block ST__text"
                        title={
                          kontrakanDetail?.pemilik?.length > 50 ? kontrakanDetail?.pemilik : ''
                        }
                      >
                        {(kontrakanDetail?.pemilik || '').length > 50
                          ? kontrakanDetail.pemilik.substring(0, 50) + '...'
                          : kontrakanDetail?.pemilik}
                      </strong>
                    </div>
                  </div>
                </div>
                {kontrakanDetail?.status?.toLowerCase() === 'tersedia' && (
                  <Fragment>
                    <button className="btn btn-success w-100">Hubungi Pemilik</button>

                    <Link
                      className="btn btn-outline-primary w-100 mt-2 mb-2"
                      to={`/properti/${slug}`}
                    >
                      Booking Sekarang
                    </Link>
                  </Fragment>
                )}

                {/* Share Button */}
                <button
                  className="btn btn-outline-info w-100"
                  onClick={() => setShowShare(true)} // Trigger modal on click
                >
                  Bagikan
                </button>
                <small
                  className="position-absolute cursor-pointer"
                  style={{
                    right: '0',
                    bottom: '-2rem'
                  }}
                  onClick={() => alert('Form laporan akan ditampilkan di sini')}
                >
                  Laporkan Iklan
                </small>
              </div>
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
      />
    </Fragment>
  );
};

export default Index;
