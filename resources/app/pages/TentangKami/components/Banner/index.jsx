'use client';
import React, { Fragment, useState, useEffect } from 'react';
import FormSearch from '@/app/components/FormSearch';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import { formatStrip } from '@/app/helpers';

export default function Index() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState({
    banner: false,
    btnSearch: false
  });

  const [formData, setFormData] = useState({
    tipeProperti: '',
    keyword: '',
    tipeSewa: '',
    viewMode: 'list'
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOnSearch = async () => {
    setIsLoading(prev => ({ ...prev, btnSearch: true }));
    const { keyword, tipeProperti, tipeSewa, viewMode } = formData;

    const keywordCleaned = formatStrip(keyword);
    let query = `/search?keyword=${keywordCleaned}`;

    if (tipeProperti) {
      const tipePropertiCleaned = formatStrip(tipeProperti);
      query += `&tipeProperti=${tipePropertiCleaned}`;
    }
    if (tipeSewa) query += `&tipeSewa=${tipeSewa}`;
    query += `&viewMode=${viewMode}`;

    navigate(query);
    setIsLoading(prev => ({ ...prev, btnSearch: false }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(prev => ({ ...prev, banner: false }));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="text-white d-flex align-items-center"
      style={{
        minHeight: '74vh',
        backgroundImage: "url('https://placehold.co/800x600')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: '3rem 0'
      }}
    >
      {/* Overlay hitam */}
      <div className="position-absolute top-0 start-0 w-100 h-100" />

      <div className="container position-relative z-2 px-3 px-md-5">
        {isLoading?.banner ? (
          <Fragment>
            <Skeleton height={40} width={300} className="mb-3" />
            <Skeleton count={2} height={20} width={300} className="mb-3" />
            <div className="row g-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`col-12 col-sm-6 col-md-3`}>
                  <Skeleton height={40} />
                </div>
              ))}
            </div>
          </Fragment>
        ) : (
          <div className="bg-white text-black rounded-3 shadow p-4 text-center" data-aos="fade-up">
            <h3 className="lead text-primary mb-2">MISI KAMI</h3>
            <h1 className="display-6 fw-bold lh-base">
              Mewujudkan platform sewa properti <strong className="text-primary">terdepan</strong>{' '}
              yang menghubungkan
              <strong className="text-success"> jutaan orang</strong> secara
              <strong className="text-info"> efisien</strong>, dan
              <strong className="text-danger"> terpercaya</strong> di seluruh Indonesia.
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}
