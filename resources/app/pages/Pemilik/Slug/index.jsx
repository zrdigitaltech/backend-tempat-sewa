import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/app/components/Breadcrumb';
import { PemilikProfileCard } from '@/app/pages/Pemilik/Slug/components';
import { PanduanCard } from '@/app/pages/Panduan/components';

import { useSelector, useDispatch } from 'react-redux';
import { getListPanduan } from '@/app/redux/action/panduan/creator';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import HubungiPengiklanPropertiModal from '@/app/pages/modal/HubungiPengiklanProperti';
import ShareModal from '@/app/pages/Properti/Slug/Modal/Share';

const AuthorPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const panduanList = useSelector(state => state?.panduan?.panduanList || []);

  const [articles, setArticles] = useState([]);
  const [pemilikProfile, setPemilikProfile] = useState(null);
  const [isLoading, setIsLoading] = useState({ panduan: false });

  // Modal states
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [dataItem, setDataItem] = useState(null);
  const [isPageVerified, setIsPageVerified] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const mockPemilikProfiles = [
    {
      name: 'Budi Santoso',
      slug: 'budi-santoso',
      avatar: 'https://placehold.co/100x100?text=Admin',
      bio: 'Admin tempatSewa – berbagi tips, panduan, dan informasi properti sejak 2020.',
      no_whatsapp: '+62812xxxx',
      socials: {
        instagram: 'https://instagram.com/tempatsewa',
        linkedin: 'https://linkedin.com/company/tempatsewa'
      }
    }
  ];

  const fetchListPanduan = async () => {
    setIsLoading(prev => ({ ...prev, panduan: true }));
    await dispatch(getListPanduan());
    setIsLoading(prev => ({ ...prev, panduan: false }));
  };

  useEffect(() => {
    fetchListPanduan();

    const profile = mockPemilikProfiles.find(profile => profile.slug === slug);
    setPemilikProfile(
      profile || {
        name: slug,
        avatar: 'https://placehold.co/100x100?text=User',
        bio: 'Profil penulis belum tersedia.',
        socials: {}
      }
    );
  }, [dispatch, slug]);

  useEffect(() => {
    if (!panduanList || panduanList.length === 0) return;
    const filtered = panduanList.filter(item => item.authorSlug === slug);
    setArticles(filtered);
  }, [panduanList, slug]);

  return (
    <Fragment>
      <div className="pb-5">
        <section className="mt-3">
          <Breadcrumb title={`Penulis: ${pemilikProfile?.name || slug}`} />
        </section>

        <section className="pt-3 pb-5">
          <div className="container">
            {/* Profil Penulis */}
            {isLoading.panduan ? (
              <div className="align-items-center border border-primary-subtle d-flex mb-4 p-3 rounded">
                <div className="me-3 text-center">
                  <div className="position-relative mb-2">
                    <Skeleton circle width={112} height={112} />
                  </div>
                  <div>
                    <Skeleton height={20} width={100} />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-baseline mb-2">
                    <Skeleton height={24} width={160} className="me-3" />
                    <Skeleton height={14} width={100} />
                  </div>
                  <Skeleton height={14} width={250} className="mb-1" />
                  <div className="d-flex gap-3 flex-wrap mb-3">
                    <Skeleton height={32} width={100} />
                    <Skeleton height={32} width={100} />
                    <Skeleton height={32} width={100} />
                  </div>
                  <div className="d-flex gap-3 flex-wrap">
                    <Skeleton height={36} width={120} />
                    <Skeleton height={36} width={140} />
                    <Skeleton height={36} width={100} />
                  </div>
                </div>
              </div>
            ) : (
              <PemilikProfileCard
                profile={pemilikProfile}
                handleBagikan={() => (setShowShare(true), setDataItem(pemilikProfile))}
                handlePhone={() => {
                  setShowWhatsApp(true);
                  setDataItem(pemilikProfile);
                }}
                handleWhatsApp={() =>
                  isPageVerified
                    ? handleGoToWhatsApp(pemilikProfile?.no_whatsapp)
                    : (setShowWhatsApp(true), setDataItem(pemilikProfile))
                }
              />
            )}

            {/* Daftar Artikel */}
            {/* <h3 className="fs-5 fw-bold mb-3 text-dark">Artikel oleh {pemilikProfile?.name}</h3> */}

            {isLoading.panduan ? (
              <div className="row">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="col-6 col-lg-4 mb-4">
                    <Skeleton height={180} />
                    <Skeleton height={16} width={`80%`} style={{ marginTop: 10 }} />
                    <Skeleton height={14} width={`60%`} />
                  </div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="row">
                {articles.map(article => (
                  <div key={article.slug} className="col-6 col-lg-4 mb-4">
                    <PanduanCard guide={article} linkKategori={true} />
                  </div>
                ))}
              </div>
            ) : (
              <p>Tidak ada artikel oleh penulis ini.</p>
            )}
          </div>
        </section>
      </div>

      {/* Modal WhatsApp */}
      <HubungiPengiklanPropertiModal
        show={showWhatsApp}
        setShowWhatsApp={setShowWhatsApp}
        onClose={() => {
          setShowWhatsApp(false);
        }}
        isPageVerified={isPageVerified}
        setIsPageVerified={setIsPageVerified}
        handleGoWhatsApp={() => handleGoToWhatsApp(dataItem?.no_whatsapp)}
        dataItem={dataItem}
        setDataItem={setDataItem}
      />
      <ShareModal show={showShare} onClose={() => setShowShare(false)} data={dataItem} />
    </Fragment>
  );
};

export default AuthorPage;
