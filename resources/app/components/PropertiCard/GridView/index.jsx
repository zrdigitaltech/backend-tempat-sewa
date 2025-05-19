import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { formatPrice, formatPhone, formatTipeKamar } from '@/app/helpers';
import { useNavigate } from 'react-router-dom';
import '../../PropertiCard/propertiCard.scss';
import useTooltips from '@/app/components/Tooltips';
// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Index(props) {
  const navigate = useNavigate();
  const {
    nama,
    harga,
    durasi,
    slug,
    image,
    kota,
    btnTelp = true,
    no_whatsapp,
    member,
    isLoading = false,
    swipeable = true,
    newTab = false,
    tipe_properti,
    showKategori = false,
    handlePhone,
    handleWhatsApp,
    showTipeKamar = false,
    tipe_kost,
    showInterior = false,
    biaya_listrik
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

  useTooltips();

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
        return '🏡'; // fallback icon
    }
  };

  const CardContent = () => (
    <div className="card-body ST--card-body p-2 p-sm-3">
      {isLoading ? (
        <Skeleton count={2} height={20} width="80%" />
      ) : (
        <Fragment>
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
              </div>
            </Fragment>
          )}
          <h5 className="card-title fw-bold">
            Rp{formatPrice(harga)}
            <span className="text-capitalize"> / {durasi}</span>
          </h5>
          <span
            className="card-text fw-semibold mb-0 ST__text"
            title={nama.length > 50 ? nama : undefined}
          >
            {nama}
          </span>
          <p className={`text-muted small mb-0 text-truncate ${showTipeKamar && 'mb-1'}`}>{kota}</p>
        </Fragment>
      )}
    </div>
  );

  const isMobile = window.innerWidth <= 480;

  return (
    <div className="card border-0 shadow-sm h-100 justify-content-between">
      <div className="position-relative" style={{ height: isMobile ? '140px' : '250px' }}>
        {isLoading ? (
          <Skeleton height={isMobile ? '' : 250} />
        ) : (
          <Carousel
            showArrows={false}
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
            className="rounded-top-2 overflow-hidden"
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
              >
                <img
                  src={x}
                  className="w-100"
                  style={{ height: isMobile ? '' : '250px', objectFit: 'cover' }}
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

      {newTab === true ? (
        <a
          href={`/properti/${slug}`}
          target="_blank"
          className="text-decoration-none text-dark"
          rel="noopener noreferrer"
        >
          {CardContent()}
        </a>
      ) : (
        <Link to={`/properti/${slug}`} className="text-decoration-none text-dark">
          {CardContent()}
        </Link>
      )}

      {/* tombol telepon or whatsapp */}
      {btnTelp && (
        <div className="bg-primary-subtle card-footer p-2 px-sm-3 py-sm-2">
          <div className="d-flex gap-2">
            {/* Tombol Telepon */}
            <div className="flex-sm-fill">
              {isLoading ? (
                <Skeleton height={40} />
              ) : (
                <button
                  className="btn btn-primary align-items-center d-sm-flex w-100"
                  onClick={handlePhone}
                >
                  <i className="fa fa-phone pe-1" aria-hidden="true"></i>{' '}
                  <span className="d-none d-sm-block">{formatPhone(no_whatsapp)}</span>
                </button>
              )}
            </div>

            {/* Tombol WhatsApp */}
            <div className="flex-sm-fill">
              {isLoading ? (
                <Skeleton height={40} />
              ) : (
                <button
                  className="btn btn-success d-flex align-items-center text-white w-100 pe-1"
                  onClick={handleWhatsApp}
                >
                  <i className="fa-brands fa-whatsapp pe-1" aria-hidden="true"></i> WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
