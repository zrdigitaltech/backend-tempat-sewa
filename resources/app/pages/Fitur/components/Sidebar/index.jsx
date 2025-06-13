'use client';
import { Fragment, useEffect, useState } from 'react';
import { UseHeads } from '@/app/components';
import { Hero, ProdukBooster, DaftarPeminat } from '@/app/pages/Fitur/components';

export default function Index(props) {
  const { activeMenu, setActiveMenu } = props;

  return (
    <Fragment>
      <div className="sticky-top" style={{ top: '100px' }}>
        <ul className="list-unstyled">
          <li className="mb-3">
            <div
              onClick={() => setActiveMenu('produkBooster')}
              className={`d-flex align-items-center w-100 text-start cursor-pointer p-2 ${
                activeMenu === 'produkBooster'
                  ? 'text-primary fw-semibold border-start border-4 border-primary bg-light ps-3'
                  : 'text-dark bg-transparent'
              }`}
              style={{ transition: 'all 0.3s ease' }}
            >
              Produk Booster
            </div>
          </li>
          <li className="mb-3">
            <div
              onClick={() => setActiveMenu('daftarPeminat')}
              className={`d-flex align-items-center w-100 text-start cursor-pointer p-2 ${
                activeMenu === 'daftarPeminat'
                  ? 'text-primary fw-semibold border-start border-4 border-primary bg-light ps-3'
                  : 'text-dark bg-transparent'
              }`}
              style={{ transition: 'all 0.3s ease' }}
            >
              Daftar Peminat
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}
