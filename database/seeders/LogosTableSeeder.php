<?php

namespace Database\Seeders;

use App\Models\Logo;
use Illuminate\Database\Seeder;

class LogosTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'image' => null,
        'nama' => 'Nama Pemilik Kontrakan',
      ],
    ];

    // Insert data into the database
    Logo::insert($data);
  }
}
