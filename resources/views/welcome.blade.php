<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-app-env="{{ env('APP_ENV') }}">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Tukang Listrik Panggilan - Jasa Perbaikan Listrik | Mekanik Elektro</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Manifest -->
  <link rel="manifest" href="http://mekanikelektro.com/manifest.json" />

  <!-- Keyword & Author -->
  <meta name="keywords" content="Mekanik Elektro, Teknisi Listrik, Tukang Listrik, Jakarta, Bogor, Depok, Bekasi, Tangerang" />
  <meta name="author" content="ZRDevelopers" />

  <!--  Essential META Tags -->
  <meta property="og:title" content="Mekanik Elektro">
  <meta property="og:type" content="article" />
  <meta property="og:image" content="http://MekanikElektro.com/assets/assets/images/about-us.jpg">
  <meta property="og:url" content="http://MekanikElektro.com">
  <meta name="twitter:card" content="summary_large_image">

  <!--  Non-Essential, But Recommended -->
  <meta property="og:description" content="Mekanik Elektro ialah Teknisi Listrik / Tukang Listrik Panggilan yg melayani jasa perbaikan Listrik untuk Rumah, Ruko, Kantor, &amp; Industri.">
  <meta property="og:site_name" content="Mekanik Elektro">
  <meta name="twitter:image:alt" content="Mekanik Elektro">

  <!--  Non-Essential, But Required for Analytics -->
  <!-- <meta property="fb:app_id" content="your_app_id" />
  <meta name="twitter:site" content="@website-username"> -->

  <!-- Favicon -->
  <link rel="shortcut icon" type="image/x-icon" href="assets/images/favicon.png">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-WHCCSGXMFH"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-WHCCSGXMFH');
  </script>

  @viteReactRefresh

  @vite("resources/app/index.jsx")
</head>

<body>
  <div id="app" class="h-100"></div>
</body>

</html>