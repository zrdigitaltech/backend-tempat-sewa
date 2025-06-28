<?php

use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Database\Seeder;

class TransaksiSeeder extends Seeder
{
  public function run(): void
  {
    $user = User::first();

    Transaksi::create([
      'id_user' => $user->id,
      'kode_transaksi' => 'TRX' . now()->format('YmdHis'),
      'jumlah' => 100000,
      'status' => 'pending',
      'expired_pada' => now()->addDays(1),
      'catatan' => 'Pembelian paket Premium',
    ]);
  }
}
