import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListLogos } from '@/app/redux/action/logos/creator';
import { Link } from 'react-router-dom';
import './header.scss';
import OffcanvasMobile from './Mobile';

export default function Index() {
  const logosList = useSelector(state => state.logos.logosList);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    dispatch(getListLogos());
  }, [dispatch]);

  return (
    <nav className="navbar navbar-light bg-white shadow-sm sticky-top z-3">
      <div className="container d-flex justify-content-between align-items-center py-2">
        {/* Logo Brand */}
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
          {logosList?.length > 0 && (
            <img src={logosList[0].image_url} alt="Logo" height="32" className="me-2" />
          )}
          <span className="text-primary">tempat</span>Sewa.Com
        </Link>

        {/* Toggle button (Offcanvas Trigger) */}
        <ul className="navbar-nav ms-auto d-lg-none ST--PasangIklan">
          <li className="nav-item">
            <Link className="btn btn-primary" to="/pasang-iklan">
              + Pasang Iklan
            </Link>
          </li>
        </ul>
        <button
          className="btn d-lg-none p-0 mx-2 my-1"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle mobile menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop Menu */}
        <ul className="navbar-nav ms-auto d-none d-lg-flex flex-row gap-3">
          <li className="nav-item">
            <Link className="btn btn-primary" to="/pasang-iklan">
              + Pasang Iklan
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="/properti/login" target="_blank">
              LogIn
            </a>
          </li>
        </ul>
      </div>

      {/* Offcanvas Mobile Menu */}
      <OffcanvasMobile handleClose={closeMenu} isMenuOpen={isMenuOpen} />
    </nav>
  );
}
