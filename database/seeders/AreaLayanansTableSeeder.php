<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AreaLayanan;

class AreaLayanansTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'id' => 1,
        'title' => 'Jakarta',
      ],
      [
        'id' => 2,
        'title' => 'Bogor',
      ],
      [
        'id' => 3,
        'title' => 'Depok',
      ],
      [
        'id' => 4,
        'title' => 'Bekasi',
      ],
      [
        'id' => 5,
        'title' => 'Tangerang',
      ],
    ];

    // Insert data into the database
    AreaLayanan::insert($data);
  }
}
