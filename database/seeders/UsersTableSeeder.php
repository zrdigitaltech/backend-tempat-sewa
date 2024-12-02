<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UsersTableSeeder extends Seeder
{
  public function run()
  {
    // Create or get the super_admin and operator roles
    $superAdminRole = Role::firstOrCreate(['name' => 'super_admin']);
    $operatorRole = Role::firstOrCreate(['name' => 'operator']);
    $pelangganRole = Role::firstOrCreate(['name' => 'pelanggan']);

    // Fetch all permissions
    $permissions = Permission::all();

    // Create the super admin user
    $superAdminUser = User::create([
      'name' => 'Zikri Ramdani',
      'email' => 'zikriramdani.developer@gmail.com',
      'password' => bcrypt('zik123456ri'),
    ]);

    $superAdminRole->syncPermissions($permissions);
    $superAdminUser->assignRole($superAdminRole);

    // Create the operator user
    $operatorUser = User::create([
      'name' => 'Operator ZR',
      'email' => 'operator@gmail.com',
      'password' => bcrypt('zik123456ri'),
    ]);
    $operatorUser->assignRole($operatorRole);

    // Create the operator user
    // $operatorUser = User::create([
    //   'name' => 'Cust ZR',
    //   'email' => 'customer@gmail.com',
    //   'password' => bcrypt('zik123456ri'),
    // ]);
    // $operatorUser->assignRole($customerRole);
  }
}
