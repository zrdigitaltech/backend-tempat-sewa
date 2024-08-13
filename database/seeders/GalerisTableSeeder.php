<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Galeri;

class GalerisTableSeeder extends Seeder
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
        'image' => '/assets/images/galleri/galleri-1.jpeg',
        'width' => 150,
        'height' => 174,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Perbaikan Korsleting & Hansleting dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 2,
        'title' => 'Perbaikan Listrik Mati, sebagian Jalur/Lantai',
        'image' => '/assets/images/galleri/galleri-2.jpeg',
        'width' => 300,
        'height' => 212,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Perbaikan Listrik Mati, sebagian Jalur/Lantai dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 3,
        'title' => 'Perbaikan Grounding System',
        'image' => '/assets/images/galleri/galleri-3.jpeg',
        'width' => 300,
        'height' => 212,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Perbaikan Grounding System dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 4,
        'title' => 'Perakitan Panel Listrik',
        'image' => '/assets/images/galleri/galleri-4.jpeg',
        'width' => 300,
        'height' => 213,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Perakitan Panel Listrik dengan tim ahli listrik kami yang Profesional.',
      ],
      [
        'id' => 5,
        'title' => 'Power Balance',
        'image' => '/assets/images/galleri/galleri-5.jpeg',
        'width' => 300,
        'height' => 183,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Power Balance dengan tim ahli listrik kami yang Profesional.',
      ],
      [
        'id' => 6,
        'title' => 'Pasang Instalasi Baru',
        'image' => '/assets/images/galleri/galleri-6.jpeg',
        'width' => 320,
        'height' => 320,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Pasang Instalasi Baru dengan tim ahli listrik kami yang Profesional.',
      ],
      [
        'id' => 7,
        'title' => 'Perbaikan Korsleting & Hansleting',
        'image' => '/assets/images/galleri/galleri-7.jpeg',
        'width' => 220,
        'height' => 190,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Perbaikan Korsleting & Hansleting dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 8,
        'title' => 'Perbaikan Listrik Mati, sebagian Jalur/Lantai',
        'image' => '/assets/images/galleri/galleri-8.jpeg',
        'width' => 120,
        'height' => 148,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Perbaikan Listrik Mati, sebagian Jalur/Lantai dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 9,
        'title' => 'Perbaikan Grounding System',
        'image' => '/assets/images/galleri/galleri-9.jpeg',
        'width' => 160,
        'height' => 223,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Perbaikan Grounding System dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 10,
        'title' => 'Perbaikan Grounding System',
        'image' => '/assets/images/galleri/galleri-10.jpeg',
        'width' => 160,
        'height' => 223,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Perbaikan Grounding System dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 11,
        'title' => 'Perbaikan Grounding System',
        'image' => '/assets/images/galleri/galleri-11.jpeg',
        'width' => 200,
        'height' => 223,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Perbaikan Grounding System dengan Team Teknisi Listrik kami yang Profesional.',
      ],
      [
        'id' => 12,
        'title' => 'Perbaikan Grounding System',
        'image' => '/assets/images/galleri/galleri-12.jpeg',
        'width' => 200,
        'height' => 223,
        'alt' => 'Nama Pemilik Kontrakan',
        'tags' => json_encode([
          [
            'value' => 'Nama Pemilik Kontrakan',
            'title' => 'Nama Pemilik Kontrakan',
          ],
        ]),
        'description' =>
          'Nama Pemilik Kontrakan menyediakan layanan Perbaikan Grounding System dengan Team Teknisi Listrik kami yang Profesional.',
      ],
    ];
    // Insert data into the database
    Galeri::insert($data);
  }
}
