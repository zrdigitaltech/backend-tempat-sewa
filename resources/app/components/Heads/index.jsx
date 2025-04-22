import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const Index = props => {
  const { title, deskripsi, image } = props;
  const defaultTitle =
    'TempatSewa.Com Indonesia: Situs Sewa Kos, Sewa Rumah, Sewa Apartemen, Sewa Ruko, Sewa Kios dan Sewa Gudang';

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>{title || defaultTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* <!-- Manifest --> */}
      <link rel="manifest" href="/manifest.json" />

      {/* <!-- Keyword & Author --> */}
      <meta
        name="keywords"
        content="sewa kos, sewa rumah, sewa apartemen, sewa ruko, sewa kios, sewa gudang, sewa properti Indonesia"
      />
      <meta name="author" content="ZRDevelopers" />

      {/* <!--  Essential META Tags --> */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:image" content={`${image || '/assets/assets/images/about-us.jpg'}`} />
      <meta property="og:url" content="/" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* <!--  Non-Essential, But Recommended --> */}
      <meta
        property="og:description"
        content={`${deskripsi || 'TempatSewa.Com adalah platform terpercaya untuk sewa kos, rumah, apartemen, ruko, kios, dan gudang di seluruh Indonesia.'}`}
      />
      <meta property="og:site_name" content={title || defaultTitle} />
      <meta name="twitter:image:alt" content={title || defaultTitle} />

      {/* <!--  Non-Essential, But Required for Analytics --> */}
      {/* <!-- <meta property="fb:app_id" content="your_app_id" />
    <meta name="twitter:site" content="@website-username"> --> */}

      {/* <!-- Favicon --> */}
      <link rel="shortcut icon" type="image/x-icon" href="assets/images/favicon.png" />

      {/* <!-- Google Tag Manager --> */}
      {/* <!-- End Google Tag Manager --> */}

      {/* <!-- Google tag (gtag.js) --> */}
    </Helmet>
  );
};

export default Index;
