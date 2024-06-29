<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    $this->call([
      AreaLayanansTableSeeder::class,
      BannersTableSeeder::class,
      CallToActionsTableSeeder::class,
      FloatingWhatsappsTableSeeder::class,
      GalerisTableSeeder::class,
      KontakKamisTableSeeder::class,
      LayanansTableSeeder::class,
      LogosTableSeeder::class,
      NumberLayanansTableSeeder::class,
      PembayaransTableSeeder::class,
      TentangKamisTableSeeder::class,
      TestimonisTableSeeder::class,
      UsersTableSeeder::class,
    ]);
    // \App\Models\User::factory(10)->create();

    // \App\Models\User::factory()->create([
    //     'name' => 'Test User',
    //     'email' => 'test@example.com',
    // ]);
  }
}
