// Slug.jsx
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/app/redux/action/kontrakan/creator';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams } from 'react-router-dom';
import { formatPriceLocale, formatViews } from '@/app/helpers';
import Heads from '@/app/components/Heads';
import Breadcrumb from '@/app/components/Breadcrumb';
import ShareModal from '@/app/pages/Properti/Slug/Modal/Share';
import PreviewModal from '@/app/pages/Properti/Slug/Modal/Preview';
import PropertiCard from '@/app/components/PropertiCard';

const Index = () => {
  const { slug } = useParams();
  const kontrakanList = useSelector(state => state.kontrakan.kontrakanList);
  const dispatch = useDispatch();

  const [kontrakanDetail, setKontrakanDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [showPreview, setShowPreview] = useState(null);

  useEffect(() => {
    const fetchKontrakanDetails = async () => {
      setIsLoading(true);
      await dispatch(getListKontrakan());
    };

    fetchKontrakanDetails();
  }, [dispatch]);

  useEffect(() => {
    if (kontrakanList?.length > 0) {
      const findSlug = kontrakanList?.find(item => item?.slug === slug);
      if (findSlug) {
        setKontrakanDetail(findSlug);
      }
      setIsLoading(false);
    }
  }, [kontrakanList, slug]);

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
                  centerMode={true}
                  className="rounded-4 overflow-hidden cursor-pointer"
                  onClickItem={index => setShowPreview([1, 2, 3][index])}
                >
                  {[1, 2, 3].map((x, i) => (
                    <img
                      key={x || i}
                      src={`https://placehold.co/600x200?text=Image+${i + 1}`}
                      className="w-100"
                    />
                  ))}
                </Carousel>

                <span
                  className="badge bg-warning text-dark position-absolute"
                  style={{
                    top: '10px',
                    left: '10px',
                    fontSize: '0.75rem',
                    padding: '6px 10px',
                    borderRadius: '6px'
                  }}
                >
                  Pilihan Paket Member
                </span>

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
                  <i className="fa fa-eye pe-1" aria-hidden="true"></i> {formatViews(1000)}
                </div>
              </div>
            </div>
          </div>

          {/* Detail Info */}
          <div className="row g-4">
            <div className="col-md-8">
              <h2 className="fw-bold text-primary">
                Rp {formatPriceLocale(1050000)} <span>/ bulan</span>
              </h2>
              <h5 className="fw-semibold mb-2">Kontrakan 2 Kamar di Jakarta Timur</h5>
              <p className="text-muted">Jl. Melati No. 45, Duren Sawit, Jakarta Timur</p>

              {/* Fasilitas */}
              <h5 className="fw-semibold mt-4">Fasilitas</h5>
              <ul className="list-unstyled row">
                {[
                  '2 Kamar Tidur',
                  '1 Kamar Mandi',
                  'Dapur',
                  'Listrik 1300W',
                  'Air Sumur',
                  'Parkir Motor'
                ].map((item, i) => (
                  <li key={item?.id ?? i} className="col-6 mb-2">
                    ✅ {item}
                  </li>
                ))}
              </ul>

              {/* Deskripsi */}
              <h5 className="fw-semibold mt-4">Deskripsi</h5>
              <p>
                Kontrakan nyaman dan strategis, cocok untuk keluarga kecil. Lokasi dekat dengan
                pasar, sekolah, dan akses transportasi umum. Lingkungan aman dan tenang.
              </p>
            </div>

            {/* Sidebar */}
            <div className="col-md-4">
              <div
                className="card shadow-sm p-4 position-sticky"
                style={{
                  top: '100px' // jarak dari atas saat sticky
                }}
              >
                <h5 className="fw-semibold mb-3">Tertarik?</h5>
                <button className="btn btn-success w-100 mb-2">Hubungi Pemilik</button>
                <Link
                  className="btn btn-outline-primary w-100"
                  to={`/properti/kontrakan-2-kamar-jakarta/booking`}
                >
                  Booking Sekarang
                </Link>

                {/* Share Button */}
                <button
                  className="btn btn-outline-info w-100 mt-3"
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
                  <p className="mb-1">
                    <strong>Durasi Minimal:</strong> 6 bulan
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong> <span className="text-success">Tersedia</span>
                  </p>
                  <p className="mb-1">
                    <strong>Upload:</strong> 20 April 2025
                  </p>
                  <p className="mb-0">
                    <strong>Pemilik:</strong>{' '}
                    <Link to="/agent/zikri-ramdani" className="text-decoration-none">
                      Zikri Ramdani
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h5 className="fw-semibold mb-4">Properti Lainnya</h5>
          <div className="position-relative">
            <div
              className="d-flex gap-3 overflow-auto pb-2 ps-1"
              style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            >
              {kontrakanList?.map((kontrakan, index) => (
                <div
                  key={kontrakan?.id || index}
                  className="flex-shrink-0"
                  style={{
                    width: '250px',
                    scrollSnapAlign: 'start'
                  }}
                >
                  <PropertiCard {...kontrakan} btnTelp={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Share Modal */}
      <ShareModal show={showShare} onClose={() => setShowShare(false)} />
      <PreviewModal show={showPreview} onClose={() => setShowPreview(null)} preview={showPreview} />
    </Fragment>
  );
};

export default Index;
