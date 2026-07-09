<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AuthorsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('authors')->insert([
            ['name' => 'Penulis Demo', 'bio' => 'Bio penulis', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
