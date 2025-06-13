import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UseHeads, UseBreadcrumb } from '@/app/components';
import {
  PemilikProfile,
  StatistikProperti,
  AreaSpesialis,
  PropertiSpesialis,
  IklanPropertiList,
  SidebarDesktop,
  SidebarMobile
} from '@/app/pages/Pemilik/Slug/components';

import { useSelector, useDispatch } from 'react-redux';
import { getListPanduan } from '@/app/redux/action/panduan/creator';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { HubungiPengiklanPropertiModal, ShareModal } from '@/app/pages/modal';

const PemilikSlugPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [pemilikProfile, setPemilikProfile] = useState(null);
  const [isLoading, setIsLoading] = useState({ profile: false });

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
      },
      pemilik_verified: true,
      // Data tambahan
      statistik: {
        rentang_harga: 'Rp 500.000 – Rp 3.000.000 / bulan',
        iklan_aktif: 12,
        tersewa: 8,
        periode: {
          mulai: '13 Mei 2018',
          sampai: '27 Mei 2025'
        }
      },
      area_spesialis: ['Jakarta Selatan', 'Depok'],
      properti_spesialis: ['Kost', 'Kontrakan', 'Ruko']
    }
  ];

  useEffect(() => {
    const profile = mockPemilikProfiles.find(profile => profile.slug === slug);
    setPemilikProfile(
      profile || {
        name: slug,
        avatar: 'https://placehold.co/100x100?text=User',
        bio: 'Profil penulis belum tersedia.',
        socials: {},
        slug: 'pemilik/' + slug,
        nama: slug
      }
    );
  }, [dispatch, slug]);

  return (
    <Fragment>
      <UseHeads
        title={`${pemilikProfile?.name} - ${pemilikProfile?.bio}`}
        deskripsi={pemilikProfile?.bio}
        image={pemilikProfile?.avatar}
      />
      <div className="pb-5">
        <section className="mt-3">
          <UseBreadcrumb title={`Penulis: ${pemilikProfile?.name || slug}`} />
        </section>

        <section className="pt-3 pb-5">
          <div className="container">
            {/* Profil Penulis */}
            {isLoading.profile ? (
              <div className="align-items-center border border-primary-subtle d-flex mb-4 p-3 rounded">
                <div className="me-3 text-center">
                  <div className="position-relative mb-3">
                    <Skeleton circle width={112} height={112} />
                  </div>
                  <div>
                    <Skeleton height={20} width={100} />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-baseline mb-3">
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
              <PemilikProfile
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
                handleLokasi={() =>
                  isPageVerified
                    ? handleGoToWhatsApp(kontrakanDetail?.no_whatsapp)
                    : setShowWhatsApp(true)
                }
              />
            )}

            <div className="row">
              <div className="col-12 col-lg-9">
                <div className="mb-4">
                  <h4 className="fs-5 fw-bold text-dark">Tentang {pemilikProfile?.name}</h4>
                  <p className="mb-0">{pemilikProfile?.bio || 'Informasi belum tersedia.'}</p>
                </div>

                <StatistikProperti pemilikProfile={pemilikProfile} />
                <AreaSpesialis pemilikProfile={pemilikProfile} />
                <PropertiSpesialis pemilikProfile={pemilikProfile} />
                <IklanPropertiList pemilikProfile={pemilikProfile} slug={slug} />
              </div>
              <div className="col-12 col-lg-3">
                <SidebarDesktop
                  slug={slug}
                  data={pemilikProfile}
                  handlePhone={() => setShowWhatsApp(true)}
                  handleWhatsApp={() =>
                    isPageVerified
                      ? handleGoToWhatsApp(kontrakanDetail?.no_whatsapp)
                      : setShowWhatsApp(true)
                  }
                  isLoading={isLoading.profile}
                  handleBagikan={() => (setShowShare(true), setDataItem(pemilikProfile))}
                />
                <SidebarMobile
                  data={pemilikProfile}
                  handlePhone={() => setShowWhatsApp(true)}
                  handleWhatsApp={() =>
                    isPageVerified
                      ? handleGoToWhatsApp(pemilikProfile?.no_whatsapp)
                      : setShowWhatsApp(true)
                  }
                  isLoading={isLoading.profile}
                  handleBagikan={() => (setShowShare(true), setDataItem(pemilikProfile))}
                />
              </div>
            </div>
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

export default PemilikSlugPage;
