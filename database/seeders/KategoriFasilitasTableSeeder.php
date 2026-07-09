<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriFasilitasTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('kategori_fasilitas')->insert([
            ['tipe_properti_id' => 1, 'jenis' => 'lingkungan', 'nama' => 'Fasilitas Umum', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
