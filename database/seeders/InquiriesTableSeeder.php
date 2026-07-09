<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InquiriesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('inquiries')->insert([
            [
                'property_id' => 1,
                'name' => 'Pertanyaan Demo',
                'phone' => '081234567890',
                'message' => 'Apakah properti ini masih tersedia?',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
