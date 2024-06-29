<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Testimoni;

class TestimonisTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'id' => 1,
        'image' => '/assets/images/testimonials1.png',
        'alt' => 'Mekanik Elektro',
        'name' => 'Firmansyah',
        'position' => 'Pelanggan Mekanik Elektro',
        'description' =>
          'Recommanded banget nih Mekanik Elektro. McB pembagi dalam rumah sering turun, tapi setelah pakai jasa teknisi dari Mekanik Elektro MCB pembagi dalam rumah kami aman.',
      ],
      [
        'id' => 2,
        'image' => '/assets/images/testimonials2.png',
        'alt' => 'Mekanik Elektro',
        'name' => 'Jesica',
        'position' => 'Pelanggan Mekanik Elektro',
        'description' =>
          'Saya mengira pengerjaan instalasi 1 jalur di rumah saya akan memakan waktu hingga 1 hari, tenyata sekitar 5 jam’an saja sudah rapih dan normal kembali, hingga saat ini pun tidak bermasalah lagi.good job deh….',
      ],
      [
        'id' => 3,
        'image' => '/assets/images/testimonials3.png',
        'alt' => 'Mekanik Elektro',
        'name' => 'Fiqih',
        'position' => 'Pelanggan Mekanik Elektro',
        'description' =>
          'Sedikit Review Jasa dari Mekanik Elektro, awalnya saya sedikit coba-coba karena sekitar 1-2 hari belakangan listrik saya mengalami kosleting atau induksi menurut teknisi nya. Bermula dari penggantian MCB . good joob',
      ],
    ];
    // Insert data into the database
    Testimoni::insert($data);
  }
}
