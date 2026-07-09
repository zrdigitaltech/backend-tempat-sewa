<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReportsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('reports')->insert([
            [
                'property_id' => 1,
                'reporter_name' => 'Demo User',
                'reporter_contact' => '081234567890',
                'reason' => 'Informasi properti tidak sesuai.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
