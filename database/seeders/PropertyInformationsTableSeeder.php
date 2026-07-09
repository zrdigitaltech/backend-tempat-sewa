<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropertyInformationsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('property_informations')->insert([
            ['property_id' => 1, 'info_type' => 'attribute', 'name' => 'luas', 'data' => json_encode('20 m2'), 'created_at' => now(), 'updated_at' => now()],
            ['property_id' => 1, 'info_type' => 'attribute', 'name' => 'kamar_tidur', 'data' => json_encode('1'), 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
