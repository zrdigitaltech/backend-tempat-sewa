<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UsersTableSeeder extends Seeder
{
  public function run(): void
  {
    // Roles
    $superAdminRole = Role::firstOrCreate(['name' => 'super_admin']);
    $adminRole = Role::firstOrCreate(['name' => 'admin']);
    $manajerRole = Role::firstOrCreate(['name' => 'manajer']);
    $penulisRole = Role::firstOrCreate(['name' => 'penulis']);
    $pemilikRole = Role::firstOrCreate(['name' => 'pemilik']);
    $penyewaRole = Role::firstOrCreate(['name' => 'penyewa']);

    // Permissions
    $permissions = Permission::all();

    // Super Admin
    $superAdminUser = User::firstOrCreate(
      ['email' => 'sewatempat24@gmail.com'],
      [
        'name' => 'Zikri Ramdani',
        'username' => 'zikri',
        'no_whatsapp' => '6281228883616',
        'password' => bcrypt('zik123456ri'),
        'created_by' => null,
        'updated_by' => null,
      ]
    );
    $superAdminUser->assignRole($superAdminRole);
    $superAdminRole->syncPermissions($permissions);

    // Referensi ID Super Admin
    $adminId = $superAdminUser->id;

    // Admin
    $adminUser = User::firstOrCreate(
      ['email' => 'admin@gmail.com'],
      [
        'name' => 'Admin ZR',
        'username' => 'admin',
        'no_whatsapp' => '6281228883616',
        'password' => bcrypt('zik123456ri'),
        'created_by' => $adminId,
        'updated_by' => $adminId,
      ]
    );
    $adminUser->assignRole($adminRole);

    // Manajer
    $manajerUser = User::firstOrCreate(
      ['email' => 'manajer@gmail.com'],
      [
        'name' => 'Manajer ZR',
        'username' => 'manajer',
        'no_whatsapp' => '6281228883616',
        'password' => bcrypt('zik123456ri'),
        'created_by' => $adminId,
        'updated_by' => $adminId,
      ]
    );
    $manajerUser->assignRole($manajerRole);

    // Penulis
    $penulisUser = User::firstOrCreate(
      ['email' => 'penulis@gmail.com'],
      [
        'name' => 'Penulis ZR',
        'username' => 'penulis',
        'no_whatsapp' => '6281228883616',
        'password' => bcrypt('zik123456ri'),
        'created_by' => $adminId,
        'updated_by' => $adminId,
      ]
    );
    $penulisUser->assignRole($penulisRole);

    // Pemilik
    $pemilikUser = User::firstOrCreate(
      ['email' => 'pemilik@gmail.com'],
      [
        'name' => 'Pemilik ZR',
        'username' => 'pemilik',
        'no_whatsapp' => '6281228883616',
        'password' => bcrypt('zik123456ri'),
        'created_by' => $adminId,
        'updated_by' => $adminId,
      ]
    );
    $pemilikUser->assignRole($pemilikRole);

    // Penyewa
    $penyewaUser = User::firstOrCreate(
      ['email' => 'penyewa@gmail.com'],
      [
        'name' => 'Penyewa ZR',
        'username' => 'penyewa',
        'no_whatsapp' => '6281228883616',
        'password' => bcrypt('zik123456ri'),
        'created_by' => $adminId,
        'updated_by' => $adminId,
      ]
    );
    $penyewaUser->assignRole($penyewaRole);
  }
}
