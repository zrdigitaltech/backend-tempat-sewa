<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropertisTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('propertis')->insert([
            [
                'user_id' => 1,
                'owner_id' => 1,
                'type_id' => 1,
                'image' => json_encode(['/assets/sample1.jpg','/assets/sample2.jpg']),
                'nama' => 'Contoh Properti',
                'slug' => 'contoh-properti',
                'deskripsi' => 'Deskripsi properti contoh untuk seeding',
                'keterangan' => null,
                'harga_sewa' => json_encode(['harga' => 1500000, 'durasi' => 'bulan']),
                'price' => 1500000,
                'duration' => 'bulan',
                'status' => 'tersedia',
                'views' => 0,
                'is_featured' => false,
                'extra' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
