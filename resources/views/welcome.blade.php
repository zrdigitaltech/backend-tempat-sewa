<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-app-env="{{ env('APP_ENV') }}">
  <head>
    @viteReactRefresh
    @vite('resources/app/index.jsx')
    @filamentStyles

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {{-- Default SEO --}}
    @php
        $title = $meta['title'] ?? 'TempatSewa.Com Indonesia: Situs Sewa Kos, Sewa Rumah, Sewa Apartemen, Sewa Ruko, Sewa Kios dan Sewa Gudang';
        $description = $meta['description'] ?? 'Temukan dan sewa kontrakan, kost, atau properti impianmu dengan mudah. Kelola dan pasarkan properti dalam satu platform: tempatSewa.Com.';
        $image = $meta['image'] ?? '/assets/assets/images/about-us.jpg';
    @endphp

    <title>{{ $title }}</title>
    <meta name="description" content="{{ $description }}" />
    <meta name="keywords" content="sewa kontrakan, sewa kost, sewa rumah, cari kontrakan murah, kost bulanan, sewa apartemen, kontrakan Jakarta, kost dekat kampus, pasang iklan properti, platform sewa properti, properti disewakan, cari rumah sewa, kontrakan eksklusif, manajemen properti, tempat sewa terpercaya" />
    <meta name="author" content="ZRDevelopers" />
    <meta name="language" content="id" />
    <meta name="copyright" content="TempatSewa.Com" />
    <meta name="robots" content="index, follow" />
    <meta name="distribution" content="global" />
    <meta name="rating" content="general" />
    <meta name="revisit-after" content="7 days" />
    <meta name="theme-color" content="#128C7E" />

    {{-- Open Graph --}}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:title" content="{{ $title }}" />
    <meta property="og:description" content="{{ $description }}" />
    <meta property="og:image" content="{{ $image }}" />
    <meta property="og:site_name" content="TempatSewa.Com" />

    {{-- Twitter --}}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $title }}" />
    <meta name="twitter:description" content="{{ $description }}" />
    <meta name="twitter:image" content="{{ $image }}" />
    <meta name="twitter:image:alt" content="{{ $title }}" />

    {{-- Favicon --}}
    <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.png" />
    <link rel="manifest" href="/manifest.json" />
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
