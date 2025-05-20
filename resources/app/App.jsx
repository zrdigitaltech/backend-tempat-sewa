import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Heads from '@/app/components/Heads';
import Header from '@/app/components/Header';
import CTA from '@/app/components/Cta';
import Footer from '@/app/components/Footer';

import useScrollToTop from '@/app/components/ScrollToTop';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useScrollToTop();

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="container-fluid px-0">
      <Heads />
      <Header />
      <Outlet />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
