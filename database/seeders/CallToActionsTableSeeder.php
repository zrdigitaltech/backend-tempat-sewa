<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CallToAction;

class CallToActionsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'id' => 1,
        'title' => 'Ada Yang Bisa Kami Bantu ?',
        'subtitle' =>
          'Hubungi kami siap membantu anda 24 jam Di dukung langsung dengan teknisi kami yang profesional.',
        'link_wa' => 'https://bit.ly/CallMekanikElektro',
      ],
    ];
    // Insert data into the database
    CallToAction::insert($data);
  }
}
