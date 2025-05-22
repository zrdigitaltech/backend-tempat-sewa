import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/app/components/Breadcrumb';
import { TidakDitemukan } from '@/app/pages/Panduan/Slug/components';
import { Link } from 'react-router-dom';
const PanduanDetail = () => {
  const { slug } = useParams();
  const [guide, setGuide] = useState(null);

  // Mock data panduan populer sidebar
  const popularGuides = [
    { slug: 'tips-mencari-kost', title: 'Tips Mencari Kost yang Nyaman dan Aman' },
    { slug: 'sewakan-rumah-online', title: 'Cara Menyewakan Rumah Secara Online dengan Efektif' },
    { slug: 'panduan-pajak-properti', title: 'Panduan Pajak Properti yang Perlu Kamu Tahu' }
  ];

  useEffect(() => {
    // Simulasi fetch data (nanti bisa diganti fetch backend Laravel)
    const fetchData = async () => {
      const mockGuides = [
        {
          slug: 'tips-mencari-kost',
          title: 'Tips Mencari Kost yang Nyaman dan Aman',
          content: '<p>Berikut adalah tips penting saat mencari kost...</p>',
          date: '2024-12-01',
          author: 'Admin',
          coverImage: 'https://placehold.co/800x600?text=Tips+Mencari+Kost'
        },
        {
          slug: 'sewakan-rumah-online',
          title: 'Cara Menyewakan Rumah Secara Online dengan Efektif',
          content: '<p>Ikuti langkah-langkah berikut untuk menyewakan rumah...</p>',
          date: '2024-09-18',
          author: 'Tim tempatSewa',
          coverImage:
            'https://placehold.co/800x600?text=Cara+Menyewakan+Rumah+Secara+Online+dengan+Efektif'
        },
        {
          slug: 'panduan-pajak-properti',
          title: 'Panduan Pajak Properti yang Perlu Kamu Tahu',
          content: '<p>Pajak properti adalah hal penting yang harus kamu pahami...</p>',
          date: '2024-08-05',
          author: 'Admin',
          coverImage:
            'https://placehold.co/800x600?text=Panduan+Pajak+Properti+yang+Perlu+Kamu+Tahu'
        }
      ];

      const found = mockGuides.find(item => item.slug === slug);
      setGuide(found || null);
    };

    fetchData();
  }, [slug]);

  if (!guide) {
    return <TidakDitemukan slug={slug} />;
  }

  return (
    <div className="pb-5">
      <section className="my-3">
        <Breadcrumb title={guide.title} />
      </section>

      <section>
        <div className="container">
          <h1 className="fs-3 fw-bold text-dark">{guide.title}</h1>
          <div className="text-muted mb-2">
            Ditulis oleh <b>{guide.author}</b> pada {guide.date}
          </div>
        </div>
      </section>

      {/* Cover Image Full Width */}
      {guide.coverImage && (
        <div
          className="w-100"
          style={{
            height: '630px',
            backgroundImage: `url(${guide.coverImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      <section className="pt-3 pb-5 container" style={{ display: 'flex', gap: '2rem' }}>
        {/* Main Content */}
        <article style={{ flex: 3 }}>
          <div dangerouslySetInnerHTML={{ __html: guide.content }} />
        </article>

        {/* Sidebar */}
        <aside style={{ flex: 1, borderLeft: '1px solid #ddd', paddingLeft: '1rem' }}>
          <h5 className="mb-3">Artikel Populer</h5>
          <ul className="list-unstyled">
            {popularGuides.map(item => (
              <li key={item.slug} style={{ marginBottom: '0.8rem' }}>
                {/* Bisa gunakan Link dari react-router-dom jika sudah import */}
                <Link to={`/panduan/${item.slug}`} className="text-decoration-none">
                  &raquo; {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
};

export default PanduanDetail;
