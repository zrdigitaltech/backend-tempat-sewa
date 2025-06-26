<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat semua role
        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin']);
        $adminRole      = Role::firstOrCreate(['name' => 'admin']);
        $manajerRole    = Role::firstOrCreate(['name' => 'manajer']);
        $penulisRole    = Role::firstOrCreate(['name' => 'penulis']);
        $pemilikRole    = Role::firstOrCreate(['name' => 'pemilik']);
        $penyewaRole    = Role::firstOrCreate(['name' => 'penyewa']);

        // Berikan semua permission hanya ke super_admin
        $allPermissions = Permission::all();
        $superAdminRole->syncPermissions($allPermissions);

        // Opsional: tambahkan permission spesifik ke role lain
        // Contoh: hanya 'view' user untuk admin
        // $adminRole->syncPermissions(Permission::where('name', 'like', 'view_any_user')->get());
    }
}
