<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pembayaran;

class PembayaransTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'id' => 1,
        'image' => '/assets/images/logo-bca.webp',
        'alt' => 'Nama Pemilik Kontrakan',
        'no_rek' => '8015234527',
        'nama_rek' => 'Zikri Ramdani',
        'nama_bank' => 'BCA',
      ],
    ];
    // Insert data into the database
    Pembayaran::insert($data);
  }
}
