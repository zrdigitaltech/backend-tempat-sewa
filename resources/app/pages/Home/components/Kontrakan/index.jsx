import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/app/redux/action/kontrakan/creator';

import { Link } from 'react-router-dom';

import { formatPrice, sortList } from '@/app/helpers';

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
    <section id="services" className="services">
      <div className="container">
        <div
          className={`${sortedKontrakanList?.length <= 2 ? 'd-flex justify-content-center' : 'row'}`}
        >
          {sortedKontrakanList?.map((item, idx) => (
            <div
              key={item?.id || idx}
              className="col-md-4 col-sm-6"
              data-aos="fade-up"
              data-aos-delay={idx * 200}
            >
              {item?.status === 'tersedia' ? (
                <Link to={item?.slug}>
                  <div className="single-service-item">
                    <div className="single-service-icon">
                      {item?.image?.[0]?.image ? (
                        <img
                          src={
                            item?.image?.[0]?.image?.includes('assets')
                              ? item?.image?.[0]?.image
                              : '/storage/' + item?.image?.[0]?.image
                          }
                          alt={item?.alt}
                          className="w-100"
                        />
                      ) : (
                        <img
                          src="/assets/images/kontrakan-black.webp"
                          alt={item?.alt}
                          className="w-100"
                        />
                      )}
                    </div>
                    <div className="single-service-description">
                      <div className="single-service-title">
                        <h3>{item?.nama}</h3>
                      </div>
                      <div className="single-service-content">
                        <p>
                          <b>
                            Rp{' '}
                            {formatPrice(
                              parseInt(
                                item?.harga_sewa?.find(price => price?.durasi === '1')?.harga
                              )
                            ) || 'N/A'}
                          </b>
                          <br />
                          <b>(Bulan pertama)</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="single-service-item">
                  <div className="single-service-icon grayscale">
                    {item?.image?.[0]?.image ? (
                      <img
                        src={
                          item?.image?.[0]?.image?.includes('assets')
                            ? item?.image?.[0]?.image
                            : '/storage/' + item?.image?.[0]?.image
                        }
                        alt={item?.alt}
                        className="w-100"
                      />
                    ) : (
                      <img
                        src="/assets/images/kontrakan-black.webp"
                        alt={item?.alt}
                        className="w-100"
                      />
                    )}
                  </div>
                  <div className="single-service-description">
                    <div className="single-service-title">
                      <h3>{item?.nama}</h3>
                    </div>
                    <div className="single-service-content">
                      <p>
                        <b>
                          Rp{' '}
                          {formatPrice(
                            parseInt(item?.harga_sewa?.find(price => price?.durasi === '1')?.harga)
                          ) || 'N/A'}
                        </b>
                        <br />
                        <b>(Bulan pertama)</b>
                      </p>
                    </div>
                  </div>

                  <div className="single-service-available">Tidak Tersedia</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
