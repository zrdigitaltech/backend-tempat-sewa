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
        'image' => '/assets/images/logo.png',
        'alt' => 'Mekanik Elektro',
      ],
    ];

    // Insert data into the database
    Logo::insert($data);
  }
}
