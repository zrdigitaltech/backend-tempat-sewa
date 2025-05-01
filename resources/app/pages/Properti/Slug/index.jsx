// Slug.jsx
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams } from 'react-router-dom';
import { formatPriceLocale, formatViews } from '@/app/helpers';
import Heads from '@/app/components/Heads';
import Breadcrumb from '@/app/components/Breadcrumb';
import ShareModal from '@/app/pages/Properti/Slug/Modal/Share';
import PreviewModal from '@/app/pages/Properti/Slug/Modal/Preview';
import PropertiLainnya from '@/app/pages/Properti/Slug/components/PropertiLainnya';
import { useSelector, useDispatch } from 'react-redux';
import { getPropertiDetail } from '@/app/redux/action/kontrakan/creator';
import { useNavigate } from 'react-router-dom';
import DeskripsiExpandable from '@/app/components/DeskripsiExpandable';

const Index = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const kontrakanDetail = useSelector(state => state?.kontrakan?.kontrakanDetail);
  const dispatch = useDispatch();

  const [showShare, setShowShare] = useState(false);
  const [showPreview, setShowPreview] = useState(null);

  const fetchPropertiDetail = () => {
    dispatch(getPropertiDetail(slug));
  };

  useEffect(() => {
    fetchPropertiDetail();
  }, [kontrakanDetail, dispatch, slug]);

  return (
    <Fragment>
      <Heads
        title={`${kontrakanDetail?.nama} - oleh Zikri Ramdani`}
        deskripsi={kontrakanDetail?.deskripsi}
        image={kontrakanDetail?.image?.[0]}
      />
      {/* Breadcrumb */}
      <Breadcrumb />

      <section className="mb-5 mt-2">
        <div className="container ">
          {/* Gambar Utama */}
          <div className="row">
            <div className="col-12 mb-3">
              <div className="position-relative">
                <Carousel
                  showArrows={true}
                  autoPlay={false}
                  infiniteLoop={true}
                  showStatus={true}
                  showIndicators={false}
                  swipeable={true}
                  emulateTouch={true}
                  showThumbs={false}
                  // centerMode={true}
                  className="rounded-4 overflow-hidden cursor-pointer"
                  onClickItem={index => setShowPreview(kontrakanDetail?.image[index])}
                >
                  {kontrakanDetail?.image?.map((x, i) => (
                    <img
                      key={x || i}
                      src={`https://placehold.co/600x200?text=Image+${i + 1}`}
                      className="w-100"
                    />
                  ))}
                </Carousel>

                {(kontrakanDetail?.member === 'Super Featured' ||
                  kontrakanDetail?.member === 'Premium') && (
                  <div
                    className={`ST__badge ${(kontrakanDetail?.member === 'Super Featured' && 'bg-primary') || (kontrakanDetail?.member === 'Premium' && 'bg-warning')} `}
                  >
                    <i className="fa fa-bolt"></i>
                    <span>{kontrakanDetail?.member}</span>
                  </div>
                )}

                {/* Eye View */}
                <div
                  className="badge position-absolute d-flex align-items-center mb-2"
                  style={{
                    bottom: '0px',
                    left: '10px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '6px 10px',
                    borderRadius: '6px'
                  }}
                >
                  <i className="fa fa-eye pe-1" aria-hidden="true"></i>{' '}
                  {formatViews(kontrakanDetail?.views)}
                </div>
              </div>
            </div>
          </div>

          {/* Detail Info */}
          <div className="row g-4">
            <div className="col-md-8">
              <h2 className="fw-bold text-primary mb-0">{kontrakanDetail?.nama}</h2>
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
                {kontrakanDetail?.status?.toLowerCase() === 'tersedia' && (
                  <Fragment>
                    <button
                      className="btn btn-success w-100"
                      disabled={kontrakanDetail?.status?.toLowerCase() === 'tersedia'}
                    >
                      Hubungi Pemilik
                    </button>

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

                {/* Laporkan Iklan */}
                <button
                  className="btn btn-outline-danger w-100 mt-2"
                  onClick={() => alert('Form laporan akan ditampilkan di sini')}
                >
                  Laporkan Iklan
                </button>

                <hr className="my-4" />
                <div>
                  {kontrakanDetail?.durasiMinimal && (
                    <p className="mb-1">
                      <strong>Durasi Minimal:</strong> {kontrakanDetail?.durasiMinimal}{' '}
                      <span className="text-capitalize">{kontrakanDetail?.durasi}</span>
                    </p>
                  )}
                  <p className="mb-1">
                    <strong>Status:</strong>{' '}
                    <span
                      className={`text-${kontrakanDetail?.status?.toLowerCase() === 'tersedia' ? 'success' : 'danger'}`}
                    >
                      {kontrakanDetail?.status}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Upload:</strong> {kontrakanDetail?.upload}
                  </p>
                  <p className="mb-0">
                    <strong>Pemilik:</strong>{' '}
                    <Link
                      to={`/agent/${kontrakanDetail?.pemilikSlug}`}
                      className="text-decoration-none"
                    >
                      {kontrakanDetail?.pemilik}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PropertiLainnya slug={slug} />

      {/* Share Modal */}
      <ShareModal show={showShare} onClose={() => setShowShare(false)} data={kontrakanDetail} />
      <PreviewModal show={showPreview} onClose={() => setShowPreview(null)} preview={showPreview} />
    </Fragment>
  );
};

export default Index;
