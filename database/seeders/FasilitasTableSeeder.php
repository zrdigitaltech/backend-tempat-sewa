<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FasilitasTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('fasilitas')->insert([
            ['kategori_fasilitas_id' => 1, 'nama' => 'Parkir', 'created_at' => now(), 'updated_at' => now()],
            ['kategori_fasilitas_id' => 1, 'nama' => 'Wifi', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
