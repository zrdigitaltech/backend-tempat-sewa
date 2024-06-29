<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FloatingWhatsapp;

class FloatingWhatsappsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'id' => 1,
        'avatar' => '/assets/images/logo-whatsapp.png',
        'phone_number' => '6281228883616',
        'account_name' => 'Mekanik Elektro',
        'chat_message' => 'Halo, Ada yang bisa kami bantu?',
        'status_message' => 'Percayakan solusi masalah kelistrikan anda kepada kami',
      ],
    ];
    // Insert data into the database
    FloatingWhatsapp::insert($data);
  }
}
