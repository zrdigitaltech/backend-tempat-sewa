// Slug.jsx
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { formatPriceLocale } from '@/app/helpers';
import { useNavigate } from 'react-router-dom';

// Components
import { UseHeads, UseBreadcrumb, UseDeskripsiExpandable } from '@/app/components';

// Modals
import ShareModal from '@/app/pages/modal/Share';
import { PreviewModal } from '@/app/pages/Properti/Slug/modal';
import HubungiPengiklanPropertiModal from '@/app/pages/modal/HubungiPengiklanProperti';
import LaporkanIklanModal from '@/app/pages/modal/LaporkanIklan';

// Slug-specific components
import SliderImage from '@/app/pages/Properti/Slug/components/SliderImage';
import PropertiLainnya from '@/app/pages/Properti/Slug/components/PropertiLainnya';
import Sidebar from '@/app/pages/Properti/Slug/components/Sidebar';
import SidebarMobile from '@/app/pages/Properti/Slug/components/Sidebar/Mobile';

// Redux Actions
import { getPropertiDetail } from '@/app/redux/action/kontrakan/creator';

// Styles
import './slug.scss';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { iconTipeProperti, unFormatStrip } from '@/app/helpers';

const Index = () => {
  // React Router & Redux
  const { slug } = useParams();
  const dispatch = useDispatch();
  const kontrakanDetail = useSelector(state => state?.kontrakan?.kontrakanDetail);
  const navigate = useNavigate();

  // UI State
  const [isLoading, setIsLoading] = useState(true);
  const [isPageVerified, setIsPageVerified] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Modal States
  const [showShare, setShowShare] = useState(false);
  const [showPreview, setShowPreview] = useState(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showLaporkanIklan, setShowLaporkanIklan] = useState(false);

  const [expandedKategori, setExpandedKategori] = useState({});

  const toggleExpand = kategoriId => {
    setExpandedKategori(prev => ({
      ...prev,
      [kategoriId]: !prev[kategoriId]
    }));
  };

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

  const handleGoToWhatsApp = no_whatsapp => {
    if (!no_whatsapp) {
      alert('Nomor WhatsApp tidak tersedia.');
      return;
    }

    alert(`Redirect langsung ke whatsapp ${no_whatsapp}`);
  };

  useEffect(() => {
    fetchPropertiDetail();
  }, [slug]);

  const renderCombinedInteriorCard = (interior, targets, label, iconClass) => {
    if (!interior || !Array.isArray(interior)) return null;

    const total = targets.reduce((sum, name) => {
      const item = interior.find(i => i.nama === name);
      const val = parseInt(item?.fasilitas?.[0]) || 0;
      return sum + val;
    }, 0);

    if (total === 0) return null;

    return (
      <div className="align-content-center border-0 card p-3 text-capitalize text-secondary bg-white shadow-sm">
        <div>
          {iconClass && <i className={`fa ${iconClass} me-2`}></i>}
          {total}
        </div>
        <div>{label}</div>
      </div>
    );
  };
  const renderSingleInteriorCard = (interior, target, label, iconClass) => {
    if (!interior || !Array.isArray(interior)) return null;

    const item = interior.find(i => i.nama === target);
    const value = item?.fasilitas?.[0];

    if (!value) return null;

    return (
      <div className="align-content-center border-0 card p-3 text-capitalize text-secondary bg-white shadow-sm">
        <div>{iconClass && <i className={`fa ${iconClass} me-2`}></i>}</div>
        <div>{value}</div>
      </div>
    );
  };

  if (!isLoading && Object.keys(kontrakanDetail).length === 0) {
    return (
      <Fragment>
        <div className="pb-5">
          <section className="mt-3">
            <UseBreadcrumb title={'Properti Tidak Ditemukan'} />
          </section>
          <div className="text-center pt-5">
            <i className="fa-4x fa-search fas mb-3"></i>
            <h5 className="fw-bold mb-2">Properti Tidak Ditemukan</h5>
            <p className="text-muted">
              Maaf, properti dengan kode{' '}
              <strong className="text-capitalize">{unFormatStrip(slug)}</strong> tidak ditemukan.
              <br />
              Silakan cari properti dengan kata kunci lainnya, ya!
            </p>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <UseHeads
        title={`${kontrakanDetail?.nama} - oleh ${kontrakanDetail?.pemilik}`}
        deskripsi={kontrakanDetail?.deskripsi}
        image={kontrakanDetail?.image?.[0]}
      />
      <section className="ST--wrapper__navbar d-flex  align-items-center w-100">
        <div>
          {isLoading ? (
            <Skeleton width={100} height={40} borderRadius={8} />
          ) : (
            <button
              className="btn btn-light shadow"
              onClick={() =>
                navigate(
                  `/search?keyword=&tipeProperti=${kontrakanDetail?.tipe_properti?.nama.toLowerCase()}&viewMode=list`
                )
              }
            >
              <i className="fa fa-arrow-left"></i> Kembali
            </button>
          )}
        </div>
        <div className="ms-auto">
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
            <div className="col-sm-12 col-lg-8">
              {/* Breadcrumb */}
              <UseBreadcrumb containerClassName="px-0 mb-2" isLoading={isLoading} />
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

                      <span className="bg-primary-subtle align-content-center badge text-secondary text-capitalize">
                        {iconTipeProperti(kontrakanDetail?.tipe_properti?.nama)}{' '}
                        {kontrakanDetail?.tipe_properti?.nama.toLowerCase() === 'kost'
                          ? kontrakanDetail?.tipe_properti?.nama + ' ' + kontrakanDetail?.tipe_kost
                          : kontrakanDetail?.tipe_properti?.nama}
                      </span>

                      <span className="bg-primary-subtle align-content-center badge text-secondary text-capitalize">
                        <i className="fa fa-clock"></i> Diperbarui: {kontrakanDetail?.upload}
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
                    className="fw-bold text-primary mb-0 ST--Text"
                    title={kontrakanDetail?.nama?.length > 50 ? kontrakanDetail?.nama : null}
                  >
                    {kontrakanDetail?.nama}
                  </h2>
                  <div className="mb-3">
                    <p className="text-muted text-truncate mb-1" title={kontrakanDetail?.kota}>
                      <i className="fa-solid fa-location-dot me-1"></i>
                      {kontrakanDetail?.area + ', ' + kontrakanDetail?.kota}
                    </p>
                    <button
                      className="btn btn-sm bg-primary-subtle text-primary"
                      onClick={() =>
                        isPageVerified
                          ? handleGoToWhatsApp(kontrakanDetail?.no_whatsapp)
                          : setShowWhatsApp(true)
                      }
                    >
                      <i className="fa-solid fa-map-location-dot me-1"></i>
                      Dapatkan Detail Lokasi
                    </button>
                  </div>
                </Fragment>
              )}

              {isLoading ? (
                <div className="d-flex gap-2 flex-wrap mt-2">
                  <div>
                    <Skeleton width={120} height={50} />
                  </div>
                  <div>
                    <Skeleton width={120} height={50} />
                  </div>
                </div>
              ) : (
                (kontrakanDetail?.kategori_interior?.kondisi_perabotan ||
                  kontrakanDetail?.daya_listrik) && (
                  <div className="d-flex gap-2 flex-wrap">
                    {/* Kondisi Perabotan */}
                    {kontrakanDetail?.kategori_interior?.kondisi_perabotan && (
                      <div className="align-content-center border card p-3 text-capitalize text-secondary">
                        <div className="align-items-center d-flex h-100">
                          <i
                            className={`me-1 ${
                              kontrakanDetail?.kategori_interior?.kondisi_perabotan ===
                              'Full Furnished'
                                ? 'fa-solid fa-couch'
                                : kontrakanDetail?.kategori_interior?.kondisi_perabotan ===
                                    'Semi Furnished'
                                  ? 'fa-solid fa-chair'
                                  : 'fa-solid fa-box-open'
                            }`}
                          ></i>
                          {kontrakanDetail?.kategori_interior?.kondisi_perabotan}
                        </div>
                      </div>
                    )}
                    {/* Biaya Listrik */}
                    {kontrakanDetail?.tipe_properti?.nama.toLowerCase() === 'apartemen' ||
                      (kontrakanDetail?.daya_listrik && (
                        <div className="align-content-center border-0 card p-3 text-capitalize text-secondary bg-white shadow-sm">
                          <div className="">
                            <i className="fa-solid fa-bolt"></i>{' '}
                            {formatPriceLocale(kontrakanDetail?.daya_listrik)} Watt <br />
                            {kontrakanDetail?.biaya_listrik && (
                              <small>( {kontrakanDetail?.biaya_listrik} Listrik )</small>
                            )}
                          </div>
                        </div>
                      ))}

                    {renderSingleInteriorCard(
                      kontrakanDetail?.tipe_properti?.informasi_interior,
                      'Kondisi Perabotan',
                      'Kondisi Perabotan',
                      'fa-couch' // pakai icon lain kalau mau
                    )}
                    {renderCombinedInteriorCard(
                      kontrakanDetail?.tipe_properti?.informasi_interior,
                      ['Kamar Tidur', 'Kamar Tidur ART'],
                      'Kamar Tidur',
                      'fa-bed'
                    )}

                    {renderCombinedInteriorCard(
                      kontrakanDetail?.tipe_properti?.informasi_interior,
                      ['Kamar Mandi', 'Kamar Mandi ART'],
                      'Kamar Mandi',
                      'fa-bath'
                    )}
                  </div>
                )
              )}

              {/* Fasilitas */}
              <h5 className="fw-semibold mt-4 mb-3">Fasilitas</h5>
              {isLoading ? (
                <ul className="list-unstyled row">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <li key={index} className="col-6 mb-2">
                      <Skeleton width={150} height={20} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="row">
                  {kontrakanDetail?.tipe_properti?.informasi_lingkungan?.map(kategori => {
                    const fasilitas = kategori.fasilitas || [];
                    const isExpanded = expandedKategori[kategori.id] || false;
                    const shouldTruncate = fasilitas.length > 6;
                    const displayedFasilitas = isExpanded ? fasilitas : fasilitas.slice(0, 6);

                    return (
                      <div key={kategori.id} className="col-12 mb-3 ST--DeskripsiExpandable">
                        <h6 className="fw-bold">{kategori.nama}</h6>
                        <div
                          className={`ST--DeskripsiExpandable__wrapper ${
                            isExpanded ? 'ST--DeskripsiExpandable__wrapper--expanded' : ''
                          }`}
                        >
                          <ul className="list-unstyled row mb-0 ST--DeskripsiExpandable__content">
                            {displayedFasilitas.map((fasilitasItem, i) => (
                              <li key={i} className="col-6 mb-2">
                                ✅ {fasilitasItem}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {shouldTruncate && (
                          <button
                            onClick={() => toggleExpand(kategori.id)}
                            className="text-primary p-0 border-0 bg-transparent d-flex align-items-center gap-1"
                            style={{ cursor: 'pointer' }}
                          >
                            <small>
                              Lihat {isExpanded ? 'Lebih Sedikit' : 'Selengkapnya'}{' '}
                              <i className={`fa fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                            </small>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Deskripsi */}
              <h5 className="fw-semibold mt-1 mb-3">Deskripsi</h5>
              {isLoading ? (
                <Skeleton count={3} height={20} />
              ) : (
                <UseDeskripsiExpandable deskripsi={kontrakanDetail?.deskripsi} />
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* d-none d-lg-block */}
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
              <SidebarMobile
                kontrakanDetail={kontrakanDetail}
                handlePhone={() => setShowWhatsApp(true)}
                handleWhatsApp={() =>
                  isPageVerified
                    ? handleGoToWhatsApp(kontrakanDetail?.no_whatsapp)
                    : setShowWhatsApp(true)
                }
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
        handlePhone={() => setShowWhatsApp(true)}
        handleWhatsApp={() =>
          isPageVerified ? handleGoToWhatsApp(kontrakanDetail?.no_whatsapp) : setShowWhatsApp(true)
        }
      />
      <HubungiPengiklanPropertiModal
        show={showWhatsApp}
        setShowWhatsApp={setShowWhatsApp}
        onClose={() => setShowWhatsApp(false)}
        isPageVerified={isPageVerified}
        setIsPageVerified={setIsPageVerified}
        handleGoWhatsApp={() => handleGoToWhatsApp(kontrakanDetail?.no_whatsapp)}
        dataItem={kontrakanDetail}
      />
      <LaporkanIklanModal
        show={showLaporkanIklan}
        onClose={() => setShowLaporkanIklan(false)}
        dataItem={kontrakanDetail}
      />
    </Fragment>
  );
};

export default Index;
