import React from 'react';
import { Helmet } from 'react-helmet-async';

const Index = ({ title, deskripsi, image, url }) => {
  const defaultTitle =
    'TempatSewa.Com Indonesia: Situs Sewa Kos, Sewa Rumah, Sewa Apartemen, Sewa Ruko, Sewa Kios dan Sewa Gudang';
  const defaultDeskripsi =
    'Temukan dan sewa kontrakan, kost, atau properti impianmu dengan mudah. Kelola dan pasarkan properti dalam satu platform: tempatSewa.Com.';
  const defaultImage = image || 'https://tempatsewa.com/assets/images/about-us.jpg';
  const currentUrl =
    url || (typeof window !== 'undefined' ? window.location.href : 'https://tempatsewa.com');
  const metaTitle = title || defaultTitle;
  const metaDesc = deskripsi || defaultDeskripsi;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: metaTitle,
    url: currentUrl,
    description: metaDesc,
    publisher: {
      '@type': 'Organization',
      name: 'TempatSewa.Com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tempatsewa.com/assets/images/logo.png'
      }
    },
    image: {
      '@type': 'ImageObject',
      url: defaultImage,
      height: 630,
      width: 1200
    }
  };

  return (
    <Helmet>
      {/* General Meta */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta
        name="keywords"
        content="sewa kontrakan, sewa kost, sewa rumah, cari kontrakan murah, kost bulanan, sewa apartemen, kontrakan Jakarta, kost dekat kampus, pasang iklan properti, platform sewa properti, properti disewakan, cari rumah sewa, kontrakan eksklusif, manajemen properti, tempat sewa terpercaya"
      />
      <meta name="author" content="ZRDigitalTech" />
      <meta name="language" content="id" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#128C7E" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="TempatSewa.Com" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:image:alt" content={metaTitle} />

      {/* Favicon & Manifest */}
      <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/x-icon" />
      <link rel="manifest" href="/manifest.json" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default Index;
