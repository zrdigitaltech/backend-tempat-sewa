import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@/app/components/Header/header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeProperti } from '@/app/redux/action/tipeProperti/creator';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import { iconTipeProperti } from '@/app/helpers';

export default function Desktop(props) {
  const { openDisewa, setOpenDisewa, setShowBantuan, showBantuan } = props;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const activeTipeProperti = query.get('tipeProperti');
  const navigate = useNavigate();

  const tipePropertiList = useSelector(state => state?.tipeProperti?.tipePropertiList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const toggleDisewa = () => {
    setOpenDisewa(!openDisewa);
  };

  const fetchTipeProperti = async () => {
    setIsLoading(true);
    await dispatch(getListTipeProperti());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTipeProperti();
  }, []);

  return (
    <div className="d-none d-lg-flex flex-grow-1 justify-content-between align-items-center">
      {/* Pojok kiri */}
      <ul className="navbar-nav flex-row gap-3 mb-0">
        <li className={`nav-item dropdown`}>
          <a
            href="#"
            className={`nav-link dropdown-toggle cursor-pointer text-dark ${openDisewa || tipePropertiList.some(link => link.slug === activeTipeProperti) ? 'active' : ''}`}
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded={openDisewa ? 'true' : 'false'}
            onClick={e => e.preventDefault()}
          >
            Disewa
          </a>
          <ul className={`dropdown-menu ${openDisewa ? 'show' : ''}`}>
            {isLoading ? (
              <li>
                <Skeleton height={30} count={5} className="mb-2" />
              </li>
            ) : (
              // Render daftar link jika sudah selesai loading
              tipePropertiList.map((link, idx) => (
                <li key={link?.path || idx}>
                  <Link
                    className={`dropdown-item ${activeTipeProperti === link.slug ? 'active' : ''}`}
                    to={`/search?keyword=&tipeProperti=${link.slug}&viewMode=list`}
                    onClick={() => {
                      setOpenDisewa(false);
                    }}
                  >
                    {iconTipeProperti(link.nama)} Sewa {link.nama}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </li>
        <li className="align-items-center d-flex nav-item">|</li>
        <li className="nav-item">
          <Link
            rel="noreferrer"
            className={`nav-link text-dark a-hover ${location.pathname === '/panduan' ? 'active' : ''}`}
            to="/panduan"
            onClick={() => setOpenDisewa(false)}
          >
            Panduan
          </Link>
        </li>
        <li className="nav-item">
          <div
            rel="noreferrer"
            className={`nav-link text-dark a-hover cursor-pointer ${showBantuan === true ? 'active' : ''}`}
            onClick={() => (setOpenDisewa(false), setShowBantuan(true))}
          >
            Bantuan
          </div>
        </li>
      </ul>

      {/* Pojok kanan */}
      <ul className="navbar-nav flex-row gap-3 mb-0">
        <li className="nav-item">
          <button
            className="btn btn-primary"
            onClick={() => (navigate('/pasang-iklan'), setOpenDisewa(false))}
          >
            + Pasang Iklan
          </button>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-dark a-hover"
            href="/properti/login"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpenDisewa(false)}
          >
            LogIn
          </a>
        </li>
      </ul>
    </div>
  );
}
