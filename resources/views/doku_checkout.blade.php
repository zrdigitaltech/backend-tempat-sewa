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
    <p>Order: {{ $orderId }}</p>
    <p>Amount: {{ number_format($amount) }} IDR</p>

    <form method="POST" action="/doku/create">
      @csrf
      <input type="hidden" name="order_id" value="{{ $orderId }}">
      <input type="hidden" name="amount" value="{{ $amount }}">
      <button type="submit">Pay with Doku</button>
    </form>
  </body>
</html>
