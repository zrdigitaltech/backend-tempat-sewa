<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipeLookupTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tipe_kost')->insert([['name' => 'Kost Putra', 'slug' => 'kost-putra', 'created_at' => now(), 'updated_at' => now()]]);
        DB::table('tipe_kamar')->insert([['name' => 'Kamar Single', 'slug' => 'kamar-single', 'created_at' => now(), 'updated_at' => now()]]);
        DB::table('tipe_sewa')->insert([['name' => 'Per Bulan', 'slug' => 'per-bulan', 'created_at' => now(), 'updated_at' => now()]]);
    }
}
