import React, { Fragment, useRef, useState } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';

import { Banner } from './components';
import './tentangKami.scss';

export default function TentangKami() {
  const [active, setActive] = useState('tentang');

  const handleClick = (key, ref) => {
    setActive(key);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <Fragment>
      <section className="my-3">
        <Breadcrumb title="Syarat Penggunaan Pemilik Properti" />
      </section>

      <Banner />

      <section className="bg-light pt-3 border-top border-bottom">
        <div className="container-fluid px-3">
          <div className="nav-tabs-scroll-wrapper overflow-auto">
            <div className="d-flex flex-nowrap justify-content-center gap-4 nav-tabs-custom">
              <a
                onClick={() => handleClick('tentang', refs.tentangRef)}
                className={`tab-link ${active === 'tentang' ? 'active' : ''}`}
              >
                Tentang <small>tempat</small>
                <strong>Sewa.Com</strong>
              </a>
              <a
                onClick={() => handleClick('kisah', refs.kisahRef)}
                className={`tab-link ${active === 'kisah' ? 'active' : ''}`}
              >
                Kisah Pendirian
              </a>
              <a
                onClick={() => handleClick('perjalanan', refs.perjalananRef)}
                className={`tab-link ${active === 'perjalanan' ? 'active' : ''}`}
              >
                Perjalanan
              </a>
              <a
                onClick={() => handleClick('kepemimpinan', refs.kepemimpinanRef)}
                className={`tab-link ${active === 'kepemimpinan' ? 'active' : ''}`}
              >
                Kepemimpinan
              </a>
              <a
                onClick={() => handleClick('investor', refs.investorRef)}
                className={`tab-link ${active === 'investor' ? 'active' : ''}`}
              >
                Portal & Investor
              </a>
              <a
                onClick={() => handleClick('ulasan', refs.ulasanRef)}
                className={`tab-link ${active === 'ulasan' ? 'active' : ''}`}
              >
                Ulasan Pengguna
              </a>
              <a
                onClick={() => handleClick('karir', refs.karirRef)}
                className={`tab-link ${active === 'karir' ? 'active' : ''}`}
              >
                Karir
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        Tab Tentang sewaTeempat.Com, Kisah Pendirian, Perjalanan sewaTempat.Com, Kepimpinan, Portal
        dan investor, Ulasan Pengguna
      </section>

      <section className="pt-3 pb-5">
        <div className="container">
          <h1 className="text-3xl font-bold mb-4">Tentang tempatSewa.Com</h1>
          <p className="mb-4">
            <strong>tempatSewa.Com</strong> adalah platform tepercaya yang memudahkanmu menemukan
            tempat tinggal impian — mulai dari <strong>kontrakan</strong>, <strong>kost</strong>,
            hingga <strong>properti sewa lainnya</strong>.
          </p>
          <p className="mb-4">
            Kami hadir untuk menghadirkan{' '}
            <strong>pengalaman pencarian hunian yang cepat, mudah, dan aman</strong>. Dengan sistem
            yang terus dikembangkan, kamu bisa mencari properti sesuai kebutuhan hanya dalam
            beberapa klik.
          </p>
          <p className="mb-4">
            Bagi <strong>pemilik properti</strong>, tempatSewa.Com menyediakan solusi yang efisien
            dan praktis untuk <strong>memasarkan dan mengelola properti</strong> dalam satu platform
            terpadu — mulai dari unggah data, mengatur harga, hingga menghubungkan langsung dengan
            penyewa potensial.
          </p>
          <p className="mb-4">
            Dengan komitmen pada <strong>kemudahan, keamanan, dan transparansi</strong>,
            tempatSewa.Com menjadi pilihan utama bagi para pencari dan pemilik hunian sewa di
            Indonesia.
          </p>
        </div>
      </section>
    </Fragment>
  );
}
