<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaketKeanggotaansTableSeeder extends Seeder
{
  public function run(): void
  {
    DB::table('paket_keanggotaans')->insert([
      [
        'nama' => 'Unlimited',
        'deskripsi' => 'Paket khusus admin/developer tanpa batasan properti dan iklan.',
        'harga' => 0,
        'durasi_bulan' => 120, // atau 9999
        'maksimal_properti' => null,
        'maksimal_iklan' => null,
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'nama' => 'Gratis',
        'deskripsi' => 'Paket gratis dengan fitur terbatas.',
        'harga' => 0,
        'durasi_bulan' => 0,
        'maksimal_properti' => 3,
        'maksimal_iklan' => 1,
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'nama' => 'Premium',
        'deskripsi' => 'Paket premium dengan lebih banyak fitur.',
        'harga' => 100000,
        'durasi_bulan' => 1,
        'maksimal_properti' => 100,
        'maksimal_iklan' => 25,
        'created_at' => now(),
        'updated_at' => now(),
      ],
    ]);
  }
}
