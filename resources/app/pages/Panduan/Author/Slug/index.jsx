import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/app/components/Breadcrumb';
import { AuthorCard } from '@/app/pages/Panduan/Author/Slug/components';

const AuthorPage = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    // Simulasi ambil data dari backend berdasarkan authorSlug
    const fetchArticlesByAuthor = async () => {
      const mockGuides = [
        {
          title: 'Tips Mencari Kost yang Nyaman dan Aman',
          slug: 'tips-mencari-kost',
          image: 'https://placehold.co/800x600?text=Kost',
          date: '2024-12-01',
          author: 'Admin',
          authorSlug: 'admin',
          kategori: 'Panduan Penyewa',
          content: `<p>....</p>`
        },
        {
          title: 'Cara Menyewakan Rumah Secara Online dengan Efektif',
          slug: 'sewakan-rumah-online',
          image: 'https://placehold.co/800x600?text=SewaOnline',
          date: '2024-09-18',
          author: 'Tim tempatSewa',
          authorSlug: 'tim-tempatSewa',
          kategori: 'Panduan Pemilik',
          content: `<p>....</p>`
        },
        {
          title: 'Checklist Sebelum Menyewa Kontrakan',
          slug: 'checklist-kontrakan',
          image: 'https://placehold.co/800x600?text=Kontrakan',
          date: '2024-12-01',
          author: 'Admin',
          authorSlug: 'admin',
          kategori: 'Panduan Penyewa',
          content: `<p>....</p>`
        },
        {
          title: 'Panduan Foto Properti yang Menarik',
          slug: 'foto-properti-menarik',
          image: 'https://placehold.co/800x600?text=Properti',
          date: '2024-09-18',
          author: 'Tim tempatSewa',
          authorSlug: 'tim-tempatSewa',
          kategori: 'Panduan Pemilik',
          content: `<p>....</p>`
        }
      ];

      const filtered = mockGuides.filter(item => item.authorSlug === slug);
      setArticles(filtered);
      setAuthorName(filtered[0]?.author || slug);
    };

    fetchArticlesByAuthor();
  }, [slug]);

  return (
    <div className="pb-5">
      <section className="mt-3">
        <Breadcrumb title={`Penulis: ${authorName}`} />
      </section>

      <section className="pt-3 pb-5">
        <div className="container">
          <h1 className="fs-3 fw-bold mb-4 text-dark">Artikel oleh: {authorName}</h1>
          {articles.length > 0 ? (
            <div className="row">
              {articles.map(article => (
                <div key={article.slug} className="col-12 col-md-6 col-lg-4 mb-4">
                  <AuthorCard guide={article} />
                </div>
              ))}
            </div>
          ) : (
            <p>Tidak ada artikel oleh penulis ini.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AuthorPage;
