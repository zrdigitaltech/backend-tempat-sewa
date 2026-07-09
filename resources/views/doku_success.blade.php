<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pembayaran Berhasil</title>
  </head>
  <body>
    <div style="max-width:800px;margin:40px auto;padding:20px;border:1px solid #e6e6e6;border-radius:6px;">
      <h1>Pembayaran Berhasil</h1>
      <p>Terima kasih! Pembayaran Anda telah diterima. Jika ini adalah pembelian paket keanggotaan, status keanggotaan akan diperbarui otomatis.</p>
      <p>Order ID: {{ request()->query('order_id') ?? request()->query('merchantOrderId') }}</p>
      <p><a href="/paket-keanggotaan">Kembali ke Paket Keanggotaan</a></p>
    </div>
  </body>
</html>
