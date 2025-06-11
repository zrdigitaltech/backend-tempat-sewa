import React from 'react';
import { Helmet } from 'react-helmet-async';

const Index = props => {
  const { title, deskripsi, image } = props;

  const defaultTitle =
    'TempatSewa.Com Indonesia: Situs Sewa Kos, Sewa Rumah, Sewa Apartemen, Sewa Ruko, Sewa Kios dan Sewa Gudang';
  const defaultDeskripsi =
    'Temukan dan sewa kontrakan, kost, atau properti impianmu dengan mudah. Kelola dan pasarkan properti dalam satu platform: tempatSewa.Com.';

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>{title || defaultTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* ✅ Tambahkan meta description */}
      <meta name="description" content={deskripsi || defaultDeskripsi} />

      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />

      {/* Keyword & Author */}
      <meta
        name="keywords"
        content="sewa kontrakan, sewa kost, sewa rumah, cari kontrakan murah, kost bulanan, sewa apartemen, kontrakan Jakarta, kost dekat kampus, pasang iklan properti, platform sewa properti, properti disewakan, cari rumah sewa, kontrakan eksklusif, manajemen properti, tempat sewa terpercaya"
      />
      <meta name="author" content="ZRDevelopers" />

      {/* Essential META Tags */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:image" content={image || '/assets/assets/images/about-us.jpg'} />
      <meta property="og:url" content="/" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Non-Essential, But Recommended */}
      <meta property="og:description" content={deskripsi || defaultDeskripsi} />
      <meta property="og:site_name" content={title || defaultTitle} />
      <meta name="twitter:image:alt" content={title || defaultTitle} />

      {/* Favicon */}
      <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.png" />
    </Helmet>
  );
};

export default Index;
