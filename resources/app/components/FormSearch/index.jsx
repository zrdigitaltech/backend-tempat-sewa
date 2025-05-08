import React, { Fragment } from 'react';
import {
  TipeKamar,
  TipeKost,
  TipeProperti,
  TipeSewa
} from '@/app/components/FormSearch/components';

export default function Index(props) {
  const { handleSearch, kategori, page, homePage } = props;
  const isApartemenOrRumah = kategori === 'apartemen' || kategori === 'rumah';

  return (
    <section>
      <div className="row g-2">
        {/* Tipe Properti */}
        <div className="col-12 col-md-2">
          <TipeProperti />
        </div>

        {/* Input Search */}
        <div className={page ? 'col-12 col-md-10' : 'col-12 col-md-5'}>
          <input
            type="text"
            className="form-control rounded-3"
            placeholder="Cari lokasi atau nama properti"
          />
        </div>

        {homePage && (
          <>
            {/* Tipe Sewa */}
            <div className="col-12 col-md-2">
              <TipeSewa />
            </div>

            {/* Tombol Cari */}
            <div className="col-12 col-md-3">
              <button
                className="btn btn-warning w-100 fw-semibold rounded-3"
                onClick={handleSearch}
              >
                Cari Properti
              </button>
            </div>
          </>
        )}
      </div>

      {page && (
        <div className="d-flex flex-wrap gap-2 mt-2">
          {/* Urutan */}
          <div className="flex-fill flex-md-grow-0">
            <select className="form-select rounded-3">
              <option value="diutamakan">Diutamakan</option>
              <option value="terbaru">Terbaru</option>
              <option value="harga_tertinggi">Harga Tertinggi</option>
              <option value="harga_terendah">Harga Terendah</option>
            </select>
          </div>

          {/* Harga Maksimal */}
          <div className="flex-fill flex-md-grow-0">
            <input type="text" className="form-control rounded-3" placeholder="Harga Maksimal" />
          </div>

          {/* Tipe Sewa */}
          <div className="flex-fill flex-md-grow-0">
            <TipeSewa />
          </div>

          {/* Tipe Kost */}
          {kategori === 'kost' && (
            <div className="flex-fill flex-md-grow-0">
              <TipeKost />
            </div>
          )}

          {/* Tipe Kamar / Kamar Tidur */}
          {isApartemenOrRumah && (
            <div className="flex-fill flex-md-grow-0">
              <select className="form-select rounded-3">
                <option value="">{kategori === 'apartemen' ? 'Tipe Kamar' : 'Kamar Tidur'}</option>
                {kategori === 'apartemen' && <option value="studio">Studio</option>}
                <option value="1_kamar_tidur">1 Kamar Tidur</option>
                <option value="2_kamar_tidur">2 Kamar Tidur</option>
                <option value="3_kamar_tidur">3 Kamar Tidur</option>
                <option value="lebih">Lebih dari 3 Kamar Tidur</option>
              </select>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
