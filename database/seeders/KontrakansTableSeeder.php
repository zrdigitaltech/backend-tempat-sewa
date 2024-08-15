<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kontrakan;

class KontrakansTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'id' => 1,
        'image' => json_encode([
          ["image" => "/assets/images/kontrakan-black.webp" ],
          ["image" => "/assets/images/kontrakan-white.webp" ]
        ]),
        'alt' => 'Nama Pemilik Kontrakan',
        'nama' => 'Kontrakan Angsa',
        'slug' => 'kontrakan-angsa',
        'deskripsi' =>
          '- Listrik masing-masing<br/>- Airnya bersama (toren)<br/>- Motor bisa parkir dalam<br/>* TIDAK DIBISA UNTUK BERJUALAN *',
        'keterangan' => null,
        'harga_sewa' => json_encode([
          ['durasi' => '1', 'harga' => '20'],
          ['durasi' => '3', 'harga' => '60'],
          ['durasi' => '6', 'harga' => '180'],
          ['durasi' => '12', 'harga' => '240'],
        ]),
        'status' => 'tersedia',
      ],
      [
        'id' => 2,
        'image' => json_encode([
          ["image" => "/assets/images/kontrakan-black.webp" ],
          ["image" => "/assets/images/kontrakan-white.webp" ]
        ]),
        'alt' => 'Nama Pemilik Kontrakan',
        'nama' => 'Kontrakan Dara',
        'slug' => 'kontrakan-dara',
        'deskripsi' =>
          '- Listrik masing-masing<br/>- Airnya bersama (toren)<br/>- Motor bisa parkir dalam<br/>* TIDAK DIBISA UNTUK BERJUALAN *',
        'keterangan' => null,
        'harga_sewa' => json_encode([
          ['durasi' => '1', 'harga' => '20'],
          ['durasi' => '3', 'harga' => '60'],
          ['durasi' => '6', 'harga' => '180'],
          ['durasi' => '12', 'harga' => '240'],
        ]),
        'status' => 'tidak tersedia',
      ],
      [
        'id' => 3,
        'image' => json_encode([
          ["image" => "/assets/images/kontrakan-black.webp" ],
          ["image" => "/assets/images/kontrakan-white.webp" ]
        ]),
        'alt' => 'Nama Pemilik Kontrakan',
        'nama' => 'Kontrakan Elang',
        'slug' => 'kontrakan-elang',
        'deskripsi' =>
          '- Listrik masing-masing<br/>- Airnya bersama (toren)<br/>- Motor bisa parkir dalam<br/>* TIDAK DIBISA UNTUK BERJUALAN *',
        'keterangan' => null,
        'harga_sewa' => json_encode([
          ['durasi' => '1', 'harga' => '20'],
          ['durasi' => '3', 'harga' => '60'],
          ['durasi' => '6', 'harga' => '180'],
          ['durasi' => '12', 'harga' => '240'],
        ]),
        'status' => 'tersedia',
      ],
    ];

    // Insert data into the database
    Kontrakan::insert($data);
  }
}
