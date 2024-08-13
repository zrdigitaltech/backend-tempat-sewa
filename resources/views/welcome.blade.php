<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-app-env="{{ env('APP_ENV') }}">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Tempat Sewa Kontrakan | Nama Pemilik Kontrakan</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Manifest -->
    <link rel="manifest" href="/manifest.json" />

    <!-- Keyword & Author -->
    <meta
      name="keywords"
      content="Nama Pemilik Kontrakan, Sewa Kontrakan Cipondoh, Sewa Kontrakan Cileduk, Sewa Kontrakan Kunciran, Sewa Kontrakan Tangerang"
    />
    <meta name="author" content="ZRDevelopers" />

    <!--  Essential META Tags -->
    <meta property="og:title" content="Nama Pemilik Kontrakan" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="/assets/assets/images/about-us.jpg" />
    <meta property="og:url" content="/" />
    <meta name="twitter:card" content="summary_large_image" />

    <!--  Non-Essential, But Recommended -->
    <meta
      property="og:description"
      content="Seseorang yang menyewa atau menempati suatu properti seperti kontrakan."
    />
    <meta property="og:site_name" content="Nama Pemilik Kontrakan" />
    <meta name="twitter:image:alt" content="Nama Pemilik Kontrakan" />

    <!--  Non-Essential, But Required for Analytics -->
    <!-- <meta property="fb:app_id" content="your_app_id" />
    <meta name="twitter:site" content="@website-username"> -->

    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="assets/images/favicon.png" />

    <!-- Google Tag Manager -->
    <!-- End Google Tag Manager -->

    <!-- Google tag (gtag.js) -->

    @viteReactRefresh

    @vite('resources/app/index.jsx')
    @filamentStyles
  </head>

  <body>
    <!-- Google Tag Manager (noscript) -->
    <!-- End Google Tag Manager (noscript) -->

    <div id="app" class="h-100"></div>

    @filamentScripts
    @vite('resources/js/app.js')
  </body>
</html>
