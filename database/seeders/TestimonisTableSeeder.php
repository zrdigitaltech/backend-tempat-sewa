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
        'alt' => 'Nama Pemilik Kontrakan',
        'name' => 'Firmansyah',
        'position' => 'Pelanggan Nama Pemilik Kontrakan',
        'description' =>
          'Recommanded banget nih Nama Pemilik Kontrakan. McB pembagi dalam rumah sering turun, tapi setelah pakai jasa teknisi dari Nama Pemilik Kontrakan MCB pembagi dalam rumah kami aman.',
      ],
      [
        'id' => 2,
        'image' => '/assets/images/testimonials2.png',
        'alt' => 'Nama Pemilik Kontrakan',
        'name' => 'Jesica',
        'position' => 'Pelanggan Nama Pemilik Kontrakan',
        'description' =>
          'Saya mengira pengerjaan instalasi 1 jalur di rumah saya akan memakan waktu hingga 1 hari, tenyata sekitar 5 jam’an saja sudah rapih dan normal kembali, hingga saat ini pun tidak bermasalah lagi.good job deh….',
      ],
      [
        'id' => 3,
        'image' => '/assets/images/testimonials3.png',
        'alt' => 'Nama Pemilik Kontrakan',
        'name' => 'Fiqih',
        'position' => 'Pelanggan Nama Pemilik Kontrakan',
        'description' =>
          'Sedikit Review Jasa dari Nama Pemilik Kontrakan, awalnya saya sedikit coba-coba karena sekitar 1-2 hari belakangan listrik saya mengalami kosleting atau induksi menurut teknisi nya. Bermula dari penggantian MCB . good joob',
      ],
    ];
    // Insert data into the database
    Testimoni::insert($data);
  }
}
