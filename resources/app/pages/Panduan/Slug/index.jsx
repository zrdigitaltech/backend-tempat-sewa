import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TidakDitemukan,
  PanduanHeader,
  PanduanCoverImage,
  PanduanContent,
  SidebarPopularGuides
} from '@/app/pages/Panduan/Slug/components';

import { useSelector, useDispatch } from 'react-redux';
import { getPanduanDetail } from '@/app/redux/action/panduan/creator';

const PanduanDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const panduanDetail = useSelector(state => state?.panduan?.panduanDetail);

  // UI State
  const [isLoading, setIsLoading] = useState({
    detail: false,
    populer: false
  });

  const fetchPanduanDetail = async () => {
    setIsLoading(prev => ({ ...prev, detail: true }));
    await dispatch(getPanduanDetail(slug));
    // setIsLoading(prev => ({ ...prev, detail: false }));
  };

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
    fetchPanduanDetail();
  }, [slug]);

  if (!panduanDetail) return <TidakDitemukan slug={slug} />;

  return (
    <div className="pb-5">
      <PanduanHeader panduanDetail={panduanDetail} isLoading={isLoading?.detail} />
      <PanduanCoverImage coverImage={panduanDetail?.image} isLoading={isLoading?.detail} />
      <section className="pt-3 pb-5 container">
        <div className="row">
          <div className="col-12 col-lg-8 mb-4 mb-lg-0">
            <PanduanContent content={panduanDetail?.content} isLoading={isLoading?.detail} />
          </div>
          <div className="col-12 col-lg-4">
            <SidebarPopularGuides guides={popularGuides} isLoading={isLoading?.populer} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PanduanDetail;
