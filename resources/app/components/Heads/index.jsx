import React from 'react';
import { Helmet } from 'react-helmet-async';

const Index = props => {
  const { title, deskripsi, image } = props;

  const defaultTitle =
    'TempatSewa.Com Indonesia: Situs Sewa Kos, Sewa Rumah, Sewa Apartemen, Sewa Ruko, Sewa Kios dan Sewa Gudang';
  const defaultDeskripsi =
    'Temukan dan sewa kontrakan, kost, atau properti impianmu dengan mudah. Kelola dan pasarkan properti dalam satu platform: tempatSewa.Com.';
  const defaultImage = image || '/assets/assets/images/about-us.jpg';

  return (
    <Helmet>
      {/* <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" /> */}

      {/* Primary Meta Tags */}
      {/* <title>{title || defaultTitle}</title>
      <meta name="description" content={deskripsi || defaultDeskripsi} />
      <meta
        name="keywords"
        content="sewa kontrakan, sewa kost, sewa rumah, cari kontrakan murah, kost bulanan, sewa apartemen, kontrakan Jakarta, kost dekat kampus, pasang iklan properti, platform sewa properti, properti disewakan, cari rumah sewa, kontrakan eksklusif, manajemen properti, tempat sewa terpercaya"
      />
      <meta name="author" content="ZRDevelopers" />
      <meta name="language" content="id" />
      <meta name="copyright" content="TempatSewa.Com" />
      <meta name="robots" content="index, follow" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#128C7E" /> */}

      {/* Open Graph / Facebook */}
      {/* <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={typeof window !== 'undefined' ? window.location.href : 'https://tempatsewa.com'}
      />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={deskripsi || defaultDeskripsi} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:site_name" content="TempatSewa.Com" /> */}

      {/* Twitter */}
      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={deskripsi || defaultDeskripsi} />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:image:alt" content={title || defaultTitle} /> */}

      {/* Favicon & Manifest */}
      {/* <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.png" />
      <link rel="manifest" href="/manifest.json" /> */}
    </Helmet>
  );
};

export default Index;
