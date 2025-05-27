import React, { Fragment, useState, useEffect } from 'react';
import { PropertiItem } from '@/app/pages/Pemilik/Slug/components/PropertiListFromPemilik/components';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeProperti } from '@/app/redux/action/tipeProperti/creator';

import { TipeProperti, Urutan } from '@/app/components/FormSearch/components';

const propertiListMock = [
  {
    id: 1,
    judul: 'Sewa Apartemen KALIBATA - Sewa Apar...',
    lokasi: 'Apartemen GREEN PALACE, Pancoran, Jakarta Selatan',
    tipe: 'Apartemen',
    status: 'Sewa',
    kamar: 2,
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
    kamarMandi: 1,
    harga: 'Rp 5.000.000 / Bulan',
    foto: 'https://placehold.co/140x100?text=Foto+2'
  }
];

const Index = () => {
  const tipePropertiList = useSelector(state => state?.tipeProperti?.tipePropertiList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState({
    tipeProperti: false
  });

  const [formData, setFormData] = useState({
    tipeProperti: '',
    sort: 'terbaru'
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const fetchTipeProperti = async () => {
    setIsLoading(prev => ({ ...prev, tipeProperti: true }));
    try {
      await dispatch(getListTipeProperti());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(prev => ({ ...prev, tipeProperti: false }));
    }
  };

  useEffect(() => {
    fetchTipeProperti();
  }, []);

  // State dummy untuk filter, bisa dikembangkan nanti
  const [tipeFilter, setTipeFilter] = useState('semua');
  const [sortFilter, setSortFilter] = useState('terbaru');

  // Options untuk filter select
  const tipeOptions = [
    { value: 'semua', label: 'Semua properti' },
    { value: 'apartemen', label: 'Apartemen' },
    { value: 'rumah', label: 'Rumah' },
    { value: 'kost', label: 'Kost' }
  ];

  const sortOptions = [
    { value: 'terbaru', label: 'Terbaru' },
    { value: 'termurah', label: 'Termurah' },
    { value: 'termahal', label: 'Termahal' }
  ];

  // Filter & sort sederhana (demo)
  const filteredList = propertiListMock.filter(p =>
    tipeFilter === 'semua' ? true : p.tipe.toLowerCase() === tipeFilter
  );

  return (
    <Fragment>
      {/* Filter */}
      <div className="d-flex gap-3 justify-content-end mb-3">
        <div className="flex-fill flex-lg-grow-0" style={{ maxWidth: 200 }}>
          <TipeProperti
            title="Semua Properti"
            tipeProperti={formData?.tipeProperti}
            handleChange={handleChange}
            isLoading={isLoading?.tipeProperti}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className="flex-fill flex-lg-grow-0" style={{ maxWidth: 200 }}>
          <Urutan formData={formData?.sort} handleChange={handleChange} />
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
    </Fragment>
  );
};

export default Index;
