import React, { Fragment } from 'react';

const propertiListMock = [
  {
    id: 1,
    judul: 'Sewa Apartemen KALIBATA - Sewa Apart...',
    lokasi: 'Apartemen GREEN PALACE, Pancoran, Jakarta Selatan',
    tipe: 'Apartemen',
    status: 'Sewa',
    kamar: 2,
    luas: 35,
    kamarMandi: 1,
    harga: 'Rp 55.000.000 / Tahun',
    foto: 'https://placehold.co/140x100?text=Foto+1'
  },
  {
    id: 2,
    judul: 'Sewa Apartemen GREEN PALACE - Sewa...',
    lokasi: 'Apartemen GREEN PALACE Kalibata, Pancoran, Jakarta Selatan',
    tipe: 'Apartemen',
    status: 'Sewa',
    kamar: 2,
    luas: 35,
    kamarMandi: 1,
    harga: 'Rp 5.000.000 / Bulan',
    foto: 'https://placehold.co/140x100?text=Foto+2'
  }
];

const PropertiListFromPemilik = () => {
  return (
    <Fragment>
      {/* Filter Header */}
      <div className="align-items-md-center d-flex flex-column flex-md-row gap-3 justify-content-end mb-3">
        <div className="d-flex gap-2">
          <select className="form-select form-select-sm" style={{ minWidth: '140px' }}>
            <option value="semua">Semua properti</option>
            <option value="apartemen">Apartemen</option>
            <option value="rumah">Rumah</option>
            <option value="kost">Kost</option>
          </select>
          <select className="form-select form-select-sm" style={{ minWidth: '140px' }}>
            <option value="terbaru">Terbaru</option>
            <option value="termurah">Termurah</option>
            <option value="termahal">Termahal</option>
          </select>
        </div>
      </div>

      {/* Daftar Properti */}
      {propertiListMock.map(item => (
        <div key={item.id} className="d-flex border-bottom py-3 gap-3">
          <img
            src={item.foto}
            alt={item.judul}
            className="rounded"
            style={{ width: '140px', height: '100px', objectFit: 'cover' }}
          />
          <div className="flex-grow-1">
            <div className="mb-2">
              <span className="badge bg-secondary me-2">{item.tipe}</span>
              <span className="badge bg-secondary">{item.status}</span>
            </div>
            <h6 className="fw-bold text-dark mb-1">{item.judul}</h6>
            <div className="text-muted small mb-2">{item.lokasi}</div>
            <div className="d-flex gap-3 small text-dark">
              <span>
                <i className="bi bi-house-door"></i> {item.kamar} Kamar Tidur
              </span>
              <span>
                <i className="bi bi-aspect-ratio"></i> {item.luas} m²
              </span>
              <span>
                <i className="bi bi-droplet"></i> {item.kamarMandi} KM
              </span>
            </div>
          </div>
          <div className="text-end">
            <div className="fw-bold text-primary">{item.harga}</div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default PropertiListFromPemilik;
