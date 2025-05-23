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
import { getPanduanDetail, getPanduanPopuler } from '@/app/redux/action/panduan/creator';

const PanduanDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const panduanDetail = useSelector(state => state?.panduan?.panduanDetail);
  const panduanPopuler = useSelector(state => state?.panduan?.panduanPopuler);

  // UI State
  const [isLoading, setIsLoading] = useState({
    detail: false,
    populer: false
  });

  const fetchPanduanDetail = async () => {
    setIsLoading(prev => ({ ...prev, detail: true }));
    await dispatch(getPanduanDetail(slug));
    setIsLoading(prev => ({ ...prev, detail: false }));
  };

  const fetchPanduanPopuler = async () => {
    setIsLoading(prev => ({ ...prev, populer: true }));
    await dispatch(getPanduanPopuler(slug));
    setIsLoading(prev => ({ ...prev, populer: false }));
  };

  useEffect(() => {
    fetchPanduanDetail();
    fetchPanduanPopuler();
  }, [slug]);

  if (!isLoading.detail && (!panduanDetail || Object.keys(panduanDetail).length === 0)) {
    return <TidakDitemukan slug={slug} />;
  }

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
            <SidebarPopularGuides guides={panduanPopuler} isLoading={isLoading?.populer} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PanduanDetail;
