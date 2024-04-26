import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListLogos } from '@/redux/action/logos/creator';

import { Link } from 'react-router-dom';

export default function Index(props) {
  const { title } = props;

  const logosList = useSelector(state => state.logos.logosList);
  const dispatch = useDispatch();

  const fetchLogos = async () => {
    dispatch(getListLogos());
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  return (
    <section id="services" className="services pb-1">
      <div className="container">
        <div className="section-title">
          <Link to="/">
            {logosList?.image ? (
              <img src={logosList?.image} width="163" alt={logosList?.name} />
            ) : (
              <h2>{logosList?.nama}</h2>
            )}
          </Link>
          {title && (
            <small>
              Beranda / <b>{title}</b>
            </small>
          )}
          <span className="title-border-white"></span>
        </div>
      </div>
    </section>
  );
}
