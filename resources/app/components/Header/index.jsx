import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListLogos } from '@/app/redux/action/logos/creator';
import { Link } from 'react-router-dom';
import './header.scss';

export default function Index() {
  const logosList = useSelector(state => state.logos.logosList);
  const dispatch = useDispatch();

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
          <span className="text-primary">Tempat</span>Sewa.Com
        </Link>

        {/* Toggle button (Offcanvas Trigger) */}
        <ul className="navbar-nav ms-auto d-lg-none me-2 ST--PasangIklan">
          <li className="nav-item">
            <Link className="btn btn-primary" to="/pasang-iklan">
              + Pasang Iklan
            </Link>
          </li>
        </ul>
        <button
          className="btn d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
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
            <Link className="nav-link text-dark" to="/login">
              Masuk / Daftar
            </Link>
          </li>
        </ul>
      </div>

      {/* Offcanvas Mobile Menu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 id="mobileMenuLabel" className="offcanvas-title">
            <span className="text-primary">Tempat</span>Sewa.Com
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-2">
          <Link className="nav-link text-dark" to="/login">
            Masuk / Daftar
          </Link>
        </div>
        <div className="offcanvas-footer p-3 border-top shadow ST--PasangIklan__mobile">
          <Link className="btn btn-primary w-100" to="/pasang-iklan">
            + Pasang Iklan
          </Link>
        </div>
      </div>
    </nav>
  );
}
