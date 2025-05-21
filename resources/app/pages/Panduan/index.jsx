import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/app/components/Breadcrumb';

const guideList = [
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

const kategoriColor = {
  'Panduan Penyewa': 'primary',
  'Panduan Pemilik': 'success',
  'Teknis & Legal': 'warning',
  'Inspirasi & Gaya Hidup': 'info',
  'Berita & Update': 'danger',
  'Bantuan & FAQ': 'secondary'
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuides = guideList.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-5">
      <section className="mt-3">
        <Breadcrumb title="Panduan" />
      </section>

      <section className="pt-3 pb-5">
        <div className="container">
          <h1 className="fs-2 fw-bold text-dark mb-3">Panduan Sewa & Kelola Properti</h1>
          <p className="text-secondary mb-4">
            <strong>tempatSewa.Com</strong> adalah platform tepercaya untuk menemukan tempat tinggal
            impian — mulai dari kontrakan, kost, hingga properti sewa lainnya. Nikmati pengalaman
            pencarian hunian yang cepat dan aman. Bagi pemilik properti, kami menyediakan solusi
            praktis untuk memasarkan dan mengelola properti dalam satu platform yang efisien.
          </p>

          {/* Form Pencarian */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Cari panduan berdasarkan judul..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* List Panduan */}
          <div className="row">
            {filteredGuides.length === 0 ? (
              <div className="col-12">
                <p className="text-muted">Tidak ada panduan ditemukan.</p>
              </div>
            ) : (
              filteredGuides.map((item, idx) => (
                <div key={idx} className="col-6 col-sm-4 mb-4">
                  <Link to={`/panduan/${item.slug}`} className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm hover-shadow transition-all rounded-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="card-img-top"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                      )}
                      <div className="card-body">
                        <span
                          className={`badge bg-${kategoriColor[item.kategori] || 'secondary'} mb-2`}
                        >
                          {item.kategori}
                        </span>
                        <h5 className="card-title text-dark d-flex justify-content-between align-items-center">
                          {item.title}
                          <span className="text-muted ms-2">→</span>
                        </h5>
                        <div className="text-muted small mt-2">
                          {item.date && (
                            <span className="me-1">
                              {new Date(item.date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          )}
                          {item.author && (
                            <span>
                              by{' '}
                              <Link
                                to={`/panduan/author/${item.authorSlug}`}
                                className="text-decoration-none"
                              >
                                {item.author}
                              </Link>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
