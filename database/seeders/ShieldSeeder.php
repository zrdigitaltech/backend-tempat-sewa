<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use BezhanSalleh\FilamentShield\Support\Utils;
use Spatie\Permission\PermissionRegistrar;

class ShieldSeeder extends Seeder
{
  public function run(): void
  {
    app()[PermissionRegistrar::class]->forgetCachedPermissions();

    $rolesWithPermissions =
      '[{"name":"super_admin","guard_name":"web","permissions":["permission_1","permission_2","permission_3","permission_4","permission_5","permission_6","permission_7","permission_8","permission_9","permission_10","view_role","view_any_role","create_role","update_role","delete_role","delete_any_role"]},{"name":"editor","guard_name":"web","permissions":["permission_1"]},{"name":"penulis","guard_name":"web","permissions":["permission_2","permission_3"]}]';
    $directPermissions = '[]';

    static::makeRolesWithPermissions($rolesWithPermissions);
    static::makeDirectPermissions($directPermissions);

    $this->command->info('Shield Seeding Completed.');
  }

  protected static function makeRolesWithPermissions(string $rolesWithPermissions): void
  {
    if (!blank($rolePlusPermissions = json_decode($rolesWithPermissions, true))) {
      /** @var Model $roleModel */
      $roleModel = Utils::getRoleModel();
      /** @var Model $permissionModel */
      $permissionModel = Utils::getPermissionModel();

      foreach ($rolePlusPermissions as $rolePlusPermission) {
        $role = $roleModel::firstOrCreate([
          'name' => $rolePlusPermission['name'],
          'guard_name' => $rolePlusPermission['guard_name'],
        ]);

        if (!blank($rolePlusPermission['permissions'])) {
          $permissionModels = collect($rolePlusPermission['permissions'])
            ->map(
              fn($permission) => $permissionModel::firstOrCreate([
                'name' => $permission,
                'guard_name' => $rolePlusPermission['guard_name'],
              ])
            )
            ->all();

          $role->syncPermissions($permissionModels);
        }
      }
    }
  }

  public static function makeDirectPermissions(string $directPermissions): void
  {
    if (!blank($permissions = json_decode($directPermissions, true))) {
      /** @var Model $permissionModel */
      $permissionModel = Utils::getPermissionModel();

      foreach ($permissions as $permission) {
        if ($permissionModel::whereName($permission)->doesntExist()) {
          $permissionModel::create([
            'name' => $permission['name'],
            'guard_name' => $permission['guard_name'],
          ]);
        }
      }
    }
  }
}
