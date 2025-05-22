import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '@/app/components/Breadcrumb';
import { PanduanList, PanduanFilter } from '@/app/pages/Panduan/components';

import { useSelector, useDispatch } from 'react-redux';
import { getListPanduan } from '@/app/redux/action/panduan/creator';

const Index = () => {
  const panduanList = useSelector(state => state?.panduan?.panduanList);
  const dispatch = useDispatch();
  
  const location = useLocation();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredPanduan, setFilteredPanduan] = useState([]);

  // Ambil query dari URL saat page load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword') || '';
    const kategori = searchParams.get('kategori') || '';
    setSearchInput(keyword);
    setSearchTerm(keyword);
    setSelectedCategory(kategori);
  }, [location.search]);

  // Simulasi fetch data
  const fetchPanduanList = async () => {
    dispatch(getListPanduan());
    setFilteredPanduan(panduanList); // tampilkan semua awalnya
  };

  useEffect(() => {
    fetchPanduanList();
  }, []);

  // Filter ulang jika searchTerm atau selectedCategory berubah
  useEffect(() => {
    let filtered = panduanList;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== '') {
      filtered = filtered.filter(item => item.kategori === selectedCategory);
    }

    setFilteredPanduan(filtered);
  }, [searchTerm, selectedCategory, panduanList]);

  // Fungsi update URL query string
  const updateQuery = (keyword, kategori) => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (kategori) params.set('kategori', kategori);
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleSearchEnter = () => {
    setSearchTerm(searchInput);
    updateQuery(searchInput, selectedCategory);
  };

  const handleCategoryChange = value => {
    setSelectedCategory(value);
    updateQuery(searchInput, value);
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
            searchTerm={searchInput}
            setSearchTerm={setSearchInput}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            categories={categories}
            onSearchEnter={handleSearchEnter}
          />

          <PanduanList guides={filteredPanduan} keyword={searchInput} kategori={selectedCategory} />
        </div>
      </section>
    </div>
  );
};

export default Index;
