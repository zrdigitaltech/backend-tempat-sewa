import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeProperti } from '@/app/redux/action/tipeProperti/creator';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';

export default function Mobile(props) {
  const { isMenuOpen, handleClose } = props;
  const [openDisewa, setOpenDisewa] = useState(false);
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
    <div
      className={`offcanvas offcanvas-end ${isMenuOpen ? 'show' : ''}`}
      tabIndex="-1"
      id="mobileMenu"
      aria-labelledby="mobileMenuLabel"
    >
      <div className="offcanvas-header border-bottom py-4">
        <h5
          id="mobileMenuLabel"
          className="offcanvas-title fw-bold"
          onClick={() => (navigate('/'), handleClose())}
        >
          <span className="text-primary">tempat</span>Sewa.Com
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>

      <div className="offcanvas-body d-flex flex-column gap-2">
        <a
          className={`nav-link text-dark ${location.pathname === '/properti/login' ? 'active' : ''}`}
          href="/properti/login"
          target="_blank"
          onClick={handleClose}
        >
          LogIn
        </a>

        {/* Disewa menu with active state */}
        <div>
          <button
            className={`btn btn-link nav-link text-dark w-100 d-flex justify-content-between align-items-center px-0 ${openDisewa || tipePropertiList.some(link => link.slug === activeTipeProperti) ? 'active' : ''}`}
            onClick={toggleDisewa}
            type="button"
          >
            Disewa
            <i className={`fa fa-chevron-${openDisewa ? 'up' : 'down'} small`}></i>
          </button>

          <div className={`submenu-wrapper ${openDisewa ? 'open' : ''} ps-3`}>
            {isLoading ? (
              <Skeleton height={30} count={5} className="mb-2" />
            ) : (
              // Render daftar link jika sudah selesai loading
              tipePropertiList.map(link => (
                <Link
                  key={link.path}
                  className={`nav-link text-dark ${activeTipeProperti === link.slug ? 'active' : ''}`}
                  to={`/search?keyword=&tipeProperti=${link.slug}&viewMode=list`}
                  onClick={handleClose}
                >
                  Sewa {link.nama}
                </Link>
              ))
            )}
          </div>
        </div>

        <Link
          className={`nav-link text-dark ${location.pathname === '/panduan' ? 'active' : ''}`}
          to="/panduan"
          onClick={handleClose}
        >
          Panduan
        </Link>
        <Link
          className={`nav-link text-dark ${location.pathname === '/jelajah' ? 'active' : ''}`}
          to="/jelajah"
          onClick={handleClose}
        >
          Jelajah
        </Link>
      </div>

      <div className="offcanvas-footer p-3 border-top shadow ST--PasangIklan__mobile">
        <Link className="btn btn-primary w-100" to="/pasang-iklan" onClick={handleClose}>
          + Pasang Iklan
        </Link>
      </div>
    </div>
  );
}
