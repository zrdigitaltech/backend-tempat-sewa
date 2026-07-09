<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdukBoostersTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('produk_boosters')->insert([
            ['nama' => 'Booster Demo', 'deskripsi' => 'Demo booster', 'harga' => 50000, 'durasi_hari' => 30, 'prioritas' => false, 'tampilkan_beranda' => false, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
