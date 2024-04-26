<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-app-env="{{ env('APP_ENV') }}">
  <head>
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
