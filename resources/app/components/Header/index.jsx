import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import OffcanvasMobile from './Mobile';
import Desktop from './Desktop';
import { KonsultasiModal } from '@/app/pages/modal';

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  // Desktop
  const [openDisewa, setOpenDisewa] = useState(false);

  const [showKonsultasi, setShowKonsultasi] = useState(false);

  return (
    <Fragment>
      <nav className="navbar navbar-light bg-white shadow-sm sticky-top z-3">
        <div className="container d-flex justify-content-between align-items-center py-2">
          {/* Logo Brand */}
          <Link
            to="/"
            className="navbar-brand fw-bold d-flex align-items-center"
            onClick={() => setOpenDisewa(false)}
          >
            <span className="text-primary">tempat</span>Sewa.Com
          </Link>

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

          {/* Desktop Menu */}
          <Desktop
            openDisewa={openDisewa}
            setOpenDisewa={setOpenDisewa}
            showKonsultasi={showKonsultasi}
            setShowKonsultasi={setShowKonsultasi}
          />
        </div>

        {/* Offcanvas Mobile Menu */}
        <OffcanvasMobile
          handleClose={closeMenu}
          isMenuOpen={isMenuOpen}
          showKonsultasi={showKonsultasi}
          setShowKonsultasi={setShowKonsultasi}
        />
      </nav>
      <KonsultasiModal show={showKonsultasi} onClose={() => setShowKonsultasi(false)} />
    </Fragment>
  );
}
