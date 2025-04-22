import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListLogos } from '@/app/redux/action/logos/creator';

import { Link } from 'react-router-dom';

export default function Index() {
  const logosList = useSelector(state => state.logos.logosList);
  const dispatch = useDispatch();

  const fetchLogos = async () => {
    dispatch(getListLogos());
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  return (
    <nav className="navbar navbar-light bg-white shadow-sm position-sticky top-0 z-3">
      <div className="container d-flex flex-wrap align-items-center justify-content-between py-2">
        {/* Brand */}
        <Link href="/" className="navbar-brand fw-bold mb-2 mb-lg-0">
          <span className="text-primary">Tempat</span>Sewa.Com
        </Link>

        {/* Menu (selalu terlihat, responsif) */}
        <ul className="nav w-lg-auto justify-content-end gap-3">
          <li className="nav-item">
            <a className="nav-link text-dark" href="/daftar">
              + Pasang Properti
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="/login">
              Masuk / Daftar
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
