import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TidakDitemukan,
  PanduanHeader,
  PanduanCoverImage,
  PanduanContent,
  SidebarPopularGuides
} from '@/app/pages/Panduan/Slug/components';

const PanduanDetail = () => {
  const { slug } = useParams();
  const [guide, setGuide] = useState(null);

  const popularGuides = [
    {
      date: '2024-12-01',
      coverImage: 'https://placehold.co/800x600?text=Tips+Mencari+Kost',
      slug: 'tips-mencari-kost',
      title: 'Tips Mencari Kost yang Nyaman dan Aman'
    },
    {
      date: '2024-12-01',
      coverImage:
        'https://placehold.co/800x600?text=Cara+Menyewakan+Rumah+Secara+Online+dengan+Efektif',
      slug: 'sewakan-rumah-online',
      title: 'Cara Menyewakan Rumah Secara Online dengan Efektif'
    },
    {
      date: '2024-12-01',
      coverImage: 'https://placehold.co/800x600?text=Panduan+Pajak+Properti+yang+Perlu+Kamu+Tahu',
      slug: 'panduan-pajak-properti',
      title: 'Panduan Pajak Properti yang Perlu Kamu Tahu'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
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

      const found = mockGuides.find(item => item.slug === slug);
      setGuide(found || null);
    };

    fetchData();
  }, [slug]);

  if (!guide) return <TidakDitemukan slug={slug} />;

  return (
    <div className="pb-5">
      <PanduanHeader
        title={guide.title}
        author={guide.author}
        authorSlug={guide.authorSlug}
        date={guide.date}
      />
      <PanduanCoverImage coverImage={guide.image} />
      <section className="pt-3 pb-5 container">
        <div className="row">
          <PanduanContent content={guide.content} />
          <SidebarPopularGuides guides={popularGuides} />
        </div>
      </section>
    </div>
  );
};

export default PanduanDetail;
