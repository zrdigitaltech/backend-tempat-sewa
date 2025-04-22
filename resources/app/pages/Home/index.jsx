// Home Page
import React, { Fragment, useEffect } from 'react';
import Banner from './components/Banner';
import Kategori from './components/Kategori';
import Properti from './components/Properti';

export default function HomePage() {
  return (
    <Fragment>
      {/* Hero Banner */}
      <Banner />

      {/* Kategori */}
      <Kategori />

      {/* Properti Terbaru */}
      <Properti />
    </Fragment>
  );
}
