<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-app-env="{{ env('APP_ENV') }}">
  <head>
    @viteReactRefresh
    @filamentStyles
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>App tempatSewa.Com</title>
    <meta name="description" content="" />
    <meta
      name="keywords"
      content="sewa kontrakan, sewa kost, sewa rumah, cari kontrakan murah, kost bulanan, sewa apartemen, kontrakan Jakarta, kost dekat kampus, pasang iklan properti, platform sewa properti, properti disewakan, cari rumah sewa, kontrakan eksklusif, manajemen properti, tempat sewa terpercaya"
    />
    <meta name="author" content="ZRDigitalTech" />    
  </head>

  <body>
    @if (auth()->check())
      @livewire('database-notifications')
    @endif

    <div id="app"></div>

    @filamentScripts
  </body>
</html>
