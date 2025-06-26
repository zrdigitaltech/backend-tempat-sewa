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
    $super = Role::firstOrCreate(['name' => 'super_admin']);
    $admin = Role::firstOrCreate(['name' => 'admin']);

    $permissions = Permission::all();

    if ($permissions->isEmpty()) {
        dump('⚠️ Permission kosong. Pastikan sudah menjalankan `shield:generate`!');
        return;
    }

    dump('Jumlah permission: ' . $permissions->count());

    $super->syncPermissions($permissions);

    $adminPermissions = $permissions->filter(function ($perm) {
        return !str_contains($perm->name, 'delete');
    });

    dump('Jumlah permission admin (tanpa delete): ' . $adminPermissions->count());

    $admin->syncPermissions($adminPermissions);
}

}
