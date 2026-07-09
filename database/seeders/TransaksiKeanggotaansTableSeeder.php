<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransaksiKeanggotaansTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('transaksi_keanggotaans')->insert([
            ['id_user' => 1, 'id_keanggotaan' => 1, 'kode_transaksi' => 'TRX-DEMO-1', 'jumlah' => 100000, 'status' => 'paid', 'metode_pembayaran' => 'manual', 'dibayar_pada' => now(), 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
