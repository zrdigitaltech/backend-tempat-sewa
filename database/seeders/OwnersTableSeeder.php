<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OwnersTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('owners')->insert([
            [
                'user_id' => 1,
                'name' => 'Owner Demo',
                'slug' => 'owner-demo',
                'avatar' => null,
                'bio' => 'Demo owner for testing',
                'whatsapp' => '081234567890',
                'socials' => json_encode(['instagram' => 'owner_demo']),
                'is_verified' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
