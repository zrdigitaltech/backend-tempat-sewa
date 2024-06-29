<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\KontakKami;

class KontakKamisTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'alamat' => 'Jalan H Mair, Kunciran Indah - Kota Tangerang',
        'jam_kerja' => '24/7 Layanan',
        'no_telp' => '081228883616',
        'no_wa' => '081228883616',
        'link_no_wa' => 'https=>//bit.ly/CallMekanikElektro',
        'email' => 'sales@MekanikElektro.com',
        'embed_google_map' =>
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.5809884649831!2d106.67966972840526!3d-6.220943899608806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f98092fa561f%3A0x6571d792b4c4760a!2sJl.%20H.%20Mair%20No.22%2C%20RT.005%2FRW.008%2C%20Kunciran%20Indah%2C%20Kec.%20Pinang%2C%20Kota%20Tangerang%2C%20Banten%2015144!5e0!3m2!1sid!2sid!4v1714164434838!5m2!1sid!2sid',
        'link_konfirmasi_wa' => 'https=>//bit.ly/KonfirmasiMekanikElektro',
      ],
    ];
    // Insert data into the database
    KontakKami::insert($data);
  }
}
