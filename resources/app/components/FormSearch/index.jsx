import React, { Fragment } from 'react';
import {
  TipeKamar,
  TipeKost,
  TipeProperti,
  TipeSewa
} from '@/app/components/FormSearch/components';
import './formsearch.scss';

export default function Index(props) {
  const {
    handleSearch,
    tipeProperti,
    page = false,
    homePage = false,
    formData,
    handleChange,
    isLoading = false
  } = props;
  const isApartemenOrRumah = tipeProperti === 'apartemen' || tipeProperti === 'rumah';

  return (
    <section>
      <div className="row g-2">
        {/* Tipe Properti */}
        <div className="col-12 col-md-2">
          <TipeProperti tipeProperti={formData?.tipeProperti} handleChange={handleChange} />
        </div>

        {/* Input Search */}
        <div className={page ? 'col-12 col-md-10' : 'col-12 col-md-5'}>
          <input
            name="keyword"
            type="text"
            className="form-control rounded-3"
            placeholder="Cari lokasi atau nama properti"
            value={formData?.keyword}
            onChange={handleChange}
          />
        </div>

        {homePage && (
          <Fragment>
            {/* Tipe Sewa */}
            <div className="col-12 col-md-2">
              <TipeSewa tipeSewa={formData?.tipeSewa} handleChange={handleChange} />
            </div>

            {/* Tombol Cari */}
            <div className="col-12 col-md-3">
              <button
                className="btn btn-warning w-100 fw-semibold rounded-3"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? 'Memuat...' : 'Cari Properti'}
              </button>
            </div>
          </Fragment>
        )}
      </div>

      {page && (
        <div className="d-flex flex-wrap gap-2 mt-2">
          {/* Urutan */}
          <div className="flex-fill flex-md-grow-0">
            <select
              name="sort"
              className="form-select rounded-3"
              value={formData?.sort || ''}
              onChange={handleChange}
            >
              <option value="">Diutamakan</option>
              <option value="terbaru">Terbaru</option>
              <option value="harga_tertinggi">Harga Tertinggi</option>
              <option value="harga_terendah">Harga Terendah</option>
            </select>
          </div>

          {/* Harga Maksimal */}
          <div className="flex-fill flex-md-grow-0">
            <div className="input-group">
              <span className="bg-primary input-group-text text-white">Rp</span>
              <input
                type="text"
                className="form-control"
                placeholder="Harga Maksimal"
                name="harga_max"
                value={formData?.harga_max || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Tipe Sewa */}
          <div className="flex-fill flex-md-grow-0">
            <TipeSewa tipeSewa={formData?.tipeSewa} handleChange={handleChange} />
          </div>

          {/* Tipe Kost */}
          {tipeProperti === 'kost' && (
            <div className="flex-fill flex-md-grow-0">
              <TipeKost tipeKost={formData?.tipeKost} handleChange={handleChange} />
            </div>
          )}

          {/* Tipe Kamar / Kamar Tidur */}
          {isApartemenOrRumah && (
            <div className="flex-fill flex-md-grow-0">
              <TipeKamar
                tipeKamar={formData?.tipeKamar}
                handleChange={handleChange}
                tipeProperti={formData?.tipeProperti}
              />
            </div>
          )}

          {/* Tombol Cari */}
          <div className="ms-sm-auto ST--w-100">
            <button
              className="btn btn-warning w-100 fw-semibold rounded-3"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'Memuat...' : 'Cari Properti'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
