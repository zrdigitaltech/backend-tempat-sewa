import React, { useState, useEffect } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';
import { PanduanList, PanduanFilter } from '@/app/pages/Panduan/components';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [guideList, setGuideList] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);

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
  };

  // Ambil data saat pertama kali render
  useEffect(() => {
    fetchGuideList();
  }, []);

  // Filter ulang jika guideList, searchTerm, atau selectedCategory berubah
  useEffect(() => {
    const filtered = guideList.filter(
      item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || item.kategori === selectedCategory)
    );
    setFilteredGuides(filtered);
  }, [guideList, searchTerm, selectedCategory]);

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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />

          <PanduanList guides={filteredGuides} />
        </div>
      </section>
    </div>
  );
};

export default Index;
