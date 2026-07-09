<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Doku Checkout</title>
  </head>
  <body>
    <h1>Doku Demo Checkout</h1>

    @if(isset($packages) && $packages->count())
      <h2>Silakan pilih paket:</h2>
      <ul>
        @foreach($packages as $paket)
          <li>
            <form method="POST" action="/payment" style="display:inline">
              @csrf
              <input type="hidden" name="order_id" value="DOKU-PKG{{ $paket->id }}-{{ time() }}">
              <input type="hidden" name="amount" value="{{ (int)$paket->harga }}">
              <button type="submit">Bayar {{ $paket->nama }} — Rp {{ number_format($paket->harga, 0, ',', '.') }}</button>
            </form>
          </li>
        @endforeach
      </ul>
    @else
      <p>Order: {{ $orderId }}</p>
      <p>Amount: {{ number_format($amount) }} IDR</p>

      <form method="POST" action="/payment">
        @csrf
        <input type="hidden" name="order_id" value="{{ $orderId }}">
        <input type="hidden" name="amount" value="{{ $amount }}">
        <button type="submit">Pay with Doku</button>
      </form>
    @endif
  </body>
</html>
