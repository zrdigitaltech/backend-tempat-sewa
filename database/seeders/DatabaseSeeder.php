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
      PaketKeanggotaansTableSeeder::class,
      UsersTableSeeder::class,
      RolePermissionSeeder::class,
      OwnersTableSeeder::class,
      TipePropertisTableSeeder::class,
      PropertisTableSeeder::class,
      PropertyImagesTableSeeder::class,
      PropertyInformationsTableSeeder::class,
      TipeLookupTableSeeder::class,
      ReviewsTableSeeder::class,
      InquiriesTableSeeder::class,
      ReportsTableSeeder::class,
      SuggestionsTableSeeder::class,
      KonsultasiTableSeeder::class,
      AuthorsTableSeeder::class,
      ArticlesTableSeeder::class,
      KategoriFasilitasTableSeeder::class,
      FasilitasTableSeeder::class,
      ProdukBoostersTableSeeder::class,
      KeanggotaansTableSeeder::class,
      TransaksiKeanggotaansTableSeeder::class,
      PenyewasTableSeeder::class,
      TransaksisTableSeeder::class,
    ]);
    // \App\Models\User::factory(10)->create();

    // \App\Models\User::factory()->create([
    //     'name' => 'Test User',
    //     'email' => 'test@example.com',
    // ]);
  }
}
