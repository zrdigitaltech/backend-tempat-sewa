<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticlesTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('articles')->insert([
            ['author_id' => 1, 'title' => 'Artikel Demo', 'slug' => 'artikel-demo', 'content' => 'Isi artikel demo', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
