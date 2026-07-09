<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('reviews')->insert([
            ['property_id' => 1, 'user_id' => 1, 'rating' => 5, 'comment' => 'Bagus', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
