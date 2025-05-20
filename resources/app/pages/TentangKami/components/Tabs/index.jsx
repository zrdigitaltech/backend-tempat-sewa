import React, { Fragment, useState } from 'react';

export default function Tabs(props) {
  const { refs, handleClick, active } = props;

  return (
    <Fragment>
      <section
        className="bg-light pt-3 border-top border-bottom position-sticky"
        style={{ top: '4.5rem', zIndex: 1 }}
      >
        <div className="container-fluid px-3">
          <div className="ST-nav-tabs-scroll-wrapper overflow-auto">
            <div className="d-flex flex-nowrap justify-content-center gap-4 ST-nav-tabs-custom">
              <a
                onClick={() => handleClick('tentang', refs.tentangRef)}
                className={`cursor-pointer tab-link ${active === 'tentang' ? 'active' : ''}`}
              >
                Tentang <small>tempat</small>
                <strong>Sewa.Com</strong>
              </a>
              <a
                onClick={() => handleClick('kisah', refs.kisahRef)}
                className={`cursor-pointer tab-link ${active === 'kisah' ? 'active' : ''}`}
              >
                Kisah Pendirian
              </a>
              <a
                onClick={() => handleClick('perjalanan', refs.perjalananRef)}
                className={`cursor-pointer tab-link ${active === 'perjalanan' ? 'active' : ''}`}
              >
                Perjalanan
              </a>
              <a
                onClick={() => handleClick('kepemimpinan', refs.kepemimpinanRef)}
                className={`cursor-pointer tab-link ${active === 'kepemimpinan' ? 'active' : ''}`}
              >
                Kepemimpinan
              </a>
              <a
                onClick={() => handleClick('investor', refs.investorRef)}
                className={`cursor-pointer tab-link ${active === 'investor' ? 'active' : ''}`}
              >
                Portal & Investor
              </a>
              <a
                onClick={() => handleClick('ulasan', refs.ulasanRef)}
                className={`cursor-pointer tab-link ${active === 'ulasan' ? 'active' : ''}`}
              >
                Ulasan Pengguna
              </a>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
