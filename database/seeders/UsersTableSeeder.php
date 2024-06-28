<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UsersTableSeeder extends Seeder
{
  public function run()
  {
    // Create roles if they don't exist
    Role::firstOrCreate(['name' => 'super_admin']);
    Role::firstOrCreate(['name' => 'operator']);

    // Create the super admin user
    $superAdminUser = User::create([
      'name' => 'Zikri Ramdani',
      'email' => 'zikriramdani.developer@gmail.com',
      'password' => bcrypt('zik123456ri'),
    ]);
    $superAdminUser->assignRole('super_admin');

    // Create the operator user
    $operatorUser = User::create([
      'name' => 'Operator User',
      'email' => 'operator@gmail.com',
      'password' => bcrypt('zik123456ri'),
    ]);
    $operatorUser->assignRole('operator');
  }
}
