'use client';
import { Fragment, useEffect, useState } from 'react';
import { Hero, Sidebar, ProdukBooster, DaftarPeminat } from '@/app/pages/Fitur/components';

export default function Index() {
  const [activeMenu, setActiveMenu] = useState('produkBooster');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      const timeout = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <Fragment>
      <Hero />

      <section id="ProdukBooster" className="py-5 bg-light" style={{ scrollMarginTop: '70px' }}>
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 mb-4 mb-md-0">
              <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            </div>

            {/* Konten kanan */}
            <div className="col-md-9">
              <div className="animate__animated animate__fadeIn">
                {activeMenu === 'produkBooster' && <ProdukBooster />}
                {activeMenu === 'daftarPeminat' && <DaftarPeminat />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
