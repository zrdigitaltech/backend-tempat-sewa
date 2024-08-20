import { Fragment } from "react";

const Index = props => {
  const { title, deskripsi, image } = props;

  return (
    <Fragment>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>{title || 'Tempat Sewa Kontrakan'} | Nama Pemilik Kontrakan</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* <!-- Manifest --> */}
      <link rel="manifest" href="/manifest.json" />

      {/* <!-- Keyword & Author --> */}
      <meta
        name="keywords"
        content="Nama Pemilik Kontrakan, Sewa Kontrakan Cipondoh, Sewa Kontrakan Cileduk, Sewa Kontrakan Kunciran, Sewa Kontrakan Tangerang"
      />
      <meta name="author" content="ZRDevelopers" />

      {/* <!--  Essential META Tags --> */}
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${image || '/assets/assets/images/about-us.jpg'}`} />
      <meta property="og:url" content="/" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* <!--  Non-Essential, But Recommended --> */}
      <meta
        property="og:description"
        content={`${deskripsi || 'Seseorang yang menyewa atau menempati suatu properti seperti kontrakan.'}`}
      />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:image:alt" content={title} />

      {/* <!--  Non-Essential, But Required for Analytics --> */}
      {/* <!-- <meta property="fb:app_id" content="your_app_id" />
    <meta name="twitter:site" content="@website-username"> --> */}

      {/* <!-- Favicon --> */}
      <link rel="shortcut icon" type="image/x-icon" href="assets/images/favicon.png" />

      {/* <!-- Google Tag Manager --> */}
      {/* <!-- End Google Tag Manager --> */}

      {/* <!-- Google tag (gtag.js) --> */}
    </Fragment>
  );
};

export default Index;
