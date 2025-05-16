// File: components/PropertiCard/ListView.js
import React, { Fragment, useState } from 'react';
import { formatPrice, formatPhone, formatTipeKamar } from '@/app/helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import '../propertiCard.scss';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Index(props) {
  const {
    nama,
    harga,
    durasi,
    slug,
    image,
    alamat,
    btnTelp = true,
    no_whatsapp,
    member,
    isLoading = false,
    swipeable = true,
    newTab = false,
    tipe_properti,
    showKategori = false,
    tipe_kamar,
    handlePhone,
    handleWhatsApp,
    showTipeKamar = false,
    tipe_kost,
    showInterior = false,
    biaya_listrik,
    pemilikImage,
    pemilik,
    upload
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const maxIndicators = 5;

  const handleChange = index => {
    setSelectedIndex(index);
  };

  const getStartIndex = index => {
    if (index <= 2) return 0;
    if (index >= image.length - 2) return image.length - maxIndicators;
    return index - 2;
  };

  const iconKategori = nama => {
    const namaStr =
      typeof nama === 'string'
        ? nama.toLowerCase()
        : typeof nama === 'object' && nama !== null && 'nama' in nama
          ? String(nama.nama).toLowerCase()
          : '';
    switch (namaStr) {
      case 'kontrakan':
        return '🏘️';
      case 'kost':
        return '🛏️';
      case 'rumah':
        return '🏠';
      case 'apartemen':
        return '🏢';
      case 'ruko':
        return '🏬';
      case 'kios':
      case 'toko':
        return '🛒';
      case 'gudang':
        return '🏚️';
      case 'pabrik':
        return '🏭';
      case 'tanah':
        return '🌄';
      case 'villa':
        return '🏖️';
      case 'ruang kantor':
        return '💼';
      case 'komersial':
        return '🏪';
      case 'hotel':
        return '🏨';
      case 'gedung':
        return '🏛️';
      case 'kondotel':
        return '🏩';
      default:
        return '🏡';
    }
  };

  const CardContent = () => {
    return (
      <div>
        {showKategori && (
          <Fragment>
            <div className="d-flex gap-2 mb-2 overflow-x-auto">
              <span className="align-content-center badge border border-secondary text-secondary bg-transparent text-capitalize">
                {iconKategori(tipe_properti)}{' '}
                {typeof tipe_properti === 'object'
                  ? tipe_properti?.nama.toLowerCase() === 'kost'
                    ? tipe_properti?.nama + ' ' + tipe_kost
                    : tipe_properti?.nama
                  : ''}
              </span>

              {showInterior &&
                tipe_properti?.informasi_interior
                  ?.filter(item => item.nama === 'Kondisi Perabotan')
                  ?.map((item, index) => (
                    <span
                      key={index}
                      className="align-content-center badge border border-secondary text-secondary bg-transparent text-capitalize"
                    >
                      {item.fasilitas && item.fasilitas?.join(', ')}
                    </span>
                  ))}

              <span className="align-content-center badge border border-secondary text-secondary bg-transparent text-capitalize">
                <i className="fa fa-clock"></i> Diperbaharui: {upload}
              </span>
            </div>
          </Fragment>
        )}

        <h5 className="card-title fw-bold my-2">
          Rp{formatPrice(harga)}
          <span className="text-capitalize"> / {durasi}</span>
        </h5>

        <span
          className="card-text fw-semibold mb-0 ST__text"
          title={nama.length > 50 ? nama : undefined}
        >
          {nama}
        </span>
        <p
          className={`text-muted small mb-0 text-truncate ${showTipeKamar && tipe_kamar && 'mb-1'}`}
          title={alamat}
        >
          {alamat}
        </p>

        {showTipeKamar && tipe_kamar && (
          <small className="align-content-center text-secondary text-capitalize">
            <i className="fa-solid fa-bed me-1"></i>
            {formatTipeKamar(tipe_kamar) === 'S'
              ? 'Studio'
              : formatTipeKamar(tipe_kamar) === 'L'
                ? '>3 Kamar Tidur'
                : formatTipeKamar(tipe_kamar) + ' Kamar Tidur'}
          </small>
        )}
      </div>
    );
  };

  const isMobile = window.innerWidth <= 480;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <div className="position-relative" style={{ height: isMobile ? '' : '250px' }}>
            {isLoading ? (
              <Skeleton height={isMobile ? '' : 250} />
            ) : (
              <Carousel
                showArrows={(member === 'Super Featured') | (member === 'Premium') && true}
                autoPlay={false}
                infiniteLoop={false}
                showStatus={true}
                showIndicators={(member === 'Super Featured') | (member === 'Premium') && true}
                swipeable={swipeable}
                emulateTouch={true}
                showThumbs={false}
                selectedItem={selectedIndex}
                onChange={handleChange}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                  const dynamicStartIndex = getStartIndex(selectedIndex);
                  if (index < dynamicStartIndex || index >= dynamicStartIndex + maxIndicators)
                    return null;

                  const style = {
                    marginLeft: 6,
                    color: isSelected ? '#1e3a8a' : '#bbb',
                    cursor: 'pointer',
                    fontSize: 16
                  };

                  return (
                    <span
                      style={style}
                      onClick={onClickHandler}
                      onKeyDown={onClickHandler}
                      key={index}
                      role="button"
                      tabIndex={0}
                      aria-label={`${label} ${index + 1}`}
                    >
                      ●
                    </span>
                  );
                }}
                className="overflow-hidden"
              >
                {image?.map((x, i) => (
                  <div
                    key={x || i}
                    onClick={() => {
                      if (newTab === true) {
                        if (selectedIndex === i) {
                          window.open(`/properti/${slug}`, '_blank');
                        }
                      } else {
                        if (selectedIndex === i) {
                          navigate(`/properti/${slug}`);
                        }
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                    className="bg-secondary-subtle"
                  >
                    <img
                      src={x}
                      className="w-100"
                      style={{
                        height: isMobile ? '' : '250px'
                        // objectFit: 'cover'
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            )}

            {(member === 'Super Featured' || member === 'Premium') && (
              <div
                className={`ST__badge ${(member === 'Super Featured' && 'bg-primary') || (member === 'Premium' && 'bg-warning')} `}
              >
                <i className="fa fa-bolt"></i>
                <span>{member}</span>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body h-100 d-flex flex-column justify-content-between p-0">
            {newTab === true ? (
              <a
                href={`/properti/${slug}`}
                target="_blank"
                className="text-decoration-none text-dark p-2"
                rel="noopener noreferrer"
              >
                {CardContent()}
              </a>
            ) : (
              <Link to={`/properti/${slug}`} className="text-decoration-none text-dark p-2">
                {CardContent()}
              </Link>
            )}

            {btnTelp && (
              <div className="align-items-center bg-primary-subtle d-flex flex-wrap gap-3 p-2">
                {/* Pemilik */}
                <div className="d-flex align-items-center">
                  <div className="position-relative me-2" style={{ width: '48px', height: '48px' }}>
                    {isLoading ? (
                      <Skeleton circle height={48} width={48} />
                    ) : (
                      <>
                        <img
                          src={pemilikImage + pemilik}
                          alt="Foto Profil"
                          className="rounded-circle img-fluid"
                          style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                        />
                        <i
                          className="fa fa-check-circle text-primary"
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            background: 'white',
                            borderRadius: '50%',
                            fontSize: '14px'
                          }}
                        />
                      </>
                    )}
                  </div>
                  <div>
                    {isLoading ? (
                      <>
                        <Skeleton width={100} />
                        <Skeleton width={80} />
                      </>
                    ) : (
                      <>
                        <strong
                          className="d-block text-truncate"
                          title={pemilik?.length > 13 ? pemilik : ''}
                        >
                          {(pemilik || '').length > 13 ? pemilik.substring(0, 13) + '...' : pemilik}
                        </strong>
                      </>
                    )}
                  </div>
                </div>

                {/* Kontrol Tombol */}
                <div className="ms-auto d-flex gap-2">
                  <div className="flex-fill">
                    {isLoading ? (
                      <Skeleton height={40} width={40} />
                    ) : (
                      <button
                        className="w-100 btn btn-outline-primary ST__kontrol-btn"
                        onClick={handlePhone}
                      >
                        <i className="fa fa-phone" />
                      </button>
                    )}
                  </div>
                  <div className="flex-fill">
                    {isLoading ? (
                      <Skeleton height={40} width={90} />
                    ) : (
                      <button
                        className="w-100 btn btn-success text-white ST__kontrol-btn"
                        onClick={handleWhatsApp}
                      >
                        <i className="fa-brands fa-whatsapp me-1" /> WhatsApp
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
