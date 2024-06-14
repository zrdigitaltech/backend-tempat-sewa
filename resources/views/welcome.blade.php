<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-app-env="{{ env('APP_ENV') }}">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Tukang Listrik Panggilan - Jasa Perbaikan Listrik | Mekanik Elektro</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Manifest -->
    <link rel="manifest" href="/manifest.json" />

    <!-- Keyword & Author -->
    <meta
      name="keywords"
      content="Mekanik Elektro, Teknisi Listrik, Tukang Listrik, Jakarta, Bogor, Depok, Bekasi, Tangerang"
    />
    <meta name="author" content="ZRDevelopers" />

    <!--  Essential META Tags -->
    <meta property="og:title" content="Mekanik Elektro" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="/assets/assets/images/about-us.jpg" />
    <meta property="og:url" content="/" />
    <meta name="twitter:card" content="summary_large_image" />

    <!--  Non-Essential, But Recommended -->
    <meta
      property="og:description"
      content="Mekanik Elektro ialah Teknisi Listrik / Tukang Listrik Panggilan yg melayani jasa perbaikan Listrik untuk Rumah, Ruko, Kantor, &amp; Industri."
    />
    <meta property="og:site_name" content="Mekanik Elektro" />
    <meta name="twitter:image:alt" content="Mekanik Elektro" />

    <!--  Non-Essential, But Required for Analytics -->
    <!-- <meta property="fb:app_id" content="your_app_id" />
  <meta name="twitter:site" content="@website-username"> -->

    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="assets/images/favicon.png" />

    <!-- Google Tag Manager -->
    <script>
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-TMRXRSJM');
    </script>
    <!-- End Google Tag Manager -->

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

    @vite('resources/app/index.jsx')
    @filamentStyles
  </head>

  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-TMRXRSJM"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="app" class="h-100"></div>

    @filamentScripts
    @vite('resources/js/app.js')
  </body>
</html>
