<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-app-env="{{ env('APP_ENV') }}">
  <head>
    @viteReactRefresh

    @vite('resources/app/index.jsx')
    <style></style>
    @filamentStyles
  </head>

  <body>
    @if (auth()->check())
      @livewire('database-notifications')
    @endif

    <!-- Google Tag Manager (noscript) -->
    <!-- End Google Tag Manager (noscript) -->

    <div id="app"></div>
    <!-- class="h-100" -->

    @filamentScripts
    @vite('resources/js/app.js')
  </body>
</html>
