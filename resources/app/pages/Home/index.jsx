// Home Page
import React, { Fragment } from 'react';
import { Banner, TipeProperti, Properti } from '@/app/pages/Home/components';

export default function HomePage() {
  return (
    <Fragment>
      {/* Hero Banner */}
      <Banner />

      {/* Kategori */}
      <TipeProperti />

      {/* Properti Terbaru */}
      <Properti />
    </Fragment>
  );
}
