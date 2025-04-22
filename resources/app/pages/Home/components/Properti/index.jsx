import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/app/redux/action/kontrakan/creator';

import { Link } from 'react-router-dom';
import { formatPrice, sortList } from '@/app/helpers';

import PropertiCard from '@/app/components/PropertiCard';

export default function Index() {
  const kontrakanList = useSelector(state => state?.kontrakan?.kontrakanList);
  const dispatch = useDispatch();

  const fetchKontrakan = async () => {
    dispatch(getListKontrakan());
  };

  useEffect(() => {
    fetchKontrakan();
  }, []);

  // Sort kontrakanList to have "tersedia" items first
  const sortedKontrakanList = sortList(kontrakanList);
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-semibold mb-4">Properti Terbaru</h2>
        <div className="row g-4">
          {sortedKontrakanList?.map((item, index) => (
            <div key={index} className="col-6 col-lg-3 col-sm-4">
              <PropertiCard
                {...item}
                // nama="Kontrakan Mewah"
                // harga="Rp 2.000.000"
                // durasi="bulanan"
                // status="Tersedia"
                // slug="kontrakan-mewah"
                // image={['https://placehold.co/600x400', 'https://placehold.co/600x400?2']}
                // alamat="Jl. Merdeka No. 10, Tangerang"
                // pemilik="Budi Santoso"
                // pemilikSlug="budi-santoso"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
