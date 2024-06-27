<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannersTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'image' => '/assets/images/banner1.jpg',
        'title' => 'Layanan <span>Listrik</span> Terbaik',
        'description' =>
          'Kami Menyediakan Teknisi Listrik Profesional untuk daerah <b class=\'text-theme\'>JABODETABEK</b>',
        'link_wa' => 'https://bit.ly/CallMekanikElektro',
        'title_wa' => 'Whatsapp Kami',
      ],
      [
        'image' => '/assets/images/banner2.jpg',
        'title' => 'Pasang <span>Instalasi</span> Baru',
        'description' =>
          'Kami Menyediakan Teknisi Listrik Profesional untuk daerah <b class=\'text-theme\'>JABODETABEK</b>',
        'link_wa' => 'https://bit.ly/CallMekanikElektro',
        'title_wa' => 'Whatsapp Kami',
      ],
      [
        'image' => '/assets/images/banner3.jpg',
        'title' => 'Instalasi <span>Panel</span>',
        'description' =>
          'Kami Menyediakan Teknisi Listrik Profesional untuk daerah <b class=\'text-theme\'>JABODETABEK</b>',
        'link_wa' => 'https://bit.ly/CallMekanikElektro',
        'title_wa' => 'Whatsapp Kami',
      ],
    ];

    // Insert data into the database
    Banner::insert($data);
  }
}
