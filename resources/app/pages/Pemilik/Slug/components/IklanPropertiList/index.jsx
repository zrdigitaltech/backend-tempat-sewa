import React, { Fragment, useState, useEffect } from 'react';
import { PropertiItem } from '@/app/pages/Pemilik/Slug/components/IklanPropertiList/components';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/app/redux/action/kontrakan/creator';

import { TipeProperti, Urutan } from '@/app/components/FormSearch/components';

// Helper untuk mengonversi harga dalam string ke angka
const getHargaNumber = hargaString => {
  if (!hargaString) return 0;

  const stringValue = typeof hargaString === 'string' ? hargaString : hargaString.toString(); // konversi number atau lainnya ke string

  const numeric = stringValue.replace(/[^\d]/g, '');
  return parseInt(numeric, 10);
};

const Index = props => {
  const { pemilikProfile, slug } = props;

  const kontrakanList = useSelector(state => state?.kontrakan?.kontrakanList || []);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    tipeProperti: '',
    sort: 'terbaru'
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fetchKontrakan = async () => {
    setIsLoading(true);
    await dispatch(getListKontrakan());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchKontrakan();
  }, []);

  // Filter dan sorting
  const filteredList = kontrakanList
    .filter(p =>
      formData?.tipeProperti === ''
        ? true
        : p.tipe_properti?.nama?.toLowerCase() === formData?.tipeProperti
    )
    .sort((a, b) => {
      if (formData.sort === 'harga_terendah') {
        return getHargaNumber(a.harga) - getHargaNumber(b.harga);
      }
      if (formData.sort === 'harga_tertinggi') {
        return getHargaNumber(b.harga) - getHargaNumber(a.harga);
      }
      if (formData.sort === 'terbaru' && a.created_at && b.created_at) {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });

  return (
    <Fragment>
      <div className="my-4">
        <h4 className="fs-5 fw-bold mb-3 text-dark">Iklan Properti dari {pemilikProfile?.name}</h4>
        <div className="mb-3">
          {/* Filter */}
          <div className="d-flex gap-3 justify-content-end mb-3 flex-wrap">
            <div className="flex-fill flex-lg-grow-0" style={{ maxWidth: 200 }}>
              <TipeProperti
                title="Semua Properti"
                tipeProperti={formData?.tipeProperti}
                handleChange={handleChange}
                isLoading={isLoading?.tipeProperti}
                setIsLoading={setIsLoading}
                name="tipeProperti"
              />
            </div>
            <div className="flex-fill flex-lg-grow-0" style={{ maxWidth: 200 }}>
              <Urutan formData={formData?.sort} handleChange={handleChange} name="sort" />
            </div>
          </div>

          {/* Header Kolom (Desktop) */}
          <div
            className="d-none d-md-flex px-1 fw-semibold text-muted mb-2"
            style={{ fontSize: '0.9rem' }}
          >
            <div style={{ flex: 1 }}>Iklan</div>
            <div style={{ width: 250 }}>Spesifikasi</div>
            <div style={{ width: 140 }} className="text-end">
              Harga
            </div>
          </div>

          {/* Daftar Properti */}
          {filteredList.map(item => (
            <PropertiItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
