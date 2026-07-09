<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropertyImagesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('property_images')->insert([
            ['property_id' => 1, 'url' => '/assets/sample1.jpg', 'sort_order' => 0, 'created_at' => now(), 'updated_at' => now()],
            ['property_id' => 1, 'url' => '/assets/sample2.jpg', 'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
