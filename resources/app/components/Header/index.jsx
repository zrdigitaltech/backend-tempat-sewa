import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListLogos } from '@/app/redux/action/logos/creator';
import { Link } from 'react-router-dom';
import './header.scss';
import OffcanvasMobile from './Mobile';
import Desktop from './Desktop';

export default function Index() {
  const logosList = useSelector(state => state.logos.logosList);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  // Desktop
  const [openDisewa, setOpenDisewa] = useState(false);

  useEffect(() => {
    dispatch(getListLogos());
  }, [dispatch]);

  return (
    <nav className="navbar navbar-light bg-white shadow-sm sticky-top z-3">
      <div className="container d-flex justify-content-between align-items-center py-2">
        {/* Logo Brand */}
        <Link
          to="/"
          className="navbar-brand fw-bold d-flex align-items-center"
          onClick={() => setOpenDisewa(false)}
        >
          {logosList?.length > 0 && (
            <img src={logosList[0].image_url} alt="Logo" height="32" className="me-2" />
          )}
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
        <Desktop openDisewa={openDisewa} setOpenDisewa={setOpenDisewa} />
      </div>

      {/* Offcanvas Mobile Menu */}
      <OffcanvasMobile handleClose={closeMenu} isMenuOpen={isMenuOpen} />
    </nav>
  );
}
