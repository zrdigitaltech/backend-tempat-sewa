<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-app-env="{{ env('APP_ENV') }}">
  <head>
    @viteReactRefresh
    @vite('resources/app/index.jsx')
    {{-- @filamentStyles --}}

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {{-- Dynamic SEO --}}
    @php
        $title = $meta['title'] ?? 'TempatSewa.Com Indonesia: Situs Sewa Kos, Sewa Rumah, Sewa Apartemen, Sewa Ruko, Sewa Kios dan Sewa Gudang';
        $description = $meta['description'] ?? 'Temukan dan sewa kontrakan, kost, atau properti impianmu dengan mudah. Kelola dan pasarkan properti dalam satu platform: tempatSewa.Com.';
        $image = $meta['image'] ?? asset('assets/images/about-us.jpg');
        $url = url()->current();
    @endphp

    <title>{{ $title }}</title>
    <meta name="description" content="{{ $description }}" />
    <meta name="keywords" content="sewa kontrakan, sewa kost, sewa rumah, cari kontrakan murah, kost bulanan, sewa apartemen, kontrakan Jakarta, kost dekat kampus, pasang iklan properti, platform sewa properti, properti disewakan, cari rumah sewa, kontrakan eksklusif, manajemen properti, tempat sewa terpercaya" />
    <meta name="author" content="ZRDevelopers" />
    <meta name="language" content="id" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#128C7E" />
    <link rel="canonical" href="{{ $url }}" />

    {{-- Open Graph --}}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $url }}" />
    <meta property="og:title" content="{{ $title }}" />
    <meta property="og:description" content="{{ $description }}" />
    <meta property="og:image" content="{{ $image }}" />
    <meta property="og:site_name" content="TempatSewa.Com" />
    <meta property="og:locale" content="id_ID" />

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $title }}" />
    <meta name="twitter:description" content="{{ $description }}" />
    <meta name="twitter:image" content="{{ $image }}" />
    <meta name="twitter:image:alt" content="{{ $title }}" />

    {{-- Favicon & Manifest --}}
    <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/x-icon" />
    <link rel="manifest" href="/manifest.json" />

    {{-- Optional JSON-LD Structured Data --}}
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "{{ $title }}",
        "url": "{{ $url }}",
        "description": "{{ $description }}",
        "publisher": {
          "@type": "Organization",
          "name": "TempatSewa.Com",
          "logo": {
            "@type": "ImageObject",
            "url": "{{ asset('assets/images/logo.png') }}"
          }
        },
        "image": {
          "@type": "ImageObject",
          "url": "{{ $image }}",
          "width": 1200,
          "height": 630
        }
      }
    </script>
  </head>

  <body>
    @if (auth()->check())
      @livewire('database-notifications')
    @endif

    <div id="app"></div>

    {{-- @filamentScripts --}}
    {{-- @vite('resources/js/app.js') --}}
  </body>
</html>
