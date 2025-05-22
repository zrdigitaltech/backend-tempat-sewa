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
    // Simulasi fetch data (nanti bisa diganti fetch backend Laravel)
    const fetchData = async () => {
      const mockGuides = [
        {
          slug: 'tips-mencari-kost',
          title: 'Tips Mencari Kost yang Nyaman dan Aman',
          content: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).Where does it come from?Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Where can I get some?There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>`,

          date: '2024-12-01',
          author: 'Admin',
          authorSlug: 'admin',
          coverImage: 'https://placehold.co/800x600?text=Tips+Mencari+Kost'
        },
        {
          slug: 'sewakan-rumah-online',
          title: 'Cara Menyewakan Rumah Secara Online dengan Efektif',
          content: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).Where does it come from?Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Where can I get some?There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>`,

          date: '2024-09-18',
          author: 'Tim tempatSewa',
          authorSlug: 'tim-tempatSewa',
          coverImage:
            'https://placehold.co/800x600?text=Cara+Menyewakan+Rumah+Secara+Online+dengan+Efektif'
        },
        {
          slug: 'panduan-pajak-properti',
          title: 'Panduan Pajak Properti yang Perlu Kamu Tahu',
          content: '<p>Pajak properti adalah hal penting yang harus kamu pahami...</p>',
          date: '2024-08-05',
          author: 'Admin',
          authorSlug: 'admin',
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
            Ditulis oleh{' '}
            <Link to={`/panduan/author/${guide.authorSlug}`} className="">
              <b>{guide.author}</b>
            </Link>{' '}
            pada{' '}
            {guide.date &&
              new Date(guide.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
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

      <section className="pt-3 pb-5 container">
        <div className="row">
          {/* Konten Utama */}
          <div className="col-12 col-lg-8 mb-4 mb-lg-0">
            <article>
              <div dangerouslySetInnerHTML={{ __html: guide.content }} />
            </article>
          </div>

          {/* Sidebar */}
          <div className="col-12 col-lg-4">
            <aside className="position-sticky" style={{ top: '85px' }}>
              <h5 className="mb-3">Artikel Populer</h5>
              <ul className="list-unstyled">
                {popularGuides?.slice(0, 8).map(item => (
                  <li key={item.slug} className="d-flex mb-3">
                    <Link
                      to={`/panduan/${item.slug}`}
                      className="d-flex text-decoration-none w-100 gap-2"
                    >
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        style={{
                          width: '100px',
                          height: '70px',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                      />
                      <div>
                        <div className="fw-semibold text-dark">
                          <small>{item.title}</small>
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                          {new Date(item.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PanduanDetail;
