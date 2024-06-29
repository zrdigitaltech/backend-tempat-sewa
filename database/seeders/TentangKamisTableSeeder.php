<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TentangKami;

class TentangKamisTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'id' => 1,
        'image' => '/assets/images/about-us.jpg',
        'alt' => 'Mekanik Elektro',
        'description' =>
          "<b class='text-theme'>Mekanik Elektro</b> merupakan Team Teknisi Listrik atau Tukang Listrik Panggilan yang melayani Jasa Perbaikan Listrik untuk Rumah, Ruko, Kantor & Industri, seperti:",
      ],
    ];
    // Insert data into the database
    TentangKami::insert($data);
  }
}
