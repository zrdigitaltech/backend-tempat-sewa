<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Struk Transaksi</title>
    <style>
      /* Tambahkan CSS untuk style struk di sini */
    </style>
  </head>
  <body>
    <h1>Struk Transaksi</h1>
    <p>No. Transaksi: {{ $transaksi->id }}</p>
    <p>Tanggal: {{ $transaksi->tanggal }}</p>
    <p>Nama Penyewa: {{ $transaksi->penyewa->nama }}</p>
    <p>Jumlah: Rp{{ number_format($transaksi->jumlah, 0, ',', '.') }}</p>
    <!-- Tambahkan detail lainnya -->
  </body>
</html>
