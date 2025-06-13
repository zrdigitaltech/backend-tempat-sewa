import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { Desktop, Mobile } from '@/app/components/Header/components';
import BantuanModal from '@/app/components/Header/modal/Bantuan';

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  // Desktop
  const [openDisewa, setOpenDisewa] = useState(false);

  const [showBantuan, setShowBantuan] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 320);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 320);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // untuk update langsung saat pertama render

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Fragment>
      <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
        <div className="container d-flex justify-content-between align-items-center py-2">
          {/* Logo Brand */}
          <Link
            to="/"
            className="navbar-brand fw-bold d-flex align-items-center"
            onClick={() => setOpenDisewa(false)}
          >
            <span className="text-primary">tempat</span>Sewa.Com
          </Link>

          <div className="d-flex">
            <button
              className={`btn btn-primary ${isMobile ? 'd-none' : ''}`}
              onClick={() => (navigate('/pasang-iklan-properti'), setOpenDisewa(false))}
            >
              + Pasang Iklan
            </button>

            {/* Toggle button (Offcanvas Trigger for mobile) */}
            <button
              className="btn d-lg-none p-0 mx-2 my-1"
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Desktop Menu */}
          <Desktop
            openDisewa={openDisewa}
            setOpenDisewa={setOpenDisewa}
            showBantuan={showBantuan}
            setShowBantuan={setShowBantuan}
          />
        </div>

        {/* Offcanvas Mobile Menu */}
        <Mobile
          handleClose={closeMenu}
          isMenuOpen={isMenuOpen}
          showBantuan={showBantuan}
          setShowBantuan={setShowBantuan}
        />
      </nav>
      <BantuanModal
        show={showBantuan}
        onClose={() => setShowBantuan(false)}
        setShowBantuan={setShowBantuan}
      />
    </Fragment>
  );
}
