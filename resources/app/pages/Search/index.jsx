import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchResult } from '@/app/redux/action/kontrakan/creator';
import FormSearch from '@/app/components/FormSearch';
import PropertiCard from '@/app/components/PropertiCard';
import { useLocation } from 'react-router-dom';
import Heads from '@/app/components/Heads';
import { capitalizeWords, formatUnderscore, formatPriceLocale } from '@/app/helpers';
import { useNavigate } from 'react-router-dom';
import { TipeProperti } from '@/app/pages/Search/components';
import classNames from 'classnames';

export default function Index() {
  const navigate = useNavigate();
  const searchResultList = useSelector(state => state?.kontrakan?.searchResultList);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(8);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const tipeProperti = searchParams.get('tipeProperti');
  const keyword = searchParams.get('keyword');
  const tipeSewa = searchParams.get('tipeSewa');

  const sort = searchParams.get('sort');
  const harga_max = searchParams.get('hargaMax');
  const tipeKamar = searchParams.get('tipeKamar');
  const tipeKost = searchParams.get('tipeKost');

  const [isLoading, setIsLoading] = useState({
    banner: false,
    btnSearch: false
  });

  const [tipePropertiValidasi, setTipePropertiValidasi] = useState(tipeProperti);

  const [formData, setFormData] = useState({
    tipeProperti: '',
    keyword: '',
    tipeSewa: '',
    sort: '',
    harga_max: '',
    tipeKamar: '',
    tipeKost: ''
  });

  const fetchFormData = async () => {
    setFormData({
      tipeProperti: tipeProperti,
      keyword: keyword || '',
      tipeSewa: tipeSewa,
      sort: sort,
      harga_max: harga_max,
      tipeKamar: tipeKamar,
      tipeKost: tipeKost
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'tipeProperti') {
      setTipePropertiValidasi(value);
    }
  };

  const handleOnSearch = async () => {
    setIsLoading(prev => ({ ...prev, btnSearch: true }));
    const { keyword, tipeProperti, tipeSewa, sort, harga_max, tipeKamar, tipeKost } = formData;

    // Membangun query string
    let query = `/search?keyword=${keyword}`;

    // Menambahkan tipeProperti dan tipeSewa jika ada nilainya
    if (tipeProperti) {
      query += `&tipeProperti=${tipeProperti}`;
    }
    if (tipeSewa) {
      query += `&tipeSewa=${tipeSewa}`;
    }
    if (sort) {
      query += `&sort=${sort}`;
    }
    if (harga_max) {
      query += `&hargaMax=${harga_max}`;
    }
    if (tipeKamar) {
      query += `&tipeKamar=${tipeKamar}`;
    }
    if (tipeKost) {
      query += `&tipeKost=${tipeKost}`;
    }

    // Navigasi ke halaman pencarian dengan query yang sudah dibangun
    navigate(query);
    await dispatch(getSearchResult(query));
    setIsLoading(prev => ({ ...prev, btnSearch: false }));
  };

  useEffect(() => {
    const query = location.search;
    dispatch(getSearchResult(query)); // Ambil data hasil pencarian dari query URL
    fetchFormData();
  }, [location.search]);

  const handleLoadMore = () => {
    setVisible(prev => prev + 8); // tambah 8 lagi setiap klik
  };

  return (
    <Fragment>
      <Heads
        title={`Sewa ${capitalizeWords(tipeProperti || '')} ${capitalizeWords(keyword || '')} di Indonesia`}
        // deskripsi={kontrakanDetail?.deskripsi}
        // image={kontrakanDetail?.image?.[0]}
      />

      <section
        className={classNames('mt-3', {
          'mb-5': !(tipeProperti && searchResultList?.length === 0)
        })}
      >
        <div className="container">
          {/* Form Search */}
          <div className="mb-5">
            <FormSearch
              page={true}
              formData={formData}
              handleChange={handleChange}
              handleSearch={handleOnSearch}
              isLoading={isLoading?.btnSearch}
              tipeProperti={tipePropertiValidasi}
            />
          </div>

          {/* Placeholder hasil pencarian */}
          <div>
            {searchResultList?.length > 0 && (
              <Fragment>
                <h3 className="fw-bold mb-2 text-capitalize">
                  Sewa {tipeProperti} {keyword} di Indonesia
                </h3>

                <p className="text-muted mb-3">
                  Ada <strong>{searchResultList?.length}</strong> properti di ditemukan
                </p>
              </Fragment>
            )}
            {searchResultList?.length > 0 ? (
              <div className="row g-4">
                {searchResultList?.slice(0, visible)?.map((item, index) => (
                  <div key={index} className="col-12 col-lg-3 col-sm-4">
                    <PropertiCard {...item} showKategori={true} />
                  </div>
                ))}
              </div>
            ) : (
              <Fragment>
                <div className="text-center py-5">
                  <i className="fa-4x fa-search fas mb-3"></i>
                  <h5 className="fw-bold mb-2">Tidak Ditemukan Properti yang Sesuai</h5>
                  <p className="text-muted">
                    Maaf, properti dengan kata kunci{' '}
                    <strong className="text-capitalize">
                      {tipeProperti} {keyword} {sort} {formatPriceLocale(parseInt(harga_max))}{' '}
                      {tipeSewa} {formatUnderscore(tipeKamar)} {tipeKost}
                    </strong>{' '}
                    tidak ditemukan.
                    <br />
                    Silakan cari properti dengan kata kunci lainnya, ya!
                  </p>
                </div>
              </Fragment>
            )}

            {/* Tombol Muat Lainnya */}
            {visible < searchResultList?.length && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-warning fw-semibold rounded-3 px-5"
                  onClick={handleLoadMore}
                >
                  Muat Lainnya
                </button>
              </div>
            )}
          </div>
        </div>

        {tipeProperti && searchResultList?.length === 0 ? (
          <Fragment>
            <TipeProperti tipeProperti={tipeProperti} />
            <div className="container mb-5 mt-3 d-flex justify-content-center">
              <div className="col-12 col-sm-10 text-center cursor-pointer">
                <div className="position-relative" onClick={() => alert('modal')}>
                  <img src="https://placehold.co/1760x333" className="w-100" />
                  <div
                    className="position-absolute"
                    style={{
                      top: '50%',
                      right: '30px',
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <button className="btn btn-primary btn-lg">
                      <i className="fa-brands fa-whatsapp pe-1" aria-hidden="true"></i> Konsultasi
                      Gratis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          ''
        )}
      </section>
    </Fragment>
  );
}
