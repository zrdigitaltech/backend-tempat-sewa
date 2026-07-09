<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KonsultasiTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('konsultasi')->insert([
            ['user_id' => 1, 'topic' => 'Konsultasi Demo', 'message' => 'Butuh saran', 'status' => 'open', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
