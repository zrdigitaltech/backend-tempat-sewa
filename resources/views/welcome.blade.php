<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-app-env="{{ env('APP_ENV') }}">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Tukang Listrik Panggilan - Jasa Perbaikan Listrik | Mekanik Elektro</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta content="Mekanik Elektro" property="og:title" />
  <meta content="Mekanik Elektro ialah Teknisi Listrik / Tukang Listrik Panggilan yg melayani jasa perbaikan Listrik untuk Rumah, Ruko, Kantor, &amp; Industri." property="og:description" />
  <meta content="" property="og:image" />
  <meta content="MekanikElektro.com" property="og:url" />

  <!-- Favicon -->
  <link rel="shortcut icon" type="image/x-icon" href="assets/images/favicon.png">

  @viteReactRefresh

  @vite("resources/app/index.jsx")


</head>

<body>
  <div id="app" class="h-100"></div>
</body>

</html>