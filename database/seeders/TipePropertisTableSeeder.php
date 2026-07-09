<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipePropertisTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tipe_propertis')->insert([
            ['nama' => 'Kost', 'slug' => 'kost', 'kategori' => 'hunian', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'Ruko', 'slug' => 'ruko', 'kategori' => 'usaha', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
