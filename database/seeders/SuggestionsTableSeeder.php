<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SuggestionsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('suggestions')->insert([
            ['name' => 'User Demo', 'email' => 'userdemo@example.com', 'message' => 'Saran demo', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
