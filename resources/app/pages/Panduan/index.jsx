import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '@/app/components/Breadcrumb';
import { PanduanList, PanduanFilter } from '@/app/pages/Panduan/components';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [guideList, setGuideList] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);

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
  const fetchGuideList = async () => {
    const data = [
      {
        title: 'Tips Mencari Kost yang Nyaman dan Aman',
        slug: 'tips-mencari-kost',
        image: 'https://placehold.co/800x600?text=Kost',
        date: '2024-12-01',
        author: 'Admin',
        authorSlug: 'admin',
        kategori: 'Panduan Penyewa'
      },
      {
        title: 'Cara Menyewakan Rumah Secara Online dengan Efektif',
        slug: 'sewakan-rumah-online',
        image: 'https://placehold.co/800x600?text=SewaOnline',
        date: '2024-09-18',
        author: 'Tim tempatSewa',
        authorSlug: 'tim-tempatSewa',
        kategori: 'Panduan Pemilik'
      },
      {
        title: 'Checklist Sebelum Menyewa Kontrakan',
        slug: 'checklist-kontrakan',
        image: 'https://placehold.co/800x600?text=Kontrakan',
        date: '2024-12-01',
        author: 'Admin',
        authorSlug: 'admin',
        kategori: 'Panduan Penyewa'
      },
      {
        title: 'Panduan Foto Properti yang Menarik',
        slug: 'foto-properti-menarik',
        image: 'https://placehold.co/800x600?text=Properti',
        date: '2024-09-18',
        author: 'Tim tempatSewa',
        authorSlug: 'tim-tempatSewa',
        kategori: 'Panduan Pemilik'
      }
    ];
    setGuideList(data);
    setFilteredGuides(data); // tampilkan semua awalnya
  };

  useEffect(() => {
    fetchGuideList();
  }, []);

  // Filter ulang jika searchTerm atau selectedCategory berubah
  useEffect(() => {
    let filtered = guideList;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== '') {
      filtered = filtered.filter(item => item.kategori === selectedCategory);
    }

    setFilteredGuides(filtered);
  }, [searchTerm, selectedCategory, guideList]);

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

  const categories = Array.from(new Set(guideList.map(item => item.kategori)));

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

          <PanduanList guides={filteredGuides} keyword={searchInput} kategori={selectedCategory} />
        </div>
      </section>
    </div>
  );
};

export default Index;
