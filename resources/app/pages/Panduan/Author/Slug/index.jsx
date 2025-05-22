import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/app/components/Breadcrumb';
import { AuthorCard } from '@/app/pages/Panduan/Author/Slug/components';

const AuthorPage = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [authorProfile, setAuthorProfile] = useState(null);

  useEffect(() => {
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

    const mockAuthorProfiles = {
      admin: {
        name: 'Admin',
        avatar: 'https://placehold.co/100x100?text=Admin',
        bio: 'Admin tempatSewa – berbagi tips, panduan, dan informasi properti sejak 2020.',
        socials: {
          instagram: 'https://instagram.com/tempatsewa',
          linkedin: 'https://linkedin.com/company/tempatsewa'
        }
      },
      'tim-tempatSewa': {
        name: 'Tim tempatSewa',
        avatar: 'https://placehold.co/100x100?text=Tim',
        bio: 'Tim konten tempatSewa yang menyusun panduan properti berkualitas untuk pemilik dan penyewa.',
        socials: {
          facebook: 'https://facebook.com/tempatsewa',
          twitter: 'https://twitter.com/tempatsewa'
        }
      }
    };

    const filtered = mockGuides.filter(item => item.authorSlug === slug);
    setArticles(filtered);
    setAuthorProfile(
      mockAuthorProfiles[slug] || {
        name: slug,
        avatar: 'https://placehold.co/100x100?text=User',
        bio: 'Profil penulis belum tersedia.',
        socials: {}
      }
    );
  }, [slug]);

  return (
    <div className="pb-5">
      <section className="mt-3">
        <Breadcrumb title={`Penulis: ${authorProfile?.name || slug}`} />
      </section>

      <section className="pt-3 pb-5">
        <div className="container">
          {/* Profil Penulis */}
          <div className="d-flex align-items-center mb-4">
            <img
              src={authorProfile?.avatar}
              alt={authorProfile?.name}
              className="rounded-circle me-3"
              width={80}
              height={80}
            />
            <div>
              <h2 className="fs-4 fw-bold mb-1">{authorProfile?.name}</h2>
              <p className="mb-1 text-muted">{authorProfile?.bio}</p>
              <div className="d-flex gap-2">
                {authorProfile?.socials?.instagram && (
                  <a
                    href={authorProfile.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                )}
                {authorProfile?.socials?.linkedin && (
                  <a
                    href={authorProfile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
                {authorProfile?.socials?.facebook && (
                  <a
                    href={authorProfile.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                )}
                {authorProfile?.socials?.twitter && (
                  <a href={authorProfile.socials.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Daftar Artikel */}
          <h3 className="fs-5 fw-bold mb-3 text-dark">Artikel oleh {authorProfile?.name}</h3>
          {articles.length > 0 ? (
            <div className="row">
              {articles.map(article => (
                <div key={article.slug} className="col-6 col-lg-4 mb-4">
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
