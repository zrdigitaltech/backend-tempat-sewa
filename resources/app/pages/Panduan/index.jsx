import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '@/app/components/Breadcrumb';
import { PanduanList, PanduanFilter } from '@/app/pages/Panduan/components';

import { useSelector, useDispatch } from 'react-redux';
import { getListPanduan, getPanduanSearch } from '@/app/redux/action/panduan/creator';

import { formatStrip, unFormatStrip } from '@/app/helpers';

const Index = () => {
  const panduanList = useSelector(state => state?.panduan?.panduanList);
  const panduanSearch = useSelector(state => state?.panduan?.panduanSearch);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [inputKeyword, setInputKeyword] = useState('');
  const [formData, setFormData] = useState({ keyword: '', kategori: '' });
  const [isLoading, setIsLoading] = useState({
    kategori: false,
    search: false
  });

  // sync inputKeyword dengan query param keyword saat load URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keywordFromUrl = searchParams.get('keyword') || '';
    setInputKeyword(keywordFromUrl);
    setFormData({
      keyword: keywordFromUrl,
      kategori: searchParams.get('kategori') || ''
    });
  }, [location.search]);

  // Panggil pencarian setiap formData berubah (bukan saat inputKeyword berubah)
  const fetchListPanduanSearch = async () => {
    setIsLoading(prev => ({ ...prev, search: true }));
    await dispatch(getPanduanSearch(formData));
    setIsLoading(prev => ({ ...prev, search: false }));
  };
  useEffect(() => {
    fetchListPanduanSearch();
  }, [formData, dispatch]);

  // UseEffect kosong untuk getListPanduan (ambil semua panduan)
  const fetchListPanduan = async () => {
    setIsLoading(prev => ({ ...prev, kategori: true }));
    await dispatch(getListPanduan());
    setIsLoading(prev => ({ ...prev, kategori: false }));
  };
  useEffect(() => {
    fetchListPanduan();
  }, [dispatch]);

  // handler ketika user submit/enter search
  const handleSearchEnter = () => {
    updateQueryInURL(inputKeyword, formData.kategori);
    setFormData(prev => ({ ...prev, keyword: inputKeyword }));
  };

  // handler perubahan input keyword (update inputKeyword saja, tanpa dispatch search)
  const handleInputKeywordChange = val => {
    setInputKeyword(val);
  };

  // handler kategori
  const handleCategoryChange = kategori => {
    const strippedKategori = formatStrip(kategori).toLowerCase();
    updateQueryInURL(inputKeyword, strippedKategori);
    setFormData(prev => ({ ...prev, kategori: strippedKategori }));
  };

  // update URL dan formData
  const updateQueryInURL = (keyword, kategori) => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (kategori) params.set('kategori', kategori);
    navigate({ search: params.toString() }, { replace: true });
  };

  const categories = Array.from(new Set(panduanList.map(item => item.kategori)));

  return (
    <div className="pb-5">
      <section className="mt-3">
        <Breadcrumb title="Panduan" />
      </section>

      <section className="pt-3 pb-5">
        <div className="container">
          <p className="text-gray-600 mb-6">
            <b>
              Baca informasi lengkap seputar properti yang bisa jadi panduan, tips, dan informasi
              penting seputar properti, mulai dari sewa, pengelolaan, hingga investasi.
            </b>
            <br />
            <span>Dilengkapi rekomendasi dan tips properti yang wajib diketahui.</span>
          </p>

          <PanduanFilter
            searchTerm={inputKeyword}
            setSearchTerm={handleInputKeywordChange}
            selectedCategory={formData.kategori}
            setSelectedCategory={handleCategoryChange}
            categories={categories}
            onSearchEnter={handleSearchEnter}
            isLoading={isLoading?.kategori}
          />

          <PanduanList
            guides={panduanSearch}
            keyword={formData.keyword}
            kategori={formData.kategori}
            isLoading={isLoading.search}
          />
        </div>
      </section>
    </div>
  );
};

export default Index;
