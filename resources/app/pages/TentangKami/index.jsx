import React, { Fragment, useRef, useState } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';

import Banner from './components/Banner';
import Tabs from './components/Tabs';
import Tentang from './components/Tabs/Tentang';
import Kisah from './components/Tabs/Kisah';
import Perjalanan from './components/Tabs/Perjalanan';
import Kepemimpinan from './components/Tabs/Kepemimpinan';
import PortalInvestor from './components/Tabs/PortalInvestor';
import UlasanPengguna from './components/Tabs/UlasanPengguna';

import './tentangKami.scss';

export default function TentangKami() {
  const [active, setActive] = useState('tentang');

  const handleClick = (key, ref) => {
    setActive(key);
    const offset = 90; // misalnya: header tinggi 80px
    if (ref.current) {
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const refs = {
    tentangRef: useRef(null),
    kisahRef: useRef(null),
    perjalananRef: useRef(null),
    kepemimpinanRef: useRef(null),
    investorRef: useRef(null),
    ulasanRef: useRef(null)
  };

  return (
    <Fragment>
      <section className="my-3">
        <Breadcrumb title="Syarat Penggunaan Pemilik Properti" />
      </section>

      <Banner />

      <Tabs refs={refs} handleClick={(name, ref) => handleClick(name, ref)} active={active} />

      <Tentang refs={refs} />
      <Kisah refs={refs} />
      <Perjalanan refs={refs} />
      <Kepemimpinan refs={refs} />
      <PortalInvestor refs={refs} />
      <UlasanPengguna refs={refs} />
    </Fragment>
  );
}
