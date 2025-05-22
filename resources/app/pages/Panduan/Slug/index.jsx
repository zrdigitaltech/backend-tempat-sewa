import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/app/components/Breadcrumb';
import { unFormatStrip } from '@/app/helpers';

const PanduanDetail = () => {
  const { slug } = useParams();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    // Simulasi fetch data (nanti bisa diganti dengan fetch dari backend Laravel)
    const fetchData = async () => {
      const mockGuides = [
        {
          slug: 'tips-mencari-kost',
          title: 'Tips Mencari Kost yang Nyaman dan Aman',
          content: '<p>Berikut adalah tips penting saat mencari kost...</p>',
          date: '2024-12-01',
          author: 'Admin'
        },
        {
          slug: 'sewakan-rumah-online',
          title: 'Cara Menyewakan Rumah Secara Online dengan Efektif',
          content: '<p>Ikuti langkah-langkah berikut untuk menyewakan rumah...</p>',
          date: '2024-09-18',
          author: 'Tim tempatSewa'
        }
      ];

      const found = mockGuides.find(item => item.slug === slug);
      setGuide(found || null);
    };

    fetchData();
  }, [slug]);

  if (!guide) {
    return (
      <Fragment>
        <div className="pb-5">
          <section className="mt-3">
            <Breadcrumb title={'Tidak Ditemukan'} />
          </section>
          <div className="text-center pt-5">
            <i className="fa-4x fa-search fas mb-3"></i>
            <h5 className="fw-bold mb-2">Panduan Tidak Ditemukan</h5>
            <p className="text-muted">
              Maaf, panduan dengan kata kunci{' '}
              <strong className="text-capitalize">{unFormatStrip(slug)}</strong> tidak ditemukan.
              <br />
              Silakan cari panduan dengan kata kunci lainnya, ya!
            </p>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <div className="pb-5">
      <section className="mt-3">
        <Breadcrumb title={guide.title} />
      </section>

      <section className="pt-3 pb-5">
        <div className="container">
          <h1 className="fs-3 fw-bold mb-3 text-dark">{guide.title}</h1>
          <div className="text-muted mb-2">
            Ditulis oleh <b>{guide.author}</b> pada {guide.date}
          </div>
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: guide.content }} />
        </div>
      </section>
    </div>
  );
};

export default PanduanDetail;
