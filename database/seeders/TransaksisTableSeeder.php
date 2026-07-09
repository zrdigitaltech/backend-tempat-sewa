<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransaksisTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('transaksis')->insert([
            [
                'id_penyewa' => 1,
                'id_properti' => null,
                'id_kategori' => null,
                'tipe_pembayaran' => 'manual',
                'tanggal' => now(),
                'tgl_pembayaran_berikutnya' => null,
                'bayar_dp' => null,
                'catatan' => 'Transaksi demo',
                'jumlah_pemasukan' => 100000,
                'jumlah_pengeluaran' => null,
                'jenis_transaksi' => 'pemasukan',
                'status_pembayaran' => 'dibayar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
