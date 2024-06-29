<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Layanan;

class LayanansTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $data = [
      [
        'id' => 1,
        'title' => 'Perbaikan Korsleting & Hansleting',
        'image' => '/assets/images/heating.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Perbaikan Korsleting & Hansleting dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 2,
        'title' => 'Perbaikan Listrik Mati, sebagian Jalur/Lantai',
        'image' => '/assets/images/maintenance.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Perbaikan Listrik Mati, sebagian Jalur/Lantai dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 3,
        'title' => 'Perbaikan Grounding System',
        'image' => '/assets/images/heating.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Perbaikan Grounding System dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 4,
        'title' => 'Perakitan Panel Listrik',
        'image' => '/assets/images/maintenance.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Perakitan Panel Listrik dengan tim ahli listrik kami yang Profesional.',
      ],
      [
        'id' => 5,
        'title' => 'Power Balance',
        'image' => '/assets/images/electrical.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Power Balance dengan tim ahli listrik kami yang Profesional.',
      ],
      [
        'id' => 6,
        'title' => 'Pasang Instalasi Baru',
        'image' => '/assets/images/installation.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Pasang Instalasi Baru dengan tim ahli listrik kami yang Profesional.',
      ],
      [
        'id' => 7,
        'title' => 'Instalasi Panel',
        'image' => '/assets/images/installation.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Instalasi Panel dengan tim ahli listrik kami yang Profesional.',
      ],
      [
        'id' => 8,
        'title' => 'Tambah Daya',
        'image' => 'assets/images/electrical.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Tambah Daya dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 9,
        'title' => 'Penerbitan Nidi dan Slo',
        'image' => '/assets/images/electrical.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Penerbitan Nidi dan Slo dengan tim ahli listrik kami yang Profesional.',
      ],
      [
        'id' => 10,
        'title' => 'Perbaikan kWh Meter Periksa',
        'image' => 'assets/images/repair.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Perbaikan kWh Meter Periksa dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 11,
        'title' => 'Peremajaan Kabel atau Revisi Instalasi Listrik',
        'image' => '/assets/images/maintenance.png',
        'alt' => 'Mekanik Elektro',
        'description' =>
          'Mekanik Elektro menyediakan layanan Peremajaan Kabel atau Revisi Instalasi Listrik dengan Team Teknisi Listrik kami yang Profesional.',
      ],
    ];
    // Insert data into the database
    Layanan::insert($data);
  }
}
