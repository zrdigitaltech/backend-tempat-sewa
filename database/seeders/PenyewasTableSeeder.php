<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenyewasTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('penyewas')->insert([
            ['image' => null, 'nama' => 'Penyewa Demo', 'no_telp' => '081234567890', 'kartu_identitas' => null, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
