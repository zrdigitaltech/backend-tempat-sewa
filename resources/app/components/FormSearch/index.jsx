import React from 'react';

export default function Index(props) {
  const { handleSearch, kategori, page, homePage } = props;
  return (
    <section>
      <div className="row g-2">
        <div className={`col-4 ${homePage ? 'col-md-3' : 'col-md-4'}`}>
          <input type="text" className="form-control rounded-3" placeholder="Lokasi" />
        </div>
        <div className={`col-4 ${homePage ? 'col-md-3' : 'col-md-4'}`}>
          <input type="number" className="form-control  rounded-3" placeholder="Harga Maksimal" />
        </div>
        <div className={`col-4 ${homePage ? 'col-md-3' : 'col-md-4'}`}>
          <select className="form-select  rounded-3">
            <option>Durasi</option>
            <option value="harian">Harian</option>
            <option value="bulanan">Bulanan</option>
            <option value="tahunan">Tahunan</option>
          </select>
        </div>
        {homePage && (
          <div className="col-12 col-md-3">
            <button className="btn btn-warning w-100 fw-semibold rounded-3" onClick={handleSearch}>
              Cari Properti
            </button>
          </div>
        )}
      </div>
      {page && (
        <div className="row g-2 mt-2">
          {/* Kategori (Sort options) */}
          <div className={`col-4 ${homePage ? 'col-md-3' : 'col-md-4'}`}>
            <select className="form-select  rounded-3">
              <option value="diutamakan">Diutamakan</option>
              <option value="terbaru">Terbaru</option>
              <option value="harga_tertinggi">Harga Tertinggi</option>
              <option value="harga_terendah">Harga Terendah</option>
            </select>
          </div>

          {/* Periode Sewa */}
          <div className={`col-4 ${homePage ? 'col-md-3' : 'col-md-4'}`}>
            <select className="form-select  rounded-3">
              <option value="">Periode Sewa</option>
              <option value="harian">Harian</option>
              <option value="mingguan">Mingguan</option>
              <option value="bulanan">Bulanan</option>
              <option value="tahunan">Tahunan</option>
            </select>
          </div>

          {/* Tipe Kost - Only shown if "kost" is selected */}
          {kategori === 'kost' && (
            <div className={`col-4 ${homePage ? 'col-md-3' : 'col-md-4'}`}>
              <select className="form-select  rounded-3">
                <option value="">Tipe Kost</option>
                <option value="semua">Semua</option>
                <option value="putra">Putra</option>
                <option value="putri">Putri</option>
                <option value="campur">Campur</option>
              </select>
            </div>
          )}

          {/* Tipe Kamar - Only shown if "apartemen" is selected */}
          {kategori === 'apartemen' ||
            (kategori === 'rumah' && (
              <div className={`col-4 ${homePage ? 'col-md-3' : 'col-md-4'}`}>
                <select className="form-select  rounded-3">
                  <option value="">
                    {kategori === 'apartemen' && 'Tipe Kamar'}
                    {kategori === 'rumah' && 'Kamar Tidur'}
                  </option>
                  {kategori === 'apartemen' && <option value="studio">Studio</option>}
                  <option value="1_kamar_tidur">1 Kamar Tidur</option>
                  <option value="2_kamar_tidur">2 Kamar Tidur</option>
                  <option value="3_kamar_tidur">3 Kamar Tidur</option>
                  <option value="lebih">Lebih dari 3 Kamar Tidur</option>
                </select>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
